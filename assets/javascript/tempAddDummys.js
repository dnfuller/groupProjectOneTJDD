var config = {
    apiKey: "AIzaSyAk6IGsE44hQcZ0sPeGHenFFd-r4wtbOwQ",
    authDomain: "groupprojectonetjdd.firebaseapp.com",
    databaseURL: "https://groupprojectonetjdd.firebaseio.com",
    projectId: "groupprojectonetjdd",
    storageBucket: "groupprojectonetjdd.appspot.com",
    messagingSenderId: "302849684174"
  };
  firebase.initializeApp(config);
  function writeUserData(userId, name, email, lat, lon, url, info, dogName) {
    // create file full of user ids
    firebase.database().ref('allIds').push({
        id:userId
    }).catch(e => console.log("id " + e.message))
    // create file full of dogs
    firebase.database().ref('dogs').push({
        ownerId: userId,
        ownerName: name,
        dogName: dogName,
        loc: {
            lat: lat,
            lng: lon,
            },
        url: url,
        info: info,
    }).catch(e => console.log("dog " + e.message))
    // writing user information into their unique object
    firebase.database().ref('users/' + userId).set({
      name: name,
      email: email,
      range: "",
      isOwner: true,
      dogs: "",   
    }).catch(e => console.log("user " + e.message));
    
}
$("#dummySubmit").on('click', (event) => {
    event.preventDefault();
    var name = $("#name").val().trim();
    var info = $("#info").val().trim();
    var dogName = $("#dogName").val().trim();
    var email = $("#email").val().trim();
    var password = $("#password").val();
    var lat = $("#lat").val();
    var lon = $("#long").val();
    var url = $("#url").val();
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
                writeUserData(firebase.auth().currentUser.uid, name, email, lat, lon, url, info, dogName);
                console.log(firebase.auth().currentUser.uid + " create");
                // redirect to home page
                window.location.replace("../../index.html");
            }
        })

    }else{
        M.toast({html: 'password did not match confirm'});
    }
});