<template>
    <Page>

        <ActionBar>
            <NavigationButton @tap="$navigateBack('ventas')" android.systemIcon="ic_menu_back"/>
            <Label :text="venta.num_comprobante"></Label>
        </ActionBar>

        <StackLayout>
            <FlexboxLayout flexDirection="column" class="contenedor">

                <GridLayout height="45" columns="fr, fr">
                    <Label class="m-10 h3" horizontalAlignment="left" text="Venta"></Label>
                    <Label class="m-10 h3" horizontalAlignment="right" :text="venta.num_comprobante"></Label>
                </GridLayout>
                <GridLayout height="45" columns="fr, fr">
                    <Label class="m-10 h3" horizontalAlignment="left" text="Vendedor"></Label>
                    <Label class="m-10 h3" horizontalAlignment="right" :text="venta.name"></Label>
                </GridLayout>
                <GridLayout height="45" columns="fr, fr">
                    <Label class="m-10 h3" horizontalAlignment="left" text="Total"></Label>
                    <Label class="m-10 h3" horizontalAlignment="right" :text="'$' + venta.total_venta"></Label>
                </GridLayout>
                <GridLayout height="45" columns="fr, fr">
                    <Label class="m-10 h3" horizontalAlignment="left" text="Pago"></Label>
                    <Label class="m-10 h3" horizontalAlignment="right" :text="'$' + venta.pago"></Label>
                </GridLayout>
                <GridLayout height="45" columns="fr, fr">
                    <Label class="m-10 h3" horizontalAlignment="left" text="Cambio"></Label>
                    <Label class="m-10 h3" horizontalAlignment="right" :text="'$' + venta.cambio"></Label>
                </GridLayout>
                <GridLayout height="45" columns="fr, fr">
                    <Label class="m-10 h3" horizontalAlignment="left" text="Fecha"></Label>
                    <Label class="m-10 h3" horizontalAlignment="right" :text="venta.created_at"></Label>
                </GridLayout>
                <GridLayout height="95">
                    <Button @tap="getResumen(venta.id)" style="color: #FFF; background-color: #4169e1;" text="Ver Resumen" />
                </GridLayout>
            </FlexboxLayout>

            <StackLayout v-show="items.length" class="resumen">
                <ListView for="item in items">
                    <v-template>
                        <GridLayout columns="fr, fr" orientation="horizontal">
                            <Label :text="item.nombre" textWrap="true" horizontalAlignment="left"></Label>
                            <Label :text="item.cantidad" textWrap="true" horizontalAlignment="right"></Label>
                        </GridLayout>
                    </v-template>
                </ListView>
            </StackLayout>
        </StackLayout>
    </Page>
</template>

<script>
  const axios = require('axios');
  const appSettings = require("tns-core-modules/application-settings");

  export default {
    props: ["venta"],
    data() {
        return {
            items: [],
            mostrar: false,
            url: ''
        }
    },
    methods: {
        getResumen(id) {
            // alert(id);
            axios.get(`${this.url}/vresumen?id=${id}`)
                .then(res => {
                    this.items = res.data;


                    if(this.items.length) {
                        this.mostrar = true;
                    }

                });
        }
    },
    mounted() {
      this.url = appSettings.getString('url');
    }
  };
</script>

<style scoped lang="scss">
    // Start custom common variables
    // @import "~@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles
    .contenedor, .resumen {
        width: 90%;
        height: 50%;
        margin-top: 40px;
        background-color: #fff;
        border-radius: 15px;
        android-elevation: 5;
    }

    .resumen {
        height: 45%;
    }


</style>
