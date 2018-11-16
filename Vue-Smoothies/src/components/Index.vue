<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="indigo-text">{{smoothie.title}}</h2>
        <ul class="ingredients">
          <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ingredient}}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug} }">
            <i class="material-icons">edit</i>
          </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Index',
  data () {
    return {
      smoothies: []
    }
  },
  methods: {
    deleteSmoothie (id) {
      // delete doc from firestore
      db.collection('smoothies').doc(id).delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(smoothie => {
            return smoothie.id !== id
          })
        })
    }
  },
  created () {
    // fetch data from the firestore
    db.collection('smoothies').get().then(snapshot => {
      snapshot.forEach(doc => {
        let smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
      })
    })
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.index {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 50px;
  .card {
    flex: 1 0 30%;
    display: inline-block;
    max-width: 30%;
    margin: 30px 15px;
    position: relative;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
    .delete {
      position: absolute;
      top: 4px;
      right: 4px;
    }
  }
  h2 {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
  }
  .ingredients {
    margin: 30px auto;
    li {
      display: inline-block;
    }
  }
}
</style>
