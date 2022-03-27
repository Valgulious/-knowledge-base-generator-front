import React, { useState } from 'react';
import { observer } from 'mobx-react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Chpd from './Chpd';
import ChpdPercents from './ChpdPercents';
import Zdp from './Zdp';
import ZdpPercents from './ZdpPercents';
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
                <Tab label="ЧПД (проценты)" />
                <Tab label="ЗДП" />
                <Tab label="ЗДП (проценты)" />
            </Tabs>
            {value === 0 && <Chpd />}
            {value === 1 && <ChpdPercents />}
            {value === 2 && <Zdp />}
            {value === 3 && <ZdpPercents />}
        </Wrapper>
    );
});

export default CompareTables;
