/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.gooch_fs = 


"float DiffuseWarm = 0.5;" +
"float DiffuseCool = 0.5;" +

// parameters
"uniform vec3 surfaceColor;" +
"uniform vec3 warmColor;" +
"uniform vec3 coolColor;" +

"varying vec3 ViewVec;" +
"varying vec3 ecPos;"+
"varying vec3 tnorm;" +

/*
	Light light [in]
	vec3 nviewVec [in]
	vec3 ntnorm [in]
	float spec [inout]
	float NdotL [inout]
*/
"void c3dl_goochPointLight(in Light light, in vec3 nviewVec, in vec3 ntnorm, inout float NdotL, inout float spec)" +
"{" +
	// lightVec = dir of light
"	vec3 lightVec = normalize(vec3(light.position) - ecPos);" +
"	vec3 ReflectVec = normalize(reflect(lightVec, ntnorm));" +
"	NdotL = (dot(lightVec, ntnorm) + 1.0) * 0.5;" +

"	spec += max(dot(ReflectVec, -nviewVec), 0.0);" +

"}" +

/*
	light
	nviewVec
	ntnorm
	NdotL
	spec
*/
"void c3dl_goochDirLight(in Light light, in vec3 nviewVec, in vec3 ntnorm,  inout float NdotL, inout float spec)" +
"{"+
	// when the user specifies the the direction of the light, they are
	// specifying the direction the light is going towards.
"	vec3 lightVec = vec3(-light.position);" +

	// calculate how intense the light is. 
	// NdotL is added for each light.
"	NdotL = (dot(lightVec, ntnorm) + 1.0) * 0.5;" +
"	vec3 ReflectVec = normalize(reflect(lightVec, ntnorm));" +
"	spec += max(dot(ReflectVec, -nviewVec), 0.0);" +

"}"+

/*
*/
"void main(void) {" + 

"	vec3 kcool = min(coolColor + DiffuseCool * surfaceColor, 1.0);"+
"	vec3 kwarm = min(warmColor + DiffuseWarm * surfaceColor, 1.0);" +

"	vec3 nviewVec = normalize(ViewVec);" +
"	vec3 ntnorm = normalize(tnorm);" +

"	float NdotL = 0.0;" +	
"	float spec = 0.0;" +

	// Gooch effects should only have one light so the contour of the object
	// is properly rendered. So, only accept the first active light as the light
	// source.
"	bool appliedLight = false;" +

"	if(lightingOn == true)" +
"	{" +
"		for(int i = 0; i < C3DL_MAX_LIGHTS; i++)" +
"		{" +
"     if ( appliedLight == false)"+
"     {"+
"			  if( lights[i].isOn == true)" +
"			  {" +
"			  	if(lights[i].type == 1)" +
"			  	{" +
"			  		c3dl_goochDirLight(lights[i], nviewVec, ntnorm, NdotL, spec);"+
"		  			appliedLight = true;" +
"		  		}" +
"		  		else" +
"		  		{" +
"			  		c3dl_goochPointLight(lights[i], nviewVec, ntnorm, NdotL, spec);"+
"			  		appliedLight = true;" +
"			  	}" +
"			  }" +
"		  }" +
"		}"+
"	}" +

"	NdotL = clamp(NdotL, 0.0, 1.0);"+
"	vec3 kfinal = mix(kcool, kwarm, NdotL);" +	
"	spec = pow(spec,16.0);" +
"	gl_FragColor = vec4(min(kfinal + spec, 1.0), 1.0);" +
"}";
