import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function AddProduct() {

    const navigate = useNavigate();
    const [pname, setpname] = useState('');
    const [pdesc, setpdesc] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [pimage, setpimage] = useState('');


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])

    const handleApi = () => {

        const formData = new FormData();
        formData.append('pname', pname)
        formData.append('pdesc', pdesc)
        formData.append('price', price)
        formData.append('category', category)
        formData.append('pimage', pimage)

        const url = 'http://localhost:4000/add-product';
        axios.post(url, formData)
            .then((res) => {
                console.log(res)
                if (res.data.message) {
                    alert(res.data.message);
                    navigate('/')
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <div>
            <Header />
            <div className="p-3">

                <h2> ADD PRODUCT HERE : </h2>
                <label> Product Name </label>
                <input className="form-control" type="text" value={pname}
                    onChange={(e) => { setpname(e.target.value) }} />
                <label> Product Description </label>
                <input className="form-control" type="text" value={pdesc}
                    onChange={(e) => { setpdesc(e.target.value) }} />
                <label> Product Price</label>
                <input className="form-control" type="text" value={price}
                    onChange={(e) => { setprice(e.target.value) }} />
                <label> Product Category </label>
                <select className="form-control" value={category}
                    onChange={(e) => { setcategory(e.target.value) }}>
                    <option> Bikes </option>
                    <option> Mobiles </option>
                    <option> Cloth </option>
                </select>
                <label> Product Image </label>
                <input className="form-control" type="file"
                    onChange={(e) => {
                        setpimage(e.target.files[0])
                    }} />
                <button onClick={handleApi} className="btn btn-primary mt-3"> SUBMIT </button>
            </div>

        </div>
    )
}

export default AddProduct;