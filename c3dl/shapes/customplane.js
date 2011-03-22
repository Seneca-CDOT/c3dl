/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.CustomPlane = c3dl.inherit(c3dl.Shape, function (vertArry) {
  c3dl._superc(this);
  this.primitiveSets[0] = new c3dl.PrimitiveSet();
  var vertices = new C3DL_FLOAT_ARRAY(vertArry.length/2*3);
  var normals = new C3DL_FLOAT_ARRAY(vertArry.length/2*3);
  var texCoords = new C3DL_FLOAT_ARRAY(vertArry.length);
  var xVerts = [], zVerts= [];
  for (var i = 0, j=0; i < vertArry.length; i+=2,j+=3) {
    vertices[j] = vertArry[i];
    vertices[j+1] = 0;
    vertices[j+2] = vertArry[i+1];
    normals[j] = 0;
    normals[j+1] = 1;
    normals[j+2] = 0;
    xVerts[i] = vertices[j];
    zVerts[i] = vertices[j+2];
  }
   
  var xMax = c3dl.findMax(xVerts); 
  var xMin = c3dl.findMin(xVerts);
  var zMax = c3dl.findMax(zVerts); 
  var zMin = c3dl.findMin(zVerts); 
  var xLen = xMax - xMin;
  var zLen = zMax - zMin;
  for (var i = 0; i < vertArry.length; i+=2) {
    texCoords[i] = (xMin - xVerts[i])/-xLen;
    texCoords[i+1] = (zVerts[i] - zMin)/zLen;
  }
  this.primitiveSets[0].init(vertices, normals, texCoords);
  this.primitiveSets[0].fillType = "TRIANGLE_FAN";
  this.boundingVolume.init(vertices);
});


 