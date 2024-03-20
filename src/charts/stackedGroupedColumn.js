import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';

function StackedGroupColumn({ getData,  chartName, xAxisName, yAxisName }) {
    const chartContainerRef = useRef(null);
    useEffect(() => {
        const data = getData ? getData.split(',').map(Number): [];

        const options = {
            
        }
        Highcharts.chart(chartContainerRef.current, options);
    }, [getData, chartName, xAxisName, yAxisName]);
}
