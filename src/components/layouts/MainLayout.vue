<template>
    <div>
        <navbar-menu></navbar-menu>
        <sidebar-menu></sidebar-menu>
        <router-view></router-view>
    </div>
</template>
<script>
import Navbar from '@/components/includes/Navbar'
import Sidebar from '@/components/includes/Sidebar'
import DropdownMixin from '@/mixins/dropdown'
export default {
    name:'App',
    mixins: [DropdownMixin],
    components:{
        'navbar-menu' : Navbar,
        'sidebar-menu' : Sidebar,
    }
}

</script>