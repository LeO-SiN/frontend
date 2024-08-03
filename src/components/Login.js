import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";


const Login = (props) => {
    const url = "https://backend-n5xj2xtkxa-el.a.run.app/login"
    const [cred, setCred] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        var formdata = new FormData();
        formdata.append("username", cred.email);
        formdata.append("password", cred.password);

        var config = {
            method: 'post',
            url: url,
            data: formdata
        };

        await axios(config).then((response) => {
            var resp_json = response.data;
            if (resp_json.detail.success) {
                localStorage.setItem("token", resp_json.detail.access_token);
                navigate("/");
            }
            else
            props.showAlert("Invalid Credentials","danger");
        }).catch((err) => {
            console.log(err)
            props.showAlert("Invalid Credentials","danger");
        });

    }
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '90vh',
        }} >
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid" alt={props.message} />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleSubmit}>


                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                                <input type="email" id="email" name="email" className="form-control form-control-lg" value={cred.email} onChange={onChange}
                                    placeholder="Enter a valid email address" required />

                            </div>


                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="form3Example4">Password</label>
                                <input type="password" id="password" name="password" className="form-control form-control-lg" value={cred.password} onChange={onChange}
                                    placeholder="Enter password" required />

                            </div>





                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg"
                                >Login</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/signup"
                                    className="link-danger">Sign Up</Link></p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login