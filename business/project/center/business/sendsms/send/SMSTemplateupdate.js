Ext.namespace('Js.Center.SendSMS.SMSTemplateupdate');
Ext.QuickTips.init();

Js.Center.SendSMS.SMSTemplateupdate.func = function(row){
   
	var templateType = Js.Center.SendSMS.SMSTemplateinfo._status;
    // ============================================================================定义FormPanel
    var SMSTemplateupdateInfofp = new Ext.form.FormPanel({
        frame: true,
        labelWidth: 80,
        defaults: {
            anchor: '90%',
            msgTarget: 'side'
        },
        items: [{
            xtype: "hidden",
            name: "flag",
            value: "updatetemplate"
        },{
			xtype:"hidden",
			name: "numtemplateid"
		},  {
            xtype: "textarea",
            name: "vc2content",
            fieldLabel: check(),
            allowBlank:false,
            blankText:"模板内容不允许为空！",
            regex: WXTL.Common.regex.IllegalDiy,
            regexText: WXTL.Common.regexText.IllegalText,
            height: 100,
            maxLength: lengthChange()
        }]
    });
    var mainForm = SMSTemplateupdateInfofp.getForm();
    // ============================================================================定义窗体
    Js.Center.SendSMS.SMSTemplateupdate.Window = new WXTL.Widgets.CommonWindows.WindowOriginal({
        title: "添加模板",
        mainForm: mainForm,
        updateURL: Js.Center.SendSMS.SmsContentUpdateURL,
        displayStore: Js.Center.SendSMS.SMSTemplateinfo.Infostore,
		updateRecord:row,
        items: [SMSTemplateupdateInfofp]
    });
    function check(){
    	//暂不做个性化处理
    	if(templateType == 0){
    		return getHelpMsg("模板内容", true, '1、内容长度须小于等于420。<br>2、内容格式：x先生您好，您的当日净值为xxxxx元');
    	}else{
    		return 	getHelpMsg("模板内容", true, '1、内容长度须小于等于420字。<br>2、内容格式：<br>${v0}:您好，您${v1}当日净值为${v2}元');
    	}
    	
    }
    function lengthChange(){
    	if(templateType == 0){
    		return 420;
    	}else{
    		return 	420;
    	}
    }
    // ============================================================================执行显示
    Js.Center.SendSMS.SMSTemplateupdate.Window.show();
};

