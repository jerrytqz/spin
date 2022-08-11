import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const createAndAppendWrapperToBody = (wrapperID) => {
    const wrapperEl = document.createElement('div');
    wrapperEl.setAttribute('id', wrapperID);
    document.body.appendChild(wrapperEl);
    return wrapperEl;
};

const ReactPortal = ({children, wrapperID}) => {
    const [wrapperEl, setWrapperEl] = useState(null);

    useLayoutEffect(() => {
        let el = document.getElementById(wrapperID);
        let autoCreated = false; 

        if (!el) {
            autoCreated = true; 
            el = createAndAppendWrapperToBody(wrapperID);
        }

        setWrapperEl(el);

        return () => {
            if (autoCreated && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        }
    }, [wrapperID]);

    if (wrapperEl === null) {
        return null; 
    }

    return createPortal(children, wrapperEl);
};

export default ReactPortal;
