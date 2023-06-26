// For implementing charts, we have to install Recharts package separately. Docs: https://recharts.org/en-US

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// All of these are simply taken from the docs. Go to the API section (https://recharts.org/en-US/api)  and click on the individual Parend and Child components to read more about the props they support.
const AreaChartComponent=({data})=>{
    return <ResponsiveContainer width='100%' height={300}>
        <AreaChart data={data} margin={{top:50}} >
            <CartesianGrid strokeDasharray='3 3'/>
            <XAxis dataKey='date'/>
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#1e3a8a" fill="#3b82f6" />
        </AreaChart>
    </ResponsiveContainer>
}

export default AreaChartComponent;