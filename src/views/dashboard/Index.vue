<template>
    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        MAIN MENU
                        <hr>
                        <ul class="list-group">
                            <router-link :to="{name: 'dashboard'}"
                                class="list-group-item text-dark text-decoration-none">DASHBOARD</router-link>
                            <li @click.prevent="logout" class="list-group-item text-dark text-decoration-none"
                                style="cursor:pointer">LOGOUT</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        DASHBOARD
                        <hr>
                        Selamat Datang <strong>{{ user.name }}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { onMounted, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'

    export default {
        setup() {
            // get token from localstorage browser
            const token = localStorage.getItem('token')

            // inisiate router on composition api
            const router = useRouter()

            // user state
            const user = ref('')

            // mounted property
            onMounted(() => {

                // check token exists
                if (!token) {
                    return router.push({
                        name: 'login'
                    })
                }

                // get user data
                axios.defaults.headers.common.Authorization = `Bearer ${token}` //defining header to get authorization to api access
                axios.get('http://localhost:8000/api/user').then(res => {
                    user.value = res.data
                }).catch(e => {
                    console.log(e.response.data)
                })
            })

            // logout method
            function logout() {

                // logout with auth
                axios.defaults.headers.common.Authorization = `Bearer ${token}`
                axios.post('http://localhost:8000/api/logout').then(res => {
                    if (res.data.success) {
                        
                        // removing localstorage token
                        localStorage.removeItem('token')

                        // redirect to login page
                        return router.push({
                            name: 'login'
                        })
                    }
                }).catch(e => {
                    console.log(e.response.data)
                })
            }

            // return state and method
            return {
                token, user, logout
            }
        } 
    }
</script>