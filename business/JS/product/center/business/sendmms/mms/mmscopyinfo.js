Ext.namespace('Js.Center.SendMMS.MMSCopyInfo');
Ext.QuickTips.init();
Js.Center.SendMMS.MMSCopyInfo.info = function(show){
	
	if (Js.Center.SendMMS.MMSCopyInfo.window == null) {
		//==========================================================定义Grid相关
		// 分页每页显示数量
		var _pageSize = 10;
		//==============================================================Grid数据定义
		//var fields = ["nummmsid", "vc2name", "vc2centerid", "numuserid", "datmodifytime", "numcheckuserid", "datchecktime", "vc2smilurl", "numstate", "nummmstype", "datcreattime", "nummoduserid", "vc2desc","numcheck1id","numcheck2id"];
		var fields = ["nummmsid", "vc2name", "vc2centerid","datcreatetime", "numuserid","vc2username", "datmodifytime", "numcheckuserid", "datchecktime", "vc2smilurl", "numstate", "nummmstype", "datcreattime", "nummoduserid", "vc2modusername","vc2desc"];
		Js.Center.SendMMS.MMSCopyInfo.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
			proxy: new Ext.data.HttpProxy({
				url: Js.Center.SendMMS.MMSQueryListURL,
				method: "POST"
			}),
			reader: new Ext.data.JsonReader({
				fields: fields,
				root: "data",
				id: "nummmsid",
				totalProperty: "totalCount"
			
			}),
			sortInfo: {
                        field: 'datcreattime',
                        direction: 'DESC'
                    },//解决分组无效代码
			baseParams: {
				datcreattimestart: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
				datcreattimeend: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
				mmsname: '',
				numcreater: '',
				numstate: '',
				flag: 'selectall'
			}
		});
		
		//==============================================================列选择模式
		var sm = new Ext.grid.CheckboxSelectionModel({
			dataIndex: "nummmsid"
		});
		//==============================================================列头
		var cm = new Ext.grid.ColumnModel([{
			hidden: true,
			header: "彩信编号",
			tooltip: "彩信编号",
			dataIndex: "nummmsid",
			sortable: true
		}, {
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
			header: "彩信类型",
			tooltip: "彩信类型",
			dataIndex: "nummmstype",
			sortable: true,
			renderer: function(value){
				if (value == 1) {
					return "普通彩信";
				}
				else 
					if (value == 2) {
						return "个性化彩信";
					}
					else {
						return "";
					}
			}
		}, {
            header: "创建人",
            tooltip: "创建人",
            dataIndex: "vc2username",
            sortable: true
        }, {
            header: "创建时间",
            tooltip: "创建时间",
            dataIndex: "datcreatetime",
            sortable: true
        }, {
            header: "修改人",
            tooltip: "最后修改人",
            dataIndex: "vc2modusername",
            sortable: true
        }, {
            header: "修改时间",
            tooltip: "最后修改时间",
            dataIndex: "datmodifytime",
            sortable: true
        },{
			header: "测试预览",
			tooltip: "测试预览",
			dataIndex: "nummmsid",
			width: 60,
			renderer: function(value, meta, record, rowIndex, colIndex, store){
				if (record.get('nummmstype') == 2) {
            		return "<a href='#' onclick='Js.Center.SendMMS.MMSsendPreview.func(\"selectmms\"," + value + ",\"0\",\"Js.Center.SendMMS.MMSsendUpdate.sendtestcurdiy\")'>测试预览</a>";
            	}
				return "<a href='#' onclick='Js.Center.SendMMS.MMSsendPreview.func(\"selectmms\"," + value + ",\"0\",\"Js.Center.SendMMS.MMSsendUpdate.sendtestcur\")'>测试预览</a>";
			}
		}, {
			header: "复制彩信",
			tooltip: "复制彩信",
			dataIndex: "nummmsid",
			width: 60,
			renderer: function(value, meta, record, rowIndex, colIndex, store){
				//return "<a href='#' onclick='Js.Center.SendMMS.CopyMMS.init(" + Js.Center.SendMMS.MMSCopyInfo.Infostore.getAt(rowIndex) + ")'>复制彩信</a>";
				return "<a href='#' onclick='showMMSCopy(" + rowIndex + ")'>复制彩信</a>";
			}
		}]);
		
		//==============================================================定义grid
		var mmsGrid = new WXTL.Widgets.CommonGrid.GridPanel({
			//id: "copymmsgridPanel",
			width:782,
			pageSize: _pageSize,
			store: Js.Center.SendMMS.MMSCopyInfo.Infostore,
			needMenu: false,
			needRightMenu: false,
			sm: sm,
			cm: cm
		});
		showMMSCopy = function(rowIndex){
	        var row = mmsGrid.getSelectionModel().getSelections();	        
	        if (row.length == 0) {
	            Ext.Msg.alert("温馨提示", "请您选择一条记录!");
	        }
	        else if (row.length > 1) {
	                Ext.Msg.alert("温馨提示", "对不起，您只能选择一条记录!");
	        }else if (row.length == 1) {
	            Js.Center.SendMMS.CopyMMS.window.updateRecord=row[0];
	            Js.Center.SendMMS.CopyMMS.window.mainForm.loadRecord(row[0]);
	            Js.Center.SendMMS.CopyMMS.window.show();    
            }
            if(Ext.getCmp("Js.Center.SendMMS.CopyMMS.editPanel") && Ext.getCmp("Js.Center.SendMMS.CopyMMS.editPanel").getForm()){
        		var editPanel = Ext.getCmp("Js.Center.SendMMS.CopyMMS.editPanel");
        		if (document.getElementById("Js.Center.SendMMS.CopyMMS.funcvc2imagetf") != null) {
                    editPanel.remove("Js.Center.SendMMS.CopyMMS.funcvc2image");
                    var fileUp = new WXTL.Widgets.CommonForm.FileUpload({
                        id: 'Js.Center.SendMMS.CopyMMS.funcvc2image',
                        style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
                        name: 'vc2image',
                        fieldLabel: getHelpMsg("帧图片", false, "此项非必选项，上传图片格式为："+MMSIMAGEFILETYPEDESC+"，尺寸最大限制为" + mmsConfigInfo.imagewidth + " x " + mmsConfigInfo.imageheight + "（宽x高），大小不能超过"+mmsConfigInfo.imagesize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的图片！"),
    					width: 350
                    });
                    editPanel.insert(2, fileUp);
                    editPanel.doLayout();
                }
                if (document.getElementById("Js.Center.SendMMS.CopyMMS.vc2Music") != null) {
                    editPanel.remove("Js.Center.SendMMS.CopyMMS.vc2Music");
                    var fileUp = new WXTL.Widgets.CommonForm.FileUpload({
                        id: 'Js.Center.SendMMS.CopyMMS.vc2Music',
                        style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
                        name: 'vc2music',
                        fieldLabel: getHelpMsg("帧背景音乐", false, "此项非必选项，上传音乐格式为："+MMSMUSICFILETYPEDESC+"，大小不能超过"+mmsConfigInfo.musicsize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的音乐！"),
    					width: 350
                    });
                    editPanel.insert(3, fileUp);
                    editPanel.doLayout();
                }   
        	}
	        Js.Center.SendMMS.MMSCopyInfo.window.hide();
		};
		//============================================================================ 定义formpanel
		var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
			id: "Js.Center.SendMMS.MMSCopyInfo.selectPanel",
			layout:'fit',//解决窗口还原Bug
			//bodyStyle: "padding:10px 0 10px 15px",
			queryMethod: "Js.Center.SendMMS.MMSCopyInfo.queryGrid",
			height: 130,
			defaults: {
				msgTarget: "side"
			},
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
					bodyStyle: "padding:0px 0 10px 15px",
					items: [new Ext.form.DateField({
						fieldLabel: "开始时间",
						format: 'Y-m-d',
						labelWidth: 100,
						bodyStyle: 'padding:5px 5px 0',
						readOnly: true,
						emptyText: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
						fieldLabel: "开始时间",
						name: "datcreattimestart",
						id: "MMScopyinfodatcreattimestart",
						validateOnBlur: false,
                        validator: function(){
                        var strat_time = Ext.get("MMScopyinfodatcreattimestart").dom.value;
                        var end_time = Ext.get("MMScopyinfodatcreattimeend").dom.value;
                        if (strat_time <= end_time) {
                            return true;
                        }
                        else {
                            return false;
                        }
                        },
                        invalidText: '结束时间不能小于开始时间！'
                        
					}), new Ext.form.TextField({
						fieldLabel: '彩信标题',
						name: 'mmsname',
						id: 'MMScopyinfoname',
						regex: WXTL.Common.regex.IllegalDiy,
						regexText: WXTL.Common.regexText.IllegalText,
						maxLength: 20
					})]
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
					bodyStyle: "padding:0px 0 10px 15px",
					items: [new Ext.form.DateField({
						fieldLabel: "结束时间",
						labelWidth: 100,
						format: 'Y-m-d',
						bodyStyle: 'padding:5px 5px 0',
						readOnly: true,
						emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
						name: "datcreattimeend",
						id: "MMScopyinfodatcreattimeend",
            
						validateOnBlur: false,
                        validator: function(){
                        var strat_time = Ext.get("MMScopyinfodatcreattimestart").dom.value;
                        var end_time = Ext.get("MMScopyinfodatcreattimeend").dom.value;
                        if (strat_time <= end_time) {
                            return true;
                        }
                        else {
                            return false;
                        }
                        },
                        invalidText: '结束时间不能小于开始时间！'
					}),{
						xtype: "xComboBox",
						name: "numuserid",
						fieldLabel: "创建人",
						emptyText: '-=请选择=-',
						hiddenName: "MMScopyinfoCreateuserid",
						readOnly: true,
						mode: "local",
						displayField: "vc2username",
						valueField: "numuserid",
						triggerAction: "all",
						store: Js.Center.Common.DepartUserStore
					}]
				}]
			}]
		});
		
		//============================================================== 定义查询按钮事件方法
		Js.Center.SendMMS.MMSCopyInfo.queryGrid = function(){
			if (selectPanel.getForm().isValid()) {
				var datCreatTimeStart = Ext.get("MMScopyinfodatcreattimestart").getValue();
				var datCreatTimeend = Ext.get("MMScopyinfodatcreattimeend").getValue();
				var mmsName = Ext.get("MMScopyinfoname").getValue();
				var _numcreater = Ext.get("MMScopyinfoCreateuserid").getValue();
				var flag = 'selectall';
				Js.Center.SendMMS.MMSCopyInfo.Infostore.baseParams = {
					datcreattimestart: datCreatTimeStart,
					datcreattimeend: datCreatTimeend,
					mmsname: mmsName,
					numcreater: _numcreater,
					numstate: '',
					flag: flag
				};
				Js.Center.SendMMS.MMSCopyInfo.Infostore.load({
					params: {
						start: 0,
						limit: _pageSize
					}
				});
			}
		};
		//=======================================================================定义窗体
		this.window = new WXTL.Widgets.CommonWindows.Window({
			title: "复制彩信",
			autoScroll:true,
			width: 800,
			height: 505,
			mainForm: selectPanel.getForm(),
			needButtons: false,
			updateState: false,
			closeAction: 'hide',//关闭方式
			items: [selectPanel, mmsGrid],
			buttons: [new Ext.Button({
				text: '关闭',
				minWidth: 70,
				qtip: "关闭",
				handler: function(){
					Js.Center.SendMMS.MMSCopyInfo.window.hide();
				}
			})],
            listeners: {
                "show": function(){
                    Js.Center.Common.DepartUserStore.reload();	
                    Js.Center.SendMMS.MMSCopyInfo.Infostore.load({
			            params: {
				            start: 0,
				            limit: _pageSize
			            }
		            });
                },
                "beforehide": function(){
                    selectPanel.getForm().reset();
                    Js.Center.SendMMS.MMSCopyInfo.queryGrid();
                }
            }
		});
	};
};