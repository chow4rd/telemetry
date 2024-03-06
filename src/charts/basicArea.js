import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';

function BasicAreaChart({ getData,  chartName, xAxisName, yAxisName }) {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        const data = getData ? getData.split(',').map(Number): [];

        const options = {
            chart: {
                type: 'area'
            },
            title: {
                text: chartName,
            },
            xAxis: {
                type: 'categories',
                accessibility: {
                    rangeDescription: xAxisName
                },
                categories: Array.from({ length: data.length }, (_, i) => i + 1),
            },
            yAxis: {
                title: {
                    text: yAxisName
                }
            },
            plotOptions: {
                area: {
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                    }
                }
            },
            series: [
                {
                    name: xAxisName,
                    data: data,
                },
                {
                    data: data,
                    showInLegend: false,
                    enableMouseTracking: false,
                    color: 'transparent',
                }
            ]
        };

        Highcharts.chart(chartContainerRef.current, options);
    }, [getData, chartName, xAxisName, yAxisName]);

    return (
        <div>
            <div ref={chartContainerRef}></div>
        </div>
    );
}

export default BasicAreaChart;