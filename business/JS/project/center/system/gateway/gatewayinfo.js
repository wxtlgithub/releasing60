Ext.namespace('Js.Center.Business.Gateway');

Js.Center.Business.Gateway.gatewayinfo = function(node){
	Js.Center.Common.GatewayTypeStore.reload();
    if (Ext.get("Js.Center.Business.Gateway.gatewaypanel") == null) {
        //======================================下拉列表
        Js.Center.Common.OperatorStore.reload();
        Js.Center.Common.InstStore.reload();
        var gwtypestore = new Ext.data.SimpleStore({
            fields: ["vc2name", "value"],
            data: [["-=请选择=-", ""],["短信", "1"], ["彩信", "2"], ["WAP", "3"], ["短信PV", "4"], ["彩信PV", "5"], ["wapPV", "6"]]
        });
        // ======================================================================= 定义GridPanel相关
         gatewaySet = function(rowIndex){
        	var row = Js.Center.Business.Gateway.Infostore.getAt(rowIndex);
        	Js.Center.Business.GatewaySet.func(row);
        };
        // ===============================================分页每页显示数量
        //var pageSize = 12;
        var _pageSize = 12;
        // ===============================================指定列参数
        
        var fields = [
        "numgwid",           	
        "vc2gatewayname",		
        "vc2type",    			
        "numopid","vc2opname",  
        "vc2gwip",    		
        "vc2gwport",  	
        "vc2moip",			
        "vc2moport",		
        "vc2spid",    	
        "vc2spnum",   		
        "vc2gwusername",
        "vc2gwpassword",	
        "numgroupmembermax",	
        "vc2speed",	
        "numgwtypeid","vc2gwtypename",
        "numinstid", "vc2instname","datinput","numbusarea","numbw",
        "numext","numblackflag","numlongflag","numpftype","vc2oapic",
        "numarea","numshare","numstatus","vc2level","numgrouplimit"];
        Js.Center.Business.Gateway.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.GatewayURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numgwid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'numgwid',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
            	 limit: _pageSize,
                 gatewayname: '',
                 numopid: '',
                 type:'',
                 gatewayNumber:'',
                flag: 'selectbykey'
            }
        });
        Js.Center.Business.Gateway.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize,
                gatewayname: '',
                numopid: '',
                type:'',
                gatewayNumber:'',
                flag: 'selectbykey'
            }
        });
        
        // ==================================================== 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numgwid"
        });
        // ==================================================== 列头
        var cm = new Ext.grid.ColumnModel([sm, {
            header: "网关编号",
            tooltip: "网关编号",
            dataIndex: "numgwid",
            sortable: true
        }, {
            header: "网关名称",
            tooltip: "网关名称",
            dataIndex: "vc2gatewayname",
            sortable: true
        }, {
            header: "运营商",
            tooltip: "运营商",
            dataIndex: "vc2opname",
            sortable: true
        }, {
            header: "覆盖范围",
            tooltip: "覆盖范围",
            dataIndex: "vc2instname",
            sortable: true
        }, {
            header: "服务号码",
            tooltip: "服务号码",
            dataIndex: "vc2spnum",
            sortable: true
        }, {
            header: "网关类型",
            tooltip: "网关类型",
            dataIndex: "vc2type",
            sortable: true,
            renderer: function(value){
                if (value == 1) {
                    return "短信";
                }
                if (value == 2) {
                    return "彩信";
                }
                if (value == 3) {
                    return "WAP";
                }
                if (value == 4) {
                    return "短信PV";
                }
                if (value == 5) {
                    return "彩信PV";
                }
                else 
                    if (value == 6) {
                        return "wapPV";
                    }
            }
        },{
            header: "协议类型",
            tooltip: "协议类型",
            dataIndex: "vc2gwtypename",
            sortable: true
        }, {
            header: "网关地址IP",
            tooltip: "网关地址IP",
            dataIndex: "vc2gwip",
            sortable: true
        },{
			header:"网关端口",
			tooltip:"网关端口",
			dataIndex:"vc2gwport"
		},{
			header:"网关MO地址",
			tooltip:"网关MO地址",
			dataIndex:"vc2moip"
		},{
			header:"MO端口",
			tooltip:"MO端口",
			dataIndex:"vc2moport"
		},{
			header:"登录用户",
			tooltip:"登录用户",
			dataIndex:"vc2gwusername"
		},{
			header:"登录密码",
			tooltip:"登录密码",
			dataIndex:"vc2gwpassword"
		},{
			header:"批次手机号码数量",
			tooltip:"批次手机号码数量",
			dataIndex:"numgroupmembermax"
		},{
			header:"流速控制",
			tooltip:"流速控制",
			dataIndex:"vc2speed"
		}, {
            header: "状态",
            tooltip: "状态",
            dataIndex: "numstatus",
            sortable: true,
            renderer: function(value){
                if (value == 1) {
                    return "启用";
                }
                if (value == 0) {
                    return "禁用";
                }
            }
        },{
            header: "操作",
            tooltip: "操作",
            dataIndex: "filename",
            renderer: function(value, meta, record, rowIndex, colIndex, store){
            	
                return "<a href='#' onclick='gatewaySet("+ rowIndex +")'>配置</a>";
            }
        }]);
        
        //==============================================================定义grid
        var gatewayGrid = new WXTL.Widgets.CommonGrid.GridPanel({
        	needMenu:false ,
            id: "gatewayGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.Business.Gateway.Infostore,
            //但字段修改路径定义
            
            afterEditURL: Js.Center.Business.GatewayUpdateURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.Business.GatewayAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.Business.GatewayUpdate',
            //删除调用方法名称
            deleteMethod: 'Js.Center.Business.GatewayDelete.func',
            sm: sm,
            cm: cm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "添加",
                    //handler: roleAdd
					handler: function(){
						gatewayGrid.doInsert();
					}
                }, "", "-", "", {
                    text: "修改",
                    //tooltip: "修改",
                    iconCls: "editicon",
                    //handler: roleUpdate
					handler: function(){
						gatewayGrid.doEdit();
					}
                }, "", "-", "", {
                    text: "删除",
                    //tooltip: "删除",
                    iconCls: "deleteicon",
                    //handler: roleDelete
					handler: function(){
						gatewayGrid.doDelete();
					}
                }, "", "-", "", {
                    iconCls: 'exporticon',
                    text: "导出",
                    handler: function(){
                    	exportData(Js.Center.Business.GatewayURL, "flag=loaddata&start=0&limit=500&gatewayname=" + Ext.get("gatewayinfogwname").getValue() + "&numopid=" + Ext.get("gatawayinfonumopid").getValue() + "&type=" + Ext.get("Js.Center.Business.Gateway.smsmmstype").getValue() + "&gatewayNumber=" + Ext.get("Js.Center.Business.Gateway.gatewayNumber").getValue());
                    }
                }]
            })
        });
        
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "gatewaySelectPanel",
            //查询调用的方法
            
            queryMethod: "Js.Center.Business.Gateway.queryGrid",
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
                        xtype: "xComboBox",
                        name: "vc2name",
                        //id: "gatawayinfonumopid",
                        fieldLabel: "运营商",
                        hiddenName: "gatawayinfonumopid",
                        readOnly: true,
                        mode: "local",
                        displayField: 'vc2name',
                        valueField: 'numopid',
                        triggerAction: "all",
                        emptyText: '-=请选择=-',
                        store: Js.Center.Common.OperatorStore
                    },{
                        xtype: "textfield",
                        name: "vc2gatewayname",
                        id: "gatewayinfogwname",
                        fieldLabel: "网关名称",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 50
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
                    items: [
                    	{
			                xtype: "xComboBox",
			                name: "Js.Center.Business.Gateway.smsmmstype",
			                fieldLabel: "短彩类型",
			                hiddenName: "Js.Center.Business.Gateway.smsmmstype",
			                readOnly: true,
			                mode: "local",
			                displayField: "vc2name",
			                valueField: "value",
			                triggerAction: "all",
			                emptyText: "-=请选择=-",
			                store: gwtypestore
			            },{
                        xtype: "textfield",
                        name: "gatewayNumber",
                        id: "Js.Center.Business.Gateway.gatewayNumber",
                        fieldLabel: "网关号码",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 50
                    }]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.Business.Gateway.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var _gatewayname = Ext.get("gatewayinfogwname").getValue();
                var _operatorid = Ext.get("gatawayinfonumopid").getValue();
                var _type = Ext.get("Js.Center.Business.Gateway.smsmmstype").getValue();
                var _gatewayNumber = Ext.get("Js.Center.Business.Gateway.gatewayNumber").getValue();
                var flag = 'selectbykey';
                Js.Center.Business.Gateway.Infostore.baseParams = {
                    gatewayname: _gatewayname,
                    numopid: _operatorid,
                    type:_type,
                    gatewayNumber:_gatewayNumber,
                    flag: flag
                };
                Js.Center.Business.Gateway.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.Business.Gateway.GatewayPanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.Business.Gateway.gatewaypanel",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, gatewayGrid]
        });
    };
	//if(Js.Center.Common.timeInterval==null)
		//Js.Center.Common.timeInterval= setInterval("Js.Center.Business.Gateway.Infostore.reload()",3000);
    //============================================================================绑定到center
    GridMain(node, Js.Center.Business.Gateway.GatewayPanel, "openroomiconinfo", "Js.Center.Business.Gateway.Infostore");
};

