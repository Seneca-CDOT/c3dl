/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

c3dl.Sphere = c3dl.inherit(c3dl.Shape, function (radius, sphereDetailU, sphereDetailV) {
  c3dl._superc(this);
  this.primitiveSets[0] = new c3dl.PrimitiveSet();
  this.sinLUT = new Array(c3dl.SINCOS_LENGTH);
  this.cosLUT = new Array(c3dl.SINCOS_LENGTH);
  for (var i = 0; i < c3dl.SINCOS_LENGTH; i++) {
    this.sinLUT[i] = Math.sin(i * (Math.PI / 180) * 0.5);
    this.cosLUT[i] = Math.cos(i * (Math.PI / 180) * 0.5);
  }
  if (arguments.length == 3) {
    this.sphereDetail(parseInt(sphereDetailU),parseInt(sphereDetailV));
  }
  else {
    this.sphereDetail(32,32);
  }
  var sphereArray = [], texCoords = [];
  var sectionX = 1/this.sphereDetailU;
  var sectionY = 1/this.sphereDetailV;
  var i;
  for (i = 0; i < this.sphereDetailU; i++) {
    sphereArray.push(0);
    sphereArray.push(-1);
    sphereArray.push(0);
    sphereArray.push(this.sphereX[i]);
    sphereArray.push(this.sphereY[i]);
    sphereArray.push(this.sphereZ[i]);
    texCoords.push(1-sectionX*i);
    texCoords.push(1.0);
    texCoords.push(1-sectionX*i);
    texCoords.push(sectionY*(this.sphereDetailV-1));
  }
  sphereArray.push(0);
  sphereArray.push(-1);
  sphereArray.push(0);
  sphereArray.push(this.sphereX[0]);
  sphereArray.push(this.sphereY[0]);
  sphereArray.push(this.sphereZ[0]);
  texCoords.push(1-sectionX*this.sphereDetailU);
  texCoords.push(1.0);
  texCoords.push(1-sectionX*this.sphereDetailU);
  texCoords.push(sectionY*(this.sphereDetailV-1));

  var v1, v11, v2;
  
  // middle rings
  var voff = 0;
  var toff = 0;
  for (i = 2; i < this.sphereDetailV; i++) {
    v1 = v11 = voff;
    voff += this.sphereDetailU;
    v2 = voff;
    for (var j = 0; j < this.sphereDetailU; j++) {
      sphereArray.push(parseFloat(this.sphereX[v1]));
      sphereArray.push(parseFloat(this.sphereY[v1]));
      sphereArray.push(parseFloat(this.sphereZ[v1++]));
      sphereArray.push(parseFloat(this.sphereX[v2]));
      sphereArray.push(parseFloat(this.sphereY[v2]));
      sphereArray.push(parseFloat(this.sphereZ[v2++]));
      texCoords.push(1-sectionX*j);
      texCoords.push(1-sectionY*(i-1));
      texCoords.push(1-sectionX*j);
      texCoords.push(1-sectionY*i);      
    }
    // close each ring
    v1 = v11;
    v2 = voff;
    sphereArray.push(parseFloat(this.sphereX[v1]));
    sphereArray.push(parseFloat(this.sphereY[v1]));
    sphereArray.push(parseFloat(this.sphereZ[v1++]));
    sphereArray.push(parseFloat(this.sphereX[v2]));
    sphereArray.push(parseFloat(this.sphereY[v2]));
    sphereArray.push(parseFloat(this.sphereZ[v2++]));
    texCoords.push(1-sectionX*j);
    texCoords.push(1-sectionY*(i-1));
    texCoords.push(1-sectionX*j);
    texCoords.push(1-sectionY*i);  
  }
  // add the northern cap
  for (i = 0; i < this.sphereDetailU; i++) {
    v2 = voff + i;
    sphereArray.push(parseFloat(this.sphereX[v2]));
    sphereArray.push(parseFloat(this.sphereY[v2]));
    sphereArray.push(parseFloat(this.sphereZ[v2]));
    sphereArray.push(0);
    sphereArray.push(1);
    sphereArray.push(0);
    texCoords.push(1-sectionX*i);
    texCoords.push(1-sectionY*(this.sphereDetailV-1));
    texCoords.push(1-sectionX*i);
    texCoords.push(1-sectionY*this.sphereDetailV);
  }
  sphereArray.push(parseFloat(this.sphereX[voff]));
  sphereArray.push(parseFloat(this.sphereY[voff]));
  sphereArray.push(parseFloat(this.sphereZ[voff]));
  sphereArray.push(0);
  sphereArray.push(1);
  sphereArray.push(0);
  texCoords.push(1-sectionX*this.sphereDetailU);
  texCoords.push(1-sectionY*(this.sphereDetailV-1));
  texCoords.push(1-sectionX*this.sphereDetailU);
  texCoords.push(1-sectionY*this.sphereDetailV);
    
  var vertices = new C3DL_FLOAT_ARRAY(sphereArray);
  var normals = new C3DL_FLOAT_ARRAY(sphereArray);
  texCoords = new C3DL_FLOAT_ARRAY(texCoords);
  this.primitiveSets[0].init(vertices, normals, texCoords);
  this.primitiveSets[0].fillType = "TRIANGLE_STRIP";
  this.boundingVolume.init(vertices);
  this.scale([0.5,0.5,0.5]);
  this.init(radius)
});

c3dl.Sphere.prototype.init = function (raduis) {
  raduis = parseFloat(raduis);
  var curRaduis = 1;
  var scaleVec = [];
  var scale;
  if (curRaduis > raduis) {
    scale = (1 / (curRaduis / raduis));
  }
  else if (curRaduis < raduis) {
    scale = raduis / curRaduis;
  }
  else {
    scale = 1;
  }
  scaleVec = [scale, scale, scale];
  this.shape.scale(scaleVec);
  this.boundingVolume.set(this.shape.pos,this.shape.getRotateMat(),this.shape.scaleVec);
}

 
c3dl.Sphere.prototype.sphereDetail = function sphereDetail(ures, vres) {
  var i;
  if (arguments.length === 1) {
    ures = vres = arguments[0];
  }

      if (ures < 3) {
        ures = 3;
      } // force a minimum res
      if (vres < 2) {
        vres = 2;
      } // force a minimum res
      // if it hasn't changed do nothing
      if ((ures === this.sphereDetailU) && (vres === this.sphereDetailV)) {
        return;
      }

      var delta = c3dl.SINCOS_LENGTH / ures;
      var cx = new Array(ures);
      var cz = new Array(ures);
      // calc unit circle in XZ plane
      for (i = 0; i < ures; i++) {
        cx[i] = this.cosLUT[parseInt((i * delta) % c3dl.SINCOS_LENGTH, 10)];
        cz[i] = this.sinLUT[parseInt((i * delta) % c3dl.SINCOS_LENGTH, 10)];
      }

      // computing vertexlist
      // vertexlist starts at south pole
      var vertCount = ures * (vres - 1) + 2;
      var currVert = 0;

      // re-init arrays to store vertices
      this.sphereX = new C3DL_FLOAT_ARRAY(vertCount);
      this.sphereY = new C3DL_FLOAT_ARRAY(vertCount);
      this.sphereZ = new C3DL_FLOAT_ARRAY(vertCount);

      var angle_step = (c3dl.SINCOS_LENGTH * 0.5) / vres;
      var angle = angle_step;

      // step along Y axis
      for (i = 1; i < vres; i++) {
        var curradius = this.sinLUT[parseInt(angle % c3dl.SINCOS_LENGTH, 10)];
        var currY = -this.cosLUT[parseInt(angle % c3dl.SINCOS_LENGTH, 10)];
        for (var j = 0; j < ures; j++) {
          this.sphereX[currVert] = cx[j] * curradius;
          this.sphereY[currVert] = currY;
          this.sphereZ[currVert++] = cz[j] * curradius;
        }
        angle += angle_step;
      }
      this.sphereDetailU = ures;
      this.sphereDetailV = vres;
    };