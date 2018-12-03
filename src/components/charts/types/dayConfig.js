import moment from 'moment';

/**
 * Get HighChart config
 * @param from
 * @param to
 * @returns {*}
 */
export const buildDayChartConfig =
  (from, to) => {
    return {
      chart: {
        type: 'area',
        spacingBottom: 20,
        spacingTop: 20,
        zoomType: 'x'
      },
      title: {
        text: 'Day'
      },
      xAxis: [
        {
          crosshair: true,
          type: 'datetime',
          tickLength: 5,
          labels: {
            y: 15,
            formatter() {
              return moment.utc(this.value).format('HH:mm')
            },
            useHTML: true,
            style: {
              fontSize: '12px',
              fontFamily: 'proxima-nova,helvetica,arial,sans-seri',
              whiteSpace: 'nowrap',
              paddingLeft: '10px',
              paddingRight: '10px',
              paddingTop: '10px',
              paddingBottom: '10px',
            }

          }
        },
      ],
      yAxis: {
        crosshair: true,
        min: 0,
        title: null,
        startOnTick: false,
        labels: {
          enabled: false
        }
      },
      legend: {
        enabled: true,
        y: 5,
        itemStyle: {
          color: '#000',
          fontSize: '12px'
        }

      },
      credits: {
        enabled: false
      },
      tooltip: {
        shape: 'square',
        animation: false,
        shared: true,
        useHTML: true,
        shadow: false
      },
      plotOptions: {
        area: {
          marker: {
            enabled: false,
            radius: 2,
            symbol: 'circle'
          }
        },
        column: {
          grouping: false,
          pointPadding: 0,
          groupPadding: 0
        },
        stickyTracking: false
      },
      series: [
        {
          colorIndex: 1,
          name: 'Yesterday',
          data: from,
          className: 'yesterday',
          animation: {duration: 500}
        },
        {
          colorIndex: 0,
          name: 'Today',
          className: 'today',
          data: to,
          animation: {duration: 500}
        },
      ],
    };
  };
