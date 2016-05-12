'use strict';

module.exports = function (grunt) {
    var config = {
        build_dir: './build',
        src_dir: './src',
        bower_dir: './bower',

        clean: ['<%= build_dir %>'],

        copy: {
            main: {
                files: [
                    {expand: true, cwd: '<%= src_dir %>', src: ['fonts/**', 'images/**', '**/*.html'], dest: '<%= build_dir %>'}
                ]
            },
        },
        sass: { 
            dist: {
              files: [{
                expand: true,
                cwd: '<%= src_dir %>/scss/',
                src: ['*.scss'],
                dest: '<%= build_dir %>/css/',
                ext: '.css'
              }]
            }
        },

        cssmin: {
          target: {
            files: [{
              expand: true,
              cwd: '<%= build_dir %>/css',
              src: ['*.css', '!*.min.css'],
              dest: '<%= build_dir %>/css',
              ext: '.min.css'
            }]
          }
        },

        watch: {
            css: {
                files: [
                    '<%= src_dir %>/scss/**/*.scss',
                    '<%= src_dir %>/scss/**/*.css'
                ],
                tasks: ['sass']
            },
            html: {
                files: [
                    '<%= src_dir %>/**/*.html'
                ],
                tasks: ['copy']
            },
            js: {
                files: [
                    '<%= src_dir %>/**/*.js'
                ],
                tasks: ['concat']
            }
        },
        sprite:{
          all: {
            src: '<%= src_dir %>/images/sprite/*.png',
            dest: '<%= src_dir %>/images/sprite.png',
            destCss: '<%= src_dir %>/css/sprite.css'
          }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        '<%= build_dir %>/css/*.css',
                        '<%= build_dir %>/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: '<%= build_dir %>'
                }
            }
        },
        imagemin: {                          // Task 
              target: {
                  files: [{
                    expand: true,                  // Enable dynamic expansion 
                    cwd: '<%= src_dir %>',                   // Src matches are relative to this path 
                    src: ['images/*.{png,jpg,gif}'],   // Actual patterns to match 
                    dest: '<%= build_dir %>'                  // Destination path prefix 
                  }]
              }
          },
        concat: {
          options: {
            separator: ';',
          },
          dist: {
            src: [
              '<%=bower_dir%>/jquery/dist/jquery.min.js',
              '<%=bower_dir%>/vivus/dist/vivus.js',
              '<%=bower_dir%>/velocity/velocity.min.js',
              '<%=bower_dir%>/velocity/velocity.ui.min.js',
              '<%= src_dir %>/js/main.js'
              ],
            dest: '<%= build_dir %>/js/main.js',
          },
        },
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('build', [
        'clean',
        // 'sprite',
        'copy',
        'concat',
        'sass',
        // 'cssmin',
        // 'imagemin',
        'browserSync'
    ]);

    grunt.registerTask('start', [
        'build',
        'watch'
    ]);
};