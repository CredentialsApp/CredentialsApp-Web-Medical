import { Patient } from "./patientModel";

export class Note implements Patient {
  name: string;
  location: string;
  photo: string;
  _id: number;
  note: string;
}
