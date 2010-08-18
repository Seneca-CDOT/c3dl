/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.psys_vs = 

"varying vec4 frontColor;" +
"varying vec4 texCoord;" +

"attribute vec3 Vertex;" + 
"attribute vec4 Texture;" + 

"uniform vec4 Color;" +
"uniform mat4 modelViewProjMatrix;" +
"uniform mat4 rot;" +

"void main(void){" +

"	frontColor = Color;" + 
"	gl_Position = modelViewProjMatrix * vec4( Vertex, 1.0);" +

"	texCoord = rot * vec4(Texture.x - 0.5, Texture.y - 0.5, 1.0, 1.0);" + 
" texCoord.x += 0.5;" +
" texCoord.y += 0.5;" +
"}";
