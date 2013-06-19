Ext.namespace('Js.Center.SendMMS.MMSsendUpdate');
Js.Center.SendMMS.MMSsendUpdate.MMSSendListinfo = function(){
    if (Ext.get("Js.Center.SendMMS.MMSsendUpdate.MMSSendListPanel") == null) {
        //=============================================================产品下拉列表数据定义
        Js.Center.Common.UserGroupStore.reload();
        
        //Js.Center.Common.SmsClassStore.reload();
        var remoteCheckboxGroup;
        var activeTabPanel;
        function setUserGroupList(recordNumProdID){
            if (recordNumProdID != "") {
                remoteCheckboxGroup = new WXTL.Widgets.CommonForm.CheckboxGroup.RemoteCheckboxGroup({
                
                    url: Js.Center.Business.UserGroupURL,
                    queryparams: 'flag=selectallbyprodid&columnlist=numusergroupid,vc2usergroupname&prodid=' + recordNumProdID,
                    requestname: 'numusergroupid',
                    defaultsItemsName: 'numusergroupid',
                    defaultsItemsboxLable: '对不起！没有该通道组的客户组信息',
                    id: "Js.Center.SendMMS.MMSsendUpdate.remoteCheckboxGroup",
                    blankText: "请选择客户组",
                    allowBlank: false,
                    fieldLabel: '<font color=red>客户组</font>',
                    messageID: recordNumProdID,
                    reader: new Ext.data.JsonReader({
                        totalProperty: 'totalProperty',
                        root: 'data',
                        fields: [{
                            name: 'id'
                        }, {
                            name: 'name'
                        
                        }, {
                            name: 'boxLabel',
                            mapping: "vc2usergroupname"
                        }, {
                            name: 'inputValue',
                            mapping: "numusergroupid"
                        }, {
                            name: 'checked'
                        }]
                    })
                });
                var remoteCheckboxGroupPanel = new Ext.form.FieldSet({
                    title: '<a href=#  onclick="javascript:remoteCheckboxGroup.setAll(true);">全选</a>　<a href=#  onclick="javascript:remoteCheckboxGroup.setAll(false);">全不选</a>　<a href=#  onclick="javascript:remoteCheckboxGroup.invert();">反选</a>',
                    bodyStyle: 'width:530',
                    defaults: {
                        width: '80%'
                    },
                    style: Ext.isIE ? 'padding:0px 0 0 10px;' : 'padding:0px 0 0 10px;',
                    autoHeight: true,
                    id: "Js.Center.SendMMS.MMSsendUpdate.SMSremoteCheckboxGroup",
                    items: [remoteCheckboxGroup]
                });
                remoteCheckboxGroupPanel.doLayout(true);
                activeTabPanel.remove("Js.Center.SendMMS.MMSsendUpdate.SMSremoteCheckboxGroup");
                activeTabPanel.add(remoteCheckboxGroupPanel);
            }
            else {
                activeTabPanel.remove("Js.Center.SendMMS.MMSsendUpdate.SMSremoteCheckboxGroup");
            }
            activeTabPanel.doLayout(true);
        };
        
        var productCombox = new Ext.form.ComboBox({
            xtype: "combo",
            name: "numproductid",
            hiddenName: "numproductid",
            id: 'SMSnumproductid',
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
            store: Js.Center.Common.ProductStoreByUser,
            listeners: {
                'select': function(combox, record, numidex){
                    setUserGroupList(record.data.numprodid);
                }
            }
        });
        Js.Center.Common.ProductStoreByUser.reload({
            callback: function(records, options, success){
                productCombox.setValue('1');
                setUserGroupList('1');
            }
        });
        Js.Center.SendMMS.MMSsendUpdate.MMSFieldSet = new Ext.Panel({
            layout: 'column',
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
                bodyStyle: "padding:10px 0 10px 15px",
                items: [{
                    xtype: 'xDateTime',
                    fieldLabel: '发送时间',
                    layout: 'form',
                    name: "datsend",
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
                    xtype: 'xDateTime',
                    fieldLabel: '结束时间',
                    layout: 'form',
                    name: "datsend",
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
                }]
            }]
        });
        Js.Center.SendMMS.MMSsendUpdate.MMSSendListPanel = new Ext.Panel({
            id: "Js.Center.SendMMS.MMSsendUpdate.MMSSendListPanel",
            fileUpload: true,
            labelAlign: 'left',
            frame: true,
            labelWidth: 80,
			height:'100%',
            style: "background-color:#DFE8F6",
            bodyStyle: 'padding:0px 0 0 0px;',
            defaults: {
                msgTarget: "side"
            },
            items: [{
                xtype: 'tabpanel',
                layoutOnTabChange: true,
                defaults: {
                    bodyStyle: 'padding:5px 0 0 10px;'
                },
                plain: true,
                activeTab: 0,
                height: 240,
                items: [{
                    title: '按客户组发送',
                    autoScroll: true,
                    layout: 'form',
                    defaultType: 'textfield',
                    id: "Js.Center.SendMMS.MMSsendUpdate.sendbyusergroup",
                    items: [productCombox]
                }, {
                    title: '按栏目发送',
                    autoScroll: true,
                    layout: 'form',
                    defaultType: 'textfield',
                    id: "Js.Center.SendMMS.MMSsendUpdate.sendbycolumn",
                    items: [{
                        xtype: 'hidden',
                        fieldLabel: "发送方式 1、栏目 2、客户组 3、持仓股票 4、文件  5、手机号码",
                        name: 'numsendtype',
                        id: 'sendnumsendtype',
                        value: 'sendbyusergroup'
                    }, {
                        xtype: "combo",
                        name: "numcolumnid",
                        hiddenName: "numcolumnid",
                        fieldLabel: "<font color=red>选择栏目</font>",
                        emptyText: "-=请选择=-",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2columnname",
                        allowBlank: false,
                        valueField: "numcolumnid",
                        triggerAction: "all",
                        store: Js.Center.Common.ColumnStore,
                        blankText: "请选择栏目"
                    }]
                }, {
                    title: '按文件发送',
                    layout: 'form',
                    id: "Js.Center.SendMMS.MMSsendUpdate.sendbyfile",
                    defaultType: 'textfield',
                    items: [{
                        xtype: 'fileuploadfield',
                        id: 'SMSmobilefile',
                        style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
                        name: 'mobilefile',
                        fieldLabel: WXTL.Common.help.MOBILEFILE,
                        allowBlank: false,
                        blankText: "请选择上传文件",
                        width: 300,
                        //inputType: 'file',
                        validator: function(){
                            var filePath = mainForm.items.items[2].getValue();
                            if (filePath != '') {
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
                    }]
                }, {
                    title: '按输入号码发送',
                    id: "Js.Center.SendMMS.MMSsendUpdate.sendbylist",
                    layout: 'form',
                    items: [{
                        xtype: 'textarea',
                        name: 'mobilelist',
                        id: 'SMSmobilelist',
                        allowBlank: false,
                        fieldLabel: WXTL.Common.help.MOBILELIST,
                        width: 300,
                        height: 103,
                        blankText: "请输入手机号码列表"
                    }]
                }],
                listeners: {
                    "tabchange": function(TabPanel, Panel){
                        activeTabPanel = TabPanel.getActiveTab();
                        Js.Center.SendMMS.MMSsendUpdate.sendtypename = Panel.title;
                        
                        if (Ext.get("Js.Center.SendMMS.MMSsendUpdate.sendnumsendtype") != null) {
                            Ext.get("Js.Center.SendMMS.MMSsendUpdate.sendnumsendtype").dom.value = Panel.id;
                        }
                    }
                }
            },Js.Center.SendMMS.MMSsendUpdate.MMSFieldSet]
        });
        
        var isSelfValid = function(panel){
            var valid = true;
            panel.items.each(function(f){
                if (f.id != "Js.Center.SendMMS.MMSsendUpdate.SMSremoteCheckboxGroup" && !f.validate()) {
                    valid = false;
                }
                if (activeTabPanel.id == "Js.Center.SendMMS.MMSsendUpdate.sendbyusergroup" && !remoteCheckboxGroup.validate()) {
                    valid = false;
                }
            });
            smsFieldSet.items.each(function(f){
                if (f.id != "Js.Center.SendMMS.MMSsendUpdate.btnsendtest") {
                    if (!f.validate()) {
                        valid = false;
                    }
                }
                
            });
            return valid;
        };
       
    }
    
};