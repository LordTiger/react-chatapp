import React, {useRef, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { Avatar, ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [ loading, setLoading ] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();
        
        history.push('/');
    }

    const getFile = async (url) => {
        const respone = await fetch(url);
        const data = await respone.blob();

        return new File([data], "userPhone.jpg",  {type: 'image/jpeg'})
    }

    useEffect(() => {
        if(!user) {
            history.push('/');

            return;
        }

        axios.get('https://api.chatengine.io/users/me/', {
            headers: {
                "project-id": "09131f19-64d8-4458-9e17-c281daaeec96",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.displayName);
            formdata.append('secret', user.uid);


            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name)

                    axios.post('https://api.chatengine.io/users/',
                    formdata,
                    { headers: { "private-key": "6419be51-dba7-419c-b744-3659e1d17e07"}}
                    )
                })
                .then(() => setLoading(false))
                .catch((error) => console.log(error))
        })
    }, [user, history]);

    if(!user || loading) return 'Loading... ';

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Vic Chat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="09131f19-64d8-4458-9e17-c281daaeec96"
                userName={user.displayName}
                userSecret={user.uid}
            />
        </div>
    )
}

export default Chats;