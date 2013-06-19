/*
*短信二审
*
*/

Ext.namespace('Js.Center.SendSMS.intracompanycheck');
var sPanel;
var sGridPanel;
 // 分页每页显示数量
var _pageSize = 12;
var temp = [{"name":"HY-1","value":"银行、证券、保险、基金、电子支付"},
			{"name":"HY-2","value":"证券、期货、基金"},
			{"name":"HY-3","value":"所有行业"},
			{"name":"HY-4","value":"电子商务、会员网站"},
			{"name":"HY-5","value":"政府通知"},
			{"name":"YX-1","value":"银行卡会员、高端俱乐部会员、健身卡会员"},
			{"name":"YX-2","value":"商超会员"},
			{"name":"YX-3","value":"为获取新增用户而盲发的营销信息、投资理财、正规网站推广、院线信息"},
			{"name":"YX-4","value":"会所、夜总会、SPA机构、医药、营养品"},
			{"name":"YX-5","value":"房产、教育、贷款、移民"},
			{"name":"YX-6","value":"通道批发广告，运营商之间竞争信息"}];
Js.Center.SendSMS.intracompanycheck.info = function(node){
    
    if (Ext.get("Js.Center.SendSMS.intracompanycheck.MainPanel") == null) {
    	
        //=============================================================定义查询panel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            labelWidth: 80,
            height: 150,
            collapsed: false,
            //查询调用的方法            
            queryMethod: "Js.Center.SendSMS.intracompanycheck.queryGrid",
            items: [{
                layout: 'column',
                items: [ {
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
                        id: 'Js.Center.SendSMS.intracompanycheck.DatStart',
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                        format: 'Y-m-d',
						readOnly:true,
                        validateOnBlur: false,
                        validator: function(){
                            var strat_time = Ext.get("Js.Center.SendSMS.intracompanycheck.DatStart").dom.value;
                            var end_time = Ext.get("Js.Center.SendSMS.intracompanycheck.DatEnd").dom.value;
                            if (strat_time <= end_time) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        },
                        invalidText: '结束时间不能小于开始时间！'
                    }), {
                        xtype: "textfield",
                        name: "sendnum",
                        id: "Js.Center.SendSMS.intracompanycheck.sendnum",
                        fieldLabel: "发送条数",
		                regex: WXTL.Common.regex.Integer,
		                regexText: "只能输入数字"
                    }, {
	                	xtype: "combo",
	                    name: "ordernumtype",
	                    fieldLabel: "发送量排序",
	                    hiddenName: "ordernumtype",
	                    id: "Js.Center.SendSMS.intracompanycheck.ordernumtype",
	                    readOnly: true,
	                    mode: "local",
	                    displayField: "show",
	                    valueField: "value",
	                    ableCheckField: "ck",
	                    checkField:"unchecked",
	                    triggerAction: "all",
	                    emptyText: "-=请选择=-",
	                    store: new Ext.data.SimpleStore({
	                        fields: ["show", "value"],
	                        data: [["-=请选择=-", ""], ["升序", "asc"], ["降序", "desc"]]
	                    })
	                }]
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
                        id: 'Js.Center.SendSMS.intracompanycheck.DatEnd',
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                        format: 'Y-m-d',
						readOnly:true,
                        validateOnBlur: false,
                        validator: function(){
                            var strat_time = Ext.get("Js.Center.SendSMS.intracompanycheck.DatStart").dom.value;
                            var end_time = Ext.get("Js.Center.SendSMS.intracompanycheck.DatEnd").dom.value;
                            if (strat_time <= end_time) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        },
                        invalidText: '结束时间不能小于开始时间！'
                    }), {
	                	xtype: "lovcombo",
	                    name: "gatewaylevel",
	                    fieldLabel: "网关等级",
	                    hiddenName: "gatewaylevel",
	                    id: "Js.Center.SendSMS.intracompanycheck.gatewaylevel",
	                    readOnly: true,
	                    mode: "local",
	                    displayField: "show",
	                    valueField: "value",
	                    ableCheckField: "ck",
	                    checkField:"unchecked",
	                    triggerAction: "all",
	                    emptyText: "-=请选择=-",
	                    store: new Ext.data.SimpleStore({
	                        fields: ["show", "value", "ck"],
	                        data: [["行业信息", "", "0"], ["HY-1", "HY-1","1"], ["HY-2", "HY-2","1"], ["HY-3", "HY-3","1"], ["HY-4", "HY-4","1"], ["HY-5", "HY-5","1"], ["营销信息", "", "0"], ["YX-1", "YX-1","1"], ["YX-2", "YX-2","1"], ["YX-3", "YX-3","1"], ["YX-4", "YX-4","1"], ["YX-5", "YX-5","1"]]
	                    }),
	                    //重写初始化方法
					    initComponent:function() {
							if(!this.tpl) {
								this.tpl = 
									 '<tpl for="."><div class="x-combo-list-item">' 
									+'<tpl if="values.' + this.ableCheckField + ' != 0">'
									+'<img src="' + Ext.BLANK_IMAGE_URL + '" '
									+'class="ux-lovcombo-icon ux-lovcombo-icon-'
									+'{[values.' + this.checkField + '?"checked":"unchecked"' + ']}">'
									+'</tpl>'
									+'<div class="ux-lovcombo-item-text">{' + (this.displayField || 'text' )+ '}</div>'
									+'</div></tpl>';
							}
					 
					        Ext.ux.form.LovCombo.superclass.initComponent.apply(this, arguments);

					        this.on({
								 scope:this
								,beforequery:this.onBeforeQuery
								,blur:this.onRealBlur
							});
					
							this.onLoad = this.onLoad.createSequence(function() {
								if(this.el) {
									var v = this.el.dom.value;
									this.el.dom.value = '';
									this.el.dom.value = v;
								}
							});
					    },
	                	onSelect:function(record, index) {
	                        if(this.fireEvent('beforeselect', this, record, index) !== false){
	                        	if(record.data["value"]){
									record.set(this.checkField, !record.get(this.checkField));
									if(this.store.isFiltered()) {
										this.doQuery(this.allQuery);
									}
									this.setValue(this.getCheckedValue());
						            this.fireEvent('select', this, record, index);
	                        	}
	                        }
	                	}
	                }]
                }]
            }]
        });
        //=============================================================定义formpanel
        var examinePanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            title: "信息审核",
            labelWidth: 80,
            needButtons: false,
            height: 250,
            collapsed: false,
            //查询调用的方法
            queryMethod: "Js.Center.SendSMS.intracompanycheck.queryGrid",
            items: [{
                layout: 'column',
                items: [{
                    xtype: "hidden",
                    name: "numcontentid",
                    id: "Js.Center.SendSMS.intracompanycheck.NumContentID"
                }, {
                    xtype: "hidden",
                    name: "flag",
                    id: "Js.Center.SendSMS.intracompanycheck.Flag",
                    value: "secondcheck"
                }, {
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    //锚点布局-
                    defaults: {
                        anchor: "80%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:10px 0 10px 15px",
                    items: [{
                        xtype: 'textfield',
                        name: 'numsendtypename',
                        id: "Js.Center.SendSMS.intracompanycheck.SendTypeName",
                        readOnly: true,
                        fieldLabel: '发送类型',
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        name: 'vc2username',
                        id: "Js.Center.SendSMS.intracompanycheck.SendUser",
                        readOnly: true,
                        fieldLabel: '发送人',
                        allowBlank: false
                    }, {
                        xtype: 'textarea',
                        name: 'vc2content',
                        id: "Js.Center.SendSMS.intracompanycheck.Content",
                        readOnly: true,
                        fieldLabel: '信息内容',
                        allowBlank: false,
                        blankText: "请选择审核信息"
                    }]
                }, {
                    columnWidth: .5,
                    layout: 'form',
                    defaultType: "textfield",
                    //锚点布局-
                    defaults: {
                        anchor: "80%",
                        msgTarget: "side"
                    },
                    buttonAlign: "center",
                    bodyStyle: "padding:10px 0 10px 15px",
                    items: [{
                        xtype: 'textfield',
                        name: 'datsend',
                        id: "Js.Center.SendSMS.intracompanycheck.DatSend",
                        readOnly: true,
                        fieldLabel: '发送时间',
                        allowBlank: false,
                        blankText: "请选择审核信息"
                    }, {
                        xtype: 'textarea',
                        name: 'vc2reason',
                        id: "Js.Center.SendSMS.intracompanycheck.Reason",
                        fieldLabel: '审核建议',
                        allowBlank:false,
                        blankText:"请填写审核建议",
                        value:"通过",
                        regex: WXTL.Common.regex.IllegalDiy,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 200,
                        maxLengthText: '长度应小于等于200',
                        validator: function(){
	                        var word = Ext.get("Js.Center.SendSMS.intracompanycheck.Reason").dom.value;
	                        if (isExistsHtmlLable(word)) {
	                            return false;
	                        } else {
                            	return true;
                            }
                        },
                        invalidText: '帧文字不能包含HTML标签'
                    }]
                }, {
                    columnWidth: 1,
                    layout: 'form',
                    //锚点布局-
                    defaults: {
                        anchor: "95%",
                        msgTarget: "side"
                    },
                    bodyStyle: "padding:0px 0 10px 15px",
                    items: [{
                        html:"<div id='Js.Center.SendSMS.intracompanycheck.MobileListInfo'></div>"
                    }]
                }, {
                    columnWidth: 1,
                    layout: 'form',
                    //defaultType: "textfield",
                    //锚点布局-
                    defaults: {
                        anchor: "95%",
                        msgTarget: "side"
                    },
                    bodyStyle: "padding:0px 0 10px 15px",
                    items: [{
                        html:"<div id='Js.Center.SendSMS.intracompanycheck.gatewayLevelInfo'></div>"
                    }]
                }]
            }],
            buttons: [new Ext.Button({
                text: '通过',
                handler: function(){
					secondCheckDoPass("-10");
				} 
            }), new Ext.Button({
                text: '驳回',
                handler: function(){
					secondCheckDoReject("-10");
				} 
            })]
        });
        
        sPanel = examinePanel;
        
        //==============================================================Grid数据定义
        Js.Center.SendSMS.intracompanycheck.infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SendSMS.YXTSmsContentURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ["numcontentid", "vc2content", "datsend", "vc2status", "numstate", "nummessageformat", "numsendmethod", "numpriority", "vc2detail", "numcheck", "vc2reason", "datcreate", "numcreaterid", "datpresend", "numcheck1id", "datcheck1", "numcheck2id", "datcheck2", "numprenum", "numprodid", "numsource", "numsendtype", "vc2typelist", "numstatename", "numsendtypename", "nummessageformatname", "vc2longcode", "vc2username", "username1", "username2", "vc2departname","numtotal","numsuccess","numfailed"],
                root: "data",
                id: "numlogid",
                totalProperty: "totalCount"
            
            }),//解决分组无效代码
            baseParams: {
                flag: 'selectinnercheckbykey',
                state: "1",
                numsendtype: "1,2,3,4,5,9",
                gatewaylevel: "",
                datstart: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                datend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                sendnum: ""
            }
        });
        Js.Center.SendSMS.intracompanycheck.infostore.reload({
            params: {
                start: 0,
                limit: _pageSize
            },
            callback: function(records, options, success){
                if (Js.Center.SendSMS.intracompanycheck.infostore.getCount() > 0) {
                    secondCheckDoView(0);
                }
            }
        });
        //=========================================================定义返回网关编号（服务号码），网关级别
         Js.Center.SendSMS.intracompanycheck.gwinfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SendSMS.YXTSmsContentURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ["numprodid","vc2servcode", "vc2level"],
                root: "data",
                id: "vc2servcode",
                totalProperty: "totalCount"
            
            }),//解决分组无效代码
            baseParams: {
                flag: 'selectgwbykey',
                gatewaylevel: "",
                numprodid: ""
            }
        });
      
        //==============================================================列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numcolumnid"
        });
        //==============================================================列头
        var cm = new Ext.grid.ColumnModel([sm, {
            header: "短信内容",
            tooltip: "短信内容",
            dataIndex: "vc2content",
            sortable: true
        }, {
            header: "发送人",
            tooltip: "发送人",
            dataIndex: "vc2username",
            sortable: true
        }, {
            header: "部门",
            tooltip: "部门",
            dataIndex: "vc2departname",
            sortable: true
        }, {
            header: "发送类型",
            tooltip: "发送类型",
            dataIndex: "numsendtypename",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
            	var row =  Js.Center.SendSMS.intracompanycheck.infostore.getAt(rowIndex);
                if(row.get("numsendtype") == 2 ){
                	return "<a href='#' onclick='Js.Center.SendSMS.SMSSendUserGroupDetails.func(\"" + row.get("numcontentid") + "\")'>客户组</a>";
                }
                return row.get("numsendtypename");
            }
        }, {
            header: "发送时间",
            tooltip: "发送时间",
            dataIndex: "datsend",
            sortable: true
        }, {
            header: "拟发送量",
            tooltip: "拟发送量",
            dataIndex: "numprenum",
            sortable: false
        }, {
            header: "审核状态",
            tooltip: "审核状态",
            dataIndex: "numstatename",
            sortable: true
        }, {
            header: "一审时间",
            tooltip: "一审时间",
            dataIndex: "datcheck1",
            sortable: true
        },{
            header: "内容类型",
            tooltip: "内容类型",
            dataIndex: "nummessageformatname",
            sortable: true
        }, {
            header: "创建时间",
            tooltip: "创建时间",
            dataIndex: "datcreate",
            sortable: true
        }, {
            header: "操作",
            tooltip: "操作",
            dataIndex: "numsvcid",
            width: 80,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                return "<a href='#' onclick='secondCheckDoView(\"" + rowIndex + "\")'>查看</a>";//　<a href='#' onclick='secondCheckDoReject(\"" + rowIndex + "\")'>驳回</a>
            }
        }, {
            header: "<font color='green'>合法</font>/<font color='red'>非法</font>",
            tooltip: "合法/非法",
            dataIndex: "numcontentid",
            width: 100,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                var row =  Js.Center.SendSMS.intracompanycheck.infostore.getAt(rowIndex);
                var suc = "<font color='green'>"+ row.get("numsuccess") +"</font>";
                var fail = "/<font color='red'>"+ row.get("numfailed") +"</font>";
                
                if(row.get("numsendtype") == 5 || row.get("numsendtype") == 9 || row.get("numsendtype") == 4){
                    suc = row.get("numsuccess")>0?"<a href='#' onclick='exportData(\"" + Js.Center.SendSMS.SmsContentURL + "\",\"id=" + value + "&flag=selectexport&successtype=1\")'><font color='green'>"+ row.get("numsuccess") +"</font></a>" : "<font color='green'>"+ row.get("numsuccess") +"</font>";
                    fail = row.get("numfailed")>0? "/<a href='#' onclick='exportData(\"" + Js.Center.SendSMS.SmsContentURL + "\",\"id=" + value + "&flag=selectexport&successtype=0\")'><font color='red'>"+ row.get("numfailed") +"</font></a>" : "/<font color='red'>"+ row.get("numfailed") +"</font>";
                } else if(row.get("numsendtype") == 2){
                    var suc = "<font color='green'>"+ row.get("numtotal") +"</font>";
                }
                return suc + fail;
            }
        }]);
        
        //==============================================================定义grid
        var gridPanel = new WXTL.Widgets.CommonGrid.GridPanel({
            title: "短信二审列表",
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.SendSMS.intracompanycheck.infostore,
            needMenu: false,
            sm: sm,
            cm: cm,
            needRightMenu: false,
            listeners: {
                "rowclick": function(grid, rowindex, e){
                    secondCheckDoView(rowindex);
                }
            }
        });
        
        sGridPanel = gridPanel;
        //============================================================================ 定义formpanel
        //============================================================== 定义查询按钮事件方法
        Js.Center.SendSMS.intracompanycheck.queryGrid = function(){
        	examinePanel.getForm().reset();
            if (Ext.getCmp("Js.Center.SendSMS.intracompanycheck.sendnum").isValid()) {
	            var datstart = Ext.get("Js.Center.SendSMS.intracompanycheck.DatStart").getValue();
	            var datend = Ext.get("Js.Center.SendSMS.intracompanycheck.DatEnd").getValue();
	            var sendnum = Ext.get("Js.Center.SendSMS.intracompanycheck.sendnum").getValue();
	            var gatewaylevel = Ext.getCmp("Js.Center.SendSMS.intracompanycheck.gatewaylevel").getCheckedValue();
	            var ordernumtype = Ext.getCmp("Js.Center.SendSMS.intracompanycheck.ordernumtype").getValue();
	            if(!sendnum){
	            	sendnum = "";
	            }
	            Js.Center.SendSMS.intracompanycheck.infostore.baseParams = {
	                gatewaylevel: gatewaylevel,
	                sendnum: sendnum,
	                datstart: datstart,
	                datend: datend,
	                state: "1",
	                numsendtype: "1,2,3,4,5,9",
	                vc2content: "",
	                ordernumtype: ordernumtype,
	                flag: "selectinnercheckbykey"
	            };
	            Js.Center.SendSMS.intracompanycheck.infostore.load({
	                params: {
	                    start: 0,
	                    limit: _pageSize
	                },
		            callback: function(records, options, success){
		                secondCheckDoView(0);
		            }
	            });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.SendSMS.intracompanycheck.MainPanel = new Ext.Panel({
            id: "Js.Center.SendSMS.intracompanycheck.MainPanel",
            frame: true,
            bodyBorder: false,
            border: false,
            autoScroll: true,
            layout: "anchor",
            defaults: {
                collapsible: true
            },
            items: [selectPanel, examinePanel, gridPanel]
        })
    };
    //============================================================================绑定到center
    GridMain(node, Js.Center.SendSMS.intracompanycheck.MainPanel, "openroomiconinfo", "Js.Center.SendSMS.intracompanycheck.infostore", "secondDoView()");
};

function secondDoView(){
    Js.Center.SendSMS.intracompanycheck.infostore.reload({
        params: {
            start: 0,
            limit: 12
        },
        callback: function(records, options, success){
            if (Js.Center.SendSMS.intracompanycheck.infostore.getCount() > 0) {
                secondCheckDoView(0);
            }
        }
    });
};

//审核通过方法
function secondCheckDoPass( rowindex){
	if(rowindex != "-10"){
		secondCheckDoView(rowindex);
	}
    if (sPanel.getForm().isValid()) {
        Ext.get("Js.Center.SendSMS.intracompanycheck.Flag").dom.value = "secondcheck";
        // 弹出效果
        Ext.MessageBox.show({
            msg: '正在保存，请稍等...',
            progressText: 'Saving...',
            width: 300,
            wait: true,
            icon: 'download',
            animEl: 'saving'
        });
        setTimeout(function(){
            Ext.MessageBox.hide();
        }, 300000);
        //得到选中行
        var row = sGridPanel.getSelectionModel().getSelections();
	    var deleteSplit = "";
	    if(0 == row.length){
	    	deleteSplit = Ext.get("Js.Center.SendSMS.intracompanycheck.NumContentID").dom.value;
	    } else {
		    for (var i = 0; i < row.length; i++) {
	            if (i < (row.length - 1)) {
	                deleteSplit = row[i].data.numcontentid + "," + deleteSplit;
	            }
	            if (i == (row.length - 1)) {
	                deleteSplit = deleteSplit + row[i].data.numcontentid;
	            }
		    }
	    }
        var params = {
            flag: "secondcheck",
            contentids: deleteSplit,
            vc2content: Ext.get("Js.Center.SendSMS.intracompanycheck.Content").dom.value,
            vc2username: Ext.get("Js.Center.SendSMS.intracompanycheck.SendUser").dom.value,
            datsend: Ext.get("Js.Center.SendSMS.intracompanycheck.DatSend").dom.value,
            numsendtypename: Ext.get("Js.Center.SendSMS.intracompanycheck.SendTypeName").dom.value,
            vc2reason: Ext.get("Js.Center.SendSMS.intracompanycheck.Reason").dom.value
        };
        doAjaxSubmit(Js.Center.SendSMS.YXTSmsContentURL, params,sendSMSCallBack);
    }
};
//审核驳回方法
function secondCheckDoReject(rowindex){
	if(rowindex != "-10"){
		secondCheckDoView(rowindex);
	}
	if(Ext.get("Js.Center.SendSMS.intracompanycheck.Reason").dom.value.replace(/[ ]/g,"")  == "通过"){
         Ext.get("Js.Center.SendSMS.intracompanycheck.Reason").dom.value = "";   
    }
    if (sPanel.getForm().isValid()) {
        Ext.get("Js.Center.SendSMS.intracompanycheck.Flag").dom.value = "rejectcheck";
        // 弹出效果
        Ext.MessageBox.show({
            msg: '正在保存，请稍等...',
            progressText: 'Saving...',
            width: 300,
            wait: true,
            icon: 'download',
            animEl: 'saving'
        });
        setTimeout(function(){
            Ext.MessageBox.hide();
        }, 300000);
        //得到选中行
        var row = sGridPanel.getSelectionModel().getSelections();
	    var deleteSplit = "";
	    if(0 == row.length){
	    	deleteSplit = Ext.get("Js.Center.SendSMS.intracompanycheck.NumContentID").dom.value;
	    } else {
		    for (var i = 0; i < row.length; i++) {
	            if (i < (row.length - 1)) {
	                deleteSplit = row[i].data.numcontentid + "," + deleteSplit;
	            }
	            if (i == (row.length - 1)) {
	                deleteSplit = deleteSplit + row[i].data.numcontentid;
	            }
		    }
	    }
        var params = {
            flag: "rejectcheck",
            contentids: deleteSplit,
            vc2content: Ext.get("Js.Center.SendSMS.intracompanycheck.Content").dom.value,
            vc2username: Ext.get("Js.Center.SendSMS.intracompanycheck.SendUser").dom.value,
            datsend: Ext.get("Js.Center.SendSMS.intracompanycheck.DatSend").dom.value,
            numsendtypename: Ext.get("Js.Center.SendSMS.intracompanycheck.SendTypeName").dom.value,
            vc2reason: Ext.get("Js.Center.SendSMS.intracompanycheck.Reason").dom.value
        };
        doAjaxSubmit(Js.Center.SendSMS.YXTSmsContentURL, params,sendSMSCallBack);
    }
};
/**
 * 审核、驳回---回调函数
 */
function sendSMSCallBack(){
	Js.Center.SendSMS.intracompanycheck.infostore.reload({
        params: {
            start: 0,
            limit: _pageSize
        },
        callback: function(records, options, success){
            sPanel.getForm().reset();
            secondCheckDoView(0);
        }
   });
}

//异步请求后刷新列表
function secondCheckDoView(rowIndex){
    if (Js.Center.SendSMS.intracompanycheck.infostore.getCount() > 0) {
        var row = Js.Center.SendSMS.intracompanycheck.infostore.getAt(rowIndex);
        var sucRate;
        var mobileTotalInfo = "总数<font color='green'>"+ row.get("numtotal") + "个</font>";
        var mobileSucInfo = "合法数<font color='green'>"+ row.get("numsuccess") + "个</font>";
        var mobileFailInfo = "非法数<font color='green'>"+ row.get("numfailed") + "个</font>";
        if(row.get("numtotal") != "" && row.get("numtotal") != 0){
            sucRate = row.get("numsuccess")/row.get("numtotal")*10000 /100;
        }
        else{
            sucRate = 0;
        }
        if(sucRate.toString().length > 5){
            sucRate = sucRate.toString().substring(0,5);
        }
        
        Ext.get("Js.Center.SendSMS.intracompanycheck.NumContentID").dom.value = row.get("numcontentid");
        Ext.get("Js.Center.SendSMS.intracompanycheck.Content").dom.value = row.get("vc2content");
        Ext.get("Js.Center.SendSMS.intracompanycheck.SendUser").dom.value = row.get("vc2username");
        Ext.get("Js.Center.SendSMS.intracompanycheck.DatSend").dom.value = row.get("datsend");
        Ext.get("Js.Center.SendSMS.intracompanycheck.SendTypeName").dom.value = row.get("numsendtypename");
        Ext.get("Js.Center.SendSMS.intracompanycheck.Reason").dom.value = "通过";
        
        if(row.get("numsendtype") == 5 || row.get("numsendtype") == 9 || row.get("numsendtype")==4){
            if(row.get("numtotal") > 0){
                mobileTotalInfo = "总数<a href='#' onclick='exportData(\"" + Js.Center.SendSMS.SmsContentURL + "\",\"id=" + row.get("numcontentid") + "&flag=selectexport&successtype=-1\")'><font color='green'>"+ row.get("numtotal") + "个</font></a> ";
            }
            if(row.get("numsuccess") > 0){
                mobileSucInfo = "合法数<a href='#' onclick='exportData(\"" + Js.Center.SendSMS.SmsContentURL + "\",\"id=" + row.get("numcontentid") + "&flag=selectexport&successtype=1\")'><font color='green'>"+ row.get("numsuccess") + "个</font></a> ";
            }
            if(row.get("numfailed") > 0){
                mobileFailInfo = "非法数<a href='#' onclick='exportData(\"" + Js.Center.SendSMS.SmsContentURL + "\",\"id=" + row.get("numcontentid") + "&flag=selectexport&successtype=0\")'><font color='green'>"+ row.get("numfailed") + "个</font></a> ";
            }
        } else if(row.get("numsendtype") == 2){
            if(row.get("numtotal") > 0){
                mobileTotalInfo = "总数<font color='green'>"+ row.get("numtotal") + "个</font> ";
                mobileSucInfo = "合法数<font color='green'>"+ row.get("numtotal") + "个</font> ";
            }
            if(row.get("numfailed") > 0){
                mobileFailInfo = "非法数<font color='green'>"+ row.get("numfailed") + "个</font> ";
            }
            sucRate = 100;
        }
        Ext.get("Js.Center.SendSMS.intracompanycheck.MobileListInfo").dom.innerHTML = "号码分布情况：" + mobileTotalInfo+"，"+ mobileSucInfo +"，"+ mobileFailInfo +"，"+ "合法率<font color='red'>"+sucRate+"%</font>";
        
        
        Js.Center.SendSMS.intracompanycheck.gwinfostore.baseParams = {
	                gatewaylevel: Ext.getCmp("Js.Center.SendSMS.intracompanycheck.gatewaylevel").getCheckedValue(),
	                numprodid: row.get("numprodid"),
	                flag: "selectgwbykey"
	            };
	    Js.Center.SendSMS.intracompanycheck.gwinfostore.load({
	                params: {
	                    start: 0,
	                    limit: _pageSize
	                },
	                callback: function(records, options, success){
						if (Js.Center.SendSMS.intracompanycheck.gwinfostore.getTotalCount()>0)
					   {
						    var gwrow = Js.Center.SendSMS.intracompanycheck.gwinfostore.getAt(0);
							var levelContent = '';
					        var level = gwrow.get("vc2level").split(",");
					        if (gwrow.get("vc2level").length> 0)
					        {
					        	levelContent = "通道号:" +gwrow.get("vc2servcode")+ " ";
					        	 for(var i = 0; i < temp.length; i++){
						        	for(var j = 0; j < level.length; j++){
						        		if(level[j] == temp[i]["name"]){
						        			levelContent += level[j] + ": " +  temp[i]["value"] + "; ";
						        		}
						        	}
						        }
					        }
					       Ext.get("Js.Center.SendSMS.intracompanycheck.gatewayLevelInfo").dom.innerHTML = "网关级别： " + levelContent;
					   }
		            }
	            }); 
	          
    }
};

function doAjaxSubmit(url, params, callBackFun){
    Ext.Ajax.request({
        url: url,
        method: "POST",
        params: params,
        success: function(form, action){
            var obj = Ext.util.JSON.decode(form.responseText);
            var falg = obj.success;
            if (falg == true) {
                Ext.Msg.alert("温馨提示", "操作已成功!");
                callBackFun();
            } else {
                if (!obj.success && obj.info == "对不起，您没有登录！") {
                    Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
                        window.location.href = "login.htm";
                    });
                } else {
                    Ext.Msg.alert('温馨提示', obj.info);
            		callBackFun();
                }
            }        
        },
        failure: function(form, action){
            var objJson = Ext.util.JSON.decode(action.response.responseText);
            Ext.Msg.alert('温馨提示', objJson.info);
        }
    });
};