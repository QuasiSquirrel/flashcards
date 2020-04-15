<template>
	<div id="keyboard">
		<div ref="c3" class="key"><div ref="cs3" class="key"></div></div>
		<div ref="d3" class="key"><div ref="ds3" class="key"></div></div>
		<div ref="e3" class="key"></div>
		<div ref="f3" class="key"><div ref="fs3" class="key"></div></div>
		<div ref="g3" class="key"><div ref="gs3" class="key"></div></div>
		<div ref="a3" class="key"><div ref="as3" class="key"></div></div>
		<div ref="b3" class="key"></div>
		<div ref="c4" class="key"><div ref="cs4" class="key"></div></div>
		<div ref="d4" class="key"><div ref="ds4" class="key"></div></div>
		<div ref="e4" class="key"></div>
		<div ref="f4" class="key"><div ref="fs4" class="key"></div></div>
		<div ref="g4" class="key"><div ref="gs4" class="key"></div></div>
		<div ref="a4" class="key"><div ref="as4" class="key"></div></div>
		<div ref="b4" class="key"></div>
	</div>
</template>

<script>
import {bus} from '../main.js'
export default {
  name: 'HelloWorld',
  props: {
	pickedCard: {
		type: Object
	}
  },
  data(){
    return{
    }
  },
  methods: {
  },
  mounted() {
    for(let ref in this.$refs){
      this.$refs[ref].addEventListener('mousedown', () => {
		if(this.pickedCard)
			bus.$emit('keyId', ref);
        new Audio("audio/Piano_" + ref + ".wav").play();
        event.stopPropagation();
      });
      this.$refs[ref].addEventListener('mouseup', () => {
        window.setTimeout(() => {
          this.$refs[ref].style.backgroundColor = '';
        }, 20);
      });
      this.$refs[ref].addEventListener('mouseout', () => {
        window.setTimeout(() => {
          this.$refs[ref].style.backgroundColor = '';
        }, 20);
      });
    }  
  }
}
</script>

<style>
#keyboard{
	margin-top: 30px;
	display: flex;
	justify-content: center;
}

.key{
	position: relative;
	border: 1px solid rgba(70, 76, 106, 1);
	border-radius: 3px;
	height: 200px;
	width: 40px;
	box-shadow: 1px 3px 2px rgba(70, 76, 106, 0.5);
}
.key > div{
	position: absolute;
	background-color: black;
	border-radius: 3px;
	left: 27px;
	top: -3px;
	height: 150px;
	width: 26px;
	box-shadow: 3px 3px 2px rgba(70, 76, 106, 0.5);
	z-index: 1;
}
</style>
