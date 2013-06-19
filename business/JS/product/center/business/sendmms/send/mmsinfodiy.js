Ext.namespace('Js.Center.SendMMS.MMSSendDiy');

Js.Center.SendMMS.MMSSendDiy.MMSinfo = function(){
    if (Ext.get("Js.Center.SendMMS.MMSSendDiy.MainPanel") == null) {
        //============================================================================定义GridPanel相关
        // 分页每页显示数量
        var _pageSize = 5;
        //==============================================================Grid数据定义
        var fields = ["nummmsid", "vc2name", "vc2centerid","datcreatetime", "numuserid","vc2username", "datmodifytime", "numcheckuserid", "datchecktime", "vc2smilurl", "numstate", "nummmstype", "datcreattime", "nummoduserid", "vc2modusername","vc2desc"];
        Js.Center.SendMMS.MMSSendDiy.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SendMMS.MMSQueryListURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "nummmsid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                        field: 'datcreattime',
                        direction: 'DESC'
                    },//解决分组无效代码
            baseParams: {
                datcreattimestart: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'), //（创建起始时间）
                datcreattimeend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'), //（创建结束时间）
                mmsname: '',
                numcreater: '',
                numMMSType:'2',
                flag: 'selectByMMSType'
            }
        });

        //==============================================================列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "nummmsid"
        });
        //==============================================================列头
        var cm = new Ext.grid.ColumnModel([{
            hidden: true,
            header: "彩信编号",
            tooltip: "彩信编号",
            dataIndex: "nummmsid",
            sortable: true
        }, {
			header: "彩信标题",
			tooltip: "彩信标题",
			dataIndex: "vc2name",
			sortable: true
		},{
			header: "彩信名称",
			tooltip: "彩信名称",
			dataIndex: "vc2desc",
			sortable: true
		},{
            header: "创建人",
            tooltip: "创建人",
            dataIndex: "vc2username",
            sortable: true
        }, {
            header: "创建时间",
            tooltip: "创建时间",
            dataIndex: "datcreatetime",
            sortable: true
        }, {
            header: "修改人",
            tooltip: "最后修改人",
            dataIndex: "vc2modusername",
            sortable: true
        }, {
            header: "修改时间",
            tooltip: "最后修改时间",
            dataIndex: "datmodifytime",
            sortable: true
        }, {
            header: "测试预览",
            tooltip: "测试预览",
            dataIndex: "nummmsid",
            width: 60,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
            	if (record.get('nummmstype') == 2) {
            		return "<a href='#' onclick='Js.Center.SendMMS.MMSsendPreview.func(\"selectmms\"," + value + ",\"0\",\"Js.Center.SendMMS.MMSsendUpdate.sendtestcurdiy\")'>测试预览</a>";
            	}
                return "<a href='#' onclick='Js.Center.SendMMS.MMSsendPreview.func(\"selectmms\"," + value + ",\"0\",\"Js.Center.SendMMS.MMSsendUpdate.sendtestcur\")'>测试预览</a>";
            }
        }]);
        
        //==============================================================定义grid
        var MMSSendDiyGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            title: "",
            id: "Js.Center.SendMMS.MMSSendDiy.GridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            needMenu: false,
            needRightMenu: false,
            width: 400,
            store: Js.Center.SendMMS.MMSSendDiy.Infostore,
            sm: sm,
            cm: cm,
            listeners: {
                "rowclick": function(grid, rowindex, e){
                    Js.Center.SendMMS.MMSSendDiy.MMSSendPanel.items.items[0].items.items[0].items.items[3].setValue(grid.store.data.items[rowindex].data.nummmsid);
                }
            }
        });
        
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "Js.Center.SendMMS.MMSsenddiysend.columnSelectPanel",
            title: "",
			labelWidth:55,
            queryMethod: "Js.Center.SendMMS.MMSSendDiy.queryGrid",
            height: 55,
            width: 400,
            frame: false,
            defaults: {
                msgTarget: "side"
            },
            items: [{
                layout: 'column',
                items: [{
                    columnWidth: .33,
                    layout: 'form',
                    defaultType: "textfield",
                    //锚点布局-
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:0 0 0 15px",
                    items: [new Ext.form.DateField({
                        fieldLabel: "开始时间",
                        format: 'Y-m-d',
                        labelWidth: 100,
                        bodyStyle: 'padding:5px 5px 0',
                        readOnly: true,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
                        fieldLabel: "开始时间",
                        name: "datcreattimestart",
                        id: "Js.Center.SendMMS.MMSsendDiy.DatCreatTimeStart",
                        validateOnBlur: false,
                        validator: function(){
                        var strat_time = Ext.get("Js.Center.SendMMS.MMSsendDiy.DatCreatTimeStart").dom.value;
                        var end_time = Ext.get("Js.Center.SendMMS.MMSSendDiy.DatCreatTimeEnd").dom.value;
                        if (strat_time <= end_time) {
                            return true;
                        }
                        else {
                            return false;
                        }
                        },
                        invalidText: '结束时间不能小于开始时间！'
                        
                    })]
                }, {
                    columnWidth: .33,
                    layout: 'form',
                    defaultType: "textfield",
                    //锚点布局-
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:0 0 0 15px",
                    items: [new Ext.form.DateField({
                        fieldLabel: "结束时间",
                        labelWidth: 100,
                        format: 'Y-m-d',
                        bodyStyle: 'padding:5px 5px 0',
                        readOnly: true,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                        name: "datcreattimeend",
                        id: "Js.Center.SendMMS.MMSSendDiy.DatCreatTimeEnd",
                        validateOnBlur: false,
                        validator: function(){
                        var strat_time = Ext.get("Js.Center.SendMMS.MMSsendDiy.DatCreatTimeStart").dom.value;
                        var end_time = Ext.get("Js.Center.SendMMS.MMSSendDiy.DatCreatTimeEnd").dom.value;
                        if (strat_time <= end_time) {
                            return true;
                        }
                        else {
                            return false;
                        }
                        },
                        invalidText: '结束时间不能小于开始时间！'
                        
                    })]
                },{
                    columnWidth: .33,
                    layout: 'form',
                    defaultType: "textfield",
                    //锚点布局-
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:0 0 0 15px",
                    items: [new Ext.form.TextField({
                        fieldLabel: '彩信标题',
                        name: 'mmsname',
                        id: 'Js.Center.SendMMS.MMSSendDiy.mmsName',
                        regex: WXTL.Common.regex.IllegalDiy,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 100
                    })]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.SendMMS.MMSSendDiy.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var datCreatTimeStart = Ext.get("Js.Center.SendMMS.MMSsendDiy.DatCreatTimeStart").getValue();
                var datCreatTimeend = Ext.get("Js.Center.SendMMS.MMSSendDiy.DatCreatTimeEnd").getValue();
                var mmsName = Ext.get("Js.Center.SendMMS.MMSSendDiy.mmsName").getValue();
                var flag = 'selectByMMSType';
                Js.Center.SendMMS.MMSSendDiy.Infostore.baseParams = {
                    datcreattimestart: datCreatTimeStart,
                    datcreattimeend: datCreatTimeend,
                    mmsname: mmsName,
                    numcreater: '',
                    numMMSType:'2',
                    flag: flag
                };
                Js.Center.SendMMS.MMSSendDiy.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.SendMMS.MMSSendDiy.MainPanel = new Ext.Panel({
            title: "选择彩信",
            id: "Js.Center.SendMMS.MMSSendDiy.MainPanel",
            margins: '3 3 3 3',
            cmargins: '3 3 3 3',
            frame: true, // 渲染面板
            bodyWidth: 0,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, MMSSendDiyGrid]
        });
        
        //============================================================================绑定到center
    }
};

