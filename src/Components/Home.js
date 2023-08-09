import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(users);

    const deleteUser = user =>{
        const agree = window.confirm(`Are you sure delete this user: ${user.name}`)
        console.log(agree)
       if(agree) {
        // console.log('deleteing user with id:',user._id);
        fetch(`http://localhost:5000/users/${user._id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => 
           {
            // console.log(data)
            if(data.deletedCount > 0) {
                alert('User deleted successfully')
                const remainingUsers = displayUsers.filter(usr => usr._id !== user._id)
                setDisplayUsers(remainingUsers)
            }
           }
            
            );
       }
    }

    return (
        <div>
            <h2>This is home page</h2>
            <h2>{displayUsers.length}</h2>
            {
                displayUsers.map(user => <p key={user._id}>
                    {user.name} {user.email} 
                    
                     <Link to= {`/update/${user._id }`}>
                     <button>Update</button>
                     </Link>

                     <button onClick={() => deleteUser(user)}>X</button>
                </p>)
            }
        </div>
    );
};

export default Home;