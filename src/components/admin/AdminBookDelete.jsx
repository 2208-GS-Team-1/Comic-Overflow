import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminBookDelete = ({ bookId, deactivated, bookHandler }) => {
  const [buttonText, setButtonText] = useState("");

  // This needs to be in a use effect because conditially deicidng what to set useState as caused infinite rerenders.
  useEffect(() => {
    // if the book.isDeactivated === false, we want the button to say 'reactivate'
    if (deactivated) {
      setButtonText("Re-activate");
    } else {
      setButtonText("Deactivate");
    }
  }, []);

  const onClickHandler = async () => {
    try {
      // JWT & authorization header to give for authorization check in the API
      const token = window.localStorage.getItem("token");
      const config = { headers: { authorization: "Bearer " + token } };

      if (deactivated) {
        const isDeactivated = false;
        const update = { isDeactivated };
        await axios.put(`/api/books/${bookId}`, update, config);
      } else {
        const isDeactivated = true;
        const update = { isDeactivated };
        await axios.put(`/api/books/${bookId}`, update, config);
      }
      // Couldn't figure out how to change the button text - so we are just refetching all books ????
      bookHandler();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={onClickHandler}>{buttonText}</button>
    </div>
  );
};

export default AdminBookDelete;
