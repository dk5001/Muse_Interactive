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
  // let avgAccel = (accel.x + accel.y + accel.z) / 3;
  let bgColor = map(accel.x, 1, -1, 100, 255); // Map to white to black
  background(bgColor, 10); // Add a slight transparency to the background for trails
  
  // Control rotation speed with beta waves
  rotationSpeed = map(eeg.beta, 0, 4, 0.01, 0.05);
  angle += rotationSpeed; // Update angle for circular motion
  console.log(rotationSpeed);

  // Calculate center position for circles
  let centerX = width / 2;
  let centerY = height / 2;

  // Circle radius for motion
  let motionRadius = 100;

  noStroke();
  
  // Circle 1 - Red (controlled by muscle)
  let size1 = map(state.muscle, 0, 1, 50, 80); // Size varies with muscle state
  fill(map(state.muscle, 0, 1, 150, 255), 0, 0, 150); // Add opacity to fill
  let x1 = centerX + cos(angle) * motionRadius;
  let y1 = centerY + sin(angle) * motionRadius;
  circle(x1, y1, size1);
  
  // Circle 2 - Yellow (controlled by focus)
  let size2 = map(state.focus, 0, 1, 50, 80); // Size varies with focus state
  fill(map(state.focus, 0, 1, 150, 255), map(state.focus, 0, 1, 0, 255), 0, 150); // Add opacity to fill
  let x2 = centerX + cos(angle + TWO_PI / 4) * motionRadius; // Offset for circular arrangement
  let y2 = centerY + sin(angle + TWO_PI / 4) * motionRadius;
  circle(x2, y2, size2);
  
  // Circle 3 - Green (controlled by clear)
  let size3 = map(state.clear, 0, 1, 50, 80); // Size varies with clear state
  fill(0, map(state.clear, 0, 1, 150, 255), 0, 150); // Add opacity to fill
  let x3 = centerX + cos(angle + TWO_PI / 2) * motionRadius; // Offset for circular arrangement
  let y3 = centerY + sin(angle + TWO_PI / 2) * motionRadius;
  circle(x3, y3, size3);
  
  // Circle 4 - Blue (controlled by meditation)
  let size4 = map(state.meditation, 0, 1, 50, 80); // Size varies with meditation state
  fill(0, 0, map(state.meditation, 0, 1, 150, 255), 150); // Add opacity to fill
  let x4 = centerX + cos(angle + (3 * TWO_PI) / 4) * motionRadius; // Offset for circular arrangement
  let y4 = centerY + sin(angle + (3 * TWO_PI) / 4) * motionRadius;
  circle(x4, y4, size4);
  
  // Circle 5 - Center Circle (controlled by rotation speed)
  let centerCircleSize = map(rotationSpeed, 0.01, 0.05, 15, 50); // Size varies with rotation speed
  noFill();
  stroke(0); 
  circle(centerX, centerY, centerCircleSize); // Center circle size changes with rotation speed

  // Draw rectangle in the center
  noFill();
  stroke(0); 
  let rectWidth = map(eeg.alpha, 0, 1, 0, 300); // Map horizontal length to eeg.alpha
  let rectHeight = map(eeg.beta, 0, 1, 0, 200); // Map vertical length to eeg.beta
  rect(centerX - rectWidth / 2, centerY - rectHeight / 2, rectWidth, rectHeight); // Draw rectangle centered
}