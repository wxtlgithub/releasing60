Ext.namespace('Js.Center.Business.ECmanage.EcUpdate');
Js.Center.Business.ECmanage.EcUpdate.func = function(row){
	//===========================================分公司地区
	 var AreaCombox = new WXTL.Widgets.CommonForm.ComboBox({
	        xtype: "xComboBox",
	        name: "vc2area",
	        hiddenName: "vc2area",
	        emptyText: "-=请选择=-",
	        allowBlank: false,
	        blankText: "请选择地区",
	        fieldLabel: "<font color=red>地区</font>",
	        readOnly: true,
	        mode: "local",
	        displayField: "vc2branchcompany",
	        valueField: "numbranchcompany",
	        triggerAction: "all",
	        store: Js.Center.Common.BranchCompanyStore
	    });
	    Js.Center.Common.BranchCompanyStore.reload();
	 //=========================================== 行业
	 var IndustryCombox =new WXTL.Widgets.CommonForm.ComboBox({
	        xtype: "xComboBox",
	        name: "numindustry",
	        hiddenName: "numindustry",
	        emptyText: "-=请选择=-",
	        allowBlank: false,
	        blankText: "请选择行业",
	        fieldLabel: "<font color=red>行业</font>",
	        readOnly: true,
	        mode: "local",
	        displayField: "vc2industry",
	        valueField: "numindustry",
	        triggerAction: "all",
	        store: Js.Center.Common.IndustryStore
	    });
	 	Js.Center.Common.IndustryStore.reload();
	 function createUpFile(){
	 	var UpFile = new WXTL.Widgets.CommonForm.FileUploadField({
				name : "oapicfile",
				style : 'border: 1px solid #C0C0C0;height:22;cursor:hand',
				fieldLabel : getHelpMsg("文件", false, "1、文件格式为jpg/gif/png/bmp等图片"),
				allowBlank : true,
				blankText : "请选择上传文件",
				width : 400,
				validator : function() {
					var filePath = this.getValue();
					var fileTypeArr1 = new Array();
					fileTypeArr1[0] = "jpg";
					fileTypeArr1[1] = "gif";
					fileTypeArr1[2] = "png";
					fileTypeArr1[3] = "bmp";			
					var fileTypeArrDesc1 = "jpg,gif,png,bmp";
					if (filePath != '') {
						if (checkFileWithTypeArr(filePath, fileTypeArr1,
								fileTypeArrDesc1) != '') {
							this.invalidText = checkFileWithTypeArr(filePath,
									fileTypeArr1, fileTypeArrDesc1);
							return false;
						} else {
							return true;
						}
					} else
						return false;
				}
			});
			return UpFile;
	 }
	 var UpFile = createUpFile();
  //============================================================================定义FormPanel
   var updateInfofp = new Ext.form.FormPanel({
       frame: true,
       fileUpload : true,
       labelWidth: 80,
       defaults: {
           anchor: '100%',
           msgTarget: 'side'
       },
       bodyBorder: false,
       border: false,
       autoScroll: true, // 自动显示滚动条
       items: [{
           xtype: "hidden",
           name: "flag",
           value: "update"
       }, 
       {
           xtype: "hidden",
           name: "numecid",
           fieldLabel: "EC主键"
       },{
           xtype: "hidden",
           name: "vc2ecid",
           fieldLabel: "EC编号"
       },{
       	   xtype :"hidden",
       	   name: "numdepartid",
       	   fieldLable:"部门编号"
       },{
	        layout:'column',
	    	items: [{//左侧列
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
	                items: [ {
	                    xtype: "textfield",
	                    name: "vc2fullname",
	                    fieldLabel: "<font color=red>客户全称</font>",
	                    allowBlank: false,
	                    blankText: "客户全称不允许为空",
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText,
	                    maxLength: 25,
	        			maxLengthText:'长度不能超过25'
	                }, {
	                	xtype: "combo",
	                    name: "numismas",
	                    hiddenName: "numismas",
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
	                        data: [["-=请选择=-", ""], ["是", "1"], ["否", "2"]]
	                    })
	                },{
	        			xtype: "combo",
	                    name: "numcustype",
	                    hiddenName: "numcustype",
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
	                        data: [["-=请选择=-", ""], ["渠道", "1"], ["直客", "2"],["内部","3"]]
	                    })	
	        		},{
	        			xtype: "combo",
	                    name: "numlevel",
	                    hiddenName: "numlevel",
	                    fieldLabel: "<font color=red>级别</font>",
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
	                    name: "numsvctype",
	                    hiddenName: "numsvctype",
	                    fieldLabel: "<font color=red>通道类型</font>",
	                    readOnly: true,
	                    mode: "local",
	                    displayField: "show",
	                    allowBlank:false,
	                    valueField: "value",
	                    triggerAction: "all",
	                    emptyText: "-=请选择=-",
	                    store: new Ext.data.SimpleStore({
	                        fields: ["show", "value"],
	                        data: [["-=请选择=-", ""], ["短信", "1"], ["彩信", "2"],["短彩信","3"]]
	                    })
	        		},{
	        			xtype: "combo",
	                    name: "numstatus",
	                    hiddenName: "numstatus",
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
	                        data: [["-=请选择=-", ""], ["商用", "1"], ["暂停", "2"]]
	                    })
	        		},
	        		{
		            	xtype: "textfield",
		                name: "vc2conperson",
		                fieldLabel: "联系人",
		                regex: WXTL.Common.regex.Illegal,
		                regexText: WXTL.Common.regexText.IllegalText,
		                maxLength: 30,
		    			maxLengthText:'长度不能超过30'
	        		},{
	                	xtype: "xComboBox",
	                    name: "numsigntypeid",
	                    hiddenName: "numsigntypeid",
	                    fieldLabel: "<font color=red>签名类型</font>",
	                    readOnly: true,
	                    mode: "local",
	                    allowBlank:false,
	                    displayField: "vc2typename",
	                    valueField: "numtypeid",
	                    triggerAction: "all",
	                    emptyText: "-=请选择=-",
	                    store: Js.Center.Common.EcSignTypeStore
	        		}]
	    	},{//右侧列
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
	            items: [ {
	                xtype: "textfield",
	                name: "vc2ecname",
	                fieldLabel: "<font color=red>客户简称</font>",
	                allowBlank: false,
	                blankText: "客户简称不允许为空",
	                regex: WXTL.Common.regex.Illegal,
	                regexText: WXTL.Common.regexText.IllegalText,
	                maxLength: 25,
	    			maxLengthText:'长度不能超过25'
	            }
	            ,IndustryCombox
	            ,AreaCombox
	            ,{
	            	xtype: "textfield",
	                name: "vc2manager",
	                fieldLabel: "<font color=red>商务经理</font>",
	                allowBlank:false,
	                regex: WXTL.Common.regex.Illegal,
	                regexText: WXTL.Common.regexText.IllegalText,
	                maxLength: 15,
	    			maxLengthText:'长度不能超过15'
	            },{
	            	xtype: "combo",
                    name: "vc2chargetype",
                    hiddenName: "vc2chargetype",
                    fieldLabel: "<font color=red>付费类型</font>",
                    readOnly: true,
                    mode: "local",
                    displayField: "show",
                    allowBlank:false,
                    valueField: "value",
                    triggerAction: "all",
                    emptyText: "-=请选择=-",
                    store: new Ext.data.SimpleStore({
                        fields: ["show", "value"],
                        data: [["-=请选择=-", ""], ["预付费", "1"], ["后付费", "2"]]
                    })
	            },{
	            	xtype: "textfield",
	                name: "numlimited",
	                fieldLabel: "<font color=red>条数限制</font>",
	                regex: WXTL.Common.regex.Integer,
	                regexText: "只能输入数字",
	                allowBlank:false,
	                maxLength: 9,
	    			maxLengthText:'长度不能超过9'
	            },{
	            	xtype: "textfield",
	                name: "vc2contact",
	                fieldLabel: "联系方式",
	                regex: WXTL.Common.regex.Illegal,
	                regexText: WXTL.Common.regexText.IllegalText,
	                maxLength: 100,
	    			maxLengthText:'长度不能超过100'
	            }]
	    	}]
        },{
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
           
           items:[UpFile]
       }]
   });
   var mainForm = updateInfofp.getForm();
   //============================================================================定义窗体
   this.window = new WXTL.Widgets.CommonWindows.Window({
       title: "修改客户信息",
       mainForm: mainForm,
       updateURL: Js.Center.Business.ECmanage.EcUpdateURL,
       displayStore: Js.Center.Business.ECmanage.Infostore,
       updateState: true,
       updateRecord: row,
       items: [updateInfofp]
   });
};
