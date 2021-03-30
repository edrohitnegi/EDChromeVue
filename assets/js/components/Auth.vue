<template>
    <div class="wrapper">
        <h1 class="title">{{name}}</h1>
        <div class="buttons">
            <!-- <button @click="setValue">Trial</button> -->
            <button class="state-off" @click="login" v-if="!isloggedIn">Login</button>
            <button class="state-on" @click="logout" v-if="isloggedIn">Logout</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "EDChromeVue",
            isloggedIn: false
        }
    },
    methods: {
        login() {
            chrome.runtime.sendMessage({message: 'login'}, (response) => {
                // if(response === 'success') this.isloggedIn = true
            })
            this.isloggedIn = true
        },
        logout() {
            chrome.runtime.sendMessage({message: 'logout'}, (response) => {
                if (response === 'success') {
                //    this.isloggedIn = false
                }
            })
            chrome.storage.sync.remove('user_detail')
            this.isloggedIn = false
        }
    },
    created() {
        // this.setValue()
        chrome.storage.sync.get(['user_detail'], (result) => {
                if(result.user_detail === undefined) {
                    this.isloggedIn = false
                }
                else {
                    this.isloggedIn = true
                }
        })
        
    }
}
</script>

