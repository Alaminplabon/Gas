import { ObjectId } from 'mongoose';

export interface ILocation {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [x: string]: any;
  location: { coordinates: [number, number]; type: string };
}
