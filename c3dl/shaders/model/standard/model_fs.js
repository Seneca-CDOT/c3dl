/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.model_fs = 

"#ifdef GL_ES\n" +
"precision highp float;\n" +
"#endif\n" +

"varying vec4 frontColor;" +

"uniform sampler2D myTex;" + 
"uniform int usingTexture;" +
"varying vec4 texCoord;" +

"void main(void) {" + 
//"	if(gl_FrontFacing == false){discard;}" +
	// if the current object being rendered has a texture, use the texel which has the 
	// texture color.  Otherwise we only take the frontColor into account.
"	if( usingTexture == 1 ){" +
"		vec3 texel = vec3(texture2D(myTex, texCoord.xy));" +
"		gl_FragColor = vec4(texel, 1.0) * frontColor;" + 
"	}" + 
"	else" + 
"	{" + 
"		gl_FragColor = frontColor;" +
"	}" + 
"}";
