import styled, { keyframes } from 'styled-components';
import { bounce } from 'react-animations';
import {useHistory} from 'react-router-dom';

const bounceAnimation = keyframes`${bounce}`;

const BouncyDiv1 = styled.div`
  animation: infinite 3s ${bounceAnimation};
`;

const BouncyDiv2 = styled.div`
  animation: infinite 4s ${bounceAnimation};
`;

const BouncyDiv3 = styled.div`
  animation: infinite 3s ${bounceAnimation};
`;

function Homepage() {
    window.localStorage.clear();
    const history = useHistory();
    return <div id="homepage">
        <h1 id="homepage-title"> <img id="title-icon" src={process.env.PUBLIC_URL + "/images/icons8-omlette-64.png"} alt=""></img>NutritionBuddy</h1>
          <span id="homepage-under-title">Visualize the macronutrients of your favorite recipes</span>
          <table id="bouncy-table">   
              <thead>
                <tr id="bouncy-row">
                    <th className="bouncy-column">
                    <BouncyDiv1><img src={process.env.PUBLIC_URL + "/images/greenveg.jpeg"} width="250px" alt=""></img></BouncyDiv1>
                    </th>
                    <th className="bouncy-column">
                    <BouncyDiv2><img src={process.env.PUBLIC_URL + "/images/healthdrink.jpeg"} width="250px" alt=""></img></BouncyDiv2>
                    </th>
                    <th className="bouncy-column">
                    <BouncyDiv3><img src={process.env.PUBLIC_URL + "/images/plums.jpeg"} width="250px" alt=""></img></BouncyDiv3>
                    </th>
                </tr>
              </thead>
          </table>
        <button id="getStarted" type="button" onClick= {()=> {history.push("/login")} }>Get started!</button>
    </div>
}

export default Homepage;