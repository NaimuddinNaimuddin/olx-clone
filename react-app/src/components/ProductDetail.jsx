import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";
import io from 'socket.io-client';
let socket;

function ProductDetail() {

    const [product, setproduct] = useState()
    const [msg, setmsg] = useState('')
    const [msgs, setmsgs] = useState([])
    const [user, setuser] = useState()
    // console.log(user, "userrrrr")
    const p = useParams()


    useEffect(() => {
        socket = io(API_URL)

        socket.on('connect', () => {
            console.log('con')
        })
        return () => {
            socket.off()
        }

    }, [])

    useEffect(() => {

        socket.on('getMsg', (data) => {

            const _data = data.filter((item, index) => {
                return item.productId == p.productId
            })
            console.log(_data, "_data")
            setmsgs(_data)
        })
    }, [p.productId])

    const handleSend = () => {

        const data = { username: localStorage.getItem('userName'), msg, productId: localStorage.getItem('productId') }
        console.log(data, "data send")
        socket.emit('sendMsg', data)
        setmsg('')
    }

    useEffect(() => {
        const url = API_URL + '/get-product/' + p.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setproduct(res.data.product)
                    localStorage.setItem('productId', res.data.product._id)
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])


    const handleContact = (addedBy) => {
        console.log('id', addedBy)
        const url = API_URL + '/get-user/' + addedBy;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setuser(res.data.user)
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }

    return (<>
        <Header />
        PRODUCT DETAILS :
        <div >
            {product && <div className="d-flex justify-content-between flex-wrap">
                <div>
                    <img width="400px" height="200px" src={API_URL + '/' + product.pimage} alt="" />
                    {product.pimage2 && <img width="400px" height="200px" src={API_URL + '/' + product.pimage2} alt="" />}
                    <h6> Product Details : </h6>
                    {product.pdesc}
                    <h3 className="m-2 price-text"> Rs. {product.price} /- </h3>
                    <p className="m-2"> {product.pname}  | {product.category} </p>
                    <p className="m-2 text-success"> {product.pdesc} </p>

                    {product.addedBy &&
                        <button onClick={() => handleContact(product.addedBy)}>
                            SHOW CONTACT DETAILS
                        </button>}
                    {user && user.username && <h4>{user.username}</h4>}
                    {user && user.mobile && <h3>{user.mobile}</h3>}
                    {user && user.email && <h6>{user.email}</h6>}
                </div>
                <div>
                    CHATS
                    {
                        msgs && msgs.length > 0 &&
                        msgs.map((item, index) => {
                            if (item.username === localStorage.getItem('userName')) {
                                return (
                                    <p key={item._id} style={{ color: '#fff', marginRight: '100px', background: '#61dafb', borderRadius: '5px' }}>
                                        {item.username} : {item.msg} </p>
                                )
                            }
                            if (item.username !== localStorage.getItem('userName')) {
                                return (
                                    <p key={item._id} style={{ color: '#fff', marginLeft: '100px', background: '#282c34', borderRadius: '5px' }}>
                                        {item.username} : {item.msg} </p>
                                )
                            }
                        })
                    }
                    <input value={msg} onChange={(e) => setmsg(e.target.value)} className="form-control" type="text" />
                    <button onClick={handleSend} className="btn btn-primary">SEND </button>
                </div>
            </div>}
        </div>
    </>

    )
}

export default ProductDetail;