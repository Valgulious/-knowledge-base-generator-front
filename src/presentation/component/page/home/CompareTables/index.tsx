import React, { useState } from 'react';
import { observer } from 'mobx-react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Chpd from './Chpd';
import { Wrapper } from './styles';

const CompareTables = observer(() => {
    const [value, setValue] = useState<number>(0);

    return (
        <Wrapper>
            <Tabs
                value={value}
                onChange={(_, selectedValue) => setValue(selectedValue)}
                textColor="primary"
                indicatorColor="primary"
            >
                <Tab label="ЧПД" />
                <Tab label="ЗДП" />
            </Tabs>
            {value === 0 && <Chpd />}
        </Wrapper>
    );
});

export default CompareTables;
