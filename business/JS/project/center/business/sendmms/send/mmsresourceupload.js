Ext.namespace("Js.Center.SendMMS.SENDresourceUpload");
Js.Center.SendMMS.SENDresourceUpload.func = function(MMSID,type) {
    //=============================定义主窗体
    var mainPanel = new Ext.form.FormPanel({
        id: "Js.Center.SendMMS.SENDresourceUpload.MainPanel",
        bodyStyle: "padding:0px 0 0px 15px",
        defaults: {
            anchor: "90%",
            msgTarget: "side"
        },
        //height:'400',
        border: false,
        labelWidth: 60,
        layout: 'form',
        frame: true,
        items: [{xtype:'datefield',
            fieldLabel: "保存到",
            format: 'Y-m-d',
            labelWidth: 100,
            bodyStyle: 'padding:5px 5px 0',
            readOnly: true,
            value: WXTL.Common.dateTime.addDay(new Date(), 7),
            emptyText: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),

            name: "datcreattimestart",
            id: "Js.Center.SendMMS.SENDresourceUpload.UploadTime"
        }, {
            xtype: "hidden",
            name: "flag",
            value: "mmsresourceup"
        }, {
            xtype: "hidden",
            name: "nummmsid",
            value: MMSID
}]
        });
    	var instore ;
    	if(type == 1){
    		instore = Js.Center.SendMMS.MMSSendDiy.Infostore;
    	}else{
    		instore = Js.Center.SendMMS.MMSSend.Infostore;
    	}
        var mainForm = mainPanel.getForm();
        Js.Center.SendMMS.SENDresourceUpload.UploadWindow = new WXTL.Widgets.CommonWindows.Window({
            title: "彩信资源上传",
            width: 259,
            height: 100,
            layout: 'form',
            mainForm: mainForm,
            autoScroll: false,
            collapsible: false,
            closeAction:'close',
            updateURL: Js.Center.SendMMS.MMSUpLoadingResourcesURL,
            displayStore:  instore,
            //updateState: true,
            //updateRecord: row,
            needButtons: true,
            items: [mainPanel]

        });
        //};
        //显示窗体
        Js.Center.SendMMS.SENDresourceUpload.UploadWindow.show();


    };
