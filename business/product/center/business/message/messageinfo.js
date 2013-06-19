Ext.namespace('Js.Center.Message');

Js.Center.Message.messageInfo = function(node){
   
    if (Ext.get("Js.Center.Message.MessagePanel") == null) {
    
        Js.Center.Common.MessageTypeStore.reload();
        // ======================================================================= 定义GridPanel相关
        // ====================================================================== 定义查看、删除、修改方法
        
        
        //===================== 查看方法
        messageUpdate = function(){
            var row = Ext.getCmp("messageGridPanel").getSelectionModel().getSelections();
            if (row.length == 0) {
                Ext.Msg.alert("提示信息", "您没有选中任何行!");
            }
            else 
                if (row.length > 1) {
                    Ext.Msg.alert("提示信息", "对不起只能选择一个!");
                }
                else 
                    if (row.length == 1) {
                        Js.Center.Message.MessageUpdate.func(row[0]);
                    }
        };
        //====================== 删除方法
        messagedelete = function(){
            //得行单个record对象
            //var row=Ext.getCmp("RoomTypeGrid").getSelectionModel().getSelected();
            //得到多个record对象
            var row = Ext.getCmp("messageGridPanel").getSelectionModel().getSelections();
            if (row.length == 0) {
                Ext.Msg.alert("提示信息", "请您至少选择一个!");
            }
            else {
                Ext.Msg.confirm("提示!", "您确定要删除信息吗?", function(btn){
                    if (btn == "yes") {
                        //js.center.dirtyword.dirtyworddelete.func(row);
                        Js.Center.Message.MessageDelete.func(row);
                    }
                    else {
                    
                    }
                })
            }
        };
        // ===============================================分页每页显示数量
        //var pageSize = 12;
        var _pageSize = 12;
        // ===============================================指定列参数
        
        var fields = ["numcontentseqid", "vc2title", "vc2content", "datcreatetime", "suserid", "ruserid", "nummessagetypeid", "vc2messagetypename", "numtypeflag", "vc2messagetypeurl", "numstatus", "datreadtime"];
        Js.Center.Message.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Message.MessageQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numcontentseqid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'datcreatetime',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                ruserid: '1',
                flag: 'getmessagebywhere'
            }
        });
        Js.Center.Message.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize,
                ruserid: '1',
                flag: 'getmessagebywhere'
            }
        });
        
        // ==================================================== 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numcontentseqid"
        });
        // ==================================================== 列头
        var cm = new Ext.grid.ColumnModel([sm, {
            header: "标题",
            tooltip: "标题",
            dataIndex: "vc2title",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
            
                return "<a href='#' onclick='messageUpdate()'>" + value + "</a>　";
            }
        }, {
            header: "消息类型",
            tooltip: "消息类型",
            dataIndex: "vc2messagetypename",
            sortable: true
        }, {
            header: "发送人",
            tooltip: "发送人",
            dataIndex: "suserid",
            sortable: true
        }, {
            header: "状态",
            tooltip: "状态",
            dataIndex: "numstatus",
            sortable: true,
            renderer: function(value){
                if (value == 1) {
                    return "已读";
                }
                if (value == 0) {
                    return "未读";
                }
            }
        }, {
            header: "发送时间",
            tooltip: "发送时间",
            dataIndex: "datcreatetime",
            sortable: true
        }]);
        
        //==============================================================定义grid
        var MessageGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            id: "messageGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            needMenu: false,
            store: Js.Center.Message.Infostore,
            //但字段修改路径定义
            
            afterEditURL: Js.Center.Message.MessageUpdateURL,
            //修改调用方法名称
            //updateMethod: 'Js.Center.Message.MessageUpdate.func',
            //删除调用方法名称
            deleteMethod: 'Js.Center.Message.MessageDelete.func',
            sm: sm,
            cm: cm,
            listeners: {
                "rowcontextmenu": function(grid, rowIndex, e){
                    e.stopEvent();
                    openRightClick.showAt(e.getXY());
                },
                "afteredit": function(e){
                    this.afterEdit(e);
                }
            },
            tbar: new Ext.Toolbar({
                items: [{
                    text: "删除",
                    //tooltip: "删除",
                    iconCls: "deleteicon",
                    handler: messagedelete
                }]
            })
        
        });
        
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "Js.Center.Message.SelectPanel",
            height: 150,
            //查询调用的方法
            queryMethod: "Js.Center.Message.queryGrid",
            items: [{
                layout: 'column',
                items: [{
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    defaults: {
                        anchor: '90%',
                        msgTarget: "side"
                    },
                    items: [{
                        fieldLabel: '消息标题',
                        name: 'vc2title',
                        id: 'vc2title_id',
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        msgTarget: "side",
                        maxLength: 20
                    }, {
                        xtype: "combo",
                        name: "status",
                        fieldLabel: "消息状态",
                        hiddenName: "status",
                        readOnly: true,
                        mode: "local",
                        displayField: "show",
                        valueField: "value",
                        triggerAction: "all",
                        emptyText: "请选择",
                        value: '-1',
                        store: new Ext.data.SimpleStore({
                            fields: ["show", "value"],
                            data: [["请选择", "-1"], ["已读", "1"], ["未读", "0"]]
                        })
                    }]
                }, {
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    defaults: {
                        anchor: '90%',
                        msgTarget: "side"
                    },
                    items: [{
                        xtype: "xComboBox",
                        name: "nummessagetypeid",
                        fieldLabel: "消息类型",
                        hiddenName: "nummessagetypeid_ext",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2messagetypename",
                        valueField: "nummessagetypeid",
                        triggerAction: "all",
                        //emptyText: '-=请选择=-',
                        store: Js.Center.Common.MessageTypeStore
                    }]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.Message.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var _messagetitle = Ext.get("vc2title_id").getValue();
                var _messagetype = Ext.get("nummessagetypeid_ext").getValue();
                var _status = Ext.get("status").getValue();
                var flag = 'getmessagebywhere';
                
                Js.Center.Message.Infostore.baseParams = {
                    messagetitle: _messagetitle,
                    messagetype: _messagetype,
                    ruserid: '1',
                    status: _status,
                    flag: flag
                };
                Js.Center.Message.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.Message.MessagePanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.Message.MessagePanel",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, MessageGrid]
        })
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.Message.MessagePanel, "openroomiconinfo", "Js.Center.Message.Infostore");
};

