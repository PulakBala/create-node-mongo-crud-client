import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storeUser = useLoaderData();

    const [user, setUser] = useState(storeUser);

    const handleInput = event =>{
        event.preventDefault();
        // console.log(user);
        fetch(`http://localhost:5000/users/${storeUser._id}`,{
            method: 'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
            
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0) {
                alert('user updated')
            }
            console.log(data)
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
            <h2>Update this : </h2>
            <h2>name:{storeUser.name}</h2>
            <form onSubmit={handleInput}>
           <input onChange={handleInputBlur} type='text' defaultValue={storeUser.name} name='name' placeholder='name'/>
            <br/>

            <input onChange={handleInputBlur} type='text' defaultValue={storeUser.addres} name='addres' placeholder='addres'/>
            <br/>

            <input  onChange={handleInputBlur} type='email' defaultValue={storeUser.email} name='email' placeholder='email'/>
            <br/>
            <button type='submit'>Update User</button>
           </form>
        </div>
    );
};

export default Update;