"use strict";

var path = require("path");
var pkg = require("./package.json");
var pkgName = pkg.eyeglass && pkg.eyeglass.name || pkg.name;
var Debugger = require("./lib/Debugger");

var SASS_DIR = path.join(__dirname, "sass");

function namespaceFunctions(functions) {
  var prefix = "-" + pkgName + "--";
  var suffix = "-js";
  var namespacedFunctions = {};
  var SIGNATURE_START = "(";

  Object.keys(functions).forEach(function(key) {
    var fragments = key.split(SIGNATURE_START);
    fragments[0] = prefix + fragments[0].trim() + suffix;

    namespacedFunctions[fragments.join(SIGNATURE_START)] = functions[key];
  });

  return namespacedFunctions;
}

module.exports = function(eyeglass, sass) {
  var sassUtils = require("node-sass-utils")(sass);
  var moreSassUtils = require("node-sass-more-utils")(sass, sassUtils);

  var toJS = moreSassUtils.toJS;
  var toSass = moreSassUtils.toSass;

  var debuggr = new Debugger(eyeglass, sass);
  return {
    sassDir: SASS_DIR,
    functions: namespaceFunctions({
      "debug($namespace, $message)": function($namespace, $message, done) {
        debuggr.debug(
          toJS($namespace),
          toJS($message)
        );
        done(sass.types.Null.NULL);
      },
      "enable($namespaces)": function($namespaces, done) {
        debuggr.enable(
          toJS($namespaces)
        );
        done(sass.types.Null.NULL);
      },
      "enabled($namespace)": function($namespace, done) {
        done(toSass(debuggr.enabled(
          toJS($namespace)
        )));
      }
    })
  };
};
