import { Fragment } from "react"

function LogOutNavBar() {
    return (
        <Fragment>
             <ul className = "nav">
          <li>
          <Link to="/">NutritionBuddy</Link>
          </li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        </Fragment>
    );
}

function LogInNavBar() {
    return (
        <Fragment>
             <ul className = "nav">
          <li>
          <Link to="/">NutritionBuddy</Link>
          </li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/graph">Graph</Link></li>
          <li><Link to="/stored">Saved Recipes</Link></li>
          
        </ul>
        </Fragment>
    );
}