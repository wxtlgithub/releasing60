Ext.namespace('Js.Center.System.Notice.noticemsg.infoDetail');
Js.Center.System.Notice.noticemsg.infoDetail.func = function(row) {	
	if (Ext.get("Js.Center.System.Notice.noticemsg.infoDetail.window") == null) {
	    //=============================================================产品下拉列表数据定义
	    var noticemsgInfoFormPanel = new Ext.form.FormPanel({
	        frame: true,
	        labelWidth: 88,
	        items: [{
	        	xtype: 'textfield',
				name: "datcreatetime",
				fieldLabel: "发布时间",
				width: 500,
				readOnly:true
	        },{
				xtype: 'textfield',
				name: "vc2bultitle",
				fieldLabel: "公告标题",
				width: 500,
				readOnly:true
			},{
				xtype: 'textarea',
				name: "vc2bulletin",
				fieldLabel: "公告内容",
				width: 500,
				height:80,
				readOnly:true
	        },{
                html:"<div id='Js.Center.System.Notice.noticemsg.infoDetail.downloadinfo'></div>"
	        }]
	    });
	    var mainForm = noticemsgInfoFormPanel.getForm();
	    this.window = new WXTL.Widgets.CommonWindows.Window({
	        title: "公告信息",
	        mainForm: mainForm,
	        needButtons: false,
	        updateState: true,
		    updateRecord: row,
	        items: [noticemsgInfoFormPanel],
	        buttons: [{
				text: "确定",
				minWidth: 70,
				qtip: "确定",
				handler: function() {
					Js.Center.System.Notice.noticemsg.infoDetail.window.close();
					mainForm.reset();
				}
			}],
			listeners:{
	    		"show":function(){
	    			if(row.data.vc2filepath!=null&&row.data.vc2filepath!=""){
	    				Ext.get("Js.Center.System.Notice.noticemsg.infoDetail.downloadinfo").dom.innerHTML = "<a href='#' onClick='exportData(\"URL/business/noitce/noticequery.ashx\",\"filepath=" + row.data.vc2filepath + "&flag=download\")'><center >下载附件</center> </a>";
	    			}
	    		},
	    		"hide":function(){
	    			Js.Center.System.Notice.noticemsg.infoDetail.window.close();
	    			mainForm.reset();
	    		}
	    	}
	    });
	}
};