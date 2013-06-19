Ext.namespace('Js.Center.System.SvcDirtyWordUpdate');

Js.Center.System.SvcDirtyWordUpdate.func = function(row){
    //=========================================================================定义FormPanel
    var updateDirtywordmfp = new Ext.form.FormPanel({
        //width: 600,
        frame: true,
        labelWidth: 80,
        items: [{
            layout: 'column',
            items: [{
                xtype: "hidden",
                name: "flag",
                value: "updateall"
            }, {
                xtype: "hidden",
                name: "numdirtywordid",
                fieldLabel: "关键字编号"
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
                },{
                    xtype: "xComboBox",
                    name: "numgwid",
                    fieldLabel: "<font color=red>网关名称</font>",
                    hiddenName: "numgwid",
                    //readOnly: true,
                    mode: "local",
                    store: Js.Center.Common.BusinessGatewayStore,
                    triggerAction: 'all',
                    selectOnFocus: true,
                    emptyText: '-=请选择=-',
                    //forceSelection: true, // 要求输入值必须在列表中存在
                    displayField: 'vc2gatewayname',
                    valueField: 'numgwid',
                    allowBlank: false,
                    blankText: "网关名称必选"
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
                    xtype: "combo",
                    name: "numdirtytype",
                    fieldLabel: "<font color=red>分类</font>",
                    hiddenName: "numdirtytype",
                    allowBlank: false,
                    blankText: "分类不允许为空",
                    readOnly: true,
                    mode: "local",
                    displayField: "vc2name",
                    valueField: "numdirtytype",
                    triggerAction: "all",
                    value: "1",
                    store:Js.Center.System.SvcDirtyWord.DirtywordTypeStore
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
                })]
            }]
        }]
    });
    Js.Center.Common.BusinessGatewayStore.reload();
    //==============================================================定义窗体
        var mainForm = updateDirtywordmfp.getForm();
        
        this.window = new WXTL.Widgets.CommonWindows.Window({
            title: "修改敏感词",
            mainForm: mainForm,
            updateURL: Js.Center.System.SvcDirtyWordUpdateURL,
            displayStore: Js.Center.System.SvcDirtyWord.Infostore,
            updateState: true,
            updateRecord: row,
            items: [updateDirtywordmfp]
        });
   
};
