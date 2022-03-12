//ADD YOUR FIREBASE LINKS HERE
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
document.getElementById("user_name").innerHTML="Welcome "+user_name+"!";

function getData() 
{
      firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
            Room_names = childKey;
            console.log("room name - "+Room_names);
            row="<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
            document.getElementById("output").innerHTML+=row;
            });
      });
}
getData();
function addRoom()
{
      room_name=document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update(
            {
                  purpose:"adding room name"
            }
      );
      localStorage.setItem("room_name",room_name);
      window.location="kwitter_page.html";
}
function redirectToRoomName(name)
{
      console.log(name);
      localStorage.setItem("room_name",room_name);
      window.location="kwitter_page.html";
}
function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}