import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function LineChartWithScrollbar(getData) {
  useEffect(() => {
    const data = getData && getData.getData ? getData.getData.split(',').map(Number).slice(1) : [];

    // Configuration options for the chart
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
          enabled: true, // Enable the scrollbar
          liveRedraw: false // Set this to false for smoother scrolling
        },
        categories: Array.from({ length: data.length }, (_, i) => `${i + 1}`)
      },
      yAxis: {
        title: {
          text: 'Speed'
        }
      },
      series: [{
        name: 'Time (milliseconds)',
        data: data
      },

      {type: 'line',
      data: data,
      showInLegend: false,
      enableMouseTracking: false,
      color: 'transparent' // Add a transparent series to create a timeline effect
    } ]
    };

    // Render the chart
    Highcharts.chart('chartContainer', options);
  }, [getData]);

  return (
    <div id="chartContainer">
      <HighchartsReact
        highcharts={Highcharts}
        options={{}}
      />
    </div>
  );
}

export default LineChartWithScrollbar;