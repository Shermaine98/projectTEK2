<%--
    Document   : home
    Created on : Jun 8, 2016, 10:13:59 PM
    Author     : Geraldine Atayan
--%>
<%@page import="Model.taskModelHead"%>
<%@page import="Model.taskModelUploader"%>
<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!--IMPORTING HTML IMPORTS (bootstrap + scripts)-->
<%@include file="levelOfAccess.jsp"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Project TEK | Home </title>
        <!-- Tell the browser to be responsive to screen width -->
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <!--        <link rel="stylesheet" href="AdminLTE/plugins/fullcalendar/fullcalendar.min.css">
                <link rel="stylesheet" href="AdminLTE/plugins/fullcalendar/fullcalendar.print.css" media="print">-->

        <script src="jsImported/list.min.js" type="text/javascript"></script>
        <script src="jsImported/ajaxIntegrate.js" type="text/javascript"></script>
        <style>
            a:hover{
                /*text-decoration: underline;*/
                font-weight: bolder;
            }
            td{
                vertical-align: central;
            }
            .expand {
                text-overflow: ellipsis;
                /* Required for text-overflow to do anything */
                white-space: nowrap;
                overflow: hidden;
            }
            p{
                margin-left: 12%;
            }

            .smallButtonStyle{
                height: 18px; font-size: 13px; padding-top: 0; float:left;
            }
            a{
                cursor: pointer; cursor: hand;
            }
            .green{
                background-color: #008D4C;
                color: #fff;
            }
        </style>
    </head>
    <body>
        <div class ="wrapper">
            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <section class="content">
                    <div class="row">

                        <!-- Modal -->
                          <div class="modal fade" id="result" role="dialog">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header green">
                                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                                  <h4 class="modal-title">Result</h4>
                                </div>
                                <div class="modal-body successAlert">
                                    <center>You have successfully integrated the data.</center>
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                              </div>
                            </div>
                          </div>

                        <% ArrayList<taskModelHead> arrTask = ((ArrayList<taskModelHead>) request.getAttribute("tasksHead")); %>

                        <div class="col-md-8" style="float:left;">
                            <div class="box box-solid">
                                <div class="box-header with-border">
                                    <h3 class="box-title">Pending Tasks For The Year</h3>
                                </div>
                                <!-- /.box-header -->
                                <div id="pendingList" class="box-body">
                                    <table id="taskTable" class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th width="50%">Report</th>
                                                <th width="15%"><a class="sort" data-sort="date">Due Date  <span class="fa fa-sort" style="margin-left: 5%"></span></a></th>
                                                <th><a class="sort" data-sort="status">Status <span class="fa fa-sort" style="margin-left: 5%"></span></a></th>
                                                <th style="text-align:right;">For Your Action</th>
                                            </tr>
                                        </thead>
                                        <tbody class="list">
                                            <% if (arrTask.size() != 0) { %>
                                            <% for (int i = 0; i < arrTask.size(); i++) {%>
                                            <tr>
                                                <td class="ts name"><%= arrTask.get(i).getReport()%></td>
                                                <td class="date"><%= arrTask.get(i).getsDueDate()%></td>
                                                <% if (arrTask.get(i).getStatus().equalsIgnoreCase("delayed")) {%>
                                                <td class="status"><span class="label label-danger"><%= arrTask.get(i).getStatus()%></span></td>
                                                <td style="text-align:right; padding-right: 1%"> <a href="${pageContext.request.contextPath}/ReportAccess?redirect=CreateReport"><input type="button"  class="btn btn-primary btn-sm" value="Create Report" /></a></td>

                                                <% } else if (arrTask.get(i).getStatus().equalsIgnoreCase("saved")) {%>
                                                <td class="status"><span class="label label-info"><%= arrTask.get(i).getStatus()%></span></td>
                                                <td style="text-align:right; padding-right: 1%"> <a href="${pageContext.request.contextPath}/ReportAccess?redirect=Saved&Navi=true"><input type="button"  class="btn btn-primary btn-sm" value="Go to Saved Reports" /></a></td>

                                                <% } else {%>
                                                <td class="status"><span class="label label-warning"><%= arrTask.get(i).getStatus()%></span></td>
                                                <td style="text-align:right; padding-right: 1%"> <a href="${pageContext.request.contextPath}/ReportAccess?redirect=CreateReport"><input type="button"  class="btn btn-primary btn-sm" value="Create Report" /></a></td>

                                                <% }%>
                                            </tr>
                                            <%}
                                            } else {
                                            %>
                                            <tr>
                                                <td colspan="4">All tasks have been completed</td>
                                            </tr>
                                            <% }
                                            %>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- /.box-body -->
                            </div>
                            <!-- /.box -->
                        </div>

                        <div class="col-md-4" style="float:right;">
                            <div class="box box-solid">
                                <div class="box-header with-border">
                                    <h3 class="box-title">Pending For Approval</h3>
                                </div>
                                <!-- /.box-header -->
                                <div class="box-body">
                                    <% if (user.getPosition().equals("Project Development Officer I")) {
                                            //DEMOGRAPHICS APPROVAL
                                            int aAgeGroup = (int) request.getAttribute("aDemoAgeGroup");
                                            int aMarital = (int) request.getAttribute("aDemoMarital");
                                            int aHighest = (int) request.getAttribute("aDemoHighest");%>
                                    <% if (aAgeGroup == 0 && aMarital == 0 && aHighest == 0) { %>
                                    <p>There are no reports pending for approval</p>
                                    <% } else { %>
                                    <% if (aAgeGroup >= 1) {%>
                                    <a href="${pageContext.request.contextPath}/RetrieveDataDemoServlet?redirect=approval_agegroup">
                                        <button class="btn btn-warning smallButtonStyle"><%=aAgeGroup%></button></a>
                                    <p class="expand">Household Population by Age Group and Sex</p>
                                    <% }
                                        if (aHighest >= 1) {%>
                                    <a href="${pageContext.request.contextPath}/RetrieveDataDemoServlet?redirect=approval_highestcompleted">
                                        <button class="btn btn-warning smallButtonStyle"><%=aHighest%></button></a>
                                    <p class="expand" id='ahighest' onclick="expand('ahighest')">Household Population 5 Years Old and Over by Highest Grade/Year Completed, Age Group and Sex</p>
                                    <% }
                                        if (aMarital >= 1) {%>
                                    <a href="${pageContext.request.contextPath}/RetrieveDataDemoServlet?redirect=approval_maritalstatus">
                                        <button class="btn btn-warning smallButtonStyle"><%=aMarital%></button></a>
                                    <p class="expand" id='amarital' onclick="expand('amarital')">Household Population 10 Years Old and Over by Age Group, Sex, and Marital Status</p>
                                    <% } %>
                                    <% }
                                    } else if (user.getPosition().equals("Project Development Officer III")) {

                                        //EDUCATION APPROVAL
                                        int aPublicEnrollment = (int) request.getAttribute("aEducPublicEnrollment");
                                        int aPublicDirectory = (int) request.getAttribute("aEducPublicDirectory");
                                        int aPrivateEnrollment = (int) request.getAttribute("aEducPrivateEnrollment");
                                        int aPrivateDirectory = (int) request.getAttribute("aEducPrivateDirectory");%>
                                    <% if (aPublicEnrollment == 0 && aPublicDirectory == 0 && aPrivateEnrollment == 0 && aPrivateDirectory == 0) { %>
                                    <p>There are no reports pending for approval</p>
                                    <% } else { %>
                                    <% if (aPublicEnrollment >= 1) {%>
                                    <a href="${pageContext.request.contextPath}/RetrieveDataEducationServlet?redirect=approval_publicenrollment">
                                        <button class="btn btn-warning smallButtonStyle"><%=aPublicEnrollment%></button></a>
                                    <p class="expand">Enrollment in Public Schools</p>
                                    <% }
                                        if (aPrivateEnrollment >= 1) {%>
                                    <a href="${pageContext.request.contextPath}/RetrieveDataEducationServlet?redirect=approval_privateenrollment">
                                        <button class="btn btn-warning smallButtonStyle"><%=aPrivateEnrollment%></button></a>
                                    <p class="expand">Enrollment in Private Schools</p>
                                    <% }
                                        if (aPublicDirectory >= 1) {%>
                                    <a href="${pageContext.request.contextPath}/RetrieveDataEducationServlet?redirect=approval_publicdirectory">
                                        <button class="btn btn-warning smallButtonStyle"><%=aPublicDirectory%></button></a>
                                    <p class="expand" id='directoryPublic' onclick="expand('directoryPublic');">Number of Teachers and Classrooms in Public Schools</p>
                                    <% }
                                        if (aPrivateDirectory >= 1) {%>
                                    <a href="${pageContext.request.contextPath}/RetrieveDataEducationServlet?redirect=approval_privatedirectory">
                                        <button class="btn btn-warning smallButtonStyle"><%=aPrivateDirectory%></button></a>
                                    <p class="expand" id='directoryPrivate' onclick="expand('directoryPrivate');">Number of Teachers and Classrooms in Public Schools</p>
                                    <% }
                                        }
                                    } else if (user.getPosition().equals("Project Development Officer IV")) {

                                        //HEALTH APPROVAL
                                        int aNutritionalStatus = (int) request.getAttribute("aHealthNutritionalStatus");
                                        int aHospital = (int) request.getAttribute("aHealthHospital");%>
                                    <% if (aNutritionalStatus == 0 && aHospital == 0) { %>
                                    <p>There are no reports pending for approval</p>
                                    <% } else {
                                        if (aNutritionalStatus >= 1) {%>
                                    <a href="${pageContext.request.contextPath}/RetrieveDataHealthServlet?redirect=approval_nutritional">
                                        <button class="btn btn-warning smallButtonStyle"><%=aNutritionalStatus%></button></a>
                                    <p class="expand" id='anutrition' onclick='expand("anutrition")'> Percentage Distribution of Elementary School Children in Each District in the Division of Caloocan by Nutritional Status/By Gender</p>
                                    <% }
                                        if (aHospital >= 1) {%>
                                    <a href="${pageContext.request.contextPath}/RetrieveDataHealthServlet?redirect=health_approval">
                                        <button class="btn btn-warning smallButtonStyle"><%=aHospital%></button></a><p class="expand"> List of Hospitals</p>
                                        <% }
                                                }
                                            } //END OF ELSE
                                            else {
                                                //Para walang error
                                            }%>
                                </div>
                                <!-- /.box-body -->
                            </div>
                            <!-- /.box -->
                        </div>

                        <div class="col-md-4" style="float:right;clear: right;">
                            <div class="box box-solid">
                                <div class="box-header with-border">
                                    <h3 class="box-title">Saved Reports</h3>
                                </div>
                                <!-- /.box-header -->
                                <div class="box-body">
                                    <table id="taskTable" class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th width="50%">Report</th>
                                                <th width="15%">Due Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colspan="2" style='text-align:center;'>There are currently no saved reports.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- /.box-body -->
                            </div>
                            <!-- /.box -->
                        </div>

                        <% if (user.getPosition().equals("Project Development Officer IV")) {
                                ArrayList<taskModelUploader> validated = (ArrayList<taskModelUploader>) request.getAttribute("validated");
                                ArrayList<taskModelUploader> approved = (ArrayList<taskModelUploader>) request.getAttribute("approved");
                                ArrayList<taskModelUploader> notUploaded = (ArrayList<taskModelUploader>) request.getAttribute("notUploaded");%>


                        <div id="integrateLoad" class="modal fade" role="dialog">
                            <div class="modal-dialog">
                                <!-- Modal content-->
                                <div id='loadingmessage' >
                                    <center><img src="img/spinner.gif" style='width:100px; height:100px; margin-top:40%'/></center>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="box box-solid">
                                <div id="integratetooltip" class="box-header with-border"  data-toggle="tooltip"
                                           title="All reports need to be completed in order to integrate all data" data-placement="right" >
                                    <h3 class="box-title">Uploads Summary</h3>

                                    <input class="btn btn-default btn-sm" type="button"
                                           onClick="integrate()" value="Integrate Data" id="integrate" style="float:right;" disabled />
                                </div>
                                <!-- /.box-header -->
                                <div id="status" class="box-body">
                                    <input class="search form-control" placeholder="Search Report Name" style="margin: 0 auto; width: 50%;" />
                                    <table id="taskTable" class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th width="80%">Report</th>
                                                <th width="15%"><a class="sort" data-sort="date">Due Date <span class="fa fa-sort" style="margin-left: 5%"></span> </a></th>
                                                <th style="text-align:right; margin-right: 5%;"><a class="sort" data-sort="status">Status  <span class="fa fa-sort" style="margin-left: 5%"></span></a></th>
                                            </tr>
                                        </thead>
                                        <tbody class="list">
                                            <%
                                                for (int i = 0; i < notUploaded.size(); i++) {%>
                                            <tr>
                                                <td class="name"><%= notUploaded.get(i).getTask()%></td>
                                                <td class="date"><%= notUploaded.get(i).getsDueDate()%><input type="hidden" value="<%= notUploaded.get(i).getStatus()%>" class="completed"></td>
                                                    <% if (notUploaded.get(i).getStatus().equalsIgnoreCase("delayed")) {%>
                                                <td  class="status" style="text-align:right; margin-right: 5%;"><span class="label label-danger"><%= notUploaded.get(i).getStatus()%></span></td>
                                                    <% } else {%>
                                                <td  class="status"  style="text-align:right; margin-right: 5%;"><span class="label label-warning"><%= notUploaded.get(i).getStatus()%></span></td>

                                                <% }%>
                                            </tr>
                                            <% }%>
                                            <%
                                                for (int i = 0; i < validated.size(); i++) {%>
                                            <tr>
                                                <td class="name"><%= validated.get(i).getTask()%></td>
                                                <td class="date"><%= validated.get(i).getsDueDate()%><input type="hidden" value="<%= validated.get(i).getStatus()%>" class="completed"></td>
                                                    <% if (validated.get(i).getStatus().equalsIgnoreCase("For Approval")) {%>
                                                <td class="status" style="text-align:right; margin-right: 5%;"><span class="label label-default"><%= validated.get(i).getStatus()%></span></td>
                                                    <% } else {%>
                                                <td class="status" style="text-align:right; margin-right: 5%;"><span class="label label-primary status"><%= validated.get(i).getStatus()%></span></td>

                                                <% }%>
                                            </tr>
                                            <% }%>
                                            <%
                                                for (int i = 0; i < approved.size(); i++) {%>
                                            <tr>
                                                <td class="name"><%= approved.get(i).getTask()%></td>
                                                <td class="date"><%= approved.get(i).getsDueDate()%><input type="hidden" value="<%= approved.get(i).getStatus()%>" class="completed"></td>
                                                    <% if (approved.get(i).getStatus().equalsIgnoreCase("rejected")) {%>
                                                <td class="status" style="text-align:right; margin-right: 5%;"><span class="label label-danger"><%= approved.get(i).getStatus()%></span></td>
                                                    <% } else {%>
                                                <td class="status" style="text-align:right; margin-right: 5%;"><span class="label label-success">Completed</span></td>

                                                <% }%>
                                            </tr>
                                            <% }%>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- /.box-body -->
                            </div>
                            <!-- /.box -->
                        </div>
                        <% }%>

                    </div>
                </section>
            </div>
        </div>
        <!-- /.content-wrapper -->

        <!-- ./wrapper -->
        <script>
            $(document).ready(function () {
                var i = 1;
                $(".completed").each(function () {

                    var x = $(this).val();
                    if (x === "Approved") {
                        i++;
                    }

                    if (i === 9) {
                        $('#integratetooltip *[title]').tooltip('disable');
                        $('#integrate').removeClass('btn-default');
                        $('#integrate').addClass('btn-primary');
                        $('#integrate').prop('disabled', false);
                    }
                });


                var summary = {
                    valueNames: ['name', 'status', 'date']
                };

                var summaryList = new List('status', summary);

                var pending = {
                    valueNames: ['name', 'status', 'date']
                };
                var pendngList = new List('pendingList', pending);
            });
            function expand(x) {
                document.getElementById(x).classList.remove("expand");
            }
        </script>
        <script src="AdminLTE/plugins/fullcalendar/fullcalendar.min.js"></script>
    </body>
</html>