//Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDS0GTpRwbBT7Z7e7202fg--mWxYmBmeV4",
    authDomain: "fir-project-38470.firebaseapp.com",
    databaseURL: "https://fir-project-38470.firebaseio.com",
    projectId: "fir-project-38470",
    storageBucket: "fir-project-38470.appspot.com",
    messagingSenderId: "40290831399",
    appId: "1:40290831399:web:30e62b02917bf65ee3d202"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input to add train
    var trainName = $("#input-train-name").val().trim();
    var trainDestination = $("#input-destination").val().trim();
    var firstTrainTime = moment($("#input-first-train-time").val().trim(), "MM/DD/YYYY").format("X");
    var trainFrequency = $("#input-frequency").val().trim();
    var trainTimeLeft = 0;

    // create temp object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTime: firstTrainTime,
        frequency: trainFrequency,
        timeLeft: trainTimeLeft
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);
    console.log(newTrain);

    // Clears all of the text-boxes
    $("#input-train-name").val("");
    $("#input-destination").val("");
    $("#input-first-train-time").val("");
    $("#input-frequency").val("");

    // // Create the new row
    // var newRow = $("<tr>").append(
    //     $("<td>").text(newTrain.name),
    //     $("<td>").text(newTrain.destination),
    //     $("<td>").text(newTrain.firstTime),
    //     $("<td>").text(newTrain.frequency),
    //     $("<td>").text(newTrain.timeLeft)
    // );

    

});

// 3. Create Firebase event for adding train
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().frequency;
    var trainTimeLeft = childSnapshot.val().timeLeft;

    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(frequency);
    console.log(trainTimeLeft);

    // Prettify the employee start
    var trainStartPretty = moment.unix(firstTrainTime).format("HH:mm");

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainStartPretty),
        $("<td>").text(frequency),
        $("<td>").text(trainTimeLeft)
    );

    // Append the new row to the table
    $('#train-table').append(newRow);
});