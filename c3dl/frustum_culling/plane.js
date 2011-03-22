c3dl.Plane_Frustrum = function () {
  this.normal = new C3DL_FLOAT_ARRAY(3);
  this.offset = null;
  this.init = function(normal, offset) {
		this.normal[0] = normal[0];
		this.normal[1] = normal[1];
		this.normal[2] = normal[2];
		this.offset = offset;
  }
  this.normalize = function() {
    var norm = Math.sqrt( this.normal[0] * this.normal[0] + this.normal[1] * this.normal[1] + 
		    this.normal[2] * this.normal[2]);
	this.normal[0] /= norm;
	this.normal[1] /= norm;
	this.normal[2] /= norm;
	this.offset /= norm;
	}
}
