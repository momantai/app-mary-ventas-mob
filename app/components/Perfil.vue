<template>
    <Page>
        <ActionBar>
            <Label text="Browse"></Label>
        </ActionBar>

        <FlexboxLayout class="page">
            <!-- <Label class="title" text="Mary Ventas"></Label> -->
            <Image width="150" src.decode="font://&#xf2bd;" class="fas t-36" />
            <!-- <Label class="welcome" text="Bienvenid@"></Label> -->
            <StackLayout>
                <Label class="title" :text="user.name"></Label>
                <Label class="title" :text="user.email"></Label>
                <Button @tap="closeSession" width="50%" style="background-color: #03A9F4; color: #fff;" text="Cerrar Sesión" />
                <Button width="50%" style="android-elevation: 0; color: #03A9F4;" text="Cambiar Servidor" />
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
  const application = require('application');
  const appSettings = require("tns-core-modules/application-settings");
  const axios = require('axios');
  const { tokenDestroy, tokenComprobe, newToken } = require('./../session');

  axios.defaults.headers.common['Authorization'] = appSettings.getString('session');

  export default {
      data() {
          return {
              user: {
                "name": "cargando..",
                "email": "cargando..",
              },
              url: ''
          }
      },
      methods: {
          closeSession() {
            const Toast = android.widget.Toast;

            if(tokenDestroy()) {
                Toast.makeText(application.android.context, "Cerrando Sesión..", Toast.LENGTH_SHORT).show();
                newToken("");
                appSettings.setString('session', tokenComprobe());

                this.$navigateTo(this.$router['Login'], {
                    clearHistory: true,
                    animated: true,
                    transition: {
                        name: "slide",
                        duration: 200,
                        curve: "ease"
                    }
                });
            }
          }
      },
      mounted() {
        this.url = appSettings.getString('url');

        axios.post(`${this.url}/api/auth/me`)
            .then(res => {
                this.user = res.data;
            });
      }
  }


</script>

<style scoped>
    .page {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .title {
        text-align: center;
        font-size: 15rem;
        color: #03A9F4;
    }

    .welcome {
        margin-bottom: 15rem;
    }
</style>