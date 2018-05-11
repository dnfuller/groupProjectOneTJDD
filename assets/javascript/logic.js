
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, "edge");

    var collapsibleElem = document.querySelector('.collapsible');
    var collapsibleInstance = M.Collapsible.init(collapsibleElem, "edge");
  });

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

$("#loginSubmit").on("click", function(event){
    event.preventDefault();
    var email = $("#emailLogin").val().trim();
    var password = $("#passwordLogin").val().trim();
    auth.signInWithEmailAndPassword(email, password).catch(function(e){
        console.log(e.code);
    }).then(function(){
        // console.log("logged in");
    })
    $("#emailLogin").val("");
    $("#passwordLogin").val("");
})
$("#logout").on("click", function(event){
    event.preventDefault();
    auth.signOut().then(function(){
        // console.log("signed out");
    });
})
auth.onAuthStateChanged(function(user){
    if(user){
        console.log(user.uid);
    }else{
        console.log("signed Out.")
    }
})

