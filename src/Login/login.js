import React from 'react';

const Login = (props) => {
    const{
        email, 
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError
    } = props; 
    
    return <div> 
        <section className="login">
            <div className="loginContainer"> 
                <label>Email</label>
                <input 
                    type="text" 
                    placeholder="Please enter your email"
                    autoFocus 
                    required 
                    value={email} 
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <p className= "errorMsg">{emailError}</p> 
                
                <label>Password</label>
                <input 
                    type="password" 
                    // autoFocus 
                    placeholder="Password must be 6 characters long"
                    required 
                    value={password} 
                    onKeyPress={(event)=> event.key=== "Enter"? handleLogin() : null}
                    onChange={(e)=>setPassword(e.target.value)}
                    onKeyPress={(e)=> e.key === "Enter"? handleLogin:null}
                />
                <p className= "errorMsg">{passwordError}</p> 

                <div className="btnContainer"> 
                    {hasAccount ? (
                        <>
                            <button onClick={handleLogin}>Sign in</button>
                            <p>Don't have an account ? 
                            <span onClick={()=>setHasAccount (!hasAccount)}>Sign up</span></p>
                        </>
                    ):(
                        <>
                            <button onClick={handleSignup} >Sign up</button>
                            <p>Have an account ? 
                            <span onClick={()=>setHasAccount(!hasAccount)}>Sign in</span></p> 
                            </>

                    )}
                </div>
            </div>
        </section>
    </div>
} 

export default Login;