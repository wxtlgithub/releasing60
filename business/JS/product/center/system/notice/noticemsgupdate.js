Ext.namespace('Js.Center.System.Notice.noticemsg.infoUpdate');
Js.Center.System.Notice.noticemsg.infoUpdate.func = function(row){
    if (Js.Center.System.Notice.noticemsg.infoUpdate.window == null) {
    //=============================================================产品下拉列表数据定义
	    var updateInfoFormPanel = new Ext.form.FormPanel({
	        frame: true,
	        fileUpload : true,
	        labelWidth: 88,
	        items: [{
	        	xtype: 'hidden',
				name: 'flag',
				value:'update'
	        }, {
				xtype: 'textfield',
				name: 'vc2bultitle',
				//id: 'blacklistaddfilemessage',
				fieldLabel: '<font color=red>公告标题</font>',
				allowBlank: false,
	            blankText: "公告标题不能为空",
	            maxLength: 25,
				maxLengthText:'长度不能超过25！',
				width: 500
			}, {
	        	xtype: "lovcombo",
	            name: "vc2nodeid",
	            fieldLabel: "可见网元",
	            hiddenName: "vc2nodeid",
	            id: "Js.Center.System.Notice.noticeupdate.checkNode",
	            readOnly: true,
	            mode: "local",
	            width: 500,
	            displayField: "show",
	            valueField: "value",
	            ableCheckField: "ck",
	            checkField:"unchecked",
	            triggerAction: "all",
	            emptyText: "-=请选择=-",
	            store: new Ext.data.SimpleStore({
	                fields: ["show", "value", "ck"],
	                data: [["-=可用网元=-", "", "0"], ["60网元", "60","1"], ["52网元", "52","1"], ["22网元", "22","1"], ["62网元", "62","1"]]
	            }),
	            //重写初始化方法
			    initComponent:function() {
					if(!this.tpl) {
						this.tpl = 
							 '<tpl for="."><div class="x-combo-list-item">' 
							+'<tpl if="values.' + this.ableCheckField + ' != 0">'
							+'<img src="' + Ext.BLANK_IMAGE_URL + '" '
							+'class="ux-lovcombo-icon ux-lovcombo-icon-'
							+'{[values.' + this.checkField + '?"checked":"unchecked"' + ']}">'
							+'</tpl>'
							+'<div class="ux-lovcombo-item-text">{' + (this.displayField || 'text' )+ '}</div>'
							+'</div></tpl>';
					}
			 
			        Ext.ux.form.LovCombo.superclass.initComponent.apply(this, arguments);
	
			        this.on({
						 scope:this
						,beforequery:this.onBeforeQuery
						,blur:this.onRealBlur
					});
			
					this.onLoad = this.onLoad.createSequence(function() {
						if(this.el) {
							var v = this.el.dom.value;
							this.el.dom.value = '';
							this.el.dom.value = v;
						}
					});
			    },
	        	onSelect:function(record, index) {
	                if(this.fireEvent('beforeselect', this, record, index) !== false){
	                	if(record.data["value"]){
							record.set(this.checkField, !record.get(this.checkField));
							if(this.store.isFiltered()) {
								this.doQuery(this.allQuery);
							}
							this.setValue(this.getCheckedValue());
				            this.fireEvent('select', this, record, index);
	                	}
	                }
	        	}
			},{
				xtype: 'fileuploadfield',
				name: 'mobilefile',
			    fieldLabel: getHelpMsg(
						"公告附件", 
						false, 
						"1、文件格式为txt、doc、docx、excel、xlsx、xls<br>2、文件大小须小于4M<br>"),
				width: 500,
				validator: function(){
					var filePath = this.getValue();
					if (filePath != '') {
						mainForm.items.items[4].el.dom.value = getFileMessage(filePath);
						mainForm.items.items[6].el.dom.value = filePath;
						if (Js.Center.System.Notice.noticemsg.infoAdd.Check(filePath) != '') {
                            this.invalidText = Js.Center.System.Notice.noticemsg.infoAdd.Check(filePath);
                            return false;
                        }
                        else {
                            return true;
                        }
					  }
					return true;
				}
			}, {
				xtype: 'textarea',
				name: 'filemessage',
				fieldLabel: '文件信息',
				readOnly: true,
				width: 500,
				height: 80
			},{
				xtype: 'textarea',
				  name: "vc2bulletin",
	            fieldLabel: "<font color=red>公告信息</font>",
				width: 500,
				height:80,
				allowBlank: false,
	            blankText: "公告信息不能为空",
	            maxLength   : 500,
	            maxLengthText  : "请输入小于500字"
	        },{
	        	xtype: 'hidden',
				name: 'filePath'
			},{
	        	xtype: 'hidden',
				name: 'numseqid'
	        },{
	        	xtype: 'hidden',
				name: 'vc2filepath'
	        }]
	    });
	    
	    var mainForm = updateInfoFormPanel.getForm();
	    
	    this.window = new WXTL.Widgets.CommonWindows.Window({
	        title: "修改公告",
	        mainForm: mainForm,
	        updateURL: Js.Center.System.NoticeOperatorURL,
	        displayStore: Js.Center.System.Notice.noticemsg.info.Infostore,
	        updateRecord: row,
	        items: [updateInfoFormPanel]
	    });
    }
};
