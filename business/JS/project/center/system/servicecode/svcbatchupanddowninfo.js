Ext.namespace('Js.Center.Business.SvcBatchUpAndDownInfo');
Js.Center.Business.SvcBatchUpAndDownInfo = function(node){
    if (Ext.get("Js.Center.Business.SvcBatchUpAndDownInfo.servicepanel") == null) {
    	/**选择的通道组*/
	  	var productName = "";
	  	/**选择的通道组ID*/
	  	var productIDS = "";
	  	/**客户端ID和名称*/
	    var prodIdAndName = "";
	  	/**选择的客户端ID*/
	  	var clientIDS = "";
	  	/**选择的客户端名称*/
    	var clientName = "";
    	/**上行路由ID*/
    	var routeIds = "";
    	/**客户端ID和名称*/
    	var clientIdAndName = "";
	  	/**是否有EC业务需要手动调整*/
	  	var isNeedOp = false;
        //==============================================================下拉列表数据定义
        /**原通道数据源*/
        Js.Center.Common.ServiceCodeStore.reload();
        // ======================================================================= 定义GridPanel相关
        /**公用用分页*/
        var _pageSize = 1000000;
        /**下行列表Flag*/
        var _downFlag = "querysvcbatchlist";
        /**上行列表Flag*/
        var _upFlag = "querysvcbatchupanddownlist";
        // ===============================================指定列参数
        var downFields = ["numprodid", "vc2name", "numsvcid","vc2svcname","numopid"];
        var upFields = ["numclientid","vc2clientname","numsvcid","vc2svcname","numrouteid"];
        // ===============================================列表数据
        /**下行数据集*/
        Js.Center.Business.SvcBatchUpAndDownInfo.DownInfoStore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.SvcBatchURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: downFields,
                root: "data",
                id: "numrowasdf",
                totalProperty: "totalCount"
            }),
            listeners:{
            	"load":function(){
            		Js.Center.Business.SvcBatchUpAndDownInfo.UpInfoStore.reload();
            	}
            },
            sortInfo: {
                field: 'numprodid',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
            	 numsvcid: '',
                 flag: _downFlag
            }
        });
        /**上行数据集*/
        Js.Center.Business.SvcBatchUpAndDownInfo.UpInfoStore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.SvcBatchURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: upFields,
                root: "data",
                id: "numrowasdf",
                totalProperty: "totalCount"
            }),
            sortInfo: {
                field: 'numclientid',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
            	 numsvcid: '',
                 flag: _upFlag
            }
        });
        // ==================================================== 列选择模式
        var downSm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numprodid"
        });
        var upSm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numclientid"
        });
        // ==================================================== 列头
        var downCm = new Ext.grid.ColumnModel([downSm,
        {
            header: "通道组ID",
            tooltip: "通道组ID",
            dataIndex: "numprodid",
            sortable: true
        },{
            header: "通道组名称",
            tooltip: "通道组名称",
            dataIndex: "vc2name",
            sortable: true
        },{
            header: "通道ID",
            tooltip: "通道ID",
            dataIndex: "numsvcid",
            sortable: true
        },{
            header: "通道名称",
            tooltip: "通道名称",
            dataIndex: "vc2svcname",
            sortable: true
        }]);
        var upCm = new Ext.grid.ColumnModel([upSm,
        {
            header: "客户端ID",
            tooltip: "客户端ID",
            dataIndex: "numclientid",
            sortable: true
        },{
            header: "客户端名称",
            tooltip: "客户端名称",
            dataIndex: "vc2clientname",
            sortable: true
        },{
        	header: "上行路由ID",
        	tooltip:"上行路由ID",
        	dataIndex:"numrouteid",
        	sortable:true
        },{
            header: "通道ID",
            tooltip: "通道ID",
            dataIndex: "numsvcid",
            sortable: true
        },{
            header: "通道名称",
            tooltip: "通道名称",
            dataIndex: "vc2svcname",
            sortable: true
        }]);
        //================================================加载提交对比页面
        var svcUpdate_arrInitLoadFunc = new Array();
        svcUpdate_arrInitLoadFunc[0] = "Js.Center.Business.UpdateSvcBatch.func";
        svcUpdate_arrInitLoadFunc[1] = "Js.Center.Business.ECservice.func";
        svcUpdate_arrInitLoadFunc[2] = "Js.Center.Business.ECserviceAdd.func";
        //==============================================================定义下行grid
        var downGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '100% 100%',
            pageSize: _pageSize,
            title:"下 行",
            store: Js.Center.Business.SvcBatchUpAndDownInfo.DownInfoStore,
            sm: downSm,
            cm: downCm,
            needMenu: false,
            needPage: false,
            otherInitLoadFunc: svcUpdate_arrInitLoadFunc
        });
        //==============================================================定义grid
        var upGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '100% 100%',
            pageSize: _pageSize,
            title:"上  行",
            store: Js.Center.Business.SvcBatchUpAndDownInfo.UpInfoStore,
            sm: upSm,
            cm: upCm,
            needMenu: false,
            needPage: false
        });
       	//============================================================替换通道数据源
        /**替换的通道数据源*/
        Js.Center.Business.SvcBatchUpAndDownInfo.SvcStore = new Ext.data.Store({
		    proxy: new Ext.data.HttpProxy({
		        url: Js.Center.Business.SvcBatchURL,
		        method: "POST"
		    }),
		    reader: new Ext.data.JsonReader({
		        fields: ['numsvcid', 'vc2svcname'],
		        root: 'data',
		        id: 'numsvcid'
		    }),
		    baseParams: {
		        columnlist: 'numsvcid,vc2svcname,numopid',
		        flag: 'getsvccodebyopidandexistsvcid'
		    }
		});
        //提交面板
        var submitPanel = new Ext.form.FormPanel({
				height : 80,
				headerAsText:false,
				hideCollapseTool:true,
				buttonAlign: "left",
				//boder:true,
				frame:true,
				items : [{
							xtype:"hidden",
							name: "isSupport",
							value: "1"
						},{
						layout : 'column',
						items : [{
									columnWidth : .5,
									layout : 'form',
									defaultType : "textfield",
									defaults : {
										anchor : "70%",
										msgTarget : "side"
									},
									buttonAlign : "center",
									bodyStyle : "padding:5px 0 5px 5px",
									items : [{
						            	xtype: "xComboBox",
				                        name: "numsvcidnew",
				                        fieldLabel: "<font color=red>替换通道</font>",
				                        hiddenName: "numsvcidnew",
				                        readOnly: false,
				                        allowBlank:false,
				                        mode: "local",
				                        displayField: "vc2svcname",
				                        valueField: "numsvcid",
				                        triggerAction: "all",
				                        store: Js.Center.Business.SvcBatchUpAndDownInfo.SvcStore,
				                        listeners : {
												"select" : function() {
													getIsSupportSubCodeBySvcId();
												}
											}
									}]
								},{
									columnWidth : .3,
									layout : 'form',
									defaultType : "textfield",
									defaults : {
										anchor : "70%",
										msgTarget : "side"
									},
									buttonAlign : "center",
									bodyStyle : "padding:10px 0 10px 15px",
									items:[{
										xtype:"panel",
										html:"<div id=\"Js.Center.Business.SvcBatchUpAndDownInfo.IsSupDiv\"></div>"
									}]
								}]
						}],
					buttons:[
		            	new Ext.Button({
		                text: ' 提 交 ',
		                minWidth: 100,
		                handler: function(){
		                	if(submitPanel.getForm().isValid()&&selectPanel.getForm().isValid()){
			                	var downrows = downGrid.getSelectionModel().getSelections();
			                	var uprows = upGrid.getSelectionModel().getSelections();
								if(downrows.length==0 && uprows.length==0 ){
									Ext.Msg.alert("提示","请选择一个通道！");
									return;
								}
								qenProductIDsAndProductNames();
       							genClientIDsAndClientNames();
			                	if(downrows.length>0){
			                		Js.Center.Business.SvcBatchUpAndDownInfo.UpdateSvcBatch();
//			                		getIsHasNeedOpEcByProdsAndNewSvcId();
			                	}	//只选择客户端的时候不进行EC验证
			                	else
			                		if(downrows.length==0 && uprows.length>0){			                		
			                		//批量替换确认
			                		Js.Center.Business.SvcBatchUpAndDownInfo.UpdateSvcBatch();
			                	}
		                	}
		                }
		            })
				]
        	});
       /**验证是否有需要调整的EC（下行）,只判断下行，上行不判断*/
       function getIsHasNeedOpEcByProdsAndNewSvcId(){
	   	 	Ext.MessageBox.show({
		        msg: '正在验证EC业务，请稍等...',
		        progressText: 'Search...',
		        width: 300,
		        wait: true,
		        icon: 'download',
		        animEl: 'saving'
		    });
	    	 Ext.Ajax.request({
		            url: Js.Center.Business.SvcBatchURL,
		            method: "POST",
		            params: {
		            	numsvcidnew: submitPanel.getForm().findField("numsvcidnew").getValue(),
		            	productids : productIDS,
		                flag: "ishasneedopecbyprodsandnewsvcid"
		            },
		            success: function(form, action) {
		                var objJson = Ext.util.JSON.decode(form.responseText);
		                var flag = objJson.success;
		                if(true == flag){
		                	if(objJson.data.length>0){
		                		 //EC列表输出到Window
		                		 var ecNames = "";
		                		 var ecNameLinks = "";
		                		 for(var i =0;i<objJson.data.length;i++){
		                		 	ecNames += objJson.data[i].vc2ecname;
		                		 	ecNameLinks += String.format("<a href=javascript:void(0) onclick=Js.Center.Business.SvcBatchUpAndDownInfo.showEcSvcManaWin('{0}','{1}')>{2}</a>",
		                		 		objJson.data[i].numecid,objJson.data[i].vc2ecid,objJson.data[i].vc2ecname);
		                		 	if(i!=objJson.data.length-1){
		                		 		ecNames += ",";
		                		 		ecNameLinks += ",";
		                		 	}
		                		 }
		                		//Ext.getCmp("Js.Center.Business.SvcBatchUpAndDownInfo.EcList").setValue(ecNames);
		                		Ext.fly("Js.Center.Business.SvcBatchUpAndDownInfo.EcList.Div").dom.innerHTML=ecNameLinks;
		                		ecListWin.show();
		                	}
		                	else{
		                		//批量替换确认
			                	Js.Center.Business.SvcBatchUpAndDownInfo.UpdateSvcBatch();
		                	}
		                }
		                setTimeout(function(){
					        Ext.MessageBox.hide();
					    }, 100);
		            },
		            failure: function() {
		            	Ext.MessageBox.hide();
		                Ext.Msg.alert("温馨提示", "系统忙，请稍候...!");
		            }
		     });
       };
       /**获取通道网关是否支持扩展子号码*/
	   function getIsSupportSubCodeBySvcId(){
	   	 if(submitPanel.getForm().findField("numsvcidnew").getValue()!=""){
	   	 	Ext.MessageBox.show({
		        msg: '正在验证是否支持子号码，请稍等...',
		        progressText: 'Search...',
		        width: 300,
		        wait: true,
		        icon: 'download',
		        animEl: 'saving'
		    });
	    	 Ext.Ajax.request({
		            url: Js.Center.Business.SvcBatchURL,
		            method: "POST",
		            params: {
		            	numsvcidnew: submitPanel.getForm().findField("numsvcidnew").getValue(),
		                flag: "getissupportsubcodebysvcid"
		            },
		            success: function(form, action) {
		                var objJson = Ext.util.JSON.decode(form.responseText);
		                var flag = objJson.success;
		                if(true == flag){
		                	var isSup = objJson.error;
		                	if(isSup == 0){
		                		Ext.fly("Js.Center.Business.SvcBatchUpAndDownInfo.IsSupDiv").dom.innerHTML = "<font color=red>提示：当前要替换的通道不支持扩展子号码！</font>"; 
		                		submitPanel.getForm().findField("isSupport").setValue("0");
		                	}
		                	else{
		                		Ext.fly("Js.Center.Business.SvcBatchUpAndDownInfo.IsSupDiv").dom.innerHTML = "<font color=green>当前要替换的通道支持扩展子号码！</font>";
		                	}
		                }
		                setTimeout(function(){
					        Ext.MessageBox.hide();
					    }, 1000);
		            },
		            failure: function() {
		            	Ext.MessageBox.hide();
		                Ext.Msg.alert("温馨提示", "系统忙，请稍候...!");
		            }
		     });
	    }
	   }
        // ============================================================================ 定义顶部查询面板
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "Js.Center.Business.SvcBatchUpAndDownInfo.servicecodeSelectPanel",
            height: 100,
            labelWidth: 100,
            needButtons: false,
            //查询调用的方法
            queryMethod: "Js.Center.Business.SvcBatchUpAndDownInfo.queryGrid",
            items:[
            	{
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
                    items: [new WXTL.Widgets.CommonForm.ComboBox({
        				//width:300,
        				xtype: "xComboBox",
                        name: "numsvcid",
                        fieldLabel: "选择通道",
                        hiddenName: "numsvcid",
                        readOnly: false,
                        allowBlank:false,
                        mode: "local",
                        displayField: "vc2svcname",
                        valueField: "numsvcid",
                        triggerAction: "all",
                        store: Js.Center.Common.ServiceCodeStore,
                        listeners:{
                        	"select":function(){
                        		submitPanel.getForm().findField("numsvcidnew").clearValue();
                        		Ext.fly("Js.Center.Business.SvcBatchUpAndDownInfo.IsSupDiv").dom.innerHTML = "";
                        		Js.Center.Business.SvcBatchUpAndDownInfo.SvcStore.reload({
                        			params:{
                            		flag: 'getsvccodebyopidandexistsvcid',
                            		numsvcid:this.getValue()
                        			}
                        		});
                        	}
                        }
        			})]
                }, {
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    //锚点布局-
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "right",
                    bodyStyle: "padding:10px 0 10px 15px",
                    items: [{
                    	xtype:"panel",
                    	html:"<a href='#' onclick=\"Ext.Msg.alert('log')\" title='查询详细日志'></a>"
                    }]
                }]
            }],
            buttons:[
	            new Ext.Button({
	                text: ' 查 询 ',
	                handler: function(){
	                	Js.Center.Business.SvcBatchUpAndDownInfo.queryGrid();
	                }
            	}),
            	new Ext.Button({
            		text:" 重 置 ",
            		handler:function(){
            			selectPanel.getForm().reset();
            			submitPanel.getForm().reset();
                        Ext.fly("Js.Center.Business.SvcBatchUpAndDownInfo.IsSupDiv").dom.innerHTML = "";
            		}
            	})
            ]
        });
        //============================================================== 定义查询按钮事件方法
        Js.Center.Business.SvcBatchUpAndDownInfo.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
				var _numsvcid = selectPanel.getForm().findField("numsvcid").getValue();
                Js.Center.Business.SvcBatchUpAndDownInfo.DownInfoStore.baseParams = {
	                numsvcid: _numsvcid,
                    flag: _downFlag
                };
                Js.Center.Business.SvcBatchUpAndDownInfo.DownInfoStore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
                Js.Center.Business.SvcBatchUpAndDownInfo.UpInfoStore.baseParams = {
	                numsvcid: _numsvcid,
                    flag: _upFlag
                };
                Js.Center.Business.SvcBatchUpAndDownInfo.UpInfoStore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                }); 
            }
        };
        //============================================================================定义主panel
        Js.Center.Business.SvcBatchUpAndDownInfo.ServicePanel = new Ext.Panel({
            id: "Js.Center.Business.SvcBatchUpAndDownInfo.servicepanel",
            frame: true, // 渲染面板
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, downGrid,upGrid,submitPanel]
        });
    };
    /**当前选择的通道组ID和名称*/
    function qenProductIDsAndProductNames(){
    	var rows = downGrid.getSelectionModel().getSelections();
		productName = "";
		productIDS = "";
		prodIdAndName = "";
		if(rows.length==0){
			return;
		}
	    for (var i = 0; i < rows.length; i++) {
	        if (rows.length == 1) {
	            productName = rows[i].data.vc2name;
	            productIDS = rows[i].data.numprodid;
	            prodIdAndName += rows[i].data.vc2name+"["+rows[i].data.numprodid+"]";
	        }
	        else {
	            if (i < (rows.length - 1)) {
	                productName = rows[i].data.vc2name + "," + productName;
	                productIDS = rows[i].data.numprodid + "," + productIDS;
	                prodIdAndName += rows[i].data.vc2name+"["+rows[i].data.numprodid+"]" + ",";
	            }
	            if (i == (rows.length - 1)) {
	                productName = productName + rows[i].data.vc2name;
	                productIDS = productIDS + rows[i].data.numprodid;
	                prodIdAndName += rows[i].data.vc2name+"["+rows[i].data.numprodid+"]";
	            }
	        }
	    };
    }
    /**当前选择的客户端ID和名称*/
    function genClientIDsAndClientNames(){
    	var rows = upGrid.getSelectionModel().getSelections();
		clientName = "";
		clientIDS = "";
		clientIdAndName = "";
		routeIds = "";
		if(rows.length==0){;
			return;
		}
	    for (var i = 0; i < rows.length; i++) {
	        if (rows.length == 1) {
	            clientName = rows[i].data.vc2clientname;
	            clientIDS = rows[i].data.numclientid;
	            clientIdAndName += rows[i].data.vc2clientname +"[" +rows[i].data.numclientid +"]";
	            routeIds += rows[i].data.numrouteid;
	        }
	        else {
	            if (i < (rows.length - 1)) {
	                clientName += rows[i].data.vc2clientname + ",";
	                clientIDS += rows[i].data.numclientid + ",";
	                clientIdAndName += rows[i].data.vc2clientname +"[" +rows[i].data.numclientid +"]"+",";
	                routeIds += rows[i].data.numrouteid + ",";
	            }
	            if (i == (rows.length - 1)) {
	                clientName += rows[i].data.vc2clientname;
	                clientIDS += rows[i].data.numclientid;
	                clientIdAndName += rows[i].data.vc2clientname +"[" +rows[i].data.numclientid +"]";
	                routeIds += rows[i].data.numrouteid;
	            }
	        }
	    };
    }
    /**批量替换确认界面*/
    Js.Center.Business.SvcBatchUpAndDownInfo.UpdateSvcBatch = function() {
		var jsonData = { numsvcid : selectPanel.getForm().findField("numsvcid").getValue(),
						 numsvcname : selectPanel.getForm().findField("numsvcid").getRawValue(),
						 numsvcidnew: submitPanel.getForm().findField("numsvcidnew").getValue(),
						 numsvcnamenew: submitPanel.getForm().findField("numsvcidnew").getRawValue(),
						 productids : productIDS,
						 clientids : clientIDS,
						 prodidandname : prodIdAndName,
						 clientidandname : clientIdAndName,
						 issupport: submitPanel.getForm().findField("isSupport").getValue(),
						 routeids : routeIds
		};
		var record = new Ext.data.Record.create([{
			name:'numsvcid',type:'string'
		},{
			name:'numsvcname',type:'string'
		},{
			name:'numsvcidnew',type:'string'
		},{
			name:'numsvcnamenew',type:'string'
		},{
			name:'productids',type:'string'
		},{
			name:'clientids',type:'string'
		},{
			name:'prodidandname',type:'string'
		},{
			name:'clientidandname',type:'string'
		},{
			name:'issupport',type:'string'
		},{
			name:'routeids',type:'string'
		}]);
		var upRecord = new record({});
		if(jsonData!=null){
			for(var i=0;i<upRecord.fields.items.length;i++){
				upRecord.set(upRecord.fields.items[i].name,jsonData[upRecord.fields.items[i].name]);
			}
		}
		Js.Center.Business.UpdateSvcBatch.window.updateRecord = upRecord;
		Js.Center.Business.UpdateSvcBatch.window.mainForm.loadRecord(upRecord);
		Js.Center.Business.UpdateSvcBatch.window.show();
	};
	
	/**ec窗口*/
	var ecListWin = new WXTL.Widgets.CommonWindows.Window({
            title: "需要手动配置EC业务的EC",
            width: 400,
            height: 300,
            autoScroll: true, // 自动显示滚动条
			frame:true,
            updateState: true,
            needLoadDataStore:false,
            needButtons: false,
            items:[{xtype:"panel",
		            width:"100%",
		            height:"100%",
		            name:"eclist",
		            id:"Js.Center.Business.SvcBatchUpAndDownInfo.EcList",
		            html:"<div id=Js.Center.Business.SvcBatchUpAndDownInfo.EcList.Div></div>"
		    }],
            buttons: [{
                text: "关  闭",
                minWidth: 70,
                handler: function(){
                	ecListWin.hide();
                }
            }]
        });
        
      Js.Center.Business.SvcBatchUpAndDownInfo.showEcSvcManaWin = function(numecid,vc2ecid){
      	var svcRecord = new Ext.data.Record.create([{
							name:'numecid',type:'string'
						},{
							name:'vc2ecid',type:'string'
						}]);
    	var row = new svcRecord({});
    	row.set("numecid",numecid);
    	row.set("vc2ecid",vc2ecid);
      	Js.Center.Business.ECservice.window.updateRecord= row;
     	Js.Center.Business.ECservice.window.show(); 
		Ext.apply(Js.Center.Business.ECservice.Infostore.baseParams,
			{ecId : numecid, flag : 'selectbykey' });
        Js.Center.Business.ECservice.Infostore.load({
			params : {
				start : 0,
				limit : 12,	
				ecId : numecid,
				flag : 'selectbykey'
			}
		});
     };
    //============================================================================绑定到center
    GridMain(node, Js.Center.Business.SvcBatchUpAndDownInfo.ServicePanel, "openroomiconinfo", "Js.Center.Business.SvcBatchUpAndDownInfo.DownInfoStore");
};