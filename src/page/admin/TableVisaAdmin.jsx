import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MetarialTable from 'material-table'
import axios from 'axios'
import { API } from './../../config';
import { isAuthenticated } from '../auth/apiAuth'
import FormDialog from './../user/ModalVisaEdit'
import { Redirect, useHistory } from 'react-router-dom'
import Moment from 'moment'
import Icon from '@material-ui/core/Icon';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import FlightIcon from '@material-ui/icons/Flight';
import { Link } from '@material-ui/core';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

const TableVisa = props => {

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
    const history = useHistory();
    const [idEdit, setidEdit] =  useState()
    const [openPopup, setOpenPopup] = useState(false)
    const [valueEdit , setValueEdit] = useState({
        date: "",
        costVisa: "",
        costPermit: "",
        description: ""
    })

    const openInPopup = (idr) => {
        console.log(idr)
        axios.post(`${API}/fetchVisaUserByIdforUpdate`, {
            idRemindVisa: idr,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data.results[0])
            setValueEdit({
                ...valueEdit, date: Moment(response.data.results[0].date).format('YYYY-MM-DD'),
                description: response.data.results[0].description,
                costVisa: response.data.results[0].costVisa,
                costPermit: response.data.results[0].costPermit,
            })
            setidEdit(idr)
            setOpenPopup(true)
        })
        
    }

    const classes = useStyles();

    const column = [
        { title: 'row', field: 'row' },
        { title: 'name', field: 'name'},
        { title: 'note', field: 'description' },
        { title: 'visa charge', field: 'costVisa' },
        { title: 'workpermit charge', field: 'costPermit' },
        { title: 'date', field: 'date' },
        { title: '1 m ahead', field: 'noti1' },
        { title: '2 m ahead', field: 'noti2' },
        { title: '3 m ahead', field: 'noti3' },
        // { title: 'Image Url', field: 'imageUrl' },
        { title: 'TimeStamp', field: 'TimeStamp' },
    ]
    const actions = [
        {
            icon: () => <AssignmentIndIcon/>,
            tooltip: 'work permit',
            onClick: (event, rowData) => imageDownload2(rowData.imageUrl2)//alert("You saved " + rowData.client)
          },
        {
            icon: () => <FlightIcon/>,
            tooltip: 'visa',
            onClick: (event, rowData) => imageDownload(rowData.imageUrl1)//alert("You saved " + rowData.client)
          },
        {
          icon: 'edit',
          tooltip: 'Edit',
          onClick: (event, rowData) => openInPopup(rowData.idRemindVisa)//alert("You saved " + rowData.client)
        },
        rowData => ( {
            icon: 'delete',
            tooltip: 'Delete',
            onClick: (event, rowData) => deleteIndex(rowData.idRemindVisa, user.idusers)//window.confirm("You want to delete " + rowData.idworks),
        })
    ]

    const imageDownload = (img1) => {
        console.log(img1)
        window.location.assign(img1);
    }

    const imageDownload2 = (img1) => {
        console.log(img1)
        window.location.assign(img1);
    }

    // const idown2 = (img) => {
    //     window.location.assign(img);
    // }

    const deleteIndex = (id, user) => {
        // console.log(id)
        // console.log(user)
        // window.confirm("You want to delete " + id)
        axios.post(`${API}/deleteRemind`, {
            idReminder: id,
            idUserRemind: user
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            window.location.reload(true);
        })
    }

    const fetchWorks = () => {
        axios.post(`${API}/fetchVisaAdmin`, {
            idUserVisa: user.idusers,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data.Allresult)
            setValues(response.data.Allresult)
            var fetchData = []
            for (var i = 0; i < response.data.Allresult.length; i++) {
                fetchData.push({
                    idRemindVisa: response.data.Allresult[i].user.idRemindVisa,
                    row: i + 1,
                    img: response.data.Allresult[i].user.img,
                    name: response.data.Allresult[i].user.name,
                    costVisa: response.data.Allresult[i].user.costVisa,
                    costPermit: response.data.Allresult[i].user.costPermit,
                    date: response.data.Allresult[i].user.date,
                    noti1: response.data.Allresult[i].user.noti1,
                    noti2: response.data.Allresult[i].user.noti2,
                    noti3: response.data.Allresult[i].user.noti3,
                    imageUrl1: response.data.Allresult[i].imageUrl1,
                    imageUrl2: response.data.Allresult[i].imageUrl2,
                    description: response.data.Allresult[i].user.description,
                    TimeStamp: response.data.Allresult[i].user.TimeStamp
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
                title="Visa and Workpermit"
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
                dataEdit={idEdit}
                dateEdit={valueEdit.date}
                descriptionEdit={valueEdit.description}
                costVisaEdit={valueEdit.costVisa}
                costPermitEdit={valueEdit.costPermit}
            />
        </div>
    )
}

export default TableVisa;
