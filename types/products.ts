

export interface Product {
    
    _id : string;
    name : string;
    _type : "products";
    image? : {
        asset : {
            _ref : string;
            _type : "image"; 
        }
    };
    price : number;
    description?: string;

    
    slug : {
        _type : "slug";
        current : string;
    };
    inventory : number;
}