<?xml version="1.0" encoding="GBK"?>
<clientVerifys>
<#if ClientList?size != 0>
<#list ClientList as baseClt>
	<clientVerify ecId="${baseClt["NUMECID"]?if_exists}" clientName="${baseClt["VC2CLIENTNAME"]?if_exists}">
		<#if baseClt["NUMSIGNTYPEID"]==1>
		<signatures>${baseClt["VC2SIGNTURE1"]?if_exists}</signatures>
		<wide></wide>
		<noSignatures></noSignatures>
		</#if> 
		<#if baseClt["NUMSIGNTYPEID"]==2>
		<signatures></signatures>
		<wide>${baseClt["VC2SIGNTUREWIDE"]?if_exists}</wide>
		<noSignatures></noSignatures>
		</#if> 
		<#if baseClt["NUMSIGNTYPEID"]==3>
		<signatures></signatures>
		<wide></wide>
		<noSignatures>true</noSignatures>
		</#if> 
	</clientVerify>
</#list>
</#if>
</clientVerifys>