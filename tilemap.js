Highcharts.chart('container', {
  chart: {
    type: 'tilemap',
    inverted: true,
    height: '80%'
  },

  accessibility: {
    description: 'A tile map represents the states of the USA by population in 2016. The hexagonal tiles are positioned to geographically echo the map of the USA. A color-coded legend states the population levels as below 1 million (beige), 1 to 5 million (orange), 5 to 20 million (pink) and above 20 million (hot pink). The chart is interactive, and the individual state data points are displayed upon hovering. Three states have a population of above 20 million: California (39.3 million), Texas (27.9 million) and Florida (20.6 million). The northern US region from Massachusetts in the Northwest to Illinois in the Midwest contains the highest concentration of states with a population of 5 to 20 million people. The southern US region from South Carolina in the Southeast to New Mexico in the Southwest contains the highest concentration of states with a population of 1 to 5 million people. 6 states have a population of less than 1 million people; these include Alaska, Delaware, Wyoming, North Dakota, South Dakota and Vermont. The state with the lowest population is Wyoming in the Northwest with 584,153 people.',
    screenReaderSection: {
      beforeChartFormat:
        '<h5>{chartTitle}</h5>' +
        '<div>{chartSubtitle}</div>' +
        '<div>{chartLongdesc}</div>' +
        '<div>{viewTableButton}</div>'
    },
    point: {
      valueDescriptionFormat: '{index}. {xDescription}, {point.value}.'
    }
  },

  title: {
    text: 'Electric Vehicle Charging Stations In The US'
  },

  subtitle: {
    text: 'Source:<a href="https://www.kaggle.com/prasertk/electric-vehicle-charging-stations-in-usa" target="_blank">Kaggle</a>'
  },

  xAxis: {
    visible: false
  },

  yAxis: {
    visible: false
  },

  colorAxis: {
    dataClasses: [{
      from: 0,
      to: 1000,
      color: '#D6D58E',
      name: '< 1K'
    }, {
      from: 1000,
      to: 2000,
      color: '#DBF227',
      name: '1K - 2K'
    }, {
      from: 2000,
      to: 10000,
      color: '#9FC131',
      name: '2K - 10K'
    }, {
      from: 10000,
      color: '#005C53',
      name: '> 10K'
    }]
  },

  tooltip: {
    headerFormat: '',
    pointFormat: 'There are <b>{point.value}</b> electric charging stations in <b> {point.name}</b>'
  },

  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        format: '{point.hc-a2}',
        color: '#000000',
        style: {
          textOutline: false
        }
      }
    }
  },

  series: [{
    name: '',
    data: [{
      'hc-a2': 'AL',
      name: 'Alabama',
      region: 'South',
      x: 6,
      y: 7,
      value: 278
    }, {
      'hc-a2': 'AK',
      name: 'Alaska',
      region: 'West',
      x: 0,
      y: 0,
      value: 53
    }, {
      'hc-a2': 'AZ',
      name: 'Arizona',
      region: 'West',
      x: 5,
      y: 3,
      value: 890
    }, {
      'hc-a2': 'AR',
      name: 'Arkansas',
      region: 'South',
      x: 5,
      y: 6,
      value: 165
    }, {
      'hc-a2': 'CA',
      name: 'California',
      region: 'West',
      x: 5,
      y: 2,
      value: 14651
    }, {
      'hc-a2': 'CO',
      name: 'Colorado',
      region: 'West',
      x: 4,
      y: 3,
      value: 1627
    }, {
      'hc-a2': 'CT',
      name: 'Connecticut',
      region: 'Northeast',
      x: 3,
      y: 11,
      value: 533
    }, {
      'hc-a2': 'DE',
      name: 'Delaware',
      region: 'South',
      x: 4,
      y: 9,
      value: 133
    }, {
      'hc-a2': 'DC',
      name: 'District of Columbia',
      region: 'South',
      x: 4,
      y: 10,
      value: 292
    }, {
      'hc-a2': 'FL',
      name: 'Florida',
      region: 'South',
      x: 8,
      y: 8,
      value: 2665
    }, {
      'hc-a2': 'GA',
      name: 'Georgia',
      region: 'South',
      x: 7,
      y: 8,
      value: 1588
    }, {
      'hc-a2': 'HI',
      name: 'Hawaii',
      region: 'West',
      x: 8,
      y: 0,
      value: 386
    }, {
      'hc-a2': 'ID',
      name: 'Idaho',
      region: 'West',
      x: 3,
      y: 2,
      value: 138
    }, {
      'hc-a2': 'IL',
      name: 'Illinois',
      region: 'Midwest',
      x: 3,
      y: 6,
      value: 1068
    }, {
      'hc-a2': 'IN',
      name: 'Indiana',
      region: 'Midwest',
      x: 3,
      y: 7,
      value: 354
    }, {
      'hc-a2': 'IA',
      name: 'Iowa',
      region: 'Midwest',
      x: 3,
      y: 5,
      value: 284
    }, {
      'hc-a2': 'KS',
      name: 'Kansas',
      region: 'Midwest',
      x: 5,
      y: 5,
      value: 494
    }, {
      'hc-a2': 'KY',
      name: 'Kentucky',
      region: 'South',
      x: 4,
      y: 6,
      value: 225
    }, {
      'hc-a2': 'LA',
      name: 'Louisiana',
      region: 'South',
      x: 6,
      y: 5,
      value: 158
    }, {
      'hc-a2': 'ME',
      name: 'Maine',
      region: 'Northeast',
      x: 0,
      y: 11,
      value: 302
    }, {
      'hc-a2': 'MD',
      name: 'Maryland',
      region: 'South',
      x: 4,
      y: 8,
      value: 1263
    }, {
      'hc-a2': 'MA',
      name: 'Massachusetts',
      region: 'Northeast',
      x: 2,
      y: 10,
      value: 2198
    }, {
      'hc-a2': 'MI',
      name: 'Michigan',
      region: 'Midwest',
      x: 2,
      y: 7,
      value: 831
    }, {
      'hc-a2': 'MN',
      name: 'Minnesota',
      region: 'Midwest',
      x: 2,
      y: 4,
      value: 583
    }, {
      'hc-a2': 'MS',
      name: 'Mississippi',
      region: 'South',
      x: 6,
      y: 6,
      value: 115
    }, {
      'hc-a2': 'MO',
      name: 'Missouri',
      region: 'Midwest',
      x: 4,
      y: 5,
      value: 1053
    }, {
      'hc-a2': 'MT',
      name: 'Montana',
      region: 'West',
      x: 2,
      y: 2,
      value: 80
    }, {
      'hc-a2': 'NE',
      name: 'Nebraska',
      region: 'Midwest',
      x: 4,
      y: 4,
      value: 177
    }, {
      'hc-a2': 'NV',
      name: 'Nevada',
      region: 'West',
      x: 4,
      y: 2,
      value: 458
    }, {
      'hc-a2': 'NH',
      name: 'New Hampshire',
      region: 'Northeast',
      x: 1,
      y: 11,
      value: 166
    }, {
      'hc-a2': 'NJ',
      name: 'New Jersey',
      region: 'Northeast',
      x: 3,
      y: 10,
      value: 749
    }, {
      'hc-a2': 'NM',
      name: 'New Mexico',
      region: 'West',
      x: 6,
      y: 3,
      value: 191
    }, {
      'hc-a2': 'NY',
      name: 'New York',
      region: 'Northeast',
      x: 2,
      y: 9,
      value: 2977
    }, {
      'hc-a2': 'NC',
      name: 'North Carolina',
      region: 'South',
      x: 5,
      y: 9,
      value: 1124
    }, {
      'hc-a2': 'ND',
      name: 'North Dakota',
      region: 'Midwest',
      x: 2,
      y: 3,
      value: 61
    }, {
      'hc-a2': 'OH',
      name: 'Ohio',
      region: 'Midwest',
      x: 3,
      y: 8,
      value: 976
    }, {
      'hc-a2': 'OK',
      name: 'Oklahoma',
      region: 'South',
      x: 6,
      y: 4,
      value: 314
    }, {
      'hc-a2': 'OR',
      name: 'Oregon',
      region: 'West',
      x: 4,
      y: 1,
      value: 992
    }, {
      'hc-a2': 'PA',
      name: 'Pennsylvania',
      region: 'Northeast',
      x: 3,
      y: 9,
      value: 1166
    }, {
      'hc-a2': 'RI',
      name: 'Rhode Island',
      region: 'Northeast',
      x: 2,
      y: 11,
      value: 257
    }, {
      'hc-a2': 'SC',
      name: 'South Carolina',
      region: 'South',
      x: 6,
      y: 8,
      value: 391
    }, {
      'hc-a2': 'SD',
      name: 'South Dakota',
      region: 'Midwest',
      x: 3,
      y: 4,
      value: 58
    }, {
      'hc-a2': 'TN',
      name: 'Tennessee',
      region: 'South',
      x: 5,
      y: 7,
      value: 683
    }, {
      'hc-a2': 'TX',
      name: 'Texas',
      region: 'South',
      x: 7,
      y: 4,
      value: 2319
    }, {
      'hc-a2': 'UT',
      name: 'Utah',
      region: 'West',
      x: 5,
      y: 4,
      value: 908
    }, {
      'hc-a2': 'VT',
      name: 'Vermont',
      region: 'Northeast',
      x: 1,
      y: 10,
      value: 331
    }, {
      'hc-a2': 'VA',
      name: 'Virginia',
      region: 'South',
      x: 5,
      y: 8,
      value: 1142
    }, {
      'hc-a2': 'WA',
      name: 'Washington',
      region: 'West',
      x: 2,
      y: 1,
      value: 1775
    }, {
      'hc-a2': 'WV',
      name: 'West Virginia',
      region: 'South',
      x: 4,
      y: 7,
      value: 111
    }, {
      'hc-a2': 'WI',
      name: 'Wisconsin',
      region: 'Midwest',
      x: 2,
      y: 5,
      value: 479
    }, {
      'hc-a2': 'WY',
      name: 'Wyoming',
      region: 'West',
      x: 3,
      y: 3,
      value: 70
    }]
  }]
});