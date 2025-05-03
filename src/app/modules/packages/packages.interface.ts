import { Model } from 'mongoose';
import { durationType } from './packages.constants';

export interface IPackage {
  _id: string;
  title: string;
  shortTitle: string;
  shortDescription: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popularity: number;
  durationType?: durationType;
  isDeleted: boolean;
  codeGenetarelimit: number;
}

export type IPackageModel = Model<IPackage, Record<string, unknown>>;
