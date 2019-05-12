/*
This file contains all the custom code for ConnectMe and will be used for ajax calls
*/

var QuizTable1_1;

var QsetId_1;
var QuizTable_1;
var title;
var    choice_1;
var    choice_2;
var    choice_3;
var    choice_4;
var    choice_5;
var    choice_6;
var    correct_answer;
var     corect_answer;
var quiz_questions_1 = [];


$(document).ready(function() {

 $.ajaxSetup({
    headers: {
      'Authorization': "JWT " + $.cookie('token')
    }
 });

/* Call this function for validating token at server side to make sure that user is authenticated */
 var ret_code=validateToken();

/* ### Admin block for user administration will be enabled if and only if current role of the user is admin */
if ($.cookie('role') == 'admin')
{
$("#useradmintab1").show(); 
$("#qsettab1").show();
$("#invitetab1").show();
$("#resulttab1").show();
$("#listclientreport1").hide();
$("#clientreport1").hide();
$("#surveyElement").hide();
$("#surveyResult").hide();
$("#adminuser").show();
$("#recruiteruser").hide();
$("#questiontab1").show();
}
else if ($.cookie('role') == 'recruiter')
{
$("#useradmintab1").hide();
$("#qsettab1").show();
$("#invitetab1").show();
$("#resulttab1").show();
$("#listclientreport1").hide();
$("#clientreport1").hide();
$("#surveyElement").hide();
$("#surveyResult").hide();
$("#adminuser").hide();
$("#recruiteruser").show();
$("#questiontab1").show();
}
else if ($.cookie('role') == 'client')
{
$("#useradmintab1").hide();
$("#qsettab1").hide();
$("#invitetab1").hide();
$("#listclientreport1").show();
$("#clientreport1").show();
$("#resulttab1").hide();
$("#adminuser").hide();
$("#recruiteruser").hide();
$("#surveyElement").hide();
$("#surveyResult").hide();
$("#questiontab1").hide();
populatePollData();
}
else
{
$("#useradmintab1").hide();
$("#qsettab1").hide();
$("#invitetab1").hide();
$("#listclientreport1").hide();
$("#clientreport1").hide();
$("#resulttab1").hide();
$("#adminuser").hide();
$("#recruiteruser").hide();
$("#surveyElement").hide();
$("#surveyResult").hide();
}

$('#clientreport1').on( 'click', '#viewpollbtn1', function () {
        var data=QuizTable1_1.row( $(this).parents('tr') ).data();
        console.log(data);
        inviteid=data[4];
        console.log(inviteid);
        $("#useradmintab1").hide();
        $("#qsettab1").hide();
        $("#invitetab1").hide();
        $("#listclientreport1").hide();
        $("#clientreport1").hide();
        $("#surveyElement").show();
        $("#surveyResult").show();

   var req = $.ajax({
    type: "GET",
    url: "/api/invite",
    dataType: "json",
    data:
    {
      "invite_id": inviteid,
      "querytype": "getqsetid",
      "qset_id": QsetId_1
    },
    async: false
 });
req.done(questionSetID);
req.fail(checkError);
StartPoll();
});


/* ##### ADMIn Role Check Ends here ######## */
/*###### The above section contain code for user admin tables. Please check useradmin.html pages. The above code section ends here ################  */

});


/* ########### Token Auth block begins here  #################### */

function validateToken()
{
if ( $.cookie('token') && $.cookie('username'))
  {
     var req = $.ajax({
        type: "GET",
        url: "/api/items",
    });
    req.complete(chkResponse);
}
else
 {
  redirectLogin();
 }
}

function redirectLogin()
{
  alert("You have not logged in! please Signin");
  window.location.href = "login.html";
}

function chkResponse(response)
{
console.log(response);
  if (response['status']==200 && response['statusText']=='OK')
  {
     console.log(' I am in sucess');
	  
     var awsCredentials = new AWS.Credentials("key1", "key2");
     var settings = {
       	   awsCredentials: awsCredentials,
           awsRegion: "us-west-1",
           pollyVoiceId: "Joanna",
           cacheSpeech: true
     }

     if ($.cookie('role') != 'client' && $.cookie('role') != 'recruiter')
     {
    	var kathy = ChattyKathy(settings);
    	kathy.Speak("Welcome to myprojects. Myprojects has four categories such as Manage Questioner, Publish Questioner, Manage Results and administartion. Question sets and question categories can be created using manage Questioner tab. Publish questioner is used to publish the question set as well as invite the clients. Results for each client can be viewed by using Mange Results tab. Administartion tab has access to all admin Rights.");
	
    	if (kathy.IsSpeaking()) {
        	kathy.ShutUp();
    	}

    	kathy.ForgetCachedSpeech();
     }
     return 0;
 }
 else
 {
	redirectLogin();
 }
redirectLogin();
}


function populatePollData() {
 var tenancy_id = $.cookie('tenancy_id');
 var created_by = $.cookie('username');
 var querytype = $.cookie('role');
 console.log('tenancy_id');
 console.log('username');

 var req = $.ajax({
    type: "GET",
    url: "/api/quiz",
    dataType: "json",
    data:
    {
      "tenancy_id": tenancy_id,
      "created_by": created_by,
      "querytype": querytype,
    }
 });
 req.done(buildPollTable);
 req.fail(checkError);
}

function buildPollTable(response)
{
  console.log(response);
  obj = JSON.parse(response);
  var rowdata;
  console.log(obj);

var resultarr= [];

obj.forEach(function(Object){
    resultarr.push([Object.qset_title,Object.client_email_id,Object.invite_qset_status,Object.created_by,Object.invite_id]);
});

console.log(resultarr);

QuizTable1_1= $('#clientreport1').DataTable( {
        destroy: true,
        data: resultarr,
        columns: [
            { title: "Quiz Name" },
            { title: "Client Email id" },
            { title: "Quiz Status" },
            { title: "Created By" },
            { title: "Take The Quiz"  },
           ],
            "columnDefs": [ {
                "targets": -1,
                "data": null,
                "defaultContent": "<button id='viewpollbtn1'>Take The Quiz</button>"         
               } ],
    } );

}

function StartPoll()
{
Survey
    .StylesManager
    .applyTheme("default");

var    quiz_type="radiogroup";
var    quiz_name="quiz";
var    quiz_id;
var tenancy_id = $.cookie('tenancy_id');
var quiz_question1 = {};
var choice_arr = [];
console.log('tenancy_id');

 var req = $.ajax({
    type: "GET",
    url: "/api/qset",
    dataType: "json",
    data:
    {
      "tenancy_id": tenancy_id,
      "querytype": "surveyquiz",
      "qset_id": QsetId_1
    },
    async: false
 });
req.done(questionSetTitle);
req.fail(checkError);

console.log(title);

 var req = $.ajax({
    type: "GET",
    url: "/api/quiz",
    dataType: "json",
    data:
    {
      "tenancy_id": tenancy_id,
      "querytype": "surveyquiz",
      "qset_id": QsetId_1
    },
    async: false
 });
req.done(quizQuestions);
req.fail(checkError);

console.log(quiz_questions_1);

var json1 = {
    title: title,
    showProgressBar: "bottom",
    showTimerPanel: "top",
    maxTimeToFinishPage: 10,
    maxTimeToFinish: 25,
    firstPageIsStarted: true,
    startSurveyText: "Start Quiz",
    pages: [],
    completedHtml: "<h4>You have answered correctly <b>{correctedAnswers}</b> questions from <b>{questionCount}</b>.</h4>"
 };

var quiz_question =  {
            questions: [
                {
                    type: "html",
                    html: "You are about to start a quiz!.!.!. <br/>You have 20 seconds for every page and 120 seconds for the whole survey questions.<br/>Please click on <b>'Start Quiz'</b> button when you are ready."
                }
            ]
        };




json1.pages.push(quiz_question);
console.log(quiz_question);
console.log(json1);


var questions = {};
console.log(json1);

for (index = 0; index < quiz_questions_1.length; ++index) {
    console.log(quiz_questions_1[index]);
    if (quiz_questions_1[index].answer01)
    {
     choice_1=quiz_questions_1[index].answer01;
     console.log(choice_1);
    choice_arr.push(choice_1);
    }
    if (quiz_questions_1[index].answer02)
    {
     choice_2=quiz_questions_1[index].answer02;
     console.log(choice_2);
    choice_arr.push(choice_2);
    }
    if (quiz_questions_1[index].answer03)
    {
     choice_3=quiz_questions_1[index].answer03;
     console.log(choice_3);
    choice_arr.push(choice_3);
    }
    if (quiz_questions_1[index].answer04)
    {
    choice_4=quiz_questions_1[index].answer04;
    console.log(choice_4);
    choice_arr.push(choice_4);
    }
    if (quiz_questions_1[index].answer05)
    {
    choice_5=quiz_questions_1[index].answer05;
    console.log(choice_5);
    choice_arr.push(choice_5);
    }
    if (quiz_questions_1[index].answer06)
    {
     choice_6=quiz_questions_1[index].answer06;
     console.log(choice_6);
     choice_arr.push(choice_6);
    }

    quiz_title=quiz_questions_1[index].answer;
    console.log(choice_arr);
   if (quiz_questions_1[index].corect_answer == 'answer01') {
       corect_answer=choice_1;
   }
     else if (quiz_questions_1[index].corect_answer == 'answer02') {
       corect_answer=choice_2;
   }
     else if (quiz_questions_1[index].corect_answer == 'answer03') {
       corect_answer=choice_3;
   }
     else if (quiz_questions_1[index].corect_answer == 'answer04') {
       corect_answer=choice_4;
   }
     else if (quiz_questions_1[index].corect_answer == 'answer05') {
       corect_answer=choice_5;
   }
     else if (quiz_questions_1[index].corect_answer == 'answer06') {
       corect_answer=choice_6;
   }
  else {
     corect_answer="none";
 }
  console.log(corect_answer);
  quiz_name= quiz_questions_1[index].question;
  quiz_id=quiz_questions_1[index].question_id;
quiz_question1 = {
    questions: [
      {
            type: quiz_type,
            name: quiz_id,
            title: quiz_name,
            choices: choice_arr,
            correctAnswer: corect_answer
      }
     ]
};
json1.pages.push(quiz_question1);
console.log(quiz_question1);
console.log(json1);
choice_arr = [];
}

window.survey = new Survey.Model(json1);

survey
    .onComplete
    .add(function (result) {
//        document
//            .querySelector('#surveyResult')
//            .innerHTML = "result: " + JSON.stringify(result.data);
    var score_percent = ((50/100) * 100);
    console.log(score_percent);
    var data = [];
    var tenancy_id = $.cookie('tenancy_id');
    var created_by = $.cookie('username');
    var updated_by = $.cookie('username');
    data.push({name: "updated_by", value: updated_by});
    data.push({name: "created_by", value: created_by});
    data.push({name: "tenancy_id", value: tenancy_id});
    data.push({name: "score_percent", value: score_percent});
    data.push({name: "validation_error", value: "none" });
    data.push({name: "client_email_id", value: created_by});
    data.push({name: "qset_id", value: QsetId_1});
    console.log(data);
    var req=$.ajax({
      type: "POST",
      url: "/api/result",
      data: $.param(data),
    });
    req.done();
    req.fail();
//    req.complete(resetQuestionSetForm1);
 });

$("#surveyElement").Survey({model: survey});
}

function quizQuestions(response) {
console.log(response);
quiz_questions_1 = JSON.parse(response);
console.log(quiz_questions_1);
}

function questionSetTitle(response) {
console.log(JSON.parse(response));
obj = JSON.parse(response);
$.each(obj,function(i,item){
  title=item.qset_title;
  console.log(title);
});
}

function questionSetID(response) {
console.log(JSON.parse(response));
obj = JSON.parse(response);
$.each(obj,function(i,item){
  QsetId_1=item.qset_id;
  console.log(QsetId_1);
});

}


/* ########### Token Auth block end here  #################### */
