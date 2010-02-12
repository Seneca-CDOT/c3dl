/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.material_vs = 

//
//
"struct Material" +
"{" +
"	vec3 emission;" +
"	vec3 ambient;" +
"	vec3 diffuse;" +
"	vec3 specular;" +

"	float shininess;" +
"};" +

//
"uniform Material material;" +

//
"uniform bool usingMaterial;";
