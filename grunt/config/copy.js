/**
 * Created by Justin on 4/3/2015.
 */
module.exports = function (grunt) {
    return {
        assets: {
            files: [
                {
                    expand: true,
                    cwd: 'assets',
                    src: ['fonts/**'],
                    dest: 'build'
                },
                {
                    expand: true,
                    cwd: 'assets',
                    src: ['images/**'],
                    dest: 'build'
                },
                {
                    expand: true,
                    cwd: 'assets',
                    src: ['img/**'],
                    dest: 'build'
                },
                {
                    expand: true,
                    src: ['fonts/**'],
                    dest: 'build'
                }
            ]
        }
    }
};