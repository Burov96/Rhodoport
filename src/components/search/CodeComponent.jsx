'use client'
import React, { useState } from 'react'
import reshenie from './reshenie'


function CodeComponent() {
const [input, setInput] = useState('')
const [result, setResult] = useState('')

function checker(input){
  console.log(input)
  const rez = reshenie(input)
setResult()
}

const handleChange =(e)=>{
  e.preventDefault();
  setInput(e.target.value)
  console.log(input)
}
  return (
    <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md p-2 rounded-xl">
    <div className="flex flex-col md:flex-row gap-4">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="What are you looking for?"
        className="flex-1 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        disabled
        value={result}
        placeholder="Location"
        className="flex-1 px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="bg-blue-600 hover:bg-blue-700 text-black px-8 py-4 rounded-lg transition-colors duration-200" onClick={checker}>
        Check
      </button>
    </div>
  </div>
  )
}

export default CodeComponent