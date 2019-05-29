class Product {
    constructor(_name, _price) {
        this.name = _name;
        this.price = _price;
    }
    getName() {
        return this.name;
    }
    getPrice() {
        return this.price;
    }
}

const bread = new Product('bread', 10);
bread.price = 20; //how to prevent this 
console.log(bread.getName(), bread.getPrice());