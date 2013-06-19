	var Application={};
	Application.uploadDialog={
		
		progressBarText:'正在上传：{0}，{1}%完成',
		
		statuBarText:'文件总数：{0}个  ，大小：{1}',
		
		show:function(data){
			if(!this.dialog)
				this.initDialog();
			//this.uploadGrid.store.removeAll();
			if(data)
	 			this.classStore.loadData(data);
			this.uploadAction[0].enable();
			this.uploadAction[1].disable();
			this.uploadAction[2].disable();
			this.uploadAction[3].disable();
			this.uploadAction[4].enable();
			//this.uploadProgressBar.updateProgress(0,'');
			this.dialog.show();
		},

		hide:function(){
			this.dialog.hide();
		},

		classStore:new Ext.data.SimpleStore({fields: ["id", "text"],data:[]}),
		
		uploadAction:[
			new Ext.Action({text:'增加',
				handler:function(){
					Application.uploadDialog.swfu.selectFiles();
				}
			}),
			new Ext.Action({text:'删除',disabled:true,handler:function(){
				var obj=Application.uploadDialog;
				var grid=obj.uploadGrid;
				var store=grid.store;
				var selection=grid.getSelectionModel().getSelections();
				for(var i=0;i<selection.length;i++){
					var rec=store.getAt(store.indexOfId(selection[i].id));
					obj.swfu.cancelUpload(rec.data.id);
					store.remove(rec);
				}
				obj.stateInfo.getEl().innerHTML=String.format(obj.statuBarText,obj.uploadGrid.store.getCount(),Ext.util.Format.fileSize(obj.uploadGrid.store.sum('size')));
				if(obj.uploadGrid.store.getCount()==0){
					obj.uploadGrid.store.removeAll();
					obj.uploadAction[1].disable();
					obj.uploadAction[2].disable();
					obj.uploadAction[3].disable();
				}
			}}),
			new Ext.Action({text:'清空',disabled:true,handler:function(){
				var obj=Application.uploadDialog;
				var store=obj.uploadGrid.store;
				var len=store.getCount();
				for(var i=0;i<len;i++){
					var rec=store.getAt(i);
					obj.swfu.cancelUpload(rec.data.id);
				}
				store.removeAll();
				obj.classCombo.clearValue();
				obj.stateInfo.getEl().innerHTML=String.format(obj.statuBarText,0,Ext.util.Format.fileSize(0));
				obj.uploadProgressBar.updateProgress(0,'');
				obj.uploadProgressBar.updateText("");
				obj.uploadAction[0].enable();
				obj.uploadAction[1].disable();
				obj.uploadAction[2].disable();
				obj.uploadAction[3].disable();
			}}),
			new Ext.Action({text:'上传',disabled:true,handler:function(){
				var obj=Application.uploadDialog;
				obj.uploadAction[0].disable();
				obj.uploadAction[1].disable();
				obj.uploadAction[2].disable();
				obj.uploadAction[3].disable();
				obj.uploadAction[4].disable();
				var store=obj.uploadGrid.store;
				var len=store.getCount();
				var classid=obj.classCombo.getValue();
				obj.swfu.setPostParams({'classid':classid});
				obj.swfu.startUpload();
			}}),
			new Ext.Action({text:'关闭',handler:function(){
				Application.uploadDialog.hide();
			}}),
		],

		initDialog:function(){
			this.classCombo=new Ext.form.ComboBox({
				hiddenName:'classid',name: 'classid_name',valueField:"id",displayField:"text",mode:'local',
				store:this.classStore,blankText:'请选择类别',emptyText:'请选择类别',editable:true,anchor:'90%'
			})
			
			this.swfu=new SWFUpload({
				upload_url:"upload.asp",
		
				file_size_limit : "2048",	
				file_types : "*.jpg;*.gif",
				file_types_description : "图片文件",
				file_upload_limit : "30",
		
				file_dialog_start_handler : this.fileDialogStart,
				file_queued_handler : this.fileQueued,		
				file_queue_error_handler : this.uploadError,
				file_dialog_complete_handler : this.fileDialogComplete,
				upload_start_handler : this.uploadFileStar,
				upload_progress_handler : this.uploadProgress,
				upload_error_handler : this.uploadError,
				upload_complete_handler : this.uploadQueueComplete,
				file_complete_handler : this.uploadFileComplete,
						
				flash_url:"swfupload.swf",
		
				ui_container_id : "SWFUploadTarget",
				degraded_container_id : "divDegraded",
				debug: false
			})
			
			this.dialog=new Ext.Window({
	      layout:'fit',width:600,height:500,title:'上传图片',closeAction:'hide',border:false,modal:true,
	      plain:true,closable:false,resizable:false,
				bbar:[this.uploadProgressBar=new Ext.ProgressBar({width:586})],
	      items:[
	      	Application.uploadDialog.uploadGrid=new Ext.grid.GridPanel({
		      	autoExpandColumn:2,enableHdMenu:false,
						tbar:[Application.uploadDialog.uploadAction[0],Application.uploadDialog.uploadAction[1],Application.uploadDialog.uploadAction[2],
						'-',Application.uploadDialog.uploadAction[3],"-",Application.uploadDialog.classCombo,"->"
						,Application.uploadDialog.uploadAction[4]],
						bbar:[Application.uploadDialog.stateInfo=new Ext.Toolbar.TextItem(String.format(Application.uploadDialog.statuBarText,0,Ext.util.Format.fileSize(0)))],
			      store: new Ext.data.SimpleStore({fields: ["id","state", "file","size","type"],data:[]}),
			      columns:[
			       	new Ext.grid.RowNumberer(),
			        {id:'id',header: "id",hidden:true,width:150,dataIndex:'id',resizable:false,sortable:false},
			        {header: "文件名",width:Ext.grid.GridView.autoFill,dataIndex:'file',sortable:true},
			        {header: "大小", width: 80,renderer:Ext.util.Format.fileSize,dataIndex:'size',sortable:true,align:'right'},
			        {header: "类型", width: 80,dataIndex:'type',align:'center',sortable:true},
			        {header: "状态", width: 100,dataIndex:'state',align:'center',sortable:true}
			      ]
					})
				]
			})
		},

		fileQueued:function(file){
			var obj=Application.uploadDialog;
			var filetype=(file.type.substr(1)).toUpperCase();
			if(filetype=='JPG' | filetype=='GIF'){
				var data=[];
				data.push([file.id,'未上传',file.name,file.size,filetype]);
				obj.uploadGrid.store.loadData(data,true);
				obj.uploadAction[1].enable();
				obj.uploadAction[2].enable();
				obj.uploadAction[3].enable();
				obj.stateInfo.getEl().innerHTML=String.format(obj.statuBarText,obj.uploadGrid.store.getCount(),Ext.util.Format.fileSize(obj.uploadGrid.store.sum('size')));
			}
		},
			
		uploadFileStar:function(file){
			var obj=Application.uploadDialog;
			var index=obj.findData(file.id);
			if(index>=0){
				obj.uploadGrid.store.getAt(index).set('state','正在上传……');
			}
			obj.uploadProgressBar.updateProgress(0,String.format(obj.progressBarText,file.name,0));
			return true;
		},
	
			
		uploadProgress:function(file,bytesloaded){
			var obj=Application.uploadDialog
			var percent = Math.ceil((bytesloaded / file.size) * 100);
			obj.uploadProgressBar.updateProgress(percent/100,String.format(obj.progressBarText,file.name,percent));
		},
			
		uploadFileComplete:function(file){
			var obj=Application.uploadDialog;
			var index=obj.findData(file.id);
			if(index>=0){
				obj.uploadGrid.store.getAt(index).set('state','已上传');
			}
			if(obj.swfu.getStats().files_queued>0)
				obj.swfu.startUpload();
		},
			
		uploadFileCancelled:function(file, queuelength){
		},
			
		uploadQueueComplete:function(file,server_data){
			console.log(server_data);
			if(server_data=='ok'){
				var obj=Application.uploadDialog;
				obj.uploadProgressBar.updateProgress(1,'完成上传');			
				obj.uploadAction[2].enable();
				obj.uploadAction[4].enable();
			}else{
				alert(server_data);
			}
		},
	
		uploadError:function(file,errcode,msg){
			var index=Application.uploadDialog.findData(file.id);
			if(index>=0)
				Application.uploadDialog.uploadGrid.store.getAt(index).set('state','上传失败');
			//alert(errcode+','+file.name+','+msg)
		},
			
		uploadCancel:function(file, queuelength){
			var index=Application.uploadDialog.findData(file.id);
			if(index>=0)
				Application.uploadDialog.uploadGrid.store.getAt(index).set('state','取消上传');
		},
		
		fileDialogStart:function(){
		},
		
		fileDialogComplete:function (num_files_queued){
		},
		
		findData:function(id){
			var rowindex=Application.uploadDialog.uploadGrid.store.find('id',id);
			return rowindex;
		}

	}//Application.uploadDialog
	
