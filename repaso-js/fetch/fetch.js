const url = 'https://fakestoreapi.com/products';


fetch(url)
    .then((response)=>{

        if(!response.ok){
            console.log('error!');
        }
        return response.json();
    })
    .then((datos) => {
        // console.log(datos);
        for(let dato of datos){ 
            console.log(`El ${dato.title} y precio $ ${dato.price}`);
        }
    })
    .catch((error)=>{
        console.log(`Error ${error}`);
    })

async function buscarTodos(){
    try{
        const resp = await fetch(url);
        if (!resp.ok){
            console.log(`Error!`);
        }

        const productos = await resp.json();
        console.log(productos);
    }catch (error){
        console.log(`Error! ${error}`);
    } 
}

buscarTodos();


async function buscarPorId(id){
    try{
        const resp = await fetch(`${url}/${id}`);
        if (!resp.ok){
            console.log(`Error!`);
        }

        const producto = await resp.json();
        console.log(producto);
    }catch (error){
        console.log(`Error! ${error}`);
    } 
}

buscarPorId(21);



async function crearProducto(producto) {
    try{
        const resp = await fetch( url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(producto)
        })

        if (!resp.ok){
            console.log(`Error!`);
        }

        const pro = await resp.json();
        console.log(pro);



    }catch (error){
        console.log(`Error! ${error}`);
    } 
}  

const p = {
    id:21,
    title: 'Nuestro producto',
    price: 500
}
crearProducto(p);