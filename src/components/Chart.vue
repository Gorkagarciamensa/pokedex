<template>
  <div v-if="descChart">
    <apexchart type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  props: {
    descChart: null
  },

  data() {
    return {
      options: {
        xaxis: {
          categories: ["Speed", "SpD", "SpA", "Def", "Att", "HP"]
        }
      }
    };
  },
  methods: {},
  computed: {
    series() {
      return [
        {
          data: [
            this.descChart.stats[0].base_stat,
            this.descChart.stats[1].base_stat,
            this.descChart.stats[2].base_stat,
            this.descChart.stats[3].base_stat,
            this.descChart.stats[4].base_stat,
            this.descChart.stats[5].base_stat
          ]
        }
      ];
    }
  },

  created() {}
};
</script>

<style>
.chart {
  display: flex;
  justify-content: center;
}
.apexcharts-toolbar {
  display: none !important;
}
</style>
