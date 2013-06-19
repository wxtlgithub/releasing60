Ext.namespace('Js.Center.Popedom.UserAdd');
Ext.QuickTips.init();

Js.Center.Popedom.UserAdd.func = function(){
    
    //===================================================================部门下拉列表
    var departComboxTree_UserAdd = new WXTL.Widgets.CommonForm.ComboWithTree({
        name: 'numdepartid',
        hiddenName: 'numdepartid',
        id: 'departComboxTree_UserAdd',
        fieldLabel: "<font color=red>部门名称</font>",
        allowBlank: false,
        blankText: '请选择部门',
        valueField: 'id',
        listHeight: '150',
        baseParams: {
            columnlist: "numdepartid,vc2departname",
            flag: 'selectallbycurrentuser'
        },
        dataUrl: Js.Center.Popedom.DepartmentsQueryURL
    
    });
    //  ================================================================ 定义FormPanel
    var addInfoFormPanel = new Ext.form.FormPanel({
        frame: true,
        region: 'center',
        labelWidth: 80,
        items: [{
            layout: 'column',
            items: [{
                xtype: "hidden",
                name: "flag",
                value: "insert"
            }, {
                columnWidth: .5,
                layout: 'form',
                defaultType: "textfield",
                defaults: {
                    anchor: "90%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                bodyStyle: "padding:10px 0 10px 15px",
                items: [departComboxTree_UserAdd, {
                    xtype: "textfield",
                    name: "vc2uaccount",
                    fieldLabel: "<font color=red>用户账户</font>",
                    allowBlank: false,
                    blankText: "用户账户不允许为空",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 15
                }, {
                    xtype: "textfield",
                    name: "vc2upassword",
                    id: "Js.Center.Popedom.UserAdd.vc2upassword",
                    fieldLabel: "<font color=red>用户密码</font>",
                    allowBlank: false,
                    blankText: "用户密码不允许为空",
                    inputType: "password",
                    minLength: 6,
                    minLengthText: '长度不能少于6!',
                    maxLength: 50,
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLengthText: '长度不能超过50！',
                    validateOnBlur: false,
                    validator: function(){
                        var pwd1 = Ext.get("Js.Center.Popedom.UserAdd.vc2upassword").dom.value;
                        if (pwd1.trim() != pwd1) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    },
                    invalidText: '密码中不能含有空格！'
                }, {
                    xtype: "textfield",
                    name: "vc2upasswordRe",
                    id: "Js.Center.Popedom.UserAdd.vc2upasswordRe",
                    fieldLabel: "<font color=red>重复密码</font>",
                    allowBlank: false,
                    blankText: "重复密码不允许为空",
                    inputType: "password",
                    validateOnBlur: false,
                    validator: function(){
                        var pwd1 = Ext.get("Js.Center.Popedom.UserAdd.vc2upassword").dom.value;
                        var pwdre = Ext.get("Js.Center.Popedom.UserAdd.vc2upasswordRe").dom.value;
                        if (pwd1 == pwdre) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    },
                    invalidText: '两次输入密码不一致',
                    minLength: 6,
                    minLengthText: '长度不能少于6!',
                    maxLength: 50,
                    maxLengthText: '长度不能超过50！'
                }, {
                    xtype: "textfield",
                    name: "vc2phone",
                    fieldLabel: "电话",
                    regex: WXTL.Common.regex.Phone,
                    regexText: "电话格式不正确"
                }]
            }, {
                columnWidth: .5,
                layout: 'form',
                defaultType: "textfield",
                defaults: {
                    anchor: "90%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                bodyStyle: "padding:10px 0 10px 15px",
                items: [{
                    xtype: "textfield",
                    name: "vc2username",
                    fieldLabel: "<font color=red>用户姓名</font>",
                    allowBlank: false,
                    blankText: "用户姓名不允许为空",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 15
                }, {
                    xtype: "combo",
                    name: "numtype",
                    fieldLabel: "<font color=red>账户类型</font>",
                    hiddenName: "numtype",
                    readOnly: true,
                    mode: "local",
                    displayField: "show",
                    valueField: "value",
                    triggerAction: "all",
                    allowBlank: false,
                    blankText: "账户类型不允许为空",
                    emptyText: "请选择",
                    store: new Ext.data.SimpleStore({
                        fields: ["show", "value"],
                        data: [["管理员", "1"], ["普通用户", "2"]]
                    }),
                    listeners:{
                		"select": function(){
                			if(this.getValue() == 1){
                				Js.Center.Popedom.UserAdd.window.buttons[2].disable();
                			}
                			else{
                				Js.Center.Popedom.UserAdd.window.buttons[2].enable();
                			}
                		}
                	}
                }, {
                    xtype: "textfield",
                    name: "vc2mobile",
                    fieldLabel: "<font color=red>手机号</font>",
                    allowBlank: false,
                    blankText: "手机号不允许为空",
                    regex: WXTL.Common.regex.Mobile,
                    regexText: "手机号格式不正确"
                }, {
                    xtype: "textfield",
                    name: "vc2email",
                    fieldLabel: "<font color=red>邮箱</font>",
                    allowBlank: false,
                    blankText: "邮箱不允许为空",
                    regex: WXTL.Common.regex.Email,
                    regexText: "邮箱格式不正确"
                
                }, {
                    xtype: "combo",
                    name: "numchecklevle",
                    fieldLabel: "<font color=red>审核级别</font>",
                    hiddenName: "numchecklevle",
                    readOnly: true,
                    mode: "local",
                    displayField: "show",
                    valueField: "value",
                    triggerAction: "all",
                    allowBlank: false,
                    blankText: "审核级别不允许为空",
                    emptyText: "请选择",
                    value:0,
                    store: new Ext.data.SimpleStore({
                        fields: ["show", "value"],
                        data: [["不审核", "0"], ["一级审核", "1"], ["二级审核", "2"]]
                    })
                }]
            }]
        }]
    });
    // ======================================================================= 定义窗体
    var mainForm = addInfoFormPanel.getForm();
   this.window = new WXTL.Widgets.CommonWindows.Window({
        //width: 700,
        title: "添加账户",
        mainForm: mainForm,
        updateURL: Js.Center.Popedom.UserUpdateURL,
        displayStore: Js.Center.Popedom.User.Infostore,
        items: [addInfoFormPanel],
        needLoadDataStore: true,
        loadDataStoreFunc: function(){
			Js.Center.Popedom.UserAdd.window.items.items[0].items.items[0].items.items[1].items.items[0].tree = null;
			Js.Center.Popedom.UserAdd.window.items.items[0].items.items[0].items.items[1].items.items[0].list = null;
			Js.Center.Popedom.UserAdd.window.items.items[0].items.items[0].items.items[1].items.items[0].initList();
        },
        needButtons: false,
        buttons: [new Ext.Button({
            text: '保存退出',
            minWidth: 70,
            qtip: "保存退出",
            handler: function(){
                if (mainForm.isValid()) {
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
					Js.Center.Popedom.UserAdd.window.mainFormSubmitFunc();
                }
            }
        }), new Ext.Button({
            text: '重填',
            qtip: "重填",
            minWidth: 70,
            handler: function(){
                addInfoFormPanel.getForm().reset();
            }
        }), new Ext.Button({
            text: '下一步',
            qtip: "下一步",
            minWidth: 70,
            handler: function(){
                if (mainForm.isValid()) {
					Js.Center.Popedom.UserAdd.window.mainFormSubmitFunc('Js.Center.Popedom.UserAdd.nextStepFunc(objJson.numuserid, objJson.vc2uaccount, objJson.vc2username, objJson.numdepartid, Ext.get("departComboxTree_UserAdd").dom.value)');

                }
            }
        }), new Ext.Button({
            text: '关闭',
            qtip: "关闭",
            minWidth: 70,
            handler: function(){
                Js.Center.Popedom.UserAdd.window.hide();
            }
        })],
        listeners:{
        	"show": function(){
        		Js.Center.Popedom.UserAdd.window.buttons[2].enable();
        	}
        }
    });
    
        Js.Center.Popedom.UserAdd.nextStepFunc = function(numuserid, vc2uaccount,vc2username, numdepartid, vc2departname){
    	var jsonObject = new Object();
        jsonObject.success = "true";
        jsonObject.numuserid = numuserid;
        jsonObject.vc2username = vc2username;
        jsonObject.numdepartid = numdepartid;
        jsonObject.vc2departname = vc2departname;
        
		Js.Center.Popedom.UserPermit.window.updateRecord = jsonObject;
		Js.Center.Popedom.UserPermit.window.show();
	};
};
