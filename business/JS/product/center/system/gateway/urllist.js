Ext.namespace('Js.Center.Business');
/*
 需求：1、获取运营商列表，用于下拉框列表
 2、获取机构列表，用于下拉框列表
 */
Js.Center.Business.GetinstURL = 'URL/business/inst/instquery.ashx';

Js.Center.Business.GetOperatorURL = 'URL/business/operator/operatorquery.ashx';

/****************************************************************************
*获取信息URL(通过ID)
* url：   URL/business/gateway/gatewayquerry.ashx
* input：
* flag(selectbyid),
* id，
* limit，
* start
* 
* method：POST
* output：一条
******************************************************************************/

/****************************************************************************
*获取信息URL(通过关键字)
* url：   URL/business/gateway/gatewayquerry.ashx
* input：
* flag(selectbykey),
* %gatewayname%，
* numopid,(运营商编码)
* limit，
* start
* 
* method：POST
* output：多条*
*****************************************************************************/

/*****************************************************************************3、获取网关信息URL(全部)：用于网关下拉列表*
* url：   URL/business/gateway/gatewayquerry.ashx
* input：*
* flag(selectall),
* columnlist(numgwid,vc2gatewayname)
* method：POST
* output：多条*
*****************************************************************************/

/****************************************************************************
*获取网关协议类型URL(全部)：用于网关协议下拉列表
*
* url：   URL/business/gateway/gatewayquerry.ashx
* input：
*
* flag(queryallgatewaytype),
* columnlist(numgwtypeid,vc2gwtypename)
* method：POST
* output：多条
*
*****************************************************************************/

/****************************************************************************
*获取网关配置信息URL(根据网关ID)
*
* url：   URL/business/gateway/gatewayquerry.ashx
* input：
*
* flag(selectsetinfobygwid),
* numgwid,(网关ID)
* method：POST
* output：多条
*
*****************************************************************************/
Js.Center.Business.GatewayURL = 'URL/system/gateway/gatewayquery.ashx';


/****************************************************************************
*1、添加信息URL
* url：   URL/business/gateway/gatewayupdate.ashx
* 说明：有效标识vc2validflag后台默认为有效“Y”，前台不传值*
* input：*
* flag(insert),
*
* vc2gatewayname,		（网关名称）
* vc2type,    			（网关类型，1=短信，2=彩信，3=wap，4=短信pv，5=彩信pv，6=wappv）
* numopid,    			（运营商编码）
* vc2gwip,    			（网关地址ip）
* vc2gwport,  			（网关端口）
* vc2moip				(moip地址)
* vc2moport				（mo端口）
* vc2spid,    			（企业编码）
* vc2spnum,   			（服务号码）
* vc2gwusername,		（登录用户）
* vc2gwpassword,		（登录密码）
* numgroupmembermax		（批次手机号码数量）
* vc2speed				(流速控制)
* numgwtypeid			(协议类型ID，1:cmpp30,2:cmpp20,3:sgip,4:smgp,5:mm7,6:empp,7:cbip)
* numinstid,  			（机构编号,即网关地区）
* 
* method：POST
* output：{success:'true'} or {success:'false'}
******************************************************************************/

/****************************************************************************
*3、全字段修改信息URL
* url：   URL/business/gateway/gatewayupdate.ashx
* input：*
* flag(updateall)
* numgwid,           	（网关id）
* vc2gatewayname,		（网关名称）
* vc2type,    			（网关类型，1=短信，2=彩信，3=wap，4=短信pv，5=彩信pv，6=wappv）
* numopid,    			（运营商编码）
* vc2gwip,    			（网关地址ip）
* vc2gwport,  			（网关端口）
* vc2moip				(moip地址)
* vc2moport				（mo端口）
* vc2spid,    			（企业编码）
* vc2spnum,   			（服务号码）
* vc2gwusername,		（登录用户）
* vc2gwpassword,		（登录密码）
* numgroupmembermax		（批次手机号码数量）
* vc2speed				(流速控制)
* numgwtypeid			(协议类型，1:cmpp30,2:cmpp20,3:sgip,4:smgp,5:mm7,6:empp,7:cbip)
* numinstid,  			（机构编号,即网关地区）
* 
* method：POST
* output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*4、删除信息URL(支持批量删除，逗号分隔)
*url：   URL/business/gateway/gatewayupdate.ashx
* input：*
* flag(delete),
* ids
* method：POST
* output：{success:'true'} or {success:'false'}
******************************************************************************/

Js.Center.Business.GatewayUpdateURL = 'URL/system/gateway/gatewayupdate.ashx';

//===========网关配置====Start=================================
/****************************************************************************
*cmpp30网关配置信息URL
* url：   URL/business/gateway/gatewayupdate.ashx
* input：
*
* flag(updateset)
* numgwtypeid,		(协议类型ID，1:cmpp30,2:cmpp20,3:sgip,4:smgp,5:mm7,6:empp,7:cbip)
* vc2gwid,    		（网关编号）
* controlSize 			<!-- 滑动窗口大小   16-->
* countProcessor		<!-- 进程数1 
* sizeInBuffer			<!-- 协议入口缓冲区大小10240 -->
* sizeOutBuffer			<!-- 协议出口缓冲区大小 1024-->
* connectIdleTime		<!--协议连接无反馈重试时间，单位秒 10-->
* connectRepeatTime		<!--协议连接失败的重试时间，单位秒 20-->
* connectRepeatCount	<!--协议连接失败的重试次数 3-->
* messageRepeatTime		<!--信息发送失败的重试时间，单位秒 保留目前未启用 30-->
* messageRepeatCount	<!--信息发送失败的重试次数 保留目前未启用4 -->
* controlClearTime		<!--协议滑动窗口清理时间 50-->
* signType				<!-- 短信签名类型:1=>运营商网关签名; 2=>利信通网关签名; 3=>用户签名 2-->
* signMessage			<!-- 短信签名内容[无线天利]-->
* 
* socketSymbol						<!-- 0 下行 1上行一般情况下填写0，当连接为亚信网关时，需要两条链接，才用到1的情况    0-->
* smSplit_normalSplit_splitType		<!--splitType 短信拆分规则 0 不拆分 1普通短信拆分 -->
* smSplit_normalSplit_smLength		<!-- 普通短信长度 70-->
* smSplit_normalSplit_smSplitLength	<!-- 拆分短信长度 65-->
* smSplit_normalSplit_smSplitType	<!-- 拆分内容的形式如:(1/2)($m/$n) -->
* smSplit_normalSplit_splitCount	<!-- 拆分总数\$n -->
* smSplit_normalSplit_splitIndex	<!-- 拆分序号\$m -->
* <!--headType7 短信头类型是否为7个字节 false按66个拆 true按67个拆；smLastSplitCount 倒数第二条的内容做合理拆分的字数 -->
* smSplit_longSplit_splitType
* smSplit_longSplit_headType7
* smSplit_longSplit_smLastSplitCount
* 
* 
* method：POST
* output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*cmpp20网关配置信息URL
* url：   URL/business/gateway/gatewayupdate.ashx
* input：
*
* flag(updateset)
* numgwtypeid,		(协议类型ID，1:cmpp30,2:cmpp20,3:sgip,4:smgp,5:mm7,6:empp,7:cbip)
* vc2gwid,    		（网关编号）
* controlSize 			<!-- 滑动窗口大小   16-->
* countProcessor		<!-- 进程数1 
* sizeInBuffer			<!-- 协议入口缓冲区大小10240 -->
* sizeOutBuffer			<!-- 协议出口缓冲区大小 1024-->
* connectIdleTime		<!--协议连接无反馈重试时间，单位秒 10-->
* connectRepeatTime		<!--协议连接失败的重试时间，单位秒 20-->
* connectRepeatCount	<!--协议连接失败的重试次数 3-->
* messageRepeatTime		<!--信息发送失败的重试时间，单位秒 保留目前未启用 30-->
* messageRepeatCount	<!--信息发送失败的重试次数 保留目前未启用4 -->
* controlClearTime		<!--协议滑动窗口清理时间 50-->
* signType				<!-- 短信签名类型:1=>运营商网关签名; 2=>利信通网关签名; 3=>用户签名 2-->
* signMessage			<!-- 短信签名内容[无线天利]-->
* 
* msgSrc				<!-- 该字段正常时和spid内容一致，但如国信等部分通道要求使用自己的编号，请自行配置内容 100001-->
* socketSymbol			<!-- 0 下行 1上行一般情况下填写0，当连接为亚信网关时，需要两条链接，才用到1的情况    0-->
* smSplit_normalSplit_splitType		<!--splitType 短信拆分规则 0 不拆分 1普通短信拆分 -->
* smSplit_normalSplit_smLength		<!-- 普通短信长度 70-->
* smSplit_normalSplit_smSplitLength	<!-- 拆分短信长度 65-->
* smSplit_normalSplit_smSplitType	<!-- 拆分内容的形式如:(1/2)($m/$n) -->
* smSplit_normalSplit_splitCount	<!-- 拆分总数\$n -->
* smSplit_normalSplit_splitIndex	<!-- 拆分序号\$m -->
* <!--headType7 短信头类型是否为7个字节 false按66个拆 true按67个拆；smLastSplitCount 倒数第二条的内容做合理拆分的字数 -->
* smSplit_longSplit_splitType
* smSplit_longSplit_headType7
* smSplit_longSplit_smLastSplitCount
* 
* method：POST
* output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*sgip网关配置信息URL
* url：   URL/business/gateway/gatewayupdate.ashx
* input：
*
* flag(updateset)
* numgwtypeid,		(协议类型ID，1:cmpp30,2:cmpp20,3:sgip,4:smgp,5:mm7,6:empp,7:cbip)
* vc2gwid,    		（网关编号）
* controlSize 			<!-- 滑动窗口大小   16-->
* countProcessor		<!-- 进程数1 
* sizeInBuffer			<!-- 协议入口缓冲区大小10240 -->
* sizeOutBuffer			<!-- 协议出口缓冲区大小 1024-->
* connectIdleTime		<!--协议连接无反馈重试时间，单位秒 10-->
* connectRepeatTime		<!--协议连接失败的重试时间，单位秒 20-->
* connectRepeatCount	<!--协议连接失败的重试次数 3-->
* messageRepeatTime		<!--信息发送失败的重试时间，单位秒 保留目前未启用 30-->
* messageRepeatCount	<!--信息发送失败的重试次数 保留目前未启用4 -->
* controlClearTime		<!--协议滑动窗口清理时间 50-->
* signType				<!-- 短信签名类型:1=>运营商网关签名; 2=>利信通网关签名; 3=>用户签名 2-->
* signMessage			<!-- 短信签名内容[无线天利]-->
* 
* nodeID				<!-- 节点ID 30000-->
* chargeNumber			<!-- 付费号码 000000000000000000000-->			
* socketSymbol			<!-- 0 下行 1上行一般情况下填写0，当连接为亚信网关时，需要两条链接，才用到1的情况    0-->
* smSplit_normalSplit_splitType		<!--splitType 短信拆分规则 0 不拆分 1普通短信拆分 -->
* smSplit_normalSplit_smLength		<!-- 普通短信长度 70-->
* smSplit_normalSplit_smSplitLength	<!-- 拆分短信长度 65-->
* smSplit_normalSplit_smSplitType	<!-- 拆分内容的形式如:(1/2)($m/$n) -->
* smSplit_normalSplit_splitCount	<!-- 拆分总数\$n -->
* smSplit_normalSplit_splitIndex	<!-- 拆分序号\$m -->
* <!--headType7 短信头类型是否为7个字节 false按66个拆 true按67个拆；smLastSplitCount 倒数第二条的内容做合理拆分的字数 -->
* smSplit_longSplit_splitType
* smSplit_longSplit_headType7
* smSplit_longSplit_smLastSplitCount
* 
* method：POST
* output：{success:'true'} or {success:'false'}
*****************************************************************************/
/****************************************************************************
*smgp网关配置信息URL
* url：   URL/business/gateway/gatewayupdate.ashx
* input：
*
* flag(updateset)
* numgwtypeid,		(协议类型ID，1:cmpp30,2:cmpp20,3:sgip,4:smgp,5:mm7,6:empp,7:cbip)
* vc2gwid,    		（网关编号）
* controlSize 			<!-- 滑动窗口大小   16-->
* countProcessor		<!-- 进程数1 
* sizeInBuffer			<!-- 协议入口缓冲区大小10240 -->
* sizeOutBuffer			<!-- 协议出口缓冲区大小 1024-->
* connectIdleTime		<!--协议连接无反馈重试时间，单位秒 10-->
* connectRepeatTime		<!--协议连接失败的重试时间，单位秒 20-->
* connectRepeatCount	<!--协议连接失败的重试次数 3-->
* messageRepeatTime		<!--信息发送失败的重试时间，单位秒 保留目前未启用 30-->
* messageRepeatCount	<!--信息发送失败的重试次数 保留目前未启用4 -->
* controlClearTime		<!--协议滑动窗口清理时间 50-->
* signType				<!-- 短信签名类型:1=>运营商网关签名; 2=>利信通网关签名; 3=>用户签名 2-->
* signMessage			<!-- 短信签名内容[无线天利]-->
* 
*
* socketVersion				<!--客户端支持的版本号	19 -->
* loginMode					<!-- smgp协议需要配置loginMode 2-->
* smSplit_normalSplit_splitType		<!--splitType 短信拆分规则 0 不拆分 1普通短信拆分 -->
* smSplit_normalSplit_smLength		<!-- 普通短信长度 70-->
* smSplit_normalSplit_smSplitLength	<!-- 拆分短信长度 65-->
* smSplit_normalSplit_smSplitType	<!-- 拆分内容的形式如:(1/2)($m/$n) -->
* smSplit_normalSplit_splitCount	<!-- 拆分总数\$n -->
* smSplit_normalSplit_splitIndex	<!-- 拆分序号\$m -->
* <!--headType7 短信头类型是否为7个字节 false按66个拆 true按67个拆；smLastSplitCount 倒数第二条的内容做合理拆分的字数 -->
* smSplit_longSplit_splitType
* smSplit_longSplit_headType7
* smSplit_longSplit_smLastSplitCount
* 
* method：POST
* output：{success:'true'} or {success:'false'}
*****************************************************************************/



/****************************************************************************
*mm7网关配置信息URL
* url：   URL/business/gateway/gatewayupdate.ashx
* input：
*
* flag(updateset)
* numgwtypeid,		(协议类型ID，1:cmpp30,2:cmpp20,3:sgip,4:smgp,5:mm7,6:empp,7:cbip)
* vc2gwid,    		（网关编号）
* controlSize 			<!-- 滑动窗口大小   16-->
* countProcessor		<!-- 进程数1 
* sizeInBuffer			<!-- 协议入口缓冲区大小10240 -->
* sizeOutBuffer			<!-- 协议出口缓冲区大小 1024-->
* connectIdleTime		<!--协议连接无反馈重试时间，单位秒 10-->
* connectRepeatTime		<!--协议连接失败的重试时间，单位秒 20-->
* connectRepeatCount	<!--协议连接失败的重试次数 3-->
* messageRepeatTime		<!--信息发送失败的重试时间，单位秒 保留目前未启用 30-->
* messageRepeatCount	<!--信息发送失败的重试次数 保留目前未启用4 -->
* controlClearTime		<!--协议滑动窗口清理时间 50-->
* signType				<!-- 短信签名类型:1=>运营商网关签名; 2=>利信通网关签名; 3=>用户签名 2-->
* signMessage			<!-- 短信签名内容[无线天利]-->
* 
*mmscURL				<!-- 上行地址 彩信网关特有 /mm7-->
*mmscID					<!-- 彩信中心编号920050 -->
* 
* method：POST
* output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*empp网关配置信息URL
* url：   URL/business/gateway/gatewayupdate.ashx
* input：
*
* flag(updateset)
* numgwtypeid,		(协议类型ID，1:cmpp30,2:cmpp20,3:sgip,4:smgp,5:mm7,6:empp,7:cbip)
* vc2gwid,    		（网关编号）
* controlSize 			<!-- 滑动窗口大小   16-->
* countProcessor		<!-- 进程数1 
* sizeInBuffer			<!-- 协议入口缓冲区大小10240 -->
* sizeOutBuffer			<!-- 协议出口缓冲区大小 1024-->
* connectIdleTime		<!--协议连接无反馈重试时间，单位秒 10-->
* connectRepeatTime		<!--协议连接失败的重试时间，单位秒 20-->
* connectRepeatCount	<!--协议连接失败的重试次数 3-->
* messageRepeatTime		<!--信息发送失败的重试时间，单位秒 保留目前未启用 30-->
* messageRepeatCount	<!--信息发送失败的重试次数 保留目前未启用4 -->
* controlClearTime		<!--协议滑动窗口清理时间 50-->
* signType				<!-- 短信签名类型:1=>运营商网关签名; 2=>利信通网关签名; 3=>用户签名 2-->
* signMessage			<!-- 短信签名内容[无线天利]-->
* 
*
* smSplit_normalSplit_splitType		<!--splitType 短信拆分规则 0 不拆分 1普通短信拆分 -->
* smSplit_normalSplit_smLength		<!-- 普通短信长度 70-->
* smSplit_normalSplit_smSplitLength	<!-- 拆分短信长度 65-->
* smSplit_normalSplit_smSplitType	<!-- 拆分内容的形式如:(1/2)($m/$n) -->
* smSplit_normalSplit_splitCount	<!-- 拆分总数\$n -->
* smSplit_normalSplit_splitIndex	<!-- 拆分序号\$m -->
* <!--headType7 短信头类型是否为7个字节 false按66个拆 true按67个拆；smLastSplitCount 倒数第二条的内容做合理拆分的字数 -->
* smSplit_longSplit_splitType
* smSplit_longSplit_headType7
* smSplit_longSplit_smLastSplitCount
* 
* method：POST
* output：{success:'true'} or {success:'false'}
*****************************************************************************/

/****************************************************************************
*cbip网关配置信息URL
* url：   URL/business/gateway/gatewayupdate.ashx
* input：
*
* flag(updateset)
* numgwtypeid,		(协议类型ID，1:cmpp30,2:cmpp20,3:sgip,4:smgp,5:mm7,6:empp,7:cbip)
* vc2gwid,    		（网关编号）
* controlSize 			<!-- 滑动窗口大小   16-->
* countProcessor		<!-- 进程数1 
* sizeInBuffer			<!-- 协议入口缓冲区大小10240 -->
* sizeOutBuffer			<!-- 协议出口缓冲区大小 1024-->
* connectIdleTime		<!--协议连接无反馈重试时间，单位秒 10-->
* connectRepeatTime		<!--协议连接失败的重试时间，单位秒 20-->
* connectRepeatCount	<!--协议连接失败的重试次数 3-->
* messageRepeatTime		<!--信息发送失败的重试时间，单位秒 保留目前未启用 30-->
* messageRepeatCount	<!--信息发送失败的重试次数 保留目前未启用4 -->
* controlClearTime		<!--协议滑动窗口清理时间 50-->
* signType				<!-- 短信签名类型:1=>运营商网关签名; 2=>利信通网关签名; 3=>用户签名 2-->
* signMessage			<!-- 短信签名内容[无线天利]-->
* 
*
* smSplit_normalSplit_splitType		<!--splitType 短信拆分规则 0 不拆分 1普通短信拆分 -->
* smSplit_normalSplit_smLength		<!-- 普通短信长度 70-->
* smSplit_normalSplit_smSplitLength	<!-- 拆分短信长度 65-->
* smSplit_normalSplit_smSplitType	<!-- 拆分内容的形式如:(1/2)($m/$n) -->
* smSplit_normalSplit_splitCount	<!-- 拆分总数\$n -->
* smSplit_normalSplit_splitIndex	<!-- 拆分序号\$m -->
* <!--headType7 短信头类型是否为7个字节 false按66个拆 true按67个拆；smLastSplitCount 倒数第二条的内容做合理拆分的字数 -->
* smSplit_longSplit_splitType
* smSplit_longSplit_headType7
* smSplit_longSplit_smLastSplitCount
* 
* method：POST
* output：{success:'true'} or {success:'false'}
*****************************************************************************/
/****************************************************************************
*获取网关配置项信息URL(根据协议类型)
*
* url：   URL/business/gateway/gatewayquerry.ashx
* input：
*
* flag(getgatewayconfigitembytype),
* typeid,(协议类型，1：cmpp20; 2:cmpp30 3:sgip; 4:smgp; 5:mm7)
* numgwid，（网关ID）
* method：POST
* output：多条
* {"totalcount":6,"success":true,"error":"","data":[{
* "numgwtypeid":1,
* "numtypeid":1,
* "vc2key":"controlsize",
* "vc2value":"16",
* "itemvalue":"1",//配置项值，如果网关配置表tl_gateway_config没有数据，则用TL_GATEWAY_ITEM中的默认值
* "vc2name":"项名称",
* "vc2desc":"项描述",
* "vc2range":"项范围"}]}
*
*****************************************************************************/

//===========网关配置====Start=================================

