import React from 'react';

/**
 * Este componente es una imagen o emoji.
 * @visibleName Emoji.
 */
const Emoji = (props:any) => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
);
export default Emoji;