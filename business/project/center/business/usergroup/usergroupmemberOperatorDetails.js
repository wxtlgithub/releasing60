/**操作详细信息*/
Ext.namespace('Js.Center.Business.UserGroupMemberOperatorDetails');

Js.Center.Business.UserGroupMemberOperatorDetails.func = function(row) {
   if(Js.Center.Business.UserGroupMemberOperatorDetails.window==null){
       //============================================================================定义GridPanel相关
        // 分页每页显示数量
        var _pageSize = 6;
        //==============================================================Grid数据定义
        
       Js.Center.Business.UserGroupMemberOperatorDetails.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.Business.UserGroupMemberURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ["numlogid", "numdataid", "numstate", "vc2departname", "numtype","numlogid", "vc2columnname", "numtotalnum", "numsuccessnum", "vc2username", "datcreattime","numfailed"],
                root: "data",
                id: "numlogid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'datcreattime',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                flag: 'selectlog',
                numtypeid: '5,6',
                datcreattimestart: '',
                datcreattimeend: '',
                numdepartid: '',
                numusergroupid:''
               
            }
        });
     
        
        //==============================================================列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numcolumnid"
        });
        //==============================================================列头
        var cm = new Ext.grid.ColumnModel([{
            header: "客户组名称",
            tooltip: "客户组名称",
            dataIndex: "vc2columnname",
            sortable: true
        }, {
            header: "部门名称",
            tooltip: "部门名称",
            dataIndex: "vc2departname",
            sortable: true
        }, {
            header: "处理状态",
            tooltip: "处理状态",
            dataIndex: "numstate",
            sortable: true
        }, {
            header: "总数",
            tooltip: "总数",
            dataIndex: "numtotalnum",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                if(value > 0){                	if(record.data.numstate == "处理成功"){                		return "<a href='#' onclick='exportData(\"" + Js.Center.Business.YXTUserGroupMemberURL + "\",\"id=" + record.data.numlogid + "&flag=selectdesc&successtype=-1\")'>"+ value +"</a>";                	}else{                		return value;                	}
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
                    return "<a href='#' onclick='exportData(\"" + Js.Center.Business.YXTUserGroupMemberURL + "\",\"id=" + record.data.numlogid + "&flag=selectdesc&successtype=1\")'>"+ value +"</a>";
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
                    return "<a href='#' onclick='exportData(\"" + Js.Center.Business.YXTUserGroupMemberURL + "\",\"id=" + record.data.numlogid + "&flag=selectdesc&successtype=0\")'>"+value+"</a>";
                }
                else{
                    return value;
                }
            }
        },{
            header: "操作类型",
            tooltip: "操作类型",
            dataIndex: "numtype",
            sortable: true,
			renderer: function(value){
            
                if (value == 5) {
                    return "添加";
                }
                if (value == 6) {
                    return "退出";
                }
            }
        }, {
            header: "操作人",
            tooltip: "操作人",
            dataIndex: "vc2username",
            sortable: true
        }, {
            header: "操作时间",
            tooltip: "操作时间",
            dataIndex: "datcreattime",
            sortable: true
//        }, {
//            header: "操作",
//            tooltip: "操作",
//            dataIndex: "numsvcid",
//            //width: 50,
//            renderer: function(value, meta, record, rowIndex, colIndex, store){
//                return "<a href='#' onclick='doLoad(\"" + Js.Center.Business.UserGroupMemberURL + "\",\"" + record.data.numlogid + "\")'>详情下载</a>";
//            }
        }]);
        
        //==============================================================定义grid
        var userGroupidGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            id: "usergroupmemberaddGridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            store:Js.Center.Business.UserGroupMemberOperatorDetails.Infostore,
            needMenu: false,
            needRightMenu: false,
           // needPage: false,
            sm: sm,
            cm: cm
        });
        
        //============================================================================ 定义formpanel
        
 
        
        //=============================================================栏目下拉列表数据定义
        
       /// Js.Center.Common.UserGroupStore.reload();
        
        //=============================================================定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "usergroupmemberaddSelectPanel",
            height:130,
            //查询调用的方法
            //collapsed:"false",
            queryMethod: "Js.Center.Business.UserGroupMemberOperatorDetails.queryGrid",
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
                    bodyStyle: "padding:5px 0 5px 15px",
                    items: [{
                        xtype: "datefield",
                        fieldLabel: "开始时间",
                        format: 'Y-m-d',
                        labelWidth: 100,
                        bodyStyle: 'padding:5px 5px 0',
                        readOnly: true,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
                        fieldLabel: "开始时间",
                        name: "datcreattimestart",
                        id: "usergroupmemberadddatcreattimestart",
                        validateOnBlur: false,
                        validator: function(){							return Js.Center.Business.UserGroupMemberOperatorDetails.checkTime();						},
                        invalidText: '结束时间不能小于开始时间！'
                    }, {
                        xtype: "ComboWithTree",
                        name: "numdepartid",
                        fieldLabel: "选择部门",
                        hiddenName: "usergroupmemberaddnumdepartid",
                        treeRootVisible: true,
                        fieldLabel: "部门名称",
                        valueField: 'id',
                        listHeight: '150',
                        baseParams: {
                            columnlist: "numdepartid,vc2departname",
                            flag: 'selectallbycurrentuser'
                        },
                        dataUrl: Js.Center.Popedom.DepartmentsQueryURL
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
                    bodyStyle: "padding:5px 0 5px 15px",
                    items: [{
                        xtype: "datefield",
                        fieldLabel: "结束时间",
                        labelWidth: 100,
                        format: 'Y-m-d',
                        bodyStyle: 'padding:5px 5px 0',
                        readOnly: true,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                        name: "datcreattimeend",
                        id: "usergroupmemberadddatcreattimeend",
                        validateOnBlur: false,
                        validator: function(){							return Js.Center.Business.UserGroupMemberOperatorDetails.checkTime();						},
                        invalidText: '结束时间不能小于开始时间！'
                    }, {
                        xtype: "combo",
                        name: "numtype",
                        fieldLabel: "操作类型",
                        hiddenName: "usergroupmemberaddvc2type",
                        blankText: "-=请选择=-",
                        readOnly: true,
                        mode: "local",
                        displayField: "vc2name",
                        valueField: "value",
                        triggerAction: "all",
                        emptyText: '-=请选择=-',
						value:"5,6",
                        store: new Ext.data.SimpleStore({
                            fields: ["vc2name", "value"],
                            data: [["-=请选择=-", "5,6"], ["添加", "5"], ["退出", "6"]]
                        })

                    }]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
       Js.Center.Business.UserGroupMemberOperatorDetails.queryGrid = function(){
            var datCreatTimeStart = Ext.get("usergroupmemberadddatcreattimestart").getValue();
            var datCreatTimeend = Ext.get("usergroupmemberadddatcreattimeend").getValue();
            var numDepartId = Ext.get("usergroupmemberaddnumdepartid").getValue() == null ? "" : Ext.get("usergroupmemberaddnumdepartid").getValue().replace("s", "");
			var numTypeId = Ext.get("usergroupmemberaddvc2type").getValue();
            var flag = 'selectlog';
           Js.Center.Business.UserGroupMemberOperatorDetails.Infostore.baseParams = {
                flag: flag,
                numtypeid: numTypeId,//5,
                datcreattimestart: datCreatTimeStart,
                datcreattimeend: datCreatTimeend,
                numdepartid: numDepartId,
                numusergroupid:Js.Center.Business.UserGroupMemberOperatorDetails.window.updateRecord.get("numusergroupid")
            };
           Js.Center.Business.UserGroupMemberOperatorDetails.Infostore.load({
                params: {
                    start: 0,
                    limit: _pageSize
                }
            });
        };
        var mainPanel = new Ext.Panel({
			width: 830,
			//height: 500,
            frame: true,
            bodyBorder: false,
            border: false,
            //autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, userGroupidGrid]
		});
        var mainForm = selectPanel.getForm();
        //============================================================================ 定义窗体
       this.window = new WXTL.Widgets.CommonWindows.Window({
            title: "操作详细信息",
            width: "850",
            height: 430,
            autoScroll: true, // 自动显示滚动条
			frame:true,
            mainForm: mainForm,
            updateURL: Js.Center.Business.UserGroupUpdateURL,
            displayStore:Js.Center.Business.UserGroupMemberOperatorDetails.Infostore,
            updateState: true,
            updateRecord: row,
            needLoadDataStore:true,
            items: [mainPanel],
            needButtons: false,
            buttons: [{
                text: "关  闭",
                minWidth: 70,
                handler: function(){
                   Js.Center.Business.UserGroupMemberOperatorDetails.window.hide();
                }
            }],
            loadDataStoreFunc: function(){
			    selectPanel.getForm().reset();
			    
				//==============================================================部门下拉列表数据定义
                Js.Center.Common.DepartmentStore.reload();
                 
                Js.Center.Business.UserGroupMemberOperatorDetails.Infostore.baseParams = {
                    flag: 'selectlog',
                    numtypeid: '5,6',
                    datcreattimestart: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
                    datcreattimeend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                    numdepartid: '',
                    numusergroupid:Js.Center.Business.UserGroupMemberOperatorDetails.window.updateRecord.get("numusergroupid")
                };
                Js.Center.Business.UserGroupMemberOperatorDetails.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
			}
        });
		Js.Center.Business.UserGroupMemberOperatorDetails.checkTime =function(){		    var strat_time = Ext.get("usergroupmemberadddatcreattimestart").dom.value;            var end_time = Ext.get("usergroupmemberadddatcreattimeend").dom.value;            if (strat_time <= end_time) {			    return true;		    }		    else {			    return false;		    }		};
	}
};

