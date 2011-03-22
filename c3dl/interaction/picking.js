/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
  Author: Patrick Lam & Andor Salga
*/

/**
 @private
 @class A Picking class
 */
c3dl.Picking = function (scene)
{
  var scn = scene;
  var cam = scn.getCamera();

  /**
   @private
   Returns an array of 2 elements. The mouse button clicked and an array of object 
   index number in the current scene in sorted order (closet to farthest).
   
   @param {} event
   
   @returns {Array} The mouse button clicked and the array of object index number.
   */
  this.onMouseDown = function (event)
  {
    // user may have switched the camera or the user may have moved the camera 
    // and then clicked, so everytime the user tries to pick something, get the 
    // camera being used at the time of the click.
    cam = scn.getCamera();

    var canvasTag = scn.getCanvas();

    // Get the viewport coordinates, that is the coordinates where the user clicked
    // on the canvas. 
    // The viewport coordinates system:
    //
    // 0,0  _______ w, 0
    //     |       |
    //     |       |
    // 0,h |_______| w,h
    //
    var clickedCanvasCoords = getClickedCoords(event);

    // Convert the viewport coordinates into NDC. Since NDC is normalized, 
    // it's as if we are calculating percentages. Note Y is flipped for NDC.
    // NDC space:
    //
    // -1,1   _______ 1, 1
    //       |       |
    //       |       |
    // -1,-1 |_______| 1,-1
    //
    // go from viewport coords to normalized device coords
    var normalizedDeviceCoords = [(2 * clickedCanvasCoords[0] / canvasTag.width) - 1, -((2 * clickedCanvasCoords[1] / canvasTag.height) - 1), 1, 1];

    var iproj = c3dl.inverseMatrix(scene.getProjectionMatrix());

    // To get the clip coords, we multiply the viewspace coordinates by
    // the projection matrix.
    // Working backwards across the pipeline, we have to take the normalized
    // device coordinates and multiply by the inverse projection matrix to get
    // the clip coordinates.
    var clipCoords = c3dl.multiplyMatrixByVector(iproj, normalizedDeviceCoords);
    // perspective divide
    clipCoords[0] /= clipCoords[3];
    clipCoords[1] /= clipCoords[3];
    clipCoords[2] /= clipCoords[3];

    // flip Y
    clipCoords[2] = -clipCoords[2];

    // The start of the ray is wherever the camera is.
    var rayInitialPoint = cam.getPosition();

    var x = clipCoords[0];
    var y = clipCoords[1];
    var z = clipCoords[2];

    // After this code was written a small bug was found in the freecamera class
    // until I have time to fix it, I'm putting in a quick fix.
    var kludge = c3dl.multiplyVector(cam.getLeft(), -1);
    var viewMatrix = c3dl.makePoseMatrix(kludge, cam.getUp(), cam.getDir(), cam.getPosition());

    // place the ray from clip space into view space
    //
    //
    var rayTerminalPoint = c3dl.multiplyMatrixByVector(viewMatrix, new C3DL_FLOAT_ARRAY([x, y, z, 0]));
    var rayDir = c3dl.normalizeVector(rayTerminalPoint);

    // This array will hold the indices of the objects which pass the boundingSphere/Ray test.
    // The indices are the ones the scene uses to identify objects.
    // All the objects which passed the rough bouding volume test can later on be more thouroughly
    // tested against the ray.  Objects which do 
    var passedBoundsTest = new Array();

    // Collada objects must pass an enclosure test first before their individual
    // triangles are tested against the ray, to speed up this test.
    for (var i = 0, len = scn.getObjListSize(); i < len; i++)
    {
      var currObj = scn.getObj(i);

      // Make sure the object is a Collada before calling getPickable() since
      // not all objects in the scene will have that function.
      if ((currObj instanceof c3dl.Collada ||  currObj.getObjectType() === c3dl.SHAPE) && currObj.getPickable() && currObj.isVisible() && currObj.isInsideFrustum())
      {
        // do the bounding volumes of the geometry nodes intersect with the given ray?
        if (currObj.rayIntersectsEnclosures(rayInitialPoint, rayDir))
        {
          passedBoundsTest.push(currObj);
        }
      }
    }

    // references of objects which have passed their respective picking tests.
    var objectsPicked = new Array();

    // if the user only wants to only run the test against bounding volumes, just
    // make the array which holds the objects which passed the triangle test point to 
    // the array we just filled up with object indices.  There is no need to recopy 
    // everything into the array which holds the passed triangle tests.	
    if (scn.getPickingPrecision() == c3dl.PICK_PRECISION_BOUNDING_VOLUME)
    {
      objectsPicked = passedBoundsTest;
    }

    // otherwise we will need to run the ray/triangle tests for every object
    else
    {
      // We only test the objects which have passed the bounding volume test.
      // If the ray has not intersected the bounding volume, it can't possibly intersect
      // with any triangle in the object.
      for (var i = 0, len = passedBoundsTest.length; i < len; i++)
      {
        var currObject = passedBoundsTest[i];
       
        if (currObject.getObjectType() === c3dl.SHAPE) {
          objectsPicked.push(passedBoundsTest[i]);
        }
        else {
          // if the collada object confirms the ray has intersected it, it will be
          // added to the list of objects the user picked.
          if (currObject.rayIntersectsTriangles(rayInitialPoint, rayDir))
          {
            objectsPicked.push(passedBoundsTest[i]);
          }
        }
      }
    }



    // POINT PICKING
    // get the projection tranformation (either perspective or orthographic)
    var projMatrix = cam.getProjectionMatrix();
    var viewMatrix = cam.getViewMatrix();
    var viewProjMatrix = c3dl.multiplyMatrixByMatrix(projMatrix, viewMatrix);
    if (scn.getPointRenderingMode() == c3dl.POINT_MODE_POINT)
    {
      // for every point in the scene
      for (var i = 0, len = scn.getObjListSize(); i < len; i++)
      {
        if (scn.getObj(i) instanceof c3dl.Point)
        {
          // save attenuation factors for the pointList
          var attenuation = scene.getPointAttenuation();
          var point = scn.getObj(i);

          // get the distance from the point to the camera. The distance is
          // used to calculate the attenuation of the point.
          var pointCoords = point.getPosition();
          var d = c3dl.vectorLength(c3dl.subtractVectors(pointCoords, cam.getPosition()));

          // save the points pixel width.  Get the pixel width by calculating 
          // the attenuation factors of the point.
          var pointPixelSize = 1.0 / (attenuation[0] + (attenuation[1] * d) + (attenuation[2] * d * d));

          // the coordinates in world space.
          var worldSpaceCoords = [pointCoords[0], pointCoords[1], pointCoords[2], 1];

          // project current point to 2D plane
          var clipCoords = c3dl.multiplyMatrixByVector(viewProjMatrix, worldSpaceCoords);

          // perspective divide.
          var normalizedDeviceCoords = [clipCoords[0] / clipCoords[3], clipCoords[1] / clipCoords[3], clipCoords[2] / clipCoords[3]];

          // transform the point from NDC space to viewport space.
          var viewportCoords = [(normalizedDeviceCoords[0] + 1) / 2 * canvasTag.width, (1 - normalizedDeviceCoords[1]) / 2 * canvasTag.height];

          // if points are rendered as circles,
          // test if x,y coords of mouse click falls within circle
          // if passed, add point index to list of points that passed test.
          // add pointList as a list which has one of its points picked.
          if (isPointInSquare(clickedCanvasCoords, viewportCoords, pointPixelSize))
          {
            objectsPicked.push(point);
          }
        }
      }
    }

    // We can run the rayBounding Sphere test if the points are rendered
    // as spheres.
    else if (scn.getPointRenderingMode() == c3dl.POINT_MODE_SPHERE)
    {
      // for every point in the scene
      for (var i = 0, len = scn.getObjListSize(); i < len; i++)
      {
        if (scn.getObj(i) instanceof c3dl.Point)
        {
          if (c3dl.rayIntersectsSphere(rayInitialPoint, rayDir, scn.getObj(i).getPosition(), scn.getPointSize()))
          {
            objectsPicked.push(scn.getObj(i));
          }
        }
      }
    }


    // Give the option for the user to do whatever they want to objects
    // which were behind the objects picked.
    c3dl.sortObjectsFromCam(scn, cam, objectsPicked);

    // the picking callback is the function the user wants the library to call once
    // someone clicks on the canvas.
    var pickingCB = scn.getPickingCallback();

    // create the object which will contain the methods the user will need to call.
    var pickingResult = createPickingResult(canvasTag, event.which, objectsPicked);
    pickingCB(pickingResult);
  }

  /**
   @private
   
   @param {HTMLCanvasElement} cvs;
   @param {int} btnUsed The button clicked
   @param {Array} objList Array of renferences of objects
   @param {Array} pointLists Array of references of pointsLists which had at least one of their
   points picked.
   @param {Array} points Array of 
   
   @returns {c3dl.PickingResult} a pickingresult with added variables and overridden methods.
   */

  function createPickingResult(cvs, btnUsed, objList)
  {
    var pickingObj = new c3dl.PickingResult();
    //
    pickingObj["canvas"] = cvs;
    pickingObj["getCanvas"] = function ()
    {
      return this.canvas;
    };
    //
    pickingObj["buttonUsed"] = btnUsed;
    pickingObj["getButtonUsed"] = function ()
    {
      return this.buttonUsed;
    };
    //
    pickingObj['objects'] = objList;
    pickingObj['getObjects'] = function ()
    {
      return this.objects;
    };
    return pickingObj;
  }

  /**
   @private
   
   Is the 2D point pointCoords within the squre located at squareCoords with
   a width and height of pointPixelSize
   
   @param pointCoords {Array} Two components [x,y] which defines the 
   point which will be tested to see if is lies within the square.
   
   @param squareCoords {Array} Two components [x,y] which defines the 
   center of the square.
   
   @param squareSize {float} The number of pixels from the center of
   the square to each edge.
   
   @returns {bool} true if the point is within the square, false otherwise.
   */

  function isPointInSquare(pointCoords, squareCoords, squareSize)
  {
    // if the clicked coordinates are inside the square
    if (pointCoords[0] >= squareCoords[0] - squareSize / 2 && pointCoords[0] <= squareCoords[0] + squareSize / 2 && pointCoords[1] >= squareCoords[1] - squareSize / 2 && pointCoords[1] <= squareCoords[1] + squareSize / 2)
    {
      return true;
    }
    return false;
  }


  /**
   @private
   
   Is the point 'pointCoords' within the circle with position circleCoords and diameter 
   circleDiameter? If points have a small Diameter, only a few pixels in width, either 
   this of isPointInSquare can be called. However, if the diamater get larger, we have to
   reject clicking on the circles 'corners' as valid 'hits'.
   
   @param {Array} pointCoords
   
   @param {Array} circleCoords
   
   @param {Array} circleDiameter
   
   @return {bool} true if the point is within the cirlce, otherwise false.
   */

  function isPointInCircle(pointCoords, circleCoords, circleDiameter)
  {
    // Get the vector from pointCoords to circleCoords
    var vec = [pointCoords[0] - circleCoords[0], pointCoords[1] - circleCoords[1]];
    // distance from point to circle
    var d = Math.sqrt((vec[0] * vec[0]) + (vec[1] * vec[1]));

    return (d < circleDiameter / 2 ? true : false);
  }

  /**		
   @private
   Get the coordinates where the user clicked on the canvas.
   
   Screen space is left handed with 0,0 at the top left of the canvas.
   
   @returns {Array} Array of 2 integers, x and y coordinates where the user clicked
   on the canvas.
   */

  function getClickedCoords(event)
  {
    var canvas = scn.getCanvas();
    var canvasPosition = c3dl.getObjectPosition(scn.getCanvas());
    
    // event.clientX and event.clientY contain where the user clicked 
    // on the client area of the browser
    // canvasPosition holds the coordinate of the top left corner where the canvas resides
    // on the client area.
    // window.pageXOffset, window.pageYOffset hold how much the user has scrolled.
    var X = event.clientX - canvasPosition[0] + window.pageXOffset - 1;
    var Y = event.clientY - canvasPosition[1] + window.pageYOffset - 1;
    return [X, Y];
  }

}

/**
 This will sort the objects which have been picked.  This function is O(n2).
 
 Should this function be sped up?  It is currently O(n2), however using a faster sorting algorithm may 
 create more overhead than a bubble sort.  If less than 10 objects need to be sorted, the speed of 
 this function should not be an issue.
 
 @param {c3dl.Scene} scene Scene is needed because we have an array of indices, not actual objects. Since
 scene has the actual list, we can query it with getObj(i) to get the actual object, then its position.
 @param {Array} pickedObjects An array of indices of objects which have passed a bounds test or triangle test.
 @param {c3dl.FreeCamera} camera The camera used in the scene.
 
 @private
 */
c3dl.sortObjectsFromCam = function (scene, camera, pickedObjects)
{
  var cameraPos = camera.getPosition();
  var objAPos, objBPos;
  var distA, distB;
  var camToObjADist, camToObjBDist;
  // used to swap objects
  var temp;
  // Sort all intersecting objects from closet to farthest 
  for (var i = 0, len = pickedObjects.length; i < len; i++)
  {
    for (var j = 0, len2= pickedObjects.length; j < len2; j++)
    {
      objAPos = pickedObjects[i].getPosition();
      objBPos = pickedObjects[j].getPosition();

      // calculate the distance from the camera to the object's center.
      camToObjADist = c3dl.subtractVectors(cameraPos, objAPos);
      camToObjBDist = c3dl.subtractVectors(cameraPos, objBPos);

      // Objects distance from camera
      distA = c3dl.vectorLength(camToObjADist);
      distB = c3dl.vectorLength(camToObjBDist);

      // Swap
      if (distA < distB)
      {
        temp = pickedObjects[i];
        pickedObjects[i] = pickedObjects[j];
        pickedObjects[j] = temp;
      }
    }
  }

  return pickedObjects;
}

/**
 Does the given ray intersect the sphere? When using this function to test
 the ray created by a user click against a boundingsphere, keep the following
 in mind:  When trying to pick the bounding sphere the test will fail if a few
 pixels from the edges of the sphere.  Either it will seem that the test is passing
 when it should not or the test is failing when it should should pass.
 
 This could be because the 'pixel point' associated with the cursor is not at the
 very tip of the cursor where it is expected it to be.  This occurs on osx.
 
 @param {Array} rayInitialPoint The initial point of the ray in world space.
 @param {Array} rayDir A normalized vector which has the ray's direction.
 @param {Array} spherePos position of the sphere.
 @param {float} sphereRadius radius of the sphere.
 
 @returns {boolean} true if the given ray intersects the boundingsphere, otherwise false.
 */
c3dl.rayIntersectsSphere = function (rayInitialPoint, rayD, spherePos, sphereRadius)
{
  // this will hold the result if there was an intersection.
  var hasIntersected = false;

  var rayDir = c3dl.normalizeVector(rayD);

  var v = c3dl.subtractVectors(rayInitialPoint, spherePos);
  var a = c3dl.vectorDotProduct(rayDir,rayDir)
  var b = 2.0 * c3dl.vectorDotProduct(v, rayDir);
  var c = c3dl.vectorDotProduct(v, v) - (sphereRadius * sphereRadius);

  var discriminant = (b * b) - (4.0 * a * c);

  // these will hold the intersection values.
  var q;

  // If the discriminant is less than 0, we cannot get the square root
  // since it would result in an imaginary number.	
  if (discriminant >= 0)
  {	
    var discriminantsqrt = Math.sqrt(discriminant);
	if (b < 0) {
     q = (-b - discriminantsqrt) / 2;
	}
	else {
     q = (-b + discriminantsqrt) / 2;
	}
    var t0 = q / a;
    var t1 = c / q;
    // make sure t0 is smaller than t1
    if (t0 > t1)
    {
        // if t0 is bigger than t1 swap them around
        var temp = t0;
        t0 = t1;
        t1 = temp;
    }
	if (t1 < 0) {
        return false;
    }
    if (t1 > 0 || t0 > 0) {
        hasIntersected = true;
	}
  }
  return hasIntersected;
}

/**
 Test if a ray defined by point 'orig' and direction 'dir' intersects with
 triangle defined by vertices vert0, vert1 and vert2.
 
 @param {Array} orig The ray's origin, which is a vector of 3 values.
 @param {Array} dir The ray's direction, a vector of 3 values.
 @param {Array} vert0 Vertex 0 of the triangle, going counter-clockwise.
 @param {Array} vert1 Vertex1 of the triangle
 @param {Array} vert2 Vertex2 of the triangle
 
 @returns {boolean} true if ray intersects with triangle, false otherwise.
 
 @private
 */
c3dl.rayIntersectsTriangle = function (orig, dir, vert0, vert1, vert2)
{
  // find vectors for the two edges of the triangle which share vert0
  var edge1 = c3dl.subtractVectors(vert1, vert0);
  var edge2 = c3dl.subtractVectors(vert2, vert0);

  // to calculate the area of the triangle:
  // first calculate the area of the parallelogram the two vectors define, 
  // then take half of that result leaving us with the area of the triangle.
  var area = 0.5 * c3dl.vectorLength(c3dl.vectorCrossProduct(edge1, edge2));

  // we'll need the normal of the triangle
  var norm = c3dl.vectorCrossProduct(edge1, edge2);

  // calculate this first to see if we can stop processing.
  var normDotDir = c3dl.vectorDotProduct(norm, dir);

  // if the dot product of two vectors returns 0, that means the vectors are perpendicular. If
  // that is the case, the ray will never intersect the plane and we can return false right here
  // to prevent further processing.
  if (normDotDir == 0)
  {
    return false;
  }

  // If the ray is not parallel to the plane, we need to do the following:
  // 1) find out at what point the ray will intersect the plane (which is defined by the triangle).
  // 2) find out if that point is within the triangle if it is, we have a ray/triangle intersection.
  // The parametric equation of a ray is:
  // R(t) = p + tu
  // where,
  // p is a point, which is the origin of the ray.
  // u is a vector, which is the direction of the ray. 
  // t is a scalar value, which scales the direction of the ray.
  // by passing in values greater than 0 into the equation, we can generate
  // different points along the ray.
  // The equation of a plane is:
  // Ax + By + Cz = D
  // where,
  // (ABC) is the normal of the plane.
  // (xyz) is a point on the plane.
  // we can re-write the equation for a plane
  // n . x = d
  // n is the normal of the plane.
  // x is a point on the plane.
  // So, with the equation of the plane and the ray, we can now
  // substitute the ray equation into the plane equation. What this does
  // is it tells us what value we need we have to set 't' to in order for
  // the ray to intersect the plane, which gives us the point of 
  // intersection. Or, what scalar value must we multiply the direction 
  // of the ray for it to intersect with the ray?
  // we substite R into the plane equation
  // n . R(t) = d
  // R(t) is expanded...
  // n . [p+tu] = d
  // distribute n
  // n.p + tn . u = d
  // We isolate t because we need to find out what scalar value the direction
  // of the ray needs to be scaled by for it to intersect with the plane.
  // t = (d - n.p) / (n.dir)
  //
  var d = c3dl.vectorDotProduct(norm, vert1);
  var normDotRayorig = c3dl.vectorDotProduct(norm, orig);
  var t = (d - normDotRayorig) / normDotDir;

  // Now we have 't', which is the scalar value needed to scale the ray's direction
  // for it to intersect with the plane the triangle defines.
  // We scale the ray's direction 't' times and then add it to the ray's origin to
  // get the point of intersection, POI.
  var scaledDir = c3dl.multiplyVector(dir, t);
  var POI = c3dl.addVectors(orig, scaledDir);

  // area of smaller triangles formed by the 3 vertices and the point of intersection	
  c3dl.subtractVectors(vert0, POI,edge1);
  c3dl.subtractVectors(vert1, POI,edge2);
  edge3 = c3dl.subtractVectors(vert2, POI);

  // get the area of the three triangles 'created' where the 
  // ray intersects the triangle's plane. 
  var area1 = 0.5 * c3dl.vectorLength(c3dl.vectorCrossProduct(edge1, edge2,c3dl.vec1));
  var area2 = 0.5 * c3dl.vectorLength(c3dl.vectorCrossProduct(edge2, edge3,c3dl.vec1));
  var area3 = 0.5 * c3dl.vectorLength(c3dl.vectorCrossProduct(edge3, edge1,c3dl.vec1));

  // get the difference between the area of the triangle and the area of the three triangles
  // created where the user clicked. If the user clicked inside the triangle, the difference
  // should be near zero.
  var diff = area - (area1 + area2 + area3);

  if(Math.abs(diff) <= c3dl.TOLERANCE) {
    //get vector from ray origin to poi
    var otherdir = c3dl.subtractVectors(POI,orig);
    //get unit vector of that
    var normOtherDir = c3dl.normalizeVector(otherdir);
    
    //get unit vector of original dir (uvd)
    var normDir = c3dl.normalizeVector(dir);
    //find the angle between those two vectors
    var angle = c3dl.getAngleBetweenVectors(normOtherDir,normDir);
    //if it is less than 90, the object is probably visible
    if(angle < 90) {
      return true;
    }
    else {//if it is greater than 90, this is behind the point of origin somewhere
      return false;
    } 
  }
  else {
    return false;
  }
}

c3dl.rayAABBIntersect = function (orig, dir, maxMins) {
  var tmin, tmax, tymin, tymax, tzmin, tzmax;
  var divx = 1 / dir[0];
  var divy = 1 / dir[1];
  var divz = 1 / dir[2];
  if (divx >= 0) {
    tmin = (maxMins[1] - orig[0]) * divx;
    tmax = (maxMins[0] - orig[0]) * divx;
  }
  else {
    tmin = (maxMins[0] - orig[0]) * divx;
    tmax = (maxMins[1] - orig[0]) * divx;
  }
  if (divy >= 0) {
    tymin = (maxMins[3] - orig[1]) * divy;
    tymax = (maxMins[2] - orig[1]) * divy;
  }
  else {
    tymin = (maxMins[2] - orig[1]) * divy;
    tymax = (maxMins[3] - orig[1]) * divy;
  }
  if ( (tmin > tymax) || (tymin > tmax) ) {
    return false;
  }
  if (tymin > tmin) {
    tmin = tymin;
  }
  if (tymax < tmax){
    tmax = tymax;
  }
  if (divz >= 0) {
    tzmin = (maxMins[5] - orig[2]) * divz;
    tzmax = (maxMins[4] - orig[2]) * divz;
  }
  else {
    tzmin = (maxMins[4] - orig[2]) * divz;
    tzmax = (maxMins[5] - orig[2]) * divz;
  }
  if ( (tmin > tzmax) || (tzmin > tmax) ) {
    return false;
  }
  if (tzmin > tmin) {
    tmin = tzmin;
  }
  if (tzmax < tmax) {
    tmax = tzmax;
  }
  return true;
}

c3dl.rayOBBIntersect = function (orig, dir , pos, axis, sizes){
  var tmin, tmax, tymin, tymax, tzmin, tzmax;
  var divx = 1 / dir[0]*axis[0];
  var divy = 1 / dir[1]*axis[1];
  var divz = 1 / dir[2]*axis[2];
  if (divx >= 0) {
    tmin = (pos[0]*axis[0] - sizes[0] - orig[0]*axis[0]) * divx;
    tmax = (pos[0]*axis[0] + sizes[0] - orig[0]*axis[0]) * divx;
  }
  else {
    tmin = (pos[0]*axis[0] + sizes[0] - orig[0]*axis[0]) * divx;
    tmax = (pos[0]*axis[0] - sizes[0] - orig[0]*axis[0]) * divx;
  }
  if (divy >= 0) {
    tymin = (pos[1]*axis[1] - sizes[1] - orig[1]*axis[1]) * divy;
    tymax = (pos[1]*axis[1] + sizes[1] - orig[1]*axis[1]) * divy;
  }
  else {
    tymin = (pos[1]*axis[1] + sizes[1] - orig[1]*axis[1]) * divy;
    tymax = (pos[1]*axis[1] - sizes[1] - orig[1]*axis[1]) * divy;
  }
  if ( (tmin > tymax) || (tymin > tmax) ) {
    return false;
  }
  if (tymin > tmin) {
    tmin = tymin;
  }
  if (tymax < tmax){
    tmax = tymax;
  }
  if (divz >= 0) {
    tzmin = (pos[2]*axis[2] - sizes[2] - orig[2]*axis[2]) * divz;
    tzmax = (pos[2]*axis[2] + sizes[2] - orig[2]*axis[2]) * divz;
  }
  else {
    tzmin = (pos[2]*axis[2] + sizes[2] - orig[2]*axis[2]) * divz;
    tzmax = (pos[2]*axis[2] - sizes[2] - orig[2]*axis[2]) * divz;
  }
  if ( (tmin > tzmax) || (tzmin > tmax) ) {
    return false;
  }
  if (tzmin > tmin) {
    tmin = tzmin;
  }
  if (tzmax < tmax) {
    tmax = tzmax;
  }
  return true;
}
