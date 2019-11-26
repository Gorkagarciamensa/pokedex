<template>
  <div v-if="pokemon">
    <router-link :to="'/description/' + pokemon.name">
      <img
        :src="
          'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' +
            pokeId +
            '.png'
        "
      />
    </router-link>
  </div>
</template>

<script>
import Pokedex from "../views/Pokedex";
import Pokemon from "./Pokemon";
import Description from "../views/Description";
export default {
  name: "pokemonType",
  components: {
    Pokemon,
    Description,
    Pokedex
  },
  props: ["pokemonUrl"],

  data() {
    return {
      pokemon: null
    };
  },
  watch: {
    pokemonUrl: function(newPokemonUrl) {
      this.getPokemon(newPokemonUrl);
    }
  },
  methods: {
    getPokemon() {
      fetch(this.pokemonUrl)
        .then(res => res.json())
        .then(data => (this.pokemon = data));
    }
  },
  computed: {
    pokeId() {
      let id = this.pokemon.id;
      if (id < 100) {
        id = "0" + id;
      }
      if (id < 10) {
        id = "0" + id;
      }
      return id;
    }
  },
  created() {
    this.getPokemon();
    console.log(this.pokemonUrl.length);
  }
};
</script>
<style>
</style>
