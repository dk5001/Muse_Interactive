let params = {
  R: 150,    // Radius of the fixed circle
  r: 75,     // Radius of the rolling circle
  d: 100,    // Distance from the center of the rolling circle to the tracing point
};

let theta = 0;      // Angle parameter
let rotationSpeed = 0.02; // Speed of rotation

let wave = [];      // Array to store wave points

function setup() {
  createCanvas(400, 400);
  frameRate(20);
  setupMuse();
  setupMuseML();

    // Create the canvas
    createCanvas(800, 600); // Increased height to accommodate sliders
  
    // Set the initial background
    background(0);
}

function draw() {
  
  background(200);

  //array of the EEG spectrum, from delta up to gamma
  console.log("EEG spectrum", eegSpectrum)
  
  //array of the heartbeat blood flow
  console.log("heart flow", ppg.buffer)
  //beats per minute
  console.log("beats per minute", ppg.bpm)

  //battery charge 
  console.log("battery", batteryLevel)
  
  //Machine Learning detected states 
  console.log("device noise", state.noise)
  console.log("muscle tension", state.muscle)
  console.log("focused", state.focus)
  console.log("clear mind", state.clear)
  console.log("meditation", state.meditation)
  console.log("dream", state.dream)

  //brainwaves
  console.log("delta", eeg.delta) //muscle tension
  console.log("theta", eeg.theta)
  console.log("alpha", eeg.alpha)
  console.log("beta", eeg.beta)
  console.log("gamma", eeg.gamma)

  //movement
  console.log("movement x", accel.x)
  console.log("movement y", accel.y)
  console.log("movement z", accel.z)

  // Map accelerometer (movement) data to shape parameters
  params.R = map(accel.x, -1, 1, 50, 300);    // Movement X controls fixed circle radius
  params.r = map(accel.y, -1, 1, 10, 150);    // Movement Y controls rolling circle radius
  params.d = map(accel.z, -1, 1, 10, 200);    // Movement Z controls tracing point distance
  
  // Control rotation speed with meditation state
  rotationSpeed = map(state.meditation, 0, 1, 0.01, 0.05);
  
  // Switch to HSB color mode
  colorMode(HSB, 360, 100, 100);
  
  // Map beta to hue (0-360 for full color spectrum)
  let colorGradient = map(eeg.beta, 0, 1, 0, 360);
  background(colorGradient, 50, 30, 5); // Hue varies, 50% saturation, 30% brightness, 5 alpha
  
  // Switch back to RGB for the rest of the drawing
  colorMode(RGB, 255);
  
  // Control wave color based on alpha and beta waves
  let waveColor = color(
    map(eeg.alpha, 0, 1, 0, 255),    // Red component from alpha
    map(eeg.beta, 0, 1, 0, 255),     // Green component from beta
    255                              // Blue stays fixed
  );
  
  // Translate to the center of the canvas
  translate(width / 2, height / 2 - 50);
  
  // Calculate current position using Hypotrochoid equations
  let x = (params.R - params.r) * cos(theta) + params.d * cos(((params.R - params.r) / params.r) * theta);
  let y = (params.R - params.r) * sin(theta) - params.d * sin(((params.R - params.r) / params.r) * theta);
  
  // Draw the fixed circle
  noFill();
  stroke(255, 100);
  strokeWeight(1);
  ellipse(0, 0, params.R * 2);
  
  // Calculate the position of the rolling circle
  let rollingX = (params.R - params.r) * cos(theta);
  let rollingY = (params.R - params.r) * sin(theta);
  
  // Draw the rolling circle
  stroke(255, 100);
  ellipse(rollingX, rollingY, params.r * 2);
  
  // Draw the line from the center of the rolling circle to the tracing point
  stroke(waveColor);
  line(rollingX, rollingY, x, y);
  
  // Draw the tracing point
  fill(255);
  noStroke();
  ellipse(x, y, 5);
  
  // Store the y-coordinate for the wave
  wave.unshift(y);
  
  // Translate to draw the wave on the side
  push();
  translate(params.R + 50, 0);
  
  // Draw the wave line
  stroke(waveColor);
  line(0, 0, 0, wave[0]);
  
  // Draw the wave
  beginShape();
  noFill();
  stroke(waveColor);
  for (let i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape();
  pop();
  
  // Increment theta
  theta += rotationSpeed;
  
  // Limit the wave array length
  if (wave.length > width - (params.R * 2)) {
    wave.pop();
  }
}