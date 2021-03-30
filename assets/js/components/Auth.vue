<template>
     <div id="nav">
        <nav>
            <ul>
                <div v-if="isloggedIn" class="right">
                    <router-link tag="li" :to="{ name: 'welcome' }" >Hi {{chrome_data.username}}#{{chrome_data.discriminator}}</router-link>
                    <li><router-link tag="a" :to='{ name: "charts" }'>Charts</router-link></li>
                </div>
                <div class="left">
                    <button @click="login" v-if="!isloggedIn" class="btn btn-primary">LogIn</button>
                    <button @click="logout" v-if="isloggedIn" class="btn btn-danger">Log Out</button>
                </div>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "EDChromeVue",
            isloggedIn: false,
            chrome_data: ''
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
                    this.chrome_data = result.user_detail;
                }
        })

        
    }
}
</script>

<style lang="scss">
    #nav {
        nav {
            padding-top: 10px;
            padding-right: 10px;
            ul {
                list-style-type: none;
                display: flex;
                justify-content: space-between;
            }
            .right {
                display: flex;

                li:first-child{
                    font-weight: 800;
                    padding-right: 20px;
                }
                li a{
                    // text-decoration: none;
                    color: rgba(2, 0, 114, 0.884);
                    font-weight: bold;
                }
            }
        }
    }
</style>

