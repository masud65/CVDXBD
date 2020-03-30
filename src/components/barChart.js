import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width / 1.05;
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

class BarCharts extends React.PureComponent {
  render() {
    const data = {
      labels: [
        '03/02',
        '03/02',
        '03/02',
        '03/02',
        '03/02',
        '03/02',
        '03/02',
        '03/02',
        '03/02',
        '03/02',
        '03/09',
        '03/11',
      ],
      datasets: [
        {
          data: [50, 100, 280, 320, 450, 403, 200, 450, 280, 800, 1200],
        },
      ],
    };
    return (
      <BarChart
        style={{marginVertical: 0, borderRadius: 2}}
        fromZero={true}
        data={data}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: '#1E2923',
          backgroundGradientFromOpacity: 3,
          backgroundGradientTo: '#08130D',
          backgroundGradientToOpacity: 0.5,
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.5,
        }}
        verticalLabelRotation={300}
      />
    );
  }
}

export default BarCharts;
