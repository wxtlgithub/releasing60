/*
 * 个性彩信发送页
 */
Ext.namespace('Js.Center.SendMMS.MMSSendDiy');
Js.Center.SendMMS.MMSSendDiy.func = function(show,row){
    if (Ext.get("Js.Center.SendMMS.MMSSendDiy.MMSSendPanel") == null) {
    var productCombox = new Ext.form.ComboBox({
        xtype: "combo",
        name: "numproductid",
        hiddenName: "numproductid",
        id: 'Js.Center.SendMMS.MMSSend.sendbylist.numproductid',
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
    Js.Center.SendMMS.MMSSendDiy.MMSFieldSet = new Ext.Panel({
        layout: 'column',
        bodyStyle: "padding:5px 0 0px 10px",
        items: [{
            columnWidth: .5,
            layout: 'form',
            defaultType: "textfield",
            //锚点布局-
            defaults: {
                anchor: "90%",
                msgTarget: "side"
            },
            buttonAlign: "center",
            items: [productCombox, {
                xtype: 'xDateTime',
                fieldLabel: '发送时间',
                layout: 'form',
                name: "datstarttime",
                id: "Js.Center.SendMMS.MMSSendDiy.DatStartTime",
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
            }, {
                xtype: 'hidden',
                name: "numopid",
               
				value:0

            },{
                xtype: 'hidden',
                fieldLabel: '要发送的彩信',
                id: "Js.Center.SendMMS.MMSSendDiy.numMMSID",
                name: "nummmsid"
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
            //bodyStyle: "padding:10px 0 10px 15px",
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
                id: "Js.Center.SendMMS.MMSSendDiy.DatEndTime",
                timeFormat: 'H:i:s',
                addDays:1,
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
            }, {
                xtype: 'hidden',
                fieldLabel: "发送方式 1、栏目 2、客户组 3、持仓股票 4、文件  5、手机号码",
                name: 'numsendtype',
                id: 'Js.Center.SendMMS.MMSSendDiy.SendNumSendType',
                value: 'Js.Center.SendMMS.MMSSend.sendbydiy'
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
				id:'Js.Center.SendMMS.MMSSendDiy.UploadLargeFile',
				txtMsgHeight:'75',
				needLargfile: false,
				fieldlableFile:getHelpMsg("文件", true, "1.上传的文件扩展名必须是txt<br>2.支持客户端文件,客户端文件大小最大限制为4M<br>3.支持服务端文件,允许断点续传大文件,上传完后选择使用<br>4.个性化内容的格式是:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13888776655|[&quot李先生&quot,&quot富国天益&quot,&quot 1.003&quot]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13888776655|[&quot刘先生&quot,&quot华夏成长&quot,&quot 1.173&quot]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13888776655|[&quot赵先生&quot,&quot富国天益&quot,&quot 1.003&quot]")
            },{
                xtype: 'textarea',
                fieldLabel: getHelpMsg("文件描述", false, "此项非必填，长度小于等于100。"),
                id: "Js.Center.SendMMS.MMSSendDiy.vc2Desc",
                maxLength: 100,
                maxLengthText: '长度不能大于100',
                name: "vc2desc"
            }]
		}]
    });
    Js.Center.SendMMS.MMSSendDiy.MMSinfo();
    Js.Center.SendMMS.MMSSendDiy.MMSSendPanel = new Ext.FormPanel({
        id: "Js.Center.SendMMS.MMSSendDiy.MMSSendPanel",
        fileUpload: true,
        labelAlign: 'left',
        frame: true,
        labelWidth: 75,
        style: "background-color:#DFE8F6",
        bodyStyle: 'padding:5px 0 0 5px;',
        defaults: {
            msgTarget: "side"
        },
        items: [Js.Center.SendMMS.MMSSendDiy.MMSFieldSet]
    });
    
    
    var mainForm = Js.Center.SendMMS.MMSSendDiy.MMSSendPanel.getForm();
    
    //============================================================================ 定义窗体
    Js.Center.SendMMS.MMSSendDiy.MMSSendInfoWin = new WXTL.Widgets.CommonWindows.Window({
        title: "发送个性化彩信",
        width: 750,
        mainForm: Js.Center.SendMMS.MMSSendDiy.MMSSendPanel.getForm(),
        needButtons: false,
        closeAction: 'hide',//关闭方式
        updateURL: Js.Center.SendMMS.mmscontentaddURL,
        displayStore: Js.Center.SendMMS.MMSSendDiy.Infostore,
        updateState: true,
        updateRecord: row,
        items: [Js.Center.SendMMS.MMSSendDiy.MMSSendPanel, Js.Center.SendMMS.MMSSendDiy.MainPanel],
        buttons: [new Ext.Button({
            text: '提交',
            minWidth: 70,
            handler: function(){
                 Ext.getCmp("Js.Center.SendMMS.MMSSendDiy.DatStartTime").updateDate();
                 Ext.getCmp("Js.Center.SendMMS.MMSSendDiy.DatEndTime").updateDate();
                 Ext.getCmp("Js.Center.SendMMS.MMSSendDiy.DatStartTime").updateTime();
                 Ext.getCmp("Js.Center.SendMMS.MMSSendDiy.DatEndTime").updateTime();
                 var datStart_date = Js.Center.SendMMS.MMSSendDiy.MMSFieldSet.findById("Js.Center.SendMMS.MMSSendDiy.DatStartTime").getValue();
                 var datend_date = Js.Center.SendMMS.MMSSendDiy.MMSFieldSet.findById("Js.Center.SendMMS.MMSSendDiy.DatEndTime").getValue();

                //                //检测开始时间不得晚于当前时间
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
                
                Js.Center.SendMMS.MMSSendDiy.saveSMS("submit");
            }
        }), new Ext.Button({
            text: '取消',
            minWidth: 70,
            handler: function(){
                Js.Center.SendMMS.MMSSendDiy.MMSSendInfoWin.hide();
                    
            }
        })],
        listeners: {
			"show": function(){
                Js.Center.Common.ProductStore.load({
                    params: {
                        vc2servicetype: '2'
                    }
                });
                Js.Center.SendMMS.MMSSendDiy.queryGrid();
				Js.Center.SendMMS.MMSSendDiy.MainPanel.items.items[1].getSelectionModel().clearSelections();
            },
            "beforehide": function(){
                Js.Center.SendMMS.MMSSendDiy.MMSSendInfoWin.mainForm.reset();
                Ext.getCmp("Js.Center.SendMMS.MMSsenddiysend.columnSelectPanel").getForm().reset();
            }
        }
    });
    }
	var isSelfValid = function(){
        var valid = true;
        if (!Js.Center.SendMMS.MMSSendDiy.MMSSendPanel.getForm().isValid()) {
            valid = false;
        }
        if (Js.Center.SendMMS.MMSSendDiy.MMSFieldSet.items.items[0].items.items[3].getValue() == "") {
            Ext.Msg.alert("温馨提示", "对不起,请先选择一条彩信!");
            valid = false;
        }
        return valid;
    };
    Js.Center.SendMMS.MMSSendDiy.saveSMS = function(method){
        if (Ext.get("sendflag") != null) 
            Ext.get("sendflag").dom.value = method;
        
        //mainForm.valid = true;
        if (isSelfValid()) {//(Js.Center.SendMMS.MMSSendDiy.MMSSendPanel.getForm().isValid()) {//(isSelfValid(activeTabPanel)) {
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
            Js.Center.SendMMS.MMSSendDiy.MMSSendInfoWin.mainFormSubmitFunc();
        }
    };
    //============================================================================执行显示
	if (show) {
       Js.Center.SendMMS.MMSSendDiy.MMSSendInfoWin.show();
    }
    //Js.Center.SendMMS.MMSSendDiy.MMSSendInfoWin.show();
};
function checkedAll(){

};
