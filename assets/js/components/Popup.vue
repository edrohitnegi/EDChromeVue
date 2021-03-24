<template>
    <div class="wrapper">
        <h1 class="title">{{name}}</h1>
        <div class="buttons">
            <button @click="login" v-if="!isloggedIn">Login</button>
            <button @click="logout" v-if="isloggedIn">Logout</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "EDChrome",
            isloggedIn: false
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
    },
}
</script>

