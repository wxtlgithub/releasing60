﻿/**
 * 非法词管理页
 *
 */
Ext.namespace('Js.Center.System.DirtyWord');

Js.Center.System.DirtyWord.dirtyWordInfo = function(node){
    if (Ext.get("Js.Center.System.DirtyWord.DirtyWordPanel") == null) {
        //=========================================关键字类型下拉框
        Js.Center.System.DirtyWord.DirtywordTypeStore = new Ext.data.Store({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.System.DirtyWordTypeQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ['numdirtytype', 'vc2name'],
                root: "data",
                id: "numdirtytype"
            }),
            baseParams: {
                flag: 'selectall',
                columnlist: 'numdirtytype, vc2name'
            }
        });
        Js.Center.System.DirtyWord.DirtywordTypeStore.load();
        // ======================================================================= 定义GridPanel相关
        // =====================导入方法
        dirtyWordImport = function(){
            Js.Center.System.DirtyWordImport.window.show();
        };
        // ===============================================分页每页显示数量
        var _pageSize = 12;
        // ===============================================指定列参数
        
        var fields = ["numdirtywordid", "vc2dirtyword", "numdirtytype", "datcreatetime", "numcreaterid", "vc2username", "vc2name"];
        Js.Center.System.DirtyWord.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url:Js.Center.System.DirtyWordURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numdirtywordid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'datcreatetime',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                dirtywordname: '',
                flag: 'selectbykey'
            }
        });
        Js.Center.System.DirtyWord.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize,
                dirtywordname: '',
                flag: 'selectbykey'
            }
        });
        
        // ==================================================== 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numdirtywordid"
        });
        // ==================================================== 列头
        var cm = new Ext.grid.ColumnModel([sm, {
            header: "内容",
            tooltip: "内容",
            dataIndex: "vc2dirtyword",
            sortable: true
        }, {
            header: "类型",
            tooltip: "类型",
            dataIndex: "vc2name",
            sortable: true
        }, {
            header: "添加日期",
            tooltip: "添加日期",
            dataIndex: "datcreatetime",
            sortable: true
        }, {
            header: "添加人",
            tooltip: "添加人",
            dataIndex: "vc2username",
            sortable: true
        }]);
        //其他需要预加载函数数组
        var DirtyWordImportarrInitLoadFunc = new Array();
		    DirtyWordImportarrInitLoadFunc[0] = "Js.Center.System.DirtyWordImport.func";
        //==============================================================定义grid
        var dirtyWordGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            id: "dirtywordGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            needMenu: false,
            store: Js.Center.System.DirtyWord.Infostore,
            //但字段修改路径定义
            afterEditURL: Js.Center.System.DirtyWordUpdateURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.System.DirtyWordAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.System.DirtyWordUpdate',
            //删除调用方法名称
            deleteMethod: 'Js.Center.System.DirtyWordDelete.func',
            //其他需要预加载函数
			otherInitLoadFunc:DirtyWordImportarrInitLoadFunc,
            sm: sm,
            cm: cm,

            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "添加",
                    handler: function(){
						 dirtyWordGrid.doInsert();
					}
                   
                }, "", "-", "", {
                    text: "导入",
                    //tooltip: "导入",
                    iconCls: "importicon",
                    handler: dirtyWordImport
                }, "", "-", "", {
                    text: "修改",
                    //tooltip: "修改",
                    iconCls: "editicon",
                    handler: function(){
						 dirtyWordGrid.doEdit();
					}
                }, "", "-", "", {
                    text: "删除",
                    //tooltip: "删除",
                    iconCls: "deleteicon",
                    handler: function(){
						 dirtyWordGrid.doDelete();
					}
                 
                }]
            })
        
        });
        
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "dirtywordSelectPanel",
			height:100,
            //查询调用的方法
            queryMethod: "Js.Center.System.DirtyWord.queryGrid",
            items: [{
                layout: 'form',
                defaults: {
                    anchor: '40%',
                    msgTarget: "side"
                },
                items: [new Ext.form.TextField({
                    fieldLabel: '非法词名称',
                    name: 'vc2dirtyword',
                    id: 'Js.Center.System.DirtyWord.dwinfovc2dirtyword',
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 25
                })]
            }]
        
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.System.DirtyWord.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var _dirtywordname = Ext.get("Js.Center.System.DirtyWord.dwinfovc2dirtyword").getValue();
                var flag = 'selectbykey';
                Js.Center.System.DirtyWord.Infostore.baseParams = {
                    dirtywordname: _dirtywordname,
                    flag: flag
                };
                Js.Center.System.DirtyWord.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.System.DirtyWord.DirtyWordPanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.System.DirtyWord.DirtyWordPanel",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, dirtyWordGrid]
        })
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.System.DirtyWord.DirtyWordPanel, "openroomiconinfo", "Js.Center.System.DirtyWord.Infostore");
};

