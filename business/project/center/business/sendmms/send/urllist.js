/*
需求：1、产品下拉列表 2、栏目下拉列表 3、客户组下拉列表
*/
Ext.namespace('Js.Center.SendMMS');

/*========================================================================
 * 获取tl_mms_content信息URL(通过类型获取本人发布的信息)

1、通过内容获取
=============================================
url：   URL/sendMMS/send/mmscontentquery.ashx
=============================================
input：
	flag(selectbykey),
	%vc2content%，
	state，（0、待审 1、一审 2、二审 3、草稿和驳回）
	numsendtype,(类型编号用逗号分隔)（发送号码数据类型1、栏目2、客户组3、手机号码 4、按文件发送 5、个性化彩信）
	limit，
	start
=============================================
method：POST
=============================================
output：多条=============================================
*/

/*========================================================================
 * 获取tl_mms_content信息URL(通过时间和彩信名称获取本人发布被驳回的信息)

1、通过时间和彩信名称获取
=============================================
url：   URL/sendMMS/send/mmscontentquery.ashx
=============================================
input：
	flag(selectrejectbykey),
	datcreatstart,（创建起始时间）
	datcreatend,     （创建结束时间）
	%vc2name%， （彩信名称）
	limit，
	start
=============================================
method：POST
=============================================
output：多条=============================================
*/
Js.Center.SendMMS.mmscontentURL = 'URL/sendMMS/send/mmscontentquery.ashx';


/*========================================================================
 * 增加发送内容（发送彩信）
=============================================
url：   URL/sendMMS/send/mmscontentadd.ashx
=============================================
input：
	numsendmethod,（1=立即发送  2=定时发送）
	nummmsid，
    datstarttime,（发送开始时间）
    datendtime,（发送结束时间）
	numsendtype,(类型编号用逗号分隔)（发送号码数据类型1、栏目2、客户组3、手机号码 4、按文件发送 5、个性化彩信）
	//四种操作
        //1栏目：取变量numcolumnid 栏目编号 单选
        //2客户组：取变量numusergroupids 客户组编号 多选
        //3号码：取变量mobilelist 号码列表
		//4文件：取变量mobilefile 号码列表文件
		//5文件：
		    //diyfile 个性化信息文件
		    //numopid 所属运营商 号码类型
		    //vc2desc 文件描述
=============================================
method：POST
=============================================
output：多条
=============================================
*/
Js.Center.SendMMS.mmscontentaddURL = 'URL/sendMMS/send/mmscontentadd.ashx';
Js.Center.SendMMS.YXTmmscontentaddURL = 'URL/sendMMS/send/YXTmmscontentadd.ashx';
/*========================================================================
 * 修改发送内容（发送彩信）
=============================================
url：   URL/sendMMS/send/mmscontentupdate.ashx
=============================================
input：
	numcontentid,（0=直接发送json彩信；否则发送被驳回彩信）
	numsendmethod,（1=立即发送  2=定时发送）
	vc2contentJson, 修改后的彩信JSON
    datstarttime,（发送开始时间）
    datendtime,（发送结束时间）
	numsendtype,(类型编号用逗号分隔)（发送号码数据类型1、栏目2、客户组3、手机号码 4、按文件发送 5、个性化彩信）
	//四种操作
        //1栏目：取变量numcolumnid 栏目编号 单选
        //2客户组：取变量numusergroupids 客户组编号 多选
        //3号码：取变量mobilelist 号码列表
		//4文件：取变量mobilefile 号码列表文件
		//5文件：取变量mobilefile 个性化信息文件
=============================================
method：POST
=============================================
output：多条
=============================================
*/
Js.Center.SendMMS.MMSContentUpdateURL = 'URL/sendMMS/send/mmscontentupdate.ashx';
Js.Center.SendMMS.YXTMMSContentUpdateURL = 'URL/sendMMS/send/YXTmmscontentupdate.ashx';

/*修改帧
=============================================
url：   URL/sendMMS/MMS/mmsupdate.ashx
=============================================
input:
mmsid,(历史彩信编号)
numframeorder,(帧序号)
vc2image,(图片路径)
vc2music,(背景音乐路径)
vc2word,(文字)
datframetime
flag:"mmshisoption";  
=============================================
method：POST
=============================================
output：{success:'true'} or {success:'false'}
*/
Js.Center.SendMMS.MMSFrameUpdateURL = 'URL/sendMMS/MMS/mmsframeupdate.ashx';

/*========================================================================
 * 删除发送内容
=============================================
url：   URL/sendMMS/send/mmscontentdelete.ashx
=============================================
input：
	numcontentid
=============================================
method：POST
=============================================
output：多条
=============================================
*/
Js.Center.SendMMS.MMSContentDeleteURL = 'URL/sendMMS/send/mmscontentdelete.ashx';

/*=======================================================================
6、发送测试彩信
URL：URL/sendMMS/send/smscontentupdate.ashx
input：

flag(sendtestmms)
numcontentid,   （彩信编号）
vc2mobile,      （测试手机号码）
method：POST
output：true  or false

=====================================================
*/
Js.Center.SendMMS.smscontentaddtestURL = 'URL/sendMMS/send/smscontentupdate.ashx';
/*获取彩信资源文件相关配置信息
=============================================
url：URL/sendMMS/MMS/mmsconfiginfo.ashx
=============================================
input:
flag:mmsconfiginfo
============================================
method：POST
============================================
output：imageSize,imageWidth,imageHeight,musicSize,mmsTotalSize; 
 */
Js.Center.SendMMS.MMSConfigInfo="URL/sendMMS/MMS/mmsconfiginfo.ashx";

Js.Center.Business.YXTUserGroupURL = 'URL/Customer/UserGroup/UserGroupQuery.ashx';




