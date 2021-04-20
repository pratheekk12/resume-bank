import React,{useState,useEffect} from 'react'
import {CardContent, Grid,Card,CardHeader} from '@material-ui/core'
import Header from '../Header'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Modal } from 'react-bootstrap'
import { Link ,useHistory,Redirect} from 'react-router-dom'

toast.configure()

const Dashboard =(props)=>{
    const [profiles,setProfiles] = useState([])
    const [candidate,setCandidate] = useState("")
    const [show,setShow] =useState(false)
    const [link,setLink] = useState()
    
    const history = useHistory()

    var url = "http://192.168.3.45:3056/resumes/"
    //get all profiles
    const getProfiles =()=>{
        axios.get('http://192.168.3.45:3056/api/profiles')
            .then((response)=>{
                let i =0;
                response.data.map((ele)=>{
                    i=i+1;
                    return ele.slNo = i

                })
                console.log(response)
                setProfiles(response.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    //get single candidate profile for details
    const handleDetails=(id) =>{
        axios.get(`http://192.168.3.45:3056/api/profiles/${id}`)
        .then((response)=>{
            setCandidate(response.data)
            setShow(true)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    //handle shortlist and handle reject
    const handleshortlisted=(id)=>{
        const result = profiles.filter((ele)=>{
            return ele._id === id
        })
        result[0].prrofileStatus = 'shortlisted'
        result[0].updated_At = new Date()

        axios.put(`http://192.168.3.45:3056/api/profiles/${id}`,result[0])
            .then((response)=>{
                getProfiles()
                toast.success("Shortlisted",{position: toast.POSITION.TOP_CENTER, autoClose : 2000 })
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    const handlerejected = (id) =>{
        const result = profiles.filter((ele)=>{
            return ele._id === id
        })
        result[0].prrofileStatus = 'rejected'
        result[0].updated_At = new Date()
        axios.put(`http://192.168.3.45:3056/api/profiles/${id}`,result[0])
            .then((response)=>{
                getProfiles()
                toast.error("Rejected",{position: toast.POSITION.TOP_CENTER,autoClose : 2000})
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    const handleClose=()=>{
        setLink()
        setShow(false)
    }

    useEffect(()=>{
        getProfiles()
    },[])

    

    // const showresume=(id)=>{
    //     axios.get(`http://localhost:3056/api/profiles_resumes/${id}`)
    //     .then((response)=>{
    //         // setCandidate(response.data)
    //         // setShow(true)
    //         // console.log(response.data)
    //         // url = response.data
    //         // console.log(url,"url")
    //         console.log(response.data)
    //         var i = "http://localhost:3056"+response.data
    //         setLink(i)
           
    //         //history.push(response.data)
           
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     })
        
    // }

    return(<div>
       
        <Grid container spacing={3} direction="row">
        <Grid item xs={12} sm={12}>
        <Header />
        </Grid>
       
        <Grid item xs={5} sm={5}></Grid>
        <Grid item xs={2} sm={2}>
            <Card>
            <CardHeader
                title={
                  ` Total Profiles`
                }
              />
                <CardContent>
                    {profiles.length}
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={5} sm={5}></Grid>
        <Grid item xs={12} sm={12}>
        <table class ="table">
                <tr>
                    <th>Sl.No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                    <th>Applied Date</th>
                    <th>View Details</th>
                    <th>Update Application Status</th>
                   
                </tr>
                <tbody>
                    {
                        profiles.map((profile)=>{
                            return (<tr>
                                <td>{profile.slNo}</td>
                                <td>{profile.firstName}</td>
                                <td>{profile.lastName}</td>
                                <td>{profile.role}</td>
                                <td>{profile.created_At.slice(0,10)}</td>
                                <td><button type="button" class="btn btn-primary" key={profile._id} onClick={()=>{
                                        handleDetails(profile._id)
                                }}>View Details</button></td>
                                {
                                        profile.prrofileStatus === "Applied" && (<td><button type="button" class="btn btn-success" onClick={()=>{
                                            handleshortlisted(profile._id)
                                        }}>Shortlist</button>&nbsp;<button type="button" class="btn btn-danger" onClick={()=>{
                                            handlerejected(profile._id)
                                        }}>Reject</button></td>)
                                    }
                                {
                                            profile.prrofileStatus === "rejected" && (<td><button type="button" class="btn btn-danger" disabled="true">rejected</button></td>)
                                    }
                                    {
                                            profile.prrofileStatus === "shortlisted" && (<td><button type="button" class="btn btn-primary" disabled="true">shortlisted</button></td>)
                                    }   

                            </tr>)
                        })
                    }
                </tbody>
                </table>
        </Grid>
        </Grid>
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{candidate.firstName} {candidate.lastName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>First Name : {candidate.firstName}</p>
                    <p> Last Name: {candidate.lastName}</p>
                    <p> Role : {candidate.role}</p>
                    <p>Email : {candidate.email}</p>
                    <p>DOB :{candidate.Dob}</p>
                    <p>Mobile Number : {candidate.mobile}</p>
                    <p>Alternate Number : {candidate.alternatemob}</p>
                    <p> Experience: {candidate.experience}</p>
                    <p>Applied Date : {candidate.created_At}</p>
                    <p>Graduation year : {candidate.graduation}</p>
                    <p>Backlogs : {candidate.backlogs}</p>
                    <p>Current CTC : {candidate.ctc}</p>
                    <p>Available for Immediate Joining : {candidate.joining}</p>
                    <p>Profile Status : {candidate.prrofileStatus}</p> 
                    <p>path : <a href={url + candidate.resume} target="_blank" rel="noopener noreferrer">show</a></p>
                    <p>{link}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" class="btn btn-primary" onClick={handleClose} >Close</button>
                </Modal.Footer>
            </Modal>
    </div>)
}

export default Dashboard

{/* <button onClick={()=>{
                        var l = "/home/pratheekk/Desktop/Apr-20/updated/hr-resume-bank-be/resumes/"+ candidate.resume
                        showresume(l)
                        
                    }}>view resume</button> */}