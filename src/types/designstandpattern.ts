import { Buffer } from 'buffer/';
import { parsePattern } from './pattern';

export function parseDesignStandPattern(buffer: Buffer) {
  return {
    pattern: parsePattern(buffer.subarray(0x00000, 0x00870) as Buffer),
    x: buffer.readUInt8(0x00870),
    unknown0x00871: Array.from(buffer.subarray(0x00871, 0x00874) as Buffer),
    y: buffer.readUInt8(0x00874),
    unknown0x00875: Array.from(buffer.slice(0x00875, 0x00878) as Buffer),
  };
}
