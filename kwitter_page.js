//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyA_JsXeTUTVLh9q_Ai11_L_uPGAy54Zmm0",
      authDomain: "kwitter-9ec30.firebaseapp.com",
      databaseURL: "https://kwitter-9ec30-default-rtdb.firebaseio.com",
      projectId: "kwitter-9ec30",
      storageBucket: "kwitter-9ec30.appspot.com",
      messagingSenderId: "53944236477",
      appId: "1:53944236477:web:d81cb78081d65ad58e3ad4",
      measurementId: "G-KM91HE8F02"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");

function send()
{
      msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push(
            {
                  name:user_name,
                  message:msg,
                  like:0
            }
      );
      document.getElementById("msg").value=" ";
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
            //Start code
            console.log(firebase_message_id);
            console.log(message_data);
            name=message_data['name'];
            message=message_data['message'];
            like=message_data['like'];
            line1="<h4>"+name + "<img class='user_tick' src='tick.png'></h4> ";
            line2="<h4 class='message_h4'>"+message+"</h4>";
            line3="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";
            row=line1+line2+line3;
            document.getElementById("output").innerHTML+=row;
            //End code
      } });  }); }
getData();

function updateLike(message_id)
{
      buttonid=message_id;
      likes=document.getElementById(buttonid).value;
      updatedlikes=Number(likes)+1;
      console.log(updatedlikes);
      firebase.database().ref(room_name).child(message_id).update(
            {
                  like:updatedlikes
            }
      );
}
function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}