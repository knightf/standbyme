module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	
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
