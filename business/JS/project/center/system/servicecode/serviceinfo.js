Ext.namespace('Js.Center.Business.ServiceInfo');

Js.Center.Business.ServiceInfo.func = function(node){


    if (Ext.get("Js.Center.Business.ServiceInfo.servicepanel") == null) {
        //==============================================================网关下拉列表数据定义
        Js.Center.Common.GatewayStore.Search = new Ext.data.Store({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.GatewayURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ['numgwid', 'vc2gatewayname'],
                root: 'data',
                id: 'numgwid'
            }),
            baseParams: {
                columnlist: 'numgwid,vc2gatewayname',
                flag: 'selectall',
                serviceflag: 'selectbyservicetype'
            }
        });
        Js.Center.Common.GatewayStore.Search.on("load", function(a){
            if (a.getAt(0) != null && a.getAt(0).data[obj.valueField] != '') {
                var r = new Ext.data.Record({});
                r.set(o.valueField, ''); //添加一格值为-1的选项
                r.set(o.displayField, '-=请先选择短彩类型=-');
                a.insert(0, r);
            }
        });
        //==============================================================下拉列表数据定义
        Js.Center.Common.GatewayStore.Search.reload();
        
        // ======================================================================= 定义GridPanel相关
        // ===============================================分页每页显示数量
        
        var _pageSize = 12;
        // ===============================================指定列参数
        
        var fields = ["numprodid", "vc2name", "numsvcid", "vc2svcname", "vc2spnum", "vc2validflag", "vc2subcode", "vc2servicetype"];
        Js.Center.Business.ServiceInfo.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.ServiceURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'vc2svcname',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
            	 vc2subcode: '',
                 vc2name: '',
                 vc2servicetype: '',
                 numgwid:'',
                flag: 'querychildrenservicecode'
            }
        });
        Js.Center.Business.ServiceInfo.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize,
                vc2subcode: '',
                vc2name: '',
                vc2servicetype: '',
                numgwid:'',
                flag: 'querychildrenservicecode'
            }
        });
        
        // ==================================================== 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numsvcid"
        });
        // ==================================================== 列头
        var cm = new Ext.grid.ColumnModel([{
            header: "通道组名称",
            tooltip: "通道组名称",
            dataIndex: "vc2name",
            sortable: true
        }, {
            header: "产品名称",
            tooltip: "产品名称",
            dataIndex: "vc2svcname",
            sortable: true
        }, {
            header: "服务代码",
            tooltip: "服务代码",
            dataIndex: "vc2spnum",
            sortable: true
        },{
            header: "子号码",
            tooltip: "子号码",
            dataIndex: "vc2subcode",
            sortable: true
        }, {
            header: "状态",
            tooltip: "状态",
            dataIndex: "vc2validflag",
            sortable: true,
            renderer: function(value){
                if (value == "1") {
                    return "商用";
                }else if (value == "0") {
                    return "暂停";
                }
            }
        }]);
        
        //==============================================================定义grid
        var serviceGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            id: "Js.Center.Business.ServiceInfo.serviceinfoGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.Business.ServiceInfo.Infostore,
            sm: sm,
            cm: cm,
            needMenu: false
            
        });
        
        
        //============================================随短彩类型变动而变======================网关列表
        var gatewayCombo = new WXTL.Widgets.CommonForm.ComboBox({
            xtype: "xComboBox",
            name: "numgwid_ext",
            id: "Js.Center.Business.ServiceInfo.numgwid_ext",
            fieldLabel: "网关名称",
            hiddenName: "Js.Center.Business.ServiceInfo.servicodegwid",
            //readOnly: true,
            mode: "local",
            displayField: "vc2gatewayname",
            valueField: "numgwid",
            triggerAction: "all",
            emptyText: '-=请先选择短彩类型=-',
            valueNotFoundText: '-=请先选择短彩类型=-',
            store: Js.Center.Common.GatewayStore.Search
//            initCancleText: function(o){ //自动添加一个空选择项
//                var obj = this;
//                o.on("select", function(){
//                    //            if (o.getValue() == -1) { //当选择-1时，把值设置为空
//                
//                    //                o.setValue("");
//                    //            }
//                });
//                this.store.on("load", function(a){
//                    if (a.getAt(0) != null && a.getAt(0).data[obj.valueField] != '') {
//                        var r = new Ext.data.Record({});
//                        r.set(o.valueField, ''); //添加一格值为-1的选项
//                        r.set(o.displayField, '-=请先选择短彩类型=-');
//                        a.insert(0, r);
//                    }
//                });
//            }
        });
        
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "Js.Center.Business.ServiceInfo.servicecodeSelectPanel",
            height: 150,
            labelWidth: 100,
            needButtons: false,
            //查询调用的方法
            queryMethod: "Js.Center.Business.ServiceInfo.queryGrid",
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
                    items: [{
                        xtype: "textfield",
                        fieldLabel: '子号码',
                        name: 'vc2subcode',
                        id: 'Js.Center.Business.ServiceInfo.serviceinfovc2subcode',
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 50,
                        maxLengthText: '长度不能超过50！'
                    }, {
                        xtype: "combo",
                        name: "vc2servicetype",
                        fieldLabel: "短彩类型",
                        hiddenName: "Js.Center.Business.ServiceInfo.stype",
                        readOnly: true,
                        mode: "local",
                        displayField: "show",
                        valueField: "value",
                        triggerAction: "all",
                        emptyText: "-=请选择=-",
                       // value: '-1',
                        store: new Ext.data.SimpleStore({
                            fields: ["show", "value"],
                            data: [["-=请选择短彩类型=-", ""],["短信", "1"], ["彩信", "2"], ["wap", "3"]]    //, ["短信PV", "4"], ["彩信PV", "5"], ["wapPV", "6"]
                        }),
                        listeners: {
                            "select": function(){
                                Ext.getCmp('Js.Center.Business.ServiceInfo.numgwid_ext').setValue('');
                                Js.Center.Common.GatewayStore.Search.reload({
                                    params: {
                                        vc2servicetype: this.getValue(),
                                        serviceflag: 'selectbyservicetype'
                                    }
                                })
                                
                                
                            }
                            
                        }
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
                        xtype: "textfield",
                        fieldLabel: '通道组名称',
                        name: 'vc2name',
                        id: 'Js.Center.Business.ServiceInfo.serviceinfovc2name',
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 10,
                        maxLengthText: '长度不能超过10！'
                    }, gatewayCombo]
                }]
            }],
            buttons: [new Ext.Button({
                text: '查询',
                handler: function(){
                	Js.Center.Business.ServiceInfo.queryGrid();
                }
            }), new Ext.Button({
                text: '重置',
                handler: function(){
                    selectPanel.getForm().reset();
                    Js.Center.Common.GatewayStore.Search.removeAll();
                }
            })]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.Business.ServiceInfo.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var vc2name = Ext.get("Js.Center.Business.ServiceInfo.serviceinfovc2name").getValue();
                var vc2subcode = Ext.get("Js.Center.Business.ServiceInfo.serviceinfovc2subcode").getValue();
                var numgwid = Ext.get("Js.Center.Business.ServiceInfo.servicodegwid").getValue();
                var vc2servicetype = Ext.get("Js.Center.Business.ServiceInfo.stype").getValue();
                var flag = 'querychildrenservicecode';
                Js.Center.Business.ServiceInfo.Infostore.baseParams = {
                		numgwid: numgwid,
                		vc2subcode: vc2subcode,
                		vc2name: vc2name,
                		vc2servicetype: vc2servicetype,
                    flag: flag
                };
                Js.Center.Business.ServiceInfo.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.Business.ServiceInfo.ServicePanel = new Ext.Panel({
            id: "Js.Center.Business.ServiceInfo.servicepanel",
            frame: true, // 渲染面板
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, serviceGrid]
        });
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.Business.ServiceInfo.ServicePanel, "openroomiconinfo", "Js.Center.Business.ServiceInfo.Infostore");
};
