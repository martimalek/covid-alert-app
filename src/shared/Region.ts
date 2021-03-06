export type Region = 'AB' | 'BC' | 'MB' | 'NB' | 'NL' | 'NT' | 'NS' | 'NU' | 'ON' | 'PE' | 'QC' | 'SK' | 'YT' | 'None';
export type RegionCase = 'regionNotActive' | 'noRegionSet' | 'regionActive';

export interface RegionContent {
  Active: Region[];
  en: any;
  fr: any;
}
