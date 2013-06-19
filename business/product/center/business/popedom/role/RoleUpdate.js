Ext.namespace('Js.Center.Popedom.RoleUpdate');
Js.Center.Popedom.RoleUpdate.func = function(row){

    // ================================================================ 定义FormPanel
    //定义部门结构树
    var departComboxTree = new WXTL.Widgets.CommonForm.ComboWithTree({
        name: 'numdepartid',
        hiddenName: 'vc2departname',
        id: "Js.Center.Popedom.RoleUpdate.departComboxTree",
        fieldLabel: "<font color=red>权限范围</font>",
        valueField: 'id',
        listWidth: '200',
        listHeight: '150',
        baseParams: {
            columnlist: "numdepartid,vc2departname",
            flag: 'selectallbycurrentuser'
        },
        dataUrl: Js.Center.Popedom.DepartmentsQueryURL//'URL/tree.ashx'
    });
    
    var updateInfoFormPanel = new Ext.form.FormPanel({
        //width: 600,
        frame: true,
        labelWidth: 80,
        items: [{
            layout: 'column',
            items: [{
                xtype: "hidden",
                name: "flag",
                value: 'updateall'
            }, {
                xtype: "hidden",
                name: "numroleid",
                fieldLabel: "编号"
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
                    anchor: "44%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                bodyStyle: "padding:0px 0 0px 15px",
                items: [{
                    xtype: "hidden",
                    name: "numdepartid",
                    fieldLabel: "<font color=red>部门ID</font>"
                }, {
                    xtype: "textfield",
                    name: "vc2departname",
                    fieldLabel: "<font color=red>权限范围</font>",
                    readOnly: true
                }]
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
                    html: '<div id="Js.Center.Popedom.RoleUpdate.PermitTree" style="float:left;margin:0px;border:1px solid #c3daf9;width:96%;height:278px;"></div>'
                }, {
                    xtype: "hidden",
                    fieldLabel: "功能菜单ID",
                    name: 'funpermissionids',
                    id: 'Js.Center.Popedom.RoleUpdate.FunPermitIds'
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
                    html: '<div id="Js.Center.Popedom.RoleUpdate.groupPanelFieldSet" style="float:left;margin:0px;border:1px solid #c3daf9;width:95%;height:150px;"></div>'
                }, {
                    html: '<div id="Js.Center.Popedom.RoleUpdate.productPanelFieldSet" style="float:left;margin:0px;border:1px solid #c3daf9;width:95%;height:150px;"></div>'
                }]// groupPanelFieldSet, productPanelFieldSet]//
            }]
        }]
    });
    
    
    // ================================================================== 定义窗体
    var mainForm = updateInfoFormPanel.getForm();
    this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "修改角色",
        width: '800',
        mainForm: mainForm,
        updateURL: Js.Center.Popedom.UserFuncRoleUpdateURL,
        displayStore: Js.Center.Popedom.Role.Infostore,
        updateState: true,
        updateRecord: row,
        items: [updateInfoFormPanel],
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
                Ext.getCmp('Js.Center.Popedom.RoleUpdate.FunPermitIds').setValue(idlist);
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
                    Js.Center.Popedom.RoleUpdate.window.mainFormSubmitFunc();
                    
                }
            }
        }), new Ext.Button({
            text: '重填',
            qtip: "重填",
            minWidth: 70,
            handler: function(){
                updateInfoFormPanel.getForm().reset();
                updateInfoFormPanel.getForm().loadRecord(Js.Center.Popedom.RoleUpdate.window.updateRecord);
                CreateTree(Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numroleid"), Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numdepartid"));
                createGroupPanel(Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numroleid"), Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numdepartid"));
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
                Ext.getCmp('Js.Center.Popedom.RoleUpdate.FunPermitIds').setValue(idlist);
                if (mainForm.isValid()) {
                    
                    Js.Center.Popedom.RoleUpdate.window.mainFormSubmitFunc('Js.Center.Popedom.RoleAdd.nextStepFunc(\'' + updateInfoFormPanel.items.items[0].items.items[1].getValue() + '\', \'' + updateInfoFormPanel.items.items[0].items.items[2].items.items[0].getValue() + '\', \'' + updateInfoFormPanel.items.items[0].items.items[4].items.items[0].getValue() + '\', \'' + updateInfoFormPanel.items.items[0].items.items[4].items.items[1].getValue() + '\')');
                    //Js.Center.Popedom.RoleUpdate.window.hide();
                }
                
            }
        }), new Ext.Button({
            text: '关闭',
            qtip: "关闭",
            minWidth: 70,
            handler: function(){
                Js.Center.Popedom.RoleUpdate.window.hide();
            }
        })],
        loadDataStoreFunc: function(){
        
			    CreateTree(Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numroleid"), Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numdepartid"));
               createGroupPanel(Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numroleid"), Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numdepartid"));

		}
        
        
    
    });
    // ============================================================= 执行显示
    //  Js.Center.Popedom.RoleUpdate.window.show();
    //createPeimitTree("Js.Center.Popedom.RoleUpdate.PermitTree", "0");
//    CreateTree(Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numroleid"), Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numdepartid"));
//    createGroupPanel(Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numroleid"), Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numdepartid"));
//    //========================================================创建客户组、通道组列表Panel
    
    function createGroupPanel(roleId, departID){
        document.getElementById('Js.Center.Popedom.RoleUpdate.groupPanelFieldSet').innerHTML = '';
        Ext.get('Js.Center.Popedom.RoleUpdate.groupPanelFieldSet').dom.innerHTML = '';
        document.getElementById('Js.Center.Popedom.RoleUpdate.productPanelFieldSet').innerHTML = '';
        Ext.get('Js.Center.Popedom.RoleUpdate.productPanelFieldSet').dom.innerHTML = '';
        //客户组列表
        var userGroupList = new WXTL.Widgets.CommonForm.CheckboxGroup.RemoteCheckboxGroup({
            url: Js.Center.Business.UserGroupURL,
            queryparams: 'flag=selectpermitbydepartidwithroleid&columnlist=numusergroupid,vc2usergroupname&departid=' + departID + '&roleid=' + roleId,
            requestname: 'usergroupids',
            defaultsItemsName: 'usergroupids',
            defaultsItemsboxLable: '对不起，没有相关客户组信息。',
            //id: "remoteCheckboxGroup",
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
                    name: 'checked',
                    mapping: 'ischecked'
                }]
            })
        });
        //userGroupList.doLayout();
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
            applyTo: 'Js.Center.Popedom.RoleUpdate.groupPanelFieldSet',
            title: '客户组',//'<a href=#  onclick="javascript:remoteCheckboxGroup.setAll(true);">全选</a>　<a href=#  onclick="javascript:remoteCheckboxGroup.setAll(false);">全不选</a>　<a href=#  onclick="javascript:remoteCheckboxGroup.invert();">反选</a>',
            width: 330,
            autoScroll: true,
            items: [groupPanel]
        });
        
        
        //通道组列表
        var productList = new WXTL.Widgets.CommonForm.CheckboxGroup.RemoteCheckboxGroup({
            url: Js.Center.Business.ProductURL,//'testURL/purview/roleupdate.aspx',//
            queryparams: 'flag=selectpermitbydepartidwithroleid&columnlist=numprodid,vc2name&departid=' + departID + '&roleid=' + roleId,
            requestname: 'productids',
            defaultsItemsName: 'productids',
            defaultsItemsboxLable: '对不起，没有相关通道组信息。',
            numcolumns: 2,
            //blankText: "请选择通道组",
            //allowBlank: false,
            //fieldLabel: '<font color=red>通道组</font>',
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
                    name: 'checked',
                    mapping: 'ischecked'
                }]
            })
        });
        var productPanel = new Ext.Panel({
            style: 'padding:0 0 0 5px',
            autoHeight: true,
            width: 300,
            items: [{
                items: [productList]
            }]
        });
        productPanel.doLayout();
        productPanelFieldSet = new Ext.Panel({//new Ext.form.FieldSet({
            applyTo: 'Js.Center.Popedom.RoleUpdate.productPanelFieldSet',
            title: '通道组',//'<a href=#  onclick="javascript:remoteCheckboxGroup.setAll(true);">全选</a>　<a href=#  onclick="javascript:remoteCheckboxGroup.setAll(false);">全不选</a>　<a href=#  onclick="javascript:remoteCheckboxGroup.invert();">反选</a>',
            width: 330,
            autoScroll: true,
            items: [productPanel]
        });
    };
    //========================================================创建树的方法
    function CreateTree(roleId, departId){
        document.getElementById('Js.Center.Popedom.RoleUpdate.PermitTree').innerHTML = '';
        Ext.get('Js.Center.Popedom.RoleUpdate.PermitTree').dom.innerHTML = '';
        PermissionTree = new Ext.tree.TreePanel({
            applyTo: 'Js.Center.Popedom.RoleUpdate.PermitTree',
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
