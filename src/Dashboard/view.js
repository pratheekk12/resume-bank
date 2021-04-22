import React,{useState,useEffect} from 'react'
import {CardContent, Grid,Card,CardHeader} from '@material-ui/core'
import Header from '../Header'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Modal } from 'react-bootstrap'
import {
    TextField,MenuItem,InputLabel,Select,Button,
    FormControl,makeStyles} from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SearchIcon from '@material-ui/icons/Search';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import {useDispatch,useSelector} from 'react-redux'
import {getProfiles} from '../Redux/actions/logActions'




toast.configure()

const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 100,
    },
  }));


  


const Dashboard =(props)=>{
    const [profiles,setProfiles] = useState([])
    const [profiles1,setprofiles1] = useState([])
    const [candidate,setCandidate] = useState("")
    const [show,setShow] =useState(false)
    const [sort,setSort] = useState(false)
    const [filter,setFilter] = useState("")
    const [search,setSearch] = useState("")

    const profiles2 = useSelector(state => state.profiles)

    const dispatch = useDispatch()
   
    const classes = useStyles();

    const role1 = [{name : 'MERN Developer', value : 'MERN Developer'},{name : 'Manual Tester', value : 'Manual Tester'},{name : 'Automation Tester', value : 'Automation Tester'}]

    var url = "http://192.168.3.45:3056/resumes/"
    //get all profiles
    const getProfiles =()=>{
        axios.get('http://192.168.3.45:3056/api/profiles')
            .then((response)=>{
                setProfiles(response.data)
                setprofiles1(response.data)
                
            })
            .catch((error)=>{
                console.log(error)
            })
    }


 

    if(profiles.length > 0) {
        let i =0;
         profiles1.map((ele)=>{
         i=i+1;
         return ele.slNo = i
        })
    }
    
    const onChangeFilter = (e,value) =>{
        setFilter(e.target.value)
        // setFilter('ALL')
       
    }
    
    const setValue=()=>{
        if(filter === 'ALL'|| filter === ""){
            setprofiles1(profiles)
        }
        if(filter !== 'ALL'){
            const result = profiles.filter((ele)=>{
                return ele.role === filter
            })
        setprofiles1(result)
        }
    }

    console.log(filter)

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

    const handleSort = (e) =>{
        setSort(!sort)
        setProfiles(profiles.reverse())
    }

    const handleClose=()=>{
        setShow(false)
    }

    const handleSearch=(e)=>{
        setSearch(e.target.value)
    }

    const searchcandidate =(e)=>{
        const result = profiles.filter((ele)=>{
            return ele.firstName === search
        })
        setprofiles1(result)
    }

    useEffect(()=>{
        getProfiles()
        
    },[])

    useEffect(()=>{
        setValue()
    },[filter])

    useEffect(()=>{
        dispatch(getProfiles())
    },[dispatch])

    return(<div>
         <Header />
        <Grid container spacing={3} direction="row">
        <Grid item xs={12} sm={12}>
        
        </Grid>
        <Grid item xs={12} sm={12}>
        
        </Grid>
        <Grid item xs={12} sm={12}>
        
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
                    {/* Total Profiles <br/><br/> */}
                    {profiles.length}
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={5} sm={5}></Grid>
        <Grid item xs={3} sm={3}>
        <TextField id="outlined-basic" label="search by first name" variant="outlined" size="small" value={search} onChange={handleSearch}/>&nbsp;<Button variant="contained" color="primary" onClick={searchcandidate}><SearchIcon/></Button>&nbsp;<Button variant="contained"  onClick={()=>{setprofiles1(profiles) ;setSearch("")}}><RotateLeftIcon/></Button>
        </Grid>
        <Grid item xs={5} sm={5}>
                
        </Grid>
        <Grid item xs={2} sm={2}>
       </Grid>
        <Grid item xs={2} sm={2}>
        <FormControl variant="outlined" className={classes.formControl} >
            <InputLabel id="demo-simple-select-outlined-label">Filter</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={filter}
                onChange={onChangeFilter}
                label="Filter"
                required="true"
                >
                <MenuItem value="ALL">
                    <em>All</em>
                    
                </MenuItem>
                    {
                        role1.map((exp)=>{
                            return( <MenuItem value={exp.value}>{exp.name}</MenuItem>)
                        })
                    }
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
        <table class="table table-bordered border-primary" >
                <tr>
                    <th>Sl.No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                    <th>Applied Date {sort ? (<ArrowUpwardIcon fontSize="small" onClick={handleSort}/>):(<ArrowDownwardIcon fontSize="small" onClick={handleSort}/>)}</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                   
                </tr>
                <tbody>
                    {
                        profiles1.map((profile)=>{
                            return (<tr onClick={()=>{
                                handleDetails(profile._id)
                            }}>
                                <td>{profile.slNo}</td>
                                <td>{profile.firstName}</td>
                                <td>{profile.lastName}</td>
                                <td>{profile.role}</td>
                                <td>{profile.created_At.slice(0,10)}</td>
                                {
                                        profile.prrofileStatus === "Applied" && (<td ><button type="button" class="btn btn-success" onClick={()=>{
                                            handleshortlisted(profile._id)
                                        }}>Shortlist</button>&nbsp;<button type="button" class="btn btn-danger" onClick={()=>{
                                            handlerejected(profile._id)
                                        }}>Reject</button></td>)
                                    }
                                {
                                            profile.prrofileStatus === "rejected" && (<td ><button type="button" class="btn btn-danger" disabled="true">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rejected&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button></td>)
                                    }
                                    {
                                            profile.prrofileStatus === "shortlisted" && (<td ><button type="button" class="btn btn-primary" disabled="true">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Shortlisted&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button></td>)
                                    }   
                                <td>{profile.updated_At.slice(0,10)}</td>
                            </tr>)
                        })
                    }
                </tbody>
                </table>
        </Grid>
        </Grid>
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <br/>
                    <br/>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>{candidate.firstName} {candidate.lastName}</h3><br/>
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
                    <p>Resume : {candidate.resume  ? (<a href={url + candidate.resume} target="_blank" rel="noopener noreferrer">show</a>):null}</p>               
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" class="btn btn-primary" onClick={handleClose} >Close</button>
                </Modal.Footer>
            </Modal>
    </div>)
}

export default Dashboard

