Ext.namespace('Js.Center.Business.ProductAdd');
Ext.QuickTips.init();

Js.Center.Business.ProductAdd.func = function(){
	//扩展子码Form
	var formPanel = new Ext.form.FormPanel({
		layout : 'form',
		items : [{
					xtype : "hidden",
					fieldLabel : '通道id',
					id : 'Js.Center.Business.ProductAdd.SubcodeSvcid'
				}, {
					xtype : "textfield",
					fieldLabel : '请输入扩展子码',
					id : 'Js.Center.Business.ProductAdd.vc2subcode',
					allowBlank:false,
					blankText:'扩展子号码不能为空!',
					maxLength : 10,
					maxLengthText : '长度不能超过10',
                    regex: WXTL.Common.regex.Integer,
                    regexText: "扩展子码不允许为空,且只能输入数字"
				}]

	});
	//添加、修改扩展子码window
	Js.Center.Business.ProductAdd.windowAddSubcode = new Ext.Window({//new WXTL.Widgets.CommonWindows.Window
		//title: "监视信息",
		title:"修改扩展子码",
		hidden:true,
		//anchor: '100% 100%',
		width:300,
		headerAsText:true,
		border: false,
		bodyBorder:false, 
		plain:true,
		modal: 'true',
		hideBorders:true, 
		closable:true,
		autoScroll: false,
		closeAction: 'close',//关闭方式
		bodyStyle: "padding:10px 10px 10px 10px;background:#ffffff;",			
		items: [
			formPanel
		],					
		buttons:[new Ext.Button({
            text: '确定',
            minWidth: 70,
            qtip: "确定",
            handler: function(){
            	if(!formPanel.getForm().isValid()){
            		return ;
            	}
            	var subCode = Ext.getCmp("Js.Center.Business.ProductAdd.vc2subcode").getValue();
            	var tostorelength = Js.Center.Business.ProductAdd.Productspolicy.items.items[0].toStore.data.length;
                var tostroedata = Js.Center.Business.ProductAdd.Productspolicy.items.items[0].toMultiselect.view.store;
                var record;
//                for (var i = 0; i < tostorelength; i++) {
//                	record = tostroedata.getAt(i);
//                	if(record.get("vc2subcode") != ""){
//	                	record.set("vc2subcode",subCode);
//	                	record.set("numsvcid",record.get("numsvcid1")+"_"+record.get("vc2subcode"));
//        				record.set("vc2svcname",record.get("vc2svcname1")+"_"+record.get("vc2subcode")  + "   <img src='jspack/product/common/Images/file-add.gif' qtip='添加/修改扩展子号码' onclick='Js.Center.Business.ProductAdd.addSubCode(\""+record.get("numsvcid1")+"\",\""+record.get("vc2subcode")+"\")'/>" + "<img src='jspack/product/common/Images/file-remove.gif' qtip='删除扩展子号码' onclick='Js.Center.Business.ProductAdd.deleteSubCode(\""+record.get("numsvcid1")+"\")'/>");
//        				record.commit();
//                	}
//                };
                record = tostroedata.getById(Ext.getCmp("Js.Center.Business.ProductAdd.SubcodeSvcid").getValue());
                record.set("vc2subcode",subCode);
                record.set("numsvcid",record.get("numsvcid1")+"_"+record.get("vc2subcode"));
				record.set("vc2svcname",record.get("vc2svcname1")+"_"+record.get("vc2subcode")  + "   <img src='jspack/product/common/Images/file-add.gif' qtip='添加/修改扩展子号码' onclick='Js.Center.Business.ProductAdd.addSubCode(\""+record.get("numsvcid1")+"\",\""+record.get("vc2subcode")+"\")'/>" + "<img src='jspack/product/common/Images/file-remove.gif' qtip='删除扩展子号码' onclick='Js.Center.Business.ProductAdd.deleteSubCode(\""+record.get("numsvcid1")+"\")'/>");
				record.commit();
                Js.Center.Business.ProductAdd.Productspolicy.items.items[0].toMultiselect.view.refresh();
            	Js.Center.Business.ProductAdd.Productspolicy.items.items[0].fromMultiselect.view.refresh();
            
            	Js.Center.Business.ProductAdd.windowAddSubcode.hide();
            	//获取已选通道id，赋值给隐藏域
            	var ids = "";
                var tostorelength = Js.Center.Business.ProductAdd.Productspolicy.items.items[0].toStore.data.length;
                var tostroedata = Js.Center.Business.ProductAdd.Productspolicy.items.items[0].toStore.data;
                
                for (var i = 0; i < tostorelength; i++) {
                    if (tostorelength == 1) {
                        ids = tostroedata.items[i].data.numsvcid;
                    }
                    else {
                    
                        if (i < (tostorelength - 1)) {
                            ids = tostroedata.items[i].data.numsvcid + "," + ids;
                        }
                        if (i == (tostorelength - 1)) {
                            ids = ids + tostroedata.items[i].data.numsvcid;
                        }
                    }
                };
            	Ext.getCmp("Js.Center.Business.ProductAdd.UsedService").setValue(ids);

            	Ext.getCmp("Js.Center.Business.ProductAdd.vc2subcode").reset();
            	Js.Center.Business.ProductAdd.PreviewProduct();
                
            }
        }),new Ext.Button({
            text: '取消',
            minWidth: 70,
            qtip: "取消",
            handler: function(){
            	Js.Center.Business.ProductAdd.windowAddSubcode.hide();
            	Ext.getCmp("Js.Center.Business.ProductAdd.vc2subcode").reset();
            }
        })]
	});
	//加载通道组预览信息
	Js.Center.Business.ProductAdd.PreviewProduct = function(){
    	var dataStore = Js.Center.Business.ProductAdd.Productspolicy.items.items[0].toMultiselect.view.store;
    	var strPreviewInfo = "<dl><dt>预览：</dt>";
    	for(var i=0;i<dataStore.data.length;i++){
    		var record = dataStore.getAt(i);
    		var blackFlag ="";
    		if(record.get("numblackflag") == 2){
    			blackFlag="黑名单";
    		}
    		else if(record.get("numblackflag") == 1){
    			blackFlag="白名单";
    		}
    		strPreviewInfo += "<dd style='margin-left:90px; '>"+record.get("vc2name") + "&nbsp;"+record.get("longservicecode") +record.get("vc2subcode")+"&nbsp;"+ blackFlag + "</dd>";
    	}
    	strPreviewInfo += "</dl><br>";
    	Ext.get("Js.Center.Business.ProductAdd.preview").dom.innerHTML = strPreviewInfo;
    };
    //添加、修改扩展子码
    Js.Center.Business.ProductAdd.addSubCode = function(svcid,subcode){
    	Ext.getCmp("Js.Center.Business.ProductAdd.SubcodeSvcid").setValue(svcid);
    	Ext.getCmp("Js.Center.Business.ProductAdd.vc2subcode").setValue(subcode);
    	Js.Center.Business.ProductAdd.windowAddSubcode.show();
    };
    //删除扩展子码
    Js.Center.Business.ProductAdd.deleteSubCode = function(svcid){
    	var record = Js.Center.Business.ProductAdd.Productspolicy.items.items[0].toMultiselect.view.store.getById(svcid);
    	record.set("numsvcid",record.get("numsvcid1"));
    	record.set("vc2subcode","");
    	record.set("vc2svcname",record.get("vc2svcname1")+"_" + "   <img src='jspack/product/common/Images/file-add.gif' qtip='添加/修改扩展子号码' onclick='Js.Center.Business.ProductAdd.addSubCode(\""+record.get("numsvcid1")+"\",\""+record.get("vc2subcode")+"\")'/>" + "<img src='jspack/product/common/Images/file-remove.gif' qtip='删除扩展子号码' onclick='Js.Center.Business.ProductAdd.deleteSubCode(\""+record.get("numsvcid1")+"\")'/>");
    	Js.Center.Business.ProductAdd.Productspolicy.items.items[0].toMultiselect.view.refresh();
    	Js.Center.Business.ProductAdd.Productspolicy.items.items[0].fromMultiselect.view.refresh();
    	Js.Center.Business.ProductAdd.PreviewProduct();
    };
    //if (Js.Center.Business.ProductAdd.AddproductInfoWin == null) {
	//==============================================================为产品已指定的通道下拉列表数据定义
    var productPermitsvcStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: Js.Center.Business.ProductURL,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            fields: ['numsvcid','numsvcid1','vc2svcname','vc2svcname1','numecid','vc2ecname','vc2opid','vc2name','numblackflag','vc2subcode','longservicecode'],
            root: 'data',
            id: 'numsvcid1'
        }),
        baseParams: {
            flag: 'selectecservice',
            type: 1,
            numecid:'',
            numprodid:''
        }
    });
    //==============================================================为产品未指定的通道下拉列表数据定义
    var productNoPermitsvcStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: Js.Center.Business.ProductURL,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
        	fields: ['numsvcid','numsvcid1','vc2svcname','vc2svcname1','numecid','vc2ecname','vc2opid','vc2name','numblackflag','vc2subcode','longservicecode'],
            root: 'data',
            id: 'numsvcid1'
        }),
        baseParams: {
        	flag: 'selectecservice',
            type: 0,
            numecid:'',
            numprodid:''
        }
    });
    Js.Center.Business.ProductAdd.Productspolicy = new Ext.Panel({
        frame: true,
        bodyStyle: 'padding:10px,0px,10px,10px',
        autoScroll: true,// 自动显示滚动条
        labelWidth: 60,
        //height: 150,
        items: [{
            anchor: ',100%',
            xtype: "itemselector",
            id: "Js.Center.Business.ProductAdd.Productspolicyasproductids",
            name: "itemselector",
            fieldLabel: "配置路由",
            dataFields: ['numsvcid','numsvcid1','vc2svcname','vc2svcname1','numecid','vc2ecname','vc2opid','vc2name','numblackflag','vc2subcode','longservicecode'],
            toData: [""],
            msWidth: 300,
            autoScroll: true,
            enableDD: false,
            msHeight: 200,
            valueField: 'numsvcid',
            displayField: 'vc2svcname',
            //imagePath: "jspack/product/common/Images/",
            toLegend: "已选通道",
            fromLegend: "待选通道",
            fromStore: productNoPermitsvcStore,
            toStore: productPermitsvcStore,
            fromTo: function(){
        		var selectionsArray = this.fromMultiselect.view.getSelectedIndexes();
        		var records = [];
        		var isValid;
        		if (selectionsArray.length > 0) {
        			//得到已选通道
        			var toItemIds = "";
        			var selectItems = this.toStore.data.items;
        			if(selectItems.length > 0){
            			for(var i = 0; i < selectItems.length; i++){
            				if(i == selectItems.length - 1){
                				toItemIds += selectItems[i].json.numsvcid1;
            				} else {
                				toItemIds += selectItems[i].json.numsvcid1 + ",";
            				}
            			}
        			}
        			for (var i=0; i<selectionsArray.length; i++) {
        				record = this.fromMultiselect.view.store.getAt(selectionsArray[i]);
            			if(toItemIds != "") {
            				returnInfo = ajaxSyncCall(Js.Center.Business.ProductURL,"flag=checkselectnumsvcid&numsvcid=" + record.get("numsvcid1") + "&selectsvcid=" + toItemIds);
                			//已选栏已经有通道则进行网关和地区验证
        					if(true == returnInfo.success){
                				records.push(record);
                    			if("" == toItemIds){
                    				toItemIds = record.get("numsvcid1");
                    			} else {
                    				toItemIds = record.get("numsvcid1") + "," + toItemIds;
                    			}
    						} else {
    							//包含相同的网关和地区
    							Ext.Msg.alert("提示信息", "'" + record.get("vc2svcname1") +"' 与 '" + returnInfo.info + "' 网关运营商及地区相同请确认");
    							return "";
    						} 
            			} else {
            				records.push(record);
                			if("" == toItemIds){
                				toItemIds = record.get("numsvcid1");
                			} else {
                				toItemIds = record.get("numsvcid1") + "," + toItemIds;
                			}
            			}
        			}
        			if(!this.allowDup)selectionsArray = [];
        			for (var i=0; i<records.length; i++) {
        				record = records[i];
        				record.set("numsvcid",record.get("numsvcid1")+"_"+record.get("vc2subcode"));
        				record.set("vc2svcname",record.get("vc2svcname1")+"_"+record.get("vc2subcode")  + "   <img src='jspack/product/common/Images/file-add.gif' qtip='添加/修改扩展子号码' onclick='Js.Center.Business.ProductAdd.addSubCode(\""+record.get("numsvcid1")+"\",\""+record.get("vc2subcode")+"\")'/>" + "<img src='jspack/product/common/Images/file-remove.gif' qtip='删除扩展子号码' onclick='Js.Center.Business.ProductAdd.deleteSubCode(\""+record.get("numsvcid1")+"\")'/>");
        				record.commit();
        				if(this.allowDup){
        					var x=new Ext.data.Record();
        					record.id=x.id;
        					delete x;   
        					this.toMultiselect.view.store.add(record);
        				}else{
        					this.fromMultiselect.view.store.remove(record);
        					this.toMultiselect.view.store.add(record);
        					selectionsArray.push((this.toMultiselect.view.store.getCount() - 1));
        				}
        			}
        		}
        		this.toMultiselect.view.refresh();
        		this.fromMultiselect.view.refresh();
        		if(this.toSortField)this.toMultiselect.store.sort(this.toSortField, this.toSortDir);
        		if(this.allowDup)this.fromMultiselect.view.select(selectionsArray);
        		else this.toMultiselect.view.select(selectionsArray);
        	},
        	toFrom: function(){
        		var selectionsArray = this.toMultiselect.view.getSelectedIndexes();
                var records = [];
                if (selectionsArray.length > 0) {
                    for (var i=0; i<selectionsArray.length; i++) {
                        record = this.toMultiselect.view.store.getAt(selectionsArray[i]);
                        record.set("numsvcid",record.get("numsvcid1"));
        				record.set("vc2svcname",record.get("vc2svcname1"));
        				record.commit();
                        records.push(record);
                    }
                    selectionsArray = [];
                    for (var i=0; i<records.length; i++) {
                        record = records[i];
                        this.toMultiselect.view.store.remove(record);
                        if(!this.allowDup){
                            this.fromMultiselect.view.store.add(record);
                            selectionsArray.push((this.fromMultiselect.view.store.getCount() - 1));
                        }
                    }
                }
                this.fromMultiselect.view.refresh();
                this.toMultiselect.view.refresh();
                if(this.fromSortField)this.fromMultiselect.store.sort(this.fromSortField, this.fromSortDir);
                this.fromMultiselect.view.select(selectionsArray);
        	},
        	onRowDblClick: function(vw, index, node, e){
        		if(vw.ownerCt.title == this.fromLegend){
        			var record = vw.store.getAt(index);
        			var toItemIds = "";
        			var selectItems = this.toStore.data.items;
        			if(selectItems.length > 0){
            			for(var i = 0; i < selectItems.length; i++){
            				if(i == selectItems.length - 1){
                				toItemIds += selectItems[i].json.numsvcid1;
            				} else {
                				toItemIds += selectItems[i].json.numsvcid1 + ",";
            				}
            			}
        			}
        			if(selectItems.length > 0) {
        				returnInfo = ajaxSyncCall(Js.Center.Business.ProductURL,"flag=checkselectnumsvcid&numsvcid=" + record.get("numsvcid1") + "&selectsvcid=" + toItemIds);
            			//已选栏已经有通道则进行网关和地区验证
    					if(true == returnInfo.success){
		        			record.set("numsvcid",record.get("numsvcid1")+"_"+record.get("vc2subcode"));
		    				record.set("vc2svcname",record.get("vc2svcname1")+"_"+record.get("vc2subcode")  + "   <img src='jspack/product/common/Images/file-add.gif' qtip='添加/修改扩展子号码' onclick='Js.Center.Business.ProductAdd.addSubCode(\""+record.get("numsvcid1")+"\",\""+record.get("vc2subcode")+"\")'/>" + "<img src='jspack/product/common/Images/file-remove.gif' qtip='删除扩展子号码' onclick='Js.Center.Business.ProductAdd.deleteSubCode(\""+record.get("numsvcid1")+"\")'/>");
		    				record.commit();
	    					return this.fireEvent('rowdblclick', vw, index, node, e);
						} else {
							//包含相同的网关和地区
							Ext.Msg.alert("提示信息", "'" + record.get("vc2svcname1") + "' 与 '" + returnInfo.info + "' 网关运营商及地区相同请确认");
							return false;
						} 
        			} else {
	        			record.set("numsvcid",record.get("numsvcid1")+"_"+record.get("vc2subcode"));
	    				record.set("vc2svcname",record.get("vc2svcname1")+"_"+record.get("vc2subcode")  + "   <img src='jspack/product/common/Images/file-add.gif' qtip='添加/修改扩展子号码' onclick='Js.Center.Business.ProductAdd.addSubCode(\""+record.get("numsvcid1")+"\",\""+record.get("vc2subcode")+"\")'/>" + "<img src='jspack/product/common/Images/file-remove.gif' qtip='删除扩展子号码' onclick='Js.Center.Business.ProductAdd.deleteSubCode(\""+record.get("numsvcid1")+"\")'/>");
	    				record.commit();
	    				return this.fireEvent('rowdblclick', vw, index, node, e);
        			}
        		} else{
        			var record = vw.store.getAt(index);
        			record.set("numsvcid",record.get("numsvcid1"));
    				record.set("vc2svcname",record.get("vc2svcname1"));
    				record.commit();
    				return this.fireEvent('rowdblclick', vw, index, node, e);
        		}
        	},
            listeners: {
                "change": function(){
                	Js.Center.Business.ProductAdd.PreviewProduct();
                	//获取已选通道id，赋值给隐藏域
                	var ids = "";
                    var tostorelength = Js.Center.Business.ProductAdd.Productspolicy.items.items[0].toStore.data.length;
                    var tostroedata = Js.Center.Business.ProductAdd.Productspolicy.items.items[0].toStore.data;
                    
                    for (var i = 0; i < tostorelength; i++) {
                        if (tostorelength == 1) {
                            ids = tostroedata.items[i].data.numsvcid;
                        }
                        else {
                        
                            if (i < (tostorelength - 1)) {
                                ids = tostroedata.items[i].data.numsvcid + "," + ids;
                            }
                            if (i == (tostorelength - 1)) {
                                ids = ids + tostroedata.items[i].data.numsvcid;
                            }
                        }
                    };
                	Ext.getCmp("Js.Center.Business.ProductAdd.UsedService").setValue(ids);
                }
            }
        }]
    });
    
    //定义预览Panel
    var previewProductPanel = new Ext.Panel({
    	labelWidth: 80,
        defaults: {
            anchor: "90%",
            msgTarget: "side"
        },
        layout: 'form',
        //bodyStyle: "padding:10px 0 10px 15px",
        items:[{
        	xtype: "label",
	        name: "vc2name",
	        fieldLabel: "<font color=red>预览</font>",
	        html:''
        }]
    });
    
    Js.Center.Business.ProductAdd.ReloadServiceCodeStore =  function(){
    	var vc2servicetype = mainForm.items.items[3].getValue();
    	var numecid = mainForm.items.items[5].getValue();
    	if(vc2servicetype == null 
    	|| vc2servicetype == ""
    	|| numecid == null
    	|| numecid == ""){
    		return ;
    	}
    	productPermitsvcStore.baseParams = {
            flag: 'selectecservice',
            numprodid: '',//Js.Center.Business.ProductAdd.window.updateRecord.get("numprodid"),
            vc2servicetype:vc2servicetype,
            numecid:numecid,
            type:1
        };
    	productNoPermitsvcStore.baseParams = {
            flag: 'selectecservice',
            numprodid: '',//Js.Center.Business.ProductAdd.window.updateRecord.get("numprodid"),
            vc2servicetype:vc2servicetype,
            numecid:numecid,
            type:0
        };
    	productPermitsvcStore.reload({
    		callback: function(){
    			var tostorelength = Js.Center.Business.ProductAdd.Productspolicy.items.items[0].toStore.data.length;
                var tostroedata = Js.Center.Business.ProductAdd.Productspolicy.items.items[0].toMultiselect.view.store;
                var record;
                for (var i = 0; i < tostorelength; i++) {
                	record = tostroedata.getAt(i);
                	record.set("numsvcid",record.get("numsvcid1")+"_"+record.get("vc2subcode"));
    				record.set("vc2svcname",record.get("vc2svcname1")+"_"+record.get("vc2subcode")  + "   <img src='jspack/product/common/Images/file-add.gif' qtip='添加/修改扩展子号码' onclick='Js.Center.Business.ProductAdd.addSubCode(\""+record.get("numsvcid1")+"\",\""+record.get("vc2subcode")+"\")'/>" + "<img src='jspack/product/common/Images/file-remove.gif' qtip='删除扩展子号码' onclick='Js.Center.Business.ProductAdd.deleteSubCode(\""+record.get("numsvcid1")+"\")'/>");
    				record.commit();
                };
                Js.Center.Business.ProductAdd.Productspolicy.items.items[0].toMultiselect.view.refresh();
            	Js.Center.Business.ProductAdd.Productspolicy.items.items[0].fromMultiselect.view.refresh();
    		}
    	});
    	productNoPermitsvcStore.reload();
    	Js.Center.Business.ProductAdd.PreviewProduct();
    };
    
	// =====================================================================定义FormPanel
    var AddproductInfofp = new Ext.form.FormPanel({
        //id: "AddproductInfofp",
        //width: 600,
        frame: true,
        labelWidth: 80,
        defaults: {
            anchor: "98%",
            msgTarget: "side"
        },
        bodyStyle: "padding:10px 0 10px 15px",
        //layout: 'form',
//        defaultType: "textfield",
//        //锚点布局-
//        defaults: {
//            anchor: "90%",
//            msgTarget: "side"
//        },
//        buttonAlign: "center",
//        bodyStyle: "padding:10px 0 10px 15px",
        items:[{
        	layout: 'column',
        	items: [{
                xtype: "hidden",
                name: "flag",
                value: "insert"
            },{
                xtype: "hidden",
                name: "usedservice",
                id: "Js.Center.Business.ProductAdd.UsedService"
            }, {
            	columnWidth: .5,
                layout: 'form',
                defaultType: "textfield",
                //锚点布局-
                defaults: {
                    anchor: "93%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                //bodyStyle: "padding:10px 0 10px 15px",
                items:[{
                    xtype: 'numberfield',
                    name: 'numprodid',
                    fieldLabel: "<font color=red>通道组编号</font>",
                    allowBlank: false,
                    blankText: '编号不允许为空',
                    maxLength:10,
                    maxValue: 2000000000,
                    maxText: '最大不能超过2000000000',
                    minValue: 0,
                    minText: '最小不能小于1'
                },{
                    xtype: "combo",
                    name: "vc2servicetype",
                    fieldLabel: "<font color=red>短彩类型</font>",
                    hiddenName: "vc2servicetype",
                    id:"Js.Center.Business.ProductAdd.vc2servicetype",
                    readOnly: true,
                    allowBlank: false,
                    mode: "local",
                    displayField: "show",
                    valueField: "value",
                    triggerAction: "all",
                    value: "1",
                    store: new Ext.data.SimpleStore({
                        fields: ["show", "value"],
                        data: [["短信", "1"], ["彩信", "2"]]  //, ["短信PV", "4"], ["彩信PV", "5"], ["wapPV", "6"]
                    }),
                    listeners: {
                        "select": Js.Center.Business.ProductAdd.ReloadServiceCodeStore
                    }
                },{
                    xtype: "combo",
                    name: "vc2subcodeflag",
                    fieldLabel: "<font color=red>扩展子号</font>",
                    hiddenName: "vc2subcodeflag",
                    readOnly: true,
                    allowBlank: false,
                    mode: "local",
                    displayField: "show",
                    valueField: "value",
                    triggerAction: "all",
                    value: "1",
                    store: new Ext.data.SimpleStore({
                        fields: ["show", "value"],
                        data: [["精确", "1"], ["模糊", "0"]] 
                    })
                },{
                    xtype: "xComboBox",
                    name: "numecid",
                    fieldLabel: "<font color=red>选择客户</font>",
                    hiddenName: "numecid",
                    allowBlank: false,
                    id:'Js.Center.Business.ProductAdd.numecid',
                    blankText: "客户不允许为空",
                    //readOnly: true,
                    mode: "local",
                    displayField: "vc2ecname",
                    valueField: "numecid",
                    triggerAction: "all",
                    emptyText: "-=请选择=-",
                    store: Js.Center.Common.EcListStore,
                    listeners: {
                        "select": Js.Center.Business.ProductAdd.ReloadServiceCodeStore
                    }
                }]
            },{
            	columnWidth: .5,
                layout: 'form',
                defaultType: "textfield",
                //锚点布局-
                defaults: {
                    anchor: "93%",
                    msgTarget: "side"
                },
                buttonAlign: "center",
                //bodyStyle: "padding:10px 0 10px 15px",
                items:[{
                    xtype: "textfield",
                    name: "vc2name",
                    fieldLabel: "<font color=red>通道组名称</font>",
                    allowBlank: false,
                    blankText: "通道组名称不允许为空",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
                    maxLength: 10
                },{
                    xtype: "combo",
                    name: "vc2validflag",
                    fieldLabel: "<font color=red>状态</font>",
                    hiddenName: "vc2validflag",
                    readOnly: true,
                    allowBlank: false,
                    mode: "local",
                    displayField: "show",
                    valueField: "value",
                    triggerAction: "all",
                    value: "1",
                    store: new Ext.data.SimpleStore({
                        fields: ["show", "value"],
                        data: [["商用", "1"], ["暂停", "0"]]  //, ["短信PV", "4"], ["彩信PV", "5"], ["wapPV", "6"]
                    })
                },{
                    xtype: "combo",
                    name: "numpriflag",
                    fieldLabel: "<font color=red>优先级</font>",
                    hiddenName: "numpriflag",
                    readOnly: true,
                    allowBlank: false,
                    mode: "local",
                    displayField: "show",
                    valueField: "value",
                    triggerAction: "all",
                    value: "1",
                    store: new Ext.data.SimpleStore({
                        fields: ["show", "value"],
                        data: [["低", "0"], ["中", "1"], ["高", "2"], ["最高", "3"]]  //, ["短信PV", "4"], ["彩信PV", "5"], ["wapPV", "6"]
                    })
                }]
            }]
        },Js.Center.Business.ProductAdd.Productspolicy,{
        	xtype: "label",
        	id:"Js.Center.Business.ProductAdd.preview",
	        name: "productpreview",
	        fieldLabel: "<font color=red>预览</font>"
	        //disabled:true
        },{
            xtype: "textarea",
            name: "vc2dsc",
            fieldLabel: "通道组描述",
            height: 100,
            bodyStyle: "padding:10px 0 10px 15px",
            regex: WXTL.Common.regex.Illegal,
            regexText: WXTL.Common.regexText.IllegalText,
            maxLength: 100
        }]
        
    
    });
    // ======================================================================= 定义窗体
    var mainForm = AddproductInfofp.getForm();
    this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "添加通道组",
        width:730,
        height:430,
        autoScroll: true,
        mainForm: mainForm,
        needButtons: true,
        updateURL: Js.Center.Business.ProductUpdateURL,
        displayStore: Js.Center.Business.Product.Infostore,
        items: [AddproductInfofp],
        needLoadDataStore: true,
        loadDataStoreFunc: function(){
        	Js.Center.Common.EcListStore.reload();	
        	productPermitsvcStore.baseParams = {
                    flag: 'selectecservice',
                    numprodid: "",
                    numecid:"",
                    type:1
                };
            	productNoPermitsvcStore.baseParams = {
                    flag: 'selectecservice',
                    numprodid: "",
                    numecid:"",
                    type:0
                };
            	productPermitsvcStore.reload({
            		callback: function(){
            			var tostorelength = Js.Center.Business.ProductAdd.Productspolicy.items.items[0].toStore.data.length;
                        var tostroedata = Js.Center.Business.ProductAdd.Productspolicy.items.items[0].toMultiselect.view.store;
                        var record;
                        for (var i = 0; i < tostorelength; i++) {
                        	record = tostroedata.getAt(i);
    	                	record.set("numsvcid",record.get("numsvcid1")+"_"+record.get("vc2subcode"));
            				record.set("vc2svcname",record.get("vc2svcname1")+"_"+record.get("vc2subcode")  + "   <img src='jspack/product/common/Images/file-add.gif' qtip='添加/修改扩展子号码' onclick='Js.Center.Business.ProductAdd.addSubCode(\""+record.get("numsvcid1")+"\",\""+record.get("vc2subcode")+"\")'/>" + "<img src='jspack/product/common/Images/file-remove.gif' qtip='删除扩展子号码' onclick='Js.Center.Business.ProductAdd.deleteSubCode(\""+record.get("numsvcid1")+"\")'/>");
            				record.commit();
                        	
                        };
                    	//清空，避免第二次打开的时候出现
                    	Js.Center.Business.ProductAdd.Productspolicy.items.items[0].toMultiselect.view.store.removeAll();
                		Js.Center.Business.ProductAdd.Productspolicy.items.items[0].fromMultiselect.view.store.removeAll();
            		}
            	});
            	productNoPermitsvcStore.reload();
            	Js.Center.Business.ProductAdd.PreviewProduct();
            }
    });
    //}
    //Js.Center.Business.ProductAdd.AddproductInfoWin.mainForm.reset();
    // ======================================================================== 执行显示    
   // Js.Center.Business.ProductAdd.AddproductInfoWin.show();
    
};
