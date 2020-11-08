import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MetarialTable from 'material-table'
import axios from 'axios'
import { API } from './../../config';
import { isAuthenticated } from '../auth/apiAuth'
import FormDialog from './ModalRemindEdit'
import { Redirect, useHistory } from 'react-router-dom'
import Moment from 'moment'

const TableRemind = props => {

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
        date:"",
        description:""
    })

    const openInPopup = (idr) => {
        // console.log(idr)
        axios.post(`${API}/fetchRemindUserByIdforUpdate`, {
            idReminder: idr,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            
            setValueEdit({...valueEdit, date:Moment(response.data.results[0].date).format('YYYY-MM-DD'), description:response.data.results[0].description})
            setidEdit(idr)
            setOpenPopup(true)
        })
        
    }

    const classes = useStyles();

    const column = [
        { title: 'row', field: 'row' },
        { title: 'note', field: 'description' },
        { title: 'date', field: 'date' },
        { title: '1 months ahead', field: 'noti1' },
        { title: '2 months ahead', field: 'noti2' },
        { title: '3 months ahead', field: 'noti3' },
        { title: 'TimeStamp', field: 'TimeStamp' },
        // { title: 'imageUrl', field: 'imageUrl'}
    ]
    const actions = [
        {
          icon: 'edit',
          tooltip: 'Edit',
          onClick: (event, rowData) => openInPopup(rowData.idReminder)//alert("You saved " + rowData.client)
        },
        rowData => ( {
            icon: 'delete',
            tooltip: 'Delete',
            onClick: (event, rowData) => deleteIndex(rowData.idReminder, user.idusers)//window.confirm("You want to delete " + rowData.idworks),
        })
    ]

    const deleteIndex = (id, user) => {
       
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
        axios.post(`${API}/fetchRemindUser`, {
            idUserRemind: user.idusers,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            // console.log(response.data.Allresult)
            setValues(response.data.Allresult)
            var fetchData = []
            for (var i = 0; i < response.data.Allresult.length; i++) {
                fetchData.push({
                    idReminder: response.data.Allresult[i].user.idReminder,
                    row: i + 1,
                    img:response.data.Allresult[i].user.img,
                    date:response.data.Allresult[i].user.date,
                    noti1:response.data.Allresult[i].user.noti1,
                    noti2:response.data.Allresult[i].user.noti2,
                    noti3:response.data.Allresult[i].user.noti3,
                    imageUrl:response.data.Allresult[i].imageUrl,
                    description: response.data.Allresult[i].user.description,
                    TimeStamp:response.data.Allresult[i].user.TimeStamp
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
                title="Remind"
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
                // valueE={valueEdit}
            />
        </div>
    )
}

export default TableRemind;
