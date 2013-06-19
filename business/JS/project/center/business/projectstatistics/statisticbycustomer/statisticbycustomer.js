Ext.namespace('Js.Center.Business.projectstatistics.statisticbycust');
Js.Center.Business.projectstatistics.statisticbycust.info = function(node){
	 if (Ext.get("Js.Center.Business.projectstatistics.statisticbycust.StatisticsMainPanel") == null) {
	        // ===============================================分页每页显示数量
	        var _pageSize = 200;
	        // ===============================================指定列参数
	        //字段
		    var fields = ["numrowasdf","datstat", "vc2area", "vc2ecname",
				"vc2type", "vc2svcname", "vc2servcode", "vc2opname", "vc2signtype","numsubcnt",
				"numcnt","numsuccnt", "numratio","numsubcnt"];
	        Js.Center.Business.projectstatistics.CustInfostore = new WXTL.Widgets.CommonData.GroupingStore({
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
                    numarea:'',//属地
                    customername : '', //客户名称
                    vc2svctype : '', //短彩类型ID
                    numisfeeback: '', //直签、返佣
					vc2servcode:'',
                    numopid : '',
                    vc2svcname : '',
    	            statisticType :true,
    	            optype:'query',
	                flag: 'queryByCustomer'
	            },
	            sortInfo: {
	                field: 'datstat',
	                direction: 'asc'
	            }// 解决分组无效代码
	        });
	        Js.Center.Business.projectstatistics.CustInfostore.load({
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
	        	header:"属地",
	        	tooltip:"属地",
	        	dataIndex:"vc2area",
	        	sortable:"true"
	        },{
	        	header:"客户名称",
	        	tooltip:"客户名称",
	        	dataIndex:"vc2ecname",
	        	sortable:"true"
	        },{
	        	header:"短彩类型",
	        	tooltip:"短彩类型",
	        	dataIndex:"vc2type",
	        	sortable:"true"
	        },{
	        	header:"通道名称",
	        	tooltip:"通道名称",
	        	dataIndex:"vc2svcname",
	        	sortable:"true"
	        },{
	        	header:"服务代码",
	        	tooltip:"服务代码",
	        	dataIndex:"vc2servcode",
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
	        	header:"提交量",
	        	tooltip:"提交量",
	        	dataIndex:"numsubcnt",
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
			            id: "Js.Center.Business.projectstatistics.statisticbycust.DatStart",
			            validateOnBlur: false,
			            validator: function(){
			                var strat_time = Ext.get("Js.Center.Business.projectstatistics.statisticbycust.DatStart").dom.value;
			                var end_time = Ext.get("Js.Center.Business.projectstatistics.statisticbycust.DatEnd").dom.value;
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
			            id: "Js.Center.Business.projectstatistics.statisticbycust.DatEnd",
			            validateOnBlur: false,
			            validator: function(){
			                var strat_time = Ext.get("Js.Center.Business.projectstatistics.statisticbycust.DatStart").dom.value;
			                var end_time = Ext.get("Js.Center.Business.projectstatistics.statisticbycust.DatEnd").dom.value;
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
				        name: "numarea",
				        hiddenName: "numarea",
				        emptyText: "-=请选择=-",
				        allowBlank: true,
				        blankText: "请选择地区",
				        fieldLabel: "属地",
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
	    var vc2typeCombox = new WXTL.Widgets.CommonForm.ComboBox({
	                	xtype: "xComboBox",
	                    name: "vc2type",
	                    hiddenName: "vc2type",
	                    fieldLabel: "短彩类型",
	                    readOnly: true,
	                    mode: "local",
	                    displayField: "show",
	                    //allowBlank:false,
	                    valueField: "value",
	                    triggerAction: "all",
	                    emptyText: "-=请选择=-",
	                    store: new Ext.data.SimpleStore({
	                        fields: ["show", "value"],
	                        data: [["-=请选择=-", ""], ["短信", "1"], ["彩信", "2"]]
	                    })
	                });
	    
		// ============================================================================
		// 定义SelectFormPanel
	    var StatisticsSelectPanel= new WXTL.Widgets.CommonPanel.QueryFormPanel({
	        height: 200,
	        // 查询调用的方法
	        queryMethod: "Js.Center.Business.projectstatistics.statisticbycust.queryMainGrid",
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
	                	fieldLabel:"客户名称",
	                	name:"customername",
	                	id:"Js.Center.Business.projectstatistics.statisticbycust.customername",
	                	maxLength:20,
	                	regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText
	                },{
	                	xtype:"textfield",
	                	fieldLabel:"服务代码",
	                	name:"vc2servcode",
	                	id:"Js.Center.Business.projectstatistics.statisticbycust.vc2servcode",
	                	maxLength:20,
	                	regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText
	                },
	                vc2typeCombox,
	                svctypeCombox
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
	            		opidCombox,
	            		{
	            			xtype:"textfield",
	            			name:"vc2svcname",
	            			id:"Js.Center.Business.projectstatistics.statisticbycust.vc2svcname",
	            			fieldLabel:"通道名称",
	                		maxLength:20,
	                		regex: WXTL.Common.regex.Illegal,
	                    	regexText: WXTL.Common.regexText.IllegalText
	            		},{
	            			xtype:"checkbox",
	            			fieldLabel:"是否按日统计",
	            			checked:true,
	            			name : "statisticbyday",
	            			id:"Js.Center.Business.projectstatistics.statisticbycust.statisticbyday"
	            		}
	                ]
	            }]
	         }]
	    });
        //============================================================== 定义查询按钮事件方法
	    Js.Center.Business.projectstatistics.statisticbycust.queryMainGrid = function(){
            if (StatisticsSelectPanel.getForm().isValid()) {
                var _datstart = Ext.get("Js.Center.Business.projectstatistics.statisticbycust.DatStart").getValue();
                var _datend = Ext.get("Js.Center.Business.projectstatistics.statisticbycust.DatEnd").getValue();
                var _customername = Ext.get("Js.Center.Business.projectstatistics.statisticbycust.customername").getValue();
                
                var _numisfeeback = svctypeCombox.getValue();
                var _vc2type = vc2typeCombox.getValue();
                var _numarea = AreaCombox.getValue();
                var _vc2servcode = Ext.get("Js.Center.Business.projectstatistics.statisticbycust.vc2servcode").getValue();
                var _numopid = opidCombox.getValue();
                var _vc2svcname = Ext.get("Js.Center.Business.projectstatistics.statisticbycust.vc2svcname").getValue();
                
                var _statisticbyday = Ext.get("Js.Center.Business.projectstatistics.statisticbycust.statisticbyday").dom.checked;
                var flag = 'queryByCustomer';
                var optype = 'query';
                Js.Center.Business.projectstatistics.CustInfostore.baseParams = {
                	start:0,
                	limit:_pageSize,
    	           	datStart : _datstart,
                    datEnd : _datend,
                    numarea:_numarea,//属地
                    customername : _customername, //客户名称
                    vc2svctype : _vc2type, //短彩类型ID
                    numisfeeback: _numisfeeback, //直签、返佣
					vc2servcode:_vc2servcode,
                    numopid : _numopid,
                    vc2svcname : _vc2svcname,
    	            statisticType : _statisticbyday,
    	            optype : optype,
                    flag: flag
                };
                Js.Center.Business.projectstatistics.CustInfostore.load({
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
	        store: Js.Center.Business.projectstatistics.CustInfostore,
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
	                    	params += "flag=queryByCustomer";
	                    	params += "&start=0";
	                    	params += "&limit="+_pageSize;
	                    	params += "&datStart="+Ext.get("Js.Center.Business.projectstatistics.statisticbycust.DatStart").getValue();
	                    	params += "&datEnd="+Ext.get("Js.Center.Business.projectstatistics.statisticbycust.DatEnd").getValue();
	                    	params += "&customername="+encodeURI(Ext.get("Js.Center.Business.projectstatistics.statisticbycust.customername").getValue());
	                		params += "&vc2svctype="+ vc2typeCombox.getValue();
	                		params += "&numarea="+ AreaCombox.getValue();
	                		params += "&vc2servcode="+ encodeURI(Ext.get("Js.Center.Business.projectstatistics.statisticbycust.vc2servcode").getValue());
	                		params += "&numopid="+ opidCombox.getValue();
	                    	params += "&numisfeeback="+svctypeCombox.getValue();
	                    	params += "&vc2svcname="+ encodeURI(Ext.get("Js.Center.Business.projectstatistics.statisticbycust.vc2svcname").getValue());
	                    	params += "&statisticType="+Ext.get("Js.Center.Business.projectstatistics.statisticbycust.statisticbyday").dom.checked;
	                    	params += "&optype=export";
	                    	windowOpen(params);
                    	};
                    }
                }]
            })
	    });
		// ============================================================================定义主panel
		Js.Center.Business.projectstatistics.statisticbycust.StatisticsMainPanel = new Ext.Panel({
	        frame: true, // 渲染面板
	        id: "Js.Center.Business.projectstatistics.statisticbycust.StatisticsMainPanel",
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
	
	GridMain(node,Js.Center.Business.projectstatistics.statisticbycust.StatisticsMainPanel, "openroomiconinfo","Js.Center.Business.projectstatistics.CustInfostore");
};