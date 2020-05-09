import fetch from "node-fetch";
import * as queryString from "query-string";

import { ApiError } from "./Model/ApiError";
import { MotHistory } from "./Model/MotHistory";

const BASE_URI = "https://beta.check-mot.service.gov.uk";
const VERSION = "6";

const ACCEPT_CONTENT_TYPE = `application/json+v${VERSION}`;
const MOT_TESTS_ENDPOINT = `${BASE_URI}/trade/vehicles/mot-tests`;

/**
 * A simple client used to access the DVLA MOT History API.
 * @see {@link https://dvsa.github.io/mot-history-api-documentation/}
 */
export class MotClient {
  /**
   * A flag indicating whether this client consumes a beta version of the MOT History API.
   */
  public static readonly IsBeta = BASE_URI.indexOf("beta");

  /**
   * The version of the MOT History API that this client has been written for.
   */
  public static readonly Version = VERSION;

  /**
   * The API key used to access the DVLA MOT History API.
   */
  public ApiKey: string;

  /**
   * The number of seconds after which a request times out.
   */
  public Timeout = 15;

  /**
   * Creates an instance of the MotClient class.
   * @param apiKey The API key used to access the DVLA MOT History API.
   */
  constructor(apiKey = "") {
    this.ApiKey = apiKey;
  }

  /**
   * Returns a promise containing a list of MOT history objects.
   * @param page The page number to retrieve (0 based).
   * @throws ApiError When the MOT History API returns an error response.
   */
  public async Lookup(page = 0): Promise<MotHistory[]> {
    const list = await this.MakeRequest("GET", { page: `${page}` });

    return list || [];
  }

  /**
   * Returns a promise containing a list of MOT history objects for the specified date.
   * @param date The date to lookup, any time part is discarded.
   * @param callback A callback function that reports the progress.
   * @throws ApiError When the MOT History API returns an error response.
   */
  public async LookupDate(date: Date, callback?: (minute: number, count: number) => Promise<void>): Promise<MotHistory[]> {
    let list: MotHistory[] = [];

    for (let minute = 1; minute <= 1440; minute++) {
      const found = await this.LookupDateTime(date, minute);

      if (found !== null) {
        list = [...list, ...found];
      }

      if (callback) {
        await callback(minute, list.length);
      }
    }

    return list;
  }

  /**
   * Returns a promise containing a list of MOT history objects for the specified date.
   * @param date The date to lookup, any time part is discarded.
   * @param minute The minute of the day, where 1 = 00:01, 330 = 05:30 1440 = 00:00
   * @throws ApiError When the MOT History API returns an error response.
   */
  public async LookupDateTime(date: Date, minute = 1): Promise<MotHistory[]> {
    if (minute < 1 || minute > 1440) {
      throw new Error(`The value ${minute} is invalid for minute - must be between 1 and 1440.`);
    }

    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");

    const list = await this.MakeRequest("GET", {
      date: `${year}${month}${day}`,
      page: `${minute}`,
    });

    return list || [];
  }

  /**
   * Returns a promise containing an MOT history object for the specified vehicle.
   * @param vehicleId The unique DVLA ID of the vehicle.
   * @throws ApiError When the MOT History API returns an error response.
   */
  public async LookupVehicleId(vehicleId: string): Promise<MotHistory | null> {
    if (!vehicleId) {
      throw new Error("The vehicleId is required.");
    }

    const list = await this.MakeRequest("GET", { vehicleId });

    return list.length ? list[0] : null;
  }

  /**
   * Returns a promise containing an MOT history object for the specified vehicle.
   * @param registration The vehicle registration mark.
   * @throws ApiError When the MOT History API returns an error response.
   */
  public async LookupVrm(registration: string): Promise<MotHistory | null> {
    registration = registration.replace(/ /g, "");

    if (!registration) {
      throw new Error("The vehicleId is required.");
    }

    const list = await this.MakeRequest("GET", { registration });

    return list.length ? list[0] : null;
  }

  private async MakeRequest(method: "GET" | "POST", params: { [key: string]: string }): Promise<MotHistory[]> {
    if (!this.ApiKey) {
      throw new Error("The ApiKey must be provided.");
    }

    const uri = queryString.stringifyUrl({
      query: params,
      url: MOT_TESTS_ENDPOINT,
    });

    const response = await fetch(uri, {
      headers: {
        Accept: ACCEPT_CONTENT_TYPE,
        "x-api-key": this.ApiKey,
      },
      method: method,
      timeout: this.Timeout * 1000,
    });

    if (response.status === 404) {
      return [];
    } else if (response.status !== 200) {
      throw new ApiError("The MOT History API returned an error.", response.status, await response.json());
    }

    return JSON.parse(await response.text(), this.Parser) as MotHistory[];
  }

  private Parser(key: string, value: unknown): unknown {
    if (key === "odometerValue" || key === "engineSize" || key === "manufactureYear") {
      // These are returned as strings, but are numbers
      return value === null || value === undefined ? null : parseInt(`${value}`, 10);
    } else if (key.indexOf("Date") !== -1) {
      // The DVLA returns dates as yyyy.MM.dd[ HH:mm:ss], because why not???
      return new Date(`${value}`.replace(/[.]/g, "-"));
    }

    return value;
  }
}
