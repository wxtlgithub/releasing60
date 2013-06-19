/**
 * @author admin
 */
Ext.namespace('Js.Center.Monitor.SysMonitor');

Js.Center.Monitor.SysMonitor.SysMonitorinfo = function(node,monitornodeid){

    //if (Ext.get("Js.Center.Monitor.SysMonitor.SysMonitorpanel") == null) {
        // =========== 定义通用模块GridPanel相关============================================================
        // =========== 分页每页显示数量====================================
        var _commonModulepageSize = 12;
        // ============ 指定列参数===================================
        
        var commonModulefields = ["id", "name", "status","lastruntime","nodename"];
		//=============================定义通用模块数据源
        Js.Center.Monitor.SysMonitor.commonModuleInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SysMonitor.SysMonitorListURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: commonModulefields,
                root: "data",
                id: "id",
                totalProperty: "totalCount"          
            }),
            sortInfo: {
                field: 'id',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                flag: '2'
            }
        });
        Js.Center.Monitor.SysMonitor.commonModuleInfostore.load({
            params: {
                start: 0,
                limit: _commonModulepageSize,
                flag: '2',
                monitornodeid:monitornodeid
            }
        });

        // ==================================================== 列选择模式
        var commonModulesm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "id"
        });
        // ==================================================== 列头
        var commonModulecm = new Ext.grid.ColumnModel([{
            header: "通用模块ID",
            tooltip: "通用模块ID",
            dataIndex: "id",
            sortable: true
        }, {
            header: "通用模块名称",
            tooltip: "通用模块名称",
            dataIndex: "name",
            sortable: true,
			renderer:function(value, meta, record, rowIndex, colIndex, store){				
				//return "<span id='Js.Center.Monitor.SysMonitor.SysMonitorCommonModuleGrid"+ record.id +"' onMouseOut='Js.Center.Monitor.SysMonitor.mouseOutClose(\"" + record.id + "\")'  onclick='Js.Center.Monitor.SysMonitor.ModuleShow(\"" + record.id + "\",\"" + value + "\","+monitornodeid+")'><font qtip='" + value + "'>" + value + "</font></span>";
				//去掉通用模块名称鼠标停靠时间，因为通用模块没有view命令
				return value;
			}                                
        }, {
            header: "状态",
            tooltip: "状态",
            dataIndex: "status",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store) { 
                if (value == "init") {
                    return "初始化";
                }
                else if (value == "ready") {
                    return "就绪";
                }
                else if (value == "start") {
                    return "运行";
                }
                else if (value == "pause") {
                    return "暂停";
                }
                else if (value == "stop") {
                    return "停止";
                }
                else if (value == "stopping") {
                    return "停止中";
                }
                else if (value == "r") {
                    return "";
                }
                else {
                    return "状态错误";
                }
            }
        }, {
            header: "操作",
            tooltip: "操作",
            dataIndex: "id",
            width: 200,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                var strStart = "<a href='#' onclick='commandFunction(\"commonmodulemonitor\",\"" + value + "\",\"start\"," + rowIndex + ","+monitornodeid+")'>启动</a>";
                //var strPause = "<a href='#' onclick='commandFunction(\"commonmodulemonitor\",\"" + value + "\",\"pause\"," + rowIndex + ","+monitornodeid+")'>暂停</a>";
                var strStop = "<a href='#' onclick='commandFunction(\"commonmodulemonitor\",\"" + value + "\",\"stop\"," + rowIndex + ","+monitornodeid+")'>停止</a>";
                //var strShow = "";
				var strStatus=record.data.status;
                if (strStatus == "start") {
                    strStart = "启动";
                }
                else if (strStatus == "pause") {
                    //strPause = "暂停";
                }
                else if (strStatus == "stop") {
                    strStop = "停止";
                    //strPause = "暂停";
                }
                else if (strStatus == "ready") {
                    strStart = "启动";
                }
                else if (strStatus == "init") {
                    strStart = "启动";
                }
                else if (strStatus == "stopping") {
                    strStart = "启动";
                    //strPause = "暂停";
                    strStop = "停止";
                }
				else if (strStatus == "r") {
                    strStart = "启动";
                    //strPause = "暂停";
                    strStop = "停止";
                }
              	return strStart + "----" + strStop;

			}
        }]);
        
        //====================定义Modulegridnew ==========================================({//
        //修改为Ext自身控件GridPanel解决IE浏览器record执行commit方法时的抛异常问题
        var SysMonitorCommonModuleGrid = new Ext.grid.GridPanel({//WXTL.Widgets.CommonGrid.GridPanel({
            //id: "Js.Center.Monitor.SysMonitor.SysMonitorCommonModuleGrid",
            anchor: '0 0',
			width:536,
			//title:'',//'通用模块监控',
            //pageSize: _commonModulepageSize,
            store: Js.Center.Monitor.SysMonitor.commonModuleInfostore,
            viewConfig: {
                autoFill: true,
                forceFit: true
            },
            autoHeight: true,
//			needRightMenu:false,
//			needMenu:false,
//			loadMask:false,
//          needPage:false,
            sm: commonModulesm,
            cm: commonModulecm
        });
 
 //=====================================通信模块start========================================
 

        
        // =========== 分页每页显示数量====================================
        var _communicationModulepageSize = 12;
        // ============ 指定列参数===================================
        
        var communicationModulefields = ["id", "name", "status","lastruntime","nodename"];
		//=============================定义通信模块数据源
        Js.Center.Monitor.SysMonitor.communicationModuleInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SysMonitor.SysMonitorListURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: communicationModulefields,
                root: "data",
                id: "id",
                totalProperty: "totalCount"          
            }),
            sortInfo: {
                field: 'id',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                flag: '3'
            }
        });
        Js.Center.Monitor.SysMonitor.communicationModuleInfostore.load({
            params: {
                start: 0,
                limit: _communicationModulepageSize,
                flag: '3',
                monitornodeid:monitornodeid
            }
        });

        // ==================================================== 列选择模式
        var communicationModulesm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "id"
        });
        // ==================================================== 列头
        var communicationModulecm = new Ext.grid.ColumnModel([ {
            header: "通信模块ID",
            tooltip: "通信模块ID",
            dataIndex: "id",
            sortable: true
        }, {
            header: "通信模块名称",
            tooltip: "通信模块名称",
            dataIndex: "name",
            sortable: true,
			renderer:function(value, meta, record, rowIndex, colIndex, store){				
				return "<span id='Js.Center.Monitor.SysMonitor.SysMonitorCommonModuleGrid"+ record.id +"' onMouseOut='Js.Center.Monitor.SysMonitor.mouseOutClose(\"" + record.id + "\")'  onclick='Js.Center.Monitor.SysMonitor.ModuleShow(\"" + record.id + "\",\"" + value + "\","+monitornodeid+")'><font qtip='" + value + "'>" + value + "</font></span>";
			}                                
        },{
            header: "状态",
            tooltip: "状态",
            dataIndex: "status",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store) {             
                    if (value == "init") {
                        return "初始化";
                    }
                    else if (value == "ready") {
                        return "就绪";
                    }
                    else if (value == "start") {
                        return "运行";
                    }
                    else if (value == "pause") {
                        return "暂停";
                    }
                    else if (value == "stop") {
                        return "停止";
                    }
					else if (value == "stopping") {
                        return "停止中";
                    }
					else if (value == "r") {
                        return "";
                    }
                    else{
                        return "状态错误";
                    }
            }
        }, {
            header: "操作",
            tooltip: "操作",
            dataIndex: "id",
            width: 200,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                var strStart = "<a href='#' onclick='commandFunction(\"communicatemodulemonitor\",\"" + value + "\",\"start\"," + rowIndex + ","+monitornodeid+")'>启动</a>";
                //var strPause = "<a href='#' onclick='commandFunction(\"communicatemodulemonitor\",\"" + value + "\",\"pause\"," + rowIndex + ","+monitornodeid+")'>暂停</a>";
                var strStop = "<a href='#' onclick='commandFunction(\"communicatemodulemonitor\",\"" + value + "\",\"stop\"," + rowIndex + ","+monitornodeid+")'>停止</a>";
                //var strShow = "";
                var strStatus = record.data.status;
				if (strStatus == "start") {                       
					strStart = "启动";						
                }
                if (strStatus == "pause") {
                    //strPause = "暂停";
                }
                if (strStatus == "stop") {
                    strStop = "停止";
					//strPause = "暂停";
                }                  
				if(strStatus == "ready"){
					strStart = "启动";
				}	
				if (strStatus == "init") {
					strStart = "启动";		
                }
				if(strStatus=="stopping"){					
					strStart = "启动";		
					//strPause = "暂停";
					strStop = "停止";							
				}
				if (strStatus == "r") {
                    strStart = "启动";
                    //strPause = "暂停";
                    strStop = "停止";
                }
              	return strStart + "----" + strStop;

			}
        }]);
        
        //====================定义Modulegridnew ==========================================({//
        var SysMonitorcommunicationModuleGrid = new Ext.grid.GridPanel({//new WXTL.Widgets.CommonGrid.GridPanel({
            //id: "Js.Center.Monitor.SysMonitor.SysMonitorCommunicationModuleGrid",
            anchor: '100% 100%',
			//title:'',//'通信模块监控',
			width:536,
            //pageSize: _communicationModulepageSize,
            store: Js.Center.Monitor.SysMonitor.communicationModuleInfostore,
            viewConfig: {
                autoFill: true,
                forceFit: true
            },
            autoHeight: true,
//			needRightMenu:false,
//			needMenu:false,
//			loadMask:false,
//          needPage:false,
            sm: communicationModulesm,
            cm: communicationModulecm
        });
 
 //==================================通信模块end===================================================
        // ======================================================================= 定义普通模块GridPanel相关
        // ===============================================分页每页显示数量
        var _ModulepageSize = 12;
        // ===============================================指定列参数
        
        var Modulefields = ["id", "name", "status","lastruntime","nodename"];
        Js.Center.Monitor.SysMonitor.ModuleInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SysMonitor.SysMonitorListURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: Modulefields,
                root: "data",
                id: "id",
                totalProperty: "totalCount"          
            }),
            sortInfo: {
                field: 'id',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                flag: '4'
            }
        });
        Js.Center.Monitor.SysMonitor.ModuleInfostore.load({
            params: {
                start: 0,
                limit: _ModulepageSize,
                flag: '4',
                monitornodeid:monitornodeid
            }
        });

        // ==================================================== 列选择模式
        var Modulesm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "id"
        });
        // ==================================================== 列头
        var Modulecm = new Ext.grid.ColumnModel([ {
            header: "功能模块ID",
            tooltip: "功能模块ID",
            dataIndex: "id",
            sortable: true
        }, {
            header: "功能模块名称",
            tooltip: "功能模块名称",
            dataIndex: "name",
            sortable: true,
			renderer:function(value, meta, record, rowIndex, colIndex, store){
				//return "<span id='Js.Center.Monitor.SysMonitor.SysMonitorCommonModuleGrid"+ record.id +"' onMouseOut='Js.Center.Monitor.SysMonitor.mouseOutClose()'  onclick='Js.Center.Monitor.SysMonitor.ModuleShow(\"" + record.id + "\",\"" + value + "\","+monitornodeid+")'><font qtip='" + value + "'>" + value + "</font></span>";
				//去掉功能模块名称鼠标停靠时间，因为功能模块没有view命令
				return value;
			}             
        }, {
            header: "状态",
            tooltip: "状态",
            dataIndex: "status",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store) {
               
               
                    if (value == "init") {
                        return "初始化";
                    }
                    else if (value == "ready") {
                        return "就绪";
                    }
                    else if (value == "start") {
                        return "运行";
                    }
                    else if (value == "pause") {
                        return "暂停";
                    }
                    else if (value == "stop") {
                        return "停止";
                    }else if (value == "stopping") {
                        return "停止中";
                    }else if (value == "r") {
                        return "";
                    }
                    else{
                        return "状态错误";
                    }
                
            }
//        }, {
//            header: "操作",
//            tooltip: "操作",
//            dataIndex: "id",
//            width: 200,
//            renderer: function(value, meta, record, rowIndex, colIndex, store){
//			   	var strStart ="<a href='#' onclick='commandFunction(\"modulemonitor\",\"" + value + "\",\"start\"," + rowIndex + ","+monitornodeid+")'>启动</a>";
//			   	var strPause="<a href='#' onclick='commandFunction(\"modulemonitor\",\"" + value + "\",\"pause\"," + rowIndex + ","+monitornodeid+")'>暂停</a>";
//			   	var strStop="<a href='#' onclick='commandFunction(\"modulemonitor\",\"" + value + "\",\"stop\"," + rowIndex + ","+monitornodeid+")'>停止</a>";
//			   	//var strShow="";
//			   	var strStatus=record.data.status;
//				if (strStatus == "start") {                       
//					strStart = "启动";						
//                }
//                if (strStatus == "pause") {
//                    strPause = "暂停";
//                }
//                if (strStatus == "stop") {
//                    strStop = "停止";
//					strPause = "暂停";
//                }                  
//				if(strStatus == "ready"){
//					strStart = "启动";
//				}	
//				if (strStatus == "init") {
//					strStart = "启动";		
//                }
//				if(strStatus=="stopping"){					
//					strStart = "启动";		
//					strPause = "暂停";
//					strStop = "停止";							
//				}
//				if (strStatus == "r") {
//                    strStart = "启动";
//                    strPause = "暂停";
//                    strStop = "停止";
//                }
//				return strStart + "----" + strPause + "----" + strStop;
//        	}
        }]);
        
        //==============================================================定义Modulegridnew Ext.grid.GridPanel({//
        var SysMonitorModuleGrid = new Ext.grid.GridPanel({//new WXTL.Widgets.CommonGrid.GridPanel({
            //id: "Js.Center.Monitor.SysMonitor.SysMonitorModuleGrid",
            anchor: '100% 100%',
			//title:'',//'功能模块监控',
			width:536,
            //pageSize: _ModulepageSize,
            store: Js.Center.Monitor.SysMonitor.ModuleInfostore,
            viewConfig: {
                autoFill: true,
                forceFit: true
            },
            autoHeight: true,
//			needRightMenu:false,
//			needMenu:false,
//			loadMask:false,
//          needPage:false,
            sm: Modulesm,
            cm: Modulecm
        });
 
  // ======================================================================= 定义任务ComponentsGridPanel相关
        // ===============================================分页每页显示数量
        var _ComponentspageSize = 12;
        // ===============================================指定列参数
       
        var Componentsfields = ["id", "name", "status","lastruntime","qsize","esize","sch","status","lastovertime","nodename"];
        Js.Center.Monitor.SysMonitor.ComponentsInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SysMonitor.SysMonitorListURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: Componentsfields,
                root: "data",
                id: "id",
                totalProperty: "totalCount"          
            }),
            sortInfo: {
                field: 'id',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                flag: '5'
            }
        });
        Js.Center.Monitor.SysMonitor.ComponentsInfostore.load({
            params: {
                start: 0,
                limit: _ComponentspageSize,
                flag: '5',
                monitornodeid:monitornodeid
            },
            "callback": function(){
            	commandCommonFunction(monitornodeid,'start','232',node.id);
            }
        });

        // ==================================================== 列选择模式
        var Componentssm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "id"
        });
        // ==================================================== 列头// qsize:待处理，esize：已执行，sch：调度规则，lastovertime：最后完成时间
        var Componentscm = new Ext.grid.ColumnModel([ {
            header: "任务ID",
            tooltip: "任务ID",
            dataIndex: "id",
            sortable: true
        }, {
            header: "任务名称",
            tooltip: "任务名称",
            dataIndex: "name",
            sortable: true,
			renderer:function(value, meta, record, rowIndex, colIndex, store){
				//return "<span id='Js.Center.Monitor.SysMonitor.SysMonitorCommonModuleGrid"+ record.id +"' onMouseOut='Js.Center.Monitor.SysMonitor.mouseOutClose()'  onclick='Js.Center.Monitor.SysMonitor.ModuleShow(\"" + record.id + "\",\"" + value + "\","+monitornodeid+")'><font qtip='" + value + "'>" + value + "</font></span>";
				//去掉任务模块名称鼠标停靠时间，因为任务模块没有view命令
				return value;
			}              
        }, {
            header: "待处理",
            tooltip: "待处理",
            dataIndex: "qsize",
			hidden:true,
            sortable: true
        },{
            header: "已执行",
            tooltip: "已执行",
            dataIndex: "esize",
			hidden:true,
            sortable: true
        },{
            header: "调度规则",
            tooltip: "调度规则",
            dataIndex: "sch",
			hidden:true,
            sortable: true
        },{
            header: "状态",
            tooltip: "状态",
            dataIndex: "status",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store) {                
                if (value == "init") {
                    return "初始化";
                }
                else if (value == "ready") {
                    return "就绪";
                }
                else if (value == "start") {
                    return "运行";
                }
                else if (value == "pause") {
                    return "暂停";
                }
                else if (value == "stop") {
                    return "停止";
                }
                else if (value == "stopping") {
                        return "停止中";
                }
                else if (value == "r") {
                    return "";
                }
                else{
                    return "状态错误";
                }
        	}
        }, {
            header: "操作",
            tooltip: "操作",
            dataIndex: "id",
            width: 200,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                var strStart = "<a href='#' onclick='commandFunction(\"componentsmonitor\",\"" + value + "\",\"start\"," + rowIndex + ","+monitornodeid+")'>启动</a>";
                var strPause = "<a href='#' onclick='commandFunction(\"componentsmonitor\",\"" + value + "\",\"pause\"," + rowIndex + ","+monitornodeid+")'>暂停</a>";
                var strStop = "<a href='#' onclick='commandFunction(\"componentsmonitor\",\"" + value + "\",\"stop\"," + rowIndex + ","+monitornodeid+")'>停止</a>";
                var srtExe = "<a href='#' onclick='commandFunction(\"componentsmonitor\",\"" + value + "\",\"exe\"," + rowIndex + ","+monitornodeid+")'>手动执行</a>";
                //var strShow = "";
                var strStatus = record.data.status;
                
                if (strStatus == "start") {
                    strStart = "启动";
                }
                if (strStatus == "pause") {
                    strPause = "暂停";
                }
                if (strStatus == "stop") {
                    strStop = "停止";
                    strPause = "暂停";
                }
                if (strStatus == "ready") {
                    strStart = "启动";
                }
                if (strStatus == "init") {
                
                    strStart = "启动";
                }
                if (strStatus == "stopping") {
                    strStart = "启动";
                    strPause = "暂停";
                    strStop = "停止";
                }
				if (strStatus == "r") {
                    strStart = "启动";
                    strPause = "暂停";
                    strStop = "停止";
                    srtExe = "手动执行";
                }
				return strStart + "----" + strPause + "----" + strStop + "----" + srtExe;
        	}
        }]);
        
        //==============================================================定义Modulegrid 
        var SysMonitorComponentsGrid = new Ext.grid.GridPanel({//new WXTL.Widgets.CommonGrid.GridPanel({
            //id: "Js.Center.Monitor.SysMonitor.SysMonitorComponentsGrid",
            anchor: '100% 100%',
			//title:'',//'任务监控',
			width:536,
            //pageSize: _ComponentspageSize,
            store: Js.Center.Monitor.SysMonitor.ComponentsInfostore,
            viewConfig: {
                autoFill: true,
                forceFit: true
            },
            autoHeight: true,
//			needRightMenu:false,
//			needMenu:false,
//			loadMask:false,
//          needPage:false,
            sm: Componentssm,
            cm: Componentscm
        });
 
        //============================================================================定义主panel
        Js.Center.Monitor.SysMonitor.SysMonitorPanel = new Ext.Panel({
            frame: true, // 渲染面板
            //id: "Js.Center.Monitor.SysMonitor.SysMonitorpanel",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items:[{
	        	xtype:'portal',
	        	margins:'20 5 5 0',
    			anchor:"98%",
	        	items:[{
	        		columnWidth: .5,
	        		//style:'padding:10px 0 10px 5px',
	        		items:[{
	        			title:'通用模块监控',
	        			//height:200,
	        			autoHeight:true,
	        			autoScroll:true,
	        			style:'padding:10px 0 10px 10px',
	        			items:[SysMonitorCommonModuleGrid]
	        		},{
	        			title:'通信模块监控',
	        			//height:200,
	        			autoHeight:true,
	        			autoScroll:true,
	        			style:'padding:10px 0 10px 10px',
	        			items:[SysMonitorcommunicationModuleGrid]
	        		}]
	        	},{
	        		columnWidth: .5,
	        		//style:'padding:10px 0 10px 5px',
	        		items:[{
	        			title:'功能模块监控',
	        			//height:200,
	        			autoHeight:true,
	        			autoScroll:true,
	        			style:'padding:10px 0 10px 10px',
	        			items:[SysMonitorModuleGrid]
	        		},{
	        			title:'任务监控',
	        			//height:200,
	        			autoHeight:true,
	        			autoScroll:true,
	        			style:'padding:10px 0 10px 10px',
	        			items:[SysMonitorComponentsGrid]
	        		}]
	        	}]
	        }]
            //items: [SysMonitorCommonModuleGrid,SysMonitorcommunicationModuleGrid,SysMonitorModuleGrid, SysMonitorComponentsGrid]
        });
    //};
	
    //显示监控信息窗体
    Js.Center.Monitor.SysMonitor.winShow = new Ext.Window({
        //title: "监视信息",
        title: "监视信息",
        //id:'Js.Center.Monitor.SysMonitor.winShowid'+id,
        width: 260,
        height: 260,
        hidden: true,
        //anchor: '100% 100%',
        headerAsText: true,
        border: false,
        bodyBorder: false,
        plain: false,
        hideBorders: true,
        closable: true,
        autoScroll: false,
        closeAction: 'hide',//关闭方式
        bodyStyle: "padding:10px 10px 10px 10px;background:#ffffff;",
        items: [{
            xtype: "label",
            fieldLabel: '',
            //width: '700',
            cls: 'x-window-mc-showlabel',
            name: 'vc2Message',
            id: 'Js.Center.Monitor.SysMonitor.vc2Message',
            html: ""
        }],
        needButtons: false
    });
        //显示监控信息用Tooltip实现	
//        Js.Center.Monitor.SysMonitor.qtipshow = function(id, value){
//            //var commondOp ="-U1 -C"+ command +" -P"+ id;-U1 -F1 -Cview 
//            var urlParam = "?cmd=-U1 -F" + id + " -Cview";
//            var commandCommonData = doSynRequest(Js.Center.SysMonitor.SysMonitorQueryURL + urlParam);
//            var showInfo = "";
//            if (commandCommonData.success == true) {
//                var filesCount = commandCommonData.data.length;
//                for (var i = 0; i < filesCount; i++) {
//                    //"&lt;br&gt;"
//                    showInfo += commandCommonData.data[i].cname + ":" + commandCommonData.data[i].value + "<br>";
//                }
//            }
//            else {
//                showInfo = "没有监视信息！";
//            };
//            new Ext.ToolTip({
//                title: '监视信息',
//                width: '100',
//                height: '100',
//                animCollapse: true,
//                bodyBorder: false,
//                dismissDelay: 50000,
//                hideDelay: 0,
//                floating: true,
//                border: true,
//                autoHide: true,// 如果为true，当鼠标移出目标元素 
//                target: "Js.Center.Monitor.SysMonitor.SysMonitorCommonModuleGrid" + id + "",
//                html: showInfo
//            
//            });
//        };
	
    //显示监视信息用窗体实现
    Js.Center.Monitor.SysMonitor.ModuleShow = function(id, value, monitorNodeId){
        //var urlParam = "?cmd=-U1 -Clist";
        var urlParam = "?cmd=-U"+monitorNodeId+" -F" + id + " -Cview";
        var commandCommonData = doSynRequest(Js.Center.SysMonitor.SysMonitorQueryURL + urlParam);
        var showInfo = "";
        if (commandCommonData.success == true) {
            var filesCount = commandCommonData.data.length;
            for (var i = 0; i < filesCount; i++) {
                //"&lt;br&gt;"
                showInfo += "<B>" + commandCommonData.data[i].cname + ":</B>" + commandCommonData.data[i].value + "<br>";
            }
        }
        else {
            showInfo = "没有监视信息！";
        }
        var positionX = Ext.fly("Js.Center.Monitor.SysMonitor.SysMonitorCommonModuleGrid" + id + "").getX();
        var positionY = Ext.fly("Js.Center.Monitor.SysMonitor.SysMonitorCommonModuleGrid" + id + "").getY();
        if (positionY < 200) {
            positionY = positionY + 10;
        }
        else {
            positionY = positionY - 200;
        }
        Js.Center.Monitor.SysMonitor.winShow.doLayout();
        Js.Center.Monitor.SysMonitor.winShow.setPosition(positionX + 50, positionY);
        Js.Center.Monitor.SysMonitor.winShow.show();
        Ext.get("Js.Center.Monitor.SysMonitor.vc2Message").dom.innerHTML = showInfo;
    };

    Js.Center.Monitor.SysMonitor.mouseOutClose = function(id){
        if (Js.Center.Monitor.SysMonitor.winShow.hidden == false) {
            //Js.Center.Monitor.SysMonitor.winShow.items.remove();
            Js.Center.Monitor.SysMonitor.winShow.hide();
        }
    };
    //============================================================================绑定到center
    GridMain(node,  Js.Center.Monitor.SysMonitor.SysMonitorPanel, "","","commandCommonFunction('"+monitornodeid+"','start','232','"+node.id+"')");
    //commandCommonFunction('1','start','232',node);
};


//单个命令执行
function commandFunction(flag, id, command, rowIndex, monitorNodeId){
	try{
		//-U1 -Cstart -P101
		Ext.Msg.confirm("温馨提示!", "您确定要执行该操作吗?", function(btn){
	        if (btn == "yes") {
	        	var commondOp;
	            commondOp = "-U"+monitorNodeId+" -C" + command + " -P" + id;
	            var commondjson = doSynRequest(Js.Center.SysMonitor.SysMonitorQueryURL + "?cmd=" + commondOp);//+ flag +"&command="+ command +"&id=" + id);
	            if (commondjson.success == true) {
	                var record = "";
	                if (flag == "commonmodulemonitor") {
	                    record = center.activeTab.findByType("grid")[0].store.getAt(rowIndex);
	                }
	                else{ 
	                    if (flag == "modulemonitor") {
	                        record = center.activeTab.findByType("grid")[2].store.getAt(rowIndex);
	                    }
	                    else{
	                        if (flag == "componentsmonitor") {
	                            record = center.activeTab.findByType("grid")[3].store.getAt(rowIndex);
	                        }
	                        else {
	                            if (flag == "communicatemodulemonitor") {
	                                record = center.activeTab.findByType("grid")[1].store.getAt(rowIndex);
	                            }
	                            else {
	                                Ext.Msg.alert("温馨提示", "类型错误!");
	                            }
	                        }
	                    }
	                }
	                if (record == "") {
	                    Ext.Msg.alert("温馨提示", "数据源错误!");
	                }
	                else {
	                    if (command == "stop") {
	                        command = "stopping";
	                    }
	                    if (command != "exe") {
	                        record.set("status", command);//"pause"commondjson.data[0].status
	                        record.commit();
	                    }
	                    Ext.Msg.alert("温馨提示", "操作成功!");
	                }
	            }
	            else {
	                Ext.Msg.alert("温馨提示", "操作失败!");
	            }
	        }
	    });
	}
	catch(err){
		Ext.Msg.alert("温馨提示", "客户端请求异常!");
	}
    
    
};
 //每隔10秒自动请求一次并更新通用模块，模块，任务
 function commandCommonFunction(id, command, param, nodeId){
     try{
    	 var urlParam = "?cmd=-U"+id+" -Clist"; 
         var commandCommonData = doSynRequest(Js.Center.SysMonitor.SysMonitorQueryURL + urlParam);
         
         //解决同时打开多个网元监控页面时总是只刷新最后打开的标签页面
         var commonModuleData = center.activeTab.findByType("grid")[0].store;//通用模块
         var communicaData = center.activeTab.findByType("grid")[1].store;//通信模块
         var moduleData = center.activeTab.findByType("grid")[2].store;//功能模块
         var ComponentsData = center.activeTab.findByType("grid")[3].store;//任务模块
         if (commandCommonData.success == true) {
             if (commandCommonData.data.length >= 1) {
                 for (var i = 0; i < commandCommonData.data.length; i++) {
                     var addFalg = true;
                	 for (var j = 0; j < commonModuleData.data.length; j++) {
                         if (commandCommonData.data[i].id == commonModuleData.data.items[j].data.id && commandCommonData.data[i].type.toLowerCase() == "commonmodule") {
                        	 commonModuleData.getById(commonModuleData.data.items[j].data.id).set('status', commandCommonData.data[i].status);
                             addFalg=false;
                         }
                     }
                     for (var j = 0; j < communicaData.data.length; j++) {
                         if (commandCommonData.data[i].id == communicaData.data.items[j].data.id && commandCommonData.data[i].type.toLowerCase() == "module") {
                             communicaData.getById(communicaData.data.items[j].data.id).set('status', commandCommonData.data[i].status);
                             addFalg=false;
                         }
                     }
                     for (var j = 0; j < moduleData.data.length; j++) {
                         if (commandCommonData.data[i].id == moduleData.data.items[j].data.id && commandCommonData.data[i].type.toLowerCase() == "function") {
                             moduleData.getById(moduleData.data.items[j].data.id).set('status', commandCommonData.data[i].status);
                             addFalg=false;
                         }
                     }
                     
                     for (var j = 0; j < ComponentsData.data.length; j++) {
                         if (commandCommonData.data[i].id == ComponentsData.data.items[j].data.id && commandCommonData.data[i].type.toLowerCase() == "components") {
                             ComponentsData.getById(ComponentsData.data.items[j].data.id).set('status', commandCommonData.data[i].status);
                             //ComponentsData.getById(ComponentsData.data.items[j].data.id).set('name', commandCommonData.data[i].name);
                             //qsize:待处理，esize：已执行，sch：调度规则，lastovertime：最后完成时间
                             ComponentsData.getById(ComponentsData.data.items[j].data.id).set('qsize', commandCommonData.data[i].qsize);
                             ComponentsData.getById(ComponentsData.data.items[j].data.id).set('esize', commandCommonData.data[i].esize);
                             ComponentsData.getById(ComponentsData.data.items[j].data.id).set('sch', commandCommonData.data[i].sch);
                             ComponentsData.getById(ComponentsData.data.items[j].data.id).set('lastovertime', commandCommonData.data[i].lastovertime);
                             ComponentsData.getById(ComponentsData.data.items[j].data.id).set('lastruntime', commandCommonData.data[i].lastruntime);
                             addFalg=false;
                         }
                     }
                     //将通过命令请求返回的模块不在列表中存在的添加到相应列表显示
                     if(addFalg){
                    	//定义类型，注意和你json返回的记录格式要一致
                    	 var MyRecordType = Ext.data.Record.create([
                    	  {name: "id",  type: "string"},
                    	  {name: "name", type: "string"},
                    	  {name: "status", type: "string"}
                    	 ]);
                    	 //要添加的记录
                    	 var oneRecord = new MyRecordType({
                    		 id:  commandCommonData.data[i].id,
                    		 name: commandCommonData.data[i].name,
                    		 status: commandCommonData.data[i].status
                    	 });
                    	 //设置新添加record的id属性，避免store的getById()找不到记录
                    	 oneRecord.id = commandCommonData.data[i].id;

                    	 if(commandCommonData.data[i].type.toLowerCase() == "commonmodule"){
                    		 commonModuleData.add(oneRecord);
                    	 }
                    	 else if(commandCommonData.data[i].type.toLowerCase() == "module"){
                    		 communicaData.add(oneRecord);
                    	 }
                    	 else if(commandCommonData.data[i].type.toLowerCase() == "function"){
                    		 moduleData.add(oneRecord);
                    	 }
                    	 else if (commandCommonData.data[i].type.toLowerCase() == "components"){
                    		 ComponentsData.add(oneRecord);
                    	 }
                     }
                 }
                 commonModuleData.commitChanges();
                 communicaData.commitChanges();
                 moduleData.commitChanges();
                 ComponentsData.commitChanges();
             }
             setTimeout(function(){
            	 //判断当前活动页面是否是监控中心页面，如果是则获取实时监控数据
            	 var _nodeId = "tab" + nodeId;
                 if(center.activeTab.id == _nodeId && center.activeTab.monitorNodeid == id){
                	 commandCommonFunction(id, 'start', '232', nodeId);
                 }
             }, 3000);
         }
         else{
        	 Ext.Msg.alert("温馨提示", "服务器请求异常!"); 
         }
     }
     catch(err){
    	 Ext.Msg.alert("温馨提示", "客户端请求异常!");
     }
 };

