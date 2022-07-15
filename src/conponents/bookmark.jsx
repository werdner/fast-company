import React from "react";

const Bookmark = ({status, ...props}) => (
        <button className="btn btn-light" onClick={props.onBookmark}>
            <i className={status ? "bi bi-bookmark-fill" : "bi bi-bookmark"}></i>
        </button>
    )

export default Bookmark;