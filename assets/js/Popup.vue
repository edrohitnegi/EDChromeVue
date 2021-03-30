<template>
    <div id="app">
        <SkillGraph/>
        <Auth/>
    </div>
</template>

<script>
import Auth from './components/Auth'
import SkillGraph from './components/SkillGraph'
export default {
    name: 'App',
    components: {
        Auth,
        SkillGraph
    }
}
</script>

