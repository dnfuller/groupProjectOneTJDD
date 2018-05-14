
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
var currentUserID;
function writeUserData(userId, name, email) {
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
    auth.signInWithEmailAndPassword(email, password).catch(function(e){
        M.toast({html: e.message});
    }).then(function(){
        // console.log("logged in");
    });
    $("#emailLogin").val("");
    $("#passwordLogin").val("");
})
$("#logout").on("click", function(event){
    event.preventDefault();
    auth.signOut().then(function(){
        // console.log("signed out");
    });
})
$("#createSubmit").on('click', (event) => {
    event.preventDefault();
    var name = $("#nameCreate").val().trim();
    var email = $("#emailCreate").val().trim();
    var password = $("#passwordCreate").val();
    var passwordConfirm = $("#passwordCreateConfirm").val();
    var failed = false;

    if(password === passwordConfirm){
        auth.createUserWithEmailAndPassword(email, password).catch(function(e){
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
});
auth.onAuthStateChanged(user => {
    if(user){
        console.log(user.uid);
        currentUserID = user.uid;
    }else{
        console.log("signed Out.")
    }
});
