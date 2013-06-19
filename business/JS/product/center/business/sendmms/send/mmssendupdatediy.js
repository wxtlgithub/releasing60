/**
 * @author 赵艳华
 * 个性化彩信编辑
 */
Ext.namespace('Js.Center.SendMMS.MMSsendUpdateDiy');
Js.Center.SendMMS.MMSsendUpdateDiy.func = function(show, row){
	if (Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin == null) {
    //if (Ext.get("Js.Center.SendMMS.MMSsendUpdateDiy.MMSSendUpdatePanel") == null) {
		var productCombox = new Ext.form.ComboBox({
			xtype: "combo",
			name: "numproductid",
			hiddenName: "numproductid",
			//id: 'Js.Center.SendMMS.MMSsendUpdateDiy.numproductid',
			emptyText: "-=请选择=-",
			allowBlank: false,
			blankText: "请选择通道组",
			fieldLabel: "<font color=red>选择通道组</font>",
			readOnly: true,
			mode: "local",
			displayField: "vc2name",
			valueField: "numprodid",
			triggerAction: "all",
			//allowBlank:false,
			store: Js.Center.Common.ProductStore
		});
		var SendMMSUpdateDiyListFieldSet = new Ext.FormPanel({
			layout: 'column',
			fileUpload: true,
			labelAlign: 'left',
			frame: true,
			items: [{
				columnWidth: 1,
				layout: 'form',
				defaultType: "textfield",
				//锚点布局-
				defaults: {
					anchor: "45%",
					msgTarget: "side"
				},
				buttonAlign: "center",
				bodyStyle: "padding:5px 0 0px 10px",
				items: [productCombox]
			}, {
				columnWidth: .5,
				layout: 'form',
				defaultType: "textfield",
				//锚点布局-
				defaults: {
					anchor: "90%",
					msgTarget: "side"
				},
				buttonAlign: "center",
				bodyStyle: "padding:10px 0 10px 15px",
				items: [productCombox, {
					xtype: 'xDateTime',
					fieldLabel: '发送时间',
					layout: 'form',
					name: "datstarttime",
					id: 'Js.Center.SendMMS.MMSsendUpdateDiy.DatStartTime',
					timeFormat: 'H:i:s',
					value: WXTL.Common.dateTime.getNow(),
					timeConfig: {
						altFormats: 'H:i:s',
						allowBlank: true,
						invalidText: '{0} 是无效的时间-必须符合格式为：H:i:s'
					},
					dateFormat: 'Y-m-d',
					dateConfig: {
						altFormats: 'Y-m-d',
						allowBlank: true
					}
				},   {
					xtype: 'hidden',
					fieldLabel: '要发送的彩信',
					id: "Js.Center.SendMMS.MMSsendUpdateDiy.numMMSId",
					name: "nummmsid"//,
				//value: row.get("nummmsid")
				},{
					xtype: 'hidden',
					name: "numopid",
					
					value:1
				}]
			}, {
				columnWidth: .5,
				layout: 'form',
				defaultType: "textfield",
				//锚点布局-
				defaults: {
					anchor: "90%",
					msgTarget: "side"
				},
				buttonAlign: "center",
				bodyStyle: "padding:10px 0 10px 15px",
				items: [{
					xtype: "combo",
					name: "numpriority",
					fieldLabel: "<font color=red>优先级</font>",
					hiddenName: "numpriority",
					readOnly: true,
					mode: "local",
					displayField: "show",
					valueField: "value",
					triggerAction: "all",
					allowBlank: false,
					blankText: "优先级类型不允许为空",
					emptyText: "请选择",
					store: new Ext.data.SimpleStore({
						fields: ["show", "value"],
						data: [["正常", "0"], ["及时", "1"], ["紧急", "2"]]
					}),
					value: 0
				}, {
					xtype: 'xDateTime',
					fieldLabel: '结束时间',
					layout: 'form',
					name: "datendtime",
					addDays:1,
					id: 'Js.Center.SendMMS.MMSsendUpdateDiy.DatEndTime',
					timeFormat: 'H:i:s',
					value: WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), 1),
					timeConfig: {
						altFormats: 'H:i:s',
						allowBlank: true,
						invalidText: '{0} 是无效的时间-必须符合格式为：H:i:s'
					},
					dateFormat: 'Y-m-d',
					dateConfig: {
						altFormats: 'Y-m-d',
						allowBlank: true
					}
				},  {
					xtype: 'hidden',
					fieldLabel: "发送方式 1、栏目 2、客户组 3、持仓股票 4、文件  5、手机号码",
					name: 'numsendtype',
					id: 'Js.Center.SendMMS.MMSsendUpdateDiy.sendnumsendtype',
					value: 'Js.Center.SendMMS.MMSsendUpdateDiy.sendbydiy'
				}, {
					xtype: 'hidden',
					fieldLabel: "内容ID",
					name: 'numcontentid',
					id: "Js.Center.SendMMS.MMSsendUpdateDiy.numcontentid"//,
				//value: row.get("numcontentid")
				}, {
					xtype: 'hidden',
					fieldLabel: "彩信内容Json",
					name: 'vc2contentJson',
					id: "Js.Center.SendMMS.MMSsendUpdateDiy.vc2contentJson",
					value: '' //Ext.encode(Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.contentJson)
				}]
			},{
				columnWidth:1,
				layout: 'form',
            	//锚点布局-
            	defaults: {
                	anchor: "95%",
                	msgTarget: "side"
            	},
            	buttonAlign: "center",
				items:[{
					xtype:'UploadLargeFilePanel',
					id:'Js.Center.SendMMS.MMSsendUpdateDiy.UploadLargeFile',
					txtMsgHeight:'75',
					needLargfile: false,
					fieldlableFile:getHelpMsg("文件", true, "1.上传的文件扩展名必须是txt<br>2.支持客户端文件,客户端文件大小最大限制为4M<br>4.个性化内容的格式是:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13888776655|[&quot李先生&quot,&quot富国天益&quot,&quot 1.003&quot]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13888776655|[&quot刘先生&quot,&quot华夏成长&quot,&quot 1.173&quot]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13888776655|[&quot赵先生&quot,&quot富国天益&quot,&quot 1.003&quot]")
//					xtype: 'fileuploadfield',
//					id: 'Js.Center.SendMMS.MMSsendUpdateDiy.MobileFile',
//					style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
//					name: 'diyfile',
//					fieldLabel: WXTL.Common.help.MOBILEFILE,
//					allowBlank: false,
//					blankText: "请选择上传文件",
//					width: 300,
//					//inputType: 'file',
//					validator: function(){
//						var filePath = mainForm.items.items[2].getValue();
//						if (filePath != '') {
//							if (checkFile(filePath) != '') {
//								this.invalidText = checkFile(filePath);
//								return false;
//							}
//							else {
//								return true;
//							}
//						}
//						else 
//							return false;
//					}
				},{
					xtype: 'textarea',
					fieldLabel: '文件描述',
					id: "Js.Center.SendMMS.MMSsendUpdateDiy.vc2Desc",
					maxLength: 50,
					maxLengthText: '长度不能超过50！',
					name: "vc2desc"
				}]
			}]
		});
		//定义tabpanel
		var sendMMSUpdateDiyTabpanel = new Ext.Panel({
			id: "Js.Center.SendMMS.MMSsendUpdateDiy.MMSSendUpdatePanel",
			fileUpload: true,
			labelAlign: 'left',
			frame: true,
			labelWidth: 60,
			//region:'center',
			style: "background-color:#DFE8F6",
			//bodyStyle: 'padding:5px 0 0 5px;',
			defaults: {
				msgTarget: "side"
			},
			items: [{
				xtype: 'tabpanel',
				layoutOnTabChange: true,
				plain: true,
				activeTab: 0,
				height: 622,
				width: 774,
				border: true,
				items: [{
					title: '彩信内容',
					//autoScroll: true,
					layout: 'form',
					style: "background-color:#DFE8F6",
					id: "Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyContent",
					border: true,
					items: [Js.Center.SendMMS.MMSsendUpdateDiy.ShowPanel]
				}, {
					title: '发送号码',
					//autoScroll: true,
					layout: 'form',
					style: "background-color:#DFE8F6",
					defaultType: 'textfield',
					id: "Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyList",
					items: [SendMMSUpdateDiyListFieldSet]
				}],
				listeners: {
					'tabchange': function(TabPanel, Panel){
						if (Panel.id == "Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyList") {
							if (Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.updateRecord != null) {
								var rowRecord = Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.updateRecord;
								
								Ext.get('Js.Center.SendMMS.MMSsendUpdateDiy.numMMSId').dom.value = rowRecord.get("nummmsid");
								Ext.get('Js.Center.SendMMS.MMSsendUpdateDiy.numcontentid').dom.value = rowRecord.get("numcontentid");
								Ext.get('Js.Center.SendMMS.MMSsendUpdateDiy.vc2contentJson').dom.value = Ext.encode(Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.contentJson);
							}
						}
						
					}
				}
			}]
		});
		var mainForm = SendMMSUpdateDiyListFieldSet.getForm();
		//=====================================================定义主窗体
		Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin = new WXTL.Widgets.CommonWindows.Window({
			title: "个性化彩信编辑",
			width: 819,
			height: 522,
			autoScroll: true,
			layout: 'form',
			closeAction: 'hide',//关闭方式
			mainForm: mainForm,
			displayStore: Js.Center.SendMMS.Send.DisplayStore,
			updateURL: Js.Center.SendMMS.MMSContentUpdateURL,
			needButtons: false,
			updateState: false,
			items: [sendMMSUpdateDiyTabpanel],//[Js.Center.SendMMS.MMSsendUpdatediyUpdate.showPanel],//[Js.Center.SendMMS.MMSsendUpdatediyUpdate.MMSSendListPanel],//
			buttons: [new Ext.Button({
				text: '提交',
				minWidth: 70,
				qtip: "提交",
				handler: function(){
                    Ext.getCmp("Js.Center.SendMMS.MMSsendUpdateDiy.DatStartTime").updateDate();
                    Ext.getCmp("Js.Center.SendMMS.MMSsendUpdateDiy.DatEndTime").updateDate();
                    Ext.getCmp("Js.Center.SendMMS.MMSsendUpdateDiy.DatStartTime").updateTime();
                    Ext.getCmp("Js.Center.SendMMS.MMSsendUpdateDiy.DatEndTime").updateTime();
                    var datStart_date = SendMMSUpdateDiyListFieldSet.findById("Js.Center.SendMMS.MMSsendUpdateDiy.DatStartTime").getValue();
                    var datend_date = SendMMSUpdateDiyListFieldSet.findById("Js.Center.SendMMS.MMSsendUpdateDiy.DatEndTime").getValue();

				
				
					//检测开始时间不得晚于当前时间
					if (Date.parse(WXTL.Common.dateTime.getNowDate()) - Date.parse(datStart_date) > 0) {
						Ext.Msg.alert("温馨提示：", "发送时间不能晚于当前时间");
						return false;
					}
					//检测结束时间是否早于开始时间            
					if (Date.parse(datStart_date) - Date.parse(datend_date) > 0) {
						Ext.Msg.alert("温馨提示：", "结束时间不能早于发送时间");
						return false;
					}
                    //检测结束时间是否当前时间
                    if (Date.parse(datend_date) - Date.parse(WXTL.Common.dateTime.getNow()) < 0) {
                        Ext.Msg.alert("温馨提示：", "结束时间不能早于当前时间");
                        return false;
                    }  
                                  					
					if (checkMMS(Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.contentJson)) {
						sendMMSUpdateDiyTabpanel.items.items[0].setActiveTab(1);
						Ext.get("Js.Center.SendMMS.MMSsendUpdateDiy.vc2contentJson").dom.value = Ext.encode(Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.contentJson);
						Js.Center.SendMMS.MMSsendUpdateDiy.saveSMS();
					}
				}
			}), new Ext.Button({
				hidden: true,
				text: '测试发送',
				qtip: "测试发送",
				minWidth: 70,
				handler: function(){
					Js.Center.SendMMS.SendTest.func(Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.contentJson);
				}
			}), new Ext.Button({
				text: '取消',
				qtip: "取消",
				minWidth: 70,
				handler: function(){
					Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.hide();
					Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.items.items[0].items.items[0].setActiveTab(0);
				}
			})],
			listeners: {
				"show": function(){
					
					Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.items.items[0].items.items[0].setActiveTab(0);
					if (Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.updateRecord != null) {
						var rowRecord = Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.updateRecord;
						var jsonUpdateMMS = eval(doSynRequest(Js.Center.SendMMS.MMSQueryDescURL + "?flag=selecthismms&nummmsseqid=" + Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.updateRecord.get("nummmsid")));
                        Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.contentJson = jsonUpdateMMS;
						Js.Center.SendMMS.MMSsendUpdateDiy.FramePanel.contentJson = jsonUpdateMMS;
						Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.currFrame = 0;
						Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.refreshAll();
						//Js.Center.SendMMS.MMSsendUpdateDiy.FramePanel.refreshAll();
						Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.refreshBrotherPanel(0);
						//Js.Center.SendMMS.MMSsendUpdateDiy.MMSSendContent(rowRecord.get("vc2name"), rowRecord.get("nummmsid"));
						//Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.items.items[0].items.items[0].items.items[0].add(Js.Center.SendMMS.MMSsendUpdateDiy.ShowPanel);
						//Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.items.items[0].items.items[0].items.items[0].doLayout();
						
						Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[0].setValue(Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.updateRecord.get("vc2name"));
						Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[8].setValue(Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.updateRecord.get("nummmsid"));
						window.clearInterval(playTime);
					}
					Js.Center.Common.ProductStore.load({
						params: {
							vc2servicetype: '2'
						}
					});
                    SendMMSUpdateDiyListFieldSet.findById("Js.Center.SendMMS.MMSsendUpdateDiy.DatEndTime").setValue(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), 1));
                    //Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.stopCurrFrame();
				},
				"hide": function(){
				    //解决彩信编辑播放、停止，和彩信预览播放、 停止问题
				    if(Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.bottomToolbar.items.items[0].text != "播放"){
				        previewMMS(Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.contentJson.frame.length);
                        window.clearInterval(playTime);
                    }
					Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.items.items[0].items.items[0].setActiveTab(0);
				}
			}
		});
	}
    if(show) {
        //Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.show();
    }
    Js.Center.SendMMS.MMSsendUpdateDiy.saveSMS = function(){
        if (Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.mainForm.isValid()) {
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
            
		 Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.mainFormSubmitFunc();
//            mainForm.submit({
//                url: Js.Center.SendMMS.MMSContentUpdateURL,
//                method: "POST",
//                success: function(form, action){
//                    if (action.response.responseText != "") {
//                        var objJson = Ext.util.JSON.decode(action.response.responseText);
//                        var falg = objJson.success;
//                        if (falg == true) {
//                            Ext.Msg.alert("温馨提示", "操作成功了!");
//                            Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.close();
//                            Js.Center.SendMMS.Send.DisplayStore.reload();
//                            
//                        }
//                        else {
//                            Ext.Msg.alert('温馨提示', objJson.info);
//                            Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.close();
//                            Js.Center.SendMMS.Send.DisplayStore.reload();
//                        }
//                    }
//                    else {
//                        Ext.Msg.alert("温馨提示", "操作成功了!");
//                        Js.Center.SendMMS.MMSsendUpdateDiy.MMSsendUpdatediyWin.close();
//                        Js.Center.SendMMS.Send.DisplayStore.reload();
//                    }
//                },
//                failure: function(form, action){
//                    var objJson = Ext.util.JSON.decode(action.response.responseText);
//                    Ext.Msg.alert('温馨提示', objJson.info);
//                }
//            });
        }
    };
};

//Ext.namespace('Js.Center.SendMMS.MMSsendUpdateDiy');
Js.Center.SendMMS.MMSsendUpdateDiy.MMSSendContent = function(mmsName, id){
    var json = newMMS('','',1,1);
	//var json = eval(doSynRequest(Js.Center.SendMMS.MMSQueryDescURL + "?flag=selecthismms&nummmsseqid=" + id));
//    var params = {
//		flag:'selecthismms',
//		nummmsseqid:id
//	};
//	var json = doAjaxJson(Js.Center.SendMMS.MMSQueryDescURL,params);
    var _mmsid=id;
    if (Js.Center.SendMMS.MMSsendUpdateDiy.MMSSendUpdateWin == null) {
		//============================================================================定义FormPanel
		//var previewMMSPanel;
    	if(typeof(mmsConfigInfo) == "undefined"){
			mmsConfigInfo = ajaxSyncCall(Js.Center.SendMMS.MMSConfigInfo,"flag=mmsconfiginfo");
		}
		Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel = new Ext.FormPanel({
			//id: "Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel",
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
				//id: 'Js.Center.SendMMS.MMSsendUpdateDiy.MMSName',
				style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
				name: 'MMSname',
				fieldLabel: "彩信标题",
				disabled: true,
				//value: mmsName,
				width: 350
			}, {
				xtype: 'numberfield',
				//id: 'Js.Center.SendMMS.MMSsendUpdateDiy.DatFrameTime',
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
				id: 'Js.Center.SendMMS.MMSsendUpdateDiy.vc2Image',
				style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
				name: 'vc2image',
				fieldLabel: getHelpMsg("帧图片", false, "此项非必选项，上传图片格式为："+MMSIMAGEFILETYPEDESC+"，尺寸最大限制为" + mmsConfigInfo.imagewidth + " x " + mmsConfigInfo.imageheight + "（宽x高），大小不能超过"+mmsConfigInfo.imagesize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的图片！"),
				width: 200
			}, {
				xtype: 'FileUpload',
				id: 'Js.Center.SendMMS.MMSsendUpdateDiy.vc2Music',
				style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
				name: 'vc2music',
				fieldLabel: getHelpMsg("帧背景音乐", false, "此项非必选项，上传音乐格式为："+MMSMUSICFILETYPEDESC+"，大小不能超过"+mmsConfigInfo.musicsize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的音乐！"),
				width: 350
			}, {
				xtype: 'textarea',
				id: 'Js.Center.SendMMS.MMSsendUpdateDiy.vc2Word',
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
					var word = Ext.get("Js.Center.SendMMS.MMSsendUpdateDiy.vc2Word").dom.value;
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
				id: 'Js.Center.SendMMS.MMSsendUpdateDiy.CurrFrameOrder',
				name: 'numframeorder',
				fieldLabel: "帧序号",
				width: "90%",
				height: 150
			}, {
				xtype: 'hidden',
				id: 'Js.Center.SendMMS.MMSsendUpdateDiy.CurrFrameJson',
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
					if (Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.getForm().isValid()) {
						//判断是否为空帧
						if (checkMMSFrame(Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[2].getCheckValue(), Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.contentJson.frame[Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.currFrame].vc2image.vc2rescurl, Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[4].getValue(), Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[2].getValue())) {
							//检查帧图片类型是否正确
							if (Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[2].getValue() != "" && !checkMMSFrameImageType(Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[2].getCheckValue(), Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[2].getValue())) {
								return false;
							}
							//检查帧背景音乐类型是否正确
							if (Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[3].getValue() != "" && !checkMMSFrameMusicType(Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[3].getCheckValue(), Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[3].getValue())) {
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
							Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.getForm().submit({
								url: Js.Center.SendMMS.MMSFrameUpdateURL,
								method: "POST",
								success: function(form, action){
									var objJson = Ext.util.JSON.decode(action.response.responseText);
									var falg = objJson.success;
									var frameJson = objJson.data;
									if (falg == true) {
										if (!Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[2].getCheckValue()) {
											if (Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[2].getValue() == "") {
												if (Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.contentJson.frame[Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.currFrame].vc2image.vc2rescurl != "") {
													frameJson.vc2image = Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.contentJson.frame[Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.currFrame].vc2image;
												}
											}
										}
										Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.contentJson.frame[Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.currFrame] = frameJson;
										Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.refreshAll();
										Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.render();
										Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel.refreshBrotherPanel();
										Ext.Msg.alert("温馨提示", "操作成功了!");
                                        
                                        if (document.getElementById("Js.Center.SendMMS.MMSsendUpdateDiy.vc2Image") != null) {
                                            Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.remove("Js.Center.SendMMS.MMSsendUpdateDiy.vc2Image");
                                            var fileUp = new WXTL.Widgets.CommonForm.FileUpload({
                                                id: 'Js.Center.SendMMS.MMSsendUpdateDiy.vc2Image',
                                                style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
                                                name: 'vc2image',
                                                fieldLabel: getHelpMsg("帧图片", false, "此项非必选项，上传图片格式为："+MMSIMAGEFILETYPEDESC+"，尺寸最大限制为" + mmsConfigInfo.imagewidth + " x " + mmsConfigInfo.imageheight + "（宽x高），大小不能超过"+mmsConfigInfo.imagesize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的图片！"),
												width: 350
                                            });
                                            Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.insert(2, fileUp);
                                            Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.doLayout();
                                        }
                                        if (document.getElementById("Js.Center.SendMMS.MMSsendUpdateDiy.vc2Music") != null) {
                                            Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.remove("Js.Center.SendMMS.MMSsendUpdateDiy.vc2Music");
                                            var fileUpMusic = new WXTL.Widgets.CommonForm.FileUpload({
                                                id: 'Js.Center.SendMMS.MMSsendUpdateDiy.vc2Music',
                                                style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
                                                name: 'vc2music',
                                                fieldLabel: getHelpMsg("帧背景音乐", false, "此项非必选项，上传音乐格式为："+MMSMUSICFILETYPEDESC+"，大小不能超过"+mmsConfigInfo.musicsize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的音乐！"),
												width: 350
                                            });
                                            Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.insert(3, fileUpMusic);
                                            Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.doLayout();
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
		
		Js.Center.SendMMS.MMSsendUpdateDiy.FramePanel = new WXTL.Widgets.CommonPanel.MMSFramePanel({
			//id: "Js.Center.SendMMS.MMSsendUpdateDiy.FramePanel",
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
					//Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.getForm().reset();
					//Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[0].setValue(mmsName);
					Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[1].setValue(currFrame.numframetime);
					Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[2].setValue(currFrame.vc2image.vc2resurl);
					Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[3].setValue(currFrame.vc2backmusic.vc2resurl);
					Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[4].setValue(currFrame.vc2word.vc2rescdesc1);
					Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[5].setValue(currFrame.numframeorder);
					Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[7].setValue("mmshisoption");
					Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[8].setValue(Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel.items.items[8].getValue());
				
				}
			}
		});
		Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel = new WXTL.Widgets.CommonPanel.MMSpanel({
			//id: "Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel",
			title: '预览：第1帧',
			region: 'west',
			brotherPanel: Js.Center.SendMMS.MMSsendUpdateDiy.FramePanel,
			width: 244,
			height: 340,
			collapsible: true,
			//margins: '3 0 0 3',
			//cmargins: '3 3 3 3',
			frame: false
		});
		Js.Center.SendMMS.MMSsendUpdateDiy.FramePanel.brotherPanel = Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel;
		//定义主Panel
		//	if(Js.Center.SendMMS.MMSsendUpdateDiy.ShowPanel != null){
		//		Js.Center.SendMMS.MMSsendUpdateDiy.ShowPanel.removeAll();
		//	}
		Js.Center.SendMMS.MMSsendUpdateDiy.ShowPanel = new Ext.Panel({
			//bodyStyle: "padding:10px 0 10px 15px",
			//title: '编辑',
			//region: 'center',
			width: 778,
			height: 590,
			frame: false,
			layout: 'border',
			border: true,
			items: [Js.Center.SendMMS.MMSsendUpdateDiy.EditPanel, Js.Center.SendMMS.MMSsendUpdateDiy.FramePanel, Js.Center.SendMMS.MMSsendUpdateDiy.PreviewMMSPanel]
		});
	}
};

