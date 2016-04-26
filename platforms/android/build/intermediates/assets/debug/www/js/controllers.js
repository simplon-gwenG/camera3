
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
       console.log(canvas_id);

       var context =canvas.getContext('2d');
       console.log(context);



               var photo = document.querySelectorAll('.imgAffichage');//selection en html 5 sur la class imgAffichage et renvoie un tableau
               for (var j = 0; j < photo.length; j++) {// on parcourt le tableau j car i est déjà utilisé
                   photo[j].ngSrc = $scope.images[j];//selection de la source (tableau d'images)
                   var positionX = j*100;// variable qui crée un décalage de position d'image à chaque tour de tableau
                   var positionY = 0;
                   context.drawImage(photo[j],positionX,positionY,100,100);
               }

               /*$scope.draw = function () {
                 context.drawImage($scope.photo,10,10,50,50);
             }*/


               //context.fillStyle = "#ff0000";
                //context.fillRect(30,0,80,80);



    }

})
