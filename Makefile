# NOTES:
#
# Requires: java
#
# make - builds c3dl-DEV-VERSION.js and c3dl-DEV-VERSION.min.js in dist/
#
# make VERSION=1.2 -builds c3dl-1.2.js and c3dl-1.2.min.js in dist/
#
# make clean - delete dist/

VERSION ?= DEV-VERSION
NULL :=
SRC_DIR := .
C3DL := c3dl
C3DL_DIR := $(SRC_DIR)/$(C3DL)
TOOLS_DIR := $(SRC_DIR)/tools
DIST_DIR := $(SRC_DIR)/dist

C3DL_DIST := $(DIST_DIR)/$(C3DL)-$(VERSION).js
C3DL_MIN := $(DIST_DIR)/$(C3DL)-$(VERSION).min.js

# Add any c3dl JS files below
JS_SOURCES := $(C3DL_DIR)/c3dlnamespace.js \
              $(C3DL_DIR)/constants.js \
              $(C3DL_DIR)/effects/effect_docs.js \
              $(C3DL_DIR)/debug.js \
              $(C3DL_DIR)/renderer/renderer.js \
              $(C3DL_DIR)/renderer/rendererwebgl.js \
              $(C3DL_DIR)/renderer/programobject.js \
              $(C3DL_DIR)/math/mjs.js \
              $(C3DL_DIR)/math/mathutils.js \
              $(C3DL_DIR)/math/vector.js \
              $(C3DL_DIR)/math/matrix.js \
              $(C3DL_DIR)/math/quaternion.js \
              $(C3DL_DIR)/matrixstack.js \
              $(C3DL_DIR)/camera/camera.js \
              $(C3DL_DIR)/camera/freecamera.js \
              $(C3DL_DIR)/camera/orbitcamera.js \
              $(C3DL_DIR)/enclosure/boundingsphere.js \
              $(C3DL_DIR)/enclosure/boundingvolume.js \
              $(C3DL_DIR)/enclosure/visualboundingsphere.js \
              $(C3DL_DIR)/enclosure/obb.js \
              $(C3DL_DIR)/enclosure/aabb.js \
              $(C3DL_DIR)/actors/actor.js \
              $(C3DL_DIR)/actors/primitive.js \
              $(C3DL_DIR)/actors/point.js \
              $(C3DL_DIR)/actors/line.js \
              $(C3DL_DIR)/shapes/shape.js \
              $(C3DL_DIR)/shapes/cube.js \
              $(C3DL_DIR)/shapes/plane.js \
              $(C3DL_DIR)/shapes/sphere.js \
              $(C3DL_DIR)/shapes/custom.js \
              $(C3DL_DIR)/shapes/customplane.js \
              $(C3DL_DIR)/frustum_culling/frustum.js \
              $(C3DL_DIR)/frustum_culling/plane.js \
              $(C3DL_DIR)/scene.js \
              $(C3DL_DIR)/texture/texture.js \
              $(C3DL_DIR)/texture/texturemanager.js \
              $(C3DL_DIR)/texture/textureutils.js \
              $(C3DL_DIR)/collada/colladamanager.js \
              $(C3DL_DIR)/collada/colladaloader.js \
              $(C3DL_DIR)/collada/colladaqueue.js \
              $(C3DL_DIR)/collada/geometry.js \
              $(C3DL_DIR)/collada/primitiveset.js \
              $(C3DL_DIR)/light/light.js \
              $(C3DL_DIR)/light/positionallight.js \
              $(C3DL_DIR)/light/directionallight.js \
              $(C3DL_DIR)/light/spotlight.js \
              $(C3DL_DIR)/material.js \
              $(C3DL_DIR)/collada/collada.js \
              $(C3DL_DIR)/scenegraph/scenenode.js \
              $(C3DL_DIR)/utilities/utilities.js \
              $(C3DL_DIR)/shaders/model/light/light_vs.js \
              $(C3DL_DIR)/shaders/model/material/material.js \
              $(C3DL_DIR)/shaders/model/standard/model_fs.js \
              $(C3DL_DIR)/shaders/model/standard/model_vs.js \
              $(C3DL_DIR)/shaders/model/standard/std_callback.js \
              $(C3DL_DIR)/shaders/particle_system/psys_vs.js \
              $(C3DL_DIR)/shaders/particle_system/psys_fs.js \
              $(C3DL_DIR)/shaders/point/point/point_vs.js \
              $(C3DL_DIR)/shaders/point/point/point_fs.js \
              $(C3DL_DIR)/shaders/point/sphere/point_sphere_vs.js \
              $(C3DL_DIR)/shaders/point/sphere/point_sphere_fs.js \
              $(C3DL_DIR)/shaders/line/line_vs.js \
              $(C3DL_DIR)/shaders/line/line_fs.js \
              $(C3DL_DIR)/shaders/bounding_sphere/bounding_sphere_vs.js \
              $(C3DL_DIR)/shaders/bounding_sphere/bounding_sphere_fs.js \
              $(C3DL_DIR)/shaders/model/greyscale/greyscale_vs.js \
              $(C3DL_DIR)/shaders/model/greyscale/greyscale_fs.js \
              $(C3DL_DIR)/shaders/model/greyscale/greyscale_callback.js \
              $(C3DL_DIR)/shaders/model/sepia/sepia_vs.js \
              $(C3DL_DIR)/shaders/model/sepia/sepia_fs.js \
              $(C3DL_DIR)/shaders/model/sepia/sepia_callback.js \
              $(C3DL_DIR)/shaders/model/cartoon/cartoon_vs.js \
              $(C3DL_DIR)/shaders/model/cartoon/cartoon_fs.js \
              $(C3DL_DIR)/shaders/model/cartoon/cartoon_callback.js \
              $(C3DL_DIR)/shaders/model/gooch/gooch_vs.js \
              $(C3DL_DIR)/shaders/model/gooch/gooch_fs.js \
              $(C3DL_DIR)/shaders/model/gooch/gooch_callback.js \
              $(C3DL_DIR)/shaders/model/solid_color/solid_color_vs.js \
              $(C3DL_DIR)/shaders/model/solid_color/solid_color_fs.js \
              $(C3DL_DIR)/shaders/model/solid_color/solid_color_callback.js \
              $(C3DL_DIR)/effects/effecttemplate.js \
              $(C3DL_DIR)/effects/effect.js \
              $(C3DL_DIR)/particle_system/particlesystem.js \
              $(C3DL_DIR)/particle_system/particle.js \
              $(C3DL_DIR)/init.js \
              $(C3DL_DIR)/interaction/collision.js \
              $(C3DL_DIR)/interaction/picking.js \
              $(C3DL_DIR)/interaction/pickingresult.js \
              $(NULL)

CLOSURE := java -jar $(TOOLS_DIR)/closure/compiler.jar

c3dl: $(DIST_DIR) $(C3DL_DIST) $(C3DL_MIN)
	@@echo "Finishied. See $(DIST_DIR)"

$(DIST_DIR):
	@@mkdir -p $(DIST_DIR)

$(C3DL_DIST): $(DIST_DIR)
	@@echo "Building $(C3DL_DIST)"
	@@cat $(JS_SOURCES) > $(C3DL_DIST)

$(C3DL_MIN): $(DIST_DIR)
	@@echo "Building $(C3DL_MIN)"
	@@$(CLOSURE) $(shell for js in $(JS_SOURCES) ; do echo --js $$js ; done) \
	             --compilation_level SIMPLE_OPTIMIZATIONS \
	             --js_output_file $(C3DL_MIN)

advanced: $(DIST_DIR)
	@@echo "Building $(C3DL_MIN) with advanced optimizations"
	@@$(CLOSURE) $(shell for js in $(JS_SOURCES) ; do echo --js $$js ; done) \
	             --compilation_level ADVANCED_OPTIMIZATIONS \
	             --js_output_file $(C3DL_MIN)
clean:
	@@rm -fr $(DIST_DIR)
