<template>
    <v-navigation-drawer temporary v-model="drawer" :mini-variant.sync="mini" light overflow absolute>
        <v-list class="pa-1">
            <v-list-tile tag="div">
                <v-list-tile-content>
                    <v-list-tile-title>GGAPP Toolkit</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <v-list-group v-for="item in $router.options.routes" :value="item.active" :key="item.path">
                <template v-if="item.leaf == true">
                <v-list-tile slot="item" v-for="subitem in item.children" :key="subitem.path" @click="$router.push(subitem.path)">
                    <v-list-tile-action>
                        <v-icon>{{subitem.iconClass}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{subitem.name}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                </template>
                <template v-if="item.leaf != true">
                <v-list-tile slot="item">
                    <v-list-tile-action>
                        <v-icon>{{item.iconClass}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{item.name}}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-icon>keyboard_arrow_down</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
                <v-list-tile v-for="subItem in item.children" :key="subItem.key" @click="$router.push(subItem.path)">
                    <v-list-tile-content>
                        <v-list-tile-title>{{subItem.name}}</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-icon>{{subItem.iconClass}}</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
                </template>
            </v-list-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>

export default {
    data() {
        return {
            mini: false
        };
    },
    computed: {
        drawer: {
            get() {
                return this.$store.state.sliderVisible;
            }, 
            set(val) {
                if (this.$store.state.sliderVisible !== val) {
                    this.$store.commit('changeSlider');
                }
            }
        }
    }
};

</script>
