// See https://github.com/Le0X8/acnl-research/blob/main/binaries/garden_plus.dat.md#saveheader
export function parseSaveHeader(buffer: Buffer) {
  return {
    crc32: buffer.readUint32LE(0x0),
    verifier1: buffer.readUint16LE(0x4),
    verifier2: buffer.readUint8(0x6),
    padding: Array.from(buffer.subarray(0x7, 0x20)),
  };
}
