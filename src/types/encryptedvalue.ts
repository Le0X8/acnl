import { Buffer } from 'buffer/';

export function parseEncryptedValue(buffer: Buffer) {
  const int1 = buffer.readUInt32LE(0);
  const int2 = buffer.readUInt32LE(4);

  const enc = int1;
  const adjust = int2 & 0xffff;
  const shift_val = (int2 >>> 16) & 0xff;
  const chk = (int2 >>> 24) & 0xff;

  if (
    (((enc >>> 0) + (enc >>> 8) + (enc >>> 16) + (enc >>> 24) + 0xba) & 0xff) !=
    chk
  ) {
    console.error('invalid numeric value checksum');
    return 0;
  }
  const left_shift = (0x1c - shift_val) & 0xff;
  const right_shift = 0x20 - left_shift;
  if (left_shift < 0x20) {
    return (
      ((enc << left_shift) >>> 0) +
      (enc >>> right_shift) -
      (adjust + 0x8f187432)
    );
  } else {
    console.error('invalid shift for numeric value');
    return 0 + ((enc << right_shift) >>> 0) - ((adjust + 0x8f187432) >>> 0);
  }
}
