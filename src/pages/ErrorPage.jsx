import { Link } from "react-router-dom";

export default function ErrorPage (){
    return (
        <div>
            <h1>The path is no exit</h1>
            <h2>back to home</h2>
            <Link to="/">Go Home</Link>
        </div>
    )
}