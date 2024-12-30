// See https://github.com/Le0X8/acnl-research/blob/main/binaries/garden_plus.dat.md#securevalue
export function parseSecureValue(buffer: Buffer) {
  return {
    signature: [buffer.readUint32LE(0), buffer.readUint32LE(4)], // is u64, but JS can't handle that
    initialized: buffer.readUint32LE(8),
    padding: Array.from(buffer.subarray(0xc, 0x80)),
  };
}
