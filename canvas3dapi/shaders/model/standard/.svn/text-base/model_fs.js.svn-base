/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.model_fs = 

"uniform sampler2D myTex;" + 
"uniform int usingTexture;" +

"void main(void) {" + 
//"	if(gl_FrontFacing == false){discard;}" +
	// if the current object being rendered has a texture, use the texel which has the 
	// texture color.  Otherwise we only take the gl_Color into account.
"	if( usingTexture == 1 ){" +

"		vec3 texel = vec3(texture2D(myTex, gl_TexCoord[0].xy));" +
"		gl_FragColor = vec4(texel,1.0) * gl_Color;" + 

"	}" + 
"	else" + 
"	{" + 
"		gl_FragColor = gl_Color;" +
"	}" + 
"}";
