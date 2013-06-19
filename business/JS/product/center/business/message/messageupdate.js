Ext.namespace('Js.Center.Message.MessageUpdate');

Js.Center.Message.MessageUpdate.func = function(row){
    
    //=========================================================================定义FormPanel
    var updateMessagemfp = new Ext.form.FormPanel({
        //width: 600,
        frame: true,
        labelWidth: 60,
        
        items: [{
            layout: 'form',
            defaults: {
                anchor: '90%',
                msgTarget: "side"
            },
            items: [{
                xtype: "hidden",
                name: "flag",
                value: "updateall"
            }, {
                xtype: "hidden",
                name: "numcontentseqid",
                fieldLabel: "消息ID"
            }, {
                xtype: "textfield",
                name: "vc2title",
                fieldLabel: "<font color=red>标题</font>",
                readOnly: true
            }, {
                xtype: "textarea",
                name: "vc2content",
                fieldLabel: "<font color=red>内容</font>",
                height: 200,
                readOnly: true
            
            }]
        }]
    });
    //==============================================================定义窗体
    var mainForm = updateMessagemfp.getForm();
    
    Js.Center.Message.MessageUpdate.UpdateMessagemWin = new WXTL.Widgets.CommonWindows.Window({
        title: "查看消息",
        mainForm: mainForm,
        updateURL: Js.Center.Message.MessageUpdateURL,
        displayStore: Js.Center.Message.Infostore,
        updateState: true,
        updateRecord: row,
        items: [updateMessagemfp],
        needButtons: false,
        buttons: [{
        
            text: "关 闭",
            minWidth: 70,
            handler: function(){
                Js.Center.Message.MessageUpdate.UpdateMessagemWin.close();
            }
        }]
    
    
    });
    //            listeners: {
    //            "show": function(){
    //             var params = {
    //              ids: deleteSplit,
    //               flag: "delete"
    //                              };
    //               //doAjax(Js.Center.Message.MessageUpdateURL,);
    //            }
    
    if (row.get("numstatus") == '0') {
        var params = {
            messageid: row.get("numcontentseqid"),
            status: '1',
            flag: "setread"
        };
        
        
        
        doAjax_inner(Js.Center.Message.MessageUpdateURL, params, Js.Center.Message.Infostore);
    };
    
    
    
    //===================================================================执行显示
    Js.Center.Message.MessageUpdate.UpdateMessagemWin.show();
};
function doAjax_inner(url, params, store){
    Ext.Ajax.request({
        url: url,
        method: "POST",
        params: params,
        success: function(form, action){
            obj = Ext.util.JSON.decode(form.responseText);
            var falg = obj.success;
            if (falg == true) {
                // Ext.Msg.alert("温馨提示", "操作已成功!");
                if (store != null) 
                    store.reload();
            }
            else 
                Ext.Msg.alert('温馨提示', obj.info);
            
        },
        failure: function(form, action){
            var objJson = Ext.util.JSON.decode(action.response.responseText);
            // Ext.Msg.alert('温馨提示', objJson.info);
            //Ext.Msg.alert('温馨提示', '系统忙，请稍候...');
        }
    });
};
