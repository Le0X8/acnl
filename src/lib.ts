import { Buffer } from 'buffer/';
import { parsePlayer } from './types/player';
import { parseSaveHeader } from './types/saveheader';
import { parseSecureValue } from './types/securevalue';
import { parseVillagerData } from './types/villagerdata';

export function parseGardenPlusDat(data: Buffer) {
  return {
    secureValue: parseSecureValue(data.subarray(0x0, 0x80) as Buffer),
    saveHeader: parseSaveHeader(data.subarray(0x80, 0xa0) as Buffer),
    players: [
      parsePlayer(data.subarray(0xa0, 0xa480) as Buffer),
      parsePlayer(data.subarray(0xa0 + 0xa480, 0xa480 + 0xa480) as Buffer),
      parsePlayer(data.subarray(0xa0 + 0xa480 * 2, 0xa480 + 0xa480 * 2) as Buffer),
      parsePlayer(data.subarray(0xa0 + 0xa480 * 3, 0xa480 + 0xa480 * 3) as Buffer),
    ],
    villagerData: parseVillagerData(data.subarray(0x292a0, 0x292a0 + 0x22be0) as Buffer),
  };
}

export default {
  parseGardenPlusDat,
};
