import { Link } from "react-router-dom";

export default function Pals() {
  return (
    <div>
      <h1>Pal list</h1>
      <ul>
        <li>
          <Link to="./live-translation">Live translation</Link>
        </li>
      </ul>
    </div>
  );
}
