import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';

function BasicColumn({ getData,  chartName, xAxisName, yAxisName }) {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        const data = getData ? getData.split(',').map(Number): [];

        const options = {
            chart: {
                type: 'column'
            },
            title: {
                text: chartName
            },
            xAxis: {
                crosshair: true,
                accessibility: {
                    description: xAxisName
                },
                categories: Array.from({ length: data.length }, (_, i) => i + 1),
            },
            yAxis: {
                min: 0,
                title: {
                    text: yAxisName
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
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

export default BasicColumn;