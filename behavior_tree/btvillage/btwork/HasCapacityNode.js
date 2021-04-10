class HasCapacityNode extends BTNode {
  constructor(capacity,threshold) {
    super();
    this.capacity = capacity;
    this.threshold = threshold;
  }

  think() {
    
    return this.capacity < this.threshold
      ? BTNODE_STATUS.SUCCESS
      : BTNODE_STATUS.FAILURE;
  }
}
