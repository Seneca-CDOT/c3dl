/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @class c3dl.Frustrum is the area visible to a camera.  Bounded by planes representing the viewable area.
 An object that is not within a camera's frustrum will not be rendered.
 */
c3dl.Frustum = function ()
{
  this.frustumPlane = [];
  for (var i = 0; i < 6; i++)
  {
   this.frustumPlane[i] = new c3dl.Plane_Frustrum();
  }
  
  /**
   Set the intial bounds of the visible area.
   Called Automatically.
   
   @param {Array} frustrumMatrix - The planes representing the boundaries of the frustrum.
   */
  this.init = function(frustumMatrix)
  {
    //right
    this.frustumPlane[0].normal[0]=frustumMatrix[3]-frustumMatrix[0];
    this.frustumPlane[0].normal[1]=frustumMatrix[7]-frustumMatrix[4];
    this.frustumPlane[0].normal[2]=frustumMatrix[11]-frustumMatrix[8];
    this.frustumPlane[0].offset=frustumMatrix[15]-frustumMatrix[12];
    //left
    this.frustumPlane[1].normal[0]=frustumMatrix[3]+frustumMatrix[0];
    this.frustumPlane[1].normal[1]=frustumMatrix[7]+frustumMatrix[4];
    this.frustumPlane[1].normal[2]=frustumMatrix[11]+frustumMatrix[8];
    this.frustumPlane[1].offset=frustumMatrix[15]+frustumMatrix[12];
    //bottom
    this.frustumPlane[2].normal[0]=frustumMatrix[3]+frustumMatrix[1];
    this.frustumPlane[2].normal[1]=frustumMatrix[7]+frustumMatrix[5];
    this.frustumPlane[2].normal[2]=frustumMatrix[11]+frustumMatrix[9];
    this.frustumPlane[2].offset=frustumMatrix[15]+frustumMatrix[13];
    //top
    this.frustumPlane[3].normal[0]=frustumMatrix[3]-frustumMatrix[1];
    this.frustumPlane[3].normal[1]=frustumMatrix[7]-frustumMatrix[5];
    this.frustumPlane[3].normal[2]=frustumMatrix[11]-frustumMatrix[9];
    this.frustumPlane[3].offset=frustumMatrix[15]-frustumMatrix[13];
    //far
    this.frustumPlane[4].normal[0]=frustumMatrix[3]-frustumMatrix[2];
    this.frustumPlane[4].normal[1]=frustumMatrix[7]-frustumMatrix[6];
    this.frustumPlane[4].normal[2]=frustumMatrix[11]-frustumMatrix[10];
    this.frustumPlane[4].offset=frustumMatrix[15]-frustumMatrix[14] ;
    //near
    this.frustumPlane[5].normal[0]=frustumMatrix[3]+frustumMatrix[2];
    this.frustumPlane[5].normal[1]=frustumMatrix[7]+frustumMatrix[6];
    this.frustumPlane[5].normal[2]=frustumMatrix[11]+frustumMatrix[10];
    this.frustumPlane[5].offset=frustumMatrix[15]+frustumMatrix[14];
    for(var j=0; j<6; j++)
    {
      this.frustumPlane[j].normalize();
    }  
  }
  
  /**
   Determines if an object's boundingSphere is inside the frustrum.

   @param {BoundigngSphere} boundingSphere - The sphere to check for being inside the frustrum.

   @returns {boolean} True if the passed sphere is inside the frustrum, false otherwise.
  */
  this.sphereInFrustum = function(boundingSphere)
  {
    for(var i = 0; i < 6; i++)
    {
      var pos = boundingSphere.getPosition();          
      var d = this.frustumPlane[i].normal[0] * pos[0] + this.frustumPlane[i].normal[1]* pos[1] +
                this.frustumPlane[i].normal[2]* pos[2] + this.frustumPlane[i].offset;
      if(d <=-boundingSphere.getRadius())
      {
        return false; 
      }
    }
    return true;
  } 
  
  /**
   Determines if an object's bounding box is inside the frustrum.

   @param {OBB} boxVerts - The bounding box to check for being inside the frustrum.

   @returns {boolean} True if the passed box is inside the frustrum, false otherwise.
  */
  this.obbInfrustum= function(boxVerts)
  {
    for(var i = 0; i < 6; i++)
    {
      var count =8; 
      for(var j = 0; j < 8; j++)
      {
        if(c3dl.vectorDotProduct(this.frustumPlane[i].normal, boxVerts[j]) + this.frustumPlane[i].offset <= 0)
        {
          count--; 
        }
      }
      if (count == 0)
      {
        return false
      }
    }
    return true;  
  }
  
  /**
   Determines if an object's axis-aligned bounding box is inside the frustrum.

   @param {AABB} MaxMins - the bounding box to check for being inside the frustrum.

   @returns {boolean} True if the passed box is inside the frustrum, false otherwise.
  */
  this.aabbInfrustum= function(MaxMins)
  {
    var vmin=[], vmax=[]; 
    for(var i = 0; i < 6; ++i)
    {
      var norm = c3dl.multiplyVector(this.frustumPlane[i].normal,-1,c3dl.vec1);
      // X axis 
      if(norm[0] > 0)
      {
        vmin[0] = MaxMins[1]; 
        vmax[0] = MaxMins[0]; 
      } 
      else
      {
        vmin[0] = MaxMins[0]; 
        vmax[0] = MaxMins[1]; 
      } 

      // Y axis 
      if(norm[1] > 0)
      {
        vmin[1] = MaxMins[3]; 
        vmax[1] = MaxMins[2]; 
      } 
      else
      {
        vmin[1] = MaxMins[2]; 
        vmax[1] = MaxMins[3]; 
      } 

      // Z axis 
      if(norm[2] > 0)
      {
        vmin[2] = MaxMins[5]; 
        vmax[2] = MaxMins[4]; 
      } 
      else
      {
        vmin[2] = MaxMins[4]; 
        vmax[2] = MaxMins[5]; 
      } 

      if(c3dl.vectorDotProduct(norm, vmin) - this.frustumPlane[i].offset > 0)
      {
        return false; 
      }
    }
    return true;  
  }
}
