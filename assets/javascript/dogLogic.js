// initialize firebase
    // var config = {
    //     apiKey: "AIzaSyAk6IGsE44hQcZ0sPeGHenFFd-r4wtbOwQ",
    //     authDomain: "groupprojectonetjdd.firebaseapp.com",
    //     databaseURL: "https://groupprojectonetjdd.firebaseio.com",
    //     projectId: "groupprojectonetjdd",
    //     storageBucket: "groupprojectonetjdd.appspot.com",
    //     messagingSenderId: "302849684174"
    //   };
    //   firebase.initializeApp(config);

    var dogArray=[];
    var database = firebase.database();
    var auth = firebase.auth();


database.ref('/dogs').on('child_added', snapshot => {
    console.log(snapshot.val());
    dogArray.push(snapshot.val());
})

$("body").on('click', "#dogSearchBtn", event => {
    event.preventDefault();
    $("#dogArea").empty();
    var range = $("#rangeSlide").val();
    // var userLoc = $("#userLoc").val().trim();
    var userLoc = "2199 S University Blvd, Denver, CO 80208"
    var userLat, userLng;
    var j = 0;
    console.log("pushed");
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params:{
            address: userLoc,
            key: 'AIzaSyBnL1mPa-gaSVkuqeE8FquM521QqlV6yfc'
        }
    }).then(response => {
        
        console.log("called")
        userLat = response.data.results[0].geometry.location.lat;
        userLng = response.data.results[0].geometry.location.lng;
        console.log(userLat + ", " + userLng);
        userLoc = new google.maps.LatLng(userLat, userLng);
        
        for(var i = 0; i < dogArray.length; i++){
            console.log(range);
            var dogLoc = new google.maps.LatLng(dogArray[i].loc.lat, dogArray[i].loc.lng);
            console.log(userLoc);
            console.log(dogLoc);
            
            var distance = (google.maps.geometry.spherical.computeDistanceBetween(userLoc, dogLoc) / 1609.34);
            console.log(distance)
            if(distance < range){
                var dogArea = $("#dogArea")
                var dogCol = $("<div>").addClass("col l6")
                var dogCard = $("<div>").addClass("card dogCard")
                var dogImage = $("<div>").addClass("card-image").html("<image class='dogImage' src='http://www.placepuppy.net/200/100' alt='dog image' /> <span class='card-title'>" + dogArray[i].dogName + "</span>");
                var dogContent = $("<div>").addClass("card-content").text(dogArray[i].info);
                if(i % 2 == 1 && i != 1 || i == 0){
                    var newRow = $("<div>").addClass("row").attr("id", "row" + j).append(dogCol.append(dogCard.append(dogImage, dogContent)));
                    dogArea.append(newRow);
                    j++
                }else{
                    // var id = "#row" + j
                    // console.log(id)
                    $(newRow).append(dogCol.append(dogCard.append(dogImage, dogContent)));
                }
            }else{
                console.log(dogArray[i].dogName + " out of range");
            }
        }
        
    })
    // axios call to convert inputed location into lat lng
    // in a .then i will test if the distance between each dog is less than or equal too the range then i will
    // i will then add each dog to the page if they are in range
    
})
