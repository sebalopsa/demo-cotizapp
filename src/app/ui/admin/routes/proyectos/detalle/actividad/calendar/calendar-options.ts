export const INIT_OPTIONS = {      tooltip: {
        formatter: function (params) {
          return 'trabajadores: ' + params.value[1];
        }
      },
      grid: {
        top: 0
      },

      visualMap: {
        show: false,
        calculable: true,
        seriesIndex: [1],
        orient: 'horizontal',
        left: 'center',
        bottom: 20,
        inRange: {
          color: ['#ffffff', '#006edd'],
          opacity: 0.3
        },
        controller: {
          inRange: {
            opacity: 0.5
          }
        },
      },

      calendar: [{
        left: 'center',
        top: 'top',
        cellSize: [60, 60],
        yearLabel: { show: false },
        orient: 'vertical',
        dayLabel: {
          show: true,
          firstDay: 1,
          nameMap: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá']
        },
        monthLabel: {
          show: false
        },
        range: '2020-1'
      }],

      series: [{
        type: 'scatter',
        coordinateSystem: 'calendar',
        symbolSize: 1,
        label: {
          show: true,
          formatter: function (params) {
            var d = params.value[0];
            return d.split('-').slice(-1)[0];
          },
          color: '#000'
        },
        data: []
      },
      {
        name: 'Trabajadores',
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: []
      }]
    };