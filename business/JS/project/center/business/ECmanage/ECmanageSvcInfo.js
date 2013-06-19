Ext.namespace('Js.Center.Business.ECservice');

Js.Center.Business.ECservice.func = function(row) {
   if(Js.Center.Business.ECservice.window==null){
		// ---------------------------------------------------- 定义GridPanel相关
		// 分页每页显示数量
		var pageSize = 12;
		// 指定列参数
		var fields = ["numrowasdf", "numecid","numseqid", "numprodid", "longcode", "vc2svcname","vc2gatewayname", "numsubcode", "vc2inputtype", "vc2cusip", "vc2feetype", "vc2confeerule", "numstatus", "numopid", "numfeearea",  "numsvcid", "numsign","vc2name"];
		Js.Center.Business.ECservice.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
			proxy : new Ext.data.HttpProxy({
				url : Js.Center.Business.ECmanage.ECsvcInfoURL,
				method : "POST"
			}),
			reader : new Ext.data.JsonReader({
				fields : fields,
				root : "data",
				id : "numrowasdf",
				totalProperty : "totalCount"
			}),
			baseParams : {
				flag : 'selectbykey'
			},
            sortInfo: {
                field: 'numrowasdf',
                direction: 'DESC'
            }// 解决分组无效代码
		});
		
		// -------------------------------------------------- 列选择模式
		var sm = new Ext.grid.CheckboxSelectionModel({
			dataIndex : "numcolumnid"
		});
		// -------------------------------------------------- 列头
		var cm = new Ext.grid.ColumnModel([ sm,
		{
			header : "通道组编号",
			tooltip : "通道组编号",
			dataIndex : "numprodid",
			sortable : true,
			hidden:true,
			editor : new Ext.form.TextField
		}, {
			header : "服务代码",
			tooltip : "服务代码",
			dataIndex : "longcode",
			sortable : true,
			editor : new Ext.form.TextField
		}, {
			header : "运营商",
			tooltip : "运营商",
			dataIndex : "vc2name",
			sortable : true,
			editor : new Ext.form.TextField
		}, {
			header : "接入网关",
			tooltip : "接入网关",
			dataIndex : "vc2gatewayname",
			sortable : true,
			editor : new Ext.form.TextField
		}, {
			header : "建议子号码",
			tooltip : "建议子号码",
			dataIndex : "numsubcode",
			sortable : true,
			editor : new Ext.form.TextField
		}, {
			header : "接入方式",
			tooltip : "接入方式",
			dataIndex : "vc2inputtype",
			sortable : true,
			editor : new Ext.form.TextField,
			renderer: function(value){
				var types = value.split(',');
				if(types.length == 1){
	                if(value == 1){
	                    return "页面";
	                } else if(value == 2){
	                    return "接口";
	                }
				} else if(types.length == 2){
					var type ='';
	                if(types[0] == 1){
	                	type = "页面";
	                } else if(types[0] == 2){
	                	type = "接口";
	                }
	                if(types[1] == 1){
	                	type += ", 页面";
	                } else if(types[1] == 2){
	                	type += ", 接口";
	                }
	                return type;
				}
            }
		}, {
			header : "客户IP",
			tooltip : "客户IP",
			dataIndex : "vc2cusip",
			sortable : true,
			editor : new Ext.form.TextField
		}, {
			header : "计费方式",
			tooltip : "计费方式",
			dataIndex : "vc2feetype",
			sortable : true,
			editor : new Ext.form.TextField,
			renderer: function(value){
                if(value == 1){
                    return "按条";
                } else if(value == 2){
                    return "套餐";
                } else if(value == 3){
                    return "产品";
                }
            }
		}, {
			header : "计费规则",
			tooltip : "计费规则",
			dataIndex : "vc2confeerule",
			sortable : true,
			editor : new Ext.form.TextField
		}, {
			header : "状态",
			tooltip : "状态",
			dataIndex : "numstatus",
			sortable : true,
			editor : new Ext.form.TextField,
			renderer: function(value){
                if(value == 1){
                    return "可用";
                }
                else{
                    return "删除";
                }
            }
		}
	]);
	
		// ---------------------------------------------------- 定义grid
		var tlecservicecodegrid = new WXTL.Widgets.CommonGrid.GridPanel({
			title : "业务列表",
	        anchor: '100% 100%',
	        width: 810,
			id : "ecserviceinfo",
			store : Js.Center.Business.ECservice.Infostore,
			sm : sm,
			cm : cm,
	        needMenu: false,
			tbar : new Ext.Toolbar({
                items: [{
					text : "添加",
					// 默认样式为按下
					// pressed : true,
					tooltip : "添加",
					iconCls : "addicon",
					handler : function() {
						Js.Center.Business.ECserviceAdd.updateRecord = "";
						var numecid = Js.Center.Business.ECservice.window.updateRecord.data.numecid;
						var vc2ecid = Js.Center.Business.ECservice.window.updateRecord.data.vc2ecid;
						Ext.getCmp("Js.Center.Business.ECservice.numecid").setValue(numecid);
						Ext.getCmp("Js.Center.Business.ECservice.vc2ecid").setValue(vc2ecid);
						Js.Center.Business.ECserviceAdd.window.show();
					}
				}, "", "-", "", {
					text : "编辑",
					tooltip : "编辑",
					iconCls : "editicon",
					handler : function() {
						var row = Ext.getCmp("ecserviceinfo").getSelectionModel().getSelections();
						var numecid = Js.Center.Business.ECservice.window.updateRecord.data.numecid;
						var vc2ecid = Js.Center.Business.ECservice.window.updateRecord.data.vc2ecid;
						Ext.getCmp("Js.Center.Business.ECservice.numecid").setValue(numecid);
						Ext.getCmp("Js.Center.Business.ECservice.vc2ecid").setValue(vc2ecid);
						if (row.length == 0) {
							Ext.Msg.alert("提示信息", "您没有选中任何行!");
						} else if (row.length > 1) {
							Ext.Msg.alert("提示信息", "对不起只能选择一个!");
						} else if (row.length == 1) {
							if(row[0].data.numstatus == 1){								
								Ext.getCmp('Js.Center.Business.ECserviceAdd.numsvcid').store.reload({
					                params: {
					                    numopid: row[0].data.numopid,
					                    flag: 'queryservicecodebyopid'
					                },
					                callback:function(){
					                		Js.Center.Business.ECserviceAdd.window.show();
					                		Js.Center.Business.ECserviceAdd.updateRecord = row[0];
											Js.Center.Business.ECserviceAdd.window.mainForm.loadRecord(row[0]);
											//手动选中接入方式
											var inputtype = row[0].data.vc2inputtype.split(",");
											Ext.getCmp("Js.Center.Business.ECserviceAdd.inputtype");
											for(i = 0; i< inputtype.length; i++){
												if(inputtype[i] == 1){
													Ext.getCmp("Js.Center.Business.ECserviceAdd.inputtype").items.items[0].setValue(true);
												} else if(inputtype[i] == 2){
													Ext.getCmp("Js.Center.Business.ECserviceAdd.inputtype").items.items[1].setValue(true);
												}
											}
					                }
					            });
							} else {
								Ext.Msg.alert("提示信息", "不能编辑被删除的业务!");
							}
						}
					}
				}, "", "-", "", {
					text : "删除",
					tooltip : "删除",
					iconCls : "editicon",
					handler : function() {
						//得到多个record对象
						var row = Ext.getCmp("ecserviceinfo").getSelectionModel().getSelections();
						if (row.length == 0) {
							Ext.Msg.alert("提示信息", "请您至少选择一个!");
						} else {
							for(i = 0; i < row.length; i ++){
								if(row[i].data.numstatus == 0){
									Ext.Msg.alert("提示信息", "不能选择已删除信息!");
									return;
								}
							}
							Ext.Msg.confirm("提示!", "您确定要删除信息吗?", function(btn) {
								if (btn == "yes") {
									Js.Center.Business.ECserviceDelete.func(row);
								}
							})
						}
					}
				}]
			})
		});
	
		// ---------------------------------------------------- 定义formpanel
		var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
	        height: 160,
			items : [{
		           xtype: "hidden",
		           id : "Js.Center.Business.ECservice.numecid",
		           name: "Js.Center.Business.ECservice.numecid",
		           fieldLabel: "EC主键"
		       },{
		           xtype: "hidden",
		           id : "Js.Center.Business.ECservice.vc2ecid",
		           name: "Js.Center.Business.ECservice.vc2ecid",
		           fieldLabel: "EC编号"
		       }]
		});
	
		// ---------------------------------------------------- 定义主panel
		var mainPanel = new Ext.Panel({
			frame : true, // 渲染面板
			bodyBorder : false,
			border : false,
			autoScroll : true,// 自动显示滚动条
			defaults : {
				collapsible : true
			// 允许展开和收缩
			},
			items : [tlecservicecodegrid ]
		});

        //============================================================================ 定义窗体
        this.window = new WXTL.Widgets.CommonWindows.Window({
            title: "操作详细信息",
            width: 850,
            height: 430,
            autoScroll: true, // 自动显示滚动条
			frame:true,
            displayStore:Js.Center.Business.ECservice.Infostore,
            updateState: true,
            needLoadDataStore:true,
            items: [mainPanel],
            needButtons: false,
            buttons: [{
                text: "关  闭",
                minWidth: 70,
                handler: function(){
                	Js.Center.Business.ECservice.window.hide();
                }
            }],
            loadDataStoreFunc: function(){
			    Js.Center.Business.ECservice.Infostore.load({
                    params: {
                        start: 0,
                        limit: pageSize
                    }
                });
			}
        });
		//GridMain(node, mainPanel, "openroomiconinfo");
	}
};