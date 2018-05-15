/**
 * A private function to perform the core logic of the key comparison functions.
 *
 * @param {object}  key     key to search for
 * @param {object}  obj   object to compare against
 * @param {array}   occurrences    current accumulated occurrences of key
 * @param {string}  prefix  string to keep track of object pathname of key
 */
function _compareFunction(key, obj, occurrences, prefix) {
    const localOccurrences = occurrences || [],
      localPrefix = prefix || '',
      localObj = obj || {};

    for (var prop in obj) {
        if (localObj.hasOwnProperty(prop)) {
            if (prop === key) {
                localOccurrences.push({ keyPath: localPrefix + prop, value: localObj[prop] });
            }
            if (typeof localObj[prop] === 'object') {
                localOccurrences.concat(_compareFunction(key, localObj[prop], localOccurrences, localPrefix + prop + '.'));
            }
        }
    }
    return localOccurrences;
}

/**
 * A suite of functions to manipulate objects. See README for more details.
 */
module.exports = {

    findKeyOccurrences: function(key, obj) {
        return _compareFunction(key, obj);
    }
};
