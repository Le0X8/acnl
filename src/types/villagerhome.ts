import { Buffer } from 'buffer/';
import { parsePersonalId } from './personalid';
import { parseItem } from './item';
import { parseTownId } from './townid';
import { parseDate } from './date';

export function parseVillagerHome(data: Buffer) {
  return {
    unknown0x00000: parsePersonalId(data.subarray(0x00000, 0x0002e) as Buffer),
    unknown0x0002e: Array.from(data.subarray(0x0002e, 0x00050)),
    unknown0x00050: data.toString('utf16le', 0x00050, 0x00062),
    unknown0x00062: Array.from({ length: 21 }, (_, i) => parseItem(data.subarray(0x00062 + i * 4, 0x00062 + (i + 1) * 4) as Buffer)),
    unknown0x000b6: Array.from(data.subarray(0x000b6, 0x000c0)),
    unknown0x000c0: parseTownId(data.subarray(0x000c0, 0x000d6) as Buffer),
    unknown0x000d6: Array.from(data.subarray(0x000d6, 0x000de)),
    unknown0x000de: Array.from({ length: 4 }, (_, i) => parseDate(data.subarray(0x000de + i * 4, 0x000de + (i + 1) * 4) as Buffer)),
    unknown0x000ee: Array.from(data.subarray(0x000ee, 0x000f1)),
    padding0x000f1: data.readUInt8(0x000f1),
  };
};