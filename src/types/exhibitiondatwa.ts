import { Buffer } from 'buffer/';
import { parsePlayerListEntry } from './playerlistentry';

/*
| Offset     | Size       | Type                                    | Description                                             | JSON key        |
| ---------- | ---------- | --------------------------------------- | ------------------------------------------------------- | --------------- |
| `0x000000` | `0x000004` | u32                                     | CRC-32 of the next 1555980 bytes (the rest of the file) | crc32           |
| `0x000004` | `0x000900` | [PlayerListEntry](#playerlistentry)[48] | Player list                                             | players         |
*/

export function parseExhibitionDatWa(data: Buffer) {
  return {
    crc32: data.readUInt32LE(0x000000),
    players: Array.from({ length: 48 }, (_, i) => parsePlayerListEntry(data.subarray(4 + i * 0x30, 4 + (i + 1) * 0x30) as Buffer)),
  };
}
