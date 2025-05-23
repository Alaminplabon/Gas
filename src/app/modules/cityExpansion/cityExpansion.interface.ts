export interface ICityExpansion {
  cityName: string;
  centralZipCode: string;
  radius: string;
  coveredZipCodes: string[];
  status: 'active' | 'inactive';
}
