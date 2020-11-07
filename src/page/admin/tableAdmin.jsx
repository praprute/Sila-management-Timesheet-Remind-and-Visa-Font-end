import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MetarialTable from 'material-table'
import axios from 'axios'
import { API } from  './../../config'
import { isAuthenticated } from '../auth/apiAuth' 

const TableAdmin = props => {

    const useStyles = makeStyles((theme) => ({
        cart: {
            marginLeft: 10,
            marginRight: 10,
            marginTop: 20,
            marginBottom: 10,
        }
    })
    )

    const [values, setValues] = useState()
    const [data, setData] = useState([])
    const user = isAuthenticated() && isAuthenticated().user;
    const token = isAuthenticated() && isAuthenticated().token;

    const classes = useStyles();

    const column = [
        { title: 'row', field: 'idworks' },
        { title: 'สถานที่', field: 'location' },
        { title: 'เวลาเดินทาง', field: 'TravelTime' },
        { title: 'เวลาถึง', field: 'EndTravelTime' },
        { title: 'เริ่มงาน', field: 'StartTime' },
        { title: 'งานเสร็จสิ้น', field: 'FinishTime' },
        { title: 'ชื่อลูกความ', field: 'client' },
        { title: 'รหัสลูกความ', field: 'clientCode' },
        { title: 'ค่าเดินทาง', field: 'cost' },
        { title: 'ค่าใช้จ่าย', field: 'expenses' },
        { title: 'สถานะ', field: 'status' },
        { title: 'descriptions', field: 'description' },
        { title: 'Partner', field: 'partner' }
    ]

    const fetchWorks = () => {
        axios.post(`${API}/fetchworkAdmin`, {
            nameadmin: user.name
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            // console.log(response)
            setValues(response.data.message)
            var fetchData = []
            for (var i = 0; i < response.data.message.length; i++) {
                fetchData.push({
                    idworks: i+1,
                    location: response.data.message[i].location,
                    TravelTime: response.data.message[i].TravelTime,
                    EndTravelTime: response.data.message[i].EndTravelTime,
                    StartTime: response.data.message[i].StartTime,
                    FinishTime: response.data.message[i].FinishTime,
                    client: response.data.message[i].client,
                    clientCode: response.data.message[i].clientCode,
                    cost: response.data.message[i].cost,
                    expenses: response.data.message[i].expenses,
                    status: response.data.message[i].status,
                    description: response.data.message[i].description,
                    partner: response.data.message[i].partner
                })
            }
            setData(fetchData);
        })
    }
    useEffect(() => {
        fetchWorks()
    }, []);
    return (
        <div
            className={classes.cart}
        >
            {/* {JSON.stringify(user.name)} */}
            <MetarialTable
            table-layout='fixed'
            title="time sheet"
                style={{ padding: '1rem' }}
                data={data}
                columns={column}
            />
        </div>
    )
}

export default TableAdmin;