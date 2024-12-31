import { Buffer } from 'buffer/';
import { parseTownId } from './townid';
import { parsePattern } from './pattern';
import { parseItem } from './item';
import { parseVillagerHome } from './villagerhome';
import { parseLetter } from './letter';
import { parseDate } from './date';

export function parseVillager(data: Buffer) {
  return {
    unknown0x00000: parseTownId(data.subarray(0x00000, 0x00016) as Buffer),
    unknown0x00016: parseTownId(data.subarray(0x00016, 0x0002c) as Buffer),
    id: data.readUInt16LE(0x0002c),
    personality: data.readUInt8(0x0002e),
    padding0x0002f: data.readUInt8(0x0002f),
    pattern: parsePattern(data.subarray(0x00030, 0x008a0) as Buffer),
    unknown0x008a0: parseTownId(data.subarray(0x008a0, 0x008b6) as Buffer),
    unknown0x008b6: Array.from(data.subarray(0x008b6, 0x008c6)),
    unknown0x008c6: Array.from({ length: 10 }, (_, i) => parseItem(data.subarray(0x008c6 + i * 4, 0x008c6 + (i + 1) * 4) as Buffer)),
    homes: Array.from({ length: 16 }, (_, i) => parseVillagerHome(data.subarray(0x008ee + i * 0x00f2, 0x008ee + (i + 1) * 0x00f2) as Buffer)),
    padding0x0180e: data.readUInt16LE(0x0180e),
    letters: Array.from({ length: 5 }, (_, i) => parseLetter(data.subarray(0x01810 + i * 0x0280, 0x01810 + (i + 1) * 0x0280) as Buffer)),
    unknown0x02490: Array.from({ length: 5 }, (_, i) => data.readUInt16LE(0x02490 + i * 2)),
    shirt: parseItem(data.subarray(0x0249a, 0x0249e) as Buffer),
    song: parseItem(data.subarray(0x0249e, 0x024a2) as Buffer),
    wallpaper: parseItem(data.subarray(0x024a2, 0x024a6) as Buffer),
    floor: parseItem(data.subarray(0x024a6, 0x024aa) as Buffer),
    umbrella: parseItem(data.subarray(0x024aa, 0x024ae) as Buffer),
    furniture: Array.from({ length: 16 }, (_, i) => parseItem(data.subarray(0x024ae + i * 4, 0x024ae + (i + 1) * 4) as Buffer)),
    unknown0x024ee: parseDate(data.subarray(0x024ee, 0x024f2) as Buffer),
    catchphrase: data.toString('utf16le', 0x024f2, 0x024f2 + 0x16),
    unknown0x02508: Array.from({ length: 2 }, (_, i) => data.readUInt8(0x02508 + i)),
    unknown0x0250a: parseDate(data.subarray(0x0250a, 0x0250e) as Buffer),
    unknown0x0250e: Array.from({ length: 2 }, (_, i) => data.readUInt8(0x0250e + i)),
    unknown0x02510: Array.from({ length: 2 }, (_, i) => data.readUInt32LE(0x02510 + i * 4)),
  };
}