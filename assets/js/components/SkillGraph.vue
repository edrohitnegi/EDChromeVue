<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="section-heading">
          <span>Skill Graph</span>
          <h2>Top 5 Technologies & Concepts</h2>
        </div>
      </div>
      <div class="col-md-12">
        <div class="feature-item">
          <div class="hello" ref="chartdiv"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import * as am4pluginsForceDirected from '@amcharts/amcharts4/plugins/forceDirected';

am4core.useTheme(am4themesAnimated);
export default {
  name: 'SkyView',

  mounted() {
    const chart = am4core.create(this.$refs.chartdiv, am4pluginsForceDirected.ForceDirectedTree);
    chart.legend = new am4charts.Legend();

    const networkSeries = chart.series.push(new am4pluginsForceDirected.ForceDirectedSeries());

    networkSeries.data = [
      {
        name: 'Technology',
        children: [
          {
            name: 'Moodle',
            value: 3,
          },
          {
            name: 'Totara Learn',
            value: 4,
          },
          {
            name: 'Drupal',
            value: 2,
          },
          {
            name: 'Open edX',
            value: 2,
          },
          {
            name: 'Excel',
            value: 5,
          },
        ],
      },
      {
        name: 'Concept',
        children: [
          {
            name: 'elearning',
            value: 4,
          },
          {
            name: 'Graph Database',
            value: 2,
          },
          {
            name: 'SLDC',
            value: 3,
          },
          {
            name: 'Natural Language Processing',
            value: 1,
          },
          {
            name: 'Client-Server',
            value: 2,
          },
        ],
      },
    ];

    networkSeries.dataFields.linkWith = 'linkWith';
    networkSeries.dataFields.name = 'name';
    networkSeries.dataFields.id = 'name';
    networkSeries.dataFields.value = 'value';
    networkSeries.dataFields.children = 'children';

    networkSeries.nodes.template.tooltipText = '{value} at {name}';
    networkSeries.nodes.template.fillOpacity = 1;

    networkSeries.nodes.template.label.text = '{name}';
    networkSeries.fontSize = 10;
    networkSeries.maxLevels = 2;
    networkSeries.maxRadius = am4core.percent(10);
    networkSeries.manyBodyStrength = -20;
    networkSeries.nodes.template.label.hideOversized = true;
    networkSeries.nodes.template.label.truncate = true;

    this.chart = chart;
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
</script>

<style lang="scss" scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>
