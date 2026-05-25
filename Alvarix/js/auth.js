const API_BASE_URL = "http://127.0.0.1:3000";

async function login(){

 const email =
 document.getElementById("email").value;

 const password =
 document.getElementById("password").value;

 if(email && password){

   try {
     let response = await fetch(`${API_BASE_URL}/auth/login`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify({ email, password })
     });

     let result = await response.json();

     if(response.status === 401){
       response = await fetch(`${API_BASE_URL}/auth/register`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify({
           name: "QCC User",
           email,
           password
         })
       });

       result = await response.json();
     }

     if(!response.ok){
       throw new Error(result.error || "Login gagal");
     }

     localStorage.setItem(
      "user",
      JSON.stringify(result.user)
     );

     if(result.token){
       localStorage.setItem("token", result.token);
     }

     window.location.href="home.html";
   } catch (error) {
     alert(error.message);
   }

 }else{
   alert("Isi email dan password");
 }
}
