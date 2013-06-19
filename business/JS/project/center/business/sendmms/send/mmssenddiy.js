/*
 * 个性彩信发送页
 */
Ext.namespace('Js.Center.SendMMS.MMSSendDiy');
Js.Center.SendMMS.MMSSendDiy.func = function(show,row){
    if (Ext.get("Js.Center.SendMMS.MMSSendDiy.MMSSendPanel") == null) {
    
    //    Js.Center.Common.ProductStore.load({
    //        params: {
    //            vc2servicetype: '2'
    //        }
    //    });
    var productCombox = new WXTL.Widgets.CommonForm.ComboBox({
        name: "numproductid",
        hiddenName: "numproductid",
        id: 'Js.Center.SendMMS.MMSSend.sendbylist.numproductid',
//        emptyText: "-=请选择=-",
        allowBlank: false,
        blankText: "请选择通道组",
        fieldLabel: "<font color=red>选择通道组</font>",
        //readOnly: true,
        mode: "local",
        displayField: "vc2name",
        valueField: "numprodid",
        triggerAction: "all",
        //allowBlank:false,
        store: Js.Center.Common.ProductStore,
        initDefault:function(o){
	    	
	    	 //自动添加一个空选择项
        	Js.Center.SendMMS.MMSSendDiy.obj = this;
	        o.on("blur", function(){
	        	Js.Center.SendMMS.MMSSendDiy.count = o.store.getCount();
	        	if(Js.Center.SendMMS.MMSSendDiy.count >0){
	        		return true;
	            }
	        	else{
	        		o.setValue('');
		            return false;
	        	}
	        });
	        o.on('beforequery', function(e){   
	                  
	        	Js.Center.SendMMS.MMSSendDiy.combo = e.combo;     
	            if(!e.forceAll){     
	                var input = Js.Center.SendMMS.MMSSendDiy.combo.getRawValue();//e.query;     
	                // 检索的正则   
	                var regExp = new RegExp(".*" + input + ".*");   
	                // 执行检索   
	                Js.Center.SendMMS.MMSSendDiy.combo.store.filterBy(function(record,id){     
	                    // 得到每个record的项目名称值   
	                    var text = record.get(Js.Center.SendMMS.MMSSendDiy.combo.displayField);     
	                    return regExp.test(text);    
	                });   
	                Js.Center.SendMMS.MMSSendDiy.combo.expand();     
	                return false;   
	            }   
	        });
	    	this.store.on("load", function(a){
//	    		alert(a.data.length);
	    			if(a.data.length == 1){
	    			
	    				Js.Center.SendMMS.MMSSendDiy.obj.setValue(a.data.items[0].id);
//	    				Js.Center.SendMMS.MMSSendDiynd.obj.fireEvent('select', Js.Center.SendMMS.MMSSendDiy.obj,a.data.items[0]);
	    			}
	    				else if(a.data.length == 2){
				    		if(a.data.items[0].data.numprodid == ''){
				    			Js.Center.SendMMS.MMSSendDiy.obj.setValue(a.data.items[1].id);
//				    			Js.Center.SendMMS.MMSSendDiyMMSSend.obj.fireEvent('select', Js.Center.SendMMS.MMSSendDiy.obj,a.data.items[1]);
					    	
				    		} 
				    	} 
		    						 
	    	}); 
	    	
	    	
   },
   initComponent: function(){
   	this.addEvents(   
               'select',   
               'expand',   
               'collapse',   
               'beforeselect'
       ); 
//       this.initCancleText(this);
       this.initDefault(this);
       WXTL.Widgets.CommonForm.ComboBox.superclass.initComponent.call(this);
       this.on("keyup",function(f,e){
       	this.doQuery();  	
       });
   }
        
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
            //bodyStyle: "padding:10px 0 10px 10px",
            items: [{
                xtype: 'xDateTime',
                fieldLabel: '发送时间',
                //                    disabledDates :[WXTL.Common.dateTime.getNow()],
                //                    disabledDatesText :'发送时间不能小于当天时间',                    
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
            },productCombox,  {
                xtype: 'hidden',
                name: "numopid",
               
				value:0

            },{
                xtype: 'hidden',
                fieldLabel: '要发送的彩信',
                id: "Js.Center.SendMMS.MMSSendDiy.numMMSID",
                name: "nummmsid"
            }
            ]
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
                xtype: "hidden",
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
					xtype: 'fileuploadfield',
					name: 'mobilefile',
					fieldLabel: getHelpMsg("文件", true, "1.上传的文件扩展名必须是txt<br>2.支持客户端文件,客户端文件大小最大限制为4M<br>3.支持服务端文件,允许断点续传大文件,上传完后选择使用<br>4.个性化内容的格式是:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13888776655|[&quot李先生&quot,&quot富国天益&quot,&quot 1.003&quot]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13888776655|[&quot刘先生&quot,&quot华夏成长&quot,&quot 1.173&quot]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13888776655|[&quot赵先生&quot,&quot富国天益&quot,&quot 1.003&quot]"),
					allowBlank: false,							
					blankText: "请选择上传文件",
					width: 500,
					validator: function(){
						var filePath = mainForm.items.items[7].getValue();
						if (filePath != '') {
							mainForm.items.items[8].el.dom.value = getFileMessage(filePath);
							document.getElementById("Js.Center.SendMMS.MMSSendDiy.ClientFileName").value = escape(filePath);
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
					height: 65
				},{
                    xtype: 'hidden',
                    name: 'vc2clientfilename',
                    id: "Js.Center.SendMMS.MMSSendDiy.ClientFileName"
                },
                {
					xtype: 'hidden',
					name: 'vc2loadfilename',
					value:''
                }, {
                    xtype: 'hidden',
                    fieldLabel: '资源编号',
                    id: "Js.Center.SendMMS.MMSSendDiy.vc2centerid",
                    name: "vc2centerid"
                },
                {
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
        //title: 'Inner Tabs',
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
                //                var mydate=new Date();
                //                Ext.Msg.alert("1",Date.parse(WXTL.Common.dateTime.getNowDate())+"---"+WXTL.Common.dateTime.formatDate(Js.Center.SendMMS.MMSSendDiy.MMSFieldSet.findById("Js.Center.SendMMS.MMSSendDiy.DatStartTime").getValue())); //获取当前日期);
                //                return false;
                
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
                Js.Center.SendMMS.MMSSendDiy.MMSSendInfoWin.updateURL = Js.Center.SendMMS.YXTmmscontentaddURL;
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
    //else {
    //    Js.Center.SendMMS.MMSSendDiy.MMSSendInfoWin.mainForm.items.each(function(f){
    //        if (f.xtype != null) 
    //            f.reset();
    //        else {
    //            f.df.reset();
    //        }
    //    });
    //    Js.Center.SendMMS.MMSSendDiy.MMSSendInfoWin.updateRecord = row;
    //};
	var isSelfValid = function(){
        var valid = true;
        if (!Js.Center.SendMMS.MMSSendDiy.MMSSendPanel.getForm().isValid()) {
            valid = false;
        }
        if (Js.Center.SendMMS.MMSSendDiy.MMSFieldSet.items.items[0].items.items[3].getValue() == "") {
            Ext.Msg.alert("温馨提示", "对不起,请先选择一条彩信!");
            valid = false;
        }
        if (Js.Center.SendMMS.MMSSendDiy.MMSFieldSet.items.items[2].items.items[4].getValue() == "") {
            Ext.Msg.alert("温馨提示", "对不起,请先上传彩信资源!");
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
            //            mainForm.submit({
            //                url: Js.Center.SendMMS.mmscontentaddURL,
            //                method: "POST",
            //                success: function(form, action){
            //                    if (action.response.responseText != "") {
            //                        var objJson = Ext.util.JSON.decode(action.response.responseText);
            //                        var falg = objJson.success;
            //                        if (falg == true) {
            //                            Ext.Msg.alert("温馨提示", "操作成功了!");
            //                            if (method != "sendtest") {
            //                                Js.Center.SendMMS.MMSSendDiy.MMSSendInfoWin.hide();
            //                                Js.Center.SendMMS.MMSSendDiy.MMSSendInfoWin.close();
            //                                //Js.Center.SendMMS.MMSSendDiy.displayStore.reload();
            //                            }
            //                            
            //                        }
            //                        else 
            //                            Ext.Msg.alert('温馨提示', objJson.info);
            //                    }
            //                    else 
            //                        Ext.Msg.alert("温馨提示", "操作成功了!");
            //                },
            //                failure: function(form, action){
            //                    var objJson = Ext.util.JSON.decode(action.response.responseText);
            //                    Ext.Msg.alert('温馨提示', objJson.info);
            //                }
            //            });
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
