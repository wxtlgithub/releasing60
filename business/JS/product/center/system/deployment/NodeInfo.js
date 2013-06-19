Ext.namespace('Js.Center.System.Deployment.Node');

Js.Center.System.Deployment.Node.info = function(node){

    if (Ext.get("Js.Center.System.Deployment.Node.Nodepanel") == null) {
        
        // ======================================================================= 定义GridPanel相关
         nodeConfig = function(rowIndex){
        	var row = Js.Center.System.Deployment.Node.Infostore.getAt(rowIndex);
        	Js.Center.System.Deployment.NodeConfig.func(row);
        };
        // ===============================================分页每页显示数量
        var _pageSize = 12;
        // ===============================================指定列参数
        
        var fields = ["numtaskid","vc2taskname","vc2taskdesc"];
        Js.Center.System.Deployment.Node.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
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
        Js.Center.System.Deployment.Node.Infostore.load({
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
            	
                return "<a href='#' onclick='nodeConfig("+ rowIndex +")'>配置</a>";
            }
        }]);
        
        //==============================================================定义grid
        var NodeGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.System.Deployment.Node.Infostore,
            //但字段修改路径定义
            afterEditURL: Js.Center.System.Deployment.DeploymentQueryURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.System.Deployment.NodeAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.System.Deployment.NodeUpdate',
            //删除调用方法名称
            deleteMethod: 'Js.Center.System.Deployment.NodeDelete.func',
            sm: sm,
            cm: cm
        });
        
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            //查询调用的方法
            
            queryMethod: "Js.Center.System.Deployment.Node.queryGrid",
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
                        id: "Js.Center.System.Deployment.Node.vc2taskname",
                        fieldLabel: "网元名称",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 50
                    }]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.System.Deployment.Node.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var _vc2taskname = Ext.get("Js.Center.System.Deployment.Node.vc2taskname").getValue();
                var _flag = 'selectbykey';
                Js.Center.System.Deployment.Node.Infostore.baseParams = {
                	vc2taskname: _vc2taskname,
                    flag: _flag
                };
                Js.Center.System.Deployment.Node.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.System.Deployment.Node.NodePanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.System.Deployment.Node.Nodepanel",
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
    GridMain(node, Js.Center.System.Deployment.Node.NodePanel, "openroomiconinfo", "Js.Center.System.Deployment.Node.Infostore");
};

