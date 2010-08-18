/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.point_vs = 

"attribute vec3 Vertex;" + 
"attribute vec3 Color;" + 

"varying vec4 frontColor;" +

"uniform vec3 attenuation;" +
"uniform mat4 modelViewProjMatrix;" +
"uniform mat4 viewMatrix;" +

"void main(void){" + 

"	vec4 v = vec4(Vertex, 1.0);" +

	// place the point in view space so we can calculate the distance from the camera.
	// get the distance from the camera to the point.
"	float d = length(vec3(viewMatrix * v));" + 

	// the points will attenuate depending on the attenuation factors and 
	// the distance from the camera.
"	gl_PointSize = 1.0/(attenuation[0] + (attenuation[1] * d) + (attenuation[2] * d * d));" +
"	frontColor = vec4(Color, 1.0); " +
"	gl_Position = modelViewProjMatrix * v;" +
"}";
