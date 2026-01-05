import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RiStarFill, RiStarHalfFill, RiStarLine } from 'react-icons/ri';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error :', error);
      }
    };

    fetchProduct();
  }, [id]);

  let rate = product?.rating.rate;
  const fullS = Math.floor(rate);
  let halfS;
  if (rate % 1 >= 0.5) {
    halfS = 1;
  } else {
    halfS = 0;
  }
  const emptyS = 5 - fullS - halfS;

  const stars = [];
  for (let i = 0; i < fullS; i++) {
    stars.push(<RiStarFill key={`full-${i}`} />);
  }

  if (halfS) {
    stars.push(<RiStarHalfFill key="half" />);
  }

  for (let i = 0; i < emptyS; i++) {
    stars.push(<RiStarLine key={`${i + fullS + halfS}`} />);
  }

  return (
    <div className="px-12 py-6 flex flex-col">
      <img src={product?.image} alt="" className="w-80 h-80" />
      <h1 className="text-2xl font-bold">{product?.title}</h1>
      <p>{product?.description}</p>
      <p className="font-semibold text-xl mb-2">Price: ${product?.price}</p>
      <div className="flex">{stars}</div>
      <p>
        <span className="font-semibold">Rating:{product?.rating.rate}</span> (
        {product?.rating.count})
      </p>
      <p>
        <span className="font-semibold">Category</span> : {product?.category}
      </p>
    </div>
  );
};

export default ProductDetails;
