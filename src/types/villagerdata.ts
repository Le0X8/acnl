/*
| Offset    | Size      | Type                      | Description                     | JSON key    |
| --------- | --------- | ------------------------- | ------------------------------- | ----------- |
| `0x00000` | `0x00004` | u32                       | CRC-32 of the next 142280 bytes | `crc32`     |
| `0x00004` | `0x172f0` | [Villager](#villager)[10] | Villagers                       | `villagers` |
*/
import { parseVillager } from './villager';

export function parseVillagerData(data: Buffer) {
  return {
    crc32: data.readUint32LE(0x00000),
    villagers: Array.from({ length: 10 }, (_, i) => parseVillager(data.subarray(0x00004 + 0x02518 * i, 0x00004 + 0x02518 * (i + 1)))),
  };
}