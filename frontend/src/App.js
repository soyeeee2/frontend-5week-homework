import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [datas, setDatas] = useState([
    {
      id: 'DAY',
      placeholder: 'DD',
      value: ''
    },
    {
      id: 'MONTH',
      placeholder: 'MM',
      value: ''
    },
    {
      id: 'YEAR',
      placeholder: 'YYYY',
      value: ''
    }
  ])


  const handleOnsubmit = (e) => {
    e.preventDefault();
    console.log(datas);
  }

  const handleOnchange = (e) => {
    const { id, value, placeholder } = e.target;

      setDatas(
        datas.map((data)=>{
          if(data.id == id){  
            console.log('check');
            return {
              ...data,
              value:value,
            }
          }
          return data;
      })
    )

  }

  return (
    <>
      <form onSubmit={handleOnsubmit} action="">
        {datas.length>0 && datas.map( data =>
        (<div>
          <p>{data.id}</p>
          <input type="text"
            id={data.id}
            value={data.value}
            placeholder={data.placeholder}
            onChange={handleOnchange} />
        </div>))}
        <button type='submit'>submit</button>
      </form>
    </>
  );
}

export default App;
