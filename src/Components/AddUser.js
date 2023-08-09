import React, { useState } from 'react';

const AddUser = () => {
    const [user, setUser] = useState({});

    const handleInput = event =>{
        event.preventDefault();
        // console.log(user);

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify(user)

        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                alert('succes added');
                event.target.reset();
            }
        })
    }
    const handleInputBlur = event =>{
        const field = event.target.name;
        const value = event.target.value;
        const newUser = {...user}
        newUser[field] = value;
        setUser(newUser)
    }
    return (
        <div>
            <h2>Add a new user</h2>

           <form onSubmit={handleInput}>
           <input onBlur={handleInputBlur} type='text' name='name' placeholder='name'/>
            <br/>

            <input onBlur={handleInputBlur} type='text' name='addres' placeholder='addres'/>
            <br/>

            <input  onBlur={handleInputBlur} type='email' name='email' placeholder='email'/>
            <br/>
            <button type='submit'>submit</button>
           </form>
        </div>
    );
};

export default AddUser;