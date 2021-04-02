import React from 'react'
import IconButton from '../template/iconButton'

export default props => {

    const renderRows = () => {
        const list = props.list || [];
        return list.map(todo =>(
            <tr key={todo._id}>
                <td className={todo.done ? 'markDone' : 'markPending'}>{todo.description}</td>
                <td>
                    <IconButton style='success' icon='check' hide={todo.done}
                        onClick={() => props.handleMarkDone(todo)}></IconButton>              
                    <IconButton style='warning' icon='undo' hide={!todo.done}
                        onClick={() => props.handleMarkPending(todo)}></IconButton> 
                    <IconButton style="danger" icon="trash-o" hide={!todo.done}
                        onClick={()=> props.handleRemove(todo)}></IconButton> 
                </td>
            </tr>
        ))
    }

    return (
        <div className="container">
            <table className='table'>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th className='tableActions'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    )
}