Ext.namespace('Js.Center.Business.ECPrepaid.ECPrePaidRecharge');
Js.Center.Business.ECPrepaid.ECPrePaidRecharge.func = function(row) {
    // ---------------------------------------------------- 定义FormPanel
    var RechargetlecprepaidInfofp = new Ext.form.FormPanel({
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
		    value: "rechange"
	    },{
		    xtype: "hidden",
		    name: "numsent"
	    } , {
		    xtype: "hidden",
		    name: "numseqid"
	    },{
		    xtype: "hidden",
		    name: "numecid"
	    },{
	    	 xtype: "hidden",
			   name: "numcount"
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
  			name: "numrechange",
  			fieldLabel: "<font color=red>充入条数</font>",
  			minValue:0,
  			minText:"最小值不能小于0",
  			maxLength:20,
  			maxLengthText:"长度不能超过20",
  			allowBlank: false,
  			blankText: "充值数不允许为空"
  		},{
			xtype: 'textarea',
			name: 'vc2remark',
			fieldLabel: '<font color=red>充值备注</font>',
			allowBlank: false,
            blankText: "备注不能为空",
            maxLength   : 200,
            maxLengthText  : "请输入小于200字"
		}]
    });
    var mainForm = RechargetlecprepaidInfofp.getForm();
    // ---------------------------------------------------- 定义窗体
    this.window = new WXTL.Widgets.CommonWindows.Window({
	    title: "EC预付费充值",
	    mainForm: mainForm,
	    updateState: true,
	    updateRecord: row,
	    updateURL: Js.Center.Business.ECPrePaid.ECPrePaidURL,
	    displayStore:  Js.Center.Business.ECPrepaid.Infostore,
	    items: [RechargetlecprepaidInfofp]
    });
    
};
  