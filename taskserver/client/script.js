{
    fetch("http://localhost:3000/json").then((response)=>{
    console.log("response",response)

      response.json().then((datas) =>{
      console.log("datas :",datas)
    })
    
})
}
