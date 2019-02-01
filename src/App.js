import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: 'Crud React',
            act: 0,
            index: '',
            datas: []
        }

        this.fSubmit = this.fSubmit.bind(this)
        this.fEdit = this.fEdit.bind(this)
        this.fRemove = this.fRemove.bind(this)
    }

    componentDidMount() {
        this.refs.name.focus()
    }

    fSubmit = (event) => {
        event.preventDefault()

        let datas = this.state.datas;
        let name = this.refs.name.value;
        let address = this.refs.address.value;

        if(this.state.act === 0) { //new
            let data = {
                name, address
            }
            datas.push(data)
        } else { // update
            let index = this.state.index
            datas[index].name = name
            datas[index].address = address
        }



        this.setState({datas: datas, act: 0})
        this.resetForm()
    }

    fEdit = (id) => {
        let data = this.state.datas[id]
        this.refs.name.value = data.name
        this.refs.address.value = data.address

        this.setState({
            act: 1,
            index: id,
        })
    }

    fRemove = (id) => {
        let datas = this.state.datas
        datas.splice(id, 1)
        this.setState({
            datas: datas
        })

        this.resetForm()
    }

    resetForm() {
        this.refs.myForm.reset()
        this.refs.name.focus()
    }


    render() {
        return (
            <div className='App container'>
                <h2>{this.state.title}</h2>
                <form ref='myForm'>
                    <div className='form-group'>
                        <input type="text" ref='name' placeholder='name' className='form-control'/>
                    </div>
                    <div className='form-group'>
                        <input type="text" ref='address' placeholder='address' className='form-control'/>
                    </div>
                    <div className='form-group'>
                        <button onClick={this.fSubmit} className='btn btn-primary btn-block'>Save</button>
                    </div>
                </form>
                <table className='table'>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Adress</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.datas.map((res, key) =>
                        <tr key={key}>
                            <td>{res.name}</td>
                            <td>{res.address}</td>
                            <td>
                                <button className='btn btn-default' onClick={() => this.fEdit(key)}> Edit</button>
                                <button className='btn btn-danger' onClick={() => this.fRemove(key)}> Remove</button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
