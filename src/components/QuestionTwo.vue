<template>
    <div>
        <h2>Good work!</h2>
		<p>Last question. The key of the major scale just played?</p><br>
		<p><input v-on:mouseenter="appear($event)"
                v-on:mouseleave="instructions.visibility = 'hidden'"
                v-on:keyup.enter="check()"
                v-model="answer"
                type="text" placeholder="Example: C" ref="answer" id="answer" autocomplete="off" autofocus>
            <button v-on:click="check()">Check answer</button>
			<br><br><span ref="instructions">Use "s" to denote sharps<br>
            and "b" to denote flats.<br>
            Example: B flat would be "Bb".</span>
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
            let input = this.answer.toUpperCase();
            if(input !== this.pickedCard.name.toUpperCase().match(/^[^_]+/).toString()){
                this.$refs.answer.className = "animate";
                bus.$emit('mistake');
                return;
            }
            else
                bus.$emit('done')
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