/* 
 *  ProjectTEK - DLSU CCS 2016
 *  Authors: Shermaine Sy, Gian Carlo Roxas, Geraldine Atayan
 */


$(document).ready(function () {

    var page = document.getElementById('page').value;
    var classification = document.getElementById('classification').value;
    $.ajax({
        url: "UploadCheckerDirectory",
        type: 'POST',
        dataType: "JSON",
        data: {
            page: page,
            classification: classification
        }, success: function (data) {
            console.log(data);
            if (data === "approved") {
                $("#modal-body").empty();
                $("#modal-body").append('<p id="alerta">This file has already been uploaded and approved.</p>');
                $("#footer").append('<button id="cancelButtonA" type="button"class="btn btn-default" data-dismiss="modal">Close</button>');

                $("#showModalWarning").modal("show");
                $('#cancelButtonA').click(function () {
                    $('#showModalWarning').modal('hide');
                    $("#modal-body").empty();
                    $("#footer").empty();
                });

                $('.upadateBtn').prop('disabled', true);
                $('.deleteBtn').prop('disabled', true);
                $('#btnsubmit').prop('disabled', true);
                $('#addnew').prop('disabled', true);

            }
        }, error: function (XMLHttpRequest, textStatus, exception) {
            console.log(exception);
        }
    });
});
$(document).on("click", "#invalidDirectory", function () {
    console.log("sdf");
    var redirect = "invalid";
    var schoolName = $(this).closest("tbody").find(".nr").text();
    var classification = document.getElementById("classification").value;
    var censusYear = $(this).closest("tbody").find(".censusYear input").val();
    console.log(censusYear);
    $(this).closest("tbody").remove();
    $.ajax({
        url: "UpdateSchoolDirectory",
        type: 'POST',
        dataType: "JSON",
        data: {
            redirect: redirect,
            censusYear: censusYear,
            schoolName: schoolName,
            classification: classification
        },
        success: function (data) {
            console.log(data);
            if (data === true) {
                $("#notificationHeader").text("Success!");
                $("#modalHeader").css({background: "#00a65a"});
                $("#notificationHeader").css({color: "#FFFFFF"});
                $("#notificationBodyModal").empty();
                $("#notificationBodyModal").append("<p style='padding: 3%; text-align:center;'>Directory Deleted</p>");
                $("#notificationModalFooter").empty();
                $("#notificationModalFooter").append(' <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
                $("#notificationModal").modal("show");
            } else {
                console.log("Not Sucessfuly Deleted");
            }
        }, error: function (XMLHttpRequest, textStatus, exception) {
            console.log(XMLHttpRequest);
        }
    });
});

$(document).on("click", "#updateDirectory", function () {
    $("#UpdateModal").modal("show");
    var schoolName = $(this).closest("tbody").find(".nr").text();
    $('#schoolName').val(schoolName);

});
