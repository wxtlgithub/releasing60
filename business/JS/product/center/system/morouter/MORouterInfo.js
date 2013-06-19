Ext.namespace('Js.Center.Business.MORouter');

Js.Center.Business.MORouter.info = function(node){

    Js.Center.Common.ProgramStore.reload();
    Js.Center.Common.GatewayStore.reload();
    if (Ext.get("Js.Center.Business.MORouter.MORouterpanel") == null) {
    
        // ======================================================================= 定义GridPanel相关
        // ===============================================分页每页显示数量
        //var pageSize = 12;
        var _pageSize = 12;
        // ===============================================指定列参数
        
        var fields = ["numrouteid",// 长代码指令组合编号
 "vc2lcmatch",//长号码匹配标志,1=>精确,0=>模糊
 "vc2cmdmatch",//指令匹配标志,1=>精确,0=>模糊
 "vc2longcode",//长号码
 "vc2clientname",//程序名称
 "vc2cmd",//指令 
 "numrpgmid",//程序编号
 "vc2dsc",//路由描述
 "numrpgmname",//程序名称
 "numgwid",//网关编号
 "vc2gatewayname"//网关名称
];
        Js.Center.Business.MORouter.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.MORouterQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numrouteid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'vc2longcode',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                vc2longcode: '',
                vc2cmd: '',
                numrpgmid: '',
                flag: 'selectbykey'
            }
        });
        Js.Center.Business.MORouter.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize
            }
        });
        
        // ==================================================== 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numrouteid"
        });
        // ==================================================== 列头
        var cm = new Ext.grid.ColumnModel([sm, {
            header: "路由编号",
            tooltip: "路由编号",
            dataIndex: "numrouteid",
            sortable: true
        }, {
            header: "长号码",
            tooltip: "长号码",
            dataIndex: "vc2longcode",
            sortable: true
        }, {
            header: "长号码匹配",
            tooltip: "长号码匹配",
            dataIndex: "vc2lcmatch",
            sortable: true,
            renderer: function(value){
                if (value == 1) {
                    return "精确";
                }
                if (value == 0) {
                    return "模糊";
                }
            }
        }, {
            header: "指令",
            tooltip: "指令",
            dataIndex: "vc2cmd",
            sortable: true
        }, {
            header: "指令匹配",
            tooltip: "指令匹配",
            dataIndex: "vc2cmdmatch",
            sortable: true,
            renderer: function(value){
                if (value == 1) {
                    return "精确";
                }
                if (value == 0) {
                    return "模糊";
                }
            }
        }, {
            header: "程序编号",
            tooltip: "程序编号",
            dataIndex: "numrpgmid",
            sortable: true
        }, {
            header: "程序名称",
            tooltip: "程序名称",
            dataIndex: "vc2clientname",
            sortable: true
        }, {
            header: "网关名称",
            tooltip: "网关名称",
            dataIndex: "vc2gatewayname",
            sortable: true
        }, {
            header: "路由描述",
            tooltip: "路由描述",
            dataIndex: "vc2dsc",
            sortable: true
        }]);
        
        //==============================================================定义grid
        var MORouterGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.Business.MORouter.Infostore,
            //但字段修改路径定义
            
            afterEditURL: Js.Center.Business.MORouterUpdateURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.Business.MORouterAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.Business.MORouterUpdate',
            //删除调用方法名称
            deleteMethod: 'Js.Center.Business.MORouterDelete.func',
            sm: sm,
            cm: cm
        });
        
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            //查询调用的方法
            queryMethod: "Js.Center.Business.MORouter.queryGrid",
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
                        name: "vc2longcode",
                        fieldLabel: "长号码",
                        id: "Js.Center.Business.MORouter.LongCode",
                        fieldLabel: "长号码",
                        regex: /^\d{0,20}$/,
                        regexText: '请输入长度20以内的数字！'
                    }, {
                        xtype: "xComboBox",
                        name: "numrpgmid",
                        fieldLabel: "程序名称",
                        hiddenName: "morouterProgramId",
                        readOnly: true,
                        mode: "local",
                        displayField: 'vc2clientname',
                        valueField: 'numclientid',
                        triggerAction: "all",
                        emptyText: '-=请选择=-',
                        store: Js.Center.Common.ProgramStore
                    }]
                }, {
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
                        name: "VC2CMD",
                        id: "Js.Center.Business.MORouter.CMD",
                        fieldLabel: "指令",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 20
                    }, {
                        xtype: "xComboBox",
                        name: "numgwid",
                        fieldLabel: "网关名称",
                        hiddenName: "numgwid",
                        readOnly: true,
                        mode: "local",
                        displayField: 'vc2gatewayname',
                        valueField: 'numgwid',
                        triggerAction: "all",
                        emptyText: '-=请选择=-',
                        store: Js.Center.Common.GatewayStore
                    }]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.Business.MORouter.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var _longCode = Ext.get("Js.Center.Business.MORouter.LongCode").getValue();
                var _command = Ext.get("Js.Center.Business.MORouter.CMD").getValue();
                var _programID = Ext.get("morouterProgramId").getValue();
                var _numgwID = Ext.get("numgwid").getValue();
                var _flag = 'selectbykey';
                Js.Center.Business.MORouter.Infostore.baseParams = {
                    vc2longcode: _longCode,
                    vc2cmd: _command,
                    numrpgmid: _programID,
                    numgwid: _numgwID,
                    flag: _flag
                };
                Js.Center.Business.MORouter.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.Business.MORouter.MORouterPanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.Business.MORouter.MORouterpanel",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, MORouterGrid]
        });
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.Business.MORouter.MORouterPanel, "openroomiconinfo", "Js.Center.Business.MORouter.Infostore");
};

