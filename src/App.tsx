import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import InsurerOverview from './Components/Insurer/InsurerOverview.web'
import SiibCommissionRate from './Components/Insurer/SiibCommissionRate.web'
import MedicalInsurance from './Components/Insurer/MedicalInsurance.web'
import MotorInsurance from './Components/Insurer/MotorInsurance.web'
import Contact from './Components/Insurer/Contact.web'
import UploadAttachedment from './Components/Insurer/UploadAttachedment.web'
import Insurer from './Insurer.web'
import StageFive from './StageFive'
import StageFiveNew from './StageFiveNew'

const enumFormAction = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  VIEW: 'VIEW',
}

function App() {
  const [inssuranceData, setInssuranceData] = useState<string[] | null>(null)
  const [insurerFormType, setInsurerFormType] = useState<string>(enumFormAction.EDIT)

  const insuranceTypesData = (data: string[] | null) => {
    setInssuranceData(data)
  }

  const changeEdit = () => {
    console.log('insurerFormType :', insurerFormType)
    setInsurerFormType(enumFormAction.EDIT)
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <Insurer formType={insurerFormType} changeEdit={changeEdit} /> */}
      {/* <StageFive /> */}
      <StageFiveNew />
      {/* <div style={{ padding: '30px' }}>
        <InsurerOverview insuranceTypes={insuranceTypesData} />
      </div>
      <div style={{ padding: '30px' }}>
        <SiibCommissionRate insuranceInputs={inssuranceData} />
      </div>
      <div style={{ padding: '30px' }}>
        <MedicalInsurance />
      </div>
      <div style={{ padding: '30px' }}>
        <MotorInsurance />
      </div>
      <div style={{ padding: '30px' }}>
        <Contact />
      </div>
      <div style={{ padding: '30px' }}>
        <UploadAttachedment />
      </div> */}
    </div>
  );
}

export default App;
