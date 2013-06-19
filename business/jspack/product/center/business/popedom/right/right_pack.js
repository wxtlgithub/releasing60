﻿Ext.namespace('Js.Center.Purview.Right');Js.Center.Purview.Right.info=function(node){checkLogin();if(Ext.get("Js.Center.Purview.Right.RightPanel")==null){var _pageSize=12;Js.Center.Purview.Right.righttypestore=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:Js.Center.Purview.RightURL,method:"POST"}),reader:new Ext.data.JsonReader({fields:['numrightid','vc2rightname'],root:'data',id:'numrightid'}),baseParams:{flag:'selectall',columnlist:'numrightid,vc2rightname'}});Js.Center.Purview.Right.ParentRightStore=new Ext.data.Store({proxy:new Ext.data.HttpProxy({url:Js.Center.Purview.RightURL,method:"POST"}),reader:new Ext.data.JsonReader({fields:['numrightid','vc2rightname'],root:'data',id:'numrightid'}),baseParams:{flag:'selectparentlist',columnlist:'numrightid,vc2rightname'}});Js.Center.Purview.Right.ParentRightStore.load();Js.Center.Purview.Right.Infostore=new WXTL.Widgets.CommonData.GroupingStore({proxy:new Ext.data.HttpProxy({url:Js.Center.Purview.RightURL,method:"POST"}),reader:new Ext.data.JsonReader({fields:["numrightid","vc2rightname","vc2rolecode","vc2enabledflag","vc2rightdesc","vc2codegroupurl","vc2codegroupmodule","numparentid","vc2parentname","numorder","vc2type"],root:"data",id:"numrightid",totalProperty:"totalCount"}),sortInfo:{field:'numorder',direction:'DESC'},baseParams:{rightname:'',flag:'selectbykey'}});Js.Center.Purview.Right.Infostore.load({params:{start:0,limit:_pageSize,rightname:'',flag:'selectbykey'}});var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:"numrightid"});var cm=new Ext.grid.ColumnModel([sm,{header:"上级目录",tooltip:"上级目录",dataIndex:"numparentid",sortable:true,renderer:function(value,meta,record,rowIndex,colIndex,store){if(value=='-1'){return"根目录"}else{if(Js.Center.Purview.Right.ParentRightStore.getById(value)==null){return"<b>-=请选择=-</b>"}else{return Js.Center.Purview.Right.ParentRightStore.getById(value).data.vc2rightname}}},editor:new WXTL.Widgets.CommonForm.ComboWithTree({name:'numparentid',hiddenName:'numparentid',fieldLabel:"上级目录",anchor:'90%',valueField:'id',listWidth:'200',listHeight:'150',baseParams:{parentid:'-1',method:'POST'},dataUrl:'URL/tree.ashx'})},{header:"权限名称",tooltip:"权限名称",dataIndex:"vc2rightname",sortable:true},{header:"权限ID",tooltip:"权限ID",dataIndex:"numrightid",sortable:true},{header:"权限描述",tooltip:"权限描述",dataIndex:"vc2rightdesc",sortable:true},{header:"访问路径",tooltip:"访问路径",dataIndex:"vc2codegroupurl",sortable:true},{header:"模块编号",tooltip:"模块编号",dataIndex:"vc2codegroupmodule",sortable:true},{header:"权限类型",tooltip:"权限类型",dataIndex:"vc2type",sortable:true,renderer:function(value){if(value==1){return"功能"}else{return"目录"}}},{header:"排序号",tooltip:"排序号",dataIndex:"numorder",sortable:true}]);var rightGrid=new WXTL.Widgets.CommonGrid.GridPanel({id:"rightGridPanel",anchor:'100% 100%',pageSize:_pageSize,store:Js.Center.Purview.Right.Infostore,needRightMenu:false,afterEditURL:Js.Center.Purview.RightUpdateURL,inertMethod:'Js.Center.Purview.RightAdd',updateMethod:'Js.Center.Purview.RightUpdate',deleteMethod:'Js.Center.Purview.RightDelete.func',sm:sm,cm:cm,listeners:{"afteredit":function(e){this.afterEdit(e)}}});var selectPanel=new WXTL.Widgets.CommonPanel.QueryFormPanel({id:"rightSelectPanel",labelWidth:100,queryMethod:"Js.Center.Purview.Right.queryGrid",items:[{layout:'form',defaults:{anchor:'40%',msgTarget:"side"},items:[new Ext.form.TextField({fieldLabel:'功能权限名称',name:'rightname',id:'rightname'})]}]});Js.Center.Purview.Right.queryGrid=function(){var _rightname=Ext.get("rightname").getValue();var flag='selectbykey';Js.Center.Purview.Right.Infostore.baseParams={rightname:_rightname,flag:flag};Js.Center.Purview.Right.Infostore.load({params:{start:0,limit:_pageSize,rightname:_rightname,flag:flag}})};Js.Center.Purview.Right.RightPanel=new Ext.Panel({frame:true,id:"Js.Center.Purview.Right.RightPanel",bodyBorder:false,border:false,autoScroll:true,layout:"anchor",defaults:{collapsible:true},items:[selectPanel,rightGrid]})}GridMain(node,Js.Center.Purview.Right.RightPanel,"openroomiconinfo","Js.Center.Purview.Right.Infostore")};Ext.namespace('Js.Center.Purview.RightAdd');Ext.QuickTips.init();Js.Center.Purview.RightAdd.func=function(){checkLogin();Js.Center.Purview.Right.ParentRightStore.reload();var rightComboxTree=new WXTL.Widgets.CommonForm.ComboWithTree({name:'numparentid',hiddenName:'numparentid',fieldLabel:"上级目录",anchor:'90%',valueField:'id',listWidth:'200',listHeight:'150',baseParams:{parentid:'-1',method:'POST'},dataUrl:'URL/tree.ashx'});var addRightInfoFormPanel=new Ext.form.FormPanel({labelAlign:'left',buttonAlign:'right',frame:true,labelWidth:65,monitorValid:true,items:[{items:[{xtype:"hidden",name:"flag",value:"insert"}]},{layout:'column',border:false,labelSeparator:':',defaults:{layout:'form',border:false,columnWidth:.5,msgTarget:"side",anchor:'90%'},items:[{items:[{xtype:"textfield",name:"vc2rightname",fieldLabel:"<font color=red>权限名称</font>",anchor:'90%',allowBlank:false,blankText:"权限名称不允许为空",regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,msgTarget:"side",maxLength:50}]},{items:[{xtype:"textfield",name:"numorder",fieldLabel:"<font color=red>排序号</font>",allowBlank:false,blankText:"排序号不允许为空",anchor:'90%',regex:WXTL.Common.regex.Number,regexText:"请输入小于四位的数字",msgTarget:"side",maxLength:4}]},{items:[{xtype:"textfield",name:"vc2codegroupurl",fieldLabel:"<font color=red>访问路径</font>",allowBlank:false,blankText:"访问路径不允许为空",anchor:'90%',msgTarget:"side",maxLength:200}]},{items:[{xtype:"textfield",name:"vc2codegroupmodule",fieldLabel:"<font color=red>模块编号</font>",allowBlank:false,blankText:"模块编号不允许为空",anchor:'90%',msgTarget:"side",maxLength:50}]},{items:[{xtype:"combo",name:"vc2type1",hiddenName:"vc2type",fieldLabel:"<font color=red>权限类型</font>",store:new Ext.data.SimpleStore({data:[["功能","1"],["目录","0"]],fields:["state","value"]}),displayField:"state",mode:"local",valueField:"value",readOnly:true,forceSelection:true,typeAhead:true,value:'1',triggerAction:'all',anchor:'90%',msgTarget:"side",columnWidth:1.05}]},{items:[{xtype:"textfield",name:"vc2rightdesc",fieldLabel:"权限描述",anchor:'90%',regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,msgTarget:"side",maxLength:100}]},{items:[{xtype:"xComboBox",name:"numparentid1",hiddenName:"numparentid",fieldLabel:"上级目录",store:Js.Center.Purview.Right.ParentRightStore,displayField:"vc2rightname",mode:"local",valueField:"numrightid",emptyText:'-=请选择=-',forceSelection:true,typeAhead:true,value:'-1',triggerAction:'all',msgTarget:"side",anchor:'90%'}]}]}]});var mainForm=addRightInfoFormPanel.getForm();this.window=new WXTL.Widgets.CommonWindows.Window({title:"添加功能权限",mainForm:mainForm,updateURL:Js.Center.Purview.RightUpdateURL,displayStore:Js.Center.Purview.Right.Infostore,needLoadDataStore:true,items:[addRightInfoFormPanel],loadDataStoreFunc:function(){Js.Center.Purview.Right.ParentRightStore.reload()}});};Ext.namespace('Js.Center.Purview.RightDelete');Js.Center.Purview.RightDelete.func=function(row){checkLogin();var deleteSplit="";for(var i=0;i<row.length;i++){if(row.length==1){deleteSplit=row[i].data.numrightid}else{if(i<(row.length-1)){deleteSplit=row[i].data.numrightid+","+deleteSplit}if(i==(row.length-1)){deleteSplit=deleteSplit+row[i].data.numrightid}}};var params={ids:deleteSplit,flag:"delete"};doAjax(Js.Center.Purview.RightUpdateURL,params,Js.Center.Purview.Right.Infostore)};Ext.namespace('Js.Center.Purview.RightUpdate');Js.Center.Purview.RightUpdate.func=function(row){checkLogin();var rightComboxTree=new WXTL.Widgets.CommonForm.ComboWithTree({name:'numparentid',hiddenName:'numparentid',fieldLabel:"上级目录",anchor:'90%',valueField:'id',listWidth:'200',listHeight:'150',baseParams:{parentid:'-1',method:'POST'},dataUrl:'URL/tree.ashx'});Js.Center.Purview.Right.ParentRightStore.reload();var updateRightFormPanel=new Ext.form.FormPanel({labelAlign:'left',buttonAlign:'right',frame:true,labelWidth:65,monitorValid:true,items:[{items:[{xtype:"hidden",name:"flag",value:'updateall'},{xtype:"hidden",name:"numrightid",fieldLabel:"编号"}]},{layout:'column',border:false,labelSeparator:':',defaults:{layout:'form',border:false,columnWidth:.5,msgTarget:"side"},items:[{items:[{xtype:"textfield",name:"vc2rightname",fieldLabel:"<font color=red>权限名称</font>",anchor:'90%',allowBlank:false,blankText:"权限名称不允许为空",regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,msgTarget:"side",maxLength:50}]},{items:[{xtype:"textfield",name:"numorder",fieldLabel:"<font color=red>排序号</font>",allowBlank:false,blankText:"排序号不允许为空",anchor:'90%',regex:WXTL.Common.regex.Number,regexText:"请输入小于四位的数字",msgTarget:"side",maxLength:4}]},{items:[{xtype:"textfield",name:"vc2codegroupurl",fieldLabel:"<font color=red>访问路径</font>",allowBlank:false,blankText:"访问路径不允许为空",msgTarget:"side",anchor:'90%',maxLength:200}]},{items:[{xtype:"textfield",name:"vc2codegroupmodule",fieldLabel:"<font color=red>模块编号</font>",allowBlank:false,blankText:"模块编号不允许为空",anchor:'90%',msgTarget:"side",maxLength:50}]},{items:[{xtype:"combo",name:"vc2type1",hiddenName:"vc2type",fieldLabel:"<font color=red>权限类型</font>",store:new Ext.data.SimpleStore({data:[["功能","1"],["目录","0"]],fields:["state","value"]}),displayField:"state",mode:"local",valueField:"value",readOnly:true,forceSelection:true,typeAhead:true,value:'1',triggerAction:'all',anchor:'90%',msgTarget:"side",columnWidth:1.05}]},{items:[{xtype:"textfield",name:"vc2rightdesc",fieldLabel:"权限描述",anchor:'90%',regex:WXTL.Common.regex.Illegal,regexText:WXTL.Common.regexText.IllegalText,msgTarget:"side",maxLength:100}]},{items:[{xtype:"xComboBox",name:"numparentid1",hiddenName:"numparentid",fieldLabel:"上级目录",store:Js.Center.Purview.Right.ParentRightStore,displayField:"vc2rightname",mode:"local",valueField:"numrightid",emptyText:'-=请选择=-',forceSelection:true,typeAhead:true,triggerAction:'all',msgTarget:"side",anchor:'90%'}]}]}]});var mainForm=updateRightFormPanel.getForm();this.window=new WXTL.Widgets.CommonWindows.Window({title:"修改功能权限",mainForm:mainForm,updateURL:Js.Center.Purview.RightUpdateURL,displayStore:Js.Center.Purview.Right.Infostore,updateState:true,updateRecord:row,needLoadDataStore:true,items:[updateRightFormPanel],loadDataStoreFunc:function(){Js.Center.Purview.Right.ParentRightStore.reload()}});};Ext.namespace('Js.Center.Purview');Js.Center.Purview.RightURL='URL/Temp_Purview/Right/RightQuery.ashx';Js.Center.Purview.RightUpdateURL='URL/Temp_Purview/Right/RightUpdate.ashx';