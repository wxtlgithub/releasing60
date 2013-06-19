Ext.namespace('Js.Center.Popedom.RoleAdminAdd');

Js.Center.Popedom.RoleAdminAdd.func = function(){
    var CreateProductUserGroupTree;
    var PermissionTree;
    var userGroupList;
    var  checkedProductUserGroupTree;
    // ================================================================ 定义FormPanel
    //定义部门结构树
    var departComboxTree = new WXTL.Widgets.CommonForm.ComboWithTree({
        name: 'numdepartid',
        hiddenName: 'numdepartid',
        fieldLabel: "<font color=red>权限范围</font>",
        id:'Js.Center.Popedom.RoleAdminAdd.RoleComboxTree',
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
                CreateCheckTree(); 
                Js.Center.Common.EcListStore.reload();
                Create_Product_Tree(0, this.getValue() ,Ext.getCmp('Js.Center.Popedom.RoleAdminAdd.numecid').getValue());
                Ext.getCmp('Js.Center.Popedom.RoleAdminAdd.numecid').enable();
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
            },	{
							columnWidth : .5,
							layout : 'form',
							defaultType : "textfield",
							// 锚点布局-
							defaults : {
								anchor : "90%",
								msgTarget : "side"
							},
							buttonAlign : "center",
							bodyStyle : "padding:0px 0 0px 15px",
							items : [ departComboxTree ]
						},
						{
							columnWidth : .5,
							layout : 'form',
							defaultType : "textfield",
							// 锚点布局-
							defaults : {
								anchor : "92%",
								msgTarget : "side"
							},
							buttonAlign : "center",
							bodyStyle : "padding:0px 0 0px 15px",
							items : [ {
								xtype : "xComboBox",
								name : "numecid",
								fieldLabel : "<font color=red>选择客户</font>",
								hiddenName : "numecid",
								disabled :true,
								allowBlank : false,
								id : 'Js.Center.Popedom.RoleAdminAdd.numecid',
								blankText : "客户不允许为空",
								// readOnly: true,
								mode : "local",
								displayField : "vc2ecname",
								valueField : "numecid",
								triggerAction : "all",
								emptyText : "-=请选择=-",
								store : Js.Center.Common.EcListStore,
								listeners : {
						                "select": function(a, b){
						                	Create_Product_Tree(0, departComboxTree.getValue(),this.getValue());
//							                CreateCheckTree();
						                }
								}
							} ]
			}, {
                columnWidth: .35,
                layout: 'form',
                //锚点布局-
                defaults: {
                    anchor: "90%",
                    msgTarget: "side"
                },
                labelWidth: 130,
                bodyStyle: "padding:0px 0 0px 5px",
                items: [{
                    xtype: "textfield",
                    fieldLabel: "选择可使用的功能菜单",
                    hidden: true
                }, {
                    html: '<div id="Js.Center.Popedom.RoleAdminAdd.PermitTree" style="float:left;margin:0px;border:1px solid #c3daf9;width:200px;height:270px;"></div>'
                }, {
                    xtype: "hidden",
                    fieldLabel: "功能菜单ID",
                    name: 'funpermissionids',
                    id: 'Js.Center.Popedom.RoleAdminAdd.FunPermitIds'
                }]
            }, {
                columnWidth: .65,
                layout: 'column',
                //锚点布局-
                defaults: {
                    anchor: "90%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                bodyStyle: "padding:0px 0 0px 5px",
                labelWidth: 130,
                items: [{
                    columnWidth: .5,
                    layout: 'form',
                    //锚点布局-
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    labelWidth: 130,
                    bodyStyle: "padding:0px 0 0px 5px",
                    items: [{
							    xtype: "textfield",
								fieldLabel: "选择可使用的业务内容",
								hidden: true
								},{
                    	  html: '<div id="Js.Center.Popedom.RoleAdminAdd.product_groupPanel" style="margin:0px;border:1px solid #c3daf9;width:230px;height:270px;"></div>'
                    }]
                } , {
                    columnWidth: .5,
                    layout: 'form',
                    //锚点布局-
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    labelWidth: 130,
                    bodyStyle: "padding:0px 0 0px 5px",
                    items: [{
					    xtype: "textfield",
						fieldLabel: "已选择的业务内容",
						hidden: true
						},{
                    	 html: '<div id="Js.Center.Popedom.RoleAdminAdd.product_checked_tree" style="margin:0px;border:1px solid #c3daf9;width:230px;height:270px;"></div>'
                    }]
                } , {
                    xtype: "hidden",
                    fieldLabel: "通道组ID",
                    name: 'productids',
                    id: 'Js.Center.Popedom.RoleAdminAdd.product_list'
                }, {
                    xtype: "hidden",
                    fieldLabel: "客户组ID",
                    name: 'usergroupids',
                    id: 'Js.Center.Popedom.RoleAdminAdd.user_list'
                }]
            }]
        }]
    });

    // ================================================================== 定义窗体
    var mainForm = addInfoFormPanel.getForm();
    this.window= new WXTL.Widgets.CommonWindows.Window({
        title: "添加角色",
        width: '800',
        mainForm: mainForm,
        updateURL: Js.Center.Popedom.YXTUserFuncRoleUpdateURL,
        displayStore: Js.Center.Popedom.Role.Infostore,
        items: [addInfoFormPanel],
        needButtons: false,
		needLoadDataStore: true,
		 closeAction:"close",
        buttons: [new Ext.Button({
            text: '保存退出',
            minWidth: 70,
            qtip: "保存退出",
            handler: function(){
                //修改权限
                var idListArr = getAllChildrenNodes(PermissionTree.getRootNode());
                var ProductIdList=GetProductIdList(checkedProductUserGroupTree);
                var UserGroupIdList=GetUserGroupIdList(checkedProductUserGroupTree);
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
                Ext.getCmp('Js.Center.Popedom.RoleAdminAdd.product_list').setValue(ProductIdList);
                Ext.getCmp('Js.Center.Popedom.RoleAdminAdd.user_list').setValue(UserGroupIdList);
                Ext.getCmp('Js.Center.Popedom.RoleAdminAdd.FunPermitIds').setValue(idlist);
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
                    
                   Js.Center.Popedom.RoleAdminAdd.window.mainFormSubmitFunc();

                }
            }
        }), new Ext.Button({
            text: '重填',
            qtip: "重填",
            minWidth: 70,
            handler: function(){
                addInfoFormPanel.getForm().reset();
                CreateCheckTree();
                CreateTree(0, Js.Center.Common.userDepartId);
                Create_Product_Tree(0, Js.Center.Common.userDepartId,'');
                Ext.getCmp('Js.Center.Popedom.RoleAdminAdd.numecid').disable();
            }
        }), new Ext.Button({
            text: '下一步',
            qtip: "下一步",
            minWidth: 70,
            handler: function(){
                //修改权限
                var idListArr = getAllChildrenNodes(PermissionTree.getRootNode());
                var ProductIdList=GetProductIdList(checkedProductUserGroupTree);
                var UserGroupIdList=GetUserGroupIdList(checkedProductUserGroupTree);
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
                Ext.getCmp('Js.Center.Popedom.RoleAdminAdd.product_list').setValue(ProductIdList);
                Ext.getCmp('Js.Center.Popedom.RoleAdminAdd.user_list').setValue(UserGroupIdList);
                Ext.getCmp('Js.Center.Popedom.RoleAdminAdd.FunPermitIds').setValue(idlist);
                if (mainForm.isValid()) {
                    Js.Center.Popedom.RoleAdminAdd.window.mainFormSubmitFunc('Js.Center.Popedom.RoleAdminAdd.nextStepFunc(objJson.roleid, objJson.rolename, objJson.departid,Ext.get("Js.Center.Popedom.RoleAdminAdd.RoleComboxTree").dom.value)');
                }
                
            }
        }), new Ext.Button({
            text: '关闭',
            qtip: "关闭",
            minWidth: 70,
            handler: function(){
                Js.Center.Popedom.RoleAdminAdd.window.close();
            }
        })],
		loadDataStoreFunc: function(){
			//departComboxTree.tree.root.reload();
			//departComboxTree.setValue(depNode);
    		CreateTree(0, Js.Center.Common.userDepartId);
    		//Create_Product_Tree("", Js.Center.Common.userDepartId);
//    		Create_Product_Tree("",0);
//    		 CreateCheckTree();
		}
    });
    
    var depNode = eval({
        "id": "s"+Js.Center.Common.userDepartId,
        "text": Js.Center.Common.userDepartName
    });

    //========================================================创建树的方法
    function CreateTree(roleId, departId){
        document.getElementById('Js.Center.Popedom.RoleAdminAdd.PermitTree').innerHTML = '';
        Ext.get('Js.Center.Popedom.RoleAdminAdd.PermitTree').dom.innerHTML = '';
        PermissionTree = new Ext.tree.TreePanel({
            applyTo: 'Js.Center.Popedom.RoleAdminAdd.PermitTree',
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
    	Js.Center.Popedom.RoleAdminAdd.nextStepFunc = function(roleid, rolename, departid, departname){
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
    function CreateCheckTree(){
	    	 document.getElementById('Js.Center.Popedom.RoleAdminAdd.product_checked_tree').innerHTML = '';
	         Ext.get('Js.Center.Popedom.RoleAdminAdd.product_checked_tree').dom.innerHTML = '';
            checkedProductUserGroupTree = new Ext.tree.TreePanel({
    	   	applyTo:'Js.Center.Popedom.RoleAdminAdd.product_checked_tree',
            checkModel: 'parentCascade',
            onlyLeafCheckable: false,//对树所有结点都可选   
            style: 'padding:5px 10px 0px 10px',
            animate: false,
            rootVisible: false,
            autoScroll: true,
            listeners:{
                "checkchange": function( node, checked){
                	var checkNode = CreateProductUserGroupTree.getNodeById(node.id);
                	if(!checked && checkNode != null){
	                	checkNode.ui.toggleCheck(false);
	                	checkNode.attributes.checked = false;
	                	checkNode.fireEvent('checkchange', checkNode, checked);
                	}else if(!checked){
                		 this.unregisterNode(node);
                			var parent = node.parentNode;
                			parent.removeChild(node);
                			parent.checked = true;
                			parent.ui.toggleCheck(true);
                	}
               } 
            },
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

        	 checkedProductUserGroupTree.expandAll();
        	 var re = new RegExp(Ext.escapeRe(text), 'i');
                
        	 filter.filterBy(function(n){
        		 var textval = n.text;
        		 // 只过滤一级节点及未被选中的节点，这样省去枝干被过滤的时候，底下的叶子都无法显示
        		 return n.isLeaf() || re.test(n.text);
        	 });

        	 // hide empty packages that weren't filtered
        	 hiddenPkgs = [];
        	 checkedProductUserGroupTree.root.cascade(function(n) {
        		 // 如果这个节点是叶子，且不匹配，就应该隐藏掉
//        		 if(n.isLeaf() && !re.test(n.text)){
//        			 if(!n.attributes.checked){
//        				 n.ui.hide();
        				 hiddenPkgs.push(n);
//        			 }
//        		 }
        		 // 如果这个节点不是叶子，而且下面没有子节点，就应该隐藏掉
//        		 if(!n.isLeaf()&& n.ui.ctNode.offsetHeight<3&& !re.test(n.text)){
//            		if(!n.attributes.checked){
//                    	n.ui.hide();
//                        hiddenPkgs.push(n);
//                    }
//        		 }
//        		 if(n.id!='root'){
//        			 if(!n.isLeaf() && n.ui.ctNode.offsetHeight >= 3 && hasChild(n,re)==false&& !re.test(n.text)){
//        				 if(!n.attributes.checked){
//        					 n.ui.hide();
//        					 hiddenPkgs.push(n);
//        				 }
//        			 }
//        		 }
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
         var filter = new Ext.tree.TreeFilter(checkedProductUserGroupTree, {
        	  clearBlank: true,
        	  autoClear: true
         });
    };
    //========================================================创建通道组树的方法
    function Create_Product_Tree(ProductId, UserGroupId , NumEcId){
        document.getElementById('Js.Center.Popedom.RoleAdminAdd.product_groupPanel').innerHTML = '';
        Ext.get('Js.Center.Popedom.RoleAdminAdd.product_groupPanel').dom.innerHTML = '';
         CreateProductUserGroupTree = new Ext.tree.TreePanel({
            applyTo: 'Js.Center.Popedom.RoleAdminAdd.product_groupPanel',
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
                    	 var childNode = checkedProductUserGroupTree.getNodeById(node.id); 
                    	 checkedProductUserGroupTree.unregisterNode(childNode);
                    	 checkedProductUserGroupTree.root.removeChild(childNode);
                         node.eachChild(function(child) {
                                child.ui.toggleCheck(false);
                                child.attributes.checked = false;
                                child.fireEvent('checkchange', child, checked);
                         });
                     }else if(checked){
                    	 //点击事件
                    	 changeCheckTreeNode(node,checked);
                     }else{
                    	 var childNode = checkedProductUserGroupTree.getNodeById(node.id);
                    	 if( childNode != null){
                    		 checkedProductUserGroupTree.unregisterNode(childNode);
                    		 childNode.parentNode.removeChild(childNode);
                    	 }
                     }
                     
                },
                "load":function(){
             	   	var childNodes = checkedProductUserGroupTree.root.childNodes;
             	   	if(childNodes.length > 0){
             	   		for(var i = 0; i < childNodes.length; i++ ){
             	   			var node = childNodes[i];
	   	            		var productNode = this.getNodeById(node.id);
	   	            		var node_length = node.childNodes.length;
	   	            		if( node_length > 0){
		   	            		 node.eachChild(function(child) {
		   	            			    var childNode =  CreateProductUserGroupTree.getNodeById(child.id);
		   	            			    if(childNode != null){
				   	            			childNode.ui.toggleCheck(true);
				   	            			childNode.attributes.checked = true;
		   	            			    }
		                         });
	   	            		}
	   	              		if(productNode != null){
	   	              			productNode.attributes.checked = true;
	   	              		}
             	   		}
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
                            progressText: 'Loading...',
                            width: 300,
                            wait: true,
                            icon: 'download',
                            animEl: 'saving'
                        });
                        treeloader.baseParams = {
                            flag: 'selectpermitbydepartidwithroleidandecid',
                            roleid: ProductId,//row.get("numroleid"),
                            columnlist:'numprodid,vc2name',
                            //numprodid:node.id,
                            numecid : NumEcId,
                            departid: UserGroupId,//departComboxTree.getValue(),
                            method: 'POST'
                        };
                    },
                    "load": function(loader, node, response){
	                        setTimeout(function(){
	                            Ext.MessageBox.hide();
	                        }, 1000);
//                        var childNodes = node.childNodes;
//                        if (childNodes && childNodes.length > 0) {
//                            node.collapse(true);                                                   
//                        }                        
                    },
                    "loadexception":function(){
                    	 Ext.MessageBox.hide();
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
        		 // 如果这个节点是叶子，且不匹配，就应该隐藏掉
//        		 if(n.isLeaf() && !re.test(n.text)){
//        			 if(!n.attributes.checked){
//        				 n.ui.hide();
//        				 hiddenPkgs.push(n);
//        			 }
//        		 }
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
                if (idListArr[i].id != '-1' && idListArr[i].isLeaf()) {
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
            if (!idListArr[i].isLeaf()) {
                if (idListArr[i].id !='-1' ) {
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
    function changeCheckTreeNode(node,checked){
    	var tree = checkedProductUserGroupTree;
	   	 if(node.isLeaf()){
			var checkedParentNode = tree.getNodeById(node.parentNode.id) ;
			if(checkedParentNode != null ){
				if(tree.getNodeById(node.id ) == null){     
			     var checkedNode =  createNodeByTree(node,checked);
				 checkedParentNode.appendChild(checkedNode);
				}
			 }else{
				 var parentNode = node.parentNode? createNodeByTree(node.parentNode,checked):createNodeByTree(node.attributes.parentNode,checked);
//	   				 this.loader.createNode(node.parentNode):this.loader.createNode(node.attributes.parentNode);
				 parentNode.attributes.parentid = -1;
				 var checkedNode =  createNodeByTree(node,checked);
				 checkedNode.attributes.parentid = parentNode.id;
				 parentNode.appendChild(checkedNode);
				 tree.root.appendChild(parentNode);
			 }
		 }else if(tree.getNodeById(node.id) == null){
			 var checkedNode =  createNodeByTree(node,checked);	
			 checkedProductUserGroupTree.root.appendChild(checkedNode);
		 }
    };
    function createNodeByTree(node,checked){
    	var tree = checkedProductUserGroupTree;
    	 var checkNode =  tree.loader.createNode(node);	
//	     if(!tree.rootVisible){
//         	var uiP = node.attributes.uiProvider;
//         	checkNode.ui =  uiP ? new uiP(checkNode) : new Ext.tree.RootTreeNodeUI(checkNode); 
//         }
	     checkNode.attributes.checked = checked;
	     checkNode.attributes.iconCls = "sysmanagemenu";
	     return checkNode;
    }
};
