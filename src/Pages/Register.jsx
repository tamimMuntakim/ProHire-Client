import Lottie from 'lottie-react';
import React, { useContext, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import RegisterLottie from "../assets/lotties/register_lottie.json";
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';
import { baseURL } from '../Utilities/BaseURL';

const Register = () => {
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, googleSignIn, updateUser, setUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const passRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const handleRegister = (e) => {
        e.preventDefault();
        setError("");
        setPasswordError("");
        const formData = new FormData(e.target);
        const newUser = Object.fromEntries(formData.entries());

        if (passRegEx.test(newUser.password) === false) {
            setPasswordError("Password must be at least 8 characters long and include uppercase and lowercase letters, a number, and a special character.");
            return;
        }

        createUser(newUser.email, newUser.password)
            .then((result) => {
                const user = result.user;
                const updatedUser = { displayName: newUser.name, photoURL: newUser.photo };
                updateUser(updatedUser).then(() => {
                    const newUserDB = {
                        name: newUser.name,
                        email: newUser.email,
                        role: newUser.role,
                        photo: newUser.photo
                    };

                    // Axios post
                    axios
                        .post(`${baseURL}/users`, newUserDB)
                        .then((res) => {
                            if (res.data.insertedId) {
                                setUser({ ...user, role: newUser.role });
                                Swal.fire({
                                    icon: "success",
                                    title: "Successfully Registered and Logged In!!!",
                                    timer: 1500
                                });
                                navigate(`${location.state ? location.state : "/"}`);
                            } else {
                                setError("User creation failed in DB");
                                Swal.fire({
                                    icon: "error",
                                    title: "Please try again !!",
                                    timer: 1500
                                });
                            }
                        })
                        .catch((err) => {
                            console.error("DB error:", err.message);
                            setError("Error saving user to database");
                        });
                });
            })
            .catch((err) => setError(err.message));
    }
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(async (result) => {
                const user = result.user;
                const email = user.email;
                const name = user.displayName;
                const photo = user.photoURL;
                // 1. Check if user exists in DB
                try {
                    const res = await axios.get(`${baseURL}/users?email=${email}`);
                    const dbUser = res.data.user;

                    // 2. If user exists, setUser with role
                    if (res.data.exists) {
                        setUser({ ...user, role: dbUser.role });
                        Swal.fire({
                            icon: "success",
                            title: "Successfully Registered and Logged In!!!",
                            timer: 1500
                        });
                        navigate(`${location.state ? location.state : "/"}`);
                    } else {
                        // 3. If user does not exist, assign default role (or redirect to role picker page)
                        const newUser = {
                            name: name,
                            email: email,
                            photo: photo,
                            role: "applicant"
                        };

                        const postRes = await axios.post(`${baseURL}/users`, { ...newUser });
                        if (postRes.data.insertedId) {
                            setUser({ ...user, role: newUser.role });
                            Swal.fire({
                                icon: "success",
                                title: "Successfully Registered and Logged In!!!",
                                timer: 1500
                            });
                            navigate(`${location.state ? location.state : "/"}`);
                        }
                    }
                } catch (error) {
                    console.error("Google login error:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Please try again !!",
                        timer: 1500
                    });
                }
            })
            .catch((error) => {
                console.log("Google sign-in error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Please try again !!",
                    timer: 1500
                });
            });
    };
    return (
        <div className="flex justify-center items-center mt-4">
            <div className="flex flex-col md:flex-row-reverse gap-2 md:gap-4 md:items-center">
                <div>
                    <Lottie animationData={RegisterLottie} className='h-[150px] md:h-[300px] w-auto'
                    ></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl pt-5 border border-slate-200">
                    <h2 className="font-semibold text-lg md:text-2xl text-center text-primary">
                        Register your account
                    </h2>
                    <form onSubmit={handleRegister} className="card-body">
                        <fieldset className="fieldset">
                            <label className="label font-semibold ">Name</label>
                            <input
                                name="name"
                                type="text"
                                className="input "
                                placeholder="Name"
                                required
                            />
                            <label className="label font-semibold ">Email</label>
                            <input
                                name="email"
                                type="email"
                                className="input "
                                placeholder="Email"
                                required
                            />

                            <label className="label font-semibold ">Photo URl </label>
                            <input
                                name="photo"
                                type="text"
                                className="input "
                                placeholder="Photo URl"
                                required
                            />

                            <label className="label font-semibold ">Password</label>
                            <div className='input'>
                                <input
                                    name="password"
                                    type={(showPassword) ? "text" : "password"}
                                    className=''
                                    placeholder="Password"
                                    required
                                />
                                <button type='button' className='text-xs md:text-base' onClick={() => setShowPassword(!showPassword)}>
                                    {(!showPassword) ? <FaRegEye /> : <FaRegEyeSlash />}
                                </button>
                            </div>

                            {passwordError && <p className="text-red-500 text-xs text-center mt-2">{passwordError}</p>}
                            {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}

                            <label className="label font-semibold">Sign up as a</label>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="applicant"
                                        className="radio"
                                        required
                                    />
                                    <span className="label-text  mr-4">Applicant</span>
                                </label>
                                <label className="label cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        className="radio "
                                    />
                                    <span className="label-text  mr-4">Recruiter</span>
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary mt-2 text-white">
                                Register
                            </button>

                            <div className="divider">OR</div>

                            <button onClick={handleGoogleSignIn} type='button' className="btn bg-white text-black border-[#e5e5e5]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>

                            <p className="font-semibold text-center pt-2">
                                Already Have An Account ?{" "}
                                <Link className="text-primary" to="/auth/login">
                                    Login
                                </Link>
                            </p>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;