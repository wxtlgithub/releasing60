/*
**短信一审
*/
 
Ext.namespace('Js.Center.SendSMS.FirstCheck');
Js.Center.SendSMS.FirstCheck.info = function(node){
    
    if (Ext.get("Js.Center.SendSMS.FirstCheck.MainPanel") == null) {
    
        //============================================================================定义GridPanel相关
        // 分页每页显示数量
        var _pageSize = 12;
        //==============================================================Grid数据定义
        
        Js.Center.SendSMS.FirstCheck.infostore = new WXTL.Widgets.CommonData.GroupingStore({
            proxy: new Ext.data.HttpProxy({
                url: Js.Center.SendSMS.SmsContentURL,
                method: "POST"
            }),
            reader: new Ext.data.JsonReader({
                fields: ["numcontentid", "vc2content", "datsend","vc2username", "vc2status", "numstate","numstatus","vc2numstatus", "nummessageformat", "numsendmethod", "numpriority", "vc2detail", "numcheck", "vc2reason", "datcreate", "numcreaterid", "datpresend", "numcheck1id", "datcheck1", "numcheck2id", "datcheck2", "numprenum", "numprodid", "numsource", "numsendtype", "vc2typelist", "numstatename", "numsendtypename", "nummessageformatname","numtotal","numsuccess","numfailed"],
                root: "data",
                id: "numlogid",
                totalProperty: "totalCount"
            
            }),
            sortInfo: {
                field: 'datcreate',
                direction: 'DESC'
            },//解决分组无效代码
            baseParams: {
                flag: 'selectbykey',
                state: "0",
                numsendtype: "1,2,3,4,5,9",
                vc2content: ''
            }
        });
        Js.Center.SendSMS.FirstCheck.infostore.reload({
            params: {
                start: 0,
                limit: _pageSize
            },
            callback: function(records, options, success){
                firstCheckDoView(0);
            }
        });
        //==============================================================列选择模式
        var sm = new Ext.grid.CheckboxSelectionModel({
            dataIndex: "numcolumnid"
        });
        //==============================================================列头
        var cm = new Ext.grid.ColumnModel([{
            header: "短信内容",
            tooltip: "短信内容",
            dataIndex: "vc2content",
            sortable: true
        }, {
            header: "发送人",
            tooltip: "发送人",
            dataIndex: "vc2username",
            sortable: true
        },{
            header: "发送类型",
            tooltip: "发送类型",
            dataIndex: "numsendtypename",
            sortable: true,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
            	var row =  Js.Center.SendSMS.FirstCheck.infostore.getAt(rowIndex);
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
            header: "处理状态",
            tooltip: "处理状态",
            dataIndex: "vc2numstatus",
            sortable: true
        }, {
            header: "审核状态",
            tooltip: "审核状态",
            dataIndex: "numstatename",
            sortable: true
        }, {
            header: "内容类型",
            tooltip: "内容类型",
            dataIndex: "nummessageformatname",
            sortable: true
        }, {
            header: "创建时间",
            tooltip: "创建时间",
            dataIndex: "datcreate",
            sortable: true
        },  {
            header: "操作",
            tooltip: "操作",
            dataIndex: "numsvcid",
            width: 80,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                return "　<a href='#' onclick='firstCheckDoView(\"" + rowIndex + "\")'>查看</a>";
            }
        }, {
            header: "<font color='green'>合法</font>/<font color='red'>非法</font>",
            tooltip: "合法/非法",
            dataIndex: "numcontentid",
            width: 100,
            renderer: function(value, meta, record, rowIndex, colIndex, store){
                var row =  Js.Center.SendSMS.FirstCheck.infostore.getAt(rowIndex);
                var suc = "<font color='green'>"+ row.get("numsuccess") +"</font>";
                var fail = "/<font color='red'>"+ row.get("numfailed") +"</font>";                
                if(row.get("numsendtype") == 5 || row.get("numsendtype") == 9 || row.get("numsendtype") == 4){
                    suc = row.get("numsuccess")>0?"<a href='#' onclick='exportData(\"" + Js.Center.SendSMS.SmsContentURL + "\",\"id=" + value + "&flag=selectexport&successtype=1\")'><font color='green'>"+ row.get("numsuccess") +"</font></a>" : "<font color='green'>"+ row.get("numsuccess") +"</font>";
                    fail = row.get("numfailed")>0? "/<a href='#' onclick='exportData(\"" + Js.Center.SendSMS.SmsContentURL + "\",\"id=" + value + "&flag=selectexport&successtype=0\")'><font color='red'>"+ row.get("numfailed") +"</font></a>" : "/<font color='red'>"+ row.get("numfailed") +"</font>";
                } else if(row.get("numsendtype") == 2){
                	//客户组
                    var suc = "<font color='green'>"+ row.get("numtotal") +"</font>";
                }
                return suc + fail;
            }
        }]);
        //==============================================================定义grid
        var gridPanel = new WXTL.Widgets.CommonGrid.GridPanel({
            title: "短信一审列表",
            anchor: '100% 100%',
            pageSize: _pageSize,
            store: Js.Center.SendSMS.FirstCheck.infostore,
            needMenu: false,
            sm: sm,
            cm: cm,
            needRightMenu: false,
            listeners: {
                "rowclick": function(grid, rowindex, e){
                    firstCheckDoView(rowindex);
                }
            }
        });
        
        //============================================================================ 定义formpanel
        
        //==============================================================部门下拉列表数据定义
        
        //Js.Center.Common.DepartmentStore.load();
        
        //=============================================================栏目下拉列表数据定义
        
        //Js.Center.Common.ColumnStore.load();
        //提交或驳回后回调函数定义
        function sendSMSCallBack(){
        	 Js.Center.SendSMS.FirstCheck.infostore.reload({
                params: {
                    start: 0,
                    limit: _pageSize
                },
                callback: function(records, options, success){
                    selectPanel.getForm().reset();
                    firstCheckDoView(0);
                }
            });
        }
        
        //=============================================================定义formpanel
        var selectPanel = new WXTL.Widgets.CommonPanel.QueryFormPanel({
            title: "信息审核",
            labelWidth: 80,
            needButtons: false,
            height: 180,
            collapsed: false,
            //查询调用的方法            
            queryMethod: "Js.Center.SendSMS.FirstCheck.queryGrid",
            items: [{
                layout: 'column',
                items: [{
                    xtype: "hidden",
                    name: "numcontentid",
                    id: "Js.Center.SendSMS.FirstCheck.NumContentID"
                }, {
                    xtype: "hidden",
                    name: "flag",
                    id: "Js.Center.SendSMS.FirstCheck.Flag",
                    value: "firstcheck"
                }, {
                    xtype: "hidden",
                    name: "numstatus",
                    id: "Js.Center.SendSMS.FirstCheck.numstatus",
                    value: ""
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
                    items: [{
                        xtype: 'textarea',
                        name: 'vc2content',
                        id: "Js.Center.SendSMS.FirstCheck.vc2Content",
                        fieldLabel: '信息内容',
                        
                        readOnly: true,
                        allowBlank: false,
                        blankText: "请选择审核信息"
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
                    items: [{
                        xtype: 'textarea',
                        name: 'vc2reason',
                        id: "Js.Center.SendSMS.FirstCheck.Reason",
                        fieldLabel: '审核建议',
                        allowBlank:false,
						blankText:"请填写审核建议",
						value:"通过",
                        regex: WXTL.Common.regex.IllegalDiy,
                        regexText: WXTL.Common.regexText.IllegalText,
                        maxLength: 200,
                        maxLengthText: '长度应小于等于200',
                        validator: function(){
                        var word = Ext.get("Js.Center.SendSMS.FirstCheck.Reason").dom.value;
                        if (isExistsHtmlLable(word)) {
                            return false;
                        }
                        else {
                            return true;
                            }
                        },
                        invalidText: '帧文字不能包含HTML标签'
                    }]
                },{
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
                        html:"<div id='Js.Center.SendSMS.FirstCheck.MobileListInfo'></div>"
                    }]
                }]
            }],
            buttons: [new Ext.Button({
                text: '通过',
                handler: function(){
                    if (selectPanel.getForm().isValid()) {
                        Ext.get("Js.Center.SendSMS.FirstCheck.Flag").dom.value = "firstcheck";
                        
                        if(Ext.get("Js.Center.SendSMS.FirstCheck.numstatus").dom.value == 1){
                        
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
                            
                            var params = {
                                flag: "firstcheck",
                                vc2reason: Ext.get("Js.Center.SendSMS.FirstCheck.Reason").dom.value,
                                numcontentid: Ext.get("Js.Center.SendSMS.FirstCheck.NumContentID").dom.value,
                                vc2content: Ext.get("Js.Center.SendSMS.FirstCheck.vc2Content").dom.value
                            };
                        	doAjaxWithCallBack(Js.Center.SendSMS.SmsContentUpdateURL, params,sendSMSCallBack);
                        }
                        else {
                            Ext.Msg.alert('温馨提示', '只能审核通过处理完成状态的数据！');
                        }
                    }
                }
            }), new Ext.Button({
                text: '驳回',
                handler: function(){
                    if(Ext.get("Js.Center.SendSMS.FirstCheck.Reason").dom.value.replace(/[ ]/g,"")  == "通过"){
                        Ext.get("Js.Center.SendSMS.FirstCheck.Reason").dom.value = "";
                    }
                    if (selectPanel.getForm().isValid()) {
                        Ext.get("Js.Center.SendSMS.FirstCheck.Flag").dom.value = "rejectcheckbyfirst";
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
                        var params = {
                            flag: "rejectcheckbyfirst",
                            vc2reason: Ext.get("Js.Center.SendSMS.FirstCheck.Reason").dom.value,
                            numcontentid: Ext.get("Js.Center.SendSMS.FirstCheck.NumContentID").dom.value,
                            vc2content: Ext.get("Js.Center.SendSMS.FirstCheck.vc2Content").dom.value
                        };
                        doAjaxWithCallBack(Js.Center.SendSMS.SmsContentUpdateURL, params,sendSMSCallBack);
                    }
                }
            })]
        });
        
        //============================================================== 定义查询按钮事件方法
        Js.Center.SendSMS.FirstCheck.queryGrid = function(){
            var columnName = Ext.get("columnname").getValue();
            var flag = 'selectbykey';
            Js.Center.SendSMS.FirstCheck.infostore.baseParams = {
                columnname: columnName,
                state: "0"
            };
            Js.Center.SendSMS.FirstCheck.infostore.reload();
        };
        
        //============================================================================定义主panel
        Js.Center.SendSMS.FirstCheck.MainPanel = new Ext.Panel({
            id: "Js.Center.SendSMS.FirstCheck.MainPanel",
            frame: true, // 渲染面板
            bodyBorder: false,
            border: false,
            autoScroll: true, // 自动显示滚动条
            layout: "anchor",
            defaults: {
                collapsible: true // 允许展开和收缩
            },
            items: [selectPanel, gridPanel]
        })
    }
    
    
    //============================================================================绑定到center
    GridMain(node, Js.Center.SendSMS.FirstCheck.MainPanel, "openroomiconinfo","Js.Center.SendSMS.FirstCheck.infostore", "firstDoView()");
};

function firstDoView(){
    Js.Center.SendSMS.FirstCheck.infostore.reload({
        params: {
            start: 0,
            limit: 12
        },
        callback: function(records, options, success){
            firstCheckDoView(0);
        }
    });
};

function firstCheckDoView(rowIndex){

    if ( Js.Center.SendSMS.FirstCheck.infostore.getCount() > 0) {
        var row =  Js.Center.SendSMS.FirstCheck.infostore.getAt(rowIndex);
        var sucRate;
        var mobileTotalInfo = "总数<font color='green'>"+ row.get("numtotal") + "个</font>";
        var mobileSucInfo = "合法数<font color='green'>"+ row.get("numsuccess") + "个</font>";
        var mobileFailInfo = "非法数<font color='green'>"+ row.get("numfailed") + "个</font>";
        if(row.get("numtotal") != "" && row.get("numtotal") != 0){
            //sucRate = Math.round(row.get("numsuccess")/row.get("numtotal")*10000)/100;
            sucRate = row.get("numsuccess")/row.get("numtotal")*10000 /100;
        }
        else{
            sucRate = 0;
        }
        if(sucRate.toString().length > 5){
            sucRate = sucRate.toString().substring(0,5);
        }
        
        Ext.get("Js.Center.SendSMS.FirstCheck.Reason").dom.value = "通过";
        Ext.get("Js.Center.SendSMS.FirstCheck.NumContentID").dom.value = row.get("numcontentid");
        Ext.get("Js.Center.SendSMS.FirstCheck.vc2Content").dom.value = row.get("vc2content");
        Ext.get("Js.Center.SendSMS.FirstCheck.numstatus").dom.value = row.get("numstatus");
        
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
                mobileFailInfo = "非法数<font color='green'>"+ row.get("numfailed") + "个</font>";
            }
            sucRate = 100;
        }
        Ext.get("Js.Center.SendSMS.FirstCheck.MobileListInfo").dom.innerHTML = "号码分布情况：" + mobileTotalInfo+"，" + mobileSucInfo+"，" + mobileFailInfo+"，" + "合法率<font color='red'>"+sucRate+"%</font>";
    }
      
};
//=================================================================短信通方法
function firstCheckDoPass(id){
    var params = {
        flag: "firstcheck",
        numcontentid: id
    };
    doAjax(Js.Center.SendSMS.SmsContentUpdateURL, params, Js.Center.SendSMS.FirstCheck.infostore);
};
///=============================================================短信驳回方法
function firstCheckDoReject(id, vc2reason){
    var params = {
        flag: "rejectcheckbyfirst",
        numcontentid: id,
        vc2reason: vc2reason
    };
    doAjax(Js.Center.SendSMS.SmsContentUpdateURL, params, Js.Center.SendSMS.FirstCheck.infostore);
};


