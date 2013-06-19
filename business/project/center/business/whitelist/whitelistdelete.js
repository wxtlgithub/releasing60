Ext.namespace('Js.Center.Business.WhitelistDelete');
Ext.QuickTips.init();

Js.Center.Business.WhitelistDelete.func = function() {
	if(Js.Center.Business.WhitelistDelete.window==null){
		var uploadFilePanel = new WXTL.Widgets.CommonPanel.UploadLargeFilePanel({
				id: "Js.Center.Business.WhitelistDelete.UploadLargeFile",
				needLargfile: false
		});
		//通道组下拉表 for 文件方式
		var productComboxByFile = new Ext.form.ComboBox({
            xtype: "xComboBox",
            name: "numproductid",
            hiddenName: "numproductid",
            id: 'Js.Center.Business.WhitelistDelete.numproductidbyfile',
            emptyText: "-=请选择=-",
            allowBlank: false,
            blankText: "请选择通道组",
            fieldLabel: "<font color=red>选择通道组</font>",
            readOnly: true,
            mode: "local",
            displayField: "vc2name",
            valueField: "numprodid",
            triggerAction: "all",
            store: Js.Center.Common.UserGroupSelectStore
        });		
		//通道组下拉表 for 列表方式
		var productComboxByList = new Ext.form.ComboBox({
            xtype: "xComboBox",
            name: "numproductid",
            hiddenName: "numproductid",
            id: 'Js.Center.Business.WhitelistDelete.numproductidbyList',
            emptyText: "-=请选择=-",
            allowBlank: false,
            blankText: "请选择通道组",
            fieldLabel: "<font color=red>选择通道组</font>",
            readOnly: true,
            mode: "local",
            displayField: "vc2name",
            valueField: "numprodid",
            triggerAction: "all",
            store: Js.Center.Common.UserGroupSelectStore
        });
	    //============================================================================ 定义文件formpanel
	    var addByFilePanel = new Ext.form.FormPanel({
	        title: "文件方式",
	        width: 600,
	        border: false,
	        fileUpload: true,
	        frame: true,
	        labelWidth: 80,
	        defaults: {
	            msgTarget: "side"
	        },
	        items: [{
	            xtype: "hidden",
	            name: "whitelistaddnumsvcid",
	            value: "1"
	        },productComboxByFile,{
				xtype: 'fileuploadfield',
				name: 'mobilefile',
				fieldLabel: WXTL.Common.help.MOBILEFILE,
				allowBlank: false,
				blankText: "请选择上传文件",
				width: 500,
				validator: function(){
					var filePath = mainForm.items.items[2].getValue();
					if (filePath != '') {
						mainForm.items.items[3].el.dom.value = getFileMessage(filePath);
						if (checkFile(filePath) != '') {
							this.invalidText = checkFile(filePath);
							return false;
						}
						else {
							return true;
						}
					}
					else 
						return false;
				}
			}, {
				xtype: 'textarea',
				name: 'filemessage',
				fieldLabel: '文件信息',
				readOnly: true,
				width: 500,
				height: 180
			}, {
	            xtype: 'hidden',
	            name: 'flag',
	            value: 'deletebyfile'
			}]
        });
        //============================================================================ 定义列表formpanel	
        var addByListPanel = new Ext.form.FormPanel({
            title: "列表方式",
            width: 600,
            border: false,
            frame: true,
            labelWidth: 80,
            defaults: {
                msgTarget: "side"
            },
            items: [{
	                xtype: "hidden",
	                name: "whitelistaddnumsvcid",
	                value: "1"
	            }, productComboxByList,{
	                xtype: 'textarea',
	                name: 'mobilelist',
	                fieldLabel: WXTL.Common.help.MOBILELIST,
	                width: 300,
	                height: 200,
	                allowBlank: false,
	                blankText: "请输入手机号码列表",
	                validator: function(value) {
	                    return checkMobileList(value, 1000);
	                }
	            }, {
	                xtype: 'hidden',
	                name: 'flag',
	                value: 'deletebylist'
				}]
            });
            var mainForm = addByFilePanel.getForm();
            //============================================================================ 定义tabpanel
            var tabPanel = new Ext.TabPanel({
                height: 260,
                border: false,
                width: 650,
                activeTab: 0, //默认激活第一个tab页
                animScroll: true, //使用动画滚动效果
                enableTabScroll: true, //tab标签超宽时自动出现滚动按钮
                items: [addByFilePanel, addByListPanel],
                listeners: {
                    "tabchange": function(TabPanel, Panel) {
                        if (Js.Center.Business.WhitelistDelete.window) {
                            mainForm = Panel.getForm();
                            Js.Center.Business.WhitelistDelete.window.mainForm = mainForm;
                        }
                    }
                }
            });
            //============================================================================ 定义窗体
            this.window = new WXTL.Widgets.CommonWindows.Window({
                title: "退出系统白名单",
                iconCls: 'deleteicon',
                mainForm: mainForm,
                updateURL: Js.Center.Business.WhiteUpdateURL,
                displayStore: Js.Center.Business.WhitelistAdd.Infostore,
                items: [tabPanel],
			    listeners:{
			        "show":function (){
			           Js.Center.Business.WhitelistDelete.window.items.items[0].setActiveTab(0);
			           Js.Center.Business.WhitelistDelete.window.items.items[0].items.items[0].getForm().reset();
			           Js.Center.Business.WhitelistDelete.window.items.items[0].items.items[1].getForm().reset();
			        }
			    }
            });
           
    }
           
 };
