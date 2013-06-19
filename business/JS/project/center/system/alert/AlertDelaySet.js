/*
 * 延时报警设置
 */
Ext.namespace('Js.Center.Alert.AlertDelaySet');
Js.Center.Alert.AlertDelaySet.func = function(row){
	//===================定义FormPanel
	if(Js.Center.Alert.AlertDelaySet.window == null){
		var mainFormPanel = new Ext.form.FormPanel({
			frame: true,
	        labelWidth: 110,
	        layout: 'form',
	        //defaultType: "textfield",
	        //锚点布局-
	        defaults: {
	            anchor: "90%",
                msgTarget: "title"
	        },
	        buttonAlign: "right",
	        bodyStyle: "padding:10px 0 10px 15px",
	        items:[{
	        	xtype:'hidden',
	        	name:'flag',
	        	value:'updatedelayalert'
	        },{
	        	layout:'column',
	        	items:[{
	        		columnWidth: .21,
	                layout: 'form',
	                //defaultType: "textfield",
	                //锚点布局-
	                defaults: {
	                    anchor: "60%",
	                    msgTarget: "title"
	                },
	                buttonAlign: "center",
	                //bodyStyle: "padding:10px 0 5px 15px",
	                items:[{
	                	xtype:'numberfield',
	    	        	//name:'GatewayStateRule_duration',
	    	        	fieldLabel: "<font color=red>报警规则</font>",
	    	        	hidden:true
	                }]
	        	},{
	        		columnWidth: .05,
	                layout: 'form',
	                //defaultType: "textfield",
	                //锚点布局-
	                defaults: {
	                    anchor: "99%",
	                    msgTarget: "title"
	                },
	                buttonAlign: "center",
	                //bodyStyle: "padding:10px 0 5px 15px",
	                items:[{
	                	//html:'<font color=red>报警规则</font>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;连续 '
	                	html:'<div style="height:23px; line-height:25px;">最近 </div>'	
	                }]
	        	},{
	        		columnWidth: .1,
	                layout: 'form',
	                //defaultType: "textfield",
	                //锚点布局-
	                defaults: {
	                    anchor: "99%",
	                    msgTarget: "title"
	                },
	                buttonAlign: "center",
	                //bodyStyle: "padding:10px 0 5px 15px",
	                items:[{
	                	xtype:'numberfield',
	    	        	name:'SendTimelagRule_duration',
	    	        	//hidden:true
	    	        	hideLabel:true,
	    	        	minValue:0,
	    	        	maxValue:9999,
	    	        	autoCreate: {tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '4'} 
	                }]
	        	},{
	        		columnWidth: .25,
	                layout: 'form',
	                //defaultType: "textfield",
	                //锚点布局-
	                defaults: {
	                    anchor: "99%",
	                    msgTarget: "title"
	                },
	                //buttonAlign: "center",
	                //bodyStyle: "padding:10px 0 5px 15px",
	                items:[{
	                	html:'<div style="height:23px; line-height:25px;">分钟内平均处理延时超过 </div>'
	                }]
	        	},{
	        		columnWidth: .1,
	                layout: 'form',
	                //defaultType: "textfield",
	                //锚点布局-
	                defaults: {
	                    anchor: "99%",
	                    msgTarget: "title"
	                },
	                buttonAlign: "center",
	                //bodyStyle: "padding:10px 0 5px 15px",
	                items:[{
	                	xtype:'numberfield',
	    	        	name:'SendTimelagRule_timelagduration',
	    	        	//hidden:true
	    	        	hideLabel:true,
	    	        	minValue:0,
	    	        	maxValue:9999,
	    	        	autoCreate: {tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '4'} 
	                }]
	        	},{
	        		columnWidth: .2,
	                layout: 'form',
	                //defaultType: "textfield",
	                //锚点布局-
	                defaults: {
	                    anchor: "99%",
	                    msgTarget: "title"
	                },
	                //buttonAlign: "center",
	                //bodyStyle: "padding:10px 0 5px 15px",
	                items:[{
	                	html:'<div style="height:23px; line-height:25px;">分钟时报警 </div>'
	                }]
	        	}]
	        },{
//	        	html:'<font color=red>报警规则: </font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最近 <input type="text" name="SendTimelagRule_duration"  size="4" />分钟内平均处理延时超过<input type="text" name="SendTimelagRule_timelagduration"  size="4" />分钟时报警.'
//	        },{
	        	xtype:'checkboxgroup',
	        	fieldLabel: "<font color=red>报警方式</font>",
	        	anchor:'50%',
	        	items:[{
	        		boxLabel:'短信',
	        		name:'SendTimelagRule_mode',
	        		inputValue :'1'
	        	},{
	        		boxLabel:'邮件',
	        		name:'SendTimelagRule_mode',
	        		inputValue :'2'
	        	},{
	        		hidden:true,
	        		boxLabel:'默认值',
	        		name:'SendTimelagRule_mode',
	        		checked:true,
	        		inputValue :''
	        	}]
	        },{
	        	xtype:'combo',
	        	name: "SendTimelagRule_times",
	        	fieldLabel: "<font color=red>连续报警次数</font>",
	            hiddenName: "SendTimelagRule_times",
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
	        	name: "SendTimelagRule_interval",
	        	fieldLabel: "<font color=red>两次报警时间间隔</font>",
	            hiddenName: "SendTimelagRule_interval",
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
	        	name:'SendTimelagRule_message',
	        	fieldLabel: getHelpMsg("报警格式", true, "报警格式描述：<br>{0} 当前时间<br> {1} 报警时间段<br> {2}延时超过时间<br> {3}网关名称"),//"<font color=red>报警格式</font>",
	        	//readOnly: true,
	        	value:"截止{0}，{1}分钟内平均延时处理超过{2}分钟的网关有：{3}",
                regex: WXTL.Common.regex.Illegal,
                regexText: WXTL.Common.regexText.IllegalText,
                maxLength: 100
	        }]
		});
		// ======================================================================= 定义窗体
	    var mainForm = mainFormPanel.getForm();
	    this.window = new WXTL.Widgets.CommonWindows.Window({
	        title: "延时报警设置",
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
                        Js.Center.Alert.AlertDelaySet.window.mainFormSubmitFunc();
                        
                    }
                }
            }), new Ext.Button({
                text: '重置',
                minWidth: 70,
                qtip: "重置数据",
                handler: function(obj){
                    mainForm.reset();
                    mainForm.loadRecord(Js.Center.Alert.AlertDelaySet.window.updateRecord);
                    if(Js.Center.Alert.AlertDelaySet.window.updateRecord.data.SendTimelagRule_mode != null){
                    	mainFormPanel.findByType("checkboxgroup")[0].setValue(Js.Center.Alert.AlertDelaySet.window.updateRecord.data.SendTimelagRule_mode.split(','));
                    }
                    else{
                    	mainFormPanel.findByType("checkboxgroup")[0].setValue('1');
                    }
                    
                    
                }
            }), new Ext.Button({
                text: '取消',
                minWidth: 70,
                handler: function(){
            		Js.Center.Alert.AlertDelaySet.window.hide();
                }
            })]
	    });
	};
	//Js.Center.Alert.AlertDelaySet.window.show();
};