import React, {useState} from "react";

const Bookmark = ({status}) => {
    const [mark, setMark] = useState(status);

    const handleMark = () => {
        setMark(!mark);
    }

    return (
        <button className="btn btn-light" onClick={handleMark}>
            <i className={mark ? "bi bi-bookmark-fill" : "bi bi-bookmark"}></i>
        </button>)

}

export default Bookmark;