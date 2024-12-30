import { Buffer } from 'buffer/';

// See https://github.com/Le0X8/acnl-research/blob/main/binaries/garden_plus.dat.md#securevalue
export function parseSecureValue(buffer: Buffer) {
  return {
    signature: [buffer.readUInt32LE(0), buffer.readUInt32LE(4)], // is u64, but JS can't handle that
    initialized: buffer.readUInt32LE(8),
    padding: Array.from(buffer.subarray(0xc, 0x80)),
  };
}
