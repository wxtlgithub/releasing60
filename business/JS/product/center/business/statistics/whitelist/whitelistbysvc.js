Ext.namespace('Js.Center.Statistics.WhitelistBysvc');

Js.Center.Statistics.WhitelistBysvc.info = function(node){
 
    if (Ext.get("Js.Center.Statistics.WhitelistBysvc.MainPanel") == null) {
        //============================================================================定义GridPanel相关
        // 分页每页显示数量
        var _pageSize = -1;
        //==============================================================Grid数据定义
        
        Js.Center.Statistics.WhitelistBysvc.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Statistics.StatisticsWhitelistURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ["datstat", "numdepartid", "vc2departname", "numsvcid", "vc2svcname", "numcnt", "numadd", "numquit", "numqt_rate","numwhitecnt"],
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
                flag: 'countbybusi'
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
            sortable: true
        }, {
            header: "累计人数",
            tooltip: "总数",
            dataIndex: "numwhitecnt",
            sortable: true
        }, {
            header: "新增人数",
            tooltip: "新增人数",
            dataIndex: "numadd",
            sortable: true
        }, {
            header: "退订人数",
            tooltip: "退订人数",
            dataIndex: "numquit",
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
            store: Js.Center.Statistics.WhitelistBysvc.Infostore,
            needMenu: false,
            needRightMenu: false,
            sm: sm,
            cm: cm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'exporticon',
                    text: "数据导出",
                    handler: function(){
                        exportData(Js.Center.Statistics.StatisticsWhitelistURL, "flag=loadbybusi&start=0&limit=-1&numtypeid=4&datcreattimestart=" + Ext.get("whitelistbysvcdatcreattimestart").getValue() + "&datcreattimeend=" + Ext.get("whitelistbysvcdatcreattimeend").getValue())
                    }
                }]
            })
        });
        
        
        //=============================================================定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            //查询调用的方法
            queryMethod: "Js.Center.Statistics.WhitelistBysvc.queryGrid",
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
                        id: "whitelistbysvcdatcreattimestart"
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
                        id: "whitelistbysvcdatcreattimeend"
                    }]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.Statistics.WhitelistBysvc.queryGrid = function(){
            var datCreatTimeStart = Ext.get("whitelistbysvcdatcreattimestart").getValue();
            var datCreatTimeend = Ext.get("whitelistbysvcdatcreattimeend").getValue();
            var flag = 'countbybusi';
            Js.Center.Statistics.WhitelistBysvc.Infostore.baseParams = {
                flag: flag,
                numtypeid: 4,
                datcreattimestart: datCreatTimeStart,
                datcreattimeend: datCreatTimeend
            };
            Js.Center.Statistics.WhitelistBysvc.Infostore.load({
                params: {
                    start: 0,
                    limit: _pageSize
                }
            });
        };
        
        //============================================================================定义主panel
        Js.Center.Statistics.WhitelistBysvc.MainPanel = new Ext.Panel({
            id: "Js.Center.Statistics.WhitelistBysvc.MainPanel",
            frame: true, // 渲染面板
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, userGroupGrid]
        })
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.Statistics.WhitelistBysvc.MainPanel, "openroomiconinfo", "Js.Center.Statistics.WhitelistBysvc.Infostore");
};


