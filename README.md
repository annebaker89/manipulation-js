# manipulate-js
An easy to use tool for JavaScript object manipulation

## Installation

### Node.js

`manipulate-js` is available on [npm](http://npmjs.org).

    $ npm install manipulate-js --save

## Usage

```javascript
    var manipulate-js = require('manipulate-js'),
        getLeftMissingKeys = manipulate-js.getLeftMissingKeys,
        getRightMissingKeys = manipulate-js.getRightMissingKeys,
        getMissingKeys = manipulate-js.getMissingKeys;

    const OBJECT = { prop1: { subProp1: 'value1', subProp2: 'value2' }, prop2: 'value2' },
        OBJECT_MISSING_PROP = { prop1: { subProp1: 'value1', subProp2: 'value2' } },
        OBJECT_DIFFERENT_PROP = { prop1: { subProp1: 'value1', subProp3: 'value2' }, prop2: 'value2' };

    getLeftMissingKeys(OBJECT_MISSING_PROP, OBJECT); // ['prop2']
    getLeftMissingKeys(OBJECT, OBJECT_MISSING_PROP); // []
    getLeftMissingKeys(OBJECT, OBJECT); // []

    getRightMissingKeys(OBJECT_MISSING_PROP, OBJECT); // []
    getRightMissingKeys(OBJECT, OBJECT_MISSING_PROP); // ['prop2]
    getRightMissingKeys(OBJECT, OBJECT); // []

    getMissingKeys(OBJECT, OBJECT); // []
    getMissingKeys(OBJECT, OBJECT_MISSING_PROP); // [ { object: 'left', missingKeys: ['prop2'] } ]
    getMissingKeys(OBJECT_MISSING_PROP, OBJECT); // [ { object: 'right', missingKeys: ['prop2'] } ]
    getMissingKeys(OBJECT_DIFFERENT_PROP, OBJECT); // [ { object: 'left', missingKeys: ['prop1.subProp2'] }, { object: 'right', missingKeys: ['prop1.subProp3'] } ]
```

## Functions

### getLeftMissingKeys(obj, other)

Returns an array of all keys present in other object which are missing in obj object.
Nested keys are formatted by dot notation.

Returns an empty array if the objects contain the same keys.
    
### getRightMissingKeys(obj, other)

Returns an array of all keys present in obj object which are missing in other object.
Nested keys are formatted by dot notation.

Returns an empty array if the objects contain the same keys.
    
### getMissingKeys(obj1, obj2) {

Returns an array of objects. An object will be present in the array for each parameter object which is missing keys that are present in the other.
Nested keys are formatted by dot notation.

Returns an empty array if the objects contain the same keys.

## Tests

  npm test

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## License

MIT

## Notes

The missing keys functions are very useful for verifying that translation files are accurate when internationalising.

## Release History

* 0.1.1 Naming of package conflicted with npm.
* 1.0.1 Fix package-json reference to GitHub.
* 1.1.0 Testing procedure for version updates.
* 1.2.0 Testing GitHub tagging with new documentation.
* 1.2.1 Testing GitHub tag message loading.
