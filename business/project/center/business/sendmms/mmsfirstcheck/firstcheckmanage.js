/*
*彩信一审列表
*/

Ext.namespace('Js.Center.SendMMS.FirstCheckManage');
Js.Center.SendMMS.FirstCheckManage.info = function(node){
   
    Js.Center.Common.DepartUserStore.reload();
    if (Ext.get("Js.Center.SendMMS.FirstCheckManage.MainPanel") == null) {
        //=============================================================================================定义Gridpanel相关
        //分页 每页显示数量
        var _pageSize = 12;
        //========================定义Grid数据
        Js.Center.SendMMS.FirstCheckManage.DisplayStore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SendMMS.MMScheckQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                //fields: ["numcontentid","nummmsid","datcreate","numcheck1id","datcheck1","numcheck2id","datcheck2","numstate","vc2name","numuserid","numcreattime","nummmsstate","nummmstype","vc2desc","vc2username"],
                fields: ["numcontentid", "nummmsid", "datreject", "numcheck1id", "datcheck1","numstatus","vc2status", "numcheck2id", "datcheck2", "numstate", "datsend", "datendtime", "numchecktype", "vc2name", "numuserid", "numcreattime", "datsendsubmit", "nummmsstate", "nummmstype", "vc2desc", "vc2username", "numsendtype","numsenduserid","sendusername","numtotal","numsuccess","numfailed","numprenum"],
                root: "data",
                id: "numcontentid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                        field: 'numcreattime',
                        direction: 'DESC'
                    },//解决分组无效代码
            baseParams: {
                flag: 'selectfirstbykey',
                datstart: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
                datend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                mmsname: '',
                creatorid: ''
            }
        });
        Js.Center.SendMMS.FirstCheckManage.DisplayStore.load({
            params: {
                start: 0,
                limit: _pageSize
            }
        });
        //==============================================================列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numcontentid"
        });
        //==============================================================列头
        var cm = new Ext.grid.ColumnModel([{
			header: "彩信标题",
			tooltip: "彩信标题",
			dataIndex: "vc2name",
			sortable: true
		},{
			header: "彩信名称",
			tooltip: "彩信名称",
			dataIndex: "vc2desc",
			sortable: true
		}, {
            header: "彩信类型",
            tooltip: "彩信类型",
            dataIndex: "nummmstype",
            sortable: true,
            renderer: function(value){
                if (value == 1) {
                    return "普通彩信";
                }
                else 
                    if (value == 2) {
                        return "个性化彩信";
                    }
            }
        }, {
            header: "发送类型",
            tooltip: "发送类型",
            dataIndex: "numsendtype",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
            	var row =  Js.Center.SendMMS.FirstCheckManage.DisplayStore.getAt(rowIndex);
                if (value == 1) {
                    return "按栏目发送";
                }
                
                if (value == 2) {
                    return "<a href='#' onclick='Js.Center.SendMMS.MMSSendUserGroupDetails.func(\"" + row.get("numcontentid") + "\")'>按客户组发送</a>";
                }
                
                if (value == 3) {
                    return "按列表发送";
                }
                
                if (value == 4) {
                    return "按文件发送";
                }
                if (value == 5) {
                    return "个性化彩信发送";
                }
            }
        }, {
            header: "处理状态",
            tooltip: "处理状态",
            dataIndex: "vc2status",
            sortable: true
        }, {
            header: "彩信状态",
            tooltip: "彩信状态",
            dataIndex: "numstate",
            sortable: true,
            renderer: function(value){
                if (value == 0) {
                    return "待审";
                }
            }
        }, {
            header: "发送人",
            tooltip: "发送人",
            dataIndex: "vc2username",
            sortable: true
        }, {
            header: "创建时间",
            tooltip: "创建时间",
            dataIndex: "numcreattime",
            sortable: true
        }, {
            header: "发送提交时间",
            tooltip: "发送提交时间",
            dataIndex: "datsendsubmit",
            sortable: true
        }, {
            header: "预览测试",
            tooltip: "预览测试",
            dataIndex: "nummmsid",
            width: 60,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
            	if (record.get('nummmstype') == 2) {
            		return "<a href='#' onclick='Js.Center.SendMMS.MMSsendPreview.func(\"selecthismms\"," + value + ",\"0\",\"Js.Center.SendMMS.MMSsendUpdate.sendtesthisdiy\")'>测试预览</a>";
            	}
                return "<a href='#' onclick='Js.Center.SendMMS.MMSsendPreview.func(\"selecthismms\"," + value + ",\"0\",\"Js.Center.SendMMS.MMSsendUpdate.sendtesthis\")'>测试预览</a>";
            }
        }, {
            header: "<font color='green'>合法</font>/<font color='red'>非法</font>",
            tooltip: "合法/非法",
            dataIndex: "numcontentid",
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                var row =  Js.Center.SendMMS.FirstCheckManage.DisplayStore.getAt(rowIndex);
                var suc = "<font color='green'>"+ row.get("numsuccess") +"</font>";
                var fail = "/<font color='red'>"+ row.get("numfailed") +"</font>";
                if(row.get("numsendtype") == 5 || row.get("numsendtype") == 4 || row.get("numsendtype") == 3){
                    suc = row.get("numsuccess")>0?"<a href='#' onclick='exportData(\"" + Js.Center.SendMMS.MMScheckQueryURL + "\",\"id=" + value + "&flag=selectexport&successtype=1\")'><font color='green'>"+ row.get("numsuccess") +"</font></a>" : "<font color='green'>"+ row.get("numsuccess") +"</font>";
                    fail = row.get("numfailed") >0?"/<a href='#' onclick='exportData(\"" + Js.Center.SendMMS.MMScheckQueryURL + "\",\"id=" + value + "&flag=selectexport&successtype=0\")'><font color='red'>"+ row.get("numfailed") +"</font></a>":"/<font color='red'>"+ row.get("numfailed") +"</font>"
                    
                } else if(row.get("numsendtype") == 2){
                    var suc = "<font color='green'>"+ row.get("numtotal") +"</font>";
                }
                return suc + fail;
            }
        }]);
        
        
        //==============================================================定义grid
        var firstCheckMMSGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            title: "彩信一审列表",
            id: "firstCheckManageGrid",
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.SendMMS.FirstCheckManage.DisplayStore,
            needMenu: false,
            needRightMenu: false,
			updateMethod: "Js.Center.SendMMS.MMSFirstCheckInfo",
            sm: sm,
            cm: cm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'firstcheckicon',
                    text: "彩信发送一审",
					handler: function(){
					    var row = firstCheckMMSGrid.getSelectionModel().getSelections();
                        if (row.length == 0) {
                            Ext.Msg.alert("温馨提示", "请您选择一条记录!");
                        }
                        else {
                            if (row.length > 1) {
                                Ext.Msg.alert("温馨提示", "对不起，您只能选择一条记录!");
                            }
                            else {
                                if (row.length == 1) {
                                    if(row[0].data.numstatus == 1){
                                        firstCheckMMSGrid.doEdit();
                                    }
                                    else {
                                        Ext.Msg.alert("温馨提示", "只能审核处理完成状态的数据!");
                                    }
                                }
                            }
                        }						
					} 
                }]
            })
        });
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            //查询调用的方法            
            
            layout:'fit',
            queryMethod: "Js.Center.SendMMS.FirstCheckManage.queryGrid",
            items: [{
                layout: 'column',
                items: [{
                    xtype: "hidden",
                    name: "flag",
                    value: "insert"
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
                        fieldLabel: "开始时间",
                        format: 'Y-m-d',
                        labelWidth: 100,
                        bodyStyle: 'padding:5px 5px 0',
                        readOnly: true,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
                        fieldLabel: "开始时间",
                        name: "numcreattime",
                        id: "Js.Center.SendMMS.FirstCheckManage.DatStart",
                        validateOnBlur: false,
                        validator: function(){
                        var strat_time = Ext.get("Js.Center.SendMMS.FirstCheckManage.DatStart").dom.value;
                        var end_time = Ext.get("Js.Center.SendMMS.FirstCheckManage.DatEnd").dom.value;
                        if (strat_time <= end_time) {
                            return true;
                        }
                        else {
                            return false;
                        }
                        },
                        invalidText: '结束时间不能小于开始时间！'
                    }, {
                        xtype: "textfield",
                        name: "vc2name",
                        fieldLabel: "彩信名称",
                        id: 'Js.Center.SendMMS.FirstCheckManage.MMSName',
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 20,
                        maxLengthText: '长度应小于等于20'
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
                        name: "datend",
                        id: "Js.Center.SendMMS.FirstCheckManage.DatEnd",
                        validateOnBlur: false,
                        validator: function(){
                        var strat_time = Ext.get("Js.Center.SendMMS.FirstCheckManage.DatStart").dom.value;
                        var end_time = Ext.get("Js.Center.SendMMS.FirstCheckManage.DatEnd").dom.value;
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
                        name: "numuserid",
                        fieldLabel: "创建人",
                        emptyText: '-=请选择=-',
                        hiddenName: "numuserid",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2username",
                        valueField: "numuserid",
                        triggerAction: "all",
                        store: Js.Center.Common.DepartUserStore
                    }]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.SendMMS.FirstCheckManage.queryGrid = function(){
        if (selectPanel.getForm().isValid()) {
            var datStart = Ext.get("Js.Center.SendMMS.FirstCheckManage.DatStart").getValue();
            var datEnd = Ext.get("Js.Center.SendMMS.FirstCheckManage.DatEnd").getValue();
            var mmsName = Ext.get("Js.Center.SendMMS.FirstCheckManage.MMSName").getValue();
            var _creatorid = Ext.get("numuserid").getValue();
            var flag = 'selectfirstbykey';
            Js.Center.SendMMS.FirstCheckManage.DisplayStore.baseParams = {
                datstart: datStart,
                datend: datEnd,
                mmsname: mmsName,
                creatorid: _creatorid,
                flag: flag
            };
            
            Js.Center.SendMMS.FirstCheckManage.DisplayStore.reload({
                params: {
                    start: 0,
                    limit: _pageSize
                }
            });          
         }
        };
        //============================================================================定义主panel
        Js.Center.SendMMS.FirstCheckManage.MainPanel = new Ext.Panel({
            id: "Js.Center.SendMMS.FirstCheckManage.MainPanel",
            frame: true, // 渲染面板
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, firstCheckMMSGrid]
        });
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.SendMMS.FirstCheckManage.MainPanel, "openroomiconinfo", "Js.Center.SendMMS.FirstCheckManage.DisplayStore");
};

