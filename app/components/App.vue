<template lang="html">
    <Page actionBarHidden="true">
    <BottomNavigation>
        <TabStrip>
            <TabStripItem class="navigation__item">
                <Label text="Inicio"></Label>
                <Image src.decode="font://&#xf080;" class="fas t-36"></Image>
            </TabStripItem>
            <TabStripItem class="navigation__item">
                <Label text="Caja"></Label>
                <Image src.decode="font://&#xf155;" class="fas t-36"></Image>
            </TabStripItem>
            <TabStripItem class="navigation__item">
                <Label text="Perfil"></Label>
                <Image src.decode="font://&#xf2bd;" class="fas t-36"></Image>
            </TabStripItem>
        </TabStrip>

        <TabContentItem>
            <Frame id="ventas">
                <Ventas/>
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame id="caja">
                <Caja/>
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame id="perfil">
                <Perfil/>
            </Frame>
        </TabContentItem>

    </BottomNavigation>
    </Page>
</template>

<script>
  import Ventas from "./Ventas.vue";
  import Caja from "./Caja.vue";
  import Perfil from "./Perfil.vue";

  export default {
    components: {
      Ventas,
      Caja,
      Perfil
    },
    data(){ return {}}
  };
</script>

<style lang="scss">
    // Start custom common variables
    // @import "~@nativescript/theme/scss/variables/sky";
    // End custom common variables

    // Custom styles

</style>
