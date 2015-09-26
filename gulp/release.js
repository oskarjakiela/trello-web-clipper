var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var semver = require('semver');

var conf = require('./conf');

var getPackageJson = function () {
  return JSON.parse(fs.readFileSync(path.join('.', '/bower.json'), 'utf8'));
};

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

var release = function (type) {
  return function () {
    var pkg = getPackageJson();
    var version = semver.inc(pkg.version, type);
    var manifestFilter = $.filter([
      path.join('.', '/bower.json'),
      path.join('.', '/package.json')
    ], { restore: true });

    return gulp.src([
      path.join('.', '/bower.json'),
      path.join('.', '/package.json'),
      path.join(conf.paths.dist, '/*')
    ])
    .pipe(manifestFilter)
    .pipe($.bump({ version: version }))
    .pipe(gulp.dest(path.join('.', '/')))
    .pipe(manifestFilter.restore)
    .pipe($.git.commit('Bump version to ' + version))
    .pipe($.git.tag(version, 'Tagging as ' + version));
  };
};

gulp.task('release:patch', ['build'], release('patch'));
gulp.task('release:minor', ['build'], release('minor'));
gulp.task('release:major', ['build'], release('major'));
