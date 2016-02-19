# imagemin-gifsicle [![Build Status](http://img.shields.io/travis/imagemin/imagemin-gifsicle.svg?style=flat)](https://travis-ci.org/imagemin/imagemin-gifsicle) [![Build status](https://ci.appveyor.com/api/projects/status/51vfu1ntxwx7t949?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-gifsicle)

> gifsicle imagemin plugin


## Install

```
N/A
```

## Usage

```js
var Imagemin = require('imagemin');
var imageminGifsicle = require('imagemin-gifsicle');

new Imagemin()
	.src('images/*.gif')
	.dest('build/images')
	.use(imageminGifsicle({interlaced: true}))
	.run();
```

You can also use this plugin with [gulp](http://gulpjs.com):

```js
var gulp = require('gulp');
var imageminGifsicle = require('imagemin-gifsicle');

gulp.task('default', function () {
	return gulp.src('images/*.gif')
		.pipe(imageminGifsicle({interlaced: true})())
		.pipe(gulp.dest('build/images'));
});
```


## API

### imageminGifsicle(options)

### options.interlaced

Type: `boolean`  
Default: `false`

Interlace gif for progressive rendering.

e.g.:
```js
imageminGifsicle({ interlaced: true });
```

### options.resize

Type: `string`  
Default: `undefined`

Resize the output GIF to *widthxheight*.

e.g.:
```js
imageminGifsicle({ resize: '300x200' });
```

### options.noLogicalScreen

Type: `boolean`  
Default: `false`

Sets the output logical screen to the size of the largest output frame.

e.g.:
```js
imageminGifsicle({ noLogicalScreen: true });
```

### options.resizeMethod

Type: `string`  
Default: `mix`

Set the method used to resize images.

e.g.:
```js
imageminGifsicle({ resizeMethod: 'sample' });
```

### options.colors

Type: `number`  
Default: `undefined`

Reduce the number of distinct colors in each output GIF to *num* or less. *Num* must be between `2` and `256`.

e.g.:
```js
imageminGifsicle({ colors: 128 });
```

### options.colorMethod

Type: `string`  
Default: `diversity`

Determine how a smaller colormap is chosen.

e.g.:
```js
imageminGifsicle({ colorMethod: 'blend-diversity' });
```

### options.optimize

Type: `string`  
Default: `1`

Optimize output GIF animations for space.

There are currently three levels:
 * `1`: Stores only the changed portion of each image. This is the default.
 * `2`: Also uses transparency to shrink the file further.
 * `3`: Try several optimization methods (usually slower, sometimes better results).

Other optimization flags provide finer-grained control.

 * `keep-empty`: Preserve empty transparent frames (they are dropped by default).

e.g.:
```js
imageminGifsicle({ optimize: '3' });
```

### options.unoptimize

Type: `boolean`  
Default: `false`

Unoptimize GIF animations into an easy-to-edit form.

e.g.:
```js
imageminGifsicle({ unoptimize: true });
```

## License

MIT © [imagemin](https://github.com/imagemin)
