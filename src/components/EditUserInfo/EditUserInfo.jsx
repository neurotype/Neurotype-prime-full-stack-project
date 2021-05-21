import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {BsFillPersonPlusFill} from 'react-icons/bs'
import './editUserInfo.css'



function EditUserInfo(props) {
    const dispatch = useDispatch();
    const userRole = useSelector((store) => store.user.role)
    const users = useSelector((store) => store.users)

    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [role, setRole] = useState('');
    let [group_id, setGroupID] = useState('');
    useEffect(() => {
        dispatch({type: 'SET_PAGE', payload: "EDITUSER"})
        for(let i=0; i<users.length; i++){
            if(users[i].id === Number.parseInt(props.match.params.id)){
                setName(users[i].name)
                setEmail(users[i].email)
                setGroupID(users[i].group_id)
                setRole(users[i].role)
            }
        }
    }, [])

    const user = {
        name: name,
        email: email,
        // password: password,
        role: role,
        group_id: Number.parseInt(group_id),
        id: Number.parseInt(props.match.params.id)
    }
    
    const history = useHistory()
    const editUser = () => {
        console.log(user)
        dispatch({type: 'UPDATE_RESEARCHER', payload: user})
        history.push('/edit')
    }

    console.log(user)
    

    const BootstrapButton = withStyles({
        root: {
            boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2);',
            textTransform: 'none',
            textDecoration: 'none',
            fontSize: 16,
            padding: '6px 12px',
            border: '1px solid',
            lineHeight: 1.5,
            backgroundColor: 'rgb(32, 115, 136)',
            borderColor: 'rgb(32, 115, 136)',
            color: 'white',
            fontFamily: [
                '-apple-system',
                  'BlinkMacSystemFont',
                  '"Segoe UI"',
                  'Roboto',
                  '"Helvetica Neue"',
                  'Arial',
                  'sans-serif',
                  '"Apple Color Emoji"',
                  '"Segoe UI Emoji"',
                  '"Segoe UI Symbol"',
              ].join(','),
              '&:hover': {
                  backgroundColor: 'rgb(39, 136, 160)',
                  borderColor: '#0062cc',
                  boxShadow: 'none',
              },
              '&:active': {
                  boxShadow: 'none',
                  backgroundColor: '#0062cc',
                  borderColor: '#005cbf',
              },
              '&:focus': {
                  boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
              },
          },
      })(Button);
    
    console.log(props.match.params.id)
    const BarStyling = { width: "20rem", height: 25, background: "#F2F1F9", border: "none", padding: "0.5rem" };
    const SelectStyling = { width: "21rem", height: 40, border: "none", textAlign: "left" };
    if(userRole === 'Super Admin') {
    return (
        <>
            <h2 className='createNewPart'>Edit User</h2>

            <div className="addPartDiv">
            <form>
                <input className='addPart' placeholder="Name" value={name} style={BarStyling} onChange={(event) => setName(event.target.value)}></input>
                {/* <input className='addPart' placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}></input> */}
                <input className='addPart' placeholder="Email" value={email} style={BarStyling} onChange={(event) => setEmail(event.target.value)}></input>
                <input className='addPart' placeholder="Group" value={group_id} style={BarStyling} onChange={(event) => setGroupID(event.target.value)}></input>
                <select className='addPartSelect' placeholder="Role" value={role} style={SelectStyling} onChange={(event) => setRole(event.target.value)}>
                    <option value='Researcher'>Researcher</option>
                    <option value='Site Admin'>Site Admin</option>
                    <option value='Super Admin'>Super Admin</option>
                </select>
                <br></br>
            <Link >
                    <BootstrapButton className="editButton" onClick={() => editUser()}><BsFillPersonPlusFill></BsFillPersonPlusFill>Submit</BootstrapButton>
            </Link>
            </form>
            </div>

        </>
    )
    } else if (userRole === 'Site Admin' ) {
        return (
            <>
                <h2 className='createNewPart'>Edit User</h2>
                <div className="addPartDiv">
                    <input className='addPart' placeholder="Name" value={name} style={BarStyling} onChange={(event) => setName(event.target.value)}></input>
                    {/* <input className='addPart' placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}></input> */}
                    <input className='addPart' placeholder="Email" value={email} style={BarStyling} onChange={(event) => setEmail(event.target.value)}></input>
                    <input className='addPart' placeholder="Group" value={group_id} style={BarStyling} onChange={(event) => setGroupID(event.target.value)}></input>
                    <select className='addPartSelect' placeholder="Role" value={role} style={SelectStyling} onChange={(event) => setRole(event.target.value)}>
                        <option value='Researcher'>Researcher</option>
                        <option value='Site Admin'>Site Admin</option>
                    </select>

                <Link >
                        <BootstrapButton className="editButton" onClick={() => editUser()}><BsFillPersonPlusFill></BsFillPersonPlusFill></BootstrapButton>
                </Link>
                </div>
    
            </>
        )
    } else {
        return ("ADMIN Access required")
    }
    
}

export default connect(mapStoreToProps)(EditUserInfo);