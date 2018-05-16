
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, "options");
  });


// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.sidenav');
//     var instances = M.Sidenav.init(elems, "edge");

//     var collapsibleElem = document.querySelector('.collapsible');
//     var collapsibleInstance = M.Collapsible.init(collapsibleElem, "edge");
//   });

// var instance = M.FormSelect.getInstance(elem);

// Initialize collapsible (uncomment the lines below if you use the dropdown variation)
var config = {
    apiKey: "AIzaSyAk6IGsE44hQcZ0sPeGHenFFd-r4wtbOwQ",
    authDomain: "groupprojectonetjdd.firebaseapp.com",
    databaseURL: "https://groupprojectonetjdd.firebaseio.com",
    projectId: "groupprojectonetjdd",
    storageBucket: "groupprojectonetjdd.appspot.com",
    messagingSenderId: "302849684174"
  };
  firebase.initializeApp(config);

var auth = firebase.auth();
var database = firebase.database();
var currentUserID;
var isLoggedIn = false;
function writeUserData(userId, name, email) {
    // create file full of user ids
    firebase.database().ref('allIds').push({
        id:userId
    })
    // writing user information into their unique object
    firebase.database().ref('users/' + userId).set({
      name: name,
      email: email,
      range: "",
      isOwner: false,
      dogs: "",   
    });
    
}
$("#loginSubmit").on("click", function(event){
    event.preventDefault();
    var email = $("#emailLogin").val().trim();
    var password = $("#passwordLogin").val().trim();
    var failed = false;
    auth.signInWithEmailAndPassword(email, password).catch(function(e){
        M.toast({html: e.message});
        failed = true;
    }).then(function(){
        if(!failed){
            window.location.replace("../../index.html");
        }
    });
    $("#emailLogin").val("");
    $("#passwordLogin").val("");
})
$("#headerNav").on("click", "#logout", function(event){
    event.preventDefault();
    auth.signOut().then(function(){
        // console.log("signed out");
    });
})
//on click of submit button on create account page
$("#createSubmit").on('click', (event) => {
    event.preventDefault();
    var name = $("#nameCreate").val().trim();
    var email = $("#emailCreate").val().trim();
    var password = $("#passwordCreate").val();
    var passwordConfirm = $("#passwordCreateConfirm").val();
    var failed = false;
    // check if the password and confirm password is the same
    if(password === passwordConfirm){
        // creates user with email and password
        auth.createUserWithEmailAndPassword(email, password).catch(function(e){
            M.toast({html: e.message});
            failed = true;
        }).then(function(){
            //make sure that the account was created
            if(!failed){
                // writes user data from form into database
                writeUserData(firebase.auth().currentUser.uid, name, email);
                console.log(firebase.auth().currentUser.uid + " create");
                // redirect to home page
                window.location.replace("../../index.html");
            }
        })

    }else{
        M.toast({html: 'password did not match confirm'});
    }
});
// every time user logs in or out
auth.onAuthStateChanged(user => {
    // check if user is logged in or out
    if(user){
        // save user id
        currentUserID = user.uid; 
        database.ref('/users/'+currentUserID).once('value').then(snapshot => console.log(snapshot.val().name));
        isLoggedIn=true;
        // add logout button to header
        $("#headerBtns").html("<button class='waves-effect waves-light btn' id='logout'>Log Out</button>");
    }else{
        isLoggedIn=false;
        console.log("logged out");
        $("#headerBtns").html("<li><a class=\"navLinks\" href=\"assets/html/create.html\">Sign Up</a></li><li><a class=\"navLinks\" href=\"assets/html/login.html\">Log In</a></li>");
    }
});
$(document).ready(function(){
    (() => {
        console.log("inboy");
        if(isLoggedIn){
            console.log("hi");
            $("#headerBtns").html("<button class='waves-effect waves-light btn' id='logout'>Log Out</button>");
            console.log(currentUserID);
            console.log("hi");
        }else{
            $("#headerBtns").html("<li><a class=\"navLinks\" href=\"assets/html/create.html\">Sign Up</a></li><li><a class=\"navLinks\" href=\"assets/html/login.html\">Log In</a></li>");
        }
    })();
})


// ================================================================================================================================






    

