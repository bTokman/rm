const categories = {
  0: 'Monday',
  1: 'Tuesday',
  2: 'Wednesday',
  3: 'Thursday',
  4: 'Friday',
  5: 'Saturday',
  6: 'Sunday'
};

/**
 * Get HighChart config
 * @param from
 * @param to
 * @returns {*}
 */
export const buildWeekChartConfig =
  (from, to) => {
    return {
      chart: {
        type: 'column',
        spacingBottom: 20,
        spacingTop: 10,
      },
      credits: {
        enabled: false
      },
      legend: {
        y: 5,
        itemStyle: {
          color: '#000',
          fontSize: '12px'
        }
      },
      title: {
        text: 'Week',

      },
      subtitle: false,
      xAxis: {
        labels: {
          enabled: false
        }
      },
      yAxis: {
        crosshair: true,
        min: 0,
        title: null,
        startOnTick: false,
        labels: {
          enabled: false
        }
      },
      tooltip: {
        shape: 'square',
        shared: true,
        useHTML: true,
        formatter: function () {
          let str = `<span style="font-size:10px">${categories[this.points[0].x]}</span>`;

          if (this.points[1]) {
            str += `<table><tr><td><span style="color:#434348">●</span> ${this.points[0].key}:</td>
                <td style="padding:0"><b>${this.points[0].y.toLocaleString()} </b></td></tr></table>
                <table><tr><td><span style="color:#1976d2">●</span> ${this.points[1].key}: </td>
                <td style="padding:0"><b>${this.points[1].y.toLocaleString()} </b></td></tr></table>`;
          }

          else {
            str += `<table><tr><td><span style="color:#434348">●</span> ${this.points[0].key}:</td>
                <td style="padding:0"><b>${this.points[0].y.toLocaleString()} </b></td></tr></table> `;
          }

          return str;
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        colorIndex: 1,
        name: 'Previous',
        data: from,
        animation: {duration: 500},
      }, {
        colorIndex: 0,
        name: 'Current',
        color : '#1976d2',
        data: to,
        animation: {duration: 500},
      }]
    }
  };