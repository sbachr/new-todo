
function login(){

    let serverAddres = 'http://localhost:3000/auth'
    let tokenName = "token"
    let email = $("#email").val()
    let password = $("#password").val()
    console.log(email)
    console.log(password)  
    axios.post(serverAddres, {
        email : username,
        password : password, 
      })
      .then(function (data) {
        console.log("login regular",data);
        localStorage.setItem(tokenName, data.data);
        testAPI();
      })
      .then(function(){
        console.log("setelah login app ")
        window.location.replace("/home.html")
      })
      .catch(function (error) {
        console.log(error);
      });
}