import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ItemCard from './ItemCard';
import { RiDeleteBin6Fill } from "react-icons/ri";

const DraggableCardList = () => {

    let User = localStorage.getItem("user");
    const [cardList, setCardList] = useState([]);


    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const setNewData = (result) => {

        if (result.destination.index === -1 || result.destination.droppableId === "droppableDelete") {
            let array = [...cardList]
            array.splice(result.source.index, 1)
            setCardList(array)
            return;
        }
        if (!result.destination) {
            return;
        }
        const items = reorder(cardList, result.source.index, result.destination.index);
        setCardList(items)
    }

    const getItemStyle = (isDragging, draggableStyle) => ({
        background: isDragging ? "lightgreen" : "grey",
        ...draggableStyle,
    });

    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? "red" : "",
    });

    useEffect(() => {
        let user = localStorage.getItem("user");
        if (user) {
            setCardList(JSON.parse(user));
        }
    }, [User])

    return (
        <DragDropContext onDragEnd={setNewData}>
            <div className='main-container'>
                <Droppable droppableId="droppableDelete">
                    {(provided, snapshot) => (
                        <div
                            className='delete-container d-flex justify-content-center align-items-center mx-3'
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                        >
                            <RiDeleteBin6Fill
                                style={{ fontSize: "50px", color: "red" }}
                            />
                        </div>
                    )}
                </Droppable>
                <div className="container           ">
                    <Droppable droppableId="droppable" direction='horizontal'>
                        {(provided, snapshot) => (
                            <div
                                className='card-container'
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >

                                {cardList.length > 0 ?
                                    cardList.map((curElem, index) => (
                                        <Draggable key={index} draggableId={`id_${index}`} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    className='item-card'
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <ItemCard curElem={curElem} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                                    : ""
                                }
                                {provided.placeholder}

                            </div>
                        )}
                    </Droppable>
                </div >
            </div >
        </DragDropContext >
    )
}

export default DraggableCardList    