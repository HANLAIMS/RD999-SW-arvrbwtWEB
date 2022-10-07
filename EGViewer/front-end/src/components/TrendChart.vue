<template>
  <div class="bitcoin-price">
    <svg style="width:0; height:0; position:absolute;" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="btcFill" x1="1" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#f69119"></stop>
          <stop offset="100%" stop-color="#ffffff"></stop>
        </linearGradient>
      </defs>
    </svg>
    <trend-chart
      v-if="dataset.length"
      :datasets="[{data: dataset, fill: true, className: 'curve-btc'}]"
      :labels="labels"
      :min="0"
      :grid="grid"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      datasets:[
					{
						data: [10, 50, 20, 100, 40, 60, 80],
						smooth: true,
						fill: true
					}
				],
				grid:{
					verticalLines: true,
					verticalLinesNumber: 1,
					horizontalLines: true,
					horizontalLinesNumber: 1
				},
				labels:{
					xLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					yLabels: 10
				},
    };
  },
  mounted() {

  }
};
</script>

<style lang="scss">
.bitcoin-price {
  .vtc {
    height: 250px;
    font-size: 12px;
    @media (min-width: 699px) {
      height: 350px;
    }
  }
  .grid,
  .labels {
    line {
      stroke: rgba(#f69119, 0.5);
    }
  }
  .x-labels {
    .label {
      text {
        display: none;
      }
      line {
        opacity: 0.3;
      }
      &:nth-child(6n + 1),
      &:first-child {
        text {
          display: block;
        }
        line {
          opacity: 1;
        }
      }
    }
  }
  .curve-btc {
    .stroke {
      stroke: #f69119;
      stroke-width: 2;
    }
    .fill {
      fill: url(#btcFill);
      fill-opacity: 0.5;
    }
  }
}
</style>

