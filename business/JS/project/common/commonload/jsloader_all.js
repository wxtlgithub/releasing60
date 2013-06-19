/**
 * @author zhaoyanhua
 */
Ext.namespace('js.loadjs');
/****************************************************************************************权限管理*/
//===========功能权限管理
js.loadjs.loadpurviewrightinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/popedom/right/urllist.js";
    arr[1] = "JS/product/center/business/popedom/right/rightadd.js";
    arr[2] = "JS/product/center/business/popedom/right/rightupdate.js";
    arr[3] = "JS/product/center/business/popedom/right/rightdelete.js";
    arr[4] = "JS/product/center/business/popedom/right/rightinfo.js";
	var loader = new WXTL.Common.JsLoader('Js.Center.Purview.Right.info',node);
    loader.load(arr);
};

//===========部门管理
js.loadjs.loadpopedomdepartmentsinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/popedom/department/DepartmentInfo.js";
    arr[1] = "JS/project/center/business/popedom/department/DepartmentAdd.js";
    arr[2] = "JS/project/center/business/popedom/department/DepartmentUpdate.js";
    arr[3] = "JS/project/center/business/popedom/department/DepartmentDelete.js";
    arr[4] = "JS/project/center/business/popedom/department/DepartmentPermit.js";
    arr[5] = "JS/project/center/business/popedom/department/URLList.js";
    arr[6] = "JS/project/center/business/popedom/role/URLList.js";
    arr[7] = "JS/project/center/business/usergroup/urllist.js";
    arr[8] = "JS/project/center/system/product/urllist.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Popedom.Department.info', node);
    loader.load(arr);
};

//===========用户管理
js.loadjs.loadpopedomuserinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/popedom/user/UserInfo.js";
    arr[1] = "JS/project/center/business/popedom/user/UserAdd.js";
    arr[2] = "JS/project/center/business/popedom/user/UserUpdate.js";
    arr[3] = "JS/project/center/business/popedom/user/UserDelete.js";
    arr[4] = "JS/project/center/business/popedom/user/UserPermit.js";
    arr[5] = "JS/project/center/business/popedom/user/URLList.js";
    arr[6] = "JS/project/center/business/popedom/role/URLList.js";
    arr[7] = "JS/project/center/business/popedom/department/URLList.js";
    arr[8] = "JS/project/center/business/usergroup/urllist.js";
    arr[9] = "JS/project/center/system/product/urllist.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Popedom.User.info', node);
    loader.load(arr);
};

//===========角色管理
js.loadjs.loadpopedomroleinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/popedom/role/RoleInfo.js";
    arr[1] = "JS/project/center/business/popedom/role/RoleAdd.js";
    arr[2] = "JS/project/center/business/popedom/role/RoleUpdate.js";
    arr[3] = "JS/project/center/business/popedom/role/RoleDelete.js";
    arr[4] = "JS/project/center/business/popedom/role/RolePermit.js";
    arr[5] = "JS/project/center/business/popedom/role/RolePermitToDepart.js";
    arr[6] = "JS/project/center/business/popedom/role/RolePermitToUser.js";
    arr[7] = "JS/project/center/business/popedom/role/URLList.js";
    arr[8] = "JS/project/center/business/popedom/department/URLList.js";
    arr[9] = "JS/project/center/business/usergroup/urllist.js";
    arr[10] = "JS/project/center/business/popedom/user/URLList.js";
    arr[11] = "JS/project/center/business/popedom/role/RoleAdminAdd.js";
    arr[12] = "JS/project/center/business/popedom/role/RoleAdminUpdate.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Popedom.Role.info', node);
    loader.load(arr);
};

//===========EC角色管理
js.loadjs.loadpopedomecroleinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/popedom/ecrole/ECRoleInfo.js";
    arr[1] = "JS/project/center/business/popedom/ecrole/ECRoleAdd.js";
    arr[2] = "JS/project/center/business/popedom/ecrole/ECRoleUpdate.js";
    arr[3] = "JS/project/center/business/popedom/ecrole/ECRoleDelete.js";
    arr[4] = "JS/project/center/business/popedom/ecrole/URLList.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Popedom.ECRoleInfo.info', node);
    loader.load(arr);
};

/****************************************************************************************客户管理*/
//===========客户业务查询
js.loadjs.loadcustomerbusinessquery = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/customerbusiness/urllist.js";
    arr[1] = "JS/project/center/business/customerbusiness/customerbusinessquery.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Customer.CustomerBusiness.CustomerBusinessInfo', node);
    loader.load(arr);
    
};
//===========客户组管理

js.loadjs.loadbusinessusergroupinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/usergroup/urllist.js";
    arr[1] = "JS/project/center/business/usergroup/usergroupadd.js";
    arr[2] = "JS/project/center/business/usergroup/usergroupupdate.js";
    arr[3] = "JS/project/center/business/usergroup/usergroupdelete.js";
    arr[4] = "JS/project/center/business/usergroup/usergroupinfo.js";
    arr[5] = "JS/project/center/business/usergroup/usergroupmemberadd.js";
    arr[6] = "JS/project/center/business/usergroup/usergroupmemberdelete.js";
    arr[7] = "JS/project/center/business/usergroup/usergroupmemberCusDetails.js";
    arr[8] = "JS/project/center/business/usergroup/usergroupmemberOperatorDetails.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.UserGroup.userGroupInfo', node);
    loader.load(arr);
};

//=======操作记录查询
js.loadjs.loadcustomeroperatorloginfo = function(node){
	var arr = new Array();
    arr[0] = "JS/project/center/business/customeroperatorlog/urllist.js";
    arr[1] = "JS/project/center/business/customeroperatorlog/customeroperatorlogquery.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Customer.CustomerOperatorLog.OperatorLogInfo', node);
    loader.load(arr);
};

/****************************************************************************************短信管理*/
//===========上行查询
js.loadjs.loadsendSMSdepartmoinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/sendsms/moquery/urllist.js";
    arr[1] = "JS/project/center/business/sendsms/moquery/departmoinfo.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.SendSMS.DepartMoQuery.departmoinfo', node);
    loader.load(arr);
};
//===========上行查询2
js.loadjs.loadsendSMSselfdepartmoinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/sendsms/moquery/urllist.js";
    arr[1] = "JS/project/center/business/sendsms/moquery/selfdepartmoinfo.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.SendSMS.SelfDepartMoQuery.departmoinfo', node);
    loader.load(arr);
};

//===========下行查询
js.loadjs.loadsendSMSmtqueryinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/sendsms/mtquery/mtqueryinfo.js";
    arr[1] = "JS/product/center/business/sendsms/mtquery/urllist.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.SendSMS.MTQuery.MTQueryinfo', node);
    loader.load(arr);
};

//===========待发数据查询
js.loadjs.loadsendSMStaskqueryinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/sendsms/sendtask/sendtaskqueryinfo.js";
    arr[1] = "JS/product/center/business/sendsms/sendtask/urllist.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.SendSMS.SendTaskQuery.Queryinfo', node);
    loader.load(arr);
};

//===========发送任务查询
js.loadjs.loadsendSMSdepartsendqueryinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/sendsms/sendquery/urllist.js";
    arr[1] = "JS/project/center/business/sendsms/sendquery/departsendqueryinfo.js";
    arr[2] = "JS/project/center/business/sendsms/sendquery/departsenddetailsinfo.js";
    arr[3] = "JS/project/center/business/sendsms/sendquery/operatesms.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.SendSMS.DepartSendQuery.departSendQueryinfo', node);
    loader.load(arr);
    
};

//===========短信发送

js.loadjs.loadsendSMSsend = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/sendsms/send/urllist.js";
    arr[1] = "JS/project/center/business/sendsms/send/send.js";
    arr[2] = "JS/project/center/business/sendsms/send/SMSsend.js";
    arr[3] = "JS/project/center/business/sendsms/send/SMSDelete.js";
    arr[4] = "JS/project/center/business/sendsms/send/SMSsenddiy.js";
    arr[5] = "JS/project/center/business/sendsms/send/SMSTemplateinfo.js";
	arr[6] = "JS/project/center/business/sendsms/send/SMSTemplateinsert.js";
	arr[7] = "JS/project/center/business/sendsms/send/SMSTemplateupdate.js";
    arr[8] = "JS/project/center/business/sendsms/send/sendbycustomer.js";
	arr[9] = "JS/project/center/business/sendsms/send/sendbycustomerquery.js";
	arr[10] = "JS/project/center/business/sendsms/send/sendbyenterprise.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.SendSMS.Send.info', node);
    loader.load(arr);
    
};

js.loadjs.loadsendSMScolumnsend = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/sendsms/send/urllist.js";
    arr[1] = "JS/product/center/business/sendsms/send/columnsend.js";
    arr[2] = "JS/product/center/business/sendsms/send/columnSMSsend.js";
    arr[3] = "JS/product/center/business/sendsms/send/columnSMSDelete.js";
    arr[4] = "JS/product/center/business/sendsms/send/columnSMSreview.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.SendSMS.ColumnSend.Info', node);
    loader.load(arr);
    
};
//===========短信一审

js.loadjs.loadsendSMSfirstcheck = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/sendsms/smsfirstcheck/urllist.js";
    arr[1] = "JS/project/center/business/sendsms/smsfirstcheck/firstcheck.js";
    arr[2] = "JS/project/center/business/sendsms/smsfirstcheck/SMSSendUserGroupDetails.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.SendSMS.FirstCheck.info', node);
    loader.load(arr);    
};
//===========短信二审
js.loadjs.loadsendSMSsecondcheck = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/sendsms/smssecondcheck/urllist.js";
    arr[1] = "JS/project/center/business/sendsms/smssecondcheck/secondcheck.js";
    arr[2] = "JS/project/center/business/sendsms/smssecondcheck/SMSSendUserGroupDetails.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.SendSMS.SecondCheck.info', node);
    loader.load(arr);
};
//===========内部短信二审
js.loadjs.loadsendSMSintracompanycheck = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/sendsms/intracompanycheck/urllist.js";
    arr[1] = "JS/project/center/business/sendsms/intracompanycheck/intracompanycheck.js";
    arr[2] = "JS/project/center/business/sendsms/intracompanycheck/SMSSendUserGroupDetails.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.SendSMS.intracompanycheck.info', node);
    loader.load(arr);
};

/****************************************************************************************短信统计*/
//===========客户统计
js.loadjs.loadstatisticscustombydepartment = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/statistics/custom/urllist.js";
    arr[1] = "JS/product/center/business/statistics/custom/custombydepartment.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Statistics.CustomBydePartment.info',node);
    loader.load(arr);
};

//===========下行统计
js.loadjs.loadstatisticschargebysvc = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/statistics/mt/urllist.js";
    arr[1] = "JS/product/center/business/statistics/mt/chargebysvc.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Statistics.ChargeBysvc.info',node);
    loader.load(arr);
};

js.loadjs.loadstatisticsmtbycolumn = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/statistics/mt/urllist.js";
    arr[1] = "JS/product/center/business/statistics/mt/mtbycolumn.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Statistics.MtbyColumn.info',node);
    loader.load(arr);
};

js.loadjs.loadstatisticsmtbydepartment = function(node){
    var arr = new Array();
    //arr[0] = "JS/product/center/business/statistics/mt/urllist.js";
    arr[0] = "JS/product/center/business/statistics/mt/mtbydepartment.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Statistics.MtByDepartment.info',node);
    loader.load(arr);
};

js.loadjs.loadstatisticsmtbyproduct = function(node){
    var arr = new Array();
    //arr[0] = "JS/product/center/business/statistics/mt/urllist.js";
    arr[0] = "JS/product/center/business/statistics/mt/mtbyproduct.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Statistics.MtByProduct.info',node);
    loader.load(arr);
};
js.loadjs.loadstatisticsmtbycustomer = function(node){
    var arr = new Array();
    //arr[0] = "JS/product/center/business/statistics/mt/urllist.js";
    arr[0] = "JS/product/center/business/statistics/mt/mtbycustomer.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Statistics.MtByCustomer.info',node);
    loader.load(arr);
};

//===========白名单统计

js.loadjs.loadstatisticswhitelistbysvc = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/statistics/whitelist/urllist.js";
    arr[1] = "JS/product/center/business/statistics/whitelist/whitelistbysvc.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Statistics.WhitelistBysvc.info',node);
    loader.load(arr);
};

//===========白名单统计按照省份

js.loadjs.loadstatisticswhitelistbypvid = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/statistics/pvwhitelist/urllist.js";
    arr[1] = "JS/product/center/business/statistics/pvwhitelist/whitelistbypv.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Statistics.WhitelistBysvc.info',node);
    loader.load(arr);
};

//===========发送量按客户组统计

js.loadjs.loadstatisticsmtbyusergroup = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/statistics/mt/urllist.js";
    arr[1] = "JS/product/center/business/statistics/mt/mtbyusergroup.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Statistics.MtByUserGroup.info',node);
    loader.load(arr);
};

js.loadjs.loadchannelstatisticsday = function(node){
	  var arr = new Array();
	  arr[0] = "JS/product/center/business/statistics/smsChannel/urllist.js";
	  arr[1] = "JS/product/center/business/statistics/smsChannel/channelStatisticsDay.js";
	  var loader = new WXTL.Common.JsLoader('Js.Center.Statistics.ChannelStatisticsDay.info',node);
	  loader.load(arr);
};
js.loadjs.loadchannelstatisticsmonth = function(node){
	  var arr = new Array();
	  arr[0] = "JS/product/center/business/statistics/smsChannel/urllist.js";
	  arr[1] = "JS/product/center/business/statistics/smsChannel/channelStatisticsMonth.js";
	  var loader = new WXTL.Common.JsLoader('Js.Center.Statistics.ChannelStatisticsMonth.info',node);
	  loader.load(arr);
};
js.loadjs.loadchannelstatisticsyear = function(node){
	  var arr = new Array();
	  arr[0] = "JS/product/center/business/statistics/smsChannel/urllist.js";
	  arr[1] = "JS/product/center/business/statistics/smsChannel/channelStatisticsYear.js";
	  var loader = new WXTL.Common.JsLoader('Js.Center.Statistics.ChannelStatisticsYear.info',node);
	  loader.load(arr);
};
/****************************************************************************************彩信管理*/
//===========彩信管理
js.loadjs.loadsendMMSinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/sendmms/mms/mmsinfo.js";
    arr[1] = "JS/project/center/business/sendmms/mms/mmsadd.js";
    arr[2] = "JS/project/center/business/sendmms/mms/mmsupdate.js";
    arr[3] = "JS/project/center/business/sendmms/mms/mmsdelete.js";
    arr[4] = "JS/project/center/business/sendmms/mms/urllist.js";
    arr[5] = "JS/product/center/business/sendmms/send/MMSsendPreview.js";
    arr[6] = "JS/product/center/business/sendmms/send/urllist.js";
    arr[7] = "JS/project/center/business/sendmms/mms/mmscopy.js";
    arr[8] = "JS/project/center/business/sendmms/mms/mmscopyinfo.js";
    arr[9] = "JS/product/center/business/sendmms/send/MMSSendTest.js";
    arr[10] = "JS/project/center/business/sendmms/mms/mmsresourceupload.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.SendMMS.MMS.MMSinfo', node);
    loader.load(arr);
};

//===========彩信发送
js.loadjs.loadsendMMSsend = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/sendmms/send/MMSsendinfo.js";
    arr[1] = "JS/project/center/business/sendmms/send/mmsinfo.js";
    arr[2] = "JS/project/center/business/sendmms/send/mmssenddiy.js";
    arr[3] = "JS/project/center/business/sendmms/send/MMSsenddelete.js";
    arr[4] = "JS/project/center/business/sendmms/send/MMSsendPreview.js";
    arr[5] = "JS/project/center/business/sendmms/send/urllist.js";
    arr[6] = "JS/product/center/business/sendmms/mms/urllist.js";
    arr[7] = "JS/project/center/business/sendmms/send/mmssend.js";
    arr[8] = "JS/project/center/business/sendmms/send/mmsinfodiy.js";
    arr[9] = "JS/project/center/business/sendmms/send/mmssendupdate.js";
    arr[10] = "JS/project/center/business/sendmms/send/mmssendupdatediy.js";
    arr[11] = "JS/project/center/business/sendmms/send/MMSSendContent.js";
    arr[12] = "JS/project/center/business/sendmms/send/MMSSendTest.js";
    arr[13] = "JS/project/center/business/sendmms/send/mmsresourceupload.js";
    //arr[12] = "JS/product/center/business/sendmms/send/MMSSendList.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.SendMMS.Send.info', node);
    loader.load(arr);
    
};

//===========彩信下行查询
js.loadjs.loadsendMMSMMSmtqueryinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/sendmms/mtquery/urllist.js";
    arr[1] = "JS/product/center/business/sendmms/mtquery/MMSmtqueryinfo.js";
    arr[2] = "JS/product/center/business/sendmms/mms/urllist.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.SendMMS.MMSmtqueryinfo.info', node);
    loader.load(arr);
    
    
};
//===========彩信上行查询
js.loadjs.loadsendMMSMMSdepartmoinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/sendmms/moquery/urllist.js";
    arr[1] = "JS/project/center/business/sendmms/moquery/MMSdepartmoinfo.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.SendMMS.MMSdepartmoinfo.departmoinfo', node);
    loader.load(arr);
    
    
};


//===========彩信发送查询
js.loadjs.loadsendMMSsendqueryinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/sendmms/sendquery/urllist.js";
    arr[1] = "JS/product/center/business/sendmms/sendquery/MMSsendquery.js";
    arr[2] = "JS/product/center/business/sendmms/sendquery/mmssenddetails.js";
    arr[3] = "JS/product/center/business/sendmms/send/MMSsendPreview.js";
    arr[4] = "JS/product/center/business/sendmms/mms/urllist.js";
    arr[5] = "JS/product/center/business/sendmms/send/urllist.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.SendMMS.MMSSendQuery.info', node);
    loader.load(arr);
    
};
//===========系统彩信发送查询
js.loadjs.loadsendMMSdepartsendqueryinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/sendmms/query/urllist.js";
    arr[1] = "JS/product/center/business/sendmms/query/MMSsyssendquery.js";
    arr[2] = "JS/product/center/business/sendmms/query/mmssenddetails.js";
    arr[3] = "JS/product/center/business/sendmms/send/MMSsendPreview.js";
    arr[4] = "JS/product/center/business/sendmms/mms/urllist.js";
    arr[5] = "JS/product/center/business/sendmms/send/urllist.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.SendMMS.MMSsyssendquery.info', node);
    loader.load(arr);
    
};
//===========彩信一审

js.loadjs.loadsendMMSfirstcheck = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/sendmms/mmsfirstcheck/urllist.js";
    arr[1] = "JS/project/center/business/sendmms/mmsfirstcheck/firstcheckmanage.js";
    arr[2] = "JS/project/center/business/sendmms/mmsfirstcheck/MMSfirstcheckinfo.js";
    arr[3] = "JS/product/center/business/sendmms/send/MMSsendPreview.js";
    arr[4] = "JS/product/center/business/sendmms/mms/urllist.js";
    arr[5] = "JS/product/center/business/sendmms/send/urllist.js";
    arr[6] = "JS/project/center/business/sendmms/mmsfirstcheck/MMSSendUserGroupDetails.js";
    
    var loader = new WXTL.Common.JsLoader('Js.Center.SendMMS.FirstCheckManage.info', node);
    loader.load(arr);
    
};
//===========彩信信二审
js.loadjs.loadsendMMSsecondcheck = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/sendmms/mmssecondcheck/urllist.js";
    arr[1] = "JS/project/center/business/sendmms/mmssecondcheck/secendcheckmanage.js";
    arr[2] = "JS/project/center/business/sendmms/mmssecondcheck/MMSsecendcheckinfo.js";
    arr[3] = "JS/product/center/business/sendmms/send/MMSsendPreview.js";
    arr[4] = "JS/product/center/business/sendmms/mms/urllist.js";
    arr[5] = "JS/product/center/business/sendmms/send/urllist.js";
    arr[6] = "JS/project/center/business/sendmms/mmssecondcheck/MMSSendUserGroupDetails.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.SendMMS.SecendCheckManage.info', node);
    loader.load(arr);
    
};
/****************************************************************************************彩信统计*/
//===========彩信发送量按部门统计
js.loadjs.loadMMSStatisticsMtByDeparment = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/mmsstatistics/MMSmt/URLList.js";
    arr[1] = "JS/product/center/business/mmsstatistics/MMSmt/MMSmtByDepartment.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.MMSStatistics.MMSmtByDepartment.info', node);
    loader.load(arr);
};

//===========彩信发送量按通道组统计
js.loadjs.loadMMSStatisticsMtByProduct = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/mmsstatistics/MMSmt/URLList.js";
    arr[1] = "JS/product/center/business/mmsstatistics/MMSmt/MMSmtByProduct.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.MMSStatistics.MMSmtByProduct.info', node);
    loader.load(arr);
};

//===========彩信发送量按用户统计
js.loadjs.loadMMSStatisticsMtByCustomer = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/mmsstatistics/MMSmt/URLList.js";
    arr[1] = "JS/product/center/business/mmsstatistics/MMSmt/MMSmtByCustomer.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.MMSStatistics.MMSmtByCustomer.info', node);
    loader.load(arr);
};

//===========彩信发送量按客户组统计

js.loadjs.loadmmsstatisticsmtbyusergroup = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/mmsstatistics/MMSmt/URLList.js";
    arr[1] = "JS/product/center/business/mmsstatistics/MMSmt/MMSmtByUserGroup.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.MMSStatistics.MMSmtByUserGroup.info', node);
    loader.load(arr);
};

js.loadjs.loadmmschannelstatisticsday = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/mmsstatistics/mmsChannel/urllist.js";
    arr[1] = "JS/product/center/business/mmsstatistics/mmsChannel/channelStatisticsDay.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Statistics.MMSChannelStatisticsDay.info',node);
    loader.load(arr);
};
js.loadjs.loadmmschannelstatisticsmonth = function(node){
	  var arr = new Array();
	  arr[0] = "JS/product/center/business/mmsstatistics/mmsChannel/urllist.js";
	  arr[1] = "JS/product/center/business/mmsstatistics/mmsChannel/channelStatisticsMonth.js";
	  var loader = new WXTL.Common.JsLoader('Js.Center.Statistics.MMSChannelStatisticsMonth.info',node);
	  loader.load(arr);
};
js.loadjs.loadmmschannelstatisticsyear = function(node){
	  var arr = new Array();
	  arr[0] = "JS/product/center/business/mmsstatistics/mmsChannel/urllist.js";
	  arr[1] = "JS/product/center/business/mmsstatistics/mmsChannel/channelStatisticsYear.js";
	  var loader = new WXTL.Common.JsLoader('Js.Center.Statistics.MMSChannelStatisticsYear.info',node);
	  loader.load(arr);
};
/****************************************************************************************EC管理*/
//========EC管理
js.loadjs.loadbusinessECmanageinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/ECmanage/urllist.js";
    arr[1] = "JS/project/center/business/ECmanage/ECmanageAdd.js";
    arr[2] = "JS/project/center/business/ECmanage/ECmanageInfo.js";
    arr[3] = "JS/project/center/business/ECmanage/ECmanageDetail.js";
    arr[4] = "JS/project/center/business/ECmanage/ECmanageUpdate.js";
    arr[5] = "JS/project/center/business/ECmanage/ECmanageSvcInfo.js";
    arr[6] = "JS/project/center/business/ECmanage/ECmanageSvcAdd.js";
    arr[7] = "JS/project/center/business/ECmanage/ECmanageSvcDelete.js";
    arr[8] = "JS/project/center/business/ECmanage/ECSigntureInfo.js";
    arr[9] = "JS/project/center/business/ECmanage/ECSigntureAdd.js";
    arr[10] = "JS/project/center/business/ECmanage/ECSigntureUpdate.js";
    arr[11] = "JS/project/center/business/ECmanage/ECSigntureDelete.js";
    arr[12] = "JS/project/center/business/ECmanage/ECSigntureAdds.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.ECmanage.info',node);
    loader.load(arr);
};

//EC预付费管理
js.loadjs.loadbusinessecprepaidinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/ecprepaid/urllist.js";
    arr[1] = "JS/project/center/business/ecprepaid/TlEcPrepaidinfo.js";
    arr[2] = "JS/project/center/business/ecprepaid/TlEcPrepaidadd.js";
    arr[3] = "JS/project/center/business/ecprepaid/TlEcPrepaidUpdate.js";
    arr[4] = "JS/project/center/business/ecprepaid/TlEcPrepaidrecharge.js";
    arr[5] = "JS/project/center/business/ecprepaid/TlEclogquery.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.ECPrepaid.info',node);
    loader.load(arr);
};
//=========EC查询
js.loadjs.loadbusinessecmanagequery = function(node){
	var arr = new Array();
    arr[0] = "JS/project/center/business/ECmanage/urllist.js";
    arr[1] = "JS/project/center/business/ECmanage/ecmanagequery.js";
    arr[2] = "JS/project/center/business/ECmanage/ECmanageSvcInfo.js";
    arr[3] = "JS/project/center/business/ECmanage/ECmanageDetail.js";
    arr[4] = "JS/project/center/business/ECmanage/ECmanageSvcAdd.js";
    arr[5] = "JS/project/center/business/ECmanage/ECmanageSvcDelete.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.ECmanage.query',node);
    loader.load(arr);
};
/****************************************************************************************黑白名单管理*/
//==========黑名单信息查询
js.loadjs.loadblackqueryinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/queryblacklist/urllist.js";
    arr[1] = "JS/product/center/business/queryblacklist/queryblacklistinfo.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.BlackListQuery.BlackListQueryInfo', node);
    loader.load(arr);
};

//===========黑名单管理
js.loadjs.loadbusinessblacklistaddinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/blacklist/urllist.js";
    arr[1] = "JS/product/center/business/blacklist/blacklistadd.js";
    arr[3] = "JS/product/center/business/blacklist/blacklistaddinfo.js";
    arr[2] = "JS/product/center/business/blacklist/blacklistdelete.js";
    arr[4] = "JS/product/center/business/blacklist/blacklistdeleteinfo.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.BlacklistAdd.info', node);
    loader.load(arr);
};
//===========用户黑名单管理

js.loadjs.loadbusinessMyblacklistinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/myblacklist/urllist.js";
    arr[1] = "JS/product/center/business/myblacklist/myblacklistadd.js";
    arr[2] = "JS/product/center/business/myblacklist/myblacklistdelete.js";
    arr[3] = "JS/product/center/business/myblacklist/myblacklistinfo.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.Myblacklist.info', node);
    loader.load(arr);
    
};
//===========通道黑名单管理
js.loadjs.loadbusinesssvcblacklistaddinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/svcblacklist/urllist.js";
    arr[1] = "JS/product/center/business/svcblacklist/svcblacklistadd.js";
    arr[3] = "JS/product/center/business/svcblacklist/svcblacklistaddinfo.js";
    arr[2] = "JS/product/center/business/svcblacklist/svcblacklistdelete.js";
    arr[4] = "JS/product/center/business/svcblacklist/svcblacklistdeleteinfo.js";
    arr[5] = "JS/product/center/business/svcblacklist/svcblacklistgwnumdetails.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.SvcBlacklistAdd.info', node);
    loader.load(arr);
};

//===========白名单管理

js.loadjs.loadbusinesswhitelistaddinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/whitelist/urllist.js";
    arr[1] = "JS/project/center/business/whitelist/whitelistadd.js";
    arr[2] = "JS/project/center/business/whitelist/whitelistdelete.js";
    arr[3] = "JS/project/center/business/whitelist/whitelistaddinfo.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.WhitelistAdd.info', node);
    loader.load(arr);
};
/****************************************************************************************平台系统管理*/
//===========关键字管理

js.loadjs.loadsystemdirtywordinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/dirtyword/urllist.js";
    arr[1] = "JS/product/center/business/dirtyword/dirtywordadd.js";
    arr[2] = "JS/product/center/business/dirtyword/dirtyworddelete.js";
    arr[3] = "JS/product/center/business/dirtyword/dirtywordinfo.js";
    arr[4] = "JS/product/center/business/dirtyword/dirtywordupdate.js";
    arr[5] = "JS/product/center/business/dirtyword/dirtywordimprot.js";
    arr[6] = "JS/product/center/business/dirtywordtype/urllist.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.System.DirtyWord.dirtyWordInfo', node);
    loader.load(arr);
};
//=========== 通道敏感词管理
js.loadjs.loadsystemsvcdirtywordinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/svcdirtyword/urllist.js";
    arr[1] = "JS/product/center/business/svcdirtyword/svcdirtywordadd.js";
    arr[2] = "JS/product/center/business/svcdirtyword/svcdirtyworddelete.js";
    arr[3] = "JS/product/center/business/svcdirtyword/svcdirtywordinfo.js";
    arr[4] = "JS/product/center/business/svcdirtyword/svcdirtywordupdate.js";
    arr[5] = "JS/product/center/business/svcdirtyword/svcdirtywordimprot.js";
    arr[6] = "JS/product/center/business/svcdirtyword/urllist.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.System.SvcDirtyWord.SvcDirtyWordInfo', node);
    loader.load(arr);
};
//===========操作日志管理
js.loadjs.loadsystemoperatorloginfo = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/operatorlog/urllist.js";
    arr[1] = "JS/product/center/business/operatorlog/operatorloginfo.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.System.OperatorLog.operatorloginfo', node);
    loader.load(arr);
};
//===========公告信息
js.loadjs.loadbusinessnoticemoreinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/system/notice/urllist.js";
    arr[1] = "JS/product/center/system/notice/noticeinfo.js";
    arr[2] = "JS/product/center/system/notice/noticeDetail.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.System.Notice.noticemsgmore.info', node);
    loader.load(arr);
};
//===========公告信息管理
js.loadjs.loadbusinessnoticeinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/system/notice/urllist.js";
    arr[1] = "JS/product/center/system/notice/noticemsginfo.js";
    arr[2] = "JS/product/center/system/notice/noticemsgadd.js";
    arr[3] = "JS/product/center/system/notice/noticemsgdelete.js";
    arr[4] = "JS/product/center/system/notice/noticemsgupdate.js";
    arr[5] = "JS/product/center/system/notice/noticeDetail.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.System.Notice.noticemsg.info', node);
    loader.load(arr);
};
//===========信息修改
js.loadjs.loadsystemupdatepwd = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/business/updatepassword/updatepwd.js";
    arr[1] = "JS/product/center/business/updatepassword/urllist.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.System.UpdatePassword.updatePwdInfo', node);
    loader.load(arr);
};
//===========系统配置
js.loadjs.loadsystemconfig = function(node){
	var arr = new Array();
    arr[0] = "JS/product/center/business/systemlog/SystemSet.js";
    arr[1] = "JS/product/center/business/systemlog/urllist.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.System.SystemLog.SystemSet.Info',node);
    loader.load(arr);
};

/****************************************************************************************路由管理*/
//===========网关管理
js.loadjs.loadbusinessgatewayinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/system/gateway/urllist.js";
    arr[1] = "JS/product/center/system/inst/urllist.js";
    arr[2] = "JS/product/center/system/operator/urllist.js";
    arr[3] = "JS/project/center/system/gateway/gatewayadd.js";
    arr[4] = "JS/project/center/system/gateway/gatewayupdate.js";
    arr[5] = "JS/project/center/system/gateway/gatewaydelete.js";
    arr[6] = "JS/project/center/system/gateway/gatewayinfo.js";
    arr[7] = "JS/project/center/system/gateway/gatewayset.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.Gateway.gatewayinfo', node);
    loader.load(arr);
};

//===========程序管理

js.loadjs.loadbusinessprograminfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/system/program/URLList.js";
    arr[1] = "JS/project/center/system/program/ProgramAdd.js";
    arr[2] = "JS/project/center/system/program/ProgramDelete.js";
    arr[3] = "JS/project/center/system/program/ProgramInfo.js";
    arr[4] = "JS/project/center/system/program/ProgramUpdate.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.Program.ProgramInfo', node);
    loader.load(arr);
    
};
//===========通道组管理
js.loadjs.loadbusinessproductinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/system/product/urllist.js";
    arr[1] = "JS/project/center/system/product/productadd.js";
    arr[2] = "JS/project/center/system/product/productupdate.js";
    arr[3] = "JS/project/center/system/product/productdelete.js";
    arr[4] = "JS/project/center/system/product/productinfo.js";
    
//    arr[1] = "JS/project/center/system/product/productpolicy.js";
//    arr[2] = "JS/project/center/system/product/ppmainbackupadd.js";
//    arr[3] = "JS/project/center/system/product/ppmainbackupupdate.js";
//    arr[4] = "JS/project/center/system/product/ppmainbackupdelete.js";
//    arr[5] = "JS/project/center/system/product/ppbalancedelete.js";
//    arr[6] = "JS/project/center/system/product/ppbalanceadd.js";
//    arr[7] = "JS/project/center/system/product/ppbalanceupdate.js";
//    arr[12] = "JS/project/center/system/product/productpermitsvc.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.Product.productinfo', node);
    loader.load(arr);
};

//===========通道管理

js.loadjs.loadbusinessservicecodeinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/system/servicecode/urllist.js";
    arr[1] = "JS/project/center/system/servicecode/servicecodeadd.js";
    arr[2] = "JS/project/center/system/servicecode/servicecodeupdate.js";
    arr[3] = "JS/project/center/system/servicecode/servicecodedelete.js";
    arr[4] = "JS/project/center/system/servicecode/servicecodeinfo.js";
    arr[5] = "JS/project/center/system/servicecode/serviceinfo.js";
    
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.ServiceCode.serviceCodeInfo', node);
    loader.load(arr);
};
//===========通道批量替换
js.loadjs.loadbusinesssvcbatchupdateinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/system/servicecode/urllist.js";
    arr[1] = "JS/project/center/system/servicecode/svcbatchupanddowninfo.js";
    arr[2] = "JS/project/center/system/servicecode/svcbatchupdate.js";
    arr[3] = "JS/project/center/business/ECmanage/urllist.js";
    arr[4] = "JS/project/center/business/ECmanage/ECmanageSvcInfo.js";
    arr[5] = "JS/project/center/business/ECmanage/ECmanageSvcAdd.js";
    arr[6] = "JS/project/center/business/ECmanage/ECmanageSvcDelete.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.SvcBatchUpAndDownInfo', node);
    loader.load(arr);
};

//===========子通道查询

js.loadjs.loadbusinessserviceinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/system/servicecode/urllist.js";
    arr[1] = "JS/project/center/system/servicecode/servicecodeadd.js";
    arr[2] = "JS/project/center/system/servicecode/servicecodeupdate.js";
    arr[3] = "JS/project/center/system/servicecode/servicecodedelete.js";
    arr[4] = "JS/project/center/system/servicecode/servicecodeinfo.js";
    arr[5] = "JS/project/center/system/servicecode/serviceinfo.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.ServiceInfo.func', node);
    loader.load(arr);
};


//===========上行路由管理

js.loadjs.loadbusinessmorouterinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/system/morouter/URLList.js";
    arr[1] = "JS/project/center/system/morouter/MORouterAdd.js";
    arr[2] = "JS/project/center/system/morouter/MORouterDelete.js";
    arr[3] = "JS/project/center/system/morouter/MORouterInfo.js";
    arr[4] = "JS/project/center/system/morouter/MORouterUpdate.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.MORouter.info', node);
    loader.load(arr);
    
};
//===========生效管理

js.loadjs.loadbusinesstakeeffectinfo = function(node){
    var arr = new Array();
    arr[0] = "productJS/center/business/takeeffect/TakeEffectInfo.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.TakeEffect.TakeEffectInfo', node);
    loader.load(arr);
    
};
//===========特殊手机号码管理
js.loadjs.loadspecialmobile = function(node){
	var arr = new Array();
    arr[0] = "JS/project/center/system/specialmobile/TlSpecialmobileadd.js";
    arr[1] = "JS/project/center/system/specialmobile/TlSpecialmobileinfo.js";
    arr[2] = "JS/project/center/system/specialmobile/TlSpecialmobiledelete.js";
    arr[3] = "JS/project/center/system/specialmobile/urllist.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.System.SpecialMobile.info',node);
    loader.load(arr);
};
/****************************************************************************************系统配置管理*/
//===========系统配置管理
js.loadjs.loadsystemdeployment = function(node){
	var arr = new Array();
    arr[0] = "JS/product/center/system/deployment/urllist.js";
    arr[1] = "JS/product/center/system/deployment/NodeInfo.js";
    arr[2] = "JS/product/center/system/deployment/ModuleConfig.js";
    arr[3] = "JS/product/center/system/deployment/ModuleItemConfig.js";
    arr[4] = "JS/product/center/system/deployment/NodeAdd.js";
    arr[5] = "JS/product/center/system/deployment/NodeUpdate.js";
    arr[6] = "JS/product/center/system/deployment/NodeDelete.js";
    arr[7] = "JS/product/center/system/deployment/NodeConfig.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.System.Deployment.Node.info', node);
    loader.load(arr);
};

/****************************************************************************************监控报警*/
//===========监控报警信息
js.loadjs.loadalertinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/system/alert/urllist.js";
    arr[1] = "JS/project/center/system/alert/AlertInfo.js";
    arr[2] = "JS/project/center/system/alert/AlertGatewaySet.js";
    arr[3] = "JS/project/center/system/alert/AlertReponseSet.js";
    arr[4] = "JS/project/center/system/alert/AlertReportSet.js";
    arr[5] = "JS/project/center/system/alert/AlertDelaySet.js";
    arr[6] = "JS/project/center/system/alert/AlertMailSet.js";
    arr[7] = "JS/project/center/system/alert/AlertMobileSet.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Alert.AlertInfo.Info', node);
    loader.load(arr);
};

//===========客户端网关监控管理
js.loadjs.loadclientgatewaymonitorinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/system/clientgatewaymonitor/urllist.js";
    arr[1] = "JS/product/center/system/clientgatewaymonitor/ClientGatewayMonitor.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Monitor.ClientMonitorSet.Info', node);
    loader.load(arr);
};

js.loadjs.loadclientmonitorset = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/system/clientgatewaymonitor/ClientMonitorSet.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Monitor.ClientMonitorSet.Info', node);
    loader.load(arr);
    ;
};
//===========数据库报警配置
js.loadjs.loaddbmonitorsetinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/system/clientgatewaymonitor/urllist.js";
    arr[1] = "JS/product/center/system/clientgatewaymonitor/DBMonitorSet.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Monitor.DBMonitor.DBMonitorSet.Info', node);
    loader.load(arr);
};
//===========通道监控
js.loadjs.loadProductMonitor = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/system/productmonitor/productMonitorInfo.js";
    arr[1] = "JS/product/center/system/productmonitor/urllist.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.System.ProductMonitor.info', node);
    loader.load(arr);
};
//===========模块和组件监控管理
js.loadjs.loadclientsysmonitorinfo = function(node){
    var arr = new Array();
	arr[0] = "JS/project/center/system/sysmonitor/urllist.js";
    arr[1] = "JS/project/center/system/sysmonitor/SysMontiorInfo.js";
    arr[2] = "JS/project/center/system/sysmonitor/MonitorNode.js";		
    arr[3] = "JS/project/center/system/sysmonitor/handlespeedmonitor.js";	
    arr[4] = "JS/project/center/system/sysmonitor/viewvaliddata.js";    
    var loader = new WXTL.Common.JsLoader('Js.Center.Monitor.SysMonitor.MonitorNode.info',node);
    loader.load(arr);
};
//===========Hub数据查询
js.loadjs.loadhubdataqueryinfo = function(node){
    var arr = new Array();
	arr[0] = "JS/product/center/system/hubdataquery/urllist.js";
    arr[1] = "JS/product/center/system/hubdataquery/hubdataqueryinfo.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.System.HubDataQuery.info',node);
    loader.load(arr);
};

//===========Hub数据查询
js.loadjs.loadhubdataqueryinfo = function(node){
    var arr = new Array();
	arr[0] = "JS/product/center/system/hubdataquery/urllist.js";
    arr[1] = "JS/product/center/system/hubdataquery/hubdataqueryinfo.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.System.HubDataQuery.info',node);
    loader.load(arr);
};
/****************************************************************************************短彩统计*/
//============短彩统计 按通道组
js.loadjs.loadYXTStatisticsMtByProductinfo = function(node){
	var arr = new Array();    
    arr[0] = "JS/project/center/business/yxtstatistics/product/urllist.js";
    arr[1] = "JS/project/center/business/yxtstatistics/product/mtbyproduct.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.YXTStatistics.mtByProduct.info',node);
    loader.load(arr);
};
//============短彩统计 按部门
js.loadjs.loadYXTStatisticsMtByDepartmentinfo = function(node){
	var arr = new Array();    
    arr[0] = "JS/project/center/business/yxtstatistics/department/urllist.js";
    arr[1] = "JS/project/center/business/yxtstatistics/department/mtbydepartment.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.YXTStatistics.mtByDepartment.info',node);
    loader.load(arr);
};
//============短彩统计 按用户
js.loadjs.loadYXTStatisticsMtByCustomerinfo = function(node){
	var arr = new Array();    
    arr[0] = "JS/project/center/business/yxtstatistics/customer/urllist.js";
    arr[1] = "JS/project/center/business/yxtstatistics/customer/mtbycustomer.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.YXTStatistics.mtByCustomer.info',node);
    loader.load(arr);
};
/********************************************************************************************日常查询*/
//============按状态报告查询
js.loadjs.loadReportQueryinfo = function(node){
	var arr = new Array();    
    arr[0] = "JS/project/center/business/query/reportquery/urllist.js";
    arr[1] = "JS/project/center/business/query/reportquery/reportqueryinfo.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.ReportQuery.info',node);
    loader.load(arr);
};
//============按内容查询
js.loadjs.loadContentQueryinfo = function(node){
	var arr = new Array();    
    arr[0] = "JS/project/center/business/query/contentquery/urllist.js";
    arr[1] = "JS/project/center/business/query/contentquery/contentqueryinfo.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.ContentQuery.info',node);
    loader.load(arr);
};
//============号码提取
js.loadjs.loadExtractNumberinfo = function(node){
	var arr = new Array();    
    arr[0] = "JS/project/center/business/query/extractnumber/urllist.js";
    arr[1] = "JS/project/center/business/query/extractnumber/extractnumber.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.ExtractNumber.info',node);
    loader.load(arr);
};
/****************************************************************************************短彩汇总统计*/
//===========按运营商汇总统计
js.loadjs.loadYXTStatisticsByOperator = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/projectstatistics/statisticsbyoperator/urlist.js";
    arr[1] = "JS/project/center/business/projectstatistics/statisticsbyoperator/statisticbyoperator.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.projectstatistics.statisticbyoperator.info',node);
    loader.load(arr);
};
//===========按地区汇总统计
js.loadjs.loadYXTStatisticsByArea= function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/projectstatistics/statisticbyarea/urlist.js";
    arr[1] = "JS/project/center/business/projectstatistics/statisticbyarea/statisticbyarea.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.projectstatistics.statisticbyarea.info',node);
    loader.load(arr);
};
//===========按客户汇总统计
js.loadjs.loadYXTStatisticsByCustomer = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/projectstatistics/statisticbycustomer/urlist.js";
    arr[1] = "JS/project/center/business/projectstatistics/statisticbycustomer/statisticbycustomer.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.projectstatistics.statisticbycust.info',node);
    loader.load(arr);
};

//===========按通道汇总统计
js.loadjs.loadYXTStatisticsBySvc = function(node){
    var arr = new Array();
    arr[0] = "JS/project/center/business/projectstatistics/statisticbysvc/urlist.js";
    arr[1] = "JS/project/center/business/projectstatistics/statisticbysvc/statisticbysvc.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.Business.projectstatistics.statisticbysvc.info',node);
    loader.load(arr);
};

/********************************************************************************************其他平台数据管理*/
//============其他平台客户管理
js.loadjs.loadOtherECinfo = function(node){
	var arr = new Array();
	arr[0] = "JS/project/center/business/otherec/urllist.js";
	arr[1] = "JS/project/center/business/otherec/TlOtherecInfoadd.js";
	arr[2] = "JS/project/center/business/otherec/TlOtherecInfoinfo.js";
	arr[3] = "JS/project/center/business/otherec/TlOtherecInfodetail.js";
	arr[4] = "JS/project/center/business/otherec/TlOtherecInfoupdate.js";
	arr[5] = "JS/project/center/business/otherec/TlOtherecInfodelete.js";
	var loader = new WXTL.Common.JsLoader('Js.Center.Business.OtherEC.OtherMana.tlotherecinfoinfo',node);
	loader.load(arr);
};
//============其他平台数据管理
js.loadjs.loadOtherDatainfo = function(node){
	var arr = new Array();    
	arr[0] = "JS/project/center/business/otherec/urllist.js";
	arr[1] = "JS/project/center/business/otherec/otherdatainfo.js";
	arr[2] = "JS/project/center/business/otherec/otherdataimport.js";
	arr[3] = "JS/project/center/business/otherec/otherdataupdate.js";
	var loader = new WXTL.Common.JsLoader('Js.Center.OtherEC.OtherData.info',node);
	loader.load(arr);
};
//=======接口审核
js.loadjs.loadClientSmsQueryinfo = function(node){
	var arr = new Array(); 
	arr[0] ="JS/project/center/business/clientsms/clientsmsquery/urllist.js";
	arr[1] ="JS/project/center/business/clientsms/clientsmsquery/clientsmsinfo.js";
	var loader =  new WXTL.Common.JsLoader('Js.Center.ClientSMS.ClientSMSQuery.clientsmsinfo',node);
	loader.load(arr);
};

js.loadjs.loadClientSmsCheckinfo = function(node){
	var arr = new Array(); 
	arr[0] ="JS/project/center/business/clientsms/clientsmscheck/urllist.js";
	arr[1] ="JS/project/center/business/clientsms/clientsmscheck/clientsmscheckinfo.js";
	var loader =  new WXTL.Common.JsLoader('Js.Center.ClientSMS.ClientSMSCheck.clientsmscheckinfo',node);
	loader.load(arr);
};
//==========网元分布式配置管理
js.loadjs.loadbusinesselementinfo = function(node){
    var arr = new Array();
    arr[0] = "JS/product/center/system/element/urllist.js";
    arr[1] = "JS/product/center/system/element/elementinfo.js";
    arr[2] = "JS/product/center/system/element/elementadd.js";
    arr[3] = "JS/product/center/system/element/elementupdate.js";
    var loader = new WXTL.Common.JsLoader('Js.Center.System.Element.elementInfo', node);
    loader.load(arr);
};