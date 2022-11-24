import {
    Card,
    Title,
    Text,
    Tab,
    TabList,
    ColGrid,
    Block,
} from '@tremor/react';
import Cards from './cards';
import FirstContainer from './firstContainer';
import SecondContainer from './secondContainer';
import { useState } from 'react';


export default function Example(){
    const [selectedView, setSelectedView] = useState(1);
    return(
        <main>
            <Title>Dashboard</Title>
            <Text>Sales and Growth stats for The Imaginary Unicorn Inc.</Text>
            <TabList 
                defaultValue={ 1 } 
                handleSelect={ (value) => setSelectedView(value)} 
                marginTop="mt-6"
                >
                <Tab value={ 1 } text="Page 1" />
                <Tab value={ 2 } text="Page 2"/>
            </TabList>

            { selectedView === 1 ? (
                <>
                    <Cards />
                    <FirstContainer />
                </>
            ) : (
                <SecondContainer />
            )
        }
        </main>
    );
}