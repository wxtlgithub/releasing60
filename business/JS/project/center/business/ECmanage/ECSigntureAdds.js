Ext.namespace('Js.Center.Business.ECsigntureAdds');

Js.Center.Business.ECsigntureAdds.func = function() {
		Js.Center.Common.EcListStore.reload();
		var numecids = new Array();
		var ECCombox = new WXTL.Widgets.CommonForm.ComboBox({
			xtype : "xComboBox",
			name : "numecid",
			fieldLabel : "<font color=red>选择客户</font>",
			hiddenName : "numecid",
			mode : "local",
			displayField : "vc2ecname",
			valueField : "numecid",
			triggerAction : "all",
			emptyText : "-=请选择=-",
			allowBlank: true, 
			store : Js.Center.Common.EcListStore,
			listeners : {
				"select" : function(a, b) {
					numecids.push(this.getValue());
					if("" != this.getValue()){
						Js.Center.Business.ECsigntureAdds.addEcSigntureAdd(this.getValue(), this.lastSelectionText);
					}
				}
			}
		});

		// ============================================================================定义FormPanel
		var updateInfofp = new Ext.form.FormPanel({
	    	fileUpload : true, 	
			frame : true,
			labelWidth : 80,
			defaults : {
				anchor : '95%',
				msgTarget : 'side'
			},
			bodyBorder : false,
			border : false,
			autoScroll : true, // 自动显示滚动条
			items : [ {
				xtype : "hidden",
				name : "flag",
				value : "signatureAdds"
			}, {
				xtype : "hidden",
				id:'Js.Center.Business.ECsigntureAdds.ecId'
			}, {
				layout : 'form',
				buttonAlign : "center",
				bodyStyle : "padding:0px 0 0px 0px",
				items : [ ECCombox ]
			}]
		});
		Js.Center.Business.ECsigntureAdds.addEcSigntureAdd = function(ecId, ecName) {
			var ecIds = Ext.getCmp('Js.Center.Business.ECsigntureAdds.ecId').getValue();
			if(0 == ecIds.length){
				Ext.getCmp('Js.Center.Business.ECsigntureAdds.ecId').setValue(ecId);
			} else if(-1 == (',' + ecIds + ',').indexOf(ecId)) {
				Ext.getCmp('Js.Center.Business.ECsigntureAdds.ecId').setValue(ecIds + ',' + ecId)
			} else if(-1 != (',' + ecIds + ',').indexOf(ecId)) {
				return;
			}
			var org_fieldSet = new Ext.Panel({
				id : 'Js.Center.Popedom.RoleAdminAdds_' + ecId,
				border : false,
				fileUpload: true,
				items : [{
					layout : 'column',
					border : false,
					items : [{
							xtype : 'hidden',
							name : 'ecId',
							value : ecId
						},{
							columnWidth : .85,
							layout : 'form',
							// 锚点布局-
							defaults : {
								anchor : "90%",
								msgTarget : "side"
							},
							buttonAlign : "center",
							bodyStyle : "padding:0px 0 0px 0px",
							items : [{
								xtype : 'fileuploadfield',
								id : 'fileUrl_' + ecId,
								name : 'fileUrl_' + ecId,
								labelWidth : 50,
								fieldLabel : ecName,
								allowBlank : false,
								blankText : "请选择上传文件",
								validator: function(){
								    var filePath = Ext.getCmp('fileUrl_' + ecId).getValue();
								    if (filePath != '') {
								    	getFileMessage(filePath);
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
							}]
						}, {
							columnWidth : .15,
							// 锚点布局-
							defaults : {
								anchor : "90%",
								msgTarget : "side"
							},
							buttonAlign : "center",
							items : [{
								xtype : 'button',
								text : '删除',
								handler : function() {
									var ecIds = Ext.getCmp('Js.Center.Business.ECsigntureAdds.ecId').getValue();
									var newecIds = "";
									if(0 != ecIds.indexOf(ecId)){
										newecIds = ecIds.substring(0, ecIds.indexOf(ecId) - 1) + ecIds.substring(ecIds.indexOf(ecId) + ecId.length);
										Ext.getCmp('Js.Center.Business.ECsigntureAdds.ecId').setValue(newecIds);
									} else {
										if(-1 == ecIds.indexOf(",")){
											newecIds = ecIds.substring(ecId);
										} else {
											newecIds = ecIds.substring(ecId.length + 1);
										}
									}
									Ext.getCmp('Js.Center.Business.ECsigntureAdds.ecId').setValue(newecIds);
									var item = Ext.getCmp('Js.Center.Popedom.RoleAdminAdds_' + ecId);
									updateInfofp.remove(item);
									updateInfofp.getForm().remove(item);
								}
							}]
						}
					]
				}]
			});
			updateInfofp.add(org_fieldSet);
			updateInfofp.getForm().add(org_fieldSet);
			updateInfofp.doLayout();
			Js.Center.Business.ECsigntureAdds.window.mainForm = updateInfofp.getForm();
		};

		var mainForm = updateInfofp.getForm();

		// ============================================================================定义窗体
		Js.Center.Business.ECsigntureAdds.window = new WXTL.Widgets.CommonWindows.Window({
			title : "报备签名批量添加",
			mainForm : mainForm,
			width : 400,
			updateURL: Js.Center.Business.ECmanage.ECSigntureURL,
	        displayStore: Js.Center.Business.ECsignture.Infostore,
	        closeAction: "close",
	        monitorValid : false,
			items : [updateInfofp],
			needButtons: false,
			buttons: [new Ext.Button({
	                text: '提交发送',
	                minWidth: 70,
	                handler: function(){
                		//未选择EC
	                	if(3 == mainForm.items.items.length){
                      		Ext.Msg.alert('温馨提示', "请选择需要配置签名的EC");
                      		return;
	                	}
	                	//文件或签名未通过验证
	                	for(var i = 3; i < mainForm.items.items.length; i++){
	                		var sonPanel = mainForm.items.items[i];
	                		if(true != sonPanel.items.items[0].items.items[1].items.items[0].isValid()){
	                			return;
	                		}
	                	}
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
		                    Js.Center.Business.ECsigntureAdds.window.mainFormSubmitFunc(); 
	                }
	            }), new Ext.Button({
	                text: '重置',
	                minWidth: 70,
	                qtip: "重置数据",
	                handler: function(){
	                	var ecIds = Ext.getCmp('Js.Center.Business.ECsigntureAdds.ecId').getValue();
	                	for(var i = 0; i < ecIds.split(",").length; i++){
	                		var sonFormPanel = Ext.getCmp("Js.Center.Popedom.RoleAdminAdds_"+ecIds.split(",")[i]);
							updateInfofp.remove(sonFormPanel);
							updateInfofp.getForm().remove(sonFormPanel);
	                	}
						Ext.getCmp('Js.Center.Business.ECsigntureAdds.ecId').setValue("");
	                	updateInfofp.getForm().reset();
	                }
	            }), new Ext.Button({
	                text: '取消',
	                minWidth: 70,
	                handler: function(){
	                	Js.Center.Business.ECsigntureAdds.window.close();
	                	updateInfofp.getForm().reset();
	                }
	            })
            ]
		});
};