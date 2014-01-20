//
// mocha -R spec -t 60000 example-webdriverjs.js
//

var assert = require('chai').assert,
    webdriverjs = require('webdriverjs');
var client = {};

process.on('uncaughtException', function(e) {
    console.log(require('util').inspect(e, {showHidden:true}));
});

console.log('running tests on SauceLabs using sauce connect...');

var options = { desiredCapabilities: {
        browserName: 'chrome',
        tags: ['examples'],
        name: 'Run a \'simple internet\' test using webdriverjs/Selenium.',
    },
    host: 'localhost',
    port: 4445,
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    logLevel: 'verbose'
};

describe('Run a \'simple internet\' test using webdriverjs/Selenium.', function() {

    before(function(done){
            client = webdriverjs.remote(options);
            client.init(done);
    });

    it('should be able to view page on internet, checks the title only using TDD style check', function(done) {
        this.timeout(60000); // some time is needed for the browser start up, on my system 3000 should work, too.

        client
        .url('https://google.com')
        // uses helper command getTitle()
        .getTitle(function(err, result) {
            assert.strictEqual(err, null);
            console.log('Title was: ' + result);
            assert.strictEqual(result, 'Google');
        })
        .call(done);
    });

    after(function(done) {
        client.end(done);
    });

});
