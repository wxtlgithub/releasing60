/**
 * @author Administrator
 */
Ext.namespace('Js.Center.SendSMS.operatesms');
Ext.QuickTips.init();

Js.Center.SendSMS.operatesms.func = function(row) {

	// ============================================================ 选择栏
	var productCombox = new WXTL.Widgets.CommonForm.ComboBox({
		xtype : "xComboBox",
		name : "numprodid",
		hiddenName : "numprodid",
		emptyText : "-=请选择=-",
		allowBlank : false,
		blankText : "通道组",
		fieldLabel : "<font>通道组</font>",
		disabled : true,
		mode : "local",
		displayField : "vc2name",
		valueField : "numprodid",
		triggerAction : "all",
		store : Js.Center.Common.ProductStore
	});
	Js.Center.Common.ProductStore.reload();
	var doCombox = new WXTL.Widgets.CommonForm.ComboBox({
		xtype : "xComboBox",
		name : "vc2Plause",
		fieldLabel : "<font color=red>操作类型</font>",
		hiddenName : "vc2Plause",
		mode : "local",
		allowBlank : false,
		emptyText : '-=请选择=-',
		blankText : "操作类型不允许为空",
		displayField : "vc2name",
		valueField : "numprodid",
		triggerAction : "all",
		store : new Ext.data.SimpleStore({
			fields : [ "vc2name", "numprodid" ],
			data : [ [ "直接驳回", "3" ], [ "重新审核", "0" ] ]
		})
	});

	// ================================================================
		var vc2Reason = new Ext.form.TextField ({
			xtype : "textfield",
			name : "vc2reason",
			id : "Js.Center.SendSMS.operatesms.vc2reason",
			allowBlank : false,
			fieldLabel : "审核原因",
			blankText : "原因不允许为空"
		});
	// 定义FormPanel
	var operatesmsPanel = new Ext.form.FormPanel({
		id : "operatesmsPanel",
		width : 470,
		frame : true,
		labelWidth : 80,
		defaults : {
			anchor : "90%"
		},
		items : [ {
			items : [ {
				layout : 'column',
				items : [ {
					columnWidth : 1,
					layout : 'form',
					defaultType : "textfield",
					// 锚点布局-
					defaults : {
						anchor : "90%",
						msgTarget : "side"
					},
					buttonAlign : "center",
					items : [ productCombox, doCombox ]
				} ]
			} ]
		}, {
			xtype : "textfield",
			name : "datsend",
			fieldLabel : "<font color=red>发送时间</font>",
			timeFormat : 'H:i:s',
			disabled : true,
			value : Js.Center.SendSMS.operatesms.datSend
		}, {
			xtype : "hidden",
			name : "numcontentid",
			fieldLabel : "信息编号"
		}, {
			xtype : "hidden",
			name : "flag",
			value : "operateTimingSms"
		}, {
			xtype : "textfield",
			name : "vc2creatername",
			fieldLabel : "发送人",
			disabled : true
		}, {
			xtype : "textarea",
			name : "vc2content",
			fieldLabel : "短信内容",
			readOnly : true,
			width : 600,
			height : 90
		}, vc2Reason ]
	});
	
	// ================================================================= 定义窗体
	Js.Center.SendSMS.operatesms.window = new WXTL.Widgets.CommonWindows.Window(
			{
				title : "操作定时短信",
				width : 500,
				plain : true,
				iconCls : "addicon",
				// 不可以随意改变大小
				resizable : false,
				defaultType : "textfield",
				labelWidth : 100,
				collapsible : true, // 允许缩放条
				closeAction : 'hide',
				closable : true,
				// 弹出模态窗体
				modal : 'true',
				buttonAlign : "center",
				needButtons : false,
				closeAction : "close",
				bodyStyle : "padding:10px 0 0 15px",
				mainForm : operatesmsPanel.getForm(),
				updateURL : Js.Center.SendSMS.YXTSendContentURL,
				displayStore : Js.Center.SendSMS.DepartSendQuery.Infostore,
				updateState : false,
				items : [ operatesmsPanel ],
				listeners : {
					"show" : function() {
						// 当window show事件发生时清空一下表单
						var params = {
							flag : "plause",
							numcontentid : row.get("numcontentid")
						};
						ajaxNoBackValue(Js.Center.SendSMS.YXTSendContentURL,
								params);
					},
					"close" : function() {
						Js.Center.SendSMS.DepartSendQuery.departSendQueryinfo.sendSMSCallBack;
					}
				},
				buttons : [
						new Ext.Button(
								{
									text : '确定',
									minWidth : 70,
									handler : function() {
										if (operatesmsPanel.getForm().isValid()) {
											// 弹出效果
											Ext.MessageBox.show({
												msg : '正在保存，请稍等...',
												progressText : 'Saving...',
												width : 300,
												wait : true,
												icon : 'download',
												animEl : 'saving'
											});
											setTimeout(function() {
												Ext.MessageBox.hide();
											}, 300000);
											 Js.Center.SendSMS.operatesms.window.mainFormSubmitFunc();
										}
									}
								}),
						new Ext.Button(
								{
									text : '重置',
									minWidth : 70,
									qtip : "重置数据",
									handler : function() {
										Js.Center.SendSMS.operatesms.window.mainForm.reset();
										Js.Center.SendSMS.operatesms.window.mainForm.loadRecord(Js.Center.SendSMS.operatesms.window.updateRecord);
									}
								}),
						new Ext.Button(
								{
									text : '取消',
									minWidth : 70,
									handler : function() {
										var params = {
											flag : "doplausesendsms",
											numcontentid : Js.Center.SendSMS.operatesms.window.updateRecord
													.get("numcontentid")
										};
										ajaxNoBackValue(
												Js.Center.SendSMS.YXTSendContentURL,
												params);
										Js.Center.SendSMS.operatesms.window
												.close();
									}
								}) ]
			});
	function ajaxNoBackValue(url, params) {
		Ext.Ajax
				.request({
					url : url,
					method : "POST",
					params : params,
					success : function(form, action) {
						Js.Center.SendSMS.DepartSendQuery.Infostore.reload();
						Js.Center.SendSMS.operatesms.window.mainForm
								.loadRecord(Js.Center.SendSMS.operatesms.window.updateRecord);
					}
				});
	}
};
