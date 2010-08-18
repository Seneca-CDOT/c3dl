/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.solid_color_fs = 
"#ifdef GL_ES\n" +
"precision highp float;\n" +
"#endif\n" +

"varying vec4 frontColor;" +

"void main(void) {" + 
"  gl_FragColor = frontColor;" + 
"}";
