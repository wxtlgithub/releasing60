Ext.namespace('Js.Center.ClientSMS.ClientSMSQuery');
Js.Center.ClientSMS.ClientSMSQuery.clientsmsinfo = function(node) {
 
	if (Ext.get("Js.Center.ClientSMS.ClientSMSQuery.clientsmsinfoPanel") == null) {

		// =======================================================================
		//   定义GridPanel相关
		// ===============================================分页每页显示数量
		var _pageSize = 12;
		// ===============================================指定列参数

		var fields = ["numcontentid","vc2md5", "vc2content", "numclientid", "vc2departname",
				"vc2checkstate", "vc2sendstate", "datchecktime",
				"datcreatetime", "vc2reason","numnodeid"];
		Js.Center.ClientSMS.ClientSMSQuery.Infostore = new WXTL.Widgets.CommonData.GroupingStore(
				{
					proxy : new Ext.data.HttpProxy({
								url : Js.Center.ClientSMS.clientSmsQueryURL,
								method : "POST"
							}),
					reader : new Ext.data.JsonReader({
								fields : fields,
								root : "data",
								id : "numcontentid",
								totalProperty : "totalCount"

							}),
					sortInfo : {
						field : 'datcreatetime',
						direction : 'DESC'
					},
					baseParams : {
						datstart : Ext.util.Format.date(WXTL.Common.dateTime
										.getNow(), 'Y-m-d'),
						datend : Ext.util.Format.date(WXTL.Common.dateTime
										.getNow(), 'Y-m-d'),
						vc2Content : '',
						numclientid : '',
						vc2departname : '',
						numnodeid: '',
						flag : 'selectbykey'
					}
				});
		Js.Center.ClientSMS.ClientSMSQuery.Infostore.load({
					params : {
						start : 0,
						limit : _pageSize,
						datstart : Ext.util.Format.date(WXTL.Common.dateTime
										.getNow(), 'Y-m-d'),
						datend : Ext.util.Format.date(WXTL.Common.dateTime
										.getNow(), 'Y-m-d'),
						vc2Content : '',
						numclientid : '',
						vc2departname : '',
						numnodeid: '',
						flag : 'selectbykey'
					}
				});

		// 定义部门结构树
		// var departComboxTree = new WXTL.Widgets.CommonForm.ComboWithTree({
		// name: 'numdepartid',
		// hiddenName: 'numdepartid',
		// id: 'Js.Center.ClientSMS.ClientSMSQuery.departComboxTree',
		// fieldLabel: "部门名称",
		// valueField: 'id',
		// treeRootVisible: true,
		// listHeight: '150',
		// baseParams: {
		// columnlist: "numdepartid,vc2departname",
		// flag: 'selectallbycurrentuser'
		// },
		// dataUrl: Js.Center.Popedom.DepartmentsQueryURL
		// });
		//        
		// ==================================================== 列选择模式
		var sm = new Ext.grid.CheckboxSelectionModel({
					dataIndex : "numcontentid"
				});
		// ==================================================== 列头
		var cm = new Ext.grid.ColumnModel([{
					header : "md5",
					tooltip : "md5",
					dataIndex : "vc2md5",
					hidden : true,
					sortable : true
				}, {
					header : "短信内容",
					tooltip : "短信内容",
					dataIndex : "vc2content",
					sortable : true,
					width : 200,
					renderer : function(value) {
						return "<font qtip='" + value + "'>" + value
								+ "</font>";
					},
					readOnly : true,
					editor : new Ext.form.TextField({
								readOnly : true
							})
				}, {
					header : "客户端",
					tooltip : "客户端",
					dataIndex : "numclientid",
					sortable : true
				}, {
					header : "EC",
					tooltip : "EC",
					dataIndex : "vc2departname",
					sortable : true
				}, {
					header : "审核状态",
					tooltip : "审核状态",
					dataIndex : "vc2checkstate",
					sortable : true
				}, {
					header : "审核时间",
					tooltip : "审核时间",
					dataIndex : "datchecktime",
					sortable : true
				}, {
					header : "创建时间",
					tooltip : "创建时间",
					dataIndex : "datcreatetime",
					sortable : true
				}, {
					header : "审核建议",
					tooltip : "审核建议",
					dataIndex : "vc2reason",
					sortable : true
				}, {
					header : "网元",
					tooltip : "网元",
					dataIndex : "numnodeid",
					sortable : true
				}]);
		// ==============================================================定义grid
		var clientsmsinfoGrid = new WXTL.Widgets.CommonGrid.GridPanel({
					// id: "clientsmsinfoQueryGridPanel",
					anchor : '100% 100%',
					pageSize : _pageSize,
					needMenu : false,
					store : Js.Center.ClientSMS.ClientSMSQuery.Infostore,
					sm : sm,
					cm : cm,
					needRightMenu : false
				});
		// ============================================================================
		// 定义formpanel
		var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
			// id: "clientsmsinfoSelectPanel",
			height : 170,
			// 查询调用的方法
			queryMethod : "Js.Center.ClientSMS.ClientSMSQuery.queryGrid",
			items : [{
				layout : 'column',
				items : [{
					columnWidth : .5,
					layout : 'form',
					defaultType : "textfield",
					// 锚点布局-
					defaults : {
						anchor : "90%",
						msgTarget : "side"
					},
					buttonAlign : "center",
					bodyStyle : "padding:10px 0 10px 15px",
					items : [new Ext.form.DateField({
						fieldLabel : '开始时间',
						name : 'datstart',
						id : 'Js.Center.ClientSMS.ClientSMSQuery.DatStart',
						emptyText : Ext.util.Format.date(WXTL.Common.dateTime
										.getNow(), 'Y-m-d'),
						// emptyText:
						// Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow()/*,
						// -3减3天*/), 'Y-m-d'),
						format : 'Y-m-d',
						readOnly : true,
						validateOnBlur : false,
						validator : function() {
							var strat_time = Ext
									.get("Js.Center.ClientSMS.ClientSMSQuery.DatStart").dom.value;
							var end_time = Ext
									.get("Js.Center.ClientSMS.ClientSMSQuery.DatEnd").dom.value;
							if (strat_time <= end_time) {
								return true;
							} else {
								return false;
							}
						},
						invalidText : '结束时间不能小于开始时间！'
					}), {
						xtype : "textfield",
						name : "numclientid",
						id : 'Js.Center.ClientSMS.ClientSMSQuery.NumClientId',
						fieldLabel : "客户端",
						maxLength : 4,
						regex : WXTL.Common.regex.Illegal,
						regexText : WXTL.Common.regexText.IllegalText
					}, {
						xtype : "textfield",
						name : "vc2departname",
						id : 'Js.Center.ClientSMS.ClientSMSQuery.Vc2departname',
						fieldLabel : "部门",
						maxLength : 4,
						regex : WXTL.Common.regex.Illegal,
						regexText : WXTL.Common.regexText.IllegalText
					}]
				}, {
					columnWidth : .5,
					layout : 'form',
					defaultType : "textfield",
					// 锚点布局-
					defaults : {
						anchor : "90%",
						msgTarget : "side"
					},
					buttonAlign : "center",
					bodyStyle : "padding:10px 0 10px 15px",
					items : [new Ext.form.DateField({
						fieldLabel : '结束时间',
						name : 'datend',
						id : 'Js.Center.ClientSMS.ClientSMSQuery.DatEnd',
						emptyText : Ext.util.Format.date(WXTL.Common.dateTime
										.getNow(), 'Y-m-d'),
						format : 'Y-m-d',
						readOnly : true,
						validateOnBlur : false,
						validator : function() {
							var strat_time = Ext
									.get("Js.Center.ClientSMS.ClientSMSQuery.DatStart").dom.value;
							var end_time = Ext
									.get("Js.Center.ClientSMS.ClientSMSQuery.DatEnd").dom.value;
							if (strat_time <= end_time) {
								return true;
							} else {
								return false;
							}
						},
						invalidText : '结束时间不能小于开始时间！'
					}), {
						xtype : "textfield",
						name : "vc2content",
						id : 'Js.Center.ClientSMS.ClientSMSQuery.SMSContent',
						fieldLabel : "短信内容",
						maxLength : 50,
						regex : WXTL.Common.regex.Illegal,
						regexText : WXTL.Common.regexText.IllegalText
					},{
						xtype : "textfield",
						name : "numnodeid",
						id : 'Js.Center.ClientSMS.ClientSMSQuery.NumNodeId',
						fieldLabel : "网元",
						maxLength : 2,
						regex : WXTL.Common.regex.Illegal,
						regexText : WXTL.Common.regexText.IllegalText
					}]
				}]
			}]
		});

		// ==============================================================
		// 定义查询按钮事件方法
		Js.Center.ClientSMS.ClientSMSQuery.queryGrid = function() {
			if (selectPanel.getForm().isValid()) {
				var datStart = Ext
						.get("Js.Center.ClientSMS.ClientSMSQuery.DatStart")
						.getValue();
				var datEnd = Ext
						.get("Js.Center.ClientSMS.ClientSMSQuery.DatEnd")
						.getValue();
				var vc2Content = Ext
						.get("Js.Center.ClientSMS.ClientSMSQuery.SMSContent").getValue();
				var numclientid = Ext
						.get("Js.Center.ClientSMS.ClientSMSQuery.NumClientId").getValue();
				var vc2departname = Ext
						.get("Js.Center.ClientSMS.ClientSMSQuery.Vc2departname").getValue();
				var numnodeid = Ext
						.get("Js.Center.ClientSMS.ClientSMSQuery.NumNodeId").getValue();		
						
						
				var flag = 'selectbykey';
				Js.Center.ClientSMS.ClientSMSQuery.Infostore.baseParams = {
					datstart : datStart,
					datend : datEnd,
					vc2Content : vc2Content,
					numclientid : numclientid,
					vc2departname : vc2departname,
					numnodeid: numnodeid,
					flag : flag
				};
				Js.Center.ClientSMS.ClientSMSQuery.Infostore.load({
							params : {
								start : 0,
								limit : _pageSize
							}
						});
			}
		};

		// ============================================================================定义主panel
		Js.Center.ClientSMS.ClientSMSQuery.clientsmsinfoPanel = new Ext.Panel({
					frame : true, // 渲染面板
					id : "Js.Center.ClientSMS.ClientSMSQuery.clientsmsinfoPanel",
					bodyBorder : false,
					border : false,
					autoScroll : true, // 自动显示滚动条
					layout : "anchor",
					defaults : {
						collapsible : true
						// 允许展开和收缩
					},
					items : [selectPanel, clientsmsinfoGrid]
				});
	};

	// ============================================================================绑定到center
	GridMain(node, Js.Center.ClientSMS.ClientSMSQuery.clientsmsinfoPanel,
			"openroomiconinfo", "Js.Center.ClientSMS.ClientSMSQuery.Infostore");
};
