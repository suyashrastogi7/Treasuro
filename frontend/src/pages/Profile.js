import React from "react";

import { useSelector } from "react-redux";

import Template from "../components/Template";
import TitleDash from "../components/TitleDash";
import Detail from "../components/Detail";

const Profile = () => {
    const user = useSelector((state) => state.signin.loggedInUser);
    return (
        <Template>
            <div className="flex">
                <TitleDash title="My Profile" />
            </div>
            <div className="mt-12 flex justify-between">
                <div>
                    <Detail name="Name" value={user.name} />
                    <Detail name="Email" value={user.email} />
                    <Detail name="Username" value={user.username} />
                    <Detail name="Level" value={user.level} />
                    <Detail name="Attempts Left" value={user.attempts} />
                    <Detail name="Phone Number" value={user.phoneno} />
                </div>
                <div className="rounded-full ">
                    <img
                        src={user.image}
                        alt="profile display"
                        className="mx-auto w-3/5"
                    />
                </div>
            </div>
        </Template>
    );
};

export default Profile;
