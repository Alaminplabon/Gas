import { ObjectId } from 'mongoose';

export interface IFuelInfo {
  fuelName: string;
  fuelPrice: number;
  zipCode: string[];
}
