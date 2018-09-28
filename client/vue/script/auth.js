const auth = new Vue({
    el: '#auth',
    data: {
        nameUser: '',
        emailUser: '',
        passwordUser: '',
        isRegister: false
    },
    methods: {
        clearRegister() {
            this.nameUser = ''
            this.emailUser = ''
            this.passwordUser = ''

        },
        loginManually() {
            let email = this.emailUser
            let password = this.passwordUser
            axios
                .post("http://localhost:3000/auth", {
                    email: email,
                    password: password,
                })
                .then(function (token) {
                    console.log(token.data.token)
                    this.nameUser = ''
                    this.emailUser = ''
                    this.passwordUser = ''
                    localStorage.setItem("token", token.data.token)
                    window.location.replace("/home.html")
                })
                .catch(function (err) {
                    console.log(err.message)
                })
        },
        createUser() {
            console.log("is register===========>", this.isRegister, this.nameUser, this.emailUser, this.passwordUser)
            axios
                .post("http://localhost:3000/user", {
                    name: this.nameUser,
                    email: this.emailUser,
                    password: this.passwordUser
                })
                .then(function (response) {
                    alert("successfully registration")
                })
                .catch(function (err) {
                    console.log(err.message)
                })
        }

    }
})