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
					'./src/js/standbyme.js'
				],
			}
		},
		
		connect: {
			server: {
				options: {
					port: 8080,
					keepalive: true,
					base: './src',
					hostname: '0.0.0.0',
				},
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['connect', 'watch']);
};
