Ext.namespace('Js.Center.Business.Program');

Js.Center.Business.Program.ProgramInfo = function(node){
    
    if (Ext.get("Js.Center.Business.Program.MainPanel") == null) {
		Js.Center.Common.LinkProtocolStore.reload();
        //============================================================================定义GridPanel相关
        // 分页每页显示数量
        var _pageSize = 12;
       
        
        //==============================================================Grid数据定义

        var fields = ["numclientid", "numlinkprotocolid","vc2linkprotocolname","vc2clientname","numdepartid","vc2departname","vc2username", "vc2password", "vc2clientip", "vc2sublongcode", "nummaxsendspeed", "numclientlevel", "numreturnlevel","moduleid","protocoltype"];
        Js.Center.Business.Program.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.ProgramQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numclientid",
                totalProperty: "totalCount"
            
            }),
            baseParams: {
            	vc2username: "",
            	flag: 'selectbykey'
            }
        });
        Js.Center.Business.Program.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize
               
            }
        });
        
        //==============================================================列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numclientid"
        });
        //==============================================================列头
        var cm = new Ext.grid.ColumnModel([sm, {
            header: "客户端编号",
            tooltip: "客户端编号",
            dataIndex: "numclientid",
            sortable: true
        }, {
            header: "客户端名称",
            tooltip: "客户端名称",
            dataIndex: "vc2clientname",
            sortable: true
        
        },
//        {
//            header: "部门名称",
//            tooltip: "部门名称",
//            dataIndex: "vc2departname",
//            sortable: true
//        },
        {
//            header: "连接协议",
//            tooltip: "连接协议",
//            dataIndex: "vc2linkprotocolname",
//            sortable: true
//        },{
        	header: "协议类型",
            tooltip: "协议类型",
            dataIndex: "protocoltype",
            sortable: true,
            renderer: function(value){
    			if (value == 1) {
    				return "CBIP1.0";
    			}else if (value == 2) {
    				return "CBIP2.0";
    			}
    	}
        },{
            header: "登录名称",
            tooltip: "登录名称",
            dataIndex: "vc2username",
            sortable: true
        }, {
            header: "登录密码",
            tooltip: "登录密码",
            dataIndex: "vc2password",
            sortable: true
        }, {
            header: "客户端IP",
            tooltip: "客户端IP",
            dataIndex: "vc2clientip",
            sortable: true
           
        }, {
            header: "下行长号码",
            tooltip: "下行长号码",
            dataIndex: "vc2sublongcode",
            sortable: true
           
        }, {
            header: "下发速度",
            tooltip: "下发速度",
            dataIndex: "nummaxsendspeed",
            sortable: true
        }, {
            header: "客户端等级",
            tooltip: "客户端等级",
            dataIndex: "numclientlevel",
            sortable: true
        }, {
            header: "透传级别",
            tooltip: "透传级别",
            dataIndex: "numreturnlevel",
            sortable: true
        }
        ]);
        
        //==============================================================定义grid
        var gridPanel = new WXTL.Widgets.CommonGrid.GridPanel({
            id: "programGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.Business.Program.Infostore,
            //但字段修改路径定义
            afterEditURL: Js.Center.Business.ProgramUpdateURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.Business.ProgramAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.Business.ProgramUpdate',
            //删除调用方法名称
            deleteMethod: 'Js.Center.Business.ProgramDelete.func',
            sm: sm,
            cm: cm
        });
        
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "programSelectPanel",
			height:100,
            //查询调用的方法
            queryMethod: "Js.Center.Business.Program.queryGrid",
            items: [{
                layout: 'form',
                defaults: {
                    anchor: '40%',
                    msgTarget: "side"
                },
                items: [new Ext.form.TextField({
                    fieldLabel: '客户端名称',
                    name: 'columnname',
                    id: 'columnname',
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 20
                })]
            }]
        
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.Business.Program.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var columnName = Ext.get("columnname").getValue();
                var flag = 'selectbykey';
                Js.Center.Business.Program.Infostore.baseParams = {
                    vc2username: columnName,
                    flag: flag
                };
                Js.Center.Business.Program.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.Business.Program.MainPanel = new Ext.Panel({
            id: "Js.Center.Business.Program.MainPanel",
            frame: true, // 渲染面板
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, gridPanel]
        });
        
        //============================================================================绑定到center
    };
    GridMain(node, Js.Center.Business.Program.MainPanel, "openroomiconinfo", "Js.Center.Business.Program.Infostore");
};

