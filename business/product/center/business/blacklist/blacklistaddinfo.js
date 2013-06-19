Ext.namespace('Js.Center.Business.BlacklistAdd');

Js.Center.Business.BlacklistAdd.info = function(node){

    if (Ext.get("Js.Center.Business.BlacklistAdd.MainPanel") == null) {
        //=============================================================业务下拉列表数据定义
        
        Js.Center.Common.ServiceCodeStore.reload();
        //============================================================================定义GridPanel相关
        // 分页每页显示数量
        var _pageSize = 12;
        //==============================================================Grid数据定义
        
        Js.Center.Business.BlacklistAdd.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.BlackURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ["numlogid", "vc2svcname", "numdataid", "numstate", "vc2departname", "numlogid", "vc2columnname", "numtotalnum", "numsuccessnum", "numfailed","vc2username", "datcreattime", "numlisttype"],
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
                numsvcid: '',
                vc2username: '',
                numtypeid: '2,3,4,5'//2
            }
        });
        Js.Center.Business.BlacklistAdd.Infostore.load({
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
                    return "<a href='#' onclick='exportData(\"" + Js.Center.Business.BlackURL + "\",\"id=" + record.data.numlogid + "&flag=selectdesc&successtype=-1\")'>"+ value +"</a>";
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
                    return "<a href='#' onclick='exportData(\"" + Js.Center.Business.BlackURL + "\",\"id=" + record.data.numlogid + "&flag=selectdesc&successtype=1\")'>"+ value +"</a>";
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
                    return "<a href='#' onclick='exportData(\"" + Js.Center.Business.BlackURL + "\",\"id=" + record.data.numlogid + "&flag=selectdesc&successtype=0\")'>"+ value +"</a>";
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
            
                if (value == 2) {
                    return "添加系统黑名单";
                }
                if (value == 3) {
                    return "退出系统黑名单";
                }
                if (value == 4) {
                    return "添加彩信黑名单";
                }
                if (value == 5) {
                    return "退出彩信黑名单";
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
//                return "<a href='#' onclick='doLoad(\"" + Js.Center.Business.BlackURL + "\",\"" + record.data.numlogid + "\")'>详情下载</a>";
//            }
        }]);
        var AddBlackListArrInitLoadFunc = new Array();
        AddBlackListArrInitLoadFunc[0] = "Js.Center.Business.BlacklistAdd.func";
        AddBlackListArrInitLoadFunc[1] = "Js.Center.Business.BlacklistDelete.func";
        //==============================================================定义grid
        var userGroupGrid = new WXTL.Widgets.CommonGrid.GridPanel({

            
            id: "blacklistaddGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.Business.BlacklistAdd.Infostore,
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
                        Js.Center.Business.BlacklistAdd.window.show();
                    }
                }, {
                    iconCls: 'deleteicon',
                    text: "退出",
                    handler: function(){
                    Js.Center.Business.BlacklistDelete.window.show();
                    }
                }]
            })
        });
        
        //============================================================================ 定义formpanel
        
        //=============================================================业务下拉列表数据定义
        
        Js.Center.Common.UserGroupStore.reload();
        
        //=============================================================定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "blacklistaddSelectPanel",
            queryMethod: "Js.Center.Business.BlacklistAdd.queryGrid",
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
                        id: "blacklistadddatcreattimestart",
                        validateOnBlur: false,
                        validator: function(){
                        var strat_time = Ext.get("blacklistadddatcreattimestart").dom.value;
                        var end_time = Ext.get("blacklistadddatcreattimeend").dom.value;
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
                        hiddenName: "blacklistaddinfovc2type",
                        blankText: "-=请选择=-",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2name",
                        valueField: "value",
                        triggerAction: "all",
                        emptyText: '-=请选择=-',
                        value: "2,3,4,5",
                        store: new Ext.data.SimpleStore({
                            fields: ["vc2name", "value"],
                            data: [["-=请选择=-", "2,3,4,5"], ["添加系统黑名单", "2"], ["退出系统黑名单", "3"], ["添加彩信黑名单", "4"], ["退出彩信黑名单", "5"]]
                        })
                    }, {
                        xtype: "hidden",
                        name: "numsvcid",
                        fieldLabel: "运营商业务",
                        hiddenName: "blacklistaddnumsvcid",
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
                    items: [{
                        xtype: "datefield",
                        fieldLabel: "结束时间",
                        labelWidth: 100,
                        format: 'Y-m-d',
                        readOnly: true,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                        name: "datcreattimeend",
                        id: "blacklistadddatcreattimeend",
                        validateOnBlur: false,
                        validator: function(){
                        var strat_time = Ext.get("blacklistadddatcreattimestart").dom.value;
                        var end_time = Ext.get("blacklistadddatcreattimeend").dom.value;
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
        Js.Center.Business.BlacklistAdd.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var datCreatTimeStart = Ext.get("blacklistadddatcreattimestart").getValue();
                var datCreatTimeend = Ext.get("blacklistadddatcreattimeend").getValue();
                var _numsvcid = '';//Ext.get("blacklistaddnumsvcid").getValue();
                var numTypeId = Ext.get("blacklistaddinfovc2type").getValue();
                //var vc2UserName = Ext.get("blacklistaddvc2username").getValue();
                var flag = 'selectlog';
                Js.Center.Business.BlacklistAdd.Infostore.baseParams = {
                    flag: flag,
                    numtypeid: numTypeId,//2,
                    datcreattimestart: datCreatTimeStart,
                    datcreattimeend: datCreatTimeend,
                    numsvcid: _numsvcid
                    //vc2username: _vc2username
                };
                Js.Center.Business.BlacklistAdd.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.Business.BlacklistAdd.MainPanel = new Ext.Panel({
            id: "Js.Center.Business.BlacklistAdd.MainPanel",
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
    GridMain(node, Js.Center.Business.BlacklistAdd.MainPanel, "openroomiconinfo", "Js.Center.Business.BlacklistAdd.Infostore");
};


