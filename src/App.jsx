import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Home from './search/page.tsx'
import { registerLicense } from '@syncfusion/ej2-base'

registerLicense('ORg4AjUWIQA/Gnt2UlhhQlVMfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX9Td0JiW3pddX1TQWFZ')

function App() {
  return (
    <>
        <Home/>
    </>
  )
}

export default App
