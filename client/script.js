

 async function addUser(event){
    event.preventDefault();
    console.log("Reached here")

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let emailerror = document.getElementById('email-error')
    let nameerror = document.getElementById('name-error')
    let passworderror = document.getElementById('password-error')

    let emailregex = /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    if(!name){
        nameerror.innerHTML = "name required"
    }
    if(!email){
        emailerror.innerHTML = "email required"
    }
    else if(!emailregex.test(email)){
         emailerror.innerHTML = "email invalid"
    }else{
         emailerror.innerHTML = "";
    }
    if(!password){
        passworderror.innerHTML = "password required"
    }

    let datas = {
        name,
        email,
        password,
    }
    
    let json_data = JSON.stringify(datas)
    console.log("json_data : ",json_data);

    let response = await fetch('/submit',{
        method : 'post',
        headers : {
            'Content-Type'  : "application/json"
        },
        body : json_data,
    });
    console.log("response : ",response); 

    let parsed_response = await response.text();
    console.log("parsed_response : ", parsed_response)

    if(parsed_response) {
        alert(parsed_response);
        return;
    }else {
        alert("something went wrong");
    }

    


}