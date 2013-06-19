<?xml version="1.0" encoding="GBK"?>
<deliverRouters> 
<#if deRouters?size!=0>
 	<#list deRouters as base>
	 	<deliverRouter longCode="${base["VC2LONGCODE"]}" 
	 	gatewayId="${base["NUMGWID"]}" keyWord="${base["VC2CMD"]}"> 
	    <!--长号码匹配规则 1精确 0模糊-->  
	    <lcCheckFlag>${base["VC2LCMATCH"]}</lcCheckFlag>  
	    <!--关键字匹配规则 1精确 0模糊 -->  
	    <kwCheckFlag>${base["VC2CMDMATCH"]}</kwCheckFlag>  
	    <!--手机所属运营商编号 1 移动 2联通 3 电信 -->  
	    <operatorId>${base["NUMOPID"]}</operatorId>  
	    <!--手机所属省编号-->  
	    <provinceId>0</provinceId>  
	    <!--目的客户编号-->  
	    <coagentId>${base["NUMRPGMID"]}</coagentId>  
	    <!--消息类型 1 订购 0 退订-->  
	    <messageType>2</messageType>  
	    <!--处理订购上行的程序编号-->  
	    <orderId>${base["NUMRPGMID"]}</orderId>  
	    <!--业务代码编号-->  
	    <serviceCodeId>${base["NUMSVCID"]}</serviceCodeId>  
	    <!--产品编号-->  
	    <productId>0</productId> 
	  </deliverRouter> 
 	 </#list>
</#if>
</deliverRouters>