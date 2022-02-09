import { Navigate, NavLink } from "react-router-dom";
import { Result, Button } from "antd";

export const NotFoundPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" className="button">
          <NavLink to="/">Back home</NavLink>
        </Button>
      }
    />
  );
};
