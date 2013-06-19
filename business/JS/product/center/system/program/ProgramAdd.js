Ext.namespace('Js.Center.Business.ProgramAdd');
Ext.QuickTips.init();

Js.Center.Business.ProgramAdd.func = function(){
//var departComboxTree = new WXTL.Widgets.CommonForm.ComboWithTree({
//    name: 'numdepartid',
//    hiddenName: 'numdepartid',
//    id: 'Js.Center.ProgramAdd.departComboxTree',
//    fieldLabel: "<font color=red>部门名称</font>",
//    valueField: 'id',
//    treeRootVisible: true,
//    listHeight: '150',
//    emptyText: '-=请选择=-',
//    allowBlank: false,
//    blankText: '部门名称不允许为空',
//    baseParams: {
//        columnlist: "numdepartid,vc2departname",
//        flag: 'selectallbycurrentuser'
//    },
//    dataUrl: Js.Center.Popedom.DepartmentsQueryURL//'URL/tree.ashx'
//});
    //============================================================================定义FormPanel
    var ProgramAddInfofp = new Ext.form.FormPanel({
        width: 650,
        frame: true,
        labelWidth: 80,
        items: [{
            layout: 'column',
            
            items: [{
                xtype: "hidden",
                name: "flag",
                value: "insert"
            }, {
                xtype: "hidden",
                name: "numdepartid",
                fieldLabel: "部门编号",
                value:1
            },{
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
                items: [
//                        new WXTL.Widgets.CommonForm.ComboWithTree({
//                    name: 'numdepartid',
//                    hiddenName: 'numdepartid',
//                    id: 'Js.Center.ProgramAdd.departComboxTree',
//                    fieldLabel: "<font color=red>部门名称</font>",
//                    valueField: 'id',
//                    treeRootVisible: true,
//                    listHeight: '150',
//                    emptyText: '-=请选择=-',
//                    allowBlank: false,
//                    blankText: '部门名称不允许为空',
//                    baseParams: {
//                        columnlist: "numdepartid,vc2departname",
//                        flag: 'selectallbycurrentuser'
//                    },
//                    dataUrl: Js.Center.Popedom.DepartmentsQueryURL//'URL/tree.ashx'
//                }),
                
                {
                    xtype: "textfield",
                    name: "vc2clientname",
                    fieldLabel: "<font color=red>客户端名称</font>",
                    allowBlank: false,
                    blankText: "客户端名称不允许为空",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: '客户端名称不能有非法字符！',
                    maxLength: 20
                   
                }, {
//                    xtype: "hidden",
//                    name: "numlinkprotocolid",
//                    fieldLabel: "<font color=red>连接协议</font>",
//                    hiddenName: "numlinkprotocolid",
//                    allowBlank: false,
//                    blankText: "连接协议不允许为空",
//                    readOnly: true,
//                    mode: "local",
//                    displayField: "vc2linkprotocolname",
//                    valueField: "numlinkprotocolid",
//                    triggerAction: "all",
//                    emptyText: "-=请选择=-",
//                    store: Js.Center.Common.LinkProtocolStore
//                },{
                    xtype: "combo",
                    name: "protocoltype",
                    fieldLabel: "<font color=red>协议类型</font>",
                    hiddenName: "protocoltype",
                    allowBlank: false,
                    blankText: "连接协议不允许为空",
                    readOnly: true,
                    mode: "local",
                    displayField: "show",
                    valueField: "value",
                    triggerAction: "all",
                    emptyText: "-=请选择=-",
                    store: new Ext.data.SimpleStore({
                        fields: ["show", "value"],
                        data: [["CBIP1.0", "1"], ["CBIP2.0", "2"]]
                    })
                },{
                    xtype: "textfield",
                    name: "vc2username",
                    fieldLabel: "<font color=red>登录名称</font>",
                    allowBlank: false,
                    blankText: "登录名称不允许为空",
                    regex: /^[A-Za-z0-9]+$/,
                    regexText: '登录名称请使用数字或字母',
                    maxLength: 20
                }, {
                    xtype: "textfield",
                    name: "vc2password",
                    fieldLabel: "<font color=red>登录密码</font>",
                    allowBlank: false,
                    blankText: "登录密码不允许为空",
                    regex: /^[A-Za-z0-9]+$/,
                    regexText: '登录密码请使用数字或字母',
                    maxLength: 20
                }, {
                    xtype: "textfield",
                    name: "nummaxsendspeed",
                    fieldLabel: "<font color=red>最大下发速度</font>",
                    allowBlank: false,
                    blankText: "最大下发速度不允许为空",
                    regex: WXTL.Common.regex.Integer,
                    regexText: '请输入数字！',
                    maxLength: 10,
                    value:100
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
                items: [ {
                    xtype: "textfield",
                    name: "vc2clientip",
                    fieldLabel: "<font color=red>客户端IP</font>",
                    allowBlank: false,
                    blankText: "客户端IP不允许为空",
                    regex: WXTL.Common.regex.IP,
                    regexText: '客户端IP格式不对！',
                    maxLength: 20
                }, {
                    xtype: "textfield",
                    name: "vc2sublongcode",
                    fieldLabel: "下行长号码",
                    regex: /[0-9]$/,
                    regexText: '只能输入数字',
                    maxLength: 20
                    
                }, {
                    xtype: "textfield",
                    name: "numreturnlevel",
                    fieldLabel: getHelpMsg("透传级别", true, " 透传的级别为下列数字的相加值<br>1 透传submitResp <br>2 透传response <br> 4 透传report  <br>8 透传Deliver <br> 如填写 12 将透传 report 和 Deliver （4+8）<br>如填写 4  将只透传 report （4）"),//"<font color=red>透传级别</font>" ,
                    allowBlank: false,
                    blankText: "透传级别不允许为空",
                    regex: WXTL.Common.regex.Integer,
                    regexText: '请输入数字!',
                    maxLength: 5,
                    value:12
                }, {
                    xtype: "textfield",
                    name: "numclientlevel",
                    fieldLabel: "<font color=red>客户端等级</font>",
                    allowBlank: false,
                    blankText: "客户端等级不允许为空",
                    regex: WXTL.Common.regex.Integer,
                    regexText: '请输入数字！',
                    maxLength: 10,
                    value:0
                }, {
                    xtype: "textfield",
                    name: "moduleid",
                    fieldLabel: "<font color=red>模块编号</font>",
                    allowBlank: false,
                    blankText: "模块编号不允许为空",
                    regex: WXTL.Common.regex.Integer,
                    regexText: '请输入数字！',
                    maxLength: 10
                }]
            }]
        
        }]
    
    });
    
    var mainForm = ProgramAddInfofp.getForm();
    //============================================================================定义窗体
    this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "添加客户端",
        mainForm: mainForm,
        updateURL: Js.Center.Business.ProgramUpdateURL,
        displayStore: Js.Center.Business.Program.Infostore,
        items: [ProgramAddInfofp]
    });
    //============================================================================执行显示
};
