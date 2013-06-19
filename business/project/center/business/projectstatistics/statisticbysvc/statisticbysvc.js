Ext.namespace('Js.Center.Business.projectstatistics.statisticbysvc');
Js.Center.Business.projectstatistics.statisticbysvc.info = function(node){
	 if (Ext.get("Js.Center.Business.projectstatistics.statisticbysvc.StatisticsMainPanel") == null) {
	        // ===============================================分页每页显示数量
	        var _pageSize = 200;
	        // ===============================================指定列参数
	        //字段
		    var fields = ["numrowasdf","datstat","vc2svcname","vc2putin","vc2branchcompany","vc2opname","vc2signtype",
		    			  "vc2isbigec","vc2servcode","numbw","numpftype","numcnt","numsuccnt", "numratio"];
	        Js.Center.Business.projectstatistics.SvcInfostore = new WXTL.Widgets.CommonData.GroupingStore({
	            proxy: new Ext.data.HttpProxy({
	                url: Js.Center.Business.projectstatistics.QueryAndExportURL,
	                method: "POST"
	            }),
	            reader: new Ext.data.JsonReader({
	                fields: fields,
	                root: "data",
	                id: "numrowasdf",
	                totalProperty: "totalCount"
	            }),
	            baseParams: {
	            	start: 0,
	            	limit: _pageSize,
	            	datStart: Ext.util.Format.date(WXTL.Common.dateTime.getNow(),'Y-m-d'),
                    datEnd: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                    vc2svcname : '', 	//通道名称
                    numbranchcompany:'',//通道商务归属
                    vc2servcode:'', 	//服务代码
                    numisfeeback: '', 	//直签、返佣
                    numopid : '',		//运营商
                    isbigec:'', 		//是否大EC
    	            statisticType :true,//是否按日统计
    	            optype:'query',
	                flag: 'queryBySerivceCode'
	            },
	            sortInfo: {
	                field: 'datstat',
	                direction: 'asc'
	            }// 解决分组无效代码
	        });
	        Js.Center.Business.projectstatistics.SvcInfostore.load({
	            params: {
	                start: 0,
	                limit: _pageSize
	            }
	        });
		    // ==================================================== 列选择模式
		    var sm = new Ext.grid.CheckboxSelectionModel({
		          dataIndex: "numrowasdf"
		     });
	        // ==================================================== 列头
	        var cm = new Ext.grid.ColumnModel([{
	            dataIndex: "numrowasdf",
	            hidden:true
	        },{
	        	header:"时间",
	        	tooltip:"时间",
	        	dataIndex:"datstat",
	        	sortable:"false"
	        },{
	        	header:"通道名称",
	        	tooltip:"通道名称",
	        	dataIndex:"vc2svcname",
	        	sortable:"true"
	        },{
	        	header:"接入网关",
	        	tooltip:"接入网关",
	        	dataIndex:"vc2putin",
	        	sortable:"true"
	        },{
	        	header:"通道商务归属",
	        	tooltip:"通道商务归属",
	        	dataIndex:"vc2branchcompany",
	        	sortable:"true"
	        },{
	        	header:"运营商",
	        	tooltip:"运营商",
	        	dataIndex:"vc2opname",
	        	sortable:"true"
	        },{
	        	header:"直签/返佣",
	        	tooltip:"直签/返佣",
	        	dataIndex:"vc2signtype",
	        	sortable:"true"
	        },{
	        	header:"是否大EC",
	        	tooltip:"是否大EC",
	        	dataIndex:"vc2isbigec",
	        	sortable:"true"
	        },{
	        	header:"服务代码",
	        	tooltip:"服务代码",
	        	dataIndex:"vc2servcode",
	        	sortable:"true"
	        },{
	        	header:"带宽",
	        	tooltip:"带宽",
	        	dataIndex:"numbw",
	        	sortable:"true"
	        },{
	        	header:"发送量",
	        	tooltip:"发送量",
	        	dataIndex:"numcnt",
	        	sortable:"true"
	        },{
	        	header:"成功数",
	        	tooltip:"成功数",
	        	dataIndex:"numsuccnt",
	        	sortable:"true"
	        },{
	        	header:"成功率",
	        	tooltip:"成功率",
	        	dataIndex:"numratio",
	        	sortable:"true"
	        }
	        ]);
	        
	       var byareaStartdate = new Ext.form.DateField({
			            fieldLabel: "开始时间",
			            format: 'Y-m-d',
			            labelWidth: 100,
			            bodyStyle: 'padding:5px 5px 0',
			            readOnly: true,
			            emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
			            name: "datstart",
			            id: "Js.Center.Business.projectstatistics.statisticbysvc.DatStart",
			            validateOnBlur: false,
			            validator: function(){
			                var strat_time = Ext.get("Js.Center.Business.projectstatistics.statisticbysvc.DatStart").dom.value;
			                var end_time = Ext.get("Js.Center.Business.projectstatistics.statisticbysvc.DatEnd").dom.value;
			                if (strat_time <= end_time) {
					            var arrStd = strat_time.split("-");
				                var arrEnd = end_time.split("-");
				                var stime = new Date(arrStd[0],arrStd[1],arrStd[2]);
								var etime = new Date(arrEnd[0],arrEnd[1],arrEnd[2]);
								var dif = etime.getTime()-stime.getTime();
								if((dif/(24*60*60*1000))<=31){
			    					return true
								}
								else{
								 	this.invalidText = "开始时间到结束时间不能大于31天";
								 	return false;
								 }
			                }
			                else {
			                    return false;
			                }
			            },
			            invalidText: '结束时间不能小于开始时间！'
	        });
	        var byareaEnddate = new Ext.form.DateField({
			            fieldLabel: "结束时间",
			            labelWidth: 100,
			            format: 'Y-m-d',
			            bodyStyle: 'padding:5px 5px 0',
			            readOnly: true,
			            emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
			            name: "datend",
			            id: "Js.Center.Business.projectstatistics.statisticbysvc.DatEnd",
			            validateOnBlur: false,
			            validator: function(){
			                var strat_time = Ext.get("Js.Center.Business.projectstatistics.statisticbysvc.DatStart").dom.value;
			                var end_time = Ext.get("Js.Center.Business.projectstatistics.statisticbysvc.DatEnd").dom.value;
			                if (strat_time <= end_time) {
								return true;
			                }
			                else {
			                    return false;
			                }
			            },
			            invalidText: '结束时间不能小于开始时间！'
	        });
	       //===========================================属地（分公司地区）
		 var AreaCombox = new WXTL.Widgets.CommonForm.ComboBox({
				        xtype: "xComboBox",
				        name: "numbranchcompany",
				        hiddenName: "numbranchcompany",
				        emptyText: "-=请选择=-",
				        //allowBlank: false,
				        blankText: "请选择地区",
				        fieldLabel: "通道商务归属",
				        readOnly: true,
				        mode: "local",
				        displayField: "vc2branchcompany",
				        valueField: "numbranchcompany",
				        triggerAction: "all",
				        store: Js.Center.Common.BranchCompanyStore
		    });
		    Js.Center.Common.BranchCompanyStore.reload();
		    //========================================运营商
		var opidCombox = new WXTL.Widgets.CommonForm.ComboBox({
				        xtype: "xComboBox",
				        name: "numopid",
				        hiddenName: "numopid",
				        emptyText: "-=请选择=-",
				        //allowBlank: false,
				        blankText: "请选择",
				        fieldLabel: "运营商",
				        readOnly: true,
				        mode: "local",
				        displayField: "vc2name",
				        valueField: "numopid",
				        triggerAction: "all",
				        store: Js.Center.Common.StatOperatorStore
	    });
	    //==========================================直签/返佣
	     var svctypeCombox = new WXTL.Widgets.CommonForm.ComboBox({
	       				xtype: "xComboBox",
	                    name: "numisfeeback",
	                    hiddenName: "numisfeeback",
	                    fieldLabel: "直签/返佣",
	                    readOnly: true,
	                    mode: "local",
	                    displayField: "show",
	                    valueField: "value",
	                    triggerAction: "all",
	                    emptyText: "-=请选择=-",
	                    store: new Ext.data.SimpleStore({
	                        fields: ["show", "value"],
	                        data: [["-=请选择=-", ""],["直签", "0"],["返佣", "1"]]
	                    })
	       });
	    var isbigecCombox = new WXTL.Widgets.CommonForm.ComboBox({
	                	xtype: "xComboBox",
	                    name: "vc2isbigec",
	                    hiddenName: "vc2isbigec",
	                    fieldLabel: "是否大EC",
	                    readOnly: true,
	                    mode: "local",
	                    displayField: "show",
	                    //allowBlank:false,
	                    valueField: "value",
	                    triggerAction: "all",
	                    emptyText: "-=请选择=-",
	                    store: new Ext.data.SimpleStore({
	                        fields: ["show", "value"],
	                        data: [["-=请选择=-", ""], ["是", "1"], ["否", "0"]]
	                    })
	                });
	    
		// ============================================================================
		// 定义SelectFormPanel
	    var StatisticsSelectPanel= new WXTL.Widgets.CommonPanel.QueryFormPanel({
	        height: 200,
	        // 查询调用的方法
	        queryMethod: "Js.Center.Business.projectstatistics.statisticbysvc.queryMainGrid",
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
	                items:[
	                	byareaStartdate,
	                	{
	            			xtype:"textfield",
	            			name:"vc2svcname",
	            			id:"Js.Center.Business.projectstatistics.statisticbysvc.vc2svcname",
	            			fieldLabel:"通道名称",
	            			maxLength:20,
		                	regex:WXTL.Common.regex.Illegal,
		                    regexText:WXTL.Common.regexText.IllegalText
	            		},{
		                	xtype:"textfield",
		                	fieldLabel:"服务代码",
		                	name:"vc2servcode",
		                	id:"Js.Center.Business.projectstatistics.statisticbysvc.vc2servcode",
		                	maxLength:20,
		                	regex: WXTL.Common.regex.Illegal,
		                    regexText: WXTL.Common.regexText.IllegalText
	                	},
	                	opidCombox,
	                	{
	            			xtype:"checkbox",
	            			fieldLabel:"是否按日统计",
	            			checked:true,
	            			name : "statisticbyday",
	            			id:"Js.Center.Business.projectstatistics.statisticbysvc.statisticbyday"
	            		}
	                	
	                ]
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
	            	items:[
	            		byareaEnddate,
	            		AreaCombox,
	            		svctypeCombox,
	            		isbigecCombox
	                ]
	            }]
	         }]
	    });
        //============================================================== 定义查询按钮事件方法
	    Js.Center.Business.projectstatistics.statisticbysvc.queryMainGrid = function(){
            if (StatisticsSelectPanel.getForm().isValid()) {
                var _datstart = Ext.get("Js.Center.Business.projectstatistics.statisticbysvc.DatStart").getValue();
                var _datend = Ext.get("Js.Center.Business.projectstatistics.statisticbysvc.DatEnd").getValue();
                //通道名称
                var _vc2svcname = Ext.get("Js.Center.Business.projectstatistics.statisticbysvc.vc2svcname").getValue();
                //通道商务归属
                var _numbranchcompany = AreaCombox.getValue();
                //服务代码
                var _vc2servcode = Ext.get("Js.Center.Business.projectstatistics.statisticbysvc.vc2servcode").getValue();
                //直签、返佣             
                var _numisfeeback = svctypeCombox.getValue();
                //运营商
                var _numopid = opidCombox.getValue();
                //是否大EC
                var _isbigec = isbigecCombox.getValue();

                var _statisticbyday = Ext.get("Js.Center.Business.projectstatistics.statisticbysvc.statisticbyday").dom.checked;
                var flag = 'queryBySerivceCode';
                var optype = 'query';
                Js.Center.Business.projectstatistics.SvcInfostore.baseParams = {
                	start:0,
                	limit:_pageSize,
    	           	datStart : _datstart,
                    datEnd : _datend,
                    vc2svcname : _vc2svcname, 			//通道名称
                    numbranchcompany: _numbranchcompany,//通道商务归属
                    vc2servcode:_vc2servcode, 		//服务代码
                    numisfeeback:_numisfeeback, 	//直签、返佣
                    numopid : _numopid,				//运营商
                    isbigec: _isbigec, 				//是否大EC
    	            statisticType : _statisticbyday,//是否按日统计
    	            optype : optype,
                    flag: flag
                };
                Js.Center.Business.projectstatistics.SvcInfostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
	    // ==============================================================定义grid
	    var StatisticsQueryInfoGrid = new WXTL.Widgets.CommonGrid.GridPanel({
	        anchor: '100% 100%',
	        pageSize: _pageSize,
	        needMenu: false,
	        store: Js.Center.Business.projectstatistics.SvcInfostore,
	        sm: sm,
	        cm: cm,
	        needRightMenu: false,
			needLoadFunc: false,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'editicon',
                    text: "导出",
                    handler: function(){
                    	if (StatisticsSelectPanel.getForm().isValid()) {
	                    	var params = Js.Center.Business.projectstatistics.QueryAndExportURL+"?";
	                    	params += "flag=queryBySerivceCode";
	                    	params += "&start=0";
	                    	params += "&limit="+_pageSize;
	                    	params += "&datStart="+Ext.get("Js.Center.Business.projectstatistics.statisticbysvc.DatStart").getValue();
	                    	params += "&datEnd="+Ext.get("Js.Center.Business.projectstatistics.statisticbysvc.DatEnd").getValue();
							params += "&vc2svcname="+ encodeURI(Ext.get("Js.Center.Business.projectstatistics.statisticbysvc.vc2svcname").getValue());
	                		params += "&isbigec="+ isbigecCombox.getValue();
	                		params += "&numbranchcompany="+ AreaCombox.getValue();
	                		params += "&vc2servcode="+ encodeURI(Ext.get("Js.Center.Business.projectstatistics.statisticbysvc.vc2servcode").getValue());
	                		params += "&numopid="+ opidCombox.getValue();
	                    	params += "&numisfeeback="+svctypeCombox.getValue();
	                    	params += "&statisticType="+Ext.get("Js.Center.Business.projectstatistics.statisticbysvc.statisticbyday").dom.checked;
	                    	params += "&optype=export";
	                    	windowOpen(params);
                    	};
                    }
                }]
            })
	    });
		// ============================================================================定义主panel
		Js.Center.Business.projectstatistics.statisticbysvc.StatisticsMainPanel = new Ext.Panel({
	        frame: true, // 渲染面板
	        id: "Js.Center.Business.projectstatistics.statisticbysvc.StatisticsMainPanel",
	        bodyBorder: false,
	        border: false,
	        autoScroll: true, // 自动显示滚动条
	        layout: "anchor",
	        defaults: {
	            collapsible: true // 允许展开和收缩
	        },
	        items: [StatisticsSelectPanel,StatisticsQueryInfoGrid]
	    });
	};
	
	GridMain(node,Js.Center.Business.projectstatistics.statisticbysvc.StatisticsMainPanel, "openroomiconinfo","Js.Center.Business.projectstatistics.SvcInfostore");
};