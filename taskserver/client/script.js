


  async function fetchData() {

    try {
      

    let datas = await fetch("http://localhost:3000/json");
    let parsed_datas = await datas.json();
    console.log("parsed_datas : ", parsed_datas);

      let carouselid = document.getElementById('carouselidd');
      let Datacontainer1 = document.getElementById('datacontainerdiv1');

      let Datacontainer2 = document.getElementById('datacontainerdiv2');

      let Datacontainer3 = document.getElementById('datacontainerdiv3');

  
    let rows = '';
    let rows1 = '';
    let rows2 = '';
    let rows3 = '';

    let arr1=["men's clothing","jewelery","electronics","women's clothing"]
    
    for(i=0 ; i < parsed_datas.length ; i++){
      for(j=0; j< arr1.length-3;j++){
        if(parsed_datas[i].category === arr1[0]){
          rows = rows + `
          <div class="carousel-item ${i === 0 ? 'active' : ''} ">
          <div class="d-flex lh-md">
          <div class="div1">
          <div id = "titleid">${parsed_datas[i].title}</div>
          <div id = "descriptionid">${parsed_datas[i].description.slice(0,150)+"..."}</div>
          <div id = "categoryid">${parsed_datas[i].category}</div>
          <div id = "ratingid">Rating : ${parsed_datas[i].rating.rate}</div>
          <div id="btnid" class = "text-center"><button onclick="handleClick(${parsed_datas[i].id})">Details</button></div>
          </div>
          <div class="div2">
          <div id = "imageid" ><img onclick="handleClick(${parsed_datas[i].id})" src ="${parsed_datas[i].image} "class = "carouselimg"></div>
     
          </div>
          </div>
          </div>
          `
          
        }
        
        
        if(parsed_datas[i].category === arr1[1]){
           rows1 = rows1 + `
           <div id = "datacontainer1" class ="shadow p-3 mb-5 bg-body rounded lh-lg">
      <div id = "imageid1" class="text-center" ><img onclick="handleClick(${parsed_datas[i].id})" src ="${parsed_datas[i].image} "class = "carouselimg1 "></div>
      <div id = "titleid1" class = "mt-5">${parsed_datas[i].title}</div>
      <div id = "categoryid1">${parsed_datas[i].category}</div>
      <div id = "ratingid1">Rating : ${parsed_datas[i].rating.rate}</div>
      <div id="btnid" class = "text-center"><button onclick="handleClick(${parsed_datas[i].id})">Details</button></div>
      </div>
           `
         }

         if(parsed_datas[i].category === arr1[2]){
           rows2 = rows2 + `
          <div id = "datacontainer2" class ="shadow p-3 mb-5 bg-body rounded lh-lg">
        <div id = "imageid2" class="text-center" ><img onclick="handleClick(${parsed_datas[i].id})" src ="${parsed_datas[i].image} "class = "carouselimg1"></div>
       <div id = "titleid2" class = "mt-5">${parsed_datas[i].title}</div>
           <div id = "categoryid2">${parsed_datas[i].category}</div>
          <div id = "ratingid2">Rating : ${parsed_datas[i].rating.rate}</div>
          <div id="btnid" class = "text-center"><button onclick="handleClick(${parsed_datas[i].id})">Details</button></div>
        </div>
        `
         }

         if(parsed_datas[i].category === arr1[3]){
     rows3 = rows3 + `
           <div id = "datacontainer2" class ="shadow p-3 mb-5 bg-body rounded lh-lg">
       <div id = "imageid2" class="text-center" ><img onclick="handleClick(${parsed_datas[i].id})" src ="${parsed_datas[i].image} "class = "carouselimg1"></div>
         <div id = "titleid2" class = "mt-5">${parsed_datas[i].title}</div>
           <div id = "categoryid2">${parsed_datas[i].category}</div>
           <div id = "ratingid2">Rating : ${parsed_datas[i].rating.rate}</div>
        <div id="btnid" class = "text-center"><button onclick="handleClick(${parsed_datas[i].id})">Details</button></div>
          
        </div>
        `
         }

        //  console.log ("carouselid",carouselid);
         carouselid.innerHTML=rows;
         Datacontainer1.innerHTML=rows1;
         Datacontainer2.innerHTML=rows2;
         Datacontainer3.innerHTML=rows3;
         
      }
     
    } 
     
    } catch (error) {
      console.log("error : ", error);
    }


  }

  fetchData();

  function  handleClick(id){
    console.log("button clicked");
    console.log("button clicked id :",id)
    window.location.href =`view.html?id=${id}`
    return;
  }
  
  
  
  async function loadedproducts() {
    console.log("loading....")
  
    try {
      
      let location = window.location;
        console.log("location", location);
    
        let querystring = location.search;
        console.log("querystring", querystring);
    
    
        let urlParams = new URLSearchParams(querystring);
        console.log("url", urlParams);
    
        let id = urlParams.get("id");
        console.log("id ", id);

      let datas1 = await fetch(`http://localhost:3000/json/${id}`);
      console.log("datas1 :",datas1)
      let parsed_datas1 = await datas1.json();
      console.log("parsed_datas1 : ", parsed_datas1.id);
  
      let load = document.getElementById('titleid');
      console.log("load",load);
      let load1 = document.getElementById('descriptionid');
      let load2 = document.getElementById('categoryid');
      let load3 = document.getElementById('priceid');
      let load4 = document.getElementById('rateid');
      let load5 = document.getElementById('countid');
      console.log(load5)
      let load6 = document.getElementById('viewimg');
      
      


      // load.value =.title;
          load6.innerHTML = `<img src = "${parsed_datas1.image}" style="width : 400px; height: 400px;">`;
          load.innerHTML = `Title - ${parsed_datas1.title}`; 
          load1.innerHTML =  `Description - ${parsed_datas1.description}`; 
          load2.innerHTML =`category - ${parsed_datas1.category}`; 
          load3.innerHTML = `price - ${parsed_datas1.price}`; 
          load4.innerHTML = `rating - ${parsed_datas1.rating.rate}`; 
          load5.innerHTML = `count - ${parsed_datas1.rating.count}`;
        
       
      } 
       
       catch (error) {
        console.log("error : ", error);
      }
  }

  // loadedproducts() 



  

