import React, { useEffect, useState, Component } from 'react';

const Products = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);


  
  return (


    <ul>
      {products.map(product => 
       <a href={`#${product.sku}`}>
       <img src={require(`../static/products/${product.sku}_2.jpg`)} alt={product.title}/>
       <span className="card-title" />
        
       <p className="card-title">{product.title}</p>
						<p>Price: ${product.price}</p>
            <btn
							
						>
							Add to cart
						</btn>
   </a>       
                    

       
       )}
    </ul>
    
    
  );
};

export default Products