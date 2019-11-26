<template>
  <div>
    <img
      v-if="!auth"
      @click="googleLogin"
      :src="
        'https://icon-library.net/images/google-sign-in-icon/google-sign-in-icon-15.jpg'
      "
      alt="google Login"
    />

    <div v-else>
      <img :src="auth.avatar" alt="profile image" />
      <h4>{{ auth.name }}</h4>
      <button @click="logOut">Log Out</button>
    </div>
  </div>
</template>

<script>
import fb from "../fb";

export default {
  data() {
    return {
      auth: null
    };
  },

  methods: {
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
          this.auth = user;

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
          that.auth = null;
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  },
  created() {
    this.getMsg();
  }
};
</script>

<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
