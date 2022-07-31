import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

const Signup = (props) => {

    const host = "http://localhost/"
    const [cred, setCred] = useState({ name: "", email: "", password: "" })
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })

    }
    let navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": cred.name,
            "email": cred.email,
            "password": cred.password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const responseSignup = await fetch(host + "register", requestOptions)
        const jsonSign = await responseSignup.json();
        if (jsonSign.status) {
            var formdata = new FormData();
            formdata.append("username", cred.email);
            formdata.append("password", cred.password);

            var requestOptionsLogin = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };
            props.showAlert("Account created successfully","success");
            //login the new user
            const response = await fetch(host + "login", requestOptionsLogin)
            const json = await response.json()
            if (json.detail.success) {
                localStorage.setItem("token", json.detail.access_token)
                navigate("/", { replace: true })
            }
        }
        else{

            props.showAlert("Invalid Credentials","danger");
        }


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
                                <label className="form-label" htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" className="form-control form-control-lg" value={cred.name} onChange={onChange}
                                    placeholder="Enter your name" />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                                <input type="email" id="email" name="email" className="form-control form-control-lg" value={cred.email} onChange={onChange}
                                    placeholder="Enter a valid email address" />
                            </div>
                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="form3Example4">Password</label>
                                <input type="password" id="password" name="password" className="form-control form-control-lg" value={cred.password} onChange={onChange}
                                    placeholder="Enter password" required minLength={8} />
                            </div>
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg"
                                >Sign Up</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <Link to="/login"
                                    className="link-danger">Login</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup