Ext.namespace('Js.Center.Business.OtherEC.OtherEcUpdate');
Js.Center.Business.OtherEC.OtherEcUpdate.func = function(row){
	if(Js.Center.Business.OtherEC.OtherEcUpdate.window == null){
	 	Js.Center.Common.IndustryStore.reload();
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
	        mode: "local",
	        displayField: "vc2branchcompany",
	        valueField: "numbranchcompany",
	        triggerAction: "all",
	        store: Js.Center.Common.BranchCompanyStore
	    });
	    Js.Center.Common.BranchCompanyStore.reload();
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
	        mode: "local",
	        displayField: "vc2branchcompany",
	        valueField: "numbranchcompany",
	        triggerAction: "all",
	        store: Js.Center.Common.BranchCompanyStore
	    });
	    
	    var UpdateInfofp = new Ext.form.FormPanel({
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
            		value: "Update"
        		}, {            	
        			xtype: "hidden",
            		name: "numseqid",
            		fieldLabel:"序列"
            	},{
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
							id : "Js.Center.Business.OtherEC.OtherEcUpdate.vc2ecid",
							fieldLabel : "<font color=red>ECID</font>",
							allowBlank : false,
							blankText : "ecid不允许为空",
							maxLength:10,
		                    regex:  /^\w+$/,
		                    regexText: "只能输入数字和字母",
		                	listeners:{
		                        "blur": function(){
		                        	var ecId = Ext.getCmp("Js.Center.Business.OtherEC.OtherEcUpdate.vc2ecid").getValue();
		            	            Ext.Ajax.request({
		            	                url: Js.Center.OtherEC.OtherECURL,
		            	                method: "POST",
		            	                params: {
		            	                	ecId: ecId,
		            	                    flag: "queryOtherEcName"
		            	                },
		            	                success: function(form, action) {
		            	                    var objJson = Ext.util.JSON.decode(form.responseText);
		            	                    var flag = objJson.success;
		            	                    if(true == flag){
	            	                    		var fullname = Ext.get("Js.Center.Business.OtherEC.OtherEcUpdate.vc2ecfullname");
	            	                    		var shortname = Ext.get("Js.Center.Business.OtherEC.OtherEcUpdate.vc2shortname");
	            	                    		fullname.dom.value = "";
	            	                    		shortname.dom.value = "";
		            	                    	if("Y" == objJson.info){
		            	                    		fullname.dom.value = objJson.fullName;
		            	                    		shortname.dom.value = objJson.shortName;
		            	                    	}
		            	                    }
		            	                },
		            	                failure: function() {
		            	                    Ext.Msg.alert("温馨提示", "系统忙，请稍候...!");
		            	                }
		            	            });
		                        }
		                	}
						},{
							xtype : "textfield",
							name : "vc2ecfullname",
							id : "Js.Center.Business.OtherEC.OtherEcUpdate.vc2ecfullname",
							fieldLabel : "<font color=red>客户全称</font>",
							allowBlank : false,
							blankText : "客户全称不允许为空",
							maxLength:100,
							regex: WXTL.Common.regex.Illegal,
			                regexText: WXTL.Common.regexText
						},{
							xtype : "textfield",
							name : "vc2shortname",
							id : "Js.Center.Business.OtherEC.OtherEcUpdate.vc2shortname",
							fieldLabel : "<font color=red>客户简称</font>",
							allowBlank : false,
							blankText : "客户简称不允许为空",
							maxLength:25,
							regex: WXTL.Common.regex.Illegal,
			                regexText: WXTL.Common.regexText.IllegalText
						},{
							xtype: "combo",
							name : "vc2ismas",
		                    hiddenName: "vc2ismas",
		                    fieldLabel: "<font color=red>MAS客户</font>",
		                    readOnly: true,
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

						},{
							xtype: "combo",
					        name: "vc2industry",
					        hiddenName: "vc2industry",
					        emptyText: "-=请选择=-",
					        allowBlank: false,
					        blankText: "请选择行业",
					        fieldLabel: "<font color=red>行业</font>",
					        readOnly: true,
					        mode: "local",
					        displayField: "vc2industry",
					        valueField: "vc2industry",
					        triggerAction: "all",
					        store: Js.Center.Common.IndustryStore
						}
						,{
							xtype: "combo",
							name : "vc2custype",
		                    hiddenName: "vc2custype",
		                    fieldLabel: "<font color=red>客户类型</font>",
		                    readOnly: true,
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
					        allowBlank: false,
					        blankText: "请选择",
					        fieldLabel: "<font color=red>运营商</font>",
					        readOnly: true,
					        mode: "local",
					        displayField: "vc2name",
					        valueField: "vc2name",
					        triggerAction: "all",
		                    emptyText: "-=请选择=-",
					        store: Js.Center.Common.OperatorStore
						},{
							xtype : "textfield",
							name : "vc2servcode",
							fieldLabel : "<font color=red>服务号码</font>",
							allowBlank : false,
							maxLenth:30,
							blankText : "服务号码不允许为空",
							regex: WXTL.Common.regex.Illegal,
			                regexText: WXTL.Common.regexText.IllegalText
						},{
							xtype : "textfield",
							name : "vc2manager",
							fieldLabel : "<font color=red>商务经理</font>",
							allowBlank : false,
							blankText : "商务经理不允许为空",
							maxLength:10,
							regex: WXTL.Common.regex.Illegal,
			                regexText: WXTL.Common.regexText.IllegalText
						},{
							xtype: "combo",
		                    name: "numcuslevel",
		                    hiddenName: "numcuslevel",
		                    fieldLabel: "<font color=red>客户级别</font>",
		                    readOnly: true,
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
						blankText : "签约主体不允许为空",
						maxLength:15,
						regex: WXTL.Common.regex.Illegal,
		                regexText: WXTL.Common.regexText.IllegalText
					},{
						xtype : "textfield",
						name : "numlimit",
						fieldLabel : "<font color=red>条数限制</font>",
						allowBlank : false,
						blankText : "条数限制不允许为空",
						regex: WXTL.Common.regex.Integer,
		                regexText: "只能输入数字",
		                maxLength: 9,
		    			maxLengthText:'长度不能超过9'
					}, numfeeareaCombox,numbusareaCombox,
					{
						xtype : "textfield",
						name : "vc2svc",
						fieldLabel : "业务代码",
						allowBlank : true,
						blankText : "业务代码不允许为空",
						maxLength:20,
						regex: WXTL.Common.regex.Illegal,
		                regexText: WXTL.Common.regexText.IllegalText
					}, {
						xtype: "combo",
			            name: "vc2feetype",
			            hiddenName: "vc2feetype",
			            fieldLabel: "结算类型",
			            readOnly: true,
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
						blankText : "计费规则不允许为空",
						maxLength:300,
						regex: WXTL.Common.regex.Illegal,
		                regexText: WXTL.Common.regexText.IllegalText
					}, {
						xtype : "datefield",
						name : "vc2putintime",
						fieldLabel : "接入时间",
						allowBlank : true,
			            labelWidth: 100,
			            format: 'Y-m-d',
			            bodyStyle: 'padding:5px 5px 0',
			            readOnly: false
					}, {
						xtype : "textfield",
						name : "vc2gwputin",
						fieldLabel : "接入网关",
						allowBlank : true,
						blankText : "接入网关不允许为空",
						maxLength:15,
						regex: WXTL.Common.regex.Illegal,
		                regexText: WXTL.Common.regexText.IllegalText
					}, {
						xtype : "textfield",
						name : "vc2gwfeerule",
						fieldLabel : "网关计费规则",
						allowBlank : true,
						blankText : "网关计费规则不允许为空",
						maxLength:300,
						regex: WXTL.Common.regex.Illegal,
		                regexText: WXTL.Common.regexText.IllegalText
					}, {
						xtype : "textfield",
						name : "vc2subcode",
						fieldLabel : "服务子号",
						allowBlank : true,
						blankText : "服务子号不允许为空",
						maxLength:20,
						regex: WXTL.Common.regex.Illegal,
		                regexText: WXTL.Common.regexText.IllegalText
					}, {
						xtype : "textfield",
						name : "vc2conperson",
						fieldLabel : "联系人",
						allowBlank : true,
						blankText : "联系人不允许为空",
						maxLength:15,
						regex: WXTL.Common.regex.Illegal,
		                regexText: WXTL.Common.regexText.IllegalText
					}, {
						xtype : "textfield",
						name : "vc2contact",
						fieldLabel : "联系方式",
						allowBlank : true,
						blankText : "联系方式不允许为空",
						maxLength:50,
						regex: WXTL.Common.regex.Illegal,
		                regexText: WXTL.Common.regexText.IllegalText
					}]
	    	}]
        }]
	    });
	    var mainForm = UpdateInfofp.getForm();
	    this.window = new WXTL.Widgets.CommonWindows.Window({
	        title: "修改其他平台客户信息",
	        mainForm: mainForm,
	        updateURL: Js.Center.OtherEC.OtherECURL,
	        displayStore: Js.Center.Business.OtherEC.ECInfostore,
	        items: [UpdateInfofp]
	    });
	};
};