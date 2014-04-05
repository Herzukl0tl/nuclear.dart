'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: require('./package.json'),
    clean: {
      dart: ['dist/*', '!dist/.gitignore'],
      githooks: '.git/hooks/pre-commit'
    },
    dart2js: {
      all: {
        src: 'src/*.dart',
        dest: 'dist/<%= pkg.name %>.dart.js',
      },
      options: {
        dart2js_bin: 'dart-sdk/bin/dart2js',
      }
    },
    watch: {
      dart: {
        files: ['src/**/*.dart'],
        tasks: ['build:dart']
      }
    },
    shell: {
      githooks: {
        command: 'ln -s ../../githooks/pre-commit .git/hooks/pre-commit'
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  // todo
  grunt.registerTask('lint:dart', []);

  grunt.registerTask('build:dart', ['clean:dart', 'dart2js']);

  ['build', 'lint'].forEach(function (name) {
    grunt.registerTask(name, [name + ':dart']);
  });

  grunt.registerTask('githooks', ['clean:githooks', 'shell:githooks']);

  grunt.registerTask('default', function () {
    grunt.task.run('build', 'watch');
  });
};
