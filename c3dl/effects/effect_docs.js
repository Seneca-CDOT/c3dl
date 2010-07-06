/**
 @namespace
 
 If a parameter's type is followed by square braces, it means the
 parameter has a default value, therefore setting that parameter is
 optional.
 */
c3dl.effects =
{
};

/**
 @private
 @constant
 */
c3dl.effects.STD_EFFECT = 0;


c3dl.effects.SOLID_COLOR = 0;
/**
 Gooch shading is a type of Non-photorealistic rendering (NPR) which is often used
 in technical illustrations since it properly conveys the shape of objects.
 
 Warm and cool colors are used to indicate the surface normals and therefore
 the curvature of the object.<br /><br />
 
 <b>Parameters</b><br />
 warmColor {Array} [0.5, 0.5, 0.0] Fragments closer to active light are colored using the warm color.<br />
 coolColor {Array} [0.0, 0.0, 1.0] Fragments farther from the active light are colored using the cool color.<br />
 surfaceColor {Array} [0.1, 0.1, 0.1] Base surface color.<br />
 
 @constant
 */
c3dl.effects.GOOCH = 0;

/**
 The cartoon effect renders objects as if they were cartoons.
 This effect only uses some light information.For positional lights,
 the position is taken into account. For directional lights, the
 direction is taken into account and for spotlights, the position,
 direction and cutoff are taken into account.<br />
 <br />
 
 <b>Parameters</b><br />
 qMap {String} Path of a quantization map.<br />
 
 @constant
 */
c3dl.effects.CARTOON = 0;

/**
 Renders objects using sepia color tones. Once the final colors are calculated
 for each fragment, they will be converted to greyscale, and finally multiplied
 by the sepia tone.<br />
 <br />
 
 <b>Parameters</b><br />
 color {Array} [1.2, 1.0, 0.8] Sepia tone.
 @constant
 */
c3dl.effects.SEPIA = 0;

/**
 The greyscale effect renders objects using shades of grey. The method which is used to
 convert the colors to greyscale closely matches the NTSC standard to convert colors to
 greyscale. NTC uses (Red * 0.33 + Green * 0.5 + Blue * 0.17).<br />
 <br />
 
 <b>Parameters</b><br />
 color {Array} [0.3, 0.6, 0.1] Values closely match the NTSC standard values to convert color 
 to greyscale values. <br />
 
 @constant
 */
c3dl.effects.GREYSCALE = 0;

/**
 This constant is an effect and therefore does not need to be
 instantiated. If a geometric object is not explicitly assigned an effect, 
 it will be rendered using this instance effect which is closely matches 
 the fixed function pipepline shaders. Use this if an object was assigned
 an effect, but should then be set back to standard rendering.<br />
 <br />
 This can be passed directly to an object's setEffect.<br />
 <br />
 
 <b>Parameters</b><br />
 none
 
 @constant
 */
c3dl.effects.STANDARD = 1;