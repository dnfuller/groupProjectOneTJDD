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
                var dogCard = $("<div>").addClass("card dogCard").attr("data-id", dogArray[i].ownerId).attr("data-index", i);
                var dogImage = $("<div>").addClass("card-image").html("<image class='dogImage' src='" + dogArray[i].url + "' alt='dog image' /> <span class='card-title'>" + dogArray[i].dogName + "</span>");
                var dogContent = $("<div>").addClass("card-content").text(dogArray[i].info);
                if(i % 2 == 0 && i != 1 || i == 0){
                    console.log(i + " new");
                    var newRow = $("<div>").addClass("row").attr("id", "row" + j).append(dogCol.append(dogCard.append(dogImage, dogContent)));
                    dogArea.append(newRow);
                    j++
                }else{
                    console.log(i + " append");
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
function addRow(appnd){
    newRow=$("<div>");
    newRow.addClass("row");
    appnd.append(newRow);
    return newRow;
}
function addCol(lg, md, sm, rowName){
    newCol=$("<div>");
    newCol.addClass("col l" + lg + " m " + md + " s " + sm);
    rowName.append(newCol);
    return newCol;
}
$("#dogArea").on("click", ".dogCard", function(){
    var ownerId = $(this).attr("data-id");
    var dogIndex = $(this).attr("data-index");
    database.ref("users/" + ownerId).once('value').then(snapshot => {
        $("#dogArea").empty();
        var contactArea = $("<div>").addClass("row");
        var dogDiv = $("<div>").addClass("col l4 m4 s4");
        var dogPicRow = addRow(dogDiv);
        var dogPicCol = addCol(12, 12, 12, dogPicRow);
        var dogPic = $("<img>").attr("src", dogArray[dogIndex].url).addClass("dogPic")
        dogPicCol.append(dogPic);
        var dogNameRow = addRow(dogDiv);
        var dogNameCol = addCol(12, 12, 12, dogNameRow);
        var dogName = $("<h2>").text(dogArray[dogIndex].dogName);
        dogNameCol.append(dogName);
        var contentDiv = addCol(8, 8, 8, contactArea);
        var nameRow = addRow(contentDiv);
        var nameCol = addCol(12, 12, 12, nameRow);
        var nameH = $("<h2>").text(snapshot.val().name);
        nameCol.append(nameH);
        var emailRow = addRow(contentDiv);
        var emailCol = addCol(12, 12, 12, emailRow);
        var emailP = $("<p>").text(snapshot.val().email);
        emailCol.append(emailP);
        contactArea.append(dogDiv, contentDiv);
        $("#dogArea").append(contactArea);
    })

})
