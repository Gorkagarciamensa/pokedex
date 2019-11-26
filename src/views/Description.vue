<template>
  <div class="backgroundDescription">
    <div class="marginOnly" id="show">
      <div v-if="getDescription" class="content">
        <!-- Si description existeix, carrega'm tot el que hi ha escrit -->

        <div v-if="getTypes" :urlType="getTypes"></div>
        <div class="mediaWidth100">
          <div class="mediaWidth50">
            <div class="flexTotal">
              <div class="flexDesc">
                <div class="pokeDisplayContents">
                  <div class="flexImage">
                    <router-link :to="'/'">
                      <img src="http://novask.in/1124943236.png" alt class="pokedexImage" />
                    </router-link>
                  </div>
                  <div class="pokeFlexWrap">
                    <div>
                      <h3
                        class="flexName pokeAlign pokeWidth100 pokeFlexLand"
                      >{{ pokeId }} - {{ pokemonName }}</h3>
                    </div>
                    <div class="flexDesc">
                      <div
                        class="pokeMargin pokeFlexEnd"
                        v-for="(type, i) in getDescription.types"
                        :key="i"
                        :type="type"
                      >
                        <v-btn class="ma-2" outlined color="black" :class="type.type.name">
                          <router-link :to="'/type/' + type.type.name">
                            <div class="color">{{ type.type.name }}</div>
                          </router-link>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      class="pokeLarge"
                      :src="
                          'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' +
                            pokeId +
                            '.png'
                        "
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flexDesc flexDescWrap">
              <router-link
                :to="'/description/' + getDescription.name"
                class="pokeCapitalize evoFlexChain pokeEvoWidth100"
              >
                <Evolution v-if="getPokeText.url" :evoUrl="getPokeText.url"></Evolution>

                <!-- si evo_chain existeix, v-bind evoUrl amb la data de evo_chain (que s'envia a Evolution amb props) -->
              </router-link>
              <div class="pokeJustify">{{ getPokeText.text }}</div>
            </div>
          </div>
        </div>

        <div class="pokeSpaceBetween">
          <div class="pokeAbilities pokeMediaWidth">
            <h4 class="pokeAbilitiesStyle">Abilities:</h4>
            <div
              class="pokeCapitalize pokeAbilitiesSize"
              v-for="(ab, i) in getDescription.abilities"
              :key="i"
            >{{ ab.ability.name }}</div>
          </div>
          <Chart :descChart="getDescription" class="chart" />
        </div>
        <div>
          <h3 class="flexName textCenter">MOVES</h3>
          <div class="pokeTable">
            <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
              <v-tab>
                <h4>By Level</h4>
              </v-tab>
              <v-tab>
                <h4>By MT</h4>
              </v-tab>
              <v-tab>
                <h4>By Tutor</h4>
              </v-tab>
              <v-tab>
                <h4>By Egg</h4>
              </v-tab>
            </v-tabs>
            <div class="pokeCapitalize pokeScrollBox">
              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <div>
                    <div v-for="(mov, i) in getMoves" :key="i">
                      <div
                        v-if="
                        getMoves[i].version_group_details[0].move_learn_method
                          .name == 'level-up'
                      "
                        class="tableStyle"
                      >
                        <p class="pokeParagraph">{{ getMoves[i].move.name }}</p>
                        <!-- {{ getMoves[i].version_group_details[0].level_learned_at }} -->
                      </div>
                    </div>
                  </div>
                </v-tab-item>

                <v-tab-item>
                  <div>
                    <div v-for="(mov, i) in getMoves" :key="i">
                      <div
                        v-if="
                        getMoves[i].version_group_details[0].move_learn_method
                          .name == 'machine'
                      "
                        class="tableStyle"
                      >
                        <p class="pokeParagraph">{{ getMoves[i].move.name }}</p>
                      </div>
                    </div>
                  </div>
                </v-tab-item>

                <v-tab-item>
                  <div>
                    <div v-for="(mov, i) in getMoves" :key="i">
                      <div
                        v-if="
                        getMoves[i].version_group_details[0].move_learn_method
                          .name == 'tutor'
                      "
                        class="tableStyle"
                      >
                        <p class="pokeParagraph">{{ getMoves[i].move.name }}</p>
                      </div>
                    </div>
                  </div>
                </v-tab-item>
                <v-tab-item>
                  <div>
                    <div v-for="(mov, i) in getMoves" :key="i">
                      <div
                        v-if="
                        getMoves[i].version_group_details[0].move_learn_method
                          .name == 'egg'
                      "
                        class="tableStyle"
                      >
                        <p class="pokeParagraph">{{ getMoves[i].move.name }}</p>
                      </div>
                    </div>
                  </div>
                </v-tab-item>
              </v-tabs-items>
            </div>
          </div>
        </div>

        <!-- por cada v-for, hay que hacer un div dentro de un div, sino, sale este error: Duplicate keys detected: '0', '1'...-->
      </div>

      <div v-else>Loading...</div>
    </div>
  </div>
</template>

<script>
import Pokedex from "../views/Pokedex";
import Evolution from "../components/Evolution";
import Pokemon from "../components/Pokemon";
import EvChain from "../components/EvChain";
import VsTypes from "./VsTypes";
import Chart from "../components/Chart";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "description",
  components: {
    Pokemon,
    Evolution,
    EvChain,
    VsTypes,
    Chart
  },

  data() {
    return {
      tab: null,
      // description: null,
      evo_chain: null,
      // pokeType: null,
      pokeText: null,
      // pokeMt: null,
      pokeMoves: null
    };
  },
  props: {
    pokemonName: String
  },
  watch: {
    pokemonName: function(newPokemonName) {
      this.actDesc(newPokemonName);
      this.actEvoChain(newPokemonName);
      //quan està creat (created) la pagina, el watch ens fa que al clicar a un
      //nou pokemon, aquest canvii el detall. (ex: es crea la pag. de rattata, pero
      //al clicar a la evolucio (raticate) ens canviara el detail a raticate.
    }
  },
  computed: {
    ...mapGetters(["getDescription", "getTypes", "getMoves", "getPokeText"]),

    pokeId() {
      let id = this.getDescription.id;
      console.log(id);

      if (id < 100) {
        id = "0" + id;
      }
      if (id < 10) {
        id = "0" + id;
      }

      return id;
    }
  },
  methods: {
    ...mapActions(["actDesc", "actEvoChain"]),
    // getData(name) {
    //   fetch("https://pokeapi.co/api/v2/pokemon/" + name, {
    //     method: "GET"
    //     //passem el name com a argument
    //   })
    //     .then(resp => {
    //       console.log(resp);
    //       if (resp.ok) {
    //         return resp.json();
    //       }
    //       throw new Error("bad request");
    //     })
    //     .then(data => {
    //       this.description = data;

    //       this.pokeType = data.types;

    //       this.pokeMt = data.moves;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },

    getEvoChain(name) {
      fetch("https://pokeapi.co/api/v2/pokemon-species/" + name, {
        method: "GET"
      })
        .then(resp => {
          console.log(resp);
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("bad request");
        })
        .then(data => {
          this.evo_chain = data.evolution_chain.url;
          if (data.flavor_text_entries[1].language.name == "en") {
            this.pokeText = data.flavor_text_entries[1].flavor_text;
          } else {
            this.pokeText = data.flavor_text_entries[2].flavor_text;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  created() {
    // this.getData(this.pokemonName);
    // cridem el pokemonName (argument) que està en el router.
    // this.getEvoChain(this.pokemonName);
    this.actDesc(this.pokemonName);
    this.actEvoChain(this.pokemonName);
  }
};
</script>

<style>
.textCenter {
  text-align: center;
}
.tableStyle {
  border-left: 3px solid #e3350d;

  background-color: lightgrey;
}
.pokeParagraph {
  padding-left: 5px;
}
.v-application p {
  margin-bottom: 1px !important;
}
@media (orientation: portrait) {
  .marginOnly {
    margin: 10px;
  }
  img {
    height: 80px;
  }
  .pokeCapitalize {
    text-transform: capitalize;
    text-align: justify;
  }
  .pokeJustify {
    text-align: justify;
    border: 1px solid grey;
    padding: 5px;
    background-color: rgb(255, 255, 255, 0.9);
    font-weight: bold;
  }
  .backgroundDescription {
    background-image: url("https://media.idownloadblog.com/wp-content/uploads/2016/07/attack_of_the_titans_pokemon_pikachu_art_98697_750x1334.jpg");
    background-size: cover;
    background-attachment: fixed;
  }
  .flexImage {
    display: flex;
    width: 30%;
    height: 100%;
  }
  .pokedexImage {
    width: 40px;
    height: 40px;
  }
  .pokeFlexEnd {
    display: flex;
    justify-content: flex-end;
  }
  .pokeDisplayContents {
    display: contents;
  }
  .pokeFlexReverse {
    display: flex;
    flex-direction: row-reverse;
  }
  .pokeFlexWrap {
    display: flex;
    flex-wrap: wrap;
  }
  .pokeMarginImg {
    margin-left: 30px;
  }
  .pokeMarginImgMinus {
    margin-left: -50px;
  }

  .pokeMrgTop {
    margin-top: 10px;
  }
  .pokeTable {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  .pokeScrollBox {
    height: 200px;

    text-align: justify;

    overflow: auto;
    width: 95%;
  }
  .table {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .flexDesc {
    display: flex;

    width: 100%;
  }
  .pokeEvoWidth100 {
    width: 100%;
  }
  .flexDescWrap {
    display: flex;
    flex-wrap: wrap;
  }
  .flexName {
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 18px;
    width: 100%;
    background-color: rgb(255, 255, 255, 0.9);
  }
  .chart {
    border: 1px solid grey;
    background-color: rgb(255, 255, 255, 0.9);
  }
  .pokeAbilities {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    border: 1px solid grey;
    background-color: rgb(255, 255, 255, 0.9);
  }
  .pokeType {
    display: flex;
    width: 100%;
    margin-top: -55px;
  }

  .v-slide-group {
    display: inline !important;
  }
  .theme--light.v-tabs-items {
    background-color: transparent !important;
    width: 90% !important;
    margin-top: 20px !important;
  }
  .v-tabs {
    width: auto !important;
  }
  .v-tab {
    padding: 0px !important;
  }
  .tableColor:nth-child(even) {
    background-color: #dddddd;
  }
  .v-slide-group__content {
    border: 1px solid grey;
    background-color: rgb(255, 255, 255, 0.9);
  }
}
@media (orientation: landscape) {
  /*CSS for top description*/
  .pokeDisplayContents {
    display: flex;
    width: 100%;
  }
  .pokedexImage {
    height: 80px;
    width: 80px;
  }
  .pokeFlexWrap {
    width: 80%;
    margin-top: 20px;
  }
  .flexDesc {
    display: flex;
    justify-content: center;
  }
  .pokeFlexLand {
    font-size: 40px;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
  }
  .pokeLarge {
    width: 150px;
    height: 150px;
  }
  .backgroundDescription {
    background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTykPat3OonaSOU27rSyRmlWnJEzzqNzlT1rdzv8f1Bi2rzPUxD");
    background-size: cover;
    background-attachment: fixed;
  }
  .chart {
    background-color: rgb(255, 255, 255, 0.9);
  }
  .evoFlexChain {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .pokeSpaceBetween {
    display: flex;
    justify-content: space-between;
  }
  .pokeJustify {
    margin-left: 30px;
    text-align: justify;
    width: 80%;
    margin-top: 10px;
    border: 1px solid grey;
    border-radius: 5px;
    background-color: rgb(255, 228, 196, 0.7);
    padding: 5px;
    font-weight: bold;
  }
  .pokeFlexEnd {
    display: flex;
    flex-direction: column;

    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
    text-transform: capitalize;
  }
  .pokeMediaWidth {
    width: 50%;
    margin-top: 10px;
    border: 1px solid grey;
    height: 50%;
    background-color: rgb(255, 228, 196, 0.4);
    border-radius: 15px;
  }
  .pokeAbilitiesStyle {
    text-align: center;
    font-size: 23px;
  }
  .pokeAbilitiesSize {
    font-size: 20px;
    text-align: center;
  }
  .pokeCapitalize {
    padding-top: 10px;
    text-transform: capitalize;
  }
}
</style>
