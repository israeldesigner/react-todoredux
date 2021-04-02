import React, {Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const base = 'http://localhost:3003'
const URL = `${base}/api/todos`;

export default class Todo extends Component {

    constructor(props){
        super(props)
        this.state = {
            description:'',
            list:[]
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleMarkDone = this.handleMarkDone.bind(this);
        this.handleMarkPending = this.handleMarkPending.bind(this);
        
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.refresh()
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, description, list: resp.data}))
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    //change
    handleChange(e){
        this.setState({...this.state, description:e.target.value })
    }
    handleAdd(){
        const description = this.state.description
        axios.post(URL,{ description })
             .then(resp=> this.refresh());
    }

    //REMOVE
    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh(this.state.description))
    }

    //metodo mark as done
    handleMarkDone(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done:true})
            .then(resp => this.refresh(this.state.description));
    }

    //metodo mark as pending
    handleMarkPending(todo){
        axios.put(`${URL}/${todo._id}` , {...todo, done:false})
            .then(resp => this.refresh(this.state.description))
    }

    //clear
    handleClear(){
        this.refresh();
    }

    render(){
        return(
            <div>
                <PageHeader name="tarefas"  small="cadastro"></PageHeader>
                <TodoForm 
                    description={this.state.description}
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd} 
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}/>
                <TodoList 
                    list={this.state.list}
                    handleMarkDone={this.handleMarkDone}
                    handleMarkPending={this.handleMarkPending}
                    handleRemove={this.handleRemove}
                />
            </div>
        )
    }
}