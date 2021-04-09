function printResource() {
  let resources = game.storage;
  Object.entries(resources).map(([key, value]) => {
    console.log(key, ":", value);
  });
}
