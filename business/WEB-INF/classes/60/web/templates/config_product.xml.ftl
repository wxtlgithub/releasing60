<?xml version="1.0" encoding="GBK"?>
<productVerifys>
<#if ClientList?size != 0>
    <#list ClientList as baseClt>
		<productVerify clientId="${baseClt["NUMCLIENTID"]?if_exists}">
			<#if baseClt.NUMCLIENTID=="0">
				<#list ProductList as basePro>
				<productId>${basePro["NUMPRODID"]?if_exists}</productId>
				</#list>
			</#if> 
			<#if baseClt.NUMCLIENTID=="1">
				<#list ProductList as basePro>
				<productId>${basePro["NUMPRODID"]?if_exists}</productId>
				</#list>
			</#if>
			<#list ProductListData as baseProData>
					<#if baseClt.NUMCLIENTID=baseProData.NUMCLIENTID>
						    <#if baseClt.NUMCLIENTID!="0">
						    	<#if baseClt.NUMCLIENTID!="1">
				<productId>${baseProData["NUMPRODID"]?if_exists}</productId>
								</#if>
							</#if>
					</#if>
			</#list>
		</productVerify>
    </#list>
</#if>
</productVerifys>