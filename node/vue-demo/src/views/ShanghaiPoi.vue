<template>
    <v-data-table
        v-bind:headers="headers"
        :items="pois"
        hide-actions
        :loading="loadingContent"
        :no-data-text="noDataText"
        class="elevation-1"
        >
        <template slot="headers" scope="props">
            <tr>
                <th v-for="header in props.headers" :key="header.text">
                    {{header.text}}
                </th>
            </tr>
        </template>
        <template slot="items" scope="props">
            <td>{{props.item.code}}</td>
            <td>{{props.item.text}}</td>
            <td>{{props.item.addressText}}</td>
            <td>{{props.item.lat}}</td>
            <td>{{props.item.lng}}</td>
        </template>
    </v-data-table>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            loadingContent: "",
            noDataText: "",
            headers: [{
                text: '#',
                sortable: false,
                value: 'code'
            }, { 
                text: 'Name', 
                sortable: false,
                value: 'title' 
            }, { 
                text: 'DB Address', 
                sortable: false,
                value: 'addressText' 
            }, { 
                text: 'DB Latitude', 
                sortable: false,
                value: 'lat' 
            }, { 
                text: 'DB Longitude',
                sortable: false,
                value: 'lng' 
            }],
            pois: []
        };
    },
    computed: {

    },
    methods: {
        getPois : function() {
            this.loadingContent = "primary";
            axios.get('http://120.55.45.185/api/ggapp/discovery/getPoiFeater?codeType=5&length=300') .then((response) => {
                this.loadingContent = "";
                this.pois = response.data.data;
                if (this.pois == null || this.pois.length === 0) {
                    this.noDataText = "没有数据";
                }
            }).catch(error => {
                this.loadingContent = "";
                console.error(error);
            });
        }
    },
    mounted() {
        this.getPois();
    }
}
</script>
