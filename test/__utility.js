const assert = require('assert');
const utility = require('../src/index');
var expect = require('chai').expect;

describe('test utility.versionUp()', () => {
    const currentVersion = "1.0.1";
    it('return incremented version Major', () => {
        assert.equal(utility.versionUp(currentVersion, "Major"), "2.0.1");
    });
    it('return incremented version Minor', () => {
        assert.equal(utility.versionUp(currentVersion, "Minor"), "1.1.1");
    });
    it('return incremented version Patch', () => {
        assert.equal(utility.versionUp(currentVersion, "Patch"), "1.0.2");
    });
});
describe('test utility.debug()', () => {
    global.DEBUG = true;
    const message = "some message";
    it('should log as information to console', () => {      
         assert.equal(utility.debug(message,0), message + ' printed as information');
    });
    it('should log as warning to console', () => {      
         assert.equal(utility.debug(message,1), message + ' printed as warning');
    });
    it('should log as error to console', () => {      
         assert.equal(utility.debug(message,2), message + ' printed as error');
    });
});