Ext.namespace('Js.Center.Business.ECPrepaid.ECPrePaidUpdate');
Js.Center.Business.ECPrepaid.ECPrePaidUpdate.func = function(row) {
    // ---------------------------------------------------- 定义FormPanel
    var UpdatetlecprepaidInfofp = new Ext.form.FormPanel({
    	frame: true,
        labelWidth: 80,
        defaults: {
            anchor: '95%',
            msgTarget: 'side'
        },
        bodyBorder: false,
        border: false,
        autoScroll: true, // 自动显示滚动条
	    items: [{
		    xtype: "hidden",
		    name: "flag",
		    value: "update"
	    },{
		    xtype: "hidden",
		    name: "numseqid"
	    },{
		    xtype: "hidden",
		    name: "numecid"
	    },{
  			xtype: "textfield",
  			name: "vc2ecname",
  			fieldLabel: "EC名称",
  			readOnly:true,
  			allowBlank: false,
  			blankText: "EC名称不允许为空"
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
    var mainForm = UpdatetlecprepaidInfofp.getForm();
    // ---------------------------------------------------- 定义窗体
    this.window = new WXTL.Widgets.CommonWindows.Window({
	    title: "修改EC预付费",
	    mainForm: mainForm,
	    updateState: true,
	    updateRecord: row,
	    updateURL: Js.Center.Business.ECPrePaid.ECPrePaidURL,
	    displayStore:  Js.Center.Business.ECPrepaid.Infostore,
	    items: [UpdatetlecprepaidInfofp]
    });
    
};
  