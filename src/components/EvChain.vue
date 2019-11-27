<template>
  <div>
    <router-link :to="'/description/' + name">
      <div class="evoMargin">
        <img
          class="evoImg"
          :src="
            'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' +
              pokeId +
              '.png'
          "
          alt
        />
        <div class="pokeAlign color">{{ name }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
import Description from "../views/Description";

export default {
  props: {
    url: String
  },
  data() {
    return {
      id: null,
      name: null
    };
  },
  watch: {
    url: function(newUrl) {
      this.getData(newUrl);
    }
  },

  methods: {
    getData(url) {
      fetch(url, {
        method: "GET"
      })
        .then(resp => resp.json())
        .then(data => {
          this.id = data.id;
          this.name = data.name;
        });
    }
  },
  computed: {
    pokeId() {
      let imgId = this.id;
      if (imgId < 100) {
        imgId = "0" + imgId;
      }
      if (imgId < 10) {
        imgId = "0" + imgId;
      }
      return imgId;
    }
  },
  created() {
    this.getData(this.url);
  }
};
</script>

<style>
@media (orientation: portrait) {
  .pokeAlign {
    text-align: center;
    text-transform: uppercase;
  }
}
@media (orientation: landscape) {
  .pokeAlign {
    text-align: center;
    text-transform: uppercase;
  }
  .evoMargin {
    margin-left: 10px;
  }
}
</style>
