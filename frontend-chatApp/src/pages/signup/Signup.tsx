import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox.component";
import { useState } from "react";
import { UserSignUp } from "../../types";
import UserSignup from "../../hooks/UserSignup";


const initialState:UserSignUp={
    fullName: '',
    userName: '',
    password: '',
    gender: '',
    confirmPassword: ''
}

export default function Signup() {
    
    const [inputs, setInputs] = useState<UserSignUp>(initialState);
    
    const {loading,signup} = UserSignup();

    const handleChange=(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
        setInputs({
            ...inputs,
            // [e.target.id]: e.target.value
            [e.target.id !== "" ? e.target.id: e.target.name]: e.target.value
        })
    };

    const handleSubmit= async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        await signup(inputs);
    }

    return (
        <div className="flex  flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding 
            backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-200">
                    SignUP <span className="text-blue-500"> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Full Name</span>
                        </label>
                        <input type="text" placeholder="Daniel San"
                        className="w-full input input-bordered h-10"
                        id="fullName"
                        value={inputs.fullName}
                        onChange={handleChange}/>
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">UserName</span>
                        </label>
                        <input type="text" placeholder="daniSan"
                            className="w-full input input-bordered h-10"
                            id="userName"
                            value={inputs.userName}
                            onChange={handleChange}/>
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Enter Password"
                            className="w-full input input-bordered h-10"
                            id="password"
                            value={inputs.password}
                            onChange={handleChange}/>
                    </div>

                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Confirm Password</span>
                        </label>
                        <input type="password" placeholder="Confirm Password"
                            className="w-full input input-bordered h-10"
                            id="confirmPassword"
                            value={inputs.confirmPassword}
                            onChange={handleChange} />
                    </div>

                    {/* Gender checkbox */}
                    <GenderCheckbox
                        handleChange={handleChange}
                        input={inputs.gender}/>

                    <Link to="/login" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                        Already have an account?
                    </Link>

                    <div>
                        <button type="submit"
                            className="w-full btn btn-primary mt-2 text-white" disabled={loading}>
                            {loading ? <span className="loading loading-spinner"></span>: "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
