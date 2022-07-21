import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, onBookmark }) => (
    <button className="btn btn-light" onClick={onBookmark}>
        <i className={status ? "bi bi-bookmark-fill" : "bi bi-bookmark"}></i>
    </button>
);

Bookmark.propTypes = {
    status: PropTypes.bool.isRequired,
    onBookmark: PropTypes.func.isRequired
};

export default Bookmark;
