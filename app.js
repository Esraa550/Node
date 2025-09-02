
// ------------------------  Task 1 -------------------------------//

console.log("hi from js in server");

const fs = require('fs');
const http = require('http');


let productsDB = fs.readFileSync("products.json", "utf8");

let products = JSON.parse(productsDB);

const server = http.createServer((req, res) => {
    let arr = req.url.split("/");
    console.log(arr);


    if (req.url === "/products") {
        res.write(JSON.stringify(products));
    } 
    else if (arr.length === 3 && arr[1] === "products") {
        let index = arr[2] - 1; 
        if (index >= products.length || index < 0) {
            res.write(JSON.stringify({ error: "Product not found" }));
        } else {
            res.write(JSON.stringify(products[index]));
        }
    } 
    else {
        res.write(JSON.stringify({ error: "not found" }));
    }

    res.end();
});

server.listen(5000, () => {
    console.log("my server is ready to listen");
});


