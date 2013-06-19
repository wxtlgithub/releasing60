/**
 * @author Administrator
 *   路由策略添加
 */
Ext.namespace('Js.Center.Business.productpolicy');

Js.Center.Business.productpolicy.func = function(row){
    if (Js.Center.Business.productpolicy.window == null) {
        //==============================================================为产品已指定的通道下拉列表数据定义
        var producyPermitsvcStore = new Ext.data.Store({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.ServiceCodeURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ['numsvcid', 'vc2svcname'],
                root: 'data',
                id: 'numsvcid'
            }),
            baseParams: {
                flag: 'selectpermitbypid',
                columnlist: 'numsvcid,vc2svcname'
            }
        });
        //==============================================================为产品未指定的通道下拉列表数据定义
        var producynoPermitsvcStore = new Ext.data.Store({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.ServiceCodeURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ['numsvcid', 'vc2svcname'],
                root: 'data',
                id: 'numsvcid'
            }),
            baseParams: {
                flag: 'selectnopermitbypid',
                columnlist: 'numsvcid,vc2svcname'
            }
        });
        Js.Center.Business.productpolicy.Productspolicy = new Ext.Panel({
            frame: true,
            bodyStyle: 'padding:10px,0px,0px,10px',
            autoScroll: true,// 自动显示滚动条
            labelWidth: 60,
            //height: 150,
            items: [{
                anchor: ',100%',
                xtype: "itemselector",
                id: "Js.Center.Business.productpolicy.Productspolicyasproductids",
                name: "itemselector",
                fieldLabel: "配置路由",
                dataFields: ["numsvcid", "vc2svcname"],
                toData: [""],
                msWidth: 310,
                autoScroll: true,
                enableDD: false,
                msHeight: 270,
                valueField: 'numsvcid',
                displayField: 'vc2svcname',
                //imagePath: "jspack/product/common/Images/",
                toLegend: "已使用的通道",
                fromLegend: "待选择的通道",
                fromStore: producynoPermitsvcStore,
                toStore: producyPermitsvcStore,
                listeners: {
                    "change": function(){
                        // southPanel.collapse(true);
                    }
                }
            }]
        });
        
        //===主备策略=====start===========================================
        var _MainBackuppageSize = 8;
        // ===============================================指定列参数
        var MainBackupfields = ["numstraid", "numprodid", "vc2name", "numsvcid", "vc2svcname", "numassvcid", "vc2assvcname"];
        Js.Center.Business.productpolicy.MainBackupInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.RoutestraURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: MainBackupfields,
                root: "data",
                id: "numstraid",
                totalProperty: "totalCount"
            }),
            sortInfo: {
                field: 'numstraid',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                flag: 'selectbyrotestraas'
                //numprodid:Js.Center.Business.productpolicy.window.updateRecord.get("numprodid")
            }
        });
        // ==================================================== 列选择模式
        var MainBackupsm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numstraid"
        });
        // ==================================================== 列头
        var MainBackupcm = new Ext.grid.ColumnModel([MainBackupsm, {
            header: "主备策略编号",
            tooltip: "主备策略编号",
            dataIndex: "numstraid",
            sortable: true
        }, {
            header: "通道组id",
            tooltip: "通道组id",
            hidden: true,
            dataIndex: "numprodid",
            sortable: true
        }, {
            header: "通道组",
            tooltip: "通道组",
            dataIndex: "vc2name",
            sortable: true
        }, {
            header: "主通道id",
            tooltip: "主通道id",
            dataIndex: "numsvcid",
            hidden: true,
            sortable: true
        }, {
            header: "主通道",
            tooltip: "主通道",
            dataIndex: "vc2svcname",
            sortable: true
        }, {
            header: "备通道",
            tooltip: "备通道",
            dataIndex: "vc2assvcname",
            sortable: true
        }, {
            header: "备通道id",
            tooltip: "备通道id",
            hidden: true,
            dataIndex: "numassvcid",
            sortable: true
        }]);
        
        //==============================================================定义grid
        var MainBackupGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            title: '主备策略列表',
            frame: true,
            anchor: '97% 100%',
            needPage:false,
            //pageSize: _MainBackuppageSize,
            store: Js.Center.Business.productpolicy.MainBackupInfostore,
            //但字段修改路径定义
            afterEditURL: Js.Center.Business.RoutestraURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.Business.Product.ppmainbackupAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.Business.Product.ppmainbackupUpdate',
            //删除调用方法名称
            deleteMethod: 'Js.Center.Business.Product.ppmainbackupDelete.func',
            sm: MainBackupsm,
            cm: MainBackupcm
        });
        //============================================================================定义主panel
        Js.Center.Business.productpolicy.MainBackupqueryPanel = new Ext.Panel({
            frame: true, // 渲染面板
            //id: "Js.Center.Business.Gateway.gatewaypanel",
            bodyBorder: false,
            border: false,
            height:300,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [MainBackupGrid]
        });
        //===主备策略=====end============================================
        
        //===均衡策略=====start===========================================
        var _BalancedpageSize = 12;
        // ===============================================指定列参数
        var Balancedfields = ["numstraid", "numprodid", "vc2name", "numsvcids", "vc2svcnames"];
        Js.Center.Business.productpolicy.BalancedInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.RoutestraURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: Balancedfields,
                root: "data",
                id: "numstraid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'numstraid',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                flag: 'selectbyrotestrabalance'
                //numprodid:Js.Center.Business.productpolicy.window.updateRecord.get("numprodid")
            }
        });
        // ==================================================== 列选择模式
        var Balancedsm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numstraid"
        });
        // ==================================================== 列头
        var Balancedcm = new Ext.grid.ColumnModel([Balancedsm, {
            header: "均衡策略编号",
            tooltip: "均衡策略编号",
            dataIndex: "numstraid",
            sortable: true
        }, {
            header: "通道组id",
            tooltip: "通道组id",
            dataIndex: "numprodid",
            sortable: true,
            hidden: true
        }, {
            header: "通道组",
            tooltip: "通道组",
            dataIndex: "vc2name",
            sortable: true
        }, {
            header: "通道集合id",
            tooltip: "通道集合id",
            dataIndex: "numsvcids",
            hidden: true,
            sortable: true
        
        }, {
            header: "通道集合",
            tooltip: "通道集合",
            dataIndex: "vc2svcnames",
            renderer: function(value){
            	return "<font qtip='" + value + "'>" + value + "</font>";
        	},
            sortable: true
        
        }]);
        
        //==============================================================定义grid
        var BalancedGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            //id: "BalancedGridPanel",
            title: '均衡策略列表',
            frame: true,
            anchor: '97% 100%',
            needPage:false,
            //pageSize: _BalancedpageSize,
            store: Js.Center.Business.productpolicy.BalancedInfostore,
            //但字段修改路径定义
            
            afterEditURL: Js.Center.Business.RoutestraURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.Business.Product.ppbalanceAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.Business.Product.ppbalanceUpdate',
            //删除调用方法名称
            deleteMethod: 'Js.Center.Business.Product.ppbalanceDelete.func',
            sm: Balancedsm,
            cm: Balancedcm
        });
        
        //============================================================================定义主panel
        Js.Center.Business.productpolicy.BalancedqueryPanel = new Ext.Panel({
            frame: true, // 渲染面板
            //id: "Js.Center.Business.Balanced.gatewaypanel",
            height:300,
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [BalancedGrid]
        });
        //===均衡策略=====end============================================
        
        //==========================================================================定义FormPanel
        var permissionTablePanl = new Ext.form.FormPanel({
            frame: true,
            autoScroll: true, // 自动显示滚动条
            padding: '10 10 10 10',
            items: [{
                xtype: "hidden",
                name: "numprodid",
                id: "Js.Center.Business.productpolicy.propermitsvcnumprodid",
                fieldLabel: "通道组id"
            }, {
                xtype: "hidden",
                name: "oldnumtypeid",
                id: "Js.Center.Business.productpolicy.numtypeid",
                fieldLabel: "策略类别编号"
            }, {
                columnWidth: 1,
                items: [{
                    layout: 'column',
                    bodyStyle: "padding:0px 0 0px 10px",
                    items: [{
                        columnWidth: .5,
                        layout: 'form',//锚点布局-
                        defaults: {
                            anchor: "92%",
                            msgTarget: "side"
                        },
                        buttonAlign: "center",
                        //bodyStyle: "padding:0px 0 0px 15px",
                        items: [{
                            xtype: "textfield",
                            name: "vc2name",
                            readOnly: true,
                            fieldLabel: "通道组名称"
                        }]
                    }, {
                        columnWidth: .5,
                        layout: 'form',
                        buttonAlign: "left",
                        items: [{
                        
                            xtype: "radiogroup",
                            id: "Js.Center.Receipt.ReceiptManage.ReceiptManageAdd.ALLBatchcheck",
                            fieldLabel: "<font color=red>策略类型</font>",
                            allowBlank: true,
                            horizontal: true,
                            defaultValue: 'true',
                            value: '1',
                            items: [{
                                boxLabel: '基本策略',
                                name: "numtypeid",
                                inputValue: '1',
                                checked: true,
                                listeners: {
                                    "check": function(checkbox, checked){
                                        if (checked) {
                                            Js.Center.Business.productpolicy.Productspolicy.show();
                                            Js.Center.Business.productpolicy.MainBackupqueryPanel.hide();
                                            Js.Center.Business.productpolicy.BalancedqueryPanel.hide();
                                            //Ext.getCmp("Js.Center.Business.productpolicy.as").hide();
                                            //Ext.getCmp("Js.Center.Business.productpolicy.balance").hide();
                                            Js.Center.Business.productpolicy.window.buttons[0].show();
                                        }
                                    }
                                }
                            }, {
                                boxLabel: '主备策略',
                                name: "numtypeid",
                                inputValue: '2',
                                listeners: {
                                    "check": function(checkbox, checked){
                                        if (checked) {
                                            Js.Center.Business.productpolicy.Productspolicy.hide();
                                            Js.Center.Business.productpolicy.MainBackupqueryPanel.show();
                                            Js.Center.Business.productpolicy.BalancedqueryPanel.hide();
                                            Js.Center.Business.productpolicy.window.buttons[0].hide();
                                        }
                                    }
                                }
                            }, {
                                boxLabel: '均衡策略',
                                name: "numtypeid",
                                inputValue: '3',
                                listeners: {
                                    "check": function(checkbox, checked){
                                        if (checked) {
                                            Js.Center.Business.productpolicy.Productspolicy.hide();
                                            Js.Center.Business.productpolicy.MainBackupqueryPanel.hide();
                                            Js.Center.Business.productpolicy.BalancedqueryPanel.show();
                                            Js.Center.Business.productpolicy.window.buttons[0].hide();
                                        }
                                    }
                                }
                            }]
                        }]
                    }]
                }]
            }, Js.Center.Business.productpolicy.Productspolicy, Js.Center.Business.productpolicy.MainBackupqueryPanel, Js.Center.Business.productpolicy.BalancedqueryPanel]
        });
        //========================================================================定义窗体
        var mainForm = permissionTablePanl.getForm();
        
        this.window = new WXTL.Widgets.CommonWindows.Window({
            title: "配置路由",
            mainForm: mainForm,
            width: 700,
            height: 400,
            displayStore: Js.Center.Business.Product.Infostore,
            updateState: true,
            updateRecord: row,
            needButtons: false,
            needLoadDataStore: true,
            items: [permissionTablePanl],
            buttons: [{
                text: '保存',
                handler: function(){
                    // 弹出效果
                    Ext.MessageBox.show({
                        msg: '正在保存，请稍等...',
                        progressText: 'Saving...',
                        width: 300,
                        wait: true,
                        waitConfig: {
                            interval: 200
                        },
                        icon: 'download',
                        animEl: 'saving'
                    });
                    
                    var ids = "";
                    var tostorelength = Js.Center.Business.productpolicy.Productspolicy.items.items[0].toStore.data.length;
                    var tostroedata = Js.Center.Business.productpolicy.Productspolicy.items.items[0].toStore.data;
                    
                    for (var i = 0; i < tostorelength; i++) {
                        if (tostorelength == 1) {
                            ids = tostroedata.items[i].id;
                        }
                        else {
                        
                            if (i < (tostorelength - 1)) {
                                ids = tostroedata.items[i].id + "," + ids;
                            }
                            if (i == (tostorelength - 1)) {
                                ids = ids + tostroedata.items[i].id;
                            }
                        }
                    };
                    UpdateProcSvcPermission(ids, Js.Center.Business.productpolicy.window.updateRecord.get("numprodid"));
                    // UpdateProcSvcPermission(WXTL.Common.urlDecode(permissionTablePanl.getForm().getValues(true)).replace('itemselector=', ''), Js.Center.Business.productpolicy.window.updateRecord.get("numprodid"));
                }
            }, {
                text: "取 消",
                minWidth: 70,
                handler: function(){
                    Js.Center.Business.productpolicy.window.hide();
                }
            }],
            listeners: {
                "show": function(){
                    Js.Center.Business.productpolicy.window.buttons[0].show();
                    Ext.get("Js.Center.Business.productpolicy.propermitsvcnumprodid").getValue(Js.Center.Business.productpolicy.window.updateRecord.get("numprodid"));
                    //未授权通道数据源
                    producynoPermitsvcStore.baseParams = {
                        flag: 'selectnopermitbypid',
                        productid: Js.Center.Business.productpolicy.window.updateRecord.get("numprodid")
                    };
                    producynoPermitsvcStore.reload({
                        params: {
                            flag: 'selectnopermitbypid',
                            columnlist: 'numsvcid,vc2svcname'
                        }
                    });
                  //已授权通道数据源
                    producyPermitsvcStore.baseParams = {
                        flag: 'selectpermitbypid',
                        productid: Js.Center.Business.productpolicy.window.updateRecord.get("numprodid")
                    };
                    producyPermitsvcStore.reload({
                        params: {
                            flag: 'selectpermitbypid',
                            columnlist: 'numsvcid,vc2svcname'
                        }
                    });
                    //=-======================均衡策略列表===============
                    Js.Center.Business.productpolicy.BalancedInfostore.baseParams = {
                        numprodid: Js.Center.Business.productpolicy.window.updateRecord.get("numprodid"),
                        flag: 'selectbyrotestrabalance'
                    };
                    Js.Center.Business.productpolicy.BalancedInfostore.load({
                        params: {
                            start: 0,
                            limit: _BalancedpageSize
                        }
                    });
                  //=-======================主备策略列表===============
                    Js.Center.Business.productpolicy.MainBackupInfostore.baseParams = {
                        numprodid: Js.Center.Business.productpolicy.window.updateRecord.get("numprodid"),
                        flag: 'selectbyrotestraas'
                    };
                    Js.Center.Business.productpolicy.MainBackupInfostore.load({
                        params: {
                            start: 0,
                            limit: _MainBackuppageSize
                        
                        }
                    });
                    Js.Center.Business.productpolicy.Productspolicy.show();
                    Js.Center.Business.productpolicy.MainBackupqueryPanel.hide();
                    Js.Center.Business.productpolicy.BalancedqueryPanel.hide();
                    Js.Center.Common.ServiceCodeStore.reload();
                    
                    
                },
                "beforeshow": function(){
                
                }
            },
            loadDataStoreFunc: function(){
            
            }
        });
    }
    //=====================================================修改权限方法
    function UpdateProcSvcPermission(idlist, numprodid){
    
        var params = {
            flag: 'addrotestarbase',
            ids: idlist,
            numprodid: numprodid,
            numtypeid: 1
        };
        Js.Center.Business.productpolicy.window.mainFormSubmitFunc('', params, Js.Center.Business.RoutestraURL);
    };
};


