import React, { useState } from 'react'
import { useEffect } from 'react'
import './Home.css'
import './Report.css'

const Report = () => {

    const [report, setReport] = useState(null);
    const [storeId, setStoreID] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const week_day = {
        0 : "Monday",
        1 : "Tuesday",
        2 : "Wednesday",
        3 : "Thrusday",
        4 : "Friday",
        5 : "Saturday",
        6 : "Sunday"
    }
    
    useEffect(() => {
        if(storeId == 0) {
            return;
        }
        setLoading(true);
        fetch(`/trigger_report/${storeId}`).then((response) => {
            return response.json()
        }).then((response) => {
            setReport(response)
            console.log(response);
            setLoading(false);
        }).catch(err => console.log(err), setLoading(false))
    }, [storeId])

  return (
    <div className='report'>
        <h1>Report</h1>
        <div className='ag-format-heading'>
            <form action="" onSubmit={(e) => {
                e.preventDefault();
                setStoreID(inputValue);
            }}>
                <input placeholder='Store ID' className='ag-course-dropdown' value={inputValue} onChange={(e) => {setInputValue(e.target.value)}} id="" />
            </form>
        </div>
        <table>
            <tr>
                <th>Day</th>
                <th>Uptime in sec</th>
                <th>Downtime in sec</th>
            </tr>
            {
                report && 
                report.map((item, key) => {
                    return <tr key={key}>
                        <td>{week_day[key]}</td>
                        <td>{item[0]}</td>
                        <td>{item[1]}</td>
                    </tr>
                })
            }
            {
                loading && 
                <tr><td>Loading...</td><td>Loading...</td><td>Loading...</td></tr>
            }
        </table>
    </div>
  )
}

export default Report