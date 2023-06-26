import { Link } from 'react-router-dom'
import {Logo} from '../components'
import main from '../assets/images/main.svg'
import styled from 'styled-components'      // As it is a default export, we can use any name

const Landing=()=>{

    return <Wrapper>
        <nav>
            <Logo/>
        </nav>
        <div className="container page">
            <div className="info">
                <h1>job <span>tracking</span> app</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium officia asperiores voluptatibus optio eveniet consequuntur at culpa assumenda voluptatem perferendis?</p>
                <Link className="btn btn-hero" to='/register'>Login/Register</Link>
            </div>
            <img src={main} alt="job hunt" className='img main-img' />
        </div>
    </Wrapper>
}
/* 
    Info about Styled Components
   -----------------------------
    1. It is just a way to write css and js in the same file.

    2. It automatically generates unique classnames, therefore we need not to worry about name collisions.

    3. In this file, we are creating a 'main' element  which will act as a Wrapper. We shall write css for the elements inside it, as shown below. 
    It will create an unique class for the main. Inspect it for clarification

    4. Remember, all these styles are only valid inside the wrapper element, therefore we can go use element-selectors too.

    5. Now, we can move this Wrapper component to a separate folder too, and import from there.

    6. It is only and only responsible for styling.

*/

const Wrapper= styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`

export default Landing;