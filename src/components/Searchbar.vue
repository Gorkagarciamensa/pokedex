<template>
  <div class="flexInput">
    <input
      type="text"
      v-model="search"
      v-on:keyup="pokeFiltering"
      class="pokeSearchTerm"
      placeholder="Search a Pokemon"
    />
    <router-link v-if="this.search.length > 0" :to="'/description/' + this.search">
      <button class="pokeButton">Go!</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ""
    };
  },

  methods: {
    pokeFiltering() {
      this.$emit("search", this.search);
      console.log(this.search);
    }
  }
};
</script>

<style>
.flexInput {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}
::placeholder {
  color: white;
}
.pokeSearchTerm {
  border: 2px solid rgb(227, 53, 13);

  padding: 5px;
  height: 28px;
  border-radius: 5px 0 20px 5px;
  outline: none;
  color: #9dbfaf;
}
.pokeSearchTerm:focus {
  color: white;
}
.pokeButton {
  background-color: #e3350d;
  border: 2px solid black;
  border-radius: 10px;
  color: white;
  padding: 0px 10px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin-top: -1px;
}
</style>
