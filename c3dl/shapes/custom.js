/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.CustomShape = c3dl.inherit(c3dl.Shape, function () {
  c3dl._superc(this);
  this.primitiveSets[0] = new c3dl.PrimitiveSet();
    if (arguments.length >= 2) {
    var vertices = new C3DL_FLOAT_ARRAY(arguments[0]);
    var normals = new C3DL_FLOAT_ARRAY(arguments[1]);
    this.primitiveSets[0].init(vertices, normals);
    this.boundingVolume.init(vertices);
  }
  if (arguments.length >= 3) {
    var vertices = new C3DL_FLOAT_ARRAY(arguments[0]);
    var normals = new C3DL_FLOAT_ARRAY(arguments[1]);
    var texCoords = new C3DL_FLOAT_ARRAY(arguments[2]);
    this.primitiveSets[0].init(vertices, normals, texCoords);
    this.boundingVolume.init(vertices);
  }
});


 