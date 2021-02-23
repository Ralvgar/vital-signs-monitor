export interface PatientsSocketData {
  room: string;
  sensor: SensorValues;
  value: string;
}

export type SensorValues =
  | "heartRate"
  | "bloodPressure"
  | "breathingFrequency"
  | "oxygenSaturation";
