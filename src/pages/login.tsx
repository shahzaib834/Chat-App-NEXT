import { useState } from 'react';

export default function Login() {
  const [loginMode, SetLoginMode] = useState(true);
  const [validationError, setValidationError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [picture, setPicture] = useState('');

  const toggleMode = (e, mode: 'Login' | 'SignUp') => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setValidationError('');
    e.preventDefault();
    if (mode === 'Login') {
        SetLoginMode(true);
    } else {
        SetLoginMode(false);
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setValidationError('');
    if (!email || !password) {
      setValidationError('All fields are required');
    }
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    setValidationError('');
    if (!name || !email || !password ||!confirmPassword) {
      return setValidationError('All fields are required');
    }

    if (password !== confirmPassword) {
      return setValidationError('Passwords do not match');
    }
  }

  return (
    <>
      <div className='flex items-center w-full h-[100vh] flex-col mt-16 font-light gap-3'>
        <div className='bg-white p-5 rounded-lg text-4xl w-4/12 text-center'>
          Talk A Tive
        </div>

        <form className='bg-white p-5 rounded-lg w-4/12'>
          <div className='flex justify-between gap-1'>
            {loginMode ? (
              <div className='flex flex-col w-full'>
                <div className='flex'>
                  <div className='border-4 border-blue-400 bg-blue-300 rounded-3xl w-full p-2 text-center cursor-pointer'>
                    LogIn
                  </div>
                  <div className='w-full p-2 text-center cursor-pointer' onClick={(e) => toggleMode(e, 'SignUp')}>
                    SignUp
                  </div>
                </div>

                <div className='flex flex-col gap-1 mt-2'>
                  <label>Email</label>
                  <input
                    type='text'
                    className='border-2 border-gray-200 p-2 rounded-md h-8'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <label>Password</label>
                  <input
                    type='password'
                    className='border-2 border-gray-200 p-2 rounded-md h-8'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <button className='bg-blue-500 p-2 rounded-lg mt-2' onClick={(e) => handleLogin(e)}>
                    Log In
                  </button>
                </div>
              </div>
            ) : (
              <div className='flex flex-col w-full'>
                <div className='flex'>
                  <div className='w-full p-2 text-center cursor-pointer' onClick={(e) => toggleMode(e, 'Login')}>
                    Login
                  </div>
                  <div className='border-4 border-blue-400 bg-blue-300 rounded-3xl w-full p-2 text-center cursor-pointer'>
                    SignUp
                  </div>
                </div>

                <div className='flex flex-col gap-1 mt-2'>
                  <label>Name</label>
                  <input
                    type='text'
                    className='border-2 border-gray-200 p-2 rounded-md h-8'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <label>Email</label>
                  <input
                    type='text'
                    className='border-2 border-gray-200 p-2 rounded-md h-8'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <label>Password</label>
                  <input
                    type='password'
                    className='border-2 border-gray-200 p-2 rounded-md h-8'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <label>Confirm Password</label>
                  <input
                    type='password'
                    className='border-2 border-gray-200 p-2 rounded-md h-8'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                  <label>Upload your Picture</label>
                  <input
                    type='file'
                    className='border-2 border-gray-200 p-2 rounded-md'
                    onChange={(e) => setPicture(e.target.value)}
                    value={picture}
                  />
                  <button className='bg-blue-500 p-2 rounded-lg mt-2' onClick={(e) => handleSignUp(e)}>
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>

        {validationError ? <div className='bg-red-500 text-white p-2 absolute bottom-5 rounded-lg w-2/12 text-center'>
          {validationError}
        </div> : <></>}
      </div>
    </>
  );
}
