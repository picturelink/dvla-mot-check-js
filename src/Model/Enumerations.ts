/**
 * The possible values for the reason-for-failure type field.
 */
export enum FailureReasonType {
  Advisory = "ADVISORY",
  Dangerous = "DANGEROUS",
  Fail = "FAIL",
  Major = "MAJOR",
  Minor = "MINOR",
  PRS = "PRS",
  UserEntered = "USER ENTERED",
}

/**
 * The possible values for the fuel type field.
 */
export enum FuelType {
  CNG = "CNG",
  Diesel = "Diesel",
  Electric = "Electric",
  ElectricDiesel = "Electric Diesel",
  FuelCell = "Fuel Cells",
  GasBiFuel = "Gas Bi-Fuel",
  HybridElectric = "Hybrid Electric (Clean)",
  LPG = "LPG",
  Other = "Other",
  Petrol = "Petrol",
  Steam = "Steam",
}

/**
 * The possible values for the odometer result type field.
 */
export enum OdometerResultType {
  NoOdometer = "NO_ODOMETER",
  Read = "READ",
  Unreadable = "UNREADABLE",
}

/** The possible values for the odometer unit field.
 */
export enum OdometerUnit {
  Km = "km",
  Miles = "mi",
}

/**
 * The possible values for the test result field.
 */
export enum TestResult {
  Failed = "FAILED",
  Passed = "PASSED",
}
