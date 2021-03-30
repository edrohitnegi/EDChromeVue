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
    #app {
        min-width: 600px;
    }
</style>
    
</style>

