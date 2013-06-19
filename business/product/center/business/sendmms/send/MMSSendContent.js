Ext.namespace('Js.Center.SendMMS.MMSsendUpdate');
Js.Center.SendMMS.MMSsendUpdate.MMSSendContent = function(mmsName, id){
    var json = newMMS('','',1,1);
	//var json = eval(doSynRequest(Js.Center.SendMMS.MMSQueryDescURL + "?flag=selecthismms&nummmsseqid=" + id));
//    var params = {
//		flag:'selecthismms',
//		nummmsseqid:id
//	};
//	var json = doAjaxJson(Js.Center.SendMMS.MMSQueryDescURL,params);
    var _mmsid=id;
    if (Js.Center.SendMMS.MMSsendUpdate.MMSSendUpdateWin == null) {
		//============================================================================定义FormPanel
		//var previewMMSPanel;
    	if(typeof(mmsConfigInfo) == "undefined"){
			mmsConfigInfo = ajaxSyncCall(Js.Center.SendMMS.MMSConfigInfo,"flag=mmsconfiginfo");
		}
		Js.Center.SendMMS.MMSsendUpdate.EditPanel = new Ext.FormPanel({
			//id: "Js.Center.SendMMS.MMSsendUpdate.EditPanel",
			bodyStyle: "padding:10px 0 10px 15px",
			title: '编辑',
			region: 'center',
			//margins: '3 3 0 3',
			//cmargins: '3 3 3 3',
			labelWidth: 90,
			layout: 'form',
			fileUpload: true,
			defaults: {
				msgTarget: "side"
			},
			items: [{
				xtype: 'textfield',
				id: 'Js.Center.SendMMS.MMSsendUpdate.ContentMMSName',
				style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
				name: 'MMSname',
				fieldLabel: "彩信标题",
				disabled: true,
				//value: mmsName,
				width: 350
			}, {
				xtype: 'numberfield',
				//id: 'Js.Center.SendMMS.MMSsendUpdate.DatFrameTime',
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
			}, {
				xtype: 'FileUpload',
				id: 'Js.Center.SendMMS.MMSsendUpdate.vc2Image',
				style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
				name: 'vc2image',
				fieldLabel: getHelpMsg("帧图片", false, "此项非必选项，上传图片格式为："+MMSIMAGEFILETYPEDESC+"，尺寸最大限制为" + mmsConfigInfo.imagewidth + " x " + mmsConfigInfo.imageheight + "（宽x高），大小不能超过"+mmsConfigInfo.imagesize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的图片！"),
				width: 200
			}, {
				xtype: 'FileUpload',
				id: 'Js.Center.SendMMS.MMSsendUpdate.vc2Music',
				style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
				name: 'vc2music',
				fieldLabel: getHelpMsg("帧背景音乐", false, "此项非必选项，上传音乐格式为："+MMSMUSICFILETYPEDESC+"，大小不能超过"+mmsConfigInfo.musicsize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的音乐！"),
				width: 350
			}, {
				xtype: 'textarea',
				id: 'Js.Center.SendMMS.MMSsendUpdate.vc2Word',
				name: 'vc2word',
				style: 'word-wrap:break-word;word-break:break-all;',
				fieldLabel: getHelpMsg("帧文字", false, "此项非必填项，长度不能超过2000！"),
				maxLength: 2000,
				maxLengthText: '长度不能超过2000',
				regex: WXTL.Common.regex.IllegalDiyDiy,
				regexText: WXTL.Common.regexText.IllegalDiyText,
				width: 350,
				height: 150,
				validator: function(){
					var word = Ext.get("Js.Center.SendMMS.MMSsendUpdate.vc2Word").dom.value;
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
				id: 'Js.Center.SendMMS.MMSsendUpdate.CurrFrameOrder',
				name: 'numframeorder',
				fieldLabel: "帧序号",
				width: "90%",
				height: 150
			}, {
				xtype: 'hidden',
				id: 'Js.Center.SendMMS.MMSsendUpdate.CurrFrameJson',
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
				id: 'Js.Center.SendMMS.MMSsendUpdate.Contentmmsid',
				style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
				name: 'mmsid',
				fieldLabel: "彩信编号",
				width: 350
			}],
			buttons: [new Ext.Button({
				text: '修改帧',
				minWidth: 70,
				handler: function(){
					if (Js.Center.SendMMS.MMSsendUpdate.EditPanel.getForm().isValid()) {
						//判断是否为空帧
						if (checkMMSFrame(Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[2].getCheckValue(), Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.contentJson.frame[Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.currFrame].vc2image.vc2rescurl, Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[4].getValue(), Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[2].getValue())) {
							//检查帧图片类型是否正确
							if (Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[2].getValue() != "" && !checkMMSFrameImageType(Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[2].getCheckValue(), Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[2].getValue())) {
								return false;
							}
							//检查帧背景音乐类型是否正确
							if (Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[3].getValue() != "" && !checkMMSFrameMusicType(Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[3].getCheckValue(), Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[3].getValue())) {
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
							
							
							Js.Center.SendMMS.MMSsendUpdate.EditPanel.getForm().submit({
								url: Js.Center.SendMMS.MMSFrameUpdateURL,
								method: "POST",
								success: function(form, action){
									var objJson = Ext.util.JSON.decode(action.response.responseText);
									var falg = objJson.success;
									var frameJson = objJson.data;
									if (falg == true) {
										if (!Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[2].getCheckValue()) {
											if (Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[2].getValue() == "") {
												if (Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.contentJson.frame[Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.currFrame].vc2image.vc2rescurl != "") {
													frameJson.vc2image = Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.contentJson.frame[Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.currFrame].vc2image;
												}
											}
										}
										Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.contentJson.frame[Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.currFrame] = frameJson;
										Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.refreshAll();
										Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.render();
										Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel.refreshBrotherPanel();
										Ext.Msg.alert("温馨提示", "操作成功了!");
                                        
                                        if (document.getElementById("Js.Center.SendMMS.MMSsendUpdate.vc2Image") != null) {
                                            Js.Center.SendMMS.MMSsendUpdate.EditPanel.remove("Js.Center.SendMMS.MMSsendUpdate.vc2Image");
                                            var fileUp = new WXTL.Widgets.CommonForm.FileUpload({
                                                id: 'Js.Center.SendMMS.MMSsendUpdate.vc2Image',
                                                style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
                                                name: 'vc2image',
                                                fieldLabel: getHelpMsg("帧图片", false, "此项非必选项，上传图片格式为："+MMSIMAGEFILETYPEDESC+"，尺寸最大限制为" + mmsConfigInfo.imagewidth + " x " + mmsConfigInfo.imageheight + "（宽x高），大小不能超过"+mmsConfigInfo.imagesize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的图片！"),
												width: 350
                                            });
                                            Js.Center.SendMMS.MMSsendUpdate.EditPanel.insert(2, fileUp);
                                            Js.Center.SendMMS.MMSsendUpdate.EditPanel.doLayout();
                                        }
                                        if (document.getElementById("Js.Center.SendMMS.MMSsendUpdate.vc2Music") != null) {
                                            Js.Center.SendMMS.MMSsendUpdate.EditPanel.remove("Js.Center.SendMMS.MMSsendUpdate.vc2Music");
                                            var fileUpMusic = new WXTL.Widgets.CommonForm.FileUpload({
                                                id: 'Js.Center.SendMMS.MMSsendUpdate.vc2Music',
                                                style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
                                                name: 'vc2music',
                                                fieldLabel: getHelpMsg("帧背景音乐", false, "此项非必选项，上传音乐格式为："+MMSMUSICFILETYPEDESC+"，大小不能超过"+mmsConfigInfo.musicsize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的音乐！"),
												width: 350
                                            });
                                            Js.Center.SendMMS.MMSsendUpdate.EditPanel.insert(3, fileUpMusic);
                                            Js.Center.SendMMS.MMSsendUpdate.EditPanel.doLayout();
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
		
		Js.Center.SendMMS.MMSsendUpdate.FramePanel = new WXTL.Widgets.CommonPanel.MMSFramePanel({
			//id: "Js.Center.SendMMS.MMSsendUpdate.FramePanel",
			title: '帧',
			currFrame: 0,
			region: 'south',
			//autoScroll: false, // 自动显示滚动条
			margins: '3 3 3 3',
			cmargins: '3 3 3 3',
			height: 189,
			width: 778,
			contentJson: json,
			frame: false, // 渲染面板,
			listeners: {
				afterRefresh: function(obj, json, currFrame){
					//Js.Center.SendMMS.MMSsendUpdate.EditPanel.getForm().reset();
					//Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[0].setValue(mmsName);
					Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[1].setValue(currFrame.numframetime);
					Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[2].setValue(currFrame.vc2image.vc2resurl);
					Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[3].setValue(currFrame.vc2backmusic.vc2resurl);
					Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[4].setValue(currFrame.vc2word.vc2rescdesc1);
					Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[5].setValue(currFrame.numframeorder);
					Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[7].setValue("mmshisoption");
					Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[8].setValue(Js.Center.SendMMS.MMSsendUpdate.EditPanel.items.items[8].getValue());

				}
			}
		});
		Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel = new WXTL.Widgets.CommonPanel.MMSpanel({
			//id: "Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel",
			title: '预览：第1帧',
			region: 'west',
			brotherPanel: Js.Center.SendMMS.MMSsendUpdate.FramePanel,
			width: 244,
			height: 340,
			collapsible: true,
			//margins: '3 0 0 3',
			//cmargins: '3 3 3 3',
			frame: false
		});
		Js.Center.SendMMS.MMSsendUpdate.FramePanel.brotherPanel = Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel;
		//定义主Panel
		//	if(Js.Center.SendMMS.MMSsendUpdate.ShowPanel != null){
		//		Js.Center.SendMMS.MMSsendUpdate.ShowPanel.removeAll();
		//	}
		Js.Center.SendMMS.MMSsendUpdate.ShowPanel = new Ext.Panel({
			//bodyStyle: "padding:10px 0 10px 15px",
			//title: '编辑',
			//region: 'center',
			width: 778,
			height: 590,
			frame: false,
			layout: 'border',
			border: true,
			items: [Js.Center.SendMMS.MMSsendUpdate.EditPanel, Js.Center.SendMMS.MMSsendUpdate.FramePanel, Js.Center.SendMMS.MMSsendUpdate.PreviewMMSPanel]
		});
	}
};
