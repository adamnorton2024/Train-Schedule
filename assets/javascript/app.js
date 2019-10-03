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

    var inputTime = $("#input-first-train-time").val().trim();
    var hours = inputTime.split(":")[0];
    var mins = inputTime.split(":")[1];

    // Grabs user input to add train
    var trainName = $("#input-train-name").val().trim();
    var trainDestination = $("#input-destination").val().trim();
    var firstTrainTime = moment().hours(hours).minutes(mins).format("X");
    var trainFrequency = $("#input-frequency").val().trim();
    var trainTimeLeft = 0;

    console.log(firstTrainTime);
    // create temp object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTime: firstTrainTime,
        frequency: trainFrequency,
        timeLeft: trainTimeLeft
    };

    // Uploads employee data to the database
    database.ref("train").push(newTrain);
    //console.log(newTrain);

    // Clears all of the text-boxes
    $("#input-train-name").val("");
    $("#input-destination").val("");
    $("#input-first-train-time").val("");
    $("#input-frequency").val("");

});
    var test;
// 3. Create Firebase event for adding train
database.ref('train').on("child_added", function (childSnapshot) {
    //console.log(childSnapshot.val());
    test = childSnapshot.val();

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = moment.unix(childSnapshot.val().firstTime).format("HH.mm");
    var frequency = childSnapshot.val().frequency;
    var trainTimeLeft = childSnapshot.val().timeLeft;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    //console.log(firstTimeConverted);

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    //console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    //console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(frequency),
        $("<td>").text(moment(nextTrain).format("HH:mm")),
        $("<td>").text(tMinutesTillTrain)
    );

    // Append the new row to the table
    $('#train-table').append(newRow);
});