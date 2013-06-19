Ext.namespace("Js.Center.SendMMS.CopyMMS");
Ext.QuickTips.init();

Js.Center.SendMMS.CopyMMS.init = function(row){
    if (Js.Center.SendMMS.CopyMMS.window == null) {
       // var _mmsid = doSynRequest(Js.Center.SendMMS.GetRandomMMSIDCopyURL + "?resourcemmsid=" + row.data.nummmsid).info;
        var formPanel = new Ext.FormPanel({
            id: "Js.Center.SendMMS.CopyMMS.FormPanel",
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
                id: 'Js.Center.SendMMS.CopyMMS.initMMSname',
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
                id: 'Js.Center.SendMMS.CopyMMS.initvc2desc',
                name: 'vc2desc',
                style: 'word-wrap:break-word;word-break:break-all;',
                fieldLabel: getHelpMsg("彩信名称", false, "此项非必填项，用于区分相同标题的彩信，如果为空，默认为以上所填彩信标题，长度小于等于100！"),
                maxLength: 100,
                maxLengthText: '长度不能超过100！',
                regex: WXTL.Common.regex.IllegalDiy,
                regexText: WXTL.Common.regexText.IllegalText,
                width: 250//,
                //height: 100
            }, {
                xtype: "xComboBox",
                //id: "initMMStype",
                name: "nummmstype",
                fieldLabel: "彩信类型",
                triggerAction: 'all',
                mode: "local",
                width: 250,
                displayField: "vc2type",
                valueField: "numtype",
                //value: 1,
                store: new Ext.data.SimpleStore({
                    fields: ['numtype', 'vc2type'],
                    data: [[1, '普通彩信'], [2, '个性化彩信']]
                })
            }, {
                xtype: 'hidden',
                style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
                name: 'mmsid',
                id:'mmsid',
                fieldLabel: "彩信编号",
                width: 350//,
               // value: _mmsid
            }]
        });
        this.window = new WXTL.Widgets.CommonWindows.Window({
            title: "编辑彩信",
            width: 400,
            //height: 275,
            mainForm: formPanel.getForm(),
            needButtons: false,
            displayStore: Js.Center.SendMMS.MMSCopyInfo.Infostore,
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
                        content: Ext.get("Js.Center.SendMMS.CopyMMS.initMMSname").dom.value + "," +Ext.get("Js.Center.SendMMS.CopyMMS.initvc2desc").dom.value
                    };
                    var _mmsDesc = Ext.get("Js.Center.SendMMS.CopyMMS.initvc2desc").getValue();
                        if( _mmsDesc == ""){
                            _mmsDesc = formPanel.items.items[0].el.dom.value;
                        }
					var newMMSParmas = {
						mmsName:formPanel.items.items[0].el.dom.value, 
						mmsDesc:_mmsDesc,//Ext.get("Js.Center.SendMMS.CopyMMS.initvc2desc").getValue(), 
						mmsType:formPanel.items.items[2].getValue(), 
						nummmsid:Js.Center.SendMMS.CopyMMS.window.updateRecord.data.nummmsid,
						id: doSynRequest(Js.Center.SendMMS.GetRandomMMSIDCopyURL + "?resourcemmsid=" + Js.Center.SendMMS.CopyMMS.window.updateRecord.data.nummmsid).info 
					};
					
				    Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.updateRecord = newMMSParmas;
                    Js.Center.SendMMS.CopyMMS.window.mainFormSubmitFunc('Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.show()',params,Js.Center.System.DirtyWordURL);
                   //Js.Center.SendMMS.CopyMMS.InitMMSInfoWin.mainFormSubmitFunc('Js.Center.SendMMS.CopyMMS.func(\'' + formPanel.items.items[0].el.dom.value+ '\', \'' +Ext.get("Js.Center.SendMMS.CopyMMS.initvc2desc").getValue()+ '\', \'' + formPanel.items.items[1].getValue()+ '\', \'' + row.data.nummmsid+ '\', \'' + _mmsid+ '\')',params,Js.Center.System.DirtyWordURL);

                  
                  }
                }
            }), new Ext.Button({
                text: '重置',
                minWidth: 70,
                qtip: "重置数据",
                handler: function(){
                    formPanel.getForm().loadRecord(Js.Center.SendMMS.CopyMMS.window.updateRecord);
                }
            }), new Ext.Button({
                text: '关闭',
                qtip: "关闭",
                minWidth: 70,
                handler: function(){
                    Js.Center.SendMMS.CopyMMS.window.hide();
                }
            })]
        });
    }
//    else {
//        Js.Center.SendMMS.CopyMMS.InitMMSInfoWin.updateRecord = row;
//    }
   // Js.Center.SendMMS.CopyMMS.InitMMSInfoWin.show();
};

Js.Center.SendMMS.CopyMMS.func = function(mmsName, mmsDesc, mmsType, id, _mmsid){
	if(Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin == null){
	    //============================================================================定义FormPanel
		if(typeof(mmsConfigInfo) == "undefined"){
			mmsConfigInfo = ajaxSyncCall(Js.Center.SendMMS.MMSConfigInfo,"flag=mmsconfiginfo");
		}
	    var previewMMSPanel;
	    var editPanel = new Ext.FormPanel({
	        id: "Js.Center.SendMMS.CopyMMS.editPanel",
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
	           // value: mmsName,
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
	        }, {
	            xtype: 'FileUpload',
	            id: 'Js.Center.SendMMS.CopyMMS.funcvc2image',
	            style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
	            name: 'vc2image',
	            fieldLabel: getHelpMsg("帧图片", false, "此项非必选项，上传图片格式为："+MMSIMAGEFILETYPEDESC+"，尺寸最大限制为" + mmsConfigInfo.imagewidth + " x " + mmsConfigInfo.imageheight + "（宽x高），大小不能超过"+mmsConfigInfo.imagesize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的图片！"),
				width: 350
	        }, {
	            xtype: 'FileUpload',
	            id: 'Js.Center.SendMMS.CopyMMS.vc2Music',
	            style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
	            name: 'vc2music',
	            fieldLabel: getHelpMsg("帧背景音乐", false, "此项非必选项，上传音乐格式为："+MMSMUSICFILETYPEDESC+"，大小不能超过"+mmsConfigInfo.musicsize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的音乐！"),
				width: 350
	        }, {
	            xtype: 'textarea',
	            id: 'Js.Center.SendMMS.CopyMMS.funcvc2word',
	            name: 'vc2word',
	            style: 'word-wrap:break-word;word-break:break-all;',
	            fieldLabel: getHelpMsg("帧文字", false, "此项非必填项，长度不能超过1300！"),
	            maxLength: 1300,
	            maxLengthText: '长度不能超过1300',
	            regex: WXTL.Common.regex.IllegalDiy,
	            regexText: WXTL.Common.regexText.IllegalDiyText,
	            width: 350,
	            height: 150,
	            validator: function(){
	                var word = Ext.get("Js.Center.SendMMS.CopyMMS.funcvc2word").dom.value;
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
	            	/* 暂时不限制
	            	var word = Ext.get("Js.Center.SendMMS.CopyMMS.funcvc2word").dom.value;
	            	var conLength = DataLength(word);
					if(parseInt(conLength)>4000){
						Ext.Msg.alert("帧文字错误","当前文字长度"+conLength+"字节，超出最大范围。");
						return;
					}*/
	                if (editPanel.getForm().isValid()) {
	                    //判断是否为空帧
	                    if (checkMMSFrame(editPanel.items.items[2].getCheckValue(), previewMMSPanel.contentJson.frame[previewMMSPanel.currFrame].vc2image.vc2rescurl, editPanel.items.items[4].getValue(), editPanel.items.items[2].getValue())) {
	                    
	                        //检查帧图片类型是否正确
	                        if (editPanel.items.items[2].getValue() != "" && !checkMMSFrameImageType(editPanel.items.items[2].getCheckValue(), editPanel.items.items[2].getValue())) {
	                            return false;
	                        }
	                        //检查帧背景音乐类型是否正确
	                        if (editPanel.items.items[3].getValue() != "" && !checkMMSFrameMusicType(editPanel.items.items[3].getCheckValue(), editPanel.items.items[3].getValue())) {
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
	                        editPanel.getForm().submit({
	                            url: Js.Center.SendMMS.MMSFrameUpdateURL,
	                            method: "POST",
	                            success: function(form, action){
	                                var objJson = Ext.util.JSON.decode(action.response.responseText);
	                                var falg = objJson.success;
	                                var frameJson = objJson.data;
	                                if (falg == true) {
	                                    if (!editPanel.items.items[2].getCheckValue()) {
	                                        if (editPanel.items.items[2].getValue() == "") {
	                                            if (previewMMSPanel.contentJson.frame[previewMMSPanel.currFrame].vc2image.vc2rescurl != "") {
	                                                frameJson.vc2image = previewMMSPanel.contentJson.frame[previewMMSPanel.currFrame].vc2image;
	                                            }
	                                        }
	                                    }
	                                    previewMMSPanel.contentJson.frame[previewMMSPanel.currFrame] = frameJson;
	                                    previewMMSPanel.refreshAll();
	                                    previewMMSPanel.render();
	                                    previewMMSPanel.refreshBrotherPanel();
	                                    Ext.Msg.alert("温馨提示", "操作成功了!");
	                                    if (document.getElementById("Js.Center.SendMMS.CopyMMS.funcvc2imagetf") != null) {
	                                        editPanel.remove("Js.Center.SendMMS.CopyMMS.funcvc2image");
	                                        var fileUp = new WXTL.Widgets.CommonForm.FileUpload({
	                                            id: 'Js.Center.SendMMS.CopyMMS.funcvc2image',
	                                            style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
	                                            name: 'vc2image',
	                                            fieldLabel: getHelpMsg("帧图片", false, "此项非必选项，上传图片格式为："+MMSIMAGEFILETYPEDESC+"，尺寸最大限制为" + mmsConfigInfo.imagewidth + " x " + mmsConfigInfo.imageheight + "（宽x高），大小不能超过"+mmsConfigInfo.imagesize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的图片！"),
	                        					width: 350
	                                        });
	                                        editPanel.insert(2, fileUp);
	                                        editPanel.doLayout();
	                                    }
	                                    if (document.getElementById("Js.Center.SendMMS.CopyMMS.vc2Music") != null) {
	                                        editPanel.remove("Js.Center.SendMMS.CopyMMS.vc2Music");
	                                        var fileUp = new WXTL.Widgets.CommonForm.FileUpload({
	                                            id: 'Js.Center.SendMMS.CopyMMS.vc2Music',
	                                            style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
	                                            name: 'vc2music',
	                                            fieldLabel: getHelpMsg("帧背景音乐", false, "此项非必选项，上传音乐格式为："+MMSMUSICFILETYPEDESC+"，大小不能超过"+mmsConfigInfo.musicsize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的音乐！"),
	                        					width: 350
	                                        });
	                                        editPanel.insert(3, fileUp);
	                                        editPanel.doLayout();
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
	    var framePanel = new WXTL.Widgets.CommonPanel.MMSFramePanel({
	        id: "Js.Center.SendMMS.CopyMMS.framePanel",
	        title: '帧',
	        currFrame: 0,
	        region: 'south',
	        autoScroll: false, // 自动显示滚动条
	        margins: '3 3 3 3',
	        cmargins: '3 3 3 3',
	        height: 189,
	        width: 778,
	        contentJson: Js.Center.SendMMS.MMS.InitMMSInfo,
	        frame: false, // 渲染面板,
	        listeners: {
	            afterRefresh: function(obj, json, currFrame){
	                editPanel.items.items[1].setValue(currFrame.numframetime);
	                editPanel.items.items[2].setValue(currFrame.vc2image.vc2resurl);
	                editPanel.items.items[3].setValue(currFrame.vc2backmusic.vc2resurl);
	                editPanel.items.items[4].setValue(currFrame.vc2word.vc2rescdesc1);
	                editPanel.items.items[5].setValue(currFrame.numframeorder);
	                editPanel.items.items[7].setValue("mmscuroption");
	            }
	        }
	    });
	    previewMMSPanel = new WXTL.Widgets.CommonPanel.MMSpanel({
	        id: "Js.Center.SendMMS.CopyMMS.previewMMSPanel",
	        title: '预览：第1帧',
	        region: 'west',
	        brotherPanel: framePanel,
	        width: 244,
	        height: 374,
	        collapsible: true,
	        margins: '3 0 0 3',
	        cmargins: '3 3 3 3',
	        frame: false
	    });
	    framePanel.brotherPanel = previewMMSPanel;
	
	    var mainPanel = new Ext.Panel({
	        width: 778,
	        height: 573,
	        frame: false,
	        layout: 'border',
	        border: true,
	        items: [previewMMSPanel, editPanel, framePanel]
	    });
	    //============================================================================定义窗体
	   Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin = new WXTL.Widgets.CommonWindows.Window({
	        title: "编辑彩信",
	        width: 814,
	        height: 580,
	        layout: 'form',
	        mainForm: editPanel.getForm(),
	        autoScroll: true,
	        displayStore: Js.Center.SendMMS.MMS.Infostore,
	        needButtons: false,
	        updateState: false,
	        items: [mainPanel],
	        		needLoadDataStore: true,
			loadDataStoreFunc: function(){
				var mmsCopyJson = eval(doSynRequest(Js.Center.SendMMS.MMSQueryDescURL + "?flag=selectmms&nummmsseqid=" + Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.updateRecord.nummmsid));
				
				Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.items.items[0].items.items[0].contentJson=mmsCopyJson;
				Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.items.items[0].items.items[2].contentJson=mmsCopyJson;
				
				Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.items.items[0].items.items[0].currFrame = 0;
				Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.items.items[0].items.items[0].refreshAll();
				Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.items.items[0].items.items[2].refreshAll();
				Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.items.items[0].items.items[0].refreshBrotherPanel(0);
				editPanel.items.items[0].setValue(Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.updateRecord.mmsName);
				editPanel.items.items[8].setValue(Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.updateRecord.id);                 
				
			},
	
	        buttons: [new Ext.Button({
	            text: '保存彩信',
	            minWidth: 70,
	            qtip: "保存彩信",
	            handler: function(){
	                if (checkMMS(previewMMSPanel.contentJson)) {
	                    Ext.MessageBox.show({
	                        msg: '正在处理，请稍等...',
	                        progressText: 'Saving...',
	                        width: 300,
	                        wait: true,
	                        icon: 'download',
	                        animEl: 'saving'
	                    });
	                    previewMMSPanel.contentJson.vc2name = Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.updateRecord.mmsName;
	                    previewMMSPanel.contentJson.nummmstype = Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.updateRecord.mmsType;
	                    previewMMSPanel.contentJson.vc2desc = Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.updateRecord.mmsDesc;
	                    var url = Js.Center.SendMMS.MMSAddURL;
	                    var params = {
	                        mmsjson: Ext.encode(previewMMSPanel.contentJson),
	                        mmsid: Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.updateRecord.id
	                    };	            
	                    Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.mainFormSubmitFunc('', params,Js.Center.SendMMS.MMSAddURL);
	                }
	            }
	        }), new Ext.Button({
	            text: '测试发送',
	            qtip: "测试发送",
	            minWidth: 70,
	            hidden:true, 
	            handler: function(){
	                Js.Center.SendMMS.SendTest.func(previewMMSPanel.contentJson);
	            }
	        }), new Ext.Button({
	            text: '关闭',
	            qtip: "关闭",
	            minWidth: 70,
	            handler: function(){
	                Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.hide();
	            }
	        })],
			listeners:{
			    "hide": function(){
			        //判断如果关闭窗体的时候，彩信处于播放状态，则停止播放
			        if(Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.items.items[0].items.items[0].bottomToolbar.items.items[0].text != "播放"){
			            previewMMS(Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.items.items[0].items.items[0].contentJson.frame.length);
				        window.clearInterval(playTime);
				    }
			    }
			}
	    });
	    //============================================================================执行显示
	    //Js.Center.SendMMS.CopyMMS.CopyMMSInfoWin.show();
	}
};

