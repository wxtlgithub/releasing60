Ext.namespace('Js.Center.Business.ECmanage');
Js.Center.Business.ECmanage.info = function(node){
	
	 if (Ext.get("Js.Center.Business.ECmanage.ECMainPanel") == null) {
		 Js.Center.Common.OperatorStore.reload();
		 Js.Center.Common.EcSignTypeStore.reload();
	        // =======================================================================
			// 定义GridPanel相关
	        // ===============================================分页每页显示数量
	        var _pageSize = 12;
	        // ===============================================指定列参数
	        //字段
		    var fields = [ "numrowasdf","numecid", "vc2ecid", "vc2ecname", "numstatus",
		   				"numdepartid", "numismas", "numindustry", "numsvctype","numpftype",
						"vc2area", "vc2area1","vc2manager", "numcustype", "numlevel","vclevel",
						"numlimited", "vc2chargetype", "vc2fullname", "vc2oapic",
						"vc2conperson", "vc2contact", "datinsert","numisfeeback","numsigntype","numsigntypeid","vc2typename"];
	        Js.Center.Business.ECmanage.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
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
	        Js.Center.Business.ECmanage.Infostore.load({
	            params: {
	                start: 0,
	                limit: _pageSize,
	                vc2ecid: '',
	                flag: 'selectecbysearchkey'
	            }
	        });
	        //=============================================下拉列表绑定 （运营商）
	        var opidCombox = new WXTL.Widgets.CommonForm.ComboBox({
		        xtype: "xComboBox",
		        name: "numopida",
		        hiddenName: "numopida",
		        emptyText: "-=请选择=-",
		        allowBlank: true,
		        blankText: "请选择",
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
	        var cm = new Ext.grid.ColumnModel([
	        {
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
	            header: "直签/返佣",
	            tooltip: "直签/返佣",
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
	            header: "计入商务归属地",
	            tooltip: "计入商务归属地",
	            dataIndex: "vc2area1",
	            sortable: true
	        },{
	            header: "接入商务",
	            tooltip: "接入商务",
	            dataIndex: "vc2manager",
	            sortable: true
	        },{
	            header: "签名类型",
	            tooltip: "签名类型",
	            dataIndex: "vc2typename",
	            sortable: true
	        },{
	            header: "操作",
	            tooltip: "操作",
	            dataIndex: "numecid",
	            sortable: true,
	            renderer: function(value, meta, record, rowIndex,colIndex, store){
	                return "<a href='#' onclick='Js.Center.Business.ECmanage.selectEcInfoDetail(\"" + value + "\")'>详细</a>";
	            }
	        }
	        ]);
		// ============================================================================
		// 定义SelectFormPanel
	    var ECSelectPanel= new WXTL.Widgets.CommonPanel.QueryFormPanel({
	        height: 160,
	        // 查询调用的方法
	        queryMethod: "Js.Center.Business.ECmanage.queryMainGrid",
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
	                    xtype: "textfield",
	                    name: "Js.Center.Business.ECmanage.vc2ecid",
	                    id: 'Js.Center.Business.ECmanage.vc2ecid',
	                    fieldLabel: "EC编号",
	                    maxLength: 20,
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText
	                },{
	                    xtype: "combo",
	                    name: "NUMSVCTYPE",
	                    id :"Js.Center.Business.ECmanage.NUMSVCTYPE",
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
		             },opidCombox
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
	            	items:[{
	                    xtype: "textfield",
	                    name: "Js.Center.Business.ECmanage.vc2ecname",
	                    id: 'Js.Center.Business.ECmanage.vc2ecname',
	                    fieldLabel: "简称",
	                    maxLength: 20,
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText
	                },{
		            	xtype: "textfield",
	                    name: "NUMSUBCODE",
	                    id: 'Js.Center.Business.ECmanage.NUMSUBCODE',
	                    fieldLabel: "扩展码",
	                    maxLength: 20,
	                    regex: WXTL.Common.regex.Illegal,
	                    regexText: WXTL.Common.regexText.IllegalText
		             }
	                ]
	            }]
	         }]
	    });
        //============================================================== 定义查询按钮事件方法
	    Js.Center.Business.ECmanage.queryMainGrid = function(){
            if (ECSelectPanel.getForm().isValid()) {
                var vc2ecid = Ext.get("Js.Center.Business.ECmanage.vc2ecid").getValue();
                var vc2ecname = Ext.get("Js.Center.Business.ECmanage.vc2ecname").getValue();
                var NUMSVCTYPE = Ext.getCmp("Js.Center.Business.ECmanage.NUMSVCTYPE").getValue();
                var NUMSUBCODE = Ext.get("Js.Center.Business.ECmanage.NUMSUBCODE").getValue();
                var opid = opidCombox.getValue();
                var flag = 'selectecbysearchkey';
                Js.Center.Business.ECmanage.Infostore.baseParams = {
    	            vc2ecid: vc2ecid,
    	            vc2ecname:vc2ecname,
    	            NUMSVCTYPE:NUMSVCTYPE,//短彩类型
    	            NUMSUBCODE:NUMSUBCODE,//扩展子码
    	            opid:opid,//运营商ID
                    flag: flag
                };
                Js.Center.Business.ECmanage.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
	    // ==============================================================定义grid
        var ecmanage_arrInitLoadFunc = new Array();
        ecmanage_arrInitLoadFunc[0] = "Js.Center.Business.ECservice.func";
        ecmanage_arrInitLoadFunc[1] = "Js.Center.Business.ECserviceAdd.func";
        ecmanage_arrInitLoadFunc[2] = "Js.Center.Business.ECmanageDetail.func";
        ecmanage_arrInitLoadFunc[3] = "Js.Center.Business.ECsignture.func";
        ecmanage_arrInitLoadFunc[4] = "Js.Center.Business.ECsigntureAdd.func";
        ecmanage_arrInitLoadFunc[5] = "Js.Center.Business.ECsigntureUpdate.func";
        //ecmanage_arrInitLoadFunc[6] = "Js.Center.Business.ECsigntureDelete.func";
	    var EcQueryInfoGrid = new WXTL.Widgets.CommonGrid.GridPanel({
	        // id: "MTQueryinfoGridPanel",
	        anchor: '100% 100%',
	        pageSize: _pageSize,
	        needMenu: false,
	        store: Js.Center.Business.ECmanage.Infostore,
	        sm: sm,
	        cm: cm,
	        needRightMenu: false,
            //但字段修改路径定义
            afterEditURL: Js.Center.Business.UserGroupUpdateURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.Business.ECmanage.EcAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.Business.ECmanage.EcUpdate',
             //其他需要预加载函数
			otherInitLoadFunc: ecmanage_arrInitLoadFunc,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "添加",
                    handler: function(){
                    	EcQueryInfoGrid.doInsert();
                    }
                }, "", "-", "",{
                    iconCls: 'editicon',
                    text: "修改",
                    handler: function(){
                    	EcQueryInfoGrid.doEdit();                    
                    }
                }, "", "-", "",{
                    iconCls: 'editicon',
                    text: "业务管理",
                    handler: function(){
            			var row = EcQueryInfoGrid.getSelectionModel().getSelections();
		    			if (row.length == 0) {
		    				Ext.Msg.alert("提示信息", "请您选择一条记录!");
		    			} else if (row.length > 1) {
		    				Ext.Msg.alert("提示信息", "对不起只能选择一个!");
		    			} else if (row.length == 1) {
	                   	    Js.Center.Business.ECservice.window.updateRecord=row[0];
	                        Js.Center.Business.ECservice.window.show(); 
	                		Ext.apply(Js.Center.Business.ECservice.Infostore.baseParams, {ecId : row[0].get('numecid'), flag : 'selectbykey' });
	                        Js.Center.Business.ECservice.Infostore.load({
	                			params : {
	                				start : 0,
	                				limit : 12,	
	                				ecId : row[0].get('numecid'),
	                				flag : 'selectbykey'
	                			}
	                		});
		    			} 
                    }
                }, "", "-", "",{
                    iconCls: 'editicon',
                    text: "报备签名",
                    handler: function(){
            			var row = EcQueryInfoGrid.getSelectionModel().getSelections();
		    			if (row.length == 0) {
		    				Ext.Msg.alert("提示信息", "请您选择一条记录!");
		    			} else if (row.length > 1) {
		    				Ext.Msg.alert("提示信息", "对不起只能选择一个!");
		    			} else if (row.length == 1) {
	                   	    Js.Center.Business.ECsignture.window.updateRecord=row[0];
	                   	    //Js.Center.Business.ECsignture.window.loadRecord(row[0]);
	                        Js.Center.Business.ECsignture.window.show(); 
//	                		Ext.apply(Js.Center.Business.ECsignture.Infostore.baseParams, {ecId : row[0].get('numecid'), flag : 'selectbykey' });
//	                        Js.Center.Business.ECsignture.Infostore.load({
//	                			params : {
//	                				start : 0,
//	                				limit : 12,	
//	                				ecId : row[0].get('numecid'),
//	                				flag : 'selectbykey'
//	                			}
//	                		});
		    			} 
                    }
                }]
            })
	    });
		// ============================================================================定义主panel
		Js.Center.Business.ECmanage.ECMainPanel = new Ext.Panel({
	        frame: true, // 渲染面板
	        id: "Js.Center.Business.ECmanage.ECMainPanel",
	        bodyBorder: false,
	        border: false,
	        autoScroll: true, // 自动显示滚动条
	        layout: "anchor",
	        defaults: {
	            collapsible: true // 允许展开和收缩
	        },
	        items: [ECSelectPanel,EcQueryInfoGrid]
	    });
	};
	
	GridMain(node,Js.Center.Business.ECmanage.ECMainPanel, "openroomiconinfo","Js.Center.Business.ECmanage.Infostore");
	Js.Center.Business.ECmanage.selectEcInfoDetail = function(rowValue) {
		var row = EcQueryInfoGrid.getSelectionModel().getSelections();
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