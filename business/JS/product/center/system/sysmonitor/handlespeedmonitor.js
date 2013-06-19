Ext.namespace('Js.Center.Monitor.SysMonitor.HandleSpeedMonitor');

Js.Center.Monitor.SysMonitor.HandleSpeedMonitor.func = function(node, monitornodeid){
        // ======================================================================= 定义GridPanel相关
        // ===============================================分页每页显示数量
        var _pageSize = 12;
        // ===============================================指定列参数
        
        var fields = ["id","modulename","getspeed","putcount","putspeed","queuecount","queuename","moSend1001","getcount"];
        Js.Center.Monitor.SysMonitor.HandleSpeedMonitor.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SysMonitor.SysMonitorQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "id",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'queuename',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                cmd: monitornodeid
            }
        });
        
        
        // ==================================================== 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "id"
        });
        // ==================================================== 列头
        var cm = new Ext.grid.ColumnModel([{
            header: "模块名称",
            tooltip: "模块名称",
            dataIndex: "modulename",
            sortable: true
        },{
            header: "队列名称",
            tooltip: "队列名称",
            dataIndex: "queuename",
            sortable: true
        },{
            header: "入数量",
            tooltip: "入数量",
            dataIndex: "putcount",
            sortable: true
        },{
            header: "取数量",
            tooltip: "取数量",
            dataIndex: "getcount",
            sortable: true
        }, {
            header: "入速度",
            tooltip: "入速度",
            dataIndex: "putspeed",
            sortable: true
        },{
            header: "取速度",
            tooltip: "取速度",
            dataIndex: "getspeed",
            sortable: true
        },  {
            header: "剩余数量",
            tooltip: "剩余数量",
            dataIndex: "queuecount",
            sortable: true
        }]);
        
        //==============================================================定义grid
        var monitorGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '100% 100%',
            needPage: false,
            pageSize: _pageSize,
            store: Js.Center.Monitor.SysMonitor.HandleSpeedMonitor.Infostore,
            sm: sm,
            cm: cm,
            needMenu:false,
            needRightMenu:false
        });
        //============================================================================定义主panel
        Js.Center.Monitor.SysMonitor.HandleSpeedMonitor.mainPanel = new Ext.Panel({
            frame: true, // 渲染面板
            //id: "Js.Center.Monitor.SysMonitor.HandleSpeedMonitor.mainPanel",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
            	anchor:'98%',
                collapsible: true // 允许展开和收缩
            },
            items:[monitorGrid]
            //items: [SysMonitorCommonModuleGrid,SysMonitorcommunicationModuleGrid,SysMonitorModuleGrid, SysMonitorComponentsGrid]
        });
  //============================================================================绑定到center
    GridMain(node, Js.Center.Monitor.SysMonitor.HandleSpeedMonitor.mainPanel, "","","getHandleSpeedInfo('"+monitornodeid+"','"+node.id+"')");
    getHandleSpeedInfo(monitornodeid,node.id);
    
};
//每隔10秒自动请求一次并更新通用模块，模块，组件
function getHandleSpeedInfo(taskId, nodeId){
    try{
    	//解决同时监控多个网元速度只刷新最后打开的一个标签页问题
    	center.activeTab.items.items[0].items.items[0].store.baseParams = {
        	cmd:"-U"+taskId+" -Cqueue"
        };
    	center.activeTab.items.items[0].items.items[0].store.reload();

    	setTimeout(function(){
    		//判断当前活动页面是否是监控中心页面，如果是则获取实时监控数据
		 	var _nodeId = "tab" + nodeId;
		 	if(center.activeTab.id == _nodeId && center.activeTab.monitorNodeid == taskId){
		 		getHandleSpeedInfo(taskId,nodeId);
		    }
		}, 3000);
    }
    catch(err){
    	Ext.Msg.alert("温馨提示", "系统请求异常!");
    }
};
