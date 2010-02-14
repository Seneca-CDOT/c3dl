/**
 Copyright (c) 2008 Seneca College
 Licenced under the MIT License (http://www.c3dl.org/index.php/mit-license/)
**/
var number = 0;

var soko_board1 = [
  [0,0,0,1,1,1,0,0,0,0,0],
  [0,0,1,1,0,1,0,1,1,1,1],
  [0,1,1,0,0,1,1,1,0,0,1],
  [1,1,0,3,0,0,0,0,0,0,1],
  [1,0,0,0,2,3,0,1,0,0,1],
  [1,1,1,0,3,0,1,1,0,0,1],
  [0,0,1,0,0,1,5,5,0,0,1],
  [0,1,1,0,1,1,5,1,0,1,1],
  [0,1,0,0,0,0,0,0,1,1,0],
  [0,1,0,0,0,0,0,1,1,0,0],
  [0,1,1,1,1,1,1,1,0,0,0]
];

var soko_board2 = [
  [0,1,1,1,1,1,0,0,0],
  [0,1,0,0,0,1,1,1,1],
  [0,1,0,0,2,1,0,0,1],
  [0,1,1,0,0,3,0,5,1],
  [1,1,1,0,1,1,1,5,1],
  [1,0,3,0,1,0,1,5,1],
  [1,0,3,0,1,0,1,1,1],
  [1,0,0,0,1,0,0,0,0],
  [1,1,1,1,1,0,0,0,0]
];


var boards = [soko_board1, soko_board2];

var viewStyle = 0;
var userRow, userCol, userModel;

// constants used to define the level.
const SPACE = 0;
const WALL = 1;
const USER = 2;
const ROCK = 3;
const GEM = 4;
const GOAL = 5;

// Views
const ISOMETRIC = 0;
const BIRDS_EYE = 1;

// move the goals slightly down so they look like they are on the floor.
const GOAL_Y_POS = -0.8;

// when the user moves, we calculate how much to yaw
// by looking at where he wants to go and where he's facing.
const UP = -90;
const DOWN = 90;
const LEFT = 180;
const RIGHT = 0;

var userFacingDir = RIGHT;

// control keys
// use WASD keys instead of arrow keys 
// to prevent firefox from moving the scrollbars
const RIGHT_KEY = 68;
const HELP_KEY = 72;
const LEFT_KEY = 65;
const DOWN_KEY = 83;
const UP_KEY = 87;

var board = null;
var currentLevel = 0;
var scn;
var cam = new c3dl.FreeCamera();

c3dl.addModel("models/duck.dae");
c3dl.addModel("models/cube.dae");
c3dl.addModel("models/rock.dae");
c3dl.addModel("models/gem.dae");
c3dl.addMainCallBack(canvasMain, "puzzler");

function canvasMain(canvasName) {
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  var renderer = new c3dl.WebGL();
  scn.setRenderer(renderer);
  scn.init(canvasName);

  scn.setCamera(cam);
  scn.setAmbientLight([1, 1, 1]);
  loadLevel(currentLevel);

  scn.setKeyboardCallback(null, onKeyDown);
  scn.setUpdateCallback(update);
  scn.startScene();
}

function update() {
  var fps = Math.floor(scn.getFPS());
  var fps_str = "FPS:";
  
  // prevent the last row in the table from 'jumping'
  if(fps < 10) {
    fps_str = "FPS: 0" + fps;
  }
  else {
    fps_str = "FPS: " + fps;
  }
  
  document.getElementById("fps").innerHTML = fps_str;
}

function setViewStyle(style) {
  if (style == ISOMETRIC) {
    cam.setPosition([30, 30, 30]);

    var w = board[0].length / 10;
    var h = -board.length * 1.5;

    cam.setLookAtPoint([w, h, -0.01]);
  } else if (style == BIRDS_EYE) {
    cam.setPosition([7, 40, 0]);

    var x = board[0].length;
    var y = board.length;

    cam.setPosition(new Array(x, 30, y));
    cam.setLookAtPoint(new Array(x, -100, -0.01));
  }
}

function onKeyDown(event) {
  if (event.keyCode == RIGHT_KEY) {
    move(RIGHT);
  }
  if (event.keyCode == LEFT_KEY) {
    move(LEFT);
  }
  if (event.keyCode == DOWN_KEY) {
    move(DOWN);
  }
  if (event.keyCode == UP_KEY) {
    move(UP);
  }
}

function notBlocked(row, col) {
  if (board[row][col] == 0 || board[row][col].getName() == "goal") {
    return true;
  } else {
    return false;
  }
}

function removeObject(row, col) {
  scn.removeObjectFromScene(board[row][col]);
  board[row][col] = 0;
}

function createObject(objectType, col, row) {
  var object = null;

  switch (objectType) {
  case GOAL:
    {
      object = new c3dl.Collada();
      object.init("models/cube.dae");
      object.setName("goal");
      object.setTexture("textures/goal.jpg");
      object.scale([0.13, 0.03, 0.13]);
      object.translate([col, GOAL_Y_POS, row]);
      scn.addObjectToScene(object);
    }
    break;

  case GEM:
    {
      object = new c3dl.Collada();
      object.init("models/gem.dae");
      object.setName("gem");
      object.setTexture("textures/gem.jpg");
      object.setAngularVel([0, -0.005, 0]);
      object.scale([.15, .15, .15]);
      object.translate([col, 0, row]);
      scn.addObjectToScene(object);
    }
    break;

  case ROCK:
    {
      object = new c3dl.Collada();
      object.init("models/rock.dae");
      object.setName("rock");
      object.pitch(Math.random() * 3.14);
      object.yaw(Math.random() * 3.14);
      object.translate([col, 0, row]);
      scn.addObjectToScene(object);
    }
    break;

  case USER:
    {
      object = new c3dl.Collada();
      object.init("models/duck.dae");
      object.setName("user");
      object.setTexture("textures/duck.jpg");
      object.scale(new Array(0.015, 0.015, 0.015));
      userModel = object;
      object.translate(new Array(col, 0, row));
      scn.addObjectToScene(object);
    }
    break;

  case WALL:
    {
      object = new c3dl.Collada();
      object.init("models/cube.dae");
      object.scale([0.2, 0.2, 0.2]);
      object.setTexture("textures/wall.jpg");
      object.translate([col, 0, row]);
      scn.addObjectToScene(object);
    }
    break;

  }
  return object;
}

function moveUser(dir) {
  // rotate the user to point them in the direction they are moving
  // dir = where they are going
  userModel.yaw(c3dl.degreesToRadians(userFacingDir - dir));
  userFacingDir = dir;

  switch (dir) {
  case UP:
    userModel.translate([0, 0, -2]);
    break;
  case DOWN:
    userModel.translate([0, 0, 2]);
    break;
  case LEFT:
    userModel.translate([-2, 0, 0]);
    break;
  case RIGHT:
    userModel.translate([2, 0, 0]);
    break;
  }
}

function move(direction) {
  var rowDir = 0;
  var colDir = 0;

  if (direction == LEFT || direction == RIGHT) {
    colDir = (direction == LEFT) ? -1 : 1;
  } else {
    rowDir = (direction == UP) ? -1 : 1;
  }

  // moving onto empty space or goal
  if (notBlocked(userRow + rowDir, userCol + colDir)) {
    moveUser(direction);
    // one of these statements will add zero to the users row
    // or column, so there's no need to bother with a condition.
    userCol += colDir;
    userRow += rowDir;
  }

  // move a rock
  else if (board[userRow + rowDir][userCol + colDir] && board[userRow + rowDir][userCol + colDir].getName() == "rock") {
    moveRock(direction);
  }

  // move a gem
  else if (board[userRow + rowDir][userCol + colDir] && board[userRow + rowDir][userCol + colDir].getName() == "gem") {
    moveGem(direction);
  }
}

/**
  Returns true if all the rocks have been pushed onto the goals, false otherwise.
*/
function isFinishedLevel() {
  for (var z = 0; z < board.length; z++) {
    for (var x = 0; x < board[z].length; x++) {
      // if there is at least one rock, that means the level is not done yet.	
      if (board[z][x] != 0 && board[z][x].getName() == "rock") {
        return false;
      }
    }
  }
  alert("Quaktastic!");
  return true;
}

function moveRock(direction) {
  var rowDir = 0;
  var colDir = 0;
  var success = false;

  if (direction == LEFT || direction == RIGHT) {
    colDir = (direction == LEFT) ? -1 : 1;
  } else {
    rowDir = (direction == UP) ? -1 : 1;
  }

  // if moving the rock onto an empty space
  if (board[userRow + (rowDir * 2)][userCol + (colDir * 2)] == 0) {
    board[userRow + rowDir][userCol + colDir].translate(new Array((colDir * 2), 0, (rowDir * 2)));

    // update the board
    // the empty space now hold the gem pointer
    board[userRow + (rowDir * 2)][userCol + (colDir * 2)] = board[userRow + rowDir][userCol + colDir];
    board[userRow + rowDir][userCol + colDir] = 0;
    success = true;
  }

  // if moving the rock onto a goal
  else if (board[userRow + (rowDir * 2)][userCol + (colDir * 2)].getName() == "goal") {
    // remove the goal and the rock
    removeObject(userRow + (rowDir * 2), userCol + (colDir * 2));
    removeObject(userRow + rowDir, userCol + colDir);

    // create a gem
    var gem = createObject(GEM, (userCol + colDir * 2) * 2, (userRow + rowDir * 2) * 2);
    board[userRow + (rowDir * 2)][userCol + (colDir * 2)] = gem;

    // if the user just moved a rock onto a goal, check if this was the last one,
    // if so, we can load the next level
    if (isFinishedLevel()) {
      currentLevel++;
      loadLevel(currentLevel);
    }

    success = true;
  }

  if (success) {
    // update the users position on the board
    moveUser(direction);
    userRow += rowDir;
    userCol += colDir;
  }
}

function moveGem(direction) {
  var rowDir = 0;
  var colDir = 0;
  var success = false;

  if (direction == LEFT || direction == RIGHT) {
    colDir = (direction == LEFT) ? -1 : 1;
  } else {
    rowDir = (direction == UP) ? -1 : 1;
  }

  // move a gem onto empty space
  if (board[userRow + (rowDir * 2)][userCol + (colDir * 2)] == 0) {
    // remove the gem
    removeObject(userRow + rowDir, userCol + colDir);

    // if a gem is pushed off a goal, it becomes a rock.
    var rock = createObject(ROCK, (userCol + (colDir * 2)) * 2, (userRow + (rowDir * 2)) * 2);
    board[userRow + (rowDir * 2)][userCol + (colDir * 2)] = rock;

    // create the goal
    var goal = createObject(GOAL, (userCol + colDir) * 2, (userRow + rowDir) * 2);
    board[userRow + rowDir][userCol + colDir] = goal;
    success = true;
  }

  // move a gem onto a goal
  else if (board[userRow + (rowDir * 2)][userCol + (colDir * 2)].getName() == "goal") {
    // remove the gem that he pushed and the goal he's pushing it on.
    removeObject(userRow + rowDir, userCol + colDir);
    removeObject(userRow + (rowDir * 2), userCol + (colDir * 2));

    // create a goal from where the gem was pushed from
    var goal = createObject(GOAL, (userCol + colDir) * 2, (userRow + rowDir) * 2);
    board[userRow + rowDir][userCol + colDir] = goal;

    // make a new gem
    var gem = createObject(GEM, (userCol + (colDir * 2)) * 2, (userRow + (rowDir * 2)) * 2);
    board[userRow + (rowDir * 2)][userCol + (colDir * 2)] = gem;
    success = true;
  }

  if (success) {
    //move the user
    userCol += colDir;
    userRow += rowDir;
    moveUser(direction);
  }
}

function loadLevel(levelToLoad) {
  if (levelToLoad >= 0 && levelToLoad < boards.length) {
    // if this is the first time loading the game, board will be null
    // so don't try to remove any objects.
    if (board) {
      // remove all the objects from the scene.
      for (var z = 0; z < board.length; z++) {
        for (var x = 0; x < board[z].length; x++) {
          if (board[z][x] instanceof Model || board[z][x] instanceof c3dl.Cube) {
            removeObject(z, x);
          }
        }
      }
    }

    board = boards[levelToLoad];

    // reload the objects.
    for (var z = 0; z < board.length; z++) {
      for (var x = 0; x < board[z].length; x++) {
        switch (board[z][x]) {
        case WALL:
          {
            var wall = createObject(WALL, x * 2, z * 2);
            board[z][x] = wall;
          }
          break;

        case ROCK:
          {
            var rock = createObject(ROCK, x * 2, z * 2);
            board[z][x] = rock;
          }
          break;

        case GEM:
          {
            var gem = createObject(GEM, x * 2, z * 2);
            board[z][x] = gem;
          }
          break;

        case USER:
          {
            if (userModel) {
              scn.removeObjectFromScene(userModel);
            }
            var user = createObject(USER, x * 2, z * 2);
            userRow = z;
            userCol = x;
            // clear it.
            board[z][x] = 0;
          }
          break;

        case GOAL:
          {
            var goal = createObject(GOAL, x * 2, z * 2);
            board[z][x] = goal;
          }
          break;
        }
      }
    }

    setViewStyle(viewStyle);
  }
}
