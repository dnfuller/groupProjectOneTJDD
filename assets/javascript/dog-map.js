$(document).ready(function() {
    //google logic

    //initialize firebase
    // var config = {
    //     apiKey: "AIzaSyAk6IGsE44hQcZ0sPeGHenFFd-r4wtbOwQ",
    //     authDomain: "groupprojectonetjdd.firebaseapp.com",
    //     databaseURL: "https://groupprojectonetjdd.firebaseio.com",
    //     projectId: "groupprojectonetjdd",
    //     storageBucket: "groupprojectonetjdd.appspot.com",
    //     messagingSenderId: "302849684174"
    //   };
    //   firebase.initializeApp(config);
  


    var addresses = [
    '2810 Quebec St, Denver, CO 80207',
    '5125 W Florida Ave, Denver, CO 80219',
    '7984 W Alameda Ave, Lakewood, CO 80226',
    '5301 W 38th Ave, Wheat Ridge, CO 80212',  
    '101 Englewood Pkwy, Englewood, CO 80110',
    '2727 W Evans Ave, Denver, CO 80219',
    '2199 S University Blvd, Denver, CO 80208'
    ];    
    
    var LatLngAddress = [];

    //get location form
    var locationForm = document.getElementById('location-form');

    //listen for submit
    locationForm.addEventListener('submit', geocode);

    function geocode(event) {
        //prevent actual submit
        event.preventDefault();

        var withinRange = [];
            //console.log(range);
        var mileRange = document.getElementById('range-input').value;
        var location = document.getElementById('location-input').value;
        console.log(location);
    
        //loops thru address array
        for (var i = 0; i < addresses.length; i++) {
            
            location = addresses[i];
            console.log(location);
            
            axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params:{
                    address: location,
                    key: 'AIzaSyBnL1mPa-gaSVkuqeE8FquM521QqlV6yfc'
                }
            })
            .then(function(response) {
                //log full response
                // console.log(response);
        
                //geometry
                var lat = response.data.results[0].geometry.location.lat;
                var lng = response.data.results[0].geometry.location.lng;          
                //output to app
                console.log(lat +', ' + lng);
                        
                LatLngAddress.push({"lat": lat, "lng": lng});
                
            })
            .catch(function(error) {
                console.log(error);
            });

            // if (computeDistanceBetween()) {

            // }
        
        }

        for (var i = 0; i < LatLngAddress.length; i++) {

            console.log(i + LatLngAddress[i]);
        
        }
        
        
        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params:{
                address: location,
                key: 'AIzaSyBnL1mPa-gaSVkuqeE8FquM521QqlV6yfc'
            }
        })
        .then(function(response) {
            //log full response
            //console.log(response);
            
            //formatted address
            var formattedAddress = response.data.results[0].formatted_address;
            var formattedAddressOutput = `
                <ul class = 'list-group'>
                    <li class = 'list-group-item'>${formattedAddress}</li>
                </ul>
            `;

            //address components
            var addressComponents = response.data.results[0].address_components;
            var addressComponentsOutput = '<ul class = "list-group">';

            // for (var i = 0; i < addressComponents.length; i++) {
            //     // addressComponentsOutput += `
            //     //     <li class = 'list-group-item'><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>
            //     // `;
            // }
            // addressComponentsOutput += '</ul>';

            //geometry
            var lat = response.data.results[0].geometry.location.lat;
            var lng = response.data.results[0].geometry.location.lng;
            var geometryOutput = `
                <ul class = 'list-group'>
                    <li class = 'list-group-item'><strong>Lattitude</strong>:${lat}</li>
                    <li class = 'list-group-item'><strong>Longitude</strong>:${lng}</li>
                </ul>
            `;
            

            //output to app
            // document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
            document.getElementById('address-components').innerHTML = addressComponentsOutput;
            // document.getElementById('geometry').innerHTML = geometryOutput;
           // console.log('lat: ' + lat + ', lng: ' + lng);

            

        })
        .catch(function(error) {
            console.log(error);
        });

        
    }

    // function initMap() {
    //     var options = {
    //         zoom: 8,
    //         center: {lat: 39.7392, lng: -104.9903}
    //     }
    //     var map = new google.maps.Map(document.getElementById('map'), options);
    
    //     function addMarker(lt, lg) {
    //         var marker = new google.maps.Marker({
    //             position: {lat: lt,lng: lg},
    //             map: map,
    //             icon: 'pawIcon_32x32.png'
    //         });
    //     }
    //     addMarker(39.6766, -104.9619);

  //}
  
  //NO CODE BELOW THIS LINE
});
