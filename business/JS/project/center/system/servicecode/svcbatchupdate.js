Ext.namespace('Js.Center.Business.UpdateSvcBatch');
Js.Center.Business.UpdateSvcBatch.func = function() {
   if(Js.Center.Business.UpdateSvcBatch.window==null){
	   //============================================================================定义FormPanel
	   var svcBatchPanel = new Ext.form.FormPanel({
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
	           	value: "svcbatchupdate"
	       },{//通道ID
	           	xtype: "hidden",
	           	name: "numsvcid"
	       },{//通道组IDS
	           	xtype: "hidden",
	           	name: "productids"
	       },{//替换的通道ID
	       		xtype:"hidden",
	       		name: "numsvcidnew"
	       },{//客户端IDS
	       		xtype:"hidden",
	       		name: "clientids"
	       },{//新通道是否支持扩展子号码 0 为不支持
	       	   	xtype: "hidden",
	           	name:"issupport"
	       },{
	       		xtype:"hidden",
				name :"routeids"
	       },{
		        layout:'column',
		    	items: [{
		                columnWidth: .99,
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
		                items: [{
		                    xtype: "textfield",
		                    name: "numsvcname",
		                    fieldLabel: "通道名称",
		    		        disabled: true
		        		},{
		                    xtype: "textfield",
		                    name: "numsvcnamenew",
		                    fieldLabel: "替换通道",
		    		        disabled: true
		        		},{
		        			xtype:"textarea",
		        			name : "prodidandname",
		        			fieldLabel:"选择的通道组",
		        			height: 100,
		        			disabled: true
		        		},{
                        	xtype : "textarea",
                        	name: "clientidandname",
                        	fieldLabel:"选择的客户端",
		 					height:100,
		 					disabled: true
                        },{
                        	xtype:"textarea",
                        	name : "remark",
                        	fieldLabel:"<font color=red>备注</font>",
                        	minLength:20,
                        	maxLength:200,
                        	allowBlank:false,
                        	height:100
                        }]
		    	}]
	        }]
	   });
	   //执行批量替换
	   function exeUpdateSvcBatch(){
		    Js.Center.Business.UpdateSvcBatch.window.mainFormSubmitFunc();	   	
		   	Ext.MessageBox.show({
		        msg: '正在保存，请稍等...',
		        progressText: 'Saving...',
		        width: 300,
		        wait: true,
		        icon: 'download',
		        animEl: 'saving'
		    });
		    setTimeout(function(){
		        Ext.MessageBox.hide();    
		    }, 300000);
	   }
        //============================================================================ 定义窗
		var mainForm = svcBatchPanel.getForm();
        this.window = new WXTL.Widgets.CommonWindows.Window({
            title: "通道批量替换",
            width: 700,
            height: 470,
            autoScroll: true, // 自动显示滚动条
			frame:true,
            mainForm:mainForm,
            updateState: true,
            needLoadDataStore:false,
            updateURL: Js.Center.Business.SvcBatchURL,
            displayStore:Js.Center.Business.SvcBatchUpAndDownInfo.DownInfoStore,
            items: [svcBatchPanel],
            needButtons: false,
	        buttons: [new Ext.Button({
	            text: '确定',
	            minWidth: 70,
	            handler: function(){
	                if (svcBatchPanel.getForm().isValid()) {
	                	Ext.Msg.confirm("批量替换提示！","您确定要批量替换当前选择的通道吗?",
						function(btn) {
							if (btn == "yes") {
								exeUpdateSvcBatch();
							}
						})
	                }
				}
	       	}),
	        new Ext.Button({
	            text: '取消',
	            minWidth: 70,
	            handler: function(){
	                Js.Center.Business.UpdateSvcBatch.window.hide();
	            }
	        })]
        });
	}
};
