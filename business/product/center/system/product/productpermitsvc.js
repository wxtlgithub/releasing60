/**
 * @author Administrator
 *配置路由页
 */
Ext.namespace('Js.Center.Business.ProductPermitsvc');

Js.Center.Business.ProductPermitsvc.func = function(row){
     if( Js.Center.Business.ProductPermitsvc.window == null ){
    //var PermissionTree;
    //==============================================================为产品已指定的通道下拉列表数据定义
    var producyPermitsvcStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: Js.Center.Business.ServiceCodeURL,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            fields: ['numsvcid', 'vc2svcname'],
            root: 'data',
            id: 'numsvcid'
        }),
        baseParams: {
            flag: 'selectpermitbypid',
            //productid: '',//row.get("numprodid"),
            //vc2servicetype: '',//row.get("vc2servicetype"),
            columnlist: 'numsvcid,vc2svcname'
        }
    });
    //producyPermitsvcStore.reload();
    //==============================================================为产品未指定的通道下拉列表数据定义
    var producynoPermitsvcStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: Js.Center.Business.ServiceCodeURL,
            method: "POST"
        }),
        reader: new Ext.data.JsonReader({
            fields: ['numsvcid', 'vc2svcname'],
            root: 'data',
            id: 'numsvcid'
        }),
        baseParams: {
            flag: 'selectnopermitbypid',
            //productid: '',//row.get("numprodid"),
            //vc2servicetype: '',//row.get("vc2servicetype"),
            columnlist: 'numsvcid,vc2svcname'
        }
    });
    
    //producynoPermitsvcStore.reload();
    
    //if (Js.Center.Business.ProductPermitsvc.ProductPermitsvcWin == null) {
    
    //==========================================================================定义FormPanel
    var permissionTablePanl = new Ext.form.FormPanel({
        frame: true,
        autoScroll: true, // 自动显示滚动条
        padding: '10 10 10 10',
        items: [{
            xtype: "hidden",
            name: "numprodid",
            id: "propermitsvcnumprodid",
            fieldLabel: "编号"
        }, {
            xtype: "textfield",
            name: "vc2name",
            readOnly: true,
            fieldLabel: "通道组名称"
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
            html: '<div id="prosvcitemselector" class="demo-ct"></div>'
        }]
    });
    this.window = new WXTL.Widgets.CommonWindows.Window({
        title: "配置路由",
        mainForm: mainForm,
        width: 700,
        height: 430,
        displayStore: Js.Center.Business.Product.Infostore,
        updateState: true,
        updateRecord: row,
        needButtons: false,
		needLoadDataStore: true,
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

                UpdateProcSvcPermission(WXTL.Common.urlDecode(PermissionTree.getForm().getValues(true)).replace('itemselector=', ''), Ext.get("propermitsvcnumprodid").getValue());
            }
        }, {
            text: "取 消",
            minWidth: 70,
            handler: function(){
                Js.Center.Business.ProductPermitsvc.window.hide();
            }
        }],
        listeners: {
                "show": function(){
                    PermissionTree.doLayout();
                },
				"beforeshow": function(){
			        producyPermitsvcStore.reload({
				        params:{
					        //flag: 'selectpermitbypid',
            		        productid: Js.Center.Business.ProductPermitsvc.window.updateRecord.get("numprodid"),
            		        vc2servicetype: Js.Center.Business.ProductPermitsvc.window.updateRecord.get("vc2servicetype"),
            		        columnlist: 'numsvcid,vc2svcname'
				        }
			        });
			        producynoPermitsvcStore.reload({
				        params:{
					        //flag: 'selectpermitbypid',
            		        productid: Js.Center.Business.ProductPermitsvc.window.updateRecord.get("numprodid"),
            		        vc2servicetype: Js.Center.Business.ProductPermitsvc.window.updateRecord.get("vc2servicetype"),
            		        columnlist: 'numsvcid,vc2svcname'
				        }
			        });				
			    }
            },
		loadDataStoreFunc: function(){

		}
    });
 
    //========================================================================执行显示
    //Js.Center.Business.ProductPermitsvc.ProductPermitsvcWin.show();
    
    
    //========================================================================创建树
    
    CreateTree();
   }
    
    //========================================================创建树的方法
    function CreateTree(){
        document.getElementById('prosvcitemselector').innerHTML = '';
        //Ext.get('prosvcitemselector').dom.innerHTML = '';
        PermissionTree = new Ext.form.FormPanel({
            renderTo: 'prosvcitemselector',
            frame: true,
            bodyStyle: 'padding:10px,0px,0px,10px',
            autoScroll: true,// 自动显示滚动条
            items: [{
                anchor: ',100%',
                xtype: "itemselector",
                name: "itemselector",
                fieldLabel: "通道",
                dataFields: ["numsvcid", "vc2svcname"],
                toData: [""],
                msWidth: 250,
                autoScroll: true,
                msHeight: 300,
                valueField: "numsvcid",
                displayField: "vc2svcname",
                //imagePath: "jspack/product/common/Images/",
                toLegend: "已选栏",
                fromLegend: "可选栏",
                fromStore: producynoPermitsvcStore,
                toStore: producyPermitsvcStore
            }]
        });
    };
    
    //=====================================================修改权限方法
    function UpdateProcSvcPermission(idlist, numproid){
    
        var   params={
                flag: 'addsvc',
                ids: idlist,
                numproid: numproid
            };
        Js.Center.Business.ProductPermitsvc.window.mainFormSubmitFunc('',params,Js.Center.Business.ProductUpdateURL);

    
    
//        Ext.Ajax.request({
//            url: Js.Center.Business.ProductUpdateURL,
//            method: "POST",
//            params: {
//                flag: 'addsvc',
//                ids: idlist,
//                numproid: numproid
//            },
//            
//            
//            success: function(form, action){
//                var objJson = Ext.util.JSON.decode(form.responseText);
//                var falg = objJson.success;
//                if (falg == true) {
//                    Js.Center.Business.ProductPermitsvc.ProductPermitsvcWin.close();
//                    Ext.Msg.alert('温馨提示', '保存成功！');
//                }
//                else {
//                    Ext.Msg.alert('温馨提示', objJson.info);
//                }
//            },
//            failure: function(form, action){
//                var objJson = Ext.util.JSON.decode(action.response.responseText);
//                Ext.Msg.alert('温馨提示', objJson.info);
//            }
//        });
    };
    
};


