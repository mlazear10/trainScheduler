 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBz3hZiZty28WgmleBlQCaqCEX_ghhrWwk",
    authDomain: "trainscheduler-8a419.firebaseapp.com",
    databaseURL: "https://trainscheduler-8a419.firebaseio.com",
    projectId: "trainscheduler-8a419",
    storageBucket: "trainscheduler-8a419.appspot.com",
    messagingSenderId: "419390718535"
 };
 firebase.initializeApp(config);


// VARIABLES
// --------------------------------------------------------------------------------

var database = firebase.database();
var train = {
	name: "",
	destination: "",
	frequency: "",
	satrtTime: "",
	minutesAway: ""
};


console.log("app.js has started.")

$("#submitButton").on("click", function() {
	//Don't refresh the page!
	event.preventDefault();

	train.name = $("#name").val().trim();
	train.destination = $("#destination").val().trim();
	train.startTime = $("#startTime").val().trim();
	train.frequency = $("#frequency").val().trim();
	train.minutesAway = 10; //??????? neeed to calculate the minutes away reference the moment.js solution from day 21

	console.log("train locally");

	// Change what is saved in firebase
      database.ref().push({
        name: train.name,
        destination: train.destination,
        startTime: train.startTime, 
        frequency: train.frequency,
        minutesAway: train.minutesAway
      });

});


//This event is happneing on the Firebase. It takes up to 2 function: the first function (scuccss function) & the second function (error funtion)
database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  $("#trainTable").append("<tr><td>" + 
  	snapshot.val().name + "</td><td>" + 
  	snapshot.val().destination + "</td><td>" + 
  	snapshot.val().startTime + "</td><td>" + 
  	snapshot.val().frequency + "</td><td>" + 
  	snapshot.val().minutesAway + "</td></tr>");
});

// }, function(errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });

// //Change the HTML to reflect

// $("#name-display") = snapshot.val().employee.name
// $("#role-display") = employee.role
// $("#start-date-display") = employee.startDate
// $("#months-worked-display") = 
// $("#monthly-rate-display") = 
// $("#total-billed-display") = 

