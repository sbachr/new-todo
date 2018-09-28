function cekToken() {
   
    if (localStorage.getItem("fbToken") || localStorage.getItem("token")) {
    } else {
        window.location.replace("/index.html")
    }
}