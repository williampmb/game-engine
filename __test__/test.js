function printResource() {
  let resources = game.storage;
  Object.entries(resources).map(([key, value]) => {
    console.log(key, ":", value);
  });
}

function test1() {
  let testGame = new Game();
  testGame.setup();

  if (testGame.entities.length == 4) {
    console.log("works");
  } else {
    console.log("fail");
  }
}


