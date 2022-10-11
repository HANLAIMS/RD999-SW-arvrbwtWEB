<template>
  <Modal>
    <div slot="header" style="height:0px">
    </div>
    <div slot="body">
      <form id="column-picker-form"
        @submit.prevent = pickColumn>
        
        <v-card
          class="mx-auto"
          max-width="100vw"
        >
          <v-toolbar
            flat
            color="transparent"
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>Detail trend-line {{pageid}}</v-toolbar-title>
            <v-spacer></v-spacer>
            
            <v-btn
              icon
              @click="close"
            >
              <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
          </v-toolbar>

          <v-divider></v-divider>

          <trend-chart
            :datasets="datasets"
            :grid="grid"
            :labels="labels"
            :min="0"
            padding="5"
            :interactive="true"
            @mouse-move="onMouseMove"
            class="random-chart"
            v-if="datasets.length"
          ></trend-chart>
          <div id="pop" role="tooltip" ref="tooltip" class="tooltip" :class="{'is-active': tooltipData}">
            <div class="tooltip-container" v-if="tooltipData">
              <strong>{{labels.zLabels[tooltipData.index]}}</strong>
              <div class="tooltip-container-data">
                <div class="tooltip-container-data-item tooltip-container-data-item--1">{{tooltipData.data[0]}}</div>
                <!-- <div class="tooltip-container-data-item tooltip-container-data-item--2">{{tooltipData.data[1]}}</div>
                <div class="tooltip-container-data-item tooltip-container-data-item--3">{{tooltipData.data[2]}}</div> -->
              </div>
            </div>
          </div>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>

      </form>
    </div>
    <div slot="footer">
      <v-btn class="btn" type="submit" color="primary"
        form="column-picker-form">print</v-btn>
    </div>
  </Modal>
</template>

<script>
  import Modal from './Modal'
  import Popper from "popper.js";
  export default {
    name: 'ColumnPicker',
    props : {
      columns : Array,
      pageid : String,
    },
    components:{
      Modal,
    },
    data: () => ({
      loading: false,
      datasets: [
        {
          data: [70, 100, 400, 180, 100, 300, 500],
          smooth: true,
          showPoints: true,
          fill: true,
          className: "curve1"
        },
        // {
        //   data: [150, 300, 350, 100, 350, 100, 15],
        //   smooth: true,
        //   showPoints: true,
        //   fill: true,
        //   className: "curve2"
        // },
        // {
        //   data: [50, 150, 200, 50, 120, 250, 200],
        //   smooth: true,
        //   showPoints: true,
        //   fill: true,
        //   className: "curve3"
        // }
      ],
      grid: {
        verticalLines: true,
        horizontalLines: true
      },
      labels: {
        zLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        xLabels: ["2022-10-11 00:00:00", "", "", "", "", "", "2022-10-11 07:00:00"],
        yLabels: 11,
        yLabelsTextFormatter: val => Math.round(val * 100) / 100
      },
      tooltipData: null,
      popper: null,
      popperIsActive: false

    }),

    created(){
      const storedItems = JSON.parse(localStorage.getItem(this.pageid))?JSON.parse(localStorage.getItem(this.pageid)):this.columns;
      storedItems.forEach((storedItem) =>{
        const columnItem = this.columns.find(v=>v.column_name === storedItem.column_name)
        this.selected.push(columnItem)
      })

      this.input = ''
      this.selected.forEach(element => {
        this.input += `,${element.column_name}`
      });
    },
    mounted() {
      this.initPopper()
    },

    methods: {
      next () {
        this.loading = true

        setTimeout(() => {
          this.search = ''
          this.selected = []
          this.loading = false
        }, 2000)
      },
      pickColumn() {
        localStorage.setItem(this.pageid,JSON.stringify(this.selected));
        this.$emit('aplly')

      },
      close() {
        this.$emit('close')
      },
      initPopper() {
        const chart = document.querySelector(".random-chart");
        const ref = chart.querySelector(".active-line");
        const tooltip = this.$refs.tooltip;
        this.popper = new Popper(ref, tooltip, {
          placement: "right",
          modifiers: {
            offset: { offset: "0,10" },
            preventOverflow: {
              boundariesElement: chart
            }
          }
        });
      },
      onMouseMove(params) {
        this.popperIsActive = !!params;
        this.popper.scheduleUpdate();
        this.tooltipData = params || null;
        console.log(this.tooltipData)
      }
    },
  }
</script>

<style lang="scss">
.random-chart {
  width: 100%;
  height: 40vh;
  .vtc {
    height: 250px;
    font-size: 12px;
    @media (min-width: 699px) {
      height: 320px;
    }
  }
  .labels {
    stroke: rgba(0, 0, 0, 0.05);
  }
  .active-line {
    stroke: rgba(0, 0, 0, 0.2);
  }
  .point {
    stroke-width: 2;
    transition: stroke-width 0.2s;
  }
  .point.is-active {
    stroke-width: 5;
  }
  .curve1 {
    .stroke {
      stroke: #fbac91;
      stroke-width: 2;
    }
    .fill {
      fill: #fbac91;
      opacity: 0.05;
    }
    .point {
      fill: #fbac91;
      stroke: #fbac91;
    }
  }
  .curve2 {
    .stroke {
      stroke: #fbe1b6;
      stroke-width: 2;
    }
    .fill {
      fill: #fbe1b6;
      opacity: 0.05;
    }
    .point {
      fill: #fbe1b6;
      stroke: #fbe1b6;
    }
  }
  .curve3 {
    .stroke {
      stroke: #7fdfd4;
      stroke-width: 2;
    }
    .fill {
      fill: #7fdfd4;
      opacity: 0.05;
    }
    .point {
      fill: #7fdfd4;
      stroke: #7fdfd4;
    }
  }
}
.tooltip {
  &:not(.is-active) {
    display: none;
  }
  &-container{
    padding: 10px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    pointer-events: none;
    &-data {
      display: flex;
      &-item {
        display: flex;
        align-items: center;
        &:not(:first-child) {
          margin-left: 20px;
        }
        &:before {
          content: "";
          display: block;
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
        &--1:before {
          background: #fbac91;
        }
        &--2:before {
          background: #fbe1b6;
        }
        &--3:before {
          background: #7fdfd4;
        }
      }
    }
  }
}
</style>