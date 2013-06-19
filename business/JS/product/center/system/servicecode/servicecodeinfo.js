Ext.namespace('Js.Center.Business.ServiceCode');

Js.Center.Business.ServiceCode.serviceCodeInfo = function(node){


    if (Ext.get("Js.Center.Business.ServiceCode.servicecodepanel") == null) {
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
        //==============================================================下拉列表数据定义
        Js.Center.Common.GatewayStore.Search.reload();
        Js.Center.Common.InstStore.reload(); //地区下拉列表
        var feeTypeStore = new Ext.data.SimpleStore({
            fields: ["vc2name", "value"],
            data: [["免费", "0"], ["按条", "1"], ["包月", "2"]]
        });
        
        // ======================================================================= 定义GridPanel相关
        // ===============================================分页每页显示数量
        
        var _pageSize = 12;
        // ===============================================指定列参数
        
        var fields = ["numsvcid", "vc2svc", "vc2svcname", "datstart", "datend", "numgwid", "vc2feevalue", "nummonthcnt", "vc2prodseq", "numstatflag", "vc2ischg", "vc2svctype", "vc2type", "vc2dsc", "vc2gatewayname", "vc2servicetype", "vc2longcode"];
        Js.Center.Business.ServiceCode.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.ServiceCodeURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numsvcid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'vc2svcname',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                vc2svcname: '',
                vc2svc: '',
                numgwid: '',
                vc2servicetype: '-1',
                flag: 'selectbykey'
            }
        });
        Js.Center.Business.ServiceCode.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize,
                vc2svcname: '',
                vc2svc: '',
                numgwid: '',
                flag: 'selectbykey'
            }
        });
        
        // ==================================================== 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numsvcid"
        });
        // ==================================================== 列头
        var cm = new Ext.grid.ColumnModel([sm, {
            header: "业务名称",
            tooltip: "业务名称",
            dataIndex: "vc2svcname",
            sortable: true
        }, {
            header: "业务代码",
            tooltip: "业务代码",
            dataIndex: "vc2svc",
            sortable: true
        }, {
            header: "计费类型",
            tooltip: "计费类型",
            dataIndex: "vc2type",
            sortable: true,
            renderer: function(value){
        		if (value == "0") {
        			return "免费";
        		}else if (value == "1") {
        			return "按条";
        		}else if(value == "2"){
        			return "包月";
        		}
            }
            
        }, {
            header: "短彩类型",
            tooltip: "短彩类型",
            dataIndex: "vc2servicetype",
            sortable: true,
            renderer: function(value){
                if (value == "1") {
                    return "短信";
                }else if (value == "2") {
                    return "彩信";
                }else if(value == "3"){
                	return "wap";
                }else if(value == "4"){
                	return "短信PV";
                }else if(value == "5"){
                	return "彩信PV";
                }else if(value == "6"){
                	return "wapPV";
                }
            }
        }, {
            header: "网关名称",
            tooltip: "网关名称",
            dataIndex: "vc2gatewayname",
            sortable: true
        }, {
            header: "服务代码",
            tooltip: "服务代码",
            dataIndex: "vc2longcode",
            sortable: true
        }, {
            header: "描述",
            tooltip: "描述",
            dataIndex: "vc2dsc",
            sortable: true
        }]);
        
        //==============================================================定义grid
        var serviceCodeGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            id: "Js.Center.Business.ServiceCode.servicecodeGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.Business.ServiceCode.Infostore,
            //但字段修改路径定义
            
            afterEditURL: Js.Center.Business.servicecodeUpdateURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.Business.ServiceCodeAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.Business.ServiceCodeUpdate',
            //删除调用方法名称
            deleteMethod: 'Js.Center.Business.ServiceCodedelete.func',
            sm: sm,
            cm: cm
        });
        
        
        //============================================随短彩类型变动而变======================网关列表
        var gatewayCombo = new WXTL.Widgets.CommonForm.ComboBox({
            xtype: "combo",
            name: "numgwid_ext",
            id: "Js.Center.Business.ServiceCode.numgwid_ext",
            fieldLabel: "网关名称",
            hiddenName: "Js.Center.Business.ServiceCode.servicodegwid",
            readOnly: true,
            mode: "local",
            displayField: "vc2gatewayname",
            valueField: "numgwid",
            triggerAction: "all",
            emptyText: '-=请先选择短彩类型=-',
            valueNotFoundText: '-=请先选择短彩类型=-',
            store: Js.Center.Common.GatewayStore.Search,
            initCancleText: function(o){ //自动添加一个空选择项
                var obj = this;
                o.on("select", function(){
                    //            if (o.getValue() == -1) { //当选择-1时，把值设置为空
                
                    //                o.setValue("");
                    //            }
                });
                this.store.on("datachanged", function(a){
                    if (a.getAt(0) != null && a.getAt(0).data[obj.valueField] != '') {
                        var r = new Ext.data.Record({});
                        r.set(o.valueField, ''); //添加一格值为-1的选项
                        r.set(o.displayField, '-=请先选择短彩类型=-');
                        a.insert(0, r);
                    }
                });
            }
        });
        
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "Js.Center.Business.ServiceCode.servicecodeSelectPanel",
            height: 150,
            labelWidth: 100,
            needButtons: false,
            //查询调用的方法
            queryMethod: "Js.Center.Business.ServiceCode.queryGrid",
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
                        fieldLabel: '业务名称',
                        name: 'vc2svcname',
                        id: 'Js.Center.Business.ServiceCode.servicecodeinfosvcname',
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 50,
                        maxLengthText: '长度不能超过50！'
                    }, {
                        xtype: "combo",
                        name: "vc2servicetype",
                        fieldLabel: "短彩类型",
                        hiddenName: "Js.Center.Business.ServiceCode.stype",
                        readOnly: true,
                        mode: "local",
                        displayField: "show",
                        valueField: "value",
                        triggerAction: "all",
                        emptyText: "-=请选择=-",
                       // value: '-1',
                        store: new Ext.data.SimpleStore({
                            fields: ["show", "value"],
                            data: [["-=请选择短彩类型=-", "-1"],["短信", "1"], ["彩信", "2"], ["wap", "3"]]    //, ["短信PV", "4"], ["彩信PV", "5"], ["wapPV", "6"]
                        }),
                        listeners: {
                            "select": function(){
                                Ext.getCmp('Js.Center.Business.ServiceCode.numgwid_ext').setValue('');
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
                        fieldLabel: '业务代码',
                        name: 'vc2svc',
                        id: 'Js.Center.Business.ServiceCode.servicecodeinfosvc',
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
                    Js.Center.Business.ServiceCode.queryGrid();
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
        Js.Center.Business.ServiceCode.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var serviceCodeName = Ext.get("Js.Center.Business.ServiceCode.servicecodeinfosvcname").getValue();
                var vc2svc = Ext.get("Js.Center.Business.ServiceCode.servicecodeinfosvc").getValue();
                var numgwid = Ext.get("Js.Center.Business.ServiceCode.servicodegwid").getValue();
                var stype = Ext.get("Js.Center.Business.ServiceCode.stype").getValue();
                var flag = 'selectbykey';
                Js.Center.Business.ServiceCode.Infostore.baseParams = {
                    vc2svcname: serviceCodeName,
                    vc2svc: vc2svc,
                    numgwid: numgwid,
                    vc2servicetype: stype,
                    flag: flag
                };
                Js.Center.Business.ServiceCode.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.Business.ServiceCode.ServiceCodePanel = new Ext.Panel({
            id: "Js.Center.Business.ServiceCode.servicecodepanel",
            frame: true, // 渲染面板
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, serviceCodeGrid]
        });
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.Business.ServiceCode.ServiceCodePanel, "openroomiconinfo", "Js.Center.Business.ServiceCode.Infostore");
};
