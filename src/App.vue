<template>
  <div id="app">
      <button v-on:click="generate" v-show="step === 0 || step === 4">Generate</button>
      <one class="flashcard" v-bind:pickedCard="pickedCard" v-if="step === 1"/>
      <two class="flashcard" v-bind:pickedCard="pickedCard" v-if="step === 2"/>
      <div v-if="step === 3" class="flashcard">
          <h2>Play major scale of the key!</h2>
      </div>
      <div class="flashcard" v-if="step === 4">
          <h2>Great job!</h2>
          <p>Click the button for another scale!</p>
      </div>
      <keyboard v-bind:pickedCard="pickedCard" v-show="step === 3 || step === 0"/>
  </div>
</template>

<script>
import Keyboard from './components/Keyboard.vue'
import {bus} from './main.js'
import Scales from './mixins/scales'
import One from './components/QuestionOne'
import Two from './components/QuestionTwo'

export default {
  name: 'App',
  components: {
    'keyboard': Keyboard,
    'one': One,
    'two': Two
  },
  mixins: [Scales],
  data() {
    return {
      mistakes: 0,
      startTime: 0,
      count: 0,
      step: 0,
      pickedCard: null,
      scales: Scales,
      weights: {},
    }
  },
  methods: {
    rightKey(event, key){
      let currentKey = key.match(/[a-s]+/).toString();
      if(currentKey === this.pickedCard.notes[this.count]){
        event.target.style.backgroundColor = 'green';
        this.count ++;
      }
      else{
        event.target.style.backgroundColor = 'red';
        this.mistakes ++;
        this.count = 0;
      }
      if(this.count === this.pickedCard.notes.length){
        window.setTimeout(()=>{
          this.done();
          this.count = 0;
          }, 300);
      }
    },
    generate(){
      this.step = 0;
      this.pickedCard = this.pickCard()
      this.startTime = Date.now();
      this.step ++;
    },
    done(){
      let time = Math.floor((Date.now() - this.startTime)/1000);
      this.pickedCard.weight = time*(10*this.mistakes + 1);
      if(this.pickedCard.weight >= 10000)
        this.pickedCard.weight = 9999;
      for(let scale in Scales){
        if(Scales[scale].weight){
          if(Scales[scale].name === this.pickedCard.name){
            this.weights[scale] = this.pickedCard.weight
            continue;
          } 
          Scales[scale].weight = Scales[scale].weight + time;
          this.weights[scale] = Scales[scale].weight
        }
      }
      this.$ls.set('weights', JSON.stringify(this.weights))
      this.pickedCard = null
      this.mistakes = 0;
      this.step ++;
    }  
  },
  created(){    
    bus.$on('keyId', (key) => {
      this.rightKey(event, key)
    }),
    bus.$on('mistake', () => {
      this.mistakes ++;
    }),
    bus.$on('nextStep', () => {
      this.step ++;
    })
  },
  mounted(){
    if(this.$ls.get('weights')){
      try{
        this.weights = JSON.parse(this.$ls.get('weights'));
        for(let scale in Scales){
          Scales[scale].weight = this.weights[scale]
        }
      }
      catch(e){
        console.log(e);
        this.$ls.remove('weights');
      }
    }
  }
}
</script>

<style>
* {
	box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button{
	font-size: 1em;
	border: 1px solid black;
	padding: 10px 20px;
	background-color: white;
	transition: background-color 0.3s;
}

button:hover{
	background-color: rgba(196, 196, 196, 0.253);
}

input{  
  margin-right: 20px;
}

input:focus{
  outline: none;
}

.flashcard{
	margin: auto;
	height: 6em;
	max-width: 66%;
}

.flashcard span{  
	background-color: rgba(70, 76, 106, 0.5);
  font-size: 1em;
  line-height: 1.3em;
	visibility: hidden;
	position: absolute;
	padding: 1px 3px;
  z-index: 2;
}

.flashcard h2{
	margin-top: 5%;
	font-size: 1.8em;
}

.flashcard img{
	padding-left: 20px;
	max-height: 80px;
	max-width: 120px;
}

.flashcard p{
	line-height: 1.3em;
	font-size: 1em;
  display: flex;
	align-items: center;
	justify-content: center;
}

.input{
  position: relative;
}

#answer{
	text-transform: capitalize;
	font-size: 1em;
	border: none;
  border-bottom: 1px solid black;
  transition: all 0.66s
}

.animate{
  box-shadow: 0px 0px 3px 3px rgba(255, 25, 25, 0.5)
}
</style>
