/*
*彩信发送
*/

Ext.namespace('Js.Center.SendMMS.Send');

Js.Center.SendMMS.Send.info = function(node){
  
    if (Ext.get("Js.Center.SendMMS.Send.MainPanel") == null) {
        //============================================================================定义GridPanel相关
        // 分页每页显示数量
        var _pageSize = 12;
        //==============================================================Grid数据定义
        
        Js.Center.SendMMS.Send.DisplayStore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SendMMS.MMScheckQueryURL,//Js.Center.SendMMS.mmscontentURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                //fields: ["numcontentid", "vc2name", "nummmsid", "datcreate","numcheck1id","datsend", "datcheck1", "numstate", "numsendmethod", "numpriority", "numcreaterid", "datcreate", "datpresend", "vc2reason", "numcheck1id", "datcheck1", "numcheck2id", "datcheck2",  "numsendtype"],
                fields:["numcontentid","nummmsid","datreject","numcheck1id","datcheck1","numcheck2id","datcheck2","numstate","datsend","datendtime","numchecktype","vc2name","numuserid","numcreattime","datsendsubmit","nummmsstate","nummmstype","vc2desc","vc2username"],
				root: "data",
                id: "numcontentid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                        field: 'numcreattime',
                        direction: 'DESC'
                    },//解决分组无效代码
            baseParams: {
				datstart: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),	//（创建起始时间）
                datend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'), 		//（创建结束时间）
                mmsname: '',
                creatorid:'',
                flag: 'selectrejectbykey'
            }
        });
        Js.Center.SendMMS.Send.DisplayStore.load({
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
                if (value == 2) {
                    return "个性化彩信";
                }
            }
        }, {
            header: "彩信状态",
            tooltip: "彩信状态",
            dataIndex: "numstate",
            sortable: true,
            renderer: function(value){
                return "审核驳回";
            }
        }, {
            header: "驳回类型",
            tooltip: "驳回类型",
            dataIndex: "numchecktype",
            sortable: true,
			renderer: function(value){
				if(value==1){
					return "内容错误";
				}
				else if(value==2){
					return "发送目标错误";
				}
				else if(value==3){
					return "内容发送目标均错误";
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
            header: "审核驳回时间",
            tooltip: "审核驳回时间",
            dataIndex: "datreject",
            sortable: true
        }, {
            header: "测试预览",
            tooltip: "测试预览",
            dataIndex: "nummmsid",
            width: 60,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                if (record.get('nummmstype') == 2) {
            		return "<a href='#' onclick='Js.Center.SendMMS.MMSsendPreview.func(\"selecthismms\"," + value + ",\"0\",\"Js.Center.SendMMS.MMSsendUpdate.sendtesthisdiy\")'>测试预览</a>";
            	}
                return "<a href='#' onclick='Js.Center.SendMMS.MMSsendPreview.func(\"selecthismms\"," + value + ",\"0\",\"Js.Center.SendMMS.MMSsendUpdate.sendtesthis\")'>测试预览</a>";
            }
        }, {
            header: "操作",
            tooltip: "操作",
            dataIndex: "nummmsid",
            width: 80,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
            
                return "<a href='#' onclick='doEditMMS(\"" + rowIndex + "\")'>编辑</a>　<a href='#' onclick='sendMMSDelete(\"" + record.data.numcontentid + "\")'>删除</a>";
            }
        }]);
        
        
        //==============================================================定义grid
		var arrMMSSendInitLoadFunc = new Array();
		arrMMSSendInitLoadFunc[0] = "Js.Center.SendMMS.MMSSend.func";
		arrMMSSendInitLoadFunc[1] = "Js.Center.SendMMS.MMSSendDiy.func";
		arrMMSSendInitLoadFunc[2] = "Js.Center.SendMMS.MMSsendUpdate.MMSSendContent";
		arrMMSSendInitLoadFunc[3] = "Js.Center.SendMMS.MMSsendUpdateDiy.MMSSendContent";
		//arrMMSSendInitLoadFunc[3] = "Js.Center.SendMMS.MMSsendUpdate.func";
		arrMMSSendInitLoadFunc[4] = "Js.Center.SendMMS.MMSsendUpdateDiy.func";
        arrMMSSendInitLoadFunc[5] = "Js.Center.SendMMS.MMSsendUpdate.func";
        var gridPanel = new WXTL.Widgets.CommonGrid.GridPanel({
            title: "信息列表",
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.SendMMS.Send.DisplayStore,
            needMenu: false,
            needRightMenu: false,
            sm: sm,
            cm: cm,
			//其他需要预加载函数
			otherInitLoadFunc:arrMMSSendInitLoadFunc,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'generalicon',
                    text: "普通彩信发送",
                    handler: function(){
                        Js.Center.SendMMS.Send.gridRecord = null;
                        //Js.Center.SendMMS.MMSSend.func();
                    	Js.Center.SendMMS.MMSSend.UserGroupStore.baseParams={
            	                flag: "selectallbyprodid",
            					prodId: ""
            			};
						Js.Center.SendMMS.MMSSend.MMSSendInfoWin.show();
                    	Js.Center.SendMMS.MMSSend.MMSSendInfoWin.setPosition(150, 30);
                    }
                }, {
                    iconCls: 'personalizedicon',
                    text: "个性化彩信发送",
                    handler: function(){
                        Js.Center.SendMMS.Send.gridRecord = null;
                        //Js.Center.SendMMS.MMSSendDiy.func();
						Js.Center.SendMMS.MMSSendDiy.MMSSendInfoWin.show();
                    }
                }]
            })
        });
        //=============================================================定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            title:'按条件搜索被驳回彩信信息',
            layout:'fit',//解决窗口还原Bug
            //查询调用的方法
            queryMethod: "Js.Center.SendMMS.Send.queryGrid",
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
                        name: "datcreattimestart",
                        id: "sendinfoCreateTimeStart",
                        validateOnBlur: false,
                        validator: function(){
                        var strat_time = Ext.get("sendinfoCreateTimeStart").dom.value;
                        var end_time = Ext.get("sendinfoCreateTimeEnd").dom.value;
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
                        id: "sendinfoMMSName",
                        name: "vc2name",
                        fieldLabel: "彩信标题",
                        maxLength: 100,
                        maxLengthText: '长度应小于等于100',
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText
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
                        name: "datcreattimeend",
                        id: "sendinfoCreateTimeEnd",                        
                        validateOnBlur: false,
                        validator: function(){
                        var strat_time = Ext.get("sendinfoCreateTimeStart").dom.value;
                        var end_time = Ext.get("sendinfoCreateTimeEnd").dom.value;
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
        Js.Center.SendMMS.Send.queryGrid = function(){
           if (selectPanel.getForm().isValid()) {
            var datCreatStart = Ext.get("sendinfoCreateTimeStart").getValue();
            var datCreatEnd = Ext.get("sendinfoCreateTimeEnd").getValue();
            var vc2MMSName = Ext.get("sendinfoMMSName").getValue();
            var flag = 'selectrejectbykey';
            Js.Center.SendMMS.Send.DisplayStore.baseParams = {
				datstart: datCreatStart,
                datend: datCreatEnd,
                mmsname: vc2MMSName,
                creatorid:'',
                flag: flag
            };
            Js.Center.SendMMS.Send.DisplayStore.load({
					params: {
						start: 0,
						limit: _pageSize
					}
				});
			}
        };
        
        //============================================================================定义主panel
        Js.Center.SendMMS.Send.MainPanel = new Ext.Panel({
            id: "Js.Center.SendMMS.Send.MainPanel",
            frame: true, // 渲染面板
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, gridPanel]
        })
    };
    //============================================================================绑定到center
//	var tab = center.getItem('s24');
//	if (!tab) {
//		Js.Center.SendMMS.MMSSend.func(false);
//		Js.Center.SendMMS.MMSSendDiy.func(false);
//		Js.Center.SendMMS.MMSsendUpdate.MMSSendContent();
//		Js.Center.SendMMS.MMSsendUpdate.func(false);
//		Js.Center.SendMMS.MMSsendUpdateDiy.func(false);
	//};
    GridMain(node, Js.Center.SendMMS.Send.MainPanel, "openroomiconinfo", "Js.Center.SendMMS.Send.DisplayStore");
	
};

function doEditMMS(id){
    var row = Js.Center.SendMMS.Send.DisplayStore.getAt(id);
    //Js.Center.SendMMS.Send.func(row);
    if (row.get("nummmstype") == 1) {
    	Js.Center.SendMMS.MMSsendUpdate.UserGroupStore.baseParams={
                flag: "selectallbyprodid",
				prodId: ""
		};
		Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.updateRecord = row;
		Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin.show();
        //Js.Center.SendMMS.MMSsendUpdate.func(row);
    }
    else if (row.get("nummmstype") == 2){
        //Js.Center.SendMMS.MMSsendUpdateDiy.func(row);
        Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.updateRecord = row;
		Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.show();
    }
    //

};
function sendMMSDelete(row){
    Ext.Msg.confirm("提示!", "您确定要删除信息吗?", function(btn){
        if (btn == "yes") {
            Js.Center.SendMMS.SendMMSDelete.func(row);
        }
        else {
        
        }
    })
};
