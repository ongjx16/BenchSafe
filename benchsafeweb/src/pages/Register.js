import React, { useState } from "react";

export const Register = (props) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gymname, setGymName] = useState('');
    const [gymlocation, setGymLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    
    return(
        <div className="auth-form-container">
            <div>
            <div>
                <div>
                    <h2>Hey there,</h2>
                </div>
                <div>
                    <h1 class="mb-10">Create a BenchSafe Account</h1>
                </div>
            </div>
                
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="gymname">Gym Name</label>
                <input 
                    value={gymname} onChange={(e) => setGymName(e.target.value)} 
                    type="gymname" 
                    id="gymname" 
                    placeholder="e.g. Anytime Fitness"/>
                <label htmlFor="gymlocation">Gym Location</label>
                <input 
                    value={gymlocation} onChange={(e) => setGymLocation(e.target.value)} 
                    type="gymlocation" 
                    id="gymlocation" 
                    placeholder="e.g. Tampines"/>
                <label htmlFor="email">Email</label>
                <input 
                    value = {email} onChange={(e) => setEmail(e.target.value)} 
                    type = "email" 
                    placeholder="e.g. anytimefitness@gmail.com" 
                    id="enail" 
                    name="email"/>
                <label htmlFor="password">Password</label>
                <input 
                    value = {password} onChange={(e) => setPassword(e.target.value)} 
                    type = "password" 
                    placeholder="********" 
                    id="password" 
                    name="password"/>
            </form>
            </div>

            <div>
                <div>
                    <button>Register</button>
                </div>
                <div>
                    <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login Here</button>
                </div>
            </div>
        </div>
      )
}