/**
 * A private function to perform the core logic of the key comparison functions.
 *
 * @param {object}  obj     object to investigate
 * @param {object}  other   object to compare against
 * @param {array}   diff    current accumulated differences between objects
 * @param {string}  prefix  string to keep track of object pathname of missing prop
 */
function _compareFunction(obj, other, diff, prefix) {
    const localDiff = diff || [],
      localPrefix = prefix || '',
      localObj = obj || {};

    for (var prop in other) {
        if (other.hasOwnProperty(prop)) {
            if (typeof localObj !== 'object' || !(prop in localObj)) {
                localDiff.push(localPrefix + prop);
            }
            if (typeof other[prop] === 'object') {
                localDiff.concat(_compareFunction(localObj[prop], other[prop], localDiff, localPrefix + prop + '.'));
            }
        }
    }
    return localDiff;
}

/**
 * A suite of functions to manipulate objects. See README for more details.
 */
module.exports = {

    getLeftMissingKeys: function(obj, other) {
        return _compareFunction(obj, other);
    },

    getRightMissingKeys: function(obj, other) {
        return _compareFunction(other, obj);
    },

    getMissingKeys: function(obj1, obj2) {
        var differences = [];
        var object1Differences = _compareFunction(obj1, obj2);
        var object2Differences = _compareFunction(obj2, obj1);

        if (object1Differences.length > 0) {
            differences.push({
                object: 'left',
                missingKeys: object1Differences
            });
        }

        if (object2Differences.length > 0) {
            differences.push({
                object: 'right',
                missingKeys: object2Differences
            });
        }

        return differences;
    }
};
