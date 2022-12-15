import axios from 'axios';
import React from 'react';


const AdminBookDelete = ({bookId, deactivated, bookHandler}) => {
    //take a single book's id to change deactivated status
    //if the book is already deactivated, disable the button

    const deactivator = async () =>{
        try {
            const isDeactivated = true;
            const update = {isDeactivated}
            await axios.put(`/api/books/${bookId}`, update)
            bookHandler();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <button disabled={deactivated === true ? true:false} onClick={deactivator}>Deactivate</button>
        </div>
    );
};

export default AdminBookDelete;