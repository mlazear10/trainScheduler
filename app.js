 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBz3hZiZty28WgmleBlQCaqCEX_ghhrWwk",
    authDomain: "trainscheduler-8a419.firebaseapp.com",
    databaseURL: "https://trainscheduler-8a419.firebaseio.com",
    projectId: "trainscheduler-8a419",
    storageBucket: "trainscheduler-8a419.appspot.com",
    messagingSenderId: "419390718535"
  };
//Make sure the rules in the database are set to true 
// {
//   "rules": {
//     ".read": "auth != true",
//     ".write": "auth != true"
//   }
// }

 firebase.initializeApp(config);

// VARIABLES
// --------------------------------------------------------------------------------

var database = firebase.database();
var train = {
	name: "",
	destination: "",
	frequency: "",
	satrtTime: "",
	minutesAway: "",
	nextArrival: ""
};
var firstTimeConverted = "";
var currentTime = "";
var diffTime = '';
var tRemainder = "";
var minutesTillTrain = '';
var nextTrain = '';
var nextTrainFormatted = '';


console.log("app.js has started.")

// Code included inside $( document ).ready() will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute. 
$(document).ready(function() {

$("#timeNow").append(moment().format("HH:mm"));

$("#submitButton").on("click", function() {
	//Don't refresh the page!
	event.preventDefault();

	train.name = $("#name").val().trim();
	train.destination = $("#destination").val().trim();
	train.startTime = $("#startTime").val().trim();
	train.frequency = $("#frequency").val().trim();

	 firstTimeConverted = moment(train.startTime, "HH:mm").subtract(1, "days");
	 console.log("First time converted " + firstTimeConverted)

     currentTime = moment(); 
     console.log(currentTime); //log the current time


     diffTime = moment().diff(moment(firstTimeConverted), "minutes"); 
     console.log("diffTime: " + diffTime);

     tRemainder = diffTime % train.frequency;
     console.log("tRemainder: " + tRemainder);

     minutesTillTrain = train.frequency - tRemainder;
     console.log("minutesTillTrain: " + minutesTillTrain);

     nextTrain = moment().add(minutesTillTrain, "minutes");
     console.log("nextTrain: " + nextTrain);

     nextTrainFormatted = moment(nextTrain).format("HH:mm");
     console.log("nextTformatted: " + nextTrainFormatted);

     train.minutesAway = minutesTillTrain;
     console.log("train.minutesAway: " + train.minutesAway);
	 train.nextArrival = nextTrainFormatted;


	// if function to make sure all fields are selected
	if(train.name == "" || train.destination == "" || train.startTime == "" || train.frequency == "") {
		alert("Please fill out all fields before continuing");

	}

	// Update time for the train to come t
	// else if (train.startTime != moment(train.startTime).format('HHmm')) {
	// 	alert('Please enter time in military format');
	// 	$('#startTime').val('');
	// }


	// if all conditions are met then push to database
	else {

		console.log("train locally");

		// Change what is saved in firebase
	     database.ref().push({
	        name: train.name,
	        destination: train.destination,
	        startTime: train.startTime, 
	        frequency: train.frequency,
	        nextArrival: train.nextArrival,
	        minutesAway: train.minutesAway
	     });

	    $("#name").val("");
	    $("#destination").val("");
	    $("#startTime").val("");
	    $("#frequency").val("");
	}

});


//This event is happneing on the Firebase. It takes up to 2 function: the first function (scuccss function) & the second function (error funtion)
database.ref().on("child_added", function(snapshot) {
  // console.log(snapshot.val());

  $("#trainTable").append("<tr><td>" + 
  	snapshot.val().name + "</td><td>" + 
  	snapshot.val().destination + "</td><td>" + 
  	snapshot.val().frequency + "</td><td>" + 
  	snapshot.val().nextArrival + "</td><td>" +
  	snapshot.val().minutesAway + "</td><td>" +
  	"<input type='submit' value='Remove Train' class='remove-train btn btn-primary></td></tr>");

// handle errors ask a question on this
}, function(errorObject) {
	// console.log("Errors handled: " + errorObject.code);
});






//Closes the JQuery wrapper
});