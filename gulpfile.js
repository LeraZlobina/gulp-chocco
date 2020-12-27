const { src, dest, task, series, watch, parallel  } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');
const svgo = require('gulp-svgo');
const pic = [
    'src/img/*.png',
    'src/img/*.jpg',
    'src/img/*.svg',
]
const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;

sass.compiler = require('node-sass');
 
task('clean', () => {
 return src(`${DIST_PATH}/**/*`, { read: false })
   .pipe(rm())
})
 
task('copy:html', () => {
 return src(`${SRC_PATH}/*.html`)
   .pipe(dest(DIST_PATH))
   .pipe(reload({ stream: true }));
})
  
task('styles', () => {
    return src([...STYLE_LIBS, 'src/CSS/main.scss'])
      .pipe(gulpif(env === 'dev', sourcemaps.init()))
      .pipe(concat('main.min.scss'))
      .pipe(sassGlob())
      .pipe(sass().on('error', sass.logError))
      .pipe(gulpif(env === 'prod', autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
        })))
      .pipe(gulpif(env === 'prod', gcmq()))
      .pipe(gulpif(env === 'prod', cleanCSS()))
      .pipe(gulpif(env === 'dev', sourcemaps.write()))
      .pipe(dest(DIST_PATH))
      .pipe(reload({ stream: true }));
   });

const libs = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/jquery-touchswipe/jquery.touchSwipe.js',
    'node_modules/mobile-detect/mobile-detect.min.js',
    'node_modules/bxslider/dist/jquery.bxslider.js',
    'src/JS/*.js'
];

task('scripts', () => {
    return src([...JS_LIBS, 'src/JS/*.js'])
      .pipe(gulpif(env === 'dev', sourcemaps.init()))
      .pipe(concat('main.min.js', {newLine: ';'}))
      .pipe(gulpif(env === 'prod', babel({
        presets: ['@babel/env']
       })))
      .pipe(gulpif(env === 'prod', uglify()))
      .pipe(gulpif(env === 'dev', sourcemaps.write()))
      .pipe(dest(DIST_PATH))
      .pipe(reload({ stream: true }));
});

task('icons', () => {
    return src(`${SRC_PATH}/CSS/sprite.svg`)
    .pipe(dest(`${DIST_PATH}/images/icons`));
});

task('pictures', () => {
    return src(pic)
    .pipe(dest(`${DIST_PATH}/images/img`));
});

task('server', () => {
 browserSync.init({
     server: {
         baseDir: "./dist"
     },
     open: false
 });
});


task('watch', () => {
    watch('./src/styles/**/*.scss', series('styles'));
    watch('./src/*.html', series('copy:html'));
    watch('./src/scripts/*.js', series('scripts'));
});

task('default',
 series(
   'clean',
   parallel('copy:html', 'styles', 'scripts', 'icons'),
   parallel('watch', 'server')
 )
);

task('build',
 series(
   'clean',
   parallel('copy:html', 'styles', 'scripts', 'icons'))
);

task('default', series('clean', parallel('copy:html', 'styles', 'scripts', 'icons', 'pictures'), 'server'));