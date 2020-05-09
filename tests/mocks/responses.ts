import { MotHistory } from "../../src";

export const VEHICLES: MotHistory[] = [
  {
    "registration": "A1",
    "make": "BMW",
    "model": "I3",
    "firstUsedDate": new Date("2016-10-25T00:00:00.000Z"),
    "fuelType": "Electric",
    "primaryColour": "White",
    "vehicleId": "MDEyMzQ1Njc4OTAxMjM0NQ",
    "registrationDate": new Date("2016-10-25T00:00:00.000Z"),
    "manufactureDate": new Date("2016-10-25T00:00:00.000Z"),
    "motTests": [
      {
        "completedDate": new Date("2019-10-07T11:44:23.000Z"),
        "testResult": "PASSED",
        "expiryDate": new Date("2020-10-24T00:00:00.000Z"),
        "odometerValue": 54688,
        "odometerUnit": "mi",
        "motTestNumber": "944831925980",
        "odometerResultType": "READ",
        "rfrAndComments": [
          {
            text: 'Nearside Front Tyre worn close to legal limit/worn on edge  inner edge (5.2.3 (e))',
            type: 'ADVISORY',
            dangerous: false
          },
        ]
      }
    ]
  } as MotHistory
];
