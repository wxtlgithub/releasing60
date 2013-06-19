/*******************************************************************
 * 通用工具包
 *******************************************************************/
Ext.namespace("WXTL.Common");
//短彩信 平台签名
IDIOGRAPH = "";
//短彩信 平台签名长度
IDIOGRAPHSIZE = 0;
//账户签名
USERIOGRAPH = "";
//账户签名长度
USERIOGRAPHSIZE = 0;

OpenNum = 1;
//监控配置通用项
NUMCLIENTCONFIGID = 1;
NUMDBCONFIGID = 2;
NUMJOBCONFIGID = 3;
NUMSYSTEMCONFIGID = 101;
//监控报警请求通讯网元ID配置
NUMCOMUNICATIONNODEID = 93;

MobileRegex = null;
IsTimeOut = false;
RegexInfo = eval(doSynRequest('URL/GetMobileRegSimple.ashx?flag=reg'));//('Test/test.aspx'));//
if (RegexInfo != null) {
    if (RegexInfo.info != null) {
        MobileRegex = new RegExp(RegexInfo.info);
    }
    
};

//===========================================================================================常用正则表达式
WXTL.Common.regex = {
    Require: /.+/,
    Email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    Phone: /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/,
    Mobile: MobileRegex,///^((\(\d{3}\))|(\d{3}\-))?(1(3\d|5[0-3]|5[5-9]|8[6-9]))\d{8}?$/, ///1(3\d|5[0-3]|5[5-9]|8[6-9])\d{8}$/,  ///^((\(\d{3}\))|(\d{3}\-))?(13|15|18)\d{9}?$/, 
    MobileList: /^(\d{11}){1,2}$/,///(^((\(\d{3}\))|(\d{3}\-))?(13|15|18)\d{9}\r?)?(^((\(\d{3}\))|(\d{3}\-))?(13|15|18)\d{9}\r?)$/,///^[\d\r\n]+$/,
    Url: /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
    IdCard: /^\d{15}(\d{2}[A-Za-z0-9])?$/,
    Currency: /^\d+(\.\d+)?$/,
    Number: /^\d+$/,
    Zip: /^[1-9]\d{5}$/,
    QQ: /^[1-9]\d{4,8}$/,
    IP: /^(([01]?[\d]{1,2})|(2[0-4][\d])|(25[0-5]))(\.(([01]?[\d]{1,2})|(2[0-4][\d])|(25[0-5]))){3}$/,
    IPPORT: /^(([01]?[\d]{1,2})|(2[0-4][\d])|(25[0-5]))(\.(([01]?[\d]{1,2})|(2[0-4][\d])|(25[0-5]))){3}(:\d{1,})?$/,
    Integer: /^[-\+]?\d+$/,
    Double: /^[-\+]?\d+(\.\d+)?$/,
    English: /^[A-Za-z]+$/,
    Chinese: /^[\u0391-\uFFE5]+$/,
    UnSafe: /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
    PostCode: /^\d{6}$/,
    //非法字符验证
    //Illegal:/^[^%& ',;=?$\x22]+$/,
    //Illegal: /^[^ %&'$\x22][^%&'$\x22]+$/
    
    //===========================Start========只验证单引号
    //        Illegal: /^[^'][^']*$/,
    //        IllegalDiy: /^[^'][^']*$/,
    //===========================End========只验证单引号
    
    //Illegal: /^[^ %&'$\x22][^%&'$\x22]*$/,
    //IllegalDiy: /^[^ %&'\x22][^%&'\x22]*$/,
    LessThanRowNum: /^(\d{1,11}\n?){1,1000}$/,
    Illegal: /^[^ %&,'$\x22][^%&'$\x22]*$/,
    IllegalDiy: null
};

//============================================================================================正则表达式提示信息

WXTL.Common.regexText = {
    IllegalDiyText: '请不要以空格为首，请不要输入非法字符\"%&\',',
    IllegalText: '请不要以空格为首，请不要输入非法字符\"%&\'$,',
    LessThanRowNumText: '请输入1-1000行以内的内容！',
    MobileListText: '请按照帮助说明输入正确的手机号码列表'
};
/****************************************************************
 * 描述：帮助说明文字
 * @title：需要显示帮助说明的地方
 * @isRed：是否红色标注（true:title显示为红色；false:title显示为默认的黑色）
 * @qtipHtml：帮助说明文字
 ****************************************************************/
Ext.namespace("WXTL.Common.help");
function getHelpMsg(title, isRed, qtipHtml){
    if (isRed) {
        return '<font color="red" style="font-size:12px">' + title + '<img src="jspack/product/common/Images/help.gif" align=AbsMiddle  qtitle=帮助 qtip="' + qtipHtml + '" style="cursor:handy"/></font>';
    }
    else {
        return '<font style="font-size:12px">' + title + '<img src="jspack/product/common/Images/help.gif" align=AbsMiddle  qtitle=帮助 qtip="' + qtipHtml + '" style="cursor:handy"/></font>';
    }
};

WXTL.Common.help.MOBILEFILE = getHelpMsg("文件", true, "1、文件格式为txt<br>2、文件大小须小于4M<br>3、内容格式:　<img src=jspack/product/common/Images/help/oldmobilefile.jpg align=top/>");
WXTL.Common.help.MOBILELIST = getHelpMsg("号码列表", true, "1、输入行数不超过1000行<br>2、输入格式:　<img src=jspack/product/common/Images/help/oldmobilelist.jpg align=Baseline/>");
WXTL.Common.help.NEWMOBILEFILE = getHelpMsg("文件", true, "1、文件格式为txt<br>2、文件大小须小于4M<br>3、内容格式:　<img src=jspack/product/common/Images/help/mobilefile.jpg align=top/>");
WXTL.Common.help.NEWMOBILELIST = getHelpMsg("号码列表", true, "1、输入行数不超过1000行<br>2、输入格式:　<img src=jspack/product/common/Images/help/mobilelist.jpg align=Baseline/>");
WXTL.Common.help.helpACCOUNTFILE = getHelpMsg("文件", true, "1、文件格式为txt<br>2、文件大小须小于4M<br>3、内容格式:　<img src=jspack/product/common/Images/help/accountfile.jpg align=top/>");
WXTL.Common.help.helpACCOUNTLIST = getHelpMsg("号码列表", true, "1、输入行数不超过1000行<br>2、输入格式:　<img src=jspack/product/common/Images/help/accountlist.jpg align=Baseline/>");

/*********************************************************************************
 * 描述：动态加载JS文件
 * @param {Object} arr：要加载的JS文件数组
 * @param {Object} i：
 * @param {Object} str:绑定到左侧菜单叶子节点菜单点击事件调用的函数
 * @param {Object} obj:node（添加到center的tab信息）
 *********************************************************************************/
function loadJS(arr, i, str, obj){
    var _successFlag = false;
    //var jsc ;
    var loadJsFlag = true;
    var _docScript = document.getElementsByTagName('script');
    //=================判断动态加载js ==============Start
    //	for(var j=0; j< _docScript.length;j++){
    //		if(_docScript[j].src.indexOf(arr[i]) > 0 ){
    //			loadJsFlag = false;
    //		}
    //	}
    //=================判断动态加载js =============END
    
    if (loadJsFlag) {
		var _doc = document.getElementsByTagName('head')[0];
		var jsc = document.createElement('script');
		jsc.setAttribute('type', 'text/javascript');
		jsc.setAttribute('src', arr[i]);
		_doc.appendChild(jsc);
		jsc.onload = jsc.onreadystatechange = function(){
			if (this.readyState && this.readyState == "loading") {
				return;
			}
			else {
				if (i == arr.length - 1) {
					if (obj != null) {
						eval(str + "(obj)");
					}
				}
				else {
					loadJS(arr, i + 1, str, obj);
				}
			}
		};
	}
	else {
		if (obj != null) {
			eval(str + "(obj)");
		}
	}
};

WXTL.Common.JsLoader = function(str, obj){
    this.load = function(arr){
        loadJS(arr, 0, str, obj);
    };
};

//==============================================================================================通用日期函数
WXTL.Common.dateTime = function(){
};

/**********************************************************
 * Describe：获取当前时间
 * Return: date
 **********************************************************/
WXTL.Common.dateTime.getNow = function(){
    return new Date();
};

/**********************************************************
 * Describe：获取当前时间
 * Return: String
 **********************************************************/
WXTL.Common.dateTime.getNowValue = function(){
    return this.getNow().toLocaleString();
};

/**********************************************************
 * Describe：在一个时间上添加秒
 * @datevalue：日期/String
 * @numsecond：要添加的秒数/int
 * Return: date
 **********************************************************/
WXTL.Common.dateTime.addSecond = function(datevalue, numsecond){
    return new Date(Date.parse(datevalue) + 1000 * (numsecond)/*(+/-)秒*/);
};

/**********************************************************
 * Describe：在一个时间上添加分钟
 * @datevalue：日期/String
 * @numsecond：要添加的分钟数/int
 * Return: date
 **********************************************************/
WXTL.Common.dateTime.addMinute = function(datevalue, numminute){
    return new Date(Date.parse(datevalue) + 1000 * 60(numminute)/*(+/-)分钟*/);
};

/**********************************************************
 * Describe：在一个时间上添加小时
 * @datevalue：日期/String
 * @numsecond：要添加的小时数/int
 * Return: date
 **********************************************************/
WXTL.Common.dateTime.addHour = function(datevalue, numhour){
    return new Date(Date.parse(datevalue) + 1000 * 60 * 60 * (numhour)/*(+/-)小时*/);
};
/**********************************************************
 * Describe：在一个时间上添加天
 * @datevalue：日期/String
 * @numsecond：要添加的天数/int
 * Return: date
 **********************************************************/
WXTL.Common.dateTime.addDay = function(datevalue, numday){
    return new Date(Date.parse(datevalue) + 1000 * 60 * 60 * 24 * (numday)/*(+/-)天*/);
};

/**********************************************************
 * Describe：在一个时间上添加月
 * @datevalue：日期/String
 * @numsecond：要添加的天数/int
 * Return: date
 **********************************************************/
WXTL.Common.dateTime.addMonth = function(datevalue, numday){
	return new Date(datevalue.getFullYear(), datevalue.getMonth() + numday, datevalue.getDate());
};

/**********************************************************
 * Describe：在一个时间上添加年
 * @datevalue：日期/String
 * @numsecond：要添加的天数/int
 * Return: date
 **********************************************************/
WXTL.Common.dateTime.addYear = function(datevalue, numday){
	return new Date(datevalue.getFullYear() + numday, datevalue.getMonth(), datevalue.getDate());
};

WXTL.Common.dateTime.getNowDate = function(){
    var mydate = new Date();
    return WXTL.Common.dateTime.formatDate(mydate);
};

/*将String类型解析为Date类型.    
 parseDate('2006-1-1') return new Date(2006,0,1)
 parseDate(' 2006-1-1 ') return new Date(2006,0,1)
 parseDate('2006-1-1 15:14:16') return new Date(2006,0,1,15,14,16)
 parseDate(' 2006-1-1 15:14:16 ') return new Date(2006,0,1,15,14,16);
 parseDate('2006-1-1 15:14:16.254') return new Date(2006,0,1,15,14,16,254)
 parseDate(' 2006-1-1 15:14:16.254 ') return new Date(2006,0,1,15,14,16,254)
 parseDate('不正确的格式') retrun null
 */
WXTL.Common.dateTime.parseDate = function(str){
    if (typeof str == 'string') {
		var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
		if (results && results.length > 3) {
			return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]));
		}
		results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
		if (results && results.length > 6) {
			return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]), parseInt(results[4]), parseInt(results[5]), parseInt(results[6]));
		}
		results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
		if (results && results.length > 7) {
			return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]), parseInt(results[4]), parseInt(results[5]), parseInt(results[6]), parseInt(results[7]));
		}
	}
    return null;
};

/*    
 将Date/String类型,解析为String类型.
 传入String类型,则先解析为Date类型
 不正确的Date,返回 ''
 如果时间部分为0,则忽略,只返回日期部分.
 */
WXTL.Common.dateTime.formatDate = function(v){
    if (typeof v == 'string') {
		v = WXTL.Common.dateTime.parseDate(v);
	}
    if (v instanceof Date) {
        var y = v.getFullYear();
        var m = v.getMonth() + 1;
        var d = v.getDate();
//        var h = v.getHours();
//        var i = v.getMinutes();
//        var s = v.getSeconds();
//        var ms = v.getMilliseconds();
        //    if(ms>0) return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s + '.' + ms;      
        //    if(h>0 || i>0 || s>0) return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;      
        return y + '/' + m + '/' + d;
    }
    return '';
};

/*********************************************************************************************
 * 描述：验证邮箱列表（验证行数及每行邮箱的格式）
 * @param {Object} mailList:需要验证的邮箱列表
 * @param {Object} maxLine:允许输入的最大行数
 *********************************************************************************************/
function checkMailList(mailList, maxLine){
    var _lines = new Array();
    if (Ext.isIE) {
        _lines = mailList.split("\r\n"); // 按行分隔处理，否则 /\s/g 可能会匹配到换行符   
    }
    else {
        _lines = mailList.split("\n");
    }
    
    //alert(_lines.length);
    var _valid = true;
    if (_lines.length > maxLine) {
        _valid = false;
        return '已输入行数' + _lines.length + ',请不要超过' + maxLine + '行';
    }
    else {
        for (var i = 0; i < _lines.length; i++) {
            if (!WXTL.Common.regex.Email.test(_lines[i])) {
                _valid = false;
                return '包含不正确的邮箱格式，请检查！';
            }
        }
    }
    
    return _valid;
};

/*********************************************************************************************
 * 描述：验证彩信预览测试时手机号
 * @param {Object} mobileList:需要验证的手机号码列表
 * @param {Object} maxLine:允许输入的最大行数
 *   @param {Object}nummmstype 判断彩信类型是否为个性
 *********************************************************************************************/
function checkMobileListMMSsend(mobileList, maxLine, nummmstype){
    var _lines = new Array();
    if (Ext.isIE) {
        _lines = mobileList.split("\r\n"); // 按行分隔处理，否则 /\s/g 可能会匹配到换行符   
    }
    else {
        _lines = mobileList.split("\n");
    }
    
    //alert(_lines.length);
    var _valid = true;
    if (_lines.length > maxLine) {
        _valid = false;
        return '已输入行数' + _lines.length + ',请不要超过' + maxLine + '行';
    }
    else {
    
        if (nummmstype == 2) {
            var MobileString = _lines[0].substring(0, 11);
            if (!WXTL.Common.regex.Mobile.test(MobileString)) {
                _valid = false;
                return '包含不正确的手机号码，请检查！';
            }
        }
        else {
            for (var i = 0; i < _lines.length; i++) {
                if (!WXTL.Common.regex.Mobile.test(_lines[i])) {
                    _valid = false;
                    return '包含不正确的手机号码，请检查！';
                }
            }
        }
        
    }
    
    return _valid;
};
/*********************************************************************************************
 * 描述：验证手机号码列表（验证行数及每行手机号码的格式）
 * @param {Object} mobileList:需要验证的手机号码列表
 * @param {Object} maxLine:允许输入的最大行数
 *********************************************************************************************/
function checkMobileList(mobileList, maxLine){
    var _lines = new Array();
    if (Ext.isIE) {
        _lines = mobileList.split("\r\n"); // 按行分隔处理，否则 /\s/g 可能会匹配到换行符   
    }
    else {
        _lines = mobileList.split("\n");
    }
    
    //alert(_lines.length);
    var _valid = true;
    if (_lines.length > maxLine) {
        _valid = false;
        return '已输入行数' + _lines.length + ',请不要超过' + maxLine + '行';
    }
    else {
        for (var i = 0; i < _lines.length; i++) {
            if (!WXTL.Common.regex.Mobile.test(_lines[i])) {
                _valid = false;
                return '包含不正确的手机号码，请检查！';
            }
        }
    }
    
    return _valid;
};

//============================================================================URL编码 URL解码
/****************************************************
 * @YSX 2009-04-14
 * URL编码 URL解码
 ****************************************************/
 //解码
WXTL.Common.urlDecode = function(str){
    var i, temp;
    var result = "";
    
    for (i = 0; i < str.length; i++) {
        if (str.charAt(i) == "%") {
            if (str.charAt(++i) == "u") {
                temp = str.charAt(i++) + str.charAt(i++) + str.charAt(i++) + str.charAt(i++) + str.charAt(i);
                result += unescape("%" + temp);
            }
            else {
                temp = str.charAt(i++) + str.charAt(i);
                if (eval("0x" + temp) <= 160) {
                    result += unescape("%" + temp);
                }
                else {
                    temp += str.charAt(++i) + str.charAt(++i) + str.charAt(++i);
                    result += Decode_unit("%" + temp);
                }
            }
        }
        else {
            result += str.charAt(i);
        }
    }
    
    return result;
};
/**************************************************
 * url编码
 * @param {Object} str
 **************************************************/
 //url编码
WXTL.Common.urlEncode = function(str){
    var i, temp, p, q;
    var result = "";
    
    for (i = 0; i < str.length; i++) {
        temp = str.charCodeAt(i);
        if (temp >= 0x4e00) {
            execScript("ascCode=hex(asc(\"" + str.charAt(i) + "\"))", "vbscript");
            result += ascCode.replace(/(.{ 2 })/g, "%$1");
        }
        else {
            result += escape(str.charAt(i));
        }
    }
    return result;
};

/**************************************************
 * Describe:判断是否在数组内
 * @param {Object} obj:对象
 * @param {Object} arr：数组
 **************************************************/
function isInArray(obj, arr){

    type = typeof obj;
    if (type == 'string' || type == 'number') {
        for (var i in arr) {
            if (arr[i] == obj) {
                return true;
            }
        }
        return false;
    }
};

//============================================================================================文件操作相关
//文件类型
var fileTypeArr = new Array();
fileTypeArr[0] = "txt";
fileTypeArr[1] = "csv";

var fileTypeArrDesc = "txt,csv";
//文件大小
var fileSize = 4194304;
var fileSizeDesc = "4M";
//判断导入文件类型是否可以
function checkFileType(filePath){
    var suffix = getFileType(filePath);
    if (!isInArray(suffix.toLowerCase(), fileTypeArr)) {
        return false;
    }
    else {
        return true;
    }
};

//获取文件类型
function getFileType(filePath){
    try {
        return filePath.match(/^(.*)(\.)(.{1,8})$/)[3];
    } 
    catch (e) {
        return '';
    }
};

//获取文件大小
function getFileSize(filePath){

    try {
        var fso = new ActiveXObject('Scripting.FileSystemObject');
        var file = fso.GetFile(filePath);
        return file.Size;
    } 
    catch (e) {
        //alert(e.description);
        return '';
    }
};

//获取文件信息
function getFileMessage(filePath,fileSize){
	if(fileSize != null){
		return "文件路径：" + filePath + "\r文件类型：" + getFileType(filePath) + "\r文件大小：" + getFileSizeFormat(fileSize);
	}
	else{
	    return "文件路径：" + filePath + "\r文件类型：" + getFileType(filePath) + "\r文件大小：" + getFileSizeFormat(getFileSize(filePath));
		//return "文件路径：" + filePath + "\r文件类型：" + getFileType(filePath) + "\r文件大小：" + Ext.util.Format.fileSize(getFileSize(filePath));
	}
    
};

//上传控件检查文件
function checkFile(filePath){
    if (!checkFileType(filePath)) {
        return '文件类型应为' + fileTypeArrDesc;
    }
    else{ 
        if (getFileSize(filePath) != '' && getFileSize(filePath) > fileSize) {
            return '文件大小应小于' + fileSizeDesc;
        }
        else {
            return '';
        }
    }
};

function Hashtable(){
    this._hash = {};
    this._count = 0;
    this.add = function(key, value){
        if (this._hash.hasOwnProperty(key)) 
            return false;
        else {
            this._hash[key] = value;
            this._count++;
            return true;
        }
    };
    this.remove = function(key){
        delete this._hash[key];
        this._count--;
    };
    this.count = function(){
        return this._count;
    };
    this.items = function(key){
        if (this.contains(key)){
            return this._hash[key];
        }
    };
    this.contains = function(key){
        return this._hash.hasOwnProperty(key);
    };
    this.clear = function(){
        this._hash = {};
        this._count = 0;
    };
};

function getFileSizeFormat(size){
    if (size < 0) {
		return "0B";
	}
	else {
		if (size < 1024) 
			return Math.round(size * Math.pow(10, 2)) / Math.pow(10, 2) + "B";
		else {
			if (size < 1024 * 1024) {
				return Math.round(size / 1024 * Math.pow(10, 2)) / Math.pow(10, 2) + "KB";
			}
			else {
				return Math.round(size / 1024 / 1024 * Math.pow(10, 2)) / Math.pow(10, 2) + "MB";
			}
		}
	}
    //	if(size<1024)
    //        return Math.round(size) +"B";
    //    else if(size<1024*1024)
    //        return Math.round(size/1024)+"KB";
    //    else 
    //        return Math.round(size/1024/1024)+"MB";
};

function getFileName(filePath){
    if (size < 1024 * 1024) {
		return size / 1024 + "KB";
	}
	else {
		return size / 1024 / 1024 + "MB";
	}
};

/*************************************************************
 * Describe: 打开一个新窗口
 * @url：路径
 * @width：窗口宽度
 * @height：窗口高度
 **************************************************************/
function windowOpen(url, width, height){
    var newurl, arrurl;
    if (typeof(url) == "undefined" || url == "") {
        return;
    }
    else {
        if (url.indexOf("?") == -1) {
            newurl = url;
        }
        else {
            newurl = url.substring(0, url.indexOf("?") + 1);
            arrurl = url.substring(url.indexOf("?") + 1).split("&");
            for (var i = 0; i < arrurl.length; i++) {
                newurl += arrurl[i].split("=")[0] + "=" + escape(arrurl[i].split("=")[1]) + "&";
            }
            newurl = newurl.substring(0, newurl.length - 1);
        }
    }
    if (typeof(width) != "number" || typeof(height) != "number") {
        window.open(newurl);
    }
    else {
        window.open(newurl, "", "width=" + width + ",height=" + height);
    }
};

/*************************************************************
 * Describe: 文件下载
 * @urlStr：下载路径
 * @idNum：参数值
 **************************************************************/
function doLoad(urlStr, idNum){
    windowOpen(urlStr + "?id=" + idNum + "&flag=selectdesc", 400, 300);
};

/*************************************************************
 * Describe: 数据导出
 * @urlStr：导出数据访问路径
 * @parmsString：参数
 **************************************************************/
function exportData(urlStr, parmsString){
    
    windowOpen(urlStr + "?" + WXTL.Common.urlDecode(parmsString), 400, 300);
   
//    checkLogin();
//    if(!IsTimeOut){
//        windowOpen(urlStr + "?" + WXTL.Common.urlDecode(parmsString), 400, 300);
//    }
};


/*************************************************************
 * Describe: 验证登录信息是否过期
 **************************************************************/
function checkLogin(){
    Ext.Ajax.request({
        url: 'url/IsLogInSimple.ashx?flag=islogin',
        method: "GET",
        params: {
            parentid: -1
        },
        success: function(form, action){
            var obj = Ext.util.JSON.decode(form.responseText);
            var falg = obj.success;
            if (falg == false) {
                IsTimeOut = true;
                Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
                    window.location.href = "login.htm";
                });
                
            }
        },
        failure: function(form, action){
            IsTimeOut = true;
            Ext.Msg.alert("温馨提示", "请重新登录!");
            window.location.href = "login.htm";
        }
    });
};

//=========================================================================通用ＪＳ加载
//var arr = new Array();

//arr[0] = "JS/event.js";
////arr[1] = "JS/urllist.js";
////arr[2] = "JS/center/Popedom/Department/URLList.js";
////arr[3] = "JS/center/Popedom/User/URLList.js";
////arr[4] = "JS/center/Popedom/Role/URLList.js";
////arr[5] = "JS/center/business/product/urllist.js";
////arr[6] = "JS/center/business/column/urllist.js";
////arr[6] = "JS/center/business/usergroup/urllist.js";
////arr[7] = "JS/center/purview/user/urllist.js";
//arr[1] = "ext/wxtl-all.js";
////arr[9] = "ext/VTypes.js";
//var loader = new WXTL.Common.JsLoader('', null);
//loader.load(arr);

/*************************************************************
 * Describe: 显示提示信息
 **************************************************************/
function showResult(msg){
    Ext.example.msg('温馨提示', msg);
};
/*************************************************************
 * Describe: 处理异步请求
 * @url：请求地址
 * @params：参数
 * @store：数据
 **************************************************************/
function doAjax(url, params, store){
    Ext.Ajax.request({
        url: url,
        method: "POST",
        params: params,
        success: function(form, action){
            var obj = Ext.util.JSON.decode(form.responseText);
            var falg = obj.success;
            if (falg == true) {
                Ext.Msg.alert("温馨提示", "操作已成功!");
                if (store != null){
                    store.reload();
                }
            }
            else {
                if (!obj.success && obj.info == "对不起，您没有登录！") {
                    Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
                        window.location.href = "login.htm";
                    });
                }
                else {
                    Ext.Msg.alert('温馨提示', obj.info);
                }
            }
            //Ext.Msg.alert('温馨提示', obj.info);
        
        },
        failure: function(form, action){
            var objJson = Ext.util.JSON.decode(action.response.responseText);
            Ext.Msg.alert('温馨提示', objJson.info);
            //Ext.Msg.alert('温馨提示', '系统忙，请稍候...');
        }
    });
};
/*************************************************************
 * Describe: 处理异步请求
 * @url：请求地址
 * @params：参数
 * @store：操作成功后回调函数
 **************************************************************/
function doAjaxWithCallBack(url, params, callBackFunc){
    Ext.Ajax.request({
        url: url,
        method: "POST",
        params: params,
        success: function(form, action){
            var obj = Ext.util.JSON.decode(form.responseText);
            var falg = obj.success;
            if (falg == true) {
                Ext.Msg.alert("温馨提示", "操作已成功!");
                callBackFunc();
            }
            else {
                if (!obj.success && obj.info == "对不起，您没有登录！") {
                    Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
                        window.location.href = "login.htm";
                    });
                }
                else {
                    Ext.Msg.alert('温馨提示', obj.info);
                }
            }        
        },
        failure: function(form, action){
            var objJson = Ext.util.JSON.decode(action.response.responseText);
            Ext.Msg.alert('温馨提示', objJson.info);
        }
    });
};
/*************************************************************
 * Describe: 处理异步请求,返回Json串信息
 * @url：请求地址
 * @params：参数
 **************************************************************/
function doAjaxJson(url, params){
    Ext.Ajax.request({
        url: url,
        method: "POST",
        params: params,
        success: function(form, action){
            var obj = Ext.util.JSON.decode(form.responseText);
            var responses = reader.readRecords(Ext.decode(form.responseText));
            return responses;
        },
        failure: function(form, action){
            var objJson = Ext.util.JSON.decode(action.response.responseText);
            return objJson;
            //Ext.Msg.alert('温馨提示', objJson.info);
            //Ext.Msg.alert('温馨提示', '系统忙，请稍候...');
        }
    });
};

/*****************************************************
 * Describe:同步请求URL
 * @param {Object} url
 *****************************************************/
function doSynRequest(url){
    //var conn = Ext.lib.Ajax.getConnectionObject().conn;
    var conn = Ext.lib.Ajax.getConnectionObject().conn;
    conn.open("POST", url, false);
    conn.send('');
    var response = Ext.decode(conn.responseText);
    if (response.success == null) {
		return response;
	}
	else {
		if (!response.success && response.error != null && response.error == "对不起，您没有登录！") {
			//Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
			window.location.href = "login.htm";
		//});
		}
		else {
			return response;
		}
	}
    
};

//function doSynRequest(urlStr, paramsStr) {   
//    var obj;   
//    var value;   
//    if (window.ActiveXObject) {   
//        obj = new ActiveXObject('Microsoft.XMLHTTP');   
//    } else if (window.XMLHttpRequest) {   
//        obj = new XMLHttpRequest();   
//    }   
//    obj.open('POST', urlStr, false);   
//    obj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');   
//    obj.send(paramsStr);   
//	var result = Ext.decode(obj.responseText);
//    //var result = Ext.util.JSON.decode(obj.responseText);   
//    return result;   
//}  


/********************************************************************************************************************
 * Describe:彩信编辑相关
 ********************************************************************************************************************/
/*****************************************************
 * Describe:生成彩信内容html字符串
 * @param {Object} sourceString：彩信资源模板
 * @param {Object} strList：参数列表
 *****************************************************/
function formatString(sourceString, strList){
    for (var i = 0; i < strList.length; i++) {
        sourceString = sourceString.replace("{" + i + "}", strList[i]);
    }
    return sourceString;
};

//====================================================彩信浏览
//有图片彩信模板
var MMSFrameString = '<div  style="border-style: solid; border-width: 1px; border-color: #808080 #FFFFFF #FFFFFF #808080;width:99%;height:99%"><DIV id="ZipCode" style=" BACKGROUND-COLOR:white;width:99%;height:99%"><br><div style="display:table-cell;height:100px;width:100px;vertical-align:middle;"><img style="max-width:100px;max-height:100px;_width:100px;" src={0} /></div><br><br><div style="word-wrap:break-word; word-break:break-all; padding-right: 5px; padding-left: 5px">{1}</div></DIV></div>';
//无图片彩信模板
var MMSNoImageFrameString = '<div  style="border-style: solid; border-width: 1px; border-color: #808080 #FFFFFF #FFFFFF #808080;width:99%;height:99%"><DIV id="ZipCode" style=" BACKGROUND-COLOR:white;width:99%;height:99%"><br><div style="word-wrap:break-word; word-break:break-all; padding-right: 5px; padding-left: 5px">{0}</div></DIV></div>';
//当前编辑彩信帧Panel
var currMMSPanel;
/*****************************************************
 * Describe:当前彩信帧渲染
 * @param {Object} htmlString：彩信帧html字符串
 * @param {Object} title：彩信标题
 *****************************************************/
function currMMSPanelRender(htmlString, title){
    currMMSPanel.body.update(htmlString);
    if (title != null) {
        currMMSPanel.setTitle(title);
    }
    currMMSPanel.render();
};

//====================================================彩信播放
//播放时间
var playTime;
//当前播放帧数
var playCurrFrameNum = 0;
/*****************************************************
 * Describe:预览彩信
 * @param {Object} i：开始预览帧序号
 *****************************************************/
function previewMMS(i){
    if (i + 1 < currMMSPanel.contentJson.frame.length) {
        i = i + 1;
        playCurrFrameNum = i;
        //currMMSPanelRender(formatString(MMSFrameString, new Array(currMMSPanel.contentJson.frame[i].vc2image.vc2rescurl, currMMSPanel.contentJson.frame[i].vc2word.vc2rescdesc1)), formatString("播放：第{0}帧", new Array(i + 1, 1)));
        if (currMMSPanel.contentJson.frame[i].vc2image.vc2rescurl != "") {
            currMMSPanelRender(formatString(MMSFrameString, new Array(currMMSPanel.contentJson.frame[i].vc2image.vc2rescurl, currMMSPanel.contentJson.frame[i].vc2word.vc2rescdesc1.replace(/\r\n/ig, "<br/>"))), formatString("播放：第{0}帧", new Array(i + 1, 1)));
        }
        else {
            currMMSPanelRender(formatString(MMSNoImageFrameString, new Array(currMMSPanel.contentJson.frame[i].vc2word.vc2rescdesc1.replace(/\r\n/ig, "<br/>"))), formatString("播放：第{0}帧", new Array(i + 1, 1)));
        }
        currMMSPanel.refreshBrotherPanel(i);
        playTime = setTimeout(formatString("previewMMS({0})", new Array(i, 1)), currMMSPanel.contentJson.frame[i].numframetime.toLowerCase().replace('s','') * 1000);
    }
    else {
        if(currMMSPanel.bottomToolbar.items.items[0].text != "播放"){
            currMMSPanel.bottomToolbar.items.items[0].setText("播放");
            currMMSPanel.bottomToolbar.items.items[4].disable();
            currMMSPanel.bottomToolbar.items.items[8].disable();
            if (currMMSPanel.brotherPanel != null) {
                currMMSPanel.brotherPanel.enable();
            }
            
            currMMSPanel.refreshBrotherPanel();
            if (currMMSPanel.contentJson.frame[currMMSPanel.currFrame].vc2image.vc2rescurl != "") {
                currMMSPanelRender(formatString(MMSFrameString, new Array(currMMSPanel.contentJson.frame[currMMSPanel.currFrame].vc2image.vc2rescurl, currMMSPanel.contentJson.frame[currMMSPanel.currFrame].vc2word.vc2rescdesc1.replace(/\r\n/ig, "<br/>"))), formatString("预览：第{0}帧{1}, 共{2}", new Array(currMMSPanel.currFrame + 1, Ext.util.Format.fileSize(currMMSPanel.currFrameSpace), Ext.util.Format.fileSize(currMMSPanel.mmsSpace))));
            }
            else {
                currMMSPanelRender(formatString(MMSNoImageFrameString, new Array(currMMSPanel.contentJson.frame[currMMSPanel.currFrame].vc2word.vc2rescdesc1.replace(/\r\n/ig, "<br/>"))), formatString("预览：第{0}帧{1}, 共{2}", new Array(currMMSPanel.currFrame + 1, Ext.util.Format.fileSize(currMMSPanel.currFrameSpace), Ext.util.Format.fileSize(currMMSPanel.mmsSpace))));
            }
            window.clearInterval(playTime);
            
        }
        playCurrFrameNum = 0;
    }
};

//======================================================彩信帧列表
//彩信帧模板（有图片）
var MMSFrameSimpleStr = "<div style='display:table-cell;height:100px;width:100px;vertical-align:middle;'><img src={0} style='max-width:100px;max-height:100px;_width:100px;' /><div>";
//彩信帧模板（无图片）
var MMSFrameSimpleStrNoImage = '<div style="text-align:center;"><table width="100" height="80" border="0" align="center" cellpadding="0" cellspacing="0" background="jspack/product/common/Images/frame.gif"><tr><td></td></tr></table></div>';
/*****************************************************
 * Describe:新创建彩信
 * @param {Object} mmsName：彩信名称
 * @param {Object} mmsDesc：彩信描述
 * @param {Object} frameCount：帧总数
 * @param {Object} mmsType：彩信类型
 *****************************************************/
function newMMS(mmsName, mmsDesc, frameCount, mmsType){
    //创建彩信初始信息
    if (mmsDesc != null && mmsDesc != '' && mmsDesc != "undefined") {
        if (Ext.isIE == true) {
            mmsDesc = mmsDesc.replace(/\r\n/ig, "\\r\\n").replace(/\'/ig, "\\'");
        }
        else {
            mmsDesc = mmsDesc.replace(/\n/ig, "\\n").replace(/\'/ig, "\\'");
        }
        
    }
    mmsName = mmsName.replace(/\'/ig, "\\'");
    var frameJsonStr = "";
    for (var i = 1; i <= frameCount; i++) {
        if (frameCount != 1) {
			if (i == 1) {
				frameJsonStr = "frame: [{numframeid: 0,numframeorder:  " + i + ",vc2framename:'',vc2framedesc:'',numframetime: 5,vc2word: {numrescid: 0,numframeid: 0,vc2rescurl: '',vc2rescname: '',numtype: 3,numrescspace: 0,vc2rescdesc1: '',vc2rescdesc2: ''},vc2image: {numrescid: 0,numframeid: 0,vc2rescurl: '',vc2rescname: '',numtype: 2,numrescspace: 0,vc2rescdesc1: 0,vc2rescdesc2: 0},vc2backmusic: {numrescid: 1,numframeid: 1,vc2rescurl: '',vc2rescname: '',numtype: 1,numrescspace: 0,vc2rescdesc1: '',vc2rescdesc2: ''}}";
			}
			else {
				if (i == frameCount) {
					frameJsonStr = frameJsonStr + ",{numframeid: 0,numframeorder: " + i + ",vc2framename:'',vc2framedesc:'',numframetime: 5,vc2word: {numrescid: 0,numframeid: 0,vc2rescurl: '',vc2rescname: '',numtype: 3,numrescspace: 0,vc2rescdesc1: '',vc2rescdesc2: ''},vc2image: {numrescid: 0,numframeid: 0,vc2rescurl: '',vc2rescname: '',numtype: 2,numrescspace: 0,vc2rescdesc1: 0,vc2rescdesc2: 0},vc2backmusic: {numrescid: 1,numframeid: 1,vc2rescurl: '',vc2rescname: '',numtype: 1,numrescspace: 0,vc2rescdesc1: '',vc2rescdesc2: ''}}]";
				}
				else {
					frameJsonStr = frameJsonStr + ",{numframeid: 0,numframeorder: " + i + ",vc2framename:'',vc2framedesc:'',numframetime: 5,vc2word: {numrescid: 0,numframeid: 0,vc2rescurl: '',vc2rescname: '',numtype: 3,numrescspace: 0,vc2rescdesc1: '',vc2rescdesc2: ''},vc2image: {numrescid: 0,numframeid: 0,vc2rescurl: '',vc2rescname: '',numtype: 2,numrescspace: 0,vc2rescdesc1: 0,vc2rescdesc2: 0},vc2backmusic: {numrescid: 1,numframeid: 1,vc2rescurl: '',vc2rescname: '',numtype: 1,numrescspace: 0,vc2rescdesc1: '',vc2rescdesc2: '第" + i + "帧'}}";
				}
			}
		}
		else {
			frameJsonStr = "frame: [{numframeid: 0,numframeorder:  " + i + ",vc2framename:'',vc2framedesc:'',numframetime: 5,vc2word: {numrescid: 0,numframeid: 0,vc2rescurl: '',vc2rescname: '',numtype: 3,numrescspace: 0,vc2rescdesc1: '',vc2rescdesc2: ''},vc2image: {numrescid: 0,numframeid: 0,vc2rescurl: '',vc2rescname: '',numtype: 2,numrescspace: 0,vc2rescdesc1: 0,vc2rescdesc2: 0},vc2backmusic: {numrescid: 1,numframeid: 1,vc2rescurl: '',vc2rescname: '',numtype: 1,numrescspace: 0,vc2rescdesc1: '',vc2rescdesc2: ''}}]";
		}
	};
    var mmsJsonStr = formatString("{nummmsid: 0,vc2centerid: '',vc2name: '{0}',vc2desc: '{1}',vc2smilurl: '',nummmstype:{2},{3}}", new Array(mmsName, mmsDesc, mmsType, frameJsonStr));
    return eval("(" + mmsJsonStr + ")");
};

//=====================================================判断彩信中是否有空帧
/*****************************************************
 * Describe:判断彩信中是否有空帧，判断彩信大小不超过50K
 * @param {Object} jsonMMSContent：彩信json字符创
 *****************************************************/
function checkMMS(jsonMMSContent){
    var returnResault = true;
    var numMMSSpace = 0;
    for (var i = 0; i < jsonMMSContent.frame.length; i++) {
        numMMSSpace = numMMSSpace + parseInt(jsonMMSContent.frame[i].vc2word.numrescspace) + parseInt(jsonMMSContent.frame[i].vc2image.numrescspace) + parseInt(jsonMMSContent.frame[i].vc2backmusic.numrescspace);
        if (jsonMMSContent.frame[i].vc2word.numrescspace == 0 && jsonMMSContent.frame[i].vc2image.numrescspace == 0 && jsonMMSContent.frame[i].vc2backmusic.numrescspace == 0) {
            returnResault = false;
            Ext.Msg.alert("温馨提示", "对不起，当前彩信包含未编辑的帧信息，请检查!");
            return returnResault;
        }
    }
    if (numMMSSpace > 50 * 1024) {
        returnResault = false;
        Ext.Msg.alert("温馨提示", "对不起，彩信大小不能超过50K!");
        return returnResault;
    }
    return returnResault;
};


/*****************************************************
 * Describe:判断彩信帧是否是空帧（图片和文字至少有一项）
 * @param {Object} isNeedImage:是否需要图片
 * @param {Object} vc2FrameImageUrl：帧原始图片
 * @param {Object} vc2Word：帧文字
 * @param {Object} vc2ImageUrl：新的图片
 *****************************************************/
function checkMMSFrame(isNeedImage, vc2FrameImageUrl, vc2Word, vc2ImageUrl){
    if (isNeedImage) {
        if (vc2Word == "") {
            Ext.Msg.alert("温馨提示", "对不起,图片和文字请至少输入一项!");
            return false;
        }
        else {
            return true;
        }
    }
    else {
        if (vc2FrameImageUrl == "" && vc2Word == "" && vc2ImageUrl == "" && !isNeedImage) {
            Ext.Msg.alert("温馨提示", "对不起,图片和文字请至少输入一项!");
            return false;
        }
        else {
            return true;
        }
    }
    
};



//==图片文件类型
var imageFileTypeArr = new Array();
imageFileTypeArr[0] = "jpg";
imageFileTypeArr[1] = "gif";
imageFileTypeArr[2] = "png";
imageFileTypeArr[3] = "bmp";
imageFileTypeArr[4] = "jpeg";
/*****************************************************
 * Describe:判断上传图片文件类型
 * @param {Object} filePath:上传图片路径
 *****************************************************/
function checkImageFileType(filePath){
    var suffix = getFileType(filePath);
    if (!in_array(suffix.toLowerCase(), imageFileTypeArr)) {
        return false;
    }
    else {
        return true;
    }
};

/*****************************************************
 * Describe:判断彩信帧图片类型是否正确
 * @param {Object} isNeedImage:是否需要图片
 * @param {Object} vc2ImageUrl:新的图片路径
 *****************************************************/
function checkMMSFrameImageType(isNeedImage, vc2ImageUrl){
    if (!isNeedImage) {
        if (!checkImageFileType(vc2ImageUrl)) {
            Ext.Msg.alert("温馨提示", "对不起,帧图片只能上传jpg|gif|jpeg|bmp|png文件类型");
            return false;
        }//不是正确的图片类型
    }
    return true;
};

//==彩信音乐文件类型
var MusicFileTypeArr = new Array();
MusicFileTypeArr[0] = "mid";
MusicFileTypeArr[1] = "amr";

/*****************************************************
 * Describe:判断上传背景音乐文件类型
 * @param {Object} filePath:上传背景音乐路径
 *****************************************************/
function checkMusicFileType(filePath){
    var suffix = getFileType(filePath);
    if (!in_array(suffix.toLowerCase(), MusicFileTypeArr)) {
        return false;
    }
    else {
        return true;
    }
};

/*****************************************************
 * Describe:判断彩信帧背景音乐类型是否正确
 * @param {Object} isNeedImage:是否需要背景音乐
 * @param {Object} vc2ImageUrl:新的背景音乐路径
 *****************************************************/
function checkMMSFrameMusicType(isNeedMusic, vc2MusicUrl){
    if (!isNeedMusic) {
        if (!checkMusicFileType(vc2MusicUrl)) {
            Ext.Msg.alert("温馨提示", "对不起,帧背景音乐只能上传mid|amr文件类型");
            return false;
        }//不是正确的音乐类型
    }
    return true;
};


//===================================================检测代码中是否存在HTML标签
/*****************************************************
 * Describe:检测代码中是否存在HTML标签
 * @param {Object} sourceHTML:需要检查的代码字符串
 *****************************************************/
function isExistsHtmlLable(sourceHTML){
    var arrElement = sourceHTML.match('<[^#]*>');//取出所有的<....>格式的字串======'/<[/|A-Za-z]+>/ig'
    if (arrElement == null) {
        return false;
    }//如果为空则返回false（不存在）
    if (arrElement.length > 0) {
        //Ext.Msg.alert("温馨提示", "对不起,帧文字中不能含有HTML标签");
        return true;
    }//存在
    return false;
};


function in_array(stringToSearch, arrayToSearch){
    for (var s = 0; s < arrayToSearch.length; s++) {
        thisEntry = arrayToSearch[s].toString();
        if (thisEntry == stringToSearch) {
            return true;
        }
    }
    return false;
};

/*===================================================
 * 创建角色授权树
 ====================================================== */
function createPeimitTree(treeId, roleId, dataURL){
    document.getElementById(treeId).innerHTML = '';
    Ext.get(treeId).dom.innerHTML = '';
    PermissionTree = new Ext.tree.TreePanel({
        applyTo: treeId,
        checkModel: 'cascade',//'parentCascade', //对树的级联多选   
        onlyLeafCheckable: false,//对树所有结点都可选   
        style: 'padding:5px 10px 10px 10px',
        animate: false,
        rootVisible: true,
        autoScroll: true,
        loader: new Ext.tree.TreeLoader({
            url: dataURL,//Js.Center.Purview.RightURL,
            listeners: {
                "beforeload": function(treeloader, node){
                    treeloader.baseParams = {
                        flag: 'selectbyroleid',
                        RoleID: roleId,//row.get("numroleid"),
                        parentid: node.id,
                        method: 'Post'
                    };
                },
                "load": function(loader, node, response){
                    var childNodes = node.childNodes;
                    if (childNodes || childNodes.length > 0) {
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
                        
                    }
                    for (var i = 0; i < childNodes.length; i++) {
                        if (i == childNodes.length - 1) {
                            setTimeout(function(){
                                Ext.MessageBox.hide();
                            }, 3000);
                        }
                    }
                }
            },
            baseAttrs: {
                uiProvider: Ext.ux.TreeCheckNodeUI
            }
        }),
        root: new Ext.tree.AsyncTreeNode({
            id: '-1',
            text: '无线天利短信发送平台'
        })
    });
    // PermissionTree.getEl().center();   
    //展开所有节点
    PermissionTree.expandAll();
};

/*===================================================
 * 取得一个节点的所有子节点
 * 包括本节点
 ====================================================== */
function getAllChildrenNodes(node){
    var children = [];
    children.push(node);
    if (!node.isLeaf()) {
        for (var i = 0; i < node.childNodes.length; i++) {
            children = children.concat(getAllChildrenNodes(node.childNodes[i]));
        }
    }
    return children;
};
//加载等待Loading界面
WXTL.Common.WaitLoadMsg = null;
WXTL.Common.showWaitLoading = function(ishow){
    if (ishow) {
        document.body.style.cursor = "wait";
        WXTL.Common.WaitLoadMsg = new Ext.LoadMask(Ext.getBody(), {
            msg: '正在加载数据，请稍候...',
            removeMask: true //完成后移除
            //store:store
        });
        WXTL.Common.WaitLoadMsg.show();
    }
    else {
        document.body.style.cursor = "default";
        WXTL.Common.WaitLoadMsg.hide();
    }
};

/*************************************************************
 * Describe: 获取SessionID
 **************************************************************/
function getSessionID(){
    var conn = Ext.lib.Ajax.getConnectionObject().conn;
    conn.open("POST", "/url/GetSession.ashx", false);
    conn.send('');
    var response = conn.responseText;
    
    if (response != null) {
        if (response.indexOf("没有登录") > 0) {
            Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
                window.location.href = "login.htm";
            });
        }
        else {
            return response;
        }
        
    }
    else {
        Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
            window.location.href = "login.htm";
        });
    }
    //return "b0zp1q454in5lb55f23bi345";
};



function getTimeDiff(date1, date2, isFormat){
	try {    
        var len = arguments.length;        
        var tmpdate1 = new Date();        
        var tmpdate2 = new Date();        
        if (len == 1) {
			tmpdate1 = date1;
		}
		else {
			if (len == 3) {
				tmpdate1 = date1;
				tmpdate2 = date2;
			}
		}
        if (!(tmpdate1 instanceof Date) || !(tmpdate2 instanceof Date)) {        
            alert("请输入正确的参数！");            
            return 0;            
        }
        else {        
            var time1 = tmpdate1.getTime();            
            var time2 = tmpdate2.getTime();            
            var time = Math.max(time1, time2) - Math.min(time1, time2);            
            if (!isNaN(time) && time > 0) {            
                if (isFormat) {                
                    var date = new Date(time);                    
                    var result = "";                    
                    result += (date.getFullYear() - 1970) > 0 ? (date.getFullYear() - 1970) + "年" : "";                    
                    result += (date.getMonth() - 1) > 0 ? (date.getMonth() - 1) + "月" : "";                    
                    result += (date.getDate() - 1) > 0 ? (date.getDate() - 1) + "日" : "";                    
                    result += (date.getHours() - 8) > 0 ? (date.getHours() - 1) + "小时" : "";                    
                    result += date.getMinutes() > 0 ? date.getMinutes() + "分钟" : "";                    
                    result += date.getSeconds() > 0 ? date.getSeconds() + "秒" : "";                    
                    return result;                    
                }
                else {                
                    return time;                    
                }                
            }
            else {            
                return '0秒';                
            }            
        }        
    } 
    catch (e) {    
        alert(e.message);        
    }    
};

/*
 * 动态生成配置项页面
 */
WXTL.Common.generateConfigFormItem = function(configData,formPanel,isColumn){
	var item;
	if(!configData.success && configData.info == "对不起，您没有登录！"){
		Ext.Msg.alert("温馨提示", "对不起，您的信息已过期请重新登录!", function(){
            window.location.href = "login.htm";
        });
	}
	else{
		for(var i=0; i<configData.data.length;i++){
			//判断配置表中是否有值，如果没有配置项的值显示默认值
			var _value = configData.data[i].itemvalue != ""?configData.data[i].itemvalue:configData.data[i].vc2value;
			//根据不同类型创建不同控件
			if(configData.data[i].numtypeid == 1 || configData.data[i].numtypeid == 5 || configData.data[i].numtypeid == 6|| configData.data[i].numtypeid == 7|| configData.data[i].numtypeid == 8){
				item = new Ext.form.TextField({
					fieldLabel: configData.data[i].vc2name,
					name:configData.data[i].vc2key,
					value:_value,
					maxLength:configData.data[i].vc2range
				});
			}
			if(configData.data[i].numtypeid == 2){
				//获取配置项范围
				var range;
				if(configData.data[i].vc2range != ""){
					range = configData.data[i].vc2range.split(",");
				}
				item = new Ext.form.NumberField({
					fieldLabel:configData.data[i].vc2name,
					name:configData.data[i].vc2key,
					value:_value,
					minValue:range[0],
					maxValue:range[1]
				});
				//formPanel.add(item);
			}
			if(configData.data[i].numtypeid == 3){
				item = new Ext.form.TextArea({
					fieldLabel:configData.data[i].vc2name,
					name:configData.data[i].vc2key,
					value:_value,
					maxLength:configData.data[i].vc2range,
					height:100
				});
				//formPanel.add(item);
			}
			if(configData.data[i].numtypeid == 4){
				item = new Ext.form.DateField({
					fieldLabel:configData.data[i].vc2name,
					name:configData.data[i].vc2key,
					value:WXTL.Common.dateTime.parseDate(_value),
					readOnly: true,
					emptyText: Ext.util.Format.date(WXTL.Common.dateTime.addDay(WXTL.Common.dateTime.getNow()), 'Y-m-d'),
					format: 'Y-m-d',
					validateOnBlur: false
				});
				//formPanel.add(item);
			}
			if(configData.data[i].numtypeid == 9){
				item = new Ext.form.ComboBox({
					fieldLabel:configData.data[i].vc2name,
					name:configData.data[i].vc2key,
					hiddenName: configData.data[i].vc2key,
					value:_value,
					readOnly: true,
					mode: "local",
					displayField: "show",
					valueField: "value",
					triggerAction: "all",
					emptyText: "请选择",
					store: new Ext.data.SimpleStore({
						fields: ["show", "value"],
						data:eval(configData.data[i].vc2range)
					})
				});
				//formPanel.add(item);
			}
    	
			if(!isColumn){
				formPanel.add(item);
			}
			else{
				formPanel.items.items[0].add({
					columnWidth: .5,
					layout: 'form',
					defaultType: "textfield",
					//锚点布局-
					defaults: {
						anchor: "90%",
						msgTarget: "side"
					},
					buttonAlign: "center",
					//bodyStyle: "padding:10px 0 10px 15px",
					items:[item]
				});
			}
		}
	}
};


