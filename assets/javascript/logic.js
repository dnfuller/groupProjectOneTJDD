document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, "edge");

    var collapsibleElem = document.querySelector('.collapsible');
    var collapsibleInstance = M.Collapsible.init(collapsibleElem, "edge");
  });

var instance = M.FormSelect.getInstance(elem);

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

$("#loginSubmit").on("click", function(event){
    event.preventDefault();
    var email = $("#emailLogin").val().trim();
    var password = $("#passwordLogin").val().trim();
    auth.signInWithEmailAndPassword(email, password).catch(function(e){
        console.log(e.message);
    }).then(function(){
        // console.log("logged in");
    });
    writeUserData()
    $("#emailLogin").val("");
    $("#passwordLogin").val("");
})
$("#logout").on("click", function(event){
    event.preventDefault();
    auth.signOut().then(function(){
        // console.log("signed out");
    });
})
$("#createSubmit").on('click', function(event){
    event.preventDefault();
    var name = $("#nameCreate").val();
    var email = $("#emailCreate").val();
    var password = $("#passwordCreate").val();
    var passwordConfirm = $("#passwordCreateConfirm").val();
    var failed = false;

    if(password === passwordConfirm){
        auth.createUserWithEmailAndPassword(email, password).catch(function(e){
            // if(e.message == "aut
            M.toast({html: e.message});
            failed = true;
        }).then(function(){
            if(!failed){
                writeUserData(firebase.auth().currentUser.uid, name, email);
                console.log(firebase.auth().currentUser.uid + " create");
            }

        })

    }else{
        M.toast({html: 'password did not match confirm'});
    }
})
auth.onAuthStateChanged(function(user){
    if(user){
        console.log(user.uid);
        currentUserID = user.uid;
        // var currentUser =
        // database.ref("users").child(user.uid).setValue("users");

    }else{
        console.log("signed Out.")
    }
});
function writeUserData(userId, name, email) {
    firebase.database().ref('users/' + userId).set({
      name: name,
      email: email,
      range: "",
      isOwner: false,
      dogs: ""

    });
  }
