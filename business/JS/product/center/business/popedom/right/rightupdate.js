Ext.namespace('Js.Center.Purview.RightUpdate');
Js.Center.Purview.RightUpdate.func = function(row){
checkLogin();var rightComboxTree = new WXTL.Widgets.CommonForm.ComboWithTree({		name:'numparentid',		hiddenName:'numparentid',		fieldLabel: "上级目录",		anchor:'90%',		//displayField:'vc2rightname',		valueField:'id',		listWidth:'200',		listHeight:'150',		baseParams:{			parentid:'-1',			method:'POST'		},		dataUrl:'URL/tree.ashx'//Js.Center.Purview.RightURL	});
    Js.Center.Purview.Right.ParentRightStore.reload();
    //============================================================定义FormPanel
    var updateRightFormPanel = new Ext.form.FormPanel({
        labelAlign: 'left',
        buttonAlign: 'right',
        frame: true,
        labelWidth: 65,
        monitorValid: true,
        items: [{
            items: [{
                xtype: "hidden",
                name: "flag",
                value: 'updateall'
            }, {
                xtype: "hidden",
                name: "numrightid",
                fieldLabel: "编号"
            }]
        }, {
            layout: 'column',
            border: false,
            labelSeparator: ':',
            defaults: {
                layout: 'form',
                border: false,
                columnWidth: .5,
                msgTarget: "side"
            },
            items: [{
                items: [{
                    xtype: "textfield",
                    //id: "vc2rightname",
                    name: "vc2rightname",
                    fieldLabel: "<font color=red>权限名称</font>",
                    anchor: '90%',
                    allowBlank: false,
                    blankText: "权限名称不允许为空",
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
					msgTarget: "side",
                    maxLength: 50
                }]
            }, {
                items: [{
                    xtype: "textfield",
                    name: "numorder",
                    fieldLabel: "<font color=red>排序号</font>",
                    allowBlank: false,
                    blankText: "排序号不允许为空",
                    anchor: '90%',
                    regex: WXTL.Common.regex.Number,
                    regexText: "请输入小于四位的数字",
					msgTarget: "side",
                    maxLength: 4
                }]
            }, {
                items: [{
                    xtype: "textfield",
                    name: "vc2codegroupurl",
                    fieldLabel: "<font color=red>访问路径</font>",
                    allowBlank: false,
                    blankText: "访问路径不允许为空",
					msgTarget: "side",
                    anchor: '90%',
                    maxLength: 200
                }]
            }, {
                items: [{
                    xtype: "textfield",
                    name: "vc2codegroupmodule",
                    fieldLabel: "<font color=red>模块编号</font>",
                    allowBlank: false,
                    blankText: "模块编号不允许为空",
                    anchor: '90%',
					msgTarget: "side",
                    maxLength: 50
                }]
            },  {
                items: [{
                    xtype: "combo",
                    name: "vc2type1",
                    hiddenName: "vc2type",
                    fieldLabel: "<font color=red>权限类型</font>",
                    store: new Ext.data.SimpleStore({
                        data: [["功能", "1"], ["目录", "0"]],
                        fields: ["state", "value"]
                    }),
                    displayField: "state",
                    mode: "local",
                    valueField: "value",
                    readOnly: true,
                    forceSelection: true, // 要求输入值必须在列表中存在
                    //resizable: true, // 允许改变下拉列表的大小
                    typeAhead: true, // 允许自动选择匹配的剩余部分文本
                    value: '1', // 默认选择
                    triggerAction: 'all',
                    anchor: '90%',
					msgTarget: "side",
                    columnWidth: 1.05
                }]
            }, {
                items: [{
                    xtype: "textfield",
                    name: "vc2rightdesc",
                    fieldLabel: "权限描述",
                    anchor: '90%',
                    regex: WXTL.Common.regex.Illegal,
                    regexText: WXTL.Common.regexText.IllegalText,
					msgTarget: "side",
                    maxLength: 100
                }]
            },{
                items: [//rightComboxTree
                {
                    xtype: "xComboBox",
                    name: "numparentid1",
                    hiddenName: "numparentid",
                    fieldLabel: "上级目录",
                    store: Js.Center.Purview.Right.ParentRightStore,
                    displayField: "vc2rightname",
                    mode: "local",
                    valueField: "numrightid",
                    emptyText: '-=请选择=-',
                    forceSelection: true, // 要求输入值必须在列表中存在
                    //resizable: true, // 允许改变下拉列表的大小
                    typeAhead: true, // 允许自动选择匹配的剩余部分文本
                    //value: '-=请选择=-', // 默认选择
                    triggerAction: 'all',
					msgTarget: "side",
                    anchor: '90%'
                }
                ]
            }]
        }]
    });
    // ======================================================================= 定义窗体
    var mainForm = updateRightFormPanel.getForm();
    this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "修改功能权限",
        mainForm: mainForm,
        updateURL: Js.Center.Purview.RightUpdateURL,
        displayStore: Js.Center.Purview.Right.Infostore,
        updateState: true,
        updateRecord: row,
        needLoadDataStore: true,
        items: [updateRightFormPanel],
        loadDataStoreFunc: function(){            Js.Center.Purview.Right.ParentRightStore.reload();        }
    });
  //  Js.Center.Purview.RightUpdate.UpdateRightWin.show();
};
