Ext.namespace('Js.Center.System.Notice.noticemsg');

Js.Center.System.Notice.noticemsg.info = function(node){
    if (Ext.get("Js.Center.System.Notice.noticemsg.info.NoticePanel") == null) {
        
        // ======================================================================= 定义GridPanel相关
        // ===============================================分页每页显示数量
        //var pageSize = 12;
        var _pageSize = 12;
        // ===============================================指定列参数
        
        var fields = ["numseqid",// 公告编号
			 "vc2bulletin",//内容
			 "datcreatetime",//创建日期
			 "numuserid",//创建人编号
			 "vc2filepath",//附件地址
			 "vc2username",//创建人
			 "vc2bultitle",//公告标题
			 "vc2nodeid"
		];
        Js.Center.System.Notice.noticemsg.info.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.System.NoticeOperatorURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numseqid",
                totalProperty: "totalCount"
            
            }),
            baseParams: {
                numuserid: '',
                vc2bulletin: '',
                numseqid: '',
                vc2bultitle: '',
                datstart:'',
                datend:'',
                vc2nodeid: '',
                flag: 'selectbyall'
            }
        });
        Js.Center.System.Notice.noticemsg.info.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize
            }
        });
        
        // ==================================================== 列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numseqid"
        });
        // ==================================================== 列头
        var cm = new Ext.grid.ColumnModel([sm, {
            header: "公告编号",
            tooltip: "公告编号",
            dataIndex: "numseqid",
            sortable: true
        }, {
            header: "公告标题",
            tooltip: "公告标题",
            dataIndex: "vc2bultitle",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store) {
            		return "<a href='#' onClick=' Js.Center.System.Notice.noticemsg.info.showDetail()'>" + value + "</a>";
             }
        }, {
            header: "公告内容",
            tooltip: "公告内容",
            dataIndex: "vc2bulletin",
            sortable: true
        }, {
        	header: "可见网元",
            tooltip: "可见网元",
            dataIndex: "vc2nodeid",
            sortable: true
        },{
            header: "创建日期",
            tooltip: "创建日期",
            dataIndex: "datcreatetime",
            sortable: true
        }, {
            header: "创建人",
            tooltip: "创建人",
            dataIndex: "vc2username",
            sortable: true
        }]);
        
        //==============================================================定义grid
        var NoticeGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.System.Notice.noticemsg.info.Infostore,
            //但字段修改路径定义
            
//            afterEditURL: Js.Center.System.Notice.noticemsg.infoUpdateURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.System.Notice.noticemsg.infoAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.System.Notice.noticemsg.infoUpdate',
            //删除调用方法名称
            deleteMethod: 'Js.Center.System.Notice.noticemsg.infoDelete.func',
            sm: sm,
            cm: cm
        });
        
      //============================================================================ 定义formpanel
        var selectPanel  = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            //id: "MTQueryinfoSelectPanel",
            height: 130,
            //查询调用的方法
            queryMethod: "Js.Center.System.Notice.noticemsg.queryGrid",
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
                    buttonAlign: "center",
                    bodyStyle: "padding:10px 0 10px 15px",
                    items: [new Ext.form.DateField({
                        fieldLabel: '开始时间',
                        name: 'datstart',
                        id: 'Js.Center.System.Notice.noticemsg.DatStart',
                        readOnly: true,
                        //emptyText:StartDateTime,
                        format: 'Y-m-d',
                        validateOnBlur: false,
                        showToday:true,
                        clearDate:true,
                        validator: function(){
                            var strat_time = Ext.get("Js.Center.System.Notice.noticemsg.DatStart").dom.value;
                            var end_time = Ext.get("Js.Center.System.Notice.noticemsg.DatEnd").dom.value;
                            if (strat_time <= end_time) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        },
                        invalidText: '结束时间不能小于开始时间！'
                    }), new Ext.form.TextField({
                        fieldLabel: '公告标题',
                        name: 'vc2bultitle',
                        id: 'Js.Center.System.Notice.noticemsg.vc2bultitle',
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 25
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
	                    buttonAlign: "center",
	                    bodyStyle: "padding:10px 0 10px 15px",
	                    items: [new Ext.form.DateField({
	                        fieldLabel: '结束时间',
	                        name: 'datend',
	                        id: 'Js.Center.System.Notice.noticemsg.DatEnd',
	                        readOnly: true,
	                        // emptyText:new Date().format('Y-m-d H:i:s'),
	                        format: 'Y-m-d',
	                        validateOnBlur: true,
                        	showToday:true,
                        	clearDate:true,
	                        validator: function(){
	                            var strat_time = Ext.get("Js.Center.System.Notice.noticemsg.DatStart").dom.value;
	                            var end_time = Ext.get("Js.Center.System.Notice.noticemsg.DatEnd").dom.value;
	                            if (strat_time <= end_time) {
	                                return true;
	                            }
	                            else {
	                                return false;
	                            }
	                        },
	                        invalidText: '结束时间不能小于开始时间！'
	                  }), new Ext.form.TextField({
	                        fieldLabel: '公告编号',
	                        name: 'numseqid',
	                        id: 'Js.Center.System.Notice.noticemsg.numseqid',
	                        regex: WXTL.Common.regex.Illegal,
	                        regexText: WXTL.Common.regexText.IllegalText,
	                        maxLength: 25
	                    })]
                 }]
        	}]
        }); 
        Js.Center.System.Notice.noticemsg.info.showDetail = function(){
        	var row = NoticeGrid.getSelectionModel().getSelections();
        	Js.Center.System.Notice.noticemsg.infoDetail.func(row[0]);
        	Js.Center.System.Notice.noticemsg.infoDetail.window.show();
        };
        Js.Center.System.Notice.noticemsg.info.deleteDetail = function(){
        	var row = NoticeGrid.getSelectionModel().getSelections();
        	Js.Center.System.Notice.noticemsg.infoDetail.func(row[0]);
        	Js.Center.System.Notice.noticemsg.infoDetail.window.show();
        };
        //============================================================== 定义查询按钮事件方法
        Js.Center.System.Notice.noticemsg.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var _vc2bultitle = Ext.get("Js.Center.System.Notice.noticemsg.vc2bultitle").getValue();
                var _numseqid = Ext.get("Js.Center.System.Notice.noticemsg.numseqid").getValue();
                var flag = 'selectbykey';
                Js.Center.System.Notice.noticemsg.info.Infostore.baseParams = {
                		numuserid: '',
                        vc2bulletin: '',
                        numseqid: _numseqid,
                        vc2bultitle: _vc2bultitle,
                        vc2nodeid: '' ,
                    flag: flag,
                    datstart:Ext.get("Js.Center.System.Notice.noticemsg.DatStart").dom.value,
                    datend:Ext.get("Js.Center.System.Notice.noticemsg.DatEnd").dom.value
                };
                Js.Center.System.Notice.noticemsg.info.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
    //============================================================================定义主panel
    Js.Center.System.Notice.noticemsg.info.NoticePanel = new Ext.Panel({
        frame: true, // 渲染面板
        id: "Js.Center.System.Notice.noticemsg.info.NoticePanel",
        bodyBorder: false,
        border: false,
        autoScroll: true, // 自动显示滚动条
        layout: "anchor",
        defaults: {
            collapsible: true // 允许展开和收缩
        },
        items: [selectPanel,NoticeGrid]
    });
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.System.Notice.noticemsg.info.NoticePanel, "openroomiconinfo", "Js.Center.System.Notice.noticemsg.info.Infostore");
};
