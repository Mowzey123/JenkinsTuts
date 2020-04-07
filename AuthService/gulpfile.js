const gulp = require("gulp");
const nodemon = require('gulp-nodemon');
const ts = require("gulp-typescript");
const jshint = require('gulp-jshint');
const notificator = require('gulp-jshint-notify-reporter');
const clean = require('gulp-rimraf');


gulp.task("build", function(done) {
    // const tsResult = tsProject.src().pipe(tsProject());
    // return tsResult.js.pipe(gulp.dest('build'));

    gulp
        .src('./src/**/*.ts')
        .pipe(ts())
        .pipe(gulp.dest('./build'));
    done();
});

gulp.task('lint', (done) => {
    gulp.src('build/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notificator());
    done();
});

gulp.task('stopscript', function(done) {
    process.exit();
    done();
});

gulp.task('clean', (done) => {
    gulp.src("build/*", { read: false }).pipe(clean());
    done();
});

gulp.task('serve', gulp.series('build', 'lint', function(done) {
    const options = {
        script: 'build/index.js',
        delayTime: 1,
        watch: ['./src'],
        ext: 'ts',
        tasks: ['clean', 'build'],
        done: done
    };

    nodemon(options).on('restart', () => {
        console.log('restarting server');
    });
    done();
}));