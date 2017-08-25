<template>
    <v-toolbar fixed class="indigo" dark>
        <v-toolbar-side-icon @click.stop="clickSideIcon">
        </v-toolbar-side-icon>
        <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-toolbar>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        clickSideIcon() {
            this.$store.commit('changeSlider');
        }
    }
};
</script>
