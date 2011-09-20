/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.CustomPlane = c3dl.inherit(c3dl.Shape, function (vertArry) {
  c3dl._superc(this);
  this.boundingVolume.centered = false;
  this.primitiveSets[0] = new c3dl.PrimitiveSet();
  this.primitiveSets[0].fillType = "TRIANGLE_FAN";
  if (arguments.length == 1) {
    var vertices = new C3DL_FLOAT_ARRAY(vertArry.length/2*3);
    var normals = new C3DL_FLOAT_ARRAY(vertArry.length/2*3);
    var texCoords = new C3DL_FLOAT_ARRAY(vertArry.length);
    var xVerts = [], zVerts= [];
    if (this.isClockWise(vertArry)) {
      var normal = [0,1,0];
    }
    else {
      var normal = [0,-1,0];
    }
    for (var i = 0, j=0; i < vertArry.length; i+=2,j+=3) {
      vertices[j] = vertArry[i];
      vertices[j+1] = 0;
      vertices[j+2] = vertArry[i+1];
      normals[j] = normal[0];
      normals[j+1] = normal[1];
      normals[j+2] = normal[2];
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
    this.boundingVolume.init(vertices);
  }
});

c3dl.CustomPlane.prototype.isClockWise = function (verts) {
  var i,j,k;
  var count = 0;
  var z;
  var poly = [];
  for (i=0, j = 0; i < verts.length;i+=2, j++) {
    poly[j] = [];
    poly[j][0] = verts[i];
    poly[j][1] = verts[i+1];
  }
  for (i=0;i<poly.length;i++) {
    j = (i + 1) % poly.length;
    k = (i + 2) % poly.length;
    z = (poly[j][0] - poly[i][0]) * (poly[k][1] - poly[j][1]);
    z -= (poly[j][1] - poly[i][1]) * (poly[k][0] - poly[j][0]);
    if (z < 0) {
      count--;
    }
    else if (z > 0) {
      count++;
    }
  }
  if (count > 0) {
    return false;
  }
  return true;
}

c3dl.CustomPlane.prototype.getCopy = function () {
  var Shape = new c3dl.CustomPlane();
  Shape.clone(this);
  return Shape;
}
c3dl.CustomPlane.prototype.clone = function (other) {
  c3dl._super(this, arguments, "clone");
  this.boundingVolume = other.boundingVolume.getCopy();
  this.primitiveSets[0] = other.primitiveSets[0].getCopy();
  this.shape = other.shape.getCopy();
}
 