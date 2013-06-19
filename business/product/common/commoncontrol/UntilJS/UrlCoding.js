/**
 * @YSX 2009-04-14
 * URL±àÂë URL½âÂë
 */
Ext.namespace('JS.UntilJS.URL');
WXTL.Common.urlDecode=function(str)//±àÂë
{
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
}



WXTL.Common.urlEncode=function(str)//url±àÂë
{
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
}

