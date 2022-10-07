<template>
    <div id="trendline">
		<v-select
			v-model="selectedItem"
			:items="items"
			item-text="name"
			item-value="value"
			label="The number of view per line"
			return-object
			style="margin-left:41vw; margin-right:10px; margin-bottom: -50px;"
		></v-select>
		<v-row style="padding:10px">
			<v-col
				v-for="n in columns.name.length"
				:key="n"
				cols="12"
				:md="selectedItem.value"
			>
				<v-skeleton-loader v-if="loading"
					class="mx-auto"
					max-width="300"
					type="card"
				>
				</v-skeleton-loader>
				<v-card v-if="!loading"
					class="mx-auto text-center"
					color="primary"
					dark
					max-width="100vw"
				>
					<v-card-text>
						<v-sheet color="rgba(0, 0, 0, .12)">
							<v-sparkline
								:labels="columns.label[n-1]"
								:value="columns.value[n-1]"
								color="rgba(255, 255, 255, .7)"
								height="100"
								padding="24"
								stroke-linecap="round"
								smooth
							>

							</v-sparkline>
						</v-sheet>
					</v-card-text>

					<v-card-text>
						<div class="text-h5 font-weight-thin">
							<strong>{{columns.name[n-1]}}</strong>
						</div>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-actions class="justify-center">
						<v-btn
							block
							text
							@click="openDialog"
						>
							Go to detail
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
		<v-dialog
			v-model="dialog"
			width="600px"
		>

			<v-card>
				<v-card-title>
					<span class="text-h5">Detail Chart (작업중)</span>
				</v-card-title>
				<v-card-text>
					<v-sheet color="rgba(0, 0, 0, .12)">
						<div class="bitcoin-price">
							<svg style="width:0 height:0; position:absolute;" aria-hidden="true" focusable="false">
								<defs>
									<linearGradient id="btcFill" x1="1" x2="1" y1="0" y2="1">
										<stop offset="0%" stop-color="#f69119"></stop>
										<stop offset="100%" stop-color="#ffffff"></stop>
									</linearGradient>
								</defs>
							</svg>
							<TrendChart
								:datasets="datasets"
								:grid="grid"
								:labels="labels"
								:min="0"
							></TrendChart>
						</div>
					</v-sheet>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						text
						@click="dialog = false"
					>
						Close
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
    </div>
  </template>
  
  <script>

  export default {
    name: 'trendline',
    props:{
      queryData : Object,
      keyData: Array,
    },
    data() {
      return {
				loading :false,
				dialog :false,
				rowcount : 0,
				selectedItem:{name:'View 2 per line',value:6},
				items: [
					{name:'View 1 per line',value:12},
					{name:'View 2 per line',value:6},
					{name:'View 3 per line',value:4},
					{name:'View 4 per line',value:3},
				],
				columns:{
					name:["FM","TRO"],
					value: [
						[
							423,
							446,
							675,
							510,
							590,
							610,
							760,
						],
						[
							760,
							610,
							590,
							510,
							675,
							446,
							423,
						]
					],
					datetime:[
						[
							'423',
							'446',
							'675',
							'510',
							'590',
							'610',
							'760',
						],
						[
							'760',
							'610',
							'590',
							'510',
							'675',
							'446',
							'423',
						]
					],
					label:[]
				},
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
					yLabels: 5
				},
				
      }
    },
    components: {
    },
    created() {
			this.loading = true;
      setTimeout(() => {
				this.setValue()
      }, 300);
    },
    watch: {
      queryData(){
        this.loading = true;
				setTimeout(() => {
					this.setValue()
				}, 300);
      }
    },
    mounted() {
    },
    methods: {
			openDialog(){
				this.dialog = true
				console.log(this.dialog)
			},
			setValue() {
        this.columns.name.splice(0,this.columns.name.length)
				this.columns.value.splice(0,this.columns.value.length)
				this.columns.datetime.splice(0,this.columns.datetime.length)
				this.columns.label.splice(0,this.columns.datetime.length)

        this.keyData.forEach((header,i)=>{
					this.columns.name.push(header.column_name)
					this.columns.value.push([])
					this.columns.datetime.push([])
					this.columns.label.push([])

					this.queryData.list.forEach((row,j)=>{
						this.columns.value[i].push((Math.round(row[header.column_name]*1000)/1000))
						this.columns.datetime[i].push(row['datetime'])

						if (j == 0 ||
								j == 1*Math.round(this.queryData.list.length/6) ||
								j == 2*Math.round(this.queryData.list.length/6) ||
								j == 3*Math.round(this.queryData.list.length/6) ||
								j == 4*Math.round(this.queryData.list.length/6) ||
								j == 5*Math.round(this.queryData.list.length/6) ||
								j == this.queryData.list.length - 1 
						)
						this.columns.label[i].push((Math.round(row[header.column_name]*1000)/1000))
						else
						this.columns.label[i].push(' ')
					})
				})
				// this.products.push(Object.assign({},rowdata))
				this.loading = false;
      }
    },
  };
  </script>
  
  <style lang="scss">
  ::-moz-selection {
    color: #2c3e50;
    background: transparent;
  }
  ::selection {
    color: #2c3e50;
    background: transparent;
  }
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