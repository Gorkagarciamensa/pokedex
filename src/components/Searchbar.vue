<template>
  <div>
    <input
      type="text"
      v-model="search"
      v-on:keyup="pokeFiltering"
      class="pokeSearchTerm"
      placeholder="Search a Pokemon"
    />
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
      console.log("hello world" + this.search);
    }
  }
};
</script>

<style>
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
</style>
