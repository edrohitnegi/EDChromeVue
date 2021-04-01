<template>
    <div id="app">
        <Auth/>
        <router-view></router-view>
    </div>
</template>

<script>
import Auth from './components/Auth';
import SkillGraph from './components/SkillGraph';
import Welcome from './components/Welcome';


export default {
    name: 'App',
    components: {
        Auth,
        SkillGraph,
        Welcome
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
    #app {
        min-width: 600px;
        min-height: 500px;
        font-family: 'Poppins', sans-serif;
    }
</style>
    
</style>

