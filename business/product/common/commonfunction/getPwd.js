/// < reference path = "../vswd-ext_2.2.js" / >
Ext.BLANK_IMAGE_URL = 'extjs2.0/resources/images/default/s.gif';
Ext.QuickTips.init();
Ext.form.Field.prototype.msgTarget = 'side';
var getPwdForm;
showGetPwdForm = function(){
    getPwdForm = new Ext.form.FormPanel({
        title: '光大短信平台获取密码页',
        labelWidth: 100, // 标签宽度
        width: 400,
        height: 200,
        frame: true,
        labelSeparator: '：', // 分隔符
        applyTo: 'form',
        items: [new Ext.form.TextField({
            fieldLabel: '用户名',
            name: 'username',
            allowBlank: false,
            blankText: '用户名不为空！'
        })],
        buttons: [new Ext.Button({
            text: '提交',
            handler: getPwd
        }), new Ext.Button({
            text: '重置',
            handler: reset
        }), new Ext.Button({
            text: '返回',
            handler: showLoginForm
        })]
    })
};
function getPwd(){
    // 提交表单
    if (getPwdForm.form.isValid()) {
        getPwdForm.form.submit({
            clientValidation: true, // 进行客户端验证
            waitMsg: '正在获取密码请稍后', // 提示信息
            waitTitle: '提示', // 标题
            url: getPwdURL, // 请求的url地址
            method: 'POST', // 请求方式
            //            success: function(form, action){
            //                // 加载成功的处理函数
            //                // Ext.Msg.alert('提示', '系统登录成功');
            //                window.location.href = "login.htm";
            //            },
            //            failure: function(form, action){
            //                // 加载失败的处理函数
            //                Ext.Msg.alert('提示', '获取失败，原因：' + action.failureType);
            //            }
            success: function(form, action){
                var obj = Ext.util.JSON.decode(action.response.responseText);
                var falg = obj.success;
                if (falg == true) {
                    Ext.Msg.alert("温馨提示", "密码已发送至您邮箱，请查收!");
                    window.location.href = "login.htm";
                }
                else 
                    Ext.Msg.alert('温馨提示', obj.info);
                
            },
            failure: function(form, action){
                var objJson = Ext.util.JSON.decode(action.response.responseText);
                Ext.Msg.alert('温馨提示', objJson.info);
            }
        });
    }
    
};

function showLoginForm(){
    window.location.href = "login.htm";
};
function reset(){
    // 重置表单
    getPwdForm.form.reset();
};
Ext.onReady(function(){
    showGetPwdForm();
});
