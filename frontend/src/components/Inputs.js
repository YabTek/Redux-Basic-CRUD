import styled from '@emotion/styled'
import { add_Employee} from '../redux/actions/employeeAction';
import { useDispatch,useSelector } from 'react-redux';
import { useState } from 'react';
import { css } from '@emotion/css';

const Add = styled.button`
     background-color: green;
     font-weight: bold;
     font-size: 28px;
     border-radius: 5px;
     border: none;
     height: 50px;
     width: 270px;
     margin-left: 260px;
     margin-top: 20px;
`;
const Input = styled.input`
width: 280px;
margin-top: 10px;
margin-left: 250px;
display: flex;
display-direction: column;
border-radius: 4px;
`;
const Count = styled(Add)`
     margin-top: 4px;
     width: 280px;
     background-color: #ccc;
     color: black;
     font-family: sans;
     font-size: 18x;
`;


function Inputs() {

  const [firstname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");
  const [age,setAge] = useState("");
  const [gender,setGender] = useState("");
  const [height,setHeight] = useState("");
  const dispatch = useDispatch()
  const counter = useSelector((state) => state.employeeReducer)
  let value = counter.length > 1? "employees" : "employee"
 
 
 const handleClick = () => {
  
     fetch('http://localhost:3500/employee', {
      method: 'POST',
      body: JSON.stringify({
        firstname : firstname,
        lastname: lastname,
        age: age,
        gender: gender,
        height: height
    }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }, 
    });
    window.location.reload()

    dispatch(add_Employee({
      firstname, lastname, age, gender, height
     }))
   };

  return (
    <>
    <div  className={css`
    display: flex;
    `}>
      <div> 
    <Input placeholder='firstname'  value = {firstname} onChange = {(e) => setFirstname(e.target.value)}/>
    <Input placeholder='lastname' value = {lastname} onChange = {(e) => setLastname(e.target.value)}/>
    <Input placeholder = 'age' value = {age} onChange = {(e) => setAge(e.target.value)}/>
    <Input placeholder = 'gender' value = {gender} onChange = {(e) => setGender(e.target.value)}/>
    <Input placeholder = 'height' value = {height} onChange = {(e) => setHeight(e.target.value)}/>
    <Add  className = "btn btn-primary " onClick={handleClick}>Add employee</Add>
    </div>
    <div>
      < Count>Count: {counter.length} {value} </Count>
    </div>
    </div>
    </>
  )};

  export default Inputs