let angle = 0; // Initialize angle for circular motion
let rotationSpeed = 0; // Variable to control rotation speed

function setup() {
  createCanvas(800, 500);
  colorMode(RGB, 255);
  setupMuse();    // Restore the bluetooth button
  setupMuseML();  // Add this back if using ML features
}

function draw() {
  // Calculate average of accelerometer data for background color
  let avgAccel = (accel.x + accel.y + accel.z) / 3;
  let bgColor = map(avgAccel, -1, 1, 160, 230); // Map to white to black
  background(bgColor);
  
  // Control rotation speed with beta waves
  rotationSpeed = map(eeg.beta, 0, 1, 0.01, 0.05);
  angle += rotationSpeed; // Update angle for circular motion

  // Calculate center position for circles
  let centerX = width / 2;
  let centerY = height / 2;

  // Circle radius for motion
  let motionRadius = 100;

  noStroke();
  
  // Circle 1 - Red (controlled by muscle)
  let size1 = map(state.muscle, 0, 1, 15, 50); // Size varies with muscle state
  fill(map(state.muscle, 0, 1, 0, 255), 0, 0);
  let x1 = centerX + cos(angle) * motionRadius;
  let y1 = centerY + sin(angle) * motionRadius;
  circle(x1, y1, size1);
  
  // Circle 2 - Yellow (controlled by focus)
  let size2 = map(state.focus, 0, 1, 15, 50); // Size varies with focus state
  fill(map(state.focus, 0, 1, 0, 255), map(state.focus, 0, 1, 0, 255), 0);
  let x2 = centerX + cos(angle + TWO_PI / 4) * motionRadius; // Offset for circular arrangement
  let y2 = centerY + sin(angle + TWO_PI / 4) * motionRadius;
  circle(x2, y2, size2);
  
  // Circle 3 - Green (controlled by clear)
  let size3 = map(state.clear, 0, 1, 15, 50); // Size varies with clear state
  fill(0, map(state.clear, 0, 1, 0, 255), 0);
  let x3 = centerX + cos(angle + TWO_PI / 2) * motionRadius; // Offset for circular arrangement
  let y3 = centerY + sin(angle + TWO_PI / 2) * motionRadius;
  circle(x3, y3, size3);
  
  // Circle 4 - Blue (controlled by meditation)
  let size4 = map(state.meditation, 0, 1, 15, 50); // Size varies with meditation state
  fill(0, 0, map(state.meditation, 0, 1, 0, 255));
  let x4 = centerX + cos(angle + (3 * TWO_PI) / 4) * motionRadius; // Offset for circular arrangement
  let y4 = centerY + sin(angle + (3 * TWO_PI) / 4) * motionRadius;
  circle(x4, y4, size4);
  
  // Circle 5 - Center Circle (controlled by rotation speed)
  let centerCircleSize = map(rotationSpeed, 0.01, 0.05, 15, 50); // Size varies with rotation speed
  noFill();
  stroke(0); // Black stroke
  circle(centerX, centerY, centerCircleSize); // Center circle size changes with rotation speed

  // Draw horizontal vertex graph for eegSpectrum
  stroke(0); // Black stroke for the graph
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < eegSpectrum.length; i++) {
    let x = map(i, 0, eegSpectrum.length - 1, 0, width);
    let y = map(eegSpectrum[i], 0, 1, height, height / 2); // Map to the lower half of the canvas
    vertex(x, y);
  }
  endShape();
}