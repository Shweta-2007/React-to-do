import React from "react";
import "./style.css";
import { useState } from "react";
import { useEffect } from "react";

const getLocalData = () => {
  const lists = localStorage.getItem("myToDoList");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

function ToDo() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState();
  const [toggleButton, setToggleButton] = useState(false);

  const addItem = () => {
    if (!inputData) {
      alert(" Please Enter Something!");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );

      setInputData([]);
      setIsEditItem();
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  // ADDING LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("myToDoList", JSON.stringify(items));
  }, [items]);

  const editItem = (index) => {
    const itemToBeEdited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(itemToBeEdited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  return (
    <div>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/to-do.jpg" alt="" />
            <figcaption>Add Your List Here 🎈</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          <div className="showItems">
            {items.map((curElem, index) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDo;
