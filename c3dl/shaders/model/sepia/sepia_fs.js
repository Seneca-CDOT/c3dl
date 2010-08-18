/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.sepia_fs = 

"#ifdef GL_ES\n" +
"precision highp float;\n" +
"#endif\n" +

"uniform sampler2D myTex;" + 
"uniform int usingTexture;" +
"varying vec4 texCoord;" +

"uniform vec3 color;" +
"varying vec4 frontColor;" +

"void main(void) {" + 
//"	if(gl_FrontFacing == false){discard;}" +
"	vec4 col = frontColor;" +

	// if the current object being rendered has a texture, use the texel which has the 
	// texture color.  Otherwise we only take the frontColor into account.
"	if( usingTexture == 1 ){" +

"		vec3 texel = vec3(texture2D(myTex, texCoord.xy));" +
"		col *= vec4(texel,1.0);" + 

"	}" + 

"	float grey = dot(col.rgb, vec3(0.3, 0.6, 0.1));" +
"	gl_FragColor = vec4(grey * color, 1.0);" +
"}";
