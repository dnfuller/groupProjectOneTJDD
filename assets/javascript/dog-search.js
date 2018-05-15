//google logic
//get location form
var locationForm = document.getElementById('location-form');

//listen fo submit
locationForm.addEventListener('submit', geocode);

function geocode(event) {
   //prevent actual submit
   event.preventDefault();

    var location = document.getElementById('location-input').value;
    
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params:{
            address: location,
            key: 'AIzaSyBnL1mPa-gaSVkuqeE8FquM521QqlV6yfc'
        }
    })
    .then(function(response) {
        //log full response
        console.log(response);

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
        console.log('lat: ' + lat + ', lng: ' + lng);

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

// }