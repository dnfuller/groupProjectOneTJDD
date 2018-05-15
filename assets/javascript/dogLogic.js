// initialize firebase
    var config = {
        apiKey: "AIzaSyAk6IGsE44hQcZ0sPeGHenFFd-r4wtbOwQ",
        authDomain: "groupprojectonetjdd.firebaseapp.com",
        databaseURL: "https://groupprojectonetjdd.firebaseio.com",
        projectId: "groupprojectonetjdd",
        storageBucket: "groupprojectonetjdd.appspot.com",
        messagingSenderId: "302849684174"
      };
      firebase.initializeApp(config);

    var dogArray=[];
    var database = firebase.database();
    var auth = firebase.auth();


database.ref('dogs').on('child_added', snapshot => {
    console.log(snapshot.val());
    // dogArray.push(snapshot.val());
})

// $("#dogSearchBtn").on('click', event => {
//     event.preventDefault();
//     var range = $("#rangeSlide").val();
//     var 
//     // axios call to convert inputed location into lat lng
//     // in a .then i will test if the distance between each dog is less than or equal too the range then i will
//     // i will then add each dog to the page if they are in range
//     for(var i = 0; i < dogArray.length; i++){
        
//                 var dogArea = $("#dogArea")
//                 var dogCol = $("<div>").addClass("col l4")
//                 var dogCard = $("<div>").addClass("card")
//                 var dogImage = $("<div>").addClass("card-image").html("<image src='" + dogArray[i].url + "' alt='dog image' /> <span class='card-title'>" + dogArray[i].dogName + "</span>");
//                 var dogContent = $("<div>").addClass("card-content").text(dogArray[i].info);
//                 if(i%3 == 0){
//                     var newRow = $("<div>").addClass("row").append(dogCol.append(dogCard.append(dogImage, dogContent)));
//                     dogArea.append(newRow);
//                 }else{
//                     dogArea.append(dogCol.append(dogCard.append(dogImage, dogContent)));
//                 }
//     }
// })
