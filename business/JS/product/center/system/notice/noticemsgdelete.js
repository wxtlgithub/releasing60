Ext.namespace('Js.Center.System.Notice.noticemsg.infoDelete');

Js.Center.System.Notice.noticemsg.infoDelete.func = function(row){
    var _vc2bulletin = row[0].data.vc2bulletin;
    var _vc2filepath = row[0].data.vc2filepath;
    var _numuserid = row[0].data.numuserid;
    var _datcreatetime = row[0].data.datcreatetime;
    var _numseqid = row[0].data.numseqid;
    var params = {
    		vc2bulletin: _vc2bulletin,
    		vc2filepath:_vc2filepath,
    		numuserid:_numuserid,
    		datcreatetime:_datcreatetime,
    		numseqid : _numseqid,
    		flag: "delete"
    };

    doAjax(Js.Center.System.NoticeOperatorURL, params, Js.Center.System.Notice.noticemsg.info.Infostore);
    
    
};
