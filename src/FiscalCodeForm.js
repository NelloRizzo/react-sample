import './FiscalCodeForm.css'
import { useState } from 'react'

function FiscalCodeForm() {

    const [ result, setResult ] = useState()

    function calculate(formData) {
        console.log("calculate()")
        setResult({ 'fiscalCode': 'Ok!!!!'})
    }

    return (
        <div className='container'>
            <div className="form-row">
                <div className="form-group">
                    <label className="control-label col-4" htmlFor="first-name">Nome</label>
                    <input className="form-control col-8" name="first-name" id="first-name" />
                </div>
                <div className="form-group">
                    <label className="control-label col-4" htmlFor="last-name">Cognome</label>
                    <input className="form-control col-8" name="last-name" id="last-name" />
                </div>
                <div className="form-group">
                    <label className="control-label col-4" htmlFor="birthday">Data di nascita</label>
                    <input type="date" className="form-control col-8" name="birthday" id="birthday" />
                </div>
                <div className="form-group">
                    <label className="control-label col-4" htmlFor="gender">Sesso</label>
                    <div className="col-8">
                        <div className="form-check-inline">
                            <input type="radio" className="form-check-input" name="gender" value="0" id="gender-male" checked />
                            <span className="form-check-label">M</span>
                        </div>
                        <div className="form-check-inline">
                            <input type="radio" className="form-check-input" name="gender" value="40" id="gender-female" />
                            <span className="form-check-label">F</span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-4" htmlFor="birth-province">Città di nascita</label>
                    <div className="form-group row">
                        <div className="col-4">
                            <select className="form-select" name="birth-province" id="birth-province">
                                <option selected>--- Provincia ---</option>
                            </select>
                        </div>
                        <div className="col-8">
                            <select className="form-select" name="birth-city" id="birth-city">
                                <option selected>--- Selezionare Provincia ---</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row text-center mt-2">
                    <div className="offset-4 col-4">
                        <button type='button' onClick={calculate} className="btn btn-primary">Calcola Codice Fiscale</button>
                    </div>
                </div>
                <div className="row text-center mt-2">
                    <div className="col">
                        <span className="display-4" id="fiscal-code">{result && result.fiscalCode }</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FiscalCodeForm