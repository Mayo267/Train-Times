//add rows to the table 
    //submit button

//calculate next arrival (relative to the current time)

//minutes away is current time - next arrival

//trains comes every 30 mins, next arrival is 5:30, currently 5:00...

//moment.js

//firebase

$(document).ready(function(){


//===============================================================================//
// Initialize Firebase
    var config = {
        apiKey: "AIzaSyDGzuG3xqe1JQRCFQnEdj05OXod_NETewE",
        authDomain: "train-times-2daae.firebaseapp.com",
        databaseURL: "https://train-times-2daae.firebaseio.com",
        projectId: "train-times-2daae",
        storageBucket: "train-times-2daae.appspot.com",
        messagingSenderId: "331683672012"
    };
    firebase.initializeApp(config);
//===============================================================================//

    var database = firebase.database();

    function msToMinutes(ms) {
        var minutes = Math.floor(ms / 60000);
        return minutes;
    }
    

//============== Adding a train to the firebase ==============//

$("#add-train").on("click", function(){
    event.preventDefault();
    var trainName = $('#train-name').val().trim();
    var trainDestination = $('#train-dest').val().trim();
    var trainFirstTime = $('#train-first').val().trim();
    var trainFrequency = $("#train-frequency").val().trim();
    

    // moment(trainFirstTime).format("HH:mm");
    // moment(trainFrequency).format("minutes");
    
    //create variable for new row 
    
    //prepend new table row

    //add the user information to firebase
    database.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        trainFirstTime: trainFirstTime,
        trainFrequency: trainFrequency,
        
        dateAdded: firebase.database.ServerValue.TIMESTAMP
        
    });
    //update and pull information from firebase, put into new row

    //clear the form
    $("#train-name").val("");
    $("#train-dest").val("");
    $("#train-first").val("");
    $("#train-frequency").val("");
    
})
//=============================================================//

//========= Retrieving  data from firebase ===========//
database.ref().orderByChild("dateAdded").on("child_added", function(childSnapshot) {

    console.log("Train Name: ", childSnapshot.val().trainName);
    console.log("Destination: ", childSnapshot.val().trainDestination);
    console.log("Train Arrival: ", childSnapshot.val().trainFirstTime);
    console.log("Frequency: ", childSnapshot.val().trainFrequency);
    console.log("-----------------");
    
    var trainName = childSnapshot.val().trainName
    var destination = childSnapshot.val().trainDestination
    var TrainTime = childSnapshot.val().trainFirstTime
    var frequency = childSnapshot.val().trainFrequency
    var time = moment();

    var nextArrival = moment(TrainTime, "HH:mm:ss").add(frequency, "minutes").format("HH:mm");
    var minutesAway = moment(nextArrival, "HH:mm:ss").diff(time, "minutes");
    
    //===== ADDS A NEW ROW ====//
    var dataArray = [trainName, destination, frequency, nextArrival, minutesAway];
    var newTr = $("<tr>")
    for (var i = 0; i < dataArray.length; i++) {
        var newTd = $("<td>");
        newTd.text(dataArray[i]);
        newTd.appendTo(newTr)
    }
    $("tbody").append(newTr); 
    
})

//==================================//









//=====End of document.ready=====//
})
//==============================//