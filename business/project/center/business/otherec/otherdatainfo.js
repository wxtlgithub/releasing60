Ext.namespace('Js.Center.OtherEC.OtherData');
Js.Center.OtherEC.OtherData.info = function(node){
	if (Ext.get("Js.Center.OtherEC.OtherData.OtherDataPanel") == null) {
		 	Js.Center.Common.OperatorStore.reload();
	        //===================== 修改方法
	        otherDataUpdate = function(rowIndex) {
	            var row = Js.Center.OtherEC.OtherData.OtherDatastore.getAt(rowIndex);
	            Js.Center.OtherEC.OtherDataUpdate.window.updateRecord = row;
	            Js.Center.OtherEC.OtherDataUpdate.window.show();
	            Js.Center.OtherEC.OtherDataUpdate.window.mainForm.loadRecord(row);
	        };
	        // =====================导入方法
	        otherDataImport = function(){
	        	Js.Center.OtherEC.OtherDataImport.window.show();
	        };
			// 定义GridPanel相关
	        // ===============================================分页每页显示数量
	        var _pageSize = 12;
	        // ===============================================指定列参数
	        // 字段
		    var fields = ["vc2month", "vc2shortname", "vc2ecid", "vc2servcode", "numopid", "vc2name", "numsvctype", "vc2svctype", "nummtcnt"];
	        Js.Center.OtherEC.OtherData.OtherDatastore = new WXTL.Widgets.CommonData.GroupingStore({
	            proxy: new Ext.data.HttpProxy({
	                url: Js.Center.OtherEC.OtherDataURL,
	                method: "POST"
	            }),
	            reader: new Ext.data.JsonReader({
	                fields: fields,
	                root: "data",
	                id: "numrowasdf",
	                totalProperty: "totalCount"
	            }),
	            baseParams: {
	            	startdate: Ext.util.Format.date(WXTL.Common.dateTime.getNow(),'Y-m-d'),
                	enddate: Ext.util.Format.date(WXTL.Common.dateTime.getNow(),'Y-m-d'),
                	ecname: '',
                	servicecode: '',
                	servicetype: '',
                	operatortype: '',
	                flag: 'otherdataquery'
	            },
	            sortInfo: {
	                field: 'vc2month',
	                direction: 'DESC'
	            }// 解决分组无效代码
	        });
	        Js.Center.OtherEC.OtherData.OtherDatastore.load({
	            params: {
	                start: 0,
	                limit: _pageSize,
	                flag: 'otherdataquery'
	            }
	        });
	        // =============================================下拉列表绑定 （运营商）
	        var opidComboxQuery = new WXTL.Widgets.CommonForm.ComboBox({
		        name: "operatortype",
		        hiddenName: "numopida",
		        emptyText: "-=请选择=-",
		        fieldLabel: "运营商",
		        readOnly: true,
		        mode: "local",
		        displayField: "vc2name",
		        valueField: "numopid",
		        triggerAction: "all",
		        store: Js.Center.Common.OperatorStore
		    });
	        // ==================================================== 列选择模式
	        var sm = new Ext.grid.CheckboxSelectionModel({
	            dataIndex: "vc2month"
	        });
	        // ==================================================== 列头
	        var cm = new Ext.grid.ColumnModel([{
	            header: "账期",
	            tooltip: "账期",
	            dataIndex: "vc2month",
	            sortable: true
	        }, {
	            header: "客户名称",
	            tooltip: "客户名称",
	            dataIndex: "vc2shortname",
	            sortable: true
	        },{
	            header: "客户ID",
	            tooltip: "客户ID",
	            dataIndex: "vc2ecid",
	            sortable: true
	        },{
	            header: "服务代码",
	            tooltip: "服务代码",
	            dataIndex: "vc2servcode",
	            sortable: true
	        },{
	            header: "运营商",
	            tooltip: "运营商",
	            dataIndex: "vc2name",
	            sortable: true
	        },{
	            header: "短彩类型",
	            tooltip: "短彩类型",
	            dataIndex: "vc2svctype",
	            sortable: true
	        },{
	            header: "发送量",
	            tooltip: "发送量",
	            dataIndex: "nummtcnt",
	            sortable: true
	        },{
	            header: "操作",
	            tooltip: "操作",
	            dataIndex: "nummtcnt",
	            renderer: function(value, meta, record, rowIndex, colIndex, store) {
	                return "<a href='#' onclick='otherDataUpdate(\"" + rowIndex + "\")'>修改</a>";
	            }
	        }
	        ]);
		// ============================================================================
		    var queryStartDate = new Ext.form.DateField({
	            fieldLabel: "开始时间",
	            format: 'Y-m',
	            labelWidth: 100,
	            bodyStyle: 'padding:5px 5px 0',
	            readOnly: true,
	            emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m'),
	            fieldLabel: "开始时间",
	            name: "startdate",
	            id: "startdate",
	            validateOnBlur: false,
	            validator: function(){
	                var strat_time = Ext.get("startdate").dom.value;
	                var end_time = Ext.get("enddate").dom.value;
	                if (strat_time <= end_time) {
	                    return true;
	                }
	                else {
	                    return false;
	                }
	            },
	            invalidText: '结束时间不能小于开始时间！'
	        });
		    var queryEndDate = new Ext.form.DateField({
	            fieldLabel: "结束时间",
	            format: 'Y-m',
	            labelWidth: 100,
	            bodyStyle: 'padding:5px 5px 0',
	            readOnly: true,
	            emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m'),
	            fieldLabel: "结束时间",
	            name: "enddate",
	            id: "enddate",
	            validateOnBlur: false,
	            validator: function(){
	                var strat_time = Ext.get("startdate").dom.value;
	                var end_time = Ext.get("enddate").dom.value;
	                if (strat_time <= end_time) {
	                    return true;
	                }
	                else {
	                    return false;
	                }
	            },
	            invalidText: '结束时间不能小于开始时间！'
	        });
		// 定义SelectFormPanel
	    var ContentSelectPanelQuery= new WXTL.Widgets.CommonPanel.QueryFormPanel({
	        height: 160,
	        // 查询调用的方法
	        queryMethod: "Js.Center.OtherEC.OtherData.OtherDataMainGrid",
	        items: [{
	            layout: 'column',
	            items: [
	                {// 左侧列
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:10px 0 10px 15px",
	                items:[queryStartDate,{
	                    xtype: "textfield",
	                    name: "ecname",
	                    id: "ecname",
	                    fieldLabel: "客户名称",
	                    maxLength: 10,
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText
	                },opidComboxQuery]
	            },{// 右侧
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:10px 0 10px 15px",
	            	items:[queryEndDate,{
	                    xtype: "textfield",
	                    name: "servicecode",
	                    id: "servicecode",
	                    fieldLabel: "服务代码",
	                    maxLength: 10,
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText
	                },{
	                    xtype: "combo",
	                    name: "servicetype",
	                    id: "servicetype",
	                    fieldLabel: "短彩类型",
	                    readOnly: true,
	                    mode: "local",
	                    displayField: "show",
	                    valueField: "value",
	                    triggerAction: "all",
	                    emptyText: "-=请选择=-",
	                    store: new Ext.data.SimpleStore({
	                        fields: ["show", "value"],
	                        data: [["-=请选择=-", ""], ["短信", "1"], ["彩信", "2"]]
	                    })
	                }]
	            }]
	         }]
	    });
        // ==============================================================
		// 定义查询按钮事件方法
	    Js.Center.OtherEC.OtherData.OtherDataMainGrid = function(){
            if (ContentSelectPanelQuery.getForm().isValid()) {
                var startdate = Ext.get("startdate").dom.value;
                var enddate = Ext.get("enddate").dom.value;
                var ecname = Ext.getCmp("ecname").getValue();
                var servicecode = Ext.getCmp("servicecode").getValue();
                var servicetype = Ext.getCmp("servicetype").getValue();
                var operatortype = opidComboxQuery.getValue();
                var flag = 'otherdataquery';
                Js.Center.OtherEC.OtherData.OtherDatastore.baseParams = {
                	startdate: startdate,
                	enddate: enddate,
                	ecname: ecname,
                	servicecode: servicecode,
                	servicetype: servicetype,
                	operatortype: operatortype,
                    flag: flag
                };
                Js.Center.OtherEC.OtherData.OtherDatastore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        //其他需要预加载函数数组
        var OtherDataImportarrInitLoadFunc = new Array();
        OtherDataImportarrInitLoadFunc[0] = "Js.Center.OtherEC.OtherDataImport.func";
        OtherDataImportarrInitLoadFunc[1] = "Js.Center.OtherEC.OtherDataUpdate.func";
	    // ==============================================================定义grid
	    var OtherDataInfoGrid = new WXTL.Widgets.CommonGrid.GridPanel({
	        anchor: '100% 100%',
	        pageSize: _pageSize,
	        needMenu: false,
	        store: Js.Center.OtherEC.OtherData.OtherDatastore,
            //其他需要预加载函数
			otherInitLoadFunc: OtherDataImportarrInitLoadFunc,
	        sm: sm,
	        cm: cm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'exporticon',
                    text: "数据导入",
                    handler: otherDataImport
                }, "", "-", "", {
                    iconCls: 'exporticon',
                    text: "数据导出",
                    handler: function(){
                        var startdate = Ext.get("startdate").dom.value;
                        var enddate = Ext.get("enddate").dom.value;
                        var ecname = encodeURI(Ext.getCmp("ecname").getValue());
                        var servicecode = Ext.getCmp("servicecode").getValue();
                        var servicetype = Ext.getCmp("servicetype").getValue();
                        var operatortype = opidComboxQuery.getValue();
                    	windowOpen(Js.Center.OtherEC.OtherDataURL + "?" + "flag=exportotherdata&startdate="+startdate+"&enddate="+enddate+"&ecname="+ecname+"&servicecode="+servicecode+"&servicetype="+servicetype+"&operatortype="+operatortype, 400, 300);
                    }
                }]
            })
	    });
		// ============================================================================定义主panel
		Js.Center.OtherEC.OtherData.OtherDataPanel = new Ext.Panel({
	        frame: true, // 渲染面板
	        id: "Js.Center.OtherEC.OtherData.OtherDataPanel",
	        bodyBorder: false,
	        border: false,
	        autoScroll: true, // 自动显示滚动条
	        layout: "anchor",
	        defaults: {
	            collapsible: true // 允许展开和收缩
	        },
	        items: [ContentSelectPanelQuery,OtherDataInfoGrid]
	    });
	};
	GridMain(node,Js.Center.OtherEC.OtherData.OtherDataPanel, "openroomiconinfo","Js.Center.OtherEC.OtherData.OtherDatastore");
};