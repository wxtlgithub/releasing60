Ext.namespace('Js.Center.System.Element');
Js.Center.System.Element.elementInfo = function(node){
    if (Ext.get("Js.Center.System.Element.mainpanel") == null) {
        //============================================================================定义GridPanel相关
        // 分页每页显示数量
        var _pageSize = 12;
        //==============================================================Grid数据定义
        var fields = ["numnodeid",
      			"vc2nodename",
				"numsocketport",
				"numtomcatport",
				"numdistriport",
				"vc2nodeip",
				"numismain",
				"numstatus",
				"numnodetype",
				"numindustry",
				"vc2projname"];
        var flag = 'selectelement';
        Js.Center.System.Element.Infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.System.ElementURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: fields,
                root: "data",
                id: "numnodeid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'numnodeid',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                numnodeid: '',
                numindustry: '',
                flag: flag
            }
        });
        /*
        Js.Center.System.Element.Infostore.load({
            params: {
                start: 0,
                limit: _pageSize,
                numnodeid: '',
                numindustry: '',
                flag: flag
            }
        });
        */
        //==============================================================列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numusergroupid"
        });
        //==============================================================列头
        var cm = new Ext.grid.ColumnModel([sm, {
            header: "网元编号",
            tooltip: "网元编号",
            dataIndex: "numnodeid",
            sortable: true
        }, {
            header: "网元名称",
            tooltip: "网元名称",
            dataIndex: "vc2nodename",
            sortable: true
        },{
        	header: "是否启用",
            tooltip: "是否启用",
            dataIndex: "numstatus",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
            	return value == "0" ? "否" : "是";
            }
        },{
            header: "网元注册",
            tooltip: "网元注册",
            dataIndex: "numnodeid",
            renderer: function(value, meta, record, rowIndex, colIndex, store){
            	var ahref = "<a href='#' onclick='Js.Center.System.Element.loadConfig(\"" + value + "\")'>加载配置</a>&nbsp;";
            	ahref += "<a href='#' onclick='Js.Center.System.Element.viewConfig(\"" + value + "\")'>查看配置</a>&nbsp;";
            	ahref += "<a href='#' onclick='Js.Center.System.Element.effectConfig(\"" + value + "\")'>生效配置</a>&nbsp;";
            	ahref += "<a href='#' onclick='Js.Center.System.Element.resumeConfig(\"" + value + "\")'>恢复配置</a>&nbsp;";
                return ahref;
            }
        }]);
         //=======================================其他需要预加载函数数组
        var usergroup_arrInitLoadFunc = new Array();
		usergroup_arrInitLoadFunc[0] = "Js.Center.System.ElementAdd.func";
        usergroup_arrInitLoadFunc[1] = "Js.Center.System.ElementUpdate.func";
        //==============================================================定义grid
        var elementGrid = new WXTL.Widgets.CommonGrid.GridPanel({
            id: "Js.Center.System.Element.elementGridPanel",
            anchor: '100% 100%',
            needMenu: false,
            needRightMenu: false,
            pageSize: _pageSize,
            store: Js.Center.System.Element.Infostore,
            //但字段修改路径定义
            afterEditURL: Js.Center.System.ElementURL,
            //添加调用方法名称
            inertMethod: 'Js.Center.System.ElementAdd',
            //修改调用方法名称
            updateMethod: 'Js.Center.System.ElementUpdate',
             //其他需要预加载函数
			otherInitLoadFunc:usergroup_arrInitLoadFunc,
            sm: sm,
            cm: cm,
            tbar: new Ext.Toolbar({
                items: [{
                    iconCls: 'addicon',
                    text: "添加",
                    handler: function(){
                        elementGrid.doInsert();
                    }
                }, "", "-", "",{
                    iconCls: 'editicon',
                    text: "修改",
                    handler: function(){
                        elementGrid.doEdit();
                    }
                }, "", "-", "",{
                    iconCls: 'editicon',
                    text: "生成配置",
                    handler: function(){
                        var rows = elementGrid.getSelectionModel().getSelections();
                        if (rows.length == 0) {
                            Ext.Msg.alert("温馨提示", "请您选择记录!");
                        }
                        else {
                            Ext.Msg.confirm("温馨提示!", "确认要在本地生成所选择的网元配置文件吗？", function(btn){
                                if (btn == "yes") {
                                	executeFile(rows);
                                }
                            }); 
                        }
                    }
                }]
            })
        });
        function executeFile(rows){
    	    var executeSplit = "";
		    for (var i = 0; i < rows.length; i++) {
		        if (rows.length == 1) {
		            executeSplit = rows[i].data.numnodeid;
		        }
		        else {
		            if (i < (rows.length - 1)) {
		                executeSplit = rows[i].data.numnodeid + "," + executeSplit;
		            }
		            if (i == (rows.length - 1)) {
		                executeSplit = executeSplit + rows[i].data.numnodeid;
		            }
		        }
		    };
		    var params = {
		        nodes: executeSplit,
		        numindustry: selectPanel.getForm().findField("numindustry").getValue(),
		        flag:"executefile"
		    };
		    doAjax(Js.Center.System.ElementURL, params,Js.Center.System.Element.Infostore);
        }
        //============================================================================ 定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            id: "elementSelectPanel",
            height: 150,
            //查询调用的方法
            queryMethod: "Js.Center.System.Element.queryGrid",
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
                    items: [
                    new Ext.form.TextField({
                        fieldLabel: '网元编号',
                        name: 'numnodeid',
                        regex: WXTL.Common.regex.Illegal,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 2,
                        maxLengthText: '长度不能超过2'
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
                    items: [{
                        xtype: "combo",
                        name: "numindustry",
                        hiddenName:"numindustry",
                        fieldLabel: "<font color=red>网元所属业务</font>",
                        allowBlank: false,
                        blankText: "网元所属业务为必选",
                        readOnly: true,
                        mode: "local",
                        displayField: "show",
                        valueField: "value",
                        triggerAction: "all",
                        value: "1",
                        store: new Ext.data.SimpleStore({
                            fields: ["show", "value"],
                            data: [["行业", "1"], ["渠道", "2"]]
                        })
                    }]
                }]
            }]
        
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.System.Element.queryGrid = function(){
            if (selectPanel.getForm().isValid()) {
                Js.Center.System.Element.Infostore.baseParams = {
                    flag: flag,
                    numnodeid: selectPanel.getForm().findField("numnodeid").getValue(),
                    numindustry: selectPanel.getForm().findField("numindustry").getValue()
                };
                Js.Center.System.Element.Infostore.load({
                    params: {
                        start: 0,
                        limit: _pageSize
                    }
                });
            }
        };
        
        //============================================================================定义主panel
        Js.Center.System.Element.MainPanel = new Ext.Panel({
            id: "Js.Center.System.Element.mainpanel",
            frame: true, // 渲染面板
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, elementGrid]
        });
        
        //============================================================================绑定到center
    };
    GridMain(node, Js.Center.System.Element.MainPanel, "openroomiconinfo", "Js.Center.System.Element.Infostore");
    
    var commondOp = "";
    // 查看远程服务配置
    Js.Center.System.Element.viewConfig = function(ID){
    	var OldID = ID;
    	    ID = getSpnodeid(ID);
    	    commondOp = "-U"+OldID+" -F15"+ID+" -Cviewsystemconfig";
			var commondjson = doSynRequest(Js.Center.System.ElementCmdURL + "?cmd=" + commondOp);
			if(commondjson.success==true){
				nodeConfigWin.show();
				nodeConfigWin.setTitle(OldID+"网元SystemConfig配置文件");
				var data = commondjson.data.replace(new RegExp("<br>","gm"),"\r\n");
				Ext.getCmp("nodeConfigInfo").setValue(data);
			}else{
				Ext.Msg.alert("提示","查看出现问题，可能是未加载配置！");
			}
    };
    // 执行加载配置命令
    Js.Center.System.Element.loadConfig = function(ID){
    		var OldID = ID;
    	    ID = getSpnodeid(ID);
    		Ext.Msg.confirm("温馨提示!", "确定执行加载吗？将本地配置加载到对应网元数据", function(btn) {
				if (btn == "yes") {
					commondOp = "-U"+OldID+" -F15"+ID+" -Cgetsystemconfig";
					doNodeCmd(commondOp,true);
				}
			}); 
    };
    // 执行恢复配置命令
    Js.Center.System.Element.resumeConfig = function(ID){
    		var OldID = ID;
    	    ID = getSpnodeid(ID);
            Ext.Msg.confirm("温馨提示!", "确定执行恢复吗？将网元分布式配置恢复到原来的配置", function(btn) {
				if (btn == "yes") {
					commondOp = "-U"+OldID+" -F15"+ID+" -Cresumesystemconfig";
					doNodeCmd(commondOp,true);
				}
			}); 
    };
    // 执行生效配置命令
    Js.Center.System.Element.effectConfig = function(ID){
    		var OldID = ID;
    	    ID = getSpnodeid(ID);
            Ext.Msg.confirm("温馨提示!", "确定执行生效配置吗？生效后将使用新配置信息", function(btn) {
				if (btn == "yes") {
					commondOp = "-U"+OldID+" -F15"+ID+" -Ceffectsystemconfig";
					doNodeCmd(commondOp,true);
				}
			}); 
    };
    // 执行命令cmd
    function doNodeCmd(cmdop,needshowmsg){
		var commondjson = doSynRequest(Js.Center.System.ElementCmdURL + "?cmd=" + cmdop);
		if(needshowmsg){
			if(commondjson.success == true){
				Ext.Msg.alert("提示","命令执行成功！");
		    }else{
		    	Ext.Msg.alert("提示","命令执行失败！");
		    }
		}
		return commondjson.error;
    }
    function getSpnodeid(ID){
    	if(ID==35||ID=="35"){
			ID = "54";
		}
		if(ID==24||ID=="24"){
			ID = "04";
		}
		return ID;
    }
    /**显示配置文件窗口*/
	var nodeConfigWin = new WXTL.Widgets.CommonWindows.Window({
            title: "SystemConfig配置文件",
            width: 700,
            height: 500,
            autoScroll: true, // 自动显示滚动条
			frame:true,
            updateState: true,
            needLoadDataStore:false,
            needButtons: false,
            items:[{xtype:"textarea",
		            width:"100%",
		            height:"100%",
		            id:"nodeConfigInfo"//,
		            //html:"<div id='Js.Center.System.Element.View'></div>"
		    }],
            buttons: [{
                text: "关  闭",
                minWidth: 70,
                handler: function(){
                	nodeConfigWin.hide();
                }
            }]
        });
};