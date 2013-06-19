Ext.namespace('Js.Center.System.Notice.noticemsgmore');
Ext.QuickTips.init();
Js.Center.System.Notice.noticemsgmore.info = function(node){
    if (Ext.get("Js.Center.System.Notice.noticemsgmore.info.NoticePanel") == null) {
        
        // ======================================================================= 定义GridPanel相关
        // ===============================================分页每页显示数量
        //var pageSize = 12;
        var _pageSize = 12;
        // ===============================================指定列参数
        
        var fields = ["numseqid",// 公告编号
	                       "vc2bultitle",//公告标题
						   "vc2bulletin",//内容
						   "datcreatetime",//创建日期
						   "numuserid",//创建人编号
						   "vc2filepath",//附件地址
					       "vc2username",//创建人
						   "vc2nodeid"//网元信息
			 ];
        Js.Center.System.Notice.noticemsgmore.info.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
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
                flag: 'getmorenotice'
            }
        });
        Js.Center.System.Notice.noticemsgmore.info.Infostore.load({
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
            		return "<a href='#' onClick='Js.Center.System.Notice.noticemsgmore.info.showDetail()'>" +value + "</a>";
            }
        }, {
            header: "公告内容",
            tooltip: "公告内容",
            dataIndex: "vc2bulletin",
            sortable: true
        },  {
            header: "可见网元",
            tooltip: "可见网元",
            dataIndex: "vc2nodeid",
            hidden : true,
            sortable: true
        } ,{
            header: "创建日期",
            tooltip: "创建日期",
            dataIndex: "datcreatetime",
            sortable: true
        }, {
            header: "创建人",
            tooltip: "创建人",
            hidden : true,
            dataIndex: "vc2username",
            sortable: true
        }]);
        
        //==============================================================定义grid
        var NoticeGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            anchor: '100% 100%',
            pageSize: _pageSize,
            needMenu: false,
            store: Js.Center.System.Notice.noticemsgmore.info.Infostore,
            //但字段修改路径定义
            
//            afterEditURL: Js.Center.System.Notice.noticemsgmore.infoUpdateURL,
            sm: sm,
            cm: cm
        });
        
        //============================================================================ 定义formpanel
        var selectPanel  = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            //id: "MTQueryinfoSelectPanel",
            height: 130,
            //查询调用的方法
            queryMethod: "Js.Center.System.Notice.noticemsgmore.queryGrid",
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
                        id: 'Js.Center.System.Notice.noticemsgmore.DatStart',
                        readOnly: true,
                        //emptyText:StartDateTime,
                        format: 'Y-m-d',
                        validateOnBlur: false,
                        showToday:true,
                        clearDate:true,
                        validator: function(){
                            var strat_time = Ext.get("Js.Center.System.Notice.noticemsgmore.DatStart").dom.value;
                            var end_time = Ext.get("Js.Center.System.Notice.noticemsgmore.DatEnd").dom.value;
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
                        id: 'Js.Center.System.Notice.noticemsgmore.vc2bultitle',
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
	                        id: 'Js.Center.System.Notice.noticemsgmore.DatEnd',
	                        readOnly: true,
	                        // emptyText:new Date().format('Y-m-d H:i:s'),
	                        format: 'Y-m-d',
	                        validateOnBlur: true,
                        	showToday:true,
                        	clearDate:true,
	                        validator: function(){
	                            var strat_time = Ext.get("Js.Center.System.Notice.noticemsgmore.DatStart").dom.value;
	                            var end_time = Ext.get("Js.Center.System.Notice.noticemsgmore.DatEnd").dom.value;
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
	                        id: 'Js.Center.System.Notice.noticemsgmore.numseqid',
	                        regex: WXTL.Common.regex.Illegal,
	                        regexText: WXTL.Common.regexText.IllegalText,
	                        maxLength: 25
	                    })]
                 }]
        	}]
        }); 
        //============================================================== 定义查询按钮事件方法
        Js.Center.System.Notice.noticemsgmore.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var _vc2bultitle = Ext.get("Js.Center.System.Notice.noticemsgmore.vc2bultitle").getValue();
                var _numseqid = Ext.get("Js.Center.System.Notice.noticemsgmore.numseqid").getValue();
                var flag = 'selectbykey';
                Js.Center.System.Notice.noticemsgmore.info.Infostore.baseParams = {
                		numuserid: '',
                        vc2bulletin: '',
                        numseqid: _numseqid,
                        vc2bultitle: _vc2bultitle,
                        vc2nodeid: '',
                    flag: flag,
                    datstart:Ext.get("Js.Center.System.Notice.noticemsgmore.DatStart").dom.value,
                    datend:Ext.get("Js.Center.System.Notice.noticemsgmore.DatEnd").dom.value
                };
                Js.Center.System.Notice.noticemsgmore.info.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        Js.Center.System.Notice.noticemsgmore.info.showDetail = function(){
        	var row = NoticeGrid.getSelectionModel().getSelections();
        	Js.Center.System.Notice.noticemsg.infoDetail.func(row[0]);
        	Js.Center.System.Notice.noticemsg.infoDetail.window.show();
        };
    //============================================================================定义主panel
    Js.Center.System.Notice.noticemsgmore.info.NoticePanel = new Ext.Panel({
        frame: true, // 渲染面板
        id: "Js.Center.System.Notice.noticemsgmore.info.NoticePanel",
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
    GridMain(node, Js.Center.System.Notice.noticemsgmore.info.NoticePanel, "openroomiconinfo");
};
