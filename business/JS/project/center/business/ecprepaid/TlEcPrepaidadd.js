Ext.namespace('Js.Center.Business.ECPrepaid.ECPrePaidAdd');

Js.Center.Business.ECPrepaid.ECPrePaidAdd.func = function() {
    // ---------------------------------------------------- 定义FormPanel
    var AddtlecprepaidInfofp = new Ext.form.FormPanel({
    	frame: true,
        labelWidth: 80,
        defaults: {
            anchor: '90%',
            msgTarget: 'side'
        },
        bodyBorder: false,
        border: false,
        autoScroll: true, // 自动显示滚动条
	    items: [{
		    xtype: "hidden",
		    name: "flag",
		    value: "insert"
	    },{
	    	xtype: "xComboBox",
            name: "numecid",
            fieldLabel: "<font color=red>EC编号</font>",
            hiddenName: "numecid",
            allowBlank: false,
            blankText: "EC编号不允许为空",
            //readOnly: true,
            mode: "local",
            displayField: "vc2ecname",
            valueField: "numecid",
            triggerAction: "all",
            emptyText: "-=请选择=-",
            store: Js.Center.Common.EcListStore
	    },{
	    	xtype: "combo",
            name: "numtype",
            hiddenName: "numtype",
            fieldLabel: "<font color=red>短彩类型</font>",
            readOnly: true,
            mode: "local",
            allowBlank:false,
	  		blankText: "短彩类型（1：短信；2彩信）不允许为空",
            displayField: "show",
            valueField: "value",
            triggerAction: "all",
            emptyText: "-=请选择=-",
            store: new Ext.data.SimpleStore({
                fields: ["show", "value"],
                data: [["短信", "1"], ["彩信", "2"]]
            })
  		},{
  			xtype: "numberfield",
  			name: "numsendmax",
  			fieldLabel: "<font color=red>允许发送的最大条数</font>",
  			minValue:0,
  			minText:"最小值不能小于0",
  			maxLength:20,
  			maxLengthText:"长度不能超过20",
  			allowBlank: false,
  			blankText: "允许发送的最大条数不允许为空"
  				
  		}]
    });
    var mainForm = AddtlecprepaidInfofp.getForm();
    // ---------------------------------------------------- 定义窗体
    this.window = new WXTL.Widgets.CommonWindows.Window({
	    title: "添加EC预付费",
	    mainForm: mainForm,
	    updateURL: Js.Center.Business.ECPrePaid.ECPrePaidURL,
	    displayStore:  Js.Center.Business.ECPrepaid.Infostore,
	    items: [AddtlecprepaidInfofp]
    });
    
};
  