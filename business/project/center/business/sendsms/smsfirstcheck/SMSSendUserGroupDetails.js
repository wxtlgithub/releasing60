Ext.namespace("Js.Center.SendSMS.SMSSendUserGroupDetails");
  
Js.Center.SendSMS.SMSSendUserGroupDetails.func = function(value) {
	//=============================================================定义统计Grid相关 
	//分页 每页显示数量
	var pageSizeSum = 12;
	//========================定义Grid数据
	Js.Center.SendSMS.SMSSendUserGroupDetails.UserGroupGridStore = new WXTL.Widgets.CommonData.GroupingStore({
		proxy : new Ext.data.HttpProxy({
			url : Js.Center.SendSMS.YXTSmsContentURL,
			method : "POST"
		}),
		reader : new Ext.data.JsonReader({
			fields : ["numusergroupid", "vc2usergroupname"],
			root : "data",
			id : "numusergroupid",
			totalProperty : "totalCount"
		}),
		sortInfo : {
			field : 'numusergroupid',
			direction : 'DESC'
		},//解决分组无效代码
		baseParams : {
			flag : 'queryusergroupdetailbycontentid',
			smscontentid : value
		}
	});
	Js.Center.SendSMS.SMSSendUserGroupDetails.UserGroupGridStore.load({
		params : {
			start : 0,
			limit : pageSizeSum
		}
	});
	//==============================================================列选择模式
	var smSum = new Ext.grid.CheckboxSelectionModel({
		dataIndex : "numcontentid"
	});
	//==============================================================列头
	var cmSum = new Ext.grid.ColumnModel([{
		header : "客户组编号",
		tooltip : "客户组编号",
		dataIndex : "numusergroupid",
		sortable : true
	}, {
		header : "客户组名称",
		tooltip : "客户组名称",
		dataIndex : "vc2usergroupname",
		sortable : true
	}]);

	//==============================================================定义grid
	var sumMMSSsendGrid = new WXTL.Widgets.CommonGrid.GridPanel({
		title : '客户组列表',
		anchor : '100% 100%',
		pageSize : pageSizeSum,
		store : Js.Center.SendSMS.SMSSendUserGroupDetails.UserGroupGridStore,
		needMenu : false,
		needRightMenu : false,
		sm : smSum,
		cm : cmSum
	});
	//=============================定义主窗体
	var mainPanel = new Ext.form.FormPanel({});
	var mainForm = mainPanel.getForm();
	Js.Center.SendSMS.SMSSendUserGroupDetails.SMSsendUserGroupDetailsWindow = new WXTL.Widgets.CommonWindows.Window(
	{
		title : "客户组详情",
		width : 664,
		height : 400,
		layout : 'form',
		mainForm : mainForm,
		autoScroll : false,
		needButtons : false,
		items : [sumMMSSsendGrid],
		buttons : [new Ext.Button({
			text : '关闭',
			qtip : "关闭",
			minWidth : 70,
			handler : function() {
				Js.Center.SendSMS.SMSSendUserGroupDetails.SMSsendUserGroupDetailsWindow.close();
			}
		})]
	});
	//显示窗体
	Js.Center.SendSMS.SMSSendUserGroupDetails.SMSsendUserGroupDetailsWindow.show();
};
