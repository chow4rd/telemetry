import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';

function LineChart({ getData,  chartName, xAxisName, yAxisName }) {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const data = getData ? getData.split(',').map(Number): [];

    const options = {
      chart: {
        type: 'line'
      },
      accessibility: {
        enabled: false
      },
      title: {
        text: chartName
      },
      xAxis: {
        type: 'categories',
        scrollbar: {
          enabled: true,
          liveRedraw: false
        },
        categories: Array.from({ length: data.length }, (_, i) => i + 1),
      },
      yAxis: {
        title: {
          text: yAxisName,
        },
      },
      series: [
        {
          name: xAxisName,
          data: data,
        },
        {
          type: 'line',
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

export default LineChart;