Ext.namespace('Js.Center.SendSMS.SMSTemplateinsert');
Ext.QuickTips.init();

Js.Center.SendSMS.SMSTemplateinsert.func = function(){
   
    // ============================================================================定义FormPanel
    var SMSTemplateinsertInfofp = new Ext.form.FormPanel({
        frame: true,
        labelWidth: 80,
        defaults: {
            anchor: '90%',
            msgTarget: 'side'
        },
        items: [{
            xtype: "hidden",
            name: "flag",
            value: "inserttemplate"
        },  {
            xtype: "textarea",
            name: "vc2content",
            fieldLabel: getHelpMsg("模板内容", true, '1、内容长度须小于等于246字。<br>2、内容格式：<br>${v0}:您好，您${v1}当日净值为${v2}元'),
            allowBlank:false,
            blankText:"模板内容不允许为空！",
            regex: WXTL.Common.regex.IllegalDiy,
            regexText: WXTL.Common.regexText.IllegalText,
            height: 100,
            maxLength: 246
        }]
    });
    var mainForm = SMSTemplateinsertInfofp.getForm();
    // ============================================================================定义窗体
    Js.Center.SendSMS.SMSTemplateinsert.Window = new WXTL.Widgets.CommonWindows.WindowOriginal({
        title: "添加模板",
        mainForm: mainForm,
        updateURL: Js.Center.SendSMS.SmsContentUpdateURL,
        displayStore: Js.Center.SendSMS.SMSTemplateinfo.Infostore,
        items: [SMSTemplateinsertInfofp]
    });
    
    // ============================================================================执行显示
    Js.Center.SendSMS.SMSTemplateinsert.Window.show();
};
