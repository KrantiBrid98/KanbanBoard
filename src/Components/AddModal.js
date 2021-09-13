import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Button, Input, Select, MenuItem } from "@material-ui/core";


function AddModal(props) {
    const { onClose, open, setStateData, stateData } = props;

    const [title, setTitle] = React.useState("");
    const [body, setBody] = React.useState("");
    const [category, setCategory] = React.useState("");

    const onSaveClick = () => {
        const id = `item-${stateData.items.length + stateData.selected.length + 1}`
        const selectedCatData = stateData[category];
        const data = [
            ...stateData[category],
            {
                id,
                title,
                body
            }]
        setStateData({
            ...stateData,
            [category]: data
        })
        localStorage.setItem('tasks', JSON.stringify({
            ...stateData,
            [category]: data
        }));

        onClose(false);
    }
    return (
        <Dialog onClose={() => onClose(false)} aria-labelledby="simple-dialog-title" open={open} className="modal">
            <DialogTitle id="simple-dialog-title" className="heading">Add a new Task !</DialogTitle>
            <div className="modal-container">
                <List className="title">
                    Title: <Input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </List>
                <List className="title">
                    Body: <Input
                        value={body}
                        onChange={e => setBody(e.target.value)}
                    />
                </List>
                <List className="title">
                    Category: <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value={"items"}>Items</MenuItem>
                        <MenuItem value={"selected"}>Selected</MenuItem>
                    </Select>
                </List>
            </div>
            <Button
                className="button"
                onClick={onSaveClick}
            >Save</Button>
            <Button
                className="button"
                onClick={() => onClose(false)}
            >Cancel</Button>
        </Dialog>
    );
}

export default AddModal;