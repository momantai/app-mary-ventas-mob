<template>
    <Page actionBarHidden="true">
        <FlexboxLayout class="page">
            <!-- <Label class="title" text="Mary Ventas"></Label> -->
            <Image width="250" src="~/img/mary-logo.png" />
            <!-- <Label class="welcome" text="Bienvenid@"></Label> -->
            <StackLayout>
                <Button @tap="onLoginForm" width="50%" style="background-color: #03A9F4; color: #fff;" text="Iniciar" />
                <Button @tap="changeServer" width="50%" style="android-elevation: 0; color: #03A9F4;" text="Cambiar Servidor" />
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
const axios = require('axios');
const { newToken } = require('./../session');
const appSettings = require("tns-core-modules/application-settings");
const application = require('application');

const Toast = android.widget.Toast;

export default {
    data() {
        return {
            url: ''
        }
    },
    methods: {
        onLoginForm() {
            // appSettings.setString('session', `Bearer`);
            // this.$navigateTo(this.$router['App'], {
            //     clearHistory: true
            // });
            // this.$navigator.navigate('app', { clearHistory: true });
            // console.log(pagina)
            login("Iniciar sesión..", "Correo", "Contraseña").then(result => {
                if(result.result) {
                    if(result.userName.trim() != '' && result.userName.trim() != '') {
                        Toast.makeText(application.android.context, "Iniciando Sesión..", Toast.LENGTH_LONG).show();

                        axios.post(`${this.url}/api/auth/login`, {
                            email: result.userName,
                            password: result.password
                        })
                        .then(res => {
                            if(res.data.hasOwnProperty('error')) {
                                Toast.makeText(application.android.context, "¡Datos errones!", Toast.LENGTH_SHORT).show();
                            } else {
                                if(res.data.access_token == undefined) {
                                    Toast.makeText(application.android.context, "Probable problema con el servidor.", Toast.LENGTH_SHORT).show();

                                    return null;
                                }

                                newToken(`Bearer ${res.data.access_token}`);
                                appSettings.setString('session', `Bearer ${res.data.access_token}`)
                                this.$navigateTo(this.$router['App'], {
                                    clearHistory: true,
                                    animated: true,
                                    transition: {
                                        name: "slide",
                                        duration: 200,
                                        curve: "ease"
                                    }
                                });
                            }
                        });
                    } else {
                        Toast.makeText(application.android.context, "¡Llene todos los datos!", Toast.LENGTH_SHORT).show();
                    }
                }
                // alert(`Dialog result: ${result.result}, user: ${result.userName}, pwd: ${result.password}`);
            });
        },
        changeServer() {
            action("Elegir un Servidor", "Cancelar", ["Online (Actual)", "Otro"])
            .then(result => {
                if(result == 'Otro') {
                    prompt({
                            title: "Nuevo Servidor",
                            message: "Escribe la url del servidor",
                            okButtonText: "Registar",
                            cancelButtonText: "Cancelar",
                            defaultText: "http://localhost:8000",
                    }).then(result => {
                        appSettings.setString('url', result.text);
                        this.url = result.text;
                        Toast.makeText(application.android.context, "Nuevo servidor, listo.", Toast.LENGTH_SHORT).show();
                    });
                }
            });
        }
    },
    mounted() {
      this.url = appSettings.getString('url');
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
        font-size: 30rem;
        color: #03A9F4;
    }

    .welcome {
        margin-bottom: 15rem;
    }
</style>