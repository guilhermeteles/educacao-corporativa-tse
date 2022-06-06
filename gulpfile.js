const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const server = require('browser-sync').create();
const {
  watch,
  series
} = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const paths = {
  scripts: {
    src: './',
    dest: './src/'
  }
};

async function reload() {
  server.reload();
}

async function compileSass() {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/assets/css'));
}

async function copyJsModules() {
  gulp.src(['./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', './node_modules/jquery/dist/jquery.slim.min.js', './node_modules/owl.carousel/dist/owl.carousel.min.js', './node_modules/@fancyapps/ui/dist/fancybox.umd.js'])
    .pipe(gulp.dest('./src/assets/js'));
}

async function buildAndReload() {
  await includeHTML();
  reload();
}

async function includeHTML() {
  return gulp.src([
      './pages/*.html'
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(paths.scripts.dest));
}
exports.includeHTML = includeHTML;

exports.default = async function () {
  server.init({
    server: {
      baseDir: paths.scripts.dest
    }
  });
  copyJsModules();
  buildAndReload();
  watch('./sass/**/*.scss', series(compileSass));
  watch(["pages/**/*.html", "src/assets/**/*"], series(buildAndReload));
};

const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const fontmin = require('gulp-fontmin');

async function minifyHTML() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'));
}

async function minifyImg() {
  return gulp.src('src/assets/img/**/**.*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('dist/assets/img/'))
}

async function minifyJS() {
  return gulp.src('src/assets/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('dist/assets/js/'));
}

async function minifyCSS() {
  return gulp.src('src/assets/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('dist/assets/css/'));
}

async function minifyFonts() {
  return gulp.src('src/assets/fonts/*')
        .pipe(fontmin({
            text: 'Educação Corporativa do TSE',
        }))
        .pipe(gulp.dest('dist/assets/fonts'));
}

exports.dist = async function () {
  minifyHTML();
  minifyImg();
  minifyJS();
  minifyCSS();
  minifyFonts();
};