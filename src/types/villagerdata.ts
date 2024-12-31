import { Buffer } from 'buffer/';
import { parseVillager } from './villager';

export function parseVillagerData(data: Buffer) {
  return {
    crc32: data.readUInt32LE(0x00000),
    villagers: Array.from({ length: 10 }, (_, i) => parseVillager(data.subarray(0x00004 + 0x02518 * i, 0x00004 + 0x02518 * (i + 1)) as Buffer)),
    unknown0x172f4: Array.from(data.subarray(0x172f4, 0x1976c)),
    unknown0x1976c: Array.from({ length: 4 }, (_, i) => parseVillager(data.subarray(0x1976c + 0x02518 * i, 0x1976c + 0x02518 * (i + 1)) as Buffer)),
    unknown0x22bcc: Array.from(data.subarray(0x22bcc, 0x22be0)),
  };
}