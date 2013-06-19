Ext.namespace('Js.Center.Business.ECPrepaidLog');Js.Center.Business.ECPrepaidLog.func=function(row){if(Ext.get("Js.Center.Business.ECPrepaidLog.window")==null){var _pageSize=12;var fields=["numseqid","numecid","numtype","numsendmax","vc2remark","numprepaidcount","numlastsend","vc2ecid","vc2ecname","datcreattime","vc2username"];Js.Center.Business.ECPrepaidLog.Infostore=new WXTL.Widgets.CommonData.GroupingStore({proxy:new Ext.data.HttpProxy({url:Js.Center.Business.ECPrePaid.ECPrePaidURL,method:"POST"}),reader:new Ext.data.JsonReader({fields:fields,root:"data",id:"numseqid",totalProperty:"totalCount"}),baseParams:{numecid:row.get("numecid"),numover:'',startdate:'',enddate:'',operateusername:'',flag:'selectdetails'},sortInfo:{field:'numseqid',direction:'DESC'}});Js.Center.Business.ECPrepaidLog.Infostore.load({params:{start:0,limit:_pageSize,numecid:row.get("numecid"),numover:'',flag:'selectdetails'}});var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:"numseqid"});var cm=new Ext.grid.ColumnModel([{header:"EC名称",tooltip:"EC名称",dataIndex:"numecid",sortable:true},{header:"短彩类型",tooltip:"短彩类型（1：短信；2彩信）",dataIndex:"numtype",sortable:true,renderer:function(value,meta,record,rowIndex,colIndex,store){if(value=="1"){return"短信"}else if(value=="2"){return"彩信"}}},{header:"充值数量",tooltip:"充值数量",dataIndex:"numprepaidcount",sortable:true},{header:"上次充值发送量",tooltip:"上次充值发送量",dataIndex:"numlastsend",sortable:true},{header:"充值原因",tooltip:"充值原因",dataIndex:"vc2remark",sortable:true},{header:"充值时间",tooltip:"充值时间",dataIndex:"datcreattime",sortable:true},{header:"操作人",tooltip:"操作人",dataIndex:"vc2username",sortable:true}]);var ECPrePaidGrid=new WXTL.Widgets.CommonGrid.GridPanel({anchor:'100% 100%',pageSize:_pageSize,store:Js.Center.Business.ECPrepaidLog.Infostore,sm:sm,cm:cm,needRightMenu:false,afterEditURL:Js.Center.Business.ECPrepaidLog.ECPrePaidURL,needMenu:false});var beforedate=new Ext.form.DateField({fieldLabel:'开始时间',name:'datstart',readOnly:true,id:'Js.Center.Business.ECPrepaidLog.DatStart',format:'Y-m-d',validateOnBlur:false,showToday:true,clearDate:true,validator:function(){var strat_time=Ext.get("Js.Center.Business.ECPrepaidLog.DatStart").dom.value;var end_time=Ext.get("Js.Center.Business.ECPrepaidLog.DatEnd").dom.value;if(strat_time<=end_time){return true}else{return false}},invalidText:'结束时间不能小于开始时间！'});var operateusername=new Ext.form.TextField({fieldLabel:'操作人',id:'Js.Center.Business.ECPrepaidLog.operateusername',name:operateusername});var ECSelectPanel=new WXTL.Widgets.CommonPanel.QueryFormPanel({height:130,queryMethod:"Js.Center.Business.ECPrepaidLog.queryMainGrid",items:[{layout:'column',items:[{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:10px 0 10px 15px",items:[beforedate,operateusername]},{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:10px 0 10px 15px",items:[new Ext.form.DateField({fieldLabel:'结束时间',name:'datend',readOnly:true,id:'Js.Center.Business.ECPrepaidLog.DatEnd',format:'Y-m-d',validateOnBlur:true,showToday:true,clearDate:true,validator:function(){var strat_time=Ext.get("Js.Center.Business.ECPrepaidLog.DatStart").dom.value;var end_time=Ext.get("Js.Center.Business.ECPrepaidLog.DatEnd").dom.value;if(strat_time<=end_time){return true}else{return false}},invalidText:'结束时间不能小于开始时间！'})]}]}]});Js.Center.Business.ECPrepaidLog.queryMainGrid=function(){var datStart=Ext.get("Js.Center.Business.ECPrepaidLog.DatStart").getValue();var datEnd=Ext.get("Js.Center.Business.ECPrepaidLog.DatEnd").getValue();var operateusername=Ext.get("Js.Center.Business.ECPrepaidLog.operateusername").getValue();var numecid=row.get("numecid");var flag='selectdetails';Js.Center.Business.ECPrepaidLog.Infostore.baseParams={numecid:numecid,numover:'',startdate:datStart,enddate:datEnd,operateusername:operateusername,flag:flag};Js.Center.Business.ECPrepaidLog.Infostore.load({params:{start:0,limit:_pageSize,numecid:row.get("numecid"),numover:'',flag:flag}})};this.window=new WXTL.Widgets.CommonWindows.Window({title:"EC充值详情",id:'Js.Center.Business.ECPrepaidLog.window',updateState:false,updateRecord:row,updateURL:Js.Center.Business.ECPrepaidLog.ECPrePaidURL,displayStore:Js.Center.Business.ECPrepaidLog.Infostore,items:[ECSelectPanel,ECPrePaidGrid],needButtons:false,needLoadDataStore:true,closable:false,buttons:[{text:"关  闭",minWidth:70,handler:function(){Js.Center.Business.ECPrepaidLog.window.close()}}],loadDataStoreFunc:function(){Js.Center.Business.ECPrepaidLog.Infostore.load({params:{start:0,limit:_pageSize,numecid:row.get("numecid"),numover:'',flag:'selectdetails'}})}})}};Ext.namespace('Js.Center.Business.ECPrepaid.ECPrePaidAdd');Js.Center.Business.ECPrepaid.ECPrePaidAdd.func=function(){var AddtlecprepaidInfofp=new Ext.form.FormPanel({frame:true,labelWidth:80,defaults:{anchor:'90%',msgTarget:'side'},bodyBorder:false,border:false,autoScroll:true,items:[{xtype:"hidden",name:"flag",value:"insert"},{xtype:"xComboBox",name:"numecid",fieldLabel:"<font color=red>EC编号</font>",hiddenName:"numecid",allowBlank:false,blankText:"EC编号不允许为空",mode:"local",displayField:"vc2ecname",valueField:"numecid",triggerAction:"all",emptyText:"-=请选择=-",store:Js.Center.Common.EcListStore},{xtype:"combo",name:"numtype",hiddenName:"numtype",fieldLabel:"<font color=red>短彩类型</font>",readOnly:true,mode:"local",allowBlank:false,blankText:"短彩类型（1：短信；2彩信）不允许为空",displayField:"show",valueField:"value",triggerAction:"all",emptyText:"-=请选择=-",store:new Ext.data.SimpleStore({fields:["show","value"],data:[["短信","1"],["彩信","2"]]})},{xtype:"numberfield",name:"numsendmax",fieldLabel:"<font color=red>允许发送的最大条数</font>",minValue:0,minText:"最小值不能小于0",maxLength:20,maxLengthText:"长度不能超过20",allowBlank:false,blankText:"允许发送的最大条数不允许为空"}]});var mainForm=AddtlecprepaidInfofp.getForm();this.window=new WXTL.Widgets.CommonWindows.Window({title:"添加EC预付费",mainForm:mainForm,updateURL:Js.Center.Business.ECPrePaid.ECPrePaidURL,displayStore:Js.Center.Business.ECPrepaid.Infostore,items:[AddtlecprepaidInfofp]})};Ext.namespace('Js.Center.Business.ECPrepaid');Js.Center.Business.ECPrepaid.info=function(node){Js.Center.Common.EcListStore.reload();if(Ext.get("Js.Center.Business.ECPrepaid.ECMainPanel")==null){var _pageSize=12;var fields=["numseqid","numecid","numtype","numsendmax","numsent","numsurplus","numover","vc2ecid","vc2ecname","datupdatetime","lastweeksent","numcount"];Js.Center.Business.ECPrepaid.Infostore=new WXTL.Widgets.CommonData.GroupingStore({proxy:new Ext.data.HttpProxy({url:Js.Center.Business.ECPrePaid.ECPrePaidURL,method:"POST"}),reader:new Ext.data.JsonReader({fields:fields,root:"data",id:"numseqid",totalProperty:"totalCount"}),baseParams:{numecid:'',numover:'',flag:'selectbykey'},sortInfo:{field:'numseqid',direction:'DESC'}});Js.Center.Business.ECPrepaid.Infostore.load({params:{start:0,limit:_pageSize,numecid:'',numover:'',flag:'selectbykey'}});var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:"numseqid"});var cm=new Ext.grid.ColumnModel([{header:"EC编号",tooltip:"EC编号",dataIndex:"vc2ecid",sortable:true},{header:"EC名称",tooltip:"EC名称",dataIndex:"vc2ecname",sortable:true},{header:"短彩类型",tooltip:"短彩类型（1：短信；2彩信）",dataIndex:"numtype",sortable:true,renderer:function(value,meta,record,rowIndex,colIndex,store){if(value=="1"){return"短信"}else if(value=="2"){return"彩信"}}},{header:"允许发送的最大条数",tooltip:"允许发送的最大条数",dataIndex:"numsendmax",sortable:true},{header:"当前已经发送条数",tooltip:"当前已经发送条数",hidden:true,dataIndex:"numsent",sortable:true},{header:"剩余发送量",tooltip:"剩余发送量",dataIndex:"numcount",sortable:true,renderer:function(value,meta,record,rowIndex,colIndex,store){return record.get("numsendmax")-value}},{header:"上周发送量",tooltip:"上周发送量",dataIndex:"lastweeksent",sortable:true},{header:"是否超量",tooltip:"是否超量,0是没超；1是超量 ",dataIndex:"numover",sortable:true,renderer:function(value,meta,record,rowIndex,colIndex,store){if(value=="0"){return"未超"}else if(value=="1"){return"超量"}}},{header:"采集时间",tooltip:"采集时间",dataIndex:"datupdatetime",sortable:true},{header:"操作",tooltip:"操作 ",sortable:true,renderer:function(value,meta,record,rowIndex,colIndex,store,row){var userData=Js.Center.Common.userData;var operate="";if(userData.data[0].numtype==-1||userData.data[0].numtype==4){operate="<a href='#' onclick='Js.Center.Business.ECPrepaid.info.showPrepaidWin()'>充值</a> &nbsp;"}operate+="<a href='#' onclick='Js.Center.Business.ECPrepaid.info.showPrepaidDetails()'>详情</a>";return operate}}]);var ECSelectPanel=new WXTL.Widgets.CommonPanel.QueryFormPanel({height:130,queryMethod:"Js.Center.Business.ECPrepaid.queryMainGrid",items:[{layout:'column',items:[{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:10px 0 10px 15px",items:[{xtype:"xComboBox",name:"numecid",fieldLabel:"EC编号",hiddenName:"Js.Center.Business.ECPrepaid.vc2ecid",mode:"local",displayField:"vc2ecname",valueField:"numecid",triggerAction:"all",emptyText:"-=请选择=-",store:Js.Center.Common.EcListStore}]},{columnWidth:.5,layout:'form',defaultType:"textfield",defaults:{anchor:"90%",msgTarget:"side"},buttonAlign:"center",bodyStyle:"padding:10px 0 10px 15px",items:[{xtype:"combo",name:"NUMOVER",hiddenName:"Js.Center.Business.ECPrepaid.NUMOVER",fieldLabel:"是否超量",readOnly:true,mode:"local",displayField:"show",valueField:"value",triggerAction:"all",emptyText:"-=请选择=-",store:new Ext.data.SimpleStore({fields:["show","value"],data:[["-=请选择=-",""],["是","1"],["否","0"]]})}]}]}]});Js.Center.Business.ECPrepaid.queryMainGrid=function(){if(ECSelectPanel.getForm().isValid()){var vc2ecid=Ext.get("Js.Center.Business.ECPrepaid.vc2ecid").getValue();var numover=Ext.get("Js.Center.Business.ECPrepaid.NUMOVER").getValue();var flag='selectbykey';Js.Center.Business.ECPrepaid.Infostore.baseParams={numecid:vc2ecid,numover:numover,flag:flag};Js.Center.Business.ECPrepaid.Infostore.load({params:{start:0,limit:_pageSize}})}};var ECPrePaidGrid=new WXTL.Widgets.CommonGrid.GridPanel({anchor:'100% 100%',pageSize:_pageSize,store:Js.Center.Business.ECPrepaid.Infostore,sm:sm,cm:cm,needRightMenu:false,afterEditURL:Js.Center.Business.ECPrePaid.ECPrePaidURL,inertMethod:'Js.Center.Business.ECPrepaid.ECPrePaidAdd',needMenu:false,tbar:new Ext.Toolbar({renderer:function(){var userData=Js.Center.Common.userData;if(userData.data[0].numtype!=-1){this.set('hidden',true)}},items:[{iconCls:'addicon',text:"添加",handler:function(){var userData=Js.Center.Common.userData;if(userData.data[0].numtype==-1||(userData.data[0].numtype==1&&userData.data[0].numdepartid==1)||(userData.data[0].numtype==4&&userData.data[0].numdepartid==1)){ECPrePaidGrid.doInsert()}else{Ext.Msg.alert('提 示',"只有总部管理及数据管理员可进行添加操作");return}}}]})});Js.Center.Business.ECPrepaid.ECMainPanel=new Ext.Panel({frame:true,id:"Js.Center.Business.ECPrepaid.ECMainPanel",bodyBorder:false,border:false,autoScroll:true,layout:"anchor",defaults:{collapsible:true},items:[ECSelectPanel,ECPrePaidGrid]})};Js.Center.Business.ECPrepaid.info.showPrepaidDetails=function(){var row=ECPrePaidGrid.getSelectionModel().getSelections();Js.Center.Business.ECPrepaidLog.func(row[0]);Js.Center.Business.ECPrepaidLog.window.show()};Js.Center.Business.ECPrepaid.info.showPrepaidWin=function(){var row=ECPrePaidGrid.getSelectionModel().getSelections();Js.Center.Business.ECPrepaid.ECPrePaidRecharge.func(row[0]);Js.Center.Business.ECPrepaid.ECPrePaidRecharge.window.show()};GridMain(node,Js.Center.Business.ECPrepaid.ECMainPanel,"openroomiconinfo","Js.Center.Business.ECPrepaid.Infostore")};Ext.namespace('Js.Center.Business.ECPrepaid.ECPrePaidRecharge');Js.Center.Business.ECPrepaid.ECPrePaidRecharge.func=function(row){var RechargetlecprepaidInfofp=new Ext.form.FormPanel({frame:true,labelWidth:80,defaults:{anchor:'95%',msgTarget:'side'},bodyBorder:false,border:false,autoScroll:true,items:[{xtype:"hidden",name:"flag",value:"rechange"},{xtype:"hidden",name:"numsent"},{xtype:"hidden",name:"numseqid"},{xtype:"hidden",name:"numecid"},{xtype:"hidden",name:"numcount"},{xtype:"textfield",name:"vc2ecname",fieldLabel:"EC名称",readOnly:true,allowBlank:false,blankText:"EC名称不允许为空"},{xtype:"combo",name:"numtype",hiddenName:"numtype",fieldLabel:"<font color=red>短彩类型</font>",readOnly:true,mode:"local",allowBlank:false,blankText:"短彩类型（1：短信；2彩信）不允许为空",displayField:"show",valueField:"value",triggerAction:"all",emptyText:"-=请选择=-",store:new Ext.data.SimpleStore({fields:["show","value"],data:[["短信","1"],["彩信","2"]]})},{xtype:"numberfield",name:"numrechange",fieldLabel:"<font color=red>充入条数</font>",minValue:0,minText:"最小值不能小于0",maxLength:20,maxLengthText:"长度不能超过20",allowBlank:false,blankText:"充值数不允许为空"},{xtype:'textarea',name:'vc2remark',fieldLabel:'<font color=red>充值备注</font>',allowBlank:false,blankText:"备注不能为空",maxLength:200,maxLengthText:"请输入小于200字"}]});var mainForm=RechargetlecprepaidInfofp.getForm();this.window=new WXTL.Widgets.CommonWindows.Window({title:"EC预付费充值",mainForm:mainForm,updateState:true,updateRecord:row,updateURL:Js.Center.Business.ECPrePaid.ECPrePaidURL,displayStore:Js.Center.Business.ECPrepaid.Infostore,items:[RechargetlecprepaidInfofp]})};Ext.namespace('Js.Center.Business.ECPrepaid.ECPrePaidUpdate');Js.Center.Business.ECPrepaid.ECPrePaidUpdate.func=function(row){var UpdatetlecprepaidInfofp=new Ext.form.FormPanel({frame:true,labelWidth:80,defaults:{anchor:'95%',msgTarget:'side'},bodyBorder:false,border:false,autoScroll:true,items:[{xtype:"hidden",name:"flag",value:"update"},{xtype:"hidden",name:"numseqid"},{xtype:"hidden",name:"numecid"},{xtype:"textfield",name:"vc2ecname",fieldLabel:"EC名称",readOnly:true,allowBlank:false,blankText:"EC名称不允许为空"},{xtype:"combo",name:"numtype",hiddenName:"numtype",fieldLabel:"<font color=red>短彩类型</font>",readOnly:true,mode:"local",allowBlank:false,blankText:"短彩类型（1：短信；2彩信）不允许为空",displayField:"show",valueField:"value",triggerAction:"all",emptyText:"-=请选择=-",store:new Ext.data.SimpleStore({fields:["show","value"],data:[["短信","1"],["彩信","2"]]})},{xtype:"numberfield",name:"numsendmax",fieldLabel:"<font color=red>允许发送的最大条数</font>",minValue:0,minText:"最小值不能小于0",maxLength:20,maxLengthText:"长度不能超过20",allowBlank:false,blankText:"允许发送的最大条数不允许为空"}]});var mainForm=UpdatetlecprepaidInfofp.getForm();this.window=new WXTL.Widgets.CommonWindows.Window({title:"修改EC预付费",mainForm:mainForm,updateState:true,updateRecord:row,updateURL:Js.Center.Business.ECPrePaid.ECPrePaidURL,displayStore:Js.Center.Business.ECPrepaid.Infostore,items:[UpdatetlecprepaidInfofp]})};Ext.namespace('Js.Center.Business.ECPrePaid');Js.Center.Business.ECPrePaid.ECPrePaidURL='URL/Business/ECmanage/EcPrePaid.ashx';