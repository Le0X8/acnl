import { Buffer } from 'buffer/';

/*
## PlayerListEntry

| Size       |
| ---------- |
| `0x000030` |

| Offset     | Size       | Type  | Description | JSON key        |
| ---------- | ---------- | ----- | ----------- | --------------- |
| `0x000000` | `0x000002` | u16   | Player ID   | playerId        |
| `0x000002` | `0x000012` | str   | Player name | name            |
| `0x000014` | `0x000004` | u32   | ?           | unknown0x000014 |
| `0x000018` | `0x000012` | str   | Town name   | townName        |
| `0x00002a` | `0x000006` | u8[6] | ?           | unknown0x00002a |

*/

export function parsePlayerListEntry(data: Buffer) {
  return {
    playerId: data.readUInt16LE(0x000000),
    name: data.toString('utf16le', 0x000002, 0x000012),
    unknown0x000014: data.readUInt32LE(0x000014),
    townName: data.toString('utf16le', 0x000018, 0x00002a),
    unknown0x00002a: Array.from(data.subarray(0x00002a, 0x000030) as Buffer),
  };
}