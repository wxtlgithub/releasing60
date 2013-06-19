/**
 * 通道组管理页
 *
 */
Ext.namespace('Js.Center.Business.Product');

Js.Center.Business.Product.productinfo = function(node){
    
    if (Ext.get("Js.Center.Business.Product.ProductPanel") == null) {
        //========================================================================下拉列表数据定义
        //Js.Center.Common.UserStore.load();
        
        // ====================================================================== 定义添加、删除、修改、授权方法
        
        // =====================授权方法
        permission = function(){
            var row = productGrid.getSelectionModel().getSelections();
            if (row.length == 0) {
                Ext.Msg.alert("提示信息", "您没有选中任何行!");
            }
            else 
                if (row.length > 1) {
                    Ext.Msg.alert("提示信息", "对不起只能选择一个!");
                }
                else 
                    if (row.length == 1) {
						
						
						//Js.Center.Business.ProductPermitsvc.window.updateRecord=row[0];
						//Js.Center.Business.ProductPermitsvc.window.mainForm.loadRecord(row[0]);
						//Js.Center.Business.ProductPermitsvc.window.show();
						Js.Center.Business.productpolicy.window.updateRecord=row[0];
						Js.Center.Business.productpolicy.window.mainForm.loadRecord(row[0]);
						Js.Center.Business.productpolicy.window.show();
                    }
        };
        // =====================路由生效
        doPermission = function(){
            var row = productGrid.getSelectionModel().getSelections();
            if (row.length == 0) {
                Ext.Msg.alert("提示信息", "您没有选中任何行!");
            }
            else 
                if (row.length > 1) {
                    Ext.Msg.alert("提示信息", "对不起只能选择一个!");
                }
                else 
                    if (row.length == 1) {
                        Js.Center.Business.ProductPermitsvc.func(row[0]);
                    }
        };
        // ========================================================================= 定义GridPanel相关
        // 分页每页显示数量
        //var pageSize = 12;
        var _pageSize = 12;
        // 指定列参数
        var fields = ["numprodid", "numsvcid", "numbusiid", "numcaid", "vc2prodid", "vc2name", "vc2dsc", "vc2validflag", "datstart", "datend", "numlevel", "vc2type", "numtprodid", "numsrc", "numsrcid", "numstatflag", "numchnid", "numcomflg", "numbwflg", "vc2servcode", "numpriflag", "vc2showname", "numcpid", "vc2sendtype", "numprange", "numuserid", "vc2username", "datcreattime","vc2servicetype"];
        Js.Center.Business.Product.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.ProductURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numprodid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'datcreattime',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                productname: '',
                adduserid: '',
				vc2servicetype: '-1',
                flag: 'selectbykey'
            }
        });
        Js.Center.Business.Product.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize,
                productname: '',
                adduserid: '',
				vc2servicetype: '-1',
                flag: 'selectbykey'
            }
        });
        
        // ============================================================= 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numprodid"
        });
        // ================================================================= 列头
        var cm = new Ext.grid.ColumnModel([sm, {
            header: "通道组序号",
            tooltip: "通道组序号",
            dataIndex: "numprodid",
            sortable: true
        }, {
            header: "通道组名称",
            tooltip: "通道组名称",
            dataIndex: "vc2name",
            sortable: true
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
        },{
            header: "创建日期",
            tooltip: "创建日期",
            dataIndex: "datcreattime",
            sortable: true
        }, {
            header: "创建人",
            tooltip: "创建人",
            dataIndex: "vc2username",
            sortable: true
        }, {
            header: "通道组描述",
            tooltip: "通道组描述",
            dataIndex: "vc2dsc"
        }]);
        
        //==============================================================定义grid
		var arrInitLoadFunc = new Array();
		arrInitLoadFunc[0] = "Js.Center.Business.ProductPermitsvc.func";
		arrInitLoadFunc[1] = "Js.Center.Business.productpolicy.func";
		arrInitLoadFunc[2] = "Js.Center.Business.Product.ppmainbackupAdd.func";
		arrInitLoadFunc[3] = "Js.Center.Business.Product.ppmainbackupUpdate.func";
		arrInitLoadFunc[4] = "Js.Center.Business.Product.ppbalanceAdd.func";
	
        var productGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            //id: "productGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            needMenu: false,
            store: Js.Center.Business.Product.Infostore,
            //但字段修改路径定义
            afterEditURL: Js.Center.Business.ProductUpdateURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.Business.ProductAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.Business.ProductUpdate',
            //删除调用方法名称
            deleteMethod: 'Js.Center.Business.ProductDelete.func',
			//其他需要预加载函数
			otherInitLoadFunc:arrInitLoadFunc,//'Js.Center.Business.ProductPermitsvc.func',
            sm: sm,
            cm: cm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "添加",
                    //handler: roleAdd
					handler: function(){
						productGrid.doInsert();
						//Js.Center.Business.ProductAdd.window.show();
						//Js.Center.Business.ProductAdd.window.show();
					}
                }, "", "-", "", {
                    text: "修改",
                    //tooltip: "修改",
                    iconCls: "editicon",
                    //handler: roleUpdate
					handler: function(){
						productGrid.doEdit();
					}
                }, "", "-", "", {
                    text: "删除",
                    //tooltip: "删除",
                    iconCls: "deleteicon",
                    //handler: roleDelete
					handler: function(){
						productGrid.doDelete();
					}
                }, "", "-", "", {
                    text: "配置路由",
                    //tooltip: "配置路由",
                    iconCls: "addicon",
                    handler: permission
//                }, "", "-", "", {
//                    text: "路由生效",
//                    //tooltip: "配置路由",
//                    iconCls: "addicon",
//                    handler: doPermission
            }]
            })
            //        listeners: {
            //            "rowcontextmenu": function(grid, rowIndex, e){
            //                e.stopEvent();
            //                openRightClick.showAt(e.getXY());
            //            }
            //        }
        });
        
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "productSelectPanel",
            height:110,
            //查询调用的方法
            queryMethod: "Js.Center.Business.Product.queryGrid",
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
                        fieldLabel: '通道组名称',
                        name: 'vc2name',
                        id: 'prodinfovc2name',
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 10

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
                        xtype: "hidden",
                        name: "numuserid",
                        //id: "prodinfouserid",
                        fieldLabel: "操作人",
                        hiddenName: "prodinfouserid",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2username",
                        valueField: "numuserid",
                        triggerAction: "all",
                        emptyText: '-=请选择=-',
                        store: Js.Center.Common.UserStore
                    },{
                       xtype: "combo",
                        name: "vc2servicetype",
                        fieldLabel: "短彩类型",
                        hiddenName: "stype",
                        readOnly: true,
                        mode: "local",
                        displayField: "show",
                        valueField: "value",
                        triggerAction: "all",
                        emptyText: "-=请选择短彩类型=-",
                        store: new Ext.data.SimpleStore({
                            fields: ["show", "value"],
                            data: [["-=请选择短彩类型=-", "-1"], ["短信", "1"], ["彩信", "2"], ["wap", "3"]]  //, ["短信PV", "4"], ["彩信PV", "5"], ["wapPV", "6"]
                        })
                    }
					]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.Business.Product.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var _productname = Ext.get("prodinfovc2name").getValue();
                //var _adduser = Ext.get("prodinfouserid").getValue();
                var stype=Ext.get("stype").getValue();
                var flag = 'selectbykey';
                Js.Center.Business.Product.Infostore.baseParams = {
                    productname: _productname,
                    adduserid: '',//_adduser,
                    vc2servicetype:stype,
                    flag: flag
                };
                Js.Center.Business.Product.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.Business.Product.ProductPanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.Business.Product.ProductPanel",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, productGrid]
        });
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.Business.Product.ProductPanel, "openroomiconinfo","Js.Center.Business.Product.Infostore");


};

