"use strict";

var debug = require("debug");

function Debugger(eyeglass, sass) {
  this.debuggers = {};

  var options = eyeglass.options.debug;
  this.enable(options && options.enable);
}

Debugger.prototype.debug = function(namespace, message) {
  var debuggr = this.debuggers[namespace] = this.debuggers[namespace] || debug(namespace);
  debuggr(message);
};

Debugger.prototype.enable = function(namespaces) {
  debug.enable(Array.isArray(namespaces) ? namespaces.join(",") : namespaces);
};


Debugger.prototype.enabled = function(namespace) {
  return debug.enabled(namespace);
};

module.exports = Debugger;
