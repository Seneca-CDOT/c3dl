/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.gooch_vs =

"varying vec3 ViewVec;" +
"varying vec3 ecPos;" +
"varying vec3 tnorm;" +

"attribute vec3 Vertex;" + 
"attribute vec3 Normal;" + 
"attribute vec3 dummyAttrib;" +

"uniform mat4 modelViewMatrix;" +
"uniform mat4 modelViewProjMatrix;" +
"uniform mat4 normalMatrix;" + 

"void main(void){" + 

// Dummy attrib so safari and chrome render
// this object properly.
" vec3 dummy = dummyAttrib;" +

"	mat3 normalMatrix3x3 = mat3(normalMatrix[0][0],normalMatrix[0][1],normalMatrix[0][2],normalMatrix[1][0],normalMatrix[1][1],normalMatrix[1][2],normalMatrix[2][0],normalMatrix[2][1],normalMatrix[2][2]);" + 

	// ecPos = vertex in eye coordinate space.
"	ecPos = vec3(modelViewMatrix * vec4(Vertex,1.0));" +
"	tnorm = normalize(normalMatrix3x3 * Normal);" + 

	// a normalized vector pointing from the vector to the light

"	ViewVec = normalize(-ecPos);" +

"	gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);" +
"}";
