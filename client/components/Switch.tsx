import React from 'react';
import { observer } from 'mobx-react';
import { SwitchType } from 'Types';

export const Switch = observer(({store}: SwitchType) => 
    <div className="d-inline-block swc">
        <div aria-checked={store.enabled} className="switch" onClick={store.toggleClick}>
            <div className="toggle"></div>
        </div>
    </div>
);