/*
| Offset    | Size      | Type              | Description | JSON key         |
| --------- | --------- | ----------------- | ----------- | ---------------- |
| `0x00000` | `0x00016` | [TownId](#townid) | ?           | `unknown0x00000` |
| `0x00016` | `0x00016` | [TownId](#townid) | ?           | `unknown0x00016` |
*/
import { parseTownId } from './townid';

export function parseVillager(data: Buffer) {
  return {
    unknown0x00000: parseTownId(data.subarray(0x00000, 0x00016)),
    unknown0x00016: parseTownId(data.subarray(0x00016, 0x0002c)),
  };
}