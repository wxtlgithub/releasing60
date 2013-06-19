<?xml version="1.0" encoding="GBK"?>
<ecVerifys>
<#if PrePaidList?size != 0>
<#list PrePaidList as baseClt>
	<ecVerify clientId="0" productId="${baseClt["NUMPRODID"]?if_exists}" ecId="${baseClt["NUMECID"]?if_exists}"  desc="${baseClt["VC2CLIENTNAME"]?if_exists}">
		<property name="state" >${baseClt["NUMOVER"]?if_exists}</property>
	</ecVerify>
	<ecVerify clientId="1" productId="${baseClt["NUMPRODID"]?if_exists}" ecId="${baseClt["NUMECID"]?if_exists}"  desc="${baseClt["VC2CLIENTNAME"]?if_exists}">
		<property name="state" >${baseClt["NUMOVER"]?if_exists}</property>
	</ecVerify>
	<#if baseClt.NUMCLIENTID ??>
	<ecVerify clientId="${baseClt["NUMCLIENTID"]?if_exists}" productId="${baseClt["NUMPRODID"]?if_exists}" ecId="${baseClt["NUMECID"]?if_exists}"   desc="${baseClt["VC2CLIENTNAME"]?if_exists}">
		<property name="state" >${baseClt["NUMOVER"]?if_exists}</property>
	</ecVerify>	
	</#if>

</#list>
</#if>
</ecVerifys>