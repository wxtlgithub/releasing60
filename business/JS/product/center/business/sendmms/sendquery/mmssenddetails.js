Ext.namespace("Js.Center.SendMMS.MMSSendDetails");
Js.Center.SendMMS.MMSSendDetails.func = function(row){
	var setSendtype = function(){
		var numsendtype = row.get("numsendtype");
		if(numsendtype == 1){
			Js.Center.SendMMS.MMSSendDetails.numType = "栏目";
		}
		if(numsendtype == 2){
			Js.Center.SendMMS.MMSSendDetails.numType = "客户组";
		}
		if(numsendtype == 3 || numsendtype == 8){
			Js.Center.SendMMS.MMSSendDetails.numType = "手机号码";
		}
		if(numsendtype == 4){
			Js.Center.SendMMS.MMSSendDetails.numType = "按文件发送";
		}
		if(numsendtype == 5){
			Js.Center.SendMMS.MMSSendDetails.numType =  "个性化彩信";
		}
		if(numsendtype == 8){
			Js.Center.SendMMS.MMSSendDetails.numType =  "个性化测试发送";
		}
	};
	setSendtype();
	
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
				mmscontentid:row.get("numcontentid")
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
            sm: smSum,
            cm: cmSum
        });
        
        //=============================下方显示详情
		var departSendDetailsInfoPanel = new Ext.form.FormPanel({
			id: "Js.Center.SendMMS.MMSSendDetails.departSendDetailsInfoPanel",
			width: 645,
			frame: true,
			labelWidth: 80,
			defaults:{
				anchor:"99%"
			},
			items: [{
				xtype: "hidden",
				name: "numcontentid",
				fieldLabel: "信息编号"
			}, {
				xtype: "textfield",
				name: "numusername",
				fieldLabel: "发送人",
				readOnly: true
			},{
				xtype: "textfield",
				name: "numsendtype1",
				fieldLabel: "发送方式",
				readOnly: true,
				value: Js.Center.SendMMS.MMSSendDetails.numType  
			}]
		});
        
		//=============================定义主窗体
		var mainPanel = new Ext.form.FormPanel({});
        var mainForm = mainPanel.getForm();
        Js.Center.SendMMS.MMSSendDetails.MMSsendDetailsWindow = new WXTL.Widgets.CommonWindows.Window({
            title: "彩信发送详情",
            width: 664,
            height: 300,
            layout: 'form',
            mainForm: mainForm,
            autoScroll: false,
            updateURL: Js.Center.SendMMS.MMScheckUpdateURL,
            displayStore: Js.Center.SendMMS.MMSSendDetails.SumSendStore,
            //updateState: true,
            //updateRecord: row,
            needButtons: false,
            items: [sumMMSSsendGrid, departSendDetailsInfoPanel],
			listeners: {
				"show": function(){
					// 当window show事件发生时清空一下表单
					departSendDetailsInfoPanel.getForm().loadRecord(row);
				}
			},
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
