/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.cartoon_fs = 

"uniform sampler2D myTex;" + 
"uniform sampler2D celShadeTex;" + 
"uniform int usingTexture;" +
"varying vec4 texCoord;" +

"varying vec3 norm;" +
"varying vec3 pos;" +

/*
	light
	fragPos
	normal
	intensity
*/
"void c3dl_celPointLight(in Light light, in vec3 fragPos, in vec3 normal, inout float intensity)"+
"{" +
"  vec3 rayDir = vec3(light.position) - fragPos;" +
"  intensity += max(dot(normalize(rayDir),normal),0.0);" +
"}" +

/*
	light
	normal
	intensity
*/
"void c3dl_celDirLight(in Light light, in vec3 normal, inout float intensity)"+
"{" +
"  intensity += max(dot(normalize(vec3(-light.position)),normal), 0.0);" +
"}" +

/*
	light
	fragPos
	normal
	intensity
*/
"void c3dl_celSpotLight(in Light light, in vec3 fragPos, in vec3 normal, inout float intensity)" +
"{" +

	// ray direction goes from light position to fragment.
"  vec3 rayDir = fragPos - vec3(light.position);" +
"  rayDir = normalize(rayDir);" +
"  float spotDot = dot(rayDir, normalize(light.spotDirection));" +

	// if the fragment is within the cone
	// don't light up the back side of the object
"  if( dot(-normal, rayDir ) > 0.0 && spotDot > cos(radians(light.spotCutoff)) )" +
"  {" +
"    intensity += max(dot(-normal, rayDir), 0.0);" +
"  }" +
"}" +

/*
*/
"void main(void)" +
"{" + 

"  if(lightingOn == false)" +
"  {" +
"    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);" +
"  }" +
"  else" +
"  {" +
"    vec3 n = normalize(norm);" +
"    vec4 color = vec4(1.0, 1.0, 1.0, 1.0);" +

"    if( usingTexture == 1 )" +
"    {" +
"      vec3 texel = vec3(texture2D(myTex, texCoord.xy));" +
"      color = vec4(texel, 1.0);" + 
"    }" + 

"    float intensity = 0.0;" +

     // iterate over all the lights, and keep incrementing color values
     // the color values are passed by reference and modified.
"    for(int i = 0; i < C3DL_MAX_LIGHTS; i++)" +
"    {" +
"      if(lights[i].isOn == true) " +
"      {" +
"        if(lights[i].type == 1)" +
"        {" +
"          c3dl_celDirLight(lights[i], n, intensity);" +
"        }" +

"       else if(lights[i].type == 2)" +
"       {" +
"         c3dl_celPointLight(lights[i], pos, n, intensity);" +
"       }" +

"       else" + 
"       {" +
"         c3dl_celSpotLight(lights[i], pos, n, intensity);" +
"       }" +
"     }" +
"   }" +

     // The texture wrapping wasn't set, so make sure 
     // we don't sample a wrong value.
"    intensity = clamp(intensity, 0.1, 0.9);" +

"    vec3 celTexel = vec3(texture2D(celShadeTex, vec2(intensity, 0.0)));" +
"    gl_FragColor = color * vec4(celTexel, 1.0);" +
"  }" +
"}";
