<template>
    <Page>
        <ActionBar>
            <NavigationButton @tap="$navigateBack('caja')" android.systemIcon="ic_menu_back"/>
            <Label :text="item.name"></Label>
        </ActionBar>

        <GridLayout>
            <Label class="m-10 h3" :text="item.description" verticalAlignment="top"></Label>
        </GridLayout>
    </Page>
</template>

<script>
  export default {
    props: ["item"],
  };
</script>