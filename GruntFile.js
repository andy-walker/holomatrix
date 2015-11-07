module.exports = function (grunt) {
    
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './'
                }
            }
        },
        typescript: {
            base: {
                src: ['src/server/*.ts'],
                dest: 'server/server.js',
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    sourceMap: true,
                    declaration: true
                }
            }
        },
        watch: {
            files: 'src/server/*.ts',
            tasks: ['typescript']
        }
    });
 
    grunt.registerTask('default', 'watch');
 
}
