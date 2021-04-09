const RESOURCE  = {
  WOOD: 'wood',
  STONE: 'stone',
};

class Resource {
  constructor(){
    this.material;
  }

  getMaterial(){
    throw Error('Each class should implement')
  }
}


