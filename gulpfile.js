const gulp = require('gulp')
const babelify = require('babelify')
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const source = require('vinyl-source-stream')
const sourcemaps = require('gulp-sourcemaps')

gulp.task('script', function () {
    return browserify('./app/scripts/game.js', { debug: true })
            .transform("babelify", { presets: ["es2015"], sourceMaps: true })
            .bundle()
            .on('error', function onBundleError(err) {
                console.error(err.message)
                this.emit('end')
            })
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('./public/scripts'))
})

gulp.task('watch', ['script'], function () {
    return gulp.watch('./app/scripts/**/*.js', ['script'])
})
