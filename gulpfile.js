// 处理任务
var gulp = require("gulp")   // 引入gulp模块

var imagemin = require("gulp-imagemin");  // 引入gulp-imagemin模块    npm install gulp-imagemin --save-dev

var uglify = require("gulp-uglify");  // 引入gulp-uglify模块  npm install gulp-uglify --save-dev

var sass = require("gulp-sass");  // 引入gulp-sass模块  npm install gulp-sass --save-dev

var concat = require("gulp-concat");  //引入gulp-concat模块  npm install gulp-concat --save-dev
/* 
* 常用的方法
*
* gulp.task  -- 定义任务
*
* gulp.src   -- 找到需要执行任务的文件
*
* gulp.dest  -- 执行任务文件的去处
*
* gulp.watch  -- 观察文件是否发生变化
*
*/

// 定义任务

gulp.task("message",function () {
    return console.log("Gulp is running!");
});

// 执行任务   gulp message

// 定义默认任务

// gulp.task("default",function () {
//     return console.log("这是默认执行的任务，只需要执行gulp即可！");
// });

// 拷贝文件

gulp.task("copyHtml",function () {
    gulp.src("src/*.html")
        .pipe(gulp.dest("dist"));
});

// 图片压缩

gulp.task("imageMin", function () {
    gulp.src("src/images/*")
        .pipe(imagemin())               // 数据流里边执行的方法
        .pipe(gulp.dest("dist/images"));   
});

// js文件压缩

gulp.task("minify", function () {
    gulp.src("src/js/*.js")
        .pipe(uglify())                 // 数据流里边执行的方法
        .pipe(gulp.dest("dist/js"));
});


//  sass转换为css

gulp.task("sass", function () {
    gulp.src("src/sass/*.scss")
        .pipe(sass().on("error",sass.logError))
        .pipe(gulp.dest("dist/css"));
});



//代码合并

gulp.task("scripts",function () {
    gulp.src("src/js/*.js")
        .pipe(concat("main.js"))    // 代码合并之后的文件名字  main.js
        .pipe(uglify())             // 压缩合并之后的main.js文件
        .pipe(gulp.dest("dist/js"));
});

// 监听文件是否发生变化

gulp.task("watch",function () {
    gulp.watch("src/js/*.js",['scripts']);
    gulp.watch("src/images/*.",['imageMin']);
    gulp.watch("src/sass/*.scss",['sass']);
    gulp.watch("src/*.html",['copyHtml']);
})


// 同时执行多个任务

gulp.task("default",["message","copyHtml","imageMin","sass","scripts"]);

