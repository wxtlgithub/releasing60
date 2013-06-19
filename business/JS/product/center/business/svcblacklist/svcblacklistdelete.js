Ext.namespace('Js.Center.Business.SvcBlacklistDelete');
Ext.QuickTips.init();
Js.Center.Business.SvcBlacklistDelete.func = function(){
	if (Js.Center.Business.SvcBlacklistDelete.window == null) {
		var queryString = '';
			Js.Center.Business.GatewayStore = new Ext.data.Store({
			    proxy: new Ext.data.HttpProxy({
			        url: Js.Center.Business.GatewayURL,
			        method: "POST"
			    }),
			    reader: new Ext.data.JsonReader({
			        fields: ['numgwid','vc2gatewayname'],
			        root: 'data',
			        id: 'numgwid'
			    }),
			    baseParams: {
			        flag: 'querygatewaybynumstatus',
			        numstatus:1,
			        columnlist: 'numgwid,vc2gatewayname'
			    },
			    listeners:{
			    	load:function(){
			    		var data = this.data;
			    		var lovcomboxFile = Ext.getCmp("Js.Center.business.ExitByFile");
			    		var lovcomboxList = Ext.getCmp("Js.Center.business.ExitByList");
			    		lovcomboxFile.store.data = data;	
			    		lovcomboxList.store.data = data;	
			    	}
			    }
			});
//			 Js.Center.Business.GatewayStore.reload();
		//============================================================================ 定义文件formpanel
		var addByFilePanel = new Ext.form.FormPanel({
			title: "文件方式",
			width: 600,
			border: false,
			fileUpload: true,
			frame: true,
			labelWidth: 80,
			defaults: {
				msgTarget: "side"
			},
			items: [{ xtype: "hidden",
				name: "blacktype",
				value: 7
            },{
             	xtype: "lovcombo",
                name: "numgwid",
                id:"Js.Center.business.ExitByFile",
                fieldLabel: "<font color=red>网关名称</font>",
                hiddenName: "numgwid",
                mode: "local",
                store: Js.Center.Business.GatewayStore,
                triggerAction: 'all',
                selectOnFocus: true,
                emptyText: '-=请选择=-',
                //forceSelection: true, // 要求输入值必须在列表中存在
                displayField: 'vc2gatewayname',
                valueField: 'numgwid',
                allowBlank: false
                //不想改wxtl的主框架 因为里面压缩没法改 太费劲所以这里重新引用 把插件改回去就成了拓展是最后2个方法
                ,expandSelect: function(){
            		var c = [];
            		c = this.getRawValue().split(this.separator);
            		// store may be filtered so get all records
            		var snapshot = this.store.snapshot || this.store.data;	
            		var displayField = this.displayField;
            		
            		var isTrue = false;		
            		if(this.getRawValue().indexOf(this.separator) > -1){
            			snapshot.each(function(r) {
            				isTrue = false;	
            				for(var i= 0; i<c.length; i++){
            					if(r.get(displayField) == c[i].replace(/(^\s*)|(\s*$)/g, "")) {
            						isTrue = true;	
            						break;					
            					}
            				}
            				r.set(this.checkField, isTrue);
            			}, this);
            		}
            		else if(this.getRawValue() != ""){
            			snapshot.each(function(r) {
            				isTrue = false;	
            				if(r.get(displayField) == c) {
            					isTrue = true;			
            				}
            				r.set(this.checkField, isTrue);
            			}, this);
            		}
            		else{
            			snapshot.each(function(r) {
            				r.set(this.checkField, false);
            			}, this);
            		}	
            		this.store.data = snapshot;	
            	}
            	,onBeforeQuery:function(qe) {
            		qe.query = qe.query.replace(new RegExp(this.getCheckedDisplay() + '[ ' + this.separator + ']*'), '');
            	} 
            	,onSelect:function(record, index) {
                    if(this.fireEvent('beforeselect', this, record, index) !== false){
                    	// toggle checked field
            			record.set(this.checkField, !record.get(this.checkField));
            			if(this.store.isFiltered()) {	
            				this.doQuery(this.allQuery);
            			}
            			getQueryString(this);
            			this.setValue(this.getCheckedValue());
                        this.fireEvent('select', this, record, index);
//                        this.expandSelect();
                    }
            	}
            ,setValue:function(v) {
        		if(v) {
        			v = '' + v;
        			if(this.valueField) {
        				this.store.clearFilter();
        				this.store.each(function(r) {
        					var checked = !(!v.match(
        						 '(^|' + this.separator + ')' + RegExp.escape(r.get(this.valueField))
        						+'(' + this.separator + '|$)'));
        					r.set(this.checkField, checked);
        				}, this);
        				this.value = this.getCheckedValue();
        				if(queryString!=null && queryString != ''){
            				this.setRawValue(this.getCheckedDisplay()+","+queryString);
            			}else{
        					this.setRawValue(this.getCheckedDisplay());
        				}
        				if(this.hiddenField) {
        					this.hiddenField.value = this.value;
        				}
        			}
        			else {
        				this.value = v;
        				this.setRawValue(v);
        				if(this.hiddenField) {
        					this.hiddenField.value = v;
        				}
        			}
        			if(this.el) {
        				this.el.removeClass(this.emptyClass);
        			}
        		}
        		else {
        			this.clearValue();
        		}
        		if(queryString !=null && queryString != ''){
        			this.doQuery(queryString);
        		}
        	} ,
            	width: 500,
                blankText: "网关名称必选"
            },{
				xtype: 'fileuploadfield',
				name: 'mobilefile',
				fieldLabel: WXTL.Common.help.MOBILEFILE,
				allowBlank: false,
				blankText: "请选择上传文件",
				width: 500,
				//inputType: 'file',
				validator: function(){
					var filePath = mainForm.items.items[2].getValue();
					if (filePath != '') {
						mainForm.items.items[3].el.dom.value = getFileMessage(filePath);
						if (checkFile(filePath) != '') {
							this.invalidText = checkFile(filePath);
							return false;
						}
						else {
							return true;
						}
					}
					else 
						return false;
				}
			}, {
				xtype: 'textarea',
				name: 'filemessage',
				fieldLabel: '文件信息',
				readOnly: true,
				width: 500,
				height: 80
			}, 
			{
				xtype: 'textarea',
				name: 'remark',
				fieldLabel: '<font color=red>原因备注</font>',
				width: 500,
				height:100,
				allowBlank: false,
                blankText: "备注不能为空",
                maxLength   : 200,
                maxLengthText  : "请输入小于200字"
			},
			{
				xtype: 'hidden',
				name: 'flag',
				value: 'deletebyfile'
			}]
		});
		//============================================================================ 定义列表formpanel	
		var addByListPanel = new Ext.form.FormPanel({
			title: "列表方式",
			width: 600,
			border: false,
			frame: true,
			labelWidth: 80,
			defaults: {
				msgTarget: "side"
			},
			items: [{xtype: "hidden",
				name: "blacktype",
				value: 7
			},{
             	xtype: "lovcombo",
                name: "numgwid",
                id :"Js.Center.business.ExitByList",
                fieldLabel: "网关名称",
                hiddenName: "numgwid",
                mode: "local",
                store: Js.Center.Business.GatewayStore,
                triggerAction: 'all',
                selectOnFocus: true,
                emptyText: '-=请选择=-',
                //forceSelection: true, // 要求输入值必须在列表中存在
                displayField: 'vc2gatewayname',
                valueField: 'numgwid',
                width: 300
                //不想改wxtl的主框架 因为里面压缩没法改 太费劲所以这里重新引用 把插件改回去就成了拓展是最后2个方法
                ,expandSelect: function(){
            		var c = [];
            		c = this.getRawValue().split(this.separator);
            		// store may be filtered so get all records
            		var snapshot = this.store.snapshot || this.store.data;	
            		var displayField = this.displayField;
            		
            		var isTrue = false;		
            		if(this.getRawValue().indexOf(this.separator) > -1){
            			snapshot.each(function(r) {
            				isTrue = false;	
            				for(var i= 0; i<c.length; i++){
            					if(r.get(displayField) == c[i].replace(/(^\s*)|(\s*$)/g, "")) {
            						isTrue = true;	
            						break;					
            					}
            				}
            				r.set(this.checkField, isTrue);
            			}, this);
            		}
            		else if(this.getRawValue() != ""){
            			snapshot.each(function(r) {
            				isTrue = false;	
            				if(r.get(displayField) == c) {
            					isTrue = true;			
            				}
            				r.set(this.checkField, isTrue);
            			}, this);
            		}
            		else{
            			snapshot.each(function(r) {
            				r.set(this.checkField, false);
            			}, this);
            		}	
            		this.store.data = snapshot;	
            	}
            	,onBeforeQuery:function(qe) {
            		qe.query = qe.query.replace(new RegExp(this.getCheckedDisplay() + '[ ' + this.separator + ']*'), '');
            	} 
            	,onSelect:function(record, index) {
                    if(this.fireEvent('beforeselect', this, record, index) !== false){
                    	// toggle checked field
            			record.set(this.checkField, !record.get(this.checkField));
            			if(this.store.isFiltered()) {	
            				this.doQuery(this.allQuery);
            			}
            			getQueryString(this);
            			this.setValue(this.getCheckedValue());
                        this.fireEvent('select', this, record, index);
//                        this.expandSelect();
                    }
            	}
            ,setValue:function(v) {
        		if(v) {
        			v = '' + v;
        			if(this.valueField) {
        				this.store.clearFilter();
        				this.store.each(function(r) {
        					var checked = !(!v.match(
        						 '(^|' + this.separator + ')' + RegExp.escape(r.get(this.valueField))
        						+'(' + this.separator + '|$)'));
        					r.set(this.checkField, checked);
        				}, this);
        				this.value = this.getCheckedValue();
        				if(queryString!=null && queryString != ''){
            				this.setRawValue(this.getCheckedDisplay()+","+queryString);
            			}else{
        					this.setRawValue(this.getCheckedDisplay());
        				}
        				if(this.hiddenField) {
        					this.hiddenField.value = this.value;
        				}
        			}
        			else {
        				this.value = v;
        				this.setRawValue(v);
        				if(this.hiddenField) {
        					this.hiddenField.value = v;
        				}
        			}
        			if(this.el) {
        				this.el.removeClass(this.emptyClass);
        			}
        		}
        		else {
        			this.clearValue();
        		}
        		if(queryString !=null && queryString != ''){
        			this.doQuery(queryString);
        		}
        	} ,
                allowBlank: false,
                blankText: "网关名称必选"
            }, {
				xtype: 'textarea',
				name: 'mobilelist',
				fieldLabel: WXTL.Common.help.MOBILELIST,
				width: 300,
				height: 100,
				allowBlank: false,
				blankText: "请输入手机号码列表",
				validator: function(value){
					return checkMobileList(value, 1000);
				}
			}, 
			{
				xtype: 'textarea',
				name: 'remarklist',
				fieldLabel: '<font color=red>原因备注</font>',
				width: 300,
				height:100,
				allowBlank: false,
                blankText: "备注不能为空",
                maxLength   : 200,
                maxLengthText  : "请输入小于200字"
			}, {
				xtype: 'hidden',
				name: 'flag',
				value: 'deletebylist'
			}]
		});
		function getQueryString(lovcombo){
			var snapshot = lovcombo.store.snapshot || lovcombo.store.data;
			if(lovcombo.getRawValue().indexOf(lovcombo.separator) > -1){
				var c = [];
				c = lovcombo.getRawValue().split(lovcombo.separator);
				var j = c.length;
				snapshot.each(function(r) {
					isTrue = false;	
					for(var i= 0; i<c.length; i++){
						if(r.get(lovcombo.displayField) == c[i].replace(/(^\s*)|(\s*$)/g, "")) {
							isTrue = true;
							j -- ;
							break;					
						}
					}
				}, this);
				if(j > 0){
					queryString = c[c.length-1];
				}
			}else if(lovcombo.getRawValue() != ""){
				var c = lovcombo.getRawValue();
				isTrue = false;	
				snapshot.each(function(r) {
					if(r.get(lovcombo.displayField) == c) {
						isTrue = true;			
					}
				}, this);
				if(isTrue){
					queryString = '';
				}else{
					queryString = c;
				}
			}	else{
				queryString = '';
			}
		}
		var mainForm = addByFilePanel.getForm();
		//============================================================================ 定义tabpanel
		var tabPanel = new Ext.TabPanel({
			height: 300,
			border: false,
			width: 650,
			activeTab: 0, //默认激活第一个tab页
			animScroll: true, //使用动画滚动效果
			enableTabScroll: true, //tab标签超宽时自动出现滚动按钮
			items: [addByFilePanel, addByListPanel],
			listeners: {
				"tabchange": function(TabPanel, Panel){
					if (Js.Center.Business.SvcBlacklistDelete.window) {
						mainForm = Panel.getForm();
						Js.Center.Business.SvcBlacklistDelete.window.mainForm = mainForm;
						 queryString = '';
					}
				}
			}
		});
		//============================================================================ 定义窗体
		this.window = new WXTL.Widgets.CommonWindows.Window({
			title: "退出通道黑名单",
			iconCls: 'deleteicon',
			mainForm: mainForm,
			updateURL: Js.Center.Business.SvcBlackUpdateURL,
			displayStore: Js.Center.Business.SvcBlacklistAdd.Infostore,
			items: [tabPanel],
			listeners:{
			    "show":function (){
			       Js.Center.Business.SvcBlacklistDelete.window.items.items[0].setActiveTab(0);
			       Js.Center.Business.SvcBlacklistDelete.window.items.items[0].items.items[0].getForm().reset();
			       Js.Center.Business.SvcBlacklistDelete.window.items.items[0].items.items[1].getForm().reset();
			       queryString = '';
			       Js.Center.Business.GatewayStore.reload();
			    }
			}
		});
	};
};