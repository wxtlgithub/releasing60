/*
 * 报警页面设置
 */
Ext.namespace('Js.Center.Alert.AlertPageSet');
Js.Center.Alert.AlertPageSet.func = function(){
	Js.Center.Common.ProductStore.reload();
	//===================定义FormPanel
	if(Js.Center.Alert.AlertPageSet.window == null){
		var mainFormPanel = new Ext.form.FormPanel({
			frame: true,
	        labelWidth: 110,
	        layout: 'form',
	        //defaultType: "textfield",
	        //锚点布局-
	        defaults: {
	            anchor: "90%",
	            msgTarget: "side"
	        },
	        buttonAlign: "right",
	        bodyStyle: "padding:10px 0 10px 15px",
	        items:[{
	        	xtype:'hidden',
	        	name:'flag',
	        	value:'updatealertpageset'
	        },{
              xtype: 'fileuploadfield',
              style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
              name: '8001_sound',
              fieldLabel: getHelpMsg("报警声音", true, "1、文件格式为txt<br>2、文件大小须小于2M"),
              allowBlank: false,
              blankText: "请选择上传文件",
              width: 400,
              //inputType: 'file',
              validator: function(){
                  var filePath = mainForm.items.items[1].getValue();
                  if (filePath != '') {
                      mainForm.items.items[2].el.dom.value = getFileMessage(filePath);
                      if (checkFile(filePath) != '') {
                          this.invalidText = checkFile(filePath);
                          return false;
                      }
                      else {
                          return true;
                      }
                  }
                  else 
                      return false;
              }
          }, {
              xtype: 'textarea',
              name: 'filemessage',
              fieldLabel: '文件信息',
              readOnly: true,
              disabled: true,
              width: 400,
              height: 50
          }]
		});
		// ======================================================================= 定义窗体
	    var mainForm = mainFormPanel.getForm();
	    this.window = new WXTL.Widgets.CommonWindows.Window({
	        title: "页面设置",
	        mainForm: mainForm,
	        updateURL: Js.Center.Alert.AlertUpdateURL,
	        //displayStore: Js.Center.Business.Product.Infostore,
	        items: [mainFormPanel]
	    });
	};
	Js.Center.Alert.AlertPageSet.window.show();
};