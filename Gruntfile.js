module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	
		watch: {
			livereload: {
				options: {
					livereload: true,
				},
				files: [
					'./src/index.html',
					'./src/js/standbyme.js',
					'./src/css/*.css',
				],
			}
		},

		connect: {
			server: {
				options: {
					port: 8080,
					livereload: 35729,
					base: './src',
				},
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['connect', 'watch']);
};
