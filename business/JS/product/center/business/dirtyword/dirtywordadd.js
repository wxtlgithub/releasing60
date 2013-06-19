Ext.namespace('Js.Center.System.DirtyWordAdd');
Ext.QuickTips.init();


Js.Center.System.DirtyWordAdd.func = function(){
    // ======================================================================== 定义FormPanel
    var addDirtyWordInfofp = new Ext.form.FormPanel({
        id: "addDirtyWordInfofp",
        //width: 600,
        frame: true,
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
                //锚点布局-
                defaults: {
                    anchor: "90%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                bodyStyle: "padding:10px 0 10px 15px",
                items: [{
                    xtype: "textfield",
                    name: "vc2dirtyword",
                    fieldLabel: "<font color=red>内容</font>",
                    allowBlank: false,
                    blankText: "内容不允许为空",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 25,
					maxLengthText:'长度不能超过25！'
                },new Ext.form.DateField({
                    fieldLabel: '有效时间',
                    name: 'dateffectend',
                    readOnly: true,
                    showToday:true,
                    clearDate:true,
                    format: 'Y-m-d',
                    validateOnBlur: false,
                    minValue:WXTL.Common.dateTime.getNow(),
            		minText:"有效时间小于今天"
                }) ]}, {
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
                    xtype: "combo",
                    name: "numdirtytype",
                    fieldLabel: "<font color=red>分类</font>",
                    hiddenName: "numdirtytype",
                    allowBlank: false,
                    blankText: "分类不允许为空",
                    readOnly: true,
                    mode: "local",
					emptyText:"请选择",
                    displayField: "vc2name",
                    valueField: "numdirtytype",
                    triggerAction: "all",
                    store: Js.Center.System.DirtyWord.DirtywordTypeStore
                }]
            }]
        }]
    });
   
    // ======================================================================= 定义窗体
        var mainForm = addDirtyWordInfofp.getForm();
        this.window = new WXTL.Widgets.CommonWindows.Window({
            title: "添加非法词",
            mainForm: mainForm,
            updateURL: Js.Center.System.DirtyWordUpdateURL,
            displayStore: Js.Center.System.DirtyWord.Infostore,
            items: [addDirtyWordInfofp]
        });
    
   
};
