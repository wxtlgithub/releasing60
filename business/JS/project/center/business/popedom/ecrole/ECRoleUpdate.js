Ext.namespace('Js.Center.Popedom.ECRoleUpdate');

Js.Center.Popedom.ECRoleUpdate.func = function(row){
    var ECList;
    // ================================================================ 定义FormPanel
    var updateInfoFormPanel = new Ext.form.FormPanel({
        frame: true,
        labelWidth: 80,
        items: [{
            layout: 'column',
            items: [{
	            columnWidth: .6,
	            layout: 'form',
	            //锚点布局-
	            defaults: {
	                anchor: "95%",
	                msgTarget: "side"
	            },
	            buttonAlign: "center",
	            bodyStyle: "padding:0px 0 0px 15px",
	            items: [{
		                xtype: "hidden",
		                name: "flag",
		                value: "update"
		            }, {
		                xtype: "hidden",
		                id: 'Js.Center.Popedom.ECRoleUpdate.roleId',
		                name: "roleId"
		            }, {
	                    xtype: "textfield",
	                    name: "vc2rolename",
	                    fieldLabel: "<font color=red>角色名称</font>",
	                    allowBlank: false,
	                    blankText: "角色名称不允许为空",
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText,
	                    maxLength: 50
	                }, {
                   	 	xtype: "textfield",
	                    name: "vc2roledesc",
	                    width: .5,
	                    fieldLabel: "备注",
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText,
	                    maxLength: 50
	                }]
            }, {
	            columnWidth: 1,
	            layout: 'form',
	            //锚点布局-
	            defaults: {
	                anchor: "95%",
	                msgTarget: "side"
	            },
	            buttonAlign: "center",
	            bodyStyle: "padding:0px 0 0px 15px",
	            items: [{
	                    xtype: "textfield",
	                    fieldLabel: "选择EC",
	                    hidden: true
	                }, {
	                    html: '<div id="Js.Center.Popedom.ECRoleUpdate.ECPanelFieldSet" style="float:left;margin:0px;border:1px solid #c3daf9;width:95%;height:270px;"></div>'
                }]
        	}]
        }]
    });
    
    // ================================================================== 定义窗体
    var mainForm = updateInfoFormPanel.getForm();
    this.window= new WXTL.Widgets.CommonWindows.Window({
        title: "添加角色",
        width: '700',
        mainForm: mainForm,
        updateURL: Js.Center.Popedom.ECRoleURL,
        displayStore: Js.Center.Popedom.ECRoleInfo.Infostore,
        updateState: true,
        updateRecord: row,
        items: [updateInfoFormPanel],
        needButtons: false,
		needLoadDataStore: true,
        buttons: [new Ext.Button({
            text: '保存退出',
            minWidth: 70,
            qtip: "保存退出",
            handler: function(){
            	var roleId = Js.Center.Popedom.ECRoleUpdate.window.updateRecord.get("numroleid");
            	Ext.getCmp("Js.Center.Popedom.ECRoleUpdate.roleId").setValue(roleId);
                var ecIds = '';
                for (var i = 0; i < ECList.getValue().length; i++) {
                	var ecId = ECList.getValue()[i];
                	if(ecId){
	                    if (ecIds.length == 0) {
	                        ecIds += ecId;
	                    } else {
	                        ecIds += ',' + ecId;
	                    }
                	}
                }
                if(ecIds.length == 0){
                	Ext.Msg.alert("温馨提示", "请选择授权EC!");
                	return;
                }else if (mainForm.isValid()) {
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
                   Js.Center.Popedom.ECRoleUpdate.window.mainFormSubmitFunc();
                }
            }
        }), new Ext.Button({
            text: '重置',
            qtip: "重置",
            minWidth: 70,
            handler: function(){
                updateInfoFormPanel.getForm().loadRecord(Js.Center.Popedom.ECRoleUpdate.window.updateRecord);
                ECList.reset();
            }
        }), new Ext.Button({
            text: '关闭',
            qtip: "关闭",
            minWidth: 70,
            handler: function(){
                Js.Center.Popedom.ECRoleUpdate.window.hide();
            }
        })],
		loadDataStoreFunc: function(){
			initEcList();
		}
    });
    
    //=========================================ECset
    function initEcList(){
        document.getElementById('Js.Center.Popedom.ECRoleUpdate.ECPanelFieldSet').innerHTML = '';
        Ext.get('Js.Center.Popedom.ECRoleUpdate.ECPanelFieldSet').dom.innerHTML = '';
	    //EC列表
	    ECList = new WXTL.Widgets.CommonForm.CheckboxGroup.RemoteCheckboxGroup({
	        url: Js.Center.Popedom.ECQueryURL,
	        queryparams: 'flag=queryecByRole&roleId=' + Js.Center.Popedom.ECRoleUpdate.window.updateRecord.get("numroleid"),
	        requestname: 'ecids',
	        defaultsItemsName: 'ecids',
	        defaultsItemsboxLable: '对不起，没有相关EC信息。',
	        numcolumns: 6,
	        messageID: 1,
	        reader: new Ext.data.JsonReader({
	            totalProperty: 'totalProperty',
	            root: 'data',
	            fields: [{
	                name: 'id'
	            }, {
	                name: 'name'
	            }, {
	                name: 'boxLabel',
	                mapping: "vc2ecname"
	            }, {
	                name: 'inputValue',
	                mapping: "numecid"
	            }, {
	                name: 'checked',
	                mapping: "checked"
	            }]
	        })
	    });
	    var ecGroupPanel = new Ext.Panel({
	        style: 'padding:0 0 0 5px',
	        autoHeight: true,
	        width: 600,
	        items: [{
	            items: [ECList]
	        }]
	    });
	    ecGroupPanel.doLayout();
	    
	    ecGroupPanelFieldSet = new Ext.Panel({
	        applyTo: 'Js.Center.Popedom.ECRoleUpdate.ECPanelFieldSet',
	        title: 'EC',
	        width: 630,
	        autoScroll: true,
	        items: [ecGroupPanel]
	    });
    }
};
