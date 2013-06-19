/**
 * 彩信下行记录查询
 * @author
 */
Ext.namespace('Js.Center.SendMMS.MMSmtqueryinfo');

Js.Center.SendMMS.MMSmtqueryinfo.info = function(node){
   
    if (Ext.get("Js.Center.SendMMS.MMSmtqueryinfo.MMSmtqueryinfoPanel") == null) {
        // ======================================================================= 定义GridPanel相关
        // ===============================================分页每页显示数量
        var _pageSize = 12;
        // ===============================================指定列参数,,vc2username,vc2departname,datcreatetime,datsend,numresponsestatus,numreportstatus
        var fields = ["numrowasdf", "nummmsid", "vc2mmstitle", "numsendtype", "vc2destmobile", "vc2servicecode", "vc2username", "vc2departname", "datcreatetime", "datcheck2", "datsendtime", "numresponsestatus", "vc2reportstatus","vc2desc","vc2messagecontent"];
        Js.Center.SendMMS.MMSmtqueryinfo.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SendMMS.MMSMTQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numrowasdf",
                totalProperty: "totalCount"
            
            }),
            baseParams: {
                datstart: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                datend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                vc2mmstitle: '',
                vc2destmobile: '',
                nummmstype: '',
                numresponsestatus: '',
                numreportstatus: '',
                flag: 'selectmtbysearchkey'
            },
            sortInfo: {
                field: 'datsendtime',
                direction: 'DESC'
            }//解决分组无效代码
        });
        //首次打开页面不加载数据
//        Js.Center.SendMMS.MMSmtqueryinfo.Infostore.load({
//            params: {
//                start: 0,
//                limit: _pageSize,
//                datstart: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
//                datend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
//                vc2mmstitle: '',
//                vc2destmobile: '',
//                nummmstype: '',
//                numresponsestatus: '',
//                numreportstatus: '',
//                flag: 'selectmtbysearchkey'
//            }
//        });
        // ==================================================== 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numrowasdf"
        });
        // ==================================================== 列头
        
        
        var cm = new Ext.grid.ColumnModel([{
            header: "彩信id",
            tooltip: "彩信id",
            dataIndex: "nummmsid",
            hidden: true,
            sortable: true
            // width: 220
        
        }, {
            header: "彩信标题",
            tooltip: "彩信标题",
            dataIndex: "vc2mmstitle",
            sortable: true
 
        
        },{
            header: "彩信名称",
            tooltip: "彩信名称",
            dataIndex: "vc2desc",
            hidden: true,
            sortable: true
        },{
            header: "彩信类型",
            tooltip: "彩信类型",
            dataIndex: "numsendtype",
            sortable: true,
            renderer: function(value){
                if (value == 5 || value == 8) {
                    return "个性化彩信";
                }
                else {
                    return "普通彩信";
                }
            }
            
        }, {
            header: "手机号码",
            tooltip: "手机号码",
            dataIndex: "vc2destmobile",
            sortable: true
        }, {
            header: "服务号码",
            tooltip: "服务号码",
            dataIndex: "vc2servicecode",
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
            header: "提交时间",
            tooltip: "提交时间",
            dataIndex: "datcreatetime",
            sortable: true
        }, {
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
            sortable: true
//            renderer: function(value){
//                if (value == 0) {
//                    return "接收成功";
//                    
//                }
//                else 
//                    if (value == 1) {
//                        return "接收等待";
//                    }
//                    else {
//                        return "接收失败";
//                        
//                    }
//                
//            }
        }, {
            header: "操作",
            tooltip: "操作",
            dataIndex: "nummmsid",
            width: 80,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                return "　<a href='#' onclick='Js.Center.SendMMS.MMSmtqueryinfo.print(\"" + record.data.nummmsid + "\",\""+record.data.vc2messagecontent+"\")'>查  看</a>";
            }
        }]);
        //==============================================================定义grid
        var MMSMTQueryInfoGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            //id: "MMSMTQueryinfoGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            needMenu: false,
            store: Js.Center.SendMMS.MMSmtqueryinfo.Infostore,
            sm: sm,
            cm: cm,
            needRightMenu: false
        });
        
        //============================================================================ 定义formpanel
        
        var MMSselectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            //id: "MMSMTQueryinfoSelectPanel",
            height: 200,
            //查询调用的方法
            queryMethod: "Js.Center.SendMMS.MMSmtqueryinfo.queryGrid",
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
                        id: 'Js.Center.SendMMS.MMSmtqueryinfo.DatStart',
                        readOnly: true,
                        //emptyText:StartDateTime,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                        format: 'Y-m-d',
                        validateOnBlur: false,
                        validator: function(){
                            var strat_time = Ext.get("Js.Center.SendMMS.MMSmtqueryinfo.DatStart").dom.value;
                            var end_time = Ext.get("Js.Center.SendMMS.MMSmtqueryinfo.DatEnd").dom.value;
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
                        name: "vc2mmstitle",
                        id: 'Js.Center.SendMMS.MMSmtqueryinfo.MMSTitle',
                        fieldLabel: "彩信标题",
                        regex: WXTL.Common.regex.IllegalDiy,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 20,
                        maxLengthText: '长度应小于等于20'
                    }, {
                        xtype: "combo",
                        name: "nummmstype",
                        //id:"MMSMTQueryinfonummmstype",
                        hiddenName: "MMSMTQueryinfonummmstype",
                        fieldLabel: "彩信类型",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2type",
                        valueField: "numtype",
                        triggerAction: "all",
                        emptyText: "-=请选择=-",
                        store: new Ext.data.SimpleStore({
                            fields: ['numtype', 'vc2type'],
                            data: [["", "-=请选择=-"], [1, '普通彩信'], [5, '个性化彩信']]
                        })
                    }, {
                        xtype: "combo",
                        name: "numreportstatus",
                        //id:"MMSMTQueryinfonumreportstatus",
                        hiddenName: "MMSMTQueryinfonumreportstatus",
                        fieldLabel: "接收状态",
                        readOnly: true,
                        mode: "local",
                        displayField: "show",
                        valueField: "value",
                        triggerAction: "all",
                        emptyText: "-=请选择=-",
                        store: new Ext.data.SimpleStore({
                            fields: ["show", "value"],
                            data: [["-=请选择=-", ""], ["接收成功", "0"], ["接收等待", "1"], ["接收失败", "2"]]
                        })
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
                        id: 'Js.Center.SendMMS.MMSmtqueryinfo.DatEnd',
                        readOnly: true,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),//+ new Date().getTime()
                        format: 'Y-m-d',
                        validateOnBlur: false,
                        validator: function(){
                            var strat_time = Ext.get("Js.Center.SendMMS.MMSmtqueryinfo.DatStart").dom.value;
                            var end_time = Ext.get("Js.Center.SendMMS.MMSmtqueryinfo.DatEnd").dom.value;
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
                        id: 'Js.Center.SendMMS.MMSmtqueryinfo.MMSSendMobile',
                        fieldLabel: "<font color=red>手机号码</font>",
                        allowBlank: false,
                        regex: WXTL.Common.regex.Mobile,
                        regexText: "手机号码格式不正确"//,
                    }, {
                        xtype: "combo",
                        name: "numresponsestatus",
                        //id:"MMSMTQueryinfonumresponsestatus",
                        hiddenName: "MMSMTQueryinfonumresponsestatus",
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
                    }]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.SendMMS.MMSmtqueryinfo.queryGrid = function(){
            if (MMSselectPanel.getForm().isValid()) {
                var datStart = Ext.get("Js.Center.SendMMS.MMSmtqueryinfo.DatStart").getValue();
                var datEnd = Ext.get("Js.Center.SendMMS.MMSmtqueryinfo.DatEnd").getValue();
                var vc2mmstitle = Ext.get("Js.Center.SendMMS.MMSmtqueryinfo.MMSTitle").getValue();
                var vc2destmobile = Ext.get("Js.Center.SendMMS.MMSmtqueryinfo.MMSSendMobile").getValue();
                var nummmstype = Ext.get("MMSMTQueryinfonummmstype").getValue();
                var numresponsestatus = Ext.get("MMSMTQueryinfonumresponsestatus").getValue();
                var numreportstatus = Ext.get("MMSMTQueryinfonumreportstatus").getValue();
                var flag = 'selectmtbysearchkey';
                Js.Center.SendMMS.MMSmtqueryinfo.Infostore.baseParams = {
                    datstart: datStart,
                    datend: datEnd,
                    vc2mmstitle: vc2mmstitle,
                    vc2destmobile: vc2destmobile,
                    nummmstype: nummmstype,
                    numresponsestatus: numresponsestatus,
                    numreportstatus: numreportstatus,
                    flag: flag
                };
                Js.Center.SendMMS.MMSmtqueryinfo.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.SendMMS.MMSmtqueryinfo.MMSmtqueryinfoPanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.SendMMS.MMSmtqueryinfo.MMSMTQueryinfoPanel",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            //height:500,
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [MMSselectPanel, MMSMTQueryInfoGrid]
        })
    };
    //============================================================================绑定到center
    //修改页面使标签切换时不刷新Grid
    GridMain(node, Js.Center.SendMMS.MMSmtqueryinfo.MMSmtqueryinfoPanel, "openroomiconinfo", "");
    //查看发送彩信信息详细
    
    
    
    Js.Center.SendMMS.MMSmtqueryinfo.print = function(nummmsid,resourcesid){
        var json = eval(doSynRequest(Js.Center.SendMMS.MMSQueryDescURL + "?flag=selecthismms&nummmsseqid=" + nummmsid+"&src="+resourcesid));
        if(json.success == false){
        	Ext.Msg.alert("提示信息", "对不起，资源不存在！");
        	return;
        }
        if (Ext.get("Js.Center.SendMMS.MMSsendPreview.MainPanel") == null) {
            //==========================定义预览Panel
            var previewMMSPanel = new WXTL.Widgets.CommonPanel.MMSpanel({
                id: "Js.Center.SendMMS.MMSsendPreview.PreviewMMSPanel",
                title: '预览：第1帧',
                region: 'west',
                //brotherPanel: framePanel,
                contentJson: json,
                width: 245,
                height: 374,
                collapsible: false,
                margins: '3 0 0 3',
                cmargins: '3 3 3 3',
                frame: false
            });
            //=============================定义主窗体
            var mainPanel = new Ext.form.FormPanel({
                id: "Js.Center.SendMMS.MMSsendPreview.MainPanel",
                bodyStyle: "padding:0px 0 0px 15px",
                defaults: {
                    anchor: "90%",
                    msgTarget: "side"
                },
                //height:'400',
                border: false,
                labelWidth: 60,
                layout: 'form',
                frame: true
            
            });
            var mainForm = mainPanel.getForm();
            Js.Center.SendMMS.MMSmtqueryinfo.PreviewWindow = new WXTL.Widgets.CommonWindows.Window({
                title: "彩信预览",
                width: 259,
                height: 480,
                layout: 'form',
                mainForm: mainForm,
                closeAction: 'close',//关闭方式
                autoScroll: false,
                collapsible: false,
                needButtons: false,
                items: [previewMMSPanel, mainPanel],
                 listeners: {
                "close": function(){
                
                     if(previewMMSPanel.bottomToolbar.items.items[0].text != "播放"){
                         previewMMS(json.frame.length);
                         window.clearInterval(playTime);
                     }
                }
				
            },
                buttons: [new Ext.Button({
                    text: '关闭',
                    qtip: "关闭",
                    minWidth: 70,
                    handler: function(){
                        Js.Center.SendMMS.MMSmtqueryinfo.PreviewWindow.close();
                    }
                })]
            });
        };
        //显示窗体彩信预览窗口
        Js.Center.SendMMS.MMSmtqueryinfo.Infostore.reload();
        Js.Center.SendMMS.MMSmtqueryinfo.PreviewWindow.show();
        
        
    };
    
    
    
};

