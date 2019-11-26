<template>
  <div v-if="pokeData">
    <v-card class="mx-auto pokeCardWidth" outlined hover color="rgba(255,255,255,0.4)!important">
      <router-link :to="'/description/' + pokeName">
        <v-flex d-flex justify-end>
          <img
            :src="
              'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' +
                pokeId +
                '.png'
            "
            alt
            class="image-size"
          />

          <v-flex d-flex flex-column align-center>
            <v-flex d-flex align-end class="pokeMargin">{{ pokeId }} - {{ pokeName }}</v-flex>

            <v-flex>
              <v-card-actions>
                <div class="typeBtn" v-for="(type, i) in pokeData.types" :key="i">
                  <v-btn class="ma-2" outlined color="indigo" :class="type.type.name">
                    <router-link :to="'/type/' + type.type.name">
                      <div class="color">{{ type.type.name }}</div>
                    </router-link>
                  </v-btn>
                </div>
              </v-card-actions>
            </v-flex>
          </v-flex>
        </v-flex>
      </router-link>
    </v-card>
  </div>
</template>

<script>
import Description from "../views/Description";
import Pokedex from "../views/Pokedex";
import VsTypes from "../views/VsTypes";
import PokemonType from "../components/PokemonType";

export default {
  name: "pokemon",
  components: {
    Description,
    VsTypes,
    PokemonType
  },
  props: {
    pokeName: String,
    pokeType: String
  },

  data() {
    return {
      pokeData: null
    };
  },
  watch: {
    pokeName: function() {
      this.pokemonFull();
    } //problema: el created no actualitza la pagina al buscar, i per tant, la imatge no cambiava
    // sol·lució: el watch "mira" cada vegada que la pagina s'actualitza, i l'actualitza
    // amb el nou contingut que tu li dones.
  },
  computed: {
    pokeId() {
      let id = this.pokeData.id;

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
    pokemonFull() {
      fetch("https://pokeapi.co/api/v2/pokemon/" + this.pokeName)
        .then(res => res.json())
        .then(data => (this.pokeData = data));
    }
  },
  created() {
    console.log("created");
    this.pokemonFull();
  }
};
</script>

<style>
img {
  height: 80px;
}
.pokeCardWidth {
  width: 344;
  margin-bottom: 6px;
  background-color: rgb(255, 255, 255, 0.5);
}

/*CLASS FOR TYPE*/

a {
  text-decoration: none;
}
.color {
  color: black !important;
}
.grass {
  background-color: #9bcc50;
}
.poison {
  background-color: #b97fc9;
}
.fire {
  background-color: #fd7d24;
}
.flying {
  background-color: rgb(232, 248, 243);
}
.water {
  background-color: #4592c4;
}
.ground {
  background-color: rgb(241, 173, 85);
}
.electric {
  background-color: #eed535;
}
.bug {
  background-color: #729f3f;
}
.rock {
  background-color: #a38c21;
}
.fighting {
  background-color: #d56723;
}
.steel {
  background-color: #9eb7b8;
}
.psychic {
  background-color: #f366b9;
}
.dark {
  background-color: #707070;
}
.fairy {
  background-color: #fdb9e9;
}
.dragon {
  background-image: linear-gradient(rgb(248, 87, 87), rgb(241, 114, 41));
}
.ice {
  background-color: #51c4e7;
}
.ghost {
  background-color: #7b62a3;
}
.normal {
  background-color: #a4acaf;
}
@media (orientation: portrait) {
  .pokeMargin {
    text-transform: uppercase;
    color: black;
  }

  .typeBtn {
    margin-right: 10px;
    text-transform: capitalize;
  }
  .typeColor {
    background-color: yellow;
    border-radius: 10px;
    border: 2px solid black;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height: 26px;
    padding: 0;
    width: 86px !important;
  }
}
@media (orientation: landscape) {
  .v-btn:not(.v-btn--round).v-size--default {
    height: 26px;
    padding: 0;
    width: 200px;
  }
}
</style>
