Ext.namespace('Js.Center.Purview.Right');

Js.Center.Purview.Right.info = function(node){
    checkLogin();
    if (Ext.get("Js.Center.Purview.Right.RightPanel") == null) {
        //============================================================================定义GridPanel相关
        var _pageSize = 12;
        
        //==============================================================权限下拉列表数据定义
        Js.Center.Purview.Right.righttypestore = new Ext.data.Store({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Purview.RightURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ['numrightid', 'vc2rightname'],
                root: 'data',
                id: 'numrightid'
            }),
            baseParams: {
                flag: 'selectall',
                columnlist: 'numrightid,vc2rightname'
            }
        });
        //Js.Center.Purview.Right.righttypestore.load();
        //权限上级菜单下拉列表
        Js.Center.Purview.Right.ParentRightStore = new Ext.data.Store({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Purview.RightURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ['numrightid', 'vc2rightname'],
                root: 'data',
                id: 'numrightid'
            }),
            baseParams: {
                flag: 'selectparentlist',
                columnlist: 'numrightid,vc2rightname'
            }
        });
        Js.Center.Purview.Right.ParentRightStore.load();
        
        //==============================================================权限Grid数据定义
        Js.Center.Purview.Right.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Purview.RightURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ["numrightid", "vc2rightname", "vc2rolecode", "vc2enabledflag", "vc2rightdesc", "vc2codegroupurl", "vc2codegroupmodule", "numparentid", "vc2parentname", "numorder", "vc2type"],
                root: "data",
                id: "numrightid",
                totalProperty: "totalCount"
            
            }),
            //groupField:'numparentid',
            sortInfo: {
                field: 'numorder',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                rightname: '',
                flag: 'selectbykey'
            }
        });
        Js.Center.Purview.Right.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize,
                rightname: '',
                flag: 'selectbykey'
            }
        });
        
        
        //==============================================================列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numrightid"
        });
        //==============================================================列头
        var cm = new Ext.grid.ColumnModel([sm, {
            header: "上级目录",
            tooltip: "上级目录",
            dataIndex: "numparentid",
            sortable: true,
			renderer: function(value, meta, record, rowIndex, colIndex, store){
				if (value == '-1') {
					return "根目录";
				}
				else {				
					if (Js.Center.Purview.Right.ParentRightStore.getById(value) == null) {
						return "<b>-=请选择=-</b>";
					}
					else {
						return Js.Center.Purview.Right.ParentRightStore.getById(value).data.vc2rightname;
					}
				}
			},
            editor: new WXTL.Widgets.CommonForm.ComboWithTree({
                name: 'numparentid',
                hiddenName: 'numparentid',
                fieldLabel: "上级目录",
                anchor: '90%',
                //displayField:'vc2rightname',
                valueField: 'id',
                listWidth: '200',
                listHeight: '150',
                baseParams: {
                    parentid: '-1',
                    method: 'POST'
                },
                dataUrl: 'URL/tree.ashx'//Js.Center.Purview.RightURL
            })

        },{
            header: "权限名称",
            tooltip: "权限名称",
            dataIndex: "vc2rightname",
            sortable: true
            //editor: new Ext.form.TextField
        }, {
            header: "权限ID",
            tooltip: "权限ID",
            dataIndex: "numrightid",
            sortable: true
            //editor: new Ext.form.TextField
        }, {
            header: "权限描述",
            tooltip: "权限描述",
            dataIndex: "vc2rightdesc",
            sortable: true
            //editor: new Ext.form.TextField
        }, {
            header: "访问路径",
            tooltip: "访问路径",
            dataIndex: "vc2codegroupurl",
            sortable: true
            //editor: new Ext.form.TextField
        }, {
            header: "模块编号",
            tooltip: "模块编号",
            dataIndex: "vc2codegroupmodule",
            sortable: true
            //editor: new Ext.form.TextField
        },  {
            header: "权限类型",
            tooltip: "权限类型",
            dataIndex: "vc2type",
            sortable: true,
            renderer: function(value){
                if (value == 1) {
                    return "功能";
                }
                else {
                    return "目录";
                }
            }

        }, {
            header: "排序号",
            tooltip: "排序号",
            dataIndex: "numorder",
            sortable: true
            //editor: new Ext.form.TextField
        }]);
        
        //==============================================================定义grid
        var rightGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            id: "rightGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.Purview.Right.Infostore,
            //但字段修改路径定义
            needRightMenu: false,
            afterEditURL: Js.Center.Purview.RightUpdateURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.Purview.RightAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.Purview.RightUpdate',
            //删除调用方法名称
            deleteMethod: 'Js.Center.Purview.RightDelete.func',
            sm: sm,
            cm: cm,
            listeners: {
//                "rowcontextmenu": function(grid, rowIndex, e){
//                    e.stopEvent();
//                    openRightClick.showAt(e.getXY());
//                },
                "afteredit": function(e){
                    this.afterEdit(e);
                }
            }
        });
        
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "rightSelectPanel",
            labelWidth: 100,
            //查询调用的方法
            queryMethod: "Js.Center.Purview.Right.queryGrid",
            items: [{
                layout: 'form',
				defaults: {
                    anchor: '40%',
                    msgTarget: "side"
                },
                items: [new Ext.form.TextField({
                    fieldLabel: '功能权限名称',
                    name: 'rightname',
                    id: 'rightname'
                })]
            }]
        
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.Purview.Right.queryGrid = function(){
            var _rightname = Ext.get("rightname").getValue();
            var flag = 'selectbykey';
            Js.Center.Purview.Right.Infostore.baseParams = {
                rightname: _rightname,
                flag: flag
            };
            Js.Center.Purview.Right.Infostore.load({
                params: {
                    start: 0,
                    limit: _pageSize,
                    rightname: _rightname,
                    flag: flag
                }
            });
        };
        
        //============================================================================定义主panel
        Js.Center.Purview.Right.RightPanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.Purview.Right.RightPanel",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, rightGrid]
        });
    }
    //============================================================================绑定到center
    GridMain(node, Js.Center.Purview.Right.RightPanel, "openroomiconinfo", "Js.Center.Purview.Right.Infostore");
};
