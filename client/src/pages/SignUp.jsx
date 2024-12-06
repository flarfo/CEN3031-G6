import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted')

        // Validation for username
        const usernameRegex = /^[A-Za-z][A-Za-z0-9]*$/;
        if (!usernameRegex.test(username)) {
            // toast.error('Username must start with a letter and contain no special characters.', {
            //     position: 'top-center',
            // });
            alert('Username must start with a letter and contain no special characters.')
            return;
        }

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{10,})/;
        if (!passwordRegex.test(password)) {
            // toast.error('Password must be at least 10 characters long, include at least one uppercase letter, one lowercase letter, and one special character.', {
            //     position: 'top-center',
            // });
            alert('Password must be at least 10 characters long, include at least one uppercase letter, one lowercase letter, and one special character.')
            return;
        }

        if (password !== confirmPassword) {
            // toast.error('Passwords do not match.', {
            //     position: 'top-center',
            // });
            alert('Passwords do not match.')
            return;
        }
        if (password === username) {
            console.log("PASSWORD AND USER MATCH!!!!");
            return;
        }

        const cleanUser = username.trim();
        const cleanEmail = email.trim();
        const cleanPass = password.trim();

        try {
            const response = await fetch(`${process.env.REACT_APP_DEV_API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: cleanUser, email: cleanEmail, password: cleanPass}),
            });

                       
            console.log('Response:', response);
            console.log('Response Status:', response.status);
            const data = await response.json();

            if (response.ok) {
                console.log("THIS IS THE PASSWORD: ", cleanPass, ".")
                setPassword('');
                setUsername('');
                setConfirmPassword('');
                setEmail('');
                // toast.success('Sign-up successful! Please log in.', {
                //     position: 'top-center',
                // });
                alert('Sign-up successful! Please log in.')

                setTimeout(() => {
                    navigate('/login');
                }, 6000); 
                
            } else {
                // toast.error(data.message || 'Error during sign-up.', {
                //     position: 'top-center',
                // });
                alert(data.message || 'Error during sign-up.')
            }
        } catch (error) {
            console.error('Error:', error);
            // toast.error('An error occurred. Please try again.', {
            //     position: 'top-center',
            // });
            alert('An error occurred. Please try again.')
        }
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-[600px] flex flex-col lg:flex-row">
                <div className="lg:w-1/2">
                    <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input 
                                type="text" 
                                id="username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                                className="mt-1 p-3 border border-gray-300 rounded w-full" 
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                className="mt-1 p-3 border border-gray-300 rounded w-full" 
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                className="mt-1 p-3 border border-gray-300 rounded w-full" 
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                                className="mt-1 p-3 border border-gray-300 rounded w-full" 
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">Sign Up</button>
                    </form>
                    <p className="mt-4 text-center">Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login here</a></p>
                </div>
                <div className="lg:w-1/2 p-4">
                    <h3 className="text-lg font-semibold mb-2 py-3.5">Requirements</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                        <li>Username must start with a letter and contain no special characters.</li>
                        <li>Password must be at least 10 characters long.</li>
                        <li>Must include at least one uppercase letter, one lowercase letter, and one special character.</li>
                        <li>Passwords must match.</li>
                    </ul>
                    <h3 className="text-lg font-semibold mb-2 py-3.5">Special Characters Allowed</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                        <li>!, @, #, $, %, ^, &, *.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
