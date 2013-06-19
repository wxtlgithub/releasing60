/*
*客户明细
*/
Ext.namespace('Js.Center.Business.UserGroupMemberCusDetails');
Js.Center.Business.UserGroupMemberCusDetails.func = function(row){
if(Js.Center.Business.UserGroupMemberCusDetails.window==null)
{

    //=================================================================定义Grid相关
    // 分页每页显示数量
    var _pageSize = 12;
    
    //==============================================================Grid数据定义
    var fields = ["numusergroupid", "numprodid", "vc2prodname", "vc2usergroupname", "vc2usergroupdesc", "datcreattime", "datmodifytime", "numuserid", "numdepartid", "vc2departname", "vc2username", "membercount", "blackcount"];
    Js.Center.Business.UserGroupMemberCusDetails.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
        proxy: new Ext.data.HttpProxy({
            url: Js.Center.Business.UserGroupURL,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            fields: fields,
            root: "data",
            id: "numusergroupid",
            totalProperty: "totalCount"
        
        }),
        sortInfo: {
            field: 'vc2usergroupname',
            direction: 'DESC'
        },//解决分组无效代码
        baseParams: {
            flag: 'selectownerusergroupbyid'
        }
    });
    
    
    //==============================================================列选择模式
    var sm = new Ext.grid.CheckboxSelectionModel({
        dataIndex: "numusergroupid"
    });
    //==============================================================列头
    var cm = new Ext.grid.ColumnModel([{
        header: "客户组名称",
        tooltip: "客户组名称",
        dataIndex: "vc2usergroupname",
        sortable: true
    }, {
        header: "部门",
        tooltip: "部门",
        dataIndex: "vc2departname",
        sortable: true
    }, {
        header: "成员数量",
        tooltip: "成员数量",
        dataIndex: "membercount",
        sortable: true
    }, {
        header: "成员下载",
        tooltip: "成员下载",
        dataIndex: "numusergroupid",
        renderer: function(value, meta, record, rowIndex, colIndex, store){
            return "<a href='#' onclick='exportData(\"" + Js.Center.Business.UserGroupURL + "\",\"id=" + value + "&flag=selectmemberbyid\")'>下载</a>";
        }
    }, {
        header: "备注",
        tooltip: "备注",
        dataIndex: "vc2usergroupdesc",
        sortable: true
    }]);
    //==============================================================定义grid
    var columnMemberCusDetailsGrid = new WXTL.Widgets.CommonGrid.GridPanel({
        //id: "columnmemberaddGridPanel",
        title: "",
        anchor: '100% 100%',
        //collapsible: false,
        pageSize: _pageSize,
        store: Js.Center.Business.UserGroupMemberCusDetails.Infostore,
        needMenu: false,
        needRightMenu: false,
        needPage: false,
        needLoadDataStore: true,
        sm: sm,
        cm: cm
    });
    
    var mainPanel = new Ext.form.FormPanel({
        frame: true,
        bodyBorder: false,
        border: false,
        autoScroll: true, // 自动显示滚动条
        layout: "anchor",
        width: 650,
        defaults: {
            collapsible: true // 允许展开和收缩
        },
        items: [columnMemberCusDetailsGrid]
    });
    var mainForm = mainPanel.getForm();
    //============================================================================ 定义窗体
    this.window= new WXTL.Widgets.CommonWindows.Window({
        title: "客户明细",
        mainForm: mainForm,
        updateURL: Js.Center.Business.UserGroupUpdateURL,
        displayStore: Js.Center.Business.UserGroupMemberCusDetails.Infostore,
        updateState: true,
        updateRecord: row,
        items: [mainPanel],
        needButtons: false,
        needLoadDataStore:true,
        buttons: [{
            text: "关  闭", 
            minWidth: 70,
            handler: function(){
                Js.Center.Business.UserGroupMemberCusDetails.window.hide();
            }
        }],
        loadDataStoreFunc: function(){
			Js.Center.Business.UserGroupMemberCusDetails.Infostore.load({
                params: {
                    start: 0,
                    limit: _pageSize,
                    id: Js.Center.Business.UserGroupMemberCusDetails.window.updateRecord.get("numusergroupid"),
                    usergroupname: Js.Center.Business.UserGroupMemberCusDetails.window.updateRecord.get("vc2usergroupname")
                }
            });
		}
    });
    }

};
