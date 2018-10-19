import moment from 'moment';
import store from '@/store';
/**
 * Get HighChart config
 * @param series
 * @returns {*}
 */
export const buildLineChartConfig =
  (from, to) => {
    console.log(from);
    console.log(to);
    return {
      chartType: 'plot',
      animationDuration: 1000,
      updateArgs: [true, true, {duration: 1000}],
      chartOptions: {
        chart: {
          type: 'area',
          margin: [0, 0, 21, 0],
          zoomType: 'x'
        },
        title: false,
        xAxis: {
          crosshair: true,
          type: 'datetime',
          tickLength: 5,
          minPadding: 0.0005,
          maxPadding: 0.001,
          labels: {
            y: 15,
            formatter() {
              console.log(this.value);
              return moment.utc(this.value).format('MMM DD')
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
        series: [{
          name: 'AAPL Stock Price',
          data: [5,5,56,67,8],
          type: 'area',
          threshold: null,
          tooltip: {
            valueDecimals: 2
          }
        },
          {
            name: 'AAPL Stock Price',
            data: [6,7,8,232,54],
            type: 'area',
            threshold: null,
            tooltip: {
              valueDecimals: 2
            }
          }

        ],

      }
    };
  };
