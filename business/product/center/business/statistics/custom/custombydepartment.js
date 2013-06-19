Ext.namespace('Js.Center.Statistics.CustomBydePartment');

Js.Center.Statistics.CustomBydePartment.info = function(node){
    
    if (Ext.get("Js.Center.Statistics.CustomBydePartment.MainPanel") == null) {
        
        //============================================================================定义GridPanel相关
        // 分页每页显示数量
        var _pageSize = -1;
        //==============================================================Grid数据定义
        
        Js.Center.Statistics.CustomBydePartment.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Statistics.StatisticsCustomURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ["datstat", "numdepartid","numorder", "vc2departname", "numusers", "numgroupnum"],
                root: "data",
                id: "numlogid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'datstat',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                datcreattimestart: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
                datcreattimeend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                flag: 'countcustomerbydepartment',
                vc2departname: ''
            }
        });
        
        //==============================================================列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numlogid"
        });
        //==============================================================列头
        var cm = new Ext.grid.ColumnModel([{
            header: "部门名称",
            tooltip: "部门名称",
            dataIndex: "vc2departname",
            sortable: true
        },{
            header: "部门顺序号",
            tooltip: "部门顺序号",
            dataIndex: "numorder",
            sortable: true
        }, {
            header: "客户组数量",
            tooltip: "客户组数量",
            dataIndex: "numgroupnum",
            sortable: true
        }, {
            header: "客户数量",
            tooltip: "客户数量",
            dataIndex: "numusers",
            sortable: true
        }, {
            header: "日期",
            tooltip: "日期",
            dataIndex: "datstat",
            sortable: true,
            renderer: function(value){
                return value.trim().substring(0, value.indexOf(" "));
            }
        }]);
        
        //==============================================================定义grid
        var userGroupGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '100% 100%',
            //pageSize: _pageSize,
			needPage:false,
            store: Js.Center.Statistics.CustomBydePartment.Infostore,
            needMenu: false,
            needRightMenu: false,
            sm: sm,
            cm: cm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'exporticon',
                    text: "数据导出",
                    handler: function(){
                        exportData(Js.Center.Statistics.StatisticsCustomURL, "flag=loadbydepartment&limit=-1&start=0&vc2departname=" + Ext.get("custombydepartmentvc2departname").getValue() + "&datcreattimestart=" + Ext.get("custombydepartmentdatcreattimestart").getValue() + "&datcreattimeend=" + Ext.get("custombydepartmentdatcreattimeend").getValue());
                    }
                }]
            })
        });
        
        //============================================================================ 定义formpanel
        
        
        //=============================================================定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            //查询调用的方法
            queryMethod: "Js.Center.Statistics.CustomBydePartment.queryGrid",
            bodyStyle: "padding:10px 0 10px 15px",
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
                    items: [{
                        xtype: "datefield",
                        fieldLabel: "开始时间",
                        format: 'Y-m-d',
                        labelWidth: 100,
                        readOnly: true,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
                        fieldLabel: "开始时间",
                        name: "datcreattimestart",
                        id: "custombydepartmentdatcreattimestart"
                    }, {
                        xtype: "textfield",
                        name: "vc2departname",
                        id: "custombydepartmentvc2departname",
                        fieldLabel: "部门名称",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 50,                        maxLengthText:'长度不能超过50！'
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
                        id: "custombydepartmentdatcreattimeend"
                    }]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.Statistics.CustomBydePartment.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var datCreatTimeStart = Ext.get("custombydepartmentdatcreattimestart").getValue();
                var datCreatTimeend = Ext.get("custombydepartmentdatcreattimeend").getValue();
                var _vc2departname = Ext.get("custombydepartmentvc2departname").getValue();
                var flag = 'countbydepartment';
                Js.Center.Statistics.CustomBydePartment.Infostore.baseParams = {
                    flag: flag,
                    datcreattimestart: datCreatTimeStart,
                    datcreattimeend: datCreatTimeend,
                    vc2departname: _vc2departname
                };
                Js.Center.Statistics.CustomBydePartment.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.Statistics.CustomBydePartment.MainPanel = new Ext.Panel({
            id: "Js.Center.Statistics.CustomBydePartment.MainPanel",
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
    GridMain(node, Js.Center.Statistics.CustomBydePartment.MainPanel, "openroomiconinfo", "Js.Center.Statistics.CustomBydePartment.Infostore");
};


