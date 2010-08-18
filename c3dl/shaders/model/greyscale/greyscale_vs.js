/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.greyscale_vs =   

"attribute vec3 Vertex;" + 
"attribute vec3 Normal;" + 
"attribute vec3 Texture;" + 

// for every model we multiply the projection, view and model matrices
// once to prevent having to do it for every vertex, however we still need
// the view matrix to calculate lighting.
"uniform mat4 modelViewMatrix;" +

// we can calculate this once per model to speed up processing done on the js side.
"uniform mat4 modelViewProjMatrix;" +

// matrix to transform the vertex normals
"uniform mat4 normalMatrix;" + 

"varying vec4 frontColor;" +
"varying vec4 texCoord;" +

"void main(void){" + 

	// create a normal matrix 3x3 out of 4x4
"	mat3 normalMatrix3x3 = mat3(normalMatrix[0][0],normalMatrix[0][1],normalMatrix[0][2]," +
"								normalMatrix[1][0],normalMatrix[1][1],normalMatrix[1][2]," +
"								normalMatrix[2][0],normalMatrix[2][1],normalMatrix[2][2]);" + 
"	vec3 transformNormal = normalize(normalMatrix3x3 * Normal);" + 

//
"	vec3 ambient  = vec3(0.0, 0.0, 0.0);" + 
"	vec3 diffuse  = vec3(0.0, 0.0, 0.0);" + 
"	vec3 specular = vec3(0.0, 0.0, 0.0);" +

	// place the current vertex into view space
	// ecPos = eye coordinate position.
"	vec4 ecPos4 = modelViewMatrix * vec4(Vertex,1.0);" +

	// the current vertex in eye coordinate space
	// perspective divide
"	vec3 ecPos = (vec3(ecPos4))/ecPos4.w;" +

"	vec3 eye = vec3(0.0, 0.0, 1.0);" +
//"	eye = -normalize(ecPos);" +


"	float shine = 1.0;" +
"	if(usingMaterial)" +
"	{" +
"		shine = material.shininess;" +
"	}" +

"	if(lightingOn == true)" +
"	{" +
		// iterate over all the lights, and keep incrementing color values
		// the color values are passed by reference and modified.
"		for(int i = 0; i < C3DL_MAX_LIGHTS; i++)" +
"		{" +
"			if(lights[i].isOn) " +
"			{" +
"				if(lights[i].type == 1)" +
"				{" +
"					c3dl_DirectionalLight(lights[i], transformNormal, ambient, diffuse, specular, shine);" +
"				}" +

"				else if(lights[i].type == 2) " +
"				{" +
"					c3dl_PointLight(lights[i], transformNormal, eye, ecPos, ambient, diffuse, specular, shine);" +
"				}" +

"				else if(lights[i].type == 3)" +
"				{" +
"					c3dl_SpotLight(lights[i], transformNormal, eye, ecPos, ambient, diffuse, specular,shine);" +
"				}" +
"			}" +
"		}" +
"	}" +

"	if( usingMaterial ){" +
"		frontColor =	vec4( material.emission + " +
"                       ambientLightColor + " +
"                       ambient * material.ambient + " +
"                       diffuse * material.diffuse + " +
"                       specular * material.specular,1.0);	" +
"	}" +
"	else{" +
"		frontColor = vec4(ambientLightColor + ambient + diffuse + specular,1.0);" +
"	}" +

"	gl_Position =  modelViewProjMatrix * vec4(Vertex, 1.0);" +
"	texCoord = vec4(Texture,1.0);" + 
"}";
