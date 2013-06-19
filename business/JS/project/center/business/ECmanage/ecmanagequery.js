Ext.namespace('Js.Center.Business.ECmanage.query');
Js.Center.Business.ECmanage.query = function(node){
	 if (Ext.get("Js.Center.Business.ECmanage.ECQueryPanel") == null) {
	 	Js.Center.Common.OperatorStore.reload();
	        // =======================================================================
			// 定义GridPanel相关
	        // ===============================================分页每页显示数量
	        var _pageSize = 12;
	        // ===============================================指定列参数
	        // 字段
		    var fields = [ "numrowasdf","numecid", "vc2ecid", "vc2ecname", "numstatus",
				"numdepartid", "numismas", "numindustry", "numsvctype","numpftype",
				"vc2area", "vc2area1","vc2manager", "numcustype", "numlevel","vclevel",
				"numlimited", "vc2chargetype", "vc2fullname", "vc2oapic",
				"vc2conperson", "vc2contact", "datinsert","numisfeeback","numsigntype"];
	        Js.Center.Business.ECmanage.Querystore = new WXTL.Widgets.CommonData.GroupingStore({
	            proxy: new Ext.data.HttpProxy({
	                url: Js.Center.Business.ECmanage.EcQueryURL,
	                method: "POST"
	            }),
	            reader: new Ext.data.JsonReader({
	                fields: fields,
	                root: "data",
	                id: "numrowasdf",
	                totalProperty: "totalCount"
	            }),
	            baseParams: {
	                vc2ecid: '',
	                vc2ecname: '',
    	            NUMSVCTYPE:'',// 短彩类型
    	            NUMSUBCODE:'',// 扩展子码
    	            opid:'',// 运营商ID
	                flag: 'selectecbysearchkey'
	            },
	            sortInfo: {
	                field: 'numecid',
	                direction: 'DESC'
	            }// 解决分组无效代码
	        });
	        Js.Center.Business.ECmanage.Querystore.load({
	            params: {
	                start: 0,
	                limit: _pageSize,
	                vc2ecid: '',
	                flag: 'selectecbysearchkey'
	            }
	        });
	        // =============================================下拉列表绑定 （运营商）
	        var opidComboxQuery = new WXTL.Widgets.CommonForm.ComboBox({
		        name: "numopida",
		        hiddenName: "numopida",
		        emptyText: "-=请选择=-",
		        fieldLabel: "运营商",
		        readOnly: true,
		        mode: "local",
		        displayField: "vc2name",
		        valueField: "numopid",
		        triggerAction: "all",
		        store: Js.Center.Common.OperatorStore
		    });
		    
	        // ==================================================== 列选择模式
	        var sm = new Ext.grid.CheckboxSelectionModel({
	            dataIndex: "numecid"
	        });
	        // ==================================================== 列头
	        var cm = new Ext.grid.ColumnModel([{
	            header: "序列ID",
	            tooltip: "序列ID",
	            dataIndex: "numecid",
	            hidden:true,
	            sortable: true
	        }, {
	            header: "EC编号",
	            tooltip: "EC编号",
	            dataIndex: "vc2ecid",
	            sortable: true
	        },{
	            header: "简称",
	            tooltip: "简称",
	            dataIndex: "vc2ecname",
	            sortable: true
	        },{
	            header: "客户接入状态",
	            tooltip: "客户接入状态",
	            dataIndex: "numstatus",
	            sortable: true,
	            renderer:function(value, meta, record, rowIndex, colIndex, store){
	            	if(value=="1"){
            			return "商用";
	            	} else if(value=="2"){
            			return "停用";
	            	}
	            }
	        },{
	            header: "客户级别",
	            tooltip: "客户级别",
	            dataIndex: "vclevel",
	            sortable: true
	        },{
	            header: "返佣/直签",
	            tooltip: "返佣/直签",
	            dataIndex: "numsigntype",
	            sortable: true,
	            renderer:function(value, meta, record, rowIndex, colIndex, store){
	            	if(value=="1"){
            			return "返佣";
	            	} else if(value=="0"){
            			return "直签";
	            	}
	            }
	        },{
	            header: "计入商务归属",
	            tooltip: "计入商务归属区",
	            dataIndex: "vc2area1",
	            sortable: true
	        },{
	            header: "接入商务",
	            tooltip: "接入商务",
	            dataIndex: "vc2manager",
	            sortable: true
	        },{
	            header: "操作",
	            tooltip: "操作",
	            dataIndex: "numecid",
	            sortable: true,
	            renderer: function(value, meta, record, rowIndex, colIndex, store){
	                return "<a href='#' onclick='Js.Center.Business.ECmanage.selectEcInfoDetail(\"" + value + "\")'>详细</a>";
	            }
	        }
	        ]);
		// ============================================================================
		// 定义SelectFormPanel
	    var ECSelectPanelQuery= new WXTL.Widgets.CommonPanel.QueryFormPanel({
	        height: 160,
	        // 查询调用的方法
	        queryMethod: "Js.Center.Business.ECmanage.QueryMainGrid",
	        items: [{
	            layout: 'column',
	            items: [
	                {// 左侧列
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:10px 0 10px 15px",
	                items:[{
	                    xtype: "textfield",
	                    name: "Js.Center.Business.ECmanage.vc2ecid",
	                    id: 'Js.Center.Business.ECmanage.query.vc2ecid',
	                    fieldLabel: "EC编号",
	                    maxLength: 20,
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText
	                },{
	                    xtype: "combo",
	                    name: "NUMSVCTYPE",
	                    id :"Js.Center.Business.ECmanage.query.NUMSVCTYPE",
	                    hiddenName: "NUMSVCTYPE",
	                    fieldLabel: "短彩类型",
	                    readOnly: true,
	                    mode: "local",
	                    displayField: "show",
	                    valueField: "value",
	                    triggerAction: "all",
	                    emptyText: "-=请选择=-",
	                    store: new Ext.data.SimpleStore({
	                        fields: ["show", "value"],
	                        data: [["-=请选择=-", ""], ["短信", "1"], ["彩信", "2"], ["短彩信", "3"]]
	                    })
		             },opidComboxQuery
	                ]
	            },{// 右侧
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:10px 0 10px 15px",
	            	items:[{
	                    xtype: "textfield",
	                    name: "Js.Center.Business.ECmanage.vc2ecname",
	                    id: 'Js.Center.Business.ECmanage.query.vc2ecname',
	                    fieldLabel: "简称",
	                    maxLength: 20,
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText
	                },{
		            	xtype: "textfield",
	                    name: "NUMSUBCODE",
	                    id: 'Js.Center.Business.ECmanage.query.NUMSUBCODE',
	                    fieldLabel: "扩展码",
	                    maxLength: 20,
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText
		             }
	                ]
	            }]
	         }]
	    });
        // ==============================================================
		// 定义查询按钮事件方法
	    Js.Center.Business.ECmanage.QueryMainGrid = function(){
            if (ECSelectPanelQuery.getForm().isValid()) {
                var vc2ecid = Ext.get("Js.Center.Business.ECmanage.query.vc2ecid").getValue();
                var vc2ecname = Ext.get("Js.Center.Business.ECmanage.query.vc2ecname").getValue();
                var NUMSVCTYPE = Ext.getCmp("Js.Center.Business.ECmanage.query.NUMSVCTYPE").getValue();
                var NUMSUBCODE = Ext.get("Js.Center.Business.ECmanage.query.NUMSUBCODE").getValue();
                var opid = opidComboxQuery.getValue();
                var flag = 'selectecbysearchkey';
                Js.Center.Business.ECmanage.Querystore.baseParams = {
    	            vc2ecid: vc2ecid,
    	            vc2ecname:vc2ecname,
    	            NUMSVCTYPE:NUMSVCTYPE,// 短彩类型
    	            NUMSUBCODE:NUMSUBCODE,// 扩展子码
    	            opid:opid,// 运营商ID
                    flag: flag
                };
                Js.Center.Business.ECmanage.Querystore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
	    // ==============================================================定义grid
        var ecmanage_arrInitLoadFunc = new Array();
        ecmanage_arrInitLoadFunc[0] = "Js.Center.Business.ECmanageDetail.func";
	    var EcByQueryInfoGrid = new WXTL.Widgets.CommonGrid.GridPanel({
	        // id: "MTQueryinfoGridPanel",
	        anchor: '100% 100%',
	        pageSize: _pageSize,
	        needMenu: false,
	        store: Js.Center.Business.ECmanage.Querystore,
	        sm: sm,
	        cm: cm,
	        needRightMenu: false,
	        otherInitLoadFunc: ecmanage_arrInitLoadFunc
	    });
		// ============================================================================定义主panel
		Js.Center.Business.ECmanage.ECQueryPanel = new Ext.Panel({
	        frame: true, // 渲染面板
	        id: "Js.Center.Business.ECmanage.ECQueryPanel",
	        bodyBorder: false,
	        border: false,
	        autoScroll: true, // 自动显示滚动条
	        layout: "anchor",
	        defaults: {
	            collapsible: true // 允许展开和收缩
	        },
	        items: [ECSelectPanelQuery,EcByQueryInfoGrid]
	    });
	};
	GridMain(node,Js.Center.Business.ECmanage.ECQueryPanel, "openroomiconinfo","Js.Center.Business.ECmanage.Querystore");
	
	Js.Center.Business.ECmanage.selectEcInfoDetail = function(rowValue){
		var row = EcByQueryInfoGrid.getSelectionModel().getSelections();
		Js.Center.Business.ECmanageDetail.window.updateRecord = row[0];	
		Js.Center.Business.ECmanageDetail.window.mainForm.loadRecord(row[0]);
		Js.Center.Business.ECmanageDetail.window.show();
		
		if ("" != Ext.fly("Js.Center.Business.ECmanageDetail.vc2oapic").getValue()) {
			Ext.fly("Js.Center.Business.ECmanageDetail.DIV").dom.innerHTML = "<img src='"
				+ Ext.fly("Js.Center.Business.ECmanageDetail.vc2oapic").getValue() + "' width=100% />";
		}
		else{
			Ext.fly("Js.Center.Business.ECmanageDetail.DIV").dom.innerHTML = "";
		};
		
		Ext.apply(Js.Center.Business.ECmanageDetail.Infostore.baseParams, {ecId : rowValue, flag : 'selectbykey' });
		Js.Center.Business.ECmanageDetail.Infostore.load({
			params : {
				start : 0,
				limit : 12,	
				ecId : rowValue,
				flag : 'selectbykey'
			}
		});
	};
};