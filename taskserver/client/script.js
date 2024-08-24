


  async function fetchData() {

    try {
      

    let datas = await fetch("http://localhost:3000/json");
    let parsed_datas = await datas.json();
    console.log("parsed_datas : ", parsed_datas);
  
      let rows = ''
      for(i=0;i<parsed_datas.length;i++){
        rows =rows + `

        <div>${parsed_datas[i].title}</div>

        `
      }
     


  
      let Datacontainer = document.getElementById('datacontainer');
      Datacontainer.innerHTML=rows;
      console.log("Datacontainer : ", Datacontainer);
   

    } catch (error) {
      console.log("error : ", error);
    }


  }

  fetchData();



  

