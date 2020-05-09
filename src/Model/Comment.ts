import { FailureReasonType } from "./Enumerations";

/**
 * Represents a record that provides information about an advisory of failure reason.
 */
export interface Comment {
  /** A flag indicating whether the failure was dangerous. */
  dangerous: boolean;

  /** A text description of the failure reason. */
  text: string;

  /** A value indicating the failure reason type. */
  type: FailureReasonType;
}
