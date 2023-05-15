import React, {useState, useEffect} from 'react';
import './style/Follow.css';


function Follow({logged, friends}){

    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    if (!friends) {
        friends = [];
    }

    useEffect(() => {
        getUsers();
    }, []);
    
    const eraikiLista = (list) => {
        let lista = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i].username !== logged && !friends.includes(list[i].username)) {
                lista.push(list[i]);
            }
        }
        setUserList(lista);
    }

    const getUsers = async () => {
        try {
            const response = await fetch("/api/users/");
            const data = await response.json();
            if (data.message === "ok") {
                eraikiLista(data.users);
            } else {
                document.querySelector(".error").innerHTML = data.message;
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const addFriend = async () => {
        try {
            const response = await fetch("/api/addFriend/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username: logged, friend: selectedUser})
            });
            const data = await response.json();
            if (data.message === "ok") {
                document.querySelector(".error").innerHTML = "Added friend successfully";
                window.location.reload(true);
            } else {
                document.querySelector(".error").innerHTML = data.message;
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    const selectToFollow = (user) => {
        return () => {
            document.querySelector(".error").innerHTML = "";
            setSelectedUser(user);
        }
    }

    return(
        <div className="Follow">
            <h1>Follow</h1>
            <div className="userList">
                <ul>
                {
                    userList===null ? (
                        <>
                            {userList.map((user) => (
                                <li key={user.username} onClick={selectToFollow(user.username)} className={ selectedUser===user.username ? "selected" : "noSelected" } >
                                    <div>
                                        <label>{user.username}</label>
                                    </div>
                                </li>
                            ))}
                            <button onClick={addFriend}>Follow</button>
                        </>
                    ):(
                        <p>No friends to add</p>
                    )
                }
                </ul>
            </div>
            <p className="error"></p>
        </div>
    );
}





export default Follow;