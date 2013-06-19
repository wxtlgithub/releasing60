Ext.namespace('Js.Center.Business.WhitelistDelete');

Js.Center.Business.WhitelistDelete.info = function(node){
    
    if (Ext.get("Js.Center.Business.WhitelistDelete.mainpanel") == null) {
        //=============================================================业务下拉列表数据定义
        
        Js.Center.Common.ServiceCodeStore.reload();
        //============================================================================定义GridPanel相关
        // 分页每页显示数量
        var _pageSize = 12;
        //==============================================================Grid数据定义
        
        Js.Center.Business.WhitelistDelete.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.whiteURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ["numsvcid", "vc2backuppath", "vc2mode", "numdepartid", "numlogid", "numuserid", "datcreattime", "datmodifytime", "numtotalnum", "numsuccessnum", "vc2filename", "numlisttype", "numsrc", "vc2username", "vc2departname", "numstate", "vc2svcname"],
                root: "data",
                id: "numlogid",
                totalProperty: "totalCount"
            
            }),
            baseParams: {
                flag: 'selectlog',
                datcreattimestart: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
                datcreattimeend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                numsvcid: '',
                vc2username: '',
                numtypeid: 1
            }
        });
        Js.Center.Business.WhitelistDelete.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize
            }
        });
        
        //==============================================================列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numlogid"
        });
        //==============================================================列头
        var cm = new Ext.grid.ColumnModel([{
            header: "业务名称",
            tooltip: "业务名称",
            dataIndex: "vc2svcname",
            hidden: "true",
            sortable: true
        }, {
            header: "部门名称",
            tooltip: "部门名称",
            dataIndex: "vc2departname",
            sortable: true
        }, {
            header: "总数",
            tooltip: "总数",
            dataIndex: "numtotalnum",
            sortable: true
        }, {
            header: "成功数",
            tooltip: "成功数",
            dataIndex: "numsuccessnum",
            sortable: true
        }, {
            header: "处理状态",
            tooltip: "处理状态",
            dataIndex: "numstate",
            sortable: true
        }, {
            header: "操作人",
            tooltip: "操作人",
            dataIndex: "vc2username",
            sortable: true
        }, {
            header: "操作时间",
            tooltip: "操作时间",
            dataIndex: "datcreattime",
            sortable: true
        }, {
            header: "操作",
            tooltip: "操作",
            dataIndex: "numsvcid",
            width: 50,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                return "<a href='#' onclick='doLoad(\"" + Js.Center.Business.WhiteURL + "\",\"" + record.data.numlogid + "\")'>详情下载</a>";
            }
        }]);
        
        //==============================================================定义grid
        var userGroupGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            id: "whitelistdeleteGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.Business.WhitelistDelete.Infostore,
            needMenu: false,
            needRightMenu: false,
            //但字段修改路径定义   
            //        afterEditURL: Js.Center.Business.whitelistUpdateURL,
            //        //添加调用方法名称
            //        inertMethod: 'Js.Center.Business.WhitelistDelete.func',
            //        //修改调用方法名称
            //        updateMethod: 'Js.Center.Business.whitelistupdate.func',
            //        //删除调用方法名称
            //        deleteMethod: 'Js.Center.Business.WhitelistDelete.func',
            sm: sm,
            cm: cm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'deleteicon',
                    text: "退出白名单",
                    handler: function(){
                        Js.Center.Business.WhitelistDelete.func();
                    }
                }]
            })
        });
        
        //============================================================================ 定义formpanel
        
        //=============================================================业务下拉列表数据定义
        
        Js.Center.Common.UserGroupStore.load();
        
        //=============================================================定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "whitelistdeleteSelectPanel",
            //查询调用的方法
            
            
            queryMethod: "Js.Center.Business.WhitelistDelete.queryGrid",
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
                        xtype: "datefield",
                        fieldLabel: "开始时间",
                        format: 'Y-m-d',
                        labelWidth: 100,
                        bodyStyle: 'padding:5px 5px 0',
                        readOnly: true,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
                        fieldLabel: "开始时间",
                        name: "datcreattimestart",
                        id: "whitelistdeletedatcreattimestart",
                        validateOnBlur: false,
                        validator: function(){
                            var strat_time = Ext.get("whitelistadddatcreattimestart").dom.value;
                            var end_time = Ext.get("whitelistadddatcreattimeend").dom.value;
                            if (strat_time <= end_time) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        },
                        invalidText: '结束时间不能小于开始时间！'
                    }, {
                        xtype: "xComboBox",
                        name: "numsvcid",
                        fieldLabel: "选择业务",
                        hiddenName: "whitelistdeletenumsvcid",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2svcname",
                        valueField: "numsvcid",
                        triggerAction: "all",
                        
                        store: Js.Center.Common.ServiceCodeStore
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
                        xtype: "datefield",
                        fieldLabel: "结束时间",
                        labelWidth: 100,
                        format: 'Y-m-d',
                        bodyStyle: 'padding:5px 5px 0',
                        readOnly: true,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                        name: "datcreattimeend",
                        id: "whitelistdeletedatcreattimeend",
                        validateOnBlur: false,
                        validator: function(){
                            var strat_time = Ext.get("whitelistadddatcreattimestart").dom.value;
                            var end_time = Ext.get("whitelistadddatcreattimeend").dom.value;
                            if (strat_time <= end_time) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        },
                        invalidText: '结束时间不能小于开始时间！'
                    }]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.Business.WhitelistDelete.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var datCreatTimeStart = Ext.get("whitelistdeletedatcreattimestart").getValue();
                var datCreatTimeend = Ext.get("whitelistdeletedatcreattimeend").getValue();
                var _numsvcid = Ext.get("whitelistdeletenumsvcid").getValue();
                //var vc2UserName = Ext.get("whitelistdeletevc2username").getValue();
                var flag = 'selectlog';
                Js.Center.Business.WhitelistDelete.Infostore.baseParams = {
                    flag: flag,
                    numtypeid: 1,
                    datcreattimestart: datCreatTimeStart,
                    datcreattimeend: datCreatTimeend,
                    numsvcid: _numsvcid
                    //vc2username: _vc2username
                };
                Js.Center.Business.WhitelistDelete.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.Business.WhitelistDelete.MainPanel = new Ext.Panel({
            id: "Js.Center.Business.WhitelistDelete.mainpanel",
            frame: true, // 渲染面板
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, userGroupGrid]
        });
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.Business.WhitelistDelete.MainPanel, "openroomiconinfo", "Js.Center.Business.WhitelistDelete.Infostore");
};


