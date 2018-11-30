import React from 'react';
import { ButtonGroup, Button, Glyphicon } from 'react-bootstrap'
import { viewTypes } from '../constants/'

const ViewTypeSwitch = ({onClick, currentSelectedView}) => {
    return(
        <ButtonGroup bsSize="small" className="view-type-switch pull-right">
        <Button
            bsStyle={currentSelectedView === viewTypes.cards ? 'primary' : 'default'} 
            onClick={() => onClick(viewTypes.cards)}
        >
            <Glyphicon glyph="th-large" />
        </Button>
        <Button
            bsStyle={currentSelectedView === viewTypes.list ? 'primary' : 'default'} 
            onClick={() => onClick(viewTypes.list)}
        >
            <Glyphicon glyph="th-list" />
        </Button>
    </ButtonGroup>
    );
};

export { ViewTypeSwitch };