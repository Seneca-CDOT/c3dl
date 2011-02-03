/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.CustomPlane = c3dl.inherit(c3dl.Shape, function () {
  c3dl._superc(this);
  this.primitiveSets[0] = new c3dl.PrimitiveSet();
  var vertices = new C3DL_FLOAT_ARRAY(arguments[0].length/2*3);
  var normals = new C3DL_FLOAT_ARRAY(arguments[0].length/2*3);
  var axis = [0,1,0];
  if (arguments[1]) {
    if (arguments[1] === "X") {
      axis = [1,0,0];
    }
    else if (arguments[1] === "Y") {
      axis = [0,1,0];
    }
    else if (arguments[1] === "Z") {
      axis = [0,0,1];
    }
  }
  if (arguments[2]) {
    c3dl.multiplyVector(axis, 1, axis);
  }
  for (var i = 0, j=0; i < arguments[0].length; i+=2,j+=3) {
    vertices[j] = arguments[0][i];
    vertices[j+1] = 0;
    vertices[j+2] = arguments[0][i+1];
    normals[j] = axis[0];
    normals[j+1] = axis[1];
    normals[j+2] = axis[2];
  }
  this.primitiveSets[0].init(vertices, normals);
  this.primitiveSets[0].fillType = "TRIANGLE_FAN";
  this.boundingVolume.init(vertices);
});


 