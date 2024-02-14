import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';

function BarChart({ getData,  chartName, chartType, xAxisName, yAxisName }) {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        const data = getData ? getData.split(',').map(Number): [];

        const options = {
            chart: {
                type: 'bar'
            },
            title: {
                text: chartName,
                align: 'left'
            },
            xAxis: {
                type: 'categories',
                title: {
                    text: xAxisName,
                },
                scrollbar: {
                    enabled: true,
                    liveRedraw: false
                },
                categories: Array.from({ length: data.length }, (_, i) => i + 1),
            },
            yAxis: {
                min: 0,
                title: {
                    text: yAxisName,
                },
                labels: {
                    overflow: 'justify'
                },
                gridLineWidth: 0
            },
            plotOptions: {
                bar: {
                    borderRadius: '50%',
                    dataLabels: {
                        enabled: true
                    },
                    groupPadding: 0.1
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                type: 'line',
                data: data,
                showInLegend: false,
                enableMouseTracking: false,
                color: 'transparent',
            }]
        };

        Highcharts.chart(chartContainerRef.current, options);
    }, [getData, chartName, xAxisName, yAxisName]);

    return (
        <div>
            <div ref={chartContainerRef}></div>
        </div>
    );
}

export default BarChart;