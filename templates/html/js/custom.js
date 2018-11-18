/*
This file contains all the custom code for ConnectMe and will be used for ajax calls
*/

$(document).ready(function(){

  /* Following event handles tenancy creation */

$.ajaxSetup({
	headers:{
        	'Authorization': "JWT " + $.cookie('token')
   	 }
});

    $("#tenancyform").submit(function(event) {
     /* stop form from submitting normally */
      event.preventDefault();
     $.ajax({
          type: "POST",
          url: "/api/tenancy",
         // contentType: 'application/json',
          data: $('#tenancyform').serialize(),
          success: checkSuccess,
          error: checkError
       });
   });


  /* Following function handles Jwt token access  */

    $("#loginform").submit(function(event) {
     /* stop form from submitting normally */
      event.preventDefault();

     var _data={
      username: $('#username').val(),
      password: $('#password').val()
     }

/*
           var mapobj = {username:"username",password:"password"};
   	   var _str =  $('#loginform').serialize();
           var _data;
   	  _data= genKeyPair(_str, mapobj);
    	  console.log({ _data });
         _data = {"username" : "testuser@testmail.com", "password": "test"};
*/
      console.log(_data);

    $.ajax({
          type: "POST",
          url: "/auth",
          contentType: 'application/json',
          data:JSON.stringify(
          { 
          "username": "paramdeep.saini@sjsu.edu",
          "password": "welcome1" 
          }),
          success: getToken,
          error: checkError
       });
   });


  /* Following event handles is for testing the cookie */

    $("#testbutton").click(function() {
     /* stop form from submitting normally */
     $.ajax({
          type: "GET",
          url: "/api/items",
         // contentType: 'application/json',
          success: checkSuccess,
          error: checkError
       });
   });

});



function twitterme()
{
alert ("I am in twitterme");
}

function resetpassword()
{
alert ("I am in resetpassword");
}


function registerme()
{
alert ("I am in registerme");
}


function checkSuccess(data, textStatus, XMLHttpRequest)
{
console.log(data);
console.log(textStatus);
}

function getToken(response)
{
  var jwt_token = response['access_token'];
  var token = jwt_token;
  console.log(token);
  console.log(response);
  $.cookie('token', token);
 // window.location.href = "index.html";
}

function checkError(XMLHttpRequest, textStatus, errorThrown)
{
 alert("I am in checkError");
 alert(textStatus,errorThrown);
}


function genKeyPair(_str,mapObj){
       var _data = {};
       console.log(_str);
      _data = _str.replace(/&/g,", ");
      console.log(_data);
      _str = _data.replace(/=/g,": ");
      console.log(_str);
       _data = _str.replace(/%40/g,"@");
       _str = _data;
       console.log(_str);
    var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
    
    return _str.replace(re, function(matched){
        return mapObj[matched];
    });
}
