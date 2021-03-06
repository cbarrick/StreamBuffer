// StreamBuffer - A streaming buffer for Node.js
// Copyright (c) 2014, Chris Barrick <cbarrick1@gmail.com>
//
// Permission to use, copy, modify, and/or distribute this software for
// any purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

/// StreamBuffer
/// ==================================================
/// TODO: document


'use strict';

var assert = require('assert');
var DuplexStream = require('stream').Duplex;

var CircularBuffer = require('circular-buffer');


/// new StreamBuffer([options])
/// --------------------------------------------------
/// TODO: document

module.exports = function StreamBuffer(opts) {

	opts = opts || {};
	opts.autoFlush = opts.autoFlush || true;
	opts.encoding = opts.encoding || 'buffer';

	opts.decodeStrings = true;
	opts.objectMode = false;

	validateEncoding(opts.encoding, true);

	var buffer = new CircularBuffer(opts);

	var self = this;


	// validateEncoding(encoding, [allowBuffer])
	// --------------------------------------------------
	// Returns `true` if `encoding` is a known encoding. Otherwise throws a TypeError, like when
	// the Buffer class sees an unknown encoding. If `allowBuffer` is `true` then the string
	// `"buffer"` is allowed as an encoding.

	function validateEncoding(encoding, allowBuffer) {
		if (Buffer.isEncoding(encoding)) return true;
		if (allowBuffer && encoding === 'buffer') return true;
		throw new TypeError('Unknown encoding: ' + encoding);
	}


	// Stream Interface //

	DuplexStream.call(this, opts);
	this._write = _write;
	this._read = _read;

	this.on('finish', flush);


	function _read(n) {
		self.push(buffer.read(n, 'buffer'), opts.encoding);
	}


	function _write(chunk, encoding, callback) {
		assert(chunk instanceof Buffer);
		assert(encoding === 'buffer', 'Expected encoding to be "buffer", received: ' + encoding);
		if (opts.autoFlush && chunk.length + buffer.length >= buffer.size) self.flush();
		buffer.write(chunk);
		process.nextTick(callback);
	}


	// Public Interface //

	this.flush = flush;
	this.setEncoding = setEncoding;


	/// StreamBuffer#flush()
	/// --------------------------------------------------
	/// TODO: document

	function flush() {
		self.push(buffer.read('buffer'), opts.encoding);
	}


	/// StreamBuffer#setEncoding(encoding)
	/// --------------------------------------------------
	/// TODO: document

	function setEncoding(encoding) {
		validateEncoding(encoding);

		// Recode the buffer to the new encoding
		opts.encoding = encoding;
		var newBuffer = new CircularBuffer(opts);
		if (buffer.length > 0) newBuffer.write(buffer.read());
		buffer = newBuffer;

		return DuplexStream.setEncoding.call(self, encoding);
	}

};

module.exports.prototype = Object.create(DuplexStream.prototype);
