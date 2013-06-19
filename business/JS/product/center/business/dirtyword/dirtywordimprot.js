Ext.namespace('Js.Center.System.DirtyWordImport');
Ext.QuickTips.init();

Js.Center.System.DirtyWordImport.func = function(){
	if (Js.Center.System.DirtyWordImport.window == null) {
		// ======================================================================== 定义FormPanel
		var ImportDirtyWordInfofp = new Ext.form.FormPanel({
			//id: "ImportDirtyWordInfofp",
			//width: 600,
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
				value: "import"
			},new Ext.form.DateField({
                fieldLabel: '有效时间',
                width: 300,
                buttonAlign: "center",
                name: 'dateffectend',
                readOnly: true,
                showToday:true,
                clearDate:true,
                format: 'Y-m-d',
                validateOnBlur: false,
                minValue:WXTL.Common.dateTime.getNow(),
                minText:"有效时间小于今天"
            }) , {
				xtype: "combo",
				width: 300,
				fieldLabel: "<font color=red>分类</font>",
				hiddenName: "numdirtytype",
				allowBlank: false,
				blankText: "分类不允许为空",
				readOnly: true,
				mode: "local",
				emptyText: "请选择",
				displayField: "vc2name",
				valueField: "numdirtytype",
				triggerAction: "all",
				store: Js.Center.System.DirtyWord.DirtywordTypeStore
			}, {
				xtype: 'fileuploadfield',
				name: 'filepath',
				fieldLabel: getHelpMsg("文件", true, '1、文件格式为txt<br>2、文件大小须小于2M<br>3、行数必须不超过1000行<br>4、内容格式:关键字（换行）。<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;例如：脏字<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;法轮功<br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;藏独<br />'),
				allowBlank: false,
				blankText: "请选择上传文件",
				validator: function(){
					var filePath = this.getValue();
					if (filePath != '') {
						ImportDirtyWordInfofp.getForm().items.items[4].el.dom.value = getFileMessage(filePath);
						
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
			}]
		});
		
		// ======================================================================= 定义窗体
		var mainForm = ImportDirtyWordInfofp.getForm();
		this.window = new WXTL.Widgets.CommonWindows.Window({
			title: "导入非法词",
			mainForm: mainForm,
			updateURL: Js.Center.System.DirtyWordUpdateURL,
			displayStore: Js.Center.System.DirtyWord.Infostore,
			items: [ImportDirtyWordInfofp],
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
							url: Js.Center.System.DirtyWordUpdateURL,
							method: "POST",
							success: function(form, action){
								var objJson = Ext.util.JSON.decode(action.response.responseText);
								var falg = objJson.success;
								if (falg == true) {
									Ext.Msg.alert("温馨提示", "操作成功了!");
									Js.Center.System.DirtyWord.Infostore.reload();
									Js.Center.System.DirtyWordImport.window.hide();
								}
								else {
									Ext.Msg.alert('温馨提示', objJson.info);
									Js.Center.System.DirtyWord.Infostore.reload();
									Js.Center.System.DirtyWordImport.window.hide();
								}
							},
							failure: function(form, action){
								var objJson = Ext.util.JSON.decode(action.response.responseText);
								Ext.Msg.alert('温馨提示', objJson.info);
								Js.Center.System.DirtyWord.Infostore.reload();
								Js.Center.System.DirtyWordImport.window.hide();
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
					Js.Center.System.DirtyWordImport.window.hide();
				}
			})]
		});
	// ================================================================================ 执行显示
	}
};
