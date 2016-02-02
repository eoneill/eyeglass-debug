"use strict";

var jsdoc = require("gulp-jsdoc");
var config = require("./config");

var infos = {};
var name = "eyeglass-debug";

module.exports = function(gulp, depends) {
  gulp.task("jsdoc", depends || [], function () {
    return gulp.src("lib/**/*.js")
      .pipe(jsdoc.parser(infos, name))
      .pipe(jsdoc.generator(config.codeDocs + "/jsdoc"));
  });
};
