const gulp = require('gulp');
const { src, dest } = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");

const server = () => {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
}

const clean = () => {
    return del("dist/")
}

const html = () => {
    return src("src/index.html")
        .pipe(dest("dist/"))
        .pipe(browserSync.stream())
}

const css = () => {
    return src("src/scss/style.scss")
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"]
            })
        )
        .pipe(dest("dist/css"))
        .pipe(cleanCSS())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest("dist/css"))
        .pipe(browserSync.stream())
}

const images = () => {
    return src("src/images/*")
        .pipe(dest("dist/images"))
}

const icons = () => {
    return src("src/icons/*")
        .pipe(dest("dist/icons"))
}

const watchFiles = () => {
    gulp.watch("src/**/*.html", html);
    gulp.watch("src/**/*.scss", css);
}

const build = gulp.series(clean, html, css, images, icons);
const watch = gulp.parallel(build, watchFiles, server);

exports.default = watch;