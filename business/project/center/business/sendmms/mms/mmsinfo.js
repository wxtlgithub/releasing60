Ext.namespace('Js.Center.SendMMS.MMS');

Js.Center.SendMMS.MMS.MMSinfo = function(node){
    Js.Center.SendMMS.MMS.InitMMSInfo = newMMS('', '', 1, 1);
    if (Ext.get("Js.Center.SendMMS.MMS.mainpanel") == null) {
        //============================================================================定义GridPanel相关
        // ====================================================================== 定义添加、删除、修改、授权方法
        
        // =====================复制方法
        mmscopy = function(){
        
            Js.Center.SendMMS.MMSCopyInfo.window.show();
            // Js.Center.SendMMS.MMSCopyInfo.info(true);
        };
        // 分页每页显示数量
        var _pageSize = 12;
        //==============================================================Grid数据定义
        var fields = ["nummmsid", "vc2name", "vc2centerid", "datcreatetime", "numuserid", "vc2username", "datmodifytime", "numcheckuserid", "datchecktime", "vc2smilurl", "numstate", "nummmstype", "datcreattime", "nummoduserid", "vc2modusername", "vc2desc"];
        Js.Center.SendMMS.MMS.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
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
                flag: 'selectself'
            }
        });
        Js.Center.SendMMS.MMS.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize
            }
        });
        //==============================================================列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "nummmsid"
        });
        //==============================================================列头
        var cm = new Ext.grid.ColumnModel([sm, {
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
		},  {
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
        }, {
            header: "资源中心ID",
            tooltip: "资源中心ID",
            dataIndex: "vc2centerid",
            sortable: true
        }, {
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
            header: "上传资源",
            tooltip: "上传资源",
            dataIndex: "nummmsid",
            width: 60,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                return "<a href='#' onclick='Js.Center.SendMMS.MMSresourceUpload.func(" + value + ")'>上传资源</a>";
            }
        }]);
        var MMSarrInitLoadFunc = new Array();
        MMSarrInitLoadFunc[0] = "Js.Center.SendMMS.MMSCopyInfo.info";
        MMSarrInitLoadFunc[1] = "Js.Center.SendMMS.MMSAdd.func_edit";
        MMSarrInitLoadFunc[2] = "Js.Center.SendMMS.MMSUpdate.func_Update";
        MMSarrInitLoadFunc[3] = "Js.Center.SendMMS.CopyMMS.init";
        MMSarrInitLoadFunc[4] = "Js.Center.SendMMS.CopyMMS.func";
        
        
        //==============================================================定义grid
        var mmsGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            id: "mmsgridPanel",
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.SendMMS.MMS.Infostore,
            needMenu: false,
            needRightMenu: false,
            
            //但字段修改路径定义
            afterEditURL: Js.Center.SendMMS.MMSUpdateURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.SendMMS.MMSAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.SendMMS.MMSUpdate',
            //删除调用方法名称
            deleteMethod: 'Js.Center.SendMMS.MMSdelete.func',
            //其他需要预加载函数
            otherInitLoadFunc: MMSarrInitLoadFunc,//'Js.Center.Business.ProductPermitsvc.func',
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "添加",
                    handler: function(){
                        mmsGrid.doInsert();
                    }
                }, "", "-", "", {
                    text: "修改",
                    iconCls: "editicon",
                    handler: function(){
                    	if(Ext.getCmp("Js.Center.SendMMS.MMSUpdate.updateEditPanel") && Ext.getCmp("Js.Center.SendMMS.MMSUpdate.updateEditPanel").getForm()){
                    		var updateEditPanel = Ext.getCmp("Js.Center.SendMMS.MMSUpdate.updateEditPanel");
                    		if (document.getElementById("Js.Center.SendMMS.MMSUpdate.funcvc2imagetf") != null) {
								updateEditPanel.remove("Js.Center.SendMMS.MMSUpdate.funcvc2image");
								var fileUp = new WXTL.Widgets.CommonForm.FileUpload({
									id: 'Js.Center.SendMMS.MMSUpdate.funcvc2image',
									style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
									name: 'vc2image',
									fieldLabel: getHelpMsg("帧图片", false, "此项非必选项，上传图片格式为："+MMSIMAGEFILETYPEDESC+"，尺寸最大限制为" + mmsConfigInfo.imagewidth + " x " + mmsConfigInfo.imageheight + "（宽x高），大小不能超过"+mmsConfigInfo.imagesize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的图片！"),
									width: 350
								});
								updateEditPanel.insert(2, fileUp);
								updateEditPanel.doLayout();
							}
							if (document.getElementById("Js.Center.SendMMS.MMSUpdate.vc2Music") != null) {
								updateEditPanel.remove("Js.Center.SendMMS.MMSUpdate.vc2Music");
								var fileUpMusic = new WXTL.Widgets.CommonForm.FileUpload({
									id: 'Js.Center.SendMMS.MMSUpdate.vc2Music',
									style: 'border: 1px solid #C0C0C0;height:22;cursor:hand',
									name: 'vc2music',
									fieldLabel: getHelpMsg("帧背景音乐", false, "此项非必选项，上传音乐格式为："+MMSMUSICFILETYPEDESC+"，大小不能超过"+mmsConfigInfo.musicsize/1024+"K；选中右侧“不需要”项，则删除当前帧已上传的音乐！"),
									width: 350
								});
								updateEditPanel.insert(3, fileUpMusic);
								updateEditPanel.doLayout();
							}
                    	}
                        mmsGrid.doEdit();
                    }
                }, "", "-", "", {
                    text: "删除",
                    iconCls: "deleteicon",
                    handler: function(){
                        mmsGrid.doDelete();
                        
                    }
                }, "", "-", "", {
                    text: "复制",
                    iconCls: "copyicon",
                    handler: mmscopy
                }]
            }),
            
            sm: sm,
            cm: cm
        });
        
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "columnSelectPanel",
            layout: 'fit',//解决窗口还原Bug
            bodyStyle: "padding:10px 0 10px 15px",
            queryMethod: "Js.Center.SendMMS.MMS.queryGrid",
            height: 160,
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
                    bodyStyle: "padding:10px 0 10px 15px",
                    items: [new Ext.form.DateField({
                        fieldLabel: "开始时间",
                        format: 'Y-m-d',
                        labelWidth: 100,
                        bodyStyle: 'padding:5px 5px 0',
                        readOnly: true,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow(), -7/*减3天*/), 'Y-m-d'),
                        fieldLabel: "开始时间",
                        name: "datcreattimestart",
                        id: "MMSinfodatcreattimestart",
                        validateOnBlur: false,
                        validator: function(){
                            var strat_time = Ext.get("MMSinfodatcreattimestart").dom.value;
                            var end_time = Ext.get("MMSinfodatcreattimeend").dom.value;
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
                        id: 'mmsname',
                        regex: WXTL.Common.regex.Illegal,
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
                    bodyStyle: "padding:10px 0 10px 15px",
                    items: [new Ext.form.DateField({
                        fieldLabel: "结束时间",
                        labelWidth: 100,
                        format: 'Y-m-d',
                        bodyStyle: 'padding:5px 5px 0',
                        readOnly: true,
                        emptyText: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d'),
                        name: "datcreattimeend",
                        id: "MMSinfodatcreattimeend",
                        validateOnBlur: false,
                        validator: function(){
                            var strat_time = Ext.get("MMSinfodatcreattimestart").dom.value;
                            var end_time = Ext.get("MMSinfodatcreattimeend").dom.value;
                            if (strat_time <= end_time) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        },
                        invalidText: '结束时间不能小于开始时间！'
                    })]
                }]
            }]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.SendMMS.MMS.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                var datCreatTimeStart = Ext.get("MMSinfodatcreattimestart").getValue();
                var datCreatTimeend = Ext.get("MMSinfodatcreattimeend").getValue();
                var mmsName = Ext.get("mmsname").getValue();
                var flag = 'selectself';
                Js.Center.SendMMS.MMS.Infostore.baseParams = {
                    datcreattimestart: datCreatTimeStart,
                    datcreattimeend: datCreatTimeend,
                    mmsname: mmsName,
                    numcreater: '',
                    flag: flag
                };
                Js.Center.SendMMS.MMS.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.SendMMS.MMS.mainpanel = new Ext.Panel({
            id: "Js.Center.SendMMS.MMS.mainpanel",
            frame: true, // 渲染面板
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, mmsGrid]
        });
        
        //============================================================================绑定到center
    };
    GridMain(node, Js.Center.SendMMS.MMS.mainpanel, "openroomiconinfo", "Js.Center.SendMMS.MMS.Infostore");
    // Js.Center.SendMMS.MMSCopyInfo.info(false);
};

