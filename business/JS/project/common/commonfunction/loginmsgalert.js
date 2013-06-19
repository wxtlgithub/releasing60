function otherLogin(){
    Ext.Ajax.request({
        url: "URL/userLogin.ashx",
        method: "POST",
        params: {
            flag: "check"
        },
        success: function(form, action) {
            var obj = Ext.util.JSON.decode(form.responseText);
	    	if(obj.info == 'otherLogin'){
		    	Ext.Msg.confirm("温馨提示", "您已被其他用户踢出,是否跳转回首页", 
		    		function(btn){
		    			if(btn == "yes"){
		    				window.location.href='login.htm';
		    			} else if(btn == "no"){
    						clearInterval(timer);
		    			}
		    		}
	    		);
	    	}
        }
    });
};
var timer = setInterval(otherLogin, 5000);