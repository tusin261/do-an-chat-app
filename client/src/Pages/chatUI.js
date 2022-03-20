import React, { Component } from 'react';
import ProfileTab from '../components/profile/profileside';
import Tableft from '../components/tableft/tableft';
import Tabright from '../components/tabright/tabright';

class ChatUI extends Component {
    render() {
        return (
            <div class='container-luid'>
            <div className="row">
                <div className="col-2">
                    <Tableft />
                </div>
                <div className="col-8 ">
                    <Tabright />
                </div>
                <div className="col-2">
                    <ProfileTab/>
                </div>
            </div>
        </div>
        );
    }
}

export default ChatUI;