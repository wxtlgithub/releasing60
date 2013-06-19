/**
 * 监控报警页面信息
 */
Ext.namespace('Js.Center.Alert.AlertInfo');
Js.Center.Alert.AlertInfo.Info = function(node){
	if(Ext.get("Js.Center.Alert.AlertInfo.MainPanel") == null){
		//=================定义网关监控Grid==========Start====================
		// ============ 指定列参数==============
        var gatewayfields = ["numtaskid","numgwid","vc2gatewayname","module_status","connection_status","response_count","submit_speed","numstate","queue_count","numstatus"];
		//=============================定义通用模块数据源
        Js.Center.Alert.AlertInfo.gatewayInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Alert.AlertQueryURL,
                method: "POST"
            }), 
            reader: new Ext.data.JsonReader({
                fields: gatewayfields,
                root: "data",
                id: "numgwid",
                totalProperty: "totalCount"          
            }),
            sortInfo: {
                field: 'numtaskid',
                direction: 'asc'
            },//解决分组无效代码
            baseParams: {
                flag: 'selectgatewaymonitorinfo'
            }
        });
//        Js.Center.Alert.AlertInfo.gatewayInfostore.load({
//            params: {
//                flag: 'selectgatewaymonitorinfo'
//            }
//        });
        // ==================================================== 列选择模式
        var gwsm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numgwid"
        });
        // ==================================================== 列头
        var gwcm = new Ext.grid.ColumnModel([{
            header: "模块ID",
            tooltip: "模块ID",
            dataIndex: "numtaskid",
            sortable: true
        },{
        	header:"积压数量",
        	tooltip: "积压数量",
        	dataIndex:"queue_count",
        	sortable:true
        },{
            header: "网关ID",
            tooltip: "网关ID",
            dataIndex: "numgwid",
            sortable: true
        }, {
            header: "网关名称",
            tooltip: "网关名称",
            dataIndex: "vc2gatewayname",
            sortable: true,
			renderer:function(value, meta, record, rowIndex, colIndex, store){			
				return "<span id='Js.Center.Alert.AlertInfo.GWGrid"+ record.id +"' onMouseOut='Js.Center.Alert.AlertInfo.mouseOutClose(\"" + record.id + "\")'  onclick='Js.Center.Alert.AlertInfo.ModuleShow(\"Js.Center.Alert.AlertInfo.GWGrid\",\"" + record.id + "\",\"" + value + "\",\"" + record.data.numtaskid + "\")'>" + value + "</span>";
			}                                
        },{
            header: "运行状态",
            tooltip: "运行状态",
            dataIndex: "module_status",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store) {  
            	if(record.get("numstatus") == 0){//增加只有启用状态才显现信息
							return "";
				}
                if (value == "INIT") {
                    return "初始化";
                }
                else if (value == "READY") {
                    return "就绪";
                }
                else if (value == "START") {
                    return "运行";
                }
                else if (value == "PAUSE") {
                    return "暂停";
                }
                else if (value == "STOP") {
                    return "停止";
                }else if (value == "STOPPING") {
                    return "停止中";
                }
                else{
                    return "";
                }
        }
        }, {
            header: "连接状态",
            tooltip: "连接状态",
            dataIndex: "connection_status",
            sortable: true,
            renderer : function(value, meta, record, rowIndex,colIndex, store) {
						if(record.get("numstatus") == 0){//增加只有启用状态才显现信息
							return "";
						}
						if (value == "true") {
							return "<font color='green'>连接</font>";
						} else if (value == "false") {
							if (record.get("numstate") == 1) {
								if (record.get("module_status") == "START") {// 增加只有运行状态下的才报警
									soundManager.play('alertSound');
								}
								return "<font color='red'>断开</font>";
							} else {
								return "<font color='green'>断开</font>";
							}

						}
					}
        },{
            header: "今日发送总数",
            tooltip: "今日发送总数",
            dataIndex: "response_count",
            sortable: true,
            renderer:function(value, meta, record, rowIndex, colIndex, store){
            	if(record.get("numstatus") == "0"){//增加只有启用状态才显现信息
					return "";
				}
				else{
					return value;
				}
            }
        }, {
            header: "发送速度",
            tooltip: "发送速度",
            dataIndex: "submit_speed",
            sortable: true,
            renderer:function(value, meta, record, rowIndex, colIndex, store){
            	if(record.get("numstatus") == "0"){//增加只有启用状态才显现信息
					return "";
				}
				else{
					return value;
				}
            }
        }]);
        //定义网关监控Grid ==================================
        var gatewayGrid = new Ext.grid.GridPanel({//new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '100% 100%',
            bodyStyle:'width:100%',
			//title:'',//'网关监控',
			//height:240,
			//width:536,
            //pageSize: _commonModulepageSize,
            store: Js.Center.Alert.AlertInfo.gatewayInfostore,
            viewConfig: {
                autoFill: true,
                forceFit: true
            },
            autoHeight: true,
//			needRightMenu:false,
//			needMenu:false,
//			loadMask:false,
//          needPage:false,
            sm: gwsm,
            cm: gwcm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "报警设置",
                    //hidden: true,
					handler: function(){
                		var record = Js.Center.Alert.AlertInfo.getAlertSetInfo();
                		Js.Center.Alert.AlertGatewaySet.window.updateRecord = record;
                		Js.Center.Alert.AlertGatewaySet.window.show();
                		if(record.data.GatewayStateRule_mode != null){
                			Js.Center.Alert.AlertGatewaySet.window.items.items[0].findByType("checkboxgroup")[0].setValue(record.data.GatewayStateRule_mode.split(','));
                		}
                		else{
                			Js.Center.Alert.AlertGatewaySet.window.items.items[0].findByType("checkboxgroup")[0].setValue('1');
                		}
                		
					}
                }]
            })
        });
      //=================定义网关监控Grid==========End====================

      //=================定义Response失败率监控Grid==========Start====================
		// ============ 指定列参数==============
        var respfailFields = ["numtaskid","numgwid","vc2gatewayname","response_count","response_error","response_error_pct","numstate","numstatus"];
		//=============================定义通用模块数据源
        Js.Center.Alert.AlertInfo.respFailInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Alert.AlertQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: respfailFields,
                root: "data",
                id: "numgwid",
                totalProperty: "totalCount"          
            }),
            sortInfo: {
                field: 'numtaskid',
                direction: 'asc'
            },//解决分组无效代码
            baseParams: {
                flag: 'selectresponsefailmonitorinfo'
            }
        });
//        Js.Center.Alert.AlertInfo.respFailInfostore.load({
//            params: {
//                flag: 'selectresponsefailmonitorinfo'
//            }
//        });
        // ==================================================== 列选择模式
        var respsm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numgwid"
        });
        // ==================================================== 列头
        var respcm = new Ext.grid.ColumnModel([{
            header: "模块ID",
            tooltip: "模块ID",
            dataIndex: "numtaskid",
            sortable: true
        },{
            header: "网关ID",
            tooltip: "网关ID",
            dataIndex: "numgwid",
            sortable: true
        }, {
            header: "网关名称",
            tooltip: "网关名称",
            dataIndex: "vc2gatewayname",
            sortable: true,
			renderer:function(value, meta, record, rowIndex, colIndex, store){				
				return "<span id='Js.Center.Alert.AlertInfo.RespGrid"+ record.id +"' onMouseOut='Js.Center.Alert.AlertInfo.mouseOutClose(\"" + record.id + "\")'  onclick='Js.Center.Alert.AlertInfo.ModuleShow(\"Js.Center.Alert.AlertInfo.RespGrid\",\"" + record.id + "\",\"" + value + "\",\"" + record.data.numtaskid + "\")'>" + value + "</span>";
			}                                
        },{
            header: "发送总数",
            tooltip: "发送总数",
            dataIndex: "response_count",
            sortable: true,
			renderer:function(value, meta, record, rowIndex, colIndex, store){
				if(record.get("numstatus") == 0){//增加只有启用状态才显现信息
					 return "";
				}
				if(record.get("numstate") == 1){
					soundManager.play('alertSound');
					return "<font color='red'>"+ value +"</font>";
				}
				else{
					return "<font color='green'>"+ value +"</font>";
				}
			}             
        }, {
            header: "失败数",
            tooltip: "失败数",
            dataIndex: "response_error",
            sortable: true,
            renderer:function(value, meta, record, rowIndex, colIndex, store){
            if(record.get("numstatus") == 0){//增加只有启用状态才显现信息
				return "";
			}
			if(record.get("numstate") == 1){
				return "<font color='red'>"+ value +"</font>";
			}
			else{
				return "<font color='green'>"+ value +"</font>";
			}
		}   
        }, {
            header: "失败率",
            tooltip: "失败率",
            dataIndex: "response_error_pct",
            sortable: true,
			renderer:function(value, meta, record, rowIndex, colIndex, store){	
				if(record.get("numstatus") == 0){//增加只有启用状态才显现信息
					return "";
				}
				if(record.get("numstate") == 1){
					return "<font color='red'>"+ value +"</font>";
				}
				else{
					return "<font color='green'>"+ value +"</font>";
				}
			}             
        }]);
        //定义Response失败率监控Grid ==================================
        var respfailGrid = new Ext.grid.GridPanel({//new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '100% 100%',
            bodyStyle:'width:100%',
			//title:'',//'Response失败率监控',
			//height:240,
			//width:536,
            //pageSize: _commonModulepageSize,
            store: Js.Center.Alert.AlertInfo.respFailInfostore,
            viewConfig: {
                autoFill: true,
                forceFit: true
            },
            autoHeight: true,
//			needRightMenu:false,
//			needMenu:false,
//			loadMask:false,
//          needPage:false,
            sm: respsm,
            cm: respcm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "报警设置",
                    //hidden: true,
					handler: function(){
                		var record = Js.Center.Alert.AlertInfo.getAlertSetInfo();
                		//Js.Center.Alert.AlertResponseSet.func(record);
                		Js.Center.Alert.AlertResponseSet.window.updateRecord = record;
                		Js.Center.Alert.AlertResponseSet.window.show();
                		if(record.data.ResponseRule_mode != null){
                			Js.Center.Alert.AlertResponseSet.window.items.items[0].findByType("checkboxgroup")[0].setValue(record.data.ResponseRule_mode.split(','));
                		}
                		else{
                			Js.Center.Alert.AlertResponseSet.window.items.items[0].findByType("checkboxgroup")[0].setValue('1');
                		}
                		
            			
					}
                }]
            })
        });
      //=================定义Response失败率监控Grid==========End====================
        
      //=================定义Report失败率监控Grid==========Start====================
		// ============ 指定列参数==============
        var reportfailFields = ["numtaskid","numgwid","vc2gatewayname","rpt_count","rpt_fail_count","rpt_error_pct","numstate","numstatus"];
		//=============================定义通用模块数据源
        Js.Center.Alert.AlertInfo.reportfailInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Alert.AlertQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: reportfailFields,
                root: "data",
                id: "numgwid",
                totalProperty: "totalCount"          
            }),
            sortInfo: {
                field: 'numtaskid',
                direction: 'asc'
            },//解决分组无效代码
            baseParams: {
                flag: 'selectreportfailmonitorinfo'
            }
        });
//        Js.Center.Alert.AlertInfo.reportfailInfostore.load({
//            params: {
//                flag: 'selectreportfailmonitorinfo'
//            }
//        });
        // ==================================================== 列选择模式
        var reportsm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numgwid"
        });
        // ==================================================== 列头
        var reportcm = new Ext.grid.ColumnModel([{
            header: "模块ID",
            tooltip: "模块ID",
            dataIndex: "numtaskid",
            sortable: true
        },{
            header: "网关ID",
            tooltip: "网关ID",
            dataIndex: "numgwid",
            sortable: true
        }, {
            header: "网关名称",
            tooltip: "网关名称",
            dataIndex: "vc2gatewayname",
            sortable: true,
			renderer:function(value, meta, record, rowIndex, colIndex, store){				
				return "<span id='Js.Center.Alert.AlertInfo.RepGrid"+ record.id +"' onMouseOut='Js.Center.Alert.AlertInfo.mouseOutClose(\"" + record.id + "\")'  onclick='Js.Center.Alert.AlertInfo.ModuleShow(\"Js.Center.Alert.AlertInfo.RepGrid\",\"" + record.id + "\",\"" + value + "\",\"" + record.data.numtaskid + "\")'>" + value + "</span>";
			}                                
        },{
            header: "发送总数",
            tooltip: "发送总数",
            dataIndex: "rpt_count",
            sortable: true,
			renderer:function(value, meta, record, rowIndex, colIndex, store){
				if(record.get("numstatus") == 0){//增加只有启用状态才显现信息
					return "";
				}
				if(record.get("numstate") == 1){
					soundManager.play('alertSound');
					return "<font color='red'>"+ value +"</font>";
				}
				else{
					return "<font color='green'>"+ value +"</font>";
				}
			}             
        }, {
            header: "失败数",
            tooltip: "失败数",
            dataIndex: "rpt_fail_count",
            sortable: true,
			renderer:function(value, meta, record, rowIndex, colIndex, store){	
				if(record.get("numstatus") == 0){//增加只有启用状态才显现信息
					return "";
				}
				if(record.get("numstate") == 1){
					return "<font color='red'>"+ value +"</font>";
				}
				else{
					return "<font color='green'>"+ value +"</font>";
				}
			}             
        }, {
            header: "失败率",
            tooltip: "失败率",
            dataIndex: "rpt_error_pct",
            sortable: true,
            renderer:function(value, meta, record, rowIndex, colIndex, store){	
            	if(record.get("numstatus") == 0){//增加只有启用状态才显现信息
					return "";
				}
				if(record.get("numstate") == 1){
					return "<font color='red'>"+ value +"</font>";
				}
				else{
					return "<font color='green'>"+ value +"</font>";
				}
			}   
        }]);
        //定义Report失败率监控Grid ==================================
        var reportfailGrid = new Ext.grid.GridPanel({//new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '100% 100%',
            bodyStyle:'width:100%',
			title:'',//'Report失败率监控',
			//height:240,
			//width:536,
            //pageSize: _commonModulepageSize,
            store: Js.Center.Alert.AlertInfo.reportfailInfostore,
            viewConfig: {
                autoFill: true,
                forceFit: true
            },
            autoHeight: true,
//			needRightMenu:false,
//			needMenu:false,
//			loadMask:false,
//          needPage:false,
            sm: reportsm,
            cm: reportcm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "报警设置",
                    //hidden: true,
                    handler: function(){
            			var record = Js.Center.Alert.AlertInfo.getAlertSetInfo();
            			Js.Center.Alert.AlertReportSet.window.updateRecord = record;
            			Js.Center.Alert.AlertReportSet.window.show();
            			if(record.data.ReportRule_mode != null){
            				Js.Center.Alert.AlertReportSet.window.items.items[0].findByType("checkboxgroup")[0].setValue(record.data.ReportRule_mode.split(','));
            			}
            			else{
            				Js.Center.Alert.AlertReportSet.window.items.items[0].findByType("checkboxgroup")[0].setValue('1');
            			}
            			
					}
                }]
            })
        });
      //=================定义Report失败率监控Grid==========End====================
        
      //=================定义延时监控Grid==========Start====================
		// ============ 指定列参数==============
        var delayFields = ["numtaskid","numgwid","vc2gatewayname","sms_delay","sms_delay_average","numstate","numstatus"];
		//=============================定义通用模块数据源
        Js.Center.Alert.AlertInfo.delayInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Alert.AlertQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: delayFields,
                root: "data",
                id: "numgwid",
                totalProperty: "totalCount"          
            }),
            sortInfo: {
                field: 'numtaskid',
                direction: 'asc'
            },//解决分组无效代码
            baseParams: {
                flag: 'selectdelaymonitorinfo'
            }
        });
//        Js.Center.Alert.AlertInfo.delayInfostore.load({
//            params: {
//                flag: 'selectdelaymonitorinfo'
//            },
//            "callback": function(){
//            	//Js.Center.Alert.AlertInfo.getNewMonitorInfo('1','start','232',node);
//            }
//        });
        // =============================== 列选择模式
        var delaysm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numgwid"
        });
        // =============================== 列头
        var delaycm = new Ext.grid.ColumnModel([{
            header: "模块ID",
            tooltip: "模块ID",
            dataIndex: "numtaskid",
            sortable: true
        },{
            header: "网关ID",
            tooltip: "网关ID",
            dataIndex: "numgwid",
            sortable: true
        }, {
            header: "网关名称",
            tooltip: "网关名称",
            dataIndex: "vc2gatewayname",
            sortable: true,
			renderer:function(value, meta, record, rowIndex, colIndex, store){				
				return "<span id='Js.Center.Alert.AlertInfo.DelayGrid"+ record.id +"' onMouseOut='Js.Center.Alert.AlertInfo.mouseOutClose(\"" + record.id + "\")'  onclick='Js.Center.Alert.AlertInfo.ModuleShow(\"Js.Center.Alert.AlertInfo.DelayGrid\",\"" + record.id + "\",\"" + value + "\",\"" + record.data.numtaskid + "\")'>" + value + "</span>";
			}                                
        },{
            header: "平均延时(秒)",
            tooltip: "平均延时(秒)",
            dataIndex: "sms_delay_average",
            sortable: true,
            renderer:function(value, meta, record, rowIndex, colIndex, store){
            	if (record.get("numstatus") == 0) {// 增加只有启用状态才显现信息
					 return "";
				} 
        		
				if(value != '-1'){
					if (record.get("numstate") == 1) {
						soundManager.play('alertSound');
						return "<font color='red'>" + value + "</font>";
					} else {
						return "<font color='green'>" + value+ "</font>";
					}
				} else {
					return "";
				}
			}  
        }, {
            header: "最新延时(秒)",
            tooltip: "最新延时(秒)",
            dataIndex: "sms_delay",
            sortable: true,
            renderer:function(value, meta, record, rowIndex, colIndex, store){
            	if(record.get("numstatus") == 0){//增加只有启用状态才显现信息
					return "";
				}
				else{
					if(value != '-1'){
						if(record.get("numstate") == 1){
							return "<font color='red'>"+ value +"</font>";
						}
						else{
							return "<font color='green'>"+ value +"</font>";
						}
					} else {
						return "";
					}
				}
			}   
        }]);
        //定义延时监控Grid ==================================
        var delayGrid = new Ext.grid.GridPanel({//new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '100% 100%',
            bodyStyle:'width:100%',
			//title:'',//'延时监控',
			//height:240,
			//width:536,
            //pageSize: _commonModulepageSize,
            store: Js.Center.Alert.AlertInfo.delayInfostore,
            viewConfig: {
                autoFill: true,
                forceFit: true
            },
            autoHeight: true,
//			needRightMenu:false,
//			needMenu:false,
//			loadMask:false,
//          needPage:false,
            sm: delaysm,
            cm: delaycm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "报警设置",
                    //hidden: true,
                    handler: function(){
        				var record = Js.Center.Alert.AlertInfo.getAlertSetInfo();
        				Js.Center.Alert.AlertDelaySet.window.updateRecord = record;
        				Js.Center.Alert.AlertDelaySet.window.show();
        				if(record.data.SendTimelagRule_mode != null){
        					Js.Center.Alert.AlertDelaySet.window.items.items[0].findByType("checkboxgroup")[0].setValue(record.data.SendTimelagRule_mode.split(','));
        				}
        				else{
        					Js.Center.Alert.AlertDelaySet.window.items.items[0].findByType("checkboxgroup")[0].setValue('1');
        				}
        				
            			
					}
                }]
            })
        });
      //=================定义延时监控Grid==========End====================

        Js.Center.Alert.AlertInfo.MainPanel = new Ext.Panel({
	        frame: true, // 渲染面板
	        id: "Js.Center.Alert.AlertInfo.MainPanel",
	        bodyBorder: false,
	        border: false,
	        autoScroll: true, // 自动显示滚动条
	        layout: "anchor",
	        defaults: {
	            collapsible: true // 允许展开和收缩
	        },
	        items:[{
	        	bodyStyle: "padding:5px 0 0 15px",
	        	//hidden:true,
	        	html:"<a href='#' onclick='commonSet(0)'>邮件报警设置</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' onclick='commonSet(1)'>短信报警设置</a>"
	        },{
	        	xtype:'portal',
	        	margins:'20 5 5 0',
    			anchor:"98%",
	        	items:[{
	        		columnWidth: .5,
	        		//style:'padding:5px 0 10px 10px',
	        		items:[{
	        			title:'网关监控',
	        			//height:200,
	        			autoHeight:true,
	        			autoScroll:true,
	        			style:'padding:10px 0 10px 10px',
	        			items:[gatewayGrid]
	        		},{
	        			title:'Response失败率监控',
	        			//height:200,
	        			autoHeight:true,
	        			autoScroll:true,
	        			style:'padding:10px 0 10px 10px',
	        			items:[respfailGrid]
	        		}]
	        	},{
	        		columnWidth: .5,
	        		//style:'padding:5px 0 10px 10px',
	        		items:[{
	        			title:'Report失败率监控',
	        			//height:200,
	        			autoHeight:true,
	        			autoScroll:true,
	        			style:'padding:10px 0 10px 10px',
	        			items:[reportfailGrid]
	        		},{
	        			title:'延时监控',
	        			//height:200,
	        			autoHeight:true,
	        			autoScroll:true,
	        			style:'padding:10px 0 10px 10px',
	        			items:[delayGrid]
	        		}]
	        	}]
	        }]
	        //items: [gatewayGrid,respfailGrid,reportfailGrid,delayGrid]
	    });
	};
	//显示监控信息窗体
	Js.Center.Alert.AlertInfo.winShow = new Ext.Window({
		//title: "监视信息",
		title:"监视信息",
		width: 260,
		height: 260,
		hidden:true,
		//anchor: '100% 100%',
		headerAsText:true,
		border: false,
		bodyBorder:false, 
		plain:false,
		hideBorders:true, 
		closable:true,
		autoScroll: false,
		closeAction: 'hide',//关闭方式
		bodyStyle: "padding:10px 10px 10px 10px;background:#ffffff;",			
		items: [{
			xtype:"label",
			fieldLabel: '',
			//width: '700',
			cls:'x-window-mc-showlabel', 
			name: 'vc2Message',
			 id: 'Js.Center.Alert.AlertInfo.vc2Message',
			html:"" 
		}],					
		needButtons: false
	});
	GridMain(node,Js.Center.Alert.AlertInfo.MainPanel, "","","Js.Center.Alert.AlertInfo.getNewMonitorInfoFromDB('"+node.id+"')");
	//预加载报警设置页面
	Js.Center.Alert.AlertGatewaySet.func();
	Js.Center.Alert.AlertResponseSet.func();
	Js.Center.Alert.AlertDelaySet.func();
	Js.Center.Alert.AlertReportSet.func();
	Js.Center.Alert.AlertMailSet.func();
	Js.Center.Alert.AlertMobileSet.func();
	Js.Center.Alert.AlertInfo.getNewMonitorInfoFromDB(node.id);
	//Js.Center.Alert.AlertInfo.getNewMonitorInfo('1','start','232',node);
	commonSet = function(type){
		var record = Js.Center.Alert.AlertInfo.getAlertSetInfo();
		if(type == 0){
			Js.Center.Alert.AlertMailSet.window.updateRecord = record;
			Js.Center.Alert.AlertMailSet.window.show();
		}else if(type == 1){
			Js.Center.Alert.AlertMobileSet.window.updateRecord = record;
			Js.Center.Alert.AlertMobileSet.window.show();
		}else{
			Js.Center.Alert.AlertPageSet.func();
		}
		
	}
};
//显示监视信息用窗体实现
Js.Center.Alert.AlertInfo.ModuleShow = function(gridType,id,value,taskid){
	try{
		//var urlParam = "?cmd=-U1 -Clist";
		var urlParam = "?cmd=-U"+NUMCOMUNICATIONNODEID+" -F"+ taskid +" -Cview";
		var commandCommonData = doSynRequest(Js.Center.Alert.AlertMonitorQueryURL + urlParam);
		var showInfo = "";
		if(commandCommonData.success==true){
			var filesCount = commandCommonData.data.length;
			for (var i = 0; i < filesCount; i++) {
				showInfo +="<B>" + commandCommonData.data[i].cname + ":</B>" + commandCommonData.data[i].value + "<br>";
				
			}	
		}else{
			showInfo="没有监视信息！";			
		}							
			var positionX = Ext.fly(gridType + id + "").getX();
			var positionY = Ext.fly(gridType + id + "").getY();			
			if(positionY<200)
			{				
				positionY=positionY+10;
			}else{
				positionY=positionY-200;		
			}
			Js.Center.Alert.AlertInfo.winShow.doLayout();
			Js.Center.Alert.AlertInfo.winShow.setPosition(positionX + 50, positionY);
			Js.Center.Alert.AlertInfo.winShow.show();
			Ext.get("Js.Center.Alert.AlertInfo.vc2Message").dom.innerHTML=showInfo;
	}
	catch(err){
		Ext.Msg.alert("温馨提示", "客户端请求异常!");
	}
	
};

	Js.Center.Alert.AlertInfo.mouseOutClose = function(id){
		if (Js.Center.Alert.AlertInfo.winShow.hidden  == false) {
			//Js.Center.Alert.AlertInfo.winShow.items.remove();
			Js.Center.Alert.AlertInfo.winShow.hide();				
		}
	};
//每十秒从数据库刷新监控报警数据
	Js.Center.Alert.AlertInfo.getNewMonitorInfoFromDB = function(nodeId){
		
		Js.Center.Alert.AlertInfo.respFailInfostore.reload();
		Js.Center.Alert.AlertInfo.reportfailInfostore.reload();
		Js.Center.Alert.AlertInfo.gatewayInfostore.reload();
		Js.Center.Alert.AlertInfo.delayInfostore.reload();
		/*
		Js.Center.Alert.AlertInfo.gatewayInfostore.load({
            params: {
                flag: 'selectdelaymonitorinfo'
            },
            "callback": function(r,options,success){
            	if(success){
					Js.Center.Alert.AlertInfo.delayInfostoreLoadFun();
            	}
            }
        });
        Js.Center.Alert.AlertInfo.delayInfostoreLoadFun = function() {
				Js.Center.Alert.AlertInfo.delayInfostore.load({
					params : {
						flag : 'selectdelaymonitorinfo'
					},
					"callback" : function(r, options, success) {
						if (success) {
							var arrMir = NUMCOMUNICATIONNODEID;
							for (var i = 0; i < arrMir.length; i++) {
								Js.Center.Alert.AlertInfo.getNewMonitorInfo(arrMir[i]);
							}
						}
					}
				});
		};
				*/
		setTimeout(function(){
			//判断当前活动页面是否是监控中心页面，如果是则获取实时监控数据
       	 	var _nodeId = "tab" + nodeId;
            if(center.activeTab.id == _nodeId){
	    		Js.Center.Alert.AlertInfo.getNewMonitorInfoFromDB(nodeId);
	    	}
	    }, 10000);
	};
//每隔10秒自动请求一次获取实时监控信息并更新相关监控列表
Js.Center.Alert.AlertInfo.getNewMonitorInfo = function(id){
	try{
		var urlParam="?cmd=-U"+id+" -Cviewall";
		var commonMonitorData = doSynRequest(Js.Center.Alert.AlertMonitorQueryURL + urlParam);
		var gatewayDataStore =Js.Center.Alert.AlertInfo.gatewayInfostore;
		var delayDataStore = Js.Center.Alert.AlertInfo.delayInfostore;
		if (commonMonitorData.success == true && commonMonitorData.data != null) {
			if (commonMonitorData.data.length >= 1) {
				for (var i = 0; i < commonMonitorData.data.length; i++) {
					//更新网关监控信息
						for (var j = 0; j < gatewayDataStore.data.length; j++) {
							if (commonMonitorData.data[i].modelid == gatewayDataStore.data.items[j].data.numtaskid) {
								
								if(commonMonitorData.data[i].key == "CONNECTION_STATUS"){
									gatewayDataStore.getById(gatewayDataStore.data.items[j].data.numgwid).set('connection_status', commonMonitorData.data[i].value);
								}
								if(commonMonitorData.data[i].key == "MODULE_STATUS"){
									gatewayDataStore.getById(gatewayDataStore.data.items[j].data.numgwid).set('module_status', commonMonitorData.data[i].value);
								}
								if(commonMonitorData.data[i].key == "RESPONSE_COUNT"){
									gatewayDataStore.getById(gatewayDataStore.data.items[j].data.numgwid).set('response_count', commonMonitorData.data[i].value);
								}
								if(commonMonitorData.data[i].key == "SUBMIT_SPEED"){
									gatewayDataStore.getById(gatewayDataStore.data.items[j].data.numgwid).set('submit_speed', commonMonitorData.data[i].value);
								}
								if(commonMonitorData.data[i].key == "QUEUE_COUNT"){
									gatewayDataStore.getById(gatewayDataStore.data.items[j].data.numgwid).set('queue_count', commonMonitorData.data[i].value);
								}
								gatewayDataStore.getById(gatewayDataStore.data.items[j].data.numgwid).commit();
							}
					}
					//更新延时监控信息
					for (var j = 0; j < delayDataStore.data.length; j++) {
						if (commonMonitorData.data[i].modelid == delayDataStore.data.items[j].data.numtaskid) {
							if(commonMonitorData.data[i].key == "SMS_DELAY"){
								delayDataStore.getById(delayDataStore.data.items[j].data.numgwid).set('sms_delay', commonMonitorData.data[i].value);
							}
						}
					}
				}
				gatewayDataStore.commitChanges();
				delayDataStore.commitChanges();
			}
		}
		else{
			Ext.Msg.alert("温馨提示", "服务器请求异常!"); 
			
		}
	}	
	catch(err){
		Ext.Msg.alert("温馨提示", "客户端请求异常!");
	}
};
//=======获取报警设置信息Record
Js.Center.Alert.AlertInfo.getAlertSetInfo = function(){
	try{
		var setInfoData = doSynRequest(Js.Center.Alert.AlertUpdateURL +"?flag=selectalertsetall");
		var record = new Ext.data.Record.create([{
			name:'GatewayStateRule_duration',type:'string',defaultValue:'10'
		},{
			name:'GatewayStateRule_mode',type:'string'
		},{
			name:'GatewayStateRule_times',type:'string'
		},{
			name:'GatewayStateRule_interval',type:'string'
		},{
			name:'GatewayStateRule_message',type:'string'
		},{
			name:'ResponseRule_duration',type:'string'
		},{
			name:'ResponseRule_failurerate',type:'string'
		},{
			name:'ResponseRule_sendvolume',type:'string'
		},{
			name:'ResponseRule_mode',type:'string'
		},{
			name:'ResponseRule_times',type:'string'
		},{
			name:'ResponseRule_interval',type:'string'
		},{
			name:'ResponseRule_message',type:'string'
		},{
			name:'ReportRule_duration',type:'string'
		},{
			name:'ReportRule_failurerate',type:'string'
		},{
			name:'ReportRule_sendvolume',type:'string'
		},{
			name:'ReportRule_mode',type:'string'
		},{
			name:'ReportRule_times',type:'string'
		},{
			name:'ReportRule_interval',type:'string'
		},{
			name:'ReportRule_message',type:'string'
		},{
			name:'SendTimelagRule_duration',type:'string'
		},{
			name:'SendTimelagRule_timelagduration',type:'string'
		},{
			name:'SendTimelagRule_mode',type:'string'
		},{
			name:'SendTimelagRule_times',type:'string'
		},{
			name:'SendTimelagRule_interval',type:'string'
		},{
			name:'SendTimelagRule_message',type:'string'
		},{
			name:'8001_sender',type:'string'
		},{
			name:'8001_server',type:'string'
		},{
			name:'8001_user',type:'string'
		},{
			name:'8001_password',type:'string'
		},{
			name:'8001_subject',type:'string'
		},{
			name:'8001_receiverlist',type:'string'
		},{	 
			name:'8001_defaultproduct',type:'string'
		},{
			name:'8001_mobilelist',type:'string'
		},{
			name:'8001_sound',type:'string'
		}]);
		var setInfoRecord = new record({});
		if(setInfoData.data != null){
			for(var i=0;i<setInfoRecord.fields.items.length;i++){
				for(var j=0;j<setInfoData.data.length; j++){
					var field = setInfoRecord.fields.items[i].name;
					if(setInfoRecord.fields.items[i].name == setInfoData.data[j].key){
						setInfoRecord.set(setInfoRecord.fields.items[i].name,setInfoData.data[j].value);
					}
				}
			}
		}
		return setInfoRecord;
	}
	catch(err){
		Ext.Msg.alert("温馨提示", "客户端请求异常!");
	}
	
	
	
};