<template>
  <div class="totalWidth">
    <div v-if="pokeEv">
      <div class="flex">
        <!-- 4- si pokeEv existeix, v-bind url (per enviar a EvChain.vue)-->
        <EvChain v-if="pokeEv" :url="pokeEv.species.url" />

        <v-carousel
          v-if="pokeEv && pokeEv.evolves_to.length > 0"
          height="120"
          class="pokeWidth50"
          hide-delimiters
          align="center"
          vertical
          :continuous="false"
        >
          <v-carousel-item v-for="(poke, index) in pokeEv.evolves_to" :key="index">
            <EvChain :url="poke.species.url" />
          </v-carousel-item>
        </v-carousel>

        <!--si pokeEv existeix i la llargaria de l'array es > 0, v-bind url-->

        <EvChain
          v-if="
            pokeEv &&
              pokeEv.evolves_to.length > 0 &&
              pokeEv.evolves_to[0].evolves_to.length > 0
          "
          :url="pokeEv.evolves_to[0].evolves_to[0].species.url"
        />
        <!-- <EvChain v-if="pokeEv" />
        <EvChain v-for="(eevee, i) in pokeEv.evolves_to" :key="i">
          <EvChain v-if="pokeEv && pokeEv.species.name == 'eevee'" :url="eevee.species.url"></EvChain>
        </EvChain>-->

        <!-- lo mismo pero mas largo-->
      </div>
    </div>
  </div>
</template>

<script>
import Description from "../views/Description";
import EvChain from "../components/EvChain";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    EvChain
  },
  props: {
    evoUrl: String
    //1- rebem la info que ens passa amb el v-bind des de "Description"
    //ara mateix aquesta evoUrl es la url de la evolution chain
  },
  data() {
    return {
      // pokeEv: null
    };
  },
  computed: {
    ...mapGetters(["getEvoChain"]),
    pokeEv() {
      return this.getEvoChain;
    }
  },
  methods: {
    ...mapActions(["actEvoChainUrl"])
    // getEvoData(url) {
    //   fetch(url, { method: "GET" })
    //     .then(res => {
    //       return res.json();
    //     })
    //     .then(data => {
    //       this.pokeEv = data.chain;
    //       console.log(this.pokeEv);
    //       //2- fem fetch a la url i agafem el que ens interessa
    //     });
    // }
  },
  created() {
    console.log("in evolu");

    this.actEvoChainUrl(this.evoUrl);
    // this.getEvoData(this.evoUrl);
    //3- cridem la url aqui
  }
};
</script>

<style>
@media (orientation: portrait) {
  .flex {
    display: flex;
    justify-content: space-evenly;
  }
  .pokeWidth50 {
    width: 50% !important;
  }
}
@media (orientation: landscape) {
  .flex {
    display: flex;
    justify-content: center;
  }
  .totalWidth {
    width: 100%;
  }

  .pokeWidth50 {
    width: 50%;
  }
}
</style>
