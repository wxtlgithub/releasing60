/**
 * 彩信上行记录查询
 * @author Administrator
 */
Ext.namespace('Js.Center.SendMMS.MMSdepartmoinfo');

Js.Center.SendMMS.MMSdepartmoinfo.departmoinfo = function(node){

    if (Ext.get("Js.Center.SendMMS.MMSdepartmoinfo.MMSDepartMoInfoPanel") == null) {
        // ======================================================================= 定义GridPanel相关
        // ===============================================分页每页显示数量
        var _pageSize = 12;
        // ===============================================指定列参数
        
        var fields = ["vc2srcmobile", "vc2content", "longcode", "datrecv", "vc2username", "vc2svcname"];
        Js.Center.SendMMS.MMSdepartmoinfo.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SendMMS.YXTMMSMOQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numcustomerid",
                totalProperty: "totalCount"
            
            }),
            baseParams: {
                datstart: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                datend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                vc2mmstitle: '',
                vc2mobile: '',
                //numsvcid: '',
                longcode: '',
                flag: 'selectbykey'
            }
        });
        Js.Center.SendMMS.MMSdepartmoinfo.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize,
                datstart: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                datend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                vc2mmstitle: '',
                vc2mobile: '',
                //numsvcid: '',
                longcode: '',
                flag: 'selectbykey'
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
            header: "彩信标题",
            tooltip: "彩信标题",
            dataIndex: "vc2content",
            sortable: true
            //width:200
        }, {
            header: "收到时间",
            tooltip: "收到时间",
            dataIndex: "datrecv",
            sortable: true
        } , {
            header: "运营商业务",
            tooltip: "运营商业务",
            dataIndex: "vc2svcname",
            sortable: true
        } , {
            header: "子通道号码",
            tooltip: "子通道号码",
            dataIndex: "longcode",
            sortable: true
        }
        ]);
        //==============================================================定义grid
        var MMSdepartMoInfoGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            //id: "MMSdepartMOinfoQueryGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            needMenu: false,
            store: Js.Center.SendMMS.MMSdepartmoinfo.Infostore,
            sm: sm,
            cm: cm,
            needRightMenu: false
        });
        
        //============================================================================ 定义formpanel
        var MMSdepartMOinfoselectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            //id: "departMOinfoSelectPanel",
            height: 170,
            //查询调用的方法
            
            queryMethod: "Js.Center.SendMMS.MMSdepartmoinfo.queryGrid",
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
                        id: 'Js.Center.SendMMS.MMSdepartmoinfo.DatStart',
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                        format: 'Y-m-d',
                        readOnly: true,
                        SvalidateOnBlur: false,
                        validator: function(){
                            var strat_time = Ext.get("Js.Center.SendMMS.MMSdepartmoinfo.DatStart").dom.value;
                            var end_time = Ext.get("Js.Center.SendMMS.MMSdepartmoinfo.DatEnd").dom.value;
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
                        id: 'Js.Center.SendMMS.MMSdepartmoinfo.MMSTitle',
                        fieldLabel: "彩信标题",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 20,
                        maxLengthText: '长度应小于等于20'
                    }, {
                        xtype: "textfield",
                        name: "vc2mobile",
                        id: "Js.Center.SendMMS.MMSdepartmoinfo.MMSSendMobile",
                        fieldLabel: "手机号码",
                        regex: WXTL.Common.regex.Mobile,
                        regexText: "手机号码格式不正确"//,
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
                        id: 'Js.Center.SendMMS.MMSdepartmoinfo.DatEnd',
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                        format: 'Y-m-d',
                        readOnly: true,
                        validateOnBlur: false,
                        validator: function(){
                            var strat_time = Ext.get("Js.Center.SendMMS.MMSdepartmoinfo.DatStart").dom.value;
                            var end_time = Ext.get("Js.Center.SendMMS.MMSdepartmoinfo.DatEnd").dom.value;
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
                        id: "Js.Center.SendMMS.MMSdepartmoinfo.MMSLongCode",
                        fieldLabel: "子通道号码",
                        regex: /^\d{1,20}$/,
                        regexText: "只能输入长度20位以内的数字"
                    }]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.SendMMS.MMSdepartmoinfo.queryGrid = function(){
            if (MMSdepartMOinfoselectPanel.getForm().isValid()) {
                var datStart = Ext.get("Js.Center.SendMMS.MMSdepartmoinfo.DatStart").getValue();
                var datEnd = Ext.get("Js.Center.SendMMS.MMSdepartmoinfo.DatEnd").getValue();
                var vc2mmstitle = Ext.get("Js.Center.SendMMS.MMSdepartmoinfo.MMSTitle").getValue();
                var vc2mobile = Ext.get("Js.Center.SendMMS.MMSdepartmoinfo.MMSSendMobile").getValue();
                var longcode = Ext.get("Js.Center.SendMMS.MMSdepartmoinfo.MMSLongCode").getValue();
                var flag = 'selectbykey';
                Js.Center.SendMMS.MMSdepartmoinfo.Infostore.baseParams = {
                    datstart: datStart,
                    datend: datEnd,
                    vc2mmstitle: vc2mmstitle,
                    vc2mobile: vc2mobile,
                    longcode: longcode,
                    flag: flag
                };
                Js.Center.SendMMS.MMSdepartmoinfo.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.SendMMS.MMSdepartmoinfo.MMSDepartMoInfoPanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.SendMMS.MMSdepartmoinfo.MMSDepartMoInfoPanel",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [MMSdepartMOinfoselectPanel, MMSdepartMoInfoGrid]
        })
    };
    
    //=======================================start====================================定义加黑方法
    Js.Center.SendMMS.MMSdepartmoinfo.BlackAdd = function(vc2Mobile){
    
        Ext.Msg.confirm("提示!", "您确定要将此号码加入黑名单吗?", function(btn){
            if (btn == "yes") {
            
                doSynRequest(Js.Center.Business.BlackUpdateURL + "?whitelistaddnumsvcid=1&flag=insertbylist&mobilelist=" + vc2srcmobile);
            }
            else {
            }
            Js.Center.SendMMS.MMSdepartmoinfo.Infostore.reload()
        })
        
    };
    //=======================================end====================================定义加黑方法
    
    
    
    //============================================================================绑定到center
    GridMain(node, Js.Center.SendMMS.MMSdepartmoinfo.MMSDepartMoInfoPanel, "openroomiconinfo", "Js.Center.SendMMS.MMSdepartmoinfo.Infostore");
};

