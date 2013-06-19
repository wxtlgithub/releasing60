Ext.namespace('Js.Center.Popedom.UserPermit');

Js.Center.Popedom.UserPermit.func = function(numuserid, vc2uaccount, vc2username, numdepartid, vc2departname){
    if(Js.Center.Popedom.UserPermit.window==null){
    
//    var _vc2uaccount = vc2uaccount;
//    var _vc2username = vc2username;
//    var _numdepartid = numdepartid;
//    var _vc2departname = vc2departname;
//    var _numuserid = numuserid;
//    
    
    Js.Center.Popedom.User.UserStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: Js.Center.Popedom.UserURL,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            fields: ['numuserid', 'vc2username'],
            root: "data",
            id: "numuserid"
        })
    });
    //============================================随部门的变动而变======================账户下拉列表
    var userCombo = new Ext.form.ComboBox({//new WXTL.Widgets.CommonForm.ComboBox({
        fieldLabel: "用户名",
        hiddenName: "numuserid",
        id: 'Js.Center.Popedom.UserPermit.userCombo',
        readOnly: true,
        allowBlank: false,
        blankText: '请选择用户名',
        mode: "local",
        displayField: "vc2username",
        valueField: "numuserid",
        triggerAction: "all",
        //emptyText: "请选择账户名",
        store: Js.Center.Popedom.User.UserStore,
        listeners: {
            "select": function(a, b){
                southPanel.collapse(true);
                
                //document.getElementById("Js.Center.Popedom.DepartmentAdd.ParentId").value=b.id;
                fromStore.load({
                    params: {
                        userid: a.value//b.id
                    }
                });
                toStore.load({
                    params: {
                        userid: a.value//b.id
                    }
                });
                
            }
        }
    });
    
    //==========================================================================部门下拉列表
    
    var departComboxTree = new WXTL.Widgets.CommonForm.ComboWithTree({
        name: 'numdepartid',
        hiddenName: 'numdepartid',
        id: 'Js.Center.Popedom.UserPermit.DepartmentPrimit.departComboxTree',
        fieldLabel: "部门名称",
        allowBlank: false,
        blankText: '请选择部门',
        valueField: 'id',
        //listWidth: '200',
        listHeight: '150',
        
        baseParams: {
            columnlist: "numdepartid,vc2departname",
            flag: 'selectallbycurrentuser'
        },
        dataUrl: Js.Center.Popedom.DepartmentsQueryURL,//'URL/tree.ashx',
        listeners: {
            "select": function(a, b){
                southPanel.collapse(true);
               var _numdepartid = b.id;
                Ext.getCmp('Js.Center.Popedom.UserPermit.userCombo').setValue('');
                Js.Center.Popedom.User.UserStore.load({
                    params: {
                        departid: this.getValue(),
                        flag: 'selectallbydepartidforrole',
                        columnlist: "numuserid,vc2username,vc2email"
                    }
                });
                //document.getElementById("Js.Center.Popedom.DepartmentAdd.ParentId").value=b.id;
                fromStore.load({
                    params: {
                        departid: _numdepartid//b.id
                    }
                });
                toStore.load({
                    params: {
                        departid: _numdepartid//b.id\
                    }
                });
                
            }
        }
    });
    
    
    
    
    //======================================top====================================定义FormPanel
    var permissionTablePanl = new Ext.form.FormPanel({
        labelWidth: 60,
        //width:'95%',
        items: [{
            layout: 'column',
            bodyStyle: 'padding:10px,0px,0px,15px',
            items: [{
                columnWidth: .5,
                layout: 'form',
                
                defaults: {
                    anchor: '90%',
                    msgTarget: "side"
                },
                items: [departComboxTree]
            }, {
                columnWidth: .5,
                layout: 'form',
                defaultType: "textfield",
                
                defaults: {
                    anchor: '90%',
                    msgTarget: "side"
                },
                items: [userCombo]
            
//            }, {
//                columnWidth: .33,
//                layout: 'form',
//                defaultType: "textfield",
//                defaults: {
//                    anchor: '90%',
//                    msgTarget: "side"
//                },
//                items: [{
//                    xtype: "hidden",
//                    name: "vc2uaccount",
//                    fieldLabel: "备注"
//                
//                }]
            
            }]
        }]
    
    });

    //*****************未授权角色panel部分*********************************************    
    
    
    //=====================================================================未授权角色
    var fromStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({//数据代理 
            url: Js.Center.Popedom.UserFuncRoleURL,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            fields: ['numroleid', 'vc2rolename'],
            root: 'data',
            id: 'numroleid'
        }),
        baseParams: {
            flag: 'selectallbyuserid',
            typeid: 0,
            columnlist: 'numroleid,vc2rolename'
        }
    });
    
    //===========================================================================================已授权角色
    var toStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({//数据代理 
            url: Js.Center.Popedom.UserFuncRoleURL,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            fields: ['numroleid', 'vc2rolename'],
            root: 'data',
            id: 'numprodid'
        }),
        baseParams: {
            flag: 'selectallbyuserid',
            typeid: 1,
            columnlist: 'numroleid,vc2rolename'
        }
    });

    
    
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
            fieldLabel: "配置角色",
            dataFields: ["numroleid", "vc2rolename"],
            toData: [""],
            msWidth: 250,
            autoScroll: true,
            enableDD: false,
            msHeight: 200,
            valueField: 'numroleid',
            displayField: 'vc2rolename',
            //imagePath: "jspack/product/common/Images/",
            toLegend: "已选栏",
            fromLegend: "可选栏",
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
        items: [PermissionTree]
    });
    
    //**************END 以分、未分角色列表panel部分*********************************************   
    
    //    //定义部门结构树
    
    var mainForm = permissionTablePanl.getForm();
    var permissionPanel = new Ext.Panel({
        autoScroll: true,// 自动显示滚动条
        frame: true,
        height: 240,
        padding: '10 10 10 10',
        items: [{
            frame: true,
            html: '<div id="ddritemselector" class="demo-ct"></div>'
        }]
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
                            method: 'POST',
                            flag: 'selectfuncpermitbyroleids',
                            roleids: toStore.collect('numroleid')
                        };
                    }
                }
            })
        }),
        rootVisible: true
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
            columnlist: "numprodid,vc2name"
        
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
            columnlist: "numusergroupid,vc2usergroupname"
        
        }
    });
    //数据权限显示panel（功能权限、数据权限）
    var southPanel = new Ext.form.FormPanel({//new Ext.Panel({
        title: '账户功能汇集列表',
        width: '100%',
        id: "Js.Center.Popedom.UserPermit.southPanel",
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
                
                defaults: {
                    anchor: "95%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                items: [treePanel]
            }, {
                columnWidth: .35,
                layout: 'form',
                labelWidth: 65,
                defaultType: "textfield",
                
                defaults: {
                    anchor: "95%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                items: [{
                    xtype: "textarea",
                    name: "productlist",
                    id: 'Js.Center.Popedom.UserPermit.ProductList',
                    fieldLabel: "通道组列表",
                    height: 200,
                    disabled: true
                }]
            }, {
                columnWidth: .35,
                layout: 'form',
                labelWidth: 65,
                defaultType: "textfield",
                defaults: {
                    anchor: "95%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                items: [{
                    xtype: "textarea",
                    name: "usergrouplist",
                    id: 'Js.Center.Popedom.UserPermit.UserGroupList',
                    fieldLabel: "客户组列表",
                    height: 200,
                    disabled: true
                }]
            }]
        }],
        listeners: {
            "expand": function(a, b, c){
            
                var userUgoupNames = "";
                var productNames = "";
                var roleids = WXTL.Common.urlDecode(PermissionTree.getForm().getValues(true)).replace('itemselector=', '');
                treePanel.root.reload();
                if (roleids != "") {
                    //===============================================显示已授权的通道组
                    
                    var jsonProductList = eval(doSynRequest(Js.Center.Business.ProductURL + "?flag=selectpermitbyroleids&columnlist=numprodid,vc2name&roleids=" + roleids));
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
                    //==============================================显示已授权的客户组信息
                    
                    var jsonUserGroupList = eval(doSynRequest(Js.Center.Business.UserGroupURL + "?flag=selectpermitbyroleids&columnlist=numusergroupid,vc2usergroupname&roleids=" + roleids));
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
                    
                }
                else {
                    productNames = "没有已授权的通道组！";
                    userUgoupNames = "没有已授权的客户组！";
                    
                }
                a.items.items[0].items.items[1].items.items[0].setValue(productNames);
                a.items.items[0].items.items[2].items.items[0].setValue(userUgoupNames);
                
            }
        }
    
    });
    //**************END 定义部门功能汇集列表*********************************************
   this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "配置账户权限",
        mainForm: mainForm,
        width: 680,
        height: 380,
        autoScroll: true,
        closeAction: 'hide',
        displayStore: Js.Center.Popedom.User.Infostore,
        updateState: true,
        //updateRecord: row,
        needButtons: false,
        items: [permissionTablePanl, permissionRolePanel, southPanel],
          needLoadDataStore: true,
        loadDataStoreFunc: function(){
            departComboxTree.tree.root.reload();
            Js.Center.Popedom.User.UserStore.load({
                    params: {
                        departid: '',
                        flag: 'selectallbydepartidforrole',
                        columnlist: "numuserid,vc2username,vc2email"
                    }
                });
			if(Js.Center.Popedom.UserPermit.window.updateRecord != null && Js.Center.Popedom.UserPermit.window.updateRecord != ""){
				var node;
				if(Js.Center.Popedom.UserPermit.window.updateRecord.success == null){
					node = {
						'id':Js.Center.Popedom.UserPermit.window.updateRecord.get("numdepartid"),
						'text':Js.Center.Popedom.UserPermit.window.updateRecord.get("vc2departname")
					};
					userCombo.setValue(Js.Center.Popedom.UserPermit.window.updateRecord.get("numuserid"));
					Ext.get("Js.Center.Popedom.UserPermit.userCombo").dom.value=Js.Center.Popedom.UserPermit.window.updateRecord.get("vc2username");

				}
				else{
					node = {
						'id':Js.Center.Popedom.UserPermit.window.updateRecord.numdepartid,
						'text':Js.Center.Popedom.UserPermit.window.updateRecord.vc2departname
					};
					userCombo.setValue(Js.Center.Popedom.UserPermit.window.updateRecord.numuserid);
					Ext.get("Js.Center.Popedom.UserPermit.userCombo").dom.value=Js.Center.Popedom.UserPermit.window.updateRecord.vc2username;

				}
				departComboxTree.setValue(node);
				departComboxTree.disable();
				userCombo.disable();
			}
			else{
				departComboxTree.enable();
				userCombo.enable();
			}
               // Js.Center.Popedom.UserPermit.window.mainForm.loadRecord(Js.Center.Popedom.UserPermit.window.updateRecord);
			//加载授权角色数据
		        fromStore.load({
                    params: {
                        userid:userCombo.getValue()
                    }
                });
                toStore.load({
                    params: {
                        userid:userCombo.getValue()
                    }
                });
               
        },
        
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
                    updateDDRPermission(WXTL.Common.urlDecode(PermissionTree.getForm().getValues(true)).replace('itemselector=', ''));
                }
            }
        }, {
            text: "取 消",
            minWidth: 70,
            handler: function(){
              Js.Center.Popedom.UserPermit.window.mainForm.reset();
              Js.Center.Popedom.UserPermit.window.hide();
              
            }
        }]
    });
    
    //========================================================================执行显示

    
    //=====================================================修改权限方法
    function updateDDRPermission(idlist){
        var parms = {
                flag: 'updateuserrolebyroleids',
                roleids: idlist,
                userid: userCombo.getValue()//Ext.get("numuserid").getValue()
            };
        Js.Center.Popedom.UserPermit.window.mainFormSubmitFunc('',parms,Js.Center.Popedom.UserFuncRoleUpdateURL);

    };
  }
};


