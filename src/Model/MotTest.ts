import {  OdometerResultType, OdometerUnit, TestResult } from "./Enumerations";
import { Comment } from "./Comment";

/**
 * Represents a DVLA MOT test result.
 */
export interface MotTest {
  /** The date on which the MOT was completed. */
  completedDate: Date;

  /** The date on which the MOT expires. */
  expiryDate: Date;

  /** The unique MOT test number. */
  motTestNumber: string;

  /** A value indicating whether the odometer reading was taken. */
  odometerResultType?: OdometerResultType;

  /** The units on the vehicle's odometer. */
  odometerUnit?: OdometerUnit;

  /** The odometer reading at the time of the test. */
  odometerValue?: number;

  /** A list of failure and advisory information. */
  rfrAndComments: Comment[];

  /** A value indicating whether the test passed or failed. */
  testResult: TestResult;
}
