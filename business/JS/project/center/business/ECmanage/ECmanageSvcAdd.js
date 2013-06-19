Ext.namespace('Js.Center.Business.ECserviceAdd');

Js.Center.Business.ECserviceAdd.func = function(row) {
	 var opidCombox = new WXTL.Widgets.CommonForm.ComboBox({
	        xtype: "xComboBox",
	        name: "numopid",
	        hiddenName: "numopid",
	        emptyText: "-=请选择=-",
	        allowBlank: false,
	        blankText: "请选择",
	        fieldLabel: "<font color=red>运营商</font>",
	        //readOnly: true,
	        mode: "local",
	        displayField: "vc2name",
	        valueField: "numopid",
	        triggerAction: "all",
	        store: Js.Center.Common.OperatorStore,
            listeners: {
                "select": function(){
                    Ext.getCmp('Js.Center.Business.ECserviceAdd.numsvcid').setValue('');
                    Js.Center.Common.ServiceCodeByOPIDStore.reload({
                        params: {
                            numopid: this.getValue(),
                            flag: 'queryservicecodebyopid'
                        }
                    })
                }
                
            }
	    });
	    Js.Center.Common.OperatorStore.reload();
		var svcidCombox ={
				xtype : "xComboBox",
				name : "numsvcid",
				id:'Js.Center.Business.ECserviceAdd.numsvcid',
				hiddenName : "numsvcid",
				emptyText : "-=请先选择运营商=-",
				valueNotFoundText: '-=请先选择运营商=-',
				allowBlank : false,
				blankText : "-=请先选择运营商=-",
				fieldLabel : "<font color=red>运营商业务</font>",
			    //readOnly : true,
				mode : "local",
				displayField : "vc2svcname",
				valueField : "numsvcid",
				triggerAction : "all",
				isNeedDefaultChoose : false,//是否显示-=请选择=-
				store : Js.Center.Common.ServiceCodeByOPIDStore
			};

		 	var signCombox = new WXTL.Widgets.CommonForm.ComboBox({
		        xtype: "xComboBox",
		        name: "numsign",
		        hiddenName: "numsign",
		        emptyText: "-=请选择=-",
		        allowBlank: false,
		        blankText: "请选择",
		        fieldLabel: "<font color=red>签约主体编号</font>",
		        readOnly: true,
		        mode: "local",
		        displayField: "vc2sign",
		        valueField: "numsign",
		        triggerAction: "all",
		        store: Js.Center.Common.SignStore
		    });
		 	Js.Center.Common.SignStore.reload();
	 	//===========================================分公司地区
		 var AreaCombox = new WXTL.Widgets.CommonForm.ComboBox({
		        xtype: "xComboBox",
		        name: "numfeearea",
		        hiddenName: "numfeearea",
		        emptyText: "-=请选择=-",
		        allowBlank: false,
		        blankText: "请选择地区",
		        fieldLabel: "<font color=red>结算地</font>",
		        readOnly: true,
		        mode: "local",
		        displayField: "vc2branchcompany",
		        valueField: "numbranchcompany",
		        triggerAction: "all",
		        store: Js.Center.Common.BranchCompanyStore
		    });
		    Js.Center.Common.BranchCompanyStore.reload();
	// ---------------------------------------------------- 定义FormPanel
	var AddtlecservicecodeInfofp = new Ext.form.FormPanel({
		width : 375,
		plain : true,
		layout : "form",
		defaultType : "textfield",
		labelWidth : 100,
		baseCls : "x-plain",
		defaults : {
			anchor : "95%",
			msgTarget : "side"
		},
		buttonAlign : "center",
		bodyStyle : "padding:0 0 0 0;margin:10 15",
		items : [{
			xtype : "hidden",
			name : "numseqid"
		},{
			xtype : "hidden",
			id : "Js.Center.Business.ECserviceAdd.numecid",
			name : "numecid"
		},{
			xtype : "hidden",
			id : "Js.Center.Business.ECserviceAdd.vc2ecid",
			name : "vc2ecid"
		},{
			xtype : "hidden",
			id : "Js.Center.Business.ECserviceAdd.flag",
			name : "flag"
		},opidCombox,svcidCombox, 
		{
        	xtype: "hidden",
            name: "numstatus",
            hiddenName: "numstatus",
            value : 1
		}, {
			xtype : "textfield",
			name : "numsubcode",
            id : "Js.Center.Business.ECserviceAdd.numsubcode",
			fieldLabel : "建议子号码",
			allowBlank : true,
            regex: /^\d+$/,
            regexText: "建议子号码只能输入数字",
            maxLength: 10,
			maxLengthText:'长度不能超过10'
		}, {
            xtype: "checkboxgroup",
            name : "vc2inputtype",
            allowBlank : false,
            blankText : '请选择接入方式',
            id : "Js.Center.Business.ECserviceAdd.inputtype",
            fieldLabel: "<font color=red>接入方式</font>",
            frame:true,
            items: [{
                boxLabel: '页面',
                name: "vc2inputtype",
                inputValue: '1'
            }, {
                boxLabel: '接口',
                name: "vc2inputtype",
                inputValue: '2'
            }],
            listeners:{ 
            }
        }, {
			xtype : "textfield",
			name : "vc2cusip",
			fieldLabel : "客户IP",
            blankText: "客户IP不允许为空",
            regex: WXTL.Common.regex.IP,
            regexText: '客户IP格式不正确',
            maxLength: 15,
			maxLengthText:'长度不能超过15'
		}, {
        	xtype: "combo",
            name: "vc2feetype",
            hiddenName: "vc2feetype",
            fieldLabel: "<font color=red>计费方式</font>",
            readOnly: true,
            mode: "local",
            allowBlank:false,
            displayField: "show",
            valueField: "value",
            triggerAction: "all",
            emptyText: "-=请选择=-",
            store: new Ext.data.SimpleStore({
                fields: ["show", "value"],
                data: [["-=请选择=-", ""], ["按条", "1"], ["按套餐", "2"],["按产品","3"]]
            })
		}, 
		signCombox,
		AreaCombox
		,{
			xtype : "textarea",
			name : "vc2confeerule",
			fieldLabel : "计费规则",
            regex: WXTL.Common.regex.Illegal,
            regexText: WXTL.Common.regexText.IllegalText,
            maxLength: 500,
			maxLengthText:'长度不能超过500'
		}]
	});

	// ---------------------------------------------------- 定义窗体
	var mainForm = AddtlecservicecodeInfofp.getForm();
	this.window = new WXTL.Widgets.CommonWindows.Window({
		width: 400,
				title : "添加业务",
	            updateState: true,
	            mainForm : mainForm,
	            updateURL: Js.Center.Business.ECmanage.ECsvcInfoURL,
	            displayStore: Js.Center.Business.ECservice.Infostore,
				items : [ AddtlecservicecodeInfofp ],
				needLoadDataStore: true,
				loadDataStoreFunc: function(){
					Ext.getCmp("Js.Center.Business.ECserviceAdd.numecid").setValue(Ext.getCmp("Js.Center.Business.ECservice.numecid").getValue());
					Ext.getCmp("Js.Center.Business.ECserviceAdd.vc2ecid").setValue(Ext.getCmp("Js.Center.Business.ECservice.vc2ecid").getValue());
				},
				needButtons:false,
				buttons : [{
					text : "确定",
					minWidth : 70,
					handler : function() {
						var flag = "insert";
						if(Js.Center.Business.ECserviceAdd.updateRecord && Js.Center.Business.ECserviceAdd.updateRecord.data.numseqid){
							flag = "update";
						}
						Ext.getCmp("Js.Center.Business.ECserviceAdd.flag").setValue(flag);
						if (AddtlecservicecodeInfofp.getForm().isValid()) {
							// 弹出效果
							Ext.MessageBox.show({
								msg : '正在保存，请稍等...',
								progressText : 'Saving...',
								width : 300,
								wait : true,
								waitConfig : {
									interval : 200
								},
								icon : 'download',
								animEl : 'saving'										
							});
							setTimeout(function() {
								Ext.MessageBox.hide();
							}, 1000);
							AddtlecservicecodeInfofp.form.submit({
								url : Js.Center.Business.ECmanage.ECsvcInfoURL,
								method : "POST",
								success : function() {
									if(flag == "insert"){
										Ext.Msg.alert("恭喜您","添加成功了!");
									} else {
										Ext.Msg.alert("恭喜您","修改成功了!");
									}
									Js.Center.Business.ECserviceAdd.window.hide();
									Js.Center.Business.ECservice.Infostore.reload();
								},
								failure : function() {
									if(flag == "insert"){
										Ext.Msg.alert("恭喜您","添加失败了!");
									} else {
										Ext.Msg.alert("恭喜您","修改失败了!");
									}
								}
							});
						}
					}
				}, {
					text : "重置",
					minWidth : 70,
					qtip : "重置数据",
					handler : function() {
						if(Js.Center.Business.ECserviceAdd.updateRecord && Js.Center.Business.ECserviceAdd.updateRecord.data.numseqid){
							Js.Center.Business.ECserviceAdd.window.mainForm.loadRecord(Js.Center.Business.ECserviceAdd.updateRecord);
							var inputtype = Js.Center.Business.ECserviceAdd.updateRecord.data.vc2inputtype.split(",");
							Ext.getCmp("Js.Center.Business.ECserviceAdd.inputtype").items.items[0].setValue(false);
							Ext.getCmp("Js.Center.Business.ECserviceAdd.inputtype").items.items[1].setValue(false);
							for(i = 0; i< inputtype.length; i++){
								if(inputtype[i] == 1){
									Ext.getCmp("Js.Center.Business.ECserviceAdd.inputtype").items.items[0].setValue(true);
								} else if(inputtype[i] == 2){
									Ext.getCmp("Js.Center.Business.ECserviceAdd.inputtype").items.items[1].setValue(true);
								}
							}
						} else{
							AddtlecservicecodeInfofp.getForm().reset();
							Ext.getCmp("Js.Center.Business.ECserviceAdd.numecid").setValue(Ext.getCmp("Js.Center.Business.ECservice.numecid").getValue());
							Ext.getCmp("Js.Center.Business.ECserviceAdd.vc2ecid").setValue(Ext.getCmp("Js.Center.Business.ECservice.vc2ecid").getValue());
						}
					}
				}, {
					text : "取 消",
					minWidth : 70,
					handler : function() {
						Js.Center.Business.ECserviceAdd.window.hide();
					}
				}]
			});
};
