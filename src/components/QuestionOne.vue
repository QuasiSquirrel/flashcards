<template>
  <div>
      <h2>Nice one!</h2> 
      <p>Now, what were the sharps or flats played?</p><br>
      <p><input type="text" placeholder="Example: Eb Bb" ref="answer" id="answer" v-model="answer"><button ref="check" v-on:click="check()">Check answer</button>
          <br><br><span>Seperate notes with space.<br>
          Use "#" to denote sharps<br>
          and "b" to denote flats.<br>
          Example: B flat would be "Bb".<br>
          Leave empty if none.</span>
      </p><br>
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
      answer: ''
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
    }
  },
  mounted(){
    this.$refs.answer.addEventListener('transitionend', () => {
      this.$refs.answer.className = '';
    })
  }
}
</script>

<style>

</style>