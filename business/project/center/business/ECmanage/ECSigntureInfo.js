Ext.namespace('Js.Center.Business.ECsignture');

Js.Center.Business.ECsignture.func = function(row) {
   if(Js.Center.Business.ECsignture.window==null){
		// ---------------------------------------------------- 定义GridPanel相关
		// 分页每页显示数量
		var pageSize = 12;
		// 指定列参数
		var fields = ["numid","numecid","numtypeid","vc2typename","vc2signture"];
		Js.Center.Business.ECsignture.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
			proxy : new Ext.data.HttpProxy({
				url : Js.Center.Business.ECmanage.ECSigntureURL,
				method : "POST"
			}),
			reader : new Ext.data.JsonReader({
				fields : fields,
				root : "data",
				id : "numid",
				totalProperty : "totalCount"
			}),
			baseParams : {
				flag : 'selectecsignturebykey',
				numecid:0,//Js.Center.Business.ECsignture.window.updateRecord.get("numecid"),
            	numtypeid:''
			},
            sortInfo: {
                field: 'numid',
                direction: 'DESC'
            }// 解决分组无效代码
		});
		
		// -------------------------------------------------- 列选择模式
		var sm = new Ext.grid.CheckboxSelectionModel({
			dataIndex : "numid"
		});
		// -------------------------------------------------- 列头
		var cm = new Ext.grid.ColumnModel([ sm,{
			header : "签名内容",
			tooltip : "签名内容",
			dataIndex : "vc2signture",
			sortable : true
		}, {
			header : "签名类型",
			tooltip : "签名类型",
			dataIndex : "vc2typename",
			sortable : true
		}
	]);
	
		// ---------------------------------------------------- 定义grid
		var tlecservicecodegrid = new WXTL.Widgets.CommonGrid.GridPanel({
			title : "报备签名列表",
	        anchor: '100% 100%',
	        width: 810,
			store : Js.Center.Business.ECsignture.Infostore,
			sm : sm,
			cm : cm,
			//但字段修改路径定义
            afterEditURL: Js.Center.Business.ECmanage.ECSigntureURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.Business.ECsigntureAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.Business.ECsigntureUpdate',
          //删除调用方法名称
            deleteMethod: 'Js.Center.Business.ECsigntureDelete.func'
		});
	
		
		// ---------------------------------------------------- 定义formpanel
		var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
	        height: 100,
	     // 查询调用的方法
	        queryMethod: "Js.Center.Business.ECsignture.queryMainGrid",
	        defaults : {
				anchor : "90%",
				msgTarget : "side"
			},
			items: [{
	            layout: 'column',
	            items: [{//左侧列
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:10px 0 10px 15px",
	                items:[{
	 		           xtype: "hidden",
			           id : "Js.Center.Business.ECsignture.numecid",
			           name: "numecid",
			           fieldLabel: "EC主键"
	                },{
	                	xtype: "xComboBox",
	                	name: "numtypeid",
	                	hiddenName: "Js.Center.Business.ECsignture.NumSignTypeID",
	                	fieldLabel: "签名类型",
	                	readOnly: true,
	                	mode: "local",
	                	//allowBlank:false,
	                	displayField: "vc2typename",
	                	valueField: "numtypeid",
	                	triggerAction: "all",
	                	emptyText: "-=请选择=-",
	                	store: Js.Center.Common.EcSignTypeStore
	                }]
	            }]
			}]
		});
		//============================================================== 定义查询按钮事件方法
		Js.Center.Business.ECsignture.queryMainGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var numecid = Ext.get("Js.Center.Business.ECsignture.numecid").getValue();
                var typeid = Ext.get("Js.Center.Business.ECsignture.NumSignTypeID").getValue();
                var flag = 'selectecsignturebykey';
                Js.Center.Business.ECsignture.Infostore.baseParams = {
                	numecid:numecid,//Js.Center.Business.ECsignture.window.updateRecord.get("numecid"),
                    numtypeid:typeid,//运营商ID
                    flag: flag
                };
                Js.Center.Business.ECsignture.Infostore.load({
                    params: {
                        start: 0,
                        limit: pageSize
                    }
                });
            }
        };
	
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
			items : [selectPanel,tlecservicecodegrid ]
		});
		var mainForm = selectPanel.getForm();
        //============================================================================ 定义窗体
        this.window = new WXTL.Widgets.CommonWindows.Window({
            title: "报备签名信息",
            width: 850,
            height: 430,
            autoScroll: true, // 自动显示滚动条
			frame:true,
			mainForm:mainForm,
            displayStore:Js.Center.Business.ECsignture.Infostore,
            updateState: true,
            updateRecord: row,
            needLoadDataStore:true,
            items: [mainPanel],
            needButtons: false,
            buttons: [{
                text: "关  闭",
                minWidth: 70,
                handler: function(){
                	Js.Center.Business.ECsignture.window.hide();
                }
            }],
            loadDataStoreFunc: function(){
            	Js.Center.Common.EcSignTypeStore.reload();
            	var numecid = Ext.get("Js.Center.Business.ECsignture.numecid").getValue();
                var typeid = Ext.get("Js.Center.Business.ECsignture.NumSignTypeID").getValue();
                var flag = 'selectecsignturebykey';
                Js.Center.Business.ECsignture.Infostore.baseParams = {
                	numecid:numecid,//Js.Center.Business.ECsignture.window.updateRecord.get("numecid"),
                    numtypeid:typeid,//运营商ID
                    flag: flag
                };
            	
			    Js.Center.Business.ECsignture.Infostore.load({
                    params: {
                    	numecid:Js.Center.Business.ECsignture.window.updateRecord.get("numecid"),
                    	numtypeid:'',
                        start: 0,
                        limit: pageSize
                    }
                });
			}
        });
		//GridMain(node, mainPanel, "openroomiconinfo");
	}
};