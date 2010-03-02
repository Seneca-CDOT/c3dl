/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.greyscale_fs = 

"uniform sampler2D myTex;" + 
"uniform int usingTexture;" + 
"uniform vec3 color;" +

"void main(void) {" + 
//"	if(gl_FrontFacing == false){discard;}" +
"	vec4 col = gl_Color;" +

	// if the current object being rendered has a texture, use the texel which has the 
	// texture color.  Otherwise we only take the gl_Color into account.
"	if( usingTexture == 1 ){" +

"		vec3 texel = vec3(texture2D(myTex, gl_TexCoord[0].xy));" +
"		col *= vec4(texel,1.0);" + 

"	}" + 

"	float grey = dot(col.rgb, color);" +
"	gl_FragColor = vec4(grey,grey,grey, 1.0);" +
"}";
