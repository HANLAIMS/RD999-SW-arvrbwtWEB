<template>
  <trend
  :datasets="[
    {
      data: [10, 50, 20, 100, 40, 60, 80],
      smooth: true,
      fill: true
    }
  ]"
  :grid="{
     verticalLines: true,
     horizontalLines: true
  }"
  :labels="{
     xLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
     yLabels: 5
  }"
  :min="0">
</trend>
</template>

<script>
import trend from 'vue-trend-chart'
export default {
	components :[
		trend
	]

}
</script>

<style>

</style>