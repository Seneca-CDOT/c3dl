/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.line_vs = 

"attribute vec3 Vertex;" + 
"attribute vec3 Color;" + 

"varying vec4 frontColor;" +

"uniform mat4 modelViewProjMatrix;" +

"void main(void)" +
"{" +
"  frontColor = vec4(Color, 1.0);" +
"  gl_Position = modelViewProjMatrix * vec4(Vertex, 1.0);" + 
"}";
