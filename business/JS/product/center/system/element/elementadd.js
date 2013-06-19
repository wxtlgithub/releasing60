Ext.namespace('Js.Center.System.ElementAdd');

Js.Center.System.ElementAdd.func = function(){
    // ================================================================== 定义FormPanel
    var addElementInfofp = new Ext.form.FormPanel({
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
							//defaultType: 'textfield',
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
                						value: "addelement"
                					},{
				                    xtype: "numberfield",
				                    name: "numnodeid",
				                    fieldLabel: "<font color=red>网元ID</font>",
				                    allowBlank: false,
				                    blankText: "网元ID不允许为空",
									minValue:1,
									maxValue:99,
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
				                	xtype: "combo",
			                        name: "numnodetype",
			                        hiddenName:"numnodetype",
			                        fieldLabel: "<font color=red>网元类型</font>",
			                        allowBlank: false,
			                        blankText: "网元为必选",
			                        readOnly: true,
			                        mode: "local",
			                        displayField: "show",
			                        valueField: "value",
			                        triggerAction: "all",
			                        value: "1",
			                        store: new Ext.data.SimpleStore({
			                            fields: ["show", "value"],
			                            data: [["网关网元","1"],["接口网元", "2"], ["主控网元", "3"]]
			                        })
				                },{
									xtype: "combo",
			                        name: "numindustry",
			                        hiddenName:"numindustry",
			                        fieldLabel: "<font color=red>网元所属业务</font>",
			                        allowBlank: false,
			                        blankText: "网元所属业务为必选",
			                        readOnly: true,
			                        mode: "local",
			                        displayField: "show",
			                        valueField: "value",
			                        triggerAction: "all",
			                        value: "1",
			                        store: new Ext.data.SimpleStore({
			                            fields: ["show", "value"],
			                            data: [["行业", "1"], ["渠道", "2"]]
			                        })
				                },{
				                   	xtype:"textfield",
				                	name:"strnodename",
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
				                	name:"numsocketport",
				                	fieldLabel:"Socket端口",
				                	allowBlank:true,
                        			regex: WXTL.Common.regex.Integer,
                        			regexText: "只能输入数字",
                        			maxLength: 10,
                        			maxLengthText:"不能超过10"
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
			                        name: "numismain",
			                        hiddenName:"numismain",
			                        fieldLabel: "<font color=red>是否为主控</font>",
			                        allowBlank: false,
			                        blankText: "是否主控为必选",
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
			            }),
			             new Ext.form.FieldSet({
				            title: '网关配置基本信息',
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
				                bodyStyle: "padding:0 0 10px 15px",
					            items: [{
					            	xtype: "numberfield",
				                    name: "numstart",
				                    fieldLabel: "<font color=red>起始编号</font>",
				                    allowBlank: false,
				                    blankText: "起始编号不允许为空",
									minValue:1,
									maxValue:99,
									minText:"起始编号不能小于1",
									maxText:"起始编号不能大于99"
					            },{
					            	xtype: "numberfield",
				                    name: "cbip10sms",
				                    fieldLabel: "CBIP10短信",
				                    allowBlank: true,
									minValue:1,
									maxValue:100,
									minText:"数量不能小于1",
									maxText:"数量不能大于100"
					            },{
					            	xtype: "numberfield",
				                    name: "cbip20sms",
				                    fieldLabel: "CBIP20短信",
				                    allowBlank: true,
									minValue:1,
									maxValue:100,
									minText:"数量不能小于1",
									maxText:"数量不能大于100"
					            },{
					            	xtype: "numberfield",
				                    name: "cmpp20",
				                    fieldLabel: "CMPP20",
				                    allowBlank: true,
									minValue:1,
									maxValue:100,
									minText:"数量不能小于1",
									maxText:"数量不能大于100"
					            },{
					            	xtype: "numberfield",
				                    name: "sgip",
				                    fieldLabel: "SGIP",
				                    allowBlank: true,
									minValue:1,
									maxValue:100,
									minText:"数量不能小于1",
									maxText:"数量不能大于100"
					            },{
					            	xtype: "numberfield",
				                    name: "csa",
				                    fieldLabel: "CSA",
				                    allowBlank: true,
									minValue:1,
									maxValue:100,
									minText:"数量不能小于1",
									maxText:"数量不能大于100"
					            },{
					            	xtype: "numberfield",
				                    name: "smgpmms",
				                    fieldLabel: "电信彩信网关",
				                    allowBlank: true,
									minValue:1,
									maxValue:100,
									minText:"数量不能小于1",
									maxText:"数量不能大于100"
					            }]
			                },{
				                columnWidth: .5,
				                layout: 'form',
				                defaults: {
				                    anchor: "90%",
				                    msgTarget: "side"
				                },
				                buttonAlign: "center",
				                bodyStyle: "padding:0 0 10px 15px",
					            items: [{
					            	xtype: "panel",
				                    html:"（网关填入数量，根据起始编号自动增长）",
				                    height:22
					            },{
					            	xtype: "numberfield",
				                    name: "cbip10mms",
				                    fieldLabel: "CBIP10彩信",
				                    allowBlank: true,
									minValue:1,
									maxValue:100,
									minText:"数量不能小于1",
									maxText:"数量不能大于100"
					            },{
					            	xtype: "numberfield",
				                    name: "cbip20mms",
				                    fieldLabel: "CBIP20彩信",
				                    allowBlank: true,
									minValue:1,
									maxValue:100,
									minText:"数量不能小于1",
									maxText:"数量不能大于100"
					            },{
					            	xtype: "numberfield",
				                    name: "cmpp30",
				                    fieldLabel: "CMPP30",
				                    allowBlank: true,
									minValue:1,
									maxValue:100,
									minText:"数量不能小于1",
									maxText:"数量不能大于100"
					            },{
					            	xtype: "numberfield",
				                    name: "smgp",
				                    fieldLabel: "SMGP",
				                    allowBlank: true,
									minValue:1,
									maxValue:100,
									minText:"数量不能小于1",
									maxText:"数量不能大于100"
					            },{
					            	xtype: "numberfield",
				                    name: "mm7",
				                    fieldLabel: "MM7彩信",
				                    allowBlank: true,
									minValue:1,
									maxValue:100,
									minText:"数量不能小于1",
									maxText:"数量不能大于100"
					            }]
			                }]
			            })
			            ]
    });
    
    // ======================================================================= 定义窗体
    var mainForm = addElementInfofp.getForm();
    this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "添加网元分布式配置",
        mainForm: mainForm,
        updateURL: Js.Center.System.ElementURL,
        displayStore: Js.Center.System.Element.Infostore,
        items: [addElementInfofp],
        needButtons:false,
        buttons: [new Ext.Button({
            text: '确定',
            minWidth: 70,
            handler: function(){
                if (addElementInfofp.getForm().isValid()) {
                	/*
                	addElementInfofp.getForm().items.each(function(item){
                		if(item.isXType("textfield")){
                			if(item.getValue()=="数量"){
                				item.setValue("0");
                			}
                		}
                	});
                	*/
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
                    Js.Center.System.ElementAdd.window.mainFormSubmitFunc();
                }
            }
        }), new Ext.Button({
            text: '重置',
            minWidth: 70,
            qtip: "重置数据",
            handler: function(){                
                addElementInfofp.getForm().reset();
            }
        }), new Ext.Button({
            text: '取消',
            minWidth: 70,
            handler: function(){
                Js.Center.System.ElementAdd.window.hide();
            }
        })]
    });
    
};