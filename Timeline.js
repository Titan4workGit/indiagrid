waitingDialog.show();
var Ownurl = "";
var response = response || [];
var Html_Design = '';
var employeePicURL = "";
var G_PopUpBackImage = '';
var G_PopUpBackImageDisplay = '';
var ItemID = '';
var G_ItemId = '';
var tempStore = [];
var LoginUserImage = '';
var CommentUserImage = '';
var LoginUserID = '';
var G_ID_FOR_ReadComment = '';
var G_CommentID = '';
var LikeVal = '';
var setSeMorebtn = false;
var LikeID = '';
var G_Exp_BackImage = '';
var G_Exp_Display = '';
var companyId=titanForWork.getQueryStringParameter("ComID");	
var deparmentId=titanForWork.getQueryStringParameter("DeptID");
var Corporate=titanForWork.getQueryStringParameter("Corporate");


$(window).load(function () {
    //$("#F_All").css('background-color', HeaderTextColor).css('color', MediatextColor);
    $("#F_All").addClass('homepageCommThem');
    

});
$(document).ready(function () {

    $("#SaveBTN").hide()
    Executess();
    /* Show Likes*/
    $('#my_custom_popup_like').hover(function () {
        $("#AuthorList").css("display", "block");
    }, function () {
        $("#AuthorList").css("display", "none");
    });
    
    // addNewIsFlagUp
    var LinkAtaGlance = _spPageContextInfo.webServerRelativeUrl + "/Pages/ViewAnnouncements.aspx?WebAppId=" + Logged_CompanyId + "&Type="+window.btoa('At a Glance')+"&sourcelocation=" + _spPageContextInfo.webAbsoluteUrl;
    $('#ViewNews').attr('href',LinkAtaGlance); 
    var addNewIsFlagUp = _spPageContextInfo.webServerRelativeUrl + "/Pages/Announcements.aspx?Mode=Add&WebAppId=" + Logged_CompanyId + "&Type=At a Glance&sourcelocation=" + _spPageContextInfo.webAbsoluteUrl;
    $('#addnews').attr('href',addNewIsFlagUp );
    
    
    /*Menu Links*/
    var Menu_announcement_link = _spPageContextInfo.webServerRelativeUrl + "/Pages/Announcements.aspx?Mode=Add&WebAppId=" + Logged_CompanyId + "&Type=Announcement&sourcelocation=" + _spPageContextInfo.webAbsoluteUrl;
    $('#Menu_announcement').attr('href', Menu_announcement_link);

    var Menu_alert_link = _spPageContextInfo.webServerRelativeUrl + "/Pages/Announcements.aspx?Mode=Add&WebAppId=" + Logged_CompanyId + "&Type=Alert&sourcelocation=" + _spPageContextInfo.webAbsoluteUrl;
    $('#Menu_Alert').attr('href', Menu_alert_link);

    var Menu_welcome_link = _spPageContextInfo.webServerRelativeUrl + "/Pages/EmployeeDetails.aspx?WebAppId=" + Logged_CompanyId + "&mode=add&department=&employeedIddetails=&sourcelocation=" + _spPageContextInfo.webAbsoluteUrl;
    $('#Menu_welcome').attr('href', Menu_welcome_link);

    var Menu_recognition_link = _spPageContextInfo.webServerRelativeUrl + "/Pages/RecognitionEntry.aspx?WebAppId=" + Logged_CompanyId + "&Mode=" + window.btoa('New') + "&sourcelocation=" + _spPageContextInfo.webAbsoluteUrl;
    $('#Menu_recognition').attr('href', Menu_recognition_link);

    var Menu_general_link = _spPageContextInfo.webServerRelativeUrl + "/Pages/ExperienceEntry.aspx?WebAppId=" + Logged_CompanyId + "&Mode=" + window.btoa('New') + "&sourcelocation=" + _spPageContextInfo.webAbsoluteUrl;
    $('#Menu_general').attr('href', Menu_general_link);


    $('.timeline-filter div div div').on('click', function () {
        $(this).siblings().find("a").removeAttr("style");
        $('.timeline-filter .owl-item a').removeClass('homepageCommThem');
        $(this).find("a").addClass('homepageCommThem');
        //$(this).find("a").css('background-color', HeaderTextColor, 'important');
        //$(this).find("a").css('color', MediatextColor, 'important');
    });

    var today = new Date();
    var CurrentDate = today.toISOString().substring(0, 10);

    $("#F_All").click(function () {
        var today = new Date();
        var CurrentDate = today.toISOString().substring(0, 10);                      //and (IsFlagUp eq false or IsFlagUp eq null)
        if(deparmentId!=null){
              var filterQuery="(ApprovalStatus eq 'Approved' and WebPartName ne 'Banners'  and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "' or (WebPartName eq 'Welcome' and Departments/ID eq '" + Logged_DepartmentId + "')";
		}
		else if(Corporate!=null){
             var filterQuery="(ApprovalStatus eq 'Approved' and WebPartName ne 'Banners'  and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and Audience eq 'Corporate'";
		}
		else if(companyId!=null){
             var filterQuery= "(ApprovalStatus eq 'Approved' and WebPartName ne 'Banners'  and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "'";
		}
		else{
	       var filterQuery= "(ApprovalStatus eq 'Approved' and WebPartName ne 'Banners'  and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "') or (Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "') or (Audience eq 'Location' and Company/ID eq '" + Logged_CompanyId + "' and OfficeLocations/ID eq '" + Logged_Location + "') or (Audience eq 'Selective' and Company/ID eq '" + Logged_CompanyId + "' and TeamMembers/EMail eq '" + _spPageContextInfo.userEmail + "'))";
		}
        
        var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,TeamMembers/ID,TeamMembers/Title,TeamMembers/EMail,category/CatogeryName,Departments/Title,Company/Title&$filter="+filterQuery+"&$expand=TeamMembers,AttachmentFiles,Departments,Company,category&$orderby=Publish_Date desc,Modified  desc&$top=10";
        //var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,TeamMembers/ID,TeamMembers/Title,TeamMembers/EMail,category/CatogeryName,Departments/Title,Company/Title&$filter=(ApprovalStatus eq 'Approved' and WebPartName ne 'Banners' and (IsFlagUp eq false or IsFlagUp eq null) and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "') or (Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "') or (Audience eq 'Location' and Company/ID eq '" + Logged_CompanyId + "' and OfficeLocations/ID eq '" + Logged_Location + "') or (Audience eq 'Selective' and Company/ID eq '" + Logged_CompanyId + "' and TeamMembers/EMail eq '" + _spPageContextInfo.userEmail + "')) &$expand=TeamMembers,AttachmentFiles,Departments,Company,category&$orderby=Publish_Date desc,Modified  desc&$top=10";
        ExecuteFilter(Ownurl);
        /*var localStorageLanguage = localStorage.getItem("TitanTheme_" + _spPageContextInfo.siteId + "_" + Logged_CompanyId);
        var localStorageData = JSON.parse(localStorageLanguage);
        ThemeCommonFunction(localStorageData.data);*/
    });

    $("#F_Announcement").click(function () {
        if(deparmentId!=null){
              var filterQuerys="(ApprovalStatus eq 'Approved' and WebPartName eq 'Announcement' and (IsFlagUp eq false or IsFlagUp eq null) and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "'";
		}
		else if(Corporate!=null){
             var filterQuerys="(ApprovalStatus eq 'Approved' and WebPartName eq 'Announcement' and (IsFlagUp eq false or IsFlagUp eq null) and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and Audience eq 'Corporate'";
		}
		else if(companyId!=null){
             var filterQuerys= "(ApprovalStatus eq 'Approved' and WebPartName eq 'Announcement' and (IsFlagUp eq false or IsFlagUp eq null) and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "'";
		}
		else{
	       var filterQuerys= "(ApprovalStatus eq 'Approved' and WebPartName eq 'Announcement' and (IsFlagUp eq false or IsFlagUp eq null) and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "') or (Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "') or (Audience eq 'Location' and Company/ID eq '" + Logged_CompanyId + "' and OfficeLocations/ID eq '" + Logged_Location + "') or (Audience eq 'Selective' and Company/ID eq '" + Logged_CompanyId + "' and TeamMembers/EMail eq '" + _spPageContextInfo.userEmail + "'))";
		}
        var Filterquery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,category/CatogeryName,TeamMembers/Title,TeamMembers/EMail,Departments/Title,Company/Title&$filter="+filterQuerys+"&$expand=AttachmentFiles,Departments,Company,category,TeamMembers&$orderby=Publish_Date desc,Modified desc&$top=10";
      
        //var Filterquery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,category/CatogeryName,TeamMembers/Title,TeamMembers/EMail,Departments/Title,Company/Title&$filter=(WebPartName eq 'Announcement' and ApprovalStatus eq 'Approved' and (IsFlagUp eq false or IsFlagUp eq null) and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "') or (Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "') or (Audience eq 'Location' and Company/ID eq '" + Logged_CompanyId + "' and OfficeLocations/ID eq '" + Logged_Location + "') or (Audience eq 'Selective' and Company/ID eq '" + Logged_CompanyId + "' and TeamMembers/EMail eq '" + _spPageContextInfo.userEmail + "')) &$expand=AttachmentFiles,Departments,Company,category,TeamMembers&$orderby=Publish_Date desc,Modified desc&$top=10";
        ExecuteFilter(Filterquery);
        /*var localStorageLanguage = localStorage.getItem("TitanTheme_" + _spPageContextInfo.siteId + "_" + Logged_CompanyId);
        var localStorageData = JSON.parse(localStorageLanguage);
        ThemeCommonFunction(localStorageData.data);*/
    });

    $("#F_General").click(function () {
        if(deparmentId!=null){
              var filterQuerys="(ApprovalStatus eq 'Approved' and WebPartName eq 'General' and (IsFlagUp eq false or IsFlagUp eq null) and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and Audience eq 'Department' and Departments/ID eq '" + Logged_DepartmentId + "'";
		}
		else if(Corporate!=null){
             var filterQuerys="(ApprovalStatus eq 'Approved' and WebPartName eq 'General' and (IsFlagUp eq false or IsFlagUp eq null) and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and Audience eq 'Corporate'";
		}
		else if(companyId!=null){
             var filterQuerys= "(ApprovalStatus eq 'Approved' and WebPartName eq 'General' and (IsFlagUp eq false or IsFlagUp eq null) and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "'";
		}
		else{
	       var filterQuerys= "(ApprovalStatus eq 'Approved' and WebPartName eq 'General' and (IsFlagUp eq false or IsFlagUp eq null) and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "') or (Audience eq 'Department' and Departments/ID eq '" + Logged_DepartmentId + "') or (Audience eq 'Location' and Company/ID eq '" + Logged_CompanyId + "' and OfficeLocations/ID eq '" + Logged_Location + "') or (Audience eq 'Selective' and Company/ID eq '" + Logged_CompanyId + "' and TeamMembers/EMail eq '" + _spPageContextInfo.userEmail + "'))";
		}
        var Filterquery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,category/CatogeryName,TeamMembers/Title,TeamMembers/EMail,Departments/Title,Company/Title&$filter="+filterQuerys+"&$expand=AttachmentFiles,Departments,Company,category,TeamMembers&$orderby=Publish_Date desc,Modified desc&$top=10";
      
        //var Filterquery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Announcements')/items?$select=*,TeamMembers/Title,TeamMembers/EMail,AttachmentFiles,ID,ApprovalStatus,Departments/Title,Company/Title,category/CatogeryName,EmployeeName,Department,Title,Designation,Publish_Date,Expires&$top=10&$filter=(ApprovalStatus eq 'Approved' and WebPartName eq 'General' and (IsFlagUp eq false or IsFlagUp eq null) and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "') or (Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "')) &$expand=TeamMembers,AttachmentFiles,Departments,Company,category/CatogeryName&$orderby=Publish_Date desc,Modified desc";
        ExecuteFilter(Filterquery);
        /*var localStorageLanguage = localStorage.getItem("TitanTheme_" + _spPageContextInfo.siteId + "_" + Logged_CompanyId);
        var localStorageData = JSON.parse(localStorageLanguage);
        ThemeCommonFunction(localStorageData.data);*/
    });

    $("#F_Recognition").click(function () {
        var d = new Date();
        var CurrentYear = d.getFullYear();
        if(companyId!=null){
            var filterQuerys="(WebPartName eq 'Recognition' and ApprovalStatus eq 'Approved'  and (Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "')) and Year eq '" + CurrentYear + "'"
        }
        else if(Corporate!=null)
        {
            var filterQuerys="(WebPartName eq 'Recognition' and ApprovalStatus eq 'Approved'  and Audience eq 'Corporate' and Year eq '" + CurrentYear + "'"
        }
        else
        {
          var filterQuerys="(WebPartName eq 'Recognition' and ApprovalStatus eq 'Approved'  and (Audience eq 'Corporate' or Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "')) and Year eq '" + CurrentYear + "' ";
        
        }
        var Filterquery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Announcements')/items?$select=*,AttachmentFiles,TeamMembers/ID,TeamMembers/Title,TeamMembers/EMail,category/CatogeryName&$expand=AttachmentFiles,category,TeamMembers&$Top=10&$OrderBy=Publish_Date desc,Modified desc&$filter="+filterQuerys;
        ExecuteFilter(Filterquery);
        /*var localStorageLanguage = localStorage.getItem("TitanTheme_" + _spPageContextInfo.siteId + "_" + Logged_CompanyId);
        var localStorageData = JSON.parse(localStorageLanguage);
        ThemeCommonFunction(localStorageData.data);*/
    });

    $("#F_Welcome").click(function () {
        if(companyId!=null){
            var filterQuerys="Audience eq 'Corporate'";
        }
        else if(Corporate!=null)
        {
            var filterQuerys="Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "'"
        }
        else if(deparmentId!=null){
           filterQuerys="Departments/ID eq '" + Logged_DepartmentId + "'";
        }
        else
        {
          var filterQuerys="(Audience eq 'Corporate' or Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "')";
        
        }
        
        var Filterquery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Announcements')/items?$select=*,AttachmentFiles,category/CatogeryName,TeamMembers/Title,TeamMembers/EMail&$expand=AttachmentFiles,category,TeamMembers&$OrderBy=Publish_Date desc,Modified desc&$top=10&$filter=(WebPartName eq 'Welcome' and ApprovalStatus eq 'Approved' and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "' and "+filterQuerys+")";
        //var Filterquery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Announcements')/items?$select=*,AttachmentFiles,category/CatogeryName&$expand=AttachmentFiles,category&$OrderBy=Publish_Date desc,Modified desc&$top=10&$filter=(WebPartName eq 'Welcome' and ApprovalStatus eq 'Approved' and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "' and (Audience eq 'Corporate' or Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "'))";
        ExecuteFilter(Filterquery);
        /*var localStorageLanguage = localStorage.getItem("TitanTheme_" + _spPageContextInfo.siteId + "_" + Logged_CompanyId);
        var localStorageData = JSON.parse(localStorageLanguage);
        ThemeCommonFunction(localStorageData.data);*/

    });

    $("#F_Alert").click(function () {
        if(deparmentId!=null){
              var filterQuerys="(ApprovalStatus eq 'Approved' and WebPartName eq 'Alert' and (IsFlagUp eq false or IsFlagUp eq null) and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "'";
		}
		else if(Corporate!=null){
             var filterQuerys="(ApprovalStatus eq 'Approved' and WebPartName eq 'Alert' and (IsFlagUp eq false or IsFlagUp eq null) and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and Audience eq 'Corporate'";
		}
		else if(companyId!=null){
             var filterQuerys= "(ApprovalStatus eq 'Approved' and WebPartName eq 'Alert' and (IsFlagUp eq false or IsFlagUp eq null) and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "'";
		}
		else{
	       var filterQuerys= "(ApprovalStatus eq 'Approved' and WebPartName eq 'Alert' and (IsFlagUp eq false or IsFlagUp eq null) and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "') or (Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "') or (Audience eq 'Location' and Company/ID eq '" + Logged_CompanyId + "' and OfficeLocations/ID eq '" + Logged_Location + "') or (Audience eq 'Selective' and Company/ID eq '" + Logged_CompanyId + "' and TeamMembers/EMail eq '" + _spPageContextInfo.userEmail + "'))";
		}
        var Filterquery= _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,category/CatogeryName,TeamMembers/Title,TeamMembers/EMail,Departments/Title,Company/Title&$filter="+filterQuerys+"&$expand=AttachmentFiles,Departments,Company,category,TeamMembers&$orderby=Publish_Date desc,Modified desc&$top=10";
      

        //var Filterquery = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,category/CatogeryName,Departments/Title,Company/Title,TeamMembers/Title,TeamMembers/EMail&$filter=(WebPartName eq 'Alert' and ApprovalStatus eq 'Approved' and (IsFlagUp eq false or IsFlagUp eq null) and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "') or (Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "') or (Audience eq 'Location' and Company/ID eq '" + Logged_CompanyId + "' and OfficeLocations/ID eq '" + Logged_Location + "') or (Audience eq 'Selective' and Company/ID eq '" + Logged_CompanyId + "' and TeamMembers/EMail eq '" + _spPageContextInfo.userEmail + "')) &$expand=AttachmentFiles,Departments,Company,category,TeamMembers&$orderby=Publish_Date desc,Modified desc&$top=10";
        ExecuteFilter(Filterquery);
        /*var localStorageLanguage = localStorage.getItem("TitanTheme_" + _spPageContextInfo.siteId + "_" + Logged_CompanyId);
        var localStorageData = JSON.parse(localStorageLanguage);
        ThemeCommonFunction(localStorageData.data);*/
    });

    getFlagData();
    if(setSeMorebtn==true)
    {
        setSeMorebtn();
    }
    
});

function Executess() {
    var today = new Date();
    var CurrentDate = today.toISOString().substring(0, 10);    
	if(companyId!=null){
        var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,TeamMembers/Title,TeamMembers/EMail,TeamMembers/ID,category/CatogeryName,Departments/Title,Company/Title&$filter=(ApprovalStatus eq 'Approved' and (WebPartName ne 'Banners' and  WebPartName ne 'At a Glance' and WebPartName ne 'Announcement' and WebPartName ne 'Recognition')   and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "'&$expand=TeamMembers,AttachmentFiles,Departments,Company,category&$orderby=Publish_Date desc,Modified desc&$top=10";
	}
	else if(Corporate!=null){
        var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,TeamMembers/Title,TeamMembers/EMail,TeamMembers/ID,category/CatogeryName,Departments/Title,Company/Title&$filter=(ApprovalStatus eq 'Approved' and (WebPartName ne 'Banners' and  WebPartName ne 'At a Glance' and WebPartName ne 'Announcement' and WebPartName ne 'Recognition')  and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and Audience eq 'Corporate'&$expand=TeamMembers,AttachmentFiles,Departments,Company,category&$orderby=Publish_Date desc,Modified desc&$top=10";
	}
	else if(deparmentId!=null){
        var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,TeamMembers/Title,TeamMembers/EMail,TeamMembers/ID,category/CatogeryName,Departments/Title,Company/Title&$filter=(ApprovalStatus eq 'Approved' and (WebPartName ne 'Banners' and  WebPartName ne 'At a Glance' and WebPartName ne 'Announcement' and WebPartName ne 'Recognition') and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "'&$expand=TeamMembers,AttachmentFiles,Departments,Company,category&$orderby=Publish_Date desc,Modified desc&$top=10";
	}
	else{
        var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,TeamMembers/Title,TeamMembers/EMail,TeamMembers/ID,category/CatogeryName,Departments/Title,Company/Title&$filter=(ApprovalStatus eq 'Approved' and (WebPartName ne 'Banners' and  WebPartName ne 'At a Glance' and WebPartName ne 'Announcement' and WebPartName ne 'Recognition') and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "') or (Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "') or (Audience eq 'Location' and Company/ID eq '" + Logged_CompanyId + "' and OfficeLocations/ID eq '" + Logged_Location + "') or (Audience eq 'Selective' and Company/ID eq '" + Logged_CompanyId + "' and TeamMembers/EMail eq '" + _spPageContextInfo.userEmail + "')) &$expand=TeamMembers,AttachmentFiles,Departments,Company,category&$orderby=Publish_Date desc,Modified desc&$top=10";
	}

    
    
    //var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,TeamMembers/Title,TeamMembers/EMail,TeamMembers/ID,category/CatogeryName,Departments/Title,Company/Title&$filter=(ApprovalStatus eq 'Approved' and WebPartName ne 'Banners' and (IsFlagUp eq false or IsFlagUp eq null) and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "') or (Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "') or (Audience eq 'Location' and Company/ID eq '" + Logged_CompanyId + "' and OfficeLocations/ID eq '" + Logged_Location + "') or (Audience eq 'Selective' and Company/ID eq '" + Logged_CompanyId + "' and TeamMembers/EMail eq '" + _spPageContextInfo.userEmail + "')) &$expand=TeamMembers,AttachmentFiles,Departments,Company,category&$orderby=Publish_Date desc,Modified desc&$top=10";
    ExecuteFilter(Ownurl);
}

function add3Dots(string, limit) {
    var dots = " ...";
    if (string.length > limit) {
        string = string.substring(0, limit) + dots;  // you can also use substr instead of substring
    }
    return string;
}

function formatDate(d) {
    var date = new Date(d);
    if (isNaN(date.getTime())) { return d; }
    else {
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        day = date.getDate();
        if (day < 10) { day = "0" + day; }
        return day + " " + month[date.getMonth()] + " " + date.getFullYear();
    }
}

function CustomformatDate(d) {
    var date = new Date(d);
    if (isNaN(date.getTime())) { return d; }
    else {
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        day = date.getDate();
        if (day < 10) { day = "0" + day; }
        return day + " " + month[date.getMonth()];
    }
}

function removetag(HTMLWithTags) {
    var txtHTML = HTMLWithTags;
    var t1 = stripHtml(txtHTML);
    return t1;
}

function stripHtml(html) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

function ExecuteFilter(_query) {
    response = [];
    Ownurl = _query;
    ReadTimeLine();
}

function ReadTimeLine() {
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            response = response.concat(data.d.results);
            $(".TimelineDesign").html('');
            $(".TimelineDesign").empty();
            Html_Design = '';
            if (response.length > 0) {
                var x = 0;
                for (x; x < response.length; x++) {
                    var _itemID = response[x].ID;
                    var _Type = response[x].WebPartName;
                    if(_Type=='Recognition'){
                      var _recoginationDate=response[x].Month.slice(0,3)+'-'+response[x].Year;
                    }
                    /*else
                    {
                        var _recoginationDate=response[x].Month+'-'+response[x].Year;
                    }*/
                    var _Created = formatDate(response[x].Created);
                    var _Publishdate = formatDate(response[x].Publish_Date);
                    if (_Type == "General") {
                        if(response[x].CoverImage==null)
                        {
                            if (response[x].AttachmentFiles.results.length > 0) {
                            var CoverImage = '';
                            for (var k = 0; k < response[x].AttachmentFiles.results.length; k++) {
                                var Filename = response[x].AttachmentFiles.results[k].FileName;
                                var n = Filename.startsWith("CoverImage")
                                if (n == true) {
                                    CoverImage = response[x].AttachmentFiles.results[k].ServerRelativeUrl;
                                    break;
                                }
                            }
                            if (CoverImage == "") {
                                CoverImage = _spPageContextInfo.webAbsoluteUrl + "/ImageGallery/DefaultExperience.png";
                            }
                        }
                        else {
                            CoverImage = _spPageContextInfo.webAbsoluteUrl + "/ImageGallery/DefaultExperience.png";
                        }
                        }
                        else
                        {
                            CoverImage = response[x].CoverImage;
                        }
                        G_Exp_BackImage = CoverImage;
                    }
                    var DOJ=formatDate(response[x].Publish_Date);
                    if(response[x].WebPartName=="Welcome"){
                         var DOJ =response[x].Description.split('DOJ&#58; ')[1].slice(0,11);
                    }
                    var _EmpID = response[x].EmployeeID;
                    if (response[x].category.CatogeryName != undefined) { var _Category = response[x].category.CatogeryName; }

                    if (response[x].Title != null) {
                        if (response[x].Title.length > 52) {
                            var _Title_text = add3Dots(response[x].Title, 52);
                        }
                        else {
                            var _Title_text = response[x].Title;
                        }
                    }//.slice(0,52);}
                    if (response[x].Description != null) {
                        var TextDescription = removetag(response[x].Description)
                        if (TextDescription.length > 210) {
                            var _Description = add3Dots(TextDescription, 210);
                        }
                        else {
                            var _Description = TextDescription;
                        }
                    }
                    //var _Modified = formatDate(response[x].Modified);
                    var PublishDate = formatDate(response[x].Publish_Date);
                    var Dept_NameforAlert_Announcement = '';
                    if (response[x].Audience == "Department") {
                        var Dept_name = [];
                        if (response[x].Departments.results.length > 0) {
                            for (var k = 0; k < response[x].Departments.results.length; k++) {
                                Dept_name.push(response[x].Departments.results[k].Title);
                            }
                            Dept_NameforAlert_Announcement = " | " + Dept_name;
                        }
                    }

                    else { Dept_NameforAlert_Announcement = ""; }
                    if (response[x].WebPartName == "General") {
                        if (response[x].UserType == "Internal Users") {
                            if (response[x].TeamMembersId != null) {
                                var _EmployeeName = response[x].TeamMembers.results[0].Title;
                            }
                        }
                        else {
                            if (response[x].EmployeeName != null) { var _EmployeeName = response[x].EmployeeName; }
                        }

                    }
                    else {
                        if (response[x].EmployeeName != null) { var _EmployeeName = response[x].EmployeeName; }
                    }

                    if (response[x].Designation != null && response[x].Designation != "") { var _Designation = response[x].Designation; } else { _Designation = ""; }
                    if (response[x].Department != null && response[x].Department != "") { var _Department = response[x].Department; } else { _Department = ""; $("#pipesymbol").css("display", "none"); }//$("#id").css("display", "none");
                    if (response[x].OfficeLocation != null && response[x].OfficeLocation != "") { var _OfficeLocation = response[x].OfficeLocation; } else { _OfficeLocation = ""; $("#pipesymbol").css("display", "none"); }
                    if (response[x].UserType == "Employee" || response[x].UserType == "Internal Users") {
                        if (response[x].EmployeeID != null) {
                        	if(response[x].TeamMembers.results != null && response[x].TeamMembers.results != "null") {
                            	employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(response[x].TeamMembers.results[0].EMail);
                        	}
                        	else if(response[x].Email != null && response[x].Email != "null") {
                            	employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(response[x].Email);
                            }
                            else {
                            	GetEmployeeImg(response[x].EmployeeID, emptype = "Employee");
                            }
                        }
                    }
                    else if (response[x].UserType == "Others" || response[x].UserType == "External Users") {
                        if (response[x].WebLinks != null) {
                            employeePicURL = response[x].WebLinks.Description;
                        }
                        else if (response[x].AttachmentFiles.results.length > 0) {
                            employeePicURL = response[x].AttachmentFiles.results[0].ServerRelativeUrl;
                        }
                    }
                    else if (response[x].UserType == "Team") {
                        if (response[x].WebLinks != null) {
                            employeePicURL = response[x].WebLinks.Description;
                        }
                        else if (response[x].AttachmentFiles.results.length > 0) {
                            employeePicURL = response[x].AttachmentFiles.results[0].ServerRelativeUrl;
                        }
                        _Department = "";
                        _Designation = "";
                    }
                    else if (response[x].UserType == "Department") { GetFixedImagesTimeline(filename = "DEPARTMENT"); _Department = ""; _Designation = ""; }

                    if (_Type == "Recognition") {
                        employeePicURL='';
                        if (response[x].ImageUrl!=null) {
                            employeePicURL = response[x].ImageUrl;
                        }
                        else {
                            if (response[x].UserType == "Employee") {
                                if (response[x].AttachmentFiles.results.length > 0) {
                                    employeePicURL = response[x].AttachmentFiles.results[0].ServerRelativeUrl;
                                }
                                else
                                {
                                    employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(response[x].TeamMembers.results[0].EMail);
                                }
                            }
                            else {
                                if (response[x].AttachmentFiles.results.length > 0) {
                                    employeePicURL = response[x].AttachmentFiles.results[0].ServerRelativeUrl;
                                }
                            }
                        }
                    }
                    if(_Designation==null)
                    {
                      _Designation='';
                    }

                    GenerateHtml(_itemID, _Type, _Title_text, _Description, PublishDate, _EmployeeName, _Designation, _Department, _OfficeLocation, employeePicURL, _Category, Dept_NameforAlert_Announcement, _EmpID, G_Exp_BackImage, _Created, DOJ, G_Exp_Display, _Publishdate,_recoginationDate);
                }
                $(".TimelineDesign").append(Html_Design);

                if (MediatextColor != null && HeaderTextColor != null) {
                    $('.panel-heading-bg-txt-clr').each(function () {                 //For Theame
                        this.style.setProperty('color', MediatextColor, 'important');
                    });

                    $('#DeltaPlaceHolderMain .panel-heading-bg-txt-clr').each(function () {    // For Theame
                        this.style.setProperty('background', HeaderTextColor, 'important');
                    });
                }
            }
            

            if (data.d.__next) {
                Ownurl = data.d.__next;
                $("#seemorebtn").css("display", "block");
                seeMorebtn =true;
            }
            else {
                $("#seemorebtn").css("display", "none");
                seeMorebtn = false;
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function GenerateHtml(_itemID, _Type, _Title_text, _Description, PublishDate, _EmployeeName, _Designation, _Department, _OfficeLocation, employeePicURL, _Category, Dept_NameforAlert_Announcement, _EmpID, G_Exp_BackImage, _Created, DOJ, G_Exp_Display, _Publishdate,_recoginationDate) {
    if(employeePicURL=='')    
    {
         employeePicURL='../SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg'
    }
    if (_Type == "Announcement") {        

            var LinkAnnouncement_Alert = _spPageContextInfo.webServerRelativeUrl + "/Pages/ViewAnnouncements.aspx?WebAppId=" + Logged_CompanyId + "&Type="+window.btoa('Announcement')+"&sourcelocation=" + _spPageContextInfo.webAbsoluteUrl;
            
          
          
           Html_Design+='<div class="col-md-12 pl0 pr0">'
		   Html_Design+='<div class="panel panel-default panel-timeline panel-mb20 panel-b-r-10">'
		   Html_Design+='<div class="panel-body panel-body-announcement-card">'
		   Html_Design+='<div><div class="announcement-card-content pr10">'
		   Html_Design+='<div class="announcement-left-section">'
		   Html_Design+='<img src="../SiteAssets/DevelopersCode/New_DefualtHome/images/announcement-timeline.png" width="25" height="22" alt="" /></div>'
		   Html_Design+='<div class="announcement-right-section pl10">'
		   Html_Design+='<h3> <a href="#" class="ellipsis-3" data-toggle="modal" data-target="#Announcement_Alert" onclick="GetdatainModel(' + _itemID + ');">'+ _Title_text+'</a></h3>'
		   Html_Design+='<div class="news-card-data-panel2 ellipsis-3">'+ _Description +'</div>'
		   Html_Design+='<div class="announcement-card-footer">'
		   Html_Design+='<a href="'+LinkAnnouncement_Alert+'" id="Btn_Announcement"><i class="fa fa-chevron-right"></i></a>'
		   Html_Design+='<span class="pull-right">'+ PublishDate +'</span>'		   
		   Html_Design+='</div></div></div></div></div></div></div>';        
    
    
    
        /*Html_Design = Html_Design + "<div class='col-md-12 pl0 pr5'>" +
      		"<div class='panel panel-default panel-mb10'>" +
        		"<div class='panel-heading panel-heading-announcements  '><span class='announcement-head-text panel-heading-bg-txt-clr'>Announcement</span></div>" +
            		"<div class='panel-body panel-body-announcements'>" +
          				"<p class='announcement-title event-text-head-new'>" + _Title_text + "</p>" +
          				"<p>" + _Description + "</p>" +
						"<div class='col-sm-12 col-xs-12 pl0 pr0 pb5'>" +
							"<a href='#' class='announcements-button' data-toggle='modal' data-target='#Announcement_Alert' onclick='GetdatainModel(" + _itemID + ");'>Details</a>" +
						"</div>" +
          				"<ul class='list-inline list-unstyled'>" +
            				"<li class='pull-right  date-time-card'><span>" + PublishDate + "</span></li>" +
            				"<li><a href='#' class='Btn_Announcement  my_view_arrow_w' id='Btn_Announcement'><i class='fa fa-chevron-right'></i></a></li>" +
          				"</ul>" +
        			"</div>" +
      			"</div>" +
    		"</div>";*/
    }

    else if (_Type == "Alert") {
           var LinkAlert = _spPageContextInfo.webServerRelativeUrl + "/Pages/ViewAnnouncements.aspx?WebAppId=" + Logged_CompanyId + "&Type="+window.btoa('Alert')+"&sourcelocation=" + _spPageContextInfo.webAbsoluteUrl;

           Html_Design+='<div class="col-md-12 pl0 pr0">'
		   Html_Design+='<div class="panel panel-default panel-timeline panel-mb20 panel-b-r-10">'
		   Html_Design+='<div class="panel-body panel-body-alert-card">'
		   Html_Design+='<div><div class="alert-card-content pr10">'
		   Html_Design+='<div class="alert-left-section">'
		   Html_Design+='<img src="../SiteAssets/DevelopersCode/New_DefualtHome/images/alert-timeline.png" width="25" height="22" alt="" /></div>'
		   Html_Design+='<div class="alert-right-section pl10">'
		   Html_Design+='<h3><a href="#" class="ellipsis-3" data-toggle="modal" data-target="#Announcement_Alert" onclick="GetdatainModel(' + _itemID + ');">'+ _Title_text+'</a></h3>'
		   Html_Design+='<div class="news-card-data-panel2 ellipsis-3">'+ _Description +'</div>'
		   Html_Design+='<div class="alert-card-footer">'
		   Html_Design+='<a href="'+LinkAlert+'" id="Btn_Alert"><i class="fa fa-chevron-right"></i></a>'
		   Html_Design+='<span class="pull-right">'+ PublishDate +'</span>'		   
		   Html_Design+='</div></div></div></div></div></div></div>';        
        
        
        
        
        
        /*Html_Design = Html_Design + "<div class='col-md-12 pl0 pr5'>" +
      		"<div class='panel panel-default panel-mb10'>" +
        		"<div class='panel-heading panel-heading-announcements-alert  '><span class='announcement-head-text-alert'>Alert</span></div>" +
            	"<div class='panel-body panel-body-announcements-alert'>" +
          			"<p class='announcement-title-alert event-text-head-new'>" + _Title_text + "</p>" +
          			"<p>" + _Description + "</p>" +
					"<div class='col-sm-12 col-xs-12 pl0 pr0 pb5'>" +
						"<a href='#' class='announcements-alert-button' data-toggle='modal' data-target='#Announcement_Alert' onclick='GetdatainModel(" + _itemID + ");'>Details</a>" +
					"</div>" +
          			"<ul class='list-inline list-unstyled'>" +
            			"<li class='pull-right date-time-card'><span> " + PublishDate + " </span></li>" +
            			"<li><a href='#' class='view-alert Btn_Alert my_view_arrow_w' id='Btn_Alert'><i class='fa fa-chevron-right'></i></a></li>" +
          			"</ul>" +
        		"</div>" +
      		"</div>" +
    	"</div>";*/
    }

    else if (_Type == "Recognition") {
        var LinkRecognition = _spPageContextInfo.webServerRelativeUrl + "/Pages/ViewEmployeeOftheMonth.aspx?WebAppId=" + titanForWork.getQueryStringParameter("CompanyId") + "&sourcelocation=../Pages/Home.aspx";
        var LinkAddress = "../Pages/DetailsView.aspx?WebAppId=" + window.btoa(Logged_CompanyId) + "&ItemId=" + window.btoa(_itemID) + "&type=" + window.btoa('Recognition') + "&Source=" + _spPageContextInfo.webAbsoluteUrl;
           Html_Design+='<div class="col-md-12 pl0 pr0">'
		   Html_Design+='<div><div class="panel panel-default panel-timeline panel-mb20 panel-b-r-10">'
		   Html_Design+='<div class="panel-heading panel-heading-recognition-employee">'
		   Html_Design+='<span class="recognition-employee-month">'+_recoginationDate+'</span></div>'
		   Html_Design+='<div class="panel-body panel-body-recognition">'
		   Html_Design+='<div class="panel-body-recognition-overlay"></div>'
		   Html_Design+='<p class="recognition-type"><a href="'+LinkAddress +'">'+_Title_text+'</a></p>'
		   Html_Design+='<div class="col-xs-8 pl0 pr0">'
		   Html_Design+='<div class="recognition-content">'
		   Html_Design+='<h3 class="recognition-title event-text-head-new"><a href='+LinkAddress +'>'+ _EmployeeName +'</a></h3>'
		   Html_Design+='<p class="ellipsis-1">'+ _Designation +'</p>'
		   Html_Design+='<p class="ellipsis-1">'+ _Department +'</p>'
		   Html_Design+='<p class="ellipsis-1">'+ _OfficeLocation +'</p>'
		   Html_Design+='</div></div>';
		   Html_Design+='<div class="col-xs-4 p0 welcome-image-div">'
		   Html_Design+='<img class="img-responsive center-block" src="'+employeePicURL +'" alt="">'
		   Html_Design+='</div>';
		   Html_Design+='<div class="col-xs-12 recognition-card-footer">'
		   Html_Design+='<a href="'+LinkRecognition+'" id="Btn_Recognition"><i class="fa fa-chevron-right"></i></a>'
		   Html_Design+='</div></div></div></div></div>';       
        
        
        
        /*Html_Design = Html_Design + "<div class='col-md-12 pl0 pr5'>" +
        	"<div class='panel panel-default panel-mb10'>" +
            	"<div class='panel-heading panel-heading-recognition '><span class='recognition-head-text panel-heading-bg-txt-clr'>Recognition</span></div>" +
        		"<div class='panel-body panel-body-recognition'>" +
                	"<p class='recognition-title event-text-head-new'>" + _EmployeeName + "</p>" +
                	"<p class='recognition-type'>" + _Title_text + "</p>" +
                	"<div class='col-md-6 col-sm-6 col-xs-6 pl0 pr10'>" +
                    	"<div class='recognition-content'>" +
                    		"<p>" + _Designation + "</p>" +
                    		"<p>" + _Department + "</p>" +
                    		"<p>" + _OfficeLocation + "</p>" +
                    		"<p class=''>" + _Publishdate + "</p>" +
                    	"</div>" +
                	"</div>" +
					"<div class='col-md-6 col-sm-6 col-xs-6 p0 recognition-image-div'> <a> <img class='img-responsive' src=" + employeePicURL + "> </a> </div>" +
					"<div class='col-md-12 col-sm-12 col-xs-12 pl0 pr0 pt5 '>" +
						"<div class='recognition-view p0 mt10'><a href='#' class='Btn_Recognition my_view_arrow_w'><i class='fa fa-chevron-right'></i></a>" +
                    	"</div>" +
                    	"<a class='recognition-button' href='" + LinkAddress + "'>Details</a>" +
						//"<a data-toggle='modal' data-target='#MyRecognitionModel' class='recognition-button' onclick='GetdatainModel(" + _itemID + ");'>Details</a>" +
					"</div>" +
            	"</div>" +
          	"</div>" +
        "</div>";*/
    }

    else if (_Type == "General") {
        var generalViewLink=_spPageContextInfo.webServerRelativeUrl + "/Pages/ExperienceView.aspx?WebAppId=" + Logged_CompanyId + "&Type=R2VuZXJhbA==&sourcelocation=../Pages/Home.aspx"
        //$('#Btn_General').attr('href',generalViewLink);
        var LinkAddress = "../Pages/DetailsView.aspx?WebAppId=" + window.btoa(Logged_CompanyId) + "&ItemId=" + window.btoa(_itemID) + "&type=" + window.btoa('General') + "&Source=" + _spPageContextInfo.webAbsoluteUrl;
		   Html_Design+='<div class="col-md-12 pl0 pr0">'
		   Html_Design+='<div class="panel panel-default panel-timeline panel-mb20 panel-b-r-10">'
		   Html_Design+='<div class="panel-body panel-body-general">'
		   Html_Design+='<div><div class="general-image-section"><img src="'+G_Exp_BackImage+'" class="img-responsive" alt="" /></div>'
		   //Html_Design+=''
		   Html_Design+='<div class="col-md-12 general-content p0">'
		   Html_Design+='<div class="p10">'
		   Html_Design+='<h3><a href='+LinkAddress+'>'+ _Title_text +'</a></h3>'
		   Html_Design+='<div class="mb5 col-xs-12 p0">'
		   Html_Design+='<span class="col-xs-6 pl0 pr5 ellipsis-1">'+ _EmployeeName +'</span>'
		   Html_Design+='<div class="col-xs-6 pr0 pl5 ellipsis-1"><span class="pull-right">'+_Category+'</span></div></div>'
		   Html_Design+='<div class="mb10 col-xs-12 p0">'
		   Html_Design+='<span class="col-xs-6 pl0 pr5 ellipsis-1">'+_Department +'</span>'
		   Html_Design+='<div class="col-xs-6 pr0 pl5"><span class="pull-right">'+ PublishDate +'</span></div>'
		   Html_Design+='</div></div></div></div>'
		   Html_Design+='<div class="container-card-footer">'
		   Html_Design+='<a href='+generalViewLink+' id="Btn_General"><i class="fa fa-chevron-right"></i></a>'
		   Html_Design+='</div></div></div></div>';	
		
    }

    else if (_Type == "Welcome") {
        
		   var wolcomeLink= _spPageContextInfo.webAbsoluteUrl + "/Pages/EmployeeDetails.aspx?WebAppId=" + Logged_CompanyId + "&mode=editview&department=&employeedIddetails=" + _EmpID + "&sourcelocation="+_spPageContextInfo.webAbsoluteUrl
	       Html_Design+='<div class="col-md-12 pl0 pr0">'
		   Html_Design+='<div><div class="panel panel-default panel-timeline panel-mb20 panel-b-r-10">'
		   Html_Design+='<div style="display:none" class="panel-heading panel-heading-recognition-employee">'
		   Html_Design+='<span class="recognition-employee-month">'+PublishDate+'</span></div>'     //PublishDate
		   Html_Design+='<div class="panel-body panel-body-welcome">'
		   Html_Design+='<div class="panel-body-welcome-overlay"></div>'
		   Html_Design+='<p class="welcome-type"><a href="' +wolcomeLink+'">Welcome</a></p>'
		   Html_Design+='<div class="col-xs-8 pl0 pr0">'
		   Html_Design+='<div class="welcome-content">'
		   Html_Design+='<h3 class="welcome-title event-text-head-new"><a href="' +wolcomeLink+'">'+ _EmployeeName +'</a></h3>'
		   Html_Design+='<p class="ellipsis-1">'+ _Designation +'</p>'
		   Html_Design+='<p class="ellipsis-1">'+ _Department +'</p>'
		   Html_Design+='<p class="ellipsis-1">'+ _OfficeLocation +'</p>'
		   Html_Design+='<p class="ellipsis-1"><span class="dojSpan">DOJ : </span>'+DOJ+'</p>'
		   Html_Design+='</div></div>';
		   Html_Design+='<div class="col-xs-4 p0 welcome-image-div">'
		   Html_Design+='<img class="img-responsive center-block" src="'+employeePicURL +'" alt="">'
		   Html_Design+='</div></div></div></div></div>';		
		
		
    }
}

function GetEmployeeImg(EmpID, emptype) {
    var listname, id;
    var restQuery = "";
    if (emptype == "Employee") {
        listname = "Employees";
        id = EmpID;
        restQuery = "AttachmentFiles,Email&$expand=AttachmentFiles&$filter=ID eq '" + id + "'";
    }
    else if (emptype == "EmployeeGeneral") {
        listname = "Employees";
        id = EmpID;
        restQuery = "AttachmentFiles,Email&$expand=AttachmentFiles&$filter=Email eq '" + id + "'";
    }

    else if (emptype == "Others") {
        listname = "Announcements";
        id = EmpID;
        restQuery = "AttachmentFiles,Email&$expand=AttachmentFiles&$filter=ID eq '" + id + "'";
    }
    else if (emptype == "Alert/Announcement") {
        listname = "Announcements";
        id = EmpID;
        restQuery = "AttachmentFiles,Email&$expand=AttachmentFiles&$filter=ID eq '" + id + "'";
    }

    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listname + "')/items?$select=" + restQuery;
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            employeePicURL = "";
            if (emptype != "Alert/Announcement") {
                if (items.length > 0) {
                    if (items[0].AttachmentFiles.results.length > 0) {
                        employeePicURL = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    }
                    else {
                        if (items[0].Email != null && items[0].Email != "null" && items[0].Email != "") {
                            employeePicURL = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].Email)//"../SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
                        }
                        else {
                            employeePicURL = "../ImageGallery/userpic.jpg";
                        }
                    }
                }
                else {
                    employeePicURL = "../ImageGallery/userpic.jpg";
                }
            }
            else {
                $("#_AttachDocument").html('');
                if (items[0].AttachmentFiles.results.length != 0) {
                    for (var x = 0; x < items[0].AttachmentFiles.results.length; x++) {
                        if (emptype == "Alert/Announcement") {
                            $("#_AttachDocument").append('<a onclick="priviewfile(this);" href="javascript:void(0)" data-filename="' + items[0].AttachmentFiles.results[x].FileName + '" data-fileUrl="' + items[0].AttachmentFiles.results[x].ServerRelativeUrl + '" name=' + items[0].AttachmentFiles.results[x].ServerRelativeUrl + '> ' + items[0].AttachmentFiles.results[x].FileName + '<i class="fa fa-eye"></i></a>');
                        }
                        else {
                            $("#_AttachDocument").append('<a onclick="priviewfile(this);" href="javascript:void(0)" data-filename="' + items[0].AttachmentFiles.results[x].FileName + '" data-fileUrl="' + items[0].AttachmentFiles.results[x].ServerRelativeUrl + '" name=' + items[0].AttachmentFiles.results[x].ServerRelativeUrl + '> ' + items[0].AttachmentFiles.results[x].FileName + '</a>');
                        }
                    }
                }
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function priviewfile(Action) {
    var iframeUrl1 = "";
    var docExt = Action.dataset.filename.split('.').pop();
    if (docExt == 'doc' || docExt == 'docx' || docExt == 'xls' || docExt == 'xlsx' || docExt == 'ppt' || docExt == 'pptx' || docExt == 'pdf') {
        iframeUrl1 = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/WopiFrame.aspx?sourcedoc=' + Action.dataset.fileurl + '&action=interactivepreview';
    } else {
        iframeUrl1 = Action.dataset.fileurl;
    }

    src = Action.name + "?web=1";
    if (Action.name == null) {
        src = Action.title + "?web=1";
        iframeUrl1 = Action.title + "?web=1";
    }
    $("#DownloadDocs").prop("href", window.location.origin + Action.dataset.fileurl);
    var container = $("#doc-viewer").empty();
    $('<iframe>', {
        src: iframeUrl1,
        id: 'iframe-viewer',
        frameborder: 0,
        scrolling: 'yes',
        width: '100%',
        height: '98%'
    }).appendTo(container);
    $("#AttachmentView").modal("show");

    setTimeout(function () {
        if ($('#iframe-viewer').contents().find('body').html() == "") {
            $("#doc-viewer").empty();
            var htmlse = '<div class="col-md-12">' +
                        '<div class="panel panel-default shadow2" style="margin:100px;">' +
                        '<div class="panel-body" style="padding:60px;"><div class="row text-center"><br>' +
                        '<span><h2 class="text-center">No preview available. File has been downloaded.</h2></span>';
            $('#doc-viewer').append('<div width="100%" id="viewMyDocuments" style="padding-top:0px">' + htmlse + '</div>');

        }
    }, 2000);

}

function GetFixedImagesTimeline(filename) {
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('ImageGallery')/files?Select=*,ServerRelativeUrl&$filter=Title eq '" + filename + "'";
    var requestHeaders = { "accept": "application/json;odata=verbose" }
    $.ajax({
        url: requestUri,
        type: 'GET',
        async: false,
        dataType: 'json',
        headers: requestHeaders,
        success: function (data) {
            employeePicURL = '';
            var res = data.d.results;
            if (res.length > 0) {
                if (filename == "Recognition") {
                    G_PopUpBackImage = _spPageContextInfo.webAbsoluteUrl + "/ImageGallery/" + res[0].Name;
                }
                else {
                    employeePicURL = _spPageContextInfo.webAbsoluteUrl + "/ImageGallery/" + res[0].Name;
                    return employeePicURL;
                }
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}

//Bind Images of Announcements
function bindImages(AnnouncemntId,vedioCount) {
    $("#imagesgeneral").show();
    var Image = '';
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('GeneralPicturesGallery')/files?Select=DocType,Name,ServerRelativeUrl&$filter=startswith(Name,'" + AnnouncemntId + "') ";
    var requestHeaders = { "accept": "application/json;odata=verbose" }
    $.ajax({
        url: requestUri,
        type: 'GET',
        dataType: 'json',
        headers: requestHeaders,
        success: function (data) {
            $("#AnnouncemntImages").empty();
            var res = data.d.results;
            var imagesStore = [];
            if (res.length > 0) {
                Image += '<div class="item active">';
                Image += '<img src=' + encodeURI(res[0].ServerRelativeUrl) + ' alt="">';
                Image += '</div>';

                for (x = 1; x < res.length; x++) {
                    Image += '<div class="item">';
                    Image += '<img src=' + encodeURI(res[x].ServerRelativeUrl) + ' alt="">';
                    Image += '</div>';
                }
                $("#AnnouncemntImages").append(Image);
                if (res.length == 1 || res.length==0) {
                    $(".ImageArrow").hide();
                }
                else {
                    $(".ImageArrow").show();
                }
            }
            else {
                $("#imagesgeneral").hide();
            }
            AddRemoveClass(res.length,vedioCount)
        },
        error: function ajaxError(response) {
            alert(response.status + ' ' + response.statusText);
        }
    });
}

function GetdatainModel(id) {
    G_ItemId = id;
    ItemID = id;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Announcements')/items?$select=*,Departments/Title,Author/EMail,Author/Title,TeamMembers/Title,TeamMembers/EMail,AttachmentFiles,category/CatogeryName&$expand=Departments,Author,TeamMembers/ID,AttachmentFiles,category&$filter=ID eq ('" + id + "')";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            //GetEmployeeImages();
            $("#RecTitle").text('');
            $("#EmpName").text('');
            $("#EmpDesignation").text('');
            $("#EmpDepartment").text('');
            $("#EmpLocation").text('');
            $("#DtlDescription").text('');
            $("#TextTitle").text('');
            $("#WebLinkText").text('');

            var items = data.d.results;
            $("#EmpName").text(items[0].EmployeeName);
            if (items[0].WebPartName == "General") {
                $("#ModelHeading").text(items[0].category.CatogeryName);
                $("#RecTitle").text(items[0].Title);
                $("#PopType").text("Experience");
                if (items[0].UserType == "Internal Users") {
                    $("#EmpName").text(items[0].TeamMembers.results[0].Title);
                }
            }
            if (items[0].WebPartName == "Recognition") {
                $("#RecTitle").text(items[0].Title);
                var ImgTitle = "Recognition";
                GetFixedImagesTimeline(ImgTitle);
                $("#BannerImagePopUp").attr("src", G_PopUpBackImage);
                $("#PopType").text("Recognition");
            }
            $("#Itemdate").text(formatDate(items[0].Created));

            if (items[0].WebPartName == "General") {
                if (items[0].WebLinks != null) {
                    $("#WebLinkText").text(items[0].WebLinks.Url);
                    $("#linkdiv").css("display", "block");
                    $("#WebLink").attr("href", items[0].WebLinks.Url);
                }
            }
            else {
                $("#linkdiv").css("display", "none");
            }
            if (items[0].Designation != null) {
                $("#EmpDesignation").text(items[0].Designation);
            }

            if (items[0].Department != null) {
                $("#EmpDepartment").text(items[0].Department);
            }
            else {
                $("#spSymbol").css("display", "none");
            }

            if (items[0].OfficeLocation != null) {
                $("#EmpLocation").text(items[0].OfficeLocation);
            }
            else {
                $("#spSymbol").css("display", "none");
            }

            if (items[0].Description != null) {
                $("#DtlDescription").html(items[0].Description);
            }


            if (items[0].WebPartName == "Alert" || items[0].WebPartName == "Announcement" || items[0].WebPartName=="At a Glance") {

                $("#_ModelHeading").text(items[0].WebPartName);

                var AllowComments = items[0].AllowComments;
                if (AllowComments == "Allowed" || AllowComments==null) {
                    $(".Allow-Comments").css("display", "block");
                    $(".Stop-Allow-Comments").css("display", "block");
                }
                else if (AllowComments == "Not Allowed") {
                    $(".Allow-Comments").css("display", "none");
                }
                else if (AllowComments == "Stop") {
                    $(".Allow-Comments").css("display", "block");
                    $(".Stop-Allow-Comments").css("display", "none");
                }
                else {
                    $(".Allow-Comments").css("display", "none");
                }
                if (items[0].Title != null) { $("#_TextTitle").text(items[0].Title); }
                $("#AnnouncmntAuthor").text(items[0].Author.Title);
                $("#AnnouncmntCreated").text(formatDate(items[0].Created));
                var userImage=items[0].ImageUrl;
                if(userImage==null)
                {
                   userImage=_spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].Author.EMail);
                }
                var userDept=items[0].Department;
                if(userDept==null)userDept='';
                var userDesig=items[0].Designation;
                if(userDesig==null)userDesig='';
                $("#userImage").attr("src",userImage);
                $("#userDesig").text(userDesig);
                $("#userDept").text(userDept);                
                if (items[0].Description != null) {
                    var AnnouncementDescription = removetag(items[0].Description);
                    if (AnnouncementDescription.length > 980) {
                        if (items[0].WebPartName == "Alert") {
                            $("#_DtlDescription").html(jQuery.trim(AnnouncementDescription).substring(0, 980) + '...<a class="common-popup-description-more" href="javascript:void(0);" id="annReadMore">Read More</a>');
                        }
                        else {
                            $("#_DtlDescription").html(jQuery.trim(AnnouncementDescription).substring(0, 980) + '...<a class="common-popup-description-more panel-heading-bg-txt-clr" href="javascript:void(0);" id="annReadMore">Read More</a>');
                        }
                        $("#annReadMore").click(function () {
                            $("#_DtlDescription").html(items[0].Description);
                        });
                    }
                    else {
                        $("#_DtlDescription").html(items[0].Description);
                    }
                }
                if (items[0].WebPartName == "Alert") {
                    $("#_ModelHeading").removeClass("common-head-text-popup");
                    $("#_ModelHeading").removeClass("panel-heading-bg-txt-clr");
                    $("#_ModelHeading").removeAttr("style");
                    $("#_ModelHeading").addClass("common-head-text-popup-Alert");
                    $("#NoticeBgImage").attr("src", "../SiteAssets/DevelopersCode/DefaultHome/images/alert-popup.png");
                    $('#annReadMore').attr('style', 'background: #f00 !important');                    
                    $('#modelType').text(items[0].WebPartName);
                }
                else if (items[0].WebPartName == "At a Glance")
                {
                    $("#_ModelHeading").removeClass("common-head-text-popup-Alert");
                    $("#_ModelHeading").addClass("common-head-text-popup");
                    //$("#_ModelHeading").addClass("panel-heading-bg-txt-clr");
                    $("#NoticeBgImage").attr("src", "../SiteAssets/DevelopersCode/DefaultHome/images/ataglance-popup.png");
                    $('#annReadMore').attr('style', 'background: #ff9e20 !important');
                    if(items[0].category.CatogeryName==null)items[0].category.CatogeryName='';
                    $('#modelType').text(items[0].category.CatogeryName);
                }
                else
                {
                    $("#_ModelHeading").removeClass("common-head-text-popup-Alert");
                    $("#_ModelHeading").addClass("common-head-text-popup");
                    //$("#_ModelHeading").addClass("panel-heading-bg-txt-clr");
                    $("#NoticeBgImage").attr("src", "../SiteAssets/DevelopersCode/DefaultHome/images/announcement-popup.png");
                    $('#annReadMore').attr('style', 'background: #ff9e20 !important');
                    $('#modelType').text(items[0].WebPartName);
                }

                if (items[0].WebLinks != null) {
                    $("#divLink").show();
                    $("#_WebLink").text(items[0].WebLinks.Url);
                    $("#_WebLink").attr("href", items[0].WebLinks.Url);
                }
                else {
                    $("#divLink").hide();
                    $("#_WebLink").text("");
                    $("#_WebLink").attr("href", "");
                }
                //GetAttachments
                GetEmployeeImg(ItemID, emptype = "Alert/Announcement");
            }

            if (items[0].UserType == "Employee" || items[0].UserType == "Internal Users") {
                if (items[0].WebPartName == "Recognition") {
                    GetEmployeeImg(items[0].EmployeeID, emptype = "Employee");
                    $('#profile-image').prop('src', employeePicURL);
                }

                else if (items[0].TeamMembers.results != null && items[0].TeamMembersId != null) {
                    if (items[0].UserType == "Internal Users") {
                        GetEmployeeImg(items[0].TeamMembers.results[0].EMail, emptype = "EmployeeGeneral");
                        $('#profile-image').prop('src', employeePicURL);

                    }
                    else {
                        GetEmployeeImg(items[0].EmployeeID, emptype = "Employee");
                        $('#profile-image').prop('src', employeePicURL);
                    }
                }
            }
            else if (items[0].UserType == "Others" || items[0].UserType == "External Users") {
                if (items[0].AttachmentFiles.results.length > 0) {
                    var attachmentUrl = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    $('#profile-image').prop('src', attachmentUrl);
                }
                else if (items[0].WebLinks != null) {
                    var attachmentUrl = items[0].WebLinks.Description;
                    $('#profile-image').prop('src', attachmentUrl);
                }

            }
            else if (items[0].UserType == "Team") {
                if (items[0].AttachmentFiles.results.length > 0) {
                    var attachmentUrl = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    $('#profile-image').prop('src', attachmentUrl);
                }
                else if (items[0].WebLinks != null) {
                    var attachmentUrl = items[0].WebLinks.Description;
                    $('#profile-image').prop('src', attachmentUrl);
                }
            }
            else if (items[0].UserType == "Department") {
                $("#EmpDepartment").text('');
                GetFixedImagesTimeline(filename = "DEPARTMENT");
                $('#profile-image').prop('src', employeePicURL);
            }
            if (items[0].WebPartName == "Announcement" || items[0].WebPartName == "Alert" || items[0].WebPartName == "At a Glance") {
                //Bind Images of Announcements/Alert
                var videolinks = items[0].videolink;
            var SliderHTML = '';
            var nextpreview = '';
            var itemId = items[0].ID;
            var sliderType = '';
            var strarray =[];
            var results= items;
            if (videolinks != null) {

                    if (videolinks.indexOf(",") > -1) {
                        var strarray = videolinks.split(',');
                    }
                    else {
                        var strarray = [];
                        strarray.push(results[0].videolink);
                    }
                    if (strarray.length > 1) {
                        $("#RightArrowSign").show();
                        $("#LeftArrowSign").show();
                        $("#video_media_area").show();
                        //$("#image_media_area").removeClass('image-media-area-p-alone');
                    }
                    else {
                        //$("#video_media_area").hide();
                        //$("#image_media_area").addClass('image-media-area-p-alone');
                        $("#RightArrowSign").hide();
                        $("#LeftArrowSign").hide();
                    }

                    for (var i = 0; i < strarray.length; i++) {
                        if (i == 0) {
                            UrlExists(strarray[i], function (status) {
                                if (status != 404) {
                                    SliderHTML += '<div class="item active">';
                                    SliderHTML += '<iframe width="100%" height="315" src=' + strarray[i] + ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                                    SliderHTML += '</div>';
                                }
                                else {
                                    SliderHTML += '<div class="item active">' +
                                                '<div class="panel panel-default shadow2" style="margin:100px;">' +
                                                '<div class="panel-body" style="padding:60px;"><div class="row text-center"><br>' +
                                                '<span><h2 class="text-center">Video URL is broken. Please contact administrator.</h2></span>' +
                                                '</div></div></div></div>';
                                    //$("#allvideolink1").append(SliderHTML);
                                }
                            });
                        }
                        else {
                            UrlExists(strarray[i], function (status) {
                                if (status != 404) {
                                    SliderHTML += '<div class="item">';
                                    SliderHTML += '<iframe width="100%" height="315" src=' + strarray[i] + ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                                    SliderHTML += '</div>';
                                }
                                else {
                                    SliderHTML += '<div class="item">' +
                                                '<div class="panel panel-default shadow2" style="margin:100px;">' +
                                                '<div class="panel-body" style="padding:60px;"><div class="row text-center"><br>' +
                                                '<span><h2 class="text-center">Video URL is broken. Please contact administrator.</h2></span>' +
                                                '</div></div></div></div>';
                                    //$("#allvideolink1").append(SliderHTML);
                                }
                            });
                        }
                    }
                    $("#allvideolink1").empty();
                    $("#allvideolink1").append(SliderHTML);
                }
                else {
                    $("#RightArrowSign").hide();
                    $("#LeftArrowSign").hide();
                    $("#video_media_area").hide();
                    //$("#image_media_area").addClass('image-media-area-p-alone');

                }
                
                bindImages(ItemID,strarray.length);
                if (MediatextColor != null && HeaderTextColor != null) {
                    $('.panel-heading-bg-txt-clr').each(function () {                 //For Theme
                        this.style.setProperty('color', MediatextColor, 'important');
                        this.style.setProperty('background', HeaderTextColor, 'important');
                    });
                }

            }
            else {
                GetDocuments(ItemID, items[0].WebPartName);
            }
            ReadCommentOnPost(ItemID); // Read Comments on selected Post....  
            LoadChatting(items[0].WebPartName, items[0].Id, items[0].ViewCount, items[0].LikeCount, items[0].ComentsCount);
            /*var localStorageLanguage = localStorage.getItem("TitanTheme_" + _spPageContextInfo.siteId + "_" + Logged_CompanyId);
	        var localStorageData = JSON.parse(localStorageLanguage);
	        ThemeCommonFunction(localStorageData.data);*/
        },
        error: function (data) {
            console.log(data);
        }
    });
}

//to check video link is broken or not
function UrlExists(url, cb) {
    jQuery.ajax({
        url: url,
        dataType: 'text',
        type: 'GET',
        async: false,
        complete: function (xhr) {
            if (typeof cb === 'function')
                cb.apply(this, [xhr.status]);
        }
    });
}

function AddRemoveClass(ImageCount,VideoCount) {
    if (ImageCount > 0) {
        $("#imagesgeneral").addClass("image-media-area-p-alone");
    }
    else {
        $("#image_media_area").removeClass("image-media-area-p-alone");
    }
    if (VideoCount > 0) {
        $("#video_media_area").addClass('video-media-area-p-alone');
        $("#video_media_area").show();
    }
    else {
        $("#video_media_area").removeClass('video-media-area-p-alone');
    }
    if (VideoCount > 0 && ImageCount > 0) {
        $("#video_media_area").removeClass('video-media-area-p-alone');
        $("#imagesgeneral").removeClass('image-media-area-p-alone');
        $("#image_media_area").removeClass("image-media-area-p-alone");
    }
}

function GetDocuments(filename, webpartname) {
    var DocType = '';
    var ImgType = '';
    if (webpartname == "General") { DocType = "Image"; } else if (webpartname == "Recognition") { DocType = "Award_Image"; }
    if (webpartname == "General") { ImgType = "Document"; } else if (webpartname == "Recognition") { ImgType = "Award_Document"; }

    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('GeneralPicturesGallery')/files?Select=DocType,Name,ServerRelativeUrl&$filter=startswith(Name,'" + filename + "')";
    var requestHeaders = { "accept": "application/json;odata=verbose" }
    $.ajax({
        url: requestUri,
        type: 'GET',
        dataType: 'json',
        headers: requestHeaders,
        success: function (data) {
            $("#AttachDoc").empty();
            var res = data.d.results;
            var imagesStore = [];
            if (res.length > 0) {
                var x = 0;
                for (x; x < res.length; x++) {
                    if (res[x].Title == DocType) {
                        var imgname = _spPageContextInfo.webAbsoluteUrl + "/GeneralPicturesGallery/" + res[x].Name;
                        imagesStore.push(imgname);
                    }
                    else if (res[x].Title == ImgType) {
                        var Docname = res[x].Name;
                        $('#AttachDoc').append('<div id="_file_' + x + '"><strong class="fa-stack-1x" style="color:#FFF; font-size:12px; margin-top:2px;">' + x + '</strong><a name="' + document.location.origin + res[x].ServerRelativeUrl + '" onclick="priviewfile(this);" href="javascript:void(0)" data-filename="' + res[x].Name + '" data-fileUrl="' + res[x].ServerRelativeUrl + '"><span class="play"></span><span class="">' + res[x].Name + '</span></a> </div>');
                    }
                }
            }
            $("#1stImg").empty();
            if (webpartname == "General") {
                if (imagesStore.length > 0) { $("#BannerImagePopUp").attr("src", imagesStore[0]); $("#BannerImagePopUp").css("display", "block"); }
                else { $("#BannerImagePopUp").attr("src", ''); $("#BannerImagePopUp").css("display", "none"); }

                if (imagesStore.length < 2) { $(".my_experience_controls").hide(); }
                else { $(".my_experience_controls").show(); }

                if (imagesStore.length > 0) {
                    $("#carousel-example-generic").show();
                    for (k = 1; k < imagesStore.length; k++) {
                        if (k == 1) { $('#1stImg').append('<div class="item active"><img src="' + imagesStore[k] + '" id="sliderImage' + k + '"  alt=""></div>'); }
                        else { $('#1stImg').append('<div class="item"><img src="' + imagesStore[k] + '" id="sliderImage' + k + '"  alt=""></div>'); }
                    }
                }
                else {
                    for (k = 0; k < 2; k++) {
                        if (k == 0) { $('#1stImg').append('<div class="item active"><img src="../SiteAssets/Biography/images/i1.jpeg" id="sliderImage' + k + '"  alt=""></div>'); }
                        else { $('#1stImg').append('<div class="item"><img src="../SiteAssets/Biography/images/i2.jpg" id="sliderImage' + k + '"  alt=""></div>'); }
                    }
                    $("#carousel-example-generic").hide();
                }
            }
            else {
                if (imagesStore.length <= 1) { $(".my_experience_controls").hide(); }
                else { $(".my_experience_controls").show(); }
                if (imagesStore.length > 0) {
                    $("#carousel-example-generic").show();
                    for (k = 0; k < imagesStore.length; k++) {
                        if (k == 0) { $('#1stImg').append('<div class="item active"><img src="' + imagesStore[k] + '" id="sliderImage' + k + '"  alt=""></div>'); }
                        else { $('#1stImg').append('<div class="item"><img src="' + imagesStore[k] + '" id="sliderImage' + k + '"  alt=""></div>'); }
                    }
                }
                else {
                    for (k = 0; k < 2; k++) {
                        if (k == 0) { $('#1stImg').append('<div class="item active"><img src="../SiteAssets/Biography/images/i1.jpeg" id="sliderImage' + k + '"  alt=""></div>'); }
                        else { $('#1stImg').append('<div class="item"><img src="../SiteAssets/Biography/images/i2.jpg" id="sliderImage' + k + '"  alt=""></div>'); }
                    }
                    $("#carousel-example-generic").hide();
                }
            }
        },
        error: function ajaxError(response) {
            alert(response.status + ' ' + response.statusText);
        }
    });
}

function Universalinsert(listName, item) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        async: false,
        headers:
        {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) { console.log("add success"); },
        error: function (data) { console.log(data); }
    });
}

function GetEmployeeImages(EmpID) {
    var Ownurl = '';
    if (EmpID == undefined || EmpID == null) {
        Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=ID,AttachmentFiles,Designation,City,Department/DepartmentName,OfficeLocation/OfficeName,DateOfBirth,DayOfBirth,MonthOfBirth,DateOfAnniversary,DayOfAnniversary,MonthOfAnniversary,LogonName/Title,Email&$orderby=FullName&$top=5000&$expand=LogonName,OfficeLocation,AttachmentFiles,Department&$filter=Email eq ('" + _spPageContextInfo.userEmail + "')";
    }
    else {
        Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees')/items?$select=ID,AttachmentFiles,Designation,City,Department/DepartmentName,OfficeLocation/OfficeName,DateOfBirth,DayOfBirth,MonthOfBirth,DateOfAnniversary,DayOfAnniversary,MonthOfAnniversary,LogonName/Title,Email&$orderby=FullName&$top=5000&$expand=LogonName,OfficeLocation,AttachmentFiles,Department&$filter=ID eq ('" + EmpID + "')";
    }
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                if (EmpID == undefined || EmpID == null) {
                    LoginUserID = items[0].ID;
                    if (items[0].AttachmentFiles.results.length > 0) {
                        LoginUserImage = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    }
                    else {
                        LoginUserImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].Email)//"../SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
                    }
                    $('#LoginUserImage').attr("src", LoginUserImage);
                }
                else {
                    if (items[0].AttachmentFiles.results.length > 0) {
                        CommentUserImage = items[0].AttachmentFiles.results[0].ServerRelativeUrl;
                    }
                    else {
                        CommentUserImage = _spPageContextInfo.webAbsoluteUrl + '/_layouts/15/userphoto.aspx?accountname=' + escapeProperly(items[0].Email)//"../SiteAssets/EmployeeSynchronous/EmployeeDirectory/user_pic.jpg";
                    }
                }
            }
        },
        error: function (data) {
            alert("An error occurred. Please try again.");
        }
    });
}

function PushComment() {
    var d = new Date();
    var strDate = d.getDate() + "-";
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var Currentdate = strDate.concat(monthNames[d.getMonth()]);
    if ($("#TextComment").val().trim().length > 0) {
        var comment = $("#TextComment").val().trim();
        if (comment.length < 251) {
            var DataID = ItemID.toString();
            var listName = "AnnouncementsChild";
            var Webpartname = "General";
            var itemComment = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'Title': comment, 'WebPartName': Webpartname, 'Item_ID': DataID, 'ReplierID': LoginUserID.toString() };
            Universalinsert(listName, itemComment);
            $(".emojionearea-editor").empty();
            ReadCommentOnPost(DataID);
        }
        else {
            alert("Maximum length 250 characters.");
        }
    }
}

function ReadCommentOnPost(ItmID) {
    $(".emojionearea-editor").empty();
    $("#SaveBTN").hide();
    $("#PostBTN").show();

    G_ID_FOR_ReadComment = ItmID;
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items?$filter= Item_ID eq ('" + ItmID + "')&$expand=Author/Id&$select=*,Author/Name,Author/Title";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            $("#AllComents").empty();
            var items = data.d.results;
            var likeCount = [];
            var AuthorList = [];
            var HtmlDesign = '';
            if (items.length > 0) {
                for (var i = 0; i < data.d.results.length; i++) {
                    var value = data.d.results[i];
                    var ReplyDateObj = new Date(value.Created);
                    var Replytime = ReplyDateObj.toTimeString();
                    GetEmployeeImages(value.ReplierID);
                    var H = +Replytime.substr(0, 2);
                    var h = (H % 12) || 12;
                    var ampm = H < 12 ? " AM" : " PM";
                    Replytime = h + Replytime.substr(2, 3) + ampm;

                    if (parseInt(value.AuthorId) == _spPageContextInfo.userId) { setdisplay = "display: block"; } else { setdisplay = "display: none"; }

                    if (value.Title != null) {
                        HtmlDesign = HtmlDesign + "<div class='col-md-12 col-sm-12 reply-box'>" +
                            "<div class='col-md-12 col-sm-12 reply-author-detail pl0 pr0 pb10 pt0'>" +
                                "<span class='mr10'><img src=" + CommentUserImage + " class='img-circle' width='36' height='36' alt=''></span>" +
                                "<span>" + value.Author.Title + "</span> - <span>" + CustomformatDate(value.Created) + "</span> at <span> " + Replytime + " </span>" +
                            "</div>" +
                            "<h4 id='Comment" + value.ID + "'>" + value.Title + "</h4>" +
                            "<div class='clearfix'></div>" +
                            "<div class='col-md-12 col-md-12 pt0 pl0 pr0' style='" + setdisplay + "'>" +
                                "<span class='cmt-edit-button'><a href='#' id='" + value.ID + "' onclick='DisplayEditBox(" + value.ID + ")' ><i class='fa fa-pencil'></i><p>Edit</p></a> </span>" +
                                "<span class='cmt-delete-button mml5 ml20'><a href='#' onclick='DeleteComments(" + value.ID + ")'><i class='fa fa-trash'></i><p> Delete</p> </span></a>" +
                            "</div>" +
                            "<div class='EditBox' id='EditBox" + value.ID + "' style='display:none;'>" +
                                "<div class='col-md-12 col-sm-12 comment-box-in mt5 p0'>" +
                                    "<div class='clearfix'></div>" +
                                "</div>" +
                            "</div>" +
                        "</div>";
                    }

                    if (value.Like == "Yes") {
                        likeCount.push(value.Like);
                        AuthorList.push(value.Author.Title);
                    }
                }
                $('#AllComents').append(HtmlDesign);

                if (likeCount.length == 0) {
                    $("#TotalLike").text("");
                    $("#AuthorList").text("");
                }
                else {
                    $("#TotalLike").text(likeCount.length);
                    $("#AuthorList").text(AuthorList);
                }
            }
            else {
                $("#TotalLike").text("");
                $("#AuthorList").text("");
            }
            // SetLikeBtnValueTimeline(ItmID); 

            $(".EditTextArea").emojioneArea({
                ickerPosition: "right",
                tonesStyle: "bullet",
                events: {
                    keyup: function (editor, event) {
                        //console.log(editor.html());
                        //console.log(this.getText());
                    }
                }
            });
        },
        error: function (data) {
            alert("An error occurred. Please try again.");
        }
    });
}

function DisplayEditBox(DisplayID) {
    $("#PostBTN").hide();
    $("#SaveBTN").show();
    var ExistingComment = $("#Comment" + DisplayID).html();
    $(".emojionearea-editor").html(ExistingComment);
    G_CommentID = DisplayID;
}

function UpdateEditComment() {
    //var NewComment = $('#TopCommentArea').find('.emojionearea-editor').html();
    var NewComment = $("#TextComment").val().trim();
    var StrLength = NewComment.trim().length;
    if (StrLength > 0) {
        if (StrLength < 251) {
            $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AnnouncementsChild')/items(" + G_CommentID + ")",
                type: "POST",
                data: JSON.stringify({
                    __metadata: { type: "SP.Data.AnnouncementsChildListItem" },
                    Title: NewComment
                }),
                headers:
                {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "IF-MATCH": "*",
                    "X-HTTP-Method": "MERGE"
                },
                success: function (data, status, xhr) {
                    console.log("Comment Updated");
                    //GetdatainModel(ItemID);
                    ReadCommentOnPost(ItemID);
                },
                error: function (data) {
                    console.log("UpdateEditComment Failed");
                    console.log(data);
                }
            });
        }
        else {
            alert("Maximum length 250 characters.");
        }
    }
}

function DeleteComments(_ItemID) {
    if (confirm('Are you sure to delete this record?')) {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AnnouncementsChild')/items(" + _ItemID + ")",
            type: "POST",
            headers:
            {
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "DELETE"
            },
            success: function (data) {
                alert("Selected record deleted successfully.");
                ReadCommentOnPost(ItemID);
            },
            error: function (data) { $("#ResultDiv").empty().text(data.responseJSON.error); }
        });
    }
}

function SetLikeBtnValueTimeline(ItmID) {
    //var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items?$filter= (Item_ID eq '"+ ItmID +"' and AuthorId eq '"+_spPageContextInfo.userId+"' and  Like eq 'Yes' and ReplierID eq '' or Like eq 'No')";  
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('AnnouncementsChild')/items?$filter= (Item_ID eq '" + ItmID + "' and AuthorId eq '" + _spPageContextInfo.userId + "' and  ReplierID eq null)";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                LikeVal = items[0].Like;
                LikeID = items[0].ID;
            }
            else {
                LikeVal = "New";
            }

            if (LikeVal == "New") {
                var listName = "AnnouncementsChild";
                var DataID = ItemID.toString();
                var Webpartname = "General";
                var Like = "Yes";
                var itemLikes = { '__metadata': { type: 'SP.Data.' + listName + 'ListItem' }, 'Like': Like, 'WebPartName': Webpartname, 'Item_ID': DataID };
                Universalinsert(listName, itemLikes);
                ReadCommentOnPost(DataID);
            }
            else if (LikeVal == "Yes" || LikeVal == "No") {
                updateLikes();
            }

        },
        error: function (data) {
            alert("An error occurred. Please try again.");
        }
    });
}

function AddLike() {
    SetLikeBtnValueTimeline(G_ItemId);
}

function updateLikes() {
    var likebtnvalue = '';
    if (LikeVal == "Yes") {
        likebtnvalue = "No";
    }
    else if (LikeVal == "No") {
        likebtnvalue = "Yes";
    }
    $.ajax
    ({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('AnnouncementsChild')/items('" + LikeID + "')",
        type: "POST",
        data: JSON.stringify
        ({
            __metadata:
            {
                type: "SP.Data.AnnouncementsChildListItem"
            },
            Like: likebtnvalue,
            WebPartName: "General",
            Item_ID: ItemID.toString()
        }),
        headers:
        {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
        },
        success: function (data, status, xhr) {
            console.log("Data Updated!");
            ReadCommentOnPost(ItemID);
        },
        error: function (xhr, status, error) {
            $("#ResultDiv").empty().text(data.responseJSON.error);
        }
    });
}

function GetCategory() {
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CategoryMaster')/items?$filter=CategoryType eq 'Recognition' and Status eq 'Yes'&$orderby=DepartmentName asc";
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: true,
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                $('#ddlcategory').append($("<option     />").val('All').text('All'));
                for (i = 0; i < items.length; i++) {
                    $('#ddlcategory').append($("<option     />").val(items[i].ID).text(items[i].CatogeryName));
                }
            }
        },
        eror: function (data) {
            console.log(data);
        }
    });
}

function ReadDepartment() {
    var Ownurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Departments')/items?$filter=CompanyID eq '" + Logged_CompanyId + "'&$orderby=DepartmentName asc";
    $.ajax({
        url: Ownurl,
        async: true,
        headers: { Accept: "application/json;odata=verbose" },
        success: function (data) {
            var items = data.d.results;
            if (items.length > 0) {
                $('#ddldepartment').append($("<option     />").val('All').text('All'));
                for (i = 0; i < items.length; i++) {
                    $('#ddldepartment').append($("<option     />").val(items[i].DepartmentName).text(items[i].DepartmentName));
                }
            }
        },
        eror: function (data) {
            alert("An error occurred. Please try again.");
        }
    });
}

function SetbackImage(filename, webpartname) {
    var ImgType = '';
    G_Exp_BackImage = '';
    G_Exp_Display = '';
    if (webpartname == "General") { DocType = "Image"; }
    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('GeneralPicturesGallery')/files?Select=DocType,Name,ServerRelativeUrl&$filter=startswith(Name,'" + filename + "')";
    var requestHeaders = { "accept": "application/json;odata=verbose" }
    $.ajax({
        url: requestUri,
        type: 'GET',
        async: false,
        dataType: 'json',
        headers: requestHeaders,
        success: function (data) {
            var res = data.d.results;
            var imagesStore = [];
            if (res.length > 0) {
                var x = 0;
                for (x; x < res.length; x++) {
                    if (res[x].Title == DocType) {
                        var imgname = _spPageContextInfo.webAbsoluteUrl + "/GeneralPicturesGallery/" + res[x].Name;
                        imagesStore.push(imgname);
                    }
                }
            }
            if (imagesStore.length > 0) {
                G_Exp_BackImage = imagesStore[0];
                G_Exp_Display = 'block';
            }
            else {
                G_Exp_Display = 'none';
            }
        },
        error: function ajaxError(response) {
            alert(response.status + ' ' + response.statusText);
        }
    });
}

function FilterGetdata(Query) {
    var ResultItems = [];
    var Ownurl = Query;
    $.ajax({
        url: Ownurl,
        headers: { Accept: "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            ResultItems = data.d.results;
        },
        error: function (data) {
            console.log(data);
            alert("An error occurred. Please try again.");
        }
    });
    return ResultItems;
}

function getFlagData() {
    var today = new Date();
    var CurrentDate = today.toISOString().substring(0, 10);
    var companyId=titanForWork.getQueryStringParameter("ComID");	
	var deparmentId=titanForWork.getQueryStringParameter("DeptID");
	var Corporate=titanForWork.getQueryStringParameter("Corporate");
	if(companyId!=null){
         var QueryOwnurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,TeamMembers/ID,TeamMembers/Title,TeamMembers/EMail,TeamMembers/Title,category/CatogeryName,Departments/Title,Company/Title&$filter=(ApprovalStatus eq 'Approved' and (IsFlagUp eq 1 and WebPartName ne 'Welcome') and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "'&$expand=TeamMembers/ID,AttachmentFiles,Departments,Company,category&$orderby=Publish_Date desc,Modified  desc&$top=10";
	}
	else if(Corporate!=null){
         var QueryOwnurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,TeamMembers/ID,TeamMembers/Title,TeamMembers/EMail,TeamMembers/Title,category/CatogeryName,Departments/Title,Company/Title&$filter=(ApprovalStatus eq 'Approved' and (IsFlagUp eq 1 and WebPartName ne 'Welcome') and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and Audience eq 'Corporate'&$expand=TeamMembers/ID,AttachmentFiles,Departments,Company,category&$orderby=Publish_Date desc,Modified  desc&$top=10";
	}
	else if(deparmentId!=null){
         var QueryOwnurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,TeamMembers/ID,TeamMembers/Title,TeamMembers/EMail,TeamMembers/Title,category/CatogeryName,Departments/Title,Company/Title&$filter=(ApprovalStatus eq 'Approved' and (IsFlagUp eq 1 and WebPartName ne 'Welcome') and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "'&$expand=TeamMembers/ID,AttachmentFiles,Departments,Company,category&$orderby=Publish_Date desc,Modified  desc&$top=10";
	}
	else{
        var QueryOwnurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,TeamMembers/ID,TeamMembers/Title,TeamMembers/EMail,TeamMembers/Title,category/CatogeryName,Departments/Title,Company/Title&$filter=(ApprovalStatus eq 'Approved' and (IsFlagUp eq 1 and WebPartName ne 'Welcome') and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "') or (Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "') or (Audience eq 'Location' and Company/ID eq '" + Logged_CompanyId + "' and OfficeLocations/ID eq '" + Logged_Location + "') or (Audience eq 'Selective' and Company/ID eq '" + Logged_CompanyId + "' and TeamMembers/EMail eq '" + _spPageContextInfo.userEmail + "')) &$expand=TeamMembers/ID,AttachmentFiles,Departments,Company,category&$orderby=Publish_Date desc,Modified  desc&$top=10";
	}
    
    //var QueryOwnurl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Announcements')/Items?$select=*,AttachmentFiles,TeamMembers/ID,TeamMembers/Title,TeamMembers/EMail,TeamMembers/Title,category/CatogeryName,Departments/Title,Company/Title&$filter=(ApprovalStatus eq 'Approved' and IsFlagUp eq 1 and Publish_Date le '" + CurrentDate + "' and Expires ge '" + CurrentDate + "') and (Audience eq 'Corporate' or (Audience eq 'Company' and Company/ID eq '" + Logged_CompanyId + "') or (Audience eq 'Department' and Company/ID eq '" + Logged_CompanyId + "' and Departments/ID eq '" + Logged_DepartmentId + "') or (Audience eq 'Location' and Company/ID eq '" + Logged_CompanyId + "' and OfficeLocations/ID eq '" + Logged_Location + "') or (Audience eq 'Selective' and Company/ID eq '" + Logged_CompanyId + "' and TeamMembers/EMail eq '" + _spPageContextInfo.userEmail + "')) &$expand=TeamMembers/ID,AttachmentFiles,Departments,Company,category&$orderby=Publish_Date desc,Modified  desc&$top=10";
    var results = FilterGetdata(QueryOwnurl);
    
    var flagHTML = '';
    if (results.length > 0) {
        for (var i = 0; i < results.length; i++) {
            var Description = '';
            var CatogeryName= results[i].category.CatogeryName;
            var webPartName=results[i].WebPartName;
            if (results[i].Description != null) {
                var TextDescription = removetag(results[i].Description)
                if (TextDescription.length > 210) {
                    Description = add3Dots(TextDescription, 210);
                }
                else {
                    Description = TextDescription;
                }
            }
            var CoverImage = '';
            if(results[i].CoverImage==null)
            {
                if (results[i].AttachmentFiles.results.length > 0) {

                    for (var k = 0; k < results[i].AttachmentFiles.results.length; k++) {
                        var Filename = results[i].AttachmentFiles.results[k].FileName;
                        var n = Filename.startsWith("CoverImage")
                        if (n == true) {
                            CoverImage = results[i].AttachmentFiles.results[k].ServerRelativeUrl;
                            break;
                        }
                    }
                    if (CoverImage == "")
                    {
                        CoverImage = '../ImageGallery/Default_AtAGlance.png';
                    }
                
                }
                else{
                    CoverImage = '../ImageGallery/Default_AtAGlance.png';
                }
            }
            else
            {            
                CoverImage =results[i].CoverImage;               
            }

            var Publishdate = formatDate(results[i].Publish_Date);
            var EmployeeName = results[i].EmployeeName;
            var Title = results[i].Title;
            var itemId = results[i].ID;
            var html = '';
            var LinkAddress = "../Pages/DetailsView.aspx?WebAppId=" + window.btoa(Logged_CompanyId) + "&ItemId=" + window.btoa(itemId) + "&type=" + window.btoa('General') + "&Source=" + _spPageContextInfo.webAbsoluteUrl;
            html += '<a href="#" class="announcements-button" data-toggle="modal" data-target="#Announcement_Alert" onclick="GetdatainModel(' + itemId + ');">Details</a>';
            flagHTML += '<div class="news-card-panel">'
            flagHTML += '<div class="news-heading-box">'
            if(webPartName == "Alert"){
              flagHTML += '<span class="news-head-text news-head-text-alert" style=""><i class="fa fa-thumb-tack" aria-hidden="true"></i>' + webPartName + '</span></div>'
            }
            else{
                flagHTML += '<span class="news-head-text panel-heading-bg-txt-clr" style=""><i class="fa fa-thumb-tack" aria-hidden="true"></i>' + webPartName + '</span></div>'
             }
            
            flagHTML += '<div class="news-card-panel-body">'
            flagHTML += '<div class="news-card-image-panel"><img src=' + CoverImage + ' alt="news image" data-themekey="#"></div>'
            flagHTML += '<div class="news-card-data-panel" style="cursor: pointer;"><p class="news-text-head-title" data-toggle="modal" data-target="#Announcement_Alert" onclick="GetdatainModel(' + itemId + ');">' + Title + '</p>'
            flagHTML += '<div class="news-card-data-panel1">' + Description + '</div>'
            flagHTML += '<div class="news-card-panel-footer">'
            flagHTML += '<div class="news-card-panel-footer-name" style=""><p> '+ CatogeryName+ '</p><p>' + EmployeeName + '</p><p>' + Publishdate + '</p></div>'
            flagHTML += '<div class="news-card-panel-footer-date">'
            flagHTML += html;
            flagHTML += '</div></div></div></div></div>'
        }
    }
    else {
        flagHTML += '<div class="null_case_web_box"><img src="../ImageGallery/no-pin.png"></div>';
        $('#flagIcon').addClass('my-pinned-box');
    }
    $('#flagIcon').append(flagHTML);

}

function setSeMorebtn() {
    var htmlseMore = '';
    if (response.length > 9) {
        htmlseMore += '<div class="col-sm-12 col-xs-12 seemore-box">'
        htmlseMore += '<div class="col-sm-6 col-xs-6 ma0 text-center pt5 pb5">'
        htmlseMore += '<a id="seemorebtn" class="timeline-extend" onclick="ReadTimeLine();"><span>See More</span></a>'
        htmlseMore += '</div>'
        htmlseMore += '</div>'
        $(".TimelineDesign").append(htmlseMore);

    }
}
