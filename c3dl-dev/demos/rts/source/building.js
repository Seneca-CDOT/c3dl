
function Building(maxOccupants, maxHealth, path,type, repairTime){
	//homes only
  this.numOfOccupants    = 0; //the number of people in the building
  this.maxNumOfOccupants = maxOccupants; //the maximum amount of people allowed in the building
  this.numOfBanks        = 0; //the number of nearby banks, this will affect the amount of money each building will make
  this.isInhabitable     = true; //can the building house people, burned buildings cannot have people

  //all buildings
  this.isBurning         = false; //is the building burning
  this.maxHealth         = maxHealth; //the maximum health of the building
	this.health            = maxHealth; //the current health of the building
  this.level             = 1; //the building's level, this will affect maxNumOfOccupants, maxHealth, and rapairRate
  this.modelPath         = path; //the path to the DAE file
	this.collada           = null; //the visual representation
  this.type              = type; //the type of building home, firestation,  lumber mill, bank
	this.burningEffect     = null; //the particle system and effect
  this.selected          = false;
	this.isBeingRepaired   = false;
  //firestation and lumber mill
  this.adjacentBuilding  = new Array(); //a list of nearby buildings that needed to determine which buildings can be extinguish and repaired
  this.timeToRepair      = repairTime; //the time unit at which the building is repaired or extinguished after fire damage
	this.isRepairing       = false; //firestation and lumber mill can only repair one building at a time
}
Building.prototype.getOccupants = function(){
	return this.numOfOccupants;
}
Building.prototype.getMaxOccupants = function(){
	return this.maxNumOfOccupants;
}
Building.prototype.getHealth = function(){
	return this.health;
}
Building.prototype.getMaxHealth = function(){
	return this.maxHealth;
}
Building.prototype.getLevel = function(){
	return this.level;
}
Building.prototype.getType = function(){
	return this.type;
}
Building.prototype.getPath = function(){
	return this.modelPath;
}
Building.prototype.getNumOfBanks = function(){
	return this.numOfBanks;
}
Building.prototype.burningCheck = function(){
	return this.isBurning;
}
Building.prototype.setBurning = function(burning){
	this.isBurning = burning;
}
Building.prototype.repairingCheck = function(){
	return this.isRepairing;
}
Building.prototype.setRepairing = function(repairing){
	this.isRepairing = repairing;
}
Building.prototype.isBeingRepairedCheck = function(){
	return this.isBeingRepaired;
}
Building.prototype.setIsBeingRepaired = function(repairing){
	this.isBeingRepaired = repairing;
}
Building.prototype.getSelection = function(){
	return this.selected;
}
Building.prototype.setSelection = function(selection){
	this.selected = selection;
}
//add a bank
Building.prototype.addBank = function(){
	this.numOfBanks++;
}
//adds an occupant and returns true if sucessfully added
Building.prototype.addOccupants = function(){
	var ret = false;
	if(this.numOfOccupants < this.maxNumOfOccupants)
	{
		this.numOfOccupants ++;
		ret = true;
	}
	return ret;
}
//sets the number of occupants to 0, returns the amount of occupants ejected
Building.prototype.ejectAll = function(){
	var ret = this.numOfOccupants;
	this.numOfOccupants = 0;
	return ret;
}
Building.prototype.setCollada = function(){
	this.collada = new c3dl.Collada();
	this.collada.init(this.modelPath);
}
Building.prototype.setColladaPitch = function(pitch){
	if(this.collada)
	{
		this.collada.pitch(pitch);
	}
}
Building.prototype.getColladaPosition = function(){
	if(this.collada)
	{
		return this.collada.getPosition();
	}
}
Building.prototype.setColladaPosition = function(position){
	if(this.collada)
	{
		this.collada.setPosition(position);
	}
}
Building.prototype.setColladaID = function(id){
	if(this.collada)
	{
		this.collada.id = id;
	}
}
Building.prototype.getColladaID = function(){
	if(this.collada)
	{
		return this.collada.id;
	}
}
Building.prototype.getCollada = function(){
	return this.collada;
}
Building.prototype.setColorFilter = function(color){
	var material = new c3dl.Effect();
  material.init(c3dl.effects.SEPIA);
  material.setParameter("color", color);
	this.collada.setEffect(material);
}
Building.prototype.setBuildingEffect = function(effect){
	this.collada.setEffect(effect);
}
Building.prototype.startBurning = function(){
	//add the particle system
  this.burningEffect = new c3dl.ParticleSystem();
	this.burningEffect.setMinVelocity([-.5,3,-.5]);
	this.burningEffect.setMaxVelocity([.2,5, .5]);
  
	this.burningEffect.setMinLifetime(1);
	this.burningEffect.setMaxLifetime(3);
  
	this.burningEffect.setMinColor([0.5,0,0,0]);
	this.burningEffect.setMaxColor([1,0.5,0,1]);
  
	this.burningEffect.setSrcBlend(c3dl.ONE);
	this.burningEffect.setDstBlend(c3dl.ONE);
  
  this.burningEffect.setMinSize(0.4);
  this.burningEffect.setMaxSize(0.8);
  
	this.burningEffect.setTexture("textures/flare.gif");
	this.burningEffect.setAcceleration([0,0,0]);
	this.burningEffect.setEmitRate(90);
	this.burningEffect.init(150);
  this.burningEffect.setPosition(this.collada.getPosition()); 
	this.isBurning = true;
	return this.burningEffect;
}