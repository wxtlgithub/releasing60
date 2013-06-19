Ext.namespace('Js.Center.System.HubDataQuery');

Js.Center.System.HubDataQuery.info = function(node){

    if (Ext.get("Js.Center.System.HubDataQuery.Nodepanel") == null) {
        
        // ======================================================================= 定义GridPanel相关
         
        // ===============================================分页每页显示数量
        var _pageSize = 12;
        // ===============================================指定列参数
        
        var fields = ["name","key","value","desc"];
        Js.Center.System.HubDataQuery.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SysMonitor.SysMonitorQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numtaskid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'name',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
            	cmd:'-F601 -Cselect'
            }
        });
        Js.Center.System.HubDataQuery.Infostore.reload();
        
        // ==================================================== 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numtaskid"
        });
        // ==================================================== 列头
        var cm = new Ext.grid.ColumnModel([{
            header: "名称",
            tooltip: "名称",
            dataIndex: "name",
            sortable: true
        }, {
            header: "键",
            tooltip: "键",
            dataIndex: "key",
            sortable: true
        }, {
            header: "值",
            tooltip: "值",
            dataIndex: "value",
            sortable: true
        }, {
            header: "描述",
            tooltip: "描述",
            dataIndex: "desc",
            sortable: true
        }]);
        
        //==============================================================定义grid
        //var arrInitLoadFunc = new Array();
		//arrInitLoadFunc[0] = "Js.Center.Monitor.SysMonitor.HandleSpeedMonitor.func";
        var NodeGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.System.HubDataQuery.Infostore,
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
            queryMethod: "Js.Center.System.HubDataQuery.queryGrid",
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
                        xtype: "numberfield",
                        name: "vc2taskid",
                        id: "Js.Center.System.HubDataQuery.vc2taskid",
                        fieldLabel: "网元编号",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 50
                    }]
                },{
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
                        xtype: "numberfield",
                        name: "sid",
                        id: "Js.Center.System.HubDataQuery.SID",
                        fieldLabel: "SID",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        allowBlank: false,
                        blankText:'请输入SID',
                        maxLength: 50
                    }]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.System.HubDataQuery.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var _vc2taskid = Ext.get("Js.Center.System.HubDataQuery.vc2taskid").getValue();
                var _sid = Ext.get("Js.Center.System.HubDataQuery.SID").getValue();
                var _cmd=" -F601 -Cselect";
                if(_vc2taskid != ""){
                	_cmd = "-U" +_vc2taskid +_cmd;
                }
                if(_sid != ""){
                	_cmd = _cmd + " -P"+_sid;
                }
                Js.Center.System.HubDataQuery.Infostore.baseParams = {
                	cmd:_cmd
                };
                Js.Center.System.HubDataQuery.Infostore.reload();
            }
        };
        
        //============================================================================定义主panel
        Js.Center.System.HubDataQuery.NodePanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.System.HubDataQuery.Nodepanel",
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
    GridMain(node, Js.Center.System.HubDataQuery.NodePanel, "openroomiconinfo", "Js.Center.System.HubDataQuery.Infostore");
};

