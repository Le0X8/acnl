class PersonalID { // TODO

    /**
     * This class can be used to parse PERSONALID binaries and convert them back
     * @param {Buffer} buf - The PERSONALID binary
     */
    constructor(buf) {
        this._binary = buf;
        
    }
};
module.exports = PersonalID;