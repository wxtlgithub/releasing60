Ext.namespace('Js.Center.ContentQuery');
Js.Center.ContentQuery.info = function(node){
	 if (Ext.get("Js.Center.ContentQuery.ContentQueryPanel") == null) {
	        // =======================================================================
			// 定义GridPanel相关
	        // ===============================================分页每页显示数量
	        var _pageSize = 12;
	        // ===============================================指定列参数
	        // 字段
		    var fields = ["datstat", "vc2ecname", "vc2svcname", "vc2servcode", "numopid", "vc2opname", "vc2type", 
		                  "vc2messagecontent", "numcnt", "numsuccnt"];
	        Js.Center.ContentQuery.ContentQuerystore = new WXTL.Widgets.CommonData.GroupingStore({
	            proxy: new Ext.data.HttpProxy({
	                url: Js.Center.ContentQuery.QueryURL,
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
                	messagecontent: '',
                	ecname: '',
                	servicename: '',
                	servicecode: '',
	                flag: 'contentquery'
	            },
	            sortInfo: {
	                field: 'datstat',
	                direction: 'DESC'
	            }// 解决分组无效代码
	        });
	        Js.Center.ContentQuery.ContentQuerystore.load({
	            params: {
	                start: 0,
	                limit: _pageSize,
	                flag: 'contentquery'
	            }
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
	            header: "运营商",
	            tooltip: "运营商",
	            dataIndex: "vc2opname",
	            sortable: true
	        },{
	            header: "短彩类型",
	            tooltip: "短彩类型",
	            dataIndex: "vc2type",
	            sortable: true
	        },{
	            header: "发送内容",
	            tooltip: "发送内容",
	            dataIndex: "vc2messagecontent",
	            sortable: true
	        },{
	            header: "发送条数",
	            tooltip: "发送条数",
	            dataIndex: "numcnt",
	            sortable: true
	        },{
	            header: "成功条数",
	            tooltip: "成功条数",
	            dataIndex: "numsuccnt",
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
	            id: "Js.Center.ContentQuery.startdate",
	            validateOnBlur: false,
	            validator: function(){
	                var strat_time = Ext.get("Js.Center.ContentQuery.startdate").dom.value;
	                var end_time = Ext.get("Js.Center.ContentQuery.enddate").dom.value;
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
	            id: "Js.Center.ContentQuery.enddate",
	            validateOnBlur: false,
	            validator: function(){
	                var strat_time = Ext.get("Js.Center.ContentQuery.startdate").dom.value;
	                var end_time = Ext.get("Js.Center.ContentQuery.enddate").dom.value;
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
	        queryMethod: "Js.Center.ContentQuery.ContentQueryMainGrid",
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
	                    name: "messagecontent",
	                    id: "Js.Center.ContentQuery.messagecontent",
	                    fieldLabel: "发送内容",
	                    maxLength: 10,
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText
	                },{
	                    xtype: "textfield",
	                    name: "servicecode",
	                    id: "Js.Center.ContentQuery.servicecode",
	                    fieldLabel: "服务代码",
	                    maxLength: 10,
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
	                    xtype: "textfield",
	                    name: "ecname",
	                    id: "Js.Center.ContentQuery.ecname",
	                    fieldLabel: "客户名称",
	                    maxLength: 10,
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText
	                },{
	                    xtype: "textfield",
	                    name: "servicename",
	                    id: "Js.Center.ContentQuery.servicename",
	                    fieldLabel: "通道名称",
	                    maxLength: 10,
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText
	                }]
	            }]
	         }]
	    });
        // ==============================================================
		// 定义查询按钮事件方法
	    Js.Center.ContentQuery.ContentQueryMainGrid = function(){
            if (ContentSelectPanelQuery.getForm().isValid()) {
                var startdate = Ext.get("Js.Center.ContentQuery.startdate").dom.value;
                var enddate = Ext.get("Js.Center.ContentQuery.enddate").dom.value;
                var ecname = Ext.getCmp("Js.Center.ContentQuery.ecname").getValue();
                var messagecontent = Ext.getCmp("Js.Center.ContentQuery.messagecontent").getValue();
                var servicecode = Ext.getCmp("Js.Center.ContentQuery.servicecode").getValue();
                var servicename = Ext.getCmp("Js.Center.ContentQuery.servicename").getValue();
                var flag = 'contentquery';
                Js.Center.ContentQuery.ContentQuerystore.baseParams = {
                	startdate: startdate,
                	enddate: enddate,
                	messagecontent: messagecontent,
                	ecname: ecname,
                	servicename: servicename,
                	servicecode: servicecode,
                    flag: flag
                };
                Js.Center.ContentQuery.ContentQuerystore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
	    // ==============================================================定义grid
	    var ContentQueryInfoGrid = new WXTL.Widgets.CommonGrid.GridPanel({
	        anchor: '100% 100%',
	        pageSize: _pageSize,
	        needMenu: false,
	        store: Js.Center.ContentQuery.ContentQuerystore,
	        sm: sm,
	        cm: cm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'exporticon',
                    text: "数据导出",
                    handler: function(){
                        if (ContentSelectPanelQuery.getForm().isValid()) {
	                        var startdate = Ext.get("Js.Center.ContentQuery.startdate").dom.value;
	                        var enddate = Ext.get("Js.Center.ContentQuery.enddate").dom.value;
	                        var ecname = encodeURI(Ext.getCmp("Js.Center.ContentQuery.ecname").getValue());
	                        var servicecode = Ext.getCmp("Js.Center.ContentQuery.servicecode").getValue();
	                        var servicename = encodeURI(Ext.getCmp("Js.Center.ContentQuery.servicename").getValue());
	                        var messagecontent = encodeURI(Ext.getCmp("Js.Center.ContentQuery.messagecontent").getValue());
	                    	windowOpen(Js.Center.ContentQuery.QueryURL + "?" + "flag=exportcontent&start=0&limit=-1&startdate="+startdate+"&enddate="+enddate+"&ecname="+ecname+"&servicecode="+servicecode+"&servicename="+servicename+"&messagecontent="+messagecontent, 400, 300);
                        }
                    }
                }]
            })
	    });
		// ============================================================================定义主panel
		Js.Center.ContentQuery.ContentQueryPanel = new Ext.Panel({
	        frame: true, // 渲染面板
	        id: "Js.Center.ContentQuery.ContentQueryPanel",
	        bodyBorder: false,
	        border: false,
	        autoScroll: true, // 自动显示滚动条
	        layout: "anchor",
	        defaults: {
	            collapsible: true // 允许展开和收缩
	        },
	        items: [ContentSelectPanelQuery,ContentQueryInfoGrid]
	    });
	};
	GridMain(node,Js.Center.ContentQuery.ContentQueryPanel, "openroomiconinfo","Js.Center.ContentQuery.ContentQuerystore");
};