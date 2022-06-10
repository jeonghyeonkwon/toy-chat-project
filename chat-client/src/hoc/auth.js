import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

export default (COMPONENT, option, adminRoute = null) => {
  const AuthenticateCheck = () => {
    const history = useHistory();

    const [token, setToken] = useState(null);

    useEffect(() => {
      try {
        const get = localStorage.getItem("token");
        console.log(get);
        if (get) {
          setToken(get);
        } else {
          if (!token && option === true) {
            alert("로그인 후 사용해 주세요");
            history.push("/login");
          }
        }
      } catch (e) {}
    }, []);
    useEffect(() => {
      if (token && option === false) {
        alert("로그인 사용자는 접근할 수 없습니다. 로그아웃 후 이용해 주세요.");
        history.push("/room");
      }
    }, [token]);
    return <COMPONENT />;
  };
  return AuthenticateCheck;
};
