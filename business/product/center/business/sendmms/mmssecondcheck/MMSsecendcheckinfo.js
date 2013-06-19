Ext.namespace("Js.Center.SendMMS.MMSSecendCheckinfo");
Js.Center.SendMMS.MMSSecendCheckinfo.func = function(row){
   
    //Js.Center.SendMMS.MMSSecendCheckinfo.numcontentid = row.get("numcontentid");
//    if (row.get("numstate") == 0) {
//        Js.Center.SendMMS.MMSSecendCheckinfo.numState = '待审核';
//    }
//    else 
//        if (row.get("numstate") == 1) {
//            Js.Center.SendMMS.MMSSecendCheckinfo.numState = '审核通过';
//        }
    //获取彩信发送对象信息
	//var jsonSendObject = {};
    //var jsonSendObject = eval(doSynRequest(Js.Center.SendMMS.MMScheckQueryURL + "?flag=selectsendobject&mmscontentid=" + row.get("numcontentid")));
    //获取彩信资源信息Json
	var json = newMMS('','',1,1);
    //var json = eval(doSynRequest(Js.Center.SendMMS.MMSQueryDescURL + "?flag=selecthismms&nummmsseqid=" + row.get("nummmsid")));
    //========================================定义图片显示数据源
    var pictureData = new Array();
    var j = 0;
    for (var i = 0; i < json.frame.length; i++) {
        if (json.frame[i].vc2image.numtype == "1" && json.frame[i].vc2image.vc2rescurl != "") {
            json.frame[i].vc2image["numframeorder"] = json.frame[i].numframeorder;
            pictureData[j] = json.frame[i].vc2image;
            j++;
        }
    };
    //========================================定义文字显示数据源
    var wordData = new Array();
    var wordIndex = 0;
    for (var k = 0; k < json.frame.length; k++) {
        if (json.frame[k].vc2word.numtype == "3" && json.frame[k].vc2word.vc2rescdesc1 != "") {
            json.frame[k].vc2word["numframeorder"] = json.frame[k].numframeorder;
            wordData[wordIndex] = json.frame[k].vc2word;
            wordIndex++;
        }
    };
    
    if (Ext.get("Js.Center.SendMMS.MMSSecendCheckinfo.SecendCheckPanel") == null) {
        //==========================定义预览Panel
        var previewMMSPanel = new WXTL.Widgets.CommonPanel.MMSpanel({
            id: "Js.Center.SendMMS.MMSSecendCheckinfo.PreviewMMSPanel",
            title: '预览：第1帧',
            //region: 'west',
            //brotherPanel: framePanel,
            contentJson: json,
            width: 244,
            height: 379,
            collapsible: true,
            //margins: '3 0 0 3',
            //cmargins: '3 3 3 3',
            frame: false
        });
		var westPanel = new Ext.Panel({
			//id:'Js.Center.SendMMS.MMSSecendCheckinfo.westPanel',
			width: 254,
            height: 400,
			//style: "background-color:#DFE8F6",
            //collapsible: true,
			region: 'west',
			frame:true,
			items:[previewMMSPanel]
		});
        //=============================================================================================定义图片显示Grid相关
        var pageSizePictureGrid = 16;
        var pictureinfoStore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.MemoryProxy(pictureData),//new Ext.data.HttpProxy({//
            //url: 'test/sendMMS/check/picture.ashx',//Js.Center.SendMMS.MMScheckQueryURL,
            //method: "POST"
            //}),
            reader: new Ext.data.JsonReader({
                fields: ["numrescid", "numframeid", "numframeorder", "vc2rescurl", "numrescspace"],
                id: "numrescid"
            })
        });
        pictureinfoStore.load();
        
        //==============================================================列选择模式
        var smPictureGrid = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numrescid"
        });
        var cmPictureGrid = new Ext.grid.ColumnModel([{
            header: "资源ID",
            tooltip: "资源ID",
            dataIndex: "numrescid",
            hidden: true,
            sortable: true
        }, {
            header: "帧序号",
            tooltip: "帧序号",
            dataIndex: "numframeorder",
            sortable: true,
            renderer: function(value){
                return parseFloat(value) + 1;
            }
        }, {
            header: "图片",
            tooltip: "图片",
            dataIndex: "vc2rescurl",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
            return "<div style='display:table-cell;height:100px;width:100px;vertical-align:middle;'><img id='img" + rowIndex + "' style='max-width:100px;max-height:100px;_width:100px;' src='" + value + "'></img></div>";
            }
        }, {
            header: "大小",
            tooltip: "大小",
            dataIndex: "numrescspace",
            sortable: true,
            renderer: function(value){
                return Ext.util.Format.fileSize(value);
            }
        }]);
        //==============================================================定义图片grid
        var secendMMSPictureGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '95% 100%',
            //width:'',
            title: "",
            pageSize: pageSizePictureGrid,
            store: pictureinfoStore,
            needMenu: false,
            needRightMenu: false,
            needPage: false,
            sm: smPictureGrid,
            cm: cmPictureGrid
        });
        //=============================================================================================定义文字显示Grid相关
        var pageSizeWordGrid = 16;
        var wordinfoStore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.MemoryProxy(wordData),
            reader: new Ext.data.JsonReader({
                fields: ["numrescid", "numframeid", "numframeorder", "vc2rescurl", "numrescspace", "vc2rescdesc1"],
                id: "numrescid"
            })
        });
        wordinfoStore.load();
        
        //==============================================================列选择模式
        var smWordGrid = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numrescid"
        });
        var cmWordGrid = new Ext.grid.ColumnModel([{
            header: "资源ID",
            tooltip: "资源ID",
            dataIndex: "numrescid",
            hidden: true,
            sortable: true
        }, {
            header: "帧序号",
            tooltip: "帧序号",
            dataIndex: "numframeorder",
            sortable: true,
            renderer: function(value){
                return parseFloat(value) + 1;
            }
        }, {
            header: "文字信息",
            tooltip: "文字信息",
            dataIndex: "vc2rescdesc1",
            sortable: true
        }, {
            header: "大小",
            tooltip: "大小",
            dataIndex: "numrescspace",
            sortable: true,
            renderer: function(value){
                return Ext.util.Format.fileSize(value);
            }
        }]);
        //==============================================================定义文字grid
        var secendMMSWordGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '95% 100%',
            //width:'',
            title: "",
            pageSize: pageSizeWordGrid,
            store: wordinfoStore,
            needMenu: false,
            needRightMenu: false,
            needPage: false,
            sm: smWordGrid,
            cm: cmWordGrid
        });
        //=================================定义彩信资源Panel
        var resourcePanel = new Ext.form.FormPanel({
            bodyStyle: "padding:10px 0 10px 15px",
            title: '彩信发送二审',
            border: false,
            labelWidth: 80,
            layout: 'form',
            items: [{
                layout: "column",
                items: [{
                    xtype: 'hidden',
                    name: 'numcontentid',
                    fieldLabel: '彩信内容ID',
                    id: "Js.Center.SendMMS.MMSSecendCheckinfo.numcontentid"
                }, {
                    xtype: 'hidden',
                    name: 'nummmsid',
                    fieldLabel: '彩信ID',
                    id: "Js.Center.SendMMS.MMSSecendCheckinfo.nummmsid"
                }, {
                    columnWidth: '.5',
                    layout: 'form',
                    defaultType: "textfield",
                    //锚点布局-
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    items: [{
                        xtype: "textfield",
                        name: "vc2name",
                        fieldLabel: "彩信标题",
                        disabled: true,
                        readOnly: 'true'
                    },{
                        xtype: "textfield",
                        name: "vc2desc",
                        fieldLabel: "彩信名称",
                        disabled: true,
                        readOnly: 'true'
                    }, {
                        xtype: "textfield",
                        name: "sendusername",
                        fieldLabel: "发送人",
                        disabled: true,
                        readOnly: 'true'
                    }]
                }, {
                    columnWidth: '.5',
                    layout: 'form',
                    defaultType: "textfield",
                    //锚点布局-
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    items: [{
                        xtype: "hidden",
                        name: "numstate",
                        fieldLabel: "彩信状态",
                        disabled: true,
                        readOnly: 'true'
                    },{
                        xtype: "textfield",
                        name: "numstatename",
                        fieldLabel: "彩信状态",
                        disabled: true,
                        value: '一审通过',
                        readOnly: 'true'
                    }, {
                        xtype: "textfield",
                        name: "datsend",
                        fieldLabel: "发送时间",
                        disabled: true,
                        readOnly: 'true'
                    }, {
                        xtype: "textfield",
                        name: "datendtime",
                        fieldLabel: "结束时间",
                        disabled: true,
                        readOnly: 'true'
                    }]
                }]
            }, {
                layout: 'form',
                //defaultType: "textfield",
                //锚点布局-
                defaults: {
                    anchor: "95%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                items: [{
                    bodyStyle: "padding:0 0 10px 0",
                    html:"<div id='Js.Center.SendMMS.MMSSecendCheckinfo.MobileListInfo' ></div>"
                },{
                    xtype: 'tabpanel',
                    layoutOnTabChange: true,
                    
                    plain: true,
                    activeTab: 0,
                    height: 200,
                    items: [{
                        title: '图片',
                        autoScroll: true,
                        layout: 'form',
                        bodyStyle: "padding:5px 0 5px 15px",
                        items: [secendMMSPictureGrid]
                    }, {
                        title: '文字',
                        autoScroll: true,
                        layout: 'form',
                        bodyStyle: "padding:5px 0 5px 15px",
                        items: [secendMMSWordGrid]
                    }, {
                        title: '发送对象',
                        autoScroll: true,
                        layout: 'form',
                        defaultType: 'textfield',
                        bodyStyle: "padding:10px 0 10px 15px",
                        //锚点布局-
                        defaults: {
                            anchor: "90%",
                            msgTarget: "side"
                        },
                        items: [{
                            xtype: "textarea",
                            name: "vc2name",
                            height: 70,
                            fieldLabel: "发送对象说明",
                            readOnly: 'true',
                            disabled: true,
							id:"Js.Center.SendMMS.MMSSecendCheckinfo.SendListDesc"
                            //value: jsonSendObject.data[0].numsendtypename
                        }, {
                            xtype: "textarea",
                            name: "vc2name",
                            height: 80,
                            fieldLabel: "发送对象示例",
                            readOnly: 'true',
                            disabled: true,
							id:"Js.Center.SendMMS.MMSSecendCheckinfo.SendListExample"							
                            //value: jsonSendObject.data[0].vc2typelistname
                        }]
                    }]
                }]
            }]
        });
        //=============================定义彩信审核Panel
        var checkPanel = new Ext.FormPanel({
            bodyStyle: "padding:0px 0 5px 15px",
            defaults: {
                anchor: "95%",
                msgTarget: "side"
            },
            border: false,
            labelWidth: 80,
            layout: 'form',
            items: [{
                xtype: 'hidden',
                name: 'flag',
                value: 'secondcheck'
            }, {
                xtype: 'hidden',
                name: 'numcontentid',
                fieldLabel: '彩信内容ID'
            }, {
                xtype: 'hidden',
                name: 'nummmsid',
                fieldLabel: '彩信ID'
            }, {
                xtype: 'combo',
                name: "numresultid",
                hiddenName: "checkresult",
                fieldLabel: "<font color=red>审核结果</font>",
                allowBlank: false,
                blankText: "审核结果不允许为空",
                readOnly: true,
                mode: "local",
                displayField: 'show',
                valueField: 'value',
                triggerAction: "all",
                emptyText: "-=请选择=-",
                store: new Ext.data.SimpleStore({
                    fields: ["show", "value"],
                    data: [["审核通过", "0"], ["资源内容错误", "1"], ["发送对象号码错误", "2"], ["资源号码均错误", "3"]]
                }),
                listeners:{
                    "select": function(combo, record, indext){
                        Ext.get("Js.Center.SendMMS.MMSSecendCheckinfo.checkcomments").dom.value = record.data.show;
                    }
                }
            }, {
                xtype: "textarea",
                id:'Js.Center.SendMMS.MMSSecendCheckinfo.checkcomments',
                name: "checkcomments",
                fieldLabel: "<font color=red>审核意见</font>",
                allowBlank: false,
                blankText: "审核意见不允许为空",
                height: '50',
                width: '357',
                regex: WXTL.Common.regex.IllegalDiy,
                regexText: WXTL.Common.regexText.IllegalText,
                validator: function(){
                var word = Ext.get("Js.Center.SendMMS.MMSSecendCheckinfo.checkcomments").dom.value;
                if (isExistsHtmlLable(word)) {
                    return false;
                }
                else {
                    return true;
                }
            },
            invalidText: '帧文字不能包含HTML标签'
            }]
        });
        //=============================定义发送测试Panel
        var secendCheckSendTestPanel = new Ext.form.FormPanel({//.Panel({
            bodyStyle: "padding:0 0 5px 15px",
            border: false,
            labelWidth: 80,
            layout: 'form',
            
            //frame: true,
            items: [{
                layout: 'column',
                items: [{
                    columnWidth: .6,
                    layout: 'form',
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    items: [{
                        xtype: "textfield",
                        name: "vc2mobile",
                        value: Js.Center.Common.userMobile,//'15810953132',
                        id: "Js.Center.SendMMS.MMSSecendCheckinfo.testmobile",
                        fieldLabel: "测试手机号",
                        allowBlank: false,
                        blankText: "手机号码不允许为空",
                        regex: WXTL.Common.regex.Mobile,
                        regexText: "请输入正确的手机号码"
                    }]
                }, {
                    columnWidth: .4,
                    layout: 'form',
                    items: [{
                        xtype: 'button',
                        //id: 'btnsecendChecksendtest',
                        text: '发送测试短信',
                        handler: function(){
                            if (Ext.get("Js.Center.SendMMS.MMSSecendCheckinfo.testmobile").getValue() == "") {
                                Ext.Msg.alert("温馨提示", "请输入测试手机号码!");
                            }
                            else {
                                Js.Center.SendMMS.MMSsendPreview.sendTestMMS(Ext.get("Js.Center.SendMMS.MMSSecendCheckinfo.testmobile").getValue(), json);
                            }
                        }
                    }]
                }]
            
            }]
        });
        //=============================定义主Panel
        var secendCheckPanel = new Ext.Panel({
            //bodyStyle: "padding:10px 0 10px 15px",
            //title: '审核意见',
            frame: true, // 渲染面板
            id: "Js.Center.SendMMS.MMSSecendCheckinfo.SecendCheckPanel",
            bodyBorder: false,
            border: false,
            autoScroll: false, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: false // 允许展开和收缩
            },
            region: 'center',
            items: [resourcePanel, checkPanel]//, secendCheckSendTestPanel
        });
        //=============================定义主窗体
        var mainForm = resourcePanel.getForm();
        //Js.Center.SendMMS.MMSSecendCheckinfo.window = new WXTL.Widgets.CommonWindows.Window({
        this.window = new WXTL.Widgets.CommonWindows.Window({  
		    title: "彩信发送二审",
            width: 774,
            height: 520,
            layout: 'border',
            mainForm: mainForm,
            autoScroll: false,
            updateURL: Js.Center.SendMMS.MMScheckUpdateURL,
            displayStore: Js.Center.SendMMS.SecendCheckManage.DisplayStore,
            updateState: true,
            updateRecord: row,
            needButtons: false,
            items: [westPanel, secendCheckPanel],
			needLoadDataStore: true,
            loadDataStoreFunc: function(){
                Js.Center.SendMMS.MMSSecendCheckinfo.window.items.items[1].items.items[0].items.items[1].items.items[1].setActiveTab(0);
                //获取彩信资源信息Json
                var jsonCheckMMS = eval(doSynRequest(Js.Center.SendMMS.MMSQueryDescURL + "?flag=selecthismms&nummmsseqid=" + Js.Center.SendMMS.MMSSecendCheckinfo.window.updateRecord.get("nummmsid")));
				previewMMSPanel.contentJson = jsonCheckMMS;
				previewMMSPanel.currFrame = 0;
				previewMMSPanel.refreshAll();
                

                //获取发送对象
                var jsonSendObject = eval(doSynRequest(Js.Center.SendMMS.MMScheckQueryURL + "?flag=selectsendobject&mmscontentid=" + Js.Center.SendMMS.MMSSecendCheckinfo.window.updateRecord.get("numcontentid")));
                //加载发送对象数据
				
				resourcePanel.items.items[1].items.items[1].items.items[2].items.items[0].setValue(jsonSendObject.data[0].numsendtypename);
                resourcePanel.items.items[1].items.items[1].items.items[2].items.items[1].setValue(jsonSendObject.data[0].vc2typelistname);
                
                //加载图片显示数据源
                var pictureData = new Array();
                var j = 0;
                for (var i = 0; i < jsonCheckMMS.frame.length; i++) {
                    if (jsonCheckMMS.frame[i].vc2image.numtype == "1" && jsonCheckMMS.frame[i].vc2image.vc2rescurl != "") {
                        jsonCheckMMS.frame[i].vc2image["numframeorder"] = jsonCheckMMS.frame[i].numframeorder;
                        pictureData[j] = jsonCheckMMS.frame[i].vc2image;
                        j++;
                    }
                };
                secendMMSPictureGrid.store.proxy = new Ext.data.MemoryProxy(pictureData);
                secendMMSPictureGrid.store.load();
                //加载文字显示数据源
                var wordData = new Array();
                var wordIndex = 0;
                for (var k = 0; k < jsonCheckMMS.frame.length; k++) {
                    if (jsonCheckMMS.frame[k].vc2word.numtype == "3" && jsonCheckMMS.frame[k].vc2word.vc2rescdesc1 != "") {
                        jsonCheckMMS.frame[k].vc2word["numframeorder"] = jsonCheckMMS.frame[k].numframeorder;
                        wordData[wordIndex] = jsonCheckMMS.frame[k].vc2word;
                        wordIndex++;
                    }
                };
                
                secendMMSWordGrid.store.proxy = new Ext.data.MemoryProxy(wordData);
                secendMMSWordGrid.store.load();
                Js.Center.SendMMS.MMSSecendCheckinfo.window.items.items[1].items.items[1].getForm().reset();
                //加载手机号码分布情况
                var record = Js.Center.SendMMS.MMSSecendCheckinfo.window.updateRecord;
                var sucRate;
                var mobileTotalInfo = "总数<font color='green'>"+ record.get("numtotal") + "个</font>";
                var mobileSucInfo = "合法数<font color='green'>"+ record.get("numsuccess") + "个</font>";
                var mobileFailInfo = "非法数<font color='green'>"+ record.get("numfailed") + "个</font>";
                if(record.get("numtotal") != "" && record.get("numtotal") != 0){
                    sucRate = record.get("numsuccess")/record.get("numtotal")*10000 /100;
                }
                else{
                    sucRate = 0;
                }
                if(sucRate.toString().length > 5){
                    sucRate = sucRate.toString().substring(0,5);
                }if(record.get("numsendtype") !=2){
                    if(record.get("numtotal") > 0){
                        mobileTotalInfo = "总数<a href='#' onclick='exportData(\"" + Js.Center.SendMMS.MMScheckQueryURL + "\",\"id=" + record.get("numcontentid") + "&flag=selectexport&successtype=-1\")'><font color='green'>"+ record.get("numtotal") + "个</font></a> ";
                    }
                    if(record.get("numsuccess") > 0){
                        mobileSucInfo = "合法数<a href='#' onclick='exportData(\"" + Js.Center.SendMMS.MMScheckQueryURL + "\",\"id=" + record.get("numcontentid") + "&flag=selectexport&successtype=1\")'><font color='green'>"+ record.get("numsuccess") + "个</font></a> ";
                    }
                    if(record.get("numfailed") > 0){
                        mobileFailInfo = "非法数<a href='#' onclick='exportData(\"" + Js.Center.SendMMS.MMScheckQueryURL + "\",\"id=" + record.get("numcontentid") + "&flag=selectexport&successtype=0\")'><font color='green'>"+ record.get("numfailed") + "个</font></a> ";
                    }
                }
                Ext.get("Js.Center.SendMMS.MMSSecendCheckinfo.MobileListInfo").dom.innerHTML = "号码分布情况：" + mobileTotalInfo+"，" + mobileSucInfo+"，" + mobileFailInfo+"，" + "合法率<font color='red'>"+sucRate+"%</font>";
            },
            buttons: [new Ext.Button({
                text: '提交审核',
                minWidth: 70,
                qtip: "提交审核",
                handler: function(){
                    if (checkPanel.getForm().isValid()) {
                        Ext.MessageBox.show({
                            msg: '正在审核，请稍等...',
                            progressText: 'Saving...',
                            width: 300,
                            wait: true,
                            icon: 'download',
                            animEl: 'saving'
                        });
                        setTimeout(function(){
                            Ext.MessageBox.hide();
                        }, 30000);
                        
                        var params = {
                            flag: checkPanel.items.items[0].getValue(),
                            numcontentid: Js.Center.SendMMS.MMSSecendCheckinfo.window.updateRecord.get("numcontentid"),//checkPanel.items.items[1].getValue(),
                            nummmsid: Js.Center.SendMMS.MMSSecendCheckinfo.window.updateRecord.get("nummmsid"),//checkPanel.items.items[2].getValue(),
                            checkresult: checkPanel.items.items[3].getValue(),
                            checkcomments: checkPanel.items.items[4].getValue()
                        
                        };
                        Js.Center.SendMMS.MMSSecendCheckinfo.window.mainFormSubmitFunc('', params, Js.Center.SendMMS.MMScheckUpdateURL);
                        
                        
//                        checkPanel.getForm().submit({
//                            url: Js.Center.SendMMS.MMScheckUpdateURL,
//                            method: "POST",
//                            success: function(form, action){
//                                if (action.response.responseText != "") {
//                                    var objJson = Ext.util.JSON.decode(action.response.responseText);
//                                    var falg = objJson.success;
//                                    if (falg == true) {
//                                        Ext.Msg.alert("温馨提示", "操作成功了!");
//                                        Js.Center.SendMMS.MMSSecendCheckinfo.window.close();
//                                        Js.Center.SendMMS.SecendCheckManage.DisplayStore.reload();
//                                    }
//                                    else 
//                                        Ext.Msg.alert('温馨提示', objJson.info);
//                                }
//                                else {
//                                    Ext.Msg.alert("温馨提示", "操作成功了!");
//                                    Js.Center.SendMMS.MMSSecendCheckinfo.window.close();
//                                    Js.Center.SendMMS.SecendCheckManage.DisplayStore.reload();
//                                }
//                            },
//                            failure: function(form, action){
//                                var objJson = Ext.util.JSON.decode(action.response.responseText);
//                                Ext.Msg.alert('温馨提示', objJson.info);
//                            }
//                            
//                        });
                    }
                }
            }), new Ext.Button({
                text: '关闭',
                qtip: "关闭",
                minWidth: 70,
                handler: function(){
                    Js.Center.SendMMS.MMSSecendCheckinfo.window.hide();
                }
            })],
             listeners: {
                "hide": function(){
                   //解决彩信编辑播放、停止，和彩信预览播放、 停止问题
                    if(previewMMSPanel.bottomToolbar.items.items[0].text != "播放"){
                        previewMMS(previewMMSPanel.contentJson.frame.length);
                        window.clearInterval(playTime);
                    }
                }
            }
        });
        
        //Js.Center.SendMMS.MMSSecendCheckinfo.window.mainForm.reset();
    }
//    else {
//        Js.Center.SendMMS.MMSSecendCheckinfo.window.updateRecord = row;
//        checkPanel.getForm().loadRecord(row);
//    }
    //============================================================================执行显示
    //Js.Center.SendMMS.MMSSecendCheckinfo.window.show();
    //checkPanel.getForm().loadRecord(row);
    //===========================================================发送测试彩信方法

};
