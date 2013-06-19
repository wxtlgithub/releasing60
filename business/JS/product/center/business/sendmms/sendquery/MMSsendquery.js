Ext.namespace('Js.Center.SendMMS.MMSSendQuery');
Js.Center.SendMMS.MMSSendQuery.info = function(node) {
	Js.Center.Common.DepartUserStore.reload();

	Js.Center.Common.UserGroupStoreByUser.reload();
	if (Ext.get("Js.Center.SendMMS.MMSSendQuery.MainPanel") == null) {

		// =============================================================================================定义Gridpanel相关
		// 分页 每页显示数量
		var _pageSize = 12;
		// ========================定义Grid数据
		Js.Center.SendMMS.MMSSendQuery.DisplayStore = new WXTL.Widgets.CommonData.GroupingStore(
				{
					proxy : new Ext.data.HttpProxy({
						url : Js.Center.SendMMS.MMSQueryURL,
						method : "POST"
					}),
					reader : new Ext.data.JsonReader({
						// fields: ["numcontentid", "vc2name",
						// "nummmstype", "numstate", "numuserid",
						// "vc2username", "numcreattime", "datsend",
						// "datsrcsendtime", "datsrcendtime",
						// "vc2desc","numprenum","numprenum","numrealnum","numsuces","numfail","numunknow","numsucrate"],
						fields : ["numrowasdf", "numsendbatch",
								"nummtcnt", "numresp_succnt",
								"numresp_faicnt", "numrep_succnt",
								"numrep_faicnt", "numresp_nocnt",
								"numrep_nocnt", "numsuc_rate",
								"numuserid", "numusername",
								"numcontentid", "nummmsid", "vc2name",
								"vc2desc", "nummmstype",
								"nummmstypename", "numstate",
								"numstatename", "vc2status",
								"vc2statusname", "datcreatetime",
								"datsend", "numprenum", "datcheck1",
								"datcheck2", "numcheck1id",
								"numcheck1idname", "numcheck2id",
								"numcheck2idname", "numsendtype",
								"vc2typelist", "numtotal",
								"numsuccess", "numfailed"],
						root : "data",
						id : "numcontentid",
						totalProperty : "totalCount"

					}),
			sortInfo : {
				field : 'datcheck2',
				direction : 'DESC'
			}, // 解决分组无效代码
			baseParams : {
				flag : 'selectsendbykey',
				datstart : Ext.util.Format.date(
						WXTL.Common.dateTime
								.addDay(WXTL.Common.dateTime.getNow(),
										-7/* 减3天 */), 'Y-m-d'),
				datend : Ext.util.Format.date(WXTL.Common.dateTime
								.getNow(), 'Y-m-d'),
				// columnid: '',
				usergroupid : '',
				firstcheckid : '',
				secondcheckid : '',
				mmsState : ''
			}
		});
		Js.Center.SendMMS.MMSSendQuery.DisplayStore.load({
			params : {
				start : 0,
				limit : _pageSize
			}
		});
		// ==============================================================列选择模式
		var sm = new Ext.grid.CheckboxSelectionModel({
			dataIndex : "numcontentid"
		});
		// ==============================================================列头
		var cm = new Ext.grid.ColumnModel([{
			header : "彩信标题",
			tooltip : "彩信标题",
			dataIndex : "vc2name",
			sortable : true
		}, {
			header : "彩信名称",
			tooltip : "彩信名称",
			dataIndex : "vc2desc",
			sortable : true
		}, {
			header : "彩信类型",
			tooltip : "彩信类型",
			dataIndex : "nummmstype",
			sortable : true,
			renderer : function(value) {
				if (value == 1) {
					return "普通彩信";
				} else if (value == 2) {
					return "个性化彩信";
				}
			}
		}, {
			header : "审核状态",
			tooltip : "审核状态",
			dataIndex : "numstate",
			sortable : true,
			renderer : function(value, meta, record, rowIndex,
					colIndex, store) {
				var row = Js.Center.SendMMS.MMSSendQuery.DisplayStore
						.getAt(rowIndex);
				if (row.get("vc2status") == 2
						|| row.get("vc2status") == 99
						|| row.get("vc2status") == -99
						|| row.get("vc2status") == -1
						|| row.get("vc2status") == 3) {
					return "审核完成";
				} else {
					if (value == 0) {
						return "待审核";
					}
					if (value == 1) {
						return "一审通过";
					}
					if (value == 2) {
						return "二审通过";
					}
					if (value == 3) {
						return "审核驳回";
					}
				}
			}
		}, {
			header : "拟发量",
			tooltip : "拟发量",
			dataIndex : "numprenum",
			sortable : true

		}, {
			header : "<font color='green'>合法</font>/<font color='red'>非法</font>",
			tooltip : "合法/非法",
			dataIndex : "numcontentid",
			renderer : function(value, meta, record, rowIndex,
					colIndex, store) {
				var row = Js.Center.SendMMS.MMSSendQuery.DisplayStore
						.getAt(rowIndex);
				var strsuccess, strfailed;
				if (row.get("numsendtype") == 5
						|| row.get("numsendtype") == 4
						|| row.get("numsendtype") == 3) {
					if (row.get("numsuccess") == 0) {
						strsuccess = "<font color='green'>0</font>/";
					} else {
						strsuccess = "<a href='#' onclick='exportData(\""
								+ Js.Center.SendMMS.MMScheckQueryURL
								+ "\",\"id="
								+ value
								+ "&flag=selectexport&successtype=1\")'><font color='green'>"
								+ row.get("numsuccess")
								+ "</font></a>/";
					}
					if (row.get("numfailed") == 0) {
						strfailed = "<font color='red'>0</font>";
					} else {
						strfailed = "<a href='#' onclick='exportData(\""
								+ Js.Center.SendMMS.MMScheckQueryURL
								+ "\",\"id="
								+ value
								+ "&flag=selectexport&successtype=0\")'><font color='red'>"
								+ row.get("numfailed") + "</font></a>";

					}
					return strsuccess + strfailed;
					// return "<a href='#' onclick='exportData(\"" +
					// Js.Center.SendMMS.MMScheckQueryURL + "\",\"id=" +
					// value +
					// "&flag=selectexport&successtype=1\")'><font
					// color='green'>" + row.get("numsuccess") +
					// "</font></a>/<a href='#' onclick='exportData(\""
					// + Js.Center.SendMMS.MMScheckQueryURL + "\",\"id="
					// + value +
					// "&flag=selectexport&successtype=0\")'><font
					// color='red'>" + row.get("numfailed") +
					// "</font></a>";

				} else if (row.get("numsendtype") == 2) {
					return "<font color='green'>" + row.get("numtotal")
							+ "</font>/<font color='red'>0</font>";
				} else {
					return "<font color='green'>"
							+ row.get("numsuccess")
							+ "</font>/<font color='red'>0</font>";
				}
			}
		}, {
			header : "发送状态",
			tooltip : "发送状态",
			dataIndex : "vc2status",
			sortable : true,
			renderer : function(value) {
				if (value == -1) {
					return "彩信过期";
				} else if (value == 1) {
					return "未发送";
				} else if (value == 2) {
					return "正在发送";
				} else if (value == 3) {
					return "已发送";
				} else if (value == 99) {
					return "待发送";
				}
			}
		}, {
			header : "发送方式",
			tooltip : "发送方式",
			dataIndex : "numsendtype",
			sortable : true,
			renderer : function(value) {
				if (value == 1) {
					return "按栏目发送";
				}
				if (value == 2) {
					return "按客户组发送";
				}
				if (value == 3 || value == 8) {
					return "按列表发送";
				}
				if (value == 4) {
					return "按文件发送";
				}
				if (value == 5) {
					return "个性化彩信发送";
				}
			}
		}, {
			header : "创建时间",
			tooltip : "创建时间",
			dataIndex : "datcreatetime",
			sortType : Ext.data.SortTypes.asDate,
			sortable : true
		}, {
			header : "发送人",
			tooltip : "发送人",
			dataIndex : "numusername",
			sortable : true
		}, {
			header : "发送时间",
			tooltip : "发送时间",
			dataIndex : "datsend",
			sortType : Ext.data.SortTypes.asDate,
			sortable : true
		}, {
			header : "一审审核人",
			tooltip : "一审审核人",
			dataIndex : "numcheck1idname",
			sortable : true
		}, {
			header : "一审时间",
			tooltip : "一审时间",
			dataIndex : "datcheck1",
			sortable : true
		}, {
			header : "二审审核人",
			tooltip : "二审审核人",
			dataIndex : "numcheck2idname",
			sortable : true
		}, {
			header : "二审时间",
			tooltip : "二审时间",
			dataIndex : "datcheck2",
			sortable : true
		}, {
			header : "发送详情",
			tooltip : "发送详情",
			dataIndex : "numcontentid",
			renderer : function(value, meta, record, rowIndex,
					colIndex, store) {
				var row = Js.Center.SendMMS.MMSSendQuery.DisplayStore
						.getById(value);
				return "<a href='#' onclick='Js.Center.SendMMS.MMSSendDetails.print(\""
						+ value + "\")'>发送详情</a>";
			}
		}]);
		Js.Center.SendMMS.MMSSendDetails.print = function(ID) {
			var row = Js.Center.SendMMS.MMSSendQuery.DisplayStore.getById(ID);
			Js.Center.SendMMS.MMSSendDetails.func(row)
		};

		// ==============================================================定义grid
		var sendMMSQueryGrid = new WXTL.Widgets.CommonGrid.GridPanel({
			id : "sendMMSQueryGrid",
			anchor : '100% 100%',
			pageSize : _pageSize,
			store : Js.Center.SendMMS.MMSSendQuery.DisplayStore,
			needMenu : false,
			needRightMenu : false,
			sm : sm,
			cm : cm
		});
		// ============================================================================
		// 定义formpanel
		var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
			height : 190,
			layout : 'fit',
			// 查询调用的方法
			queryMethod : "Js.Center.SendMMS.MMSSendQuery.queryGrid",
			items : [{
				layout : 'column',
				items : [{
					xtype : "hidden",
					name : "flag",
					value : "insert"
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
					items : [{
						xtype : "datefield",
						fieldLabel : "开始时间",
						format : 'Y-m-d',
						labelWidth : 100,
						bodyStyle : 'padding:5px 5px 0',
						readOnly : true,
						emptyText : Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/* 减3天 */), 'Y-m-d'),
						name : "numcreattime",
						id : "sendquerydattart",
						validateOnBlur : false,
						validator : function() {
							var strat_time = Ext
									.get("sendquerydattart").dom.value;
							var end_time = Ext.get("sendquerydatend").dom.value;
							if (strat_time <= end_time) {
								return true;
							} else {
								return false;
							}
						},
						invalidText : '结束时间不能小于开始时间！'
					}, {
						xtype : "xComboBox",
						name : "usergroupid",
						fieldLabel : "客户组",
						emptyText : '-=请选择=-',
						hiddenName : "sendqueryusergroupid",
						readOnly : true,
						mode : "local",
						displayField : "vc2usergroupname",
						valueField : "numusergroupid",
						triggerAction : "all",
						store : Js.Center.Common.UserGroupStoreByUser
					}, {
						xtype : "xComboBox",
						name : "numuserid",
						fieldLabel : "一审审核人",
						emptyText : '-=请选择=-',
						hiddenName : "senequeryfirstcheckid",
						readOnly : true,
						mode : "local",
						displayField : "vc2username",
						valueField : "numuserid",
						triggerAction : "all",
						store : Js.Center.Common.DepartUserStore
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
					items : [{
						xtype : "datefield",
						fieldLabel : "结束时间",
						labelWidth : 100,
						format : 'Y-m-d',
						bodyStyle : 'padding:5px 5px 0',
						readOnly : true,
						emptyText : Ext.util.Format.date(
								WXTL.Common.dateTime.getNow(), 'Y-m-d'),
						name : "datend",
						id : "sendquerydatend",
						validateOnBlur : false,
						validator : function() {
							var strat_time = Ext
									.get("sendquerydattart").dom.value;
							var end_time = Ext.get("sendquerydatend").dom.value;
							if (strat_time <= end_time) {
								return true;
							} else {
								return false;
							}
						},
						invalidText : '结束时间不能小于开始时间！'
					},
					// {
					// xtype: "xComboBox",
					// name: "columnid",
					// fieldLabel: "栏目",
					// emptyText: '-=请选择=-',
					// hiddenName: "sendquerycolumnid",
					// readOnly: true,
					// mode: "local",
					// displayField: "vc2columnname",
					// valueField: "numcolumnid",
					// triggerAction: "all",
					// store: Js.Center.Common.ColumnStoreByUser
					// },
					{
						xtype : "xComboBox",
						name : "numuserid",
						fieldLabel : "二审审核人",
						emptyText : '-=请选择=-',
						hiddenName : "sendquerysecondcheckid",
						readOnly : true,
						mode : "local",
						displayField : "vc2username",
						valueField : "numuserid",
						triggerAction : "all",
						store : Js.Center.Common.DepartUserStore
					}, {
						xtype : 'xComboBox',
						name : "mmsState",
						hiddenName : "sendquerymmsstate",
						fieldLabel : "彩信状态",
						readOnly : true,
						mode : "local",
						displayField : 'show',
						valueField : 'value',
						triggerAction : "all",
						emptyText : "-=请选择=-",
						store : new Ext.data.SimpleStore({
							fields : ["show", "value"],
							data : [["-=请选择=-", ""],
									["待审核", "num_0"],
									["一审通过", "num_1"],
									["二审通过", "num_2"],
									["审核驳回", "num_3"],
									["彩信过期", "vc2_-1"],
									["未发送", "vc2_1"],
									["已发送", "vc2_3"],
									["待发送", "vc2_99"]]
								})
							}]
					}]
			}]
		});

		//============================================================== 定义查询按钮事件方法
		Js.Center.SendMMS.MMSSendQuery.queryGrid = function() {
			if (selectPanel.getForm().isValid()) {
				var datStart = Ext.get("sendquerydattart").getValue();
				var datEnd = Ext.get("sendquerydatend").getValue();
				//var columnId = Ext.get("sendquerycolumnid").getValue();
				var _usergroupid = Ext.get("sendqueryusergroupid").getValue();
				var _firstcheckid = Ext.get("senequeryfirstcheckid").getValue();
				var _secondcheckid = Ext.get("sendquerysecondcheckid")
						.getValue();
				var _mmsstate = Ext.get("sendquerymmsstate").getValue();
				var flag = 'selectsendbykey';
				Js.Center.SendMMS.MMSSendQuery.DisplayStore.baseParams = {
					datstart : datStart,
					datend : datEnd,
					//columnid: columnId,
					usergroupid : _usergroupid,
					firstcheckid : _firstcheckid,
					secondcheckid : _secondcheckid,
					mmsState : _mmsstate,
					flag : flag
				};
				Js.Center.SendMMS.MMSSendQuery.DisplayStore.reload({
					params : {
						start : 0,
						limit : _pageSize
					}
				});
			}
		};
		//============================================================================定义主panel
		Js.Center.SendMMS.MMSSendQuery.MainPanel = new Ext.Panel({
			id : "Js.Center.SendMMS.MMSSendQuery.MainPanel",
			frame : true, // 渲染面板
			bodyBorder : false,
			border : false,
			autoScroll : true, // 自动显示滚动条
			layout : "anchor",
			defaults : {
				collapsible : true
				// 允许展开和收缩
			},
			items : [selectPanel, sendMMSQueryGrid]
		});
	};
	//============================================================================绑定到center
	GridMain(node, Js.Center.SendMMS.MMSSendQuery.MainPanel, "openroomiconinfo", "Js.Center.SendMMS.MMSSendQuery.DisplayStore");
};
