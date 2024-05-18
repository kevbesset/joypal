import Icon from "@/components/ui/Icon";
import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <h1>Oopsy!</h1>
      <Link to="/">
        <Icon name="arrow_back" />
        Return to dashboard
      </Link>
    </>
  );
}
