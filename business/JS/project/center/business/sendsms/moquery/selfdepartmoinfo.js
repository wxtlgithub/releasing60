/**
 * 短信上行记录查询
 * @author Administrator
 */
Ext.namespace('Js.Center.SendSMS.SelfDepartMoQuery');

Js.Center.SendSMS.SelfDepartMoQuery.departmoinfo = function(node){
	var clientStore = new Ext.data.Store({
	    proxy: new Ext.data.HttpProxy({
	        url: "URL/Common/Data/IndustryQuery.ashx",
			method: "POST"
	    }),
	    reader: new Ext.data.JsonReader({
			fields: ['numclientid','vc2clientname'],
	        root: "data",
	        id: "numclientid"
	    }),
	    baseParams: {
	        flag: 'queryDepartclient'
	    }
	});
	clientStore.reload();
    if (Ext.get("Js.Center.SendSMS.SelfDepartMoQuery.DepartMoInfoPanel") == null) {
        // ======================================================================= 定义GridPanel相关
        // ===============================================分页每页显示数量
        var _pageSize = 12;
        // ===============================================指定列参数
        
        var fields = ["numseqid", "vc2srcmobile", "vc2content", "longcode", "vc2departname", "datrecv", "vc2username", "vc2svcname"];
        Js.Center.SendSMS.SelfDepartMoQuery.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SendSMS.MOSelfqueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numseqid",
                totalProperty: "totalCount"
            
            }),
            baseParams: {
                datstart: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                datend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                vc2Content: '',
                numsvcid: '',
                vc2mobile: '',
                flag: 'selectbyselfdepartment'
            }
        });
        Js.Center.SendSMS.SelfDepartMoQuery.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize,
                datstart: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                datend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                vc2Content: '',
                numsvcid: '',
                vc2mobile: '',
                longcode:'',
                clientid:'',
                flag: 'selectbyselfdepartment'
            }
        });
        
        // ==================================================== 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numcustomerid"
        });
        // ==================================================== 列头
        var cm = new Ext.grid.ColumnModel([{
            header: "手机号码",
            tooltip: "手机号码",
            dataIndex: "vc2srcmobile",
            sortable: true
        }, {
            header: "短信内容",
            tooltip: "短信内容",
            dataIndex: "vc2content",
            sortable: true,
            width: 200,
            renderer: function(value){
                return "<font qtip='" + value + "'>" + value + "</font>";
            },
            readOnly: true,
            editor: new Ext.form.TextField({
                readOnly: true
            })
        }, {
            header: "收到时间",
            tooltip: "收到时间",
            dataIndex: "datrecv",
            sortable: true
        } , {
            header: "子通道号码",
            tooltip: "子通道号码",
            dataIndex: "longcode",
            sortable: true
        } , {
            header: "运营商业务",
            tooltip: "运营商业务",
            dataIndex: "vc2svcname",
            sortable: true
        }           
        ]);
        //==============================================================定义grid
        var departMoInfoGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            //id: "departMOinfoQueryGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            needMenu: false,
            store: Js.Center.SendSMS.SelfDepartMoQuery.Infostore,
            sm: sm,
            cm: cm,
            needRightMenu: false,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'exporticon',
                    text: "数据导出",
                    handler: function(){
                    	var datStart = Ext.get("Js.Center.SendSMS.SelfDepartMoQuery.DatStart").getValue();
                        var datEnd = Ext.get("Js.Center.SendSMS.SelfDepartMoQuery.DatEnd").getValue();
                        var vc2Content = Ext.get("Js.Center.SendSMS.SelfDepartMoQuery.SMSContent").getValue();
                        var longCode = Ext.get("Js.Center.SendSMS.SelfDepartMoQuery.SMSLongCode").getValue();
                        var clientid = Ext.getCmp("Js.Center.SendSMS.SelfDepartMoQuery.clientid").getValue();
                        var vc2Mobile = Ext.get("Js.Center.SendSMS.SelfDepartMoQuery.SMSSendMobile").getValue();
                        var limit = Js.Center.SendSMS.SelfDepartMoQuery.Infostore.getTotalCount();
                    	//exportData(Js.Center.Statistics.YXTStatisticsMtURL, "flag=loadbycustomer&start=0&limit=-1&datcreattimestart=" + Ext.get("Js.Center.YXTStatistics.mtByCustomer.DatStart").getValue() + "&datcreattimeend=" + Ext.get("Js.Center.YXTStatistics.mtByCustomer.DatEnd").getValue() + "&vc2departname=" + encodeURI(Ext.get("Js.Center.YXTStatistics.mtByCustomer.DepartmentName").getValue()) + "&vc2username=" + encodeURI(Ext.get("Js.Center.YXTStatistics.mtByCustomer.UserName").getValue()));
                    	windowOpen(Js.Center.SendSMS.MOSelfqueryURL + "?" + "flag=expot&start=0&limit="+limit+"&datstart="+datStart+"&datend="+datEnd+"&vc2Content="+vc2Content+"&longcode="+longCode+"&vc2mobile="+vc2Mobile+"&clientId="+clientid, 400, 300);
                    }
                }]
            })
            //            
            //            listeners: {
            //                "rowcontextmenu": function(grid, rowIndex, e){
            //                    e.stopEvent();
            //                    openRightClick.showAt(e.getXY());
            //                },
            //                "afteredit": function(e){
            //                    this.afterEdit(e);
            //                }
            //            }
        });
        
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            //id: "departMOinfoSelectPanel",
            height: 170,
            //查询调用的方法
            queryMethod: "Js.Center.SendSMS.SelfDepartMoQuery.queryGrid",
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
                        id: 'Js.Center.SendSMS.SelfDepartMoQuery.DatStart',
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                        // emptyText: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow()/*, -3减3天*/), 'Y-m-d'),
                        format: 'Y-m-d',
						readOnly:true,
                        validateOnBlur: false,
                        validator: function(){
                            var strat_time = Ext.get("Js.Center.SendSMS.SelfDepartMoQuery.DatStart").dom.value;
                            var end_time = Ext.get("Js.Center.SendSMS.SelfDepartMoQuery.DatEnd").dom.value;
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
                        name: "vc2content",
                        id: 'Js.Center.SendSMS.SelfDepartMoQuery.SMSContent',
                        fieldLabel: "短信内容",
                        maxLength: 50,
                        regex: WXTL.Common.regex.IllegalDiy,
                        regexText: WXTL.Common.regexText.IllegalText
                    }, {
                        xtype: "textfield",
                        name: "vc2mobile",
                        id: "Js.Center.SendSMS.SelfDepartMoQuery.SMSSendMobile",
                        fieldLabel: "手机号码",
                        regex: WXTL.Common.regex.Mobile,
                        regexText: "手机号码格式不正确"
                       
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
                    items: [new Ext.form.DateField({
                        fieldLabel: '结束时间',
                        name: 'datend',
                        id: 'Js.Center.SendSMS.SelfDepartMoQuery.DatEnd',
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                        format: 'Y-m-d',
						readOnly:true,
                        validateOnBlur: false,
                        validator: function(){
                            var strat_time = Ext.get("Js.Center.SendSMS.SelfDepartMoQuery.DatStart").dom.value;
                            var end_time = Ext.get("Js.Center.SendSMS.SelfDepartMoQuery.DatEnd").dom.value;
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
                         name: "longcode",
                         id: "Js.Center.SendSMS.SelfDepartMoQuery.SMSLongCode",
                         fieldLabel: "子通道号码",
                         regex: /^\d{1,20}$/,
                         regexText: "只能输入长度20位以内的数字"
                    }, new Ext.form.ComboBox({
                        xtype: "combo",
                        id: "Js.Center.SendSMS.SelfDepartMoQuery.clientid",
                        name: "clientid",
                        hiddenName: "clientid",
                        fieldLabel: "程序编号",
                        mode: "local",
                        displayField: "numclientid",
                        valueField: "numclientid",
                        triggerAction: "all",
                        store: clientStore
                    })]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.SendSMS.SelfDepartMoQuery.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var datStart = Ext.get("Js.Center.SendSMS.SelfDepartMoQuery.DatStart").getValue();
                var datEnd = Ext.get("Js.Center.SendSMS.SelfDepartMoQuery.DatEnd").getValue();
                var vc2Content = Ext.get("Js.Center.SendSMS.SelfDepartMoQuery.SMSContent").getValue();
                var longCode = Ext.get("Js.Center.SendSMS.SelfDepartMoQuery.SMSLongCode").getValue();
                var clientid = Ext.getCmp("Js.Center.SendSMS.SelfDepartMoQuery.clientid").getValue();
                // alert(Ext.get("Js.Center.SendSMS.SelfDepartMoQuery.clientid").getValue());
                var vc2Mobile = Ext.get("Js.Center.SendSMS.SelfDepartMoQuery.SMSSendMobile").getValue();
                var flag = 'selectbyselfdepartment';
                Js.Center.SendSMS.SelfDepartMoQuery.Infostore.baseParams = {
                    datstart: datStart,
                    datend: datEnd,
                    vc2Content: vc2Content,
                    longcode: longCode,
                    vc2mobile: vc2Mobile,
                    clientId : clientid,
                    // type: 2,
                    flag: flag
                };
                Js.Center.SendSMS.SelfDepartMoQuery.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
    
        
        //============================================================================定义主panel
        Js.Center.SendSMS.SelfDepartMoQuery.DepartMoInfoPanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.SendSMS.SelfDepartMoQuery.DepartMoInfoPanel",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, departMoInfoGrid]
        })
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.SendSMS.SelfDepartMoQuery.DepartMoInfoPanel, "openroomiconinfo", "Js.Center.SendSMS.SelfDepartMoQuery.Infostore");
};

