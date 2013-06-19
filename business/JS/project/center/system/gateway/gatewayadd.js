Ext.namespace('Js.Center.Business.GatewayAdd');
Ext.QuickTips.init();

Js.Center.Business.GatewayAdd.func = function(){
	Js.Center.Common.GatewayTypeStore.reload();
	
    if (Js.Center.Business.GatewayAdd.window == null) {
    	var busareaCombox = new Ext.form.ComboBox({
            xtype: "xComboBox",
            name: "numbusarea",
            hiddenName: "numbusarea",
            id: 'Js.Center.Business.GatewayAdd.NumBusArea',
            emptyText: "-=请选择=-",
            allowBlank: false,
            blankText: "请选商务归属",
            fieldLabel: "<font color=red>请选商务归属</font>",
            readOnly: true,
            mode: "local",
            displayField: "vc2branchcompany",
            valueField: "numbranchcompany",
            triggerAction: "all",
            store:Js.Center.Common.BranchCompanyStore
        });
        // ================================================================ 定义FormPanel
        var AddgatewayInfofp = new Ext.form.FormPanel({
            //title:"添加网关",
            //id: "AddgatewayInfofp",
            frame: true,
            labelWidth: 110,
            items: [{
                
                items: [{
                    xtype: "hidden",
                    name: "flag",
                    value: "insert"
                }, {
                	layout:'column',
                	items:[{
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
                    items: [{
                        xtype: "textfield",
                        name: "numgwid",
                        fieldLabel: "<font color=red>网关编号</font>",
                        allowBlank: false,
                        blankText: "网关编号不允许为空,且只能输入数字",
                        regex: WXTL.Common.regex.Integer,
                        regexText: "网关编号不允许为空,且只能输入数字",
                        maxLength: 10
                    }, {
                        xtype: "textfield",
                        name: "vc2gatewayname",
                        fieldLabel: "<font color=red>网关名称</font>",
                        allowBlank: false,
                        blankText: "网关名称不允许为空",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 50
                    }, {
                        xtype: "textfield",
                        name: "vc2spnum",
                        fieldLabel: "<font color=red>网关号码</font>",
                        allowBlank: false,
                        blankText: "网关号码不允许为空",
                        regex: /^\d+$/,
                        regexText: "长号码必须为20个以内的数字",
                        maxLength: 20
                    }, {
                        xtype: "textfield",
                        name: "vc2gwip",
                        fieldLabel: "<font color=red>网关地址IP</font>",
                        allowBlank: false,
                        blankText: "网关地址IP不允许为空",
                        regex: WXTL.Common.regex.IP,
                        regexText: '网关地址IP格式不正确',
                        maxLength: 50
                    },{
                        xtype: "textfield",
                        name: "vc2moip",
                        fieldLabel: "<font color=red>网关MOIP</font>",
                        allowBlank: false,
                        blankText: "网关MOIP不允许为空",
                        regex: WXTL.Common.regex.IP,
                        regexText: '网关MOIP格式不正确',
                        maxLength: 50
                    }, {
                        xtype: "textfield",
                        name: "vc2gwusername",
                        fieldLabel: "<font color=red>登录用户</font>",
                        allowBlank: false,
                        blankText: "登录用户不允许为空",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 50
                    }, {
                        xtype: "textfield",
                        name: "vc2spid",
                        fieldLabel: "<font color=red>企业编码</font>",
                        allowBlank: false,
                        blankText: "企业编码不允许为空",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 50
                    }, {
                        xtype: "textfield",
                        name: "vc2speed",
                        fieldLabel: "<font color=red>流速控制</font>",
                        allowBlank: false,
                        blankText: "流速控制不允许为空",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 50
                    }, {
	                	xtype: "lovcombo",
	                    name: "vc2level",
	                    fieldLabel: "网关等级",
	                    hiddenName: "vc2level",
	                    readOnly: true,
	                    mode: "local",
	                    displayField: "show",
	                    valueField: "value",
	                    ableCheckField: "ck",
	                    checkField:"unchecked",
	                    triggerAction: "all",
	                    emptyText: "-=请选择=-",
	                    store: new Ext.data.SimpleStore({
	                        fields: ["show", "value", "ck"],
	                        data: [["行业信息", "", "0"], ["HY-1", "HY-1","1"], ["HY-2", "HY-2","1"], ["HY-3", "HY-3","1"], ["HY-4", "HY-4","1"], ["HY-5", "HY-5","1"], ["营销信息", "", "0"], ["YX-1", "YX-1","1"], ["YX-2", "YX-2","1"], ["YX-3", "YX-3","1"], ["YX-4", "YX-4","1"], ["YX-5", "YX-5","1"]]
	                    }),
	                    //重写初始化方法
					    initComponent:function() {
							if(!this.tpl) {
								this.tpl = 
									 '<tpl for="."><div class="x-combo-list-item">' 
									+'<tpl if="values.' + this.ableCheckField + ' != 0">'
									+'<img src="' + Ext.BLANK_IMAGE_URL + '" '
									+'class="ux-lovcombo-icon ux-lovcombo-icon-'
									+'{[values.' + this.checkField + '?"checked":"unchecked"' + ']}">'
									+'</tpl>'
									+'<div class="ux-lovcombo-item-text">{' + (this.displayField || 'text' )+ '}</div>'
									+'</div></tpl>';
							}
					 
					        Ext.ux.form.LovCombo.superclass.initComponent.apply(this, arguments);

					        this.on({
								 scope:this
								,beforequery:this.onBeforeQuery
								,blur:this.onRealBlur
							});
					
							this.onLoad = this.onLoad.createSequence(function() {
								if(this.el) {
									var v = this.el.dom.value;
									this.el.dom.value = '';
									this.el.dom.value = v;
								}
							});
					    },
	                	onSelect:function(record, index) {
	                        if(this.fireEvent('beforeselect', this, record, index) !== false){
	                        	if(record.data["value"]){
									record.set(this.checkField, !record.get(this.checkField));
								if(this.store.isFiltered()) {
									this.doQuery(this.allQuery);
								}
								this.setValue(this.getCheckedValue());
					            this.fireEvent('select', this, record, index);
	                        	}
	                        }
	                	}
	                }]
                }, {
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
                    items: [{
                        xtype: "combo",
                        name: "vc2type",
                        fieldLabel: "<font color=red>网关类型</font>",
                        hiddenName: "vc2type",
                        allowBlank: false,
                        blankText: "网关类型不允许为空",
                        readOnly: true,
                        mode: "local",
                        displayField: "show",
                        valueField: "value",
                        triggerAction: "all",
                        value: "1",
                        store: new Ext.data.SimpleStore({
                            fields: ["show", "value"],
                            data: [["短信", "1"], ["彩信", "2"], ["WAP", "3"], ["短信PV", "4"], ["彩信PV", "5"], ["wapPV", "6"]]
                        })
                    }, {
                        xtype: "combo",
                        name: "numopid",
                        fieldLabel: "<font color=red>运营商</font>",
                        hiddenName: "numopid",
                        allowBlank: false,
                        blankText: "运营商不允许为空",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2name",
                        valueField: "numopid",
                        triggerAction: "all",
                        emptyText: "-=请选择=-",
                        store: Js.Center.Common.OperatorStore
                    }, {
                        xtype: "combo",
                        name: "numinstid",
                        fieldLabel: "<font color=red>覆盖范围</font>",
                        hiddenName: "numinstid",
                        allowBlank: false,
                        blankText: "覆盖范围不允许为空",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2name",
                        valueField: "numinstid",
                        triggerAction: "all",
                        emptyText: "-=请选择=-",
                        store: Js.Center.Common.InstStore
                    },{
                        xtype: "textfield",
                        name: "vc2gwport",
                        fieldLabel: "<font color=red>网关端口</font>",
                        allowBlank: false,
                        blankText: "网关端口不允许为空",
                        //regex: WXTL.Common.regex.IPPORT,
                        //regexText: '网关端口格式不正确',
                        maxLength: 50
                    },{
                        xtype: "textfield",
                        name: "vc2moport",
                        fieldLabel: "<font color=red>网关MO端口</font>",
                        allowBlank: false,
                        blankText: "网关MO端口不允许为空",
                        //regex: WXTL.Common.regex.IPPORT,
                        //regexText: '网关MO端口格式不正确',
                        maxLength: 50
                    }, {
                        xtype: "textfield",
                        name: "vc2gwpassword",
                        fieldLabel: "<font color=red>登录密码</font>",
                        inputType:'password',
                        allowBlank: false,
                        blankText: "登录密码不允许为空",
                        //regex: WXTL.Common.regex.Illegal,
                        //regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 50
                    },{
                        id: "Js.Center.Business.GatewayAdd.PactType",
                        xtype: "combo",
                        name: "numgwtypeid",
                        fieldLabel: "<font color=red>协议类型</font>",
                        hiddenName: "numgwtypeid",
                        allowBlank: false,
                        blankText: "协议类型不允许为空",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2gwtypename",
                        valueField: "numgwtypeid",
                        triggerAction: "all",
                        emptyText: "-=请选择=-",
                        store: Js.Center.Common.GatewayTypeStore
//                        new Ext.data.SimpleStore({
//                            fields: ["show", "value"],
//                            data: [["cmpp20", "1"], ["cmpp30", "2"], ["sgip", "3"], ["smgp", "4"], ["mm7", "5"]]
//                        })
                    }, {
                        xtype: "textfield",
                        name: "numgroupmembermax",
                        fieldLabel: "<font color=red>批次手机号码数量</font>",
                        allowBlank: false,
                        blankText: "批次手机号码数量不允许为空",
                        regex: WXTL.Common.regex.Double,
                    	regexText: "请输入数值!",
                    	maxLength: 9,
                    	maxLengthText: '长度不能超过9！'
                    },{
                        xtype: "numberfield",
                        name: "numgrouplimit",
                        fieldLabel: "<font color=red>网关限制发送量</font>",
                        allowBlank: false,
                        blankText: "批次手机号码数量",
                        minValue: 1,
                        value:0,
                        maxValue:1000
                    }]
                },{
                	columnWidth: 1,
                    layout: 'form',
                    defaultType: "textfield",
                    //锚点布局-
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:0 0 0 15px",
                    items:[{
                    	xtype : "panel",
						html : "<HR align=left color=#B6D3EE SIZE=1 noShade>"
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
                    bodyStyle: "padding:10px 0 10px 15px",
                    items: [new Ext.form.DateField({
                        fieldLabel: '接入时间',
                        name: 'datinput',
                        id: 'Js.Center.Business.GatewayAdd.DatInput',
                        readOnly: true,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),//+ new Date().getTime()
                        format: 'Y-m-d',
                        validateOnBlur: false
                    }),busareaCombox,
	                    {
	                    	xtype: "combo",
	                        name: "numlongflag",
	                        fieldLabel: "<font color=red>长短信</font>",
	                        hiddenName: "numlongflag",
	                        allowBlank: false,
	                        blankText: "长短信不允许为空",
	                        readOnly: true,
	                        mode: "local",
	                        displayField: "show",
	                        valueField: "value",
	                        triggerAction: "all",
	                        value: "1",
	                        store: new Ext.data.SimpleStore({
	                            fields: ["show", "value"],
	                            data: [["是", "1"], ["否", "0"]]
	                        })
	                    }, 
	                    {
	                        xtype: "combo",
	                        name: "numpftype",
	                        fieldLabel: "<font color=red>统辅</font>",
	                        hiddenName: "numpftype",
	                        allowBlank: false,
	                        blankText: "统辅不允许为空",
	                        readOnly: true,
	                        mode: "local",
	                        displayField: "show",
	                        valueField: "value",
	                        triggerAction: "all",
	                        value: "1",
	                        store: new Ext.data.SimpleStore({
	                            fields: ["show", "value"],
	                            data: [["统付", "1"], ["辅通道", "2"]]
	                        })
	                    },
	                    {
	                        xtype: "combo",
	                        name: "numshare",
	                        fieldLabel: "<font color=red>共享/独享</font>",
	                        hiddenName: "numshare",
	                        allowBlank: false,
	                        blankText: "统辅不允许为空",
	                        readOnly: true,
	                        mode: "local",
	                        displayField: "show",
	                        valueField: "value",
	                        triggerAction: "all",
	                        value: "1",
	                        store: new Ext.data.SimpleStore({
	                            fields: ["show", "value"],
	                            data: [["共享", "1"], ["独享", "0"]]
	                        })
	                    }]
                }, {
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
                    items: [{
                        xtype: "textfield",
                        name: "numbw",
                        fieldLabel: "<font color=red>带宽</font>",
                        allowBlank: false,
                        blankText: "带宽不允许为空",
                        regex: WXTL.Common.regex.Double,
                		regexText: "请输入数值",
                		maxLength: 9,
                		maxLengthText: '长度不能超过9！'
                    }, {
                        xtype: "combo",
                        name: "numext",
                        fieldLabel: "<font color=red>扩展</font>",
                        hiddenName: "numext",
                        allowBlank: false,
                        blankText: "扩展不允许为空",
                        readOnly: true,
                        mode: "local",
                        displayField: "show",
                        valueField: "value",
                        triggerAction: "all",
                        value: "1",
                        store: new Ext.data.SimpleStore({
                            fields: ["show", "value"],
                            data: [["支持", "1"], ["不支持", "0"]]
                        })
                    }, {
                        xtype: "combo",
                        name: "numblackflag",
                        fieldLabel: "<font color=red>黑白名单</font>",
                        hiddenName: "numblackflag",
                        allowBlank: false,
                        blankText: "黑白名单不允许为空",
                        readOnly: true,
                        mode: "local",
                        displayField: "show",
                        valueField: "value",
                        triggerAction: "all",
                        value: "1",
                        store: new Ext.data.SimpleStore({
                            fields: ["show", "value"],
                            data: [["白名单", "1"], ["黑名单", "2"]]
                        })
                    }, new Ext.form.ComboBox({
			            xtype: "xComboBox",
			            name: "numarea",
			            hiddenName: "numarea",
			            emptyText: "-=请选择=-",
			            allowBlank: false,
			            blankText: "请选网关所属地",
			            fieldLabel: "<font color=red>网关所属地</font>",
			            readOnly: true,
			            mode: "local",
			            displayField: "vc2name",
			            valueField: "numinstid",
			            triggerAction: "all",
			            store:Js.Center.Common.GatewayAreaStore
			        }),  {				         	
                        xtype: "combo",
                        name: "numstatus",
                        fieldLabel: "<font color=red>状态</font>",
                        hiddenName: "numstatus",
                        allowBlank: false,
                        blankText: "状态不允许为空",
                        readOnly: true,
                        mode: "local",
                        displayField: "show",
                        valueField: "value",
                        triggerAction: "all",
                        value: "1",
                        store: new Ext.data.SimpleStore({
                            fields: ["show", "value"],
                            data: [["启用", "1"], ["禁用", "0"]]
                        })
                    }]
                }]
                }, {	    			
		    		columnWidth: 1,
		            layout: 'form',
		            defaultType: "textfield",
		            buttonAlign: "center",
		            bodyBorder: false,
		            border: false,
		            bodyStyle: "padding:0px 0 10px 15px",
		            defaults: {
		                anchor: "90%",
		                msgTarget: "side"
		            },
					items : [ {                    	
							name : "vc2oapic",
							id: 'Js.Center.Business.GatewayAdd.vc2oapic',
							xtype : 'fileuploadfield',
							style : 'border: 1px solid #C0C0C0;height:22;cursor:hand',
							fieldLabel : getHelpMsg("OA批示截图", true,
									"1、文件格式为jpg/gif/png/bmp等图片"),
							allowBlank : true,
							blankText : "请选择上传文件",
							width : 380,
							validator : function() {
								var filePath = Ext.getCmp("Js.Center.Business.GatewayAdd.vc2oapic").getValue();
								var fileTypeArr1 = new Array();
								fileTypeArr1[0] = "jpg";
								fileTypeArr1[1] = "gif";
								fileTypeArr1[2] = "png";
								fileTypeArr1[3] = "bmp";
								var fileTypeArrDesc1 = "jpg,gif,png,bmp";
								if (filePath != '') {
									if (checkFileWithTypeArr(filePath,fileTypeArr1,fileTypeArrDesc1) != '') {
										this.invalidText = checkFileWithTypeArr(filePath,fileTypeArr1,fileTypeArrDesc1);
										return false;
									} else {
										return true;
									}
								} else
									return false;
							}
	                    } ]
	    		}
                ]
            }]
        });
        // ======================================================================= 定义窗体
        var mainForm = AddgatewayInfofp.getForm();
        this.window = new WXTL.Widgets.CommonWindows.Window({
            title: "添加网关",
            mainForm: mainForm,
            updateURL: Js.Center.Business.GatewayUpdateURL,
            displayStore: Js.Center.Business.Gateway.Infostore,
            items: [AddgatewayInfofp],
            needLoadDataStore: true,
            loadDataStoreFunc: function(){
            	Js.Center.Common.BranchCompanyStore.reload();
            },
            needButtons: false,
            buttons: [new Ext.Button({
                text: '确定',
                minWidth: 70,
                handler: function(){
                    if (Js.Center.Business.GatewayAdd.window.mainForm.isValid()) {
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
                        Js.Center.Business.GatewayAdd.window.mainForm.submit({
                            url: Js.Center.Business.GatewayAdd.window.updateURL,
                            method: "POST",
                            success: function(form, action){
                                var objJson = Ext.util.JSON.decode(action.response.responseText);
                                var falg = objJson.success;
                                if (falg == true) {
                                    Ext.Msg.alert("温馨提示", "操作成功了!");
                                    Js.Center.Business.GatewayAdd.window.hide();
                                    Js.Center.Business.GatewayAdd.window.displayStore.reload();
                                }
                                else 
                                    Ext.Msg.alert('温馨提示', objJson.info);
                            },
                            failure: function(form, action){
                                var objJson = Ext.util.JSON.decode(action.response.responseText);
                                Ext.Msg.alert('温馨提示', objJson.info);
                            }
                        });
                        
                    }
                }
            }), new Ext.Button({
                text: '重置',
                minWidth: 70,
                qtip: "重置数据",
                handler: function(){
                    Js.Center.Business.GatewayAdd.window.mainForm.reset();
                }
            }), new Ext.Button({
                text: '取消',
                minWidth: 70,
                handler: function(){
                    Js.Center.Business.GatewayAdd.window.hide();
                }
            })]
        });
    }
    //Js.Center.Business.GatewayAdd.AddgatewayInfoWin.mainForm.reset();	

    // ================================================================== 执行显示


};
