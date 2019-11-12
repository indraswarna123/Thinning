const fs = require("fs");

//Read File into hex
function getByteArray(filePath) {
  let fileData = fs.readFileSync(filePath).toString("hex");
  let result = [];
  for (var i = 0; i < fileData.length; i += 2)
    result.push("0x" + fileData[i] + "" + fileData[i + 1]);
  return result;
}

//Call Function read file
result = getByteArray("finger.pgm");

//Start GlobalTresholding
var header = ["P2", "798 958", "1"];
var RGB = 256;
var occurence = {};

for (i = 0; i < RGB; i++) {
  occurence[i] = 0;
}

for (var i = 0; i < result.length; i++) {
  if (i > 14) {
    let string = result[i];
    let parsedInt = parseInt(string);
    occurence[parsedInt] += 1;
  }
}

let currentTLoop = (RGB - 1) / 2;
let currentM1 = 0;
let currentM1Upper = 0;
let currentM1Lower = 0;
let currentM2 = 0;
let currentM2Upper = 0;
let currentM2Lower = 0;
let breakingBool = true;
var tLoop = {
  0: {
    T: currentTLoop,
    M1: 0,
    M2: 0
  }
};
while (breakingBool) {
  for (var i = 0; i < Object.keys(occurence).length; i++) {
    if (i < currentTLoop) {
      currentM1Upper += occurence[i] * i;
      currentM1Lower += occurence[i];
    } else {
      currentM2Upper += occurence[i] * i;
      currentM2Lower += occurence[i];
    }
    if (i == Object.keys(occurence).length - 1) {
      currentM1 = currentM1Upper / currentM1Lower;
      currentM2 = currentM2Upper / currentM2Lower;
      if (isNaN(currentM1)) {
        currentM1 = 0;
      }
      if (isNaN(currentM2)) {
        currentM2 = 0;
      }
      let nextTLoop = Math.round((currentM1 + currentM2) / 2);
      if (Object.keys(tLoop).length == 1) {
        tLoop[0].T = currentTLoop;
        tLoop[0].M1 = currentM1;
        tLoop[0].M2 = currentM2;

        tLoop[Object.keys(tLoop).length] = {
          T: 0,
          M1: 0,
          M2: 0
        };
        tLoop[Object.keys(tLoop).length - 1].T = nextTLoop;
      } else {
        tLoop[Object.keys(tLoop).length - 1].M1 = currentM1;
        tLoop[Object.keys(tLoop).length - 1].M2 = currentM2;
        tLoop[Object.keys(tLoop).length] = {
          T: 0,
          M1: 0,
          M2: 0
        };
        tLoop[Object.keys(tLoop).length - 1].T = nextTLoop;
      }
      if (nextTLoop == currentTLoop) {
        breakingBool = false;
        break;
      } else {
        currentTLoop = nextTLoop;
      }
    }
  }
}

console.log(tLoop);

//End Global Tresholding

// Start Thinning

var itterationOfThining = {};

var b1to9 = {};

//Switch Case Function of B1 - B8
function skeleton(i, j, expression) {
  switch (expression) {
    case "B1":
      B1(i, j);
      break;
    case "B2":
      B2(i, j);
      break;
    case "B3":
      B3(i, j);
      break;
    case "B4":
      B4(i, j);
      break;
    case "B5":
      B5(i, j);
      break;
    case "B6":
      B6(i, j);
      break;
    case "B7":
      B7(i, j);
      break;
    case "B8":
      B8(i, j);
      break;
  }
}

function B1(i, j) {
  let isPatternRight = true;

  if (matrix[i - 1] != null) {
    if (matrix[i - 1][j - 1] != null) {
      // TOP LEFT
      if (matrix[i - 1][j - 1] == 1) {
        isPatternRight = false;
      }
    }
  }
  if (matrix[i - 1] != null) {
    if (matrix[i - 1][j] != null) {
      // TOP CENTER
      if (matrix[i - 1][j] == 1) {
        isPatternRight = false;
      }
    }
  }
  if (matrix[i - 1] != null) {
    if (matrix[i - 1][j + 1] != null) {
      // TOP RIGHT
      if (matrix[i - 1][j + 1] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (matrix[i] != null) {
    if (matrix[i][j] != null) {
      // CENTER CENTER
      if (matrix[i][j] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (matrix[i + 1] != null) {
    if (matrix[i + 1][j - 1] != null) {
      // BOTTOM LEFT
      if (matrix[i + 1][j - 1] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }
  if (matrix[i + 1] != null) {
    if (matrix[i + 1][j] != null) {
      // BOTTOM CENTER
      if (matrix[i + 1][j] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }
  if (matrix[i + 1] != null) {
    if (matrix[i + 1][j + 1] != null) {
      // BOTTOM RIGHT
      if (matrix[i + 1][j + 1] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (isPatternRight) {
    b1to9.B1[i][j] = 0;
  } else {
    b1to9.B1[i][j] = matrix[i][j];
  }
}

function B2(i, j) {
  let isPatternRight = true;

  if (b1to9.B1[i - 1] != null) {
    if (b1to9.B1[i - 1][j] != null) {
      // TOP CENTER
      if (b1to9.B1[i - 1][j] == 1) {
        isPatternRight = false;
      }
    }
  }
  if (b1to9.B1[i - 1] != null) {
    if (b1to9.B1[i - 1][j + 1] != null) {
      // TOP RIGHT
      if (b1to9.B1[i - 1][j + 1] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (b1to9.B1[i] != null) {
    if (b1to9.B1[i][j - 1] != null) {
      // CENTER LEFT
      if (b1to9.B1[i][j - 1] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B1[i] != null) {
    if (b1to9.B1[i][j] != null) {
      // CENTER CENTER
      if (b1to9.B1[i][j] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B1[i] != null) {
    if (b1to9.B1[i][j + 1] != null) {
      // CENTER RIGHT
      if (b1to9.B1[i][j + 1] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (b1to9.B1[i + 1] != null) {
    if (b1to9.B1[i + 1][j - 1] != null) {
      // BOTTOM LEFT
      if (b1to9.B1[i + 1][j - 1] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B1[i + 1] != null) {
    if (b1to9.B1[i + 1][j] != null) {
      // BOTTOM CENTER
      if (b1to9.B1[i + 1][j] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (isPatternRight) {
    b1to9.B2[i][j] = 0;
  } else {
    b1to9.B2[i][j] = b1to9.B1[i][j];
  }
}

function B3(i, j) {
  let isPatternRight = true;
  if (b1to9.B2[i - 1] != null) {
    if (b1to9.B2[i - 1][j - 1] != null) {
      // TOP LEFT
      if (b1to9.B2[i - 1][j - 1] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }
  if (b1to9.B2[i - 1] != null) {
    if (b1to9.B2[i - 1][j + 1] != null) {
      // TOP RIGHT
      if (b1to9.B2[i - 1][j + 1] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (b1to9.B2[i] != null) {
    if (b1to9.B2[i][j - 1] != null) {
      // CENTER LEFT
      if (b1to9.B2[i][j - 1] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B2[i] != null) {
    if (b1to9.B2[i][j] != null) {
      // CENTER CENTER
      if (b1to9.B2[i][j] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B2[i] != null) {
    if (b1to9.B2[i][j + 1] != null) {
      // CENTER RIGHT
      if (b1to9.B2[i][j + 1] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (b1to9.B2[i + 1] != null) {
    if (b1to9.B2[i + 1][j - 1] != null) {
      // BOTTOM LEFT
      if (b1to9.B2[i + 1][j - 1] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  } else {
    isPatternRight = false;
  }
  if (b1to9.B2[i + 1] != null) {
    if (b1to9.B2[i + 1][j + 1] != null) {
      // BOTTOM RIGHT
      if (b1to9.B2[i + 1][j + 1] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (isPatternRight) {
    b1to9.B3[i][j] = 0;
  } else {
    b1to9.B3[i][j] = b1to9.B2[i][j];
  }
}

function B4(i, j) {
  let isPatternRight = true;
  if (b1to9.B3[i - 1] != null) {
    if (b1to9.B3[i - 1][j - 1] != null) {
      // TOP LEFT
      if (b1to9.B3[i - 1][j - 1] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }
  if (b1to9.B3[i - 1] != null) {
    if (b1to9.B3[i - 1][j] != null) {
      // TOP CENTER
      if (b1to9.B3[i - 1][j] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B3[i] != null) {
    if (b1to9.B3[i][j - 1] != null) {
      // CENTER LEFT
      if (b1to9.B3[i][j - 1] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B3[i] != null) {
    if (b1to9.B3[i][j] != null) {
      // CENTER CENTER
      if (b1to9.B3[i][j] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B3[i] != null) {
    if (b1to9.B3[i][j + 1] != null) {
      // CENTER RIGHT
      if (b1to9.B3[i][j + 1] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (b1to9.B3[i + 1] != null) {
    if (b1to9.B3[i + 1][j] != null) {
      // BOTTOM CENTER
      if (b1to9.B3[i + 1][j] == 1) {
        isPatternRight = false;
      }
    }
  }
  if (b1to9.B3[i + 1] != null) {
    if (b1to9.B3[i + 1][j + 1] != null) {
      // BOTTOM RIGHT
      if (b1to9.B3[i + 1][j + 1] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (isPatternRight) {
    b1to9.B4[i][j] = 0;
  } else {
    b1to9.B4[i][j] = b1to9.B3[i][j];
  }
}

function B5(i, j) {
  let isPatternRight = true;
  if (b1to9.B4[i - 1] != null) {
    if (b1to9.B4[i - 1][j - 1] != null) {
      // TOP LEFT
      if (b1to9.B4[i - 1][j - 1] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }
  if (b1to9.B4[i - 1] != null) {
    if (b1to9.B4[i - 1][j] != null) {
      // TOP CENTER
      if (b1to9.B4[i - 1][j] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B4[i - 1] != null) {
    if (b1to9.B4[i - 1][j + 1] != null) {
      // TOP RIGHT
      if (b1to9.B4[i - 1][j + 1] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B4[i] != null) {
    if (b1to9.B4[i][j] != null) {
      // CENTER CENTER
      if (b1to9.B4[i][j] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B4[i + 1] != null) {
    if (b1to9.B4[i + 1][j - 1] != null) {
      // BOTTOM LEFT
      if (b1to9.B4[i + 1][j - 1] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (b1to9.B4[i + 1] != null) {
    if (b1to9.B4[i + 1][j] != null) {
      // BOTTOM CENTER
      if (b1to9.B4[i + 1][j] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (b1to9.B4[i + 1] != null) {
    if (b1to9.B4[i + 1][j + 1] != null) {
      // BOTTOM RIGHT
      if (b1to9.B4[i + 1][j + 1] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (isPatternRight) {
    b1to9.B5[i][j] = 0;
  } else {
    b1to9.B5[i][j] = b1to9.B4[i][j];
  }
}

function B6(i, j) {
  let isPatternRight = true;

  if (b1to9.B5[i - 1] != null) {
    if (b1to9.B5[i - 1][j] != null) {
      // TOP CENTER
      if (b1to9.B5[i - 1][j] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B5[i - 1] != null) {
    if (b1to9.B5[i - 1][j + 1] != null) {
      // TOP RIGHT
      if (b1to9.B5[i - 1][j + 1] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B5[i] != null) {
    if (b1to9.B5[i][j - 1] != null) {
      // CENTER LEFT
      if (b1to9.B5[i][j - 1] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (b1to9.B5[i] != null) {
    if (b1to9.B5[i][j] != null) {
      // CENTER CENTER
      if (b1to9.B5[i][j] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B5[i] != null) {
    if (b1to9.B5[i][j + 1] != null) {
      // CENTER RIGHT
      if (b1to9.B5[i][j + 1] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B5[i + 1] != null) {
    if (b1to9.B5[i + 1][j - 1] != null) {
      // BOTTOM LEFT
      if (b1to9.B5[i + 1][j - 1] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (b1to9.B5[i + 1] != null) {
    if (b1to9.B5[i + 1][j] != null) {
      // BOTTOM CENTER
      if (b1to9.B5[i + 1][j] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (isPatternRight) {
    b1to9.B6[i][j] = 0;
  } else {
    b1to9.B6[i][j] = b1to9.B5[i][j];
  }
}

function B7(i, j) {
  let isPatternRight = true;

  if (b1to9.B6[i - 1] != null) {
    if (b1to9.B6[i - 1][j - 1] != null) {
      // TOP LEFT
      if (b1to9.B6[i - 1][j - 1] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (b1to9.B6[i - 1] != null) {
    if (b1to9.B6[i - 1][j + 1] != null) {
      // TOP RIGHT
      if (b1to9.B6[i - 1][j + 1] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B6[i] != null) {
    if (b1to9.B6[i][j - 1] != null) {
      // CENTER LEFT
      if (b1to9.B6[i][j - 1] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (b1to9.B6[i] != null) {
    if (b1to9.B6[i][j] != null) {
      // CENTER CENTER
      if (b1to9.B6[i][j] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B6[i] != null) {
    if (b1to9.B6[i][j + 1] != null) {
      // CENTER RIGHT
      if (b1to9.B6[i][j + 1] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B6[i + 1] != null) {
    if (b1to9.B6[i + 1][j - 1] != null) {
      // BOTTOM LEFT
      if (b1to9.B6[i + 1][j - 1] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (b1to9.B6[i + 1] != null) {
    if (b1to9.B6[i + 1][j + 1] != null) {
      // BOTTOM RIGHT
      if (b1to9.B6[i + 1][j + 1] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (isPatternRight) {
    b1to9.B7[i][j] = 0;
  } else {
    b1to9.B7[i][j] = b1to9.B6[i][j];
  }
}

function B8(i, j) {
  let isPatternRight = true;

  if (b1to9.B7[i - 1] != null) {
    if (b1to9.B7[i - 1][j - 1] != null) {
      // TOP LEFT
      if (b1to9.B7[i - 1][j - 1] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (b1to9.B7[i - 1] != null) {
    if (b1to9.B7[i - 1][j] != null) {
      // TOP CENTER
      if (b1to9.B7[i - 1][j] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (b1to9.B7[i] != null) {
    if (b1to9.B7[i][j - 1] != null) {
      // CENTER LEFT
      if (b1to9.B7[i][j - 1] == 1) {
        isPatternRight = false;
      }
    }
  }

  if (b1to9.B7[i] != null) {
    if (b1to9.B7[i][j] != null) {
      // CENTER CENTER
      if (b1to9.B7[i][j] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B7[i] != null) {
    if (b1to9.B7[i][j + 1] != null) {
      // CENTER RIGHT
      if (b1to9.B7[i][j + 1] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B7[i + 1] != null) {
    if (b1to9.B7[i + 1][j] != null) {
      // BOTTOM CENTER
      if (b1to9.B7[i + 1][j] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (b1to9.B7[i + 1] != null) {
    if (b1to9.B7[i + 1][j + 1] != null) {
      // BOTTOM RIGHT
      if (b1to9.B7[i + 1][j + 1] == 0) {
        isPatternRight = false;
      }
    } else {
      isPatternRight = false;
    }
  }

  if (isPatternRight) {
    b1to9.B8[i][j] = 0;
  } else {
    b1to9.B8[i][j] = b1to9.B7[i][j];
  }
}

onlyImage = [];

//Cast Global Tresholded Image into background of 0 and pixel 1
for (var i = 0; i < result.length; i++) {
  if (i > 14) {
    let string = result[i];
    let parsedInt = parseInt(string);
    if (parsedInt < tLoop[Object.keys(tLoop).length - 1].T) {
      parsedInt = 1;
    } else {
      parsedInt = 0;
    }
    onlyImage.push(parsedInt);
  }
}

var matrix = [];
tempPixel = 0;
console.log(onlyImage.length);

// Store Pixel into Matrix and Initiate B1-B8 Array
for (i = 0; i < 958; i++) {
  for (j = 0; j < 798; j++) {
    if (!matrix[i]) {
      matrix[i] = [];
      for (var y = 1; y < 9; y++) {
        if (!b1to9["B" + y]) {
          b1to9["B" + y] = [];
        }
        b1to9["B" + y][i] = [];
      }
    }
    matrix[i][j] = onlyImage[tempPixel];
    // if (matrix[i][j] == 1) {
    //   console.log(matrix[i][j]);
    // }
    for (var y = 1; y < 9; y++) {
      b1to9["B" + y][i][j] = 0;
    }
    tempPixel++;
  }
}

function reinitializeB1to9() {
  for (i = 0; i < 958; i++) {
    for (j = 0; j < 798; j++) {
      for (var y = 1; y < 9; y++) {
        if (!b1to9["B" + y]) {
          b1to9["B" + y] = [];
        }
        b1to9["B" + y][i] = [];
      }
      for (var y = 1; y < 9; y++) {
        b1to9["B" + y][i][j] = 0;
      }
    }
  }
}

// Bool to check while loop if iteration k = iteration k-1
let isStillSame = true;

let loopTimes = 0;

// Loop of iteration for Thinning
while (isStillSame) {
  loopTimes++;
  //Initialize First Loop
  if (loopTimes == 1) {
    for (y = 1; y < 9; y++) {
      for (i = 0; i < 958; i++) {
        for (j = 0; j < 798; j++) {
          skeleton(i, j, "B" + y);
        }
      }
    }
    itterationOfThining[loopTimes] = {};
    for (var i = 1; i < 9; i++) {
      itterationOfThining[loopTimes]["B" + i] = b1to9["B" + i];
    }

    matrix = itterationOfThining[loopTimes]["B8"];
    loopTimes++;
  }

  for (y = 1; y < 9; y++) {
    for (i = 0; i < 958; i++) {
      for (j = 0; j < 798; j++) {
        skeleton(i, j, "B" + y);
      }
    }
  }
  itterationOfThining[loopTimes] = {};
  for (var i = 1; i < 9; i++) {
    itterationOfThining[loopTimes]["B" + i] = b1to9["B" + i];
  }

  //Check if the current and before pixel is still the same or not
  let countLoopCurrentPixel = 0;
  let countLoopMinus1Pixel = 0;
  for (i = 0; i < 958; i++) {
    for (j = 0; j < 798; j++) {
      if (itterationOfThining[loopTimes]["B8"][i][j] == 0) {
        countLoopCurrentPixel += 1;
      }

      if (itterationOfThining[loopTimes - 1]["B1"][i][j] == 0) {
        countLoopMinus1Pixel += 1;
      }
    }
  }

  if (countLoopCurrentPixel !== countLoopMinus1Pixel) {
    matrix = itterationOfThining[loopTimes]["B8"];
  } else {
    console.log(
      "Current Loop : " +
        loopTimes +
        " Count After Pix : " +
        countLoopCurrentPixel +
        " Count Before Pix : " +
        countLoopMinus1Pixel
    );
    isStillSame = false;
  }
}

// Store Thinned Pixel into Header
for (i = 0; i < 958; i++) {
  for (j = 0; j < 798; j++) {
    header.push(
      // itterationOfThining[Object.keys(itterationOfThining).length]["B8"][i][j]
      matrix[i][j]
    );
  }
}

// Combine Pixel into PGM file
let finalResult = header
  .toString()
  .split(",")
  .join("\n");

fs.writeFile("thinning3.pgm", finalResult, err => {
  if (err) throw err;
});
