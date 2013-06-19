Ext.namespace("Js.Center.Business.SvcBlacklistGwNumDetail");
  
Js.Center.Business.SvcBlacklistGwNumDetail.func = function(value) {
	//=============================================================定义统计Grid相关 
	//分页 每页显示数量
	var pageSizeSum = 12;
	//========================定义Grid数据
	Js.Center.Business.SvcBlacklistGwNumDetail.GwSuccnumGridStore = new WXTL.Widgets.CommonData.GroupingStore({
		proxy : new Ext.data.HttpProxy({
			url : Js.Center.Business.SvcBlackListGwsURL ,
			method : "POST"
		}),
		reader : new Ext.data.JsonReader({
			fields : ["numgwid", "numtotalnum","numsuccessnum","vc2gatewayname","numfaliednum","numlogid"],
			root : "data",
			id : "numgwid",
			totalProperty : "totalCount"
		}),
		sortInfo : {
			field : 'numgwid',
			direction : 'DESC'
		},//解决分组无效代码
		baseParams : {
			flag : 'querygwsuccnumbylogid',
			numlogid : value
		}
	});
	Js.Center.Business.SvcBlacklistGwNumDetail.GwSuccnumGridStore.load({
		params : {
			start : 0,
			limit : pageSizeSum
		}
	});
	//==============================================================列选择模式
	var sm = new Ext.grid.CheckboxSelectionModel({
		dataIndex : "numgwid"
	});
	//==============================================================列头
	var cm = new Ext.grid.ColumnModel([{
		header : "网关编号",
		tooltip : "网关编号",
		dataIndex : "numgwid",
		sortable : true
	},
	{
		header : "网关名称",
		tooltip : "网关名称",
		dataIndex : "vc2gatewayname",
		sortable : true
	},
	{
		header : "总数",
		tooltip : "总数",
		dataIndex : "numtotalnum",
		   renderer: function(value, meta, record, rowIndex, colIndex, store){
	            if(value > 0){
	            	//alert(record.data.numlogid);
	               return "<a href='#' onclick='exportData(\"" + Js.Center.Business.SvcBlackListGwsURL + "\",\"id=" + record.data.numlogid + "&numgwid="+ record.data.numgwid +"&flag=selectgwdesc&successtype=-1\")'>"+ value +"</a>";
	            }
	            else{
	                return value;
	            }
	        },
		sortable : true
	} ,{
		header : "成功数",
		tooltip : "成功数",
		dataIndex : "numsuccessnum",
        renderer: function(value, meta, record, rowIndex, colIndex, store){
            if(value > 0){
                return "<a href='#' onclick='exportData(\"" + Js.Center.Business.SvcBlackListGwsURL + "\",\"id=" + record.data.numlogid + "&numgwid="+ record.data.numgwid +"&flag=selectgwdesc&successtype=1\")'>"+ value +"</a>";
            }
            else{
                return value;
            }
        },
		sortable : true
	} ,{
		header : "失败数",
		tooltip : "失败数",
		dataIndex : "numfaliednum",
		renderer: function(value, meta, record, rowIndex, colIndex, store){
            if(value > 0){
                return "<a href='#' onclick='exportData(\"" + Js.Center.Business.SvcBlackListGwsURL + "\",\"id=" + record.data.numlogid + "&numgwid="+ record.data.numgwid +"&flag=selectgwdesc&successtype=0\")'>"+ value +"</a>";
            }
            else{
                return value;
            }
        },
		sortable : true
	}
	]);

	//==============================================================定义grid
	var svcGwSuccGrid = new WXTL.Widgets.CommonGrid.GridPanel({
		title : '通道黑名单处理列表',
		anchor : '100% 100%',
		pageSize : pageSizeSum,
		store : Js.Center.Business.SvcBlacklistGwNumDetail.GwSuccnumGridStore,
		needMenu : false,
		needRightMenu : false,
		sm : sm,
		cm : cm
	});
	//=============================定义主窗体
	var mainPanel = new Ext.form.FormPanel({});
	var mainForm = mainPanel.getForm();
	Js.Center.Business.SvcBlacklistGwNumDetailWindow = new WXTL.Widgets.CommonWindows.Window(
	{
		title : "通道黑名单处理详情",
		width : 664,
		height : 400,
		layout : 'form',
		mainForm : mainForm,
		autoScroll : false,
		needButtons : false,
		items : [svcGwSuccGrid],
		buttons : [new Ext.Button({
			text : '关闭',
			qtip : "关闭",
			minWidth : 70,
			handler : function() {
				Js.Center.Business.SvcBlacklistGwNumDetailWindow.close();
			}
		})]
	});
	//显示窗体
	Js.Center.Business.SvcBlacklistGwNumDetailWindow.show();
};
