/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/*
  HTML pages which make use of c3dl must include the following script tag
  in the page header.
  Note the path for the src attribute may need to be changed, depending
  on where c3dapi.js has been placed.

  <script type="application/javascript" src="../canvas3dapi/c3dapi.js"></script>		
*/
var scripts = document.getElementsByTagName("script");
var parts = scripts[scripts.length - 1].src.split("/");
parts.pop();
var basePath = parts.join("/");
var head = document.getElementsByTagName("head")[0];

/**
 @private
 
 @param {String} path Path of the resource to include.
 
 Create a function to keep subsequent lines shorter.
*/
c3dl_require = function (path)
{
  document.write('<' + 'script');
  document.write(' language="javascript"');
  document.write(' type="text/javascript"');
  document.write(' src="' + basePath + "/" + path + '">');
  document.write('</' + 'script' + '>');
}

//Some classes depend on others, so the order of the following lines should not be
//changed carelessly.
c3dl_require('c3dlnamespace.js');
c3dl_require('constants.js');

c3dl_require('effects/effect_docs.js');

//make the debugger one of the first things included, so other 
//js files can make use of c3dl.debug.log*
c3dl_require('debug.js');

//renderers
c3dl_require('renderer/renderer.js');
c3dl_require('renderer/rendererwebgl.js');
c3dl_require('renderer/programobject.js');

//math
c3dl_require('math/mjs.js');
c3dl_require('math/mathutils.js');
c3dl_require('math/vector.js');
c3dl_require('math/matrix.js');
c3dl_require('math/quaternion.js');
c3dl_require('matrixstack.js');

//cameras
c3dl_require('camera/camera.js');
c3dl_require('camera/freecamera.js');
c3dl_require('camera/orbitcamera.js');

//bounding volumes
c3dl_require('enclosure/boundingsphere.js');
c3dl_require('enclosure/boundingvolume.js');
c3dl_require('enclosure/visualboundingsphere.js');
c3dl_require('enclosure/obb.js');
c3dl_require('enclosure/aabb.js');

//actors
c3dl_require('actors/actor.js');
c3dl_require('actors/primitive.js');
c3dl_require('actors/point.js');
c3dl_require('actors/line.js');

//shapes
c3dl_require('shapes/shape.js');
c3dl_require('shapes/cube.js');
c3dl_require('shapes/plane.js');
c3dl_require('shapes/sphere.js');
c3dl_require('shapes/custom.js');
c3dl_require('shapes/customplane.js');

//frustum culling
c3dl_require('frustum_culling/frustum.js');
c3dl_require('frustum_culling/plane.js');

//scene
c3dl_require('scene.js');

//texture
c3dl_require('texture/texture.js');
c3dl_require('texture/texturemanager.js');
c3dl_require('texture/textureutils.js');

//collada management
c3dl_require('collada/colladamanager.js');
c3dl_require('collada/colladaloader.js');
c3dl_require('collada/colladaqueue.js');
c3dl_require('collada/geometry.js');
c3dl_require('collada/primitiveset.js');

//lights
c3dl_require('light/light.js');
c3dl_require('light/positionallight.js');
c3dl_require('light/directionallight.js');
c3dl_require('light/spotlight.js');

//material
c3dl_require('material.js');

//scenegraph stuff
c3dl_require('collada/collada.js');
c3dl_require('scenegraph/scenenode.js');

//misc utilities
c3dl_require('utilities/utilities.js');

//shaders
c3dl_require('shaders/model/light/light_vs.js');
c3dl_require('shaders/model/material/material.js');

c3dl_require('shaders/model/standard/model_fs.js');
c3dl_require('shaders/model/standard/model_vs.js');
c3dl_require('shaders/model/standard/std_callback.js');

c3dl_require('shaders/particle_system/psys_vs.js');
c3dl_require('shaders/particle_system/psys_fs.js');
c3dl_require('shaders/point/point/point_vs.js');
c3dl_require('shaders/point/point/point_fs.js');
c3dl_require('shaders/point/sphere/point_sphere_vs.js');
c3dl_require('shaders/point/sphere/point_sphere_fs.js');
c3dl_require('shaders/line/line_vs.js');
c3dl_require('shaders/line/line_fs.js');
c3dl_require('shaders/bounding_sphere/bounding_sphere_vs.js');
c3dl_require('shaders/bounding_sphere/bounding_sphere_fs.js');

c3dl_require('shaders/model/greyscale/greyscale_vs.js');
c3dl_require('shaders/model/greyscale/greyscale_fs.js');
c3dl_require('shaders/model/greyscale/greyscale_callback.js');

c3dl_require('shaders/model/sepia/sepia_vs.js');
c3dl_require('shaders/model/sepia/sepia_fs.js');
c3dl_require('shaders/model/sepia/sepia_callback.js');

c3dl_require('shaders/model/cartoon/cartoon_vs.js');
c3dl_require('shaders/model/cartoon/cartoon_fs.js');
c3dl_require('shaders/model/cartoon/cartoon_callback.js');

c3dl_require('shaders/model/gooch/gooch_vs.js');
c3dl_require('shaders/model/gooch/gooch_fs.js');
c3dl_require('shaders/model/gooch/gooch_callback.js');

c3dl_require('shaders/model/solid_color/solid_color_vs.js');
c3dl_require('shaders/model/solid_color/solid_color_fs.js');
c3dl_require('shaders/model/solid_color/solid_color_callback.js');

//effects and instance effects
c3dl_require('effects/effecttemplate.js');
c3dl_require('effects/effect.js');

//particle system
c3dl_require('particle_system/particlesystem.js');
c3dl_require('particle_system/particle.js');

//initialization
c3dl_require('init.js');

//interaction
c3dl_require('interaction/collision.js');
c3dl_require('interaction/picking.js');
c3dl_require('interaction/pickingresult.js');

//Function to call the various versions of requestAnimationFrame
//To be updated when this is properly standardized.
window.requestAnimFrame = (function(callback){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
