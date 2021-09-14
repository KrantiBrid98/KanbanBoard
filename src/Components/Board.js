import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Edit } from "@material-ui/icons";
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditModal from "./EditModal";
import AddModal from "./AddModal";

const Board = () => {

    const [stateData, setStateData] = React.useState(
        localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) :
            {
                items: [{
                    id: "item-1",
                    title: "title 1",
                    body: "body 1"
                },
                {
                    id: "item-2",
                    title: "title 2",
                    body: "body 2"
                },
                {
                    id: "item-3",
                    title: "title 3",
                    body: "body 3"
                }],
                selected: [{
                    id: "item-4",
                    title: "title 4",
                    body: "body 4"
                },
                {
                    id: "item-5",
                    title: "title 5",
                    body: "body 5"
                },
                {
                    id: "item-6",
                    title: "title 6",
                    body: "body 6"
                }],
                completed: [{
                    id: "item-90",
                    title: "title 90",
                    body: "body 90"
                }]
            }
    )

    const [isEditModalOpen, setEditModalOpen] = React.useState(false);
    const [isAddModalOpen, setAddModalOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState({});

    const id2List = {
        droppable: 'items',
        droppable2: 'selected',
        droppable3: 'completed'
    };

    const getList = id => id2List[id];

    const onDragEnd = result => {

        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                stateData[getList(source.droppableId)],
                source.index,
                destination.index
            );

            const sState = getList(source.droppableId);

            const state = {
                ...stateData,
                [sState]: items
            };
            setStateData(state);
            localStorage.setItem('tasks', JSON.stringify(state));
        } else {
            const result = move(
                stateData[getList(source.droppableId)],
                stateData[getList(destination.droppableId)],
                source,
                destination
            );

            var resultKeys = Object.keys(result);
            setStateData({
                ...stateData,
                [id2List[resultKeys[0]]]: result[resultKeys[0]],
                [id2List[resultKeys[1]]]: result[resultKeys[1]]
            });
            localStorage.setItem('tasks', JSON.stringify({
                ...stateData,
                items: result.droppable,
                selected: result.droppable2
            }));

        }
    };

    const onEditClick = (item, index, type) => {
        setSelectedValue({ ...item, type })
        setEditModalOpen(true);
    }

    const onDeleteClick = (item, index, type) => {
        const data = stateData[type];
        data.splice(index, 1);

        setStateData({
            ...stateData,
            [type]: data,
        })
        localStorage.setItem('tasks', JSON.stringify({
            ...stateData,
            [type]: data,
        }));

    }

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    /**
     * Moves an item from one list to another list.
     */
    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    const onAddClick = () => {
        setAddModalOpen(true);
    }

    return (
        <>
            <div><Button className="button add-task" onClick={onAddClick}>Add Task</Button></div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            className="main-container"
                            ref={provided.innerRef}
                        >
                            <div className="heading">TO DO</div>
                            {stateData.items.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="card"
                                        >
                                            <Edit
                                                style={{ cursor: 'pointer' }}
                                                className="icons"
                                                onClick={e => {
                                                    onEditClick(item, index, "items")
                                                }}

                                            />
                                            <DeleteIcon
                                                style={{ cursor: 'pointer' }}
                                                className="icons"
                                                onClick={e => {
                                                    onDeleteClick(item, index, "items")
                                                }}
                                            />
                                            <div className="title">{item.title}</div>
                                            <div className="content">{item.body}</div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <div
                            className="main-container"
                            ref={provided.innerRef}
                        > <div className="heading">IN PROGRESS</div>
                            {stateData.selected.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="card"
                                        >
                                            <Edit
                                                className="icons"
                                                style={{ cursor: 'pointer' }}
                                                onClick={e => {
                                                    onEditClick(item, index, "selected")
                                                }}

                                            />
                                            <DeleteIcon
                                                className="icons"
                                                style={{ cursor: 'pointer' }}
                                                onClick={e => {
                                                    onDeleteClick(item, index, "selected")
                                                }}
                                            />
                                            <div className="title">{item.title}</div>
                                            <div className="content">{item.body}</div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="droppable3">
                    {(provided, snapshot) => (
                        <div
                            className="main-container"
                            ref={provided.innerRef}
                        > <div className="heading">COMPLETED</div>
                            {stateData.completed.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="card"
                                        >
                                            <Edit
                                                className="icons"
                                                style={{ cursor: 'pointer' }}
                                                onClick={e => {
                                                    onEditClick(item, index, "completed")
                                                }}

                                            />
                                            <DeleteIcon
                                                className="icons"
                                                style={{ cursor: 'pointer' }}
                                                onClick={e => {
                                                    onDeleteClick(item, index, "completed")
                                                }}
                                            />
                                            <div className="title">{item.title}</div>
                                            <div className="content">{item.body}</div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {isEditModalOpen && <EditModal
                open={isEditModalOpen}
                onClose={setEditModalOpen}
                selectedValue={selectedValue}
                setStateData={setStateData}
                stateData={stateData}
            />}

            {isAddModalOpen && <AddModal
                open={isAddModalOpen}
                onClose={setAddModalOpen}
                setStateData={setStateData}
                stateData={stateData}
            />}
        </>
    );
}

export default Board