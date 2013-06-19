Ext.namespace('Js.Center.Business.SvcBlacklistAdd');

Js.Center.Business.SvcBlacklistAdd.info = function(node){
    if (Ext.get("Js.Center.Business.SvcBlacklistAdd.MainPanel") == null) {
        //============================================================================定义GridPanel相关
        // 分页每页显示数量
        var _pageSize = 12;
        //==============================================================Grid数据定义
        Js.Center.Business.SvcBlacklistAdd.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.SvcBlackURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ["numlogid","vc2gatewayname","vc2svcname", "numdataid", "numstate", "vc2departname", "numlogid", "vc2columnname", "numtotalnum", "numsuccessnum", "numfailed","vc2username", "datcreattime", "numlisttype"],
                root: "data",
                id: "numlogid",
                totalProperty: "totalCount"
            }),
            sortInfo: {
                field: 'datcreattime',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                flag: 'selectlog',
                datcreattimestart: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
                datcreattimeend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                numgwid: '',
                vc2username: '',
                numtypeid: '6,7'
            }
        });
        Js.Center.Business.SvcBlacklistAdd.Infostore.load({
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
            header: "网关名称",
            tooltip: "网关名称",
            dataIndex: "vc2gatewayname",
            sortable: true
        }, {
            header: "操作部门",
            tooltip: "操作部门",
            dataIndex: "vc2departname",
            sortable: true
        }, {
            header: "总数",
            tooltip: "总数",
            dataIndex: "numtotalnum",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                if(value > 0){
                    return "<a href='#' onclick='exportData(\"" + Js.Center.Business.SvcBlackURL + "\",\"id=" + record.data.numlogid + "&flag=selectdesc&successtype=-1\")'>"+ value +"</a>";
                }
                else{
                    return value;
                }
            }
        }, {
            header: "成功数",
            tooltip: "成功数",
            dataIndex: "numsuccessnum",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                if(value > 0){
                    return "<a href='#' onclick='exportData(\"" + Js.Center.Business.SvcBlackURL + "\",\"id=" + record.data.numlogid + "&flag=selectdesc&successtype=1\")'>"+ value +"</a>";
                }
                else{
                    return value;
                }
            }
        }, {
            header: "失败数",
            tooltip: "失败数",
            dataIndex: "numfailed",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                if(value > 0){
                    return "<a href='#' onclick='exportData(\"" + Js.Center.Business.SvcBlackURL + "\",\"id=" + record.data.numlogid + "&flag=selectdesc&successtype=0\")'>"+ value +"</a>";
                }
                else{
                    return value;
                }
            }
        }, {
            header: "处理状态",
            tooltip: "处理状态",
            dataIndex: "numstate",
            sortable: true
        }, {
            header: "操作类型",
            tooltip: "操作类型",
            dataIndex: "numlisttype",
            sortable: true,
            renderer: function(value){
                if (value == 6) {
                    return "添加通道黑名单";
                }
                if (value == 7) {
                    return "退出通道黑名单";
                }
            }
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
//        }, {
//            header: "操作",
//            tooltip: "操作",
//            dataIndex: "numsvcid",
//            width: 50,
//            renderer: function(value, meta, record, rowIndex, colIndex, store){
//                return "<a href='#' onclick='doLoad(\"" + Js.Center.Business.SvcBlackURL + "\",\"" + record.data.numlogid + "\")'>详情下载</a>";
//            }
        }]);
        var AddBlackListArrInitLoadFunc = new Array();
        AddBlackListArrInitLoadFunc[0] = "Js.Center.Business.SvcBlacklistAdd.func";
        AddBlackListArrInitLoadFunc[1] = "Js.Center.Business.SvcBlacklistDelete.func";
        //==============================================================定义grid
        var userGroupGrid = new WXTL.Widgets.CommonGrid.GridPanel({

            
            id: "SvcBlacklistAddGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.Business.SvcBlacklistAdd.Infostore,
            otherInitLoadFunc:AddBlackListArrInitLoadFunc,
            needMenu: false,
            needRightMenu: false,
            sm: sm,
            cm: cm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "添加",
                    handler: function(){
                        Js.Center.Business.SvcBlacklistAdd.window.show();
                    }
                }, {
                    iconCls: 'deleteicon',
                    text: "退出",
                    handler: function(){
                    Js.Center.Business.SvcBlacklistDelete.window.show();
                    }
                }]
            })
        });
        
        //============================================================================ 定义formpanel
        
        //=============================================================业务下拉列表数据定义
        
        Js.Center.Common.UserGroupStore.reload();
        
        //=============================================================定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "SvcBlacklistAddSelectPanel",
            queryMethod: "Js.Center.Business.SvcBlacklistAdd.queryGrid",
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
                        id: "SvcBlacklistAdddatcreattimestart",
                        validateOnBlur: false,
                        validator: function(){
                        var strat_time = Ext.get("SvcBlacklistAdddatcreattimestart").dom.value;
                        var end_time = Ext.get("SvcBlacklistAdddatcreattimeend").dom.value;
                        if (strat_time <= end_time) {
                            return true;
                        }
                        else {
                            return false;
                        }
                        },
                        invalidText: '结束时间不能小于开始时间！'
                        
                    }, {
                        xtype: "combo",
                        name: "numtype",
                        fieldLabel: "操作类型",
                        hiddenName: "SvcBlacklistAddinfovc2type",
                        blankText: "-=请选择=-",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2name",
                        valueField: "value",
                        triggerAction: "all",
                        emptyText: '-=请选择=-',
                        value: "6,7",
                        store: new Ext.data.SimpleStore({
                            fields: ["vc2name", "value"],
                            data: [["-=请选择=-", "6,7"], ["添加通道黑名单", "6"], ["退出通道黑名单", "7"]]
                        })
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
                        id: "SvcBlacklistAdddatcreattimeend",
                        validateOnBlur: false,
                        validator: function(){
                        var strat_time = Ext.get("SvcBlacklistAdddatcreattimestart").dom.value;
                        var end_time = Ext.get("SvcBlacklistAdddatcreattimeend").dom.value;
                        if (strat_time <= end_time) {
                            return true;
                        }
                        else {
                            return false;
                        }
                        },
                        invalidText: '结束时间不能小于开始时间！'
                    },{
                        xtype: "xComboBox",
                        name: "svcnumgwid",
                        fieldLabel: "网关名称",
                        hiddenName: "svcnumgwid",
                        //readOnly: true,
                        mode: "local",
                        store: Js.Center.Common.BusinessGatewayStore,
                        triggerAction: 'all',
                        selectOnFocus: true,
                        emptyText: '-=请选择=-',
                        //forceSelection: true, // 要求输入值必须在列表中存在
                        displayField: 'vc2gatewayname',
                        valueField: 'numgwid',
                        allowBlank: true,
                        blankText: "网关名称必选"
                    }]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.Business.SvcBlacklistAdd.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var datCreatTimeStart = Ext.get("SvcBlacklistAdddatcreattimestart").getValue();
                var datCreatTimeend = Ext.get("SvcBlacklistAdddatcreattimeend").getValue();
                var _numgwid = Ext.get("svcnumgwid").getValue();
                var numTypeId = Ext.get("SvcBlacklistAddinfovc2type").getValue();
                var flag = 'selectlog';
                Js.Center.Business.SvcBlacklistAdd.Infostore.baseParams = {
                    flag: flag,
                    numtypeid: numTypeId,//2,
                    datcreattimestart: datCreatTimeStart,
                    datcreattimeend: datCreatTimeend,
                    numgwid: _numgwid
                };
                Js.Center.Business.SvcBlacklistAdd.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.Business.SvcBlacklistAdd.MainPanel = new Ext.Panel({
            id: "Js.Center.Business.SvcBlacklistAdd.MainPanel",
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
    GridMain(node, Js.Center.Business.SvcBlacklistAdd.MainPanel, "openroomiconinfo", "Js.Center.Business.SvcBlacklistAdd.Infostore");
};


