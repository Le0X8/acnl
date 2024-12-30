import { Buffer } from 'buffer/';
import { parseTownId } from './townid';

export function parsePersonalId(buffer: Buffer) {
  return {
    id: buffer.readUInt16LE(0x00000),
    name: buffer.toString('utf16le', 0x00002, 0x00014),
    gender: buffer.readUInt8(0x00014),
    padding0x00015: buffer.readUInt8(0x00015),
    hometown: parseTownId(buffer.subarray(0x00016, 0x0002c) as Buffer),
    tpcState: buffer.readUInt8(0x0002c),
    tpcRegion: buffer.readUInt8(0x0002d),
  };
}