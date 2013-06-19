Ext.namespace('Js.Center.Statistics.ChannelStatisticsDay');
            sortInfo: {
                field: 'vc2svcname',
                direction: 'DESC'
            },
                limit: _pageSize,
            params: {
                datstarttime: '',
            }
        });
			needPage:false,
            validator: function(){
            var strat_time = Ext.get("smsstatisticsDayStartDateId").dom.value;
            var end_time = Ext.get("smsstatisticsDayEndDateId").dom.value;
            if (strat_time <= end_time) {
                return true;
            }
            else {
                return false;
            }
            },
            invalidText: '结束时间不能小于开始时间！'