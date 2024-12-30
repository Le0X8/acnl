import { parsePlayer } from './types/player';
import { parseSaveHeader } from './types/saveheader';
import { parseSecureValue } from './types/securevalue';
import { parseVillagerData } from './types/villagerdata';

export function parseGardenPlusDat(data: Buffer) {
  return {
    secureValue: parseSecureValue(data.subarray(0x0, 0x80)),
    saveHeader: parseSaveHeader(data.subarray(0x80, 0xa0)),
    players: [
      parsePlayer(data.subarray(0xa0, 0xa480)),
      parsePlayer(data.subarray(0xa0 + 0xa480, 0xa480 + 0xa480)),
      parsePlayer(
        data.subarray(0xa0 + 0xa480 * 2, 0xa480 + 0xa480 * 2)
      ),
      parsePlayer(
        data.subarray(0xa0 + 0xa480 * 3, 0xa480 + 0xa480 * 3)
      ),
    ],
    villagerData: parseVillagerData(data.subarray(0x292a0, 0x89aff)),
  };
}
