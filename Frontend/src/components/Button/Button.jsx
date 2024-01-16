import React from 'react'

const Button = (props) => {
    return (
        <button className="m-2 bg-[#365486] hover:bg-[#4970b4] text-white font-bold py-2 px-4 border-b-4 border-[#293f65] hover:border-[#365486] rounded-xl">
            {props.text}
        </button>
    )
}

export default Button