/*
需求：1、产品下拉列表 2、栏目下拉列表 3、客户组下拉列表
*/
Ext.namespace('Js.Center.SendMMS');

/*获取tl_sms_content信息URL(通过类型获取全部的信息)，彩信复制功能
=============================================
url：   URL/sendMMS/MMS/mmsquerylist.ashx
=============================================
input：
flag,(selectself//本人,selectall//全部)
datcreattimestart,(大于DATCREATTIME)
datcreattimeend,(小于DATCREATTIME)%mmsname%，（彩信名称）numcreater（创建人）limit，(每页多少条)
start  （开始行数）
==============================================
method：POST

==============================================
output：多条
*/

/*获取tl_sms_content信息URL(获取所有的可复制的彩信信息)，
=============================================
url：   URL/sendMMS/MMS/mmsquerylist.ashx
=============================================
input：
flag,(selectcopy)
datcreattimestart,(大于DATCREATTIME)
datcreattimeend,(小于DATCREATTIME)
%mmsname%，（彩信名称）
numcreater（创建人）

numstate，（彩信状态）
numcheckuser1，（一审审核人ID）
numcheckuser2，（一审审核人ID）

limit，(每页多少条)
start  （开始行数）
==============================================
method：POST
==============================================
output：多条
*/
Js.Center.SendMMS.MMSQueryListURL ="URL/sendMMS/MMS/mmsquerylist.ashx";


/*获取彩信详细信息(通过tl_sms编号)
=============================================
url：   URL/sendMMS/MMS/mmsquerydesc.ashx
=============================================
input:
    nummmsseqid:彩信编号
    flag:selectmms彩信；selecthismms历史彩信
=============================================
method：POST
=============================================
output：单条
*/
Js.Center.SendMMS.MMSQueryDescURL = 'URL/sendMMS/MMS/mmsquerydesc.ashx';


/*添加彩信
=============================================
url：   URL/sendMMS/MMS/mmsadd.ashx
=============================================
input:
mmsid:彩信ID--------------------------随机码;

vc2mmsname,(彩信名称)
numtype,(彩信类型)
nummmsframecount,（彩信帧数）
vcsmmsdesc（彩信描述）
=============================================
method：POST
=============================================
output：{success:'true'} or {success:'false'}
*/
Js.Center.SendMMS.MMSAddURL = 'URL/sendMMS/MMS/mmsadd.ashx';

/*获取彩信随机ID----------------------------------------------------新增
=============================================
url：   URL/sendMMS/MMS/getrandommmsid.ashx
=============================================
input:
=============================================
method：POST
=============================================
output：getrandommmsid
*/

Js.Center.SendMMS.GetRandomMMSIDURL='URL/sendMMS/MMS/getrandommmsid.ashx';


/*获取彩信随机ID----------------------------------------------------新增复制时获取随机码
=============================================
url：   URL/sendMMS/MMS/getrandommmsid.ashx
=============================================
input:
resourcemmsid:(复制源彩信ID）
=============================================
method：POST
=============================================
output：getrandommmsid
*/

Js.Center.SendMMS.GetRandomMMSIDCopyURL='URL/sendMMS/MMS/getrandommmsidbycopy.ashx';

/*修改彩信
=============================================
url：   URL/sendMMS/MMS/mmsupdate.ashx
=============================================
input:
mmsjson(彩信的Json串)
=============================================
method：POST
=============================================
output：{success:'true'} or {success:'false'}
*/
Js.Center.SendMMS.MMSUpdateURL = 'URL/sendMMS/MMS/mmsupdate.ashx';

/*保存彩信
=============================================
url：   URL/sendMMS/MMS/mmssave.ashx
=============================================
input:
nummmsseqid,(彩信编号)
vcsmmsmess（彩信信息json串）
=============================================
method：POST
=============================================
output：{success:'true'} or {success:'false'}
*/
Js.Center.SendMMS.MMSSaveURL = 'URL/sendMMS/MMS/mmssave.ashx';

/*删除彩信
=============================================
url：   URL/sendMMS/MMS/mmsdelete.ashx
=============================================
input:
ids,(彩信编号)
=============================================
method：POST
=============================================
output：{success:'true'} or {success:'false'}
*/
Js.Center.SendMMS.MMSDeleteURL = 'URL/sendMMS/MMS/mmsdelete.ashx';

/*修改帧
=============================================
url：   URL/sendMMS/MMS/mmsupdate.ashx
=============================================
input:
mmsid,(彩信编号)-------------------新增彩信编号（添加，为一随机数,更新为彩信ID）

numframeorder,(帧序号)
vc2image,(图片路径)
vc2music,(背景音乐路径)
vc2word,(文字)
datframetime
flag:"mmscuroption";  
=============================================
method：POST
=============================================
output：{success:'true'} or {success:'false'}
*/
Js.Center.SendMMS.MMSFrameUpdateURL = 'URL/sendMMS/MMS/mmsframeupdate.ashx';

/*添加帧
=============================================
url：   URL/sendMMS/MMS/mmsadd.ashx
=============================================
input:
nummmsseqid,(彩信编号)
numframeorder(帧序号)
=============================================
method：POST
=============================================
output：{success:'true'} or {success:'false'}
*/
Js.Center.SendMMS.MMSFrameAddURL = 'URL/sendMMS/MMS/mmsframeadd.ashx';


/*删除帧
=============================================
url：   URL/sendMMS/MMS/mmsadd.ashx
=============================================
input:
nummmsseqid,(彩信编号)
numframeorder(帧序号)
=============================================
method：POST
=============================================
output：{success:'true'} or {success:'false'}
*/
Js.Center.SendMMS.MMSFrameDeleteURL = 'URL/sendMMS/MMS/mmsframedelete.ashx';
Js.Center.SendMMS.MMSUpLoadingResourcesURL="URL/SendMMS/MMS/MMSResourceUp.ashx";

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
