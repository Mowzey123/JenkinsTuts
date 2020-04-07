const gulp = require("gulp");
const nodemon = require('gulp-nodemon');
const ts = require("gulp-typescript");
const eslint = require('gulp-eslint');
const clean = require('gulp-rimraf');

process.env.TS_NODE_PROJECT = './tsconfig.json';
require('ts-mocha');
const Mocha = require('mocha');
const mocha = new Mocha();

gulp.task("build", function(done) {
    gulp
        .src('./src/**/*.ts')
        .pipe(ts())
        .pipe(gulp.dest('./build'));
    done();
});

gulp.task('lint', (done) => {
    gulp.src('./src/**/*.ts')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
    done();
});

gulp.task('stopscript', function(done) {
    process.exit();
    done();
});

gulp.task('clean', (done) => {
    gulp.src("dist/*", { read: false }).pipe(clean());
    done();
});

gulp.task("test", function(done) {
    mocha.addFile(`./src/tests/index.spec.ts`);
        mocha.run((failures) => {
        process.on('exit', () => {
            process.exit(failures); // exit with non-zero status if there were failures
        });
    });
    done()
});

gulp.task('serve', gulp.series('test','build', function(done) {
    const options = {
        script: 'build/server.js',
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