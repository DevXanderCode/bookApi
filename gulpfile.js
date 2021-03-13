const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('default', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 5353,
    },
    ignore: ['./node_modules/**'],
  }).on('restart', () => {
    console.log('restarting server');
  });
});
