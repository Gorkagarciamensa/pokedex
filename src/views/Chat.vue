<template>
  <div class="chatHeight100">
    <div v-if="!auth" class="chatBackground">
      <div class="megaHeight">
        <div class="megaWidth">
          <div class="pleaseLog">Please, login to chat</div>
          <div class="logoCenter">
            <div class="googleWidth">
              <img
                @click="googleLogin"
                :src="
                  'https://cdn.icon-icons.com/icons2/1269/PNG/512/1497553309-101_84843.png'
                "
                alt="google Login"
                class="logoggle"
              />
            </div>
            <div class="pokedexCenter">
              <router-link :to="'/'" class="dexWidth">
                <img
                  src="http://novask.in/1124943236.png"
                  alt
                  class="pokedexImage"
                />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <section class="msger">
        <header class="msger-header">
          <div class="msger-header-title flex-header">
            <img
              @click="logOut"
              class="marginLogout"
              :src="'https://img.icons8.com/cotton/2x/logout-rounded-left.png'"
            />

            <i class="fas fa-comment-alt"></i>
            <p class="msg-chat">Chat</p>
            <router-link :to="'/'">
              <img
                src="http://novask.in/1124943236.png"
                alt
                class="pokedexImage"
              />
            </router-link>
          </div>
          <div class="msger-header-options">
            <span>
              <i class="fas fa-cog"></i>
            </span>
          </div>
        </header>

        <form class="msger-inputarea" onSubmit="return false">
          <input
            type="text"
            class="msger-input"
            v-model="message"
            placeholder="Enter your message..."
          />
          <button type="submit" class="msger-send-btn" @click="sendMsg">
            Send
          </button>
        </form>
      </section>

      <div id="container" class="msger-chat">
        <div v-for="(v, k, i) in messages" :key="i">
          <div class="msg right-msg">
            <div>
              <img :src="v.user.avatar" class="msg-img" />
            </div>

            <div class="msg-bubble">
              <div class="msg-info">{{ v.msg }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fb from "../fb";
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    msg: String
  },
  data() {
    return {
      message: "",
      messages: [],

      drawer: false
    };
  },

  methods: {
    ...mapActions(["set_user"]),
    sendMsg() {
      console.log("consolelog ", fb);
      fb.database()
        .ref()
        .child("chats")
        .push({ user: this.auth, msg: this.message });
      this.message = "";
    },
    getMsg() {
      fb.database()
        .ref("chats/")
        .on("value", snapshot => {
          console.log(snapshot.val());
          this.messages = snapshot.val();
        });
    },
    googleLogin() {
      const provider = new fb.auth.GoogleAuthProvider();

      fb.auth()
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.

          // The signed-in user info.
          var user = result.user;
          console.log(user);
          var user = {
            name: result.user.displayName,
            email: result.user.email,
            avatar: result.user.photoURL
          };
          this.set_user(user);

          console.log(this.auth);
          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },

    logOut() {
      let that = this;
      fb.auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
          this.set_user(null);
        })
        .catch(function(error) {
          // An error happened.
        });
    },
    scrollToEnd() {
      if (this.auth) {
        console.log("ins");
        setTimeout(() => {
          document.querySelector(
            "#container"
          ).scrollTop = document.querySelector("#container").scrollHeight;
        }, 20);
      }
    }
  },
  watch: {
    messages() {
      console.log("scrolling");
      this.scrollToEnd();
    }
  },
  computed: {
    ...mapGetters(["getUser"]),
    auth() {
      return this.getUser;
    }
  },
  created() {
    this.getMsg();
  }
};
</script>

<style scoped>
@media (orientation: portrait) {
  .chatHeight100 {
    height: 100%;
  }
  .pleaseLog {
    text-align: center;
    padding-top: 280px;
    font-size: 30px;
    font-weight: bold;
  }
  .logoCenter {
    display: flex;
    justify-content: center;
  }
  .pokedexCenter {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 50%;
  }
  .chatBackground {
    height: 100%;
    background-image: url("https://i.pinimg.com/originals/df/4e/8b/df4e8ba28f912bf9cdf9fa0dfc196411.png");
    background-size: cover;
    background-attachment: fixed;
  }
  .megaHeight {
    height: 100%;
  }
  .googleWidth {
    width: 50%;
    display: flex;
    justify-content: center;
  }
  .dexWidth {
    display: flex;
    justify-content: center;
  }
  .marginLogout {
    height: 50px;
  }
}
@media (orientation: landscape) {
  .chatHeight100 {
    height: 100%;
  }
  .chatBackground {
    height: 100%;
    background-image: url("https://i.pinimg.com/originals/df/4e/8b/df4e8ba28f912bf9cdf9fa0dfc196411.png");
    background-size: cover;
    background-attachment: fixed;
  }
  .megaHeight {
    height: 100%;
  }
  .megaWidth {
    width: 100%;
  }
  .pleaseLog {
    display: flex;
    justify-content: center;
    padding-top: 100px;
    font-size: 25px;
    font-weight: bold;
  }
  .logoCenter {
    display: flex;
    justify-content: space-evenly;
  }
  .logoggle {
    width: 100px;
    height: 100px;
  }
  .pokedexCenter {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .pokedexImage {
    width: 106px;
    height: 106px;
  }
  .marginLogout {
    height: 55px;
  }
}

/*HERE COMES THE MADNESS*/

:root {
  --body-bg: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  --msger-bg: #fff;
  --border: 2px solid #ddd;
  --left-msg-bg: #ececec;
  --right-msg-bg: #579ffb;
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: var(--body-bg);
  font-family: Helvetica, sans-serif;
}

.msger {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  /* width: 100%; */
  max-width: 867px;
  /* margin: 25px 10px; */
  height: calc(100% - 50px);
  border: var(--border);
  border-radius: 5px;
  background: var(--msger-bg);
  box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.2);
}

.msger-header {
  display: flex;
  justify-content: space-between;

  border-bottom: var(--border);
  background: #e3350d;

  position: fixed;
  width: 100%;
}
.flex-header {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}
.pokedexImage {
  width: 50px;
  height: 50px;
}
.msger-chat {
  flex: 1;
  overflow: scroll;
  padding: 10px;
  margin-bottom: 60px;
  height: 90vh;
  background-image: url("https://fsb.zobj.net/crop.php?r=KtUsiJKhg4v888LPkOmhE_456me5mxeYeY2ms8oy4S_ttVa-WRvH3hw2khAXlsbeCJ8RmyPoEdiAt6NKhg_tQqBG89C9XnSH5CEa5eo1CNauP9PmggUTCShEwZn2Y1RQgUdiJ-_hr_ZISvjh");
  background-size: cover;
  background-attachment: fixed;
}

.msg-chat {
  font-size: 30px;
  font-weight: bold;
  width: 100%;
  text-align: center;
}

.msg {
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
}
.msg:last-of-type {
  /* margin: 0; */
}
.msg-img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background: #ddd;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}
.msg-bubble {
  max-width: 450px;
  padding: 15px;
  border-radius: 15px;
}
.msg-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  word-break: break-all;
}
.msg-info-name {
  margin-right: 10px;
  font-weight: bold;
}
.msg-info-time {
  font-size: 0.85em;
}

.left-msg .msg-bubble {
  border-bottom-left-radius: 0;
}

.right-msg {
  flex-direction: row-reverse;
}
.right-msg .msg-bubble {
  background: #579ffb;

  /* color: #fff; */
  border-bottom-right-radius: 0;
}
.right-msg .msg-img {
  margin: 0 0 0 10px;
}

.msger-inputarea {
  display: flex;
  padding: 10px;
  border-top: var(--border);
  background: #eee;
  position: fixed;
  bottom: 0px;
  width: 100%;
}
.msger-inputarea * {
  padding: 10px;
  border: none;
  border-radius: 3px;
  font-size: 1em;
}
.msger-input {
  flex: 1;
  background: #ddd;
}
.msger-send-btn {
  margin-left: 10px;
  background: rgb(0, 196, 65);
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.23s;
}
.msger-send-btn:hover {
  background: rgb(0, 180, 50);
}

/* .chatImage {
    width: 40px;
    height: 40px;
    border-radius: 25px;
  } */
</style>
