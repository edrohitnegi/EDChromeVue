<template>
    <div class="wrapper">
        <h1 class="title">{{name}}</h1>
        <p>{{chrome_data}}</p>
        <div class="buttons">
            <button @click="setValue">Trial</button>
            <button class="state-off" @click="login" v-if="!isloggedIn">Login</button>
            <button class="state-on" @click="logout" v-if="isloggedIn">Logout</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "EDChrome",
            isloggedIn: false,
            chrome_data: {}
        }
    },
    methods: {
        login() {
            chrome.runtime.sendMessage({message: 'login'}, (response) => {
                if(response === 'success') this.isloggedIn = true
            })
            this.isloggedIn = true
        },
        logout() {
            chrome.runtime.sendMessage({message: 'logout'}, (response) => {
                if (response === 'success') {
                   this.isloggedIn = false
                }
            })
            this.isloggedIn = false
        },
        setValue(){
            chrome.storage.sync.get(['links'], function (result) {
                this.chrome_data = result;
            })
        }
    },
    created() {
        this.setValue()
    }
}
</script>

