angular.module('nomadConfirm', ['nomadForm'])
.controller('nomadConfirmCtrl', ($scope, $location, params) => {

  $scope.location = params.address;
  $scope.date = params.date;
  $scope.startTime = params.startTime;
  $scope.endTime = params.endTime;
  $scope.eventName = params.eventName;
  $scope.hostName = params.host;
  $scope.description = params.description;

  var confirmMap = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: new google.maps.LatLng(params.lat, params.long),
      mapTypeId: 'roadmap'
    });

  var marker = new google.maps.Marker({
    position: { lat: params.lat, lng: params.long },
    map: confirmMap
  });

  $scope.redirectToEditPage = () => {
    console.log("inside redirectToEditPage");
    $location.url("nomad");
  }

  $scope.sendNomadInfo = () => { 
    fetch('/api/createEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
              info: {
                name: params.eventName,
                host: params.host,
                description: params.description,
              },
              location: {
                lat: params.lat,
                long: params.long
              },
              time: [{
                start: String(params.origDate).split('T')[0] + 'T' + String(params.origStartTime).split('T')[1],
                end: String(params.origDate).split('T')[0] + 'T' + String(params.origEndTime).split('T')[1]
              }]
            })
    });
    $location.path('/explorer');
  };
});