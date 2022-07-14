import React, {useState} from "react";

const Bookmark = ({status, onBookmark}) => {
    const [mark, setMark] = useState(status);
    
    const bookmarked = <i className="bi bi-bookmark-fill"></i>;
    const bookmark = <i className="bi bi-bookmark"></i>;

    const handleMark = () => {
        setMark(!mark);
    }

    return mark === true
    ? <button className="btn btn-light" onClick={handleMark}>{bookmarked}</button>
    : <button className="btn btn-light" onClick={handleMark}>{bookmark}</button>

}

export default Bookmark;