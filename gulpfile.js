const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function buildStyles() {
  // return src("partials/**/*.scss").pipe(sass()).pipe(dest("css"));
  return src("assets/styles/index.scss").pipe(sass()).pipe(dest("assets/css"));
}

function watchTask() {
  watch(["**/*.scss"], buildStyles);
}

exports.default = series(buildStyles, watchTask);
