import React, { Component } from 'react';

class Tabright extends Component {
    render() {
        return (
            <div class='row'>
                <div className="user-chat w-100 overflow-hidden">
                    <div className="d-lg-flex">
                        {/* start chat conversation section */}
                        <div className="w-100 overflow-hidden position-relative">
                            <div className="p-3 p-lg-4 border-bottom user-chat-topbar">
                                <div className="row align-items-center">
                                    <div className="col-sm-4 col-8">
                                        <div className="d-flex align-items-center">
                                            <div className="d-block d-lg-none me-2 ms-0">
                                                <a href="javascript: void(0);" className="user-chat-remove text-muted font-size-16 p-2"><i className="ri-arrow-left-s-line" /></a>
                                            </div>
                                            <div className="me-3 ms-0">
                                                <img src="assets/images/users/avatar-4.jpg" className="rounded-circle avatar-xs" alt="" />
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <h5 className="font-size-16 mb-0 text-truncate"><a href="#" className="text-reset user-profile-show">Doris Brown</a></h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-8 col-4">
                                        <ul className="list-inline user-chat-nav text-end mb-0">
                                          
                                            <li className="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                                                <button type="button" className="btn nav-btn" data-bs-toggle="modal" data-bs-target="#audiocallModal">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                                                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                                    </svg>

                                                </button>
                                            </li>
                                            <li className="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                                                <button type="button" className="btn nav-btn" data-bs-toggle="modal" data-bs-target="#videocallModal">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-camera-video" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" />
                                                    </svg>

                                                </button>
                                            </li>
                                            <li className="list-inline-item">
                                                <div className="dropdown">
                                                    <button className="btn nav-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                       

                                                    </button>
                                                    <div className="dropdown-menu dropdown-menu-end">
                                                        <a className="dropdown-item d-block d-lg-none user-profile-show" href="#">View profile <i className="ri-user-2-line float-end text-muted" /></a>
                                                        <a className="dropdown-item d-block d-lg-none" href="#" data-bs-toggle="modal" data-bs-target="#audiocallModal">Audio <i className="ri-phone-line float-end text-muted" /></a>
                                                        <a className="dropdown-item d-block d-lg-none" href="#" data-bs-toggle="modal" data-bs-target="#videocallModal">Video <i className="ri-vidicon-line float-end text-muted" /></a>
                                                        <a className="dropdown-item" href="#">Muted </a>
                                                        <a className="dropdown-item" href="#">Delete </a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* end chat user head */}
                            {/* start chat conversation */}
                            <div className="chat-conversation p-3 p-lg-4" data-simplebar="init">
                                <ul className="list-unstyled mb-0">
                                    <li>
                                        <div className="conversation-list">
                                            <div className="chat-avatar">
                                                <img src="assets/images/users/avatar-4.jpg" alt="" />
                                            </div>
                                            <div className="user-chat-content">
                                                <div className="ctext-wrap">
                                                    <div className="ctext-wrap-content">
                                                        <p className="mb-0">
                                                            Good morning
                                                        </p>
                                                        <p className="chat-time mb-0"><i className="ri-time-line align-middle" /> <span className="align-middle">10:00</span></p>
                                                    </div>
                                                    <div className="dropdown align-self-start">
                                                        <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                            </svg>

                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item" href="#">Copy </a>
                                                            <a className="dropdown-item" href="#">Save </a>
                                                            <a className="dropdown-item" href="#">Forward </a>
                                                            <a className="dropdown-item" href="#">Delete </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="conversation-name">Doris Brown</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="right">
                                        <div className="conversation-list">
                                            <div className="chat-avatar">
                                                <img src="assets/images/users/avatar-1.jpg" alt="" />
                                            </div>
                                            <div className="user-chat-content">
                                                <div className="ctext-wrap">
                                                    <div className="ctext-wrap-content">
                                                        <p className="mb-0">
                                                            Good morning, How are you? What about our next meeting?
                                                        </p>
                                                        <p className="chat-time mb-0"><i className="ri-time-line align-middle" /> <span className="align-middle">10:02</span></p>
                                                    </div>
                                                    <div className="dropdown align-self-start">
                                                        <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                            </svg>

                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item" href="#">Copy </a>
                                                            <a className="dropdown-item" href="#">Save </a>
                                                            <a className="dropdown-item" href="#">Forward </a>
                                                            <a className="dropdown-item" href="#">Delete </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="conversation-name">Patricia Smith</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="chat-day-title">
                                            <span className="title">Today</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="conversation-list">
                                            <div className="chat-avatar">
                                                <img src="assets/images/users/avatar-4.jpg" alt="" />
                                            </div>
                                            <div className="user-chat-content">
                                                <div className="ctext-wrap">
                                                    <div className="ctext-wrap-content">
                                                        <p className="mb-0">
                                                            Yeah everything is fine
                                                        </p>
                                                        <p className="chat-time mb-0"><i className="ri-time-line align-middle" /> <span className="align-middle">10:05</span></p>
                                                    </div>
                                                    <div className="dropdown align-self-start">
                                                        <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                            </svg>

                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item" href="#">Copy </a>
                                                            <a className="dropdown-item" href="#">Save </a>
                                                            <a className="dropdown-item" href="#">Forward </a>
                                                            <a className="dropdown-item" href="#">Delete </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ctext-wrap">
                                                    <div className="ctext-wrap-content">
                                                        <p className="mb-0">
                                                            &amp; Next meeting tomorrow 10.00AM
                                                        </p>
                                                        <p className="chat-time mb-0"><i className="ri-time-line align-middle" /> <span className="align-middle">10:05</span></p>
                                                    </div>
                                                    <div className="dropdown align-self-start">
                                                        <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                            </svg>

                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item" href="#">Copy </a>
                                                            <a className="dropdown-item" href="#">Save </a>
                                                            <a className="dropdown-item" href="#">Forward </a>
                                                            <a className="dropdown-item" href="#">Delete </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="conversation-name">Doris Brown</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="right">
                                        <div className="conversation-list">
                                            <div className="chat-avatar">
                                                <img src="assets/images/users/avatar-1.jpg" alt="" />
                                            </div>
                                            <div className="user-chat-content">
                                                <div className="ctext-wrap">
                                                    <div className="ctext-wrap-content">
                                                        <p className="mb-0">
                                                            Wow that's great
                                                        </p>
                                                        <p className="chat-time mb-0"><i className="ri-time-line align-middle" /> <span className="align-middle">10:06</span></p>
                                                    </div>
                                                    <div className="dropdown align-self-start">
                                                        <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                            </svg>

                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item" href="#">Copy </a>
                                                            <a className="dropdown-item" href="#">Save </a>
                                                            <a className="dropdown-item" href="#">Forward </a>
                                                            <a className="dropdown-item" href="#">Delete </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="conversation-name">Patricia Smith</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="conversation-list">
                                            <div className="chat-avatar">
                                                <img src="assets/images/users/avatar-4.jpg" alt="" />
                                            </div>
                                            <div className="user-chat-content">
                                                <div className="ctext-wrap">
                                                    <div className="ctext-wrap-content">
                                                        <ul className="list-inline message-img  mb-0">
                                                            <li className="list-inline-item message-img-list me-2 ms-0">
                                                                <div>
                                                                    <a className="popup-img d-inline-block m-1" href="assets/images/small/img-1.jpg" title="Project 1">
                                                                        <img src="assets/images/small/img-1.jpg" alt="" className="rounded border" />
                                                                    </a>
                                                                </div>
                                                                <div className="message-img-link">
                                                                    <ul className="list-inline mb-0">
                                                                        <li className="list-inline-item">
                                                                            <a download="img-1.jpg" href="assets/images/small/img-1.jpg" className="fw-medium">
                                                                                <i className="ri-download-2-line" />
                                                                            </a>
                                                                        </li>
                                                                        <li className="list-inline-item dropdown">
                                                                            <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                                                </svg>

                                                                            </a>
                                                                            <div className="dropdown-menu">
                                                                                <a className="dropdown-item" href="#">Copy </a>
                                                                                <a className="dropdown-item" href="#">Save </a>
                                                                                <a className="dropdown-item" href="#">Forward </a>
                                                                                <a className="dropdown-item" href="#">Delete </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                            <li className="list-inline-item message-img-list">
                                                                <div>
                                                                    <a className="popup-img d-inline-block m-1" href="assets/images/small/img-2.jpg" title="Project 2">
                                                                        <img src="assets/images/small/img-2.jpg" alt="" className="rounded border" />
                                                                    </a>
                                                                </div>
                                                                <div className="message-img-link">
                                                                    <ul className="list-inline mb-0">
                                                                        <li className="list-inline-item">
                                                                            <a download="img-2.jpg" href="assets/images/small/img-2.jpg" className="fw-medium">
                                                                                <i className="ri-download-2-line" />
                                                                            </a>
                                                                        </li>
                                                                        <li className="list-inline-item dropdown">
                                                                            <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                                                </svg>

                                                                            </a>
                                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                                <a className="dropdown-item" href="#">Copy </a>
                                                                                <a className="dropdown-item" href="#">Save </a>
                                                                                <a className="dropdown-item" href="#">Forward </a>
                                                                                <a className="dropdown-item" href="#">Delete </a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        <p className="chat-time mb-0"><i className="ri-time-line align-middle" /> <span className="align-middle">10:09</span></p>
                                                    </div>
                                                    <div className="dropdown align-self-start">
                                                        <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                            </svg>

                                                        </a>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item" href="#">Copy </a>
                                                            <a className="dropdown-item" href="#">Save </a>
                                                            <a className="dropdown-item" href="#">Forward </a>
                                                            <a className="dropdown-item" href="#">Delete </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="conversation-name">Doris Brown</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="conversation-list">
                                            <div className="chat-avatar">
                                                <img src="assets/images/users/avatar-4.jpg" alt="" />
                                            </div>
                                            <div className="user-chat-content">
                                                <div className="ctext-wrap">
                                                    <div className="ctext-wrap-content">
                                                        <p className="mb-0">
                                                            typing
                                                            <span className="animate-typing">
                                                                <span className="dot" />
                                                                <span className="dot" />
                                                                <span className="dot" />
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="conversation-name">Doris Brown</div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {/* end chat conversation end */}
                            {/* start chat input section */}
                            <div className="chat-input-section p-3 p-lg-4 border-top mb-0">
                                <div className="row g-0">
                                    <div className="col">
                                        <input type="text" className="form-control form-control-lg bg-light border-light" placeholder="Enter Message..." />
                                    </div>
                                    <div className="col-auto">
                                        <div className="chat-input-links ms-md-2 me-md-0">
                                            <ul className="list-inline mb-0">
                                                <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Emoji">
                                                    <button type="button" className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-emoji-smile" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                                                        </svg>
                                                    </button>
                                                </li>
                                                <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Attached File">
                                                    <button type="button" className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
                                                            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                                                        </svg>
                                                    </button>
                                                </li>

                                                <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Image File">
                                                    <button type="button" className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
  <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
</svg>

                                                    </button>
                                                </li>


                                                <li className="list-inline-item">
                                                    <button type="submit" className="btn btn-primary font-size-16 btn-lg chat-send waves-effect waves-light">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-send" viewBox="0 0 16 16">
                                                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                                        </svg>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end chat input section */}
                        </div>

                        {/* end chat conversation section */}
                        {/* start User profile detail sidebar */}
                        <div className="user-profile-sidebar">
                            <div className="px-3 px-lg-4 pt-3 pt-lg-4">
                                <div className="user-chat-nav text-end">
                                    <button type="button" className="btn nav-btn" id="user-profile-hide">
                                        <i className="ri-close-line" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-center p-4 border-bottom">
                                <div className="mb-4">
                                    <img src="assets/images/users/avatar-4.jpg" className="rounded-circle avatar-lg img-thumbnail" alt="" />
                                </div>
                                <h5 className="font-size-16 mb-1 text-truncate">Doris Brown</h5>
                                <p className="text-muted text-truncate mb-1"><i className="ri-record-circle-fill font-size-10 text-success me-1 ms-0" /> Active</p>
                            </div>
                            {/* End profile user */}
                            {/* Start user-profile-desc */}
                            <div className="p-4 user-profile-desc" data-simplebar>
                                <div className="text-muted">
                                    <p className="mb-4">If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.</p>
                                </div>
                                <div className="accordion" id="myprofile">
                                    <div className="accordion-item card border mb-2">
                                        <div className="accordion-header" id="about3">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#aboutprofile" aria-expanded="true" aria-controls="aboutprofile">
                                                <h5 className="font-size-14 m-0">
                                                    <i className="ri-user-2-line me-2 ms-0 align-middle d-inline-block" /> About
                                                </h5>
                                            </button>
                                        </div>
                                        <div id="aboutprofile" className="accordion-collapse collapse show" aria-labelledby="about3" data-bs-parent="#myprofile">
                                            <div className="accordion-body">
                                                <div>
                                                    <p className="text-muted mb-1">Name</p>
                                                    <h5 className="font-size-14">Doris Brown</h5>
                                                </div>
                                                <div className="mt-4">
                                                    <p className="text-muted mb-1">Email</p>
                                                    <h5 className="font-size-14">adc@123.com</h5>
                                                </div>
                                                <div className="mt-4">
                                                    <p className="text-muted mb-1">Time</p>
                                                    <h5 className="font-size-14">11:40 AM</h5>
                                                </div>
                                                <div className="mt-4">
                                                    <p className="text-muted mb-1">Location</p>
                                                    <h5 className="font-size-14 mb-0">California, USA</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item card border">
                                        <div className="accordion-header" id="attachfile3">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#attachprofile" aria-expanded="false" aria-controls="attachprofile">
                                                <h5 className="font-size-14 m-0">
                                                    <i className="ri-attachment-line me-2 ms-0 align-middle d-inline-block" /> Attached Files
                                                </h5>
                                            </button>
                                        </div>
                                        <div id="attachprofile" className="accordion-collapse collapse" aria-labelledby="attachfile3" data-bs-parent="#myprofile">
                                            <div className="accordion-body">
                                                <div className="card p-2 border mb-2">
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-sm me-3 ms-0">
                                                            <div className="avatar-title bg-soft-primary text-primary rounded font-size-20">
                                                                <i className="ri-file-text-fill" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <div className="text-start">
                                                                <h5 className="font-size-14 mb-1">admin_v1.0.zip</h5>
                                                                <p className="text-muted font-size-13 mb-0">12.5 MB</p>
                                                            </div>
                                                        </div>
                                                        <div className="ms-4 me-0">
                                                            <ul className="list-inline mb-0 font-size-18">
                                                                <li className="list-inline-item">
                                                                    <a href="#" className="text-muted px-1">
                                                                        <i className="ri-download-2-line" />
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item dropdown">
                                                                    <a className="dropdown-toggle text-muted px-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                                        </svg>

                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                        <a className="dropdown-item" href="#">Action</a>
                                                                        <a className="dropdown-item" href="#">Another action</a>
                                                                        <div className="dropdown-divider" />
                                                                        <a className="dropdown-item" href="#">Delete</a>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card p-2 border mb-2">
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-sm me-3 ms-0">
                                                            <div className="avatar-title bg-soft-primary text-primary rounded font-size-20">
                                                                <i className="ri-image-fill" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <div className="text-start">
                                                                <h5 className="font-size-14 mb-1">Image-1.jpg</h5>
                                                                <p className="text-muted font-size-13 mb-0">4.2 MB</p>
                                                            </div>
                                                        </div>
                                                        <div className="ms-4 me-0">
                                                            <ul className="list-inline mb-0 font-size-18">
                                                                <li className="list-inline-item">
                                                                    <a href="#" className="text-muted px-1">
                                                                        <i className="ri-download-2-line" />
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item dropdown">
                                                                    <a className="dropdown-toggle text-muted px-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                                        </svg>

                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                        <a className="dropdown-item" href="#">Action</a>
                                                                        <a className="dropdown-item" href="#">Another action</a>
                                                                        <div className="dropdown-divider" />
                                                                        <a className="dropdown-item" href="#">Delete</a>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card p-2 border mb-2">
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-sm me-3 ms-0">
                                                            <div className="avatar-title bg-soft-primary text-primary rounded font-size-20">
                                                                <i className="ri-image-fill" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <div className="text-start">
                                                                <h5 className="font-size-14 mb-1">Image-2.jpg</h5>
                                                                <p className="text-muted font-size-13 mb-0">3.1 MB</p>
                                                            </div>
                                                        </div>
                                                        <div className="ms-4 me-0">
                                                            <ul className="list-inline mb-0 font-size-18">
                                                                <li className="list-inline-item">
                                                                    <a href="#" className="text-muted px-1">
                                                                        <i className="ri-download-2-line" />
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item dropdown">
                                                                    <a className="dropdown-toggle text-muted px-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                                        </svg>

                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                        <a className="dropdown-item" href="#">Action</a>
                                                                        <a className="dropdown-item" href="#">Another action</a>
                                                                        <div className="dropdown-divider" />
                                                                        <a className="dropdown-item" href="#">Delete</a>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card p-2 border mb-2">
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-sm me-3 ms-0">
                                                            <div className="avatar-title bg-soft-primary text-primary rounded font-size-20">
                                                                <i className="ri-file-text-fill" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <div className="text-start">
                                                                <h5 className="font-size-14 mb-1">Landing-A.zip</h5>
                                                                <p className="text-muted font-size-13 mb-0">6.7 MB</p>
                                                            </div>
                                                        </div>
                                                        <div className="ms-4 me-0">
                                                            <ul className="list-inline mb-0 font-size-18">
                                                                <li className="list-inline-item">
                                                                    <a href="#" className="text-muted px-1">
                                                                        <i className="ri-download-2-line" />
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item dropdown">
                                                                    <a className="dropdown-toggle text-muted px-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                                        </svg>

                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                        <a className="dropdown-item" href="#">Action</a>
                                                                        <a className="dropdown-item" href="#">Another action</a>
                                                                        <div className="dropdown-divider" />
                                                                        <a className="dropdown-item" href="#">Delete</a>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* end profile-user-accordion */}
                                </div>
                                {/* end user-profile-desc */}
                            </div>
                            {/* end User profile detail sidebar */}
                        </div>
                    </div>
                    {/* End User chat */}
                    {/* audiocall Modal */}
                    <div className="modal fade" id="audiocallModal" tabIndex={-1} aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="text-center p-4">
                                        <div className="avatar-lg mx-auto mb-4">
                                            <img src="assets/images/users/avatar-4.jpg" alt="" className="img-thumbnail rounded-circle" />
                                        </div>
                                        <h5 className="text-truncate">Doris Brown</h5>
                                        <p className="text-muted">Start Audio Call</p>
                                        <div className="mt-5">
                                            <ul className="list-inline mb-1">
                                                <li className="list-inline-item px-2 me-2 ms-0">
                                                    <button type="button" className="btn btn-danger avatar-sm rounded-circle" data-bs-dismiss="modal">
                                                        <span className="avatar-title bg-transparent font-size-20">
                                                            <i className="ri-close-fill" />
                                                        </span>
                                                    </button>
                                                </li>
                                                <li className="list-inline-item px-2">
                                                    <button type="button" className="btn btn-success avatar-sm rounded-circle">
                                                        <span className="avatar-title bg-transparent font-size-20">
                                                            <i className="ri-phone-fill" />
                                                        </span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* audiocall Modal */}
                    {/* videocall Modal */}
                    <div className="modal fade" id="videocallModal" tabIndex={-1} aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="text-center p-4">
                                        <div className="avatar-lg mx-auto mb-4">
                                            <img src="assets/images/users/avatar-4.jpg" alt="" className="img-thumbnail rounded-circle" />
                                        </div>
                                        <h5 className="text-truncate">Doris Brown</h5>
                                        <p className="text-muted mb-0">Start Video Call</p>
                                        <div className="mt-5">
                                            <ul className="list-inline mb-1">
                                                <li className="list-inline-item px-2 me-2 ms-0">
                                                    <button type="button" className="btn btn-danger avatar-sm rounded-circle" data-bs-dismiss="modal">
                                                        <span className="avatar-title bg-transparent font-size-20">
                                                            <i className="ri-close-fill" />
                                                        </span>
                                                    </button>
                                                </li>
                                                <li className="list-inline-item px-2">
                                                    <button type="button" className="btn btn-success avatar-sm rounded-circle">
                                                        <span className="avatar-title bg-transparent font-size-20">
                                                            <i className="ri-vidicon-fill" />
                                                        </span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end modal */}
                </div>

            </div>
        );
    }
}

export default Tabright;