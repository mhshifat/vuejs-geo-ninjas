<template>
  <div class="profile container">
    <div v-if="profile" class="card">
      <h2 class="deep-purple-text center">{{profile.alias}}'s Wall</h2>
      <ul class="comments collection">
        <li v-for="(comment, i) in comments" :key="i">
          <div class="deep-purple-text">{{ comment.from }}</div>
          <div class="grey-text text-darken-2">{{ comment.comment }}</div>
        </li>
      </ul>
      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a comment</label>
          <input type="text" name="comment" v-model="comment">
          <p class="red-text center">{{ feedback }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db, fireAuth } from "@/firebase/init";
export default {
  name: "Profile",
  data() {
    return {
      profile: null,
      comment: null,
      feedback: null,
      user: null,
      comments: []
    };
  },
  created() {
    db.collection("users")
      .doc(this.$route.params.id)
      .get()
      .then(user => {
        this.profile = user.data();
      });
    db.collection("users")
      .where("userId", "==", fireAuth.currentUser.uid)
      .get()
      .then(user => {
        user.forEach(doc => {
          this.user = doc.data().alias;
        });
      });
    db.collection("comments")
      .where("to", "==", this.$route.params.id)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(doc => {
          if (doc.type === "added") {
            this.comments.unshift({
              from: doc.doc.data().from,
              comment: doc.doc.data().comment
            });
          }
        });
      });
  },
  methods: {
    addComment() {
      if (!this.comment) {
        this.feedback = "Comment field is required";
      } else {
        this.feedback = null;
        db.collection("comments")
          .add({
            to: this.$route.params.id,
            from: this.user,
            comment: this.comment,
            time: Date.now()
          })
          .then(() => {
            this.comment = null;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.card h2 {
  font-size: 30px;
}
.card {
  padding: 20px;
  margin-top: 60px;
}
.profile h2 {
  font-size: 2em;
  margin-top: 0;
}
.profile li {
  padding: 10px;
  border-bottom: 1px solid eee;
}
</style>
