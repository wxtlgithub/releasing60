Ext.namespace('Js.Center.Popedom.DepartmentUpdate');
Ext.QuickTips.init();
Js.Center.Popedom.DepartmentUpdate.func = function(row){

    // ================================================================ 定义FormPanel
    var updateInfoFormPanel = new Ext.form.FormPanel({
        frame: true,
        //width:400,
        region: 'center',
        labelWidth: 80,
        items: [{
            layout: 'column',
            items: [{
                xtype: "hidden",
                name: "flag",
                value: "updateall"
            }, {
                xtype: "hidden",
                name: "numdepartid",
                id: "Js.Center.Popedom.DepartmentUpdate.numdepartid"
            
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
                bodyStyle: "padding:0px 0 0px 15px",
                items: [{
                    xtype: "hidden",
                    name: "numparentdepart",
                    id: 'Js.Center.Popedom.DepartmentUpdate.ParentId',
                    fieldLabel: "上级部门ID"
                }, {
                    xtype: "textfield",
                    name: "vc2parentdepartname",
                    id: 'Js.Center.Popedom.DepartmentUpdate.ParentName',
                    fieldLabel: "<font color=red>上级部门</font>",
                    readOnly: true
                }, {
                    xtype: "textfield",
                    name: "vc2dcode",
                    fieldLabel: "<font color=red>部门编码</font>",
                    allowBlank: false,
                    blankText: "部门编码不允许为空",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 6
                }, {
                    xtype: "textfield",
                    name: "numorder",
                    fieldLabel: "<font color=red>部门顺序</font>",
                    allowBlank: false,
                    blankText: "部门顺序不允许为空",
                    regex: /^\d{1,5}$/,
                    regexText: '只能输入5位以内的正整数！'
                }, {
                    xtype: "textfield",
                    name: "vc2linkman",
                    fieldLabel: "<font color=red>联系人</font>",
                    allowBlank: false,
                    blankText: "联系人不允许为空",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 50
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
                bodyStyle: "padding:0px 0 0px 15px",
                items: [{
                    xtype: "textfield",
                    name: "vc2departname",
                    id: "Js.Center.Popedom.DepartmentUpdate.vc2departname",
                    fieldLabel: "<font color=red>部门名称</font>",
                    allowBlank: false,
                    blankText: "部门名称不允许为空",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 25
                }, {
                    xtype: "hidden",
                    name: "numcheckstate",
                    fieldLabel: "<font color=red>审核机制</font>",
                    displayField: "state",
                    mode: "local",
                    valueField: "value",
                    readOnly: true,
                    allowBlank: false,
                    blankText: "审核机制不允许为空",
                    value: '0', // 默认选择
                    triggerAction: 'all',
                    anchor: '90%',
                    msgTarget: "side",
                    store: new Ext.data.SimpleStore({
                        data: [["无审核", "0"], ["一审功能", "1"]],
                        fields: ["state", "value"]
                    })
                }, {
                    xtype: "textfield",
                    name: "vc2handset",
                    fieldLabel: "<font color=red>手机号码</font>",
                    allowBlank: false,
                    blankText: "手机号码不允许为空",
                    regex: WXTL.Common.regex.Mobile,
                    regexText: "手机号码格式不正确"
                }, {
                    xtype: "textfield",
                    name: "vc2tel",
                    fieldLabel: "<font color=red>电话</font>",
                    allowBlank: false,
                    blankText: "电话不允许为空",
                    regex: WXTL.Common.regex.Phone,
                    regexText: "电话格式不正确"
                }, {
                    xtype: "textfield",
                    name: "vc2postcode",
                    fieldLabel: "<font color=red>邮编</font>",
                    allowBlank: false,
                    blankText: "邮编不允许为空",
                    regex: WXTL.Common.regex.PostCode,
                    regexText: "邮编格式不正确"
                }]
            }]
        }, {
            layout: 'form',
            defaultType: "textfield",
            //锚点布局-
            defaults: {
                anchor: "95%",
                msgTarget: "side"
            },
            buttonAlign: "center",
            bodyStyle: "padding:0px 0 0px 15px",
            items: [{
                xtype: "textfield",
                name: "vc2address",
                fieldLabel: "通信地址",
                regex: WXTL.Common.regex.Illegal,
                regexText: WXTL.Common.regexText.IllegalText,
                maxLength: 100
            }, {
                //width: 460,
                height: 100,
                xtype: "textarea",
                name: "vc2departdesc",
                fieldLabel: "备注",
                regex: WXTL.Common.regex.Illegal,
                regexText: WXTL.Common.regexText.IllegalText,
                maxLength: 100
            }]
        }]
    });
    var root = new Ext.tree.AsyncTreeNode({
        id: "-1",
        text: "部门",
        expanded: true,
        loader: new Ext.tree.TreeLoader({
            url: Js.Center.Popedom.DepartmentsQueryURL, //treeData,
            listeners: {
                "beforeload": function(treeloader, node){
                
                    treeloader.baseParams = {
                        flag: 'selectallbycurrentuser',
                        parentid: node.id,
                        columnlist: 'numdepartid,vc2departname,numlevel,vc2levelpath',
                        method: 'POST'
                    };
                },
                "load": function(loader, node, response){
                    var childNodes = node.childNodes;
                    if (Js.Center.Popedom.DepartmentUpdate.window.updateRecord)
                    	var nodeParentId = "s" + Js.Center.Popedom.DepartmentUpdate.window.updateRecord.get("numparentdepart");
                    for (i = 0; i < childNodes.length; i++) {
                        if (childNodes[i].id == nodeParentId) {
                            childNodes[i].select(); //=true;
                            
                        }
                    }
                    
                }
            }
        })
    });
    
    //===========================================定义部门结构Tree
    var treePanel = new Ext.tree.TreePanel({
        //title : '树形菜单',
        border: false,
        applyTo: '',
        root: root,
        collapsed: false,
        animate: true,
        rootVisible: false,
        autoScroll: true,
        height: 284
    
    
    });
    
    
    
    var node = treePanel.root.findChild('id', 's1');
    
    var westPanel = new Ext.Panel({
        frame: false,
        // 自动收缩按钮
        collapsible: false,
        border: false,
        width: 180,
        autoScroll: true,
        region: "west",
        title: '部门结构',
        items: [treePanel]
    });
    var mainPanel = new Ext.Panel({
        width: 700,
        height: 300,
        frame: false,
        layout: 'border',
        border: true,
        items: [westPanel, updateInfoFormPanel]
    });
    // ======================================================================= 定义窗体
    var mainForm = updateInfoFormPanel.getForm();
    
    this.window = new WXTL.Widgets.CommonWindows.Window({
        width: 700,
        title: "修改部门",
        mainForm: mainForm,
        updateURL: Js.Center.Popedom.DepartmentsUpdateURL,
        displayStore: Js.Center.Popedom.Department.Infostore,
        updateState: true,
        updateRecord: row,
        items: [mainPanel],
        needButtons: false,
		listeners: {
			    "beforeshow": function(){
					
					root.reload();
					treePanel.expandAll();
				},
				"show": function(){
					
				}
			},
        buttons: [new Ext.Button({
            text: '保存退出',
            minWidth: 70,
            qtip: "保存退出",
            handler: function(){
                if (mainForm.isValid()) {
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
                    Js.Center.Popedom.DepartmentUpdate.window.mainFormSubmitFunc();
                    
                }
            }
        }), new Ext.Button({
            text: '重填',
            qtip: "重填",
            minWidth: 70,
            handler: function(){
                updateInfoFormPanel.getForm().reset();
                updateInfoFormPanel.getForm().loadRecord(Js.Center.Popedom.DepartmentUpdate.window.updateRecord);
                
            }
        }), new Ext.Button({
            text: '下一步',
            qtip: "下一步",
            minWidth: 70,
            handler: function(){
                if (mainForm.isValid()) {
                    mainForm.submit({
                        url: Js.Center.Popedom.DepartmentsUpdateURL,
                        method: "POST",
                        success: function(form, action){
                            var objJson = Ext.util.JSON.decode(action.response.responseText);
                            var falg = objJson.success;
                            if (falg == true) {
                                //Ext.Msg.alert("温馨提示", "操作成功了!");
                                //Js.Center.Popedom.Department.DepartmentPermit.func(Ext.get("numdepartid").getValue(), Ext.get("vc2departname").getValue());
                                Js.Center.Popedom.DepartmentUpdate.window.hide();
                                Js.Center.Popedom.Department.Infostore.reload({
									callback: function(){
										Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord = Js.Center.Popedom.Department.Infostore.getById(Js.Center.Popedom.DepartmentUpdate.window.updateRecord.get("numdepartid")); 
										Js.Center.Popedom.Department.DepartmentPermit.window.show();
									}
								});
                                
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
        }), new Ext.Button({
            text: '关闭',
            qtip: "关闭",
            minWidth: 70,
            handler: function(){
                Js.Center.Popedom.DepartmentUpdate.window.hide();
            }
        })]
    });
    // ====================================================================== 执行显示

    
	
};
