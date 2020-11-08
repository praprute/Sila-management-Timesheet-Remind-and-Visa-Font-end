import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MetarialTable from 'material-table'
import axios from 'axios'
import { API } from './../../config';
import { isAuthenticated } from '../auth/apiAuth'
import FormDialog from './ModalTimeSheet'
import { Redirect, useHistory } from 'react-router-dom'

const TableUser = props => {

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
    const [openPopup, setOpenPopup] = useState(false)
    const history = useHistory();
    const openInPopup = () => {
        setOpenPopup(true)
    }

    const classes = useStyles();

    const column = [
        { title: 'row', field: 'row' },
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
    const actions = [
        // {
        //   icon: 'edit',
        //   tooltip: 'Edit',
        //   onClick: (event, rowData) => editModal(rowData)//alert("You saved " + rowData.client)
        // },
        rowData => ({
            icon: 'delete',
            tooltip: 'Delete',
            onClick: (event, rowData) => deleteIndex(rowData.idworks)//window.confirm("You want to delete " + rowData.idworks),
        })
    ]

    const deleteIndex = (id) => {
        axios.post(`${API}/DeleteIndex`, {
            idworks: id
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            history.push("/") 
        })
    }

    const [dataEdit, setDataEdit] = useState({
        idworks: '',
        location: '',
        TravelTime: '',
        EndTravelTime: '',
        StartTime: '',
        FinishTime: '',
        client: '',
        clientCode: '',
        cost: '',
        expenses: '',
        status: '',
        description: '',
        partner: ''
    });
    // const {idworks, location,} = dataEdit
    // const editModal = (rowData) => {
    //     console.log(rowData)
    //     var index = {
    //         idworks: rowData.idworks,
    //         client: rowData.client
    //     }
    //     // console.log(index)
    //     setDataEdit(index)
    //     // console.log(dataEdit)
    //     openInPopup()
    // } 

    const fetchWorks = () => {
        axios.post(`${API}/fetchworkAuth`, {
            idUser: user.idusers,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setValues(response.data.message)
            var fetchData = []
            for (var i = 0; i < response.data.message.length; i++) {
                fetchData.push({
                    idworks: response.data.message[i].idworks,
                    row: i + 1,
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

            <MetarialTable
                title="time sheet"
                style={{ padding: '1rem' }}
                data={data}
                columns={column}
                actions={actions}
                options={{
                    // headerStyle: {
                    //   backgroundColor: 'rgb(27,36,48)',
                    //   color: '#FFF'
                    // },
                    actionsColumnIndex: -1
                  }}
            />
            <FormDialog openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            // dataEdit={dataEdit}
            />
        </div>
    )
}

export default TableUser;
