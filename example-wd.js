// 1/ start sauce connect
// 2/ run: mocha -R spec -t 60000 example-wd.js

require("mocha-as-promised")();

require('colors');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

var wd = require('wd');

var host = 'localhost',
    port = 4445,
    user = process.env.SAUCE_USERNAME,
    pwd = process.env.SAUCE_ACCESS_KEY;

// enables chai assertion chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// using mocha-as-promised and chai-as-promised is the best way
describe("using mocha-as-promised and chai-as-promised", function() {
  var browser;

  before(function() {
    console.log("-->", host, port , user, pwd);
    browser = wd.promiseChainRemote(host, port , user, pwd);
    //browser._debugPromise();
    browser.on('status', function(info) {
      console.log(info);
    });
    browser.on('command', function(meth, path, data) {
      console.log(' > ' + meth, path, data || '');
    });
    return browser
      .init({browserName:'chrome'});
  });

  after(function() {
    return browser
      .quit();
  });

  it("should retrieve the page title", function() {
    return browser
      .get("https://www.google.com")
      .title().should.become("Google");
  });

});

