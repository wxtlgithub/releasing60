/**
 * 发送记录查询
 * @author Administrator
 */
Ext.namespace('Js.Center.SendSMS.DepartSendQuery');

Js.Center.SendSMS.DepartSendQuery.departSendQueryinfo = function(node) {

    if (Ext.get("Js.Center.SendSMS.DepartSendQuery.departSendQueryinfoPanel") == null) {
        // ======================================================================= 定义GridPanel相关

        // ===============================================分页每页显示数量
        var _pageSize = 12;
        // ===============================================指定列参数
        var fields = ["numcontentid", "numsendplanid", "vc2srcmobile", "vc2content", "vc2serviceid", "datrecv", "datsend", "datcreate", "datcheck1", "datcheck2", "numcreaterid", "vc2creatername", "numcheck1id", "vc2check1name", "numcheck2id", "vc2check2name", "vc2departname", "numsendtype", "numstate", "numprenum", "numtotal", "numsuccess", "numfailed", "vc2status", "numsendmethod", "numprodid"];
        Js.Center.SendSMS.DepartSendQuery.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SendSMS.SendQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numcontentid",
                totalProperty: "totalCount"

            }),
            sortInfo: {
                field: 'datcheck2',
                direction: 'DESC'
			}//解决分组无效代码
        });

        // ==================================================== 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numcontentid"
        });
        // ==================================================== 列头
        var cm = new Ext.grid.ColumnModel([{
	            header: "内容",
	            tooltip: "内容",
	            dataIndex: "vc2content",
	            sortable: true,
	            width: 220,
	            renderer: function(value) {
	                return "<font qtip='" + value + "'>" + value + "</font>";
	            },
	            readOnly: true,
	            editor: new Ext.form.TextField({
	                readOnly: true
	            })
	        }, {
	            header: "提交日期",
	            tooltip: "提交日期",
	            dataIndex: "datcreate",
	            sortable: true
	        }, {
	            header: "发送时间",
	            tooltip: "发送时间",
	            dataIndex: "datsend",
	            sortable: true
	        }, {
	            header: "拟发送量",
	            tooltip: "拟发送量",
	            dataIndex: "numprenum",
	            sortable: true
	        }, {
	            header: "<font color='green'>合法</font>/<font color='red'>非法</font>",
	            tooltip: "合法/非法",
	            dataIndex: "numcontentid",
	            renderer: function(value, meta, record, rowIndex, colIndex, store) {
	                var row = Js.Center.SendSMS.DepartSendQuery.Infostore.getAt(rowIndex);
	                var suc, fail;
	                //判断发送方式为文件的时候提供下载
	               	if (row.get("numsendtype") == 2) {
	                   	suc = "<font color='green'>"+ row.get("numtotal") +"</font>";
	               		fail = "/<font color='red'>"+ row.get("numfailed") +"</font>";
	               	}
	               	else{
	                   	suc = row.get("numsuccess")>0?"<a href='#' onclick='exportData(\"" + Js.Center.SendSMS.SmsContentURL + "\",\"id=" + value + "&flag=selectexport&successtype=1\")'><font color='green'>" + row.get("numsuccess") + "</font></a>" : "<font color='green'>"+ row.get("numsuccess") +"</font>";
	                   	fail = row.get("numfailed")>0? "/<a href='#' onclick='exportData(\"" + Js.Center.SendSMS.SmsContentURL + "\",\"id=" + value + "&flag=selectexport&successtype=0\")'><font color='red'>" + row.get("numfailed") + "</font></a>" : "/<font color='red'>"+ row.get("numfailed") +"</font>";
	               	}
	                
	                return suc + fail;
	            }
	        },{
	            header: "发送部门",
	            tooltip: "发送部门",
	            dataIndex: "vc2departname",
	            sortable: true
	        }, {
	            header: "发送人",
	            tooltip: "发送人",
	            dataIndex: "vc2creatername",
	            sortable: true
	        },  {
	        	hidden:true,
	            header: "一审审核人",
	            tooltip: "一审审核人",
	            dataIndex: "vc2check1name",
	            sortable: true
	        }, {
	        	hidden:true,
	            header: "一审时间",
	            tooltip: "一审时间",
	            dataIndex: "datcheck1",
	            sortable: true
	        }, {
	        	hidden:true,
	            header: "二审审核人",
	            tooltip: "二审审核人",
	            dataIndex: "vc2check2name",
	            sortable: true
	        }, {
	        	hidden:true,
	            header: "二审时间",
	            tooltip: "二审时间",
	            dataIndex: "datcheck2",
	            sortable: true
	        }, {
	            header: "状态",
	            tooltip: "状态",
	            dataIndex: "numstate",
	            sortable: true,
	            renderer: function(value, meta, record, rowIndex, colIndex, store) {
	                var row = Js.Center.SendSMS.DepartSendQuery.Infostore.getAt(rowIndex);
	                if (row.get("vc2status") == 2 || row.get("vc2status") == 99 || row.get("vc2status") == -99 || row.get("vc2status") == -1) {
	                    return "审核完成";
	                }
	                else {
						if (row.get("vc2status") > 1000){
	                        return "暂停发送";
	                    }else  if (value == 0) {
	                        return "待审核";
	                    } else if (value == 1) {
	                        return "一审完成";
	                    } else if (value == 2) {
	                        return "审核完成";
	                    } else if (value == 3) {
	                        return "驳回";
	                    } else if (value == 4) {
	                        return "正在发送";
	                    } else if (value == 5) {
	                        return "发送完成";
	                    }
	                }
	            }
	        }, {
	            header: "查看详细",
	            tooltip: "查看详细",
	            dataIndex: "numcontentid",
	            width: 70,
	            renderer: function(value, meta, record, rowIndex, colIndex, store) {
	            	if(2 == record.get('numsendmethod') && 5 != record.get("numstate") && 2 == record.get("numstate")){
	            		var type = 1;
	            		var title = "暂停";
	            		var content = "";
	            		if(1000 < record.get("vc2status")){
	               			type = 0;
	               			title = "继续";
	               		} 
	               		content = "<a href='#' onclick='Js.Center.SendSMS.DepartSendQuery.showPause(\"" + value + "\")'>操作</a>&nbsp;<a href='#' onclick='Js.Center.SendSMS.DepartSendQuery.doPause(\"" + value + "\", " + type + ")'>" + title + "</a>";
	               		return content;
	            	} else {
	               		return "<a href='#' onclick='Js.Center.SendSMS.DepartSendQuery.print(\"" + value + "\")'>详细</a>";
                	}
                }
			}
		]);

        //==============================================================定义grid
        var departSendQueryinfoGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            id: "departsendqueryinfoGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            needMenu: false,
            store: Js.Center.SendSMS.DepartSendQuery.Infostore,
            sm: sm,
            cm: cm,
            needRightMenu: false
        });

        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "departSendQueryinfoSelectPanel",
            height: 160,
            //查询调用的方法
            queryMethod: "Js.Center.SendSMS.DepartSendQuery.queryGrid",
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
                        readOnly: true,
                        id: 'departsendqueryinfodatstart',
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -3/*减3天*/), 'Y-m-d'),
                        format: 'Y-m-d',
                        validateOnBlur: false,
                        validator: function() {
                            var strat_time = Ext.get("departsendqueryinfodatstart").dom.value;
                            var end_time = Ext.get("departsendqueryinfodatend").dom.value;
                            if (strat_time <= end_time) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        },
                        invalidText: '结束时间不能小于开始时间！'
                    }), {
                        xtype: "textfield",
                        name: "content",
                        id: 'departsendqueryinfodepartname',
                        fieldLabel: "发送部门",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 25,
                        maxLengthText: '长度不能超过25！'
                    }, new WXTL.Widgets.CommonForm.ComboBox({
                        xtype: "combo",
                        name: "numprodid",
                        hiddenName: "departsendqueryinfonumprodid",
                        //emptyText: "-=请选择=-",
                        fieldLabel: "通道组",
                        //readOnly: false,
                        mode: "local",
                        displayField: "vc2name",
                        valueField: "numprodid",
                        triggerAction: "all",
                        store: Js.Center.Common.ProductStore
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
                        name: 'datend',
                        readOnly: true,
                        id: 'departsendqueryinfodatend',
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                        format: 'Y-m-d',
                        validateOnBlur: false,
                        validator: function() {
                            var strat_time = Ext.get("departsendqueryinfodatstart").dom.value;
                            var end_time = Ext.get("departsendqueryinfodatend").dom.value;
                            if (strat_time <= end_time) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        },
                        invalidText: '结束时间不能小于开始时间！'
                    }), {
                        xtype: "textfield",
                        name: "content",
                        id: 'departsendqueryinfousername',
                        fieldLabel: "发送人",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 25,
                        maxLengthText: '长度不能超过25！'
                    }, {
                        xtype: "textfield",
                        name: "content",
                        id: 'departsendqueryinfocontent',
                        fieldLabel: "内容",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 50,
                        maxLengthText: '长度不能超过50！'
					}]
				}]
			}]
        });
        //======================================================加载短信通道组
        Js.Center.Common.ProductStore.reload({
            params: {
                vc2servicetype: '1'
            }
        });
        //============================================================== 定义查询按钮事件方法
        Js.Center.SendSMS.DepartSendQuery.queryGrid = function() {
            if (selectPanel.getForm().isValid()) {
                var datStart = Ext.get("departsendqueryinfodatstart").getValue();
                var datEnd = Ext.get("departsendqueryinfodatend").getValue();
                var _departmentname = Ext.get("departsendqueryinfodepartname").getValue();
                var _username = Ext.get("departsendqueryinfousername").getValue();
                var _numprodid = Ext.get("departsendqueryinfonumprodid").getValue();
                var content = Ext.get("departsendqueryinfocontent").getValue();
                var flag = 'selectbysearchkey';
                Js.Center.SendSMS.DepartSendQuery.Infostore.baseParams = {
                    datstart: datStart,
                    datend: datEnd,
                    numprodid: _numprodid,
                    vc2departmentname: _departmentname,
                    vc2creatername: _username,
                    vc2content: content,
                    flag: flag
                };
                Js.Center.SendSMS.DepartSendQuery.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };

        //============================================================================定义主panel
        Js.Center.SendSMS.DepartSendQuery.departSendQueryinfoPanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.SendSMS.DepartSendQuery.departSendQueryinfoPanel",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, departSendQueryinfoGrid]
        })
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.SendSMS.DepartSendQuery.departSendQueryinfoPanel, "openroomiconinfo", "Js.Center.SendSMS.DepartSendQuery.Infostore");
    //查看发送信息详细

    Js.Center.SendSMS.DepartSendQuery.print = function(ID) {
        var row = Js.Center.SendSMS.DepartSendQuery.Infostore.getById(ID);
        if (row.get("numstate") == 5) {
            Js.Center.SendSMS.DepartSendDetailsInfo.func(row);
        }
        else {
            Ext.Msg.alert("温馨提示", "对不起，只能查看发送完成的信息！");
        }

    };
    Js.Center.SendSMS.DepartSendQuery.showPause = function(ID) {
        var row = Js.Center.SendSMS.DepartSendQuery.Infostore.getById(ID);
        Js.Center.SendSMS.operatesms.func(row);
   	    Js.Center.SendSMS.operatesms.window.updateRecord = row;
   		Js.Center.SendSMS.operatesms.window.show();
        //Js.Center.SendSMS.operatesms.window.mainForm.loadRecord(row);
    };
    Js.Center.SendSMS.DepartSendQuery.doPause = function(ID, type) {
        var row = Js.Center.SendSMS.DepartSendQuery.Infostore.getById(ID);
        var info = "您确定要暂停此条短信吗?";
        if(0 == type){
        	info = "您确定要继续此条短信吗?";
        }
        Ext.Msg.confirm("提示!", info, function(btn){
            if (btn == "yes") {
    	        // 弹出效果
                Ext.MessageBox.show({
                    msg: '正在暂停，请稍等...',
                    progressText: 'Saving...',
                    width: 300,
                    wait: true,
                    icon: 'download',
                    animEl: 'saving'
                });
                setTimeout(function(){
                    Ext.MessageBox.hide();
                }, 300000);
                var params = {
                    flag: "doplausesendsms",
                    numcontentid: ID
                };
                doAjaxWithCallBack(Js.Center.SendSMS.YXTSendContentURL,params,function(){});
                sendSMSCallBack();
            }
        })
    }; 
    /**
     * 审核、驳回---回调函数
     */	
    function sendSMSCallBack(){
    	Js.Center.SendSMS.DepartSendQuery.Infostore .reload({
            params: {
                start: 0,
                limit: _pageSize
            },
            callback: function(records, options, success){
            	selectPanel.getForm().reset();
                //secondCheckDoView(0);
            }
       });
    }
};

