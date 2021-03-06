/**
 * This namespace should be in another file but I dicided to put it here for consistancy.
 */
Ext.namespace('Ext.ux.Utils');

/**
 * This class implements event queue behaviour.
 *
 * @class Ext.ux.Utils.EventQueue
 * @param function  handler  Event handler.
 * @param object    scope    Handler scope.
 */
Ext.ux.Utils.EventQueue = function(handler, scope){
    if (!handler) {
        throw 'Handler is required.';
    }
    this.handler = handler;
    this.scope = scope || window;
    this.queue = [];
    this.is_processing = false;
    
    /**
     * Posts event into the queue.
     *
     * @access public
     * @param mixed event Event identificator.
     * @param mixed data  Event data.
     */
    this.postEvent = function(event, data){
        data = data || null;
        this.queue.push({
            event: event,
            data: data
        });
        if (!this.is_processing) {
            this.process();
        }
    }
    
    this.flushEventQueue = function(){
        this.queue = [];
    },    /**
     * @access private
     */
    this.process = function(){
        while (this.queue.length > 0) {
            this.is_processing = true;
            var event_data = this.queue.shift();
            this.handler.call(this.scope, event_data.event, event_data.data);
        }
        this.is_processing = false;
    }
}

/**
 * This class implements Mili's finite state automata behaviour.
 *
 *  Transition / output table format:
 *  {
 *    'state_1' : {
 *      'event_1' : [
 *        {
 *          p|predicate: function,    // Transition predicate, optional, default to true.
 *                                    // If array then conjunction will be applyed to the operands.
 *                                    // Predicate signature is (data, event, this).
 *          a|action: function|array, // Transition action, optional, default to Ext.emptyFn.
 *                                    // If array then methods will be called sequentially.
 *                                    // Action signature is (data, event, this).
 *          s|state: 'state_x',       // New state - transition destination, optional, default to
 *                                    // current state.
 *          scope: object             // Predicate and action scope, optional, default to
 *                                    // trans_table_scope or window.
 *        }
 *      ]
 *    },
 *
 *    'state_2' : {
 *      ...
 *    }
 *    ...
 *  }
 *
 *  @param  mixed initial_state Initial state.
 *  @param  object trans_table Transition / output table.
 *  @param  trans_table_scope Transition / output table's methods scope.
 */
Ext.ux.Utils.FSA = function(initial_state, trans_table, trans_table_scope){
    this.current_state = initial_state;
    this.trans_table = trans_table ||
    {};
    this.trans_table_scope = trans_table_scope || window;
    Ext.ux.Utils.FSA.superclass.constructor.call(this, this.processEvent, this);
}

Ext.extend(Ext.ux.Utils.FSA, Ext.ux.Utils.EventQueue, {

    current_state: null,
    trans_table: null,
    trans_table_scope: null,
    
    /**
     * Returns current state
     *
     * @access public
     * @return mixed Current state.
     */
    state: function(){
        return this.current_state;
    },
    
    /**
     * @access public
     */
    processEvent: function(event, data){
		try {
			var transitions = this.currentStateEventTransitions(event);
			if (!transitions) {
				//throw "State '" + this.current_state + "' has no transition for event '" + event + "'.";
				Ext.Msg.alert("State '" + this.current_state + "' has no transition for event '" + event + "'.");
			}
			for (var i = 0, len = transitions.length; i < len; i++) {
				var transition = transitions[i];
				var predicate = transition.predicate || transition.p || true;
				var action = transition.action || transition.a || Ext.emptyFn;
				var new_state = transition.state || transition.s || this.current_state;
				
				var scope = transition.scope || this.trans_table_scope;
				if (this.computePredicate(predicate, scope, data, event)) {
					this.callAction(action, scope, data, event);
					this.current_state = new_state;
					return;
				}
			}
		}
		catch(err){
			//Ext.Msg.alert("State '" + this.current_state + "' has no transition for event '" + event + "' in current context");
			Ext.Msg.alert(err.message);
		}
        
        //throw "State '" + this.current_state + "' has no transition for event '" + event + "' in current context";
    },
    
    /**
     * @access private
     */
    currentStateEventTransitions: function(event){
        return this.trans_table[this.current_state] ? this.trans_table[this.current_state][event] || false : false;
    },
    
    /**
     * @access private
     */
    computePredicate: function(predicate, scope, data, event){
        var result = false;
        
        switch (Ext.type(predicate)) {
            case 'function':
                result = predicate.call(scope, data, event, this);
                break;
            case 'array':
                result = true;
                for (var i = 0, len = predicate.length; result && (i < len); i++) {
                    if (Ext.type(predicate[i]) == 'function') {
                        result = predicate[i].call(scope, data, event, this);
                    }
                    else {
                        throw ['Predicate: ', predicate[i], ' is not callable in "', this.current_state, '" state for event "', event].join('');
                    }
                }
                break;
            case 'boolean':
                result = predicate;
                break;
            default:
                throw ['Predicate: ', predicate, ' is not callable in "', this.current_state, '" state for event "', event].join('');
        }
        return result;
    },
    
    /**
     * @access private
     */
    callAction: function(action, scope, data, event){
        switch (Ext.type(action)) {
            case 'array':
                for (var i = 0, len = action.length; i < len; i++) {
                    if (Ext.type(action[i]) == 'function') {
                        action[i].call(scope, data, event, this);
                    }
                    else {
                        throw ['Action: ', action[i], ' is not callable in "', this.current_state, '" state for event "', event].join('');
                    }
                }
                break;
            case 'function':
                action.call(scope, data, event, this);
                break;
            default:
                throw ['Action: ', action, ' is not callable in "', this.current_state, '" state for event "', event].join('');
        }
    }
});

// ---------------------------------------------------------------------------------------------- //

/**
 * Ext.ux.UploadDialog namespace.
 */
Ext.namespace('Ext.ux.UploadDialog');
/**
 * 创建ActiveX控件
 */
Ext.ux.UploadDialog.CreateActiveX = function(){
    try {
        if (Ext.ux.UploadDialog.ActiveX == null) {
            Ext.ux.UploadDialog.ActiveX = new ActiveXObject("AtlUpload.Uploader");
        }
    } 
    catch (err) {
        Ext.Msg.alert("温馨提示", "对不起，您没有安装利信通PC客户端，请刷新页面根据ActiveX安装提示进行安装!");
        return false;
    }
};
/**
 * 创建重命名文件Window
 */
Ext.ux.UploadDialog.CreateRenameFileWindow = function(record,url,store){
	//record.set('filename',record.get('filename').substring(0,record.get('filename').lastIndexOf('.')));
	if(Ext.ux.UploadDialog.RenameFileWindow == null){
		var renameFileFormPanel = new Ext.form.FormPanel({
            frame: true,
            labelWidth: 80,
            layout: 'form',
            defaults: {
                anchor: "90%",
                msgTarget: "side"
            },
            items: [{
				xtype:'hidden',
				name:'flag',
				value:'renamefile'
			},{
                xtype: "textfield",
				fieldLabel:'原文件名',
                name: "filename",
				readOnly: true
            }, {
                xtype: 'textfield',
				fieldLabel:'新文件名',
				name:'newfilename',
				maxLength: 50,
				maxLengthText: '长度不能超过50！',
				allowBlank: false,
				blankText:'此项必填',
				regex: /^[\w\u4e00-\u9fa5]+$/,
				regexText:'文件名只能输入汉字、字母、数字及下划线'
				//regex: /(.*)+\.(txt)$/i,
				//regexText:'文件名格式必须是.txt,后缀名只能是小写'
                //fieldlableFile: getHelpMsg("文件", true, "1、文件格式为txt<br>2、客户端文件请选择小于2M的文件，大文件请选择服务器端文件；<br>")
            },{
                html:"<div><font color='red'>注意：新文件名请不要添加后缀名！</font></div>"
            }]
        });
		
		// ======================================================================= 定义窗体
		var mainForm = renameFileFormPanel.getForm();
		Ext.ux.UploadDialog.RenameFileWindow = new WXTL.Widgets.CommonWindows.Window({
			title: "重命名文件",
			width:450,
			mainForm: mainForm,
			updateState: true,
        	updateRecord: record,
			updateURL: url,
			displayStore: store,
			items: [renameFileFormPanel],
			needButtons:false,
			buttons:[new Ext.Button({
				text: '确定',
				minWidth: 70,
				qtip: "确定",
				handler: function(){
					if (mainForm.isValid()) {
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
						mainForm.submit({
							url: url,
							method: "POST",
							success: function(form, action){
								var objJson = Ext.util.JSON.decode(action.response.responseText);
								var falg = objJson.success;
								if (falg == true) {
									Ext.Msg.alert("温馨提示", "操作成功了!");
									Ext.ux.UploadDialog.RenameFileWindow.displayStore.reload();
									Ext.ux.UploadDialog.RenameFileWindow.hide();
								}
								else {
									Ext.Msg.alert('温馨提示', objJson.info);
									Ext.ux.UploadDialog.RenameFileWindow.displayStore.reload();
									Ext.ux.UploadDialog.RenameFileWindow.hide();
								}
							},
							failure: function(form, action){
								var objJson = Ext.util.JSON.decode(action.response.responseText);
								Ext.Msg.alert('温馨提示', objJson.info);
								Ext.ux.UploadDialog.RenameFileWindow.displayStore.reload();
								Ext.ux.UploadDialog.RenameFileWindow.hide();
							}
						})
					}
				}
			}), new Ext.Button({
				text: '重置',
				minWidth: 70,
				qtip: "重置数据",
				handler: function(){
					mainForm.reset();
					Ext.ux.UploadDialog.RenameFileWindow.mainForm.items.items[1].setValue(Ext.ux.UploadDialog.RenameFileWindow.updateRecord.get('filename').substring(0,Ext.ux.UploadDialog.RenameFileWindow.updateRecord.get('filename').lastIndexOf('.')));
				}
			}), new Ext.Button({
				text: '取消',
				minWidth: 70,
				handler: function(){
					Ext.ux.UploadDialog.RenameFileWindow.hide();
				}
			})]
		});
	}
	Ext.ux.UploadDialog.RenameFileWindow.updateRecord = record;
	Ext.ux.UploadDialog.RenameFileWindow.show();
	Ext.ux.UploadDialog.RenameFileWindow.mainForm.items.items[1].setValue(record.get('filename').substring(0,record.get('filename').lastIndexOf('.')));
}

/**
 * File upload browse button.
 *
 * @class Ext.ux.UploadDialog.BrowseButton
 */
Ext.ux.UploadDialog.BrowseButton = Ext.extend(Ext.Button, {
    input_name: 'file',
    
    input_file: null,
    
    original_handler: null,
    
    original_scope: null,
    
    /**
     * @access private
     */
    initComponent: function(){
        Ext.ux.UploadDialog.BrowseButton.superclass.initComponent.call(this);
        this.original_handler = this.handler || null;
        this.original_scope = this.scope || window;
        this.handler = null;
        this.scope = null;
    },
    
    /**
     * @access private
     */
    onRender: function(ct, position){
        Ext.ux.UploadDialog.BrowseButton.superclass.onRender.call(this, ct, position);
        this.createInputFile();
    },
    
    /**
     * @access private
     */
    createInputFile: function(){
        var button_container = this.el.child('.x-btn-center');
        button_container.position('relative');
        this.input_file = Ext.DomHelper.append(button_container, {
            tag: 'input',
            type: 'file',
            size: 1,
            name: this.input_name || Ext.id(this.el),
            style: 'position: absolute; display: block; border: none; cursor: pointer'
        }, true);
        
        this.input_file.setOpacity(0.0);
        this.adjustInputFileBox();
        
        if (this.handleMouseEvents) {
            this.input_file.on('mouseover', this.onMouseOver, this);
            this.input_file.on('mousedown', this.onMouseDown, this);
        }
        
        if (this.tooltip) {
            if (typeof this.tooltip == 'object') {
                Ext.QuickTips.register(Ext.apply({
                    target: this.input_file
                }, this.tooltip));
            }
            else {
                this.input_file.dom[this.tooltipType] = this.tooltip;
            }
        }
        
        this.input_file.on('change', this.onInputFileChange, this);
        this.input_file.on('click', function(e){
            e.stopPropagation();
        });
    },
    
    /**
     * @access private
     */
    autoWidth: function(){
        Ext.ux.UploadDialog.BrowseButton.superclass.autoWidth.call(this);
        this.adjustInputFileBox();
    },
    
    /**
     * @access private
     */
    adjustInputFileBox: function(){
        var btn_cont, btn_box, inp_box, adj;
        
        if (this.el && this.input_file) {
            btn_cont = this.el.child('.x-btn-center');
            btn_box = btn_cont.getBox();
            this.input_file.setStyle('font-size', (btn_box.width * 0.5) + 'px');
            inp_box = this.input_file.getBox();
            adj = {
                x: 3,
                y: 3
            }
            if (Ext.isIE) {
                adj = {
                    x: -3,
                    y: 3
                }
            }
            this.input_file.setLeft(btn_box.width - inp_box.width + adj.x + 'px');
            this.input_file.setTop(btn_box.height - inp_box.height + adj.y + 'px');
        }
    },
    
    /**
     * @access public
     */
    detachInputFile: function(no_create){
        var result = this.input_file;
        
        no_create = no_create || false;
        
        if (typeof this.tooltip == 'object') {
            Ext.QuickTips.unregister(this.input_file);
        }
        else {
            this.input_file.dom[this.tooltipType] = null;
        }
        this.input_file.removeAllListeners();
        this.input_file = null;
        
        if (!no_create) {
            this.createInputFile();
        }
        return result;
    },
    
    /**
     * @access public
     */
    getInputFile: function(){
        return this.input_file;
    },
    
    /**
     * @access public
     */
    disable: function(){
        Ext.ux.UploadDialog.BrowseButton.superclass.disable.call(this);
        this.input_file.dom.disabled = true;
    },
    
    /**
     * @access public
     */
    enable: function(){
        Ext.ux.UploadDialog.BrowseButton.superclass.enable.call(this);
        this.input_file.dom.disabled = false;
    },
    
    /**
     * @access public
     */
    destroy: function(){
        var input_file = this.detachInputFile(true);
        input_file.remove();
        input_file = null;
        Ext.ux.UploadDialog.BrowseButton.superclass.destroy.call(this);
    },
    
    /**
     * @access private
     */
    onInputFileChange: function(){
        if (this.original_handler) {
            this.original_handler.call(this.original_scope, this);
        }
    }
});

/**
 * Toolbar file upload browse button.
 *
 * @class Ext.ux.UploadDialog.TBBrowseButton
 */
Ext.ux.UploadDialog.TBBrowseButton = Ext.extend(Ext.ux.UploadDialog.BrowseButton, {
    hideParent: true,
    
    onDestroy: function(){
        Ext.ux.UploadDialog.TBBrowseButton.superclass.onDestroy.call(this);
        if (this.container) {
            this.container.remove();
        }
    }
});

/**
 * Record type for dialogs grid.
 
 *state: Ext.ux.UploadDialog.FileRecord.STATE_QUEUE,
            filename: input_file.dom.value,
            filepath: input_file.dom.value,
            note: this.i18n.note_queued_to_upload,
            input_element: input_file,
            speed: '0K/s',
            percentage: '0',
			starttime: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d h-m-s'),
			endtime: ''
 * @class Ext.ux.UploadDialog.FileRecord
 */
Ext.ux.UploadDialog.FileRecord = Ext.data.Record.create([{
    name: 'filename'
}, {
    name: 'filepath'
}, {
    name: 'state',
    type: 'int'
}, {
    name: 'note'
}, {
    name: 'input_element'
}, {
    name: 'params'
}, {
    name: 'starttime'
}, {
    name: 'endtime'
}, {
    name: 'speed'
}, {
    name: 'uploaded'
}, {
    name: 'percentage'
}]);

Ext.ux.UploadDialog.FileRecord.STATE_QUEUE = 0;
Ext.ux.UploadDialog.FileRecord.STATE_FINISHED = 1;
Ext.ux.UploadDialog.FileRecord.STATE_FAILED = 2;
Ext.ux.UploadDialog.FileRecord.STATE_PROCESSING = 3;

/**
 * Dialog class.
 *
 * @class Ext.ux.UploadDialog.Dialog
 */
Ext.ux.UploadDialog.Dialog = function(config){
    var default_config = {
        border: false,
        width: 750,
        height: 500,
        minWidth: 750,
        minHeight: 500,
        plain: true,
        constrainHeader: true,
        draggable: true,
        closable: true,
        maximizable: false,
        minimizable: false,
        resizable: true,
        autoDestroy: true,
        closeAction: 'hide',
        title: this.i18n.title,
        cls: 'ext-ux-uploaddialog-dialog',
        // --------
        url: '',
        base_params: {},
        permitted_extensions: [],
        reset_on_hide: true,
        allow_close_on_upload: false,
        upload_autostart: false,
        post_var_name: 'file',
        gridStore: '',
        cmGrid: '',
		smGrid:'',
		tfFileName:''  //存放已选择服务器端文件的隐藏域ID
    }
    config = Ext.applyIf(config ||
    {}, default_config);
    config.layout = 'absolute';
    
    Ext.ux.UploadDialog.Dialog.superclass.constructor.call(this, config);
}

Ext.extend(Ext.ux.UploadDialog.Dialog, Ext.Window, {

    fsa: null,
    
    state_tpl: null,
    
    form: null,
    
    grid_panel: null,
    
    progress_bar: null,
    
    is_uploading: false,
	
	is_newuploading: false,
    
    initial_queued_count: 0,
    
    upload_frame: null,
	
	objActive: null,
	
	//当前操作文件名
	currentFileName:'',
    
    /**
     * @access private
     */
    //--------------------------------------------------------------------------------------------- //
    initComponent: function(){
        Ext.ux.UploadDialog.Dialog.superclass.initComponent.call(this);
        
        // Setting automata protocol
        var tt = {
            // --------------
            'created': {
                // --------------
                'window-render': [{
                    action: [this.createForm,  this.createGrid],
                    state: 'rendering'
                }],
                'destroy': [{
                    action: this.flushEventQueue,
                    state: 'destroyed'
                }]
            },
            // --------------
            'rendering': {
                // --------------
                'grid-render': [{
                    action: [this.fillToolbar, this.updateToolbar],
                    state: 'ready'
                }],
                'destroy': [{
                    action: this.flushEventQueue,
                    state: 'destroyed'
                }]
            },
            // --------------
            'ready': {
                // --------------
                'file-selected': [{
                    predicate: [this.fireFileTestEvent, this.isPermittedFile],
                    action: this.addFileToUploadQueue,
                    state: 'adding-file'
                }, {
                    // If file is not permitted then resetting internal input type file.
                    action: this.resetAddButton
                }],
                'grid-selection-change': [{
                    action: this.updateToolbar
                }],
				'rename-files': [{
					action: [this.renameFile,this.fireFileRenameEvent]
				}],
                'remove-files': [{
                    action: [this.removeFiles, this.fireFileRemoveEvent]
                }],
                'reset-queue': [{
                    action: [this.resetQueue, this.fireResetQueueEvent]
                }],
                'start-upload': [{
                    predicate: this.hasUnuploadedFiles,
                    action: [this.setUploadingFlag, this.saveInitialQueuedCount, this.updateToolbar, this.updateProgressBar, this.prepareNextUploadTask, this.fireUploadStartEvent],
                    state: 'uploading'
                }, {                    // Has nothing to upload, do nothing.
                }],
                'stop-upload': [{                    // We are not uploading, do nothing. Can be posted by user only at this state. 
                }],
                'file-upload-updategrid': [{
                    //predicate: this.updateGridRecordState//,
                    //action: [this.updateGridRecordState],
					//state: 'uploading'
                }],
                'hide': [{
                    predicate: [this.isNotEmptyQueue, this.getResetOnHide],
                    action: [this.resetQueue, this.fireResetQueueEvent]
                }, {                    // Do nothing
                }],
                'destroy': [{
                    action: this.flushEventQueue,
                    state: 'destroyed'
                }]
            },
            // --------------
            'adding-file': {
                // --------------
                'file-added': [{
                    predicate: this.isUploading,
                    action: [this.incInitialQueuedCount, this.updateProgressBar, this.fireFileAddEvent],
                    state: 'uploading'
                }, {
                    predicate: this.getUploadAutostart,
                    action: [this.startUpload, this.fireFileAddEvent],
                    state: 'ready'
                }, {
                    action: [this.updateToolbar, this.fireFileAddEvent],
                    state: 'ready'
                }]
            },
            // --------------
            'uploading': {
                // --------------
                'file-selected': [{
                    predicate: [this.fireFileTestEvent, this.isPermittedFile],
                    action: this.addFileToUploadQueue,
                    state: 'adding-file'
                }, {
                    // If file is not permitted then resetting internal input type file.
                    action: this.resetAddButton
                }],
                'grid-selection-change': [{                    // Do nothing.
                }],
                'start-upload': [{                    // Can be posted only by user in this state. 
                }],
                'stop-upload': [{
                    predicate: [this.hasUnuploadedFiles],
                    action: [this.resetUploadingFlag,this.abortUpload,   this.updateToolbar,this.updateProgressBar, this.fireUploadStopEvent],
                    state: 'ready'
                }, {
                    action: [this.resetUploadingFlag, this.abortUpload, this.updateToolbar, this.updateProgressBar, this.fireUploadStopEvent, this.fireUploadCompleteEvent],
                    state: 'ready'
                }],
                'file-upload-start': [{
                    predicate: this.fireBeforeFileUploadStartEvent,
                    action: [this.uploadFile, this.findUploadFrame, this.fireFileUploadStartEvent]
                }, {
                    action: this.postFileUploadCancelEvent
                }],
                'file-upload-updategrid': [{
                    //predicate: this.updateGridRecordState//,
                    action: [this.updateGridRecordState]
                }],
                'file-upload-success': [{
                    predicate: this.hasUnuploadedFiles,
                    action: [this.resetUploadFrame,  this.updateProgressBar, this.prepareNextUploadTask, this.fireUploadSuccessEvent]
                }, {
                    action: [this.resetUploadFrame, this.resetUploadingFlag,  this.updateToolbar, this.updateProgressBar, this.fireUploadSuccessEvent, this.fireUploadCompleteEvent],
                    state: 'ready'
                }],
                'file-upload-error': [{
                    predicate: this.hasUnuploadedFiles,
                    action: [this.resetUploadFrame,  this.updateProgressBar, this.prepareNextUploadTask, this.fireUploadErrorEvent]
                }, {
                    action: [this.resetUploadFrame, this.resetUploadingFlag,  this.updateToolbar, this.updateProgressBar, this.fireUploadErrorEvent, this.fireUploadCompleteEvent],
                    state: 'ready'
                }],
                'file-upload-failed': [{
                    predicate: this.hasUnuploadedFiles,
                    action: [this.resetUploadFrame,  this.updateProgressBar, this.prepareNextUploadTask, this.fireUploadFailedEvent]
                }, {
                    action: [this.resetUploadFrame, this.resetUploadingFlag,  this.updateToolbar, this.updateProgressBar, this.fireUploadFailedEvent, this.fireUploadCompleteEvent],
                    state: 'ready'
                }],
                'file-upload-canceled': [{
                    predicate: this.hasUnuploadedFiles,
                    action: [this.setRecordCanceledState, this.updateProgressBar, this.prepareNextUploadTask, this.fireUploadCanceledEvent]
                }, {
                    action: [this.resetUploadingFlag, this.setRecordCanceledState, this.updateToolbar, this.updateProgressBar, this.fireUploadCanceledEvent, this.fireUploadCompleteEvent],
                    state: 'ready'
                }],
                'hide': [{
                    predicate: this.getResetOnHide,
                    action: [this.stopUpload, this.repostHide]
                }, {                    // Do nothing.
                }],
                'destroy': [{
                    predicate: this.hasUnuploadedFiles,
                    action: [this.resetUploadingFlag, this.abortUpload, this.fireUploadStopEvent, this.flushEventQueue],
                    state: 'destroyed'
                }, {
                    action: [this.resetUploadingFlag, this.abortUpload, this.fireUploadStopEvent, this.fireUploadCompleteEvent, this.flushEventQueue],
                    state: 'destroyed'
                }]
            },
            // --------------
            'destroyed': {                // --------------
            }
        }
        this.fsa = new Ext.ux.Utils.FSA('created', tt, this);
        
        // Registering dialog events.
        this.addEvents({
            'filetest': true,
            'fileadd': true,
			'filerename': true,
            'fileremove': true,
            'resetqueue': true,
            'uploadsuccess': true,
            'uploaderror': true,
            'uploadfailed': true,
            'uploadcanceled': true,
            'uploadstart': true,
            'uploadstop': true,
            'uploadcomplete': true,
            'beforefileuploadstart': true,
            'fileuploadstart': true,
			'updateGridRecordState': true
        });
        
        // Attaching to window events.
        this.on('render', this.onWindowRender, this);
        this.on('beforehide', this.onWindowBeforeHide, this);
        this.on('hide', this.onWindowHide, this);
        this.on('destroy', this.onWindowDestroy, this);
        
        // Compiling state template.
        this.state_tpl = new Ext.Template("<div class='ext-ux-uploaddialog-state ext-ux-uploaddialog-state-{state}'>&#160;</div>").compile();
        
        
    },
    
    createForm: function(){
        this.form = Ext.DomHelper.append(this.body, {
            tag: 'form',
            method: 'post',
            action: this.url,
            style: 'position: absolute; left: -100px; top: -100px; width: 100px; height: 100px'
        });
    },
    
    createProgressBar: function(){
        this.progress_bar = this.add(new Ext.ProgressBar({
            x: 0,
            y: 0,
            anchor: '0',
            value: 0.0,
            text: this.i18n.progress_waiting_text
        }));
    },
    
    createGrid: function(){
        if (this.gridStore == null || this.gridStore == "") {
//            var store = new Ext.data.Store({
//                proxy: new Ext.data.MemoryProxy([]),
//                reader: new Ext.data.JsonReader({}, Ext.ux.UploadDialog.FileRecord),
//                sortInfo: {
//                    field: 'state',
//                    direction: 'DESC'
//                },
//                pruneModifiedRecords: true
//            });
            var store = new WXTL.Widgets.CommonData.GroupingStore({
                proxy: new Ext.data.HttpProxy({
                    url: this.url,//'Test/UploadTest.aspx',
                    method: "POST"
                }),
                reader: new Ext.data.JsonReader({
                    fields: ["rowid","state", "filename", "filepath", "speed", "input_element", "percentage", "starttime", "note", "uploadedlen","clifilesize"],
                    root: "data",
                    id: "filename",
                    totalProperty: "totalCount"
                }),
				sortInfo: {
                	field: 'starttime',
                	direction: 'DESC'
            	},
                baseParams: {
                    flag: 'selectbylist'
                }
            });
            this.gridStore = store;
			this.gridStore.reload();
        }
		if (this.smGrid == null || this.smGrid == "") {
			var sm = new Ext.grid.CheckboxSelectionModel({
				dataIndex: "filename",
				singleSelect: true
			});
			this.smGrid = sm;
		}
        if (this.cmGrid == null || this.cmGrid == "") {
            var cm = new Ext.grid.ColumnModel([ {
                header: this.i18n.filename_col_title,
                width: this.i18n.filename_col_width,
                dataIndex: 'filename',
                sortable: true,
                renderer: this.renderFilenameCell.createDelegate(this)
            }, {
                header: "本地文件路径",
                hidden: true,
                dataIndex: 'filepath',
                renderer: function(data, cell){
                    if (Ext.QuickTips.isEnabled()) {
                        cell.attr = 'ext:qtip="' + Ext.util.Format.htmlEncode(data) + '"';
                    }
                    else {
                        cell.attr = 'title="' + data + '"';
                    }
                    return data;
                }
            }, {
                header: '上传时间',
                width: 150,
                dataIndex: 'starttime',
                sortable: true,
				renderer: function(data, cell){
                    if (Ext.QuickTips.isEnabled()) {
                        cell.attr = 'ext:qtip="' + Ext.util.Format.htmlEncode(data) + '"';
                    }
                    else {
                        cell.attr = 'title="' + data + '"';
                    }
                    return data;
                }
            },{
                header: '文件大小',
                width: 80,
                dataIndex: 'clifilesize',
                sortable: true,
                renderer: function(data, cell){
                    if (Ext.QuickTips.isEnabled()) {
                        cell.attr = 'ext:qtip="' + Ext.util.Format.htmlEncode(getFileSizeFormat(data)) + '"';
                    }
                    else {
                        cell.attr = 'title="' + getFileSizeFormat(data) + '"';
                    }
                    return getFileSizeFormat(data);
                }
            },{
                header: '已上传大小',
                width: 90,
                dataIndex: 'uploadedlen',
                sortable: true,
                renderer: function(data, cell){
                    if (Ext.QuickTips.isEnabled()) {
                        cell.attr = 'ext:qtip="' + Ext.util.Format.htmlEncode(getFileSizeFormat(data)) + '"';
                    }
                    else {
                        cell.attr = 'title="' + getFileSizeFormat(data) + '"';
                    }
                    return getFileSizeFormat(data);
                }
//				renderer: function(value){
//					return getFileSizeFormat(value);
//				}
            },{
                header: '速度',
                width: 70,
                dataIndex: 'speed',
                sortable: false//,
//				renderer: function(data, cell){
//                    if (Ext.QuickTips.isEnabled()) {
//                        cell.attr = 'ext:qtip="' + Ext.util.Format.htmlEncode(data) + '"';
//                    }
//                    else {
//                        cell.attr = 'title="' + data + '"';
//                    }
//                    return data;
//                }
            },{
                header: '进度',
                width: 150,
                dataIndex: 'percentage',
                sortable: true,
                renderer: function(data, p, record, w){
					var progre = data;
					var progress;
					if (data.toString().indexOf(".") == 2) {
						if (data.toString().length >= 5) {
							progre = data.toString().substring(0, 5);
							data = data.toString().substring(0, 5) + "%";
						}
					}
					else if (data.toString().indexOf(".") == 1){
						if (data.toString().length >= 4) {
							progre = data.toString().substring(0, 4);
							data = data.toString().substring(0, 4) + "%";
						}
					}
					else{
						if(data.toString().indexOf("%")<0){
							data = data.toString() + "%";
						}
						else{
							if (data.toString().length > 3) {
								progre = data.toString().substring(0, 3);
							}
							else{
								progre = data.toString().substring(0, data.toString().indexOf("%"));
							}
						}
						
					}
					if(progre == 0){
						progress = '<div style="text-align: left; border: 1px solid #666666; height: 15px; width:100px"><div style="text-align: center">'+data+'</div></div>';
					}
					else{
						if(progre < 100){
							progress = '<div style="border: 1px solid #666666; height: 15px; width:102px;position:relative;"><div style="background-color: red; height: 15px;width:'+progre+'px;position:relative;z-index:1"><div style="text-align: center;height: 15px; width:100px;position:absolute; z-index:2;">'+data+'</div></div></div>';
						}
						else if (progre == 100){
							progress = '<div style="border: 1px solid #666666; height: 15px; width:100px;position:relative;"><div style="background-color: #0DD400; height: 15px;width:'+progre+'px;position:relative;z-index:1"><div style="text-align: center;height: 15px; width:100px;position:absolute; z-index:2;">'+data+'</div></div></div>';
						}
						else{
							progress = '<div style="border: 1px solid #666666; height: 15px; width:100px;position:relative;"><div style="background-color: red; height: 15px;width:100px;position:relative;z-index:1"><div style="text-align: center;height: 15px; width:100px;position:absolute; z-index:2;">'+data+'</div></div></div>';
						}
						
					}
                    //var progress = '<div style="width:100px;height:15px;"><div style="height:15px; width:' + progre + 'px; background-image:url(jspack/product/common/Images/menu3_bg.gif);">' + progre + '%</div></div>';
                    
                    return progress;
                }
            },{
//                header: this.i18n.state_col_title,
//                width: this.i18n.state_col_width,
//				hidden: true,
//                resizable: false,
//                dataIndex: 'state',
//                sortable: true
//            },{
//                header: this.i18n.state_col_title,
//                width: this.i18n.state_col_width,
//				hidden: true,
//                resizable: false,
//                dataIndex: 'state',
//                sortable: true,
//                renderer: this.renderStateCell.createDelegate(this)
//            },  {
                header: this.i18n.note_col_title,
                width: this.i18n.note_col_width,
                dataIndex: 'note',
                sortable: true,
                renderer: this.renderNoteCell.createDelegate(this)
            }]);
            this.cmGrid = cm;
        }
        
        this.grid_panel = new Ext.grid.GridPanel({//WXTL.Widgets.CommonGrid.GridPanel({//
//            needPage:false,
//			needMenu:false,
//			needRightMenu:false,
//			needLoadFunc:false,
//			title:'',
			ds: this.gridStore,
            cm: this.cmGrid,
            sm: this.smGrid,
            x: 0,
            y: 0,
            anchor: '0 0',
            border: true,
            
            viewConfig: {
                autoFill: true,
                forceFit: true
            },
            
            bbar: new Ext.Toolbar()
        });
        this.grid_panel.on('render', this.onGridRender, this);
        
        this.add(this.grid_panel);
        
        this.grid_panel.getSelectionModel().on('selectionchange', this.onGridSelectionChange, this);
    },
    
    fillToolbar: function(){
        var tb = this.grid_panel.getBottomToolbar();
        tb.x_buttons = {}
        
        tb.x_buttons.add = tb.addItem(new Ext.ux.UploadDialog.TBBrowseButton({
            input_name: this.post_var_name,
            text: this.i18n.add_btn_text,
            tooltip: this.i18n.add_btn_tip,
            iconCls: 'ext-ux-uploaddialog-addbtn',
            handler: this.onAddButtonFileSelected,
            scope: this
        }));
        
		tb.x_buttons.rename = tb.addButton({
            text: this.i18n.rename_btn_text,
            tooltip: this.i18n.rename_btn_tip,
            iconCls: 'ext-ux-uploaddialog-renamebtn',
            handler: this.onRenameButtonClick,
            scope: this
        });
		
        tb.x_buttons.remove = tb.addButton({
            text: this.i18n.remove_btn_text,
            tooltip: this.i18n.remove_btn_tip,
            iconCls: 'ext-ux-uploaddialog-removebtn',
            handler: this.onRemoveButtonClick,
            scope: this
        });
        
        tb.x_buttons.reset = tb.addButton({
            text: this.i18n.reset_btn_text,
            tooltip: this.i18n.reset_btn_tip,
            iconCls: 'ext-ux-uploaddialog-resetbtn',
            handler: this.onResetButtonClick,
            scope: this
        });
        
        tb.add('-');
        
        tb.x_buttons.upload = tb.addButton({
            text: this.i18n.upload_btn_start_text,
            tooltip: this.i18n.upload_btn_start_tip,
            iconCls: 'ext-ux-uploaddialog-uploadstartbtn',
            handler: this.onUploadButtonClick,
            scope: this
        });
        
        tb.add('-');
        
        tb.x_buttons.indicator = tb.addItem(new Ext.Toolbar.Item(Ext.DomHelper.append(tb.getEl(), {
            tag: 'div',
            cls: 'ext-ux-uploaddialog-indicator-stoped',
            html: '&#160'
        })));
        
        tb.add('->');
        
        tb.x_buttons.close = tb.addButton({
            text: this.i18n.close_btn_text,
            tooltip: this.i18n.close_btn_tip,
            handler: this.onCloseButtonClick,
            scope: this
        });
		
		tb.x_buttons.cancel = tb.addButton({
            text: "取消",
            tooltip: "取消",
            handler: this.onCancelButtonClick,
            scope: this
        });
    },
    
    renderStateCell: function(data, cell, record, row_index, column_index, store){
        return this.state_tpl.apply({
            state: data
        });
    },
    
    renderProgressCell: function(data, cell, record, row_index, column_index, store){
        var progress = '<div style="width:100px;height:15px;"><div style="height:15px; width:' + prog + '; background-image:url(jspack/product/common/Images/menu3_bg.gif);">' + prog + '</div></div>';
        return progress;
    },
    
    renderFilenameCell: function(data, cell, record, row_index, column_index, store){
        if (Ext.QuickTips.isEnabled()) {
            cell.attr = 'ext:qtip="' + Ext.util.Format.htmlEncode(data) + '"';
        }
        else {
            cell.attr = 'title="' + data + '"';
        }
        return data;
    },
    
    renderNoteCell: function(data, cell, record, row_index, column_index, store){
        if (Ext.QuickTips.isEnabled()) {
            cell.attr = 'ext:qtip="' + Ext.util.Format.htmlEncode(data) + '"';
        }
        else {
            cell.attr = 'title="' + data + '"';
        }
        return data;
    },
    renderNoteCell: function(data, cell, record, row_index, column_index, store){
        if (Ext.QuickTips.isEnabled()) {
            cell.attr = 'ext:qtip="' + Ext.util.Format.htmlEncode(data) + '"';
        }
        else {
            cell.attr = 'title="' + data + '"';
        }
        return data;
    },
    
    getFileExtension: function(filename){
        var result = null;
        var parts = filename.split('.');
        if (parts.length > 1) {
            result = parts.pop();
        }
        return result.toLowerCase();
    },
    
    isPermittedFileType: function(filename){
        var result = true;
        if (this.permitted_extensions.length > 0) {
            result = this.permitted_extensions.indexOf(this.getFileExtension(filename)) != -1;
        }
        return result;
    },
    
    isPermittedFile: function(browse_btn){
        var result = false;
        var filename = browse_btn.getInputFile().dom.value;
        
        if (this.isPermittedFileType(filename)) {
            result = true;
        }
        else {
            Ext.Msg.alert(this.i18n.error_msgbox_title, String.format(this.i18n.err_file_type_not_permitted, filename, this.permitted_extensions.join(this.i18n.permitted_extensions_join_str)));
            result = false;
        }
		var store = this.grid_panel.getStore();
		//判断文件是否超出允许上传的数量，默认20个
        if (store.getCount() < 20) {
            //判断是否存在同名文件
            store.each(function(r){
                if (r.get('filename') == filename.substring(filename.lastIndexOf("\\") + 1)) {
                    Ext.Msg.alert("温馨提示", "文件‘ " + filename.substring(filename.lastIndexOf("\\") + 1) + "’ 已存在，请选择其他文件！");
                    result = false;
                }
            });
        }
		else{
			Ext.Msg.alert('温馨提示', "对不起，服务器端文件最多只能上传20个，请先整理您的文件夹！");
			result = false;
		}
		
        
        return result;
    },
    
    fireFileTestEvent: function(browse_btn){
        return this.fireEvent('filetest', this, browse_btn.getInputFile().dom.value) !== false;
    },
    
    addFileToUploadQueue: function(browse_btn){
        var input_file = browse_btn.detachInputFile();
        
        input_file.appendTo(this.form);
        input_file.setStyle('width', '100px');
        input_file.dom.disabled = true;
        
        var store = this.grid_panel.getStore();
			store.insert(0, new Ext.ux.UploadDialog.FileRecord({
				state: Ext.ux.UploadDialog.FileRecord.STATE_QUEUE,
				filename: input_file.dom.value.substring(input_file.dom.value.lastIndexOf("\\") + 1),
				filepath: input_file.dom.value,
				note: this.i18n.note_queued_to_upload,
				input_element: input_file,
				speed: '',
				percentage: '0',
				clifilesize:'0',
				uploadedlen: '0',
				starttime: Ext.util.Format.date(WXTL.Common.dateTime.getNow(), 'Y-m-d H:m:s'),
				endtime: ''
			}));
			
			this.is_newuploading = true;
			this.fsa.postEvent('file-added', input_file.dom.value);
    },
    
    fireFileAddEvent: function(filename){
        this.fireEvent('fileadd', this, filename);
    },
    updateProgressBar: function(){
//        if (this.is_uploading) {
//            var queued = this.getQueuedCount(true);
//            var value = 1 - queued / this.initial_queued_count;
//            this.progress_bar.updateProgress(value, String.format(this.i18n.progress_uploading_text, this.initial_queued_count - queued, this.initial_queued_count));
//            
//            
//        }
//        else {
//            this.progress_bar.updateProgress(0, this.i18n.progress_waiting_text);
//        }
    },
    
    updateToolbar: function(){
        var tb = this.grid_panel.getBottomToolbar();
        if (this.is_uploading) {
			tb.x_buttons.rename.disable();
            tb.x_buttons.remove.disable();
            tb.x_buttons.reset.disable();
            tb.x_buttons.upload.enable();
            if (!this.getAllowCloseOnUpload()) {
                tb.x_buttons.close.disable();
            }
            Ext.fly(tb.x_buttons.indicator.getEl()).replaceClass('ext-ux-uploaddialog-indicator-stoped', 'ext-ux-uploaddialog-indicator-processing');
            tb.x_buttons.upload.setIconClass('ext-ux-uploaddialog-uploadstopbtn');
            tb.x_buttons.upload.setText(this.i18n.upload_btn_stop_text);
            tb.x_buttons.upload.getEl().child(tb.x_buttons.upload.buttonSelector).dom[tb.x_buttons.upload.tooltipType] = this.i18n.upload_btn_stop_tip;
        }
        else {
			tb.x_buttons.rename.enable();
            tb.x_buttons.remove.enable();
            tb.x_buttons.reset.enable();
            tb.x_buttons.close.enable();
            Ext.fly(tb.x_buttons.indicator.getEl()).replaceClass('ext-ux-uploaddialog-indicator-processing', 'ext-ux-uploaddialog-indicator-stoped');
            tb.x_buttons.upload.setIconClass('ext-ux-uploaddialog-uploadstartbtn');
            tb.x_buttons.upload.setText(this.i18n.upload_btn_start_text);
            tb.x_buttons.upload.getEl().child(tb.x_buttons.upload.buttonSelector).dom[tb.x_buttons.upload.tooltipType] = this.i18n.upload_btn_start_tip;
            
            if (this.grid_panel.getSelectionModel().hasSelection()) {
                tb.x_buttons.upload.disable();
			    var selections = this.grid_panel.getSelectionModel().getSelections();
                for (var i = 0; i < selections.length; i++) {
                    if (selections[i].get("state") == 0 || selections[i].get("state") == 2) {
                        this.resetUploadingFlag();
                        tb.x_buttons.upload.enable();
                    }
                }
                
            }
            else {
                if (this.getQueuedCount() > 0) {
                    tb.x_buttons.upload.enable();
                }
                else {
                    tb.x_buttons.upload.disable();
                }
            }
			
			
            
            if (this.grid_panel.getSelectionModel().hasSelection()) {
				tb.x_buttons.rename.enable();
                tb.x_buttons.remove.enable();
            }
            else {
				tb.x_buttons.rename.disable();
                tb.x_buttons.remove.disable();
            }
            
//            if (this.grid_panel.getStore().getCount() > 0) {
//                tb.x_buttons.reset.enable();
//            }
//            else {
//                tb.x_buttons.reset.disable();
//            }
        }
    },
    
    saveInitialQueuedCount: function(){
        this.initial_queued_count = this.getQueuedCount();
    },
    
    incInitialQueuedCount: function(){
        this.initial_queued_count++;
    },
    
    setUploadingFlag: function(){
        this.is_uploading = true;
    },
    
    resetUploadingFlag: function(){
        this.is_uploading = false;
    },
    
    prepareNextUploadTask: function(){
		
		var store = this.grid_panel.getStore();
		var record = null;
		if (this.is_newuploading) {
			record = store.getAt(0);
			this.grid_panel.getSelectionModel().clearSelections();
			this.grid_panel.getSelectionModel().selectRow(0, true);
			this.currentFileName = record.get("filename");
			this.is_newuploading = false;
		}
		else {
			// Searching for first unuploaded file.
			
			
			var selections = this.grid_panel.getSelectionModel().getSelections();
			if (selections.length > 0) {
				if (selections[0].get("state") != 1) {
					record = selections[0];
				}
				else {
					store.each(function(r){
						if (!record && r.get('state') == Ext.ux.UploadDialog.FileRecord.STATE_QUEUE) {
							record = r;
						}
						else {
							if (r.get('input_element') != "") {
								r.get('input_element').dom.disabled = true;
							}
						}
					});
				}
				
			}
			else {
				store.each(function(r){
					if (!record && r.get('state') == Ext.ux.UploadDialog.FileRecord.STATE_QUEUE) {
						record = r;
					}
					else {
						if (r.get('input_element') != "") {
							r.get('input_element').dom.disabled = true;
						}
					}
					
				});
			}
		}
		if (record != null) {
			if (record.get('input_element') != null && record.get('input_element') != "") {
				record.get('input_element').dom.disabled = false;
			}
			
			record.set('state', Ext.ux.UploadDialog.FileRecord.STATE_PROCESSING);
			record.set('note', this.i18n.note_processing);
			record.commit();
			
			this.fsa.postEvent('file-upload-start', record);
		}
    },
    
    fireUploadStartEvent: function(){
        this.fireEvent('uploadstart', this);
    },
    
    removeFiles: function(file_records){
        var store = this.grid_panel.getStore();
		var deleteFiles = '';
		var deleteUrl = this.url;
        for (var i = 0, len = file_records.length; i < len; i++) {
            var r = file_records[i];
            if (r.get('input_element') != "") {
                r.get('input_element').remove();
            }
			if(deleteFiles == ''){

				
				deleteFiles = escape(r.get('filename'));
			}
			else{
				deleteFiles = deleteFiles + ',' + escape(r.get('filename'));
			}
			Ext.Msg.confirm("温馨提示!", "您确定要删除吗?", function(btn){
                if (btn == "yes") {
                   //store.remove(r);
	                var parms = {
		                flag:'deletefile',
		                filename:deleteFiles
	                };
	                doAjax(deleteUrl,parms,store);
                }
                else {
                
                }
            });
        }
        
        
    },
    
    fireFileRemoveEvent: function(file_records){
        for (var i = 0, len = file_records.length; i < len; i++) {
            this.fireEvent('fileremove', this, file_records[i].get('filename'), file_records[i]);
        }
    },
    
	renameFile: function(file_records){
        if (file_records.length > 0) {
            if (file_records.length == 1) {
				var r = file_records[0];
				if(r.get('state') == 1){
					//r.set('filename',r.get('filename').substring(0,r.get('filename').lastIndexOf('.')));
					Ext.ux.UploadDialog.CreateRenameFileWindow(r,this.url,this.grid_panel.getStore());
				}
				else{
					Ext.Msg.alert("温馨提示", "对不起，只能重命名已上传完成的文件！");
				}
                
                
                //			var parms = {
                //				flag:'deletefile',
                //				filename:deleteFiles
                //			};
                //			doAjax(this.url,parms,this.grid_panel.getStore());
				
            }
            else {
                Ext.Msg.alert("温馨提示", "对不起，只能选择一条记录！");
            }
        }
		
	},
	
	fireFileRenameEvent: function(file_records){
        for (var i = 0, len = file_records.length; i < len; i++) {
            this.fireEvent('filerename', this, file_records[i].get('filename'), file_records[i]);
        }
    },
	
    resetQueue: function(){
		
        var store = this.grid_panel.getStore();
        store.each(function(r){
            if (r.get('input_element') != "") {
                r.get('input_element').remove();
            }
        });
        store.removeAll();
    },
    
    fireResetQueueEvent: function(){
        this.fireEvent('resetqueue', this);
    },
    
    uploadFile: function(record){
		try {
			var sessionID = getSessionID();
			this.objActive = Ext.ux.UploadDialog.ActiveX;
			if (this.objActive != null) {
				this.objActive.Host = window.location.hostname;
				this.objActive.Port = window.location.port == "" ? 80 : window.location.port;
				this.objActive.URL = this.url;
				this.objActive.FilePath = record.get("filepath");
				this.objActive.SessionID = sessionID;
				this.objActive.LengthEachTime = 1024 * 512;
				this.objActive.Charset = "utf-8";
				
				//if (this.objActive.state == 'stop') {
				var state = this.objActive.Run();
				//this.fsa.postEvent('file-upload-updategrid', record);
				window.setTimeout(function(){
					WXTL.Widgets.CommonWindows.dialog.fsa.postEvent('file-upload-updategrid', record);
					
				}, 1000);
			//}
			}
			else{
				//Ext.Msg.alert("温馨提示", "请检查是否安装利信通PC客户端，以及ActiveX是否被禁用");
			}
		}
		catch(err){
			Ext.Msg.alert("温馨提示", err.message);
        	return false;
		}
    	


//        Ext.Ajax.request({
//            url: this.url,
//            params: Ext.applyIf(record.get('params') ||
//            {}, this.base_params || this.baseParams || this.params),
//            method: 'POST',
//            form: this.form,
//            isUpload: true,
//            success: this.onAjaxSuccess,
//            failure: this.onAjaxFailure,
//            scope: this,
//            record: record
//        });
    },
	
    updateGridRecordState: function(record){
        //var s = this.objActive.state;
		try {
			if (this.fsa.state() == 'uploading'){
				if (this.objActive != null) {
					if (this.objActive.state == 'start') {
						//判断如果Active上传控件有问题，则只更新note信息
						if (this.getActiveMessage(this.objActive.Message) == "客户端文件不存在") {
							record.set('state', Ext.ux.UploadDialog.FileRecord.STATE_PROCESSING);//this.objActive.state);
							record.set('speed', '');
							record.set('note', this.getActiveMessage(this.objActive.Message));
							record.commit();
							this.fsa.postEvent('file-upload-updategrid', record);
						}
						else {
							record.set('state', Ext.ux.UploadDialog.FileRecord.STATE_PROCESSING);//this.objActive.state);
							record.set('speed', getFileSizeFormat(this.objActive.Speed));
							record.set('clifilesize', this.objActive.FileSize);
							record.set('uploadedlen', this.objActive.UploadedLen);
							record.set('percentage', this.objActive.Percentage);
							record.set('note', this.getActiveMessage(this.objActive.Message));
							record.commit();
							if (this.is_uploading) {
								window.setTimeout(function(){
									WXTL.Widgets.CommonWindows.dialog.fsa.postEvent('file-upload-updategrid', record);
								}, 1000);
							}
							
						}
					}
					if (this.objActive.state == 'stop') {
						if (this.objActive.Message == "上传完成") {
							record.set('state', Ext.ux.UploadDialog.FileRecord.STATE_FINISHED);//this.objActive.state);
							record.set('speed', getFileSizeFormat(this.objActive.Speed));
							record.set('clifilesize', this.objActive.FileSize);
							record.set('uploadedlen', this.objActive.UploadedLen);
							record.set('percentage', this.objActive.Percentage);
							record.set('note', this.getActiveMessage(this.objActive.Message));
							record.commit();
						}
						else {
							if (this.getActiveMessage(this.objActive.Message) == "客户端文件不存在") {
								record.set('state', Ext.ux.UploadDialog.FileRecord.STATE_QUEUE);//this.objActive.state);
								record.set('note', this.getActiveMessage(this.objActive.Message));
								record.commit();
							}
							else {
								record.set('state', Ext.ux.UploadDialog.FileRecord.STATE_QUEUE);//this.objActive.state);
								record.set('speed', '');
								record.set('clifilesize', this.objActive.FileSize);
								record.set('uploadedlen', this.objActive.UploadedLen);
								record.set('percentage', this.objActive.Percentage);
								record.set('note', this.getActiveMessage(this.objActive.Message));
								//record.set('note', note_queued_to_upload);
								//                        if (this.getActiveMessage(this.objActive.Message) == "正在上传") {
								//							
								//							record.set('note', note_queued_to_upload);
								//						}
								//						else {
								//							record.set('note', this.getActiveMessage(this.objActive.Message));
								//						}
								record.commit();
							}
						}
						//if (this.is_uploading) {
						this.fsa.postEvent('stop-upload', record);
					//}
					
					}
				}
			}
		}
		catch(err){
			//Ext.Msg.alert(err.message);
			Ext.Msg.alert("温馨提示","对不起，您的操作太过频繁，如果不能正常使用，请刷新页面！");
		}
		
	},
    
    fireBeforeFileUploadStartEvent: function(record){
        return this.fireEvent('beforefileuploadstart', this, record.get('filename'), record) !== false;
    },
    
    postFileUploadCancelEvent: function(record){
        this.fsa.postEvent('file-upload-canceled', record);
    },
    
    setRecordCanceledState: function(record){
        record.set('state', Ext.ux.UploadDialog.FileRecord.STATE_FAILED);
        record.set('note', this.i18n.note_canceled);
        record.commit();
    },
    
    fireUploadCanceledEvent: function(record){
        this.fireEvent('uploadcanceled', this, record.get('filename'), record);
    },
    
    fireFileUploadStartEvent: function(record){
        this.fireEvent('fileuploadstart', this, record.get('filename'), record);
    },
    
//    updateRecordState: function(data){
//        if ('success' in data.response && data.response.success) {
//            data.record.set('state', Ext.ux.UploadDialog.FileRecord.STATE_FINISHED);
//            data.record.set('note', data.response.message || data.response.error || this.i18n.note_upload_success);
//        }
//        else {
//            data.record.set('state', Ext.ux.UploadDialog.FileRecord.STATE_FAILED);
//            data.record.set('note', data.response.message || data.response.error || this.i18n.note_upload_error);
//        }
        
//        data.record.set('progress', parseInt("0") + 10);
//        data.record.commit();
        
//    },
    
//    updateRecordProgress: function(data){
//    
//        //if(this.is_uploading){
//        data.record.set('progress', data.record.get("progress") + 10);
//        //}
//        data.record.commit();
//        
////        setTimeout(function(){
////            this.updateRecordProgress;
////        }, 10000)
//    },
    
    fireUploadSuccessEvent: function(data){
        this.fireEvent('uploadsuccess', this, data.record.get('filename'), data.response, data.record);
    },
    
    fireUploadErrorEvent: function(data){
        this.fireEvent('uploaderror', this, data.record.get('filename'), data.response, data.record);
    },
    
    fireUploadFailedEvent: function(data){
        this.fireEvent('uploadfailed', this, data.record.get('filename'), data.record);
    },
    
    fireUploadCompleteEvent: function(){
        this.fireEvent('uploadcomplete', this);
    },
    
    findUploadFrame: function(){
        this.upload_frame = Ext.getBody().child('iframe.x-hidden:last');
    },
    
    resetUploadFrame: function(){
        this.upload_frame = null;
    },
    
    removeUploadFrame: function(){
        if (this.upload_frame) {
            this.upload_frame.removeAllListeners();
            this.upload_frame.dom.src = 'about:blank';
            this.upload_frame.remove();
        }
        this.upload_frame = null;
    },
    
    abortUpload: function(){
		
        this.removeUploadFrame();
        var store = this.grid_panel.getStore();
        var record = null;
        store.each(function(r){
            if (r.get('state') == Ext.ux.UploadDialog.FileRecord.STATE_PROCESSING) {
                record = r;
                return false;
            }
        });
        var state;
        if(this.objActive != null){
			
            if(this.objActive.state == "stop"){
                if (this.objActive.Message != "上传完成") {
					state = "等待上传";//note_queued_to_upload;//this.getActiveMessage(this.objActive.Message);
				}
				else{
					state = this.getActiveMessage(this.objActive.Message);
				}
            }
            else{
			    state = this.objActive.Stop();
				if(state.indexOf("程序已停止")>-1){
					state = "等待上传";
				}
			}
		}
		else{
			state = "等待上传！";
		}
		if (record != null) {
			record.set('state', Ext.ux.UploadDialog.FileRecord.STATE_FAILED);
			if (record.get('percentage') == '100%') {
				record.set('state', Ext.ux.UploadDialog.FileRecord.STATE_FINISHED);
			}
			record.set('uploadedlen', this.objActive.UploadedLen);
			record.set('percentage', this.objActive.Percentage);
			record.set('speed', '');
			record.set('note', state);//this.i18n.note_aborted);
			record.commit();
		}
        
        if (this.getActiveMessage(this.objActive.Message) == "上传完成" || this.getActiveMessage(this.objActive.Message) == "等待上传" || this.getActiveMessage(this.objActive.Message) == "正在上传") {
            if (this.gridStore != "") {
                this.gridStore.reload();
            }
            var index = this.gridStore.indexOfId(this.currentFileName);
            
            this.grid_panel.getSelectionModel().selectRow(index, true);
            this.currentFileName = '';
            
        }
//		else{
//			if (this.getActiveMessage(this.objActive.Message) == "上传完成" || this.getActiveMessage(this.objActive.Message) == "等待上传"|| this.getActiveMessage(this.objActive.Message) == "正在上传") {
//				if (this.gridStore != "") {
//					this.gridStore.reload();
//				}
//				var index = this.grid_panel.getStore().indexOfId(this.currentFileName);
//				
//				this.grid_panel.getSelectionModel().selectRow(index, true);
//				this.currentFileName = '';
//				
//			}
//			else {
//				//Ext.Msg.alert('温馨提示', this.getActiveMessage(this.objActive.Message));
//			}
////			if (this.getActiveMessage(this.objActive.Message) == "正在上传") {
////				var selections = this.grid_panel.getSelectionModel().getSelections();
////				if (selections.length > 0) {
////					record = selections[0];
////					record.set('note',"等待上传");
////					record.commit();
////				}
////			}
//		}
		this.resetUploadingFlag();
		this.fsa.current_state = 'ready';
    },
    
    fireUploadStopEvent: function(){
        this.fireEvent('uploadstop', this);
		
    },
    
    repostHide: function(){
        this.fsa.postEvent('hide');
    },
    
    flushEventQueue: function(){
        this.fsa.flushEventQueue();
    },
    
    resetAddButton: function(browse_btn){
        browse_btn.detachInputFile();
    },
    
    /**
     * @access private
     */
    // -------------------------------------------------------------------------------------------- //
    onWindowRender: function(){
        this.fsa.postEvent('window-render');
    },
    
    onWindowBeforeHide: function(){
        return this.isUploading() ? this.getAllowCloseOnUpload() : true;
    },
    
    onWindowHide: function(){
        this.fsa.postEvent('hide');
    },
    
    onWindowDestroy: function(){
        this.fsa.postEvent('destroy');
    },
    
    onGridRender: function(){
        this.fsa.postEvent('grid-render');
    },
    
    onGridSelectionChange: function(){
        this.fsa.postEvent('grid-selection-change');
    },
    
    onAddButtonFileSelected: function(btn){
        this.fsa.postEvent('file-selected', btn);
    },
    
    onUploadButtonClick: function(){
		
        if (this.is_uploading) {
            this.fsa.postEvent('stop-upload');
            
        }
        else {
            this.fsa.postEvent('start-upload');
        }
    },
    
	onRenameButtonClick: function(){
		var selections = this.grid_panel.getSelectionModel().getSelections();
		this.fsa.postEvent('rename-files', selections);
		
	},
	
    onRemoveButtonClick: function(){
        var selections = this.grid_panel.getSelectionModel().getSelections();
        this.fsa.postEvent('remove-files', selections);
    },
    
    onResetButtonClick: function(){
		
        this.fsa.postEvent('reset-queue');
        if (this.gridStore != "") {
            this.gridStore.reload();
        }
    },
    
    onCloseButtonClick: function(){
        
		var selections = this.grid_panel.getSelectionModel().getSelections();
		if(selections.length >0){
			if(selections[0].get("state") == 1){
				
				document.getElementById(this.tfFileName+ 'LoadFileName').value = escape(selections[0].get("filename"));
				
				document.getElementById(this.tfFileName+ "FileMessage").value = getFileMessage(selections[0].get("filename"),selections[0].get("uploadedlen"));
				
				this[this.closeAction].call(this);
			}
			else{
				Ext.Msg.alert("温馨提示", "您选择的文件还没有上传完成，请选择已上传完成的文件！");
			}
			
		}
		else{
			//this[this.closeAction].call(this);
			Ext.Msg.alert("温馨提示", "请选择已上传的服务器端文件!");
//			Ext.Msg.confirm("温馨提示!", "您还没有选择服务器端文件，确定要关闭此窗口吗?", function(btn){
//                if (btn == "yes") {
//                    this[this.closeAction].call(this);
//                }
//                else {
//                
//                }
//            })
		}
    },
	onCancelButtonClick: function(){
		this[this.closeAction].call(this);
		//Ext.Msg.alert("温馨提示", "您没有选择已上传的服务器端文件，请选择上传客户端文件!");
    },
    
    onAjaxSuccess: function(response, options){
        var json_response = {
            'success': false,
            'error': this.i18n.note_upload_error
        }
        try {
            var rt = response.responseText;
            var filter = rt.match(/^<[^>]+>((?:.|\n)*)<\/[^>]+>$/);
            if (filter) {
                rt = filter[1];
            }
            json_response = Ext.util.JSON.decode(rt);
        } 
        catch (e) {
        }
        
        var data = {
            record: options.record,
            response: json_response
        }
        
        if ('success' in json_response && json_response.success) {
            this.fsa.postEvent('file-upload-success', data);
        }
        else {
            this.fsa.postEvent('file-upload-error', data);
        }
    },
    
    onAjaxFailure: function(response, options){
        var data = {
            record: options.record,
            response: {
                'success': false,
                'error': this.i18n.note_upload_failed
            }
        }
        
        this.fsa.postEvent('file-upload-failed', data);
    },
    
    /**
     * @access public
     */
    // -------------------------------------------------------------------------------------------- //
    startUpload: function(){
        this.fsa.postEvent('start-upload');
    },
    
    stopUpload: function(){
        this.fsa.postEvent('stop-upload');
    },
    
    getUrl: function(){
        return this.url;
    },
    
    setUrl: function(url){
        this.url = url;
    },
    
    getBaseParams: function(){
        return this.base_params;
    },
    
    setBaseParams: function(params){
        this.base_params = params;
    },
    
    getUploadAutostart: function(){
        return this.upload_autostart;
    },
    
    setUploadAutostart: function(value){
        this.upload_autostart = value;
    },
    
    getAllowCloseOnUpload: function(){
        return this.allow_close_on_upload;
    },
    
    setAllowCloseOnUpload: function(value){
        this.allow_close_on_upload = value;
    },
    
    getResetOnHide: function(){
        return this.reset_on_hide;
    },
    
    setResetOnHide: function(value){
        this.reset_on_hide = value;
    },
    
    getPermittedExtensions: function(){
        return this.permitted_extensions;
    },
    
    setPermittedExtensions: function(value){
        this.permitted_extensions = value;
    },
    
    isUploading: function(){
        return this.is_uploading;
    },
    
    isNotEmptyQueue: function(){
        return this.grid_panel.getStore().getCount() > 0;
    },
    
    getQueuedCount: function(count_processing){
        
        var count = 0;
        var store = this.grid_panel.getStore();
        store.each(function(r){
            if (r.get('state') == Ext.ux.UploadDialog.FileRecord.STATE_QUEUE){ //|| r.get('state') == Ext.ux.UploadDialog.FileRecord.STATE_FAILED) {
                count++;
            }
            if (count_processing && r.get('state') == Ext.ux.UploadDialog.FileRecord.STATE_PROCESSING) {
                count++;
            }
        });
        return count;
    },
    
    hasUnuploadedFiles: function(){
		
        //return this.getQueuedCount() > 0;
		var result = false;
        
        if (this.getQueuedCount() > 0) {
            result = true;
        }
        if (this.getFailedCount() > 0) {
            result = true;
        }
		if(result){
			Ext.ux.UploadDialog.CreateActiveX();
            
            if (Ext.ux.UploadDialog.ActiveX != null) {
            	result = true;
            }
            else {
				result = false;
                Ext.Msg.alert("温馨提示", "请检查是否安装利信通PC客户端，以及ActiveX是否被禁用");
            }
		}
			
		
		return result;
    },
	
    getFailedCount: function(){
		var count = 0;
        var store = this.grid_panel.getStore();
        store.each(function(r){
            if (r.get('state') == Ext.ux.UploadDialog.FileRecord.STATE_FAILED){ //|| r.get('state') == Ext.ux.UploadDialog.FileRecord.STATE_FAILED) {
                count++;
            }
        });
        return count;
	},
	
    getQueueStore: function(){
        return this.grid_panel.getStore();
    },
    getActiveMessage: function(msg){
        if(msg.indexOf("M0005")> -1){
			if (msg.indexOf("M0005") > -1) {
				var err = msg.split(":");
				if (err[1] == 1) {
					if (err[2] == 1) {
						return "服务器端文件已被删除";
					}
					if (err[2] == 2) {
						return "文件大小超过200M，请重新选择";
					}
				}
				if (err[1] == 2) {
					return err[2];
				}
			}
			else {
				return msg;//"服务器异常";
			}
        }
		if(msg.indexOf("无法打开文件") >-1 ){
            return "客户端文件不存在";
        }
		if(msg.indexOf("文件不合法") >-1 ){
            return "其他用户正在上传该文件";
        }
        if(msg.indexOf("提交成功")>-1){
            return "正在上传";
        }
        if(msg.indexOf("网络连接失败")> -1){
            return "网络连接失败";
        }
		
        if(msg.indexOf("鉴权失败")> -1){
            Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
				window.location.href = "login.htm";
			});
        }
        else{
            return msg;
        }
    }
});

// ---------------------------------------------------------------------------------------------- //

//var p = Ext.ux.UploadDialog.Dialog.prototype;
//p.i18n = {
//  title: 'File upload dialog',
//  state_col_title: 'State',
//  state_col_width: 70,
//  filename_col_title: 'Filename',
//  filename_col_width: 230,  
//  note_col_title: 'Note',
//  note_col_width: 150,
//  add_btn_text: 'Add',
//  add_btn_tip: 'Add file into upload queue.',
//  remove_btn_text: 'Remove',
//  remove_btn_tip: 'Remove file from upload queue.',
//  reset_btn_text: 'Reset',
//  reset_btn_tip: 'Reset queue.',
//  upload_btn_start_text: 'Upload',
//  upload_btn_stop_text: 'Abort',
//  upload_btn_start_tip: 'Upload queued files to the server.',
//  upload_btn_stop_tip: 'Stop upload.',
//  close_btn_text: 'Close',
//  close_btn_tip: 'Close the dialog.',
//  progress_waiting_text: 'Waiting...',
//  progress_uploading_text: 'Uploading: {0} of {1} files complete.',
//  error_msgbox_title: 'Error',
//  permitted_extensions_join_str: ',',
//  err_file_type_not_permitted: 'Selected file extension isn\'t permitted.<br/>Please select files with following extensions: {1}',
//  note_queued_to_upload: 'Queued for upload.',
//  note_processing: 'Uploading...',
//  note_upload_failed: 'Server is unavailable or internal server error occured.',
//  note_upload_success: 'OK.',
//  note_upload_error: 'Upload error.',
//  note_aborted: 'Aborted by user.',
//  note_canceled: 'Upload canceled'
//}
var p = Ext.ux.UploadDialog.Dialog.prototype;
p.i18n = {
    title: '服务器端文件',
    state_col_title: '选定',
    state_col_width: 70,
    filename_col_title: '文件名',
    filename_col_width: 230,
    note_col_title: '状态',
    note_col_width: 150,
    add_btn_text: '选择上传文件',
    add_btn_tip: '添加选择文件到上传列表.',
	rename_btn_text: '重命名',
	rename_btn_tip: '重命名已上传完成的文件',
    remove_btn_text: '删除',
    remove_btn_tip: '从上传列表删除文件.',
    reset_btn_text: '刷新',
    reset_btn_tip: '刷新上传文件列表.',
    upload_btn_start_text: '继续上传',
    upload_btn_stop_text: '暂停',
    upload_btn_start_tip: '将列表文件上传至服务器.',
    upload_btn_stop_tip: '暂停上传.',
    close_btn_text: '确定',
    close_btn_tip: '关闭对话框.',
    progress_waiting_text: '请稍等...',
    progress_uploading_text: 'Uploading: {0} of {1} files complete.',
    error_msgbox_title: '错误',
    permitted_extensions_join_str: ',',
    err_file_type_not_permitted: '上传文件格式不正确.<br/>请选择以下格式的文件: {1}',
    note_queued_to_upload: '等待上传.',
    note_processing: '正在上传...',
    note_upload_failed: 'Server is unavailable or internal server error occured.',
    note_upload_success: '上传成功.',
    note_upload_error: '上传错误.',
    note_aborted: '用户终止.',
    note_canceled: '取消上传。'
}
