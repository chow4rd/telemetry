import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';

function LineChart({ dataList, chartName, xAxis, yAxis, triggerRender }) {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const seriesData = dataList;

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
      },
      yAxis: {
        title: {
          text: yAxis,
        },
      },
      series: [
        ...seriesData.map((item, index) => (
        {
        name: index.toString(),
        data: item,
        type: 'line',
      }
      )),
      ]
    };
    Highcharts.chart(chartContainerRef.current, options);
  }, [dataList, chartName, xAxis, yAxis, triggerRender]);

  return (
    <div>
      <div ref={chartContainerRef}></div>
    </div>
  );
}

export default LineChart;