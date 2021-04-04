class LessThanNode extends BTNode {
  constructor(value, threshold) {
    super();
    this.value = value;
    this.threshold = threshold;
  }

  think() {
    return this.value > this.threshold
      ? BTNODE_STATUS.SUCCESS
      : BTNODE_STATUS.FAILURE;
  }
}
