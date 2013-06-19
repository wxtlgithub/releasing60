Ext.namespace('Js.Center.Business.ECsigntureAdd');

Js.Center.Business.ECsigntureAdd.func = function(row) {
	 if(Js.Center.Business.ECsigntureAdd.window == null){
		// ---------------------------------------------------- 定义FormPanel
			var AddtlecservicecodeInfofp = new Ext.form.FormPanel({
				width : 375,
				plain : true,
				layout : "form",
				defaultType : "textfield",
				labelWidth : 100,
				baseCls : "x-plain",
				defaults : {
					anchor : "90%",
					msgTarget : "side"
				},
				buttonAlign : "center",
				bodyStyle : "padding:0 0 0 0;margin:10 15",
				items : [{
					xtype : "hidden",
					fieldLabel:"EC编号",
					id : "Js.Center.Business.ECsigntureAdd.numecid",
					name : "numecid"
					//value:Ext.get("Js.Center.Business.ECsignture.numecid").getValue()
				},{
					xtype : "hidden",
					name : "flag",
					value:"insert"
						
				},{
		        	xtype: "xComboBox",
		            name: "numtypeid",
		            hiddenName: "numtypeid",
		            fieldLabel: "<font color=red>签名类型</font>",
		            readOnly: true,
		            mode: "local",
		            allowBlank:false,
		            displayField: "vc2typename",
		            valueField: "numtypeid",
		            triggerAction: "all",
		            emptyText: "-=请选择=-",
		            store: new Ext.data.SimpleStore({
		                fields: ["vc2typename", "numtypeid"],
		                data: [["严签名", "1"], ["宽签名", "2"]]
		            }),
		            listeners:{
		            	'select': function(combox, record, numidex){
		        			var typeId = record.data.numtypeid;
		        			if(typeId == 1){
		        				Ext.getCmp("Js.Center.Business.ECsigntureAdd.Signature").regex = /^((\[[^,【】\[\]]+\])|(【[^,【】\[\]]+】))$/;
		        				Ext.getCmp("Js.Center.Business.ECsigntureAdd.Signature").regexText = "首尾必须是成对的[]或者【】,且内容不能为空"; 
		        			}
		        			if(typeId == 2){
		        				Ext.getCmp("Js.Center.Business.ECsigntureAdd.Signature").regex = /^((\]{1})|(】{1}))$/;
		        				Ext.getCmp("Js.Center.Business.ECsigntureAdd.Signature").regexText = "只能输入一个]或一个】";
		        			}		        			
		        		}
		            }
				},{
					xtype : "textfield",
					name : "vc2signture",
					id:"Js.Center.Business.ECsigntureAdd.Signature",
					fieldLabel : "<font color=red>报备签名</font>",
					allowBlank : false,
                    blankText: "报备签名不能为空",
		            regex: /^((\[[^,【】\[\]]+\])|(【[^,【】\[\]]+】))$/,
		            regexText: "首尾必须是成对的[]或者【】,且内容不能为空",
		            maxLength: 20,
					maxLengthText:'长度不能超过20'
				}]
			});

			// ---------------------------------------------------- 定义窗体
			var mainForm = AddtlecservicecodeInfofp.getForm();
			this.window = new WXTL.Widgets.CommonWindows.Window({
				width: 410,
				title : "添加报备签名",
		        updateState: true,
		        mainForm : mainForm,
		        updateURL: Js.Center.Business.ECmanage.ECSigntureURL,
		        displayStore: Js.Center.Business.ECsignture.Infostore,
				items : [ AddtlecservicecodeInfofp ],
				needLoadDataStore: true,
				loadDataStoreFunc: function(){
					Ext.getCmp("Js.Center.Business.ECsigntureAdd.numecid").setValue(Ext.get("Js.Center.Business.ECsignture.numecid").getValue());
					
				}
			});
	 }
	
};
