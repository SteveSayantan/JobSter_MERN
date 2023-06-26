import Wrapper from '../assets/wrappers/StatItem';

const StatItem=({count,title,icon,color,bcg})=>{
    return <Wrapper color={color} bcg={bcg}>    {/* Checkout the wrapper file to know how to access these props inside wrapper */}
        <header>
            <span className="count">{count}</span>
            <span className="icon">{icon}</span>
        </header>
        <h5 className="title">{title}</h5>
    </Wrapper>
}

export default StatItem;