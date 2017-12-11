 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCMzIv6MdPya32XeOqolUiAbTFiqZX5QG4",
    authDomain: "healthy-battery-160212.firebaseapp.com",
    databaseURL: "https://healthy-battery-160212.firebaseio.com",
    projectId: "healthy-battery-160212",
    storageBucket: "healthy-battery-160212.appspot.com",
    messagingSenderId: "1064128468443"
  };
  firebase.initializeApp(config);

      //Storage ref
      var storage = firebase.storage();
      // Create a storage reference from our storage service
      var storageRef = storage.ref();


var classCardMainDiv        = "demo-card-square mdl-card mdl-shadow--0dp";
var classCardTitleDiv       = "mdl-card__title mdl-card--expand";
var classCardTitleHeader    = "mdl-card__title-text";
var classCardDescDiv        = "mdl-card__supporting-text";
var classCardActionDiv      = "mdl-card__actions mdl-card--border";
var classCardActionAnchor   = "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect";

var divParent               = document.getElementById("div_card_parent");


function createCard(cardTitle,cardDesc,imageUrl,action,url,color){

  //Main card
  divCardMain = document.createElement("div");
  divCardMain.className = classCardMainDiv;

  //Card Title Div
  var divCardTitle = document.createElement("div");
  divCardTitle.className = classCardTitleDiv;
    //Card Title Header
  headerCardTitle = document.createElement("h2");
  headerCardTitle.className = classCardTitleHeader;
  headerCardTitle.innerHTML = cardTitle;


  divCardTitle.appendChild(headerCardTitle);

  divCardMain.appendChild(divCardTitle);

    if(color!=null){
      console.log(color.bg);
      if(color.bg!=null){
        divCardTitle.style.backgroundColor = color.bg;
      }
      if(color.text!=null){
        headerCardTitle.style.color = color.text;
      }
    }
  if(imageUrl!=null){

              divCardTitle.style.backgroundImage = 'url(images/loader.gif)';
              var imagesRef = storageRef.child('images/'+imageUrl);
              console.log("storage")
              console.log(imagesRef);

              imagesRef.getDownloadURL().then(function(url) {
              // `url` is the download URL for 'images/stars.jpg'

              // This can be downloaded directly:
              var xhr = new XMLHttpRequest();
              xhr.responseType = 'blob';
              xhr.onload = function(event) {
                var blob = xhr.response;
              };
              xhr.open('GET', url);
              xhr.send();

              // Or inserted into an <img> element:
              console.log("Image success:"+imagesRef.name)
              var bgImg = new Image();
              bgImg.onload = function(){
                 divCardTitle.style.backgroundImage = 'url(' + bgImg.src + ')';
                   console.log("Loaded");
              };
              bgImg.src = url;

              }).catch(function(error) {
              // Handle any errors
              console.log("Error");
              });


          }

  //Card desc div
  divCardDesc = document.createElement("div");
  divCardDesc.className = classCardDescDiv;
  divCardDesc.innerHTML = cardDesc;
  divCardMain.appendChild(divCardDesc);

  //Card Action Div
  divCardAction = document.createElement("div");
  divCardAction.className = classCardActionDiv;


  //Card Action Header
  anchorCardAction = document.createElement("a");
  anchorCardAction.className = classCardActionAnchor;
  anchorCardAction.innerHTML =action;
  anchorCardAction.href = url;
  anchorCardAction.target = '_blank';
  anchorCardAction.onclick = function(){
	handleLinkClicks(event,cardTitle)};


  divCardAction.appendChild(anchorCardAction);
  divCardMain.appendChild(divCardAction);




  divParent.appendChild(divCardMain);

}

function init(){

        //
	/*
        document.getElementById('force-download-resume').onclick = function() {
          handleLinkClicks(event,'force-download-resume');
          window.open('docs/Bharath-Resume.pdf');

        };
	*/

        var data = firebase.database().ref('projects/').orderByChild('starCount');
        data.on('value', function(snapshot) {
            divParent.innerHTML = "";
            var count=1;

            snapshot.forEach(function(childSnapshot) {


                console.log("Date Uploaded:"+childSnapshot.key);
                var tempDesc = null;
                var tempImg =  null;
                var tempTitle = null;


                var tempStatus = null;
                var tempColor = null;
                var tempUrl = null;
                var tempAction =null;
                childSnapshot.forEach(function(innerElem) {
                  //  console.log("Key:"+elem.key);

                    if(innerElem.key=="description"){
                      tempDesc=innerElem.val();
                    }
                    else if (innerElem.key=="imgUrl") {
                      tempImg=innerElem.val();
                    }
                    else if (innerElem.key=="title") {
                      tempTitle=innerElem.val();
                    }

                    else if (innerElem.key=="status") {
                      tempStatus = innerElem.val();
                    }
                    else if (innerElem.key=="color") {
                      tempColor = innerElem.val();
                    }
                    else if (innerElem.key=="url") {
                      tempUrl= innerElem.val();
                    }
                    else if (innerElem.key=="action") {
                      tempAction= innerElem.val();
                    }
                    //var id,var title,var img,var desc
                });



                  if(tempStatus==1){
                    console.log(tempTitle);
                    createCard(tempTitle,tempDesc,tempImg,tempAction,tempUrl,tempColor);
                    //createCard(tempUrl,tempTitle,tempImg,tempDesc,tempAuthor,temPublishedDate,tempColor);
                  }
                if(count==snapshot.numChildren()){
                  //alert("Data completely loaded");
                 //document.getElementById("loader").display = 'none';
                  count=1;
                }
                // document.querySelector('#p1').addEventListener('mdl-componentupgraded', function() {
                //     document.querySelector('#p1').MaterialProgress.setProgress(count*100/count==snapshot.numChildren());
                //   });
                  count++;
            });
      });
      }
      init();
