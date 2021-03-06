﻿Ext.namespace('Js.Center.System.UpdatePassword');

Js.Center.System.UpdatePassword.updatePwdInfo = function(node){
    checkLogin();
    //=========================================================================定义FormPanel
    //用户新密码定义
    var passWord = new Ext.form.TextField({
        name: "vc2upasswordnew",
        id: "updatepwdvc2upasswordUp",
        fieldLabel: "用户新密码",
        inputType: "password",
        validateOnBlur: false,
        validator: function(){
            var pwd1 = Ext.get("updatepwdvc2upasswordUp").dom.value;
            if (pwd1.trim() != pwd1) {
                return false;
            }
            else {
                return true;
            }
        },
        invalidText: '密码中不能含有空格',
        minLength: 6,
        maxLength: 50
    });
    var passWordRe = new Ext.form.TextField({
        name: "vc2upasswordnew1",
        id: "updatepwdvc2upasswordReUp",
        fieldLabel: "重复新密码",
        inputType: "password",
        validateOnBlur: false,
        validator: function(){
            var pwd1 = Ext.get("updatepwdvc2upasswordUp").dom.value;
            var pwdre = Ext.get("updatepwdvc2upasswordReUp").dom.value;
            if (pwd1 == pwdre) {
                passWord.validate();
                return true;
            }
            else {
                return false;
            }
        },
        invalidText: '两次输入密码不一致',
        minLength: 6,
        maxLength: 50
    });
    var updatePwdfp = new Ext.form.FormPanel({
        title: '修改个人信息',
        anchor: '100%',
        layout: 'fit',
        frame: true,
        labelWidth: 95,
        height: 200,
        
        items: [{
            layout: 'column',
            items: [{
                xtype: "hidden",
                name: "flag",
                value: "updateuserinfo"
            }, {
                xtype: "hidden",
                name: "numuserid"
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
                    xtype: "textfield",
                    name: "vc2username",
                    fieldLabel: "<font color=red>用户姓名</font>",
                    allowBlank: false,
                    readOnly: true,
                    blankText: "用户姓名不允许为空",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 50
                }, {
                    xtype: "textfield",
                    name: "vc2mobile",
                    fieldLabel: "<font color=red>手机号码</font>",
                    allowBlank: false,
                    blankText: "手机号码不允许为空",
                    regex: WXTL.Common.regex.Mobile,
                    regexText: "手机号码格式不正确"
                }, {
                    xtype: "textfield",
                    name: "vc2upassword",
                    //id: "updatepwdvc2upasswordUp",
                    fieldLabel: "<font color=red>用户旧密码</font>",
                    inputType: "password",
                    allowBlank: false,
                    blankText: "旧密码不允许为空",
                    minLength: 6,
                    maxLength: 50
                }, {
                    xtype: "textfield",
                    name: "vc2departname",
                    fieldLabel: "部门",
                    readOnly: true
                }, {
                    xtype: "hidden",
                    name: "vc2mobilelist",
                    fieldLabel: getHelpMsg("测试手机号码", false, '多个测试手机号码请以半角;隔开'),
                    height: 100
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
                    xtype: "textfield",
                    name: "vc2email",
                    fieldLabel: "<font color=red>电子邮箱</font>",
                    vtype: 'email',
                    allowBlank: false,
                    blankText: "电子邮箱不允许为空",
                    maxLength: 50
                }, {
                    xtype: "textfield",
                    name: "vc2phone",
                    fieldLabel: "电话",
                    regex: WXTL.Common.regex.Phone,
                    regexText: "电话格式不正确"
                }, {
                    xtype: "textfield",
                    name: "vc2upasswordnew",
                    id: "updatepwdvc2upasswordUp",
                    fieldLabel: "用户新密码",
                    inputType: "password",
                    //                    validateOnBlur: false,
                    //                    validator: function(){
                    //                        var pwd1 = Ext.get("updatepwdvc2upasswordUp").dom.value;
                    //                        var pwdre = Ext.get("updatepwdvc2upasswordReUp").dom.value;
                    //                        if (pwd1 == pwdre) {
                    //                            return true;
                    //                        }
                    //                        else {
                    //                            return false;
                    //                        }
                    //                    },
                    //invalidText: '两次输入密码不一致',
                    minLength: 6,
                    maxLength: 50
                }, {
                    xtype: "textfield",
                    name: "vc2upasswordnew1",
                    id: "updatepwdvc2upasswordReUp",
                    fieldLabel: "重复新密码",
                    inputType: "password",
                    //                    validateOnBlur: false,
                    //                    validator: function(){
                    //                        var pwd1 = Ext.get("updatepwdvc2upasswordUp").dom.value;
                    //                        var pwdre = Ext.get("updatepwdvc2upasswordReUp").dom.value;
                    //                        if (pwd1 == pwdre) {
                    //                            return true;
                    //                        }
                    //                        else {
                    //                            return false;
                    //                        }
                    //                    },
                    //                    invalidText: '两次输入密码不一致',
                    minLength: 6,
                    maxLength: 50
                }]
            }]
        }],
        buttons: [{
            text: "保存信息",
            minWidth: 70,
            handler: saveUserInfo
        }, {
            text: "重置",
            minWidth: 70,
            qtip: "重置数据",
            handler: function(){
                updatePwdfp.getForm().reset();
                queryUserInfo();
                //updatePwdfp.getForm().loadRecord(responses.records["0"]);
            
            }
        }]
    });
    var mainPanel = new Ext.Panel({
        frame: true, // 渲染面板
        bodyBorder: false,
        border: false,
        autoScroll: true, // 自动显示滚动条
        layout: "anchor",
        defaults: {
            collapsible: true // 允许展开和收缩
        },
        items: [updatePwdfp]
    });
    
    //============================================================================绑定到center
    GridMain(node, mainPanel, "openroomiconinfo");
    queryUserInfo();
    //获取当前用户信息
    function queryUserInfo(){
        var reader = new Ext.data.JsonReader({
            totalProperty: 'totalProperty',
            root: 'data',
            fields: ["numuserid", "vc2username", "vc2uaccount", "vc2mobile", "vc2email", "numdepartid", "vc2departname", "vc2phone", "numroleid", "vc2rolename", "numdroleid", "vc2drolename", "numcreator", "datcreatetime", "vc2extendcode", "vc2ordercode", "numtype", "vc2mobilelist"]
        });
        var conn = Ext.lib.Ajax.getConnectionObject().conn;
        conn.open("POST", getUserURL + "?flag=selectcuruserall", false);
        conn.send(null);
        var response = Ext.decode(conn.responseText);
        if (!response.success && response.info == "对不起，您没有登录！") {
            Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
                window.location.href = "login.htm";
            });
            
        }
        else {
            var responses = reader.readRecords(Ext.decode(conn.responseText));
            if (response.success) {
                updatePwdfp.getForm().loadRecord(responses.records["0"]);
            }
        }
        
    }
    //保存修改的信息
    function saveUserInfo(){
        var pass1 = Ext.get("updatepwdvc2upasswordUp").dom.value;
        var pass2 = Ext.get("updatepwdvc2upasswordReUp").dom.value;
        if (pass1.trim() != pass1) {
            Ext.Msg.alert("温馨提示", "密码中不能含有空格！");
        } else if (pass1 == pass2) {
            if (updatePwdfp.getForm().isValid()) {
                // 弹出效果
                Ext.MessageBox.show({
                    msg: '正在保存，请稍等...',
                    progressText: 'Saving...',
                    width: 300,
                    wait: true,
                    waitConfig: {
                        interval: 200
                    },
                    icon: 'download',
                    animEl: 'saving'
                });
                setTimeout(function(){
                    Ext.MessageBox.hide();
                }, 300000);
                updatePwdfp.getForm().submit({
                    url: Js.Center.Popedom.UserUpdateURL,
                    method: "POST",
                    success: function(form, action){
                        if (action.response.responseText != "") {
                            var objJson = Ext.util.JSON.decode(action.response.responseText);
                            var falg = objJson.success;
                            if (falg == true) {
                                Ext.Msg.alert("温馨提示", "操作成功了!");
                                updatePwdfp.getForm().reset();
                                queryUserInfo();
                                loadCurrentUserinfo();
                            }
                            else 
                                Ext.Msg.alert('温馨提示', objJson.info);
                        }
                        else 
                            Ext.Msg.alert("温馨提示", "操作成功了!");
                    },
                    failure: function(form, action){
                        var objJson = Ext.util.JSON.decode(action.response.responseText);
                        Ext.Msg.alert('温馨提示', objJson.info);
                    }
                });
                
            }
        }
        else{
            Ext.Msg.alert("温馨提示", "请确保两次输入密码相同！");
        }
    }
    
};
