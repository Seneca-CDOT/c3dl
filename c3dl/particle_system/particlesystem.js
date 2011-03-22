/*
  Copyright (c) 2008 Seneca College
  Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
*/


/**
 @class ParticleSystem is used to simulate phenomena such as fire, smoke, rain, etc.
 */
c3dl.ParticleSystem = function ()
{
  // particle uv's won't change so instead of keeping
  // a copy of uv coords in each particle, keep one copy
  // in the particle system.
  this.particleUVs = new C3DL_FLOAT_ARRAY([1, 1, //
                                       1, 0, //
                                       0, 0, //
                                       0, 1]); //
  // winding order of these verts is counter-clockwise, the same as models. This
  // prevents having to change the winding order state in WebGL when rendering.
  this.billboardVerts = new C3DL_FLOAT_ARRAY([1, -1, 0, // bottom right
                                          1,  1, 0, // top right
                                        - 1,  1, 0, // top left
                                        - 1, -1, 0]); // bottom left
  // this particle system's transformation matrix
  this.mat = new C3DL_FLOAT_ARRAY([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

  // list of the Particle objects.
  this.particles;

  // keep a count of the number of dead particles we have 
  // this turns some operations from O(n) to O(1).
  this.numDeadParticles;

  // every particle in this sytem will have the same texture
  this.texture;

  // velocity range of the particles.  When particles
  // are born they are assigned a range between these two
  // values.
  this.minVelocity = c3dl.makeVector(0, 0, 0);
  this.maxVelocity = c3dl.makeVector(0, 0, 0);

  this.maxAngVel = 0;
  this.minAngVel = 0;

  // lifetime range of the particles in seconds. Once the
  // age of a particle has surpassed its lifetime, the particle
  // is no longer updated and rendered.
  this.minLifetime = 0;
  this.maxLifetime = 0;

  // the color range of the particles. The color also contains an
  // alpha component.
  this.minColor = new C3DL_FLOAT_ARRAY([0, 0, 0, 0]);
  this.maxColor = new C3DL_FLOAT_ARRAY([0, 0, 0, 0]);

  //
  //
  this.minSize = 1;
  this.maxSize = 1;

  // acceleration is a property of the subsystem. Every
  // particle in the subsystem will share the same
  // acceleration.
  this.acceleration = new C3DL_FLOAT_ARRAY([0, 0, 0, 0]);

  // blend modes
  this.dstBlend = c3dl.ZERO;
  this.srcBlend = c3dl.ZERO;

  this.blendEq = c3dl.FUNC_ADD;

  // we need the camera vectors to create a billboard.
  // on each update, we check if our local values are the
  // same as the scene's camera. if the scene's camera 
  // was updated, we recalculate our billboard.
  this.camUp = c3dl.makeVector(0, 0, 0);
  this.camLeft = c3dl.makeVector(0, 0, 0);
  this.camDir = c3dl.makeVector(0, 0, 0);

  // if the particle system is playing then the particles are
  // updated and rendered. Otherwise they are
  this.isPlaying = false;

  // how many particles are emitted per second?
  this.emitRate = 0;

  // these are used to calculate how many particles to emit on update.
  this.timeCounter = 0;
  this.isTimeCounterSetup = false;

  // this will be passed to the renderer
  this.particleVerts = null;
  this.particleColors = null;
  this.particleTexCoords = null;

  // VBOS
  this.VBOVertices = null;
  this.VBOColors = null;
  this.VBOTexCoords = null;
  this.firstTimeRender = true;

  /**
   Emit a number of particles all at once. If the amount of particles 
   to emit exceeds the amount which are available, the last remaining
   particles are emitted.  If there are no particles available to emit,
   none are emitted.
   
   @param numToEmit
   */
  this.emit = function (numToEmit)
  {
    // only emit particles if the user passed in a valid number
    // and there is actually space left to emit.
    // If we have a dead particle, that means we can recycle it.
    if (numToEmit <= 0 || this.numDeadParticles == 0)
    {
      return;
    }

    // if we tried to emit more particles than there is enough
    // space for, just emit the last remaining particles, since
    // our array is static, there is nothing we can do except wait
    // for particles to die off.
    //
    // cap the amount of particles to emit.
    numToEmit = (numToEmit > this.numDeadParticles) ? this.numDeadParticles : numToEmit;

    // stay within the bounds and don't emit more than we have.
    // we count down until numParticlesToEmit is zero.
    for (var i = 0, len = this.particles.length; i < len && numToEmit > 0; i++)
    {
      // if we found a dead particle, recycle it.
      if (this.particles[i].isAlive() == false)
      {
        // emit the particle at index i which is recyclable.
        this.emitParticle(i);

        // one less we have to emit
        numToEmit--;
      }
    }
  }

  /**
   @private
   Emit a particle at index 'index'.
   
   @param index
   */
  this.emitParticle = function (index)
  {
    if (index >= 0 && index < this.particles.length)
    {
      this.particles[index].setVelocity([
        c3dl.getRandom(this.minVelocity[0], this.maxVelocity[0]), 
        c3dl.getRandom(this.minVelocity[1], this.maxVelocity[1]), 
        c3dl.getRandom(this.minVelocity[2], this.maxVelocity[2])
        ]);

      this.particles[index].setAge(0);
      this.particles[index].setLifetime(c3dl.getRandom(this.minLifetime, this.maxLifetime));
      this.particles[index].setAlive(true);

      // when the particle is emitted, we assign it the position of the particle system
      // By doing this, moving the particle system will not move the particles.
      this.particles[index].setPosition([this.mat[12], this.mat[13], this.mat[14]]);

      this.particles[index].setColor([
        c3dl.getRandom(this.minColor[0], this.maxColor[0]), 
        c3dl.getRandom(this.minColor[1], this.maxColor[1]), 
        c3dl.getRandom(this.minColor[2], this.maxColor[2]), 
        c3dl.getRandom(this.minColor[3], this.maxColor[3]), 
        ]);

      this.particles[index].setSize(c3dl.getRandom(this.minSize, this.maxSize));

      // we now have one less particle to recycle.
      this.numDeadParticles--;
    }
  }


  /**
   Initialize the subsystem.  This must be called before the particle 
   system is actually used.
   
   @param {integer} numParticles
   */
  this.init = function (numParticles)
  {
    // allocate once since allocation is expensive. We will just recycle the 
    // particles when they die.
    this.particles = new Array(numParticles);

    for (var i = 0; i < numParticles; i++)
    {
      this.particles[i] = new c3dl.Particle();
    }

    this.particleVerts = new C3DL_FLOAT_ARRAY(this.particles.length * 3 * 4);
    this.particleColors = new C3DL_FLOAT_ARRAY(this.particles.length * 4 * 4);
    this.particleTexCoords = new C3DL_FLOAT_ARRAY(this.particles.length * 2 * 4);

    for (var i = 0, len = this.particleColors.length; i < len; i++)
    {
      this.particleColors[i] = 0.0;
    }
    for (var i = 0, len = this.particleVerts.length; i < len; i++)
    {
      this.particleVerts[i] = 0.0;
    }
    for (var i = 0, len = this.particleTexCoords.length; i < len; i++)
    {
      this.particleTexCoords[i] = 0;
    }

    // fix this depending on emission
    this.isPlaying = true;
    this.numDeadParticles = this.particles.length;
  }

  /**
   @private
   is the subsystem ready to render?
   
   @return true if the subsystem is ready to render.
   */
  this.isReady = function ()
  {
    return (this.particles instanceof Array);
  }

  /**
   Get the total amount of particles in the system, including dead ones.
   
   return {int}
   */
  this.getNumParticles = function ()
  {
    return this.particles.length;
  }

  /**
   Get the particle at index i.
   
   @param {int} i the index of the particle to get.
   */
  this.getParticle = function (i)
  {
    if (i >= 0 && i < this.particles.length)
    {
      return this.particles[i];
    }
  }

  /**
   @private
   */
  this.getVertices = function ()
  {
    return this.billboardVerts;
  }

  /**
   @private
   */
  this.getTexCoords = function ()
  {
    return this.particleUVs;
  }

  /**
   @private
   Removed the particle at index 'index' from being update and rendered.
   
   @param 
   */
  this.killParticle = function (index)
  {
    if (index > 0 && index < this.particles.length)
    {
      this.particles[index].setAlive(false);
      this.numDeadParticles++;
    }
  }

  /**
   Set the amount of particles to emit per second. To stop emission, pass in zero.
   
   @param particlesPerSecond
   */
  this.setEmitRate = function (particlesPerSecond)
  {
    if (particlesPerSecond == 0)
    {
      this.emitRate = 0;
      this.isTimeCounterSetup = false;
    }
    else if (particlesPerSecond > 0)
    {
      this.emitRate = particlesPerSecond;
    }
  }


  /**
   @private
   testing funciton
   */
  this.translate = function (vec)
  {
    this.mat[12] += vec[0];
    this.mat[13] += vec[1];
    this.mat[14] += vec[2];
  }

  /**
   Set the position of the particle system.
   
   @param {Array} 
   */
  this.setPosition = function (vec)
  {
    this.mat[12] = vec[0];
    this.mat[13] = vec[1];
    this.mat[14] = vec[2];
  }


  /**
   Get the acceleration of all the particles.  This is usually 
   gravity, but does not have to be.
   */
  this.getAcceleration = function ()
  {
    return new C3DL_FLOAT_ARRAY(this.acceleration);
  }

  /**
   Get blend equation
   */
  this.getBlendEquation = function ()
  {
    return this.blendEq;
  }

  /**
   get the desination blend factor.
   
   @return {int} the destination blend factor.
   */
  this.getDstBlend = function ()
  {
    return this.dstBlend;
  }

  /**
   Get the maximum color range.  The max color range 
   is an array of components which each contain the
   maximum value each component can be assigned. components
   range from 0 to 1.
   
   @returns {Array}
   */
  this.getMaxColor = function ()
  {
    return new C3DL_FLOAT_ARRAY(this.maxColor);
  }

  /**
   Get the minimum color range.
   @returns {Array}
   */
  this.getMinColor = function ()
  {
    return new C3DL_FLOAT_ARRAY(this.minColor);
  }

  /**
   Get the maximum number of seconds for which any particle can live.
   
   @return the maximum number of seconds for which any particle 
   can live.
   */
  this.getMaxLifetime = function ()
  {
    return this.maxLifetime;
  }

  /**
   Get the minimum amount of seconds for which any particle can live.
   
   @return the minimum amount of seconds for which any particle can live.
   */
  this.getMinLifetime = function ()
  {
    return this.minLifetime;
  }

  /**
   */
  this.getMinVelocity = function ()
  {
    return new C3DL_FLOAT_ARRAY(this.minVelocity);
  }

  /**
   Get the maximum values for each xyz component any particle can 
   be assigned when emitted.
   
   @return {Array} the maximum values for each xyz component any particle can 
   be assigned when emitted.
   */
  this.getMaxVelocity = function ()
  {
    return new C3DL_FLOAT_ARRAY(this.maxVelocity);
  }

  /**
   Get the texture which all particles are assigned.
   
   @return {String} the texture which all particles are assigned.
   */
  this.getTexture = function ()
  {
    return this.texture;
  }

  /**
   Get the source blending factor.
   
   @return {int} the source blending factor.
   */
  this.getSrcBlend = function ()
  {
    return this.srcBlend;
  }

  /**
   Set the acceleration of this subsystem. This is commonly gravity, but can be
   any valid vector.
   
   @param {Array} acceleration
   */
  this.setAcceleration = function (acceleration)
  {
    this.acceleration[0] = acceleration[0];
	this.acceleration[1] = acceleration[1];
	this.acceleration[2] = acceleration[2];
	this.acceleration[3] = acceleration[3];
  }

  /**
   Set the destination blend factor. parameter must be one of:
   c3dl.ZERO,
   c3dl.ONE,
   c3dl.SRC_COLOR,
   c3dl.ONE_MINUS_SRC_COLOR,
   c3dl.SRC_ALPHA,	
   c3dl.ONE_MINUS_SRC_ALPHA,
   c3dl.DST_ALPHA,
   c3dl.ONE_MINUS_DST_ALPHA,
   c3dl.DST_COLOR,
   c3dl.ONE_MINUS_DST_COLOR or
   c3dl.SRC_ALPHA_SATURATE
   
   @param {int} dstBlend
   */
  this.setDstBlend = function (dstBlend)
  {
    switch (dstBlend)
    {
    case c3dl.ZERO:
    case c3dl.ONE:
    case c3dl.SRC_COLOR:
    case c3dl.ONE_MINUS_SRC_COLOR:
    case c3dl.SRC_ALPHA:
    case c3dl.ONE_MINUS_SRC_ALPHA:
    case c3dl.DST_ALPHA:
    case c3dl.ONE_MINUS_DST_ALPHA:
    case c3dl.DST_COLOR:
    case c3dl.ONE_MINUS_DST_COLOR:
    case c3dl.SRC_ALPHA_SATURATE:
      this.dstBlend = dstBlend;
      break;
    }
  }

  /**
   Set the maximum color range a particle can be assigned.  Each component
   must range from 0 to 1 inclusive.
   
   @param {Array} maxColor - array of 4 floating point values ranging from 0 to 1 inclusive.
   */
  this.setMaxColor = function (maxColor)
  {
    if (c3dl.isValidColor(maxColor))
    {
      this.maxColor[0] = maxColor[0];
	  this.maxColor[1] = maxColor[1];
	  this.maxColor[2] = maxColor[2];
	  this.maxColor[3] = maxColor[3];
    }
  }

  /**
   Set the minimum color values each particle can be.
   
   @param {Array} minParticleColor the minimum Color values each particle 
   can be.
   */
  this.setMinColor = function (minColor)
  {
    if (c3dl.isValidColor(minColor))
    {
      this.minColor[0] = minColor[0];
	  this.minColor[1] = minColor[1];
	  this.minColor[2] = minColor[2];
	  this.minColor[3] = minColor[3];
    }
  }

  /**
   Set the maximum number of seconds for which any particle can live.
   Value must be greater than zero.
   
   @param {float} maxLifetime
   */
  this.setMaxLifetime = function (maxLifetime)
  {
    if (maxLifetime > 0)
    {
      this.maxLifetime = maxLifetime;
    }
  }

  /**
   Set the minimum amount of seconds for which particles will live.
   Value must be greater than zero.
   
   @param minParticleLifetime the minimum amount of seconds for 
   which the particles can live.
   */
  this.setMinLifetime = function (minLifetime)
  {
    if (minLifetime > 0)
    {
      this.minLifetime = minLifetime;
    }
  }

  /**
   
   */
  this.setMaxSize = function (maxSize)
  {
    if (maxSize > 0)
    {
      this.maxSize = maxSize;
    }
  }

  /**
   
   */
  this.setMinSize = function (minSize)
  {
    if (minSize > 0)
    {
      this.minSize = minSize;
    }
  }

  /**
   Set the minimum velocity of all the particles.
   
   @param {Array} minVelocity the minimum velocity of all the particles.
   */
  this.setMinVelocity = function (minVelocity)
  {
    this.minVelocity[0] = minVelocity[0];
	this.minVelocity[1] = minVelocity[1];
	this.minVelocity[2] = minVelocity[2];
  }

  /**
   Set the maximum velocity of all the particles.
   
   @param {Array} maxVelocity the maximum velocity of all the particles.
   */
  this.setMaxVelocity = function (maxVelocity)
  {
    this.maxVelocity[0] = maxVelocity[0];
	this.maxVelocity[1] = maxVelocity[1];
	this.maxVelocity[2] = maxVelocity[2];
  }

  /**
   */
  this.setMaxAngularVelocity = function (maxAngVel)
  {
    this.maxAngVel = maxAngVel;
  }

  /**
   */
  this.setMinAngularVelocity = function (minAngVel)
  {
    this.minAngVel = minAngVel;
  }

  /**
   (src * srcBlend) Eq (dst * dstBlend)
   
   @param {int} blenEq
   */
  this.setBlendEquation = function (blendEq)
  {
    switch (blendEq)
    {
    case c3dl.FUNC_ADD:
    case c3dl.FUNC_SUBTRACT:
    case c3dl.FUNC_REVERSE_SUBTRACT:
      this.blendEq = blendEq;
      break;
    }
  }


  /**
   Set the Source blending factor.  parameter must be one of:
   c3dl.ZERO,
   c3dl.ONE,
   c3dl.SRC_COLOR,
   c3dl.ONE_MINUS_SRC_COLOR,
   c3dl.SRC_ALPHA,	
   c3dl.ONE_MINUS_SRC_ALPHA,
   c3dl.DST_ALPHA,
   c3dl.ONE_MINUS_DST_ALPHA,
   c3dl.DST_COLOR,
   c3dl.ONE_MINUS_DST_COLOR or
   c3dl.SRC_ALPHA_SATURATE
   
   @param {int} srcBlend
   */
  this.setSrcBlend = function (srcBlend)
  {
    switch (srcBlend)
    {
    case c3dl.ZERO:
    case c3dl.ONE:
    case c3dl.SRC_COLOR:
    case c3dl.ONE_MINUS_SRC_COLOR:
    case c3dl.SRC_ALPHA:
    case c3dl.ONE_MINUS_SRC_ALPHA:
    case c3dl.DST_ALPHA:
    case c3dl.ONE_MINUS_DST_ALPHA:
    case c3dl.DST_COLOR:
    case c3dl.ONE_MINUS_DST_COLOR:
    case c3dl.SRC_ALPHA_SATURATE:
      this.srcBlend = srcBlend;
      break;
    }
  }


  /**
   Set the texure of the particles.
   
   @param {String} textureName
   */
  this.setTexture = function (textureName)
  {
    this.texture = textureName;
  }

  /**
   @private
   Update the positions of the particles if they are alive.  Also,
   calculate how many particles to emit if the emit rate has been
   set.
   
   @param {float} timeStep
   */
  this.update = function (timeStep)
  {
    // only calculate how many to emit if we actually want to 
    // emit particles
    if (this.emitRate > 0)
    {
      // get the time
      if (this.isTimeCounterSetup == false)
      {
        this.timeCounter = timeStep;
        this.isTimeCounterSetup = true;
      }
      else
      {
        this.timeCounter += timeStep;
      }

      // The user supplies the amount of particles to emit per second since people are
      // more accustomed to using seconds than milliseconds.  However timeStep is in 
      // milliseconds, so we calculate how many to emit in 1000 milliseconds.
      var numToEmit = this.timeCounter * this.emitRate / 1000.0;

      // if enough time has elapsed to emit at least one particle, emit however
      // many particles.  Otherwise we will have to wait until next update and
      // check again until we can emit at least one.
      if (numToEmit >= 1)
      {
        // numToEmit may be a float, but emit should only be passed
        // an integer
        this.emit(numToEmit);

        // subtract time from the timeCounter to prevent too
        // many paritcles from being emitted on the next update
        this.timeCounter -= numToEmit / this.emitRate * 1000.0;
      }
    }

    var p = 0,
      j = 0;
    for (var i = 0, len =this.particleColors.length; i < len; i++, j++)
    {
      if (i != 0 && i % 16 == 0)
      {
        p++
        // c3dl.debug.logWarning(p + "   " + this.particles[p].getColor());
      }

      if (j > 3)
      {
        j = 0;
      }
      this.particleColors[i] = this.particles[p].getColor()[j];
    }
    //     c3dl.debug.logWarning(p + "  .   " + this.particleColors);
    // now update the particles
    for (var i = 0, len = this.particles.length; i < len; i++)
    {
      // don't update the particle unless its alive.
      if (this.particles[i].isAlive())
      {
        var timeInSeconds = timeStep / 1000;

        // make shorter variable names to prevent clutter.
        var pos = this.particles[i].getPosition();
        var vel = this.particles[i].getVelocity();

        this.particles[i].translate([
          (vel[0] * timeInSeconds) + this.acceleration[0] * timeInSeconds * timeInSeconds * 0.5,
          (vel[1] * timeInSeconds) + this.acceleration[1] * timeInSeconds * timeInSeconds * 0.5, 
          (vel[2] * timeInSeconds) + this.acceleration[2] * timeInSeconds * timeInSeconds * 0.5]);

        //
        for (var p = 0, j = 0; p < 12; p++, j++)
        {
          if (j > 2)
          {
            j = 0;
          }
          this.particleVerts[i * 12 + p] = this.particles[i].getPosition()[j] + this.getVertices()[p];
        }



        // update the velocity
        this.particles[i].setVelocity([
          vel[0] + (this.acceleration[0] * timeInSeconds), vel[1] + (this.acceleration[1] * timeInSeconds),
          vel[2] + (this.acceleration[2] * timeInSeconds)]);

        // Age the particle
        this.particles[i].setAge(this.particles[i].getAge() + timeInSeconds);

        // kill the particle if it went past its lifetime. If the particle
        // is dead, it won't be updated or rendered until it is recycled.
        if (this.particles[i].getAge() > this.particles[i].getLifetime())
        {
          this.killParticle(i);
        }
      }
    }
  }

  this.getVBOTexCoords = function ()
  {
    return this.VBOTexCoords;
  }

  /**
   */
  this.getVBOVertices = function ()
  {
    return this.VBOVertices;
  }

  /**
   */
  this.getVBOColors = function ()
  {
    return this.VBOColors;
  }

  /**
   @private
   prepare to render the particles. This includes turning off lighting, enabling blending, etc.
   
   @param glCanvas3D
   @param {Scene} scene
   */
  this.preRender = function (glCanvas3D, scene)
  {
    if (this.firstTimeRender === true)
    {
      for (var i = 0, j = 0, len = this.particleTexCoords.length; i < len; i++, j++)
      {
        if (j > 7)
        {
          j = 0;
        }
        this.particleTexCoords[i] = this.particleUVs[j];
      }

      this.VBOColors = glCanvas3D.createBuffer();
      glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.VBOColors);
      glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, this.particleColors, glCanvas3D.STREAM_DRAW);

      this.VBOVertices = glCanvas3D.createBuffer();
      glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.VBOVertices);
      glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, this.particleVerts, glCanvas3D.STREAM_DRAW);

      this.VBOTexCoords = glCanvas3D.createBuffer();
      glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.VBOTexCoords);
      glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, this.particleTexCoords, glCanvas3D.STREAM_DRAW);

      this.firstTimeRender = 0;
    }
    else
    {
      glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.VBOColors);
      glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, this.particleColors, glCanvas3D.STREAM_DRAW);

      glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.VBOVertices);
      glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, this.particleVerts, glCanvas3D.STREAM_DRAW);

      glCanvas3D.bindBuffer(glCanvas3D.ARRAY_BUFFER, this.VBOTexCoords);
      glCanvas3D.bufferData(glCanvas3D.ARRAY_BUFFER, this.particleTexCoords, glCanvas3D.STREAM_DRAW);
    }

    // disable writing into the depth buffer. This will prevent
    // the corners of texture overlapping each other.
    glCanvas3D.depthMask(false);

    // blending is expensive, so only enable for things that need it.
    glCanvas3D.enable(glCanvas3D.BLEND);

    // 
    glCanvas3D.blendEquation(this.blendEq);

    //
    glCanvas3D.blendFunc(this.getSrcBlend(), this.getDstBlend());
  }

  /**
   @private
   Re-enable the depth testing, lighting, etc.
   
   @param glCanvas3D
   @param {Scene} scene
   */
  this.postRender = function (glCanvas3D, scene)
  {
    // blending is expensive so turn it off when not needed.
    glCanvas3D.disable(glCanvas3D.BLEND);
    glCanvas3D.depthMask(true);
  }

  /**
   @private
   Draw all the particles which are alive.
   
   @param glCanvas3D
   @param {Scene} scene
   */
  this.render = function (glCanvas3D, scene)
  {
    //
    this.recalculateBillboard(glCanvas3D, scene);

    this.preRender(glCanvas3D, scene);

    scene.getRenderer().renderParticleSystem(this, scene);

    this.postRender(glCanvas3D, scene);
  }

  /**
   */
  this.getObjectType = function ()
  {
    return c3dl.PARTICLE_SYSTEM;
  }


  /**
   @private
   */
  this.recalculateBillboard = function (glCanvas3D, scene)
  {
    // if any of the vectors have changed, we have
    // to recalculate the billboard.
    // if they are equal we don't have to do any more
    if (!(c3dl.isVectorEqual(this.camUp, scene.getCamera().getUp()) &&
      c3dl.isVectorEqual(this.camLeft, scene.getCamera().getLeft()) && 
      c3dl.isVectorEqual(this.camDir, scene.getCamera().getDir())))
    {
      // get local copies of the camera vectors.
      this.camUp = scene.getCamera().getUp();
      this.camLeft = scene.getCamera().getLeft();
      this.camDir = scene.getCamera().getDir();

      var camRight = [-this.camLeft[0], -this.camLeft[1], -this.camLeft[2]];

      var bottomRight = c3dl.subtractVectors(camRight, this.camUp);
      var bottomLeft = c3dl.subtractVectors(this.camLeft, this.camUp);
      var topLeft = c3dl.addVectors(this.camLeft, this.camUp);
      var topRight = c3dl.addVectors(camRight, this.camUp);

      // use counter clockwise order since models vertices are also counter clockwise.
      // This prevents having to change the WebGL state of the winding order when 
      // switching between rendering models and particle systems.			
      this.billboardVerts = [bottomRight[0], bottomRight[1], bottomRight[2], 
                             topRight[0], topRight[1], topRight[2], 
                             topLeft[0], topLeft[1], topLeft[2], 
                             bottomLeft[0], bottomLeft[1], bottomLeft[2]];
    }
  }
}