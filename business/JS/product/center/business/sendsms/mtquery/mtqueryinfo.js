/**
 * 短信下行记录查询
 * @author 孙吉君
 */
Ext.namespace('Js.Center.SendSMS.MTQuery');

Js.Center.SendSMS.MTQuery.MTQueryinfo = function(node){
	Js.Center.Common.BusinessGatewayStore.reload();

    if (Ext.get("Js.Center.SendSMS.MTQuery.MTQueryinfoPanel") == null) {
        // ======================================================================= 定义GridPanel相关
        // ===============================================分页每页显示数量
        var _pageSize = 12;
        // ===============================================指定列参数
        // * 短信内容，手机号码，服务号码，发送人，部门，提交时间，发送时间，发送状态，接收状态
        //vc2content,vc2destmobile,VC2SERVICECODE,vc2username,vc2departname,DATSEND,NUMRESPONSESTATUS,NUMREPORTSTATUS
        var fields = ["numcontentid", "datrecvtime","numgwid","vc2spnum","vc2gatewayname","vc2messagecontent", "vc2destmobile", "vc2servicecode", "datcreate", "datcheck2", "datsendtime", "numresponsestatus", "numreportstatus","vc2reportstatus" ];
        
        //var fields = ["numcontentid", "numsendplanid", "vc2content", "vc2desmobile", "vc2username", "username2", "datsend", "datcreate", "datcheck1", "datcheck2", "numcreaterid", "vc2creatername", "numcheck1id", "vc2check1name", "numcheck2id", "vc2check2name", "vc2departname", "vc2reportstatus", "numstate", "numprenum"];
        Js.Center.SendSMS.MTQuery.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
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
            baseParams: {
                datstart: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                datend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                vc2desmobile: '',
                vc2content: '',
                numresponsestatus: '',
                vc2reportstatus: '',
                numgwid: '',
                flag: 'selectmtbysearchkey'
            },            
            sortInfo: {
                field: 'datsendtime',
                direction: 'DESC'
            }//解决分组无效代码
        });
        // ==================================================== 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numcontentid"
        });
        // ==================================================== 列头
        var cm = new Ext.grid.ColumnModel([{
            header: "短信内容",
            tooltip: "短信内容",
            dataIndex: "vc2messagecontent",
            sortable: true,
            width: 220,
            renderer: function(value){
                return "<font qtip='" + value + "'>" + value + "</font>";
            },
            readOnly: true,
            editor: new Ext.form.TextField({
                readOnly: true
            })
        }, {
            header: "手机号码",
            tooltip: "手机号码",
            dataIndex: "vc2destmobile",
            sortable: true
        }, {
            header: "服务号码",
            tooltip: "服务号码",
            dataIndex: "vc2spnum",
            sortable: true
        }, {
            header: "网关编号",
            tooltip: "网关编号",
            dataIndex: "numgwid",
            sortable: true
        }, {
            header: "收到时间",
            tooltip: "收到时间",
            dataIndex: "datrecvtime",
            sortable: true
        }, {
        	hidden:true,
            header: "审核时间",
            tooltip: "审核时间",
            dataIndex: "datcheck2",
            sortable: true
        }, {
            header: "发送时间",
            tooltip: "发送时间",
            dataIndex: "datsendtime",
            sortable: true
        }, {
            header: "发送状态",
            tooltip: "发送状态",
            dataIndex: "numresponsestatus",
            sortable: true,
            renderer: function(value){
                if (value == 0) {
                    return "发送成功";
                }
                else 
                    return "发送失败(" + value + ")";
            }
        }, {
            header: "接收状态",
            tooltip: "接收状态",
            dataIndex: "vc2reportstatus",
            sortable: true,
            renderer: function(value){
                return "<font qtip='" + value + "'>" + value + "</font>";
            }
        }]);
        //==============================================================定义grid
        var MTQueryInfoGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            //id: "MTQueryinfoGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            needMenu: false,
            store: Js.Center.SendSMS.MTQuery.Infostore,
            sm: sm,
            cm: cm,
            needRightMenu: false
        });
        
        //============================================================================ 定义formpanel
        
        var SMSselectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            //id: "MTQueryinfoSelectPanel",
            height: 180,
            //查询调用的方法
            queryMethod: "Js.Center.SendSMS.MTQuery.queryGrid",
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
                        id: 'Js.Center.SendSMS.MTQuery.DatStart',
                        readOnly: true,
                        //emptyText:StartDateTime,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                        format: 'Y-m-d',
                        validateOnBlur: false,
                        validator: function(){
                            var strat_time = Ext.get("Js.Center.SendSMS.MTQuery.DatStart").dom.value;
                            var end_time = Ext.get("Js.Center.SendSMS.MTQuery.DatEnd").dom.value;
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
                        id: 'Js.Center.SendSMS.MTQuery.SMSContent',
                        fieldLabel: "短信内容",
                        maxLength: 50,
                        regex: WXTL.Common.regex.IllegalDiy,
                        regexText: WXTL.Common.regexText.IllegalText
                    }, {
                        xtype: "combo",
                        name: "numresponsestatus",
                        //id:"Js.Center.SendSMS.MTQuery.SMSStatus",
                        hiddenName: "Js.Center.SendSMS.MTQuery.SMSStatus",
                        fieldLabel: "发送状态",
                        readOnly: true,
                        mode: "local",
                        displayField: "show",
                        valueField: "value",
                        triggerAction: "all",
                        emptyText: "-=请选择=-",
                        store: new Ext.data.SimpleStore({
                            fields: ["show", "value"],
                            data: [["-=请选择=-", ""], ["发送成功", "0"], ["发送失败", "2"]]
                        })
                    },{
                        xtype: "xComboBox",
                        name: "numgwid",
                        //id: "Js.Center.SendSMS.MTQuery.NumGWid",
                        fieldLabel: "网关名称",
                        hiddenName: "Js.Center.SendSMS.MTQuery.NumGWid",
                        //readOnly: true,
                        mode: "local",
                        store: Js.Center.Common.BusinessGatewayStore,
                        //typeAhead: true,
                        triggerAction: 'all',
                        selectOnFocus: true,
                        emptyText: '-=请选择=-',
                        //forceSelection: true, // 要求输入值必须在列表中存在
                        displayField: 'vc2gatewayname',
                        valueField: 'numgwid'
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
                        id: 'Js.Center.SendSMS.MTQuery.DatEnd',
                        readOnly: true,
                        // emptyText:new Date().format('Y-m-d H:i:s'),
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),//+ new Date().getTime()
                        format: 'Y-m-d',
                        validateOnBlur: false,
                        validator: function(){
                            var strat_time = Ext.get("Js.Center.SendSMS.MTQuery.DatStart").dom.value;
                            var end_time = Ext.get("Js.Center.SendSMS.MTQuery.DatEnd").dom.value;
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
                        name: "vc2mobile",
                        id: 'Js.Center.SendSMS.MTQuery.Mobile',
                        fieldLabel: "<font color=red>手机号码</font>",
                        allowBlank: false,
                         regex: WXTL.Common.regex.Mobile,
                        regexText: "手机号码格式不正确"//,
                    }, {
                        xtype: "combo",
                        name: "vc2reportstatus",
                        //id:"vc2reportstatus",
                        hiddenName: "vc2reportstatus",
                        fieldLabel: "接收状态",
                        readOnly: true,
                        mode: "local",
                        displayField: "show",
                        valueField: "value",
                        triggerAction: "all",
                        emptyText: "-=请选择=-",
                        store: new Ext.data.SimpleStore({
                            fields: ["show", "value"],
                            data: [["-=请选择=-", ""], ["接收成功", "0"], ["接收未知", "1"], ["接收失败", "2"]]
                        })
                    }]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.SendSMS.MTQuery.queryGrid = function(){
            if (SMSselectPanel.getForm().isValid()) {
                var datStart = Ext.get("Js.Center.SendSMS.MTQuery.DatStart").getValue();
                var datEnd = Ext.get("Js.Center.SendSMS.MTQuery.DatEnd").getValue();
                var vc2desmobile = Ext.get("Js.Center.SendSMS.MTQuery.Mobile").getValue();
                var vc2Content = Ext.get("Js.Center.SendSMS.MTQuery.SMSContent").getValue();
                var numresponsestatus = Ext.get("Js.Center.SendSMS.MTQuery.SMSStatus").getValue();
                var vc2reportstatus = Ext.get("vc2reportstatus").getValue();
                var numgwid = Ext.get("Js.Center.SendSMS.MTQuery.NumGWid").getValue();
                var flag = 'selectmtbysearchkey';
                Js.Center.SendSMS.MTQuery.Infostore.baseParams = {
                    datstart: datStart,
                    datend: datEnd,
                    vc2desmobile: vc2desmobile,
                    vc2content: vc2Content,
                    numresponsestatus: numresponsestatus,
                    vc2reportstatus: vc2reportstatus,
                    numgwid: numgwid,
                    flag: flag
                };
                Js.Center.SendSMS.MTQuery.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.SendSMS.MTQuery.MTQueryinfoPanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.SendSMS.MTQuery.MTQueryinfoPanel",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [SMSselectPanel, MTQueryInfoGrid]
        })
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.SendSMS.MTQuery.MTQueryinfoPanel, "openroomiconinfo", "");
    //查看发送信息详细
    Js.Center.SendSMS.MTQuery.print = function(ID){
        var row = Js.Center.SendSMS.MTQuery.Infostore.getById(ID);
        if (row.get("numstate") == 5) {
            Js.Center.SendSMS.DepartSendDetailsInfo.func(row);
        }
        else {
            Ext.Msg.alert("温馨提示", "对不起，只能查看发送完成的信息！");
        }
        
    };
};

