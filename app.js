

const displayProduct = () => {
    const searchButton = document.getElementById("click_container");
    const div = document.createElement("div");
    div.classList.add("comment");
    div.innerHTML = `
    <input id="input_value" type="search" class="input_field" placeholder="Search here..">
    <button onclick="AllProduct(document.getElementById('input_value').value)">Search</button>
    `

    searchButton.appendChild(div);
};


const AllProduct = (name) => {

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            if (data.meals) {
                displayProducts(data.meals);
            } else {
                displayProducts([]);
            }
        });
};




const displayProducts = (Product) => {

    const productContainer = document.getElementById("product_container");
    productContainer.innerHTML=" ";

    if(Product.length==0){
        // Product.innerHTML='<p>No product found</p>';
        // console.log("food not found")

         const notfound=document.getElementById("not_found");
         const div=document.createElement("div");
         div.classList.add("Notfound");
         div.innerHTML=`
          <p>Product not found</p>
         `
         notfound.appendChild(div);
        return;
    }
     

    Product.forEach(product => {

        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <img class="img_container" src=${product.strMealThumb} alt="">
         <h5>${product.strMeal.slice(0,20)}</h5>
         <p>${product.strCategory}</P>
        <h5>${product.strArea} Food</h5>
        <p>%{product.strTags}</p>
        <button class="btn" onclick="Description('${product.idMeal}')">Details</button>
      `
        productContainer.appendChild(div);
        
        
    });
    
};

const Description=(id)=>{
     console.log(id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=>res.json())
    .then(data =>{
    //   console.log(data);
    displayDescription(data);
  
    });

};


const displayDescription=(product)=>{
    console.log('insidedisplay');
    console.log(product);
    const Description=document.getElementById("description");
    Description.innerHTML="";
   
       const div=document.createElement("div");
       div.classList.add("card");
       
       div.innerHTML=`
       <img class="img_container" src=${product.meals[0].strMealThumb} alt="">
        <p>ID : ${product.meals[0].idMeal}</p>
        <p>product_Name: ${product.meals[0].strMeal}</p>
        <p>Category :${product.meals[0].strCategory}</p>
        <p>Country :${product.meals[0].strArea} Food</p>
        
       `
       Description.appendChild(div);
       
   
};


displayProduct();



