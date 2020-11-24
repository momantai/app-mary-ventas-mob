<template>
    <Page>
        <ActionBar>
            <ActionItem @tap="tapOnSync()" android.systemIcon="ic_popup_sync" android.position="actionBar"/>
            <Label text="Ultimas Ventas"></Label>
        </ActionBar>
        <ListView for="venta in ventas" @itemTap="onItemTap">
            <v-template>
                <GridLayout columns="fr, fr" orientation="horizontal">
                    <Label :text="venta.num_comprobante" textWrap="true" horizontalAlignment="left"></Label>
                    <Label :text="'$'+venta.total_venta" textWrap="true" horizontalAlignment="right"></Label>
                </GridLayout>
            </v-template>
        </ListView>
    </Page>
</template>

<script>
  import VentasDetails from "./VentasDetails";
  const axios = require('axios');
  const appSettings = require("tns-core-modules/application-settings");

  export default {
    data() {
      return {
        ventas: [
          {
            num_comprobante: "34e6533d5-38",
            total_venta: "53.00"
          },
          {
            num_comprobante: "34e6533d5-38",
            total_venta: "53.00"
          },
        ],
        url: ''
      };
    },
    methods: {
      onItemTap(args) {
        this.$navigateTo(VentasDetails, {
          frame: 'ventas',
          props: {venta: args.item},
          animated: true,
          transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
          }
        });
      },
      tapOnSync() {
        alert({
          title: "Obteniendo datos..",
          message: "Actualizando la información con las últimas ventas.",
          okButtonText: "Continuar"
        });
        axios.get(`${this.url}/uventas`)
        .then(res => {
          this.ventas = res.data;
        });
      }
    },
    mounted() {
      this.url = appSettings.getString('url');

      axios.get(`${this.url}/uventas`)
        .then(res => {
          this.ventas = res.data;
        });
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    // @import "~@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
