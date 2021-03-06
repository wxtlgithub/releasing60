Ext.namespace('Js.Center.ReportQuery');
Js.Center.ReportQuery.info = function(node){
	 if (Ext.get("Js.Center.ReportQuery.ReportQueryPanel") == null) {
	        // =============================================下拉列表绑定 （省份）
	        Js.Center.ReportQuery.GatewayAreaStore = new Ext.data.Store({
	            proxy: new Ext.data.HttpProxy({
	                url: Js.Center.ReportQuery.GatewayAreaURL,
	                method: "POST"
	            }),
	            reader: new Ext.data.JsonReader({
	                fields: ['numinstid','vc2name'],
	                root: 'data',
	                id: 'numinstid'
	            }),
	            baseParams: {
	                flag: 'querygatewayarea',
	                columnlist: 'numinstid,vc2name'
	            }
	        });
	        Js.Center.ReportQuery.GatewayAreaStore.reload();
	        
	        var instQuery = new WXTL.Widgets.CommonForm.ComboBox({
	            name: "numarea",
	            hiddenName: "numarea",
	            emptyText: "全国分省汇总",
	            fieldLabel: "省份",
	            readOnly: true,
	            mode: "local",
	            displayField: "vc2name",
	            valueField: "numinstid",
	            triggerAction: "all",
	            store:Js.Center.ReportQuery.GatewayAreaStore,
	            initCancleText: function(o){ //自动添加一个空选择项
	                var obj = this;
	                o.on("select", function(){
	                });
		            this.store.on("datachanged", function(a){
		                if (a.getAt(0) != null && a.getAt(0).data[obj.valueField] != '') {
		                    var r = new Ext.data.Record({});
		                    var unknow = new Ext.data.Record({});
		                    r.set(o.valueField, ''); 
		                    r.set(o.displayField, '全国分省汇总');
		                    a.insert(0, r);
		                    var all = new Ext.data.Record({});
		                    all.set(o.valueField, 'all'); //添加一格值为-1的选项
		                    all.set(o.displayField, '全国汇总');
		                    a.insert(0, all);
		                    unknow.set(o.valueField, '0'); 
		                    unknow.set(o.displayField, '未知');
		                    a.insert(0, unknow);
		                }
		            });
	            }
	        });
			// 定义GridPanel相关
	        // ===============================================分页每页显示数量
	        var _pageSize = 12;
	        // ===============================================指定列参数
	        // 字段
		    var fields = ["datstat", "vc2ecname", "vc2svcname", "vc2servcode", "vc2pftype", "numopid", "vc2opname", "vc2type", 
		                  "numresponsestatus", "vc2reporterrorcode", "vc2prov", "numcnt"];
	        Js.Center.ReportQuery.ReportQuerystore = new WXTL.Widgets.CommonData.GroupingStore({
	            proxy: new Ext.data.HttpProxy({
	                url: Js.Center.ReportQuery.QueryURL,
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
                	numpftype: '',
                	servicecode: '',
                	servicetype: '',
                	operatortype: '',
                	servicename: '',
                	responsestatus: '',
                	reporterrorcode: '',
                	instid: '',
	                flag: 'reportquery'
	            },
	            sortInfo: {
	                field: 'datstat',
	                direction: 'DESC'
	            }// 解决分组无效代码
	        });
	        Js.Center.ReportQuery.ReportQuerystore.load({
	            params: {
	                start: 0,
	                limit: _pageSize,
	                flag: 'reportquery'
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
		        store: Js.Center.Common.StatOperatorStore
		    });
		    
	        // ==================================================== 列选择模式
	        var sm = new Ext.grid.CheckboxSelectionModel({
	            dataIndex: "datstat"
	        });
	        // ==================================================== 列头
	        var cm = new Ext.grid.ColumnModel([{
	            header: "时间",
	            tooltip: "时间",
	            dataIndex: "datstat",
	            sortable: true
	        }, {
	            header: "客户名称",
	            tooltip: "客户名称",
	            dataIndex: "vc2ecname",
	            sortable: true
	        },{
	            header: "通道名称",
	            tooltip: "通道名称",
	            dataIndex: "vc2svcname",
	            sortable: true
	        },{
	            header: "服务代码",
	            tooltip: "服务代码",
	            dataIndex: "vc2servcode",
	            sortable: true
	        },{
	            header: "统/辅",
	            tooltip: "统/辅",
	            dataIndex: "vc2pftype",
	            sortable: true
	        },{
	            header: "运营商",
	            tooltip: "运营商",
	            dataIndex: "vc2opname",
	            sortable: true
	        },{
	            header: "response",
	            tooltip: "response",
	            dataIndex: "numresponsestatus",
	            sortable: true
	        },{
	            header: "状态码",
	            tooltip: "状态码",
	            dataIndex: "vc2reporterrorcode",
	            sortable: true
	        },{
	            header: "省份",
	            tooltip: "省份",
	            dataIndex: "vc2prov",
	            sortable: true
	        },{
	            header: "条数",
	            tooltip: "条数",
	            dataIndex: "numcnt",
	            sortable: true
	        }
	        ]);
		// ============================================================================
		    var queryStartDate = new Ext.form.DateField({
	            fieldLabel: "开始时间",
	            format: 'Y-m-d',
	            labelWidth: 100,
	            bodyStyle: 'padding:5px 5px 0',
	            readOnly: true,
	            emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
	            fieldLabel: "开始时间",
	            name: "startdate",
	            id: "Js.Center.ReportQuery.startdate",
	            validateOnBlur: false,
	            validator: function(){
	                var strat_time = Ext.get("Js.Center.ReportQuery.startdate").dom.value;
	                var end_time = Ext.get("Js.Center.ReportQuery.enddate").dom.value;
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
	            format: 'Y-m-d',
	            labelWidth: 100,
	            bodyStyle: 'padding:5px 5px 0',
	            readOnly: true,
	            emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
	            fieldLabel: "结束时间",
	            name: "enddate",
	            id: "Js.Center.ReportQuery.enddate",
	            validateOnBlur: false,
	            validator: function(){
	                var strat_time = Ext.get("Js.Center.ReportQuery.startdate").dom.value;
	                var end_time = Ext.get("Js.Center.ReportQuery.enddate").dom.value;
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
	    var ReportSelectPanelQuery= new WXTL.Widgets.CommonPanel.QueryFormPanel({
	        height: 250,
	        // 查询调用的方法
	        queryMethod: "Js.Center.ReportQuery.ReportQueryMainGrid",
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
	                    id: "Js.Center.ReportQuery.ecname",
	                    fieldLabel: "客户名称",
	                    maxLength: 10,
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText
	                },{
	                    xtype: "textfield",
	                    name: "servicecode",
	                    id: "Js.Center.ReportQuery.servicecode",
	                    fieldLabel: "服务代码",
	                    maxLength: 10,
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText
	                },opidComboxQuery,{
	                    xtype: "textfield",
	                    name: "responsestatus",
	                    id: "Js.Center.ReportQuery.responsestatus",
	                    fieldLabel: "response",
	                    maxLength: 1,
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText
	                },{
	                    xtype: "textfield",
	                    name: "reporterrorcode",
	                    id: "Js.Center.ReportQuery.reporterrorcode",
	                    fieldLabel: "状态码",
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText
	                }]
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
	                    xtype: "combo",
	                    name: "numpftype",
	                    id: "Js.Center.ReportQuery.numpftype",
	                    fieldLabel: "统/辅",
	                    readOnly: true,
	                    mode: "local",
	                    displayField: "show",
	                    valueField: "value",
	                    triggerAction: "all",
	                    emptyText: "-=请选择=-",
	                    store: new Ext.data.SimpleStore({
	                        fields: ["show", "value"],
	                    	data: [["-=请选择=-", ""], ["统付", "1"], ["辅通道", "2"]]
	                    })
	                },{
	                    xtype: "combo",
	                    name: "servicetype",
	                    id: "Js.Center.ReportQuery.servicetype",
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
	                },{
	                    xtype: "textfield",
	                    name: "servicename",
	                    id: "Js.Center.ReportQuery.servicename",
	                    fieldLabel: "通道名称",
	                    maxLength: 10,
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText
	                },instQuery]
	            }]
	         }]
	    });
        // ==============================================================
		// 定义查询按钮事件方法
	    Js.Center.ReportQuery.ReportQueryMainGrid = function(){
            if (ReportSelectPanelQuery.getForm().isValid()) {
                var startdate = Ext.get("Js.Center.ReportQuery.startdate").dom.value;
                var enddate = Ext.get("Js.Center.ReportQuery.enddate").dom.value;
                var ecname = Ext.getCmp("Js.Center.ReportQuery.ecname").getValue();
                var numpftype = Ext.getCmp("Js.Center.ReportQuery.numpftype").getValue();
                var servicecode = Ext.getCmp("Js.Center.ReportQuery.servicecode").getValue();
                var servicetype =  Ext.getCmp("Js.Center.ReportQuery.servicetype").getValue();
                var operatortype = opidComboxQuery.getValue();
                var servicename = Ext.getCmp("Js.Center.ReportQuery.servicename").getValue();
                var responsestatus = Ext.getCmp("Js.Center.ReportQuery.responsestatus").getValue();
                var instid = instQuery.getValue();
                var reporterrorcode = Ext.getCmp("Js.Center.ReportQuery.reporterrorcode").getValue();
                var flag = 'reportquery';
                Js.Center.ReportQuery.ReportQuerystore.baseParams = {
                	startdate: startdate,
                	enddate: enddate,
                	ecname: ecname,
                	numpftype: numpftype,
                	servicecode: servicecode,
                	servicetype: servicetype,
                	operatortype: operatortype,
                	servicename: servicename,
                	responsestatus: responsestatus,
                	reporterrorcode: reporterrorcode,
                	instid: instid,
                    flag: flag
                };
                Js.Center.ReportQuery.ReportQuerystore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
	    // ==============================================================定义grid
	    var ReportQueryInfoGrid = new WXTL.Widgets.CommonGrid.GridPanel({
	        anchor: '100% 100%',
	        pageSize: _pageSize,
	        needMenu: false,
	        store: Js.Center.ReportQuery.ReportQuerystore,
	        sm: sm,
	        cm: cm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'exporticon',
                    text: "数据导出",
                    handler: function(){
	                    if (ReportSelectPanelQuery.getForm().isValid()) {
	                        var startdate = Ext.get("Js.Center.ReportQuery.startdate").dom.value;
	                        var enddate = Ext.get("Js.Center.ReportQuery.enddate").dom.value;
	                        var ecname = encodeURI(Ext.getCmp("Js.Center.ReportQuery.ecname").getValue());
	                        var numpftype = Ext.getCmp("Js.Center.ReportQuery.numpftype").getValue();
	                        var servicecode = Ext.getCmp("Js.Center.ReportQuery.servicecode").getValue();
	                        var servicetype =  Ext.getCmp("Js.Center.ReportQuery.servicetype").getValue();
	                        var operatortype = opidComboxQuery.getValue();
	                        var servicename = encodeURI(Ext.getCmp("Js.Center.ReportQuery.servicename").getValue());
	                        var responsestatus = Ext.getCmp("Js.Center.ReportQuery.responsestatus").getValue();
	                        var reporterrorcode = Ext.getCmp("Js.Center.ReportQuery.reporterrorcode").getValue();
	                        var instid = instQuery.getValue();
	                    	windowOpen(Js.Center.ReportQuery.QueryURL + "?" + "flag=exportreport&start=0&limit=-1&startdate="+startdate+"&enddate="+enddate+"&ecname="+ecname+"&numpftype="+numpftype+"&servicecode="+servicecode+"&servicetype="+servicetype+"&operatortype="+operatortype+"&servicename="+servicename+"&responsestatus="+responsestatus + "&instid=" + instid + "&reporterrorcode=" + reporterrorcode, 400, 300);
	                    }
                    }
                }]
            })
	    });
		// ============================================================================定义主panel
		Js.Center.ReportQuery.ReportQueryPanel = new Ext.Panel({
	        frame: true, // 渲染面板
	        id: "Js.Center.ReportQuery.ReportQueryPanel",
	        bodyBorder: false,
	        border: false,
	        autoScroll: true, // 自动显示滚动条
	        layout: "anchor",
	        defaults: {
	            collapsible: true // 允许展开和收缩
	        },
	        items: [ReportSelectPanelQuery,ReportQueryInfoGrid]
	    });
	};
	GridMain(node,Js.Center.ReportQuery.ReportQueryPanel, "openroomiconinfo","Js.Center.ReportQuery.ReportQuerystore");
};