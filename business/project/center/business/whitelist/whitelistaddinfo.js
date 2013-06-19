Ext.namespace('Js.Center.Business.WhitelistAdd');

Js.Center.Business.WhitelistAdd.info = function(node) {

    if (Ext.get("Js.Center.Business.WhitelistAdd.MainPanel") == null) {
        //=============================================================业务下拉列表数据定义

        Js.Center.Common.ServiceCodeStore.reload();
        
        Js.Center.Common.UserGroupSelectStore.reload();
        //============================================================================定义GridPanel相关
        // 分页每页显示数量
        var _pageSize = 12;
        //==============================================================Grid数据定义

        Js.Center.Business.WhitelistAdd.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.WhiteURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ["numsvcid", "vc2backuppath", "vc2mode", "numdepartid", "numlogid", "numuserid", "datcreattime", "datmodifytime", "numtotalnum", "numsuccessnum", "numfailed","vc2filename", "numlisttype", "numsrc", "vc2username", "vc2departname", "numstate", "vc2svcname","vc2name"],
                root: "data",
                id: "numlogid",
                totalProperty: "totalCount"

            }),
            sortInfo: {
                field: 'datcreattime',
                direction: 'DESC'
            }, //解决分组无效代码
            baseParams: {
                flag: 'selectlog',
                datcreattimestart: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
                datcreattimeend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                numtypeid: '0,1'//0
            }
        });
        Js.Center.Business.WhitelistAdd.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize
            }
        });

        //==============================================================列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numlogid"
        });
        //==============================================================列头
        var cm = new Ext.grid.ColumnModel([{
            header: "业务名称",
            tooltip: "业务名称",
            dataIndex: "vc2svcname",
            hidden: "true",
            sortable: true
        }, {
            header: "操作部门",
            tooltip: "操作部门",
            dataIndex: "vc2departname",
            sortable: true
        }, {
            header: "通道组",
            tooltip: "通道组",
            dataIndex: "vc2name",
            sortable: true
        }, {
            header: "总数",
            tooltip: "总数",
            dataIndex: "numtotalnum",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                if(value > 0){
                	if(record.data.numstate == "处理完成"){
                		return "<a href='#' onclick='exportData(\"" +  Js.Center.Business.WhiteURL + "\",\"id=" + record.data.numlogid + "&flag=selectdesc&successtype=-1\")'>"+ value +"</a>";
                	}else{
                		return value;
                	}
                }
                else{
                    return value;
                }
            }
        }, {
            header: "成功数",
            tooltip: "成功数",
            dataIndex: "numsuccessnum",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                if(value > 0){
                    return "<a href='#' onclick='exportData(\"" +  Js.Center.Business.WhiteURL + "\",\"id=" + record.data.numlogid + "&flag=selectdesc&successtype=1\")'>"+ value +"</a>";
                }
                else{
                    return value;
                }
            }
        }, {
            header: "失败数",
            tooltip: "失败数",
            dataIndex: "numfailed",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                if(value > 0){
                    return "<a href='#' onclick='exportData(\"" +  Js.Center.Business.WhiteURL + "\",\"id=" + record.data.numlogid + "&flag=selectdesc&successtype=0\")'>"+ value +"</a>";
                }
                else{
                    return value;
                }
            }
        }, {
            header: "处理状态",
            tooltip: "处理状态",
            dataIndex: "numstate",
            sortable: true
        }, {
            header: "操作类型",
            tooltip: "操作类型",
            dataIndex: "numlisttype",
            sortable: true,
            renderer: function(value) {

                if (value == 0) {
                    return "添加";
                }
                if (value == 1) {
                    return "退出";
                }
            }
        },
        {
            header: "运营商业务编号",
            tooltip: "运营商业务编号",
            dataIndex: "numsvcid",
            sortable: true
        },
        {
            header: "运营商业务名称",
            tooltip: "运营商业务名称",
            dataIndex: "vc2svcname",
            sortable: true
        },
        {
            header: "操作人",
            tooltip: "操作人",
            dataIndex: "vc2username",
            sortable: true
        }, {
            header: "操作时间",
            tooltip: "操作时间",
            dataIndex: "datcreattime",
            sortable: true
}]);
            var AddWhiteListArrInitLoadFunc = new Array();
            AddWhiteListArrInitLoadFunc[0] = "Js.Center.Business.WhitelistAdd.func";
            AddWhiteListArrInitLoadFunc[1] = "Js.Center.Business.WhitelistDelete.func";
            //==============================================================定义grid
            var userGroupGrid = new WXTL.Widgets.CommonGrid.GridPanel({
                id: "whitelistaddGridPanel",
                anchor: '100% 100%',
                pageSize: _pageSize,
                store: Js.Center.Business.WhitelistAdd.Infostore,
                needMenu: false,
                needRightMenu: false,
                otherInitLoadFunc: AddWhiteListArrInitLoadFunc,
                sm: sm,
                cm: cm,
                tbar: new Ext.Toolbar({
                    items: [{
                        iconCls: 'addicon',
                        text: "添加",
                        handler: function() {
                            Js.Center.Business.WhitelistAdd.window.show();
                        }
                    }, {
                        iconCls: 'deleteicon',
                        text: "退出",
                        handler: function() {
                            Js.Center.Business.WhitelistDelete.window.show();
                        }
}]
                    })
                });
                //=============================================================定义formpanel
                var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
                    id: "whitelistaddSelectPanel",
                    bodyStyle: "padding:10px 0 10px 15px",
                    queryMethod: "Js.Center.Business.WhitelistAdd.queryGrid",
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
                            items: [{
                                xtype: "datefield",
                                fieldLabel: "开始时间",
                                format: 'Y-m-d',
                                labelWidth: 100,
                                readOnly: true,
                                emptyText: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
                                fieldLabel: "开始时间",
                                name: "datcreattimestart",
                                id: "whitelistadddatcreattimestart",
                                validateOnBlur: false,
                                validator: function() {
                                    var strat_time = Ext.get("whitelistadddatcreattimestart").dom.value;
                                    var end_time = Ext.get("whitelistadddatcreattimeend").dom.value;
                                    if (strat_time <= end_time) {
                                        return true;
                                    }
                                    else {
                                        return false;
                                    }
                                },
                                invalidText: '结束时间不能小于开始时间！'
                            }, {
                                xtype: "combo",
                                name: "numtype",
                                fieldLabel: "操作类型",
                                hiddenName: "whitelistaddinfovc2type",
                                blankText: "-=请选择=-",
                                readOnly: true,
                                mode: "local",
                                displayField: "vc2name",
                                valueField: "value",
                                triggerAction: "all",
                                emptyText: '-=请选择=-',
                                value: "0,1",
                                store: new Ext.data.SimpleStore({
                                    fields: ["vc2name", "value"],
                                    data: [["-=请选择=-", "0,1"], ["添加", "0"], ["退出", "1"]]
                                })
                            }, {
                                xtype: "hidden",
                                name: "numsvcid",
                                fieldLabel: "运营商业务",
                                hiddenName: "whitelistaddnumsvcid",
                                readOnly: true,
                                mode: "local",
                                displayField: "vc2svcname",
                                valueField: "numsvcid",
                                triggerAction: "all",
                                store: Js.Center.Common.ServiceCodeStore
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
                                items: [{
                                    xtype: "datefield",
                                    fieldLabel: "结束时间",
                                    labelWidth: 100,
                                    format: 'Y-m-d',
                                    readOnly: true,
                                    emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                                    name: "datcreattimeend",
                                    id: "whitelistadddatcreattimeend",
                                    validateOnBlur: false,
                                    validator: function() {
                                        var strat_time = Ext.get("whitelistadddatcreattimestart").dom.value;
                                        var end_time = Ext.get("whitelistadddatcreattimeend").dom.value;
                                        if (strat_time <= end_time) {
                                            return true;
                                        }
                                        else {
                                            return false;
                                        }
                                    },
                                    invalidText: '结束时间不能小于开始时间！'
									}]
								  }]
								 }]
                                });

                                //============================================================== 定义查询按钮事件方法
                                Js.Center.Business.WhitelistAdd.queryGrid = function() {
                                    if (selectPanel.getForm().isValid()) {
                                        var datCreatTimeStart = Ext.get("whitelistadddatcreattimestart").getValue();
                                        var datCreatTimeend = Ext.get("whitelistadddatcreattimeend").getValue();
                                        var _numsvcid = ''; //Ext.get("whitelistaddnumsvcid").getValue();
                                        var numTypeId = Ext.get("whitelistaddinfovc2type").getValue();
                                        var flag = 'selectlog';
                                        Js.Center.Business.WhitelistAdd.Infostore.baseParams = {
                                            flag: flag,
                                            numtypeid: numTypeId, //0,
                                            datcreattimestart: datCreatTimeStart,
                                            datcreattimeend: datCreatTimeend,
                                            numsvcid: _numsvcid
                                        };
                                        Js.Center.Business.WhitelistAdd.Infostore.load({
                                            params: {
                                                start: 0,
                                                limit: _pageSize
                                            }
                                        });
                                    }
                                };

                                //============================================================================定义主panel
                                Js.Center.Business.WhitelistAdd.MainPanel = new Ext.Panel({
                                    id: "Js.Center.Business.WhitelistAdd.MainPanel",
                                    frame: true, // 渲染面板
                                    bodyBorder: false,
                                    border: false,
                                    autoScroll: true, // 自动显示滚动条
                                    layout: "anchor",
                                    defaults: {
                                        collapsible: true // 允许展开和收缩
                                    },
                                    items: [selectPanel, userGroupGrid]
                                });
                            };
                            //============================================================================绑定到center
                            GridMain(node, Js.Center.Business.WhitelistAdd.MainPanel, "openroomiconinfo", "Js.Center.Business.WhitelistAdd.Infostore");
                        };


