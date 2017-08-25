import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        sliderVisible: false
    },
    mutations: {
        showSlider (state) {
            console.log('showSlider', state);
            state.sliderVisible = true;
        },
        hideSlider (state) {
            console.log('hideSlider ', state);
            state.sliderVisible = false;
        },
        changeSlider(state) {
            console.log('changeSlider', state);
            state.sliderVisible = !state.sliderVisible;
        }
    }
});
