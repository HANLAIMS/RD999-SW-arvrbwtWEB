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
								@click="openDialog(n-1)"
							>
								Go to detail
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>

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
						[423,446,675,510,590,610,760,],
						[760,610,590,510,675,446,423,]
					],
					datetime:[
						['423','446','675','510','590','610','760',],
						['760','610','590','510','675','446','423',]
					],
					label:[]
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
      },
			selectedItem(){
				localStorage.setItem('ViewPerLine',JSON.stringify(this.selectedItem))
			}
    },
    mounted() {
			if (JSON.parse(localStorage.getItem('ViewPerLine')) != null)
				this.selectedItem = JSON.parse(localStorage.getItem('ViewPerLine'))
    },
    methods: {
			openDialog(index){
				this.$emit('openDetailTrend')
				this.$store.commit('UPDATE_VALUES',JSON.stringify(this.columns.value[index]))
				this.$store.commit('UPDATE_LABELS',JSON.stringify(this.columns.datetime[index]))
				this.$store.commit('UPDATE_VISIBLE',true)
				this.$store.commit('UPDATE_TAG',this.columns.name[index])
			},
			setValue() {
        this.columns.name.splice(0,this.columns.name.length)
				this.columns.value.splice(0,this.columns.value.length)
				this.columns.datetime.splice(0,this.columns.datetime.length)
				this.columns.label.splice(0,this.columns.datetime.length)

        this.keyData.forEach((header,i)=>{
					this.columns.name.push(header.meta_alias)
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
</style>