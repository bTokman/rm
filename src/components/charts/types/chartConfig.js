import moment from 'moment';

/**
 * Get HighChart config
 * @param from
 * @param to
 * @returns {*}
 */
export const buildLineChartConfig =
  (from, to) => {
    return {
      chartType: 'areaspline',
      animationDuration: 1000,
      updateArgs: [true, true, {duration: 1000}],
      chartOptions: {
        chart: {
          type: 'area',
          margin: [0, 0, 21, 0],
          zoomType: 'x'
        },
        title: 'Day',
        xAxis: {
          crosshair: true,
          type: 'datetime',
          tickLength: 5,
          minPadding: 0.0005,
          maxPadding: 0.001,
          labels: {
            y: 15,
            formatter() {
              return moment.utc(this.value).format('HH:mm')
            }
          }
        },
        yAxis: {
          crosshair: false,
          min: 0,
          title: null,
          startOnTick: false,
          endOnTick: false,
          labels: {
            enabled: false
          }
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        tooltip: {
          shape: 'square',
          animation: false,
          positioner(labelWidth, labelHeight, point) {
            let x = point.plotX + this.chart.plotLeft + 15;
            let flipX = this.chart.plotWidth + this.chart.plotLeft - 15 - labelWidth;
            return {
              x: x > flipX ? x - labelWidth + this.chart.plotLeft - 25 : x,
              y: 0.2 * this.chart.plotHeight
            }
          },
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
          stickyTracking: false
        },
        series: [
          {
            colorIndex: 1,
            name: 'Yesterday',
            data: from,
          },
          {
            colorIndex: 0,
            name: 'Today',
            data: to,
          },
        ],

      }
    };
  };
