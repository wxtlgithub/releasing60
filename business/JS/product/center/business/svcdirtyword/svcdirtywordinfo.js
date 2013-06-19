/**
 * 非法词管理页
 *
 */
Ext.namespace('Js.Center.System.SvcDirtyWord');

Js.Center.System.SvcDirtyWord.SvcDirtyWordInfo = function(node){
    if (Ext.get("Js.Center.System.SvcDirtyWord.SvcDirtyWordPanel") == null) {
        //=========================================关键字类型下拉框
        Js.Center.System.SvcDirtyWord.DirtywordTypeStore = new Ext.data.Store({
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
        Js.Center.System.SvcDirtyWord.DirtywordTypeStore.load();
        // ======================================================================= 定义GridPanel相关
        // =====================导入方法
        dirtyWordImport = function(){
            Js.Center.System.SvcDirtyWordImport.window.show();
        };
        // ===============================================分页每页显示数量
        var _pageSize = 12;
        // ===============================================指定列参数
        
        var fields = ["numdirtywordid","numgwid","vc2gatewayname","vc2dirtyword", "numdirtytype", "datcreatetime", "numcreaterid", "vc2username", "vc2name","dateffectend"];
        Js.Center.System.SvcDirtyWord.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url:Js.Center.System.SvcDirtyWordURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numdirtywordid",
                totalProperty: "totalCount"
            
            }),
            //解决分组无效代码
            baseParams: {
                dirtywordname: '',
                dtnumgwid:'',
                datstart:'',
                datend:'',
                flag: 'selectbykey'
            }
        });
        Js.Center.System.SvcDirtyWord.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize,
                dirtywordname: '',
                dtnumgwid:'',
                datstart:'',
                datend:'',
                flag: 'selectbykey'
            }
        });
        
        // ==================================================== 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numdirtywordid"
        });
        // ==================================================== 列头
        var cm = new Ext.grid.ColumnModel([sm, {
            header: "敏感词内容",
            tooltip: "敏感词内容",
            dataIndex: "vc2dirtyword",
            sortable: true
        }, {
        	header:"网关ID",
        	tooltip:"网关ID",
        	dataIndex:"numgwid",
        	sortable:true
        },{
        	header:"网关名称",
        	tooltip:"网关名称",
        	dataIndex:"vc2gatewayname",
        	sortable:true
        },{
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
        },{
        	header: "有效日期",
            tooltip: "有效日期",
            dataIndex: "dateffectend",
            sortable: true
        }]);
        //其他需要预加载函数数组
        var DirtyWordImportarrInitLoadFunc = new Array();
		    DirtyWordImportarrInitLoadFunc[0] = "Js.Center.System.SvcDirtyWordImport.func";
        //==============================================================定义grid
        var svcdirtyWordGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            id: "svcdirtyWordGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            needMenu: false,
            store: Js.Center.System.SvcDirtyWord.Infostore,
            //但字段修改路径定义
            afterEditURL: Js.Center.System.SvcDirtyWordUpdateURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.System.SvcDirtyWordAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.System.SvcDirtyWordUpdate',
            //删除调用方法名称
            deleteMethod: 'Js.Center.System.SvcDirtyWordDelete.func',
            //其他需要预加载函数
			otherInitLoadFunc:DirtyWordImportarrInitLoadFunc,
            sm: sm,
            cm: cm,

            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "添加",
                    handler: function(){
						 svcdirtyWordGrid.doInsert();
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
						 svcdirtyWordGrid.doEdit();
					}
                }, "", "-", "", {
                    text: "删除",
                    //tooltip: "删除",
                    iconCls: "deleteicon",
                    handler: function(){
						 svcdirtyWordGrid.doDelete();
					}
                 
                }]
            })
        
        });
        
        //============================================================================ 定义formpanel
        var svcselectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "svcdirtywordSelectPanel",
			height:130,
            //查询调用的方法
            queryMethod: "Js.Center.System.SvcDirtyWord.queryGrid",
            items: [{
                layout: 'column',
                items: [{
                	columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                	items:[new Ext.form.DateField({
                        fieldLabel: '开始时间',
                        name: 'datstart',
                        id: 'Js.Center.System.SvcDirtyWord.DatStart',
                        readOnly: true,
                        //emptyText:StartDateTime,
                        format: 'Y-m-d',
                        validateOnBlur: false,
                        showToday:true,
                        clearDate:true,
                        validator: function(){
                            var strat_time = Ext.get("Js.Center.System.SvcDirtyWord.DatStart").dom.value;
                            var end_time = Ext.get("Js.Center.System.SvcDirtyWord.DatEnd").dom.value;
                            if (strat_time <= end_time) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        },
                        invalidText: '结束时间不能小于开始时间！'
                    }),new Ext.form.TextField({
                    fieldLabel: '敏感词名称',
                    name: 'vc2dirtyword',
                    id: 'Js.Center.System.SvcDirtyWord.dwinfovc2dirtyword',
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 25
                	})]
                },{
                	columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    //锚点布局-
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                 	items:[new Ext.form.DateField({
                        fieldLabel: '结束时间',
                        name: 'datend',
                        id: 'Js.Center.System.SvcDirtyWord.DatEnd',
                        readOnly: true,
                        // emptyText:new Date().format('Y-m-d H:i:s'),
                        format: 'Y-m-d',
                        validateOnBlur: true,
                        showToday:true,
                        clearDate:true,
                        validator: function(){
                            var strat_time = Ext.get("Js.Center.System.SvcDirtyWord.DatStart").dom.value;
                            var end_time = Ext.get("Js.Center.System.SvcDirtyWord.DatEnd").dom.value;
                            if (strat_time <= end_time) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        },
                        invalidText: '结束时间不能小于开始时间！'
                  }),{    
                 	    xtype: "xComboBox",
                        name: "dtnumgwid",
                        fieldLabel: "网关名称",
                        hiddenName: "dtnumgwid",
                        //readOnly: true,
                        mode: "local",
                        store: Js.Center.Common.BusinessGatewayStore,
                        triggerAction: 'all',
                        selectOnFocus: true,
                        emptyText: '-=请选择=-',
                        //forceSelection: true, // 要求输入值必须在列表中存在
                        displayField: 'vc2gatewayname',
                        valueField: 'numgwid',
                        allowBlank: true,
                        blankText: "网关名称必选"
                 }]
                }]
            }]
        
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.System.SvcDirtyWord.queryGrid = function(){
            if (svcselectPanel.getForm().isValid()) {
                var _dirtywordname = Ext.get("Js.Center.System.SvcDirtyWord.dwinfovc2dirtyword").getValue();
                var _dtnumgwid = Ext.get("dtnumgwid").getValue();
                var flag = 'selectbykey';
                Js.Center.System.SvcDirtyWord.Infostore.baseParams = {
                    dirtywordname: _dirtywordname,
                    dtnumgwid:_dtnumgwid,
                    flag: flag,
                    datstart:Ext.get("Js.Center.System.SvcDirtyWord.DatStart").dom.value,
                    datend:Ext.get("Js.Center.System.SvcDirtyWord.DatEnd").dom.value
                };
                Js.Center.System.SvcDirtyWord.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.System.SvcDirtyWord.SvcDirtyWordPanel = new Ext.Panel({
            frame: true, // 渲染面板
            id: "Js.Center.System.SvcDirtyWord.SvcDirtyWordPanel",
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [svcselectPanel, svcdirtyWordGrid]
        })
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.System.SvcDirtyWord.SvcDirtyWordPanel, "openroomiconinfo", "Js.Center.System.SvcDirtyWord.Infostore");
};

