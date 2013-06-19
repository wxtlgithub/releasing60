Ext.namespace('Js.Center.System.OperatorLog');

Js.Center.System.OperatorLog.operatorloginfo = function(node){
   
    if (Ext.get("Js.Center.System.OperatorLog.OperatorLogPanel") == null) {
        // ======================================================================= 定义GridPanel相关
        var operTypeStore = new Ext.data.Store({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.System.OperatorLogURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ['numopertypeid', 'vc2opername'],
                root: "data",
                id: "numopertypeid"
            }),
            baseParams: {
                flag: 'selectopertype',
                columnlist: 'numopertypeid, vc2opername'
            }
        });
        operTypeStore.load();
        
        // ===============================================分页每页显示数量
        //var pageSize = 12;
        var _pageSize = 12;
        // ===============================================指定列参数
        var fields = ["numlogid", "datopertime", "vc2operename", "vc2opername", "vc2username", "vc2table", "vc2operdetail", "vc2operdesc", "vc2departname"];
        Js.Center.System.OperatorLog.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.System.OperatorLogURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numlogid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'datopertime',
                direction: 'DESC'
            },
            baseParams: {
                datstart: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
                datend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                vc2content: '',
                numopertypeid: '',
                vc2username:'',
                flag: 'selectbykey'
            }
        });
        Js.Center.System.OperatorLog.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize,
                datstart: '',
                datend: '',
                vc2content: '',
                numopertypeid: '',
                vc2username:'',
                flag: 'selectbykey'
            }
        });
        
        // ==================================================== 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numlogid"
        });
        // ==================================================== 列头
        var cm = new Ext.grid.ColumnModel([{
            header: " 操作时间",
            tooltip: "操作时间",
            dataIndex: "datopertime",
            sortable: true
        }, {
            header: "操作人",
            tooltip: "操作人",
            dataIndex: "vc2username",
            sortable: true
        }, {
            header: "操作类型",
            tooltip: "操作类型",
            dataIndex: "vc2opername",
            sortable: true
        }, {
            header: "操作部门",
            tooltip: "操作部门",
            dataIndex: "vc2departname",
            sortable: true
        },{
            header: "详细描述",
            tooltip: "详细描述",
            dataIndex: "vc2operdetail",
            sortable: true,
            width:220,
			renderer: function(value){
				return "<font qtip='"+ value +"'>"+value +"</font>";
			},
			readOnly:true,
			editor: new Ext.form.TextField({
				readOnly:true
			})
        }]);
        
        ////-----------------------右键菜单
        //var rightclick = new Ext.menu.Menu
        //        ({
        //            items:
        //                [{
        //                    text: '刷新信息',
        //                    iconCls: 'addicon',
        //                    handler: function() {
        
        //                    Js.Center.System.OperatorLog.Infostore.reload();
        
        //                    }
        //                }, {
        //                    text: '添加',
        //                    iconCls: 'editicon',
        //                    handler: operatorlogadd
        //                }, {
        //                    text: '删除',
        //                    iconCls: 'deleteicon',
        //                    handler: operatorlogdelete
        //}]
        //        });
        
        //==============================================================定义grid
        var operatorLogGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            id: "operatorlogGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            needMenu: false,
            store: Js.Center.System.OperatorLog.Infostore,
            sm: sm,
            cm: cm,
            needRightMenu: false
        
        });
        
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "operatorlogSelectPanel",
			height:160,
            //查询调用的方法
            queryMethod: "Js.Center.System.OperatorLog.queryGrid",
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
                    items: [new Ext.form.DateField({
                        fieldLabel: '开始时间',
                        name: 'datstart',
                        id: "operloginfodatstart",
                        readOnly: true,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
                        format: 'Y-m-d',
                        validateOnBlur: false                        
                    }), {
                        xtype: "xComboBox",
                        name: "numopertypeid",
                        fieldLabel: "操作类型",
                        hiddenName: "operlognumopertypeid",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2opername",
                        valueField: "numopertypeid",
                        triggerAction: "all",
                        emptyText: "-=请选择=-",
                        store: operTypeStore
                    }, new Ext.form.TextField({
                        fieldLabel: '操作人',
                        name: 'vc2username',
                        id: 'operatorlogUsername',
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 25,
                        maxLengthText: '长度不能超过25'
                    })]
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
                    items: [new Ext.form.DateField({
                        fieldLabel: '结束时间',
                        id: "operloginfodatend",
                        name: 'datend',
                        readOnly: true,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                        format: 'Y-m-d',
                        validateOnBlur: false,
                        validator: function(){
                        var strat_time = Ext.get("operloginfodatstart").dom.value;
                        var end_time = Ext.get("operloginfodatend").dom.value;
                        if (strat_time <= end_time) {
                            return true;
                        }
                        else {
                            return false;
                        }
                        },
                        invalidText: '结束时间不能小于开始时间！'
                    }), new Ext.form.TextField({
                        fieldLabel: '详细描述',
                        name: 'vc2content',
                        id: 'operatorlogContent',
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 50,
                        maxLengthText: '长度不能超过50'
                    })]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.System.OperatorLog.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var datStart = Ext.get("operloginfodatstart").getValue();
                var datEnd = Ext.get("operloginfodatend").getValue();
                var vc2Content = Ext.get("operatorlogContent").getValue();
                var operTypeId = Ext.get("operlognumopertypeid").getValue();
                var vc2UserName = Ext.get("operatorlogUsername").getValue();
                var flag = 'selectbykey';
                Js.Center.System.OperatorLog.Infostore.baseParams = {
                    datstart: datStart,
                    datend: datEnd,
                    vc2content: vc2Content,
                    numopertypeid: operTypeId,
                    vc2username:vc2UserName,
                    flag: flag
                };
                //Js.Center.System.OperatorLog.Infostore.reload();
                Js.Center.System.OperatorLog.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.System.OperatorLog.OperatorLogPanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.System.OperatorLog.OperatorLogPanel",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, operatorLogGrid]
        })
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.System.OperatorLog.OperatorLogPanel, "openroomiconinfo","Js.Center.System.OperatorLog.Infostore");
};

