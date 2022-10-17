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
            <v-toolbar-title>Filter Setting</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="$refs.search.focus()"
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn
              icon
              @click="close"
            >
              <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
          </v-toolbar>

          <v-container class="py-0" style="margin-bottom:20px; margin-top:20px;">
            <v-row
              align="center"
              justify="start"
              style="padding-right: 15px;"
            >
              <v-col
                v-for="(selection, i) in selections"
                :key="selection.text"
                class="shrink"
                style="margin-right:-20px; margin-top: -20px;"
              >
                <v-chip
                  class ="handle"
                  :disabled="loading"
                  close
                  color="primary"
                  small
                  draggable
                  @click:close="pull(i)"
                  @dragstart="getDrag(i)"
                  @dragover="getTarget(i)"
                  @dragend="swapLocation(targetIndex,pickingIndex)"
                >
                  <!-- <v-icon
                    left
                    v-text="`mdi-tag-outline`"
                  ></v-icon> -->
                  {{ selection.meta_alias }}
                </v-chip>
              </v-col>

              <!-- <v-col
                v-if="!allSelected"
                cols="12"
              > -->
              <v-col
                cols="12"
              >
                <v-text-field
                  ref="search"
                  v-model="search"
                  full-width
                  hide-details
                  label="Search"
                  single-line
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <v-divider></v-divider>

          <v-list>
            <v-virtual-scroll
              :items="categories"
              height="300"
              item-height="64"
              bench = 1
            >
              <template v-slot:default="{ item }">
                <v-divider></v-divider>
                  <v-list-item
                    :key="item.column_name"
                    :disabled="loading"
                    @click="distinctPush(item)"
                  >
                    <v-list-item-action>
                      <v-btn v-if="!selected.includes(item)" 
                        fab
                        small
                        depressed
                        color="primary"
                      >
                      <v-icon
                            :disabled="loading"
                            v-text="`mdi-tag-plus`"
                        ></v-icon>
                      </v-btn>
                      <v-btn v-else
                        fab
                        small
                        depressed
                        color="gray"
                      >
                      <v-icon
                            :disabled="loading"
                            v-text="`mdi-tag-outline`"
                        ></v-icon>
                      </v-btn>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>
                        <v-spacer></v-spacer><strong>{{ item.meta_alias }}</strong>
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon 
                            
                            v-bind="attrs"
                            v-on="on"
                            @mouseover="showHint(item,true)" 
                            @mouseleave="showHint(item,false)"
                          >
                            mdi-information-outline
                          </v-icon>
                        </template>
                        <span>
                          <div class="hint">Hint: {{hint.meta_hint}}</div><br/> 
                          <div class="hint">Scale: {{hint.meta_scale}}</div><br/>
                          <div class="hint">Unit: {{hint.meta_unit}}</div><br/>
                          <div class="hint">Range: {{hint.meta_minrange}} ~ {{hint.meta_maxrange}}</div><br/>
                          <div class="hint">Type: {{hint.data_type}}</div>
                        </span>
                      </v-tooltip>
                    </v-list-item-action>
                  </v-list-item>
            
                </template>
            </v-virtual-scroll>
          </v-list>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn
              :disabled="!selected.length"
              :loading="loading"
              color="purple"
              text
              @click="next"
            >
              Next
            </v-btn> -->
          </v-card-actions>
        </v-card>
        <!-- <input class="form-control" type="text" v-model="input" ref="input"> -->
      </form>
    </div>
    <div slot="footer">
      <v-btn class="btn" :class="{'btn-success':valid}" type="submit" color="primary"
        form="column-picker-form" :disabled="!valid">Aplly</v-btn>
    </div>
  </Modal>
</template>

<script>
    import Modal from './Modal'
    export default {
      name: 'ColumnPicker',
      props : {
        columns : Array,
        pageid : String,
      },
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
      components:{
        Modal,
      },
      data: () => ({
        items: [
          {
            text: 'Nature',
            icon: 'mdi-nature',
          },
          {
            text: 'Nightlife',
            icon: 'mdi-glass-wine',
          },
          {
            text: 'November',
            icon: 'mdi-calendar-range',
          },
          {
            text: 'Portland',
            icon: 'mdi-map-marker',
          },
          {
            text: 'Biking',
            icon: 'mdi-bike',
          },
        ],
        loading: false,
        valid: false,
        search: '',
        selected: [],
        input: '',
        hint:[],
        isHint:false,
        isDrag:false,
        pickingIndex:0,
        targetIndex:0,
      }),
  
      computed: {
        allSelected () {
          return this.selected.length === this.columns.length
        },
        categories () {
          const search = this.search.toLowerCase()
  
          if (!search) return this.columns
  
          return this.columns.filter(item => {
            const text = item.column_name.toLowerCase()
  
            return text.indexOf(search) > -1
          })
        },
        selections () {
          const selections = []
  
          for (const selection of this.selected) {
            selections.push(selection)
          }
  
          return selections
        },
      },
  
      watch: {
        selected () {
          this.search = ''
        },
        input (v) {
          this.valid = v.trim().length > 0
        },
        selectedColumns() {
          
        }
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
          this.$emit('close')
        },
        close() {
          this.$emit('close')
        },
        distinctPush(v) {
          if (!this.selected.includes(v)) {
            this.selected.push(v)

            this.input = '';
            this.selected.forEach(element => {
              this.input += `,${element.column_name}`
            });
            
          }
        },
        pull(v){
          this.selected.splice(v, 1)
          this.input = '';
          this.selected.forEach(element => {
            this.input += `,${element.column_name}`
          });
        },
        showHint(v,b) {
          this.hint = v
          this.isHint = b
        },
        getDrag(v){
          this.pickingIndex = v
          this.isDrag = true
        },
        getTarget(v){
          this.targetIndex = v
        },
        swapLocation(target,picked)
        {
          if (target < picked){
            this.selected.splice(target, 0,this.selected[picked])
            this.selected.splice(picked + 1, 1)
          }
          else{
            this.selected.splice(target + 1, 0,this.selected[picked])
            this.selected.splice(picked, 1)
          }

          this.isDrag = false

          this.input = '';
          this.selected.forEach(element => {
            this.input += `,${element.column_name}`
          })
        },
      },
    }
  </script>

<style scoped>
  .hint{
    float:left
  }
  .handle{
    cursor:move
  }

</style>