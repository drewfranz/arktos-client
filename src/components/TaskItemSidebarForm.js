import React, { useState } from 'react';
import { Input, Label, FormGroup } from 'reactstrap';

const TaskItemSidebarForm = (props) => {
    const { task, parentHandleOnChange } = props;
    const [selected, setSelected] = useState(task.status);

    const handleOnChange = (e) => {
        e.preventDefault();
        setSelected(e.target.value);
        parentHandleOnChange(e);
    }

    return (
        <FormGroup row className="p-3">
            <Label for="status" xs="12">Status</Label>
            <select className="col-12" name="status" id="status" onChange={handleOnChange} value={selected} >
                <option value="open">Open</option>
                <option value="inProgress">In Progress</option>
                <option value="test">Ready For Test</option>
                <option value="approved">Approved</option>
                <option value="closed">Closed</option>
            </select>
        </FormGroup>
    );
}

export default TaskItemSidebarForm;
