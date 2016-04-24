
angular.module('starter')

.controller('ImageController', function($scope, $cordovaFile, $cordovaCapture, $cordovaEmailComposer){
  // définition du tableau pour le ng-repeat pour stocker les images
  $scope.images = [];
  $scope.myObj = {"border": "10px solid white",}

  $scope.takePhoto = function(){// fonction du ng-click
    var options = {
      limit:2 // définit le nb de photos à prendre en un seul click sur le bouton
    };

    $cordovaCapture.captureImage(options).then(function(results){
      for (var i= 0; i < results.length; i++){
        $scope.images.push(results[i].fullPath);// on renvoit les données à notre tableau d'images
      }

      if(!$scope.$$phase){
      $scope.$apply();}//??
      },
      function(err){
        console.log('err');
        console.log(err);
      });
  };
  $scope.sendEmail =function(){
    // body text
    var bodyText = "<h2>photos prises par MaPhoto K-Bine</h2>";
        if (null != $scope.images) {
            var images = [];
            var savedImages = $scope.images;
            for (var i = 0; i < savedImages.length; i++) {
                // on parcourt notre tableau d'images avec les corrects paths
                images.push("" + savedImages[i]);
                // le path est récupéréré des images sauvegardées dans l'app
                images[i] = images[i].replace('file://', '');

  }

//on appelle le plugin email que l'on a ajouté au début
  window.plugin.email.open({
               to:   ''       , // email addresses for TO field
               attachments: images, // file paths or base64 data streams
               subject:    "Ma Photo K-Bine", // subject of the email
               body:       bodyText , // email body (for HTML, set isHtml to true)
               isHtml:    true, // indicats if the body is HTML or plain text
           }, function () {
               console.log('email view dismissed');
           },
           this);
       }
       var canvas = document.getElementById('canvas_id');
       canvas.width = 500;
       canvas.height = 300;
       //canvas.style.zIndex = 8;
       //canvas.style.position = "absolute";
       canvas.style.border = "5px solid";

       console.log(canvas_id);

       var context =canvas.getContext('2d');
       console.log(context);

       var photo = new Image();
       photo.ngSrc = $scope.images[0];
       context.drawImage(photo, 0, 0, 100, 100);
       console.log(photo.ngSrc);

    }

})
