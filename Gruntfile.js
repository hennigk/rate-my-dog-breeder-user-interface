module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true,
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }
      }
    },
    
    webpack: {
      build: {
        entry: './js/app.js',
        output: {
          path: "./js/",
          filename: "app-bundle.js",
        },
      }
    },

    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js']
      },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },
      webpack: {
        files: ['js/**/*.js', 'js/**/*.ejs', '!js/app-bundle.js'],
        tasks: ['webpack']
      }
    },
    copy: {
      production: {
        expand: true,
        src: [
          'css/**',
          'js/app-bundle.js',
          'index.html',
          'bower_components/modernizr/modernizr.js',
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/foundation/js/foundation.min.js',
          'images/**',
          'CNAME'
        ],
        dest: 'production/'
      }
    },
    "gh-pages": {
      options: {
        base: "production"
      },
      src: ["**"]
    },
    clean: {
      production: ["production"]  
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', ['sass', 'webpack']);
  grunt.registerTask('default', ['build','watch']);
  grunt.registerTask('deploy', ['clean:production', 'build', 'copy:production', 'gh-pages']);
}