<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="AddSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" id="title" name="title" v-model="title">
      </div>
      <div class="added-ingredients" v-for="(ing, index) in ingredients" :key="index">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" id="ingredient" v-model="ingredients[index]">
        <button class="btn pink" @click.prevent="RemoveIng(ing)"><i class="material-icons">remove</i></button>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add and ingredient: <span>(Press tab to add another ingredient)</span></label>
        <input type="text" id="add-ingredient" name="add-ingredient" @keydown.tab.prevent="AddIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'AddSmoothie',
  data () {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    }
  },
  methods: {
    AddSmoothie () {
      if (this.title) {
        if (this.another) {
          this.ingredients.push(this.another)
          this.another = null
        }
        this.feedback = null
        // create a slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection('smoothies').add({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug
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
        this.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add an ingredient'
      }
    },
    RemoveIng (ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient !== ing
      })
    }
  }
}
</script>

<style lang="scss">
.add-smoothie {
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
