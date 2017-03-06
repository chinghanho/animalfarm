const gulp = require('gulp')
const watchify = require('watchify')
const babelify = require('babelify')
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const source = require('vinyl-source-stream')
const sourcemaps = require('gulp-sourcemaps')

var bundler = browserify('./_scripts/index.js')

gulp.task('script', function () {
    return bundling()
})

gulp.task('watch', function () {
    let watched = watchify(bundler)
    watched.on('update', function () {
        bundling()
    })
    return bundling(watched)
})

function bundling(bundle) {
    return (bundle || bundler)
        .transform("babelify", { presets: ["es2015"], sourceMaps: true })
        .bundle()
        .on('error', onBundleError)
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./scripts'))
}

function onBundleError(err) {
    console.error(err.message)
    this.emit('end')
}
