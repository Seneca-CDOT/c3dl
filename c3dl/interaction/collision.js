c3dl.CollisionDetection = function () {	
  this.checkObjectCollision= function(obj1, obj2,timeElapsed, collisionType) {
    this.obj1 = obj1;
    this.obj2 = obj2;
    var bv1= obj1.getBoundingVolume();
    var bv2= obj2.getBoundingVolume();
    var collision = this.sphereCollision(bv1,bv2);
    if (collision) {
     collision = this.aabbaabbCollision(bv1.aabb,bv2.aabb);
    }
    if (collision) {
      collision = this.obbobbCollision(bv1,bv2);
    }
    if (collision && collisionType == "Geometry") {
      var obj1bvs = obj1.getBoundingVolumes();
      var obj2bvs = obj2.getBoundingVolumes();
      for (var i = 0, len = obj1bvs.length; i < len; i++) { 
        for (var j = 0, len2 = obj2bvs.length; j < len2; j++) {
          collision= this.sphereCollision(obj1bvs[i],obj2bvs[j],timeElapsed);
          if (collision) {
            collision = this.aabbaabbCollision(obj1bvs[i].aabb,obj2bvs[j].aabb);
          }
          if (collision) {
            collision = this.obbobbCollision(obj1bvs[i],obj2bvs[j]);
          }
          if (collision) {
            return collision;
          }
        }
      }
    }
    return collision;
  }
  this.sphereCollision = function(obj1, obj2,timeElapsed) {
    //relative motion of sphere1 with respect to sphere0
    var v = c3dl.subtractVectors(this.obj2.getLinearVel(), this.obj1.getLinearVel());  
    //vector between sphere center
    var s = c3dl.subtractVectors(obj2.getPosition(), obj1.getPosition());     
    //sum of radii
    var r = obj1.getRadius()+ obj2.getRadius();
    //(1)Check if the spheres are already intersecting
    var c = c3dl.vectorDotProduct(s, s) - r * r;
    if ( c < 0 ) {
      return true;
    }  
    //(2)Check if the spheres are moving away from each other
    var b = c3dl.vectorDotProduct(v, s);
    if ( b >= 0 ) {
      return false;
    }     
    //(3)Check if the spheres can intersect within 1 frame
    var a = c3dl.vectorDotProduct(v, v);
    var d = b * b - a * c;
    if ( d < 0) {
      return false;
    }
    var t = (-b - Math.sqrt(d))/ a;
    if (t < timeElapsed) {
        return true;
    }
  } 
  this.aabbaabbCollision = function (objA, objB) {
    if (objA.maxMins[0]  < objB.maxMins[1] || objA.maxMins[1]  > objB.maxMins[0]) {
      return false
    }
    if (objA.maxMins[2]  < objB.maxMins[3] || objA.maxMins[3]  > objB.maxMins[2]) {
      return false
    }
    if (objA.maxMins[4]  < objB.maxMins[5] || objA.maxMins[5]  > objB.maxMins[4]) {
      return false
    }
    return true;
  }
  
  this.obbobbCollision = function (objA, objB) {
    var aCenter = objA.getPosition();
    var aAxis = objA.getAxis();
    var aSize = objA.getSizeInAxis();
    
    var bCenter = objB.getPosition();
    var bAxis = objB.getAxis();
    var bSize = objB.getSizeInAxis();
    
    var ra, rb;
    var R = [];
    var absR = [];
    for (var i = 0; i <3;i++) {
      R[i] = [];
      absR[i] = [];
    }

    for (var i = 0; i <3;i++) {
      for (var j = 0; j <3;j++) {
        R[i][j]= c3dl.vectorDotProduct(aAxis[i], bAxis[j])
      }
    }

    var t = c3dl.subtractVectors(bCenter,aCenter);
    t = [c3dl.vectorDotProduct(t,aAxis[0]),c3dl.vectorDotProduct(t,aAxis[1]),c3dl.vectorDotProduct(t,aAxis[2])];
    for (var i = 0; i <3;i++) {
      for (var j = 0; j <3;j++) {
        absR[i][j]= Math.abs(R[i][j]);
      }
    }
    
    for (var i = 0; i <3;i++) {
      ra = aSize[i];
      rb = bSize[0] * absR[i][0] + bSize[1] * absR[i][1] + bSize[2] * absR[i][2];
      if (Math.abs(t[i]) > ra + rb) {
        return false;
      }
    }
   
    for (var i = 0; i <3;i++) {
      ra = aSize[0] * absR[0][i] + aSize[1] * absR[1][i] + aSize[2] * absR[2][i];
      rb = bSize[i];
      if (Math.abs(t[0] * R[0][i] + t[1] * R[1][i] + t[2] * R[2][i]) > ra + rb) {
        return false;
      }
    }
    //
    ra = aSize[1] * absR[2][0] + aSize[2] * absR[1][0];
    rb = bSize[1] * absR[0][2] + bSize[2] * absR[0][1];
    if (Math.abs(t[2] * R[1][0] - t[1] * R[2][0]) > ra + rb) {
      return false;
    }
    
    ra = aSize[1] * absR[2][1] + aSize[2] * absR[1][1];
    rb = bSize[0] * absR[0][2] + bSize[2] * absR[0][0];
    if (Math.abs(t[2] * R[1][1] - t[1] * R[2][1]) > ra + rb) {
      return false;
    }
    
    ra = aSize[1] * absR[2][2] + aSize[2] * absR[1][2];
    rb = bSize[0] * absR[0][1] + bSize[1] * absR[0][0];
    if (Math.abs(t[2] * R[1][2] - t[1] * R[2][2]) > ra + rb) {
      return false;
    }
    
    ra = aSize[0] * absR[2][0] + aSize[2] * absR[0][0];
    rb = bSize[1] * absR[1][2] + bSize[2] * absR[1][1];
    if (Math.abs(t[0] * R[2][0] - t[2] * R[0][0]) > ra + rb) {
      return false;
    }
    
    ra = aSize[0] * absR[2][1] + aSize[2] * absR[0][1];
    rb = bSize[0] * absR[1][2] + bSize[2] * absR[1][0];
    if (Math.abs(t[0] * R[2][1] - t[2] * R[0][1]) > ra + rb) {
      return false;
    }
    
    ra = aSize[0] * absR[2][2] + aSize[2] * absR[0][2];
    rb = bSize[0] * absR[1][1] + bSize[1] * absR[1][0];
    if (Math.abs(t[0] * R[2][2] - t[2] * R[0][2]) > ra + rb) {
      return false;
    }
    
    ra = aSize[0] * absR[1][0] + aSize[1] * absR[0][0];
    rb = bSize[1] * absR[2][2] + bSize[2] * absR[2][1];
    if (Math.abs(t[1] * R[0][0] - t[0] * R[1][0]) > ra + rb) {
      return false;
    }
    
    ra = aSize[0] * absR[1][1] + aSize[1] * absR[0][1];
    rb = bSize[0] * absR[2][2] + bSize[2] * absR[2][0];
    if (Math.abs(t[1] * R[0][1] - t[0] * R[1][1]) > ra + rb) {
      return false;
    }
    
    ra = aSize[0] * absR[1][2] + aSize[1] * absR[0][2];
    rb = bSize[0] * absR[2][1] + bSize[1] * absR[2][0];
    if (Math.abs(t[1] * R[0][2] - t[0] * R[1][2]) > ra + rb) {
      return false;
    }
    return true;
  }
}