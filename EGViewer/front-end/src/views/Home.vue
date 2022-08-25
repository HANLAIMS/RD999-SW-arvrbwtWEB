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
            justify="start"
            style="padding-left:250px; padding-bottom: 50px"
          >
            <div v-html="slide.text" class="text-h4 shadow-text-white">
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
                <router-link to="/ship-list" tag = 'button'>
                  <button>
                    <v-card 
                      class="rounded-vertex"
                      width="155"
                      height="155"
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
                    width="155"
                    height="155"
                    color="#FFFFFF1A"
                  >
                    <v-sheet
                      color="#213A5B"
                      height="40%"
                      rounded="true"
                    >
                      <v-card-text style="color:white; font-size:large;padding-top:25px">
                        총 설치 척수
                      </v-card-text>
                    </v-sheet>
                    <v-sheet
                      color="transparent"
                      height="60%"
                      rounded="true"
                    >
                      <v-card-text style="color:white; font-size:large;padding-top:40px">
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
                    <div class=" pt-0 text-h5" style="color:transparent;margin-top:32px"></div>
                  </v-row>
                  <v-row>
                    <button>
                      <v-card 
                        class="rounded-vertex"
                        width="155"
                        height="155"
                        color="#FFFFFF1A"
                      >
                        <v-sheet
                          color="#213A5B"
                          height="40%"
                          style="margin:0px;"
                          rounded="true"
                        >
                          <v-card-text style="color:white; font-size:large;padding-top:25px">
                            {{annual_result.year}}년
                          </v-card-text>
                        </v-sheet>

                        <v-sheet
                          color="transparent"
                          height="60%"
                          rounded="true"
                        >
                          <v-card-text style="color:white; font-size:large;padding-top:40px">
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
              :key="icon.shape"
              class="mx-4 white--text"
              icon
            >
              <a :href="icon.link"
                target='_blank'
                style="text-decoration:none; color:white"
              >
                <v-icon size="24px">
                  {{ icon.shape }}
                </v-icon>
              </a>
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
        // {
        //   src: require("../assets/n__2.png"),
        //   text: `우리가 만든<br/><b>'세계 유일의 혁신'</b>`,
        // },
        {
          src: 'https://thumbs.dreamstime.com/b/close-up-large-blue-merchant-crago-ship-middle-ocean-underway-performing-cargo-export-import-operations-close-154776607.jpg',
          text: `우리가 만든<br/>'세계 유일의 혁신'`,
        },
        {
          src: 'https://thumbs.dreamstime.com/b/panoramic-view-cranes-loading-shipment-containers-cargo-shipping-port-night-banner-size-logistic-industry-concept-import-150170770.jpg',
          text: `그것의 또 다른 말은<br/>'멈추지 않는 도전'이었습니다.`,
        },
        {
          src: 'https://thumbs.dreamstime.com/b/container-ship-carrying-container-import-export-business-logistic-transportation-ship-open-sea-blue-marine-177810567.jpg',
          text: `앞서가는 기업, 도전하는 기업`,
        },
        {
          src: 'https://thumbs.dreamstime.com/b/export-import-business-businessmen-handshake-industrial-container-terminal-maritime-transport-logistics-export-209591659.jpg',
          text: `세계 최고의 그 날까지<br/>한라IMS는 최선을 다하겠습니다.`,
        },   
      ],
      total_result: 72,
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
        {
          shape: 'mdi-twitter',
          link: 'https://twitter.com/',
        },
        {
          shape: 'mdi-youtube',
          link: 'https://www.youtube.com/watch?v=xOMuRYuwtec',
        },
        {
          shape: 'mdi-linkedin',
          link: 'https://www.saramin.co.kr/zf_user/company-info/view?csn=QUQ2bFZ4YkRJejBiMEpaR284Z2pMUT09',
        },
      ],
    }
  },
  created() {
       this.fetchData()
  },
  computed:{
    
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
  text-shadow: 0px 10px 10px #00000080;
  text-align: left;
  color:white;
}
</style>