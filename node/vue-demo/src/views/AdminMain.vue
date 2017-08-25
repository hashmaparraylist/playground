<template>
    <v-app toolbar>
        <slider-menu></slider-menu>
        <tool-bar></tool-bar>
        <!--
        <v-toolbar fixed class="indigo" dark>
            <v-toolbar-side-icon @click.stop="clickSideIcon">
            </v-toolbar-side-icon>
            <v-toolbar-title>Toolbar</v-toolbar-title>
        </v-toolbar>
        -->
        <main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </main>
    </v-app>
</template>

<script>

import SliderMenu from '../components/SliderMenu';
import ToolBar from '../components/ToolBar';

export default {
    data() {
        return { };
    },
    components: {
        SliderMenu,
        ToolBar
    },
    methods: {
        clickSideIcon() {
            this.$store.commit('changeSlider');
        }
    }
};
</script>

<style>
</style>
