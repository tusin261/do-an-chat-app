import React, { Component } from 'react';

class ProfileTab extends Component {
  render() {
    return (
      <div class='row '>
        <div>
        <div className="text-center p-4 border-bottom bg-white " >
          <div className="mb-4">
            <img src="assets/images/users/avatar-4.jpg" className="rounded-circle avatar-lg img-thumbnail" alt="" />
          </div>
          <h5 className="font-size-16 mb-1 text-truncate">Doris Brown</h5>
          <p className="text-muted text-truncate mb-1"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="lightgreen" class="bi bi-record-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg> Active</p>
        </div>
        <div className="p-4 user-profile-desc bg-white" data-simplebar>
          <div className="text-muted">
            <p className="mb-4">If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.</p>
          </div>
          <div className="accordion" id="myprofile">
            <div className="accordion-item card border mb-2">
              <div className="accordion-header" id="about3">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#aboutprofile" aria-expanded="true" aria-controls="aboutprofile">
                  <h5 className="font-size-14 m-0">
                    About
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
                    Attached Files
                  </h5>
                </button>
              </div>
              <div id="attachprofile" className="accordion-collapse collapse" aria-labelledby="attachfile3" data-bs-parent="#myprofile">
                <div className="accordion-body" data-spy="scroll" data-target="#list-example" data-offset={0}>

                  <div className="card p-2 border mb-2">
                    <div className="d-flex align-items-center">
                      <div className="avatar-sm me-3 ms-0">
                        <div className="avatar-title bg-soft-primary text-primary rounded font-size-20">
                          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                          </svg>

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

                            </a>
                          </li>
                          <li className="list-inline-item dropdown">
                            <a className="dropdown-toggle text-muted px-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                            </a>

                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card p-2 border mb-2">
                    <div className="d-flex align-items-center">
                      <div className="avatar-sm me-3 ms-0">
                        <div className="avatar-title bg-soft-primary text-primary rounded font-size-20">
                          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                          </svg>

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

                            </a>
                          </li>
                          <li className="list-inline-item dropdown">
                            <a className="dropdown-toggle text-muted px-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                            </a>

                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card p-2 border mb-2">
                    <div className="d-flex align-items-center">
                      <div className="avatar-sm me-3 ms-0">
                        <div className="avatar-title bg-soft-primary text-primary rounded font-size-20">
                          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                          </svg>

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

                            </a>
                          </li>
                          <li className="list-inline-item dropdown">
                            <a className="dropdown-toggle text-muted px-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                            </a>

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
        </div>
      </div>
    );
  }
}

export default ProfileTab;