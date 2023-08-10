import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {

    /*
       Sir,  API fetch is getting CORS Error so stored the api data in mockData varibale 
    */

    const [data, setData] = useState(mockData.clients);
    const [selectedOption, setSelectedOption] = useState('All-Clients');
    const [isOpen, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const [selectedClient, setSelectedClient] = useState();

    const handleOpen = (Client) => {
        setOpen(true);
        setSelectedId(Client.id);
        setSelectedClient(Client);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleDropDownChange = (event) => {
        setSelectedOption(event.target.value);
    }

    useEffect(() => {
        if (selectedOption === "All-Clients") {
            setData(mockData.clients)
        } else if (selectedOption === "Managers") {
            const clients = mockData.clients.filter((client) => {
                if (client.isManager === true) {
                    return client;
                }
            });
            setData(clients);
        } else if (selectedOption === "Non-Managers") {
            const clients = mockData.clients.filter((client) => {
                if (client.isManager === false) {
                    return client;
                }
            });
            setData(clients);
        }
    }, [selectedOption]);



    return (
        <div class="ag-format-container">

            <div className='ag-format-heading'>
                <h1 className='ag-course-heading'>Client Infomation Page</h1>
                <select className='ag-course-dropdown' value={selectedOption} onChange={handleDropDownChange} id="">
                    <option value="All-Clients">All-Clients</option>
                    <option value="Managers">Managers-Only</option>
                    <option value="Non-Managers">Non-Managers</option>
                </select>
            </div>

            <div className="ag-courses_box">
                {
                    data.map((client) => {
                        return <div onClick={() => {handleOpen(client)}} className="ag-courses_item">
                            <a href="#" className="ag-courses-item_link">
                                <div className="ag-courses-item_bg"></div>

                                <div className="ag-courses-item_title">
                                    {client.id} <br />
                                    {client.label}
                                </div>

                                <div className="ag-courses-item_date-box">
                                    <span className="ag-courses-item_date">
                                        {mockData.data[client.id.toString()] ? mockData.data[client.id.toString()].name + " , " : ""}
                                        {mockData.data[client.id.toString()] ? "Points : " + mockData.data[client.id.toString()].points : ""}
                                    </span>
                                </div>
                            </a>
                        </div>
                    })
                }
            </div>

            {
                isOpen && (
                    <>
                        <div className="overlay" onClick={handleClose}>
                            <div class="card">
                                <div class="card-img">
                                    <img src="https://dl.dropbox.com/s/u3j25jx9tkaruap/Webp.net-resizeimage.jpg?raw=1" />
                                </div>
                                <div class="desc">
                                    <h6 class="primary-text">{selectedClient.label}</h6>
                                    <h6 class="primary-text">{selectedClient.isManager ? "Manager, " : ""} {mockData.data[selectedId.toString()] ? mockData.data[selectedId.toString()].name : ""}</h6>
                                    <h6 class="secondary-text"> {mockData.data[selectedId.toString()] ? mockData.data[selectedId.toString()].address : ""} </h6>
                                </div>
                                <div class="details">
                                    <div class="rating">
                                        <h6 class="primary-text"> {mockData.data[selectedId.toString()] ? mockData.data[selectedId.toString()].points : "00"}  </h6>
                                        <h6 class="secondary-text"> Points </h6>
                                    </div>
                                    <div class="activity">
                                        <h6 class="primary-text"> {selectedId} </h6>
                                        <h6 class="secondary-text"> Identity </h6>
                                    </div>
                                    <div class="address">
                                        <h6 class="primary-text"> {mockData.data[selectedId.toString()] ? mockData.data[selectedId.toString()].address : ""} </h6>
                                        <h6 class="secondary-text"> Address </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

const mockData = {
    "clients": [
        {
            "isManager": true,
            "id": 1,
            "label": "Client1"
        },
        {
            "isManager": false,
            "id": 2,
            "label": "Client2"
        },
        {
            "isManager": false,
            "id": 3,
            "label": "Client3"
        },
        {
            "isManager": false,
            "id": 4,
            "label": "Client3"
        },
        {
            "isManager": false,
            "id": 5,
            "label": "Client5"
        }
    ],
    "data": {
        "1": {
            "address": "Chicago, USA",
            "name": "Jhon",
            "points": 123
        },
        "2": {
            "address": "London, UK",
            "name": "Dan",
            "points": 123
        },
        "3": {
            "address": "Berlin, Germany",
            "name": "Ben",
            "points": 123
        }
    },
    "label": "All Clients"
}

export default Home;