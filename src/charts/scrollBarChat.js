import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function LineChartWithScrollbar({ getData }) {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const data = getData && getData.split(',').map(Number);

    const options = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Line Chart with Scrollbar'
      },
      xAxis: {
        type: 'categories',
        scrollbar: {
          enabled: true,
          liveRedraw: false
        },
        categories: Array.from({ length: data.length }, (_, i) => i + 1)
      },
      yAxis: {
        title: {
          text: 'Speed'
        }
      },
      series: [
        {
          name: 'Time (milliseconds)',
          data: data
        },
        {
          type: 'line',
          data: data,
          showInLegend: false,
          enableMouseTracking: false,
          color: 'transparent'
        }
      ]
    };

    Highcharts.chart(chartContainerRef.current, options);
  }, [getData]);

  return (
    <div>
      <div ref={chartContainerRef}></div>
    </div>
  );
}

export default LineChartWithScrollbar;