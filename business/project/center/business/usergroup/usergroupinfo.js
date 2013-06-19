Ext.namespace('Js.Center.Business.UserGroup');

Js.Center.Business.UserGroup.userGroupInfo = function(node){
   
    if (Ext.get("Js.Center.Business.UserGroup.mainpanel") == null) {
        //============================================================================定义GridPanel相关
        // 分页每页显示数量
        var _pageSize = 12;
        Js.Center.Common.ProductStoreByDepartment.reload();
        Js.Center.Common.UserGroupSelectStore.reload();
        //==============================================================Grid数据定义
        var fields = ["numusergroupid", "numprodid", "vc2prodname", "vc2usergroupname", "vc2usergroupdesc", "datcreattime", "datmodifytime", "numuserid", "numdepartid", "vc2departname", "vc2username", "membercount", "blackcount", "numtype"];
        Js.Center.Business.UserGroup.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.UserGroupURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numusergroupid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'datcreattime',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                usergroupname: '',
                numdepartid: '',
                vc2username: '',
                flag: 'selectownerusergroup'
            }
        });
        Js.Center.Business.UserGroup.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize,
                usergroupname: '',
                vc2username: '',
                numdepartid: '',
                flag: 'selectownerusergroup'
            }
        });
        
        //==============================================================列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numusergroupid"
        });
        //==============================================================列头
        var cm = new Ext.grid.ColumnModel([sm, {
            header: "客户组名称",
            tooltip: "客户组名称",
            dataIndex: "vc2usergroupname",
            sortable: true
            //editor: new Ext.form.TextField
        }, {
            header: "成员数量",
            tooltip: "成员数量",
            dataIndex: "membercount",
            sortable: true
            //editor: new Ext.form.TextField
        }, {
            header: "添加成员",
            tooltip: "添加成员",
            dataIndex: "numusergroupid",
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                if (record.get('numtype') == '0') 
                    return "<a href='#' onclick='Js.Center.Business.UserGroup.addMember(\"" + value + "\")'>添加</a>";
            }
        }, {
            header: "退出成员",
            tooltip: "退出成员",
            dataIndex: "numusergroupid",
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                if (record.get('numtype') == '0') 
                    return "<a href='#' onclick='Js.Center.Business.UserGroup.quitMember(\"" + value + "\")'>退出</a>";
            }
        }, {
            header: "操作记录",
            tooltip: "操作记录",
            dataIndex: "numusergroupid",
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                if (record.get('numtype') == '0') 
                    return "<a href='#' onclick='Js.Center.Business.UserGroup.viewOperdetails(\"" + value + "\")'>查看详情</a>";
            }
        }, {
            header: "部门客户",
            tooltip: "部门客户",
            dataIndex: "numusergroupid",
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                return "<a href='#' onclick='Js.Center.Business.UserGroup.viewCusdetails(\"" + value + "\")'>客户明细</a>";
            }
        },{
        	header: "通道组名称",
            tooltip: "通道组名称",
            dataIndex: "vc2prodname",
            sortable: true
        }, 
        {
            header: "创建时间",
            tooltip: "创建时间",
            dataIndex: "datcreattime",
            sortable: true
            //editor: new Ext.form.TextField
        }, {
            header: "创建人",
            tooltip: "创建人",
            dataIndex: "vc2username",
            sortable: true
            //editor: new Ext.form.TextField
        }, {
            header: "部门",
            tooltip: "部门",
            dataIndex: "vc2departname",
            sortable: true
            //editor: new Ext.form.TextField
        }, {
            header: "备注",
            tooltip: "备注",
            dataIndex: "vc2usergroupdesc",
            sortable: true
        }]);
         //=======================================其他需要预加载函数数组
        var usergroup_arrInitLoadFunc = new Array();
		usergroup_arrInitLoadFunc[0] = "Js.Center.Business.UserGroupMemberAdd.func";
        usergroup_arrInitLoadFunc[1] = "Js.Center.Business.UserGroupMemberDelete.func";
        usergroup_arrInitLoadFunc[2] = "Js.Center.Business.UserGroupMemberOperatorDetails.func";
        usergroup_arrInitLoadFunc[3] = "Js.Center.Business.UserGroupMemberCusDetails.func";
        //==============================================================定义grid
        var userGroupGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            id: "Js.Center.Business.UserGroup.usergroupGridPanel",
            anchor: '100% 100%',
            needMenu: false,
            needRightMenu: false,
            pageSize: _pageSize,
            store: Js.Center.Business.UserGroup.Infostore,
            //但字段修改路径定义
            afterEditURL: Js.Center.Business.UserGroupUpdateURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.Business.UserGroupAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.Business.UserGroupUpdate',
            //删除调用方法名称
            deleteMethod: 'Js.Center.Business.UserGroupDelete.func',
             //其他需要预加载函数
			otherInitLoadFunc:usergroup_arrInitLoadFunc,
            sm: sm,
            cm: cm,
            tbar: new Ext.Toolbar({                items: [{                    iconCls: 'addicon',                    text: "添加",                    handler: function(){                        userGroupGrid.doInsert();                    }                }, "", "-", "",{                    iconCls: 'editicon',                    text: "修改",                    handler: function(){                        userGroupGrid.doEdit();                                        }                }, "", "-", "",{                    iconCls: 'deleteicon',                    text: "删除",                    handler: function(){                        var row = userGroupGrid.getSelectionModel().getSelections();
                        if (row.length == 0) {
                            Ext.Msg.alert("温馨提示", "请您选择记录!");
                        }
                        else {
                            Ext.Msg.confirm("温馨提示!", "删除客户组的同时，将删除其所有的客户组成员，您确认要删除么？", function(btn){
                                if (btn == "yes") {
                                    Js.Center.Business.UserGroupDelete.func(row);
                                }
                            });                         }                    }                }]            })
        });
        
        //============================================================================ 定义formpanel
        //定义部门结构树
        var departComboxTree = new WXTL.Widgets.CommonForm.ComboWithTree({
            name: 'numdepartid',
            hiddenName: 'numdepartid',
            id: 'Js.Center.Business.UserGroup.departComboxTree',
            fieldLabel: "部门名称",
            valueField: 'id',
            treeRootVisible: true,
            listHeight: '150',
            baseParams: {
                columnlist: "numdepartid,vc2departname",
                flag: 'selectallbycurrentuser'
            },
            dataUrl: Js.Center.Popedom.DepartmentsQueryURL//'URL/tree.ashx'
        });
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "usergroupSelectPanel",
            height: 150,
            //查询调用的方法
            queryMethod: "Js.Center.Business.UserGroup.queryGrid",
            
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
                    items: [departComboxTree,
                    new Ext.form.TextField({
                        fieldLabel: '客户组名称',
                        name: 'usergroupname',
                        id: 'Js.Center.Business.UserGroup.UserGroupName',
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 15,
                        maxLengthText: '长度不能超过15'
                    })]
                }, {
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    //锚点布局-
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    
                    items: [{
                        xtype: "textfield",
                        name: "vc2username",
                        id: "Js.Center.Business.UserGroup.UserGroupCreateName",
                        fieldLabel: "创建人",
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 15,
                        maxLengthText: '长度不能超过15'
                    }]
                }]
            }]
        
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.Business.UserGroup.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var userGroupName = Ext.get("Js.Center.Business.UserGroup.UserGroupName").getValue();
                var flag = 'selectownerusergroup';
                var numDepartId = departComboxTree.getValue() == null ? "" : departComboxTree.getValue().replace("s", "");//Ext.get("usergroupnumdepartid").getValue();
                var vc2UserName = Ext.get("Js.Center.Business.UserGroup.UserGroupCreateName").getValue();
                Js.Center.Business.UserGroup.Infostore.baseParams = {
                    usergroupname: userGroupName,
                    flag: flag,
                    numdepartid: numDepartId,
                    vc2username: vc2UserName
                };
                Js.Center.Business.UserGroup.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.Business.UserGroup.MainPanel = new Ext.Panel({
            id: "Js.Center.Business.UserGroup.mainpanel",
            frame: true, // 渲染面板
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, userGroupGrid]
        });
        
        //============================================================================绑定到center
    };
    GridMain(node, Js.Center.Business.UserGroup.MainPanel, "openroomiconinfo", "Js.Center.Business.UserGroup.Infostore");
    //添加成员
    Js.Center.Business.UserGroup.addMember = function(ID){
        var row=userGroupGrid.getSelectionModel().getSelections();
        
         if (row.length == 0) {
            Ext.Msg.alert("温馨提示", "请您选择一条记录!");
        }
        else 
            if (row.length > 1) {
                Ext.Msg.alert("温馨提示", "对不起，您只能选择一条记录!");
            }
            else 
                if (row.length == 1) {
                   	Js.Center.Business.UserGroupMemberAdd.window.updateRecord=row[0];
		            Js.Center.Business.UserGroupMemberAdd.window.mainForm.loadRecord(row[0]);
		            Js.Center.Business.UserGroupMemberAdd.window.show();
                }

    };
    //退出成员
    
    Js.Center.Business.UserGroup.quitMember = function(ID){
        var row=userGroupGrid.getSelectionModel().getSelections();
            
             if (row.length == 0) {
                Ext.Msg.alert("温馨提示", "请您选择一条记录!");
            }
            else 
                if (row.length > 1) {
                    Ext.Msg.alert("温馨提示", "对不起，您只能选择一条记录!");
                }
                else 
                    if (row.length == 1) {
                   	    Js.Center.Business.UserGroupMemberDelete.window.updateRecord=row[0];
		                Js.Center.Business.UserGroupMemberDelete.window.mainForm.loadRecord(row[0]);
		                Js.Center.Business.UserGroupMemberDelete.window.show();
                    }
      
       

    };
    //查看操作详细
    Js.Center.Business.UserGroup.viewOperdetails = function(ID){
     var row=userGroupGrid.getSelectionModel().getSelections();
            
             if (row.length == 0) {
                Ext.Msg.alert("温馨提示", "请您选择一条记录!");
            }
            else 
                if (row.length > 1) {
                    Ext.Msg.alert("温馨提示", "对不起，您只能选择一条记录!");
                }
                else 
                    if (row.length == 1) {
                   	     Js.Center.Business.UserGroupMemberOperatorDetails.window.updateRecord=row[0];
	                    Js.Center.Business.UserGroupMemberOperatorDetails.window.mainForm.loadRecord(row[0]);
	                    Js.Center.Business.UserGroupMemberOperatorDetails.window.show();
                        }
      
      

    };
    //查看客户明细
    Js.Center.Business.UserGroup.viewCusdetails = function(ID){
       var row=userGroupGrid.getSelectionModel().getSelections();
            
             if (row.length == 0) {
                Ext.Msg.alert("温馨提示", "请您选择一条记录!");
            }
            else 
                if (row.length > 1) {
                    Ext.Msg.alert("温馨提示", "对不起，您只能选择一条记录!");
                }
                else 
                    if (row.length == 1) {
                   	           Js.Center.Business.UserGroupMemberCusDetails.window.updateRecord=row[0];
		                        Js.Center.Business.UserGroupMemberCusDetails.window.mainForm.loadRecord(row[0]);
		                        Js.Center.Business.UserGroupMemberCusDetails.window.show();

                        }

    };
};

