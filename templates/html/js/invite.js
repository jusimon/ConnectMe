/*
This file contains all the custom code for ConnectMe and will be used for ajax calls
*/

var invitetable1;
var inviteqsetid;
$(document).ready(function() {

/* First Check for Page Auth, this will be the first function which will be executed  */

 $.ajaxSetup({
    headers: {
      'Authorization': "JWT " + $.cookie('token')
    }
 });

/* Call this function for validating token at server side to make sure that user is authenticated */

/* ############### Following Section Contains a code for Question Set and Quiz Generation ###################### */

if (($.cookie('role') == 'admin') ||  ($.cookie('role') == 'recruiter'))
{
$("#listinvitereport1").show();
$("#invitedetailreport1").hide();
$("#inviteform1").hide();
$("#showsendemailfrmbtn1").show();
$("#showinvitereportbtn1").hide();
populateInviteData();


$("#inviteform1").submit(function(event) {
    /* stop form from submitting normally */
    event.preventDefault();
    var data = $('#inviteform1').serializeArray();
    console.log(data);
    var tenancy_id = $.cookie('tenancy_id');
    var created_by = $.cookie('username');
    data.push({name: "created_by", value: created_by})
    data.push({name: "tenancy_id", value: tenancy_id})
    data.push({name: "qset_id", value: inviteqsetid})
    console.log(data);
    var req=$.ajax({
      type: "POST",
      url: "/api/invite",
      data: $.param(data),
    });
    req.done();
    req.fail();
    req.complete(resetInviteForm1);
 });


$('#invitereport1').on( 'click', '#viewinvitebtn1', function () {
        var data=invitetable1.row( $(this).parents('tr') ).data();
        console.log(data);
        inviteqsetid=data[7];
        console.log(inviteqsetid);
        $("#listinvitereport1").hide();
        $("#invitedetailreport1").show();
        $("#inviteform1").hide();
        $("#showsendemailfrmbtn1").hide();
        $("#showinvitereportbtn1").show();

        inviteDetailReport();
});

$('#invitereport1').on( 'click', '#sendinvitebtn1', function () {
        var data=invitetable1.row( $(this).parents('tr') ).data();
        console.log(data);
        inviteqsetid=data[7];
        console.log(inviteqsetid);
        $("#listinvitereport1").hide();
        $("#invitedetailreport1").hide();
        $("#inviteform1").show();

        sendInviteList();
});


$("#showinvitereportbtn1").click(function() {
        $("#listinvitereport1").show();
        $("#invitedetailreport1").hide();
        $("#inviteform1").show();
        $("#showsendemailfrmbtn1").show();
                $("#showinvitereportbtn1").hide()
        populateInviteData();
});


$("#showsendemailfrmbtn1").click(function() {
        $("#listinvitereport1").hide();
        $("#invitedetailreport1").hide();
         $("#showinvitereportbtn1").hide();
        $("#inviteform1").show();
});

}

});

/* ################################################################################################################ */


/* ##################### Code for Qustion Set and Quiz generation Starts here ############### */
function sendInviteList() {
 var tenancy_id = $.cookie('tenancy_id');
 console.log('tenancy_id');
 console.log('username');

 var req = $.ajax({
    type: "GET",
    url: "/api/usermgmt",
    dataType: "json",
    data:
    {
      "tenancy_id": tenancy_id,
      "querytype": "listclients",
    }
 });
 req.done(buildClientList);
 req.fail(checkError);
}

function buildClientList(response)
{
  console.log(response);
  obj = JSON.parse(response);
  console.log(obj);

var resultarr= [];
  dropdown = $('#clientlist');
  dropdown.empty();
  dropdown.append('<option selected="true" disabled>Choose a Client</option>');

  obj.forEach(function(Object){
    resultarr.push([Object.email_id,Object.role]);
    dropdown.append($('<option></option>').attr('value', Object.email_id).text(Object.email_id));
});

}

function inviteDetailReport() {
 var tenancy_id = $.cookie('tenancy_id');
 var created_by = $.cookie('username');
 var querytype = $.cookie('role');
 console.log('tenancy_id');
 console.log('username');

 var req = $.ajax({
    type: "GET",
    url: "/api/invite",
    dataType: "json",
    data:
    {
      "tenancy_id": tenancy_id,
      "created_by": created_by,
      "querytype": querytype,
      "qset_id": inviteqsetid
    }
 });
 req.done(buildInviteEmailTable);
 req.fail(checkError);
}

function buildInviteEmailTable(response)
{
  console.log(response);
  obj = JSON.parse(response);
  var rowdata;
  console.log(obj);

var resultarr= [];

obj.forEach(function(Object){
    resultarr.push([Object.client_email_id,Object.email_sent,Object.created_by,object.invite_id]);
});

console.log(resultarr);

QuizTable1= $('#invitedetailreport1').DataTable( {
        destroy: true,
        data: resultarr,
        columns: [
            { title: "Client Email id" },
            { title: "Email Sent?" },
            { title: "Created By" },
            { title: "Edit/Delete" },
           ],
            "columnDefs": [ {
                "targets": -1,
                "data": null,
                "defaultContent": "<button id='sendemailbtn1'>Send Email Again</button>"
                       } ],
    });

}


function populateInviteData()
{
 var tenancy_id = $.cookie('tenancy_id');
 var created_by = $.cookie('username');
 var querytype = $.cookie('role');
 console.log('tenancy_id');
 console.log('username');

 var req = $.ajax({
    type: "GET",
    url: "/api/qset",
    dataType: "json",
    data:
    {
      "tenancy_id": tenancy_id,
      "created_by": created_by,
      "querytype": querytype
    }
 });
 req.done(buildInviteTable);
 req.fail(checkError);
}

function buildInviteTable(response)
{
  console.log(response);
  obj = JSON.parse(response);
  var rowdata;
  console.log(obj);

var resultarr= [];

obj.forEach(function(Object){
    resultarr.push([Object.qset_name,Object.qset_title,Object.timeonperpage,Object.maxtimetofinish,Object.qset_intro_text,Object.qset_thankyou_text,Object.created_by,Object.qset_id]);
});

console.log(resultarr);

invitetable1= $('#invitereport1').DataTable( {
        destroy: true,
        data: resultarr,
        columns: [
            { title: "Name" },
            { title: "Title" },
            { title: "TimerOnPage" },
            { title: "MaxTimeToFinish" },
            { title: "Intro Text" },
            { title: "ThankYou Text" },
            { title: "Created By" },
            { title: "Edit/Delete" },
           ],
            "columnDefs": [ {
                "targets": [7],
                "data": null,
                "defaultContent": "<button id='viewinvitebtn1'>View Invites</button>" + "<button id='sendinvitebtn1'>Send Invite</button>"
                       } ],
    } );

}

function resetInviteForm1()
{
$("#inviteform1").trigger("reset");
}

/* ##################### Code for Question Set and Quiz generation ends here ############### */
