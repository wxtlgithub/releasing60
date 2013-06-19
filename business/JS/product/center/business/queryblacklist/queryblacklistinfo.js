/**
 * 黑名单查询
 * @author 董鹏
 */
Ext.namespace('Js.Center.BlackListQuery.BlackListQueryInfo');

Js.Center.BlackListQuery.BlackListQueryInfo = function(node, row) {
    if (Ext.get("Js.Center.BlackListQuery.BlackListQueryInfo.BlackPanel") == null) {
        var blacktypestore = new Ext.data.SimpleStore({
            fields: ["vc2name", "type"],
            data: [["-=请选择=-", ""],["黑名单", "3,5"],["通道黑名单", "7"]]
        });
    	Js.Center.Common.UserGroupSelectStore.reload();
        // ======================================================================= 定义GridPanel相关
        // ===============================================分页每页显示数量
    	//黑名单信息
        var blackPageSize = 12; 
        //通道黑名单信息
        var gwBlackPageSize = 12; 
        //黑名单退出记录信息
        var blackLogPageSize = 12; 
        // ===============================================指定列参数
        //黑名单列表字段
        var blackfields = ["numseqid", "vc2mobile", "numtype", "datcreate"];
        //黑名单列表字段
        var gwblackfields = ["numseqid", "vc2mobile", "vc2gatewayname", "datcreate", "vc2remark"];
        //黑名单退出记录列表字段
        var blacklogfields = ["numseqid", "vc2mobile", "vc2gatewayname", "numlisttype", "datdisord", "vc2remark"];
        //限制查询条件的方法
        var queryData = function(infostore, grid, flaginfo) {
            if (Ext.get("Js.Center.BlackListQuery.BlackListQueryInfo.mobile").getValue() == '') {
                Ext.Msg.alert("温馨提示", "请输入查询条件！");
                return false;
            } else {
                if (selectPanel.getForm().isValid()) {
                    infostore.baseParams = {
                        mobile: Ext.get("Js.Center.BlackListQuery.BlackListQueryInfo.mobile").getValue(),
                        blacktype: Ext.getCmp("Js.Center.BlackListQuery.BlackListQueryInfo.blacktype").getValue(),
                        flag: flaginfo,
                        limit: blackPageSize,
                        start: 0
                    };
                    return true;
                }
            }
        };
        //================================================定义Grid数据
        //===============黑名单信息
        Js.Center.BlackListQuery.BlackListQueryInfo.BlackInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.BlackListQuery.BlackQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: blackfields,
                root: "data",
                id: "numseqid",
                totalProperty: "totalCount"
            }),
            sortInfo: {
                field: 'datcreate',
                direction: 'DESC'
            }, //解决分组无效代码
            listeners: {
                "beforeload": function(Store, options) {
                    return queryData(Js.Center.BlackListQuery.BlackListQueryInfo.BlackInfostore, blackgrid, 'blackquery');
                }
            },
            baseParams: {
                mobile: '',
                flag: 'blackQuery'
            }
        });
        //===============网关黑名单信息
        Js.Center.BlackListQuery.BlackListQueryInfo.GwBlackInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.BlackListQuery.BlackQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: gwblackfields,
                root: "data",
                id: "numsvcid",
                totalProperty: "totalCount"

            }),
            sortInfo: {
                field: 'datcreate',
                direction: 'DESC'
            }, //解决分组无效代码
            listeners: {
                "beforeload": function(Store, options) {
                    return queryData(Js.Center.BlackListQuery.BlackListQueryInfo.GwBlackInfostore, gwblackgrid, 'gwblackquery');
                }
            },
            baseParams: {
                mobile: '',
                flag: 'selectgwblackbymobile'
            }
        });
        //===============黑名单退出记录信息
        Js.Center.BlackListQuery.BlackListQueryInfo.BlackLogInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.BlackListQuery.BlackQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: blacklogfields,
                root: "data",
                totalProperty: "totalCount"

            }),
            sortInfo: {
                field: 'datdisord',
                direction: 'DESC'
            }, //解决分组无效代码
            listeners: {
                "beforeload": function(Store, options) {
                    return queryData(Js.Center.BlackListQuery.BlackListQueryInfo.BlackLogInfostore, blackloggrid, 'blacklogquery');
                }
            },
            baseParams: {
                mobile: '',
                blacktype: '',
                flag: 'blackLogQuery'
            }
        });
        // ==================================================== 列选择模式
        //黑名单信息
        var blacksm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numseqid"
        });
        //通道黑名单信息
        var gwblacksm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numseqid"
        });
        //黑名单退出记录信息
        var blacklogsm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numseqid"
        });
        // ==================================================== 列头
        //黑名单信息
        var blackcm = new Ext.grid.ColumnModel([{
            header: "手机号",
            tooltip: "手机号",
            dataIndex: "vc2mobile",
            sortable: true
        }, {
            header: "类型",
            tooltip: "类型",
            dataIndex: "numtype",
            sortable: true,
            renderer: function(value) {
                if (value == 1) {
                    return "系统黑名单";
                } else if (value == 2) {
                    return "彩信黑名单";
                }
            }
        }, {
            header: "加入时间",
            tooltip: "加入时间",
            dataIndex: "datcreate",
            sortable: true
        }]);
        //通道黑名单信息
        var gwblackcm = new Ext.grid.ColumnModel([{
            header: "手机号",
            tooltip: "手机号",
            dataIndex: "vc2mobile",
            sortable: true
        }, {
            header: "网关",
            tooltip: "网关",
            dataIndex: "vc2gatewayname",
            sortable: true
        }, {
            header: "加入时间",
            tooltip: "加入时间",
            dataIndex: "datcreate",
            sortable: true
        }, {
            header: "备注",
            tooltip: "备注",
            dataIndex: "vc2remark",
            sortable: true
        }]);
        //黑名单退出记录信息
        var blacklogcm = new Ext.grid.ColumnModel([{
            header: "手机号",
            tooltip: "手机号",
            dataIndex: "vc2mobile",
            sortable: true
        }, {
            header: "网关",
            tooltip: "网关",
            dataIndex: "vc2gatewayname",
            sortable: true
        }, {
            header: "类型",
            tooltip: "类型",
            dataIndex: "numlisttype",
            sortable: true,
            renderer: function(value) {
                if (value == 3) {
                    return "退出系统黑名单";
                } else if (value == 5) {
                    return "退出彩信黑名单";
                } else if (value == 7) {
                    return "退出通道黑名单";
                }
            }
        }, {
            header: "退出时间",
            tooltip: "退出时间",
            dataIndex: "datdisord",
            sortable: true
        }, {
            header: "备注",
            tooltip: "备注",
            dataIndex: "vc2remark",
            sortable: true
        }]);
        //==============================================================定义grid
        //==============================================================黑名单信息
        var blackgrid = new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '100% 100%',
            pageSize: blackPageSize,
            needMenu: false,
            needRightMenu: false,
            title: '黑名单',
            store: Js.Center.BlackListQuery.BlackListQueryInfo.BlackInfostore,
            sm: blacksm,
            cm: blackcm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'exporticon',
                    text: "数据导出",
                    handler: function(){
			            if (Ext.get("Js.Center.BlackListQuery.BlackListQueryInfo.mobile").getValue() == '') {
			                Ext.Msg.alert("温馨提示", "请输入查询条件！");
			                return false;
			            } else if (selectPanel.getForm().isValid()) {
                        	var mobile = Ext.get("Js.Center.BlackListQuery.BlackListQueryInfo.mobile").getValue();
	                    	windowOpen(Js.Center.BlackListQuery.BlackQueryURL + "?" + "flag=blackexport&mobile=" + mobile, 400, 300);
	                    }
                    }
                }]
            }),
            listeners: {
                "beforeexpand": function(Panel) {
                    if (queryData(Js.Center.BlackListQuery.BlackListQueryInfo.BlackInfostore, blackgrid, 'blackquery')) {
                        Js.Center.BlackListQuery.BlackListQueryInfo.BlackInfostore.load({
                            params: {
                                limit: blackPageSize,
                                start: 0
                            }
                        });
                    }
                }
            }
        });
        //==============================================================通道黑名单信息
        var gwblackgrid = new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '100% 100%',
            pageSize: gwBlackPageSize,
            needMenu: false,
            needRightMenu: false,
            title: '通道黑名单',
            store: Js.Center.BlackListQuery.BlackListQueryInfo.GwBlackInfostore,
            sm: gwblacksm,
            cm: gwblackcm,
            collapsed: "false",
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'exporticon',
                    text: "数据导出",
                    handler: function(){
			            if (Ext.get("Js.Center.BlackListQuery.BlackListQueryInfo.mobile").getValue() == '') {
			                Ext.Msg.alert("温馨提示", "请输入查询条件！");
			                return false;
			            } else if (selectPanel.getForm().isValid()) {
                        	var mobile = Ext.get("Js.Center.BlackListQuery.BlackListQueryInfo.mobile").getValue();
	                    	windowOpen(Js.Center.BlackListQuery.BlackQueryURL + "?" + "flag=gwblackexport&mobile=" + mobile, 400, 300);
	                    }
                    }
                }]
            }),
            listeners: {
                "beforeexpand": function(Panel) {
                    if (queryData(Js.Center.BlackListQuery.BlackListQueryInfo.GwBlackInfostore, gwblackgrid, 'gwBlackQuery')) {
                        Js.Center.BlackListQuery.BlackListQueryInfo.GwBlackInfostore.load({
                            params: {
                                limit: gwBlackPageSize,
                                start: 0
                            }
                        });
                    }
                }
            }
        });
        //==============================================================黑名单退出记录信息
        var blackloggrid = new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '100% 100%',
            pageSize: blackLogPageSize,
            needMenu: false,
            needRightMenu: false,
            title: '黑名单退出记录',
            store: Js.Center.BlackListQuery.BlackListQueryInfo.BlackLogInfostore,
            sm: blacklogsm,
            cm: blacklogcm,
            collapsed: "false",
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'exporticon',
                    text: "数据导出",
                    handler: function(){
			            if (Ext.get("Js.Center.BlackListQuery.BlackListQueryInfo.mobile").getValue() == '') {
			                Ext.Msg.alert("温馨提示", "请输入查询条件！");
			                return false;
			            } else if (selectPanel.getForm().isValid()) {
                        	var mobile = Ext.get("Js.Center.BlackListQuery.BlackListQueryInfo.mobile").getValue();
                        	var blacktype = Ext.getCmp("Js.Center.BlackListQuery.BlackListQueryInfo.blacktype").getValue();
	                    	windowOpen(Js.Center.BlackListQuery.BlackQueryURL + "?" + "flag=blacklogexport&mobile=" + mobile + "&blacktype=" + blacktype, 400, 300);
	                    }
                    }
                }]
            }),
            listeners: {
                "beforeexpand": function(Panel) {
                    if (queryData(Js.Center.BlackListQuery.BlackListQueryInfo.BlackLogInfostore, blackloggrid, 'blackLogQuery')) {
                        Js.Center.BlackListQuery.BlackListQueryInfo.BlackLogInfostore.load({
                            params: {
                                limit: blackLogPageSize,
                                start: 0
                            }
                        });
                    }
                }
            }
        });

        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "customerbusinessSelectPanel",
            height: 170,
            //查询调用的方法
            queryMethod: "Js.Center.BlackListQuery.BlackListQueryInfo.queryGrid",
            bodyStyle: "padding:10px 0 10px 15px",
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
                    items: [{
						xtype : 'textarea',
						name : 'mobile',
                    	id: 'Js.Center.BlackListQuery.BlackListQueryInfo.mobile',
						allowBlank : false,
						blankText : "请输入手机号码列表",
						fieldLabel : getHelpMsg("号码列表", true, "1、输入行数不超过500行<br>2、输入格式:　<img src=jspack/product/common/Images/help/oldmobilelist.jpg align=Baseline/>"),
						width : 300,
						height : 80,
						maxLength : 13000,
						maxLengthText : "请将输入内容控制在500行以内！",
						validator : function(value) {
							return checkMobileList(value, 500);
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
				    items: [{
						xtype : "xComboBox",
                    	id: 'Js.Center.BlackListQuery.BlackListQueryInfo.blacktype',
						name : "blacktype",
						hiddenName : "blacktype",
						emptyText : "-=请选择=-",
						fieldLabel : "黑名单类型",
						readOnly : true,
						mode : "local",
						displayField : "vc2name",
						valueField : "type",
						triggerAction : "all",
						store : blacktypestore
					}]
				}]
			}]
        });
        //============================================================== 定义查询按钮事件方法
        Js.Center.BlackListQuery.BlackListQueryInfo.queryGrid = function() {
            if (Ext.get("Js.Center.BlackListQuery.BlackListQueryInfo.mobile").getValue() == '') {
                Ext.Msg.alert("温馨提示", "请输入查询条件！");
                return false;
            }
            else {
                if (selectPanel.getForm().isValid()) {
                    if (queryData(Js.Center.BlackListQuery.BlackListQueryInfo.BlackInfostore, blackgrid, 'blackQuery')) {
                        Js.Center.BlackListQuery.BlackListQueryInfo.BlackInfostore.load({
                            params: {
                                limit: blackPageSize,
                                start: 0
                            }
                        });
                    }
                }
                gwblackgrid.collapse(true);
                blackloggrid.collapse(true);
            }
        };

        //============================================================================定义主panel
        Js.Center.BlackListQuery.BlackListQueryInfo.BlackPanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.BlackListQuery.BlackListQueryInfo.BlackPanel",
            //title:"客户基本信息",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, blackgrid, gwblackgrid, blackloggrid]
        })
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.BlackListQuery.BlackListQueryInfo.BlackPanel, "openroomiconinfo", "Js.Center.BlackListQuery.BlackListQueryInfo.BlackInfostore");
    if (row != "" && row != null) {
        if (queryData(Js.Center.BlackListQuery.BlackListQueryInfo.BlackInfostore, blackgrid, 'blackQuery')) {
            Js.Center.BlackListQuery.BlackListQueryInfo.BlackInfostore.load({
                params: {
                    limit: blackPageSize,
                    start: 0
                }
            });
        }
    };
};