/*
 *客户通讯录主页
 */
Ext.namespace('Js.Center.SendSMS.Sendbycustomer');

var customerTreeCheckedData = new Array();

Js.Center.SendSMS.Sendbycustomer.func = function(show, row) {
	var testFormat = "15";
	var LOCALUSERIOGRAPH = "";
	var LOCALUSERIOGRAPHSIZE = 0;
	
	//得到账户签名内容
	Js.Center.SendSMS.Sendbycustomer.func.toggleChkGraph = function(chkbox){
		LOCALUSERIOGRAPH = (chkbox) ? USERIOGRAPH : "";
		LOCALUSERIOGRAPHSIZE = (chkbox) ? USERIOGRAPHSIZE : 0;	
		
		if(Js.Center.SendSMS.Sendbycustomer.nummessageformatName == "短信"){
			//smsContent.contentMaxLength = 70 - LOCALUSERIOGRAPHSIZE;
			Ext.getCmp("Js.Center.SendSMS.Sendbycustomer.SendSMSContent").contentMaxLength = 70 - LOCALUSERIOGRAPHSIZE;
		}else{
			//smsContent.contentMaxLength = 246 - LOCALUSERIOGRAPHSIZE;
			Ext.getCmp("Js.Center.SendSMS.SMSsenddiy.SendSMSContentdiy").contentMaxLength = 246 - LOCALUSERIOGRAPHSIZE;
		}
		Ext.get("Js.Center.SendSMS.Sendbycustomer.vc2signature").dom.value = LOCALUSERIOGRAPH;
		
	};
	
	if (Ext.get("Js.Center.SendSMS.Sendbycustomer.Mainpanel") == null) {
		//=============将客户tree 选中的客户数据加载到公共数据源  customerTreeCheckedData里。
		Js.Center.SendSMS.Sendbycustomer.customerTreeCheckedInfo = function() {
			customerTreeCheckedData = new Array();
					
			var listArr = getAllChildrenNodes(EmployeeTree.getRootNode());
			for(var i = 0; i<listArr.length; i++) {
				if(listArr[i].attributes) {
					if(listArr[i].attributes.id !='-1' && listArr[i].attributes.checked && listArr[i].attributes.numusergroupmemberid != undefined) {
						var selectTree = new Object();
						selectTree.data = new Object();	
						selectTree.data.numusergroupid = listArr[i].attributes.numusergroupid;
						selectTree.data.vc2customer = listArr[i].attributes.vc2customer;
						selectTree.data.numusergroupmemberid = listArr[i].attributes.numusergroupmemberid;
						selectTree.data.vc2usergroupname = listArr[i].attributes.vc2usergroupname;
						selectTree.data.vc2mobile = listArr[i].attributes.vc2mobile;
						
						customerTreeCheckedData.push(selectTree);
					}
				}
			}
			return customerTreeCheckedData;
		};
		//======================================isSelfValid============
		var isSelfValid = function() {
			var valid = true;
			//获取待发送对象ID
			var idListArr = getAllChildrenNodes(EmployeeTree.getRootNode());
			var idlist = '';
			for (var i = 0; i < idListArr.length; i++) {
				if (idListArr[i].attributes && idListArr[i].attributes.vc2mobile) {
					if (idListArr[i].attributes.id != '-1' && idListArr[i].attributes.checked && idListArr[i].attributes.vc2mobile.toString() != "null") {
						if (idlist.length == 0) {							
							idlist += idListArr[i].attributes.vc2mobile.toString();
						} else {
							idlist += ',' + idListArr[i].attributes.vc2mobile.toString();
						}
					}
				}
			}
			if (idlist == "") {
				Ext.Msg.alert("温馨提示", "请选择发送对象!");
				valid = false;
			} else {
				document.getElementById("Js.Center.SendSMS.Sendbycustomer.MobileList").value = idlist;
			}

			if (Ext.getCmp("Js.Center.SendSMS.Sendbycustomer.SendMethod").items.items[1].checked) {
				var sendTime = Ext.get("Js.Center.SendSMS.Sendbycustomer.datsrcsendtime").getValue();
				var datNow = Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d h:m:s');
				if (sendTime < datNow) {
					Ext.Msg.alert("温馨提示", " 定时发送短信发送时间不能早于当前时间!");
					valid = false;
				}
			}
			if (!SMSSendPanel.getForm().isValid()) {
				valid = false;
			}
			return valid;
		};
		//===========================saveSMS==============
		Js.Center.SendSMS.Sendbycustomer.func.saveSMS = function(method) {
			if (Ext.get("Js.Center.SendSMS.Sendbycustomer.SendFlag") != null)
				Ext.get("Js.Center.SendSMS.Sendbycustomer.SendFlag").dom.value = method;
			if (isSelfValid()) {
				Ext.MessageBox.show({
					msg: '正在保存，请稍等...',
					progressText: 'Saving...',
					width: 300,
					wait: true,
					icon: 'download',
					animEl: 'saving'
				});
				setTimeout( function() {
					Ext.MessageBox.hide();
				}, 300000);
				SMSSendPanel.getForm().submit({
					url: Js.Center.SendSMS.SmsContentUpdateURL,
					method: "POST",
					success: function(form, action) {
						if (action.response.responseText != "") {
							var objJson = Ext.util.JSON.decode(action.response.responseText);
							var falg = objJson.success;
							if (falg == true) {
								Ext.Msg.alert("温馨提示", "操作成功了!");
								Js.Center.SendSMS.Sendbycustomer.SMSsendInfoWin.hide();
								Js.Center.SendSMS.Send.DisplayStore.reload();
							} else
								Ext.Msg.alert('温馨提示', objJson.info);
						} else{
							Ext.Msg.alert("温馨提示", "操作成功了!");
							Js.Center.SendSMS.Sendbycustomer.SMSsendInfoWin.hide();
							Js.Center.SendSMS.Send.DisplayStore.reload();
						}
					},
					failure: function(form, action) {
						var objJson = Ext.util.JSON.decode(action.response.responseText);
						Ext.Msg.alert('温馨提示', objJson.info);
					}
				})
			}
		};
		//==============平台签名,短信内容
		var smsContent = new WXTL.Widgets.CommonForm.Textarea({
			name: 'vc2content',
			id: "Js.Center.SendSMS.Sendbycustomer.SendSMSContent",
			labelText: Ext.isIE ? "账户签名：<input type='checkbox' value='1' id='Js.Center.SendSMS.Sendbycustomer.cbk' onclick='Js.Center.SendSMS.Sendbycustomer.func.toggleChkGraph(this.checked)'>" + USERIOGRAPH : "<div style='height: 13px; display: block; float: left; width: 66px;'>账户签名：</div><div style='height: 13px; width: 13px; display: block; float: left; padding: 2px 0pt 0pt;'><input type='checkbox' value='1' id='Js.Center.SendSMS.Sendbycustomer.cbk' onclick='Js.Center.SendSMS.Sendbycustomer.func.toggleChkGraph(this.checked)'></div>" + USERIOGRAPH,
			fieldLabel: '<font color=red>短信内容</font>',
			contentMaxLength: 246 - LOCALUSERIOGRAPHSIZE,
			textareaConfig: {
				allowBlank: false,
				autocomplete: 'on',
				blankText: "请输入短信内容",
				regex:WXTL.Common.regex.IllegalDiy,
				regexText:WXTL.Common.regexText.IllegalText
			}
		});
		

		//====================选择通道组
		var productCombox = new WXTL.Widgets.CommonForm.ComboBox({
			xtype: "xComboBox",
			name: "numproductid",
			hiddenName: "numproductid",
			id: 'Js.Center.SendSMS.Sendbycustomer.SMSnumproductid',
			emptyText: "-=请选择=-",
			allowBlank: false,
			blankText: "请选择通道组",
			fieldLabel: "<font color=red>选择通道组</font>",
			readOnly: true,
			mode: "local",
			displayField: "vc2name",
			valueField: "numprodid",
			triggerAction: "all",
			store: Js.Center.Common.ProductStore
		});
		
		//Js.Center.Common.ProductStore.reload();

		//======================短信内容面板====================
		var smsFieldSet = new Ext.form.FieldSet({
			title: '短信内容',
			collapsible: false,
			autoHeight: true,
			defaultType: 'textfield',
			style: Ext.isIE ? 'padding:5px 0 0 10px;' : 'padding:0 0 0 10px;',
			layout: 'form',
			items:[productCombox,{
				xtype: "combo",
				name: "numpriority",
				fieldLabel: "<font color=red>优先级</font>",
				hiddenName: "numpriority",
				readOnly: true,
				mode: "local",
				displayField: "show",
				valueField: "value",
				triggerAction: "all",
				allowBlank: false,
				blankText: "优先级类型不允许为空",
				emptyText: "请选择",
				value: 0,
				store: new Ext.data.SimpleStore({
					fields: ["show", "value"],
					data: [["正常", "0"], ["及时", "1"], ["紧急", "2"]]
				})
			},{
				xtype: "radiogroup",
				fieldLabel: "<font color=red>短信模式</font>",
				allowBlank: true,
				horizontal: true,
				defaultValue: 'true',
				items: [{
					boxLabel: getHelpMsg("短信", false, '1、内容长度须小于等于70字。'),
					inputValue: '15',
					name: 'nummessageformat',
					listeners: {
						"check": function(checkbox, checked) { //选中时,调用的事件
							if (checked) {
								testFormat = "15";
								smsContent.contentMaxLength = 70 - LOCALUSERIOGRAPHSIZE;
								Js.Center.SendSMS.Sendbycustomer.nummessageformatName = "短信";
							}
						}
					}
				},{
					boxLabel: getHelpMsg("长短信", false, '1、内容长度须小于等于246字。'),
					inputValue: '32',
					name: 'nummessageformat',
					checked: true,
					listeners: {
						"check": function(checkbox, checked) { //选中时,调用的事件
							if (checked) {
								testFormat = "32";
								smsContent.contentMaxLength = 246 - LOCALUSERIOGRAPHSIZE;
								Js.Center.SendSMS.Sendbycustomer.nummessageformatName = "长短信";
							}
						}
					}
				}]
			},{
				xtype: 'hidden',
				name: 'flag',
				id: 'Js.Center.SendSMS.Sendbycustomer.SendFlag',
				value: 'submit',
				fieldLabel: '操作类型'
			},{
				xtype: 'hidden',
				name: 'mobilelist',
				id: 'Js.Center.SendSMS.Sendbycustomer.MobileList',
				fieldLabel: '发送对象ID'
			},{
				xtype: 'hidden',
				name: 'numsendtype',
				value: 'sendbyeuserdirectory',
				fieldLabel: '发送类型'
			},{
				xtype: 'hidden',
				name: 'numcontentid',
				fieldLabel: '短信内容编号'
			},smsContent,{
				xtype: 'hidden',
				id: 'Js.Center.SendSMS.Sendbycustomer.vc2signature',
				name: 'vc2signature',
				value: LOCALUSERIOGRAPH,
				readOnly: true,
				fieldLabel: '<font color=red>账户签名</font>'
			},{
				xtype: "radiogroup",
				fieldLabel: "<font color=red>发送方式</font>",
				id: "Js.Center.SendSMS.Sendbycustomer.SendMethod",
				allowBlank: true,
				horizontal: true,
				defaultValue: 'true',
				items: [{
					boxLabel: '立即发送',
					name: "numsendmethod",
					inputValue: '1',
					checked: true
				},{
					boxLabel: '定时发送',
					name: "numsendmethod",
					inputValue: '2'
				}]
			},{
				xtype: 'xDateTime',
				fieldLabel: '发送时间',
				name: "datsend",
				id: "Js.Center.SendSMS.Sendbycustomer.datsrcsendtime",
				timeFormat: 'H:i:s',
				value: WXTL.Common.dateTime.getNow(),
				timeConfig: {
					altFormats: 'H:i:s',
					allowBlank: true,
					invalidText: '{0} 是无效的时间-必须符合格式为：H:i:s'
				},
				dateFormat: 'Y-m-d',
				dateConfig: {
					altFormats: 'Y-m-d',
					allowBlank: true
				}
			}]
		});

		//=============================================================定义发送测试短信Panel
		var smsSendTestPanel = new Ext.Panel({
			frame: true,
			labelWidth: 80,
			border: false,
			bodyBorder: false,
			items: [{
				layout: 'column',
				defaults: {
					bodyStyle: 'padding:0px 0 0 5px;',
					anchor: '90%'
				},
				items: [{
					columnWidth: .7,
					layout: 'form',
					border: false,
					defaults: {
						anchor: '90%'
					},
					items: [{
						xtype: "textfield",
						name: "vc2mobile",
						value: Js.Center.Common.userMobile,
						id: "Js.Center.SendSMS.Sendbycustomer.SendTestMobile",
						fieldLabel: "测试手机号",
						regex: WXTL.Common.regex.Mobile,
						regexText: "手机号码格式不正确"
					}]
				},{
					columnWidth: .3,
					layout: 'form',
					border: false,
					items: [{
						xtype: 'button',
						id: 'Js.Center.SendSMS.Sendbycustomer.SMSsendtestbtnsendtest',
						text: '发送测试短信',
						handler: function() {
							if (Ext.get("Js.Center.SendSMS.Sendbycustomer.SendTestMobile").getValue() == "" || Ext.getCmp("Js.Center.SendSMS.Sendbycustomer.SMSnumproductid").getValue() == "") {
								Ext.Msg.alert("温馨提示", "测试手机号码和通道组不能为空!");
							} 
							else {
								if (smsContent.isValid() && Ext.getCmp("Js.Center.SendSMS.Sendbycustomer.SendTestMobile").isValid()) {
									if (Ext.get("Js.Center.SendSMS.Sendbycustomer.SendFlag") != null)
										Ext.get("Js.Center.SendSMS.Sendbycustomer.SendFlag").dom.value = "sendtest";

									Ext.MessageBox.show({
										msg: '正在保存，请稍等...',
										progressText: 'Saving...',
										width: 300,
										wait: true,
										icon: 'download',
										animEl: 'saving'
									});
									setTimeout( function() {
										Ext.MessageBox.hide();
									}, 300000);
									var parms = {
										flag: 'sendtest',
										vc2mobile: Ext.get("Js.Center.SendSMS.Sendbycustomer.SendTestMobile").dom.value,
                                        numclassid: '0',
										vc2content: smsContent.getValue(),
										vc2signature: LOCALUSERIOGRAPH,
										nummessageformat: testFormat,
                                        numproductid: Ext.getCmp("Js.Center.SendSMS.Sendbycustomer.SMSnumproductid").getValue(),
                                        datsend: Ext.get("Js.Center.SendSMS.Sendbycustomer.datsrcsendtime").dom.value
									};

									doAjax(Js.Center.SendSMS.SmsContentUpdateURL, parms);
								}

							}
						}
					}]
				}]
			}]
		});		
		
		var root = new Ext.tree.TreeNode({
			id: '-1',
			text: '无线天利短信发送平台',
			checked:false
		});

		//客户组做去重处理
		var ToRepeatCustomerGroup = function(){
			 //去除重复数据
			var newArray=new Array();	
			var len= usergroupStore.length;
			
		    for (var i=0;i<len ;i++){
		        for(var j=i+1;j<len;j++){
		            if(usergroupStore[i].data.numusergroupid==usergroupStore[j].data.numusergroupid){
		                j=++i;
		            }
		        }
		        newArray.push(usergroupStore[i]);
		    }
		
			return newArray;
		};
		
		//客户组成员做去重处理
		var ToRepeatCustomerGroupMember = function(){
			 //去除重复数据
			var newArray=new Array();	
			var len= usergroupStore.length;
			
		    for (var i=0;i<len ;i++){
		        for(var j=i+1;j<len;j++){
		            if(usergroupStore[i].data.numusergroupmemberid==usergroupStore[j].data.numusergroupmemberid){
		                j=++i;
		            }
		        }
		        newArray.push(usergroupStore[i]);
		    }
		
			return newArray;
		};
				
		//=======================================================================构造树
		var EmployeeTree = new Ext.tree.TreePanel({
			checkModel: 'cascade',//'parentCascade', //对树的级联多选
			onlyLeafCheckable: false,//对树所有结点都可选
			style: 'padding:5px 10px 10px 10px',
			animate: false,
			//height:430,
			//width:800,
			//隐藏树节点前的线
			lines: false,
			//将树节点前的+换成斜三角
			useArrows: true,
			//不允许树节点收起
			collapsible: false,
			//hideCollapseTool:true,
			rootVisible: false,
			autoScroll: true,
			root: root,
			listeners: {
                "checkchange": function(node, checked){
                	EmployeeTree.suspendEvents();
                	if (node.hasChildNodes()) {
                		node.eachChild(function(child) {         //循环下一级的所有子节点
			               	child.ui.toggleCheck(checked);          //选中
			               	child.attributes.checked = checked;     //赋值
			            });
                	}
                	else{
                		var parent=node.parentNode;   //获取父节点
			        	var flag=node.getUI().checkbox.checked;   //判断是否选中
				        if(parent!=null ){  //父节点不为空
				            parent.ui.toggleCheck(checked);  //选中
				            parent.attributes.checked = checked;   //给值
				        }
                	}
			        EmployeeTree.resumeEvents();
                }
			}
		});

		//==================================================构造树函数
		Js.Center.SendSMS.Sendbycustomer.func.isCreateTree = function() {
			//移除所有节点
			var children = root.childNodes;  
			var childrenLen = children.length;
			for(var i = 0; i < childrenLen; i++){  
			     root.removeChild(children[0]);  
			}
			 
			if(usergroupStore.length!=0) {				
				var nodeTree ='';

				//根据数据源usergroupData构造客户通讯录树
				var ToRepeatData = ToRepeatCustomerGroup();	
				var ToRepeatMemberData = ToRepeatCustomerGroupMember();			
				for (var i=0; i < ToRepeatData.length; i++) {
					//添加客户组到二级节点中					
					nodeTree = root.appendChild(new Ext.tree.TreeNode({
						id:"g"+i,
						text:ToRepeatData[i].data.vc2usergroupname,
						numusergroupid: ToRepeatData[i].data.numusergroupid, 
						icon:"Images/icons/homemanage.gif",
						allowDrag : false,
						checked : true,
						expanded:true
					}));
					
					//添加客户组成员到三级节点中
					for(var j = 0; j<ToRepeatMemberData.length; j++) {	
						if(ToRepeatData[i].data.numusergroupid == ToRepeatMemberData[j].data.numusergroupid){
							nodeTree.appendChild(new Ext.tree.TreeNode({
								id:"u"+j,
								text:ToRepeatMemberData[j].data.vc2customer,
								numusergroupid: ToRepeatMemberData[j].data.numusergroupid,
								numusergroupmemberid: ToRepeatMemberData[j].data.numusergroupmemberid,
								icon:"Images/icons/usericon.gif",
								allowDrag : false,
								checked:true,
								expanded:true,
								vc2customer: ToRepeatMemberData[j].data.vc2customer,
								vc2usergroupname: ToRepeatMemberData[j].data.vc2usergroupname,
								vc2mobile: ToRepeatMemberData[j].data.vc2mobile
							}));
						}	
					}
				}
				//清除选中效果
				usergroupStore = new Array();
			} 		
		};		

		//=============================================================定义企业通讯录树Panel
		var smsEnterprisePanel = new Ext.Panel({
			title: '请选择部门成员',
			frame: true, // 渲染面板
			bodyBorder: false,
			border: false,
			height: 385,
			autoScroll: true, // 自动显示滚动条
			layout: "anchor",
			defaults: {
				collapsible: false // 允许展开和收缩
			},
			buttonAlign:"left",
			items: [EmployeeTree],
			buttons: [{
				text: "选择客户组成员",
				minWidth: 70,
				handler: function() {
					//将选中的客户信息传给下个查询窗口。
					Js.Center.SendSMS.sendbycustomer.SMSsendbycustomerInfoWin.show();
				}
			}]
		});

		//=============================================================定义formPanel
		var SMSSendPanel = new Ext.FormPanel({
			fileUpload: true,
			labelAlign: 'left',
			frame: true,
			style: "background-color:#e7e8f0",
			defaults: {
				msgTarget: "side"
			},
			items: [{
				items: [{
					layout: 'column',
					items: [{
						columnWidth: .3,
						layout: 'form',
						defaultType: "textfield",
						//锚点布局-
						defaults: {
							anchor: "90%",
							msgTarget: "side"
						},
						buttonAlign: "center",
						items: [smsEnterprisePanel]
					},{
						columnWidth: .7,
						layout: 'form',
						//锚点布局-
						defaults: {
							anchor: "95%",
							msgTarget: "side"
						},
						buttonAlign: "center",
						items: [smsFieldSet, smsSendTestPanel]
					}]
				}]
			}]
		});

		var mainForm = SMSSendPanel.getForm();
        
        //============================================================================ 定义窗体
        Js.Center.SendSMS.Sendbycustomer.SMSsendInfoWin = new WXTL.Widgets.CommonWindows.Window({
            title: "按客户通讯录发送",
            width: 950,
            heigth: 600,
            mainForm: SMSSendPanel.getForm(),
            needButtons: false,
            closeAction: 'hide',//关闭方式
            updateURL: Js.Center.SendSMS.SmsContentUpdateURL,
            displayStore: Js.Center.SendSMS.Send.DisplayStore,
            updateState: true,
            updateRecord: row,
            items: [SMSSendPanel],
            buttons: [{
				text: "提交发送",
				minWidth: 70,
				handler: function() {
					Js.Center.SendSMS.Sendbycustomer.func.saveSMS("submit");
				}
			},{
				text: "保存",
				minWidth: 70,
				handler: function() {
					Js.Center.SendSMS.Sendbycustomer.func.saveSMS("save");
				}
			},{
				text: "重置",
				minWidth: 70,
				qtip: "重置数据",
				handler: function() {
					var row = Js.Center.SendSMS.Sendbycustomer.SMSsendInfoWin.updateRecord;
					if (row != null) {
                        SMSSendPanel.getForm().reset();
                        SMSSendPanel.getForm().loadRecord(row);
                    	
                    	if(row.data.vc2content.indexOf(USERIOGRAPH)> -1){
							Ext.getCmp("Js.Center.SendSMS.Sendbycustomer.SendSMSContent").setValue(row.data.vc2content.replace(USERIOGRAPH,''));
				        	document.getElementById("Js.Center.SendSMS.Sendbycustomer.cbk").checked = true;
				        	Js.Center.SendSMS.Sendbycustomer.func.toggleChkGraph(true);
						}
						else{
							Js.Center.SendSMS.Sendbycustomer.func.toggleChkGraph(false);
						}
                    }
                    else {
                        SMSSendPanel.getForm().reset();
                    	document.getElementById("Js.Center.SendSMS.Sendbycustomer.cbk").checked = false;
                    	Js.Center.SendSMS.Sendbycustomer.func.toggleChkGraph(false);
                    }
				}
			},{
				text: "取消",
				minWidth: 70,
				qtip: "取消",
				handler: function() {
					Js.Center.SendSMS.Sendbycustomer.SMSsendInfoWin.hide();
                    SMSSendPanel.getForm().reset();
				}
			}],
            listeners: {
                "show": function(){
        			Js.Center.Common.ProductStore.reload();
                	Js.Center.SendSMS.Sendbycustomer.func.isCreateTree();
					Js.Center.SendSMS.sendbycustomer.customerQueryInfo();						
                },
                "beforehide": function(){
                    SMSSendPanel.getForm().reset();
                    document.getElementById("Js.Center.SendSMS.Sendbycustomer.cbk").checked = false;
                    Js.Center.SendSMS.Sendbycustomer.func.toggleChkGraph(false);
                }
            }
        });
	}
	//============================================================================执行显示
    if (show) {
        Js.Center.SendSMS.Sendbycustomer.SMSsendInfoWin.show();
    }
};