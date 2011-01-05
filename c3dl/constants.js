/*
Copyright (c) 2008 Seneca College
Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/

/**
 @namespace values within this namespace are guarantted not be be changed
 by the library. The const part of the values such as c3dl.FAR_CLIPPING_PLANE
 indicate the library never changes the value and neither should the user.
 */

/**
 c3dl.TOLERANCE = 0.00001<br />
 This is used as a buffer when doing some calculations with
 floating point numbers.  Due to floating point innacuracy, we cannot
 use == on floating point numbers for comparison.  Two floats which
 we believe to be equal may in fact not be equal, they may vary a
 small amount. Therefore a constant is defined here which will later
 be used to compare against the difference on vector component
 allowing some tolerance.
 @constant
 */
c3dl.TOLERANCE = 0.00001;

/**  
 To render c3dl.Point objects using the built-in WebGL
 points rendering ( using circles ), pass this value to
 the Scene's setPointRenderingMode() method.
 
 Note that using this method of rendering c3dl.Point objects may crash
 the browser or OS.
 @constant
 */
c3dl.POINT_MODE_POINT = 1;

/**
 To render c3dl.Point objects using spheres, pass this
 value to the Scene's setPointRenderingMode() method.
 
 This is the default method to render c3dl.Point objects.
 @constant
 */
c3dl.POINT_MODE_SPHERE = 2;

/**
 @private
 c3dl.NEAR_CLIPPING_PLANE = 0.1<br />
 The distance from the viewpoint to the camera's near
 clipping plane.  This should always be positive.
 @constant
 */
c3dl.DEFAULT_NEAR_CLIPPING_PLANE = 0.1;

/**
 @private
 c3dl.DEFAULT_FAR_CLIPPING_PLANE = 8000.0<br />
 The distance from the viewpoint to the camera's far
 clipping plane.  This should always be positive.
 @constant
 */
c3dl.DEFAULT_FAR_CLIPPING_PLANE = 8000.0;

/**
 @private
 c3dl.FIELD_OF_VIEW = 45.0<br />
 Angle in degree of the camera's field of view. Must
 range from 0 to 180.
 @constant
 */
c3dl.DEFAULT_FIELD_OF_VIEW = 45.0;

/**
 @private
 c3dl.GLES_CONTEXT_20 = 2.0<br />
 @constant
 */
c3dl.GLES_CONTEXT_20 = 2.0;


/**
 @private
 c3dl.MAX_LIGHTS = 7<br />
 @constant
 */
c3dl.MAX_LIGHTS = 7;

/**
 @private
 If c3dl.Light is ever instantiated, which it shouldn't, it will have the the light
 type of abstract. In that case we tell the user they have an error in their script.
 @constant
 @see c3dl.Light
 */
c3dl.ABSTRACT_LIGHT = 0;

/**
 @private
 A directional light is a light which does not have a position, but only
 a direction. The light is understood to be infinitely far away.
 @constant
 @see c3dl.DirectionalLight
 */
c3dl.DIRECTIONAL_LIGHT = 1;

/**
 @private
 A positional light is a light with a position property.
 @constant
 @see c3dl.PositionalLight
 */
c3dl.POSITIONAL_LIGHT = 2;

/**
 @private
 A spotlight is a positional light with a cutoff component, so light is
 restricted to a cone shape.
 @constant
 @see c3dl.SpotLight
 */
c3dl.SPOT_LIGHT = 3;


/**
 @private
 Symbol which must be passed into matrixMode() method to change the
 matrix mode to projection.
 @constant
 */
c3dl.PROJECTION = 1;

/**
 @private
 Symbol which must be passed into matrixMode() method to change the
 matrix mode to model view.
 @constant
 */
c3dl.MODELVIEW = 2;

/**
 */
c3dl.COLLADA = 0;

/**
 */
c3dl.LINE = 1;

/**
 */
c3dl.POINT = 2;

/**
 */
c3dl.PARTICLE_SYSTEM = 3;

c3dl.SHAPE = 4;

////////////////////// SCENE /////////////////////////
/**
 @constant
 */
c3dl.DEFAULT_BG_RED = 0.4;


/**
 @constant
 */
c3dl.DEFAULT_BG_GREEN = 0.4;


/**
 @constant
 */
c3dl.DEFAULT_BG_BLUE = 0.6;


/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.ZERO = 0;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.ONE = 1;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.SRC_COLOR = 0x0300;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.ONE_MINUS_SRC_COLOR = 0x0301;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.SRC_ALPHA = 0x0302;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.ONE_MINUS_SRC_ALPHA = 0x0303;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.DST_ALPHA = 0x0304;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.ONE_MINUS_DST_ALPHA = 0x0305;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.DST_COLOR = 0x0306;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.ONE_MINUS_DST_COLOR = 0x0307;

/**
 Used to set blending factors in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setDstBlend
 @see c3dl.ParticleSystem#setSrcBlend
 */
c3dl.SRC_ALPHA_SATURATE = 0x0308;


/**
 Used to set the blending equation in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setBlendEquation
 */
c3dl.FUNC_ADD = 0x8006;

/**
 Used to set the blending equation in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setBlendEquation
 */
c3dl.FUNC_SUBTRACT = 0x800A;

/**
 Used to set the blending equation in c3dl.ParticleSystem.
 @constant
 @see c3dl.ParticleSystem#setBlendEquation
 */
c3dl.FUNC_REVERSE_SUBTRACT = 0x800B;




////////////////////////// SHADERS  /////////////////////////
/**
 @private
 When we try to get a location of a variable from a shader program,
 it may not exist.  If that is the case, WebGL will return -1 to
 indicate that.
 @constant
 */
c3dl.SHADER_VAR_NOT_FOUND = -1;


/**
 This is used internally by c3DL.
 @constant
 @private
 */
c3dl.VERTEX_SHADER = "x-vertex";

/**
 This is used internally by c3DL.
 @constant
 @private
 */
c3dl.FRAGMENT_SHADER = "x-fragment";





// 0x0001 is the value assigned to glCanvas3D.LINES. Similarly,
// 0x0004 is the value assigned to glCanvas3D.TRIANGLES.  We have to
// use the numerical values here since we do not yet have a context.
// Within the renderer is a variable which hold one of these values.
// When drawArrays() is called, it will be given this value, thus filled
// trianges or lines will be rendered.
// This was done to avoid having:
// if(fillMode == c3dl.WIRE_FRAME)
//    drawArrays(glCanvas3D.LINES, ...);
//  else
//    drawArrays(glCanvas3D.TRIANGLES,...);
//
// instead of the above code, we only need one line of code.
/**
 Pass this to renderer's setFillMode() if you want models to be
 drawn with lines. Note that using this may result in rendering of
 extra lines.  This should mostly used for debugging scripts such as
 when drawing bounding volumes.
 @constant
 @see c3dl.Renderer#setFillMode
 */
c3dl.WIRE_FRAME = 0x0001;

/**
 Pass this to a renderer's setFillMode() if you want models to be
 drawn 'filled in'. Renderers will use fill mode by default.
 
 @constant
 @see c3dl.Renderer#setFillMode
 */
c3dl.FILL = 0x0004;



//////////////////////// DEBUG  ////////////////////////////////
/**
 This is used internally in c3DL by the debug class.
 @private
 @constant
 */
c3dl.DEBUG_INFO = "Info";

/**
 This is used internally in c3DL by the debug class.
 @private
 @constant
 */
c3dl.DEBUG_ERROR = "Error";

/**
 This is used internally in c3DL by the debug class.
 @private
 @constant
 */
c3dl.DEBUG_WARNING = "Warning";

/**
 This is used internally in c3DL by the debug class.
 @private
 @constant
 */
c3dl.DEBUG_EXCEPTION = "Exception";

////////////////////////////// PICKING ///////////////////////////
/**
 This constant can be passed into the setPickingPrecision() of scene
 if accuracy is not important for your script and/or you require the
 picking algorithm to work as fast as possible.  If using this value, when
 a user clicks on the canvas, all objects which can be picked will only
 be tested against their bounding volume.
 
 @constant
 */
c3dl.PICK_PRECISION_BOUNDING_VOLUME = 1;

/**
 This is currently the most accurate test available.  If this is passed
 into the setPickingPrecision() function of scene, everytime the user clicks,
 the ray generated will be tested against the triangles of each model which
 pass the bounding volume test.  Use this constant if accuracy is important
 for your script using C3DL.<br />
 <br />
 This is the default precision of each scene created.
 
 @constant
 */
c3dl.PICK_PRECISION_TRIANGLE = 2;

/*
  Compatibility wrapper
*/
try{
  Float32Array;
}catch(ex){
  Uint8Array = WebGLUnsignedByteArray;
  Float32Array = WebGLFloatArray;
}

const C3DL_FLOAT_ARRAY = Float32Array;
const C3DL_UINT_ARRAY = Uint8Array;

//Used to for temp vectors and matrixs needed in update loops
c3dl.mat1 = new C3DL_FLOAT_ARRAY(16);
c3dl.mat2 = new C3DL_FLOAT_ARRAY(16);
c3dl.mat3 = new C3DL_FLOAT_ARRAY(16);
c3dl.vec1 = new C3DL_FLOAT_ARRAY(3);
c3dl.vec2 = new C3DL_FLOAT_ARRAY(3);
c3dl.vec3 = new C3DL_FLOAT_ARRAY(3);

c3dl.SINCOS_LENGTH = parseInt(360 / 0.5, 10);