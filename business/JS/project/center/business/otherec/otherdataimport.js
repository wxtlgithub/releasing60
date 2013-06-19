Ext.namespace('Js.Center.OtherEC.OtherDataImport');
Ext.QuickTips.init();

Js.Center.OtherEC.OtherDataImport.func = function(){
	if (Js.Center.OtherEC.OtherDataImport.window == null) {
		// ======================================================================== 定义FormPanel
		var ImportOtherDataInfofp = new Ext.form.FormPanel({
			fileUpload: true,
			frame: true,
			labelWidth: 80,
			layout: 'form',
			defaults: {
				anchor: "90%",
				msgTarget: "side"
			},
			items: [{
				xtype: "hidden",
				name: "flag",
				value: "importotherdata"
			}, {
				xtype: 'fileuploadfield',
				name: 'filepath',
				id: 'Js.Center.OtherEC.OtherDataImport.filepath',
				fieldLabel: getHelpMsg("文件", true, '1、文件格式为xls,xlsx<br>2、文件大小须小于4M<br>3、各单元格格式必须为文本<br/> 4、内容格式:　<img src=jspack/project/common/Images/help/otherdatafile.jpg align=top/>'),
				allowBlank: false,
				blankText: "请选择上传文件",
				validator: function(){
					var filePath = this.getValue();
					if (filePath != '') {
						ImportOtherDataInfofp.getForm().items.items[2].el.dom.value = getFileMessage(filePath);
						var endWith = filePath.substring(filePath.lastIndexOf("."));
						if(".xls" == endWith || ".xlsx" == endWith){
							return true;
						} else {
							this.invalidText = "文件格式应为xls,xlsx";
							return false;
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
			}]
		});
		
		// ======================================================================= 定义窗体
		var mainForm = ImportOtherDataInfofp.getForm();
		this.window = new WXTL.Widgets.CommonWindows.Window({
			title: "导入其他平台数据",
			mainForm: mainForm,
			items: [ImportOtherDataInfofp],
			needButtons: false,
			buttons: [new Ext.Button({
				text: '确定',
				minWidth: 70,
				qtip: "确定",
				handler: function(){
					if (mainForm.isValid()) {
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
						mainForm.submit({
							url: Js.Center.OtherEC.OtherDataURL,
							method: "POST",
							success: function(form, action){
								var objJson = Ext.util.JSON.decode(action.response.responseText);
								var falg = objJson.success;
								if (falg == true) {
									Ext.Msg.alert("温馨提示", objJson.error);
									ImportOtherDataInfofp.getForm().items.items[1].el.dom.value = "";
									ImportOtherDataInfofp.getForm().items.items[2].el.dom.value = "";
									Js.Center.OtherEC.OtherData.OtherDatastore.reload();
								} else {
									Ext.Msg.alert('温馨提示', objJson.info);
								}
							},
							failure: function(form, action){
								var objJson = Ext.util.JSON.decode(action.response.responseText);
								Ext.Msg.alert('温馨提示', objJson.info);
							}
						})
					}
				}
			}), new Ext.Button({
				text: '重置',
				minWidth: 70,
				qtip: "重置数据",
				handler: function(){
					mainForm.reset();
				}
			}), new Ext.Button({
				text: '取消',
				minWidth: 70,
				handler: function(){
					Js.Center.OtherEC.OtherDataImport.window.hide();
				}
			})]
		});
	}
};