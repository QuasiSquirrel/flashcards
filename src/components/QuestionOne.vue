<template>
  <div>
      <h2>Nice one!</h2> 
      <p>Now, what were the sharps or flats played?</p><br>
      <p><input v-on:mouseenter="appear($event)"
                v-on:mouseleave="instructions.visibility = 'hidden'"
                v-on:keyup.enter="check()"
                v-model="answer"
                type="text" placeholder="Example: Eb Bb" ref="answer" id="answer" autocomplete="off">
          <button v-on:click="check()">Check answer</button>
          <br><br><span ref="instructions">Seperate notes with space.<br>
          Use "#" to denote sharps<br>
          and "b" to denote flats.<br>
          Example: B flat would be "Bb".<br>
          Leave empty if none.</span>
      </p>
  </div>
</template>

<script>
import {bus} from '../main'

export default {
  props: {
    pickedCard: {
      type: Object
    }
  },
  data(){
    return{
      answer: '',
      instructions: null
    }
  },
  methods: {
    check(){
      let input = this.answer.replace(/\s+/g, " ").trim().toUpperCase().split(' ')
      if(input.length !== this.pickedCard.answer.length){
        this.$refs.answer.className = "animate";
        bus.$emit('mistake')
        return;
      }
      else{
        for(let i of input){
          if(this.pickedCard.answer.indexOf(i) === -1){
            this.$refs.answer.className = "animate";
            bus.$emit('mistake')
            return;
          }
        }
      }
     bus.$emit('nextStep');
    },
    appear(event){
      this.instructions.visibility = "visible";
      this.instructions.left = event.layerX + "px"
    }
  },
  mounted(){
    this.instructions = this.$refs.instructions.style
    this.$refs.answer.addEventListener('transitionend', () => {
      this.$refs.answer.className = '';
    })
  }
}
</script>

<style>

</style>