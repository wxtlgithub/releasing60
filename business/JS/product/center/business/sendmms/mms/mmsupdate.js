Ext.namespace('Js.Center.SendMMS.MMSUpdate');
Ext.QuickTips.init();

Js.Center.SendMMS.MMSUpdate.func = function(row){
    if (Ext.get("Js.Center.SendMMS.MMSUpdate.FormPanel") == null) {
        var formPanel = new Ext.FormPanel({
            id: "Js.Center.SendMMS.MMSUpdate.FormPanel",
            bodyStyle: "padding:10px 10px 10px 15px",
            region: 'center',
            margins: '3 3 0 3',
            cmargins: '3 3 3 3',
            labelWidth: 80,
            layout: 'form',
            bodyBorder: false,
            defaults: {
                msgTarget: "side"
            },
            items: [{
                xtype: 'textfield',
                id: 'Js.Center.SendMMS.MMSUpdate.initMMSnameUpdate',
                name: 'vc2name',
                fieldLabel: getHelpMsg("彩信标题", true, "此项必填，用于在目标手机上显示的彩信标题，长度小于等于20！"),
                regex: WXTL.Common.regex.IllegalDiy,
                regexText: WXTL.Common.regexText.IllegalText,
                allowBlank: false,
                blankText: '此项必填，长度小于等于20！',
                maxLength: 20,
                maxLengthText: '长度应小于等于20',
                width: 250
            }, {
                xtype: 'textfield',
                id: 'Js.Center.SendMMS.MMSUpdate.initvc2desc',
                name: 'vc2desc',
                style: 'word-wrap:break-word;word-break:break-all;',
                fieldLabel: getHelpMsg("彩信名称", false, "此项非必填项，用于区分相同标题的彩信，如果为空，默认为以上所填彩信标题，长度小于等于100！"),
                regex: WXTL.Common.regex.IllegalDiy,
                regexText: WXTL.Common.regexText.IllegalText,
                maxLength: 100,
                maxLengthText: '长度不能超过100！',
                width: 250
            }, {
                xtype: "xComboBox",
                //id: "initMMStype",
                name: "nummmstype",
                fieldLabel: "彩信类型",
                triggerAction: 'all',
                mode: "local",
                //value:0,
                width: 250,
                displayField: "vc2type",
                valueField: "numtype",
                store: new Ext.data.SimpleStore({
                    fields: ['numtype', 'vc2type'],
                    data: [[1, '普通彩信'], [2, '个性化彩信']]
                })
            }]
        });
        //formPanel.items.get(0).focus(true,600); 
        this.window = new WXTL.Widgets.CommonWindows.Window({
            title: "编辑彩信",
            width: 400,
            //height: 275,
            closeAction: 'hide',
            mainForm: formPanel.getForm(),
            needButtons: false,
            displayStore: Js.Center.SendMMS.MMS.Infostore,
            updateState: true,
            updateRecord: row,
            items: [formPanel],
            buttons: [new Ext.Button({
                text: '继续',
                minWidth: 70,
                qtip: "编辑彩信",
                handler: function(){
                    if (formPanel.getForm().isValid()) {
                        var falg;
                        var params = {
                            flag: "check",
                            content: Ext.get("Js.Center.SendMMS.MMSUpdate.initMMSnameUpdate").dom.value
                        };
                        var _mmsDesc = Ext.get("Js.Center.SendMMS.MMSUpdate.initvc2desc").getValue();
                        if( _mmsDesc == ""){
                            _mmsDesc = formPanel.items.items[0].el.dom.value;
                        }
						var newMMSParmas = {
							mmsName:formPanel.items.items[0].el.dom.value, 
							mmsDesc:_mmsDesc,//Ext.get("Js.Center.SendMMS.MMSUpdate.initvc2desc").getValue(), 
							mmsType:formPanel.items.items[2].getValue(), 
							id:Js.Center.SendMMS.MMSUpdate.window.updateRecord.get("nummmsid")
						};
						Js.Center.SendMMS.MMSUpdate.EditMMSWin.updateRecord = newMMSParmas;
						Js.Center.SendMMS.MMSUpdate.window.mainFormSubmitFunc('Js.Center.SendMMS.MMSUpdate.EditMMSWin.show()',params,Js.Center.System.DirtyWordURL);
                        //Js.Center.SendMMS.MMSUpdate.window.mainFormSubmitFunc('Js.Center.SendMMS.MMSUpdate.func_Update(\'' + formPanel.items.items[0].el.dom.value + '\', \'' + Ext.get("Js.Center.SendMMS.MMSUpdate.initvc2desc").getValue() + '\', \'' + formPanel.items.items[1].getValue() + '\', \'' + Js.Center.SendMMS.MMSUpdate.window.updateRecord.get("nummmsid") + '\')',params,Js.Center.System.DirtyWordURL);

                    }
                }
            }), new Ext.Button({
                text: '重置',
                minWidth: 70,
                qtip: "重置数据",
                handler: function(){
                    formPanel.getForm().loadRecord(Js.Center.SendMMS.MMSUpdate.window.updateRecord);
                }
            }), new Ext.Button({
                text: '关闭',
                qtip: "关闭",
                minWidth: 70,
                handler: function(){
                    Js.Center.SendMMS.MMSUpdate.window.hide();
                }
            })]
        });
    }
    else {
        Js.Center.SendMMS.MMSUpdate.window.updateRecord = row;
    }
    //Js.Center.SendMMS.MMSUpdate.InitMMSInfoWin.show();
};

Js.Center.SendMMS.MMSUpdate.func_Update = function(){
	if (Js.Center.SendMMS.MMSUpdate.EditMMSWin == null) {
		//============================================================================定义FormPanel
		if(typeof(mmsConfigInfo) == "undefined"){
			mmsConfigInfo = ajaxSyncCall(Js.Center.SendMMS.MMSConfigInfo,"flag=mmsconfiginfo");
		}
		var updatePreviewMMSPanel;
		var fileUp = new WXTL.Widgets.CommonForm.FileUpload({
			xtype: 'FileUpload',
			id: 'Js.Center.SendMMS.MMSUpdate.funcvc2image',
			style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
			name: 'vc2image',
			fieldLabel: getHelpMsg("帧图片", false, "此项非必选项，上传图片格式为："+MMSIMAGEFILETYPEDESC+"，尺寸最大限制为" + mmsConfigInfo.imagewidth + " x " + mmsConfigInfo.imageheight + "（宽x高），大小不能超过"+mmsConfigInfo.imagesize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的图片！"),
			width: 350
		});
		var updateEditPanel = new Ext.FormPanel({
			id: "Js.Center.SendMMS.MMSUpdate.updateEditPanel",
			bodyStyle: "padding:10px 0 10px 15px",
			title: '编辑',
			region: 'center',
			margins: '3 3 0 3',
			cmargins: '3 3 3 3',
			labelWidth: 90,
			layout: 'form',
			fileUpload: true,
			defaults: {
				msgTarget: "side"
			},
			items: [{
				xtype: 'textfield',
				//id: 'funcMMSname',
				style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
				name: 'MMSname',
				fieldLabel: "彩信标题",
				disabled: true,
				//value: mmsName,
				width: 350
			}, {
				xtype: 'numberfield',
				//id: 'funcdatframetime',
				style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
				name: 'datframetime',
				fieldLabel: getHelpMsg("帧播放时间", true, "此项必填，范围在1-120，以秒为单位！"),
				allowBlank: false,
				blankText: '此项必填，范围在1-120，以秒为单位！',
				maxValue: 120,
				maxText: '最大不能超过120秒',
				minValue: 1,
				minText: '最小不能小于1秒',
				allowDecimals: false,
				value: "5",
				width: 30
			}, fileUp, {
				xtype: 'FileUpload',
				id: 'Js.Center.SendMMS.MMSUpdate.vc2Music',
				style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
				name: 'vc2music',
				fieldLabel: getHelpMsg("帧背景音乐", false, "此项非必选项，上传音乐格式为："+MMSMUSICFILETYPEDESC+"，大小不能超过"+mmsConfigInfo.musicsize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的音乐！"),
				width: 350
			
			}, {
				xtype: 'textarea',
				//id: 'funcvc2word',
				id: 'Js.Center.SendMMS.MMSUpdate.mmseditvc2word',
				name: 'vc2word',
				style: 'word-wrap:break-word;word-break:break-all;',
				fieldLabel: getHelpMsg("帧文字", false, "此项非必填项，长度不能超过2000！"),
				maxLength: 2000,
				maxLengthText: '长度不能超过2000',
				regex: WXTL.Common.regex.IllegalDiy,
				regexText: WXTL.Common.regexText.IllegalDiyText,
				width: 350,
				height: 150,
				validator: function(){
					var word = Ext.get("Js.Center.SendMMS.MMSUpdate.mmseditvc2word").dom.value;
					if (isExistsHtmlLable(word)) {
						//Ext.Msg.alert("温馨提示", "操作成功了111111!  "+Ext.get("mmseditvc2word").dom.value);
						return false;
					}
					else {
						return true;
					}
				},
				invalidText: '帧文字不能包含HTML标签'
			}, {
				xtype: 'hidden',
				//id: 'funccurrframe',
				name: 'numframeorder',
				fieldLabel: "帧序号",
				width: "90%",
				height: 150
			}, {
				xtype: 'hidden',
				//id: 'funccurrframejson',
				name: 'currframejson',
				fieldLabel: "帧Json",
				width: "90%",
				height: 150
			}, {
				xtype: 'hidden',
				style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
				name: 'flag',
				fieldLabel: "标识",
				width: 350
			}, {
				xtype: 'hidden',
				style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
				name: 'mmsid',
				fieldLabel: "彩信编号",
				width: 350
			}],
			buttons: [new Ext.Button({
				text: '修改帧',
				minWidth: 70,
				handler: function(){
					if (updateEditPanel.getForm().isValid()) {
						if (checkMMSFrame(updateEditPanel.items.items[2].getCheckValue(), updatePreviewMMSPanel.contentJson.frame[updatePreviewMMSPanel.currFrame].vc2image.vc2rescurl, updateEditPanel.items.items[4].getValue(), updateEditPanel.items.items[2].getValue())) {
							//检查帧图片类型是否正确
							if (updateEditPanel.items.items[2].getValue() != "" && !checkMMSFrameImageType(updateEditPanel.items.items[2].getCheckValue(), updateEditPanel.items.items[2].getValue())) {
								return false;
							}
							//检查帧背景音乐类型是否正确
							if (updateEditPanel.items.items[3].getValue() != "" && !checkMMSFrameMusicType(updateEditPanel.items.items[3].getCheckValue(), updateEditPanel.items.items[3].getValue())) {
								return false;
							}
							// 弹出效果
							Ext.MessageBox.show({
								msg: '正在处理，请稍等...',
								progressText: 'Saving...',
								width: 300,
								wait: true,
								icon: 'download',
								animEl: 'saving'
							});
							updateEditPanel.getForm().submit({
								url: Js.Center.SendMMS.MMSFrameUpdateURL,
								method: "POST",
								success: function(form, action){
									var objJson = Ext.util.JSON.decode(action.response.responseText);
									var falg = objJson.success;
									var frameJson = objJson.data;
									if (falg == true) {
										if (!updateEditPanel.items.items[2].getCheckValue()) {
											if (updateEditPanel.items.items[2].getValue() == "") {
												if (updatePreviewMMSPanel.contentJson.frame[updatePreviewMMSPanel.currFrame].vc2image.vc2rescurl != "") {
													//frameJson.vc2image.vc2rescurl = updatePreviewMMSPanel.contentJson.frame[updatePreviewMMSPanel.currFrame].vc2image.vc2rescurl;
													frameJson.vc2image = updatePreviewMMSPanel.contentJson.frame[updatePreviewMMSPanel.currFrame].vc2image;
												}
											}
										}
										updatePreviewMMSPanel.contentJson.frame[updatePreviewMMSPanel.currFrame] = frameJson;
										updatePreviewMMSPanel.refreshAll();
										updatePreviewMMSPanel.render();
										updatePreviewMMSPanel.refreshBrotherPanel();
										Ext.Msg.alert("温馨提示", "操作成功了!");
										if (document.getElementById("Js.Center.SendMMS.MMSUpdate.funcvc2imagetf") != null) {
											updateEditPanel.remove("Js.Center.SendMMS.MMSUpdate.funcvc2image");
											fileUp = new WXTL.Widgets.CommonForm.FileUpload({
												id: 'Js.Center.SendMMS.MMSUpdate.funcvc2image',
												style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
												name: 'vc2image',
												fieldLabel: getHelpMsg("帧图片", false, "此项非必选项，上传图片格式为："+MMSIMAGEFILETYPEDESC+"，尺寸最大限制为" + mmsConfigInfo.imagewidth + " x " + mmsConfigInfo.imageheight + "（宽x高），大小不能超过"+mmsConfigInfo.imagesize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的图片！"),
												width: 350
											});
											updateEditPanel.insert(2, fileUp);
											updateEditPanel.doLayout();
										}
										if (document.getElementById("Js.Center.SendMMS.MMSUpdate.vc2Music") != null) {
											updateEditPanel.remove("Js.Center.SendMMS.MMSUpdate.vc2Music");
											var fileUpMusic = new WXTL.Widgets.CommonForm.FileUpload({
												id: 'Js.Center.SendMMS.MMSUpdate.vc2Music',
												style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
												name: 'vc2music',
												fieldLabel: getHelpMsg("帧背景音乐", false, "此项非必选项，上传音乐格式为："+MMSMUSICFILETYPEDESC+"，大小不能超过"+mmsConfigInfo.musicsize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的音乐！"),
												width: 350
											});
											updateEditPanel.insert(3, fileUpMusic);
											updateEditPanel.doLayout();
										}
									}
									else 
										Ext.Msg.alert('温馨提示', objJson.info);
								},
								failure: function(form, action){
									var objJson = Ext.util.JSON.decode(action.response.responseText);
									Ext.Msg.alert('温馨提示', objJson.info);
								}
							});
							
						}
					}
				}
			})]
		});
		
		var updateFramePanel = new WXTL.Widgets.CommonPanel.MMSFramePanel({
			id: "Js.Center.SendMMS.MMSUpdate.updateFramePanel",
			title: '帧',
			currFrame: 0,
			region: 'south',
			autoScroll: false, // 自动显示滚动条
			margins: '3 3 3 3',
			cmargins: '3 3 3 3',
			height: 189,
			width: 778,
			contentJson: Js.Center.SendMMS.MMS.InitMMSInfo,//updateJson,
			frame: false, // 渲染面板,
			listeners: {
				afterRefresh: function(obj, json, currFrame){
					//updateEditPanel.getForm().reset();
					//updateEditPanel.items.items[0].setValue(mmsName);
					updateEditPanel.items.items[1].setValue(currFrame.numframetime);
					updateEditPanel.items.items[2].setValue(currFrame.vc2image.vc2resurl);
					updateEditPanel.items.items[3].setValue(currFrame.vc2backmusic.vc2resurl);
					updateEditPanel.items.items[4].setValue(currFrame.vc2word.vc2rescdesc1);
					updateEditPanel.items.items[5].setValue(currFrame.numframeorder);
					updateEditPanel.items.items[7].setValue("mmscuroption");
				//updateEditPanel.items.items[8].setValue(id);
				
				
				//if(Ext.get("Js.Center.SendMMS.MMSUpdate.funcvc2image")!=null){
				//	var e=document.getElementById("Js.Center.SendMMS.MMSUpdate.funcvc2image");
				//e.outerHTML = e.outerHTML;
				//}
				
				
				}
			}
		});
		updatePreviewMMSPanel = new WXTL.Widgets.CommonPanel.MMSpanel({
			id: "Js.Center.SendMMS.MMSUpdate.updatePreviewMMSPanel",
			title: '预览：第1帧',
			region: 'west',
			brotherPanel: updateFramePanel,
			width: 244,
			height: 374,
			collapsible: true,
			margins: '3 0 0 3',
			cmargins: '3 3 3 3',
			frame: false
		});
		updateFramePanel.brotherPanel = updatePreviewMMSPanel;
		var updateMainPanel = new Ext.Panel({
			width: 778,
			height: 573,
			frame: false,
			layout: 'border',
			border: true,
			items: [updatePreviewMMSPanel, updateEditPanel, updateFramePanel]
		});
		//============================================================================定义窗体
		Js.Center.SendMMS.MMSUpdate.EditMMSWin = new WXTL.Widgets.CommonWindows.Window({
			title: "编辑彩信",
			width: 814,
			height: 530,
			mainForm: updateEditPanel.getForm(),
			layout: 'form',
			//closeAction: 'close',
			autoScroll: true,
			displayStore: Js.Center.SendMMS.MMS.Infostore,
			needButtons: false,
			updateState: false,
			items: [updateMainPanel],
			//items: [westPanel, updateEditPanel, updateFramePanel],
			needLoadDataStore: true,
			loadDataStoreFunc: function(){
				var mmsUpdateJson = eval(doSynRequest(Js.Center.SendMMS.MMSQueryDescURL + "?flag=selectmms&nummmsseqid=" + Js.Center.SendMMS.MMSUpdate.EditMMSWin.updateRecord.id));
				//Js.Center.SendMMS.MMSUpdate.EditMMSWin.items.items[0].items.items[0].contentJson=0;
				Js.Center.SendMMS.MMSUpdate.EditMMSWin.items.items[0].items.items[0].contentJson = mmsUpdateJson;
				Js.Center.SendMMS.MMSUpdate.EditMMSWin.items.items[0].items.items[2].contentJson = mmsUpdateJson;
				//Js.Center.SendMMS.MMSUpdate.EditMMSWin.items.items[0].items.items[0].refreshBrotherPanel(0);
				Js.Center.SendMMS.MMSUpdate.EditMMSWin.items.items[0].items.items[0].currFrame = 0;
				Js.Center.SendMMS.MMSUpdate.EditMMSWin.items.items[0].items.items[0].refreshAll();
				Js.Center.SendMMS.MMSUpdate.EditMMSWin.items.items[0].items.items[2].refreshAll();
				Js.Center.SendMMS.MMSUpdate.EditMMSWin.items.items[0].items.items[0].refreshBrotherPanel(0);
				updateEditPanel.items.items[0].setValue(Js.Center.SendMMS.MMSUpdate.EditMMSWin.updateRecord.mmsName);
				updateEditPanel.items.items[8].setValue(Js.Center.SendMMS.MMSUpdate.EditMMSWin.updateRecord.id);
				
				//previewMMS(mmsUpdateJson.frame.length);
				//window.clearInterval(playTime);
			},
			buttons: [new Ext.Button({
				text: '保存彩信',
				minWidth: 70,
				qtip: "保存彩信",
				handler: function(){
					if (checkMMS(updatePreviewMMSPanel.contentJson)) {
						Ext.MessageBox.show({
							msg: '正在处理，请稍等...',
							progressText: 'Saving...',
							width: 300,
							wait: true,
							icon: 'download',
							animEl: 'saving'
						});
						updatePreviewMMSPanel.contentJson.vc2name = Js.Center.SendMMS.MMSUpdate.EditMMSWin.updateRecord.mmsName;
						updatePreviewMMSPanel.contentJson.nummmstype = Js.Center.SendMMS.MMSUpdate.EditMMSWin.updateRecord.mmsType;
						updatePreviewMMSPanel.contentJson.vc2desc = Js.Center.SendMMS.MMSUpdate.EditMMSWin.updateRecord.mmsDesc;
						var url = Js.Center.SendMMS.MMSUpdateURL;
						var params = {
							mmsjson: Ext.encode(updatePreviewMMSPanel.contentJson)
						};
						Ext.Ajax.request({
							url: url,
							method: "POST",
							params: params,
							success: function(form, action){
								var obj = Ext.util.JSON.decode(form.responseText);
								var falg = obj.success;
								if (falg == true) {
									Ext.Msg.alert("温馨提示", "操作已成功!");
									Js.Center.SendMMS.MMSUpdate.EditMMSWin.hide();
									if (Js.Center.SendMMS.MMS.Infostore != null) 
										Js.Center.SendMMS.MMS.Infostore.reload();
								}
								else 
									Ext.Msg.alert('温馨提示', obj.info);
								
							},
							failure: function(form, action){
								Ext.Msg.alert('温馨提示', '系统忙，请稍候...');
							}
						})
					//doAjax(url, params,Js.Center.SendMMS.MMS.Infostore);
					//Js.Center.SendMMS.MMSUpdate.EditMMSWin.close();
					}
				}
			}), //========以后备用
 new Ext.Button({
				hidden: true,
				text: '测试发送',
				qtip: "测试发送",
				minWidth: 70,
				handler: function(){
					Js.Center.SendMMS.SendTest.func(updatePreviewMMSPanel.contentJson);
				}
			}), //========以后备用
 new Ext.Button({
				text: '关闭',
				qtip: "关闭",
				minWidth: 70,
				handler: function(){
					Js.Center.SendMMS.MMSUpdate.EditMMSWin.hide();
				}
			})],
			listeners:{
			    "hide": function(){
			        //判断如果关闭窗体的时候，彩信处于播放状态，则停止播放
			        if(Js.Center.SendMMS.MMSUpdate.EditMMSWin.items.items[0].items.items[0].bottomToolbar.items.items[0].text != "播放"){
			            previewMMS(Js.Center.SendMMS.MMSUpdate.EditMMSWin.items.items[0].items.items[0].contentJson.frame.length);
				        window.clearInterval(playTime);
				    }
			    }
			}
		});
	//};
	//============================================================================执行显示
	//Js.Center.SendMMS.MMSUpdate.EditMMSWin.show();
	}
};
