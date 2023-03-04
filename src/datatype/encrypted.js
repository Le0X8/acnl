/**
 * 
 * @param {BigInt} encval - The BigUint64 of the encrypted value
 */
module.exports = (encval) => {
    encval = BigInt(encval);
    // Unpack encval into (Uint32, Uint16, Uint8, Uint8) values.
    var result = 0;
    var enc = Number(encval & BigInt(0xFFFFFFFF));
    var adjust = Number((encval >> BigInt(32)) & BigInt(0xFFFF));
    var shift_val = Number((encval >> BigInt(48)) & BigInt(0xFF));
    var chk = Number((encval >> BigInt(56)) & BigInt(0xFF));
    // Validate Uint8 checksum
    if ((((enc >> 0) + (enc >> 8) + (enc >> 16) + (enc >> 24) + 0xBA) & 0xFF) != chk) {
        console.error('Checksum is not vaild.');
        return null;
    };

    var left_shift = ((0x1C - shift_val) & 0xFF);
    var right_shift = 0x20 - left_shift;

    // Handle error case: Invalid shift value.
    if (left_shift >= 0x20) {
        console.error('Shift value is not vaild.');
        return null;
    };

    // This case should occur for all game-generated values.
    result = ((enc << left_shift) + (enc >> right_shift) - (adjust + 0x8F187432));
    return result;
};