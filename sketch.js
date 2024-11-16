function setup() {
  createCanvas(400, 400);
  frameRate(20);
  setupMuse();
  setupMuseML();
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
  //console.log("movement x", accel.x)
  //console.log("movement y", accel.y)
  //console.log("movement z", accel.z)

}