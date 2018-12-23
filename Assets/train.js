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
    var trainArrival = $('#train-first').val().trim();
    var trainFrequency = $("#train-frequency").val().trim();
    

    // moment(trainArrival).format("HH:mm");
    // moment(trainFrequency).format("minutes");
    
    //create variable for new row 
    
    //prepend new table row

    //add the user information to firebase
    database.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        trainArrival: trainArrival,
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
    console.log("Train Arrival: ", childSnapshot.val().trainArrival);
    console.log("Frequency: ", childSnapshot.val().trainFrequency);
    console.log("-----------------");
    
    
    //==== Adding train to the table =====//
    var now = moment().format('HH:mm');

    


        //=== Next Arrival ===//
    
    //===== ADDS A NEW ROW ====//
    var newRow = $("<tr>").append(
        $("<td>").text(childSnapshot.val().trainName),
        $("<td>").text(childSnapshot.val().trainDestination),
        $("<td>").text(childSnapshot.val().trainFrequency),
        $("<td>").text(moment(trainArrival, "HH:mm").format("HH:mm")),
        $("<td>").text(minutesAway),
    );

    $('#table > tbody').append(newRow);
})

//==================================//









//=====End of document.ready=====//
})
//==============================//