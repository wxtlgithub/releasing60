Ext.namespace('Js.Center.Popedom.Department');

Js.Center.Popedom.Department.info = function(node) {

    if (Ext.get("Js.Center.Popedom.Department.MainPanel") == null) {
        // =====================添加方法
        departAdd = function() {
            //Js.Center.Popedom.DepartmentAdd.func();
            Js.Center.Popedom.DepartmentAdd.window.show();
        };
        //===================== 修改方法
        departUpdate = function(rowIndex) {
            var row = Js.Center.Popedom.Department.Infostore.getAt(rowIndex);
            Js.Center.Popedom.DepartmentUpdate.window.updateRecord = row;
            //Js.Center.Popedom.DepartmentUpdate.func(row);
            Js.Center.Popedom.DepartmentUpdate.window.show();
            Js.Center.Popedom.DepartmentUpdate.window.mainForm.loadRecord(row);
			//Js.Center.Popedom.DepartmentUpdate.tree.fireEvent('load');

            //            var row = departmentsGrid.getSelectionModel().getSelections();

            //            if (row.length == 0) {
            //                Ext.Msg.alert("温馨提示", "请您选择一条记录!");
            //            }
            //            else
            //                if (row.length > 1) {
            //                Ext.Msg.alert("温馨提示", "对不起，您只能选择一条记录!");
            //            }
            //            else
            //                if (row.length == 1) {
            //                    Js.Center.Popedom.DepartmentUpdate.window.show();
            //                    Js.Center.Popedom.DepartmentUpdate.func(row);
            //                    Js.Center.Popedom.DepartmentUpdate.window.mainForm.loadRecord(row);
            //                   
            //}
        };
        //====================== 删除方法
        departDelete = function(rowIndex) {
            //var row = Js.Center.Popedom.Department.Infostore.getAt(rowIndex);
            var row = departmentsGrid.getSelectionModel().getSelections();
            if (row.length > 1) {
                Ext.Msg.alert("提示信息", "您只能选择一个删除!");
            }
            else if (row.length == 1) {
                Ext.Msg.confirm("提示!", "您确定要删除信息吗?", function(btn) {
                    if (btn == "yes") {

                        Js.Center.Popedom.DepartmentDelete.func(row);
                    }
                    else {
                    }
                })
            }
        };

        //====================== 删除方法
        departGetSelecttionsDelete = function() {
            //得到多个record对象
            var row = departmentsGrid.getSelectionModel().getSelections();
            if (row.length == 0) {
                Ext.Msg.alert("提示信息", "请您至少选择一个!");
            }
            else {
                Ext.Msg.confirm("提示!", "您确定要删除信息吗?", function(btn) {
                    if (btn == "yes") {

                        Js.Center.Popedom.DepartmentDelete.func(row);

                    }
                    else {

                    }
                })
            }
        };

        // =====================授权方法
        departPermission = function(rowIndex) {
			if(rowIndex!= null){
				var row = Js.Center.Popedom.Department.Infostore.getAt(rowIndex);
            	Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord = row;
			}
			else{
				Js.Center.Popedom.Department.DepartmentPermit.window.updateRecord = null;
			}
			
			Js.Center.Popedom.Department.DepartmentPermit.window.show();
            //Js.Center.Popedom.Department.DepartmentPermit.func(departId, departName);
        };
        // ========================================================================= 定义GridPanel相关
        // 分页每页显示数量
        var _pageSize = 12;
        // 指定列参数
        var fields = ["vc2dcode", "vc2linkman", "vc2parentdepartname", "vc2departname", "numorder", "numusercount", "vc2creatorname", "datcreatetime", "vc2lastmodifyname", "datlastmodifytime", "vc2departdesc", "numrowasdf", "numdepartid", "numparentdepart", "numlevel", "vc2levelpath", "vc2extendcode", "numdepartsrc", "numcreator", "numlastmodifyuser", "datlastmodifytime", "vc2lastmodifyname", "numstate", "numtype", "vc2branchname", "vc2address", "vc2tel", "vc2postcode", "vc2handset", "numroleid"];
        //,"vc2rolename", "numdroleid", "vc2drolename", "numcheckstate"
        // var fields = ["vc2dcode","numorder","vc2LinkMan","vc2departname","numorder","numusercount","vc2creatorname","datcreatetime","vc2departdesc","numrowasdf", "numdepartid", "vc2departname", "numparentdepart", "numlevel", "vc2levelpath", "vc2extendcode", "numdepartsrc", "numcreator", "datcreatetime", "vc2creatorname", "numlastmodifyuser", "datlastmodifytime", "vc2lastmodifyname", "numstate", "numtype", "numorder", "vc2dcode", "vc2branchname", "vc2departdesc", "numusercount", "vc2address", "vc2tel", "vc2postcode", "vc2handset", "vc2linkman", "numroleid", "vc2rolename", "numdroleid", "vc2drolename", "numcheckstate"];
        Js.Center.Popedom.Department.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Popedom.DepartmentsQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numdepartid",
                totalProperty: "totalCount"

            }),
            //groupField:'numparentdepart',
            sortInfo: {
                field: 'datcreatetime',
                direction: 'DESC'
            }, //解决分组无效代码
            baseParams: {
                vc2departname: '',
                vc2dcode: '',
                flag: 'selectbykey'
            }
        });
        Js.Center.Popedom.Department.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize,
                vc2departname: '',
                vc2dcode: '',
                flag: 'selectbykey'
            }
        });

        // ==================================================== 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numdepartid"
        });
        // ==================================================== 列头
        //部门名称、通信地址、邮编、手机号码、电话、联系人信息、部门顺序号、部门用户个数、创建人、创建时间、部门描述

        var cm = new Ext.grid.ColumnModel([sm, {
            header: "部门名称",
            tooltip: "部门名称",
            dataIndex: "vc2departname",
            sortable: true
        }, {
            header: "部门顺序号",
            tooltip: "部门顺序号",
            dataIndex: "numorder",
            hidden: true,
            sortable: true
        }, {
            header: "用户个数",
            tooltip: "用户个数",
            dataIndex: "numusercount",
            hidden: true,
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
            header: "修改人",
            tooltip: "修改人",
            dataIndex: "vc2lastmodifyname",
            sortable: true
        }, {
            header: "修改日期",
            tooltip: "修改日期",
            dataIndex: "datlastmodifytime",
            sortable: true
        }, {
            header: "描述",
            tooltip: "描述",
            dataIndex: "vc2departdesc",
            sortable: true
        }, {
            header: "部门权限",
            tooltip: "部门权限",
            dataIndex: "numsvcid",
            renderer: function(value, meta, record, rowIndex, colIndex, store) {
				return "<a href='#' onclick='departPermission(\"" + rowIndex + "\")'>授权</a>";
                //return "<a href='#' onclick='departPermission(\"" + record.data.numdepartid + "\",\"" + record.data.vc2departname + "\")'>授权</a>　";
            }
        }, {
            header: "部门操作",
            tooltip: "部门操作",
            dataIndex: "numdepartid",
            renderer: function(value, meta, record, rowIndex, colIndex, store) {

                return "<a href='#' onclick='departUpdate(\"" + rowIndex + "\")'>修改</a>　<a href='#' onclick='departDelete(\"" + rowIndex + "\")'>删除</a>";
            }
}]);

            //==============================================================定义grid
			var arrInitLoadFunc = new Array();
			arrInitLoadFunc[0] = "Js.Center.Popedom.Department.DepartmentPermit.func";
            var departmentsGrid = new WXTL.Widgets.CommonGrid.GridPanel({
                pageSize: _pageSize,
                anchor: '100% 100%',
                needRightMenu: false,
                store: Js.Center.Popedom.Department.Infostore,
                //但字段修改路径定义

                afterEditURL: Js.Center.Purview.DepartmentsUpdateURL,
                //添加调用方法名称
                inertMethod: 'Js.Center.Popedom.DepartmentAdd',
                //修改调用方法名称
                updateMethod: 'Js.Center.Popedom.DepartmentUpdate',
                //删除调用方法名称
                deleteMethod: 'Js.Center.Popedom.DepartmentDelete',
				otherInitLoadFunc:arrInitLoadFunc,
                needMenu: false,
                sm: sm,
                cm: cm,
                tbar: new Ext.Toolbar({
                    items: [{
                        iconCls: 'addicon',
                        text: "添加部门",
                        //tooltip: "添加部门",
                        handler: departAdd
                        //                }, "", "-", "", {
                        //                    text: "修改",
                        //                    tooltip: "修改",
                        //                    iconCls: "editicon",
                        //                    handler: roleUpdate                
                    }, "", "-", "", {
                        text: "部门授权",
                        //tooltip: "部门授权",
                        iconCls: "editicon",
                        handler: function() {
							departPermission();
                            //departPermission('', '');
                        }
                    }, "", "-", "", {
                        text: "删除",
                        //tooltip: "删除",
                        iconCls: "deleteicon",
                        handler: departGetSelecttionsDelete}]
                    })
                });

                //============================================================================ 定义formpanel
                var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
                    id: "Js.Center.Popedom.Department.SelectPanel",
                    height: 100,
                    //查询调用的方法
                    queryMethod: "Js.Center.Popedom.Department.queryGrid",
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
                            items: [{
                                fieldLabel: '部门名称',
                                name: 'vc2departname',
                                id: 'Js.Center.Popedom.Department.DepartmentName',
                                regex: WXTL.Common.regex.Illegal,
                                regexText: WXTL.Common.regexText.IllegalText,
                                msgTarget: "side",
                                maxLength: 50
                                }]
                                                             
                                }]
                                }]
                            });

                            //============================================================== 定义查询按钮事件方法
                            Js.Center.Popedom.Department.queryGrid = function() {
                                if (selectPanel.getForm().isValid()) {
                                    var _vc2departname = Ext.get("Js.Center.Popedom.Department.DepartmentName").getValue();
                                    // var _vc2dcode = Ext.get("Js.Center.Popedom.Department.DepartmentCode").getValue();
                                    var _flag = 'selectbykey';
                                    Js.Center.Popedom.Department.Infostore.baseParams = {
                                        vc2departname: _vc2departname,
                                        // vc2dcode: _vc2dcode,
                                        flag: _flag
                                    };
                                    Js.Center.Popedom.Department.Infostore.load({
                                        params: {
                                            start: 0,
                                            limit: _pageSize,
                                            vc2departname: _vc2departname,
                                            //vc2dcode: _vc2dcode,
                                            flag: _flag
                                        }
                                    });
                                }
                            };

                            //============================================================================定义主panel
                            Js.Center.Popedom.Department.MainPanel = new Ext.Panel({
                                frame: true, // 渲染面板
                                id: "Js.Center.Popedom.Department.MainPanel",
                                bodyBorder: false,
                                border: false,
                                autoScroll: true, // 自动显示滚动条
                                layout: "anchor",
                                defaults: {
                                    collapsible: true // 允许展开和收缩
                                },
                                items: [selectPanel, departmentsGrid]
                               
                            })
                        };
                        //============================================================================绑定到center
                        GridMain(node, Js.Center.Popedom.Department.MainPanel, "openroomiconinfo", "Js.Center.Popedom.Department.Infostore");

                    };

