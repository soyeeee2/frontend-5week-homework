import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
    const resultRef = useRef();
    const [defaults, setDefaults] = useState([
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
    const [result, setResult] = useState({
        YEAR: '',
        MONTH: '',
        DAY: ''
    });

    const calculate = (value, idx) => {
        defaults.map(({ id, value }) => {
            setResult({
                ...result,
                [id]: value
            });
        })

        var today = new Date();
        var birthday = new Date(result['YEAR'], result['MONTH'] - 1, result['DAY']);
        // console.log(birthday);
        const survival = today - birthday;
        const survival_Day = survival / 1000 / 60 / 60 / 24;
        // console.log(survival_Day)

    }


    const handleOnsubmit = (e) => {
        e.preventDefault();
        defaults.reverse();
        calculate();
        showResult();
        defaults.reverse(); 
    }

    const showResult = () => {
        for (const { id, value } of defaults) {
            //empty dney
            if (value == '') {
                alert('빈칸입니다');
                return;
            }

            // create rssult
            let child = document.querySelector('p');
            if ( !child ) {
                const element = document.createElement('p');
                child = element;
            }
            const lowerChild = id.toLowerCase();
            child.innerHTML = highlightNumbers(value) + ` ${lowerChild}s`;
            resultRef.current.appendChild(child);
        }
    }


    const highlightNumbers = (value) => {
        return value.replace(/\d+/g, '<span style="color: blue;">$&</span>');
    }

    const handleOnchange = (e) => {
        const { id, value } = e.target;

        setDefaults(
            defaults.map((data) => {
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
                {defaults.length > 0 && defaults.map(({ id, value, placeholder }) =>
                (<div key={id}>
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
