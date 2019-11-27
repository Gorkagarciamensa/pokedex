import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex); //tells js to use the plugin from vue (vue uses vuex as a plugin)

export default new Vuex.Store({
  state: {
    allPokemons: [],
    pokemons: [],
    pokedex: [],
    url: "",
    description: null, //desc. of 1 pokemon
    types: [], //all types
    moves: [], //moves for 1 pokemon

    evoChain: null,
    pokeText: [],

    pokemonType: [], //all pokemons of 1 type
    damage: [],
    typeMoves: [], //all moves from 1 type

    user: null
  },
  mutations: {
    //page for pokedex
    get_pokemons: (state, payload) => {
      console.log(payload);
      return (state.pokemons = payload);
    },
    get_allPokemons: (state, payload) => {
      console.log(payload);
      return (state.allPokemons = payload);
    },
    add_pokemons: (state, payload) => {
      return (state.pokemons = [...state.pokemons, ...payload]);
    },
    get_url: (state, payload) => {
      console.log(payload);
      return (state.url = payload);
    },
    //page for description of 1 pokemon
    get_desc: (state, payload) => (state.description = payload),
    get_type: (state, payload) => (state.types = payload),
    get_moves: (state, payload) => (state.moves = payload),

    get_pokeText: (state, payload) => (state.pokeText = payload),

    get_evoChainUrl: (state, payload) => (state.evoChain = payload),
    //page for type, damage and pokemon type
    get_pokemonType: (state, payload) => (state.pokemonType = payload),
    get_dmg: (state, payload) => (state.damage = payload),
    get_typeMoves: (state, payload) => (state.typeMoves = payload),

    set_user: (state, payload) => (state.user = payload)
  },
  actions: {
    //pokedex
    actPokemons(context) {
      console.log(context);
      fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20")
        .then(resp => resp.json())
        .then(data => {
          console.log(data);
          context.commit("get_pokemons", data.results);
          context.commit("get_url", data.next);
        });
    },
    actAllPokemons(context) {
      fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=807")
        .then(resp => {
          console.log(resp);
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("bad request");
        })
        .then(data => {
          console.log(data);
          context.commit("get_allPokemons", data.results);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //description
    actDesc(context, name) {
      fetch("https://pokeapi.co/api/v2/pokemon/" + name, {
        method: "GET"
        //passem el name com a argument
      })
        .then(resp => {
          console.log(resp);
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("bad request");
        })
        .then(data => {
          context.commit("get_desc", data);

          context.commit("get_type", data.types);

          context.commit("get_moves", data.moves);
        })
        .catch(error => {
          console.log(error);
        });
    },

    actEvoChain(context, name) {
      fetch("https://pokeapi.co/api/v2/pokemon-species/" + name, {
        method: "GET"
      })
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("bad request");
        })
        .then(data => {
          console.log(data.evolution_chain.url);
          if (data.flavor_text_entries[1].language.name == "en") {
            console.log(data.flavor_text_entries[1].language.name);
            context.commit("get_pokeText", {
              url: data.evolution_chain.url,
              text: data.flavor_text_entries[1].flavor_text
            });
            console.log(context);
          } else {
            context.commit("get_pokeText", {
              url: data.evolution_chain.url,
              text: data.flavor_text_entries[2].flavor_text
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    actEvoChainUrl(context, payload) {
      console.log(payload);
      fetch(payload)
        .then(resp => resp.json())
        .then(data => {
          context.commit("get_evoChainUrl", data.chain);
        });
    },

    //types
    actType(context, name) {
      fetch("https://pokeapi.co/api/v2/type/" + name, { method: "GET" })
        .then(resp => {
          return resp.json();
        })
        .then(data => {
          context.commit("get_pokemonType", data.pokemon);
          context.commit("get_dmg", data.damage_relations);
          context.commit("get_typeMoves", data.moves);
        });
    },

    //url for pokedex
    actUrl(context) {
      console.log(context.getters);
      fetch(context.getters.getUrl)
        //cridem la proxima url desde el getters
        .then(resp => resp.json())
        .then(data => {
          context.commit("add_pokemons", data.results);
          context.commit("get_url", data.next);
        });
    },
    //all user logged in
    set_user({ commit }, user) {
      commit("set_user", user);
    }
  },

  getters: {
    //pokedex
    getAllPokemons: state => state.allPokemons,
    getPokemons: state => state.pokemons, //es crida a created
    //description
    getDescription: state => state.description,
    getUrl: state => state.url,
    getTypes: state => state.types,
    getMoves: state => state.moves,
    //evolution chain
    getEvoChain: state => state.evoChain,
    getPokeText: state => state.pokeText,
    //vsTypes
    getPokeTypes: state => state.pokemonType,
    getDmg: state => state.damage,
    getTypeMoves: state => state.typeMoves,

    //login
    getUser: state => state.user
  },
  modules: {}
});
