export class User {
  doctorName: string;
  clinicName: string;
  password: string;
  rePassword: string; // for validation
  hashWithoutPassword: string;
  passwordHash: string;
  publicKey: string;
  privateKey: string;
  privateKeyHash: string;
  doctorNameHex:string;
}
