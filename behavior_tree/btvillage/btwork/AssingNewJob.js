class AssingNewJob extends BTNode {
  constructor(npc) {
    super();
    this.npc = npc;
  }

  think() {
    let newJob = this.npc.newJob;

    let x = newJob.x,
      y = newJob.y;
    let resource = newJob.resource;
    let job = resource && resource.job ? resource.job : null;
    let kind = KIND.NONE;
    if (resource) {
      if (
        resource.kind === TYPE.BUILDING &&
        resource.construction === BUILDING_STATUS.IN_PROGRESS
      ) {
        job = JOB.BUILDING;
      }
      kind = resource.kind;
      [x, y] = resource.getAvailablePosInJob();
    }

    this.npc.task = {
      pos: new Vector2D(x, y),
      kind,
    };

    this.npc.job = job;
    this.npc.newJob = { hasNewJob: false, resource: null, x, y };
    this.npc.resource = resource;

    return this.npc.hasNewJob ? BTNODE_STATUS.SUCCESS : BTNODE_STATUS.FAILURE;
  }
}
