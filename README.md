StreamBuffer
==================================================
A streaming buffer for Node.js

Below is a comparison of StreamBuffer, [CircularBuffer][] (upon which StreamBuffer is based), and Node's native [Buffer] class. In general, use CircularBuffer when you need random access, Buffer when you need low-level memory control, and StreamBuffer otherwise.


|                     | StreamBuffer  | [CircularBuffer]  | Native [Buffer]   |
|---------------------|:-------------:|:-----------------:|:-----------------:|
| Store raw bytes     | **yes**       | **yes**           | **yes**           |
| Decode to strings   | **yes**       | **yes**           | **yes**           |
| Character safety\*  | **yes**       | no                | no                |
| [Streaming][Stream] | **yes**       | read/write (sync) | no                |
| Random access       | no            | **yes**           | **yes**           |
| Sizing              | **automatic** | **automatic**     | fixed             |
| [Events]            | **yes**       | no                | no                |

<small>\* "Character safety" refers to safety from reading partial characters. Some encodings like UTF-8 and UTF-16 may represent characters as multiple bytes. Without character safety, partial characters may be returned.</small>

[CircularBuffer]: https://github.com/cbarrick/CircularBuffer
[Buffer]: http://nodejs.org/api/buffer.html
[Events]: http://nodejs.org/api/events.html
[Stream]: http://nodejs.org/api/stream.html


Installation
--------------------------------------------------

The recommended method is to install the package from Github:

```shell
npm install 'cbarrick/StreamBuffer#v0.1.x' --save
```

<!--
Alternatively, you can install the package from the npm registry, but be aware that the package name is different:

```shell
npm install 'cbarrick-stream-buffer' --save
```
-->


API
--------------------------------------------------

Documentation coming soon!


License
--------------------------------------------------
(The ISC License)

Copyright (c) 2014, Chris Barrick <cbarrick1@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
