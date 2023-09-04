import { useLocation, useParams, Navigate } from "react-router-dom";

export const TokenRedirect: React.FC = (): JSX.Element => {
  const location = useLocation();
  const pathname = location.pathname;
  const path = pathname.substring(1).split('/')[0];

  const { token } = useParams();

  console.log(token, path.substring(1).split('/'));

  return (
    <Navigate to={`/login?token=${token || ''}&path=${path}`} />
  );
}
