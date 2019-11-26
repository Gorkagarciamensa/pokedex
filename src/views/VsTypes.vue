<template>
  <div>
    <div v-if="getDmg" class="pokeBackground">
      <v-sheet class="overflow-hidden" fixed>
        <div class="pokeTop">
          <div class="pokeWidth20">
            <v-container class="fill-height">
              <v-row align="center" justify="center">
                <div class="table">
                  <v-btn class="pokeMenu" dark @click.stop="drawer = !drawer"
                    >Menu</v-btn
                  >
                </div>
              </v-row>
            </v-container>

            <v-navigation-drawer
              v-model="drawer"
              absolute
              temporary
              width="100%"
              height="200px"
            >
              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="http://novask.in/1124943236.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>
                    <router-link :to="'/'">Pokedex</router-link>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-icon>
                    <v-img
                      width="30px"
                      src="https://cdn6.aptoide.com/imgs/7/1/a/71adfe81043883c6449c5730230e63c8_icon.png?w=240"
                    ></v-img>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>
                      <router-link :to="'/chat'">Chat</router-link>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </div>
          <div class="pokeFlexWidth60">
            <v-btn class="pokeTitle ma-2" outlined :class="typeName">
              <h3>{{ typeName }}</h3>
            </v-btn>
          </div>
        </div>
        <v-card-actions class="pokeMargin">
          <div class="pokeWidth100">
            <fieldset class="pokeBorder">
              <legend class="pokeText">
                <h5>Double Damage From</h5>
              </legend>

              <div class="pokeFlex">
                <div
                  class="pokeDoubleDmg"
                  v-for="(type, i) in getDmg.double_damage_from"
                  :key="i"
                >
                  <router-link :to="'/type/' + type.name">
                    <v-btn class="ma-2" outlined :class="type.name">
                      {{ type.name }}
                    </v-btn>
                  </router-link>
                </div>
              </div>
            </fieldset>

            <fieldset class="pokeBorder">
              <legend class="pokeText">
                <h5>Double Damage To</h5>
              </legend>

              <div class="pokeFlex">
                <div
                  class="pokeDoubleDmg"
                  v-for="(type, i) in getDmg.double_damage_to"
                  :key="i"
                >
                  <router-link :to="'/type/' + type.name">
                    <v-btn class="ma-2" outlined :class="type.name">
                      {{ type.name }}
                    </v-btn>
                  </router-link>
                </div>
              </div>
            </fieldset>
            <fieldset class="pokeBorder">
              <legend class="pokeText">
                <h5>Half Damage from</h5>
              </legend>

              <div class="pokeFlex">
                <div
                  class="pokeDoubleDmg"
                  v-for="(type, i) in getDmg.half_damage_from"
                  :key="i"
                >
                  <router-link :to="'/type/' + type.name">
                    <v-btn class="ma-2" outlined :class="type.name">
                      {{ type.name }}
                    </v-btn>
                  </router-link>
                </div>
              </div>
            </fieldset>
            <fieldset class="pokeBorder">
              <legend class="pokeText">
                <h5>Half Damage To</h5>
              </legend>

              <div class="pokeFlex">
                <div
                  class="pokeDoubleDmg"
                  v-for="(type, i) in getDmg.half_damage_to"
                  :key="i"
                >
                  <router-link :to="'/type/' + type.name">
                    <v-btn class="ma-2" outlined :class="type.name">
                      {{ type.name }}
                    </v-btn>
                  </router-link>
                </div>
              </div>
            </fieldset>
            <fieldset class="pokeBorder">
              <legend class="pokeText">
                <h5>No Damage From</h5>
              </legend>

              <div class="pokeFlex">
                <div
                  class="pokeDoubleDmg"
                  v-for="(type, i) in getDmg.no_damage_from"
                  :key="i"
                >
                  <router-link :to="'/type/' + type.name">
                    <v-btn class="ma-2" outlined :class="type.name">
                      {{ type.name }}
                    </v-btn>
                  </router-link>
                </div>
              </div>
            </fieldset>
            <fieldset class="pokeBorder">
              <legend class="pokeText">
                <h5>No Damage To</h5>
              </legend>

              <div class="pokeFlex">
                <div
                  class="pokeDoubleDmg"
                  v-for="(type, i) in getDmg.no_damage_to"
                  :key="i"
                >
                  <router-link :to="'/type/' + type.name">
                    <v-btn class="ma-2" outlined :class="type.name">
                      {{ type.name }}
                    </v-btn>
                  </router-link>
                </div>
              </div>
            </fieldset>
          </div>
        </v-card-actions>
        <div class="pokeTitle">
          <fieldset class="pokeFieldsets">
            <legend class="pokeText">
              <h4>MOVES</h4>
            </legend>
            <div class="pokeScrollBox pokeCapitalize">
              <div class="textWhite">
                <div v-for="(move, i) in getTypeMoves" :key="i">
                  {{ getTypeMoves[i].name }}
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <h4 class="pokemonText">Pokemon</h4>
        <div class="pokeTitle pokeFlex pokeWidth100 textWhite">
          <div v-for="(pokemon, i) in pokeNormal" :key="i" class="pokeWidth30">
            <PokemonType
              :pokemonUrl="pokemon.pokemon.url"
              class="alignCenter"
            />
            <p class="pokeCenter">{{ pokemon.pokemon.name }}</p>
          </div>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import Pokemon from "../components/Pokemon";
import Description from "../views/Description";
import PokemonType from "../components/PokemonType";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "types",
  components: {
    Description,
    Pokemon,
    PokemonType
  },
  props: {
    typeName: String
  },
  data() {
    return {
      pokePokemon: null,
      pokeTypes: null,
      pokeMoves: null,
      drawer: false
    };
  },

  watch: {
    typeName: function(newTypeName) {
      this.actType(newTypeName);
    }
  },

  methods: {
    ...mapActions(["actType"])
    // getTypeData(name) {
    //   fetch("https://pokeapi.co/api/v2/type/" + name, { method: "GET" })
    //     .then(resp => {
    //       return resp.json();
    //     })
    //     .then(data => {
    //       this.pokePokemon = data.pokemon;
    //       this.pokeTypes = data.damage_relations;
    //       this.pokeMoves = data.moves;
    //     });
    // }
  },
  computed: {
    ...mapGetters(["getPokeTypes", "getDmg", "getTypeMoves"]),
    pokeNormal() {
      return this.getPokeTypes.filter(poke => {
        return poke.pokemon.url.length < 40;
      });
      //el total de pokemons de qualsevol tipus que superen la id: 10000 es de 40
      //per tant, com que no volem que apareguin, agafem tots aquells fins a 40
    }
  },

  created() {
    // this.getTypeData(this.typeName);
    this.actType(this.typeName);
  }
};
</script>

<style>
.theme--light.v-sheet {
  background-color: transparent;
}
fieldset {
  display: block;
  margin-left: 2px;
  margin-right: 2px;
  padding-top: 0.35em;
  padding-bottom: 0.625em;
  padding-left: 0.75em;
  padding-right: 0.75em;
}
.pokeBackground {
  background-image: url("https://images.wallpaperscraft.com/image/pokemon_lilac_mismagius_83612_2560x1600.jpg");
  background-size: cover;
  background-attachment: fixed;
}
.textWhite {
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
@media (orientation: portrait) {
  .pokeMenu {
    width: 100px !important;
    background-color: rgb(227, 53, 13) !important;
    border-color: rgb(227, 53, 13);
  }
  .pokeWidth100 {
    width: 100%;
  }

  legend {
    border: 2px solid black !important;
    background-color: white;
  }
  .pokeTop {
    display: flex;
    border: 2px solid black;
    border-right: none;
    border-left: none;
    border-top: none;
    background-color: rgb(255, 255, 255, 0.5);
  }
  .pokemonText {
    text-align: center;
    text-transform: uppercase;
    font-size: 20px;
    margin-bottom: 10px;
    color: white;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }
  .pokeCenter {
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }

  .pokeWidth20 {
    display: flex;
    justify-content: center;
    width: 40%;
  }
  .pokeWidth30 {
    width: 30%;
  }
  .pokeFlexWidth60 {
    display: flex;
    justify-content: center;
    width: 35%;
    padding-top: 4px;
  }
  .pokeTitle {
    text-transform: uppercase;
    text-align: center;
    margin: 0px 10px;
  }
  .pokeBorder {
    border: 2px solid black;
    margin-bottom: 5px;
    background-color: rgb(255, 255, 255, 0.5);
  }

  .pokeText {
    padding: 0 5px 0 10px;
  }
  .pokeFlex {
    display: flex;
    flex-wrap: wrap;
  }
  .v-application .indigo--text {
    color: black !important;
  }
  .pokeFieldsets {
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 18px;
    width: 100%;
  }
}
@media (orientation: landscape) {
  .pokeMenu {
    width: 100px !important;
    background-color: rgb(227, 53, 13) !important;
    border-color: rgb(227, 53, 13);
    margin-left: 70px;
    margin-top: 15px;
  }
  .pokeFlexWidth60 {
    display: flex;
    width: 100%;
    justify-content: center;
    padding-top: 20px;
  }
  .pokeTop {
    display: flex;
  }
  .pokeFlex {
    display: flex;
    flex-wrap: wrap;
  }

  legend {
    border: 2px solid black !important;
    background-color: white;
  }
  .pokeText {
    padding: 0 5px 0 10px;
  }
  .pokeBorder {
    border: 2px solid black;
    margin-bottom: 5px;
    background-color: rgb(255, 255, 255, 0.5);
  }
  .pokeScrollBox {
    height: 200px;
    text-align: justify;
    overflow: auto;
    width: 95%;
  }
  .pokeWidth30 {
    width: 20%;
    text-transform: uppercase;
  }
  .pokeCenter {
    text-align: center;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }
  .alignCenter {
    display: flex;
    justify-content: center;
  }
  .pokemonText {
    color: white;
    text-align: center;
    font-size: 25px;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }
}
</style>
