<template lang="html">
    <Page>
        <ActionBar>
            <Label text="Cierre de Caja"></Label>
        </ActionBar>

        <GridLayout v-if="!items.length" class="page__content">
            <Label class="page__content-icon fas" text.decode="&#xf155;"></Label>
            <Label class="page__content-placeholder" :text="message"></Label>
        </GridLayout>
        <ListView v-else for="item in items" @itemTap="onItemTap">
            <v-template>
                <Label :text="item.name" textWrap="true" horizontalAlignment="left"></Label>
            </v-template>
        </ListView>
    </Page>
</template>

<script>
  import CajaDetails from "./CajaDetails";

  export default {
    data() {
      return {
        message: "Caja",
        items: [
          {
            name: "Perro",
            description: "Perro machado, alegre."
          },
          {
            name: "Gato",
            description: "Gato peludo gruñon."
          },
        ],
      };
    },
    methods: {
        onItemTap(args) {
        this.$navigateTo(CajaDetails, {
          frame: 'caja',
          props: {item: args.item},
          animated: true,
          transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    // @import "~@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
