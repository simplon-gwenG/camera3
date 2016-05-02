
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
  //canevas
  var canvas = document.getElementById('canvas_id');
  var context =canvas.getContext('2d');
  var photo = document.querySelectorAll('.imgAffichage');//selection en html 5 sur la class imgAffichage et renvoie un tableau
       for (var j = 0; j < photo.length; j++) {// on parcourt le tableau j car i est déjà utilisé
       photo[j].ngSrc = $scope.images[j];//selection de la source (tableau d'images)
       var positionX = j*260;// variable qui crée un décalage de position d'image à chaque tour de tableau
       var positionY = 0;
       context.save();// sauvegarde du conevas initial
       context.translate(200, 10)// déplacement de l'image
       context.rotate((Math.PI / 180) * 90)// rotation de l'image
       context.strokeStyle = "#ffffff";// cadre blanc autour de l'image
       context.lineWidth = 10;// épaisseur du cadre
       //context.strokeRect(0,0,context.canvas.width, context.canvas.height);
       context.drawImage(photo[j],positionX,positionY,250,150);// dessine une image à chaque tour de boucle du tableau photo[j] avec les positions définies
//dessine l'image  de l'index j
       context.strokeRect(positionX,positionY,250, 150);// positionnment du rectangle autour de l'image
       context.restore();// retour au context d'origine
       }
       //transforme le canevas en image
             $scope.photo = window.canvas2ImagePlugin.saveImageDataToLibrary(
                function(msg){
                    console.log(msg);
                },
                function(err){
                    console.log(err);
                },
                document.getElementById('canvas_id')
            );

//on appelle le plugin email que l'on a ajouté au début
  window.plugin.email.open({
               to:   ''       , // email addresses for TO field
               attachments: [photo], // file paths or base64 data streams
               subject:    "Ma Photo K-Bine", // subject of the email
               body:       bodyText , // email body (for HTML, set isHtml to true)
               isHtml:    true, // indicats if the body is HTML or plain text
           }, function () {
               console.log('email view dismissed');
           },
           this);
       }

<<<<<<< HEAD
=======
       var canvas = document.getElementById('canvas_id');
       var context =canvas.getContext('2d');
       var photo = document.querySelectorAll('.imgAffichage');//selection en html 5 sur la class imgAffichage et renvoie un tableau
            for (var j = 0; j < photo.length; j++) {// on parcourt le tableau j car i est déjà utilisé
            photo[j].ngSrc = $scope.images[j];//selection de la source (tableau d'images)
            var positionX = j*260;// variable qui crée un décalage de position d'image à chaque tour de tableau
            var positionY = 0;
            context.save();// sauvegarde du canevas initial
            context.translate(200, 10)// déplacement de l'image
            context.rotate((Math.PI / 180) * 90)// rotation de l'image
            context.strokeStyle = "#ffffff";// cadre blanc autour de l'image
            context.lineWidth = 10;// épaisseur du cadre
            //context.strokeRect(0,0,context.canvas.width, context.canvas.height);
            context.drawImage(photo[j],positionX,positionY,250,150);// dessine une image à chaque tour de boucle du tableau photo[j] avec les positions définies
    //dessine l'image  de l'index j
    context.strokeRect(positionX,positionY,250, 150);// positionnment du rectangle autour de l'image
            context.restore();// retour au context d'origine
            var img = new Image();
            img.src = canvas.toDataURL();
            document.body.appendChild(img);
            }
>>>>>>> 943045ec45acf8f2a5494eae34bc5d9c7b4c02b2
    }
})
