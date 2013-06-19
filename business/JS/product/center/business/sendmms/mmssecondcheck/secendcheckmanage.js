//彩信二审页面
Ext.namespace('Js.Center.SendMMS.SecendCheckManage');
Js.Center.SendMMS.SecendCheckManage.info = function(node){
  
    Js.Center.Common.DepartUserStore.reload();
    if (Ext.get("Js.Center.SendMMS.SecendCheckManage.MainPanel") == null) {
    
//        secendCheckMMS = function(){
//			//Js.Center.SendMMS.MMSSecendCheckinfo.func();
//            var row = Ext.getCmp("Js.Center.SendMMS.SecendCheckManage.SecendCheckManageGrid").getSelectionModel().getSelections();
//            if (row.length == 0) {
//                Ext.Msg.alert("提示信息", "您没有选中任何行!");
//            }
//            else 
//                if (row.length > 1) {
//                    Ext.Msg.alert("提示信息", "对不起只能选择一个!");
//                }
//                else 
//                    if (row.length == 1) {
//                    
//                        Js.Center.SendMMS.MMSSecendCheckinfo.func(row[0]);
//                    }
//        };
        //=============================================================================================定义Gridpanel相关
        //分页 每页显示数量
        var _pageSize = 12;
        //========================定义Grid数据
        Js.Center.SendMMS.SecendCheckManage.DisplayStore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SendMMS.MMScheckQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                //fields: ["numcontentid","nummmsid","datcreate","numcheck1id","datcheck1","numcheck2id","datcheck2","numstate","vc2name","numuserid","numcreattime","nummmsstate","nummmstype","vc2desc","vc2username"],
                fields:["numcontentid","nummmsid","datreject","numcheck1id","datcheck1","numcheck2id","datcheck2","numstate","datsend","datendtime","numchecktype","vc2name","numuserid","numcreattime","datsendsubmit","nummmsstate","nummmstype","vc2desc","vc2username","numsendtype","numsenduserid","sendusername","numtotal","numsuccess","numfailed","numprenum"],
				root: "data",
                id: "numcontentid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                        field: 'datcheck1',
                        direction: 'DESC'
                    },//解决分组无效代码
            baseParams: {
                flag: 'selectsecendbykey',
                datstart: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
                datend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                mmsname: '',
                creatorid: '',
                firstcheckid:''
            }
        });
        Js.Center.SendMMS.SecendCheckManage.DisplayStore.load({
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
            renderer: function(value){
                if (value == 1) {
                    return "按栏目发送";
                }
                
                if (value == 2) {
                    return "按客户组发送";
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
        },{
            header: "彩信状态",
            tooltip: "彩信状态",
            dataIndex: "numstate",
            sortable: true,
            renderer: function(value){
                if (value == 1) {
                    return "一审通过";
                }
            }
        }, {
            header: "创建人",
            tooltip: "创建人",
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
            header: "一审时间",
            tooltip: "一审时间",
            dataIndex: "datcheck1",
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
            width: 100,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                var row =  Js.Center.SendMMS.SecendCheckManage.DisplayStore.getAt(rowIndex);
                var suc = "<font color='green'>"+ row.get("numsuccess") +"</font>";
                var fail = "/<font color='red'>"+ row.get("numfailed") +"</font>";
                if(row.get("numsendtype")!=2){
                    suc = row.get("numsuccess")>0?"<a href='#' onclick='exportData(\"" + Js.Center.SendMMS.MMScheckQueryURL + "\",\"id=" + value + "&flag=selectexport&successtype=1\")'><font color='green'>"+ row.get("numsuccess") +"</font></a>" : "<font color='green'>"+ row.get("numsuccess") +"</font>";
                    fail = row.get("numfailed") >0?"/<a href='#' onclick='exportData(\"" + Js.Center.SendMMS.MMScheckQueryURL + "\",\"id=" + value + "&flag=selectexport&successtype=0\")'><font color='red'>"+ row.get("numfailed") +"</font></a>":"/<font color='red'>"+ row.get("numfailed") +"</font>"
                } else {
                	//客户组
                	suc = "<font color='green'>"+ row.get("numtotal") +"</font>";
                }
                return suc + fail;
            }
        }]);
        
        
        //==============================================================定义grid
		// var MMSarrInitLoadFunc = new Array();
		//MMSarrInitLoadFunc[0] = "Js.Center.SendMMS.MMSSecendCheckinfo.func";
        var secendCheckMMSGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            title: "彩信二审列表",
            id: "Js.Center.SendMMS.SecendCheckManage.SecendCheckManageGrid",
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.SendMMS.SecendCheckManage.DisplayStore,
            needMenu: false,
            needRightMenu: false,
			updateMethod: "Js.Center.SendMMS.MMSSecendCheckinfo",
			//其他需要预加载函数
			//otherInitLoadFunc:MMSarrInitLoadFunc,
            sm: sm,
            cm: cm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'secondcheckicon',
                    text: "彩信发送二审",
					handler: function(){
						secendCheckMMSGrid.doEdit();
					} 
                    //handler: secendCheckMMS
                }]
            })
        });
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            height:160,
            layout:'fit',
            //查询调用的方法
            queryMethod: "Js.Center.SendMMS.SecendCheckManage.queryGrid",
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
                        id: "Js.Center.SendMMS.SecendCheckManage.DtaStart",
                        validateOnBlur: false,
                        validator: function(){
                        var strat_time = Ext.get("Js.Center.SendMMS.SecendCheckManage.DtaStart").dom.value;
                        var end_time = Ext.get("Js.Center.SendMMS.SecendCheckManage.DatEnd").dom.value;
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
                        id: 'Js.Center.SendMMS.SecendCheckManage.MMSName',
                        regex: WXTL.Common.regex.IllegalDiy,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 20,
                        maxLengthText: '长度应小于等于20'
                    },{
                        xtype: "xComboBox",
                        name: "numuserid",
                        fieldLabel: "一审审核人",
                        emptyText: '-=请选择=-',
                        hiddenName: "firstchecknumuserid",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2username",
                        valueField: "numuserid",
                        triggerAction: "all",
                        store: Js.Center.Common.DepartUserStore
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
                        id: "Js.Center.SendMMS.SecendCheckManage.DatEnd",
                        validateOnBlur: false,
                        validator: function(){
                        var strat_time = Ext.get("Js.Center.SendMMS.SecendCheckManage.DtaStart").dom.value;
                        var end_time = Ext.get("Js.Center.SendMMS.SecendCheckManage.DatEnd").dom.value;
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
                        hiddenName: "secendnumuserid",
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
        Js.Center.SendMMS.SecendCheckManage.queryGrid = function(){
         if (selectPanel.getForm().isValid()) {
            var datStart = Ext.get("Js.Center.SendMMS.SecendCheckManage.DtaStart").getValue();
            var datEnd = Ext.get("Js.Center.SendMMS.SecendCheckManage.DatEnd").getValue();
            var mmsName = Ext.get("Js.Center.SendMMS.SecendCheckManage.MMSName").getValue();
            var _creatorid = Ext.get("secendnumuserid").getValue();
            var _firstcheckid = Ext.get("firstchecknumuserid").getValue();
            var flag = 'selectsecendbykey';
            Js.Center.SendMMS.SecendCheckManage.DisplayStore.baseParams = {
                datstart: datStart,
                datend: datEnd,
                mmsname: mmsName,
                creatorid: _creatorid,
                firstcheckid:_firstcheckid,
                flag: flag
            };
            Js.Center.SendMMS.SecendCheckManage.DisplayStore.reload({
              params: {
                    start: 0,
                    limit: _pageSize
                }
            
            });
            }
        };
        //============================================================================定义主panel
        Js.Center.SendMMS.SecendCheckManage.MainPanel = new Ext.Panel({
            id: "Js.Center.SendMMS.SecendCheckManage.MainPanel",
            frame: true, // 渲染面板
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, secendCheckMMSGrid]
        });
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.SendMMS.SecendCheckManage.MainPanel, "openroomiconinfo", "Js.Center.SendMMS.SecendCheckManage.DisplayStore");
};

