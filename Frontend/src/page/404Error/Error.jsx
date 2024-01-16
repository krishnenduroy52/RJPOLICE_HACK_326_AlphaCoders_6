import React from 'react'
import style from './Error.module.css'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div
            style={{
                backgroundColor: "white",
                padding: "4rem 1rem",
                borderRadius: "30px 30px 30px 30px",
                height: "85vh",
            }}
            className={style.container}
        >
            <h1 className={style.heading1} style={{ fontSize: "90px" }}>500</h1>
            <h1 className={style.heading1}>Internal Server Error</h1>
            <p className={style.para}>That's An Error. That's All We Know.</p>
            <div className='inset-0 flex items-center justify-center'>
                <Link
                    to="/"
                    className="m-2 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-pink-700 hover:border-pink-500 rounded-xl"
                >
                    Back to Home
                </Link>
            </div>

        </div>
    )
}

export default Error