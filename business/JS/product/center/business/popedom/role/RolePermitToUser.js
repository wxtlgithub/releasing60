Ext.namespace('Js.Center.Popedom.Role.RolePermitToUser');

Js.Center.Popedom.Role.RolePermitToUser.func = function(row){

if(Js.Center.Popedom.Role.RolePermitToUser.window==null)
{
    var departComboxTreePanl = new Ext.Panel({
        width:'95%',
        items: [{
            labelWidth: 60,
            layout: 'column',
            items: [{
                columnWidth: .33,
                layout: 'form',
                defaultType: "textfield",
                defaults: {
                    anchor: '90%',
                    msgTarget: "side"
                },
                items: [{
                    labelWidth: 45,
                    readOnly: true,
                    xtype: "hidden",
                    name: "roleid",
                    fieldLabel: "角色ID"//,
                    //value: roleId
                }, {
                    labelWidth: 45,
                    readOnly: true,
                    xtype: "textfield",
                    name: "vc2rolename",
                    fieldLabel: "角色名称"//,
                    //value: roleName
                }]
            }, {
                columnWidth: .33,
                layout: 'form',
                defaultType: "textfield",
                defaults: {
                    anchor: '90%',
                    msgTarget: "side"
                },
                items: [{
                    labelWidth: 45,
                    readOnly: true,
                    xtype: "hidden",
                    name: "numdepartid",
                    fieldLabel: "所属部门ID"//,
                    //value: departId
                }, {
                    labelWidth: 45,
                    readOnly: true,
                    xtype: "textfield",
                    name: "vc2departname",
                    fieldLabel: "所属部门"//,
                    //value: departName
                }]
            }, {
                columnWidth: .33,
                layout: 'form',
                defaultType: "textfield",
                defaults: {
                    anchor: '90%',
                    msgTarget: "side"
                },
                items: [{
                    labelWidth: 45,
                    readOnly: true,
                    xtype: "textfield",
                    name: "vc2roledesc",
                    fieldLabel: "备注"//,
                   // value: roleDesc
                }]
            }]
        }]
    });
    
    
    //选择部门下拉书所在panel
    var permissionDepartmentPanl = new Ext.form.FormPanel({
        frame: true,
        autoScroll: true, // 自动显示滚动条
        padding: '10 10 10 10',
        items: [departComboxTreePanl]
    
    });
    var mainForm = permissionDepartmentPanl.getForm();
    
    //===============================================初始化部门树数据
    
    //**************END 部门下拉树部分*********************************************
    
    //**************已配置、未配置用户列表panel部分*********************************************
    //=====================================未配置用户
    var fromStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({//数据代理 
            url: Js.Center.Popedom.UserURL,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            fields: ["numuserid", "vc2username"],
            root: 'data',
            id: 'numuserid'
        }),
        baseParams: {
            flag: "selectbydepartidwithroleid",
            columnlist: "numuserid,vc2username",
            typeid: 0//,
          //  roleid: roleId,
           // departid: departId
        }
    });
    //==================================已配置用户
    var toStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({//数据代理 
            url: Js.Center.Popedom.UserURL,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            fields: ["numuserid", "vc2username"],
            root: 'data',
            id: 'numuserid'
        }),
        baseParams: {
            flag: "selectbydepartidwithroleid",
            columnlist: "numuserid,vc2username",
            typeid: 1//,
            //roleid: roleId,
            //departid: departId
        }
    });
//    if (roleName != null) {
//        fromStore.load();
//        toStore.load();
//    }
    //========================================================绘制已选、未选角色列表panel
    var PermissionTree = new Ext.form.FormPanel({
        frame: true,
        bodyStyle: 'padding:10px,0px,0px,10px',
        autoScroll: true,// 自动显示滚动条
        labelWidth: 60,
        items: [{
            anchor: ',100%',
            xtype: "itemselector",
            name: "itemselector",
            fieldLabel: "配置账户",
            dataFields: ["numuserid", "vc2username"],
            toData: [""],
            msWidth: 250,
            autoScroll: true,
            enableDD: false,
            msHeight: 200,
            valueField: 'numuserid',
            displayField: 'vc2username',
            //imagePath: "jspack/product/common/Images/",
            toLegend: "已选择用户",
            fromLegend: "可选择用户",
            fromStore: fromStore,
            toStore: toStore,
            listeners: {
                "change": function(){
                    southPanel.collapse(true);
                }
            }
        }]
    });
    var permissionRolePanel = new Ext.Panel({
        //autoScroll: true,// 自动显示滚动条
        frame: true,
        height: 240,
        //padding: '10 10 10 10',
        items: [PermissionTree]
    });
  
    
    //====================================================================获得通道组列表
    var ProductStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({//数据代理 
            url: Js.Center.Business.ProductURL,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            fields: ["numprodid", "vc2name"],
            root: 'data',
            id: 'numprodid'
        }),
        baseParams: {
            flag: "selectpermitbyroleids",
            columnlist: "numprodid,vc2name",
            roleids: ''//roleidsList
        }
    });
    //=================================================================获得客户组列表
    var UserGroupStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({//数据代理 
            url: Js.Center.Popedom.UserFuncRoleURL,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            fields: ["numusergroupid", "vc2usergroupname"],
            root: 'data',
            id: 'numusergroupid'
        }),
        baseParams: {
            flag: "selectpermitbyroleids",
            columnlist: "numusergroupid,vc2usergroupname",
            roleids: ''//roleidsList
        }
    });
    
    //**************定义部门功能汇集列表*********************************************
    
    //===========================================定义部门菜单权限Tree
    var treePanel = new Ext.tree.TreePanel({
        //title : '树形菜单',
        border: false,
        applyTo: '',
        root: new Ext.tree.AsyncTreeNode({
            id: "-1",
            text: "功能权限",
            loader: new Ext.tree.TreeLoader({
                url: Js.Center.Popedom.UserFuncRoleURL,
                listeners: {
                    "beforeload": function(treeloader, node){
                        treeloader.baseParams = {
                            parentid: node.id,
                            flag: 'selectfuncpermitbyroleids',
                            roleids: Js.Center.Popedom.Role.RolePermitToUser.window.updateRecord.get("numroleid"),
                            method: 'POST'
                        };
                    }
                }
            })
        }),
        rootVisible: true
    });
    
    //数据权限显示panel（功能权限、数据权限）
    var southPanel = new Ext.form.FormPanel({//new Ext.Panel({
        title: '本角色功能汇集列表',
        width: '100%',
        id: "Js.Center.Popedom.Role.RolePermitToUser.southPanel",
        // 自动收缩按钮
        collapsible: true,
        collapsed: true,
        autoScroll: true,
        border: true,
        frame: true,
        items: [{
            layout: 'column',
            items: [{
                columnWidth: .3,
                layout: 'form',
                //锚点布局-
                defaults: {
                    anchor: "95%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                //bodyStyle: "padding:0px 0 0px 15px",
                items: [treePanel]
            }, {
                columnWidth: .35,
                layout: 'form',
                labelWidth: 65,
                defaultType: "textfield",
                //锚点布局-
                defaults: {
                    anchor: "95%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                //bodyStyle: "padding:0px 0 0px 15px",
                items: [{
                    xtype: "textarea",
                    name: "productlist",
                    id: 'Js.Center.Popedom.Role.RolePermitToUser.ProductList',
                    fieldLabel: "通道组列表",
                    height: 200,
                    disabled: true
                }]
            }, {
                columnWidth: .35,
                layout: 'form',
                labelWidth: 65,
                defaultType: "textfield",
                //锚点布局-
                defaults: {
                    anchor: "95%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                items: [{
                    xtype: "textarea",
                    name: "usergrouplist",
                    id: 'Js.Center.Popedom.Role.RolePermitToUser.UserGroupList',
                    fieldLabel: "客户组列表",
                    height: 200,
                    disabled: true
                }]
            }]
        }],
        listeners: {
            "expand": function(a, b, c){
                treePanel.root.reload();
                var userUgoupNames = "";
                var productNames = "";
                //显示已授权的通道组
                var jsonProductList = eval(doSynRequest(Js.Center.Business.ProductURL + "?flag=selectpermitbyroleids&columnlist=numprodid,vc2name&roleids=" + Js.Center.Popedom.Role.RolePermitToUser.window.updateRecord.get("numroleid")));
                if (jsonProductList.data.length > 0) {
                    for (var i = 0; i < jsonProductList.data.length; i++) {
                        if (jsonProductList.data.length == 1) {
                            productNames = jsonProductList.data[i].vc2name;
                        }
                        else {
                            if (i < (jsonProductList.data.length - 1)) {
                                productNames += jsonProductList.data[i].vc2name + ",";
                            }
                            if (i == (jsonProductList.data.length - 1)) {
                                productNames += jsonProductList.data[i].vc2name;
                            }
                        }
                    }
                }
                else {
                    productNames = "没有已授权的通道组！";
                }
                a.items.items[0].items.items[1].items.items[0].setValue(productNames);
                //显示已授权的客户组信息
                var jsonUserGroupList = eval(doSynRequest(Js.Center.Business.UserGroupURL + "?flag=selectpermitbyroleids&columnlist=numusergroupid,vc2usergroupname&roleids=" + Js.Center.Popedom.Role.RolePermitToUser.window.updateRecord.get("numroleid")));
                if (jsonUserGroupList.data.length > 0) {
                    for (var i = 0; i < jsonUserGroupList.data.length; i++) {
                        if (jsonUserGroupList.data.length == 1) {
                            userUgoupNames = jsonUserGroupList.data[i].vc2usergroupname;
                        }
                        else {
                            if (i < (jsonUserGroupList.data.length - 1)) {
                                userUgoupNames += jsonUserGroupList.data[i].vc2usergroupname + ",";
                            }
                            if (i == (jsonUserGroupList.data.length - 1)) {
                                userUgoupNames += jsonUserGroupList.data[i].vc2usergroupname;
                            }
                        }
                    }
                }
                else {
                    userUgoupNames = "没有已授权的客户组！";
                }
                a.items.items[0].items.items[2].items.items[0].setValue(userUgoupNames);
            }
        }
    
    });
    //**************END 定义部门功能汇集列表*********************************************
    
    
    
    //==============================================================配置部门权限
    this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "配置角色使用用户",
        mainForm: mainForm,
        width: 680,
        height: 400,
        updateState: true,
        updateRecord: row,
        autoScroll: true,
        displayStore: Js.Center.Popedom.Role.Infostore,
        needButtons: false,
        needLoadDataStore: true,
        items: [permissionDepartmentPanl, permissionRolePanel, southPanel],
        buttons: [{
            text: '保存',
            handler: function(){
                if (mainForm.isValid()) {
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
                    //修改权限
                      var  params = {
                            flag: 'updateuserrightbyroleid',
                            roleid: Js.Center.Popedom.Role.RolePermitToUser.window.updateRecord.get("numroleid"),
                            bigdepartid: Js.Center.Popedom.Role.RolePermitToUser.window.updateRecord.get("numdepartid"),
                            selectuserid: WXTL.Common.urlDecode(PermissionTree.getForm().getValues(true)).replace('itemselector=', '')
                        };
                    Js.Center.Popedom.Role.RolePermitToUser.window.mainFormSubmitFunc('', params,Js.Center.Popedom.UserFuncRoleUpdateURL);

                    //updateDDRPermission(WXTL.Common.urlDecode(PermissionTree.getForm().getValues(true)).replace('itemselector=', ''));
                }
            }
        }, {
            text: "取 消",
            minWidth: 70,
            handler: function(){
                Js.Center.Popedom.Role.RolePermitToUser.window.hide();
            }
        }],
		loadDataStoreFunc: function(){
		
			//预加载函数体
			//    var roleId = Js.Center.Popedom.Role.RolePermitToUser.window.updateRecord.get("numroleid");
//    var roleName = Js.Center.Popedom.Role.RolePermitToUser.window.updateRecord.get("vc2rolename");
//    var departId = Js.Center.Popedom.Role.RolePermitToUser.window.updateRecord.get("numdepartid");
//    var departName = Js.Center.Popedom.Role.RolePermitToUser.window.updateRecord.get("vc2departname");
//    var roleDesc = Js.Center.Popedom.Role.RolePermitToUser.window.updateRecord.get("vc2roledesc");

		fromStore.load({
                    params: {
                       roleid: Js.Center.Popedom.Role.RolePermitToUser.window.updateRecord.get("numroleid"),
                       departid: Js.Center.Popedom.Role.RolePermitToUser.window.updateRecord.get("numdepartid")
                    }
                });
		
        toStore.load({
                    params: {
                       roleid: Js.Center.Popedom.Role.RolePermitToUser.window.updateRecord.get("numroleid"),
                       departid: Js.Center.Popedom.Role.RolePermitToUser.window.updateRecord.get("numdepartid")
                    }
                });
			
		}
    });
    //========================================================================定义窗体
    
}
 
};
