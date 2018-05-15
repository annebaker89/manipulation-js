var expect = require('chai').expect;
var manipulate = require('../lib/index');

/*
 * A suite of tests to verify the functions of objectify
 * and check edge cases. Run tests with 'npm test'.
 */

describe('findKey', function() {

    const SEARCH_KEY = 'searchKey';

    const OBJECT = {
        prop1: {
            subProp1: 'value1',
            subProp2: 'value2'
        },
        prop2: 'value2'
    };

    it('should exist', function() {
        expect(manipulate).to.exist;
        expect(manipulate.findKeyOccurrences).to.exist;
    });

    describe('findKeyOccurrences', function() {

        it ('should return empty array for undefined objects', function () {
            expect(manipulate.findKeyOccurrences()).to.be.empty;
        });

        it ('should return empty array if search key is null', function () {
            expect(manipulate.findKeyOccurrences(SEARCH_KEY, null)).to.be.empty;
        });

        it ('should return empty array if search key is not in object', function () {
            const object = {
                prop1: {
                    subProp1: 'value1',
                    subProp2: 'value2'
                },
                prop2: 'value2'
            };

            expect(manipulate.findKeyOccurrences(SEARCH_KEY, null)).to.be.empty;
        });


        it ('should return array with key value if search key is in first level of object', function () {
            const object = {
                prop1: {
                    subProp1: 'value1',
                    subProp2: 'value2'
                },
                searchKey: 'value2'
            };

          var result = manipulate.findKeyOccurrences(SEARCH_KEY, object);
            expect(result).to.have.length(1);
            expect(result[0].keyPath).to.equal('searchKey');
            expect(result[0].value).to.equal(object.searchKey);
        });

        it ('should return array with key value if search key is in second level of object', function () {
            const object = {
                prop1: {
                    subProp1: 'value1',
                    searchKey: 'value2'
                },
                prop2: 'value2'
            };

            var result = manipulate.findKeyOccurrences(SEARCH_KEY, object);
            expect(result).to.have.length(1);
            expect(result[0].keyPath).to.equal('prop1.searchKey');
            expect(result[0].value).to.equal(object.prop1.searchKey);
        });

        it ('should return array with 2 key values if search key occurs twice as object leaf', function () {
            const object = {
                prop1: {
                    subProp1: 'value1',
                    searchKey: 'value2'
                },
                searchKey: 'value2'
            };

            var result = manipulate.findKeyOccurrences(SEARCH_KEY, object);
            expect(result).to.have.length(2);
            expect(result[0].keyPath).to.equal('prop1.searchKey');
            expect(result[0].value).to.equal(object.prop1.searchKey);
            expect(result[1].keyPath).to.equal('searchKey');
            expect(result[1].value).to.equal(object.searchKey);
        });

        it ('should return array with 2 key values if search key occurs once as object leaf and once as sub object', function () {
            const object = {
                prop1: {
                    subProp1: 'value1',
                    searchKey: 'value2'
                },
                searchKey: {
                    subProp3: 'value3',
                    subProp4: 'value4'
                }
            };

            var result = manipulate.findKeyOccurrences(SEARCH_KEY, object);
            expect(result).to.have.length(2);
            expect(result[0].keyPath).to.equal('prop1.searchKey');
            expect(result[0].value).to.equal(object.prop1.searchKey);
            expect(result[1].keyPath).to.equal('searchKey');
            expect(result[1].value).to.equal(object.searchKey);
        });

        it ('should return array with 2 key values if search key occurs as sub object and as leaf within the object', function () {
            const object = {
                prop1: {
                    subProp1: 'value1',
                    subProp2: 'value2'
                },
                searchKey: {
                    subProp3: 'value3',
                    searchKey: 'value4'
                }
            };

            var result = manipulate.findKeyOccurrences(SEARCH_KEY, object);
            expect(result).to.have.length(2);
            expect(result[0].keyPath).to.equal('searchKey');
            expect(result[0].value).to.equal(object.searchKey);
            expect(result[1].keyPath).to.equal('searchKey.searchKey');
            expect(result[1].value).to.equal(object.searchKey.searchKey);
        });

    });
});