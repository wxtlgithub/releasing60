Ext.namespace('Js.Center.Popedom.Role.RolePermit');

Js.Center.Popedom.Role.RolePermit.func = function(roleId, roleName, departId, departName){
   
   if(Js.Center.Popedom.Role.RolePermit.window==null){
   
    var _roleIds;
    //**************部门下拉树部分*********************************************	
    //============================================随部门的变动而变======================账户下拉列表
    var roleCombo = new Ext.form.ComboBox({//new WXTL.Widgets.CommonForm.ComboBox({
        fieldLabel: "角色名称",
        hiddenName: "numroleid",
        name:"numroleid",
        id: 'Js.Center.Popedom.Role.RolePermit.roleCombo',
        readOnly: true,
        mode: "local",
        displayField: "vc2rolename",
        valueField: "numroleid",
        triggerAction: "all",
        emptyText: "请选择角色",
        allowBlank: false,
        blankText: '请选择角色',
        store: Js.Center.Common.RoleByDepartIdStore,
        listeners: {
            "select": function(value){
                southPanel.collapse(true);
                _roleIds = this.getValue();
                fromStoreUser.load({
                    params: {
                        roleid: this.getValue(),
                        departid: departComboxTree.getValue()
                    }
                });
                toStoreUser.load({
                    params: {
                        roleid: this.getValue(),
                        departid: departComboxTree.getValue()
                    }
                });
                fromStoreDepart.load({
                    params: {
                        roleid: this.getValue(),
                        parentid: departComboxTree.getValue()
                    }
                });
                toStoreDepart.load({
                    params: {
                        roleid: this.getValue(),
                        parentid: departComboxTree.getValue()
                    }
                });
            }
        }
    });
    
    //==========================================================================部门下拉列表
    
    var departComboxTree = new WXTL.Widgets.CommonForm.ComboWithTree({
        name: 'numdepartid',
        hiddenName: 'numdepartid',
        //id: 'Js.Center.Popedom.Department.DepartmentPrimit.departComboxTree',
        fieldLabel: "部门名称",
        allowBlank: false,
        blankText: '请选择部门',
        valueField: 'id',
        listWidth: '200',
        listHeight: '150',
        baseParams: {
            columnlist: "numdepartid,vc2departname",
            flag: 'selectallbycurrentuser'
        },
        dataUrl: Js.Center.Popedom.DepartmentsQueryURL,//'URL/tree.ashx',
        listeners: {
            "select": function(a, b){
                southPanel.collapse(true);
                roleCombo.setValue('');
                //Ext.getCmp('roleCombo').setValue('');
                Js.Center.Common.RoleByDepartIdStore.load({
                    params: {
                        departid: b.id
                    }
                });
                //document.getElementById("Js.Center.Popedom.DepartmentAdd.ParentId").value=b.id;
                fromStoreUser.load({
                    params: {
                        roleid: '',
                        departid: b.id
                    }
                });
                toStoreUser.load({
                    params: {
                        roleid: '',
                        departid: b.id
                    }
                });
                fromStoreDepart.load({
                    params: {
                        roleid: '',
                        parentid: b.id
                    }
                });
                toStoreDepart.load({
                    params: {
                        roleid: '',
                        parentid: b.id
                    }
                });
            }
        }
    });
    //=============================定义部门、角色Panel
    var departComboxTreePanl = new Ext.Panel({
        width:'95%',
        items: [{
            layout: 'column',
            items: [{
                columnWidth: .5,
                layout: 'form',
                defaultType: "textfield",
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
                items: [roleCombo]
            }]
        }]
    });
    
//    if (roleName != null) {
//        _roleIds = roleId;
//        departComboxTreePanl = new Ext.Panel({
//            width:'95%',
//            items: [{
//                layout: 'column',
//                items: [{
//                    columnWidth: .5,
//                    layout: 'form',
//                    defaultType: "textfield",
//                    defaults: {
//                        anchor: '90%',
//                        msgTarget: "side"
//                    },
//                    items: [{
//                        labelWidth: 45,
//                        readOnly: true,
//                        xtype: "hidden",
//                        name: "roleid",
//                        fieldLabel: "角色ID"//,
//                       // value: roleId
//                    }, {
//                        labelWidth: 45,
//                        readOnly: true,
//                        xtype: "textfield",
//                        name: "vc2rolename",
//                        fieldLabel: "角色名称"//,
//                        //value: roleName
//                    }]
//                }, {
//                    columnWidth: .5,
//                    layout: 'form',
//                    defaultType: "textfield",
//                    defaults: {
//                        anchor: '90%',
//                        msgTarget: "side"
//                    },
//                    items: [{
//                        labelWidth: 45,
//                        readOnly: true,
//                        xtype: "hidden",
//                        name: "numdepartid",
//                        fieldLabel: "所属部门ID"//,
//                       // value: departId
//                    }, {
//                        labelWidth: 45,
//                        readOnly: true,
//                        xtype: "textfield",
//                        name: "vc2departname",
//                        fieldLabel: "所属部门"//,
//                        //value: departName
//                    }]
//                }]
//            }]
//        });
//        //Ext.getCmp("vc2departname").setValue(departName);
//    
//    
//    };
    
    //选择部门下拉书所在panel
    var permissionDepartmentPanl = new Ext.form.FormPanel({
        frame: true,
        autoScroll: true, // 自动显示滚动条
        padding: '10 10 10 10',
        items: [departComboxTreePanl]
    
    });
    //===============================================初始化部门树数据
    
    //**************END 部门下拉树部分*********************************************
    
    //**************已配置、未配置用户、部门列表panel部分*********************************************
    //=====================================未配置用户
    var fromStoreUser = new Ext.data.Store({
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
            typeid: 0
        }
    });
    //==================================已配置用户
    var toStoreUser = new Ext.data.Store({
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
            typeid: 1
        }
    });
    //=====================================未配置部门
    var fromStoreDepart = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({//数据代理 
            url: Js.Center.Popedom.DepartmentsQueryURL,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            fields: ["numdepartid", "vc2departname"],
            root: 'data',
            id: 'numdepartid'
        }),
        baseParams: {
            flag: "selectbydepartidwithroleid",
            columnlist: "numdepartid,vc2departname",
            typeid: 0
        }
    });
    //==================================已配置部门
    var toStoreDepart = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({//数据代理 
            url: Js.Center.Popedom.DepartmentsQueryURL,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            fields: ["numdepartid", "vc2departname"],
            root: 'data',
            id: 'numdepartid'
        }),
        baseParams: {
            flag: "selectbydepartidwithroleid",
            columnlist: "numdepartid,vc2departname",
            typeid: 1
        }
    });
//    if (departName != null) {
//        fromStoreUser.load({
//            params: {
//                roleid: roleId,
//                departid: departId
//            }
//        });
//        toStoreUser.load({
//            params: {
//                roleid: roleId,
//                departid: departId
//            }
//        });
//        fromStoreDepart.load({
//            params: {
//                roleid: roleId,
//                parentid: departId
//            }
//        });
//        toStoreDepart.load({
//            params: {
//                roleid: roleId,
//                parentid: departId
//            }
//        });
//    }
    //========================================================绘制已配置、未配置用户列表panel
    var PermissionTreeToUser = new Ext.form.FormPanel({
        frame: true,
        bodyStyle: 'padding:10px,0px,0px,10px',
        autoScroll: true,// 自动显示滚动条
        labelWidth: 60,
        //height: 150,
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
            msHeight: 130,
            valueField: 'numuserid',
            displayField: 'vc2username',
            //imagePath: "jspack/product/common/Images/",
            toLegend: "已选择用户",
            fromLegend: "可选择用户",
            fromStore: fromStoreUser,
            toStore: toStoreUser,
            listeners: {
                "change": function(){
                    southPanel.collapse(true);
                }
            }
        }]
    });
    //========================================================绘制已配置、未配置部门列表panel
    var PermissionTreeToDepart = new Ext.form.FormPanel({
        frame: true,
        bodyStyle: 'padding:10px,0px,0px,10px',
        autoScroll: true,// 自动显示滚动条
        labelWidth: 60,
        //height: 150,
        items: [{
            anchor: ',100%',
            xtype: "itemselector",
            name: "itemselector",
            id:"Js.Center.Role.RolePermit.itemselector",
            fieldLabel: "配置部门",
            dataFields: ["numdepartid", "vc2departname"],
            toData: [""],
            msWidth: 250,
            autoScroll: true,
            enableDD: false,
            msHeight: 130,
            valueField: 'numdepartid',
            displayField: 'vc2departname',
            //imagePath: "jspack/product/common/Images/",
            toLegend: "已使用的部门",
            fromLegend: "待选择的部门",
            fromStore: fromStoreDepart,
            toStore: toStoreDepart,
            fromTBar:[new Ext.form.TextField({    
            	width: 200,
            	id:"Js.Center.Role.Permit.Textsearch",
                emptyText:'Find a Class',
                listeners:{
                	render : function(f) {
                		f.el.on('keyup', function(e){
                			Ext.getCmp("Js.Center.Role.RolePermit.itemselector").fromMultiselect.view.store.filter("vc2departname",f.getValue(),true,false);
                		}, f, {buffer: 350});
					}
                }
            })],
            listeners: {
                "change": function(){
                    southPanel.collapse(true);
                }
            }
        }]
    });
    var hiddenPkgs = [];
    function filterData(e){
    	alert(2);
    	 fromStoreDepart.filterBy(function(n) {
    		 alert(1);
         var text = record.get('vc2departname');
            // 用自己的过滤规则,如写正则式
//          if(text.indexOf(e.target.value) != -1){
//          }
         });
    	
    }

    var permissionRolePanel = new Ext.Panel({
        //autoScroll: true,// 自动显示滚动条
        frame: true,
        height: 350,
        //padding: '10 10 10 10',
        items: [PermissionTreeToUser, PermissionTreeToDepart]
    });

    
    //====================================================================获得通道组列表
    var ProductStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({//数据代理 
            url: Js.Center.Business.RoleProductURL,
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
                url: Js.Center.Popedom.UserFuncRoleURL,//treeData,
                listeners: {
                    "beforeload": function(treeloader, node){
                        treeloader.baseParams = {
                            parentid: node.id,
                            flag: 'selectfuncpermitbyroleids',
                            roleids: _roleIds,
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
        title: '部门功能汇集列表',
        width: '100%',
        id: "Js.Center.Popedom.Role.RolePermit.southPanel",
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
                    id: 'Js.Center.Popedom.Role.RolePermit.ProductList',
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
                    id: 'Js.Center.Popedom.Role.RolePermit.UserGroupList',
                    fieldLabel: "客户组列表",
                    height: 200,
                    disabled: true
                }]
            }]
        }],
        listeners: {
            "expand": function(a, b, c){
                if (_roleIds == null) {                    
                    Ext.Msg.alert("温馨提示", "请先选择角色!");
                }
                else {
                    treePanel.root.reload();
                    var userUgoupNames = "";
                    var productNames = "";
                    var roleID = roleCombo.getValue();
                    if (roleId != null) {
                        roleID = roleId;
                    }
                    
                    //显示已授权的通道组
                    var jsonProductList = eval(doSynRequest(Js.Center.Business.RoleProductURL + "?flag=selectpermitbyroleids&columnlist=numprodid,vc2name&roleids=" + roleID));
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
                    var jsonUserGroupList = eval(doSynRequest(Js.Center.Business.UserGroupURL + "?flag=selectpermitbyroleids&columnlist=numusergroupid,vc2usergroupname&roleids=" + roleID));
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
        }
    
    });
    //**************END 定义部门功能汇集列表*********************************************
    var mainForm = permissionDepartmentPanl.getForm();
//==============================================================配置部门权限
    this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "角色授权",
        mainForm: mainForm,
        width: 680,
        height: 500,
        autoScroll: true,
        displayStore: Js.Center.Popedom.Role.Infostore,
        needButtons: false,
        updateState: true,
        //updateRecord: row,
        items: [permissionDepartmentPanl, permissionRolePanel, southPanel],
        needLoadDataStore: true,
        loadDataStoreFunc: function(){
            departComboxTree.tree.root.reload();
            Ext.getCmp('Js.Center.Role.Permit.Textsearch').enable();
    		Ext.getCmp('Js.Center.Role.Permit.Textsearch').setValue(null);
            Js.Center.Common.RoleByDepartIdStore.load({
                    params: {
                        departid: ''
                    }
                });
            //Js.Center.Popedom.Role.RolePermit.window.items.items[1].reset();
//            PermissionTreeToUser.reset();
//            PermissionTreeToDepart.reset();
             _roleIds = null;
			if(Js.Center.Popedom.Role.RolePermit.window.updateRecord != null && Js.Center.Popedom.Role.RolePermit.window.updateRecord != ""){
				var node;
				if(Js.Center.Popedom.Role.RolePermit.window.updateRecord.success == null){
					node = {
						'id':Js.Center.Popedom.Role.RolePermit.window.updateRecord.get("numdepartid"),
						'text':Js.Center.Popedom.Role.RolePermit.window.updateRecord.get("vc2departname")
					};
					roleCombo.setValue(Js.Center.Popedom.Role.RolePermit.window.updateRecord.get("numroleid"));
					_roleIds = Js.Center.Popedom.Role.RolePermit.window.updateRecord.get("numroleid");
					Ext.get("Js.Center.Popedom.Role.RolePermit.roleCombo").dom.value=Js.Center.Popedom.Role.RolePermit.window.updateRecord.vc2rolename;

				} else{
					node = {
						'id':Js.Center.Popedom.Role.RolePermit.window.updateRecord.numdepartid,
						'text':Js.Center.Popedom.Role.RolePermit.window.updateRecord.vc2departname
					};
					roleCombo.setValue(Js.Center.Popedom.Role.RolePermit.window.updateRecord.numroleid);
					_roleIds = Js.Center.Popedom.Role.RolePermit.window.updateRecord.numroleid;
					Ext.get("Js.Center.Popedom.Role.RolePermit.roleCombo").dom.value=Js.Center.Popedom.Role.RolePermit.window.updateRecord.vc2rolename;

				}
				departComboxTree.setValue(node);
				departComboxTree.disable();
				roleCombo.disable();
			} else{
				departComboxTree.enable();
				roleCombo.enable();
			}
			//加载授权角色数据
           fromStoreUser.load({
                params: {
                    roleid: roleCombo.getValue(),
                    parentid: departComboxTree.getValue()
                }
            });
            toStoreUser.load({
                params: {
                    roleid: roleCombo.getValue(),
                    parentid: departComboxTree.getValue()
                }
            });
            fromStoreDepart.load({
                params: {
                    roleid: roleCombo.getValue(),
                    parentid: departComboxTree.getValue()
                }
            });
            toStoreDepart.load({
                params: {
                    roleid: roleCombo.getValue(),
                    parentid: departComboxTree.getValue()
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
                    //当其传值时将次组件禁用，避免itemselector传值出现脏数据
                    Ext.getCmp('Js.Center.Role.Permit.Textsearch').disable();
                    //修改权限
                    updateRolePermitUserDepart(WXTL.Common.urlDecode(PermissionTreeToUser.getForm().getValues(true)).replace('itemselector=', ''), WXTL.Common.urlDecode(PermissionTreeToDepart.getForm().getValues(true)).replace('itemselector=', ''));
                }
            }
        }, {
            text: "取 消",
            minWidth: 70,
            handler: function(){
                 Js.Center.Popedom.Role.RolePermit.window.mainForm.reset();
                Js.Center.Popedom.Role.RolePermit.window.hide();
            }
        }]
    });
    //========================================================================定义窗体
    
   // Js.Center.Popedom.Role.RolePermit.PermitWin.show();
    
    //=====================================================修改权限方法
    function updateRolePermitUserDepart(userIdList, departIdList){
    	
        var _roleID = roleCombo.getValue();
        var _departID = departComboxTree.getValue();
        if (roleId != null) {
            _roleID = roleId;
        };
        if (departId != null) {
            _departID = departId;
        };
        var  params = {
                flag: 'updatedepartuserrightbyroleid',
                roleid: _roleID,
                bigdepartid: _departID,
                selectdepartid: departIdList,
                selectuserid: userIdList
            };
         Js.Center.Popedom.Role.RolePermit.window.mainFormSubmitFunc('', params,Js.Center.Popedom.UserFuncRoleUpdateURL);


    };
}

};

