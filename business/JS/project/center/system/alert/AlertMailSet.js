/*
 * 报警邮件设置
 */
Ext.namespace('Js.Center.Alert.AlertMailSet');
Js.Center.Alert.AlertMailSet.func = function(row){
	//===================定义FormPanel
	if(Js.Center.Alert.AlertMailSet.window == null){
		var mainFormPanel = new Ext.form.FormPanel({
			frame: true,
	        labelWidth: 110,
	        items:[{
	        	layout: 'column',
	        	items:[{
		        	xtype:'hidden',
		        	name:'flag',
		        	value:'updatealertmailset'
		        },{
	        		columnWidth: .5,
	                layout: 'form',
	                defaultType: "textfield",
	                //锚点布局-
	                defaults: {
	                    anchor: "90%",
	                    msgTarget: "side"
	                },
	                buttonAlign: "center",
	                bodyStyle: "padding:10px 0 5px 15px",
	                items:[{
	                	xtype:'textfield',
	    	        	name:'8001_sender',
	    	        	fieldLabel:'<font color=red>发送人邮件地址</font>',
	    	        	allowBlank: false,
                        blankText: "发送人邮件地址不允许为空",
                        regex: WXTL.Common.regex.Email,
                        regexText: "请输入正确的邮件地址",
                        maxLength: 50
	                },{
	                	xtype:'textfield',
	    	        	name:'8001_user',
	    	        	fieldLabel:'<font color=red>用户名</font>',
	    	        	allowBlank: false,
                        blankText: "用户名不允许为空",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 50
	                }]
	        	},{
	        		columnWidth: .5,
	                layout: 'form',
	                defaultType: "textfield",
	                //锚点布局-
	                defaults: {
	                    anchor: "90%",
	                    msgTarget: "side"
	                },
	                buttonAlign: "center",
	                bodyStyle: "padding:10px 0 5px 15px",
	                items:[{
	                	xtype:'textfield',
	    	        	name:'8001_server',
	    	        	fieldLabel:'<font color=red>发送服务器</font>',
	    	        	allowBlank: false,
                        blankText: "发送服务器不允许为空",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 100
	                },{
	                	xtype:'textfield',
	    	        	name:'8001_password',
	    	        	fieldLabel:'<font color=red>密码</font>',
	    	        	inputType:'password',
	    	        	allowBlank: false,
                        blankText: "密码不允许为空",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 20
	                }]
	        	},{
	        		columnWidth: 1,
	                layout: 'form',
	                defaultType: "textfield",
	                //锚点布局-
	                defaults: {
	                    anchor: "95%",
	                    msgTarget: "side"
	                },
	                buttonAlign: "center",
	                bodyStyle: "padding:0px 0 10px 15px",
	                items:[{
	    	        	xtype:'textfield',
	    	        	name:'8001_subject',
	    	        	fieldLabel:'默认邮件主题',
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText,
	                    maxLength: 100
	    	        },{
	    	        	xtype:'textarea',
	    	        	name:'8001_receiverlist',
	    	        	fieldLabel: getHelpMsg("接收预警信息的邮件地址", true, "1、每行一个邮件地址，以回车换行<br>2、最多可输入10行<br>3、示例：<br>admin@ihandy.cn<br>user@ihandy.cn"),
	                    width: 300,
	                    height: 200,
	    	        	allowBlank: false,
	                    blankText: "请输入邮件列表",
	                    maxLength: 200,
	                    maxLengthText: "请将输入内容总长度控制在200以内！",
	                    validator: function(value){
	                        return checkMailList(value, 10);
	                    }
	    	        }]
	        	}]
	        }]
		});
		// ======================================================================= 定义窗体
	    var mainForm = mainFormPanel.getForm();
	    this.window = new WXTL.Widgets.CommonWindows.Window({
	        title: "邮件设置",
	        mainForm: mainForm,
	        updateURL: Js.Center.Alert.AlertUpdateURL,
	        updateState: true,
	        updateRecord:row,
	        displayStore: null,
	        items: [mainFormPanel]
	    });
	};
	//Js.Center.Alert.AlertMailSet.window.show();
};