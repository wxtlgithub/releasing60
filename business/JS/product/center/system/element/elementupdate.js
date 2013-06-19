Ext.namespace('Js.Center.System.ElementUpdate');
Js.Center.System.ElementUpdate.func = function(){
    // ================================================================== 定义FormPanel
    var updateElementInfofp = new Ext.form.FormPanel({
        frame: true,
        labelWidth: 80,
        defaults: {
            anchor: "100%",
            msgTarget: "side"
        },
        items: [new Ext.form.FieldSet({
				            title: '网元配置基本信息',
							collapsible: false,
							autoHeight: true,
							style: Ext.isIE ? 'padding:5px 0 0 10px;' : 'padding:0 0 0 10px;',
							layout: 'column',
			                items: [{
				                columnWidth: .5,
				                layout: 'form',
				                defaults: {
				                    anchor: "90%",
				                    msgTarget: "side"
				                },
				                buttonAlign: "center",
				                bodyStyle: "padding:10px 0 10px 15px",
					            items: [{
					            		xtype: "hidden",
                						name: "flag",
                						value: "updateelement"
                					},{
				                    xtype: "numberfield",
				                    name: "numnodeid",
				                    fieldLabel: "<font color=red>网元ID</font>",
				                    allowBlank: false,
				                    blankText: "网元ID不允许为空",
									minValue:1,
									maxValue:99,
									readOnly:true,
									minText:"网元ID不能小于1",
									maxText:"网元ID不能大于99"
				                },{
				                   	xtype:"textfield",
				                	name:"numdistriport",
				                	fieldLabel:"<font color=red>分布式端口</font>",
				                	allowBlank:false,
				                	blankText:"分布式端口不许为空",
				                	regex: WXTL.Common.regex.Integer,
                        			regexText: "只能输入数字",
				                	maxLength:10,
				                	maxLengthText:"不能超过10位"
				                },{
				                	xtype:"textfield",
				                	name:"numtomcatport",
				                	fieldLabel:"<font color=red>Tomcat端口</font>",
				                	allowBlank:false,
				                	blankText:"Tomcat端口不许为空",
				                	regex: WXTL.Common.regex.Integer,
                        			regexText: "只能输入数字",
				                	maxLength:10,
				                	maxLengthText:"不能超过10位"
				                },{				                   	
				                	xtype:"textfield",
				                	name:"vc2projname",
				                	fieldLabel:"<font color=red>网元项目名称</font>",
				                	allowBlank:false,
				                	blankText:"网元项目名称不能为空",
				                	regex: WXTL.Common.regex.Illegal,
                        			regexText: WXTL.Common.regexText.IllegalText,
                        			maxLength: 50
                        		}]
			                },{
				                columnWidth: .5,
				                layout: 'form',
				                defaults: {
				                    anchor: "90%",
				                    msgTarget: "side"
				                },
				                buttonAlign: "center",
				                bodyStyle: "padding:10px 0 10px 15px",
					            items: [{
				                	xtype:"textfield",
				                	name:"vc2nodename",
				                	fieldLabel:"<font color=red>网元名称</font>",
				                	allowBlank:false,
				                	blankText:"网元名称不许为空",
				                	maxLength:50,
				                	maxLengthText:"网元名称不能超过50"
				                },{
				                	xtype:"textfield",
				                	name:"vc2nodeip",
				                	fieldLabel:"<font color=red>主机IP</font>",
				                	allowBlank:false,
				                	blankText:"主机IP不许为空",
				                	regex: WXTL.Common.regex.IP,
                        			regexText: "只能输入IP"
				                },{
				                	xtype: "combo",
			                        name: "numstatus",
			                        hiddenName:"numstatus",
			                        fieldLabel: "<font color=red>是否启用</font>",
			                        allowBlank: false,
			                        blankText: "是否启用为必选",
			                        readOnly: true,
			                        mode: "local",
			                        displayField: "show",
			                        valueField: "value",
			                        triggerAction: "all",
			                        value: "0",
			                        store: new Ext.data.SimpleStore({
			                            fields: ["show", "value"],
			                            data: [["是", "1"], ["否", "0"]]
			                        })
				                }]
			                }]
			            })]
    });
    
    // ======================================================================= 定义窗体
    var mainForm = updateElementInfofp.getForm();
    this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "修改网元分布式配置",
        mainForm: mainForm,
        updateURL: Js.Center.System.ElementURL,
        displayStore: Js.Center.System.Element.Infostore,
        items: [updateElementInfofp],
        needButtons:false,
        buttons: [new Ext.Button({
            text: '确定',
            minWidth: 70,
            handler: function(){
                if (updateElementInfofp.getForm().isValid()) {
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
                    Js.Center.System.ElementUpdate.window.mainFormSubmitFunc();
                }
            }
        }), new Ext.Button({
            text: '重置',
            minWidth: 70,
            qtip: "重置数据",
            handler: function(){                
                updateElementInfofp.getForm().reset();
                if (Js.Center.System.ElementUpdate.window.updateState && Js.Center.System.ElementUpdate.window.updateRecord != null){ 
                    Js.Center.System.ElementUpdate.window.mainForm.loadRecord(Js.Center.System.ElementUpdate.window.updateRecord);
                }
            }
        }), new Ext.Button({
            text: '取消',
            minWidth: 70,
            handler: function(){
                Js.Center.System.ElementUpdate.window.hide();
            }
        })]
    });
    

};