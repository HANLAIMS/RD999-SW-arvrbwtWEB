<template>
    <div id="spreadsheet">
      <vue-table
        v-model="products"
        :headers="headers"
        :custom-options="customOptions"
        :style-wrap-vue-table="styleWrapVueTable"
        :disable-cells="disableCells"
        :disable-sort-thead="disableSortThead"
        :loading="loading"
        :parent-scroll-element="parentScrollElement"
        :select-position="selectPosition"
        :submenu-tbody="submenuTbody"
        :submenu-thead="submenuThead"
        @thead-td-sort="sortProduct"
        @tbody-submenu-click-change-color="changeColorTbody"
      >
        <div slot="header">
          Record : {{rowcount}} rows
        </div>
        <div slot="loader">
          Rendering in progressing ...
          <v-spacer></v-spacer>
          <v-progress-circular
            indeterminate
            :size="70"
            :width="7"
            color="primary"
          ></v-progress-circular>
        </div>
      </vue-table>
    </div>
  </template>
  
  <script>
  
  import VueTable from 'vuejs-spreadsheet';
  
  export default {
    name: 'spreadsheet',
    props:{
      queryData : Object,
      keyData: Array,
    },
    data() {
      return {
        customOptions: {
          tbodyIndex: true,
          sortHeader: true,
          trad: {
            lang: 'fr',
            en: {
              select: {
                placeholder: 'Search by typing',
              },
            },
            fr: {
              select: {
                placeholder: 'Taper pour chercher',
              },
            },
          },
          newData: {
            type: 'input',
            value: '',
            active: false,
            style: {
              color: '#000',
            },
          },
          fuseOptions: {
            shouldSort: true,
            threshold: 0.2,
            location: 0,
            distance: 30,
            maxPatternLength: 64,
            minMatchCharLength: 1,
            findAllMatches: false,
            tokenize: false,
            keys: [
              'value',
            ],
          },
        },
        submenuTbody: [
          {
            type: 'button',
            value: ' change color ',
            function: 'change-color',
            disabled: [],
          }
        ],
        submenuThead: [
          {
            type: 'button',
            value: 'change color',
            function: 'change-color',
            disabled: ['a'],
          },
        ],
        disableCells: [],
        loading: false,
        parentScrollElement: {
          attribute: 'html',
          positionTop: 0,
        },
        selectPosition: {
          top: 1,
          left: 0,
        },
        disableSortThead: [],
        styleWrapVueTable: {
          fontSize: '5px',
          comment: {
            borderColor: '#696969',
            borderSize: '5px',
            widthBox: '120px',
            heightBox: '80px',
          },
        },
        headers: [
          // {
          //   headerName: 'A',
          //   headerKey: 'a',
          //   style: {
          //     width: '100px',
          //     maxWidth: '100px',
          //     color: '#000',
          //   },
          // },
					// {
          //   headerName: 'B',
          //   headerKey: 'b',
          //   style: {
          //     width: '100px',
          //     maxWidth: '100px',
          //     color: '#000',
          //   },
          // },
					// {
          //   headerName: 'C',
          //   headerKey: 'c',
          //   style: {
          //     width: '100px',
          //     maxWidth: '100px',
          //     color: '#000',
          //   },
          // },
        ],
        
        products: [
          // {
          //   fm: {
          //     value: 'aaa',
					// 		type:'input',
					// 		active:false,
          //   },
					// 	ebp601: {
          //     value: 'aaa',
					// 		type:'input',
					// 		active:false,
          //   },
					// 	ebp602: {
          //     value: 'aaa',
					// 		type:'input',
					// 		active:false,
          //   },
          // },
        ],
        rowcount : 0,
      };
    },
    components: {
      VueTable,
    },
    created() {
      this.setHeaders()
      this.setRecords()
    },
    watch: {
      queryData(){
        this.setHeaders()
        this.setRecords()
      }
    },
    mounted() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 300);
    },
    methods: {
      sortProduct(event, header, colIndex) {
        console.log('sort product')
        console.log(event);
        console.log(header);
        console.log(colIndex);
      },
      changeColorThead(event, header, colIndex) {
        this.headers[colIndex].style.color = '#e40000';
        console.log(event);
        console.log(header);
        console.log(colIndex);
      },
      changeColorTbody(event, header, rowIndex, colIndex) {
        this.products[rowIndex][header].style = {};
        this.products[rowIndex][header].style.color = '#e40000';
        console.log(event);
        console.log(colIndex);
      },
			setHeaders() {
        this.headers.splice(0,this.headers.length)
        this.headers.push({
          headerName: 'DATE',
          headerKey: 'datetime',
          style: {
            width: '150px',
            maxWidth: '150px',
            color: '#000',
          }
        })
        this.disableSortThead.push('datetime')
        this.submenuThead[0].disabled.push('datetime')
        this.keyData.forEach((header)=>{
          this.headers.push({
            headerName: header.meta_alias,
            headerKey: header.column_name,
            style: {
              width: '80px',
              maxWidth: '100px',
              color: '#000',
            }
          })
          this.disableSortThead.push(header.column_name)
          this.submenuThead[0].disabled.push(header.column_name)
        })
      },
      setRecords() {
        this.loading = true;
        this.products.splice(0,this.products.length)
        this.queryData.list.forEach((row)=>{
          let rowdata = new Object
          rowdata['datetime']={
              value: new Date(row['datetime']).toLocaleDateString()+new Date(row['datetime']).toLocaleTimeString(),
              type:'input',
              active:false,
            }
          this.keyData.forEach((header) =>{
            rowdata[header.column_name]={
              value: row[header.column_name],
              type:'input',
              active:false,
            }
          })
          this.products.push(Object.assign({},rowdata))
        })
        this.rowcount = this.products.length
        this.loading = false;
      },
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