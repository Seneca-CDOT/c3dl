/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

//
c3dl.light_vs = 



// We need to create our own light structure since we can't access 
// the light() function in the 2.0 context.
"struct Light" +
"{" +

// figure out culling/light bug
//"	int isOn;" +
"	bool isOn;" +
"	int type;" +

"	vec3 ambient;" +
"	vec3 diffuse;" +
"	vec3 specular;" +
"	vec4 position;" +

	// Used if the light is a spotlight
"	vec3 spotDirection;" +
"	float spotExponent;" +
"	float spotCutoff;" +

	// Not used in calculations if the light is directional, since directional
	// lights do not attenuate.
"	float attenuation1;" +
"	float attenuation2;" +
"	float attenuation3;" +
"};" +

"uniform vec3 ambientLightColor;" +

// global lighting state, if this is off, no light calculations 
// are computed.
"uniform bool lightingOn;" +

//
"const int C3DL_MAX_LIGHTS = 7;" +

// custom light structures needed, we can't access WebGL light states.
"uniform Light lights[C3DL_MAX_LIGHTS];" +


/*
	A Spotlight is a positional light with a constraint which prevents light from radiating from
	all directions from the point light.  Instead a cone of light is created which lights up objects.

	Light light - the light in viewspace
	vec3 normal - transformed normal
	vec3 eye - 
	vec3 ecPos - vertex in eye coordinate space. 
	vec3 ambient - 
	vec3 diffuse - 
	vec3 specular - 	
	float shininess - 
*/
"void c3dl_SpotLight(	in Light light, in vec3 normal, in vec3 eye, in vec3 ecPos, " + 
"						inout vec3 ambient, inout vec3 diffuse, inout vec3 specular, " +
"						float shininess)" +
"{" +
"	float nDotVP; " + 
"	float nDotHV; " +
"	float spotDot; " + 
"	float spotAttenuation;" +
"	float attenuation;" + 
"	float d;" +
"	vec3 VP;" +
"	float pf;" +
"	vec3 halfVector;" +

	// calculate the vector from the current vertex to the light.
"	VP = vec3(light.position) - ecPos; " + 

"	vec3 ldir = normalize(light.spotDirection);" +

"	d = length(VP);" +
"	VP = normalize(VP);" + 

"	attenuation = 1.0 / (light.attenuation1 + (light.attenuation2 * d) + (light.attenuation3 * d * d));" +

	// dot product of the vector from vertex to light and light direction.
"	spotDot = dot(-VP, ldir);" +

	// if the vertex falls inside the cone
"	if(spotDot > cos(radians(light.spotCutoff)))" +
"	{" +
"		spotAttenuation = pow(spotDot, light.spotExponent);" +
"	}" +
"	else{" +
"		spotAttenuation = 0.0;" +
"	}" +


"	attenuation *= spotAttenuation;" +

"	halfVector = normalize(VP + eye);" +

"	nDotVP = max(0.0, dot(normal, VP));" + 
"	nDotHV = max(0.0, dot(normal, halfVector));" +

	//
"	if(nDotVP == 0.0){" +
"		pf = 0.0;" +
"	}" +
"	else{"+
"		pf = pow(nDotHV, shininess);" +
"	}" +

"	ambient += light.ambient * attenuation;" +
"	diffuse += light.diffuse * nDotVP * attenuation; " +
"	specular += light.specular * pf * attenuation;" +
"}" +



 
 /*
	A point light is similar to a lightbulb in that light rays radiate out in all directions.
	Unlike directional lights, point lights attenuate with distance.

	Light light - the light in view space
	vec3 normal - 
	vec3 eye - 
	vec3 ecPos - 
	vec3 ambient - 
	vec3 diffuse -
	vec3 specular -  
	float shininess - 
 */
"void c3dl_PointLight(	in Light light, in vec3 normal, in vec3 eye, in vec3 ecPos, " +
"						inout vec3 ambient, inout vec3 diffuse, inout vec3 specular, " +
"						float shininess)" +
"{" +
	// get the vector from the current vertex to the light's position.
"	vec3 VP = vec3(light.position) - ecPos;" +

	// amount of shininess
"	float pf;" +	

	// vector midway between VP and eye
"	vec3 halfVector = normalize(VP + eye);" +

	// get the distance from the current vector to the light position
"	float d = length(VP); " + 

	// normalize the light so it can be used in the dot product operation.
"	VP = normalize(VP);" + 

	// calculate the attenuation
"	float attenuation = 1.0 / (light.attenuation1 + (light.attenuation2 * d) + (light.attenuation3 * d * d));" + 

"	float nDotVP = max(0.0, dot(normal, VP));"+ 
"	float nDotHV = max(0.0, dot(normal, halfVector));" +

	//
"	if(nDotVP == 0.0){" +
"		pf = 0.0;" +
"	}" +
"	else{"+
"		pf = pow(nDotHV, shininess);" +
"	}" +

	// similar to the directional light, except we apply attenuation.
"	ambient += light.ambient * attenuation;" + 
"	diffuse += light.diffuse * nDotVP * attenuation;" + 
"	specular += light.specular * pf * attenuation;" +
"}" +


/*
	Light light - the light in view space
	vec3 normal - 
	vec3 ambient - 
	vec3 diffuse - 
	vec3 specular - 
	float shininess - 
*/
"void c3dl_DirectionalLight(in Light light, in vec3 normal, " +
"							inout vec3 ambient, inout vec3 diffuse, inout vec3 specular," +
"							float shininess)" +
"{" +

	// we have to flip the direction because the script tells the shader 
	// where the light is coming FROM. We have to specify what direction the light
	// is infinately towards.
"	vec3 VP = normalize(vec3(-light.position));" +

"	float powerfactor;" +

"	float nDotVP = max(0.0, dot(normal, VP));" + 
"	float nDotHV = nDotVP;" +

"	if(nDotVP == 0.0){" +
"		powerfactor = 0.0;" +
"	}" +
"	else{"+
"		powerfactor = pow(nDotHV, shininess);" +
"	}" +

"	ambient += light.ambient;" + 
"	diffuse += light.diffuse * nDotVP;" +
"	specular += light.specular * powerfactor;" +
"} ";
