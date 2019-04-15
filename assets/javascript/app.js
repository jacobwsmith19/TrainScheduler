
// Initialize Firebase
var config = {
    apiKey: "AIzaSyC89x_zDyDl3_LPZ4ZLAVNH2H5_CeTRYbI",
    authDomain: "forclass-82bf0.firebaseapp.com",
    databaseURL: "https://forclass-82bf0.firebaseio.com",
    storageBucket: "forclass-82bf0.appspot.com"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // New train button
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user inputs
    var trainName = $("#name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      frequency: trainFrequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;
  
    // Log train info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);
  
    // Calculate Next Arrival
    var nextArrival = "12:00";
    console.log(nextArrival);
  
    // Calculate Minutes Away
    var minutesAway = "60";
    console.log(minutesAway);
  
    // Create new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway)
    );
  
    // Append the new row to the table
    $("#train-table").append(newRow);
  });