Ext.namespace('Js.Center.Business.OtherEC.OtherEcInfoDetail');
Js.Center.Business.OtherEC.OtherEcInfoDetail.func = function(row){
	if(Js.Center.Business.OtherEC.OtherEcInfoDetail.window == null){
	//=========================================== 行业
	 var IndustryCombox =new WXTL.Widgets.CommonForm.ComboBox({
	        xtype: "xComboBox",
	        name: "vc2industry",
	        hiddenName: "vc2industry",
	        emptyText: "-=请选择=-",
	        allowBlank: false,
	        blankText: "请选择行业",
	        fieldLabel: "<font color=red>行业</font>",
	        readOnly: true,
	        disabled: true,
	        mode: "local",
	        displayField: "vc2industry",
	        valueField: "vc2industry",
	        triggerAction: "all",
	        store: Js.Center.Common.IndustryStore
	    });
	 	//Js.Center.Common.IndustryStore.reload();
	    //===========================================结算地
	    var numfeeareaCombox = new WXTL.Widgets.CommonForm.ComboBox({
	        xtype: "xComboBox",
	        name: "numfeearea",
	        hiddenName: "numfeearea",
	        emptyText: "-=请选择=-",
	        allowBlank: false,
	        blankText: "请选择地区",
	        fieldLabel: "<font color=red>结算地</font>",
	        readOnly: true,
	        disabled: true,
	        mode: "local",
	        displayField: "vc2branchcompany",
	        valueField: "numbranchcompany",
	        triggerAction: "all",
	        store: Js.Center.Common.BranchCompanyStore
	    });
	    //Js.Center.Common.BranchCompanyStore.reload();
	    //===========================================商务归属地
	 var numbusareaCombox = new WXTL.Widgets.CommonForm.ComboBox({
	        xtype: "xComboBox",
	        name: "numbusarea",
	        hiddenName: "numbusarea",
	        emptyText: "-=请选择=-",
	        allowBlank: false,
	        blankText: "请选择地区",
	        fieldLabel: "<font color=red>商务归属地</font>",
	        readOnly: true,
	        disabled: true,
	        mode: "local",
	        displayField: "vc2branchcompany",
	        valueField: "numbranchcompany",
	        triggerAction: "all",
	        store: Js.Center.Common.BranchCompanyStore
	    });
	    
	    var DetailInfofp = new Ext.form.FormPanel({
	    	fileUpload : true,
	        frame: true,
	        labelWidth: 80,
	        defaults: {
	            anchor: '100%',
	            msgTarget: 'side'
	        },
	        bodyBorder: false,
	        border: false,
	        autoScroll: true,
	        items: [{
            	xtype: "hidden",
            	name: "flag",
            	value: "Insert"
        	}, {
	        layout:'column',
	    	items: [{
	                columnWidth: .5,
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
					items : [{
							xtype : "textfield",
							name : "vc2ecid",
							fieldLabel : "<font color=red>ECID</font>",
							allowBlank : false,
							blankText : "ecid不允许为空",
							disabled: true
						},{
							xtype : "textfield",
							name : "vc2ecfullname",
							fieldLabel : "<font color=red>客户全称</font>",
							allowBlank : false,
							disabled: true,
							blankText : "客户全称不允许为空"
						},{
							xtype : "textfield",
							name : "vc2shortname",
							fieldLabel : "<font color=red>客户简称</font>",
							allowBlank : false,
							disabled: true,
							blankText : "客户简称不允许为空"
						},{
							xtype: "combo",
							name : "vc2ismas",
		                    hiddenName: "vc2ismas",
		                    fieldLabel: "<font color=red>MAS客户</font>",
		                    readOnly: true,
		                    disabled: true,
		                    mode: "local",
		                    allowBlank:false,
		                    displayField: "show",
		                    valueField: "value",
		                    triggerAction: "all",
		                    emptyText: "-=请选择=-",
		                    store: new Ext.data.SimpleStore({
		                        fields: ["show", "value"],
		                        data: [["-=请选择=-", ""], ["是", "是"], ["否", "否"]]
		                    })

						},
						IndustryCombox,{
							xtype: "combo",
							name : "vc2custype",
		                    hiddenName: "vc2custype",
		                    fieldLabel: "<font color=red>客户类型</font>",
		                    readOnly: true,
		                    disabled: true,
		                    mode: "local",
		                    allowBlank:false,
		                    displayField: "show",
		                    valueField: "value",
		                    triggerAction: "all",
		                    emptyText: "-=请选择=-",
		                    store: new Ext.data.SimpleStore({
		                        fields: ["show", "value"],
		                        data: [["-=请选择=-", ""], ["渠道", "渠道"], ["直客", "直客"],["内部","内部"]]
		                    })
						},{
							xtype: "combo",
		                    name: "vc2gwtype",
		                    hiddenName: "vc2gwtype",
		                    fieldLabel: "<font color=red>短彩类型</font>",
		                    readOnly: true,
		                    disabled: true,
		                    mode: "local",
		                    displayField: "show",
		                    allowBlank:false,
		                    valueField: "value",
		                    triggerAction: "all",
		                    emptyText: "-=请选择=-",
		                    store: new Ext.data.SimpleStore({
		                        fields: ["show", "value"],
		                        data: [["-=请选择=-", ""], ["短信", "短信"], ["彩信", "彩信"]]
		                    })
						},{
							xtype: "combo",
		                    name: "vc2status",
		                    hiddenName: "vc2status",
		                    fieldLabel: "<font color=red>状态</font>",
		                    readOnly: true,
		                    disabled: true,
		                    mode: "local",
		                    displayField: "show",
		                    allowBlank:false,
		                    valueField: "value",
		                    triggerAction: "all",
		                    emptyText: "-=请选择=-",
		                    store: new Ext.data.SimpleStore({
		                        fields: ["show", "value"],
		                        data: [["-=请选择=-", ""], ["商用", "商用"], ["暂停", "暂停"]]
		                    })
						},{
							xtype: "combo",
					        name: "vc2opname",
					        hiddenName: "vc2opname",
					        emptyText: "-=请选择=-",
					        allowBlank: true,
					        disabled: true,
					        blankText: "请选择",
					        fieldLabel: "<font color=red>运营商</font>",
					        readOnly: true,
					        mode: "local",
					        displayField: "vc2name",
					        valueField: "vc2name",
					        triggerAction: "all",
					        store: Js.Center.Common.OperatorStore
						},{
							xtype : "textfield",
							name : "vc2servcode",
							fieldLabel : "<font color=red>服务号码</font>",
							allowBlank : false,
							disabled: true,
							maxLenth:20,
							blankText : "服务号码不允许为空"
						},{
							xtype : "textfield",
							name : "vc2manager",
							fieldLabel : "<font color=red>商务经理</font>",
							allowBlank : false,
							disabled: true,
							blankText : "商务经理不允许为空"
						},{
							xtype: "combo",
		                    name: "numcuslevel",
		                    hiddenName: "numcuslevel",
		                    fieldLabel: "<font color=red>客户级别</font>",
		                    readOnly: true,
		                    disabled: true,
		                    mode: "local",
		                    displayField: "show",
		                    allowBlank:false,
		                    valueField: "value",
		                    triggerAction: "all",
		                    emptyText: "-=请选择=-",
		                    store: new Ext.data.SimpleStore({
		                        fields: ["show", "value"],
		                        data: [["-=请选择=-", ""], ["1", "1"], ["2", "2"],["3","3"]]
		                    })
						},{
			            	xtype: "combo",
		                    name: "vc2feemode",
		                    hiddenName: "vc2feemode",
		                    fieldLabel: "<font color=red>计费类型</font>",
		                    readOnly: true,
		                    disabled: true,
		                    mode: "local",
		                    displayField: "show",
		                    allowBlank:false,
		                    valueField: "value",
		                    triggerAction: "all",
		                    emptyText: "-=请选择=-",
		                    store: new Ext.data.SimpleStore({
		                        fields: ["show", "value"],
		                        data: [["-=请选择=-", ""], ["预付费", "预付费"], ["后付费", "后付费"]]
		                    })
						}]
	    	},{
	    		columnWidth: .5,
	            layout: 'form',
	            defaultType: "textfield",
	            buttonAlign: "center",
	            bodyBorder: false,
	            border: false,
	            bodyStyle: "padding:10px 0 10px 15px",
	            defaults: {
                    anchor: "90%",
                    msgTarget: "side"
                },
	            items: [{
						xtype : "textfield",
						name : "vc2signname",
						fieldLabel : "<font color=red>签约主体</font>",
						allowBlank : false,
						disabled: true,
						blankText : "签约主体不允许为空"
					},{
						xtype : "textfield",
						name : "numlimit",
						fieldLabel : "<font color=red>条数限制</font>",
						allowBlank : false,
						disabled: true,
						blankText : "条数限制不允许为空"
					}, numfeeareaCombox,numbusareaCombox,
					{
						xtype : "textfield",
						name : "vc2svc",
						fieldLabel : "业务代码",
						allowBlank : true,
						disabled: true,
						blankText : "业务代码不允许为空"
					}, {
						xtype: "combo",
			            name: "vc2feetype",
			            hiddenName: "vc2feetype",
			            fieldLabel: "结算类型",
			            readOnly: true,
			            disabled: true,
			            mode: "local",
			            allowBlank:true,
			            displayField: "show",
			            valueField: "value",
			            triggerAction: "all",
			            emptyText: "-=请选择=-",
			            store: new Ext.data.SimpleStore({
			                fields: ["show", "value"],
			                data: [["-=请选择=-", ""], ["按条", "按条"], ["按套餐", "按套餐"]]
			            })
					}, {
						xtype : "textfield",
						name : "vc2feerule",
						fieldLabel : "计费规则",
						allowBlank : true,
						disabled: true,
						blankText : "计费规则不允许为空"
					}, {
						xtype : "textfield",
						name : "vc2putintime",
						fieldLabel : "接入时间",
						allowBlank : true,
						disabled: true,
						blankText : "接入时间不允许为空"
					}, {
						xtype : "textfield",
						name : "vc2gwputin",
						fieldLabel : "接入网关",
						allowBlank : true,
						disabled: true,
						blankText : "接入网关不允许为空"
					}, {
						xtype : "textfield",
						name : "vc2gwfeerule",
						fieldLabel : "网关计费规则",
						allowBlank : true,
						disabled: true,
						blankText : "网关计费规则不允许为空"
					}, {
						xtype : "textfield",
						name : "vc2subcode",
						fieldLabel : "服务子号",
						allowBlank : true,
						disabled: true,
						blankText : "服务子号不允许为空"
					}, {
						xtype : "textfield",
						name : "vc2conperson",
						fieldLabel : "联系人",
						allowBlank : true,
						disabled: true,
						blankText : "联系人不允许为空"
					}, {
						xtype : "textfield",
						name : "vc2contact",
						fieldLabel : "联系方式",
						allowBlank : true,
						disabled: true,
						blankText : "联系方式不允许为空"
					}]
	    	}]
        }]
	    });
	    var mainForm = DetailInfofp.getForm();
	    this.window = new WXTL.Widgets.CommonWindows.Window({
	        title: "其他平台客户详细信息",
	        mainForm: mainForm,
	        updateURL: Js.Center.OtherEC.OtherECURL,
	        displayStore: Js.Center.Business.OtherEC.ECInfostore,
	        items: [DetailInfofp],
	        needButtons: false,
            buttons: [{
                text: "关  闭",
                minWidth: 70,
                handler: function(){
                	Js.Center.Business.OtherEC.OtherEcInfoDetail.window.hide();
                }
            }]
	    });
	 };
};