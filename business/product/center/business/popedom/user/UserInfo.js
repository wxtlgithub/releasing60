Ext.namespace('Js.Center.Popedom.User');

Js.Center.Popedom.User.info = function(node){
    
    if (Ext.get("Js.Center.Popedom.User.MainPanel") == null) {
        //===================== 修改方法
        userUpdate = function(rowIndex){
             var row=usersGrid.getSelectionModel().getSelections();
                 if (row.length == 0) {
                    Ext.Msg.alert("温馨提示", "请您选择一条记录!");
                }
                else 
                    if (row.length > 1) {
                        Ext.Msg.alert("温馨提示", "对不起，您只能选择一条记录!");
                    }
                    else 
                        if (row.length == 1) {
                   	        Js.Center.Popedom.UserUpdate.window.updateRecord=row[0];
		                    Js.Center.Popedom.UserUpdate.window.mainForm.loadRecord(row[0]);
		                    Js.Center.Popedom.UserUpdate.window.show();
                        }
        };
        //====================== 删除方法
        userDelete = function(rowIndex) {
            //var row = Js.Center.Popedom.Department.Infostore.getAt(rowIndex);
            var row = usersGrid.getSelectionModel().getSelections();
            if (row.length > 1) {
                Ext.Msg.alert("提示信息", "您只能选择一个删除!");
            }
            else if (row.length == 1) {
                Ext.Msg.confirm("提示!", "您确定要删除信息吗?", function(btn) {
                    if (btn == "yes") {
                        Js.Center.Popedom.UserDelete.func(row);
                    }
                    else {
                    }
                })
            }
        };
        // =====================授权方法
        userPermit_link = function(){
             var row=usersGrid.getSelectionModel().getSelections();
                 if (row.length == 0) {
                    Ext.Msg.alert("温馨提示", "请您选择一条记录!");
                }
                else 
                    if (row.length > 1) {
                        Ext.Msg.alert("温馨提示", "对不起，您只能选择一条记录!");
                    }
                    else 
                        if (row.length == 1) {
                   	        Js.Center.Popedom.UserPermit.window.updateRecord=row[0];
		                    Js.Center.Popedom.UserPermit.window.mainForm.loadRecord(row[0]);
		                    Js.Center.Popedom.UserPermit.window.show();
                        }            
        };
        
        userPermit = function(numuserid, vc2uaccount, vc2username, numdepartid, vc2departname){
           // Js.Center.Popedom.UserPermit.func(numuserid, vc2uaccount, vc2username, numdepartid, vc2departname);
            Js.Center.Popedom.UserPermit.window.updateRecord = null;
            Js.Center.Popedom.UserPermit.window.show();
            
        };
        
        // ========================================================================== 定义GridPanel相关
        // 分页每页显示数量
        var _pageSize = 12;
        //部门、账户名称、用户名、部门、账户类型、手机号码、电话、电子邮箱、创建者、创建日期
        
        var fields = ["numuserid", "numdepartid", "vc2postcode", "numreturnlevel", "vc2uaccount", "vc2username", "vc2departname", "numtype", "vc2mobile", "vc2phone", "vc2email", "vc2creatorname", "datcreatetime","numchecklevle"];
        Js.Center.Popedom.User.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Popedom.UserURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numuserid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'datcreatetime',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                username: '',
                numdepartid: '',
                vc2uaccount: '',
                flag: 'selectbykey'
            }
        });
        Js.Center.Popedom.User.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize
            
            }
        });
        
        // ==================================================== 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numuserid"
        });
        // ==================================================== 列头
        //部门、账户名称、用户名、部门、账户类型、手机号码、电话、电子邮箱、创建者、创建日期
        var cm = new Ext.grid.ColumnModel([sm, {
            header: "账户名称",
            tooltip: "账户名称",
            dataIndex: "vc2uaccount",
            sortable: true
        }, {
            header: "用户名",
            tooltip: "用户名",
            dataIndex: "vc2username",
            sortable: true
        }, {
            header: "部门",
            tooltip: "部门",
            dataIndex: "vc2departname",
            sortable: true
        }, {
            header: "账户类型",
            tooltip: "账户类型",
            dataIndex: "numtype",
            sortable: true,
            renderer: function(value){
                if (value == 1) {
                    return "管理员";
                }
                if (value == 2) {
                    return "普通用户";
                }
                if (value == -1) {
                    return "系统管理员";
                }
                else {
                    return "";
                }
            }
        }, {
            header: "手机号码",
            tooltip: "手机号码",
            dataIndex: "vc2mobile",
            sortable: true
        }, {
            header: "电话",
            tooltip: "电话",
            dataIndex: "vc2phone",
            sortable: true
        }, {
            header: "电子邮箱",
            tooltip: "电子邮箱",
            dataIndex: "vc2email",
            sortable: true
        }, {
            header: "创建者",
            tooltip: "创建者",
            dataIndex: "vc2creatorname",
            sortable: true
        }, {
            header: "创建日期",
            tooltip: "创建日期",
            dataIndex: "datcreatetime",
            sortable: true
        }, {
            header: "账户权限",
            tooltip: "账户权限",
            dataIndex: "numuserid",
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                if(record.data.numtype ==1)
                {
                    return "不能授权";
                }
                else
                {
                    return "<a href='#' onclick='userPermit_link()'>授权</a>　";
                }
            }
        }, {    
            header: "账户操作",
            tooltip: "账户操作",
            dataIndex: "numuserid",
            renderer: function(value, meta, record, rowIndex, colIndex, store){
            
                return "<a href='#' onclick='userUpdate(\"" + rowIndex + "\")'>修改</a>　<a href='#' onclick='userDelete(\"" + rowIndex + "\")'>删除</a>";
            }
        }]);
        var UserarrInitLoadFunc = new Array();
		//UserarrInitLoadFunc[0] = "Js.Center.Popedom.UserUpdate.func";
		UserarrInitLoadFunc[0] = "Js.Center.Popedom.UserPermit.func";

        //==============================================================定义grid
        var usersGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            pageSize: _pageSize,
            anchor: '100% 100%',
            needRightMenu: false,
            store: Js.Center.Popedom.User.Infostore,
            //但字段修改路径定义
            
            afterEditURL: Js.Center.Popedom.UserUpdateURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.Popedom.UserAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.Popedom.UserUpdate',
            //删除调用方法名称
            deleteMethod: 'Js.Center.Popedom.UserDelete.func',
            //其他需要预加载函数
			otherInitLoadFunc:UserarrInitLoadFunc,

            needMenu: false,
            sm: sm,
            cm: cm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "增加账户",
                    tooltip: "增加账户",
                   handler: function(){
						usersGrid.doInsert();
					}
                             
                }, "", "-", "", {
                    text: "账户授权",
                    tooltip: "账户授权",
                    iconCls: "editicon",
                    handler: function(){
                        userPermit('', '', '', '', '');
                    }
                }, "", "-", "", {
                    text: "删除",
                    tooltip: "删除",
                    iconCls: "deleteicon",
                    handler: function(){
						usersGrid.doDelete();
					}
                }]
            })
        });
        
        //============================================================================ 定义formpanel
        //========================================部门下拉列表
        //定义部门结构树
        var departComboxTree = new WXTL.Widgets.CommonForm.ComboWithTree({
            name: 'numdepartid',
            hiddenName: 'numdepartid',
            id: 'Js.Center.Popedom.User.departComboxTree',
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
            id: "Js.Center.Popedom.User.SelectPanel",
            height: 100,
            //查询调用的方法
            queryMethod: "Js.Center.Popedom.User.queryGrid",
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
                    items: [new Ext.form.TextField({
                        fieldLabel: '账户名称',
                        name: 'vc2username',
                        id: 'Js.Center.Popedom.User.UserName',
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        msgTarget: "side",
                        maxLength: 15
                    })]
                }, {
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    defaults: {
                        anchor: '90%',
                        msgTarget: "side"
                    },
                    items: [departComboxTree]
                }]
            }]
        
        
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.Popedom.User.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var userName = Ext.get("Js.Center.Popedom.User.UserName").getValue();
                var numDepartId = departComboxTree.getValue() == null ? "" : departComboxTree.getValue().replace("s", "");//departComboxTree.getValue().replace("s","");//
                var flag = 'selectbykey';
                Js.Center.Popedom.User.Infostore.baseParams = {
                    username: '',
                    numdepartid: numDepartId,
                    vc2uaccount: userName,
                    flag: flag
                };
                Js.Center.Popedom.User.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.Popedom.User.MainPanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.Popedom.User.MainPanel",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, usersGrid]
   
        });
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.Popedom.User.MainPanel, "openroomiconinfo", "Js.Center.Popedom.User.Infostore");
};

