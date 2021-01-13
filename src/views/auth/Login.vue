<template>
    <div class="container-fluid mt-5">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div v-if="loginFailed" class="alert alert-danger">
                        Email atau Password Anda salah.
                    </div>
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>LOGIN</h4>
                        <hr>
                        <form @submit.prevent="login">
                            <div class="form-group">
                                <label>Email address</label>
                                <input type="email" v-model="user.email" class="form-control"
                                    placeholder="Email Address">
                            </div>
                            <div v-if="validation.email" class="mt-2 alert alert-danger">
                                {{ validation.email[0] }}
                            </div>

                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" v-model="user.password" class="form-control"
                                    placeholder="Password">
                            </div>
                            <div v-if="validation.password" class="mt-2 alert alert-danger">
                                {{ validation.password[0] }}
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">LOGIN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'

    export default {

        setup() {
            // initiate router to composition API
            const router = useRouter()
            
            // define user state
            const user = reactive({
                email: '',
                password: '',
            }) 

            // validation state
            const validation = ref([])

            // loginFailed state
            const loginFailed = ref(null)

            // login method
            function login() {

                // define function scope variable
                let email = user.email
                let password = user.password

                // send data request to API login endpoint with axios
                axios.post('http://localhost:8000/api/login', {
                    email, password
                }).then(res => {
                    
                    if (res.data.success) {
                        
                        // set token
                        localStorage.setItem('token', res.data.token)

                        // redirect to dashboard page
                        return router.push({
                            name: 'dashboard'
                        })
                    }

                    //set state loggedIn to true
                    loginFailed.value = true

                }).catch(e => {

                    // set validation value from error response
                    validation.value = e.response.data
                })
            }

            // return state and method
            return {
                user, validation, loginFailed, login
            }
        }
    }
</script>