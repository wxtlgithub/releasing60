Ext.namespace('Js.Center.System.SystemLog.SystemSet');

Js.Center.System.SystemLog.SystemSet.Info = function(node){
    //=========================================================================定义FormPanel
    
    var systemSetForm = new Ext.form.FormPanel({
        title: '系统设置',
        anchor: '100%',
        layout: 'fit',
        frame: true,
        labelWidth: 175,
        height: 150,
        items: [{
            layout: 'column',
            items: [{
                xtype: "hidden",
                name: "flag",
                value: "updatemonitorbackuptimeconfig"//"updateGroupTimeConfig"
            }, {
                xtype: "hidden",
                name: "numconfigid",
				value:NUMSYSTEMCONFIGID
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
                    xtype: "numberfield",
                    //name: "gtja_special_groupidintervaltime",
                    name:"fgjj_special_monitorbackuptime",
                    fieldLabel: "<font color=red>监控日志备份间隔时间(天)</font>",
                    allowBlank: false,
                    blankText: "此项不允许为空",
                    regex: WXTL.Common.regex.Number,
                    regexText: "该项只能输入大于0的整数",
                    minValue: 1,
                    maxLength: 10
                },
                {
                    xtype: "numberfield",
                    //name: "gtja_special_groupidintervaltime",
                    name:"random_display",
                    fieldLabel: "<font color=red>随机抽检行数</font>",
                    allowBlank: false,
                    blankText: "此项不允许为空",
                    regex: WXTL.Common.regex.Number,
                    regexText: "该项只能输入大于0的整数",
                    minValue: 1,
                    maxLength: 4
                }
                ]
            }]
        }],
        buttons: [{
            text: "保存信息",
            minWidth: 70,
            handler: saveClientMonitorSet
        }, {
            text: "重置",
            minWidth: 70,
            qtip: "重置数据",
            handler: function(){
                systemSetForm.getForm().reset();
                queryClientMonitorSetInfo();
                //systemSetForm.getForm().loadRecord(responses.records["0"]);
            
            }
        }]
    });
    var mainPanel = new Ext.Panel({
        frame: true, // 渲染面板
        bodyBorder: false,
        border: false,
        autoScroll: true, // 自动显示滚动条
        layout: "anchor",
        defaults: {
            collapsible: true // 允许展开和收缩
        },
        items: [systemSetForm]
    });
    
    //============================================================================绑定到center
    GridMain(node, mainPanel, "openroomiconinfo");
    queryClientMonitorSetInfo();
    //获取客户端配置信息
    function queryClientMonitorSetInfo(){
        var reader = new Ext.data.JsonReader({
            totalProperty: 'totalProperty',
            root: 'data',
            fields: ["numconfigid","fgjj_special_monitorbackuptime","random_display"]
        });
        var conn = Ext.lib.Ajax.getConnectionObject().conn;
        conn.open("POST", Js.Center.System.SystemLog.QueryConfigURL + "?flag=queryconfig&numconfigid="+NUMSYSTEMCONFIGID, false);
        conn.send(null);
        var response = Ext.decode(conn.responseText);
        if (!response.success && response.info == "对不起，您没有登录！") {
            Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
                window.location.href = "login.htm";
            });
            
        }
        else {
            var responses = reader.readRecords(Ext.decode(conn.responseText));
            if (response.success) {
                systemSetForm.getForm().loadRecord(responses.records["0"]);
            }
        }
        
    }
    //保存修改的客户端监控配置信息
    function saveClientMonitorSet(){
            if (systemSetForm.getForm().isValid()) {
                // 弹出效果
                Ext.MessageBox.show({
                    msg: '正在保存，请稍等...',
                    progressText: 'Saving...',
                    width: 300,
                    wait: true,
                    waitConfig: {
                        interval: 200
                    },
                    icon: 'download',
                    animEl: 'saving'
                });
                setTimeout(function(){
                    Ext.MessageBox.hide();
                }, 300000);
                systemSetForm.getForm().submit({
                    url: Js.Center.System.SystemLog.UpdateConfigURL,
                    method: "POST",
                    success: function(form, action){
                        if (action.response.responseText != "") {
                            var objJson = Ext.util.JSON.decode(action.response.responseText);
                            var falg = objJson.success;
                            if (falg == true) {
                                Ext.Msg.alert("温馨提示", "操作成功了!");
                                systemSetForm.getForm().reset();
                                queryClientMonitorSetInfo();
                            }
                            else 
                                Ext.Msg.alert('温馨提示', objJson.info);
                        }
                        else 
                            Ext.Msg.alert("温馨提示", "操作成功了!");
                    },
                    failure: function(form, action){
                        var objJson = Ext.util.JSON.decode(action.response.responseText);
                        Ext.Msg.alert('温馨提示', objJson.info);
                    }
                });
            }
    }
    
};
