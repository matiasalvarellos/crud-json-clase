const fs = require('fs');
const path = require('path');

const dataJson = fs.readFileSync(path.join(__dirname, '../data/products.json'));
const products = JSON.parse(dataJson);



function addProduct(product){
    products.push(product);
    const productsString = JSON.stringify(products);
    fs.writeFileSync(path.join(__dirname, '../data/products.json'), productsString);
}

function  updateProducts(){
    const productsString = JSON.stringify(products)
    fs.writeFileSync(path.join(__dirname, '../data/products.json'), productsString);
}

const productController = {
    list: (req, res) => {
       res.render('menu-products', { products: products });
    },
    detail: (req, res) => {
        //obtengo la inf del request
        const id = req.params.id

        //busco el producto
        const productFound = products.find(function(plato){
            return plato.id == id
        })
        //devuelvo la respuesta
        res.render('product-detail', { plato: productFound });
    },
    create: (req, res)=> {
        res.render('product-create-form');
    },
    store: (req, res)=>{
        const form = req.body;
        console.log(form);

        const newProduct = {
            id: products.length + 1 ,
            name: form.name,
            description: form.description,
            price: form.price,
        }

        addProduct(newProduct);
        res.redirect('/product/list');
    },
    edit: (req, res)=> {
        const id = req.params.id

        //busco el producto
        const productFound = products.find(function(plato){
            return plato.id == id
        })

        res.render('product-update-form', { product: productFound });
    },
    update: (req, res) => {
        const id = req.params.id
        const form = req.body;

        //busco el producto
        const productFound = products.find(function(plato){
            return plato.id == id
        })
        
        //modifico el producto en el listado correspondiente
        productFound.name = form.name;
        productFound.description = form.description;
        productFound.price = form.price;

        //actualizar el json
        updateProducts()

        res.redirect('/product/list');

    }

}

module.exports = productController;