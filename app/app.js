import Vue from "nativescript-vue";
import App from "./components/App";
import Login from "./components/Login";

const appSettings = require("tns-core-modules/application-settings");
const { tokenComprobe } = require('./session');

Vue.config.silent = (TNS_ENV === 'production');


appSettings.setString('url', 'https://be8566da4232.ngrok.io');
appSettings.setString('session', tokenComprobe());


Vue.prototype.$router = {
    Login: Login,
    App: App
};

// new Vue({
//     render: h => h(App)
// }).$start();

new Vue({
    render: h => h('frame', [h(appSettings.getString('session') != "" ? App : Login)])
}).$start();