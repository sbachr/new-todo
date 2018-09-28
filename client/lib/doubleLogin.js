function doubleLogin(){
    if(localStorage.getItem("fbToken")||localStorage.getItem("token")){
        window.location.replace("/home.html")
    }
}