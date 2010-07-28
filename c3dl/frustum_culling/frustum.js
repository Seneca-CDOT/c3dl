function Frustum(frustumMatrix) {
  this.frustumPlane = [];
  //right
  this.frustumPlane[0] = new Plane();
  this.frustumPlane[0].normal[0]=frustumMatrix[3]-frustumMatrix[0];
  this.frustumPlane[0].normal[1]=frustumMatrix[7]-frustumMatrix[4];
  this.frustumPlane[0].normal[2]=frustumMatrix[11]-frustumMatrix[8];
  this.frustumPlane[0].offset=frustumMatrix[15]-frustumMatrix[12];
  //left
  this.frustumPlane[1] = new Plane();
  this.frustumPlane[1].normal[0]=frustumMatrix[3]+frustumMatrix[0];
  this.frustumPlane[1].normal[1]=frustumMatrix[7]+frustumMatrix[4];
  this.frustumPlane[1].normal[2]=frustumMatrix[11]+frustumMatrix[8];
  this.frustumPlane[1].offset=frustumMatrix[15]+frustumMatrix[12];
  //bottom
  this.frustumPlane[2] = new Plane();
  this.frustumPlane[2].normal[0]=frustumMatrix[3]+frustumMatrix[1];
  this.frustumPlane[2].normal[1]=frustumMatrix[7]+frustumMatrix[5];
  this.frustumPlane[2].normal[2]=frustumMatrix[11]+frustumMatrix[9];
  this.frustumPlane[2].offset=frustumMatrix[15]+frustumMatrix[13];
  //top
  this.frustumPlane[3] = new Plane();
  this.frustumPlane[3].normal[0]=frustumMatrix[3]-frustumMatrix[1];
  this.frustumPlane[3].normal[1]=frustumMatrix[7]-frustumMatrix[5];
  this.frustumPlane[3].normal[2]=frustumMatrix[11]-frustumMatrix[9];
  this.frustumPlane[3].offset=frustumMatrix[15]-frustumMatrix[13];
  //far
  this.frustumPlane[4] = new Plane();
  this.frustumPlane[4].normal[0]=frustumMatrix[3]-frustumMatrix[2];
  this.frustumPlane[4].normal[1]=frustumMatrix[7]-frustumMatrix[6];
  this.frustumPlane[4].normal[2]=frustumMatrix[11]-frustumMatrix[10];
  this.frustumPlane[4].offset=frustumMatrix[15]-frustumMatrix[14] ;
  //near
  this.frustumPlane[5] = new Plane();
  this.frustumPlane[5].normal[0]=frustumMatrix[3]+frustumMatrix[2];
  this.frustumPlane[5].normal[1]=frustumMatrix[7]+frustumMatrix[6];
  this.frustumPlane[5].normal[2]=frustumMatrix[11]+frustumMatrix[10];
  this.frustumPlane[5].offset=frustumMatrix[15]+frustumMatrix[14];
  for(var j=0; j<6; j++) {
    this.frustumPlane[j].normalize();
  }		
  this.sphereInFrustum = function(boundingSphere) {
    for(var i = 0; i < 6; i++) {
	  var pos = boundingSphere.getPosition();					
	  var d = this.frustumPlane[i].normal[0] * pos[0] + this.frustumPlane[i].normal[1]* pos[1] +
              this.frustumPlane[i].normal[2]* pos[2] + this.frustumPlane[i].offset;
	  if(d <=-boundingSphere.getRadius()) {
		return "OUTSIDE"; 
	  }
    }
    return "INSIDE";
  } 
  this.boundingBoxInfrustumPlane= function(pos, size)
  {
    for(var i = 0; i < 6; i++ )
    {
      if( this.frustumPlane[i].normal[0] * (pos[0] - size) + this.frustumPlane[i].normal[1] * (pos[1] - size) + this.frustumPlane[i].normal[2] * (pos[2] - size) + this.frustumPlane[i].offset < 0 )
        return "OUTSIDE";
      if( this.frustumPlane[i].normal[0] * (pos[0] + size) + this.frustumPlane[i].normal[1] * (pos[1] - size) + this.frustumPlane[i].normal[2] * (pos[2] - size) + this.frustumPlane[i].offset < 0 )
        return "OUTSIDE";
      if( this.frustumPlane[i].normal[0] * (pos[0] - size) + this.frustumPlane[i].normal[1] * (pos[1] + size) + this.frustumPlane[i].normal[2] * (pos[2] - size) + this.frustumPlane[i].offset < 0 )
        return "OUTSIDE";
      if( this.frustumPlane[i].normal[0] * (pos[0] + size) + this.frustumPlane[i].normal[1] * (pos[1] + size) + this.frustumPlane[i].normal[2] * (pos[2] - size) + this.frustumPlane[i].offset < 0 )
        return "OUTSIDE";
      if( this.frustumPlane[i].normal[0] * (pos[0] - size) + this.frustumPlane[i].normal[1] * (pos[1] - size) + this.frustumPlane[i].normal[2] * (pos[2] + size) + this.frustumPlane[i].offset < 0 )
        return "OUTSIDE";
      if( this.frustumPlane[i].normal[0] * (pos[0] + size) + this.frustumPlane[i].normal[1] * (pos[1] - size) + this.frustumPlane[i].normal[2] * (pos[2] + size) + this.frustumPlane[i].offset < 0 )
        return "OUTSIDE";
      if( this.frustumPlane[i].normal[0] * (pos[0] - size) + this.frustumPlane[i].normal[1] * (pos[1] + size) + this.frustumPlane[i].normal[2] * (pos[2] + size) + this.frustumPlane[i].offset < 0 )
        return "OUTSIDE";
      if( this.frustumPlane[i].normal[0] * (pos[0] + size) + this.frustumPlane[i].normal[1] * (pos[1] + size) + this.frustumPlane[i].normal[2] * (pos[2] + size) + this.frustumPlane[i].offset < 0 )
        return "OUTSIDE";
    }
    return "INSIDE";
  }
}