<template>
  <div>
        <h2>Good work!</h2>
		<p>Last question. The key of the major scale just played?</p><br>
			<p><input type="text" v-model="answer" placeholder="Example: C" id="answer" ref="answer"><button ref="check" @click="check()">Check answer</button>
				<br><br><span>Use "#" to denote sharps<br>
                and "b" to denote flats.<br>
                Example: B flat would be "Bb".</span>
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
            let input = this.answer.toUpperCase();
            if(input !== this.pickedCard.name.toUpperCase().match(/^[^_]+/).toString()){
                this.$refs.answer.className = "animate";
                bus.$emit('mistake');
                return;
            }
            else
                bus.$emit('done')
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