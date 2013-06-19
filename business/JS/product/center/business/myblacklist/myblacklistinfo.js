/*
 *
 *客户黑名单列表页
 */
Ext.namespace('Js.Center.Business.Myblacklist');
Js.Center.Business.Myblacklist.info = function(node) {

    if (Ext.get("Js.Center.Business.Myblacklist.MainPanel") == null) {
        // 分页每页显示数量
        var _pageSize = 12;
        //==================================Start=====定义grid 数据源=============================================
        Js.Center.Business.Myblacklist.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.MyBlackURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ["numlogid", "numtotalnum", "numsuccessnum", "numstate", "statetext", "opationtype", "vc2username", "datcreattime"],
                root: "data",
                id: "numlogid",
                totalProperty: "totalCount"
            }),
            sortInfo: {
                field: 'datcreattime',
                direction: 'DESC'
            },
            baseParams: {
                flag: 'selectlog',
                datcreattimestart: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
                datcreattimeend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d')
            }
        });
        Js.Center.Business.Myblacklist.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize
            }
        });
        //==================================End=====定义grid 数据源=============================================
        //===================================Start=========列选择模式==================================================
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numlogid"
        });
        var cm = new Ext.grid.ColumnModel([{
            header: '总数',
            tooltip: '总数',
            dataIndex: 'numtotalnum',
            sortable: true
        }, {
            header: "成功数",
            tooltip: "成功数",
            dataIndex: "numsuccessnum",
            sortable: true
        }, {
            header: "处理状态",
            tooltip: "处理状态",
            dataIndex: "statetext",
            sortable: true
        }, {
            header: "操作类型",
            tooltip: "操作类型",
            dataIndex: "opationtype",
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
            dataIndex: "numlogid",
            width: 50,
            renderer: function(value, meta, record, rowIndex, colIndex, store) {
                return "<a href='#' onclick='doLoad(\"" + Js.Center.Business.MyBlackURL + "\",\"" + record.data.numlogid + "\")'>详情下载</a>";
            }
}]);

            //===================================End=========列选择模式==================================================

            //=====================================Start=========================定义grid======================================
            var myBlackListAdd = new Array();
            myBlackListAdd[0] = "Js.Center.Business.Myblacklist.func";
            myBlackListAdd[1] = "Js.Center.Business.MyBlacklistDelete.func";
            var MyblackUserGrid = new WXTL.Widgets.CommonGrid.GridPanel({

                id: "MyblacklistaddGridPanel",
                anchor: '100% 100%',
                pageSize: _pageSize,
                store: Js.Center.Business.Myblacklist.Infostore,
                needMenu: false,
                needRightMenu: false,
                otherInitLoadFunc: myBlackListAdd,
                sm: sm,
                cm: cm,
                tbar: new Ext.Toolbar({
                    items: [{
                        iconCls: 'addicon',
                        text: "添加",
                        handler: function() {
                            Js.Center.Business.Myblacklist.window.show();

                        }
                    }, {
                        iconCls: 'deleteicon',
                        text: "退出",
                        handler: function() {
                            Js.Center.Business.MyBlacklistDelete.window.show();
                        }
}]
                    })
                });
                //=====================================End=========================定义grid======================================
                //=====================================Start============================定义formpanel============================ 
                var MyblackselectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
                    id: "MyblacklistaddSelectPanel",
                    queryMethod: "Js.Center.Business.Myblacklist.queryGrid",
                    bodyStyle: "padding:10px 0 10px 15px",
                    items: [{
                        layout: 'column',
                        items: [{
                            columnWidth: .5,
                            layout: 'form',
                            defaultType: "textfield",
                            defaults: {
                                anchor: "90%",
                                msgTarget: "side"
                            },
                            buttonAlign: "center",
                            items: [{
                                xtype: "datefield",
                                fieldLabel: "开始时间",
                                format: 'Y-m-d',
                                labelWidth: 100,
                                readOnly: true,
                                emptyText: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
                                fieldLabel: "开始时间",
                                name: "datcreattimestart",
                                id: "Myblacklistadddatcreattimestart",
                                validateOnBlur: false,
                                validator: function() {
                                    var strat_time = Ext.get("Myblacklistadddatcreattimestart").dom.value;
                                    var end_time = Ext.get("Myblacklistadddatcreattimeend").dom.value;
                                    if (strat_time <= end_time) {
                                        return true;
                                    }
                                    else {
                                        return false;
                                    }
                                },
                                invalidText: '结束时间不能小于开始时间！'
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
                                items: [{
                                    xtype: "datefield",
                                    fieldLabel: "结束时间",
                                    labelWidth: 100,
                                    format: 'Y-m-d',
                                    readOnly: true,
                                    emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                                    name: "datcreattimeend",
                                    id: "Myblacklistadddatcreattimeend",
                                    validateOnBlur: false,
                                    validator: function() {
                                        var strat_time = Ext.get("Myblacklistadddatcreattimestart").dom.value;
                                        var end_time = Ext.get("Myblacklistadddatcreattimeend").dom.value;
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
                                Js.Center.Business.Myblacklist.queryGrid = function() {
                                    if (MyblackselectPanel.getForm().isValid()) {
                                        var datCreatTimeStart = Ext.get("Myblacklistadddatcreattimestart").getValue();
                                        var datCreatTimeend = Ext.get("Myblacklistadddatcreattimeend").getValue();
                                        var flag = 'selectlog';
                                        Js.Center.Business.Myblacklist.Infostore.baseParams = {
                                            flag: flag,
                                            datcreattimestart: datCreatTimeStart,
                                            datcreattimeend: datCreatTimeend
                                        };
                                        Js.Center.Business.Myblacklist.Infostore.load({
                                            params: {
                                                start: 0,
                                                limit: _pageSize
                                            }
                                        });
                                    }
                                };

                                //============================================================================定义主panel
                                Js.Center.Business.Myblacklist.MainPanel = new Ext.Panel({
                                    id: "Js.Center.Business.MyBlacklistAdd.MainPanel",
                                    frame: true, // 渲染面板
                                    bodyBorder: false,
                                    border: false,
                                    autoScroll: true, // 自动显示滚动条
                                    layout: "anchor",
                                    defaults: {
                                        collapsible: true // 允许展开和收缩
                                    },
                                    items: [MyblackselectPanel, MyblackUserGrid]
                                });
                            };
                            //============================================================================绑定到center
                            GridMain(node, Js.Center.Business.Myblacklist.MainPanel, "openroomiconinfo", "Js.Center.Business.Myblacklist.Infostore");





                        };









