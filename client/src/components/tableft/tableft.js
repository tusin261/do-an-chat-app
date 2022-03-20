import React, { Component } from 'react';

class Tableft extends Component {
    render() {
        return (
            <div class='row'>
                <div id='tableft' class="bg-pink">
                    <div class="px-4 pt-4">
                        <h4 className="mb-4">Chats</h4>
                        <div className="search-box chat-search-box">
                            <div className="input-group mb-3 rounded-3">
                                <span className="input-group-text text-muted bg-light pe-1 ps-3" id="basic-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>

                                </span>
                                <input type="text" className="form-control bg-light" placeholder="Search messages or users" aria-label="Search messages or users" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        {/* Search Box*/}
                    </div>


                    <div className="chat-message-list px-2" data-simplebar>
                        <ul className="list-unstyled chat-list chat-user-list">
                            <li>
                                <a href="#">
                                    <div className="d-flex">
                                        <div className="chat-user-img online align-self-center me-3 ms-0">
                                            <img src="assets/images/users/avatar-2.jpg" className="rounded-circle avatar-xs" alt="" />
                                            <span className="user-status" />
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="text-truncate font-size-15 mb-1">Patrick Hendricks</h5>
                                            <p className="chat-user-message text-truncate mb-0">Hey! there I'm available</p>
                                        </div>
                                        <div className="font-size-11">05 min</div>
                                    </div>
                                </a>
                            </li>
                            <li className="unread">
                                <a href="#">
                                    <div className="d-flex">
                                        <div className="chat-user-img away align-self-center me-3 ms-0">
                                            <img src="assets/images/users/avatar-3.jpg" className="rounded-circle avatar-xs" alt="" />
                                            <span className="user-status" />
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="text-truncate font-size-15 mb-1">Mark Messer</h5>
                                            <p className="chat-user-message text-truncate mb-0"><i className="ri-image-fill align-middle me-1 ms-0" /> Images</p>
                                        </div>
                                        <div className="font-size-11">12 min</div>
                                        <div className="unread-message">
                                            <span className="badge badge-soft-danger rounded-pill">02</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="d-flex">
                                        <div className="chat-user-img online align-self-center me-3 ms-0">
                                            <img src="assets/images/users/avatar-2.jpg" className="rounded-circle avatar-xs" alt="" />
                                            <span className="user-status" />
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="text-truncate font-size-15 mb-1">Patrick Hendricks</h5>
                                            <p className="chat-user-message text-truncate mb-0">Hey! there I'm available</p>
                                        </div>
                                        <div className="font-size-11">05 min</div>
                                    </div>
                                </a>
                            </li>
                            <li className="unread">
                                <a href="#">
                                    <div className="d-flex">
                                        <div className="chat-user-img away align-self-center me-3 ms-0">
                                            <img src="assets/images/users/avatar-3.jpg" className="rounded-circle avatar-xs" alt="" />
                                            <span className="user-status" />
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="text-truncate font-size-15 mb-1">Mark Messer</h5>
                                            <p className="chat-user-message text-truncate mb-0"><i className="ri-image-fill align-middle me-1 ms-0" /> Images</p>
                                        </div>
                                        <div className="font-size-11">12 min</div>
                                        <div className="unread-message">
                                            <span className="badge badge-soft-danger rounded-pill">02</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <div className="d-flex">
                                        <div className="chat-user-img online align-self-center me-3 ms-0">
                                            <img src="assets/images/users/avatar-2.jpg" className="rounded-circle avatar-xs" alt="" />
                                            <span className="user-status" />
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="text-truncate font-size-15 mb-1">Patrick Hendricks</h5>
                                            <p className="chat-user-message text-truncate mb-0">Hey! there I'm available</p>
                                        </div>
                                        <div className="font-size-11">05 min</div>
                                    </div>
                                </a>
                            </li>
                            <li className="unread">
                                <a href="#">
                                    <div className="d-flex">
                                        <div className="chat-user-img away align-self-center me-3 ms-0">
                                            <img src="assets/images/users/avatar-3.jpg" className="rounded-circle avatar-xs" alt="" />
                                            <span className="user-status" />
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="text-truncate font-size-15 mb-1">Mark Messer</h5>
                                            <p className="chat-user-message text-truncate mb-0"><i className="ri-image-fill align-middle me-1 ms-0" /> Images</p>
                                        </div>
                                        <div className="font-size-11">12 min</div>
                                        <div className="unread-message">
                                            <span className="badge badge-soft-danger rounded-pill">02</span>
                                        </div>
                                    </div>
                                </a>
                            </li>

                            <li className="active">
                                <a href="#">
                                    <div className="d-flex">
                                        <div className="chat-user-img online align-self-center me-3 ms-0">
                                            <img src="assets/images/users/avatar-4.jpg" className="rounded-circle avatar-xs" alt="" />
                                            <span className="user-status" />
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h5 className="text-truncate font-size-15 mb-1">Doris Brown</h5>
                                            <p className="chat-user-message text-truncate mb-0">Nice to meet you</p>
                                        </div>
                                        <div className="font-size-11">10:12 AM</div>
                                    </div>
                                </a>
                            </li>



                        </ul>
                    </div>

                </div>
            </div>
        );
    }
}

export default Tableft;