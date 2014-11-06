'use strict';
var argv         = require('minimist')(process.argv.slice(2)),
    gulp         = require('gulp'),
    header       = require('gulp-header'),
    gutil        = require('gulp-util'),
    ngAnnotate   = require('gulp-ng-annotate'),
    ngTemplates  = require('gulp-angular-templatecache'),
    compass      = require('gulp-compass'),
    refresh      = require('gulp-livereload'),
    prefix       = require('gulp-autoprefixer'),
    minifyCss    = require('gulp-minify-css'),
    uglify       = require('gulp-uglify'),
    clean        = require('gulp-rimraf'),
    concat       = require('gulp-concat-util'),
    preprocess   = require('gulp-preprocess'),
    plumber      = require('gulp-plumber'),
    stripDebug   = require('gulp-strip-debug'),
    express      = require('express'),
    express_lr   = require('connect-livereload'),
    tinylr       = require('tiny-lr'),
    opn          = require('opn'),
    jshint       = require('gulp-jshint'),
    jshintStylish= require('jshint-stylish'),
    pkg          = require('./package.json'),
    lr,
    refresh_lr;

var today = new Date();

// Configuration

var Config = {
  port: 9000,
  livereloadPort: 35728,
  indexPage: 'index.html',
  cache: (typeof argv.cache !== 'undefined' ? !!argv.cache : true),
  paths: {
    source: {
      root:       'source',
      components: 'source/components',
      svgjs_tpls: 'source/svgjs_tpls',
      vendor:     'source/vendor',
      images :    'source/imgs'
    },
    precompile: {
      templates:  'precompile/templates'
    },
    compileDev: {
      root:   'dev',
      js:     'dev/js',
      css:    'dev/css',
      images: 'dev/imgs'
    },
    compileProd: {
      root:   'prod',
      js:     'prod/js',
      css:    'prod/css',
      images: 'prod/imgs'
    }
  },
  banners: {
    dev: '/*!\n' +
                ' * ' + pkg.prettyName + ' v' + pkg.version + '\n' +
                ' * ' + pkg.homepage + '\n' +
                ' *\n' +
                ' * Copyright (c) ' + (today.getFullYear()) + ' ' + pkg.author.name +'\n' +
                ' *\n' +
                ' * Generated at ' + gutil.date(today, 'dddd, mmmm dS, yyyy, h:MM:ss TT') + '\n' +
                ' */',
    prod: '/*! ' + pkg.prettyName + ' v' + pkg.version + ' */'
  }
};

// Tasks
// =====

// Compile Index page
gulp.task('index:dev', function(){
  return gulp.src(Config.paths.source.root + '/' + Config.indexPage)
    .pipe(preprocess({context: { TARGET_ENV: 'dev'}}))
    .pipe(gulp.dest(Config.paths.compileDev.root));
});
gulp.task('index:prod', function(){
  return gulp.src(Config.paths.source.root + '/' + Config.indexPage)
    .pipe(preprocess({context: { TARGET_ENV: 'prod'}}))
    .pipe(gulp.dest(Config.paths.compileProd.root));
});

// Compile Styles
gulp.task('styles:dev', function(){
  return gulp.src(Config.paths.source.root + '/' + pkg.name + '.scss')
    .pipe(plumber())
    .pipe(compass({
      sass: Config.paths.source.root,
      css: Config.paths.compileDev.css,
      errLogToConsole: true
    }))
    .pipe(gulp.dest(Config.paths.compileDev.css));
});
gulp.task('styles:prod:clean', function(){
  return gulp.src([Config.paths.compileProd.root + '/**/*.css'], { read: false })
    .pipe(clean());
});
gulp.task('styles:prod', ['styles:prod:clean'], function(){
  return gulp.src(Config.paths.source.root + '/' + pkg.name + '.scss')
    .pipe(compass({
      sass: Config.paths.source.root,
      css: Config.paths.compileProd.css,
      errLogToConsole: true
    }))
    .pipe(minifyCss())
    .pipe(gulp.dest(Config.paths.compileProd.css));
});


// Compile HTML templates -> angularJS templates
gulp.task('templates:clean', function(){
  return gulp.src([Config.paths.precompile.templates + '/templates.js'], { read: false })
    .pipe(clean());
});
gulp.task('templates', ['templates:clean'], function(){
  return gulp.src([Config.paths.source.components + '/**/*.html'])
    .pipe(ngTemplates('templates.js', {module: 'svgCircus', basePath: ''}))
    .pipe(gulp.dest(Config.paths.precompile.templates));
});

// Compile JS templates -> angularJS templates
gulp.task('templates_svgjs:clean', function(){
  return gulp.src([Config.paths.precompile.templates + '/templates_svgjs.js'], { read: false })
    .pipe(clean());
});
gulp.task('templates_svgjs:dev', ['templates_svgjs:clean'], function(){
  return gulp.src([Config.paths.source.svgjs_tpls + '/**/*.js'])
    .pipe(ngTemplates('templates_svgjs.js', {module: 'svgCircus', root:'svgjs_tpls/', basePath: ''}))
    .pipe(gulp.dest(Config.paths.precompile.templates));
});
gulp.task('templates_svgjs:prod', ['templates_svgjs:clean'], function(){
  return gulp.src([Config.paths.source.svgjs_tpls + '/**/*.js'])
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(ngTemplates('templates_svgjs.js', {module: 'svgCircus', root:'svgjs_tpls/', basePath: ''}))
    .pipe(gulp.dest(Config.paths.precompile.templates));
});

// Compile Scripts
var appScripts=[
      Config.paths.source.root + '/' + pkg.name + '.js',
      Config.paths.source.root + '/' + pkg.name + '-*.js',
      Config.paths.source.components + '/**/*.js',
      Config.paths.precompile.templates + '/**/*.js'
    ];
gulp.task('scripts:dev', ['templates', 'templates_svgjs:dev'], function(){
  return gulp.src(appScripts)
    .pipe(concat(pkg.name+'.js', {
      separator: '\n\n',
      process: function(src) {
        // Remove all 'use strict'; from the code and
        // replaces all double blank lines with one
        return src.replace(/'use strict';+/g, '')
                  .replace(/\n\n\s*\n/g, '\n\n');
      }
    }))
    .pipe(concat.header(Config.banners.dev + '\n' +
                        '(function() {\n\'use strict\';\n\n'))
    .pipe(concat.footer('\n}());'))
    .pipe(gulp.dest(Config.paths.compileDev.js));
});
gulp.task('scripts:prod:clean', function(){
  return gulp.src([Config.paths.compileProd.root + '/**/*.js'], { read: false })
    .pipe(clean());
});
gulp.task('scripts:prod', ['templates', 'templates_svgjs:prod', 'scripts:prod:clean'], function(){
  return gulp.src(appScripts)
    .pipe(concat(pkg.name+'.js', {
      separator: '\n\n',
      process: function(src) {
        // Remove all 'use strict'; from the code and
        // replaces all double blank lines with one
        return src.replace(/'use strict';\n+/g, '')
                  .replace(/\n\n\s*\n/g, '\n\n');
      }
    }))
    .pipe(stripDebug())
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(header(Config.banners.prod))
    .pipe(gulp.dest(Config.paths.compileProd.js));
});

// Images
gulp.task('images:dev', function(){
  return gulp.src(Config.paths.source.images + '/**/*')
    .pipe(gulp.dest(Config.paths.compileDev.images));
});
gulp.task('images:prod', function(){
  return gulp.src(Config.paths.source.images + '/**/*')
    .pipe(gulp.dest(Config.paths.compileProd.images));
});


// Server
gulp.task('server', function(){
  express()
    .use(express_lr())
    .use(express.static('.'))
    .listen(Config.port);
  gutil.log('Server listening on port ' + Config.port);
});

// LiveReload
gulp.task('livereload', function(){
  lr = tinylr();
  lr.listen(Config.livereloadPort, function(err) {
    if(err) {
      gutil.log('Livereload error:', err);
    }
  });
  refresh_lr=refresh(lr);
});

// Watches
gulp.task('watch', function(){
  gulp.watch(Config.paths.source.root + '/'+Config.indexPage, ['index:dev']);
  gulp.watch(Config.paths.source.root + '/**/*.scss', ['styles:dev']);
  gulp.watch([Config.paths.source.root + '/**/*.js', Config.paths.source.components + '/**/*.html', Config.paths.source.svgjs_tpls + '/**/*.js'], ['scripts:dev']);
  gulp.watch(Config.paths.source.images + '/*', ['images:dev']);
  gulp.watch([
    Config.paths.compileDev.css + '/**/*.css',
    Config.paths.compileDev.js + '/**/*.js',
    Config.paths.compileDev.images + '/*',
    Config.paths.compileDev.root + '/'+Config.indexPage
  ], function(evt){
    refresh_lr.changed(evt.path);
  });
});


// User commands
// =============

// Code linter
gulp.task('lint', function() {
  return gulp.src(Config.paths.source.js + '/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStylish));
});

// Build
gulp.task('build', ['scripts:prod', 'styles:prod', 'index:prod', 'images:prod']);

// Start server and watch for changes
gulp.task('default', ['server', 'livereload', 'styles:dev', 'scripts:dev', 'index:dev', 'images:dev', 'watch'], function(){
  // use the -o arg to open the test page in the browser
  if(argv.o) {
    opn('http://localhost:' + Config.port+'/'+Config.paths.compileDev.root+'/'+Config.indexPage);
  }
});