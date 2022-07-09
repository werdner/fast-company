const RenderPhrase = (props) => {
    const classes = 'badge m-1 p-3 fs-6 bg-';
    const prefix = [
        ' человек тусанет с тобой сегодня',
        ' человека тусанут с тобой сегодня'
    ];

    switch (true) {
        case props.number === 0:
            return <div className={classes + 'danger'}>Никто с тобой не тусанет</div>;
        case (props.number >= 2 && props.number <= 4) ||
             (props.number % 10 >= 2 && props.number % 10 <= 4 && props.number > 21):
            return <div className={classes + 'primary'}>{props.number + prefix[1]}</div>
        default: 
            return <div className={classes + 'primary'}>{props.number + prefix[0]}</div>;
    }
}

export default RenderPhrase;