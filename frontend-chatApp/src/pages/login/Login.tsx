import { Link } from "react-router-dom";
import { UserLoginT } from "../../types";
import { useState } from "react";
import UserLogin from "../../hooks/UserLogin";


const initialState: UserLoginT = {
    userName: '',
    password: ''
}

export default function Login() {

    const [inputLogin, setInputLogin] = useState<UserLoginT>(initialState);
    const {loading, login} = UserLogin();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputLogin({
            ...inputLogin,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(inputLogin);
    }   

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding 
            backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Login
                    <span className="text-blue-500"> ChatApp</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input type="text" placeholder="Enter Username"
                            className="w-full input input-bordered h-10" 
                            id="userName" value={inputLogin.userName} onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Enter Password"
                            className="w-full input input-bordered h-10"
                            id="password" value={inputLogin.password} onChange={handleChange} />
                    </div>
                    <Link to='/signup' className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                        {"Don't"} have an account? Register
                    </Link>
                    <div>
                        <button type="submit"
                            disabled={loading}
                            className="w-full btn btn-primary mt-4 text-white">
                            {loading ? <span className="loading loading-spinner"></span>: "Login"}
                        </button>
                    </div>

                </form>
            </div>
        </div>

    )
}
