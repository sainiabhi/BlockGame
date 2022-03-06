import React, {useState, useEffect, useRef} from 'react';
import './blockgame.css';

function BlockGame(props) {
    const {matrix} = props;
    const blockMatrixCount = matrix * matrix;
    const [blockData, setBlockData] = useState([]);
    const [firstBlock, setFirstBlockSelection] = useState();
    const [secondBlock, setSecondBlockSelection] = useState();
    const blockRefs = useRef([]);

    const addToRefs = (el) => {
        if(el && !blockRefs.current.includes(el)) {
            blockRefs.current.push(el);
        }
    }

    useEffect(() => {
        let blockData = [];
        for(let j = 0; j < blockMatrixCount; j++) {
            blockData.push(<div key={j} ref={addToRefs} data-index={j} className='block' data-count={j+1}>{j+1}</div>);
        }
        setBlockData(blockData);
    }, [matrix, blockMatrixCount]);

    const handleBlockSelection = (e) => {
        const {target} = e;
        const elementSelected = Number(target.innerHTML);
        if(!firstBlock && elementSelected !== firstBlock) {
            const div = blockRefs.current[elementSelected - 1];
            div.className = 'block selected';
            setFirstBlockSelection(elementSelected);
        }
        else if(!secondBlock && elementSelected !== secondBlock) {
            const div = blockRefs.current[elementSelected - 1];
            div.className = 'block selected';
            setSecondBlockSelection(elementSelected);
        }
        else {
            blockRefs.current[firstBlock - 1].className = "block";
            setFirstBlockSelection(secondBlock);
            setSecondBlockSelection(elementSelected);
            blockRefs.current[elementSelected - 1].className = "block selected";
        }
    }

    const getRowData = () => {
        let rowData = [];
        if(blockData) {
            for(let i = 0; i < blockMatrixCount; i = i + matrix) {
                rowData.push(<div key={i}>
                    {blockData.slice(i, i+matrix)}
                </div>)
            }
        }
        return rowData;
    }

    return (
        <div className='container' onClick={handleBlockSelection}>
            {
                getRowData()
            }
        </div>
    )
}

export default BlockGame;
