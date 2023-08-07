"use client"

import { useReducer, useState } from "react";
import { Item } from "./types/Item";
import { listReducer } from "./reducers/listReducer";

const Page = () => {
  const[list, dispatch] = useReducer(listReducer, [])  //1º parametro: reduccer, 2ºparametro: lista inicial/original
  const[addField, setAddField] = useState('');
  
  const handleAddButton = () => {
    if(addField.trim() === '') return false

    dispatch({
      type: 'add',
      payload: {
        text: addField.trim()
      }
    });
    setAddField('')
  }
  const handleRemoveButton = (id:number) => {
   if (!window.confirm('Tem certeza que deseja excluir?')) return false
    dispatch({
      type: 'remove',
      payload: {id}
    })

  }
  const handleEditButton = (id:number) => {
    const item = list.find(it => it.id === id)
    if(!item) return false;
     const newText = window.prompt('Editar Tarefa', item.text)
    if(!newText || newText.trim() === '') return false  

    dispatch({
      type: 'editText',
      payload: {
        id,
        newText
      }
    })
  }
  const handleDoneCheckbox = (id:number) => {
    dispatch({
      type: 'toggleDone',
      payload: {id}
    })
  }
 
  return (
    <div className="container mx-auto ">
      <h1 className="text-center text-4xl my-4">Lista de Terefas</h1>
      <div className=" max-w-2xl mx-auto flex rounded-md border border-gray-400 p-4 my-4">
        <input type="text"className="flex-1 rounded-md border border-green-700 p-3 bg-transparent outline-none" 
        placeholder="Digite um item" 
        value={addField}
        onChange={e => setAddField(e.target.value)}
        />
        <button className="p-4" onClick={handleAddButton}>ADICIONAR</button>

        
      </div>
      <ul className="max-w-2xl mx-auto">
      {list.map(item => (
        <li 
          key={item.id} 
          className="flex items-center p-3 my-3 border-b border-gray-200 "
        >
          <input type="checkbox" 
          className="w-6 h-6 mr-4"
          checked={item.done}
          onClick={() => handleDoneCheckbox(item.id)}
          />
          <p className="flex-1 text-lg">{item.text}</p> 
          <button onClick={() => handleEditButton(item.id)} className="p-4 mx-4 border border-gray-600 hover:text-gray-500">Editar</button>
          <button onClick={() => handleRemoveButton(item.id)} className="p-4 mx-4 border border-red-700 hover:text-gray-500">Excluir</button>
        </li>
      ))}
    
      </ul>
    

    </div>
  );
}

export default Page;