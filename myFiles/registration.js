
    
        function sendForm(){
            var pass=document.querySelectorAll("input")[1];
            var rpass=document.querySelectorAll("input")[2];
            if(pass.value!==rpass.value){
             alert("Password and Repeat password does not match");
            }
            else{
                document.querySelector("form").submit();
          }
        }

        function dynamic(message, status){
        
        
            if(message!=""){
            alert(message);
                    }
                if(status=="login"){
                    document.querySelector(".loginContent").style.display="block";
                    document.querySelector("#heading").textContent="login";
                    document.querySelector(".signupContent").style.display="none";
                }
                else if(status=="signup"){
                    
                    document.querySelector(".loginContent").style.display="none";
                    document.querySelector("#heading").textContent="signup";
                    document.querySelector(".signupContent").style.display="block";
                }}