Ext.namespace('Js.Center.SendSMS.SMSTemplateinfo');
Js.Center.SendSMS.SMSTemplateinfo.func = function(status){
    //=================================================================定义Grid相关
    // 分页每页显示数量
    var _pageSize = 12;
    //区分个性化与普通短信
    Js.Center.SendSMS.SMSTemplateinfo._status = status;
    Js.Center.SendSMS.SMSTemplateinfo.doDelete = function(){
        var row = SMSTemplateinfoGrid.getSelectionModel().getSelections();
        if (row.length == 0) {
            Ext.Msg.alert("温馨提示", "请您选择记录!");
        }
        else {
        
        
            var numtype = row[0].data.numtype;
            var deleteSplit = "";
            for (var i = 0; i < row.length; i++) {
                if (row.length == 1) {
                    deleteSplit = row[i].data.numtemplateid;
                }
                else {
                
                    if (i < (row.length - 1)) {
                        deleteSplit = row[i].data.numtemplateid + "," + deleteSplit;
                    }
                    if (i == (row.length - 1)) {
                        deleteSplit = deleteSplit + row[i].data.numtemplateid;
                    }
                }
            };
            var params = {
                numtemplateid: deleteSplit,
                
                flag: "deletetemplate"
            };
            doAjax(Js.Center.SendSMS.SmsContentUpdateURL, params, Js.Center.SendSMS.SMSTemplateinfo.Infostore);
            
            
        }
    };
    
    var SMSTemplsteSelectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
        id: "SMSTemplsteSelectPanel",
        //查询调用的方法
        height: 100,
        queryMethod: "Js.Center.SendSMS.SMSTemplateinfo.queryGrid",
        items: [{
            layout: 'column',
            items: [{
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
                    id: "templatecontent",
                    fieldLabel: "模板内容",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 50
                }]
            }]
        }]
    });
    
    
    Js.Center.SendSMS.SMSTemplateinfo.queryGrid = function(){
        if (SMSTemplsteSelectPanel.getForm().isValid()) {
            var _templateContent = Ext.get("templatecontent").getValue();
            Js.Center.SendSMS.SMSTemplateinfo.Infostore.baseParams = {
                content: _templateContent,
                flag: 'selecttemplate'
            };
            Js.Center.SendSMS.SMSTemplateinfo.Infostore.load({
                params: {
                    start: 0,
                    limit: _pageSize
                }
            });
        }
    };
    
    //==============================================================Grid数据定义
    var fields = ["numtemplateid", "vc2content", "vc2username", "vc2departname", "datcreatetime","numreftime"];
    Js.Center.SendSMS.SMSTemplateinfo.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
        proxy: new Ext.data.HttpProxy({
            url: Js.Center.SendSMS.SmsContentURL,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            fields: fields,
            root: "data",
            id: "numtemplateid",
            totalProperty: "totalCount"
        
        }),
        sortInfo: {
            field: 'numtemplateid',
            direction: 'DESC'
        },//解决分组无效代码
        baseParams: {
            //id: row.get("numusergroupid"),
            //usergroupname: row.get("vc2usergroupname"),
            content: '',
            selectType : status,
            flag: 'selecttemplate'
        }
    });
    Js.Center.SendSMS.SMSTemplateinfo.Infostore.load({
        params: {
            start: 0,
            limit: _pageSize
            //numusergroupid: '',
            //numneedaccountcode:'',
            //flag: 'selectownerusergroupbyid'
        }
    });
    
    //==============================================================列选择模式
    var sm = new Ext.grid.CheckboxSelectionModel({
        dataIndex: "numusergroupid"
    });
    //==============================================================列头
    var cm = new Ext.grid.ColumnModel([{
    
        hidden: true,
        dataIndex: "numtemplateid",
        sortable: true
    }, {
        header: "模板内容",
        tooltip: "模板内容",
        dataIndex: "vc2content",
        sortable: true
    }, {
        header: "修改人",
        tooltip: "修改人",
        dataIndex: "vc2username",
        sortable: true
    }, {
        header: "部门",
        tooltip: "部门",
        dataIndex: "vc2departname"
    }, {
        header: "修改时间",
        tooltip: "修改时间",
        dataIndex: "datcreatetime",
        sortable: true
    },{
		header:"引用次数",
		dataIndex:"numreftime",
		sortable:true
	}]);
    //==============================================================定义grid
    var SMSTemplateinfoGrid = new WXTL.Widgets.CommonGrid.GridPanelOriginal({
        //id: "columnmemberaddGridPanel",
        title: "",
        anchor: '100% 100%',
        //collapsible: false,
        pageSize: _pageSize,
        store: Js.Center.SendSMS.SMSTemplateinfo.Infostore,
        needMenu: true,
        needRightMenu: false,
        sm: sm,
        cm: cm,
        afterEditURL: Js.Center.SendSMS.SmsContentUpdateURL,
        //添加调用方法名称
        inertMethod: 'Js.Center.SendSMS.SMSTemplateinsert.func',
        //修改调用方法名称
        updateMethod: 'Js.Center.SendSMS.SMSTemplateupdate.func',
        //删除调用方法名称
        deleteMethod: 'Js.Center.SendSMS.SMSTemplateinfo.doDelete'
    });
    
    var mainPanel = new Ext.form.FormPanel({
        frame: true,
        bodyBorder: false,
        border: false,
        autoScroll: true, // 自动显示滚动条
        layout: "anchor",
        width: 650,
        defaults: {
            collapsible: true // 允许展开和收缩
        },
        items: [SMSTemplateinfoGrid]
    });
    var mainForm = mainPanel.getForm();
    //============================================================================ 定义窗体
    Js.Center.SendSMS.SMSTemplateinfo.Window = new WXTL.Widgets.CommonWindows.WindowOriginal({
        title: "短信模板",
        mainForm: mainForm,
        closeAction: 'close',
        updateURL: Js.Center.Business.UserGroupUpdateURL,
        displayStore: Js.Center.SendSMS.SMSTemplateinfo.Infostore,
        updateState: true,
        //updateRecord: row,
        items: [SMSTemplsteSelectPanel, mainPanel],
        needButtons: false,
        buttons: [{
            text: "使 用",
            minWidth: 70,
            handler: function(){
                var row = SMSTemplateinfoGrid.getSelectionModel().getSelections();
                if (row.length == 0) {
                    Ext.Msg.alert("温馨提示", "请您选择记录!");
                }
                else {
                	if(status==1){
                		//暂时不做区分
//                		if(row[0].data.vc2content.length>246){
//                			 Ext.Msg.alert("温馨提示", "此模版内容只适用于普通模版!");
//                			 return;
//                		}
                		Ext.getCmp("Js.Center.SendSMS.SMSsenddiy.SendSMSContentdiy").setValue(row[0].data.vc2content);
                		Ext.getCmp("Js.Center.SendSMS.SMSsenddiy.numreftime").setValue(row[0].data.numtemplateid);
                		Ext.get("Js.Center.SendSMS.SMSsenddiy.SendSMSContentdiyfontsize").dom.innerHTML = "字数:" + row[0].data.vc2content.length;
                	}else{
                		Ext.getCmp("Js.Center.SendSMS.SMSsend.SendSMSContent").setValue(row[0].data.vc2content);
                		Ext.getCmp("Js.Center.SendSMS.SMSsend.numreftime").setValue(row[0].data.numtemplateid);
                		Ext.get("Js.Center.SendSMS.SMSsend.SendSMSContentfontsize").dom.innerHTML = "字数:" + row[0].data.vc2content.length;
//                		Ext.getCmp("Js.Center.SendSMS.SMSsend.SendSMSContent").fireEvent('keyup','1');
                	//	Js.Center.SendSMS.SMSsend.ss(row[0].data.vc2content);
                	}
                    Js.Center.SendSMS.SMSTemplateinfo.Window.close();
                }
            }
        }, {
            text: "关  闭",
            minWidth: 70,
            handler: function(){
                Js.Center.SendSMS.SMSTemplateinfo.Window.close();
            }
        }]
    });
    
    Js.Center.SendSMS.SMSTemplateinfo.Window.show();
    
    
};
