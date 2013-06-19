
/*
 *短信发送列表页
 */
Ext.namespace('Js.Center.SendSMS.Send');

Js.Center.SendSMS.Send.info = function(node){

    if (Ext.get("Js.Center.SendSMS.Send.Mainpanel") == null) {
        //============================================================================定义GridPanel相关
        // 分页每页显示数量
        var _pageSize = 12;
        //==============================================================Grid数据定义
        
        Js.Center.SendSMS.Send.DisplayStore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SendSMS.SmsContentURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ["numcontentid", "vc2content", "datsend", "vc2status", "numstate", "nummessageformat", "numsendmethod", "numpriority", "vc2detail", "numcheck", "vc2reason", "datcreate", "numcreaterid", "datpresend", "numcheck1id", "datcheck1", "numcheck2id", "datcheck2", "numprenum", "numprodid", "numsource", "vc2typelist", "numstatename", "numsendtypename","numsendtype", "nummessageformatname", "vc2departname", "vc2username"],
                root: "data",
                id: "numlogid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'datcreate',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                flag: 'selectbykey',
                state: "3,4",
                numsendtype: "2,4,5,6,7,9",
                vc2content: ""
            }
        });
        Js.Center.SendSMS.Send.DisplayStore.load({
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
            header: "短信内容",
            tooltip: "短信内容",
            dataIndex: "vc2content",
            width: 220,
            renderer: function(value){
                return "<font qtip='" + value + "'>" + value + "</font>";
            },
            sortable: true
        }, {
            header: "发送人",
            tooltip: "发送人",
            dataIndex: "vc2username",
            sortable: true
        }, {
            header: "部门",
            tooltip: "部门",
            dataIndex: "vc2departname",
            sortable: true
        }, {
            header: "发送类型",
            tooltip: "发送类型",
            dataIndex: "numsendtypename",
            sortable: true
        }, {
            header: "发送时间",
            tooltip: "发送时间",
            dataIndex: "datsend",
            sortable: true
        }, {
            header: "审核状态",
            tooltip: "审核状态",
            dataIndex: "numstatename",
            sortable: true
        }, {
            header: "驳回原因",
            tooltip: "驳回原因",
            dataIndex: "vc2reason",
            sortable: true,
            renderer: function(value) {
                return "<font qtip='" + value + "'>" + value + "</font>";
            }
        }, {
            header: "内容类型",
            tooltip: "内容类型",
            dataIndex: "nummessageformatname",
            sortable: true
        }, {
            header: "创建时间",
            tooltip: "创建时间",
            dataIndex: "datcreate",
            sortable: true
        }, {
            header: "操作",
            tooltip: "操作",
            dataIndex: "numsvcid",
            renderer: function(value, meta, record, rowIndex, colIndex, store){
            
                return "<a href='#' onclick='doEditSMS(\"" + rowIndex + "\")'>编辑</a>　<a href='#' onclick='sendSmsDelete(\"" + record.data.numcontentid + "\")'>删除</a>";
            }
        }]);
        
        
        //==============================================================定义grid
        var gridPanel = new WXTL.Widgets.CommonGrid.GridPanel({
            title: "信息列表",
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.SendSMS.Send.DisplayStore,
            needMenu: false,
            needRightMenu: false,
            sm: sm,
            cm: cm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'addmmsicon',
                    text: "发送短信",
                    handler: function(){
            			Js.Center.SendSMS.SMSsend.UserGroupStore.baseParams={
            	                flag: "selectallbyprodid",
            					prodId: ""
            			};
                        Js.Center.SendSMS.Send.gridRecord = null;
                        Js.Center.SendSMS.SMSsend.SMSsendInfoWin.updateRecord = null;
                        Js.Center.SendSMS.SMSsend.SMSsendInfoWin.show();
                        Ext.getCmp("SMSsendtestmobile").setValue(Js.Center.Common.userMobile);
                    }
                },{
					iconCls: 'addmmsicon',
					text:"发送个性化短信",
					handler:function(){
						Js.Center.SendSMS.Send.gridRecord = null;
                        Js.Center.SendSMS.SMSsenddiy.SMSsendInfoWin.updateRecord = null;
                        Js.Center.SendSMS.SMSsenddiy.SMSsendInfoWin.show();
                        Ext.getCmp("SMSsendtestmobilediy").setValue(Js.Center.Common.userMobile);
					}
                }]
            })
        });
        
        //============================================================================ 定义formpanel
        
        
        
        //=============================================================定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            //查询调用的方法
            queryMethod: "Js.Center.SendSMS.Send.queryGrid",
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
                        name: "datcreattimestart"
                    }, {
                        xtype: "combo",
                        name: "numdepartid",
                        fieldLabel: "选择部门",
                        hiddenName: "numproductid",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2name",
                        valueField: "value",
                        triggerAction: "all",
                        emptyText: '-=请选择=-',
                        store: Js.Center.Common.DepartmentStore
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
                        name: "datcreattimeend"
                    }, {
                        xtype: "combo",
                        name: "numcolumnid",
                        fieldLabel: "选择栏目",
                        emptyText: '-=请选择=-',
                        hiddenName: "numcolumnid",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2name",
                        valueField: "value",
                        triggerAction: "all",
                        store: Js.Center.Common.ColumnStore
                    }]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.SendSMS.Send.queryGrid = function(){
            Js.Center.SendSMS.Send.DisplayStore.baseParams = {
                flag: 'selectbykey',
                state: "3,4",
                numsendtype: "2,4,5,6,7,9",
                vc2content: ""
            };
            Js.Center.SendSMS.Send.DisplayStore.reload();
        };
        
        //============================================================================定义主panel
        Js.Center.SendSMS.Send.Mainpanel = new Ext.Panel({
            id: "Js.Center.SendSMS.Send.Mainpanel",
            frame: true, // 渲染面板
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [gridPanel]
        })
    };
    //============================================================================绑定到center
    
    GridMain(node, Js.Center.SendSMS.Send.Mainpanel, "openroomiconinfo", "Js.Center.SendSMS.Send.DisplayStore");
    Js.Center.SendSMS.SMSsend.func(false);
	Js.Center.SendSMS.SMSsenddiy.func(false);
    Js.Center.SendSMS.Sendbycustomer.func(false);
    Js.Center.SendSMS.Sendbyenterprise.func(false);
};

function doEditSMS(id){
    var row = Js.Center.SendSMS.Send.DisplayStore.getAt(id);
    //Js.Center.SendSMS.SMSsend.func(row);
	if (row.get('numsendtype') == "9" || row.get('numsendtype') == "8") {
		Js.Center.SendSMS.SMSsenddiy.SMSsendInfoWin.updateRecord = row;		
		Js.Center.SendSMS.SMSsenddiy.SMSsendInfoWin.show();
		Ext.getCmp("Js.Center.SendSMS.SMSsenddiy.SendSMSContentdiy").setValue(row.data.vc2content.replace(USERIOGRAPH,''));
		Ext.getCmp("SMSsendtestmobilediy").setValue(Js.Center.Common.userMobile);
	}
	else if (row.get('numsendtypename') == "客户通讯录") {
		Js.Center.SendSMS.Sendbycustomer.SMSsendInfoWin.updateRecord = row;		
		Js.Center.SendSMS.Sendbycustomer.SMSsendInfoWin.show();
		
		if(row.data.vc2content.indexOf(USERIOGRAPH)> -1){
			Ext.getCmp("Js.Center.SendSMS.Sendbycustomer.SendSMSContent").setValue(row.data.vc2content.replace(USERIOGRAPH,''));
        	document.getElementById("Js.Center.SendSMS.Sendbycustomer.cbk").checked = true;
		}
		else{
			document.getElementById("Js.Center.SendSMS.Sendbycustomer.cbk").checked = false;
		}
		Ext.getCmp("Js.Center.SendSMS.Sendbycustomer.SendTestMobile").setValue(Js.Center.Common.userMobile);
	}
	else {
		Js.Center.SendSMS.SMSsend.SMSsendInfoWin.updateRecord = row;
		Js.Center.SendSMS.SMSsend.SMSsendInfoWin.show();
		Ext.getCmp('Js.Center.SendSMS.SMSsend.SendSMSContent').setValue(Js.Center.SendSMS.SMSsend.SMSsendInfoWin.updateRecord.data.vc2content);
		if(row.data.vc2content.indexOf(USERIOGRAPH)> -1){
			Ext.getCmp("Js.Center.SendSMS.SMSsend.SendSMSContent").setValue(row.data.vc2content.replace(USERIOGRAPH,''));
        	//document.getElementById("Js.Center.SendSMS.SMSsend.cbk").checked = true;
		}
		else{
			//document.getElementById("Js.Center.SendSMS.SMSsend.cbk").checked = false;
		}
		Ext.getCmp("SMSsendtestmobile").setValue(Js.Center.Common.userMobile);
		
		Ext.get("sendnumsendtype").dom.value = 'sendbyusergroup';
	}
	Js.Center.SendSMS.SMSsend.UserGroupStore.baseParams.prodId = "";
	Js.Center.SendSMS.SMSsend.UserGroupStore.reload();
};
function sendSmsDelete(row){
    Ext.Msg.confirm("提示!", "您确定要删除信息吗?", function(btn){
        if (btn == "yes") {
            Js.Center.SendSMS.SMSDelete.func(row);
        }
        else {
        
        }
    })
};

function checkSMSFilingSign(prodId,smsContent){
	var flag = false;
	var signInfo = doSynRequest(Js.Center.Business.ECmanage.ECSigntureURL+"?flag=selectsignaturebyprodid&numprodid="+prodId);
	if(signInfo.success){
		if(signInfo.totalCount == 0){
			return true;
		}
		else{
			var signType=signInfo.data[0].numsigntypeid;
			if(signType == 3){
				return true;
			}
			else if(signType == 2){
				for(var i=0;i<signInfo.totalCount;i++){
					var sign = signInfo.data[i].vc2signture;
					if(smsContent.length>=sign.length){
						var startIndex = smsContent.length-sign.length;
						var smsSign = smsContent.substring(startIndex);
						if(sign == smsSign){
							return true;
						}
					}
					
				}
			}
			else if(signType == 1){
				if((smsContent.indexOf("[")>0 && smsContent.lastIndexOf("]") == smsContent.length-1) || (smsContent.indexOf("【")>0 && smsContent.lastIndexOf("】") == smsContent.length-1)){
					var smsSign = smsContent.substring(smsContent.indexOf("["),smsContent.lastIndexOf("]")+1);
					if(smsSign == ""){
						smsSign = smsContent.substring(smsContent.indexOf("【"),smsContent.lastIndexOf("】")+1);
					}
					
					for(var i=0;i<signInfo.totalCount;i++){
						var sign = signInfo.data[i].vc2signture;
						if(sign == smsSign){
							return true;
						}
					}
				}
				
			}
		}
	}
	if(!flag){
		Ext.Msg.alert("温馨提示", "对不起,短信签名不符合规范！");
	}
	return flag;
	
};


