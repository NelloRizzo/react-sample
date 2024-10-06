import './FiscalCodeForm.css'
import React from 'react'

class FiscalCodeForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            birthday: '',
            gender: 0,
            birthCity: '',
            birthProv: '',
            fiscalCode: '',
            provinces: [],
            cities: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8888/api/provinces', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState(s => ({ ...s, provinces: data, birthProv: data[0] }))
                this.loadCities(data[0])
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    callWebApi = () => {
        const data = {
            'firstName': this.state.firstName,
            'lastName': this.state.lastName,
            'birthday': this.state.birthday,
            'gender': this.state.gender,
            'birthProvince': this.state.birthProv,
            'birthCity': this.state.birthCity
        }
        console.log(data)
        fetch('http://localhost:8888/api/fiscalcode', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("Codice Fiscale calcolato", data)
                this.setState(s => ({ ...s, fiscalCode: data.fiscalCode }))
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState(s => ({ ...s, [name]: value }))
        console.log(this.state)
    }

    provinceChanged = (e) => {
        const { _, value } = e.target
        this.setState(s => ({ ...s, birthProv: value }))
        console.log("Provincia cambiata a", value)
        this.loadCities(value)
    }

    loadCities = (province) => {
        console.log("Lettura città in provincia di", province)
        fetch(`http://localhost:8888/api/cities/${province}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("Città in provincia di", province, data)
                this.setState(s => ({ ...s, cities: data, birthCity: data[0].name }))
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    render() {
        return (
            <div className='container' >
                <div className="form-row">
                    <div className="form-group">
                        <label className="control-label col-4" htmlFor='firstName'>Nome</label>
                        <input className="form-control col-8" name='firstName' value={this.state.firstName} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="control-label col-4" htmlFor="lastName">Cognome</label>
                        <input className="form-control col-8" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="control-label col-4" htmlFor="birthday">Data di nascita</label>
                        <input type="date" className="form-control col-8" name="birthday" value={this.state.birthday} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="control-label col-4" htmlFor="gender">Sesso</label>
                        <div className="col-8">
                            <div className="form-check-inline">
                                <input type="radio" className="form-check-input" name="gender" value='0' checked={this.state.gender === 0} onChange={(e) => { this.setState(s => ({ ...s, gender: 0 })) }} />
                                <span className="form-check-label">M</span>
                            </div>
                            <div className="form-check-inline">
                                <input type="radio" className="form-check-input" name="gender" value='40' checked={this.state.gender === 40} onChange={(e) => { this.setState(s => ({ ...s, gender: 40 })) }} />
                                <span className="form-check-label">F</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-4" htmlFor="birthProvince">Città di nascita</label>
                        <div className="form-group row">
                            <div className="col-4">
                                <select className="form-select" name="birthProvince" onChange={this.provinceChanged}>
                                    {this.state.provinces && this.state.provinces.map(o => {
                                        return <option key={o} value={o}>{o}</option>
                                    })}
                                </select>
                            </div>
                            <div className="col-8">
                                <select className="form-select" name="birthCity" onChange={e => this.setState(s => ({ ...s, birthCity: e.target.value }))}>
                                    {this.state.cities && this.state.cities.map(o => {
                                        return <option key={o.name} value={o.name}>{o.name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row text-center mt-2">
                        <div className="offset-4 col-4">
                            <button type='button' onClick={this.callWebApi} className="btn btn-primary">Calcola Codice Fiscale</button>
                        </div>
                    </div>
                    <div className="row text-center mt-2">
                        <div className="col">
                            <span className="display-4">{this.state.fiscalCode}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default FiscalCodeForm