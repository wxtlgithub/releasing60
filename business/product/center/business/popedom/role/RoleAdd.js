Ext.namespace('Js.Center.Popedom.RoleAdd');

Js.Center.Popedom.RoleAdd.func = function(){
   
    var userGroupList;
    // ================================================================ 定义FormPanel
    //定义部门结构树
    var departComboxTree = new WXTL.Widgets.CommonForm.ComboWithTree({
        name: 'numdepartid',
        hiddenName: 'numdepartid',
        fieldLabel: "<font color=red>权限范围</font>",
        id:'Js.Center.Popedom.RoleAdd.RoleComboxTree',
        //anchor:'90%',
        //displayField:'vc2rightname',
        valueField: 'id',
        //listWidth: '200',
        listHeight: '150',
        emptyText: '-=请选择=-',
        allowBlank: false,
        blankText: '此项必填',
        //value: Js.Center.Common.userDepartId,
        //displayValue:Js.Center.Common.userDepartName,
        baseParams: {
            columnlist: "numdepartid,vc2departname",
            flag: 'selectallbycurrentuser'
        },
        dataUrl: Js.Center.Popedom.DepartmentsQueryURL,//'URL/tree.ashx'
        listeners: {
            "select": function(a, b){
                CreateTree(0, this.getValue());
                createGroupPanel('', this.getValue());
            }
        }
    });
    var addInfoFormPanel = new Ext.form.FormPanel({
        //width: 600,
        frame: true,
        labelWidth: 80,
        items: [{
            layout: 'column',
            items: [{
                xtype: "hidden",
                name: "flag",
                value: "insert"
            }, {
                columnWidth: .5,
                layout: 'form',
                defaultType: "textfield",
                //锚点布局-
                defaults: {
                    anchor: "92%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                bodyStyle: "padding:0px 0 0px 15px",
                items: [{
                    xtype: "textfield",
                    name: "vc2rolename",
                    fieldLabel: "<font color=red>角色名称</font>",
                    allowBlank: false,
                    blankText: "角色名称不允许为空",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 50
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
                bodyStyle: "padding:0px 0 0px 15px",
                items: [{
                    xtype: "textfield",
                    name: "vc2roledesc",
                    fieldLabel: "备注",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 50
                }]
            }, {
                columnWidth: 1,
                layout: 'form',
                defaultType: "textfield",
                //锚点布局-
                defaults: {
                    anchor: "45%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                bodyStyle: "padding:0px 0 0px 15px",
                items: [departComboxTree]
            }, {
                columnWidth: .5,
                layout: 'form',
                //锚点布局-
                defaults: {
                    anchor: "90%",
                    msgTarget: "side"
                },
                labelWidth: 130,
                bodyStyle: "padding:0px 0 0px 15px",
                items: [{
                    xtype: "textfield",
                    fieldLabel: "选择可使用的功能菜单",
                    hidden: true
                }, {
                    html: '<div id="Js.Center.Popedom.RoleAdd.PermitTree" style="float:left;margin:0px;border:1px solid #c3daf9;width:95%;height:270px;"></div>'
                }, {
                    xtype: "hidden",
                    fieldLabel: "功能菜单ID",
                    name: 'funpermissionids',
                    id: 'Js.Center.Popedom.RoleAdd.FunPermitIds'
                }]
            }, {
                columnWidth: .5,
                layout: 'form',
                //锚点布局-
                defaults: {
                    anchor: "90%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                bodyStyle: "padding:0px 0 0px 15px",
                labelWidth: 130,
                items: [{
                    xtype: "textfield",
                    fieldLabel: "选择可使用的业务内容",
                    hidden: true
                }, {
                    html: '<div id="Js.Center.Popedom.RoleAdd.groupPanelFieldSet" style="float:left;margin:0px;border:1px solid #c3daf9;width:99%;height:150px;"></div>'
                }, {
                    html: '<div id="Js.Center.Popedom.RoleAdd.productPanelFieldSet" style="float:left;margin:0px;border:1px solid #c3daf9;width:95%;height:150px;"></div>'
                }]//groupPanelFieldSet, productPanelFieldSet]//
            }]
        }]
    });
    
    
    // ================================================================== 定义窗体
    var mainForm = addInfoFormPanel.getForm();
    this.window= new WXTL.Widgets.CommonWindows.Window({
        title: "添加角色",
        width: '800',
        mainForm: mainForm,
        updateURL: Js.Center.Popedom.UserFuncRoleUpdateURL,
        displayStore: Js.Center.Popedom.Role.Infostore,
        items: [addInfoFormPanel],
        needButtons: false,
		needLoadDataStore: true,
        buttons: [new Ext.Button({
            text: '保存退出',
            minWidth: 70,
            qtip: "保存退出",
            handler: function(){
                //修改权限
                var idListArr = getAllChildrenNodes(PermissionTree.getRootNode());
                var idlist = '';
                for (var i = 0; i < idListArr.length; i++) {
                    if (idListArr[i].attributes) {
                        if (idListArr[i].id != '-1' && idListArr[i].attributes.checked) {
                            if (idlist.length == 0) 
                                idlist += idListArr[i].id;
                            else 
                                idlist += ',' + idListArr[i].id;
                        }
                    }
                }
                Ext.getCmp('Js.Center.Popedom.RoleAdd.FunPermitIds').setValue(idlist);
                if (mainForm.isValid()) {
                    // 弹出效果
                    Ext.MessageBox.show({
                        msg: '正在保存，请稍等...',
                        progressText: 'Saving...',
                        width: 300,
                        wait: true,
                        icon: 'download',
                        animEl: 'saving'
                    });
                    setTimeout(function(){
                        Ext.MessageBox.hide();
                    }, 300000);
                    
                   Js.Center.Popedom.RoleAdd.window.mainFormSubmitFunc();

                }
            }
        }), new Ext.Button({
            text: '重填',
            qtip: "重填",
            minWidth: 70,
            handler: function(){
                addInfoFormPanel.getForm().reset();
                CreateTree(0, Js.Center.Common.userDepartId);
                createGroupPanel('', Js.Center.Common.userDepartId);
            }
        }), new Ext.Button({
            text: '下一步',
            qtip: "下一步",
            minWidth: 70,
            handler: function(){
                //修改权限
                var idListArr = getAllChildrenNodes(PermissionTree.getRootNode());
                var idlist = '';
                for (var i = 0; i < idListArr.length; i++) {
                    if (idListArr[i].attributes) {
                        if (idListArr[i].id != '-1' && idListArr[i].attributes.checked) {
                            if (idlist.length == 0) 
                                idlist += idListArr[i].id;
                            else 
                                idlist += ',' + idListArr[i].id;
                        }
                    }
                }
                Ext.getCmp('Js.Center.Popedom.RoleAdd.FunPermitIds').setValue(idlist);
                if (mainForm.isValid()) {
                    Js.Center.Popedom.RoleAdd.window.mainFormSubmitFunc('Js.Center.Popedom.RoleAdd.nextStepFunc(objJson.roleid, objJson.rolename, objJson.departid,Ext.get("Js.Center.Popedom.RoleAdd.RoleComboxTree").dom.value)');
                }
                
            }
        }), new Ext.Button({
            text: '关闭',
            qtip: "关闭",
            minWidth: 70,
            handler: function(){
                Js.Center.Popedom.RoleAdd.window.hide();
            }
        })],
		loadDataStoreFunc: function(){
          Ext.MessageBox.show({
                msg: '正在加载数据，请稍等...',
                progressText: 'Saving...',
                width: 300,
                wait: true,
                icon: 'download',
                animEl: 'saving'
            });
			departComboxTree.tree.root.reload();
			departComboxTree.setValue(depNode);
    		CreateTree(0, Js.Center.Common.userDepartId);
    		createGroupPanel('', Js.Center.Common.userDepartId);
    		Ext.MessageBox.hide();
		}
    });
    
    var depNode = eval({
        "id": Js.Center.Common.userDepartId,
        "text": Js.Center.Common.userDepartName
    });
  
    //========================================================创建客户组、通道组列表Panel
    
    function createGroupPanel(roleId, departID){
        document.getElementById('Js.Center.Popedom.RoleAdd.groupPanelFieldSet').innerHTML = '';
        Ext.get('Js.Center.Popedom.RoleAdd.groupPanelFieldSet').dom.innerHTML = '';
        document.getElementById('Js.Center.Popedom.RoleAdd.productPanelFieldSet').innerHTML = '';
        Ext.get('Js.Center.Popedom.RoleAdd.productPanelFieldSet').dom.innerHTML = '';
        //客户组列表
        var userGroupList = new WXTL.Widgets.CommonForm.CheckboxGroup.RemoteCheckboxGroup({
            url: Js.Center.Business.UserGroupURL,
            queryparams: 'flag=selectpermitbydepartidwithroleid&columnlist=numusergroupid,vc2usergroupname&departid=' + departID + '&roleid=' + roleId,
            requestname: 'usergroupids',
            defaultsItemsName: 'usergroupids',
            defaultsItemsboxLable: '对不起，没有相关客户组信息。',
            numcolumns: 2,
            messageID: 1,
            reader: new Ext.data.JsonReader({
                totalProperty: 'totalProperty',
                root: 'data',
                fields: [{
                    name: 'id'
                }, {
                    name: 'name'
                
                }, {
                    name: 'boxLabel',
                    mapping: "vc2usergroupname"
                }, {
                    name: 'inputValue',
                    mapping: "numusergroupid"
                }, {
                    name: 'checked'
                }]
            })
        });
        var groupPanel = new Ext.Panel({
            style: 'padding:0 0 0 5px',
            autoHeight: true,
            width: 300,
            items: [{
                items: [userGroupList]
            }]
        });
        groupPanel.doLayout();
        
        groupPanelFieldSet = new Ext.Panel({//new Ext.form.FieldSet({
            applyTo: 'Js.Center.Popedom.RoleAdd.groupPanelFieldSet',
            title: '客户组',
            width: 330,
            autoScroll: true,
            items: [groupPanel]
        });
        
        
        //通道组列表
        var productList = new WXTL.Widgets.CommonForm.CheckboxGroup.RemoteCheckboxGroup({
            url: Js.Center.Business.ProductURL,
            queryparams: 'flag=selectpermitbydepartidwithroleid&columnlist=numprodid,vc2name&departid=' + departID + '&roleid=' + roleId,
            requestname: 'productids',
            defaultsItemsName: 'productids',
            defaultsItemsboxLable: '对不起，没有相关通道组信息。',
            numcolumns: 2,
            messageID: 1,
            reader: new Ext.data.JsonReader({
                totalProperty: 'totalProperty',
                root: 'data',
                fields: [{
                    name: 'id'
                }, {
                    name: 'name'
                
                }, {
                    name: 'boxLabel',
                    mapping: "vc2name"
                }, {
                    name: 'inputValue',
                    mapping: "numprodid"
                }, {
                    name: 'checked'
                }]
            })
        });
        var productPanel = new Ext.Panel({
            //frame: true,
            style: 'padding:0 0 0 5px',
            autoHeight: true,
            width: 300,
            items: [{
                items: [productList]
            }]
        });
        productPanel.doLayout();
        productPanelFieldSet = new Ext.Panel({//new Ext.form.FieldSet({
            applyTo: 'Js.Center.Popedom.RoleAdd.productPanelFieldSet',
            title: '通道组',//'<a href=#  onclick="javascript:remoteCheckboxGroup.setAll(true);">全选</a>　<a href=#  onclick="javascript:remoteCheckboxGroup.setAll(false);">全不选</a>　<a href=#  onclick="javascript:remoteCheckboxGroup.invert();">反选</a>',
            width: 330,
            autoScroll: true,
            items: [productPanel]
        });
    };
    //========================================================创建树的方法
    function CreateTree(roleId, departId){
        document.getElementById('Js.Center.Popedom.RoleAdd.PermitTree').innerHTML = '';
        Ext.get('Js.Center.Popedom.RoleAdd.PermitTree').dom.innerHTML = '';
        PermissionTree = new Ext.tree.TreePanel({
            applyTo: 'Js.Center.Popedom.RoleAdd.PermitTree',
            checkModel: 'cascade',//'parentCascade', //对树的级联多选   
            onlyLeafCheckable: false,//对树所有结点都可选   
            style: 'padding:5px 10px 10px 10px',
            animate: false,
            rootVisible: false,
            autoScroll: true,
            loader: new Ext.tree.TreeLoader({
                url: Js.Center.Popedom.UserFuncRoleURL,
                listeners: {
                    "beforeload": function(treeloader, node){
                        treeloader.baseParams = {
                            flag: 'queryallrightsbyroleid',
                            roleid: roleId,//row.get("numroleid"),
                            parentid: node.id,
                            departid: departId,//departComboxTree.getValue(),
                            method: 'POST'
                        };
                    },
                    "load": function(loader, node, response){
                        var childNodes = node.childNodes;
                        if (childNodes && childNodes.length > 0) {
                            node.collapse(true);                                                   
                        }                        
                    }
                },
                baseAttrs: {
                    uiProvider: Ext.ux.TreeCheckNodeUI
                }
            }),
            root: new Ext.tree.AsyncTreeNode({
                id: '-1',
                text: '无线天利短信发送平台'
            })
        });		
		
        // PermissionTree.getEl().center();   
        //展开所有节点
    
        PermissionTree.expandAll();
        
    	Js.Center.Popedom.RoleAdd.nextStepFunc = function(roleid, rolename, departid, departname){
    	var jsonObject = new Object();
        jsonObject.success = "true";
        jsonObject.numroleid = roleid;
        jsonObject.vc2rolename = rolename;
        jsonObject.numdepartid = departid;
        jsonObject.vc2departname = departname;
        
		Js.Center.Popedom.Role.RolePermit.window.updateRecord = jsonObject;
		Js.Center.Popedom.Role.RolePermit.window.show();
	};
    };
    
};
