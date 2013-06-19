Ext.namespace('Js.Center.SendSMS.sendbycustomer');

//定义一个公共数据源,将GRID数据源的数据赋给usergroupData
var usergroupStore = new Array();
Js.Center.SendSMS.sendbycustomer.customerQueryInfo= function(show) {

	if (Ext.get("Js.Center.SendSMS.sendbycustomer.sendbycustomerquery.SelectPanel") == null) {
		//============================================================================定义GridPanel相关
		// 分页每页显示数量
		var _pageSize = 12;
		//==============================================================Grid数据定义
		var datafields = ["numusergroupmemberid","vc2customer", "vc2mobile", "vc2usergroupname","numusergroupid"];

		Js.Center.SendSMS.sendbycustomer.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
			proxy: new Ext.data.HttpProxy({
				url: Js.Center.SendSMS.sendbycustomerURL,
				method: "POST"
			}),
			reader: new Ext.data.JsonReader({
				fields: datafields,
				root: "data",
				id: "numusergroupmemberid",
				totalProperty: "totalCount"

			}),
			//解决分组无效代码
			baseParams: {
				flag: 'getusergroupmember',
				vc2membername: '',
				vc2mobile: '',
				numgroupid: ''
			},
			listeners: {
				"load": function(){
					Js.Center.SendSMS.sendbycustomer.getSelectionModel();
				}
			}
		});

		//==============================================================列选择模式
		var sm = new Ext.grid.CheckboxSelectionModel({
			dataIndex: "numusergroupmemberid"
		});
		//==============================================================列头
		var cm = new Ext.grid.ColumnModel([sm,{
			header: "客户姓名",
			tooltip: "客户姓名",
			dataIndex: "vc2customer",
			sortable: true
		},{
			header: "手机号码",
			tooltip: "手机号码",
			dataIndex: "vc2mobile",
			sortable: true
		},{
			header: "所属客户组",
			tooltip: "所属客户组",
			dataIndex: "vc2usergroupname",
			sortable:true
		}]);

		//==============================================================定义grid
		var customerGroupGrid = new WXTL.Widgets.CommonGrid.GridPanel({
			id: "Js.Center.SendSMS.sendbycustomer.sendbycustomerquery.usergroupGridPanel",			
			width:600,
			anchor: '100% 100%',
			needMenu: false,
			needRightMenu: false,
			pageSize: _pageSize,
			store: Js.Center.SendSMS.sendbycustomer.Infostore,
			sm: sm,
			cm: cm
		});

		//============================================================================ 定义formpanel

		//=============================================================定义所属客户组customerGroupCombox
		var customerGroupCombox = new WXTL.Widgets.CommonForm.ComboBox({
			xtype: "combo",
			name: "numusergroupid",
			id:'Js.Center.SendSMS.sendbycustomer.sendbycustomerquery.customerGroup',
			fieldLabel: "所属客户组",
			hiddenName: "numusergroupid",
			readOnly: true,
			mode: "local",
			displayField: "vc2usergroupname",
			valueField: "numusergroupid",
			triggerAction: "all",
			store: Js.Center.Common.UserGroupStoreByUser
		});

		//=======================================selectPanel===================

		var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
			id: "Js.Center.SendSMS.sendbycustomer.sendbycustomerquery.SelectPanel",
			height: 120,
			width:600,
			//查询调用的方法
			queryMethod: "Js.Center.SendSMS.sendbycustomer.queryGrid",
			items: [{
				layout: 'column',
				items: [{
					columnWidth: .5,
					layout: 'form',
					defaultType: "textfield",
					//锚点布局-
					defaults: {
						anchor: "90%",
						msgTarget: "side"
					},
					items: [
					new Ext.form.TextField({
						fieldLabel: '手机号码',
						name: 'vc2mobile',
						id: 'Js.Center.SendSMS.sendbycustomer.sendbycustomerquery.Mobile',
						regex: WXTL.Common.regex.Mobile,
						regexText: '请输入正确的手机号码格式',
						maxLength: 11,
						maxLengthText: '长度不能超过11'
					}),customerGroupCombox]
				},{
					columnWidth: .5,
					layout: 'form',
					defaultType: "textfield",
					//锚点布局-
					defaults: {
						anchor: "90%",
						msgTarget: "side"
					},
					items: [{
						xtype: "textfield",
						name: "vc2customername",
						id: "Js.Center.SendSMS.sendbycustomer.sendbycustomerquery.CustomerName",
						fieldLabel: "客户姓名",
						regex: WXTL.Common.regex.Illegal,
						regexText: WXTL.Common.regexText.IllegalText,
						maxLength: 50,
						maxLengthText: '长度不能超过50'
					}]
				}]
			}]

		});

		//============================================================== 定义查询按钮事件方法
		Js.Center.SendSMS.sendbycustomer.queryGrid = function() {
			if (selectPanel.getForm().isValid()) {
				var x = Js.Center.SendSMS.sendbycustomer.SMSsendbycustomerInfoWin.getPosition()[0];
				Js.Center.SendSMS.sendbycustomer.SMSsendbycustomerInfoWin.setPagePosition(x,50);
				var flag = 'getusergroupmember';
				var customerName = Ext.get("Js.Center.SendSMS.sendbycustomer.sendbycustomerquery.CustomerName").getValue();
				var numGroupId = Ext.getCmp("Js.Center.SendSMS.sendbycustomer.sendbycustomerquery.customerGroup").getValue();
				var vc2mobile = Ext.get("Js.Center.SendSMS.sendbycustomer.sendbycustomerquery.Mobile").getValue();
				Js.Center.SendSMS.sendbycustomer.Infostore.baseParams = {
					vc2membername: customerName,
					flag: flag,
					vc2mobile: vc2mobile,
					numgroupid: numGroupId
				};
				Js.Center.SendSMS.sendbycustomer.Infostore.load({
					params: {
						start: 0,
						limit: _pageSize
					}
				});
			}
		};
		//============================================================================定义主panel
		Js.Center.SendSMS.sendbycustomer.MainPanel = new Ext.Panel({
			id: "Js.Center.SendSMS.sendbycustomer.mainpanel",
			frame: true, // 渲染面板
			bodyBorder: false,
			border: false,
			autoScroll: true, // 自动显示滚动条
			layout: "anchor",
			defaults: {
				collapsible: true // 允许展开和收缩
			},
			items: [selectPanel, customerGroupGrid]
		});

		//===========================================================定义窗体
		Js.Center.SendSMS.sendbycustomer.SMSsendbycustomerInfoWin = new WXTL.Widgets.CommonWindows.Window({
			title: "客户查询",
			width:620,
			mainForm: selectPanel.getForm(),
			needButtons: false,
			closeAction: 'hide',//关闭方式
			updateState: true,
			items: [selectPanel, customerGroupGrid],
			buttons: [new Ext.Button({
				text: '确定',
				minWidth: 70,
				handler: function() {
					//将customerGroupGrid的数据带到上个页面的客户通讯录tree的数据源里
					Js.Center.SendSMS.sendbycustomer.customerGridCheckedInfo();
					Js.Center.SendSMS.sendbycustomer.SMSsendbycustomerInfoWin.hide();
					Js.Center.SendSMS.Sendbycustomer.func.isCreateTree();
				}
			}), new Ext.Button({
				text: '取消',
				minWidth: 70,
				handler: function() {
					Js.Center.SendSMS.sendbycustomer.SMSsendbycustomerInfoWin.hide();
				}
			})],
			listeners: {
				"show": function() {
					Js.Center.Common.UserGroupStoreByUser.reload();
					Js.Center.SendSMS.Sendbycustomer.customerTreeCheckedInfo();
				},
				"beforehide": function() {
					selectPanel.getForm().reset();
					Js.Center.SendSMS.sendbycustomer.SMSsendbycustomerInfoWin.mainForm.reset();
					
					Js.Center.SendSMS.sendbycustomer.Infostore.load({
						params: {
							start: 0,
							limit: 0
						}
					});
				}
			}
		});
		
		//=============将Grid 选中的客户数据加载到公共数据源  usergroupData里。

		Js.Center.SendSMS.sendbycustomer.customerGridCheckedInfo = function() {
			usergroupStore = new Array();
			//已选择列表中的集合
			var usergroupData = customerGroupGrid.getSelectionModel().getSelections();
			//TreePanel树已经选中的客户组成员
			var arrLen = customerTreeCheckedData.length;
			//当前页数据源个数
			var len = Js.Center.SendSMS.sendbycustomer.Infostore.data.length;
			//当前页数据源
			var items = Js.Center.SendSMS.sendbycustomer.Infostore.data.items;
			
			//将当前页面选中行数据源加到已选择列表中
			for(var i=0; i<usergroupData.length;i++) {
				usergroupStore.push(usergroupData[i]);			
			}
			
			
			var isTrue = false;
			//TreePanel树含有选中的客户组成员的情况下
			if(arrLen>0){				
				for(var j=0; j<arrLen; j++){
					isTrue = false;
					
					for(var k=0; k<len;k++) {
						if(items[k].data.numusergroupmemberid == customerTreeCheckedData[j].data.numusergroupmemberid){
							isTrue = true;
							break;					
						}		
					}
					//将除去当前页以外的数据源添加到已选择列表中
					if(!isTrue){
						usergroupStore.push(customerTreeCheckedData[j]);	
					}									
				}
			}
			
			
			return usergroupStore;
		};
		
		//============将树形框的值默认选中到列表框中=============
		Js.Center.SendSMS.sendbycustomer.getSelectionModel = function() {
			//列表所有行
			var selectModel = customerGroupGrid.getSelectionModel();
			//定义符合选中行索引
			var indexArry = new Array();		
			//当前页数据源个数
			var len = Js.Center.SendSMS.sendbycustomer.Infostore.data.length;
			//TreePanel树已经选中的客户组成员个数
			var arrLen = customerTreeCheckedData.length;
			//当前页数据源
			var items = Js.Center.SendSMS.sendbycustomer.Infostore.data.items;
			for(var i=0; i<len; i++){
				for(var j=0; j<arrLen; j++){
					//判断当前页的主键与TreePanel树已经选中的客户组成员是否相等
					if(items[i].data.numusergroupmemberid == customerTreeCheckedData[j].data.numusergroupmemberid){
						indexArry.push(i);
					}
				}			
			}
			//设置选中效果
			selectModel.selectRows(indexArry);
		};
	};


	//============================================================================执行显示
	if (show) {
		Js.Center.SendSMS.sendbycustomer.SMSsendInfoWin.show();
	}
};