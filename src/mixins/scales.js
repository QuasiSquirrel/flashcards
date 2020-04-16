export default {
    data(){
        return {
            scales: {
                c: {
                    notes: ['c', 'd', 'e', 'f', 'g', 'a', 'b', 'c'],
                    answer: [''],
                    name: 'C_scale',
                    weight: 10000
                },
                f: {
                    notes: ['f', 'g', 'a', 'as', 'c', 'd', 'e', 'f'],
                    answer: ['BB'],
                    name: 'F_scale',
                    weight: 10000
                },
                bb: {
                    notes: ['as', 'c', 'd', 'ds', 'f', 'g', 'a', 'as'],
                    answer: ['BB', 'EB'],
                    name: 'Bb_scale',
                    weight: 10000
                },
                eb: {
                    notes: ['ds', 'f', 'g', 'gs', 'as', 'c', 'd', 'ds'],
                    answer: ['EB', 'AB', 'BB'],
                    name: 'Eb_scale',
                    weight: 10000
                },
                ab: {
                    notes: ['gs', 'as', 'c', 'cs', 'ds', 'f', 'g', 'gs'],
                    answer: ['AB', 'BB', 'DB', 'EB'],
                    name: 'Ab_scale',
                    weight: 10000
                },
                db: {
                    notes: ['cs', 'ds', 'f', 'fs', 'gs', 'as', 'c', 'cs'],
                    answer: ['DB', 'EB', 'GB', 'AB', 'BB'],
                    name: 'Db_scale',
                    weight: 10000
                },
                gb: {
                    notes:['fs', 'gs', 'as', 'b', 'cs', 'ds', 'f', 'fs'],
                    answer: ['GB', 'AB', 'BB', 'CB', 'DB', 'EB'],
                    name: 'Gb_scale',
                    weight: 10000
                },
                fs: {
                    notes: ['fs', 'gs', 'as', 'b', 'cs', 'ds', 'f', 'fs'],
                    answer: ['FS', 'GS', 'AS', 'CS', 'DS', 'ES',],
                    name: 'Fs_scale',
                    weight: 10000
                },
                b: {
                    notes: ['b', 'cs', 'ds', 'e', 'fs', 'gs', 'as', 'b'],
                    answer: ['CS', 'DS', 'FS', 'GS', 'AS'],
                    name: 'B_scale',
                    weight: 10000
                },
                e: {
                    notes: ['e', 'fs', 'gs', 'a', 'b', 'cs', 'ds', 'e'],
                    answer: ['FS', 'GS', 'CS', 'DS'],
                    name: 'E_scale',
                    weight: 10000
                },
                a: {
                    notes: ['a', 'b', 'cs', 'd', 'e', 'fs', 'gs', 'a'],
                    answer: ['CS', 'FS', 'GS'],
                    name: 'A_scale',
                    weight: 10000
                },
                d: {
                    notes: ['d', 'e', 'fs', 'g', 'a', 'b', 'cs', 'd'],
                    answer: ['FS', 'CS'],
                    name: 'D_scale',
                    weight: 10000
                },
                g: {
                    notes: ['g', 'a', 'b', 'c', 'd', 'e', 'fs', 'g'],
                    answer: ['FS'],
                    name: 'G_scale',
                    weight: 10000
                }
            }
        }
    },
    methods: {
        pickCard(){
            let bigWeight = 0;
            let currentCard;
            for(let j in this.scales){
                let card = this.scales[j];
                if(card.weight > bigWeight){
                    bigWeight = card.weight;
                    currentCard = card;
                }
            }
            return currentCard;
        }
    }
}