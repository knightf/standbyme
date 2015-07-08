module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	
		wiredep: {
			task:{
				src: [ './demo/index.html' ],
			}
		},
		watch: {
		},
		connect: {
			server: {
				options: {
					port: 8080,
					keepalive: true,
					base: './',
					hostname: '0.0.0.0',
				},
			},
		},
	});

	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['connect', 'watch']);
};
