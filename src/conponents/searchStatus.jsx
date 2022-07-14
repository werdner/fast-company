const SearchStatus = ({number}) => {
    const classes = 'badge m-1 p-3 fs-6 bg-';
    const prefix = [
        ' человек тусанет с тобой сегодня',
        ' человека тусанут с тобой сегодня'
    ];

    switch (true) {
        case number === 0:
            return <div className={classes + 'danger'}>Никто с тобой не тусанет</div>;
        case (number >= 2 && number <= 4) ||
             (number % 10 >= 2 && number % 10 <= 4 && number > 21):
            return <div className={classes + 'primary'}>{number + prefix[1]}</div>
        default: 
            return <div className={classes + 'primary'}>{number + prefix[0]}</div>;
    }
}

export default SearchStatus;