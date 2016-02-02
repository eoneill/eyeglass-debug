"use strict";

var Debugger = require("../lib/Debugger");
var assert = require("assert");
var Eyeglass = require("eyeglass");

describe("Compile Fixtures", function() {
  var eyeglass = new Eyeglass({
    debug: {
      enable: ["foo", "bar"]
    }
  });

  it("should enable via options", function() {
    var debuggr = new Debugger(eyeglass);

    assert.ok(debuggr.enabled("foo"));
    assert.ok(debuggr.enabled("bar"));
  });

  it("should not be enabled", function() {
    var debuggr = new Debugger(eyeglass);

    assert.ok(!debuggr.enabled("baz"));
  });
});
