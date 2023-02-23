module.exports = {
    /**
     * Converts PLAYTIME integers into a human readable object
     * @param {Number} int - The input number
     * @returns {Object} A human readable object
     */
    get: (int) => {
        return {
            days: Math.floor(int / (24 * 60 * 60)),
            hours: Math.floor(int / (60 * 60) % 24),
            minutes: Math.floor(int / 60 % 60),
            seconds: int % 60
        };
    }
};