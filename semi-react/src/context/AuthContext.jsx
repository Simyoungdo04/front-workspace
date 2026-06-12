import { useState, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthPrpvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return {
      memberId: localStorage.getItem("memberId"),
      memberName: localStorage.getItem("memberName"),
      role: localStorage.getItem("role"),
    };
  });

  const login = (data) => {
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("memberId", data.memberId);
    localStorage.setItem("memberName", data.memberName);
    localStorage.setItem("role", data.role);

    setUser({
      memberId: data.memberId,
      memberName: data.memberName,
      role: data.role,
    });
  };

  const logout = () => {
    axios.get(
      `http://localhost/api/auth/logout?id=${localStorage.get("memberId")}`,
    );
    ["token", "refreshToken", "memberId", "memberName", "role"].forEach((k) =>
      localStorage.removeItem(k),
    );
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLogin: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
