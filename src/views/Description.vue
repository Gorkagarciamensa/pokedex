<template>
  <div class="pokeHeight100">
    <div class="marginOnly backgroundDescription" id="show" v-if="getDescription">
      <div class="content">
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
                      >{{ pokeId }} - {{ getDescription.name }}</h3>
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

                <!-- si getPokeText existeix, v-bind evoUrl amb la data de getPokeText.url (que s'envia a Evolution amb props) -->
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
                    <div v-for="(mov, i) in levelUpMoves" :key="i">
                      <div class="tableStyle">
                        <p class="pokeParagraph">{{ mov.move.name }} -</p>
                        <p>{{mov.version_group_details[0].level_learned_at}}</p>
                      </div>
                    </div>
                  </div>
                </v-tab-item>

                <v-tab-item>
                  <div>
                    <div v-for="(mov, i) in mtMoves" :key="i">
                      <div class="tableStyle">
                        <p class="pokeParagraph">{{ mov.move.name }}</p>
                      </div>
                    </div>
                  </div>
                </v-tab-item>

                <v-tab-item>
                  <div>
                    <div v-for="(mov, i) in tutorMoves" :key="i">
                      <div class="tableStyle">
                        <p class="pokeParagraph">{{ mov.move.name }}</p>
                      </div>
                    </div>
                  </div>
                </v-tab-item>
                <v-tab-item>
                  <div>
                    <div v-for="(mov, i) in eggMoves" :key="i">
                      <div class="tableStyle">
                        <p class="pokeParagraph">{{ mov.move.name }}</p>
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
    </div>
    <div v-else class="pokemon_not_found">
      <router-link :to="'/'">
        <img src="http://novask.in/1124943236.png" alt class="pokedex_back" />
      </router-link>
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
      tab: null
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
    },
    levelUpMoves() {
      return this.getMoves
        .filter(move => {
          return (
            move.version_group_details[0].move_learn_method.name == "level-up"
          );
        })
        .sort((a, b) => {
          return (
            a.version_group_details[0].level_learned_at -
            b.version_group_details[0].level_learned_at
          );
        });
    },
    mtMoves() {
      return this.getMoves.filter(move => {
        return (
          move.version_group_details[0].move_learn_method.name == "machine"
        );
      });
    },
    tutorMoves() {
      return this.getMoves.filter(move => {
        return move.version_group_details[0].move_learn_method.name == "tutor";
      });
    },
    eggMoves() {
      return this.getMoves.filter(move => {
        return move.version_group_details[0].move_learn_method.name == "egg";
      });
    }
  },
  methods: {
    ...mapActions(["actDesc", "actEvoChain"])
  },

  created() {
    // this.getData(this.pokemonName);
    // cridem el pokemonName (argument) que està en el router.
    // this.getEvoChain(this.pokemonName);
    this.actDesc(this.pokemonName);
    this.actEvoChain(this.pokemonName);
  },
  beforeDestroy() {
    console.log("destroyed");
    this.actDesc(null);
    this.actEvoChain(null);
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
  .v-content__wrap {
    background-color: white;
  }
  .pokeHeight100 {
    height: 100%;
  }
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
  .pokemon_not_found {
    background-image: url("https://ih1.redbubble.net/image.731955024.9007/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg");
    background-size: contain;
    background-attachment: fixed;
    height: 100%;
  }
  .pokedex_back {
    position: absolute;
    left: 168px;
    top: 500px;
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
  .pokeHeight100 {
    height: 100%;
  }
  .pokemon_not_found {
    background-color: white;
    background-image: url("../assets/luxio404.jpg");
    background-size: contain;
    background-attachment: fixed;
    height: 100%;
  }
  .pokedex_back {
    position: absolute;
    left: 450px;
    top: 100px;
    width: 200px;
    height: 200px;
  }
}
</style>
