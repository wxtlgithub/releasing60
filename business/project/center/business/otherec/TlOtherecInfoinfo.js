Ext.namespace('Js.Center.Business.OtherEC.OtherMana');
Js.Center.Business.OtherEC.OtherMana.tlotherecinfoinfo = function(node) {
	 if (Ext.get("Js.Center.Business.OtherEC.OtherMana.MainPanel") == null) {
	        var _pageSize = 12;
		    var fields = ["numseqid","vc2ecid","vc2ecfullname","vc2shortname","vc2ismas","vc2industry",
						  "vc2custype","vc2gwtype","vc2status","vc2opname","vc2servcode","vc2manager",
						  "numcuslevel","vc2feemode","vc2subcode","vc2conperson","vc2contact","numlimit",
						  "numfeearea","numbusarea","vc2svc","vc2feetype","vc2feerule","vc2putintime",
						  "vc2gwputin","vc2gwfeerule","vc2validflag","vc2signname","vc2branchcompany"];
	        Js.Center.Business.OtherEC.ECInfostore = new WXTL.Widgets.CommonData.GroupingStore({
	            proxy: new Ext.data.HttpProxy({
	                url: Js.Center.OtherEC.OtherECURL,
	                method: "POST"
	            }),
	            reader: new Ext.data.JsonReader({
	                fields: fields,
	                root: "data",
	                id: "numrowasdf",
	                totalProperty: "totalCount"
	            }),
	            baseParams: {
                 	vc2gwtype : '',
                    vc2opname : '',
                    vc2ecname : '',
                	vc2servcode:'',
    	            optype:'query',
	                flag: 'queryOtherEcList'
	            },
	            sortInfo: {
	                field: 'numseqid',
	                direction: 'DESC'
	            }
	        });
	        Js.Center.Business.OtherEC.ECInfostore.load({
	            params: {
	                start: 0,
	                limit: _pageSize
	            }
	        });
		    var sm = new Ext.grid.CheckboxSelectionModel({
		          dataIndex: "numrowasdf"
		     });
	        var cm = new Ext.grid.ColumnModel([{
	            dataIndex: "numseqid",
	            hidden:true
	        },{
    			header: "ECID",
			    tooltip: "ECID",
			    dataIndex: "vc2ecid",
			    sortable: true,
			    editor: new Ext.form.TextField
    		}, {
			    header: "短彩类型",
			    tooltip: "短彩类型",
			    dataIndex: "vc2gwtype",
			    sortable: true,
			    editor: new Ext.form.TextField
			},{
			    header: "运营商",
			    tooltip: "运营商",
			    dataIndex: "vc2opname",
			    sortable: true,
			    editor: new Ext.form.TextField
			},{
			    header: "服务代码",
			    tooltip: "服务代码",
			    dataIndex: "vc2servcode",
			    sortable: true,
			    editor: new Ext.form.TextField
			},{
			    header: "EC简称",
			    tooltip: "EC简称",
			    dataIndex: "vc2shortname",
			    sortable: true,
			    editor: new Ext.form.TextField
			},{
			    header: "归属地区",
			    tooltip: "归属地区",
			    dataIndex: "vc2branchcompany",
			    sortable: true,
			    editor: new Ext.form.TextField
			},
			{
	            header: "详细",
	            tooltip: "",
	            dataIndex: "numseqid",
	            sortable: true,
	            renderer: function(value, meta, record, rowIndex,colIndex, store){
	                return "<a href='#' onclick='Js.Center.Business.OtherEC.OtherEcInfoDetailShow (\"" + record + "\")'>详细</a>";
	            }
	        }
	        ]);
	        
	    var vc2gwtypeCombox = new WXTL.Widgets.CommonForm.ComboBox({
        	xtype: "xComboBox",
            name: "vc2gwtype",
            hiddenName: "vc2gwtype",
            fieldLabel: "短彩类型",
            readOnly: true,
            mode: "local",
            displayField: "show",
            allowBlank:true,
            valueField: "value",
            triggerAction: "all",
            emptyText: "-=请选择=-",
            store: new Ext.data.SimpleStore({
                fields: ["show", "value"],
                data: [["-=请选择=-", ""], ["短信", "短信"], ["彩信", "彩信"]]
            })
        });

        var opidCombox = new WXTL.Widgets.CommonForm.ComboBox({
				        xtype: "xComboBox",
				        name: "numopid",
				        hiddenName: "numopid",
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
		Js.Center.Common.OperatorStore.reload();
		
		//SelectFormPanel
	    var OtherEcInfoSelectPanel= new WXTL.Widgets.CommonPanel.QueryFormPanel({
	        height: 160,
	        queryMethod: "Js.Center.Business.OtherEC.OtherMana.queryMainGrid",
	        items: [{
	            layout: 'column',
	            items: [
	                {
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
	               	 	vc2gwtypeCombox,
	               	 	{	xtype:"textfield",
		                	fieldLabel:"服务代码",
		                	name:"vc2servcode",
		                	id:"Js.Center.Business.OtherEC.OtherMana.vc2servcode",
		                	maxLength:20,
		                	regex: WXTL.Common.regex.Illegal,
		                    regexText: WXTL.Common.regexText.IllegalText
	               	 	}
	                ]
	            },{
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    defaults: {
                        anchor: "90%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:10px 0 10px 15px",
	            	items:[opidCombox,
	            		{
		                	xtype:"textfield",
		                	fieldLabel:"EC简称",
		                	name:"customername",
		                	id:"Js.Center.Business.OtherEC.OtherMana.customername",
		                	maxLength:20,
		                	regex: WXTL.Common.regex.Illegal,
		                    regexText: WXTL.Common.regexText.IllegalText
	                }
	                ]
	            }]
	         }]
	    });

	    Js.Center.Business.OtherEC.OtherMana.queryMainGrid = function(){
            if (OtherEcInfoSelectPanel.getForm().isValid()) {
                var _vc2gwtype = vc2gwtypeCombox.getValue();
                var _vc2opname = opidCombox.getRawValue();//Ext.get("numopid").getValue();
                var _vc2ecname = Ext.get("Js.Center.Business.OtherEC.OtherMana.customername").getValue();
                var _vc2servcode = Ext.get("Js.Center.Business.OtherEC.OtherMana.vc2servcode").getValue();
                var flag = 'queryOtherEcList';
                var optype = 'query';
                Js.Center.Business.OtherEC.ECInfostore.baseParams = {
                	vc2gwtype: _vc2gwtype,
                	vc2opname: _vc2opname,
                	vc2ecname :_vc2ecname,
                	vc2servcode: _vc2servcode,
                    flag: flag,
                    optype:optype
                };
                Js.Center.Business.OtherEC.ECInfostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        var otherec_arrInitLoadFunc = new Array();
        otherec_arrInitLoadFunc[0] = "Js.Center.Business.OtherEC.OtherEcAdd.func";
        otherec_arrInitLoadFunc[1] = "Js.Center.Business.OtherEC.OtherEcUpdate.func";
        otherec_arrInitLoadFunc[2] = "Js.Center.Business.OtherEC.OtherEcInfoDetail.func";
	    var OtherECQueryInfoGrid = new WXTL.Widgets.CommonGrid.GridPanel({
	        anchor: '100% 100%',
	        pageSize: _pageSize,
	        needMenu: false,
	        store: Js.Center.Business.OtherEC.ECInfostore,
	        sm: sm,
	        cm: cm,
	        needRightMenu: false,
            afterEditURL: Js.Center.OtherEC.OtherECURL,
            inertMethod: 'Js.Center.Business.OtherEC.OtherEcAdd',
            updateMethod: 'Js.Center.Business.OtherEC.OtherEcUpdate',
            deleteMethod: 'Js.Center.Business.OtherEC.OtherEcDelete',
			otherInitLoadFunc: otherec_arrInitLoadFunc,
            //needLoadFunc: false,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "增加",
                    handler: function(){
                    	OtherECQueryInfoGrid.doInsert();
                    }
                }, "", "-", "",{
                    iconCls: 'editicon',
                    text: "修改",
                    handler: function(){
                    	OtherECQueryInfoGrid.doEdit();                    
                    }
                }, "", "-", "",{
                    iconCls: 'deleteicon',
                    text: "删除",
                    handler: function(){
                        var row = OtherECQueryInfoGrid.getSelectionModel().getSelections();
                        if (row.length == 0) {
                            Ext.Msg.alert("温馨提示", "请您选择记录!");
                        }
                        else {
                            Ext.Msg.confirm("温馨提示!", "您确认要删除吗？", function(btn){
                                if (btn == "yes") {
                                     Js.Center.Business.OtherEC.OtherEcDelete.func(row);
                                }
                            }); 
                        }
                    }
            	}, "", "-", "",{
                    iconCls: 'editicon',
                    text: "导出",
                    handler: function(){
                    	var params = Js.Center.OtherEC.OtherECURL+"?";
                    	params += "start=0&limit=-1&optype=export&flag=queryOtherEcList";
                    	params += "&vc2gwtype=" + encodeURI(vc2gwtypeCombox.getValue());
                		params += "&vc2opname=" + encodeURI(opidCombox.getRawValue());
                		params += "&vc2ecname=" + encodeURI(Ext.get("Js.Center.Business.OtherEC.OtherMana.customername").getValue());
                		params += "&vc2servcode="+encodeURI(Ext.get("Js.Center.Business.OtherEC.OtherMana.vc2servcode").getValue());
                    	windowOpen(params);
                    }
                }]
            })
	    });
		Js.Center.Business.OtherEC.OtherMana.MainPanel = new Ext.Panel({
	        frame: true,
	        id: "Js.Center.Business.OtherEC.OtherMana.MainPanel",
	        bodyBorder: false,
	        border: false,
	        autoScroll: true,
	        layout: "anchor",
	        defaults: {
	            collapsible: true
	        },
	        items: [OtherEcInfoSelectPanel,OtherECQueryInfoGrid]
	    });
	};
	GridMain(node,Js.Center.Business.OtherEC.OtherMana.MainPanel, "openroomiconinfo","Js.Center.Business.OtherEC.ECInfostore");
	Js.Center.Business.OtherEC.OtherEcInfoDetailShow = function(rowValue) {
		var row = OtherECQueryInfoGrid.getSelectionModel().getSelections();
		Js.Center.Business.OtherEC.OtherEcInfoDetail.window.updateRecord = row[0];
		Js.Center.Business.OtherEC.OtherEcInfoDetail.window.mainForm.loadRecord(row[0]);
		Js.Center.Business.OtherEC.OtherEcInfoDetail.window.show();
	};
};
  