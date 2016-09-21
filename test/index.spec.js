var expect = require('chai').expect;
var objectify = require('../lib/index');

/*
 * A suite of tests to verify the functions of objectify
 * and check edge cases. Run tests with 'npm test'.
 */

describe('Objectify', function() {

    const OBJECT = {
        prop1: {
            subProp1: 'value1',
            subProp2: 'value2'
        },
        prop2: 'value2'
    };

    const OBJECT_MISSING_PROP = {
        prop1: {
            subProp1: 'value1',
            subProp2: 'value2'
        }
    };

    const OBJECT_EXTRA_PROP = {
        prop1: {
            subProp1: 'value1',
            subProp2: 'value2'
        },
        prop3: 'value3'
    };

    const OBJECT_MISSING_SUBPROP = {
        prop1: {
            subProp2: 'value2'
        },
        prop2: 'value2'
    };

    it('should exist', function() {
        expect(objectify).to.exist;
    });

    describe('getLeftMissingKeys', function() {

        it ('should return empty array for undefined objects', function () {
            expect(objectify.getLeftMissingKeys()).to.be.empty;
        });

        it ('should return all keys from other if obj is null', function () {
            var leftMissingKeys = objectify.getLeftMissingKeys(null, OBJECT);

            expect(leftMissingKeys).to.have.lengthOf(4);
            expect(leftMissingKeys[0]).to.equal('prop1');
            expect(leftMissingKeys[1]).to.equal('prop1.subProp1');
            expect(leftMissingKeys[2]).to.equal('prop1.subProp2');
            expect(leftMissingKeys[3]).to.equal('prop2');
        });

        it ('should return empty array if other is null', function () {
            expect(objectify.getLeftMissingKeys(OBJECT, null)).to.be.empty;
        });

        it ('should return prop present in other not present in obj', function () {
            var leftMissingKeys = objectify.getLeftMissingKeys(OBJECT_MISSING_PROP, OBJECT);

            expect(leftMissingKeys).to.have.lengthOf(1);
            expect(leftMissingKeys[0]).to.equal('prop2');
        });

        it ('should return empty array if prop present in obj not present in other', function () {
            expect(objectify.getLeftMissingKeys(OBJECT, OBJECT_MISSING_PROP)).to.be.empty;
        });

        it ('should return subprop present in other not present in obj', function () {
            var leftMissingKeys = objectify.getLeftMissingKeys(OBJECT_MISSING_SUBPROP, OBJECT);

            expect(leftMissingKeys).to.have.lengthOf(1);
            expect(leftMissingKeys[0]).to.equal('prop1.subProp1');
        });

        it ('should return empty array if subprop present in obj not present in other', function () {
            expect(objectify.getLeftMissingKeys(OBJECT, OBJECT_MISSING_SUBPROP)).to.be.empty;
        });
    });

    describe('getRightMissingKeys', function() {

        it ('should return empty array for undefined objects', function () {
            expect(objectify.getRightMissingKeys()).to.be.empty;
        });

        it ('should return all keys from obj if other is null', function () {
            var rightMissingKeys = objectify.getRightMissingKeys(OBJECT, null);

            expect(rightMissingKeys).to.have.lengthOf(4);
            expect(rightMissingKeys[0]).to.equal('prop1');
            expect(rightMissingKeys[1]).to.equal('prop1.subProp1');
            expect(rightMissingKeys[2]).to.equal('prop1.subProp2');
            expect(rightMissingKeys[3]).to.equal('prop2');
        });

        it ('should return empty array if obj is null', function () {
            expect(objectify.getRightMissingKeys(null, OBJECT)).to.be.empty;
        });

        it ('should return prop present in obj not present in other', function () {
            var rightMissingKeys = objectify.getRightMissingKeys(OBJECT, OBJECT_MISSING_PROP);

            expect(rightMissingKeys).to.have.lengthOf(1);
            expect(rightMissingKeys[0]).to.equal('prop2');
        });

        it ('should return empty array if prop present in other not present in obj', function () {
            expect(objectify.getRightMissingKeys(OBJECT_MISSING_PROP, OBJECT)).to.be.empty;
        });

        it ('should return subprop present in obj not present in other', function () {
            var rightMissingKeys = objectify.getRightMissingKeys(OBJECT, OBJECT_MISSING_SUBPROP);

            expect(rightMissingKeys).to.have.lengthOf(1);
            expect(rightMissingKeys[0]).to.equal('prop1.subProp1');
        });

        it ('should return empty array if prop present in other not present in obj', function () {
            expect(objectify.getRightMissingKeys(OBJECT_MISSING_PROP, OBJECT)).to.be.empty;
        });
    });

    describe('getMissingKeys', function() {

        it ('should return empty array for undefined objects', function () {
            expect(objectify.getMissingKeys()).to.be.empty;
        });

        it ('should return object: 1 missing keys if left missing keys exist but no right', function () {
            var missingKeys = objectify.getMissingKeys(OBJECT_MISSING_PROP, OBJECT);

            expect(missingKeys).to.have.lengthOf(1);
            expect(missingKeys[0].object).to.equal('left');
            expect(missingKeys[0].missingKeys).to.have.lengthOf(1);
            expect(missingKeys[0].missingKeys[0]).to.equal('prop2');
        });

        it ('should return object: 2 missing keys if right missing keys exist but no left', function () {
            var missingKeys = objectify.getMissingKeys(OBJECT, OBJECT_MISSING_PROP);

            expect(missingKeys).to.have.lengthOf(1);
            expect(missingKeys[0].object).to.equal('right');
            expect(missingKeys[0].missingKeys).to.have.lengthOf(1);
            expect(missingKeys[0].missingKeys[0]).to.equal('prop2');
        });

        it ('should return 2 objects if missing keys exist for both objects', function () {
            var missingKeys = objectify.getMissingKeys(OBJECT_EXTRA_PROP, OBJECT);

            expect(missingKeys).to.have.lengthOf(2);
            expect(missingKeys[0].object).to.equal('left');
            expect(missingKeys[0].missingKeys).to.have.lengthOf(1);
            expect(missingKeys[0].missingKeys[0]).to.equal('prop2');
            expect(missingKeys[1].object).to.equal('right');
            expect(missingKeys[1].missingKeys).to.have.lengthOf(1);
            expect(missingKeys[1].missingKeys[0]).to.equal('prop3');
        });
    });
});