/*
*添加客户组成员
*/
Ext.namespace('Js.Center.Business.UserGroupMemberAdd');
Ext.QuickTips.init();

Js.Center.Business.UserGroupMemberAdd.func = function(row){
    
   if(Js.Center.Business.UserGroupMemberAdd.window==null)
   {
    var mainForm;
    var uploadFilePanel = new WXTL.Widgets.CommonPanel.UploadLargeFilePanel({
        url: '/url/upload.ashx',
        needLargfile: false,
        id: "Js.Center.Business.UserGroupMemberAdd.UploadLargeFile",
        fieldlableFile: WXTL.Common.help.USERGROUPMOBILEFILE
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
                name: "numusergroupid",
				fieldLabel:"客户组编号",
				readOnly:"true"
			},{
				xtype: "textfield",
                name: "vc2usergroupname",
				fieldLabel:"客户组名称",
				readOnly:"true",
				disabled:true,
				labelStyle: "width:93px",
				width:500
			},uploadFilePanel,{
//                xtype: 'fileuploadfield',
//                //id: 'usergroupmemberaddmobilefile',
//                style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
//                name: 'mobilefile',
//                fieldLabel: WXTL.Common.help.MOBILEFILE,
//                allowBlank: false,
//                blankText: "请选择上传文件",
//                width: 500,
//                //inputType: 'file',
//                validator: function(){
//                    var filePath = Js.Center.Business.UserGroupMemberAdd.window.mainForm.items.items[2].getValue();
//                    if (filePath != '') {
//                        Js.Center.Business.UserGroupMemberAdd.window.mainForm.items.items[3].el.dom.value = getFileMessage(filePath);
//                        if (checkFile(filePath) != '') {
//                            this.invalidText = checkFile(filePath);
//                            return false;
//                        }
//                        else {
//                            return true;
//                        }
//                    }
//                    else 
//                        return false;
//                }
//            }, {
//                xtype: 'textarea',
//                name: 'filemessage',
//                //id: 'usergroupmemberaddfilemessage',
//                fieldLabel: '文件信息',
//                readOnly: true,
//				disabled:true,
//                width: 500,
//                height: 100
//            }, {
                xtype: 'hidden',
                name: 'flag',
                value: 'insertbyfile'
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
                name: "numusergroupid",
				fieldLabel:"客户组编号",
				readOnly:"true"
			},{
				xtype: "textfield",
                name: "vc2usergroupname",
				fieldLabel:"客户组名称",
				readOnly:"true",
				disabled:true,
				width:500
			},{
                xtype: 'textarea',
                name: 'mobilelist',
                id: 'Js.Center.Business.UserGroupMemberAdd.mobilelist',
                fieldLabel: WXTL.Common.help.USERGROUPMOBILELIST,
                width: 500,
                height: 200,
                allowBlank: false,
                blankText: "请输入手机号码列表",
                validator: function(value){
                    return checkDiyMobileList(value, 1000);
                }
            }, {
                xtype: 'hidden',
                name: 'flag',
                value: 'insertbylist'
            }]
        });
        mainForm = addByFilePanel.getForm();
        //============================================================================ 定义tabpanel
        var tabPanel = new Ext.TabPanel({
            height: 300,
            border: false,
            width: 650,
            activeTab: 0,//默认激活第一个tab页
            animScroll: true,//使用动画滚动效果
            enableTabScroll: true,//tab标签超宽时自动出现滚动按钮
            items: [addByFilePanel, addByListPanel],
            listeners: {
                "tabchange": function(TabPanel, Panel){
                    if(Js.Center.Business.UserGroupMemberAdd.window!=null &&Js.Center.Business.UserGroupMemberAdd.window.updateRecord != null) {  
                        mainForm = Panel.getForm();
                        Js.Center.Business.UserGroupMemberAdd.window.mainForm = mainForm;
                    	Js.Center.Business.UserGroupMemberAdd.window.mainForm.loadRecord(Js.Center.Business.UserGroupMemberAdd.window.updateRecord);
                    }
                }
            }
        });
        //============================================================================ 定义窗体
        this.window = new WXTL.Widgets.CommonWindows.Window({
            title: "添加客户组成员",
            mainForm: mainForm,
            updateURL: Js.Center.Business.UserGroupMemberUpdateURL,
            displayStore: Js.Center.Business.UserGroup.Infostore,
			updateState: true,
            updateRecord: row,
            items: [tabPanel],
            needLoadDataStore: true,
            loadDataStoreFunc: function(){
            	Js.Center.Business.UserGroupMemberAdd.window.items.items[0].items.items[0].getForm().reset();
            	Js.Center.Business.UserGroupMemberAdd.window.items.items[0].items.items[1].getForm().reset();
                Js.Center.Business.UserGroupMemberAdd.window.mainForm.loadRecord(Js.Center.Business.UserGroupMemberAdd.window.updateRecord);
                Js.Center.Business.UserGroupMemberAdd.window.items.items[0].setActiveTab(0);
            }
        });
   }
   
	function checkDiyMobileList(mobileList, maxLine){
		var _lines = new Array();
		if(Ext.isIE) {
			// 按行分隔处理，否则 /\s/g 可能会匹配到换行符   
		    _lines = mobileList.split("\r\n"); 
		} else {
		    _lines = mobileList.split("\n");
		}
		
		var _valid = true;
		if(_lines.length > maxLine) {
		    _valid = false;
		    return '已输入行数' + _lines.length + ',请不要超过' + maxLine + '行';
		} else {
		    for (var i = 0; i < _lines.length; i++) {
		    	if(_lines[i].length > 17 || (_lines[i].length > 11 && 11 != _lines[i].indexOf(","))){
		    		//超长或个性化格式不对
		            _valid = false;
		            return '包含不正确的手机号码，请检查！';
		    	}else if (!WXTL.Common.regex.Mobile.test(_lines[i].split(",")[0])) {
		            _valid = false;
		            return '包含不正确的手机号码，请检查！';
		        }
		    }
		}
		return _valid;
	};
};
