import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${id}`
        )
        const data = await res.json()
        setProduct(data)
      } catch (error) {
        console.error("Error :", error)
      }
    }

    fetchProduct()
  }, [id])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        {product?.title}
      </h1>
      <p>{product?.description}</p>
      <p className="font-semibold">${product?.price}</p>
      <p><span className='font-semibold'>Rating:{product?.rating.rate}</span> ({product?.rating.count})</p>
      <p><span className='font-semibold'>Category</span> : {product?.category}</p>
    </div>
  )
}

export default ProductDetails
