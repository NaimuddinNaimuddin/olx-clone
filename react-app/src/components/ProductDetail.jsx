import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function ProductDetail() {

    const [product, setproduct] = useState()
    const p = useParams()

    useEffect(() => {
        const url = 'http://localhost:4000/get-product/' + p.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setproduct(res.data.product)
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])

    return (<>
        <Header />
        PRODUCT DETAILS :
        <div >
            {product && <div className="d-flex justify-content-between flex-wrap">
                <div>
                    <img width="700px" height="300px" src={'http://localhost:4000/' + product.pimage} alt="" />
                    <h6> Product Details : </h6>
                    {product.pdesc}
                </div>
                <div>
                    <h3 className="m-2 price-text"> Rs. {product.price} /- </h3>
                    <p className="m-2"> {product.pname}  | {product.category} </p>
                    <p className="m-2 text-success"> {product.pdesc} </p>

                </div>
            </div>}
        </div>
    </>

    )
}

export default ProductDetail;