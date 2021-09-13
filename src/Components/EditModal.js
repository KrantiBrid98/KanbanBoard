import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Button, Input } from "@material-ui/core";


function EditModal(props) {
    const { onClose, selectedValue, open, setStateData, stateData } = props;

    const [title, setTitle] = React.useState(selectedValue.title);
    const [body, setBody] = React.useState(selectedValue.body);

    const onSaveClick = () => {
        const data = stateData[selectedValue.type];
        const updatedVal = data.map((d) => {
            if (d.id == selectedValue.id) {
                return {
                    ...d,
                    title,
                    body
                }
            } else {
                return d
            }
        })
        setStateData({
            ...stateData,
            [selectedValue.type]: updatedVal
        })
        localStorage.setItem('tasks', JSON.stringify({
            ...stateData,
            [selectedValue.type]: updatedVal
        }));

        onClose(false);
    }
    return (
        <Dialog onClose={() => onClose(false)} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title" className="heading">Edit the Task !</DialogTitle>
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

export default EditModal;