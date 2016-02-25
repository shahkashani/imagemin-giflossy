'use strict';

var spawn = require('child_process').spawn;
var giflossy = require('giflossy');
var isGif = require('is-gif');
var through = require('through2');

module.exports = function (opts) {
	opts = opts || {};

	return through.ctor({objectMode: true}, function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new Error('Streaming is not supported'));
			return;
		}

		if (!isGif(file.contents)) {
			cb(null, file);
			return;
		}

		var args = ['-w'];
		var ret = [];
		var len = 0;

		if (opts.interlaced) {
			args.push('--interlace');
		}

		if (opts.lossy) {
			args.push('--lossy=' + opts.lossy);
		}

		// Image Transformation Options
		if (opts.resize) {
			args.push('--resize');
			args.push(opts.resize);
		}

		if (opts.noLogicalScreen) {
			args.push('--no-logical-screen');
		}

		if (opts.resizeMethod) {
			args.push('--resize-method');
			args.push(opts.resizeMethod);
		}

		// Color Options
		if (opts.colors) {
			args.push('--colors');
			args.push(opts.colors);
		}

		if (opts.colorMethod) {
			args.push('--color-method');
			args.push(opts.colorMethod);
		}

		// Animation Options
		if (opts.optimize) {
			args.push('-O' + opts.optimize);
		} else if (opts.unoptimize) {
			args.push('--unoptimize');
		}

		var cp = spawn(giflossy, args);

		cp.stderr.setEncoding('utf8');
		cp.stderr.on('data', function (data) {
			var err = new Error(data);
			err.fileName = file.path;
			cb(err);
			return;
		});

		cp.stdout.on('data', function (data) {
			ret.push(data);
			len += data.length;
		});

		cp.on('error', function (err) {
			err.fileName = file.path;
			cb(err);
			return;
		});

		cp.on('close', function () {
			file.contents = Buffer.concat(ret, len);
			cb(null, file);
		});

		cp.stdin.end(file.contents);
	});
};
