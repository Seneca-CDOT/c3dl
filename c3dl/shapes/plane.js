/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.Plane = c3dl.inherit(c3dl.Shape, function (length, width) {
  c3dl._superc(this);
  this.primitiveSets[0] = new c3dl.PrimitiveSet();
  var vertices = new C3DL_FLOAT_ARRAY([-0.5,0,-0.5, -0.5,0,0.5, 0.5,0,-0.5, 0.5,0,0.5, 0.5,0,-0.5, -0.5,0,0.5]);
  var normals = new C3DL_FLOAT_ARRAY([0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0]);
  var texCoords = new C3DL_FLOAT_ARRAY([0,0, 0,1, 1,0, 1,1, 1,0, 0,1, 0,0, 0,0, 0,0]);
  this.primitiveSets[0].init(vertices, normals, texCoords);
  this.boundingVolume.init(vertices);
  if (arguments.length == 2) {
    this.init(length,width)
  }
});

c3dl.Plane.prototype.init = function (length, width) {
  length = parseFloat(length);
  width = parseFloat(width);
  var curlength = 1;
  var curwidth = 1;
  var scaleVec = [];
  var vecL, vecW, vecH;
  if (curlength > length) {
    vecL = (1 / (curlength / length));
  }
  else if (curlength < length) {
    vecL = length / curlength;
  }
  else {
    vecL = 1;
  }
  if (curwidth > width) {
    vecW = (1 / (curwidth / width));
  }
  else if (curwidth < width) {
    vecW = (width / curwidth);
  }
  else {
    vecW = 1;
  }
  scaleVec = [vecL, 1, vecW];
  this.shape.scale(scaleVec);
  this.boundingVolume.set(this.shape.pos,this.shape.getRotateMat(),this.shape.scaleVec);
}

 
