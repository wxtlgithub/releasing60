Ext.namespace('Js.Center.Business');


//========================新路由策略接口=======Start==============================


/****************************************************************************
*1、添加基本策略
*
* url：   URL/system/routestra.ashx
* input：
*   flag(addrotestarbase)
* method：POST

*    numprodid              //通道组id
    
*    numtypeid             //策略类别id
			
*    ids                   //通道ids  
    
*output：{success:'true'} or {success:'false'}

*****************************************************************************/

/****************************************************************************
*2、主备策略列表
*
* url：   URL/system/routestra.ashx
* input：
*   flag(selectbyrotestraas)
*   
*    numprodid             //通道组id
* output：POST

*	 numstraid			   //策略id

*    numprodid             //通道组id
    
*    vc2name              	//通道组名称
			
*    numsvcid             	//主通道id  

*    vc2svcname				//主通道名称
  
*    numassvcid             //备通道id  

*    vc2assvcname			//备通道名称
    

*****************************************************************************/



/****************************************************************************
*3、添加主备策略
*
* url：   URL/system/routestra.ashx
* input：
*   flag(addrotestaras)
* method：POST

*    numprodid              //通道组id
    
*    numtypeid             //策略类别id
  
*    numsvcid              //主通道id
			
*    numassvcid            //备通道id  
    
*output：{success:'true'} or {success:'false'}

*****************************************************************************/



/****************************************************************************
*4、修改主备策略
*
* url：   URL/system/routestra.ashx
* input：
*   flag(updaterotestaras)
* method：POST

*    numprodid              //通道组id
    
*    numtypeid             //策略类别id
   
*    numstraid			   //策略编号
  
*    numsvcid              //主通道id
			
*    numassvcid            //备通道id  
    
*output：{success:'true'} or {success:'false'}

*****************************************************************************/


/****************************************************************************
*5、删除主备策略(支持批量删除，逗号分隔)
*
* url：   URL/system/routestra.ashx
* input：
*   flag(deleterotestaras),

* method：POST

*    numprodid              //通道组id
    
*    numtypeid             //策略类别id
      
*    ids			   		//策略编号
  
    
*output：{success:'true'} or {success:'false'}

*****************************************************************************/




/****************************************************************************
*6、均衡策略列表
*
* url：   URL/system/routestra.ashx
* input：
*   flag(selectbyrotestrabalance)
*    numprodid             //通道组id  
* output：POST

*	 numstraid			   //策略id

*    numprodid             //通道组id
    
*    vc2name              	//通道组名称
			
*    numsvcids             	//通道集合ids (逗号分割)
*    
*    vc2svcnames            //通道集合names (逗号分割)

    
*****************************************************************************/




/****************************************************************************
*7、添加均衡策略
*
* url：   URL/system/routestra.ashx
* input：
*   flag(addrotestarbalance)
* method：POST

*    numprodid              //通道组id
    
*    numtypeid             //策略类别id
  
*    numsvcids              //通道ids (逗号分割)
			
*output：{success:'true'} or {success:'false'}

*****************************************************************************/



/****************************************************************************
*8、修改均衡策略
*
* url：   URL/business/product/productupdate.ashx
* input：
*   flag(updaterotestarbalance)
* method：POST

*    numprodid              //通道组id
    
*    numtypeid             //策略类别id

*    numstraid			   //策略编号
  
*    numsvcids              //通道ids(逗号分割)
			
*output：{success:'true'} or {success:'false'}

*****************************************************************************/



/****************************************************************************
*9、删除均衡策略(支持批量删除，逗号分隔)
*
* url：   URL/system/routestra.ashx
* input：
*   flag(deleterotestarbalance),

* method：POST

*    numprodid              //通道组id

*    numtypeid             //策略类别id    
      
*    ids			   		//策略编号(逗号分割)
  
    
*output：{success:'true'} or {success:'false'}

*****************************************************************************/




/****************************************************************************
*10、添加均衡策略时需要的数据源
*
* url：   URL/system/routestra.ashx
* input：
*   flag(addrotestarbalancestore)
* output

*    numsvcid              //通道id
    
*    vc2svcname             //通道名称
  
*    ischecked              //ture、false 全为flase
			
*output：

* {"numsvcid":1288,"vc2svcname":"lzh1","ischecked":false},
* {"numsvcid":1289,"vc2svcname":"admin-1-twf","ischecked":false}

*****************************************************************************/


/****************************************************************************
*11、修改均衡策略时需要的数据源
*
* url：   URL/system/routestra.ashx
* input：
*   flag(updatgerotestarbalancestore)
   
*	 numstraid			   //策略id

*    numprodid              //通道组id
* output

*    numsvcid              //通道id
    
*    vc2svcname             //通道名称
  
*    ischecked              //ture、false
			
*output：

* {"numsvcid":1288,"vc2svcname":"lzh1","ischecked":false},
* {"numsvcid":1289,"vc2svcname":"admin-1-twf","ischecked":false}

*****************************************************************************/


Js.Center.Business.RoutestraURL = 'URL/system/routestra.ashx';

//========================新路由策略接口=======End==============================



/****************************************************************************
*1、获取信息URL(通过ID)
*url：   URL/business/product/productquerry.ashx
*input：*
*flag(selectbyid),
*id，*
*limit，*
*start
*method：POST
*output：一条*
*****************************************************************************/

/****************************************************************************
*2、获取信息URL(通过关键字)
*url：   URL/business/product/productquerry.ashx
*input：*
*flag(selectbykey),
*%productname%，（产品名称）*
*svcnameid,（所属业务）
*adduserid,（操作人）*
*limit，*
*start
*method：POST
*output：多条*
*****************************************************************************/

/*****************************************************************************3、获取未鉴权产品信息URL(全部)：用于产品下拉列表*
*url：  URL/business/product/productquerry.ashx
*input：*
*flag(selectall), 
*columnlist(numprodid,vc2name)
*method：POST
*output：多条*
*****************************************************************************/


/*****************************************************************************4、获取鉴权产品信息URL(后台获取用户权限)：用于产品下拉列表*
*url：  URL/business/product/productquerry.ashx
*input：*
*flag(selectallpermit), 
*columnlist(numprodid,vc2name)
*method：POST
*output：多条*
*****************************************************************************/

/*****************************************************************************5、根据部门数据角色ID获取已授权的产品信息URL：用于产品下拉列表*
*url：  URL/business/product/productquerry.ashx
*input：*
*flag(selectpermitbyroleid), 
*roleid,
*columnlist(numprodid,vc2name)
*method：POST
*output：多条*
*****************************************************************************/

/*****************************************************************************6、根据部门数据角色ID获取未授权的产品信息URL：用于产品下拉列表*
*url：  URL/business/product/productquerry.ashx
*input：*
*flag(selectnopermitbyroleid),
*roleid, 
*columnlist(numprodid,vc2name)
*method：POST
*output：多条*
*****************************************************************************/

/*****************************************************************************7、根据用户数据角色ID和部门ID获取已授权的产品信息URL：用于产品下拉列表*
*url：  URL/business/product/productquerry.ashx
*input：*
*flag(selectpermitbyuserroleid), 
*roleid, （用户数据角色ID）*
*departid，（部门ID）*
*columnlist(numprodid,vc2name)
*method：POST
*output：多条*
*****************************************************************************/

/*****************************************************************************8、根据用户数据角色ID和部门ID获取未授权的产品信息URL：用于产品下拉列表*
*url：  URL/business/product/productquerry.ashx
*input：*
*flag(selectnopermitbyuserroleid),
*roleid, （用户数据角色ID）*
*departid，（部门ID）*
*columnlist(numprodid,vc2name)
*method：POST
*output：多条*
*****************************************************************************/

/*****************************************************************************9、根据角色ID获取已授权的通道信息[用于显示隐藏位置的信息]*
*url：  URL/business/product/productquerry.ashx
*input：*
*flag(selectpermitbyroleids),
*roleids, （角色ID多个用，分割）*
*columnlist(numprodid,vc2name)
*method：POST
*output：多条*
*****************************************************************************/

/*****************************************************************************10、根据部门ID获取可用的通道组信息[基于部门，角色，通道组之间的授权关系，用于列表选择][2010-4-7新增]*
*url：  URL/business/product/productquerry.ashx
*input：*
*flag(selectpermitbydepartid),
*departid,部门ID*
*columnlist(numprodid,vc2name)
*method：POST
*output：多条*
*****************************************************************************/

/*****************************************************************************11、根据用户ID获取可用的通道组信息[基于用户，角色，通道组之间的授权关系，用于列表选择][2010-4-7新增]*
*url：  URL/business/product/productquerry.ashx
*input：*
*flag(selectpermitbyuserid),
*userid,用户ID*
*columnlist(numprodid,vc2name)
*method：POST
*output：多条*
*****************************************************************************/

/*****************************************************************************12、根据部门ID和角色ID获取可用的通道组信息[基于部门，角色，客户组之间的授权关系，用于列表选择][2010-4-9新增]*
*url：  URL/business/product/productquerry.ashx
*input：*
*flag(selectpermitbydepartidwithroleid),
*departid,部门ID*roleid,角色ID
*
*columnlist(numprodid,vc2name)
*method：POST
*output：多条*
*****************************************************************************/

Js.Center.Business.ProductURL = 'URL/system/product/products.ashx';

/****************************************************************************
*1、添加信息URL
*url：   URL/business/product/productupdate.ashx
*input：*
*    flag(insert),
*    vc2name,    (产品名称)
*    vc2dsc,     (产品描述)
*    
*    
*    
* //    numcaid,    (合作方编号)
* //    vc2prodid,  (产品编号)
* //    vc2validflag,(是否有效，Y=有效，N=无效)
* //    datstart,    (产品开始时间)
* //    datend,     (产品结束时间)
* //    numlevel,   (产品等级，1=初级，2=中级，3=高级)
* //    vc2type,    (产品类型，0=免费，1=点播，2=包月，3=封顶，4=定制按条，与SVC对应)
* //    numtprodid, (产品临时编号)
* //    numsrc,     (产品来源0=直接添加的产品，1=正常申请来的产品)
* //    numsrcid,   ()
* //    numstatflag,(是否统计标识，1=统计，0=不统计)
* //    numchnid,   (渠道ＩＤ)
* //    numcomflg,  (是否商用，1=商用，2=体验)
* //    numbwflg,   (黑白名单类型，1=黑名单，2=白名单)
* //    vc2servcode,(服务代码)
* //    numpriflag, (级别，0=群发级别，1=触发级别，2=点播级别，3=最高级别)
* //    vc2showname,(产品显示名称)
* //    numcpid,    (CP编号，内容提供方ID)
* //    vc2sendtype,(发送方式类型，0=群发，1=单发)
* //    numprange,  (产品范围，1=对内，2=对外，3=私人)
*    
*method：POST
*output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*2、单字段修改信息URL
*url：   URL/business/product/productupdate.ashx
*input：*
*flag(update),
*id，*
*field，*
*value
*method：POST
*output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*3、全字段修改信息URL
*url：   URL/business/product/productupdate.ashx
*input：*
*    flag(updateall)
*    id,
*    vc2name,    (产品名称)
*    vc2dsc,     (产品描述)
*   
*    
*    
*    
*    //numcaid,    (合作方编号)
*    //vc2prodid,  (产品编号)
*    //vc2validflag,(是否有效，Y=有效，N=无效)
*    //datstart,    (产品开始时间)
*    //datend,     (产品结束时间)
*    //numlevel,   (产品等级，1=初级，2=中级，3=高级)
*    //vc2type,    (产品类型，0=免费，1=点播，2=包月，3=封顶，4=定制按条，与SVC对应)
*    //numtprodid, (产品临时编号)
*    //numsrc,     (产品来源0=直接添加的产品，1=正常申请来的产品)
*    //numsrcid,   ()
*    //numstatflag,(是否统计标识，1=统计，0=不统计)
*    //numchnid,   (渠道ＩＤ)
*    //numcomflg,  (是否商用，1=商用，2=体验)
*    //numbwflg,   (黑白名单类型，1=黑名单，2=白名单)
*    //vc2servcode,(服务代码)
*    //numpriflag, (级别，0=群发级别，1=触发级别，2=点播级别，3=最高级别)
*    //vc2showname,(产品显示名称)
*    //numcpid,    (CP编号，内容提供方ID)
*    //vc2sendtype,(发送方式类型，0=群发，1=单发)
*    //numprange,  (产品范围，1=对内，2=对外，3=私人)
*    
*method：POST
*output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*4、为产品指定业务URL(逗号分隔)
*url：   URL/business/product/productupdate.ashx
*input：*
*flag(addsvc),
*numproid, (产品ID)
*ids	，	（指定业务ID）*
*method：POST
*output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*5、删除信息URL(支持批量删除，逗号分隔)
*url：   URL/business/product/productupdate.ashx
*input：*
*flag(delete),
*ids
*method：POST
*output：{success:'true'} or {success:'false'}
*****************************************************************************/


Js.Center.Business.ProductUpdateURL = 'URL/system/product/products.ashx';




  