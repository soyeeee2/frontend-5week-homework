import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
    const resultRef = useRef();
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

    const calculate = (value, idx) => {
        console.log(idx);

        return value;
    }

    // empty dney


    const handleOnsubmit = (e) => {
        e.preventDefault();
        const sectionLen = resultRef.current.childNodes.length;
        datas.reverse();
        // push date

        if( sectionLen < 3 ) {
            //tag 유지하면서 데이터만 변경하기
            datas.map(({ id, value }, idx) => {
                const num = calculate(value, idx);
                const child = document.createElement('p');
                const lowerChild = id.toLowerCase();
                child.innerHTML = highlightNumbers(num) + ` ${lowerChild}s`;
                resultRef.current.appendChild(child);
            })
        }
        datas.reverse();
    }

    const highlightNumbers = (value) => {
        return value.replace(/\d+/g, '<span style="color: blue;">$&</span>');
    }

    const handleOnchange = (e) => {
        const { id, value } = e.target;

        setDatas(
            datas.map((data) => {
                if (data.id == id) {
                    return {
                        ...data,
                        value: value,
                    }
                }
                return data;
            })
        )
    }

    return (
        <>
            <form onSubmit={handleOnsubmit} action="">
                {datas.length > 0 && datas.map(({ id, value, placeholder }) =>
                (<div>
                    <p>{id}</p>
                    <input type="number"
                        id={id}
                        value={value}
                        placeholder={placeholder}
                        onChange={handleOnchange} />
                </div>))}
                <button type='submit'>submit</button>
            </form>
            <section ref={resultRef}></section>
        </>
    );
}

export default App;
