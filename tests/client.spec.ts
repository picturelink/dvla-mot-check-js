import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as sinon from "sinon";

import { VEHICLES } from "./mocks/responses";

import { MotClient } from "../src";

const { expect } = chai;
const VEHICLEID_VALID = "MDEyMzQ1Njc4OTAxMjM0NQ";
const VEHICLEID_INVALID = "XXXXXX";
const VRM_INVALID = "XXXXXX";
const VRM_VALID = "A1";

chai.use(chaiAsPromised);

describe("MOTClient", () => {
  const client = new MotClient();
  let makeRequest: sinon.SinonStub<unknown[], unknown>;

  beforeEach(() => {
    client.ApiKey = "abcde";
    makeRequest = sinon.stub(client, "MakeRequest" as never);
  });

  afterEach(() => {
    makeRequest.restore();
  })

  it("throws with no valid API key", async () => {
    client.ApiKey = "";

    await expect(client.LookupVrm(VRM_VALID)).to.be.rejectedWith();
  });

  describe("LookupDate()", () => {
    it("raises callback exactly 1440 times", async () => {
      const date = new Date();
      let callbacks = 0;

      makeRequest.resolves([]);

      await client.LookupDate(date, async () => {
        callbacks++;
      });

      expect(callbacks).to.equal(1440);
    });
  });

  describe("LookupDateTime()", () => {
    it("throws with an invalid minute value", async () => {
      const date = new Date();

      makeRequest.resolves(VEHICLES);

      await expect(client.LookupDateTime(date, 0)).to.be.rejectedWith();
      await expect(client.LookupDateTime(date, 1441)).to.be.rejectedWith();
    });

    it("returns multiple results", async () => {
      const date = new Date();

      makeRequest.resolves(VEHICLES);

      await expect(client.LookupDateTime(date, 720)).to.eventually.length(VEHICLES.length);
    });
  });

  describe("LookupVehicleId()", () => {
    it("throws with no valid vehicleId", async () => {
      await expect(client.LookupVehicleId("")).to.be.rejectedWith();
    });

    it("returns a result for a valid vehicle ID", async () => {
      makeRequest.withArgs("GET", { vehicleId: VEHICLEID_VALID }).resolves(VEHICLES.filter((x) => x.vehicleId === VEHICLEID_VALID));
      makeRequest.resolves([]);

      const response = client.LookupVehicleId(VEHICLEID_VALID);

      await expect(response).to.eventually.not.null;
      await expect(response).to.eventually.have.property("vehicleId", VEHICLEID_VALID);
    });

    it("returns null for an invalid vehicle ID", async () => {
      makeRequest.withArgs("GET", { vehicleId: VEHICLEID_INVALID }).resolves(VEHICLES.filter((x) => x.vehicleId === VEHICLEID_INVALID));
      makeRequest.resolves([]);

      const response = client.LookupVehicleId(VEHICLEID_INVALID);

      await expect(response).to.eventually.be.null;
    });
  });

  describe("LookupVrm()", () => {
    it("throws with no valid vrm", async () => {
      await expect(client.LookupVrm("")).to.be.rejectedWith();
    });

    it("returns a result for a valid VRM", async () => {
      makeRequest.withArgs("GET", { registration: VRM_VALID }).resolves(VEHICLES.filter((x) => x.registration === VRM_VALID));
      makeRequest.resolves([]);

      const response = client.LookupVrm(VRM_VALID);

      await expect(response).to.eventually.not.null;
      await expect(response).to.eventually.have.property("registration", VRM_VALID);
    });

    it("returns null for an invalid VRM", async () => {
      makeRequest.withArgs("GET", { registration: VRM_INVALID }).resolves(VEHICLES.filter((x) => x.registration === VRM_INVALID));

      await expect(client.LookupVrm(VRM_INVALID)).to.eventually.be.null;
    });
  });
});
