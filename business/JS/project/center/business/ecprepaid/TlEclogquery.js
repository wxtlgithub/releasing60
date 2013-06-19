Ext.namespace('Js.Center.Business.ECPrepaidLog');
Js.Center.Business.ECPrepaidLog.func = function(row) {	
    if (Ext.get("Js.Center.Business.ECPrepaidLog.window") == null) {
	    // 定义GridPanel相关
	    // ===============================================分页每页显示数量
	    var _pageSize = 12;
	    // ===============================================指定列参数
	    //字段
	    var fields = ["numseqid","numecid","numtype","numsendmax","vc2remark","numprepaidcount","numlastsend","vc2ecid","vc2ecname","datcreattime","vc2username"];
	    Js.Center.Business.ECPrepaidLog.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
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
	        	numecid: row.get("numecid"),
	        	numover: '',
	        	startdate:'',
	        	enddate:'',
	        	operateusername : '',
	            flag: 'selectdetails'
	        },
	        sortInfo: {
	            field: 'numseqid',
	            direction: 'DESC'
	        }// 解决分组无效代码
	    });
	    Js.Center.Business.ECPrepaidLog.Infostore.load({
	        params: {
	            start: 0,
	            limit: _pageSize,
	            numecid: row.get("numecid"),
	        	numover: '',
	            flag: 'selectdetails'
	        }
	    });
	    
	    // ==================================================== 列选择模式
	    var sm = new Ext.grid.CheckboxSelectionModel({
		    dataIndex: "numseqid"
	    });
	    // -------------------------------------------------- 列头
	    var cm = new Ext.grid.ColumnModel([{
		    header: "EC名称",
		    tooltip: "EC名称",
		    dataIndex: "numecid",
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
		    header: "充值数量",
		    tooltip: "充值数量",
		    dataIndex: "numprepaidcount",
		    sortable: true
	    },{
		    header: "上次充值发送量",
		    tooltip: "上次充值发送量",
		    dataIndex: "numlastsend",
		    sortable: true
	    },{
		    header: "充值原因",
		    tooltip: "充值原因",
		    dataIndex: "vc2remark",
		    sortable: true
	    },{
		    header: "充值时间",
		    tooltip: "充值时间",
		    dataIndex: "datcreattime",
		    sortable: true
	    },{
		    header: "操作人",
		    tooltip: "操作人",
		    dataIndex: "vc2username",
		    sortable: true
	    }
	    ]);
	    // ---------------------------------------------------- 定义FormPanel
	    var ECPrePaidGrid = new WXTL.Widgets.CommonGrid.GridPanel({
	        anchor: '100% 100%',
	        pageSize: _pageSize,
	        store: Js.Center.Business.ECPrepaidLog.Infostore,
	        sm: sm,
	        cm: cm,
	        needRightMenu: false,
	        //但字段修改路径定义
	        afterEditURL: Js.Center.Business.ECPrepaidLog.ECPrePaidURL,
	        needMenu: false
	    });
	    var beforedate = new Ext.form.DateField({
	        fieldLabel: '开始时间',
	        name: 'datstart',
	        readOnly: true,
	        id:'Js.Center.Business.ECPrepaidLog.DatStart',
	        //emptyText:StartDateTime,
	        format: 'Y-m-d',
	        validateOnBlur: false,
	        showToday:true,
	        clearDate:true,
	        validator: function(){
	            var strat_time = Ext.get("Js.Center.Business.ECPrepaidLog.DatStart").dom.value;
	            var end_time = Ext.get("Js.Center.Business.ECPrepaidLog.DatEnd").dom.value;
	            if (strat_time <= end_time) {
	                return true;
	            }
	            else {
	                return false;
	            }
	        },
	        invalidText: '结束时间不能小于开始时间！'
	    });
	    
	    var operateusername = new Ext.form.TextField({
	    	fieldLabel:'操作人',
	    	id:'Js.Center.Business.ECPrepaidLog.operateusername',
	    	name:operateusername
	    });
	 // 定义SelectFormPanel
	    var ECSelectPanel= new WXTL.Widgets.CommonPanel.QueryFormPanel({
	        height: 130,
	        // 查询调用的方法
	        queryMethod: "Js.Center.Business.ECPrepaidLog.queryMainGrid",
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
	                items:[beforedate,operateusername]
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
	                items:[new Ext.form.DateField({
	                    fieldLabel: '结束时间',
	                    name: 'datend',
	                    readOnly: true,
	                    id:'Js.Center.Business.ECPrepaidLog.DatEnd',
	                    // emptyText:new Date().format('Y-m-d H:i:s'),
	                    format: 'Y-m-d',
	                    validateOnBlur: true,
	                	showToday:true,
	                	clearDate:true,
	                    validator: function(){
	                        var strat_time = Ext.get("Js.Center.Business.ECPrepaidLog.DatStart").dom.value;
	                        var end_time = Ext.get("Js.Center.Business.ECPrepaidLog.DatEnd").dom.value;
	                        if (strat_time <= end_time) {
	                            return true;
	                        }
	                        else {
	                            return false;
	                        }
	                    },
	                    invalidText: '结束时间不能小于开始时间！'
	              })]
	            }]
	         }]
	    });
	    //============================================================== 定义查询按钮事件方法
	    Js.Center.Business.ECPrepaidLog.queryMainGrid = function (){
	    	 var datStart = Ext.get("Js.Center.Business.ECPrepaidLog.DatStart").getValue();
	         var datEnd = Ext.get("Js.Center.Business.ECPrepaidLog.DatEnd").getValue();
	         var operateusername = Ext.get("Js.Center.Business.ECPrepaidLog.operateusername").getValue();
	         var numecid = row.get("numecid");
	         var flag='selectdetails';
	         Js.Center.Business.ECPrepaidLog.Infostore.baseParams = {
	        		 numecid: numecid,
	             	 numover: '',
	             	 startdate: datStart,
	             	 enddate: datEnd,
	                 operateusername: operateusername,
	                 flag: flag
	         };
	         Js.Center.Business.ECPrepaidLog.Infostore.load({
	             params: {
	                 start: 0,
	                 limit: _pageSize,
	                 numecid: row.get("numecid"),
	             	 numover: '',
	             	 flag: flag
	             }
	         });
	    };
	    // ---------------------------------------------------- 定义窗体
	    this.window = new WXTL.Widgets.CommonWindows.Window({
		    title: "EC充值详情",
		    id: 'Js.Center.Business.ECPrepaidLog.window',
		    updateState: false,
		    updateRecord: row,
		    updateURL: Js.Center.Business.ECPrepaidLog.ECPrePaidURL,
		    displayStore:  Js.Center.Business.ECPrepaidLog.Infostore,
		    items: [ECSelectPanel,ECPrePaidGrid],
		    needButtons: false,
		    needLoadDataStore:true,
		    closable: false,
		    buttons: [{
		    	text: "关  闭", 
		    	minWidth: 70,
		    	handler: function(){
		    		Js.Center.Business.ECPrepaidLog.window.close();
		    	}
		    }],
		    loadDataStoreFunc: function(){
		    	Js.Center.Business.ECPrepaidLog.Infostore.load({
		    		params: {
		    			start: 0,
		    			limit: _pageSize,
		                numecid: row.get("numecid"),
		             	numover: '',
		                flag: 'selectdetails'
		    		}
		    	});
		    }
	    });

    
    };
};
  