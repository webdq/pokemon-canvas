const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");

gulp.task('poke',function(){
    gulp.src('./src/poke_modules/**.js')
        .pipe(babel({
            presets: [['env',{'modules':'umd'}]]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/poke_modules'));
});

gulp.task('pokemon',function(){
    gulp.src('./pokemon.js')
        .pipe(uglify({
            output: {
                comments: 'some'
            }
        }))
        .pipe(rename('pokemon.min.js'))
        .pipe(gulp.dest('./dist'));

    gulp.src('./pokemon.js')
        .pipe(gulp.dest('./dist'));
});

gulp.task('default',['poke','pokemon'])
