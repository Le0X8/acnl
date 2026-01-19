import { Buffer } from 'buffer/';
import { parsePlayer } from './types/player';
import { parseSaveHeader } from './types/saveheader';
import { parseSecureValue } from './types/securevalue';
import { parseVillagerData } from './types/villagerdata';
import { parseBuildingData } from './types/buildingdata';
import { parseMinigameData } from './types/minigamedata';
import { parseUnknownData } from './types/unknowndata';
import { parseTownData } from './types/towndata';
import { parseExhibitionDatWa } from './types/exhibitiondatwa';
import { parseMydsgnDat } from './types/mydsgndat';

/*
| Offset    | Size      | Type                          | Description | JSON key       |
| --------- | --------- | ----------------------------- | ----------- | -------------- |
| `0x00000` | `0x00080` | [SecureValue](#securevalue)   |             | `securevalue`  |
| `0x00080` | `0x00020` | [SaveHeader](#saveheader)     |             | `saveheader`   |
| `0x000a0` | `0x29200` | [Player](#player)[4]          |             | `players[]`    |
| `0x292a0` | `0x22be0` | [VillagerData](#villagerdata) |             | `villagerData` |
| `0x4be80` | `0x044bc` | [BuildingData](#buildingdata) |             | `buildingData` |
| `0x5033c` | `0x028f4` | [MinigameData](#minigamedata) |             | `minigameData` |
| `0x52c30` | `0x007f4` | [UnknownData](#unknowndata)   |             | `unknownData`  |
| `0x53424` | `0x366dc` | [TownData](#towndata)         |             | `townData`     |
*/

export function parseGardenPlusDat(data: Buffer) {
  return {
    secureValue: parseSecureValue(data.subarray(0x0, 0x80) as Buffer),
    saveHeader: parseSaveHeader(data.subarray(0x80, 0xa0) as Buffer),
    players: [
      parsePlayer(data.subarray(0xa0, 0xa480) as Buffer),
      parsePlayer(data.subarray(0xa0 + 0xa480, 0xa480 + 0xa480) as Buffer),
      parsePlayer(
        data.subarray(0xa0 + 0xa480 * 2, 0xa480 + 0xa480 * 2) as Buffer,
      ),
      parsePlayer(
        data.subarray(0xa0 + 0xa480 * 3, 0xa480 + 0xa480 * 3) as Buffer,
      ),
    ],
    villagerData: parseVillagerData(
      data.subarray(0x292a0, 0x292a0 + 0x22be0) as Buffer,
    ),
    buildingData: parseBuildingData(
      data.subarray(0x4be80, 0x4be80 + 0x44bc) as Buffer,
    ),
    minigameData: parseMinigameData(
      data.subarray(0x5033c, 0x5033c + 0x28f4) as Buffer,
    ),
    unknownData: parseUnknownData(
      data.subarray(0x52c30, 0x52c30 + 0x7f4) as Buffer,
    ),
    townData: parseTownData(
      data.subarray(0x53424, 0x53424 + 0x366dc) as Buffer,
    ),
  };
}

export { parseExhibitionDatWa, parseMydsgnDat };

export default {
  parseGardenPlusDat,
  parseExhibitionDatWa,
  parseMydsgnDat,
};
