<template>
    <Page>
        <ActionBar>
            <Label text="Ultimas Ventas"></Label>
        </ActionBar>
        <ListView for="item in items" @itemTap="onItemTap">
            <v-template>
                <StackLayout orientation="horizontal">
                    <Label :text="item.name" textWrap="true"></Label>
                </StackLayout>
            </v-template>
        </ListView>
    </Page>
</template>

<script>
  import ItemDetails from "./ItemDetails";
  // const httpModule = require('http');
  const axios = require('axios');

  export default {
    data() {
      return {
        items: [
          {
            name: "Primer Cambio!",
            description: "Description for Item 1"
          },
          {
            name: "Item 2",
            description: "Description for Item 2"
          },
          {
            name: "Item 3",
            description: "Description for Item 3"
          }
        ],
        result: []
      };
    },
    methods: {
      onItemTap(args) {
        console.log(this.result);
        this.$navigateTo(ItemDetails, {
          frame: 'items',
          props: {item: args.item},
          animated: true,
          transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
          }
        });
      }
    },
    mounted() {
      // http.getJSON("http://01a9b1a8996b.ngrok.io/prueba").then(result => {
      //   this.result = result;
      // }, error => {
      //   console.log(error);
      // });
      axios.get('https://174fab6f60ba.ngrok.io/prueba')
        .then(res => {
          this.items = res.data;
        })
      // httpModule.request({
      //       url: 'https://174fab6f60ba.ngrok.io/prueba',
      //       method: 'GET'
      //     }).then(response => {
      //       let data = response.content.toJSON()
            
      //       this.result = data;
      //     })

    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    // @import "~@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
