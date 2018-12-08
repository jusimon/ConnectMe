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

if (($.cookie('role') == 'admin') || ($.cookie('role') == 'recruiter') || ($.cookie('role') == 'client'))
{
populateResultData();
}
else
{
$('body').hide();
}

});

/* ################################################################################################################ */

function populateResultData()
{
 var tenancy_id = $.cookie('tenancy_id');
 var created_by = $.cookie('username');
 var querytype = $.cookie('role');
 console.log('tenancy_id');
 console.log('username');

 var req = $.ajax({
    type: "GET",
    url: "/api/result",
    dataType: "json",
    data:
    {
      "tenancy_id": tenancy_id,
      "created_by": created_by,
      "querytype": querytype
    }
 });
 req.done(buildResultTable);
 req.fail(checkError);
}

function buildResultTable(response)
{
  console.log(response);
  obj = JSON.parse(response);
  var rowdata;
  console.log(obj);

var resultarr= [];

obj.forEach(function(Object){
    resultarr.push([Object.qset_title,Object.client_email_id,Object.validation_error,Object.score_percent,Object.created_by]);
});

console.log(resultarr);

resulttable1= $('#resulttable1').DataTable( {
        destroy: true,
        data: resultarr,
        columns: [
            { title: "Question Set Name" },
            { title: "Email Id(Appeared in the tets)" },
            { title: "Validation Error" },
            { title: "Score Percent" },
            { title: "Created By" }
          ]
    });

}

/* ##################### Code for Question Set and Quiz generation ends here ############### */
