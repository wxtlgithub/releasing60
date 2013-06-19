
Ext.namespace('Js.Center.System.SpecialMobile');

Js.Center.System.SpecialMobile.info = function(node){
	Js.Center.Common.ServiceCodeStore.reload();
    if (Ext.get("Js.Center.System.SpecialMobile.SpecialMobilePanel") == null) {
        // ---------------------------------------------------- 定义GridPanel相关
        // 分页每页显示数量
        var _pageSize = 12;
        // 指定列参数
        var fields = ["vc2mobile", "numsvcid", "vc2svcname", "vc2desc", "createtime", "creator", "createorname"];
        Js.Center.System.SpecialMobile.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.System.SpecialMobileURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "vc2mobile",
                totalProperty: "totalCount"
            }),
            sortInfo: {
                field: 'createtime',
                direction: "DESC"
            },
            baseParams: {
                tlspecialmobile: '',
                serviceid: '',
                flag: 'selectbykey'
            }
        });
        Js.Center.System.SpecialMobile.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize,
                tlspecialmobile: '',
                serviceid: '',
                flag: 'selectbykey'
            }
        });
        
        
        // -------------------------------------------------- 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "vc2mobile"
        });
        // -------------------------------------------------- 列头
        var cm = new Ext.grid.ColumnModel([sm, {
            header: "手机号码",
            tooltip: "手机号码",
            dataIndex: "vc2mobile",
            sortable: true
        },{
            header: "通道名称",
            tooltip: "通道名称",
            dataIndex: "vc2svcname",
            sortable: true
        },  {
            header: "创建时间",
            tooltip: "创建时间",
            dataIndex: "createtime",
            sortable: true
        }, {
            header: "创建者",
            tooltip: "创建者",
            dataIndex: "creator",
            sortable: true
        }]);
        
        // ---------------------------------------------------- 定义grid
        var specialMobileGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '100% 100%',
            pageSize: _pageSize,
            needMenu: false,
            store: Js.Center.System.SpecialMobile.Infostore,
            //但字段修改路径定义
            afterEditURL: Js.Center.System.SpecialMobileUpdateURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.System.SpecialMobileAdd',
            //删除调用方法名称
            deleteMethod: 'Js.Center.System.SpecialMobileDelete.func',
            autoScroll: true,
            sm: sm,
            cm: cm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "添加",
                    //handler: roleAdd
                    handler: function(){
                        specialMobileGrid.doInsert();
                    }
                }, "", "-", "", {
                    text: "删除",
                    //tooltip: "删除",
                    iconCls: "deleteicon",
                    //handler: roleDelete
                    handler: function(){
                        specialMobileGrid.doDelete();
                    }
                }]
            })
        });
        
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            height: 110,
            queryMethod: "Js.Center.System.SpecialMobile.queryGrid",
            items: [{
                layout: 'column',
                items: [{
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:10px 0 10px 15px",
                    items: [{
                        xtype: "textfield",
                        fieldLabel: '手机号码',
                        name: 'vc2name',
                        id: 'Js.Center.System.SpecialMobile.Mobile',
                        regex: WXTL.Common.regex.Mobile,
                        regexText: '请输入正确的手机号码'
                    
                    }]
                }, {
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:10px 0 10px 15px",
                    items: [{
                        xtype: "xComboBox",
                        name: "numsvcid",
                        fieldLabel: "通道",
                        hiddenName: "Js.Center.System.SpecialMobile.NumSvcid",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2svcname",
                        valueField: "numsvcid",
                        triggerAction: "all",
                        emptyText: '-=请选择=-',
                        store: Js.Center.Common.ServiceCodeStore
                    }]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.System.SpecialMobile.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var _mobile = Ext.get("Js.Center.System.SpecialMobile.Mobile").getValue();
                var _svcid = Ext.get("Js.Center.System.SpecialMobile.NumSvcid").getValue();
                var _flag = 'selectbykey';
                Js.Center.System.SpecialMobile.Infostore.baseParams = {
                    tlspecialmobile: _mobile,
                    serviceid: _svcid,
                    flag: _flag
                };
                Js.Center.System.SpecialMobile.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        //============================================================================定义主panel
        Js.Center.System.SpecialMobile.SpecialMobilePanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.System.SpecialMobile.SpecialMobilePanel",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, specialMobileGrid]
        });
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.System.SpecialMobile.SpecialMobilePanel, "openroomiconinfo", "Js.Center.System.SpecialMobile.Infostore");
    
    
};
