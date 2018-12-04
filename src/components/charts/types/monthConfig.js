import moment from 'moment';

const categories = [
  '1', '2', '3', '4',
  '5', '6', '7', '8', '9',
  '10', '11', '12', '13', '14',
  '15', '16', '17', '18', '19',
  '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
];

/**
 * Get HighChart config
 * @param from
 * @param to
 * @returns {*}
 */
export const buildMonthChartConfig =
  (from, to) => {
    return {
      chart: {
        type: 'bar',
        spacingBottom: 20,
        spacingTop: 20,
        height: '650px'
      },
      title: {
        text: 'Month'
      },
      subtitle: false,
      xAxis: [{
        categories: categories,
        reversed: false,
        labels: {
          step: 1,
        }
      }, { // mirror axis on right side
        opposite: true,
        reversed: false,
        categories: categories,
        linkedTo: 0,
        labels: {
          step: 1
        },

      }],
      yAxis: {
        title: {
          text: null
        },
        labels: false
      },
      legend: {
        y: 5,
        itemStyle: {
          color: '#000',
          fontSize: '12px'
        }
      },
      credits: {
        enabled: false
      },

      plotOptions: {
        series: {
          stacking: 'normal',
          pointWidth: 15,
          pointInterval: 1
        }
      },

      tooltip: {
        shape: 'square',
        shared: true,
        useHTML: true,
        formatter: function () {
          let str = ``;

          if (this.points[1]) {
            str += `<table><tr><td><span style="color:#434348">●</span> ${moment().subtract(1, 'month').date(this.points[0].key).format('YYYY-MM-DD')}:</td>
                <td style="padding:0"><b>${ (this.points[0].y * -1).toLocaleString()} </b></td></tr></table>
                <table><tr><td><span style="color:#1976d2">●</span> ${moment().date(this.points[1].key).format('YYYY-MM-DD')}: </td>
                <td style="padding:0"><b>${this.points[1].y.toLocaleString()} </b></td></tr></table>`;
          }

          else {
            str += `<table><tr><td><span style="color:#434348">●</span> ${moment().subtract(1, 'month').date(this.points[0].key).format('YYYY-MM-DD')}:</td>
                <td style="padding:0"><b>${(this.points[0].y * -1).toLocaleString()} </b></td></tr></table> `;
          }

          return str;
        }
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
