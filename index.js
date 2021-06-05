async function app() {
  console.log('Loading Model...');

  // Load the model.
  const model = await tf.loadLayersModel('http://127.0.0.1:8080/model.json');
  console.log('Successfully loaded model');

  // Make a prediction through the model on our image.
  const imgEl = document.getElementById('img');
  let tensor = tf.browser.fromPixels(imgEl)
    .resizeNearestNeighbor([299, 299])
    .toFloat()
    .expandDims();

  let predictions = await model.predict(tensor).data();
  console.log(predictions)
  if (predictions[0] === 1) {
  		//document.writeln("Covid");
  		document.getElementById("diagnosis").innerHTML = "Covid";
  } else if (predictions[1] === 1) {
  		//document.writeln("Normal");
  		document.getElementById("diagnosis").innerHTML = "Normal";
  } else {
  		//document.writeln("Viral Pneumonia")
  		document.getElementById("diagnosis").innerHTML = "Viral Pneumonia";
  }
}
app();