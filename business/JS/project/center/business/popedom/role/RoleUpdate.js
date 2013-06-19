Ext.namespace('Js.Center.Popedom.RoleUpdate');
Js.Center.Popedom.RoleUpdate.func = function(row){
    var CreateProductUserGroupTree;
    var PermissionTree;
    var userGroupList;
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
                    html: '<div id="Js.Center.Popedom.RoleUpdate.product_groupPanel" style="float:left;margin:0px;border:1px solid #c3daf9;width:230px;height:220px;"></div>'
                }, {
                    xtype: "hidden",
                    fieldLabel: "通道组ID",
                    name: 'productids',
                    id: 'Js.Center.Popedom.RoleUpdate.product_list'
                }, {
                    xtype: "hidden",
                    fieldLabel: "客户组ID",
                    name: 'usergroupids',
                    id: 'Js.Center.Popedom.RoleUpdate.user_list'
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
        updateURL: Js.Center.Popedom.YXTUserFuncRoleUpdateURL,
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
                var ProductIdList=GetProductIdList(CreateProductUserGroupTree);
                var UserGroupIdList=GetUserGroupIdList(CreateProductUserGroupTree);
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
                Ext.getCmp('Js.Center.Popedom.RoleUpdate.product_list').setValue(ProductIdList);
                Ext.getCmp('Js.Center.Popedom.RoleUpdate.user_list').setValue(UserGroupIdList);
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
                Create_Product_Tree(Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numroleid"), Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numdepartid"));
            }
        }), new Ext.Button({
            text: '下一步',
            qtip: "下一步",
            minWidth: 70,
            handler: function(){
                //修改权限
                var idListArr = getAllChildrenNodes(PermissionTree.getRootNode());
                var ProductIdList=GetProductIdList(CreateProductUserGroupTree);
                var UserGroupIdList=GetUserGroupIdList(CreateProductUserGroupTree);
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
                Ext.getCmp('Js.Center.Popedom.RoleUpdate.product_list').setValue(ProductIdList);
                Ext.getCmp('Js.Center.Popedom.RoleUpdate.user_list').setValue(UserGroupIdList);
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
       		Create_Product_Tree(Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numroleid"), Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numdepartid"));
		}
    });
    // ============================================================= 执行显示
    //  Js.Center.Popedom.RoleUpdate.window.show();
    //createPeimitTree("Js.Center.Popedom.RoleUpdate.PermitTree", "0");
    //CreateTree(Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numroleid"), Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numdepartid"));
    //createGroupPanel(Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numroleid"), Js.Center.Popedom.RoleUpdate.window.updateRecord.get("numdepartid"));
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

    //========================================================创建通道组树的方法
    function Create_Product_Tree(ProductId, UserGroupId){
        document.getElementById('Js.Center.Popedom.RoleUpdate.product_groupPanel').innerHTML = '';
        Ext.get('Js.Center.Popedom.RoleUpdate.product_groupPanel').dom.innerHTML = '';
         CreateProductUserGroupTree = new Ext.tree.TreePanel({
            applyTo: 'Js.Center.Popedom.RoleUpdate.product_groupPanel',
            //checkModel: 'cascade',//'parentCascade', //对树的级联多选  
            checkModel: 'parentCascade',
            onlyLeafCheckable: false,//对树所有结点都可选   
            style: 'padding:5px 10px 0px 10px',
            animate: false,
           // preloadChildren:false,
            rootVisible: false,
            autoScroll: true,
            listeners:{
                "checkchange": function( node, checked){
                     //node.parentNode.checked =true;
                     var node_length = node.childNodes.length;
                     if( checked == false && node_length>= 1){
                         node.eachChild(function(child) {
                                child.ui.toggleCheck(false);
                                child.attributes.checked = false;
                                child.fireEvent('checkchange', child, checked);
                         });
                     }            
                }
            },
            loader: new Ext.tree.TreeLoader({
                url: Js.Center.Business.YXTProductURL,
                listeners: {
                    "beforeload": function(treeloader, node){
                        // 弹出效果
                        Ext.MessageBox.show({
                            msg: '正在加载，请稍等...',
                            progressText: 'Saving...',
                            width: 300,
                            wait: true,
                            icon: 'download',
                            animEl: 'saving'
                        });
                        treeloader.baseParams = {
                            flag: 'selectpermitbydepartidwithroleid',
                            roleid: ProductId,//row.get("numroleid"),
                            columnlist:'numprodid,vc2name',
                            //numprodid:node.id,
                            departid: UserGroupId,//departComboxTree.getValue(),
                            method: 'POST'
                        };
                    },
                    "load": function(loader, node, response){
                        var childNodes = node.childNodes;
                        if (childNodes && childNodes.length > 0) {
                            node.collapse(true);                                                   
                        }
                        setTimeout(function(){
                            Ext.MessageBox.hide();
                        }, 1000);
                    }
                } ,
                baseAttrs: {
                    uiProvider: Ext.ux.TreeCheckNodeUI
                }
            }),
            root: new Ext.tree.AsyncTreeNode({
                id: '-1',
                text: '无线天利短信发送平台'
            }),
            tbar:[new Ext.form.TextField({    
            	width: 200,
                emptyText:'Find a Class',
                listeners:{
                	render: function(f){
                		f.el.on('keydown', filterTree, f, {buffer: 350});
                	}
                }
            })]
        });	
        var hiddenPkgs = [];
        function filterTree(e){
       	 var text = e.target.value;
       	 //先要显示上次隐藏掉的节点
       	 Ext.each(hiddenPkgs, function(n){
       		 n.ui.show();
       	 });
         
       	 if(!text){
       		 filter.clear();           
       		 return;
       	 }  

       	 CreateProductUserGroupTree.expandAll();
       	 var re = new RegExp(Ext.escapeRe(text), 'i');
               
       	 filter.filterBy(function(n){
       		 var textval = n.text;
       		 // 只过滤一级节点及未被选中的节点，这样省去枝干被过滤的时候，底下的叶子都无法显示
       		 return n.isLeaf() || n.attributes.checked || re.test(n.text);
       	 });

       	 // hide empty packages that weren't filtered
       	 hiddenPkgs = [];
       	 CreateProductUserGroupTree.root.cascade(function(n) {
//       		 // 如果这个节点是叶子，且不匹配，就应该隐藏掉
//       		 if(n.isLeaf() && !re.test(n.text)){
//       			 if(!n.attributes.checked){
//       				 n.ui.hide();
//       				 hiddenPkgs.push(n);
//       			 }
//       		 }
       		 // 如果这个节点不是叶子，而且下面没有子节点，就应该隐藏掉
       		 if(!n.isLeaf()&& n.ui.ctNode.offsetHeight<3&& !re.test(n.text)){
           		if(!n.attributes.checked){
                   	n.ui.hide();
                       hiddenPkgs.push(n);
                   }
       		 }
       		 if(n.id!='root'){
       			 if(!n.isLeaf() && n.ui.ctNode.offsetHeight >= 3 && hasChild(n,re)==false&& !re.test(n.text)){
       				 if(!n.attributes.checked){
       					 n.ui.hide();
       					 hiddenPkgs.push(n);
       				 }
       			 }
       		 }
       	 });
       	 function hasChild(n,re){
       		 var str=false;
       		 n.cascade(function(n1){
       			 if(re.test(n1.text)){
       				 str = true;
       				 return;
                    }
                });
                return str;
       	 }

        };
        var filter = new Ext.tree.TreeFilter(CreateProductUserGroupTree, {
       	  clearBlank: true,
       	  autoClear: true
        });	
        // PermissionTree.getEl().center();   
        //展开所有节点
        CreateProductUserGroupTree.expandAll();
    };
    
    function GetUserGroupIdList(varTree) {
        var idListArr = getAllChildrenNodes(varTree.getRootNode());
        var idlist = '';
        for (var i = 0; i < idListArr.length; i++) {
            if (idListArr[i].attributes) {
                if (idListArr[i].id != '-1' && idListArr[i].attributes.parentid != '-1' && idListArr[i].attributes.checked) {
                    if (idlist.length == 0) {
                        idlist += idListArr[i].id;
                    }  else {
                        idlist += ',' + idListArr[i].id;
                    }
                }
            }
        }
        return idlist;
    };
    
    function GetProductIdList(varTree,varWhere){
        var idListArr = getAllChildrenNodes(varTree.getRootNode());
        var idlist = '';
        for (var i = 0; i < idListArr.length; i++) {
            if (idListArr[i].attributes) {
                if (idListArr[i].attributes.parentid == '-1' && idListArr[i].attributes.checked) {
                    if (idlist.length == 0){
                        idlist += idListArr[i].id;
                    } else {
                        idlist += ',' + idListArr[i].id;
                    }
                }
            }
        }
        return idlist;
    };
};
