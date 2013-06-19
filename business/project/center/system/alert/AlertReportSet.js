/*
 * Report失败率报警设置
 */
Ext.namespace('Js.Center.Alert.AlertReportSet');
Js.Center.Alert.AlertReportSet.func = function(row){
	//===================定义FormPanel
	if(Js.Center.Alert.AlertReportSet.window == null){
		var mainFormPanel = new Ext.form.FormPanel({
			frame: true,
	        labelWidth: 110,
	        layout: 'form',
	        //defaultType: "textfield",
	        //锚点布局-
	        defaults: {
	            anchor: "98%",
	            msgTarget: "title"
	        },
	        buttonAlign: "right",
	        bodyStyle: "padding:10px 0 10px 15px",
	        items:[{
	        	xtype:'hidden',
	        	name:'flag',
	        	value:'updatereportalert'
	        },{
	        	layout:'column',
	        	items:[{
	        		columnWidth: .176,
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
	        		columnWidth: .04,
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
	                	html:'<div style="height:23px; line-height:25px;">最近  </div>'	
	                }]
	        	},{
	        		columnWidth: .06,
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
	    	        	name:'ReportRule_duration',
	    	        	//hidden:true
	    	        	hideLabel:true,
	    	        	minValue:0,
	    	        	maxValue:9999,
	    	        	autoCreate: {tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '4'} 
	                }]
	        	},{
	        		columnWidth: .21,
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
	                	html:'<div style="height:23px; line-height:25px;">分钟内Report失败率超过  </div>'
	                }]
	        	},{
	        		columnWidth: .055,
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
	    	        	name:'ReportRule_failurerate',
	    	        	//hidden:true
	    	        	hideLabel:true,
	    	        	minValue:0,
	    	        	maxValue:100,
	    	        	autoCreate: {tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '3'} 
	                }]
	        	},{
	        		columnWidth: .17,
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
	                	html:'<div style="height:23px; line-height:25px;">%且累计发送量超过  </div>'
	                }]
	        	},{
	        		columnWidth: .18,
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
	    	        	name:'ReportRule_sendvolume',
	    	        	//hidden:true
	    	        	hideLabel:true,
	    	        	minValue:0,
	    	        	maxLength:15,
	    	        	autoCreate: {tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '15'} 
	                }]
	        	},{
	        		columnWidth: .09,
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
	                	html:'<div style="height:23px; line-height:25px;">条时报警  </div>'
	                }]
	        	}]
	        },{
//	        	html:'<font color=red>报警规则: </font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最近 <input type="text" name="ReportRule_duration"  size="4" />分钟内Report失败率超过<input type="text" name="ReportRule_failurerate"  size="4" />，且累计发送量超过<input type="text" name="ReportRule_sendvolume"  size="4" />条时报警.'
//	        },{
	        	xtype:'checkboxgroup',
	        	fieldLabel: "<font color=red>报警方式</font>",
	        	anchor:'50%',
	        	items:[{
	        		boxLabel:'短信',
	        		name:'ReportRule_mode',
	        		inputValue :'1'
	        	},{
	        		boxLabel:'邮件',
	        		name:'ReportRule_mode',
	        		inputValue :'2'
	        	},{
	        		hidden:true,
	        		boxLabel:'默认值',
	        		name:'ReportRule_mode',
	        		checked:true,
	        		inputValue :''
	        	}]
	        },{
	        	xtype:'combo',
	        	name: "ReportRule_times",
	        	fieldLabel: "<font color=red>连续报警次数</font>",
	            hiddenName: "ReportRule_times",
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
	        	name: "ReportRule_interval",
	        	fieldLabel: "<font color=red>两次报警时间间隔</font>",
	            hiddenName: "ReportRule_interval",
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
	        	name:'ReportRule_message',
	        	fieldLabel: getHelpMsg("报警格式", true, "报警格式描述：<br>{0} 当前时间 <br>{1} 报警时间段<br> {2}report失败率，超过此值报警 <br>{3}累计发送量 <br>{4}网关名称 "),//"<font color=red>报警格式</font>",
	        	//readOnly: true,
	        	value:"截止{0}，{1}分钟内 Report失败率超过{2}％，且累计发送量超过{3}条的网关有：{4}"
	        }]
		});
		// ======================================================================= 定义窗体
	    var mainForm = mainFormPanel.getForm();
	    this.window = new WXTL.Widgets.CommonWindows.Window({
	        title: "Report失败率报警设置",
	        width:720,
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
                        Js.Center.Alert.AlertReportSet.window.mainFormSubmitFunc();
                        
                    }
                }
            }), new Ext.Button({
                text: '重置',
                minWidth: 70,
                qtip: "重置数据",
                handler: function(obj){
                    mainForm.reset();
                    mainForm.loadRecord(Js.Center.Alert.AlertReportSet.window.updateRecord);
                    
                    if(Js.Center.Alert.AlertReportSet.window.updateRecord.data.ReportRule_mode != null){
                    	mainFormPanel.findByType("checkboxgroup")[0].setValue(Js.Center.Alert.AlertReportSet.window.updateRecord.data.ReportRule_mode.split(','));
                    }
                    else{
                    	mainFormPanel.findByType("checkboxgroup")[0].setValue('1');
                    }
                }
            }), new Ext.Button({
                text: '取消',
                minWidth: 70,
                handler: function(){
            		Js.Center.Alert.AlertReportSet.window.hide();
                }
            })]
	    });
	};
	//Js.Center.Alert.AlertReportSet.window.show();
};