import React,{useState,useEffect, Fragment} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';//Grid
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CRUD=()=>{
    // https://react-bootstrap.github.io/layout/grid/

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    // const empdata=[
    //     {
    //         id:1,
    //         name:'asa',
    //         age:2,
    //         isactive:0
    //     }
    // ]
    const [name,setName]=useState('');
    const [age,setAge]=useState('');
    const [isActive,setIsActive]=useState(0);

    const [editid,setEditid]=useState('');
    const [editname,setEditName]=useState('');
    const [editage,setEditAge]=useState('');
    const [editIsActive,setEditIsActive]=useState(0);

    const [data,setdata]=useState([]);

    useEffect(()=>{
        getdata();
        // setdata(empdata);
    },[])

const getdata=()=>{
    axios.get('https://localhost:7087/api/Form')
    .then((res)=>{
        setdata(res.data);
        // console.log(data);
    })
    .catch((err)=>{
        console.log(err)
    })
}

    const handleEdit=(id)=>{
        handleShow();

        axios.get(`https://localhost:7087/api/Form/${id}`)
        .then((res)=>{
            setEditName(res.data.name);
            setEditAge(res.data.age);
            setEditIsActive(res.data.isActive);
            setEditid(res.data.id);

        })
        .catch((err)=>{
            console.log(err)
        })
    }
    const handleDelete=(id)=>{
     if(window.confirm("Are you sure to delete?")===true)   {
        axios.delete(`https://localhost:7087/api/Form/${id}`)
        .then((res)=>{
            if(res.status===200){
                toast.success("Emp deleted");
                getdata();
            }
        })
        .catch((err)=>{
            console.log(err)
        })
     }
    }

    const handleSave=()=>{
        const url='https://localhost:7087/api/Form';
        const data={
                "name": name,
                "age": age,
                "isActive": isActive
        }
        axios.post(url,data)
        .then((res)=>{
        getdata();
        clear();
        toast.success('Employee has addded succesfully');
        })

    }

    const clear=()=>{
        setName('');
        setAge('');
        setIsActive(0);
        setEditName('');
        setEditAge('');
        setEditIsActive(0);
        setEditid('');

    }

    const handleActiveChange=(e)=>{
        if(e.target.checked){
            setIsActive(1);
        }else
        {
            setIsActive(0);
        }
    }
    const handleEditActiveChange=(e)=>{
        if(e.target.checked){
            setEditIsActive(1);
        }else
        {
            setEditIsActive(0);
        }
    }
    const handleUpdate=(id)=>{
        const url=`https://localhost:7087/api/Form/${editid}`;
        const data={
                "name": editname,
                "age": editage,
                "isActive": editIsActive,
                "id":id
        }
        axios.put(url,data)
        .then((res)=>{
        getdata();
        clear();
        toast.success('Employee has updated succesfully');
        handleClose();
        })
       }
    return(
        <Fragment>
            <ToastContainer/>
            <Container>
                <Row>
                    <Col><input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={(event)=>setName(event.target.value)} /></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter Age" value={age} onChange={(event)=>setAge(event.target.value)}/></Col>
                    <Col><input type="checkbox" 
                    checked={isActive === 1 ? true : false}
                     onChange={(e)=>handleActiveChange(e)}  value={isActive} />
                    <label>IsActive</label></Col>
                    <Col>
                    <button className="btn btn-primary" onClick={handleSave}>Submit</button>
                    </Col>
                </Row>
    </Container>


        <Table striped bordered hover>
        <thead>
        <tr>
          <th>#</th>
          <th> Name</th>
          <th> Age</th>
          <th>IsActive</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
            data && data.length>0?
            data.map((item,index)=>{
                return(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.isActive}</td>
                        <td colSpan={2}>
                            <button onClick={()=>handleEdit(item.id)} className="btn btn-primary">Edit</button> &nbsp;
                            <button onClick={()=>handleDelete(item.id)} className="btn btn-primary">Delete</button>
                        </td>
                    </tr>
                )
            }):'Loading...'
        }
      </tbody>
        </Table>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
                    <Col><input type="text" className="form-control" placeholder="Enter Name" value={editname} onChange={(event)=>setEditName(event.target.value)} /></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter Age" value={editage} onChange={(event)=>setEditAge(event.target.value)}/></Col>
                    <Col><input type="checkbox" checked={editIsActive===1?true:false} value={editIsActive}
                     onChange={(event)=>handleEditActiveChange(event)}/>
                    <label>IsActive</label></Col>
                </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleUpdate(editid)}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </Fragment>
    )
}
