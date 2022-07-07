<template>
  <div class="home">
    <div v-if ="loading">
          Loading...
          <v-skeleton-loader
          type="table-tfoot, image, date-picker"
        ></v-skeleton-loader>
    </div>
    <div v-else> 
      <!-- 상단 -->
      <v-carousel
        cycle
        height="40vh"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for="(slide, i) in slides"
          :key="i"
          :src="slide.src"
        >          
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="text-h4 shadow-text-white" style="background-color:#FFFFFF00; color:white; height: ; margin-left: ;">
              {{ slide.text }} Slide
            </div>
          </v-row>  
        </v-carousel-item>
      </v-carousel>
      <!-- 중단 -->
      <div style="height:40vh; background: transparent linear-gradient(180deg, #2C78B9 0%, #1C5688 100%) 0% 0% no-repeat padding-box;">
        <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-spacer/>
            <v-col>
              <v-row>
                <div class="white--text pt-0 text-h5 shadow-text-white">주요기능</div>
              </v-row>
              <v-row>
                <router-link to="/about" tag = 'button'>
                  <button>
                    <v-card 
                      class="rounded-vertex"
                      width="170"
                      height="170"
                    >
                      <v-sheet
                        color="#213A5B"
                        height="100%"
                        rounded="true"
                      >
                        <v-card-text style="color:white; font-size:large;">
                          호선 별 데이터
                        </v-card-text>
                        <v-icon size="90" color="white"  align="center" style="margin-top: -5px;">mdi-ferry</v-icon>
                        
                      </v-sheet>
                    </v-card>
                  </button>
                </router-link>
              </v-row>
            </v-col>
            <v-spacer/>
            <v-spacer/>
            <v-spacer/>
            <v-col>
              <v-row>
                <div class="white--text pt-0 text-h5 shadow-text-white">설치현황</div>
              </v-row>
              <v-row>
                <button>
                  <v-card 
                    class="rounded-vertex"
                    width="170"
                    height="170"
                    color="#FFFFFF1A"
                  >
                    <v-sheet
                      color="#213A5B"
                      height="40%"
                      rounded="true"
                    >
                      <v-card-text style="color:white; font-size:large;">
                        총 설치 척수
                      </v-card-text>
                    </v-sheet>
                    <v-sheet
                      color="transparent"
                      height="60%"
                      rounded="true"
                    >
                      <v-card-text style="color:white; font-size:large;">
                        {{total_result}}척
                      </v-card-text>
                    </v-sheet>
                  </v-card>
                </button>
              </v-row>
            </v-col>
            <v-spacer/>
            <div>
              <v-row>
                <v-col v-for="(annual_result,i) in annual_results"
                  :key="i"
                >
                  <v-row>
                    <div class=" pt-0 text-h5" style="color:transparent;">연도 별</div>
                  </v-row>
                  <v-row>
                    <button>
                      <v-card 
                        class="rounded-vertex"
                        width="170"
                        height="170"
                        color="#FFFFFF1A"
                      >
                        <v-sheet
                          color="#213A5B"
                          height="40%"
                          style="margin:0px;"
                          rounded="true"
                        >
                          <v-card-text style="color:white; font-size:large;">
                            {{annual_result.year}}년
                          </v-card-text>
                        </v-sheet>

                        <v-sheet
                          color="transparent"
                          height="60%"
                          rounded="true"
                        >
                          <v-card-text style="color:white; font-size:large;">
                            {{annual_result.result}}척
                          </v-card-text>
                        </v-sheet>
                      </v-card>
                    </button>
                  </v-row>
                </v-col>
              </v-row>
            </div>
            <v-spacer/>
            <v-spacer/>
            

        </v-row>

      </div>
      <!-- 하단 -->
      <v-footer
        dark
        padless
      >
        <v-card
          flat
          tile
          class="grey darken-3 white--text text-center"
          width="200vh"
        >
          <v-card-text>
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-4 white--text"
              icon
            >
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>

          <v-card-text class="white--text pt-0" style="font-size:x-small">
            [본사]부산광역시 강서구 화전산단 1로 115(화전동), (구)부산광역시 강서구 화전동 595-4번지 <br>전화 051) 601-7000 팩스 051) 831-1850 메일 hanla@hanlaims.com
            <v-divider></v-divider>
            <div>Copyright(c) HANLA IMS Co.,Ltd. All right reserved.</div>
          </v-card-text>
        </v-card>
      </v-footer>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {dashboard} from '../api'

export default {
  name: 'Home',
  components: { 
  },
  data() {
    return {
      loading:false,
      dashboardinfo:'',
      error:'',
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        {
          src: require("../assets/n__2.png"),
          text: `앞서가는 기업, 도전하는 기업, 세계 최고의 그 날까지 한라IMS는 최선을 다하겠습니다.`,
        },
        {
          src: 'https://thumbs.dreamstime.com/b/close-up-large-blue-merchant-crago-ship-middle-ocean-underway-performing-cargo-export-import-operations-close-154776607.jpg',
          text: 'First',
        },
        {
          src: 'https://thumbs.dreamstime.com/b/panoramic-view-cranes-loading-shipment-containers-cargo-shipping-port-night-banner-size-logistic-industry-concept-import-150170770.jpg',
          text: 'Second',
        },
        {
          src: 'https://thumbs.dreamstime.com/b/export-import-business-businessmen-handshake-industrial-container-terminal-maritime-transport-logistics-export-209591659.jpg',
          text: 'Third',
        },
        {
          src: 'https://thumbs.dreamstime.com/b/container-ship-carrying-container-import-export-business-logistic-transportation-ship-open-sea-blue-marine-177810567.jpg',
          text: 'Fourth',
        },   
      ],
      total_result: 90,
      annual_results:[
        {
          year: '2020',
          result: 2,
        },
        {
          year: '2021',
          result: 16,
        },
        {
          year: '2022',
          result: 54,
        },
        {
          year: '2023',
          result: 0,
        },
      ],
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }
  },
  created() {
       this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      setTimeout(() => {

      },300000)

      dashboard.fetch()
        .then(data => {
          this.dashboardinfo = data
        })
        .finally(()=>{
          this.loading = false
        })
    }
  }
}
</script>
<style scoped>
.rounded-vertex{
  border-radius: 0.5rem;
}
.shadow-text-white{
  text-shadow: 0px 0px 5px #00000080;
}
</style>