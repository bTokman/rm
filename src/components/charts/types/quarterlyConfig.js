import Highcharts from 'highcharts';
import moment from 'moment';

/**
 * Get HighChart config
 * @param from
 * @param to
 * @returns {*}
 */
export const buildQuarterlyChartConfig =
  (from, to) => {
    return {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Quarterly'
      },
      xAxis: {
        categories: [],
        labels: {
          enabled: false
        },
      },
      yAxis: {
        labels: {
          enabled: false
        },
        title: false,
      },
      legend: {
        y: 5,
        itemStyle: {
          color: '#000',
          fontSize: '12px'
        }
      },
      tooltip: {
        shape: 'square',
        shared: true,
        useHTML: true,
        formatter: function () {
          let str = ``;

          if (this.points[1]) {
            str += `<table><tr><td><span style="color:#434348">●</span> ${moment().subtract(5 - this.points[0].key, 'month').startOf('month').format('YYYY-MM')}:</td>
                <td style="padding:0"><b>${this.points[0].y.toLocaleString()} </b></td></tr></table>
                <table><tr><td><span style="color:#1976d2">●</span> ${moment().subtract(2 - this.points[1].key, 'month').startOf('month').format('YYYY-MM')}: </td>
                <td style="padding:0"><b>${this.points[1].y.toLocaleString()} </b></td></tr></table>`;
          }

          else {
            str += `<table><tr><td><span style="color:#434348">●</span> ${moment().subtract(2 - this.points[0].key, 'month').startOf('month').format('YYYY-MM')}:</td>
                <td style="padding:0"><b>${this.points[0].y.toLocaleString()} </b></td></tr></table> `;
          }

          return str;
        }
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            color: ( Highcharts.theme && Highcharts.theme.dataLabelsColor ) || 'white'
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        colorIndex: 1,
        name: 'Previous',
        data: from,
        animation: {duration: 500}
      }, {
        colorIndex: 0,
        color: '#1976d2',
        name: 'Current',
        data: to,
        animation: {duration: 500}
      }]
    }
  };