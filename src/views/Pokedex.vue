<template>
  <div>
    <div class="background">
      <!--v-if="!loading"-->

      <v-app-bar fixed app color="#9b806f">
        <v-container class="fill-height">
          <v-row align="center" justify="center">
            <div class="table">
              <v-btn color="#e3350d" dark @click.stop="drawer = !drawer">Menu</v-btn>

              <searchbar @search="pokeSearching" />
            </div>
          </v-row>
        </v-container>

        <v-navigation-drawer v-model="drawer" absolute temporary width="100%" height="200px">
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
      </v-app-bar>
      <div>
        <div class="content">
          <v-flex d-flex flex-column align-stretch>
            <Pokemon v-for="(pokemon, index) in pokeFilter" :key="index" :pokeName="pokemon.name" />
          </v-flex>
        </div>
      </div>

      <!-- agafa el prop pokeName de Pokemon.vue i fa v-bind per que sigui pokemon.name -->
      <div v-if="pokeFilter.length > 0" id="loader" class="loader">
        <div v-if="this.search.length === 0" class="pokeball"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Description from "./Description";
import Pokemon from "../components/Pokemon";
import Searchbar from "../components/Searchbar";
import PokemonType from "../components/PokemonType";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "pokedex",
  components: {
    Description,
    Pokemon,
    Searchbar,
    PokemonType
  },
  data() {
    return {
      pokeDex: null,
      search: "",
      nextUrl: null,
      loading: true,

      drawer: false
    };
  },

  methods: {
    ...mapActions(["actPokemons", "actUrl", "actAllPokemons"]),
    // getData() {
    //   this.loading = true;
    //   fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20")
    //     .then(res => res.json())
    //     .then(data => {
    //       this.pokeDex = data.results;
    //       this.nextUrl = data.next;
    //       this.loading = false;
    //     });
    // },
    // getUrl(url) {
    //   console.log("next");
    //   console.log(url);
    //   if (url) {
    //     fetch(url)
    //       .then(res => res.json())
    //       .then(data => {
    //         this.pokeDex = [...this.pokeDex, ...data.results];
    //         //els ... deconstrueixen l'array per cada un dels objectes que estan dins
    //         //i com que esta dins d'una array, els converteix tots en una array
    //         this.nextUrl = data.next;
    //       });
    //   }
    // },

    pokeSearching(dex) {
      this.search = dex;
    },
    infiniteScroll() {
      window.onscroll = () => {
        var el = document.getElementById("loader");
        var rect = el.getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;

        // Only completely visible elements return true:
        var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
        // Partially visible elements return true:
        //isVisible = elemTop < window.innerHeight && elemBottom >= 0;

        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (isVisible) {
          this.actUrl();
        }
      };
    }
  },

  computed: {
    ...mapGetters(["getPokemons", "getAllPokemons"]),
    pokeFilter() {
      this.loading = false;
      let poke = this.getPokemons.filter(poke => {
        return poke.name.includes(this.search.toLowerCase());
      });

      return poke;
    }
  },

  created() {
    if (this.getPokemons.length == 0) {
      this.actPokemons();
      this.actAllPokemons();
    }
  },
  mounted() {
    this.infiniteScroll();
  }
};
</script>

<style>
.content {
  width: 95%;
  margin-left: 10px;
  font-family: "FlexoW01-Demi";
}
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.background {
  background-image: url("https://images.wallpaperscraft.com/image/pokemon_animal_cyndaquil_83569_1280x720.jpg");
  background-attachment: fixed;
  background-size: cover;
  height: 100%;
  min-height: 1500px;
}
.v-overlay--active {
  height: 736px;
}
@media (orientation: portrait) {
  body {
    background-color: #192935;
  }

  .v-application .overflow-hidden {
    background-size: cover;
    background-attachment: fixed;
  }

  .theme--light.v-card {
    background-color: #ffffff !important;
  }
}
@media (orientation: landscape) {
  .table {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .pokeMargin {
    text-transform: uppercase;
    color: black;
  }
}

/*LOADER*/

.loader {
  display: flex;
  justify-content: center;
}

.pokeball {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  border: 3px solid;
  animation: frames 0.8s linear 0s infinite;
}

.pokeball:after {
  content: "";
  position: absolute;
  width: 60px;
  height: 30px;
  background-color: red;
  border-bottom: 4px solid;
  top: -1px;
}

.pokeball:before {
  content: "";
  position: absolute;
  background-color: #fff;
  width: 10px;
  height: 10px;
  border: 4px solid;
  border-radius: 50%;
  bottom: 22px;
  right: 22px;
  z-index: 1;
}

/* AnimationFrames */
@keyframes frames {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
