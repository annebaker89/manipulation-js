var missingKeys = require('./missingKeys');
var findKey = require('./findKey');

/**
 * A suite of functions to manipulate objects. See README for more details.
 */
module.exports = {
    // missingKeys functions
    getLeftMissingKeys: missingKeys.getLeftMissingKeys,
    getRightMissingKeys: missingKeys.getRightMissingKeys,
    getMissingKeys: missingKeys.getMissingKeys,
    
    // findKey functions
    findKeyOccurrences: findKey.findKeyOccurrences
};
