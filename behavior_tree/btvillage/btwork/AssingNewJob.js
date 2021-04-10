class AssingNewJob extends BTNode {
  constructor() {
    super();
  }

  think() {
    const actor = game.peasantBehavior.getActor();

    let newJob = actor.newJob;

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

    actor.task = {
      pos: new Vector2D(x, y),
      kind,
    };

    actor.job = job;
    actor.newJob = { hasNewJob: false, resource: null, x, y };
    actor.resource = resource;

    return actor.hasNewJob ? BTNODE_STATUS.SUCCESS : BTNODE_STATUS.FAILURE;
  }
}
