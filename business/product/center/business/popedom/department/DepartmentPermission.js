Ext.namespace('Js.Center.Popedom.Department.DepartmentPrimission');

Js.Center.Popedom.Department.DepartmentPrimission.func = function(row){
    
    //var PermissionTree;
    var _ddrRoleid = row.get("numdroleid");
    var _id = 'numcolumnid';
    var _columnlist = 'numcolumnid,vc2columnname';
    var _url = Js.Center.Business.ColumnURL;
    var _valueField = 'numcolumnid';
    var _displayField = 'vc2columnname';
    var _fields = ['numcolumnid', 'vc2columnname'];
    var flag = 'selectpermitbyroleid';
    var _noflag = 'selectnopermitbyroleid';
    var datatype = 1;
    
    //=====================================未授权数据权限
    
    var fromStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({//数据代理 
            url: _url,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            fields: _fields,
            root: 'data',
            id: _id//'numcolumnid'
        }),
        baseParams: {
            flag: _noflag,
            roleid: _ddrRoleid,
            columnlist: _columnlist//'numcolumnid,vc2columnname'
        }
    });
    //fromStore.load();
    //==================================已授权数据权限
    
    var toStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({//数据代理 
            url: _url,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            fields: _fields,
            root: 'data',
            id: _id//'numcolumnid'
        }),
        baseParams: {
            flag: flag,
            roleid: _ddrRoleid,
            columnlist: _columnlist//'numcolumnid,vc2columnname'
        }
    });
    //toStore.load();
    
    if (Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin == null) {
    
        //==========================================================================定义FormPanel
        var permissionTablePanl = new Ext.form.FormPanel({
            frame: true,
            autoScroll: true, // 自动显示滚动条
            padding: '10 10 10 10',
            items: [{
                xtype: "hidden",
                name: "numdroleid",
                id: "ddrpermitroleid",
                fieldLabel: "编号"
            }, {
                xtype: "textfield",
                name: "vc2drolename",
                fieldLabel: "角色名称"
            }, {
                xtype: "combo",
                name: "numtypeid",
                id: "ddrpernumtype",
                fieldLabel: "数据类型",
                hiddenName: "ddrpermitnumtypeid",
                readOnly: true,
                mode: "local",
                displayField: "show",
                valueField: "value",
                triggerAction: "all",
                value: "1",
                store: new Ext.data.SimpleStore({
                    fields: ["show", "value"],
                    data: [["栏目", "1"], ["产品", "2"]]
                }),
                listeners: {
                    scope: this,
                    Select: function(combo, record, index){
                        datatype = index + 1;
                        if (index == 0) {
                            _id = 'numcolumnid';
                            _columnlist = 'numcolumnid,vc2columnname';
                            _url = Js.Center.Business.ColumnURL;
                            _valueField = 'numcolumnid';
                            _displayField = 'vc2columnname';
                            _fields = ['numcolumnid', 'vc2columnname'];
                            flag = 'selectpermitbyroleid';
                            _noflag = 'selectnopermitbyroleid';
                        }
                        if (index == 1) {
                            _id = 'numprodid';
                            _columnlist = 'numprodid,vc2name';
                            _url = Js.Center.Business.ProductURL;
                            _valueField = 'numprodid';
                            _displayField = 'vc2name';
                            _fields = ['numprodid', 'vc2name'];
                            flag = 'selectpermitbyroleid';
                            _noflag = 'selectnopermitbyroleid';
                        }
                        _ddrRoleid = Ext.get("ddrpermitroleid").getValue();
                        fromStore = new Ext.data.Store({
                            proxy: new Ext.data.HttpProxy({//数据代理 
                                url: _url,
                                method: "POST"
                            }),
                            reader: new Ext.data.JsonReader({
                                fields: _fields,
                                root: 'data',
                                id: _id//'numcolumnid'
                            }),
                            baseParams: {
                                flag: _noflag,
                                roleid: _ddrRoleid,
                                columnlist: _columnlist//'numcolumnid,vc2columnname'
                            }
                        });
                        //fromStore.reload();
                        toStore = new Ext.data.Store({
                            proxy: new Ext.data.HttpProxy({//数据代理 
                                url: _url,
                                method: "POST"
                            }),
                            reader: new Ext.data.JsonReader({
                                fields: _fields,
                                root: 'data',
                                id: _id//'numcolumnid'
                            }),
                            baseParams: {
                                flag: flag,
                                roleid: _ddrRoleid,
                                columnlist: _columnlist//'numcolumnid,vc2columnname'
                            }
                        });
                        //toStore.reload();
                        fromStore.load({
                            callback: function(records, options, success){
                                if (success) {
                                    toStore.load({
                                        callback: function(records, options, success){
                                            if (success) {
                                                Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin.show();
                                                //========================================================================创建树
                                                
                                                CreateTree();
                                            }
                                            else {
                                                Ext.Msg.alert("温馨提示", "操作超时，请稍后再试");
                                                Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin.close();
                                            }
                                        }
                                    });
                                }
                                else {
                                    Ext.Msg.alert("温馨提示", "操作超时，请稍后再试");
                                    Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin.close();
                                }
                            }
                        });
                    }
                }
            }]
        
        });
        //========================================================================定义窗体
        var mainForm = permissionTablePanl.getForm();
        var permissionPanel = new Ext.Panel({
            autoScroll: true,// 自动显示滚动条
            frame: true,
            padding: '10 10 10 10',
            items: [{
                frame: true,
                html: '<div id="ddritemselector" class="demo-ct"></div>'
            }]
        });
        Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin = new WXTL.Widgets.CommonWindows.Window({
            title: "部门数据角色授权",
            mainForm: mainForm,
            width: 700,
            height: 550,
            displayStore: Js.Center.Purview.DepartmentDataRole.Infostore,
            updateState: true,
            updateRecord: row,
            needButtons: false,
            items: [permissionTablePanl, permissionPanel],
            buttons: [{
                text: '保存',
                handler: function(){
                    // 弹出效果
                    Ext.MessageBox.show({
                        msg: '正在保存，请稍等...',
                        progressText: 'Saving...',
                        width: 300,
                        wait: true,
                        waitConfig: {
                            interval: 200
                        },
                        icon: 'download',
                        animEl: 'saving'
                    });
                    setTimeout(function(){
                        Ext.MessageBox.hide();
                    }, 300000);
                    //修改权限
                    updateDDRPermission(WXTL.Common.urlDecode(PermissionTree.getForm().getValues(true)).replace('itemselector=', ''));
                }
            }, {
                text: "取 消",
                minWidth: 70,
                handler: function(){
                    Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin.close();
                }
            }],
            listeners: {
                "show": function(){
                    permissionTablePanl.findById("ddrpernumtype").setValue("1");
                    mainForm.loadRecord(row);
                }
            }
        });
    }
    else 
        Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin.updateRecord = row;
    //========================================================================执行显示
    fromStore.load({
        callback: function(records, options, success){
            if (success) {
                toStore.load({
                    callback: function(records, options, success){
                        if (success) {
                            Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin.show();
                            //========================================================================创建树
                            
                            CreateTree();
                        }
                        else {
                            //Ext.Msg.alert("温馨提示", "操作超时，请稍后再试");
                            Ext.MessageBox.show({
                                msg: '正在加载数据，请稍等...',
                                progressText: 'Loading...',
                                width: 300,
                                wait: true,
                                waitConfig: {
                                    interval: 200
                                },
                                icon: 'download',
                                animEl: 'saving'
                            });
                            setTimeout(function(){
                                Ext.MessageBox.hide();
                                Ext.Msg.alert("温馨提示", "操作超时，请稍后再试");
                            }, 2000);
                        }
                    }
                });
            }
            else {
                //Ext.Msg.alert("温馨提示", "操作超时，请稍后再试");
                Ext.MessageBox.show({
                    msg: '正在加载数据，请稍等...',
                    progressText: 'Loading...',
                    width: 300,
                    wait: true,
                    waitConfig: {
                        interval: 200
                    },
                    icon: 'download',
                    animEl: 'saving'
                });
                setTimeout(function(){
                    Ext.MessageBox.hide();
                    Ext.Msg.alert("温馨提示", "操作超时，请稍后再试");
                }, 2000);
            }
        }
    });
    
    //========================================================创建树的方法
    function CreateTree(){
        //document.getElementById('ddritemselector').innerHTML = '';
        Ext.get('ddritemselector').dom.innerHTML = '';
        PermissionTree = new Ext.form.FormPanel({
            renderTo: 'ddritemselector',
            frame: true,
            bodyStyle: 'padding:10px,0px,0px,10px',
            autoScroll: true,// 自动显示滚动条
            items: [{
                anchor: ',100%',
                xtype: "itemselector",
                name: "itemselector",
                fieldLabel: "数据权限",
                dataFields: _fields,
                toData: [""],
                msWidth: 250,
                autoScroll: true,
                enableDD: false,
                msHeight: 350,
                valueField: _valueField,
                displayField: _displayField,
                //imagePath: "jspack/product/common/Images/",
                toLegend: "已选栏",
                fromLegend: "可选栏",
                fromStore: fromStore,
                toStore: toStore
            }]
        });
    };
    
    //=====================================================修改权限方法
    function updateDDRPermission(idlist){
      var params = {
                flag: 'updaterightByRoleid',
                datatypeid: Ext.get("ddrpermitnumtypeid").getValue(),//datatype,
                dataids: idlist,
                roleid: Ext.get("ddrpermitroleid").getValue()
            };
        Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin.mainFormSubmitFunc('',params,Js.Center.Purview.DepartmentDataRoleUpdateURL);

    
//        Ext.Ajax.request({
//            url: Js.Center.Purview.DepartmentDataRoleUpdateURL,
//            method: "POST",
//            params: {
//                flag: 'updaterightByRoleid',
//                datatypeid: Ext.get("ddrpermitnumtypeid").getValue(),//datatype,
//                dataids: idlist,
//                roleid: Ext.get("ddrpermitroleid").getValue()
//            },
//            success: function(form, action){
//                var objJson = Ext.util.JSON.decode(form.responseText);
//                var falg = objJson.success;
//                if (falg == true) {
//                    Ext.Msg.alert("温馨提示", "操作已成功!");
//                    Js.Center.Popedom.Department.DepartmentPrimission.DepartmentDataRoleWin.close();
//                }
//                else 
//                    Ext.Msg.alert('温馨提示', objJson.info);
//            },
//            failure: function(form, action){
//                var objJson = Ext.util.JSON.decode(action.response.responseText);
//                Ext.Msg.alert('温馨提示', objJson.info);
//            }
//        });
    };
    
};


