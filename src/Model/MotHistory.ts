import { DVLAFuelType } from "./Enumerations";
import { MotTest } from "./MotTest";

/**
 * Represents a DVLA MOT vehicle history.
 */
export interface MotHistory {
  /** The size of the engine (cc). */
  engineSize?: number;

  /** The date on which the vehicle was first used. */
  firstUsedDate?: Date;

  /** The type of fuel that powers the vehicle. */
  fuelType?: DVLAFuelType;

  /** The make of the vehicle. */
  make: string;

  /** The date on which the vehicle was manufactured. */
  manufactureDate?: Date;

  /** The year in which the vehicle was manufactured. */
  manufactureYear?: number;

  /** The mode of the vehicle. */
  model: string;

  /** A list of test that have been made on the vehicle. */
  motTests?: MotTest[];

  /** The primary colour of the vehicle. */
  primaryColour: string;

  /** The registration mark (VRM) of the vehicle. */
  registration: string;

  /** The date on which the vehicle was registered with the DVLA. */
  registrationDate?: Date;

  /** The unique ID for the vehicle. */
  vehicleId: string;
}
