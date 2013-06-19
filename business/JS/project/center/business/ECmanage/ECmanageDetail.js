Ext.namespace('Js.Center.Business.ECmanageDetail');

Js.Center.Business.ECmanageDetail.func = function() {
   if(Js.Center.Business.ECmanageDetail.window==null){
		//===========================================分公司地区
		 var AreaCombox = new WXTL.Widgets.CommonForm.ComboBox({
		        xtype: "xComboBox",
		        name: "vc2area",
		        hiddenName: "vc2area",
		        emptyText: "-=请选择=-",
		        allowBlank: false,
		        blankText: "请选择地区",
		        fieldLabel: "<font color=red>地区</font>",
		        disabled: true,
		        mode: "local",
		        displayField: "vc2branchcompany",
		        valueField: "numbranchcompany",
		        triggerAction: "all",
		        store: Js.Center.Common.BranchCompanyStore
		    });
		    Js.Center.Common.BranchCompanyStore.reload();
		 //=========================================== 行业
		 var IndustryCombox =new WXTL.Widgets.CommonForm.ComboBox({
		        xtype: "xComboBox",
		        name: "numindustry",
		        hiddenName: "numindustry",
		        emptyText: "-=请选择=-",
		        allowBlank: false,
		        blankText: "请选择行业",
		        fieldLabel: "<font color=red>行业</font>",
		        disabled: true,
		        mode: "local",
		        displayField: "vc2industry",
		        valueField: "numindustry",
		        triggerAction: "all",
		        store: Js.Center.Common.IndustryStore
		    });
		 	Js.Center.Common.IndustryStore.reload();
	   //============================================================================定义FormPanel
	   var ecManageDetailPanel = new Ext.form.FormPanel({
	       frame: true,
	       labelWidth: 80,
	       defaults: {
	           anchor: '100%',
	           msgTarget: 'side'
	       },
	       bodyBorder: false,
	       border: false,
	       autoScroll: true, // 自动显示滚动条
	       items: [{
	           xtype: "hidden",
	           name: "flag",
	           value: "update"
	       },{
	           xtype: "hidden",
	           name: "numecid",
	           fieldLabel: "EC主键"
	       },{
	           xtype: "hidden",
	           name: "vc2ecid",
	           fieldLabel: "EC编号"
	       },{
	           xtype: "hidden",
	           id : "Js.Center.Business.ECmanageDetail.vc2contact",
	           name: "vc2ecid",
	           fieldLabel: "EC编号"
	       },{
		        layout:'column',
		    	items: [{//左侧列
		                columnWidth: .5,
		                layout: 'form',
		                defaultType: "textfield",
		                buttonAlign: "center",
		                bodyStyle: "padding:10px 0 10px 15px",
		                bodyBorder: false,
		                border: false,
		                defaults: {
	                        anchor: "90%",
	                        msgTarget: "side"
	                    },
		                items: [ {
		                    xtype: "textfield",
		                    name: "vc2fullname",
		                    fieldLabel: "<font color=red>客户全称</font>",
		    		        disabled: true
		                }, {
		                	xtype: "combo",
		                    name: "numismas",
		                    hiddenName: "numismas",
		                    fieldLabel: "<font color=red>MAS客户</font>",
		    		        disabled: true,
		                    displayField: "show",
		                    valueField: "value",
		                    store: new Ext.data.SimpleStore({
		                        fields: ["show", "value"],
		                        data: [["-=请选择=-", ""], ["是", "1"], ["否", "2"]]
		                    })
		                },{
		        			xtype: "combo",
		                    name: "numcustype",
		                    hiddenName: "numcustype",
		                    fieldLabel: "<font color=red>客户类型</font>",
		    		        disabled: true,
		                    displayField: "show",
		                    valueField: "value",
		                    store: new Ext.data.SimpleStore({
		                        fields: ["show", "value"],
		                        data: [["-=请选择=-", ""], ["渠道", "1"], ["直客", "2"],["内部","3"]]
		                    })
		        		},{
		        			xtype: "combo",
		                    name: "numlevel",
		                    hiddenName: "numlevel",
		                    fieldLabel: "<font color=red>级别</font>",
		    		        disabled: true,
		                    displayField: "show",
		                    valueField: "value",
		                    store: new Ext.data.SimpleStore({
		                        fields: ["show", "value"],
		                        data: [["-=请选择=-", ""], ["1", "1"], ["2", "2"],["3","3"]]
		                    })
		        		},{
		        			xtype: "combo",
		                    name: "numsvctype",
		                    hiddenName: "numsvctype",
		                    fieldLabel: "<font color=red>短彩类型</font>",
		    		        disabled: true,
		                    displayField: "show",
		                    valueField: "value",
		                    store: new Ext.data.SimpleStore({
		                        fields: ["show", "value"],
		                        data: [["-=请选择=-", ""], ["短信", "1"], ["彩信", "2"],["短彩信","3"]]
		                    })
		        		},{
		        			xtype: "combo",
		                    name: "numstatus",
		                    hiddenName: "numstatus",
		                    fieldLabel: "<font color=red>状态</font>",
		    		        disabled: true,
		                    displayField: "show",
		                    valueField: "value",
		                    store: new Ext.data.SimpleStore({
		                        fields: ["show", "value"],
		                        data: [["-=请选择=-", ""], ["商用", "1"], ["暂停", "2"]]
		                    })
		        		},{
			            	xtype: "textfield",
			                name: "vc2conperson",
		    		        disabled: true,
			                fieldLabel: "联系人"
		        		}]
		    	},{//右侧列
		    		columnWidth: .5,
		            layout: 'form',
		            defaultType: "textfield",
		            buttonAlign: "center",
		            bodyBorder: false,
		            border: false,
		            bodyStyle: "padding:10px 0 10px 15px",
		            defaults: {
	                    anchor: "90%",
	                    msgTarget: "side"
	                },
		            items: [{
		                xtype: "textfield",
		                name: "vc2ecname",
		                fieldLabel: "<font color=red>客户简称</font>",
				        disabled: true
		            } 
		            ,IndustryCombox
		            ,AreaCombox,
		            {
		            	xtype: "textfield",
		                name: "vc2manager",
		                fieldLabel: "<font color=red>商务经理</font>",
				        disabled: true
		            },{
		            	xtype: "combo",
	                    name: "vc2chargetype",
	                    hiddenName: "vc2chargetype",
	                    fieldLabel: "<font color=red>付费类型</font>",
	    		        disabled: true,
	                    displayField: "show",
	                    valueField: "value",
	                    store: new Ext.data.SimpleStore({
	                        fields: ["show", "value"],
	                        data: [["-=请选择=-", ""], ["预付费", "1"], ["后付费", "2"]]
	                    })
		            },{
		            	xtype: "textfield",
		                name: "numlimited",
		                fieldLabel: "<font color=red>条数限制</font>",
				        disabled: true
		            },{
		            	xtype: "label",
		                name: "vc2contact",
		                fieldLabel: "联系方式"
		            }]
		    	}]
	        },{
	       		columnWidth: 1,
	            layout: 'form',
	            //defaultType: "textfield",
	            buttonAlign: "center",
	            bodyBorder: false,
	            border: false,
	            bodyStyle: "padding:0px 0 10px 15px",
	            defaults: {
	                anchor: "90%",
	                msgTarget: "side"
	            },
	            items:[{
	            		id:"Js.Center.Business.ECmanageDetail.vc2oapic",
	            		xtype: "hidden",
	            		name:'vc2oapic'
	            	},{
		 				xtype : "panel",
		 				headerAsText:false,
		 				boder:false,
			            html: '<div id="Js.Center.Business.ECmanageDetail.DIV" width="100%"></div>'
	 				}]
	        }]
	   });
	   
		// ---------------------------------------------------- 定义GridPanel相关
		// 分页每页显示数量
		var pageSize = 12;
		// 指定列参数
		var fields = ["numrowasdf", "numprodid", "longcode", "vc2svcname","vc2gatewayname", "numsubcode", "vc2inputtype", "vc2cusip", "vc2feetype", "vc2confeerule", "numstatus","vc2name", "numpftype", "numsigntype"];
		Js.Center.Business.ECmanageDetail.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
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
				ecId : '',
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
		var cm = new Ext.grid.ColumnModel([
			 {
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
	            header: "直签/返佣",
	            tooltip: "直签/返佣",
	            dataIndex: "numsigntype",
	            sortable: true,
	            renderer:function(value, meta, record, rowIndex, colIndex, store){
	            	if(value=="1"){
            			return "返佣";
	            	} else if(value=="0"){
            			return "直签";
	            	}
	            }
	        }, {
	            header: "统/辅",
	            tooltip: "统/辅",
	            dataIndex: "numpftype",
	            sortable: true,
	            renderer:function(value, meta, record, rowIndex, colIndex, store){
	            	if(value=="1"){
            			return "统付";
	            	} else if(value=="2"){
            			return "辅通道";
	            	}
	            }
	        }, {
				header : "接入方式",
				tooltip : "接入方式",
				dataIndex : "vc2inputtype",
				sortable : true,
				editor : new Ext.form.TextField,
				renderer: function(value){
					var type ='';
					var types = value.split(',');
					if(types.length == 1){
		                if(value == 1){
		                    return "页面";
		                } else if(value == 2){
		                    return "接口";
		                }
					} else if(types.length == 2){
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
		var ecManageGrid = new WXTL.Widgets.CommonGrid.GridPanel({
			title : "业务列表",
	        anchor: '100% 100%',
	        width: 810,
			store : Js.Center.Business.ECmanageDetail.Infostore,
			sm : sm,
			cm : cm,
	        needMenu: false
		});
		
		// ---------------------------------------------------- 定义主panel
		var mainPanel = new Ext.Panel({
			items : [ecManageDetailPanel, ecManageGrid ]
		});

        //============================================================================ 定义窗
		var mainForm = ecManageDetailPanel.getForm();
        this.window = new WXTL.Widgets.CommonWindows.Window({
            title: "操作详细信息",
            width: 850,
            height: 430,
            autoScroll: true, // 自动显示滚动条
			frame:true,
            mainForm:mainForm,
            displayStore:Js.Center.Business.ECmanageDetail.Infostore,
            updateState: true,
            needLoadDataStore:true,
            items: [mainPanel],
            needButtons: false,
            buttons: [{
                text: "关  闭",
                minWidth: 70,
                handler: function(){
                	Js.Center.Business.ECmanageDetail.window.hide();
                }
            }],
            loadDataStoreFunc: function(){
			    Js.Center.Business.ECmanageDetail.Infostore.load({
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
