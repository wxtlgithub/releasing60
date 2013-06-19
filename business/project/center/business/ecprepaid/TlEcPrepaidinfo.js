Ext.namespace('Js.Center.Business.ECPrepaid');
Js.Center.Business.ECPrepaid.info = function(node){
	Js.Center.Common.EcListStore.reload();
	
	 if (Ext.get("Js.Center.Business.ECPrepaid.ECMainPanel") == null) {
		 
	        // 定义GridPanel相关
	        // ===============================================分页每页显示数量
	        var _pageSize = 12;
	        // ===============================================指定列参数
	        //字段
	        var fields = ["numseqid","numecid","numtype","numsendmax","numsent","numsurplus","numover","vc2ecid","vc2ecname","datupdatetime"];
	        Js.Center.Business.ECPrepaid.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
	            proxy: new Ext.data.HttpProxy({
	                url: Js.Center.Business.ECPrePaid.ECPrePaidURL,
	                method: "POST"
	            }),
	            reader: new Ext.data.JsonReader({
	                fields: fields,
	                root: "data",
	                id: "numseqid",
	                totalProperty: "totalCount"
	            }),
	            baseParams: {
	            	numecid: '',
	            	numover: '',
	                flag: 'selectbykey'
	            },
	            sortInfo: {
	                field: 'numseqid',
	                direction: 'DESC'
	            }// 解决分组无效代码
	        });
	        Js.Center.Business.ECPrepaid.Infostore.load({
	            params: {
	                start: 0,
	                limit: _pageSize,
	                numecid: '',
	            	numover: '',
	                flag: 'selectbykey'
	            }
	        });
	       
		    
	        // ==================================================== 列选择模式
	        var sm = new Ext.grid.CheckboxSelectionModel({
        	    dataIndex: "numseqid"
    	    });
    	    // -------------------------------------------------- 列头
    	    var cm = new Ext.grid.ColumnModel([{
	    	    header: "EC编号",
	    	    tooltip: "EC编号",
	    	    dataIndex: "vc2ecid",
	    	    sortable: true
    	    },{
	    	    header: "EC名称",
	    	    tooltip: "EC名称",
	    	    dataIndex: "vc2ecname",
	    	    sortable: true
    	    },{
	    	    header: "短彩类型",
	    	    tooltip: "短彩类型（1：短信；2彩信）",
	    	    dataIndex: "numtype",
	    	    sortable: true,
	    	    renderer:function(value, meta, record, rowIndex, colIndex, store){
	            	if(value=="1"){
            			return "短信";
	            	} else if(value=="2"){
            			return "彩信";
	            	}
	            }
    	    },{
	    	    header: "允许发送的最大条数",
	    	    tooltip: "允许发送的最大条数",
	    	    dataIndex: "numsendmax",
	    	    sortable: true
    	    },{
	    	    header: "当前已经发送条数",
	    	    tooltip: "当前已经发送条数",
	    	    dataIndex: "numsent",
	    	    sortable: true
    	    },{
	    	    header: "是否超量",
	    	    tooltip: "是否超量,0是没超；1是超量 ",
	    	    dataIndex: "numover",
	    	    sortable: true,renderer:function(value, meta, record, rowIndex, colIndex, store){
	            	if(value=="0"){
            			return "未超";
	            	} else if(value=="1"){
            			return "超量";
	            	}
	            }
    	    },{
	    	    header: "采集时间",
	    	    tooltip: "采集时间",
	    	    dataIndex: "datupdatetime",
	    	    sortable: true
    	    }]);
		// ============================================================================
		// 定义SelectFormPanel
	    var ECSelectPanel= new WXTL.Widgets.CommonPanel.QueryFormPanel({
	        height: 130,
	        // 查询调用的方法
	        queryMethod: "Js.Center.Business.ECPrepaid.queryMainGrid",
	        items: [{
	            layout: 'column',
	            items: [
	                {//左侧列
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
	                	xtype: "xComboBox",
	                    name: "numecid",
	                    fieldLabel: "EC编号",
	                    hiddenName: "Js.Center.Business.ECPrepaid.vc2ecid",
	                    //readOnly: true,
	                    mode: "local",
	                    displayField: "vc2ecname",
	                    valueField: "numecid",
	                    triggerAction: "all",
	                    emptyText: "-=请选择=-",
	                    store: Js.Center.Common.EcListStore
	                }]
	            },{//右侧
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
	            		xtype: "combo",
	                    name: "NUMOVER",
	                    hiddenName: "Js.Center.Business.ECPrepaid.NUMOVER",
	                    fieldLabel: "是否超量",
	                    readOnly: true,
	                    mode: "local",
	                    displayField: "show",
	                    valueField: "value",
	                    triggerAction: "all",
	                    emptyText: "-=请选择=-",
	                    store: new Ext.data.SimpleStore({
	                        fields: ["show", "value"],
	                        data: [["-=请选择=-", ""], ["是", "1"], ["否", "0"]]
	                    })
	                }]
	            }]
	         }]
	    });
        //============================================================== 定义查询按钮事件方法
	    Js.Center.Business.ECPrepaid.queryMainGrid = function(){
            if (ECSelectPanel.getForm().isValid()) {
                var vc2ecid = Ext.get("Js.Center.Business.ECPrepaid.vc2ecid").getValue();
                var numover = Ext.get("Js.Center.Business.ECPrepaid.NUMOVER").getValue();
                var flag = 'selectbykey';
                Js.Center.Business.ECPrepaid.Infostore.baseParams = {
            		numecid: vc2ecid,
	            	numover: numover,
                    flag: flag
                };
                Js.Center.Business.ECPrepaid.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
	    // ==============================================================定义grid
        
	    var ECPrePaidGrid = new WXTL.Widgets.CommonGrid.GridPanel({
	        anchor: '100% 100%',
	        pageSize: _pageSize,
	        store: Js.Center.Business.ECPrepaid.Infostore,
	        sm: sm,
	        cm: cm,
	        needRightMenu: false,
            //但字段修改路径定义
            afterEditURL: Js.Center.Business.ECPrePaid.ECPrePaidURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.Business.ECPrepaid.ECPrePaidAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.Business.ECPrepaid.ECPrePaidUpdate',
	        needMenu: false, 
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "添加",
                    handler: function(){
                    	ECPrePaidGrid.doInsert();
                    }
                }, "", "-", "",{
                    iconCls: 'editicon',
                    text: "修改",
                    handler: function(){
                    	ECPrePaidGrid.doEdit();                    
                    }
                }]
            })
	    });
		// ============================================================================定义主panel
		Js.Center.Business.ECPrepaid.ECMainPanel = new Ext.Panel({
	        frame: true, // 渲染面板
	        id: "Js.Center.Business.ECPrepaid.ECMainPanel",
	        bodyBorder: false,
	        border: false,
	        autoScroll: true, // 自动显示滚动条
	        layout: "anchor",
	        defaults: {
	            collapsible: true // 允许展开和收缩
	        },
	        items: [ECSelectPanel,ECPrePaidGrid]
	    });
	};
	
	GridMain(node,Js.Center.Business.ECPrepaid.ECMainPanel, "openroomiconinfo","Js.Center.Business.ECPrepaid.Infostore");
	
};