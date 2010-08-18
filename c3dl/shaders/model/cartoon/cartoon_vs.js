/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.cartoon_vs =   

"attribute vec3 Vertex;" + 
"attribute vec3 Normal;" + 
"attribute vec3 Texture;" + 

"varying vec3 norm;" +
"varying vec3 pos;" +

"varying vec4 texCoord;" +

// for every model we multiply the projection, view and model matrices
// once to prevent having to do it for every vertex, however we still need
// the model and view matrices to calculate lighting.
"uniform mat4 modelViewMatrix;" +

// we can calculate this once per model to speed up processing done on the js side.
"uniform mat4 modelViewProjMatrix;" +

// matrix to transform the vertex normals
"uniform mat4 normalMatrix;" + 

/*

*/
"void main(void)" +
"{" + 

	// create a normal matrix 3x3 out of 4x4
"  mat3 normalMatrix3x3 = mat3(normalMatrix[0][0],normalMatrix[0][1],normalMatrix[0][2],normalMatrix[1][0],normalMatrix[1][1],normalMatrix[1][2],normalMatrix[2][0],normalMatrix[2][1],normalMatrix[2][2]);" + 
"  norm = normalize(normalMatrix3x3 * Normal);" + 

"  gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);" +
"  pos = vec3( modelViewMatrix * vec4(Vertex,1.0));" +

"  texCoord = vec4(Texture,1.0);" + 
"}";
