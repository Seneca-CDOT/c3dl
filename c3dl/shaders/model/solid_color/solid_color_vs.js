/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.solid_color_vs =   

"attribute vec3 Vertex;" + 
"attribute vec3 Normal;" + 
"attribute vec3 Texture;" + 

// we can calculate this once per model to speed up processing done on the js side.
"uniform mat4 modelViewProjMatrix;" +
"uniform vec3 color;" +

"varying vec4 frontColor;" +

"void main(void){" + 

// Assign so they aren't optimized out
"  vec3 dummy = Normal;" +

"  frontColor = vec4(color, 1.0);" +
"	 gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);" +
"}";
