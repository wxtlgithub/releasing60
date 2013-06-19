/**
 * 客户业务查询
 * @author Administrator
 */
Ext.namespace('Js.Center.Customer.CustomerBusiness');

Js.Center.Customer.CustomerBusiness.CustomerBusinessInfo = function(node, row) {

    Js.Center.Customer.CustomerBusiness.flag = "selectcusbymobile";

    if (Ext.get("Js.Center.Customer.CustomerBusiness.CustomerBusinessPanel") == null) {
        // ======================================================================= 定义GridPanel相关
        // ===============================================分页每页显示数量
        var _pageSize = 12; //客户基本信息
        var _columnPageSize = 12; //栏目信息
        var _cusGroupPageSize = 12; //客户组信息
        var _whitePageSize = 12; //白名单信息
        var _blackPageSize = 12; //黑名单信息
        var _userblackPageSize = 12; //用户黑名单信息
        var _smsPageSize = 12; //短信发送记录信息
        // ===============================================指定列参数

        //客户基本信息
        var fields = ["numcustomerid", "vc2accountcode", "vc2customername", "numsex", "datbirthday", "vc2mobile", "vc2idcard", "vc2shcode", "numcustomersrc", "numtype", "vc2dcode", "vc2phone", "numcreator", "datcreatetime", "vc2departname", "vc2branchname"];
        //栏目信息
        var columnfields = ["numcolumnid", "vc2columnname", "vc2mobile", "vc2accountcode", "numtype", "datcreattime", "vc2username", "vc2departname", "numneedaccountcode", "vc2code"];
        //客户组信息

        var cusGroupfields = ["numusergroupid", "vc2mobile", "numtype", "vc2usergroupname", "datcreattime", "vc2username", "vc2departname"];
        //白名单信息

        var whitefields = ["numsvcid", "vc2mobile", "vc2svcname", "datcreatetime"];
        //黑名单信息
        var blackfields = ["numsvcid", "vc2mobile", "vc2svcname", "datcreate", "numtype"];

        //用户黑名单信息
        var userblackfields = ["vc2mobile", "numlistid", "datcreattime", "numtype", "vc2username", "numuserid", "numdepartid"];

        //上下行记录信息

        var smsfields = ["service", "vc2mobile", "content", "vtype", "datetime", "vc2svcname", "vc2reportstatus", "vc2reporterrorcode"];

        //限制查询条件的方法

        var queryData = function(infostore, grid, flaginfo) {
            if (Ext.get("cusbusimobile").getValue() == '') {
                Ext.Msg.alert("温馨提示", "请输入查询条件！");
                return false;
            }
            else {
                if (selectPanel.getForm().isValid()) {
                    infostore.baseParams = {
                        vc2mobile: Ext.get("cusbusimobile").getValue(),
                        vc2accountcode: "",
                        flag: flaginfo
                    };
                    return true;
                }
            }
        };
        //================================================定义Grid数据
        //================客户基本信息
        Js.Center.Customer.CustomerBusiness.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Customer.CustomerBusinessURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numcustomerid",
                totalProperty: "totalCount"

            }),
            sortInfo: {
                field: 'datcreatetime',
                direction: 'DESC'
            }, //解决分组无效代码
            listeners: {
                "beforeload": function(Store, options) {
                    //return queryData(Js.Center.Customer.CustomerBusiness.Infostore, customergrid, 'selectcusbymobile');
                }
            },
            baseParams: {
                vc2mobile: '',
                vc2accountcode: '',
                flag: 'selectcusbymobile'
            }
        });

        //===============栏目信息
        Js.Center.Customer.CustomerBusiness.ColumnInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Customer.CustomerBusinessURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: columnfields,
                root: "data",
                //id: "numcolumnid",
                totalProperty: "totalCount"

            }),
            sortInfo: {
                field: 'datcreattime',
                direction: 'DESC'
            }, //解决分组无效代码
            listeners: {
                "beforeload": function(Store, options) {
                    return queryData(Js.Center.Customer.CustomerBusiness.ColumnInfostore, gridPanel, 'selectcolumnbymobile');
                }
            },
            baseParams: {
                vc2mobile: '',
                vc2accountcode: '',
                flag: 'selectcolumnbymobile'
            }
        });
        //===============客户组信息

        Js.Center.Customer.CustomerBusiness.CusgroupInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Customer.CustomerBusinessURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: cusGroupfields,
                root: "data",
                id: "numusergroupid",
                totalProperty: "totalCount"

            }),
            sortInfo: {
                field: 'datcreattime',
                direction: 'DESC'
            }, //解决分组无效代码
            listeners: {
                "beforeload": function(Store, options) {
                    return queryData(Js.Center.Customer.CustomerBusiness.CusgroupInfostore, cusgroupgrid, 'selectcusgroupbymobile');
                }
            },
            baseParams: {
                vc2mobile: '',
                vc2accountcode: '',
                flag: 'selectcusgroupbymobile'
            }
        });
        //===============白名单信息

        Js.Center.Customer.CustomerBusiness.WhiteInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Customer.CustomerBusinessURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: whitefields,
                root: "data",
                id: "numsvcid",
                totalProperty: "totalCount"

            }),
            sortInfo: {
                field: 'datcreatetime',
                direction: 'DESC'
            }, //解决分组无效代码
            listeners: {
                "beforeload": function(Store, options) {
                    return queryData(Js.Center.Customer.CustomerBusiness.WhiteInfostore, whitegrid, 'selectwhitebymobile');
                }
            },
            baseParams: {
                vc2mobile: '',
                vc2accountcode: '',
                flag: 'selectwhitebymobile'
            }
        });
        //===============黑名单信息

        Js.Center.Customer.CustomerBusiness.BlackInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Customer.CustomerBusinessURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: blackfields,
                root: "data",
                id: "numseqid",
                totalProperty: "totalCount"

            }),
            sortInfo: {
                field: 'datcreate',
                direction: 'DESC'
            }, //解决分组无效代码
            listeners: {
                "beforeload": function(Store, options) {
                    return queryData(Js.Center.Customer.CustomerBusiness.BlackInfostore, blackgrid, 'selectblackbymobile');
                }
            },
            baseParams: {
                vc2mobile: '',
                vc2accountcode: '',
                flag: 'selectblackbymobile'
            }
        });

        //===============用户黑名单信息

        Js.Center.Customer.CustomerBusiness.UserBlackInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Customer.CustomerBusinessURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: userblackfields,
                root: "data",
                id: "numsvcid",
                totalProperty: "totalCount"

            }),
            sortInfo: {
                field: 'datcreattime',
                direction: 'DESC'
            }, //解决分组无效代码
            listeners: {
                "beforeload": function(Store, options) {
                    return queryData(Js.Center.Customer.CustomerBusiness.UserBlackInfostore, userblackgrid, 'selectuserblackbymobile');
                }
            },
            baseParams: {
                vc2mobile: '',
                vc2accountcode: '',
                flag: 'selectuserblackbymobile'
            }
        });
        //===============短信发送记录信息

        Js.Center.Customer.CustomerBusiness.SmsInfostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Customer.CustomerBusinessURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: smsfields,
                root: "data",
                //id: "service",
                totalProperty: "totalCount"

            }),
            sortInfo: {
                field: 'datetime',
                direction: 'DESC'
            }, //解决分组无效代码
            listeners: {
                "beforeload": function(Store, options) {
                    return queryData(Js.Center.Customer.CustomerBusiness.SmsInfostore, smsgrid, 'selectsendbymobile');
                }
            },
            baseParams: {
                vc2mobile: '',
                vc2accountcode: '',
                flag: 'selectsendbymobile'
            }
        });

        // ==================================================== 列选择模式
        //用户基本信息
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numcustomerid"
        });

        //栏目信息
        var _columnsm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numcolumnid"
        });
        //客户组信息

        var _cusgroupsm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numusergroupid"
        });
        //白名单信息

        var _whitesm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numsvcid"
        });
        //黑名单信息

        var _blacksm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numsvcid"
        });
        //用户黑名单信息

        var _userblacksm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numlistid"
        });
        //上下行记录信息

        var _smssm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "service"
        });
        // ==================================================== 列头
        //用户基本信息
        var cm = new Ext.grid.ColumnModel([{
            header: "姓名",
            tooltip: "姓名",
            dataIndex: "vc2customername",
            sortable: true
        }, {
            header: "手机号码",
            tooltip: "手机号码",
            dataIndex: "vc2accountcode",
            sortable: true
        }, {
            header: "性别",
            tooltip: "性别",
            dataIndex: "numsex",
            sortable: true,
            renderer: function(value) {
                if (value == 1) {
                    return "男";
                }
                if (value == 2) {
                    return "女";
                }
            }
        }, {
            header: "手机号",
            tooltip: "手机号",
            dataIndex: "vc2mobile",
            sortable: true
        }, {
            header: "电话",
            tooltip: "电话",
            dataIndex: "vc2phone",
            sortable: true
        }, {
            header: "身份证号",
            tooltip: "身份证号",
            dataIndex: "vc2idcard",
            sortable: true
        }, {
            header: "平台部门",
            tooltip: "平台部门",
            dataIndex: "vc2departname",
            sortable: true
        }, {
            header: "柜台部门",
            tooltip: "柜台部门",
            dataIndex: "vc2branchname",
            sortable: true
        }, {
            header: "出生日期",
            tooltip: "出生日期",
            dataIndex: "datbirthday",
            sortable: true
        }, {
            header: "添加时间",
            tooltip: "添加时间",
            dataIndex: "datcreatetime",
            sortable: true
}]);

            //栏目信息
            var _columncm = new Ext.grid.ColumnModel([{
                header: "栏目名称",
                tooltip: "栏目名称",
                dataIndex: "vc2columnname",
                sortable: true
            }, {
                header: "栏目类型",
                tooltip: "栏目类型",
                dataIndex: "numneedaccountcode",
                sortable: true,
                renderer: function(value) {
                    if (value == 1) {
                        return "交易客户栏目";
                    }
                    if (value == 0) {
                        return "非交易客户栏目";
                    }
                }
            }, {
                header: "手机号码",
                tooltip: "手机号码",
                dataIndex: "vc2accountcode",
                sortable: true
            }, {
                header: "手机号",
                tooltip: "手机号",
                dataIndex: "vc2mobile",
                sortable: true
            }, {
                header: "加入时间",
                tooltip: "加入时间",
                dataIndex: "datcreattime",
                sortable: true
            }, {
                header: "用户类型",
                tooltip: "用户类型",
                dataIndex: "numtype",
                renderer: function(value) {
                    if (value == 0) {
                        return "白名单";
                    }
                    if (value == 1) {
                        return "黑名单";
                    }
                },
                sortable: true
            }, {
                header: "操作人",
                tooltip: "操作人",
                dataIndex: "vc2username",
                sortable: true
            }, {
                header: "部门",
                tooltip: "部门",
                dataIndex: "vc2departname",
                sortable: true
            }, {
                header: "操作",
                tooltip: "操作",
                dataIndex: "numcolumnid",
                width: 50,
                renderer: function(value, meta, record, rowIndex, colIndex, store) {
                    return "<a href='#' onclick='Js.Center.Customer.CustomerBusiness.CustomerBusinessInfo.DeleteColumn(\"102\",\"" + value + "\"," + rowIndex + ")'>退订</a>";
                }
}]);
                //客户组信息"numusergroupid","vc2mobile","numtype","vc2usergroupname"
                var _cusgroupcm = new Ext.grid.ColumnModel([{
                    header: "客户组编号",
                    dataIndex: "numusergroupid",
                    sortable: true,
                    hidden: true
                }, {
                    header: "客户组名称",
                    tooltip: "客户组名称",
                    dataIndex: "vc2usergroupname",
                    sortable: true

                }, {
                    header: "手机号码",
                    tooltip: "手机号码",
                    dataIndex: "vc2mobile",
                    sortable: true
                }, {
                    header: "加入时间",
                    tooltip: "加入时间",
                    dataIndex: "datcreattime",
                    sortable: true
                }, {
                    hidden: true,
                    header: "用户类型",
                    tooltip: "用户类型",
                    dataIndex: "numtype",
                    renderer: function(value) {
                        if (value == 0) {
                            return "白名单";
                        }
                        if (value == 1) {
                            return "黑名单";
                        }
                    },
                    sortable: true
                }, {
                    header: "操作人",
                    tooltip: "操作人",
                    dataIndex: "vc2username",
                    sortable: true
                }, {
                    header: "部门",
                    tooltip: "部门",
                    dataIndex: "vc2departname",
                    sortable: true
                }, {
                    header: "操作",
                    tooltip: "操作",
                    dataIndex: "numusergroupid",
                    width: 50,
                    renderer: function(value, meta, record, rowIndex, colIndex, store) {
                        return "<a href='#' onclick='Js.Center.Customer.CustomerBusiness.CustomerBusinessInfo.DeleteCustomerGroup(\"deletecusgroup\"," + rowIndex + ")'>退订</a>";
                    }
}]);
                    //白名单信息"numusergroupid","vc2mobile","numtype","vc2usergroupname"
                    var _whitecm = new Ext.grid.ColumnModel([{
                        header: "手机号",
                        tooltip: "手机号",
                        dataIndex: "vc2mobile",
                        sortable: true
                    }, {
                        header: "加入时间",
                        tooltip: "加入时间",
                        dataIndex: "datcreatetime",
                        sortable: true
                    }, {
                        header: "操作",
                        tooltip: "操作",
                        dataIndex: "numsvcid",
                        width: 50,
                        renderer: function(value, meta, record, rowIndex, colIndex, store) {
                            return "<a href='#' onclick='Js.Center.Customer.CustomerBusiness.CustomerBusinessInfo.DeleteBusi(\"deletewhite\",\"" + value + "\"," + rowIndex + ")'>退订</a>";
                        }
}]);
                        //黑名单信息"numusergroupid","vc2mobile","numtype","vc2usergroupname"
                        var _blackcm = new Ext.grid.ColumnModel([{
                            header: "手机号",
                            tooltip: "手机号",
                            dataIndex: "vc2mobile",
                            sortable: true
                        }, {
                            header: "加入时间",
                            tooltip: "加入时间",
                            dataIndex: "datcreate",
                            sortable: true
                        }, {
                            header: "类型",
                            tooltip: "类型",
                            dataIndex: "numtype",
                            sortable: true,
                            renderer: function(value) {
                                if (value == 1) {
                                    return "系统黑名单";
                                }
                                if (value == 2) {
                                    return "彩信黑名单";
                                }
                            }
                        }, {
                            header: "操作",
                            tooltip: "操作",
                            dataIndex: "numsvcid",
                            width: 50,
                            renderer: function(value, meta, record, rowIndex, colIndex, store) {
                                return "<a href='#' onclick='Js.Center.Customer.CustomerBusiness.CustomerBusinessInfo.DeleteBusi(\"deleteblack\",\"" + value + "\"," + rowIndex + ")'>退订</a>";
                            }
}]);

                            //用户黑名单信息"numusergroupid","vc2mobile","numtype","vc2usergroupname"
                            var _userblackcm = new Ext.grid.ColumnModel([{
                                header: "手机号",
                                tooltip: "手机号",
                                dataIndex: "vc2mobile",
                                sortable: true
                            }, {
                                header: "加入时间",
                                tooltip: "加入时间",
                                dataIndex: "datcreattime",
                                sortable: true
                            }, {
                                header: "操作",
                                tooltip: "操作",
                                dataIndex: "numsvcid",
                                width: 50,
                                renderer: function(value, meta, record, rowIndex, colIndex, store) {
                                    return "<a href='#' onclick='Js.Center.Customer.CustomerBusiness.CustomerBusinessInfo.UserBlackDeleteBusi(\"deleteuserblack\",\"" + value + "\"," + rowIndex + ")'>退订</a>";
                                }
}]);
                                //上下行记录信息

                                var _smscm = new Ext.grid.ColumnModel([{
                                    header: "内容",
                                    tooltip: "内容",
                                    dataIndex: "content",
                                    sortable: true,
                                    width: 200,
                                    renderer: function(value) {
                                        if (value.length > 20) {
                                            return "<font qtip='" + value + "'>" + value.substring(0, 20) + "..." + "</font>";
                                        }
                                        else {
                                            return "<font qtip='" + value + "'>" + value + "</font>";
                                        }

                                    }
                                }, {
                                    header: "类型",
                                    tooltip: "类型",
                                    dataIndex: "vtype",
                                    sortable: true
                                }, {
                                    header: "时间",
                                    tooltip: "时间",
                                    dataIndex: "datetime",
                                    sortable: true
                                }, {
                                    header: "接收状态",
                                    tooltip: "接收状态",
                                    dataIndex: "vc2reportstatus",
                                    sortable: true
                                }, {
                                    header: "状态码",
                                    tooltip: "状态码",
                                    dataIndex: "vc2reporterrorcode",
                                    sortable: true
                                }, {
                                    header: "运营商业务",
                                    tooltip: "运营商业务",
                                    dataIndex: "vc2svcname",
                                    sortable: true
}]);
                                    //==============================================================定义grid
                                    //用户基本信息
                                    var customergrid = new WXTL.Widgets.CommonGrid.GridPanel({
                                        id: "customergridPanel",
                                        anchor: '100% 100%',
                                        pageSize: _pageSize,
                                        needMenu: false,
                                        title: '客户基本信息',
                                        store: Js.Center.Customer.CustomerBusiness.Infostore,
                                        sm: sm,
                                        cm: cm,
                                        needRightMenu: false,
                                        listeners: {
                                            "beforeexpand": function(Panel) {
                                                if (queryData(Js.Center.Customer.CustomerBusiness.Infostore, customergrid, 'selectcusbymobile')) {
                                                    Js.Center.Customer.CustomerBusiness.Infostore.load({
                                                        params: {
                                                            limit: _columnPageSize,
                                                            start: 0
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    });
                                    //==============================================================定义产品基本信息grid

                                    //栏目信息
                                    var gridPanel = new WXTL.Widgets.CommonGrid.GridPanel({
                                        id: "gridPanelGridPanel",
                                        anchor: '100% 100%',
                                        pageSize: _columnPageSize,
                                        needMenu: false,
                                        layout: 'anchor',
                                        title: '栏目信息',
                                        store: Js.Center.Customer.CustomerBusiness.ColumnInfostore,
                                        sm: _columnsm,
                                        cm: _columncm,
                                        needRightMenu: false,
                                        listeners: {
                                            "beforeexpand": function(Panel) {
                                                if (queryData(Js.Center.Customer.CustomerBusiness.ColumnInfostore, gridPanel, 'selectcolumnbymobile')) {
                                                    Js.Center.Customer.CustomerBusiness.ColumnInfostore.load({
                                                        params: {
                                                            limit: _columnPageSize,
                                                            start: 0
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    });
                                    //客户组信息

                                    var cusgroupgrid = new WXTL.Widgets.CommonGrid.GridPanel({
                                        id: "cusgroupgridGridPanel",
                                        anchor: '100% 100%',
                                        pageSize: _cusGroupPageSize,
                                        needMenu: false,
                                        layout: 'anchor',
                                        title: '客户组信息',
                                        store: Js.Center.Customer.CustomerBusiness.CusgroupInfostore,
                                        sm: _cusgroupsm,
                                        cm: _cusgroupcm,
                                        needRightMenu: false,
                                        listeners: {
                                            "beforeexpand": function(Panel) {
                                                if (queryData(Js.Center.Customer.CustomerBusiness.CusgroupInfostore, cusgroupgrid, 'selectcusgroupbymobile')) {
                                                    Js.Center.Customer.CustomerBusiness.CusgroupInfostore.load({
                                                        params: {
                                                            limit: _cusGroupPageSize,
                                                            start: 0
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    });

                                    //白名单信息

                                    var whitegrid = new WXTL.Widgets.CommonGrid.GridPanel({
                                        id: "whitegridGridPanel",
                                        anchor: '100% 100%',
                                        pageSize: _whitePageSize,
                                        needMenu: false,
                                        layout: 'anchor',
                                        title: '白名单信息',
                                        store: Js.Center.Customer.CustomerBusiness.WhiteInfostore,
                                        sm: _whitesm,
                                        cm: _whitecm,
                                        collapsed: "false",
                                        needRightMenu: false,
                                        listeners: {
                                            "beforeexpand": function(Panel) {
                                                if (queryData(Js.Center.Customer.CustomerBusiness.WhiteInfostore, whitegrid, 'selectwhitebymobile')) {
                                                    Js.Center.Customer.CustomerBusiness.WhiteInfostore.load({
                                                        params: {
                                                            limit: _whitePageSize,
                                                            start: 0
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    });

                                    //黑名单信息

                                    var blackgrid = new WXTL.Widgets.CommonGrid.GridPanel({
                                        id: "blackgridGridPanel",
                                        anchor: '100% 100%',
                                        pageSize: _blackPageSize,
                                        needMenu: false,
                                        layout: 'anchor',
                                        title: '黑名单信息',
                                        store: Js.Center.Customer.CustomerBusiness.BlackInfostore,
                                        sm: _blacksm,
                                        cm: _blackcm,
                                        collapsed: "false",
                                        needRightMenu: false,
                                        listeners: {
                                            "beforeexpand": function(Panel) {
                                                if (queryData(Js.Center.Customer.CustomerBusiness.BlackInfostore, blackgrid, 'selectblackbymobile')) {
                                                    Js.Center.Customer.CustomerBusiness.BlackInfostore.load({
                                                        params: {
                                                            limit: _blackPageSize,
                                                            start: 0
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    });

                                    //用户黑名单信息

                                    var userblackgrid = new WXTL.Widgets.CommonGrid.GridPanel({
                                        id: "userblackgridGridPanel",
                                        anchor: '100% 100%',
                                        pageSize: _userblackPageSize,
                                        needMenu: false,
                                        layout: 'anchor',
                                        title: '用户黑名单信息',
                                        store: Js.Center.Customer.CustomerBusiness.UserBlackInfostore,
                                        sm: _userblacksm,
                                        cm: _userblackcm,
                                        collapsed: "false",
                                        needRightMenu: false,
                                        listeners: {
                                            "beforeexpand": function(Panel) {
                                                if (queryData(Js.Center.Customer.CustomerBusiness.UserBlackInfostore, userblackgrid, 'selectuserblackbymobile')) {
                                                    Js.Center.Customer.CustomerBusiness.UserBlackInfostore.load({
                                                        params: {
                                                            limit: _userblackPageSize,
                                                            start: 0
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    });

                                    //==============================================================定义上下行记录信息grid
                                    var smsgrid = new WXTL.Widgets.CommonGrid.GridPanel({
                                        id: "smsgridPanel",
                                        anchor: '100% 100%',
                                        pageSize: _smsPageSize,
                                        needMenu: false,
                                        needRightMenu: false,
                                        title: '上下行记录',
                                        store: Js.Center.Customer.CustomerBusiness.SmsInfostore,
                                        sm: _smssm,
                                        cm: _smscm,
                                        listeners: {
                                            "beforeexpand": function(Panel) {
                                                if (queryData(Js.Center.Customer.CustomerBusiness.SmsInfostore, smsgrid, 'selectsendbymobile')) {
                                                    Js.Center.Customer.CustomerBusiness.SmsInfostore.load({
                                                        params: {
                                                            limit: _smsPageSize,
                                                            start: 0
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    });

                                    //============================================================================ 定义formpanel
                                    var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
                                        id: "customerbusinessSelectPanel",
                                        height: 120,
                                        //查询调用的方法
                                        queryMethod: "Js.Center.Customer.CustomerBusiness.queryGrid",
                                        bodyStyle: "padding:10px 0 10px 15px",
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
                                                    xtype: "hidden",
                                                    fieldLabel: '手机号码',
                                                    name: 'vc2accountcode',
                                                    value: 0,
                                                    id: 'cusbusivc2accountcode'
                                                }, {
                                                    fieldLabel: '手机号码',
                                                    name: 'vc2mobile',
                                                    regex: WXTL.Common.regex.Mobile,
                                                    regexText: "手机号码格式不正确",
                                                    msgTarget: "side",
                                                    id: 'cusbusimobile'
}]
}]
}]

                                                });
                                                //============================================================== 定义查询按钮事件方法
                                                Js.Center.Customer.CustomerBusiness.queryGrid = function() {
                                                    //var _mobile = Ext.get("cusbusimobile").getValue();
                                                    if (Ext.get("cusbusimobile").getValue() == '') {
                                                        Ext.Msg.alert("温馨提示", "请输入查询条件！");
                                                    }
                                                    else {
                                                        if (selectPanel.getForm().isValid()) {
                                                            if (queryData(Js.Center.Customer.CustomerBusiness.CusgroupInfostore, cusgroupgrid, 'selectcusgroupbymobile')) {
                                                                Js.Center.Customer.CustomerBusiness.CusgroupInfostore.load({
                                                                    params: {
                                                                        limit: _columnPageSize,
                                                                        start: 0
                                                                    }
                                                                });
                                                            }
                                                        }
                                                        whitegrid.collapse(true);
                                                        blackgrid.collapse(true);
                                                        //                userblackgrid.collapse(true);
                                                    }
                                                };
                                                var CusInfoForm = new Ext.Panel({
                                                    id: 'CusInfoForm',
                                                    title: "查询结果",
                                                    frame: true, // 渲染面板
                                                    bodyBorder: false,
                                                    border: false,
                                                    autoScroll: true, // 自动显示滚动条
                                                    layout: "anchor",
                                                    defaults: {
                                                        collapsible: true // 允许展开和收缩
                                                    },
                                                    //            items: [cusgroupgrid, whitegrid, blackgrid, userblackgrid]
                                                    items: [cusgroupgrid, whitegrid, blackgrid]
                                                });

                                                //============================================================================定义主panel
                                                Js.Center.Customer.CustomerBusiness.CustomerBusinessPanel = new Ext.Panel({
                                                    frame: true, // 渲染面板
                                                    id: "Js.Center.Customer.CustomerBusiness.CustomerBusinessPanel",
                                                    //title:"客户基本信息",
                                                    bodyBorder: false,
                                                    border: false,
                                                    autoScroll: true, // 自动显示滚动条
                                                    layout: "anchor",
                                                    defaults: {
                                                        collapsible: true // 允许展开和收缩
                                                    },
                                                    //            items: [selectPanel, cusgroupgrid, whitegrid, blackgrid, userblackgrid]
                                                    items: [selectPanel, cusgroupgrid, whitegrid, blackgrid]
                                                })
                                            };

                                            //============================================================================绑定到center
                                            GridMain(node, Js.Center.Customer.CustomerBusiness.CustomerBusinessPanel, "openroomiconinfo", "Js.Center.Customer.CustomerBusiness.Infostore");
                                            if (row != "" && row != null) {
                                                if (queryData(Js.Center.Customer.CustomerBusiness.Infostore, customergrid, 'selectcusbymobile')) {
                                                    Js.Center.Customer.CustomerBusiness.Infostore.load({
                                                        params: {
                                                            limit: _columnPageSize,
                                                            start: 0
                                                        }
                                                    });
                                                }
                                            };



                                            // *flag(deleteblack),
                                            //*numsvcid 通道ID（先不用管，传默认的"1"即可，方便以后扩展）
                                            //*mobile,

                                            //=====================================================退出业务黑、白名单方法
                                            Js.Center.Customer.CustomerBusiness.CustomerBusinessInfo.DeleteBusi = function(flag, ID, rowIndex) {
                                                var row;
                                                var urlstr;
                                                var type="";
                                                if (flag == 'deletewhite') {
                                                    row = Js.Center.Customer.CustomerBusiness.WhiteInfostore.getAt(rowIndex);
                                                    urlstr = Js.Center.Customer.WhiteUpdateURL;
                                                }
                                                else
                                                    if (flag == 'deleteblack') {
                                                    row = Js.Center.Customer.CustomerBusiness.BlackInfostore.getAt(rowIndex);
                                                    urlstr = Js.Center.Customer.BlackUpdateURL;
                                                };
                                                if (Js.Center.Customer.CustomerBusiness.BlackInfostore.data.length>0 && Js.Center.Customer.CustomerBusiness.BlackInfostore.getAt(rowIndex).get("numtype") == 1)
                                                    type = 3;
                                                else
                                                    type = 5;
                                                Ext.Ajax.request({
                                                    url: urlstr,
                                                    method: "POST",
                                                    params: {
                                                        flag: "deletebylist",
                                                        numsvcid: ID,
                                                        mobilelist: row.get("vc2mobile"), //Ext.get("cusbusimobile").getValue()
                                                        blacktype:type
                                                    },
                                                    success: function(form, action) {
                                                        var obj = Ext.util.JSON.decode(form.responseText);
                                                        var falg = obj.success;
                                                        if (falg == true) {
                                                            Ext.Msg.alert("温馨提示", "操作已成功!");
                                                            if (flag == "deletewhite") {
                                                                Js.Center.Customer.CustomerBusiness.WhiteInfostore.load();
                                                            }
                                                            else
                                                                if (flag == "deleteblack") {
                                                                Js.Center.Customer.CustomerBusiness.BlackInfostore.load();
                                                            }

                                                        }
                                                        else
                                                            Ext.Msg.alert('温馨提示', obj.info);

                                                    },
                                                    failure: function() {
                                                        Ext.Msg.alert("温馨提示", "系统忙，请稍候...!");
                                                    }
                                                });
                                            };


                                            //=====================================================退出用户黑名单方法
                                            Js.Center.Customer.CustomerBusiness.CustomerBusinessInfo.UserBlackDeleteBusi = function(flag, ID, rowIndex) {
                                                var row;

                                                if (flag == 'deleteuserblack') {
                                                    row = Js.Center.Customer.CustomerBusiness.UserBlackInfostore.getAt(rowIndex);
                                                };
                                                Ext.Ajax.request({
                                                    url: Js.Center.Customer.MyBlackUpdateURL,
                                                    method: "POST",
                                                    params: {
                                                        flag: "deletebylist",
                                                        numsvcid: '1',
                                                        mobilelist: row.get("vc2mobile"),
                                                        numlistid: row.get("numlistid")
                                                    },
                                                    success: function(form, action) {
                                                        var obj = Ext.util.JSON.decode(form.responseText);
                                                        var falg = obj.success;
                                                        if (falg == true) {
                                                            Ext.Msg.alert("温馨提示", "操作已成功!");
                                                            Js.Center.Customer.CustomerBusiness.UserBlackInfostore.load();
                                                        }
                                                        else
                                                            Ext.Msg.alert('温馨提示', obj.info);

                                                    },
                                                    failure: function() {
                                                        Ext.Msg.alert("温馨提示", "系统忙，请稍候...!");
                                                    }
                                                });
                                            };

                                            //============================2010-04-01=========================客户组退订方法
                                            //Post 参数  
                                            //*flag(deletecusgroup),
                                            //*cusgroupid 客户组编号
                                            //*mobile 客户手机号
                                            Js.Center.Customer.CustomerBusiness.CustomerBusinessInfo.DeleteCustomerGroup = function(flag, rowIndex) {

                                                var row;
                                                var _mobile = Ext.get("cusbusimobile").getValue();
                                                row = Js.Center.Customer.CustomerBusiness.CusgroupInfostore.getAt(rowIndex);
                                                var cusgroupid = row.get("numusergroupid");


                                                Ext.Ajax.request({
                                                    url: Js.Center.Customer.UserGroupMemberUpdateURL,
                                                    method: "POST",
                                                    params: {
                                                        flag: "deletebylist",
                                                        numusergroupid: cusgroupid,
                                                        mobilelist: _mobile
                                                    },
                                                    success: function(form, action) {
                                                        var obj = Ext.util.JSON.decode(form.responseText);
                                                        var falg = obj.success;
                                                        if (falg == true) {
                                                            Ext.Msg.alert("温馨提示", "操作已成功!");

                                                            Js.Center.Customer.CustomerBusiness.CusgroupInfostore.load();

                                                        }
                                                        else {
                                                            Ext.Msg.alert('温馨提示', obj.info);
                                                        }
                                                    },
                                                    failure: function() {
                                                        Ext.Msg.alert("温馨提示", "系统忙，请稍候...!");
                                                    }
                                                });
                                            };

                                            //=====================================================退出栏目、客户组黑、白名单方法
                                            Js.Center.Customer.CustomerBusiness.CustomerBusinessInfo.DeleteColumn = function(typeid, ID, rowIndex) {

                                                var row;
                                                var _columnflag;
                                                var _mobile = Ext.get("cusbusimobile").getValue();
                                                if (typeid == "102") {
                                                    row = Js.Center.Customer.CustomerBusiness.ColumnInfostore.getAt(rowIndex);
                                                    var needaccountcode = row.get("numneedaccountcode");
                                                    if (needaccountcode == 0) {
                                                        _mobile = row.get("vc2mobile");
                                                    }
                                                    if (needaccountcode == 1) {
                                                        _mobile = row.get("vc2accountcode");
                                                    }
                                                }
                                                else
                                                    if (typeid == "103") {
                                                    row = Js.Center.Customer.CustomerBusiness.CusgroupInfostore.getAt(rowIndex);
                                                    _mobile = row.get("vc2mobile");
                                                }
                                                var type = row.get("numtype");

                                                if (type == 1) {
                                                    _columnflag = "deleteblack";
                                                }
                                                if (type == 0) {
                                                    _columnflag = "deletewhite";
                                                }

                                                if (type == 2) {
                                                    _columnflag = "deleteuserblack";
                                                }

                                                Ext.Ajax.request({
                                                    url: Js.Center.Customer.CustomerBusinessUpdateURL,
                                                    method: "POST",
                                                    params: {
                                                        flag: _columnflag,
                                                        type: typeid,
                                                        id: ID,
                                                        vc2mobile: _mobile
                                                    },
                                                    success: function(form, action) {
                                                        var obj = Ext.util.JSON.decode(form.responseText);
                                                        var falg = obj.success;
                                                        if (falg == true) {
                                                            Ext.Msg.alert("温馨提示", "操作已成功!");
                                                            if (typeid == "102") {
                                                                Js.Center.Customer.CustomerBusiness.ColumnInfostore.load();
                                                            }
                                                            else
                                                                if (typeid == "103") {
                                                                Js.Center.Customer.CustomerBusiness.CusgroupInfostore.load();
                                                            }
                                                        }
                                                        else {
                                                            Ext.Msg.alert('温馨提示', obj.info);
                                                        }
                                                    },
                                                    failure: function() {
                                                        Ext.Msg.alert("温馨提示", "系统忙，请稍候...!");
                                                    }
                                                });
                                            };
                                        };

