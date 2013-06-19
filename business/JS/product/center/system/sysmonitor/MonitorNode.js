Ext.namespace('Js.Center.Monitor.SysMonitor.MonitorNode');

Js.Center.Monitor.SysMonitor.MonitorNode.info = function(node){

    if (Ext.get("Js.Center.Monitor.SysMonitor.MonitorNode.Nodepanel") == null) {
        
        // ======================================================================= 定义GridPanel相关
         nodeMonitor = function(rowIndex){
        	var row = Js.Center.Monitor.SysMonitor.MonitorNode.Infostore.getAt(rowIndex);
        	//var nodeid = node.id;
        	//var nodeMonitor = tree.getNodeById('s521');
//        	var nodeMonitor = [{
//        		id:node.id + '_' + row.get("numtaskid"),
//        		text:row.get("vc2taskname") +'监控信息',
//        		url:'Js.Center.Monitor.SysMonitor.SysMonitorinfo'
//        	}];
        	var nodeId = 'nodemonitorinfo'+row.get("numtaskid");
        	var nodeText = "• " + row.get("vc2taskname") +'监控';
        	var url = 'Js.Center.Monitor.SysMonitor.SysMonitorinfo';
        	var nodeMonitorid = row.get("numtaskid");
        	
        	    if (nodeText.length > 1) {
        	        nodeText = nodeText.substring(1, nodeText.length);
        	    }
        	    var node = eval({
        	        "id": nodeId,
        	        "monitorNodeid": nodeMonitorid,
        	        "text": nodeText,
        	        "url": url
        	    });
        	    var tab = center.getItem("tab" + nodeId);
        	    if(tab){
        	    	center.remove(tab);
        	    	tab.removeAll();
        	    }
        	    if (!center.getItem("tab" + nodeId)) {
        	        //OpenNum++;
        	        loadflag = false;
        	        tab = center.add({
        	            id: "tab" + node.id,
        	            monitorNodeid: nodeMonitorid,
        	            //name: storename,
        	            iconCls: 'openroomiconinfo',
        	            xtype: "panel",
        	            title: node.text,
        	            closable: true,
        	            layout: "fit"//,
        	            //            listeners: {
        	            //                click: function(){
        	            //                    if (storename != null && storename != "") {
        	            //                        eval(storename + '.reload()');
        	            //                    }
        	            //                }
        	            //            },
        	            //items: [grid]
        	        }).show();
        	        WXTL.Common.showWaitLoading(true);
        	        eval(url + '(node,nodeMonitorid)');
        	        //WXTL.Common.showWaitLoading(false);
        	    }
        	    
        	    center.setActiveTab(tab);
        	//menuClick(nodeid,nodetext,url);
        	//Js.Center.Monitor.SysMonitor.SysMonitorinfo(nodeMonitor);
        };
        //网元处理速度监控
        handleSpeedMonitor = function(rowIndex){
        	var row = Js.Center.Monitor.SysMonitor.MonitorNode.Infostore.getAt(rowIndex);
        	
        	var nodeId = 'handlespeedmonitor'+ row.get("numtaskid");
        	var nodeText = "• " + row.get("vc2taskname") +'速度';
        	var url = 'Js.Center.Monitor.SysMonitor.HandleSpeedMonitor.func';
        	var nodeMonitorid = row.get("numtaskid");
        	
    	    if (nodeText.length > 1) {
    	        nodeText = nodeText.substring(1, nodeText.length);
    	    }
    	    var node = eval({
    	        "id": nodeId,
    	        "monitorNodeid": nodeMonitorid,
    	        "text": nodeText,
    	        "url": url
    	    });
    	    var tab = center.getItem("tab" + nodeId);
    	    if(tab){
    	    	center.remove(tab);
    	    	tab.removeAll();
    	    }
    	    if (!center.getItem("tab" + nodeId)) {
    	        //OpenNum++;
    	        loadflag = false;
    	        tab = center.add({
    	            id: "tab" + node.id,
    	            monitorNodeid: nodeMonitorid,
    	            //name: storename,
    	            iconCls: 'openroomiconinfo',
    	            xtype: "panel",
    	            title: node.text,
    	            closable: true,
    	            layout: "fit"
    	        }).show();
    	        WXTL.Common.showWaitLoading(true);
    	        eval(url + '(node,nodeMonitorid)');
    	        //WXTL.Common.showWaitLoading(false);
    	    }
    	    
    	    center.setActiveTab(tab);
        };
        //网元有效数据
        viewValidData = function(rowIndex){
        	var row = Js.Center.Monitor.SysMonitor.MonitorNode.Infostore.getAt(rowIndex);
        	
        	var nodeId = 'viewvaliddata'+ row.get("numtaskid");
        	var nodeText = "• " + row.get("vc2taskname") +'有效数据';
        	var url = 'Js.Center.Monitor.SysMonitor.ViewValidData.func';
        	var nodeMonitorid = row.get("numtaskid");
        	
    	    if (nodeText.length > 1) {
    	        nodeText = nodeText.substring(1, nodeText.length);
    	    }
    	    var node = eval({
    	        "id": nodeId,
    	        "monitorNodeid": nodeMonitorid,
    	        "text": nodeText,
    	        "url": url
    	    });
    	    var tab = center.getItem("tab" + nodeId);
    	    if(tab){
    	    	center.remove(tab);
    	    	tab.removeAll();
    	    }
    	    if (!center.getItem("tab" + nodeId)) {
    	        //OpenNum++;
    	        loadflag = false;
    	        tab = center.add({
    	            id: "tab" + node.id,
    	            monitorNodeid: nodeMonitorid,
    	            //name: storename,
    	            iconCls: 'openroomiconinfo',
    	            xtype: "panel",
    	            title: node.text,
    	            closable: true,
    	            layout: "fit"
    	        }).show();
    	        WXTL.Common.showWaitLoading(true);
    	        eval(url + '(node,nodeMonitorid)');
    	        //WXTL.Common.showWaitLoading(false);
    	    }
    	    
    	    center.setActiveTab(tab);
        };
        
        // ===============================================分页每页显示数量
        var _pageSize = 12;
        // ===============================================指定列参数
        
        var fields = ["numtaskid","vc2taskname","vc2taskdesc"];
        Js.Center.Monitor.SysMonitor.MonitorNode.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.System.Deployment.DeploymentQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numtaskid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'numtaskid',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                vc2taskname: '',
                flag: 'selectbykey'
            }
        });
        Js.Center.Monitor.SysMonitor.MonitorNode.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize,
                vc2taskname: '',
                flag: 'selectbykey'
            }
        });
        
        // ==================================================== 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numtaskid"
        });
        // ==================================================== 列头
        var cm = new Ext.grid.ColumnModel([sm, {
            header: "网元编号",
            tooltip: "网元编号",
            dataIndex: "numtaskid",
            sortable: true
        }, {
            header: "网元名称",
            tooltip: "网元名称",
            dataIndex: "vc2taskname",
            sortable: true
        }, {
            header: "网元描述",
            tooltip: "网元描述",
            dataIndex: "vc2taskdesc",
            sortable: true
        }, {
            header: "操作",
            tooltip: "操作",
            dataIndex: "filename",
            renderer: function(value, meta, record, rowIndex, colIndex, store){
            	
                return "<a href='#' onclick='nodeMonitor("+ rowIndex +")'>监控</a>  <a href='#' onclick='handleSpeedMonitor("+ rowIndex +")'>速度</a>  <a href='#' onclick='viewValidData("+ rowIndex +")'>有效数据</a>";
            }
        }]);
        
        //==============================================================定义grid
        //var arrInitLoadFunc = new Array();
		//arrInitLoadFunc[0] = "Js.Center.Monitor.SysMonitor.HandleSpeedMonitor.func";
        var NodeGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.Monitor.SysMonitor.MonitorNode.Infostore,
            //修改调用方法名称
            //updateMethod: 'Js.Center.Monitor.SysMonitor.HandleSpeedMonitor',
            sm: sm,
            cm: cm,
            needMenu:false,
            needRightMenu:false
            //其他需要预加载函数
			//otherInitLoadFunc:arrInitLoadFunc
        });
        
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            height:120,
        	//查询调用的方法
            queryMethod: "Js.Center.Monitor.SysMonitor.MonitorNode.queryGrid",
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
                    buttonAlign: "center",
                    bodyStyle: "padding:10px 0 10px 15px",
                    items: [{
                        xtype: "textfield",
                        name: "vc2taskname",
                        id: "Js.Center.Monitor.SysMonitor.MonitorNode.vc2taskname",
                        fieldLabel: "网元名称",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 50
                    }]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.Monitor.SysMonitor.MonitorNode.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var _vc2taskname = Ext.get("Js.Center.Monitor.SysMonitor.MonitorNode.vc2taskname").getValue();
                var _flag = 'selectbykey';
                Js.Center.Monitor.SysMonitor.MonitorNode.Infostore.baseParams = {
                	vc2taskname: _vc2taskname,
                    flag: _flag
                };
                Js.Center.Monitor.SysMonitor.MonitorNode.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.Monitor.SysMonitor.MonitorNode.NodePanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.Monitor.SysMonitor.MonitorNode.Nodepanel",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, NodeGrid]
        });
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.Monitor.SysMonitor.MonitorNode.NodePanel, "openroomiconinfo", "Js.Center.Monitor.SysMonitor.MonitorNode.Infostore");
};

