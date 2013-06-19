Ext.namespace("Js.Center.SendMMS.MMSSendDetails");
Js.Center.SendMMS.MMSSendDetails.func = function(value){
	
	//=============================================================定义统计Grid相关 
	//分页 每页显示数量
        var pageSizeSum = 12;
        //========================定义Grid数据
        Js.Center.SendMMS.MMSSendDetails.SumSendStore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SendMMS.MMSQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ["numrowasdf","numsendbatch","nummtcnt","numresp_succnt","numresp_faicnt","numrep_succnt","numrep_faicnt","numresp_nocnt","numrep_nocnt","numsuc_rate","numuserid","numusername","numcontentid","nummmsid","vc2name","vc2desc","nummmstype","nummmstypename","numstate","numstatename","vc2status","vc2statusname","datcreatetime","datsend","numprenum","datcheck1","datcheck2","numcheck1id","numcheck1idname","numcheck2id","numcheck2idname","numsendtype","vc2typelist"],
                root: "data",
                id: "numrowasdf",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                        field: 'datsend',
                        direction: 'DESC'
                    },//解决分组无效代码
            baseParams: {
                flag: 'querydetailbycontentid',
				mmscontentid:value
            }
        });
        Js.Center.SendMMS.MMSSendDetails.SumSendStore.load({
            params: {
                start: 0,
                limit: pageSizeSum
            }
        });
        //==============================================================列选择模式
        var smSum = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numcontentid"
        });
        //==============================================================列头
        var cmSum = new Ext.grid.ColumnModel([{
            header: "彩信标题",
            tooltip: "彩信标题",
            dataIndex: "vc2name",
            sortable: true
        },{
            header: "彩信名称",
            tooltip: "彩信名称",
            dataIndex: "vc2desc",
            sortable: true
        }, {
            header: "拟发送量",
            tooltip: "拟发送量",
            dataIndex: "numprenum",
            sortable: true
        },  {
            header: "实际发送量",
            tooltip: "实际发送量",
            dataIndex: "nummtcnt",
            sortable: true
        }, {
            header: "成功量",
            tooltip: "成功量",
            dataIndex: "numrep_succnt",
            sortable: true
        }, {
            header: "失败量",
            tooltip: "失败量",
            dataIndex: "numrep_faicnt",
            sortable: true
        }, {
            header: "未知状态",
            tooltip: "未知状态",
            dataIndex: "numrep_nocnt",
            sortable: true
        }, {
            header: "成功率",
            tooltip: "成功率",
            dataIndex: "numsuc_rate",
            sortable: true
        }, {
            header: "预览测试",
            tooltip: "预览测试",
            dataIndex: "nummmsid",
            width: 70,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
            	if (record.get('nummmstype') == 2) {
            		return "<a href='#' onclick='Js.Center.SendMMS.MMSsendPreview.func(\"selecthismms\"," + value + ",\"0\",\"Js.Center.SendMMS.MMSsendUpdate.sendtesthisdiy\")'>测试预览</a>";
            	}
                return "<a href='#' onclick='Js.Center.SendMMS.MMSsendPreview.func(\"selecthismms\"," + value + ",\"0\",\"Js.Center.SendMMS.MMSsendUpdate.sendtesthis\")'>测试预览</a>";
            }
        }]);
        
        
        //==============================================================定义grid
        var sumMMSSsendGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            
            title:'发送统计信息',
            anchor: '100% 100%',
            pageSize: pageSizeSum,
            store: Js.Center.SendMMS.MMSSendDetails.SumSendStore,
            needMenu: false,
            needRightMenu: false,
			needPage:false,
            sm: smSum,
            cm: cmSum
        });
	//=================================================定义Grid相关
	//分页 每页显示数量
        var _pageSize = 6;
        //========================定义Grid数据
        Js.Center.SendMMS.MMSSendDetails.DisplayStore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SendMMS.MMSQueryURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ["numrowasdf","nummmsid","vc2name","vc2destmobile","nummmstype","nummmstypename","numuserid","vc2username","numcontentid","numstate","numstatename","vc2status","vc2statusname","datcreatetime","datsend","datcheck1","numreportstatus"],
                root: "data",
                id: "numrowasdf",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                        field: 'datsend',
                        direction: 'DESC'
                    },//解决分组无效代码
            baseParams: {
                flag: 'selectsenddetails',
				mmscontentid:value//row.get("numcontentid")
            }
        });
        Js.Center.SendMMS.MMSSendDetails.DisplayStore.load({
            params: {
                start: 0,
                limit: _pageSize
            }
        });
        //==============================================================列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numrowasdf"
        });
        //==============================================================列头
        var cm = new Ext.grid.ColumnModel([{
            header: "手机号码",
            tooltip: "手机号码",
            dataIndex: "vc2destmobile",
            sortable: true
        }, {
            header: "发送状态",
            tooltip: "发送状态",
            dataIndex: "numreportstatus",
            sortable: true,
            renderer: function(value){
                if (value == 0) {
                    return "发送成功";
                }
                if (value == 1) {
                    return "等待发送";
                }
                if (value == 2) {
                    return "发送失败";
                }
                else { 
                    return "发送失败";
                }
                    
            }
        },  {
            header: "发送人",
            tooltip: "发送人",
            dataIndex: "vc2username",
            sortable: true
        }, {
            header: "发送时间",
            tooltip: "发送时间",
            dataIndex: "datsend",
            sortable: true
        }]);
        
        
        //==============================================================定义grid
        var sendMMSDetailsGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            //id: "sendMMSDetailsGrid",
            title:'发送明细',
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.SendMMS.MMSSendDetails.DisplayStore,
            needMenu: false,
            needRightMenu: false,
            sm: sm,
            cm: cm
        });
		
		//=============================定义主窗体
		var mainPanel = new Ext.form.FormPanel({});
        var mainForm = mainPanel.getForm();
        Js.Center.SendMMS.MMSSendDetails.MMSsendDetailsWindow = new WXTL.Widgets.CommonWindows.Window({
            title: "彩信发送详情",
            width: 664,
            height: 400,
            layout: 'form',
            mainForm: mainForm,
            autoScroll: false,
            updateURL: Js.Center.SendMMS.MMScheckUpdateURL,
            displayStore: Js.Center.SendMMS.MMSSendDetails.DisplayStore,
            //updateState: true,
            //updateRecord: row,
            needButtons: false,
            items: [sumMMSSsendGrid,sendMMSDetailsGrid],
            buttons:[new Ext.Button({
                text: '关闭',
                qtip: "关闭",
                minWidth: 70,
                handler: function(){
                    Js.Center.SendMMS.MMSSendDetails.MMSsendDetailsWindow.close();
                }
            })]
        });
        //显示窗体
        Js.Center.SendMMS.MMSSendDetails.MMSsendDetailsWindow.show();
};
