<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{ smoothie.title }} Smoothie</h2>
    <form @submit.prevent="EditSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" id="title" name="title" v-model="smoothie.title">
      </div>
      <div class="added-ingredients" v-for="(ing, index) in smoothie.ingredients" :key="index">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" id="ingredient" v-model="smoothie.ingredients[index]">
        <button class="btn pink" @click.prevent="RemoveIng(ing)"><i class="material-icons">remove</i></button>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add and ingredient: <span>(Press tab to add another ingredient)</span></label>
        <input type="text" id="add-ingredient" name="add-ingredient" @keydown.tab.prevent="AddIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'EditSmoothie',
  data () {
    return {
      smoothie: null,
      another: null,
      feedback: null
    }
  },
  methods: {
    EditSmoothie () {
      if (this.smoothie.title) {
        if (this.another) {
          this.smoothie.ingredients.push(this.another)
          this.another = null
        }
        this.feedback = null
        // create a slug
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection('smoothies').doc(this.smoothie.id).update({
          title: this.smoothie.title,
          ingredients: this.smoothie.ingredients,
          slug: this.smoothie.slug
        }).then(() => {
          this.$router.push({ name: 'Index' })
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.feedback = 'You must enter a smoothie title'
      }
    },
    AddIng () {
      if (this.another) {
        this.smoothie.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add an ingredient'
      }
    },
    RemoveIng (ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
        return ingredient !== ing
      })
    }
  },
  created () {
    let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data()
        this.smoothie.id = doc.id
      })
    })
  }
}
</script>

<style lang="scss">
  .edit-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
    h2 {
      font-size: 2em;
      margin: 20px auto;
    }
    .field {
      margin: 20px auto;
    }
    label span {
      font-style: italic;
    }
    .added-ingredients {
      position: relative;
      button {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
