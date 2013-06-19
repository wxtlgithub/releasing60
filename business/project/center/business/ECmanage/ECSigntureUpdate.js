Ext.namespace('Js.Center.Business.ECsigntureUpdate');

Js.Center.Business.ECsigntureUpdate.func = function(row) {
	 if(Js.Center.Business.ECsigntureUpdate.window == null){
		// ---------------------------------------------------- 定义FormPanel
			var UpdatetlecservicecodeInfofp = new Ext.form.FormPanel({
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
					fieldLabel:"签名编号",
					//id : "Js.Center.Business.ECsigntureUpdate.numid",
					name : "numid"
				},{
					xtype : "hidden",
					fieldLabel:"EC编号",
					//id : "Js.Center.Business.ECsigntureUpdate.numecid",
					name : "numecid"
				},{
					xtype : "hidden",
					name : "flag",
					value:"update"
						
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
		        				Ext.getCmp("Js.Center.Business.ECsigntureUpdate.Signature").regex = /^((\[[^,【】\[\]]+\])|(【[^,【】\[\]]+】))$/ ;
		        				Ext.getCmp("Js.Center.Business.ECsigntureUpdate.Signature").regexText = "首尾必须是成对的[]或者【】,且内容不能为空"; 
		        			}
		        			if(typeId == 2){
		        				Ext.getCmp("Js.Center.Business.ECsigntureUpdate.Signature").regex = /^((\]{1})|(】{1}))$/;
		        				Ext.getCmp("Js.Center.Business.ECsigntureUpdate.Signature").regexText = "只能输入一个]或一个】";
		        			}		        			
		        		}
		            }
				},{
					xtype : "textfield",
					name : "vc2signture",
					id:'Js.Center.Business.ECsigntureUpdate.Signature',
					fieldLabel : "<font color=red>报备签名</font>",
					allowBlank : false,
                    blankText: "报备签名不能为空",
					//regex: /^((\[[^,【】\[\]]+\])|(【[^,【】\[\]]+】))$/,
		            //regexText: "首尾必须是成对的[]或者【】,且内容不能为空",
		            maxLength: 20,
					maxLengthText:'长度不能超过20'
				}]
			});

			// ---------------------------------------------------- 定义窗体
			var mainForm = UpdatetlecservicecodeInfofp.getForm();
			this.window = new WXTL.Widgets.CommonWindows.Window({
				width: 400,
				title : "修改报备签名",
		        updateState: true,
		        mainForm : mainForm,
		        updateURL: Js.Center.Business.ECmanage.ECSigntureURL,
		        displayStore: Js.Center.Business.ECsignture.Infostore,
				items : [ UpdatetlecservicecodeInfofp ],
				needLoadDataStore: true,
				loadDataStoreFunc: function(){
					var typeId = Js.Center.Business.ECsigntureUpdate.window.updateRecord.get("numtypeid");
					if(typeId == 1){
        				Ext.getCmp("Js.Center.Business.ECsigntureUpdate.Signature").regex = /^((\[[^,【】\[\]]+\])|(【[^,【】\[\]]+】))$/ ; ///^[^,\x22][^,'\x22]*$/;
        				Ext.getCmp("Js.Center.Business.ECsigntureUpdate.Signature").regexText = "首尾必须是成对的[]或者【】,且内容不能为空"; 
        			}
        			if(typeId == 2){
        				Ext.getCmp("Js.Center.Business.ECsigntureUpdate.Signature").regex = /^((\]{1})|(】{1}))$/;
        				Ext.getCmp("Js.Center.Business.ECsigntureUpdate.Signature").regexText = "只能输入一个]或一个】";
        			}
        			Ext.getCmp("Js.Center.Business.ECsigntureUpdate.Signature").focus();
				}
			});
	 }
	
};
