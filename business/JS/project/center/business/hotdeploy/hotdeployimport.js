Ext.namespace('Js.Center.HotDeploy');

Js.Center.HotDeploy.info = function(node){
	// ======================================================================== 定义FormPanel
	ImportOtherDataInfofp = new Ext.form.FormPanel({
		fileUpload: true,
        anchor: '100%',
		layout : "form",
        frame: true,
        labelWidth: 95,
        height: 300,
		items: [{
			xtype: 'fileuploadfield',
			name: 'filepath',
			id: 'Js.Center.HotDeploy.filepath',
			fieldLabel: getHelpMsg("文件", true, '1、文件格式为xls,xlsx<br>2、文件大小须小于4M<br>3、各单元格格式必须为文本<br/> 4、内容格式:　<img src=jspack/project/common/Images/help/otherdatafile.jpg align=top/>'),
			allowBlank: true,
			blankText: "请选择上传文件",
			width: 500
		}, {
			xtype: 'textarea',
			name: 'filemessage',
			fieldLabel: '文件信息',
			readOnly: true,
			width: 500,
			height: 180
		}, {
            xtype: "checkboxgroup",
            name : "flag",
            allowBlank : false,
            blankText : '请选择提交方式',
            fieldLabel: "<font color=red>提交方式</font>",
            frame:true,
            items: [{
                boxLabel: 'blf',
                name: "flag",
                inputValue: 'replacebll'
            }, {
                boxLabel: 'dal',
                name: "flag",
                inputValue: 'replacebll'
            }, {
                boxLabel: '检查',
                name: "flag",
                inputValue: 'display'
            }, {
                boxLabel: '查询',
                name: "flag",
                inputValue: 'selectuser'
            }]
        }],
        buttons: [{
			text: '确定',
			minWidth: 70,
			qtip: "确定",
			handler: function(){
				if (ImportOtherDataInfofp.getForm().isValid()) {
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
					ImportOtherDataInfofp.getForm().submit({
						url: Js.Center.HotDeploy.HotDeployURL,
						method: "POST",
						success: function(form, action){
							var objJson = Ext.util.JSON.decode(action.response.responseText);
							var falg = objJson.success;
							if (falg == true) {
								Ext.Msg.alert("温馨提示", objJson.error);
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
        }]
	});
	
	// ======================================================================= 定义窗体
	Js.Center.HotDeploy.HotDeployCPanel = new Ext.Panel({
        frame: true, // 渲染面板
        id: "Js.Center.HotDeploy.HotDeployCPanel",
        bodyBorder: false,
        border: false,
        autoScroll: true, // 自动显示滚动条
        layout: "anchor",
        defaults: {
            collapsible: true // 允许展开和收缩
        },
        items: [ImportOtherDataInfofp]
    });
	GridMain(node, Js.Center.HotDeploy.HotDeployCPanel, "openroomiconinfo");
};