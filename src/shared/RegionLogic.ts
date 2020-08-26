import {Region, RegionCase} from './Region';

export const isRegionActive = (region: Region | undefined, activeRegions: Region[] | []) => {
  if (region && activeRegions.indexOf(region) > -1) {
    return true;
  }
  return false;
};

export const getRegionCase = (region: Region | undefined, activeRegions: Region[] | []) => {
  let regionCase: RegionCase = 'regionNotActive';
  if (!region || region === 'None') {
    regionCase = 'noRegionSet';
  } else if (isRegionActive(region, activeRegions)) {
    regionCase = 'regionActive';
  }
  return regionCase;
};
