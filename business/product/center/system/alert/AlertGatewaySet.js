/*
 * 网关监控报警设置
 */
Ext.namespace('Js.Center.Alert.AlertGatewaySet');
Js.Center.Alert.AlertGatewaySet.func = function(row){
	//===================定义FormPanel
	if(Js.Center.Alert.AlertGatewaySet.window == null){
		var mainFormPanel = new Ext.form.FormPanel({
			frame: true,
	        labelWidth: 110,
	        layout: 'form',
	        //defaultType: "textfield",
	        //锚点布局-
	        defaults: {
	            anchor: "90%",
	            msgTarget: "under"
	        },
	        buttonAlign: "right",
	        bodyStyle: "padding:10px 0 10px 15px",
	        items:[{
	        	xtype:'hidden',
	        	name:'flag',
	        	value:'updategwalert'
	        },{
	        	layout:'column',
	        	items:[{
	        		columnWidth: .21,
	                layout: 'form',
	                //锚点布局-
	                defaults: {
	                    anchor: "60%",
	                    msgTarget: "under"
	                },
	                buttonAlign: "center",
	                items:[{
	                	xtype:'numberfield',
	    	        	fieldLabel: "<font color=red>报警规则</font>",
	    	        	hidden:true
	                }]
	        	},{
	        		columnWidth: .05,
	                layout: 'form',
	                //锚点布局-
	                defaults: {
	                    anchor: "90%",
	                    msgTarget: "under"
	                },
	                buttonAlign: "center",
	                items:[{
	                	html:'<div style="height:23px; line-height:25px;">连续 </div>'	
	                }]
	        	},{
	        		columnWidth: .1,
	                layout: 'form',
	                //锚点布局-
	                defaults: {
	                    anchor: "90%",
	                    msgTarget: "title"
	                },
	                buttonAlign: "center",
	                items:[{
	                	xtype:'numberfield',
	    	        	name:'GatewayStateRule_duration',
	    	        	//hidden:true
	    	        	hideLabel:true,
	    	        	minValue:0,
	    	        	maxValue:9999,
	    	        	autoCreate: {tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '4'} 
	                }]
	        	},{
	        		columnWidth: .64,
	                layout: 'form',
	                //锚点布局-
	                defaults: {
	                    anchor: "90%",
	                    msgTarget: "under"
	                },
	                items:[{
	                	html:'<div style="height:23px; line-height:25px;">分钟断开时报警 </div>'
	                }]
	        	}]
	        },{
//	        	html:'<font color=red>报警规则</font>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;连续 <input type="text" name="GatewayStateRule_duration"  size="4" maxlength="5" class="cxt_border" />分钟断开时报警'
//	        },{
	        	xtype:'checkboxgroup',
	        	fieldLabel: "<font color=red>报警方式</font>",
	        	name:'GatewayStateRule_mode',
	        	anchor:'50%',
	        	items:[{
	        		boxLabel:'短信',
	        		name:'GatewayStateRule_mode',
	        		inputValue :'1'
	        	},{
	        		boxLabel:'邮件',
	        		name:'GatewayStateRule_mode',
	        		inputValue :'2'
	        	},{
	        		hidden:true,
	        		boxLabel:'默认值',
	        		name:'GatewayStateRule_mode',
	        		checked:true,
	        		inputValue :''
	        	}]
	        },{
	        	xtype:'combo',
	        	name: "GatewayStateRule_times",
	        	fieldLabel: "<font color=red>连续报警次数</font>",
	            hiddenName: "GatewayStateRule_times",
	            anchor:'35%',
	            allowBlank: false,
	            blankText: "连续报警次数",
	            readOnly: true,
	            mode: "local",
	            displayField: "show",
	            valueField: "value",
	            triggerAction: "all",
	            emptyText: "-=请选择=-",
	            store:  new Ext.data.SimpleStore({
	                fields: ["show", "value"],
	                data: [["1次", "1"], ["2次", "2"], ["3次", "3"]]
	            })
	        },{
	        	xtype:'combo',
	        	name: "GatewayStateRule_interval",
	        	fieldLabel: "<font color=red>两次报警时间间隔</font>",
	            hiddenName: "GatewayStateRule_interval",
	            anchor:'35%',
	            allowBlank: false,
	            blankText: "两次报警时间间隔",
	            readOnly: true,
	            mode: "local",
	            displayField: "show",
	            valueField: "value",
	            triggerAction: "all",
	            emptyText: "-=请选择=-",
	            store:  new Ext.data.SimpleStore({
	                fields: ["show", "value"],
	                data: [["5分钟", "5"], ["10分钟", "10"], ["15分钟", "15"], ["30分钟", "30"], ["1小时", "60"]]
	            })
	        },{
	        	xtype:'textarea',
	        	name:'GatewayStateRule_message',
	        	fieldLabel: getHelpMsg("报警格式", true, "报警格式描述：<br>{0} 当前时间 <br>{1} 报警时间段 <br>{2} 网关名称 "),//"<font color=red>报警格式</font>",
	        	//readOnly: true,
	        	value:"截止{0}，连续{1}分钟处于断开状态的网关有：{2}",
                regex: WXTL.Common.regex.Illegal,
                regexText: WXTL.Common.regexText.IllegalText,
                maxLength: 100
	        }]
		});
		// ======================================================================= 定义窗体
	    var mainForm = mainFormPanel.getForm();
	    this.window = new WXTL.Widgets.CommonWindows.Window({
	        title: "网关报警设置",
	        mainForm: mainForm,
	        updateURL: Js.Center.Alert.AlertUpdateURL,
	        updateState: true,
	        updateRecord:row,
	        displayStore: null,
	        items: [mainFormPanel],
	        needButtons:false,
	        buttons:[new Ext.Button({
                text: '确定',
                minWidth: 70,
                handler: function(){
                    if (mainForm.isValid()) {
                        // 弹出效果
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
                        Js.Center.Alert.AlertGatewaySet.window.mainFormSubmitFunc();
                        
                    }
                }
            }), new Ext.Button({
                text: '重置',
                minWidth: 70,
                qtip: "重置数据",
                handler: function(obj){
                    mainForm.reset();
                    mainForm.loadRecord( Js.Center.Alert.AlertGatewaySet.window.updateRecord );
                    
                    if(Js.Center.Alert.AlertGatewaySet.window.updateRecord.data.GatewayStateRule_mode != null){
                    	mainFormPanel.findByType("checkboxgroup")[0].setValue(Js.Center.Alert.AlertGatewaySet.window.updateRecord.data.GatewayStateRule_mode.split(','));
                    }
                    else{
                    	mainFormPanel.findByType("checkboxgroup")[0].setValue('1');
                    }
                }
            }), new Ext.Button({
                text: '取消',
                minWidth: 70,
                handler: function(){
            		Js.Center.Alert.AlertGatewaySet.window.hide();
                }
            })]
	    });
	};
	//Js.Center.Alert.AlertGatewaySet.window.show();
	
};
