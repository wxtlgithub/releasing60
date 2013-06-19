Ext.namespace('Js.Center.Popedom.Department.DepartmentPermit');

Js.Center.Popedom.Department.DepartmentPermit.func = function(departId, departName){
    //==============================================================判断窗体是否为空
    if(Js.Center.Popedom.Department.DepartmentPermit.window == null)
	{
    //==============================================================配置部门权限
    //**************部门下拉树部分*********************************************
    //定义部门结构树
    var departComboxTree = new WXTL.Widgets.CommonForm.ComboWithTree({
        name: 'numdepartid',
        hiddenName: 'numdepartid',
        //id: 'Js.Center.Popedom.Department.DepartmentPermit.departComboxTree',
        
        fieldLabel: "部门名称",
        allowBlank: false,
        blankText: '请选择部门',
        valueField: 'id',
        listHeight: '150',
        baseParams: {
            columnlist: "numdepartid,vc2departname",
            flag: 'selectallchildbycurrentuser'
        },
        dataUrl: Js.Center.Popedom.DepartmentsQueryURL, //'URL/tree.ashx',
        listeners: {
            "select": function(a, b){
                southPanel.collapse(true);
                //_dapartmentID = b.id;
                //document.getElementById("Js.Center.Popedom.DepartmentAdd.ParentId").value=b.id;
                fromStore.load({
                    params: {
                        departid: b.id
                    }
                });
                toStore.load({
                    params: {
                        departid: b.id
                    }
                });
            }
        }
    });
    var departComboxTreePanl = new Ext.Panel({
        labelWidth: 75,
        width: '95%',
        items: [{
            layout: 'column',
            
            items: [{
                columnWidth: .6,
                layout: 'form',
                
                defaults: {
                    anchor: '90%',
                    msgTarget: "side"
                },
                items: [departComboxTree]
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
    //===============================================初始化部门树数据
    
    //**************END 部门下拉树部分*********************************************
    
    //**************以分、未分角色列表panel部分*********************************************
    //==========================================================未授权角色
    var fromStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({//数据代理 
            url: Js.Center.Popedom.UserFuncRoleURL,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            fields: ["numroleid", "vc2rolename"],
            root: 'data',
            id: 'numroleid'
        }),
        baseParams: {
            flag: "selectallbydepartid",
            columnlist: "numroleid,vc2rolename",
            typeid: 0
            //departid:departId
        }
    });
    //==========================================================已授权角色
    var toStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({//数据代理 
            url: Js.Center.Popedom.UserFuncRoleURL,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            fields: ["numroleid", "vc2rolename"],
            root: 'data',
            id: 'numroleid'
        }),
        baseParams: {
            flag: "selectallbydepartid",
            columnlist: "numroleid,vc2rolename",
            typeid: 1
            //departid:departId
        }
    });

    //========================================================绘制已选、未选角色列表panel
    var PermissionTree = new Ext.form.FormPanel({
        frame: true,
        bodyStyle: 'padding:10px,0px,0px,10px',
        autoScroll: true, // 自动显示滚动条
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
        //padding: '10 10 10 10',
        items: [PermissionTree]
    });
    
    //**************END 以分、未分角色列表panel部分*********************************************
    
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
            url: Js.Center.Business.UserGroupURL,
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
                    
                        var roleids = WXTL.Common.urlDecode(PermissionTree.getForm().getValues(true)).replace('itemselector=', '');
                        
                        treeloader.baseParams = {
                            method: 'POST',
                            flag: 'selectfuncpermitbyroleids',
                            //roleids: toStore.collect('numroleid')
                            roleids: roleids
                        
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
        id: "Js.Center.Popedom.Department.DepartmentPermit.southPanel",
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
                    id: 'Js.Center.Popedom.Department.DepartmentPermit.ProductList',
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
                    id: 'Js.Center.Popedom.Department.DepartmentPermit.UserGroupList',
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
                    //========================================显示已授权的通道组
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
                    
                    //=============================================显示已授权的客户组信息
                    
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
    //**************************END 定义部门功能汇集列表*********************************************
	var mainForm = permissionDepartmentPanl.getForm();
    //Js.Center.Popedom.Department.DepartmentPermit.PermitWin = new WXTL.Widgets.CommonWindows.Window({
    this.window = new WXTL.Widgets.CommonWindows.Window({
        //closeAction: 'close',
        title: "配置部门权限",
        mainForm: mainForm,
        width: 680,
        height: 400,
        updateState: true,
        autoScroll: true,
        displayStore: Js.Center.Popedom.Department.Infostore,
        needButtons: false,
        items: [permissionDepartmentPanl, permissionRolePanel, southPanel],
		needLoadDataStore: true,
        loadDataStoreFunc: function(){
			//if (departName != "") {
			departComboxTree.tree.root.reload();
			if(Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord != null){
				var node;
				if(Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord.success == null){
					node = {
						'id':Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord.get("numdepartid"),
						'text':Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord.get("vc2departname")
					};
				}
				else{
					node = {
						'id':Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord.numdepartid,
						'text':Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord.vc2departname
					};
				}
				departComboxTree.setValue(node);
				departComboxTree.disable();
			}
			else{
				departComboxTree.enable();
			}
			//加载授权角色数据
                fromStore.load({
                    params: {
                        departid: departComboxTree.getValue()
                    }
                });
                toStore.load({
                    params: {
                        departid: departComboxTree.getValue()
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
                    }, 3000);
                    //修改权限
                    updateDDRPermission(WXTL.Common.urlDecode(PermissionTree.getForm().getValues(true)).replace('itemselector=', ''));
                }
                
            }
        }, {
            text: "取 消",
            minWidth: 70,
            handler: function(){
                Js.Center.Popedom.Department.DepartmentPermit.window.hide();
            }
        }]
    });
    
  
    
    //=====================================================修改权限方法
    function updateDDRPermission(idlist){
        var params = {
            flag: 'updatedepartrolebyroleids',
            departid: departComboxTree.getValue(),//_dapartmentID,
            roleids: idlist
        };
        Js.Center.Popedom.Department.DepartmentPermit.window.mainFormSubmitFunc('', params, Js.Center.Popedom.UserFuncRoleUpdateURL);
        
      
    };
    		
		
		
	}
    };
