	<node>
		<id>${numnodeId}</id>
		<name>${nodeName}</name>
		<ip>${IP}</ip>
		<port>${distriPort}</port>
		<url>http://${IP}:${tomcatPort}/${projectName}/cmd.ashx</url>
		<isMain>${isMain}</isMain>
		<isLocal>${isLocal}</isLocal>
		<taskListSchedule>
			<function>
				<id>11</id>
				<name>task1</name>
				<bean>task1</bean>
				<config key="config" desc="配置">
				<![CDATA[ 
				<function id="11" name="task1" desc="task1" bean="Task1">
					<item key="isLoadFileLog" value="0" desc="是否导出文件日志.0不导出，1导出" />
					<item key="maxNum" value="10000" desc="一次最大处理条数" />
					<item key="taskSchRule" value="@{cycle(5)}" desc="执行规则" />
				</function>
				]]>
				</config>
			</function>
			<function>
				<id>12</id>
				<name>task2</name>
				<bean>task2</bean>
				<config key="config" desc="配置">
				<![CDATA[ 
				<function id="12" name="task2" desc="task2" bean="Task1">
					<item key="isLoadFileLog" value="0" desc="是否导出文件日志.0不导出，1导出" />
					<item key="maxNum" value="10000" desc="一次最大处理条数" />
					<item key="taskSchRule" value="@{cycle(5)}" desc="执行规则" />
				</function>
				]]>
				</config>
			</function>
		</taskListSchedule>
		<moduleList>
			<function>
			<#global dynode = nodeId>
			<#if nodeId="35">
				<#global dynode = "54">
			</#if>
			<#if nodeId="23">
				<#global dynode = "03">
			</#if>
			<#if nodeId="24">
				<#global dynode = "04">
			</#if>
			<id>10${dynode}</id>
			<name>psModule10${dynode}</name>
			<bean>psModule10${dynode}</bean>
			<type>PS</type>
			<isprepaid>true</isprepaid>
			<config key="config" desc="配置"></config>
			</function>
			<function>
			<id>16${dynode}</id>
			<name>psModule16${dynode}</name>
			<bean>psModule16${dynode}</bean>
			<type>PS</type>
			<isprepaid>true</isprepaid>
			<config key="config" desc="配置"></config>
			</function>
			<#if nodeId="22">
				<#global dynode = "02">
			</#if>
			<function>
				<id>11${dynode}</id>
				<name>mtpModule11${dynode}</name>
				<bean>mtpModule11${dynode}</bean>
				<type>MTP</type>
				<config></config>
			</function>
			<function>
				<id>13${dynode}</id>
				<name>rptModule13${dynode}</name>
				<bean>rptModule13${dynode}</bean>
				<type>RPTP</type>
				<config></config>
			</function>
			<function>
				<id>14${dynode}</id>
				<name>mopModule14${dynode}</name>
				<bean>mopModule14${dynode}</bean>
				<type>MOP</type>
				<config key="config" desc="配置">
				<![CDATA[ 
				]]>
				</config>
			</function>
			<function>
				<id>15${dynode}</id>
				<name>clumpedModule15${dynode}</name>
				<bean>clumpedModule15${dynode}</bean>
				<type>DISTRIBUTE</type>
				<config></config>
			</function>
			<#if nodeId="23">
				<#global dynode = nodeId>
			</#if>
			<#if nodeId="24">
				<#global dynode = nodeId>
			</#if>
			<#if gatewayList?size != 0>
			<#list gatewayList as gw>
			<function>
				<id>${nodeId}${gw["NUMGWID"]}</id>
				<name>mtsGatewayModule${dynode}${gw["NUMGWID"]}</name>
				<bean>mtsGatewayModule${dynode}${gw["NUMGWID"]}</bean>
				<type>MTS</type>
				<config></config>
			</function>
			</#list>
			</#if>
		</moduleList>
		<functionModuleList>
			<function>
				<id>102</id>
				<name>module2</name>
				<bean>module2</bean>
				<config key="config" desc="配置">
				<![CDATA[ 
				<function id="102" name="module1" desc="module2" bean="module2">
					<item key="isLoadFileLog" value="0" desc="是否导出文件日志.0不导出，1导出" />
					<item key="maxNum" value="10000" desc="一次最大处理条数" />
				</function>
				]]>
				</config>
			</function>
		</functionModuleList>
	</node>