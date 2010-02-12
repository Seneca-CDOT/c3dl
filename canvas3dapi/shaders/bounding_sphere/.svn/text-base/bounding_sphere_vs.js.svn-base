/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.bounding_sphere_vs = 

"attribute vec3 Vertex;" + 

// calculate once in JS code instead of once per vertex.
"uniform mat4 modelViewProjMatrix;" +

"void main(void){" + 
"  gl_FrontColor = vec4(0.0, 0.0, 0.0, 1.0);" +
"  gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);" +
"}";
