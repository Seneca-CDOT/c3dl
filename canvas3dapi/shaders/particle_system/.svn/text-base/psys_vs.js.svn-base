/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.psys_vs = 

"attribute vec3 Vertex;" + 
"attribute vec2 Texture;" + 

"uniform vec4 Color;" +
"uniform mat4 modelViewProjMatrix;" +
"uniform mat4 rot;" +

"void main(void){" +

"	gl_FrontColor = Color;" + 
"	gl_Position = modelViewProjMatrix * vec4( Vertex, 1.0);" +
"	gl_TexCoord[0] = rot * vec4(Texture.s - 0.5, Texture.t - 0.5, 1.0, 1.0);" + 
" gl_TexCoord[0].s += 0.5;" +
" gl_TexCoord[0].t += 0.5;" +
"}";
