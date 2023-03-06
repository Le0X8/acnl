module.exports = (decval) => {
    var rt = Buffer.alloc(8);

    var retry = true;
    while (retry) {
        retry = false;
        try {
            // Make a new RNG
            var adjust = Math.floor(Math.random() * 0x10000) & 0xffff;
            var shift_val = Math.floor(Math.random() * 0x1A) & 0xff;

            // Encipher value
            var enc = decval + adjust + 0x8F187432;
            enc = (enc >>> (0x1C - shift_val)) + ((enc << (shift_val + 4)) >>> 0);

            // Calculate Checksum
            var chk = (((enc >>> 0) + (enc >>> 8) + (enc >>> 16) + (enc >>> 24) + 0xBA) & 0xFF) & 0xFF;
            // Pack result
            rt.writeInt32LE(enc, 0);
            rt.writeInt32LE((adjust & 0xffff) + ((shift_val & 0xff) << 16) + ((chk & 0xff) << 24), 4);
        } catch {
            retry = true;
        };
    };
    return rt.readBigUint64LE(0);
};
