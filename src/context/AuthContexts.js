import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // عند أول تحميل: جلب بيانات المستخدم من localStorage
 useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) setUser(JSON.parse(userData));
  }, []);
  // دالة تسجيل الدخول
 
  // دالة تسجيل الخروج

  return (
    <AuthContext.Provider value={{ user}}>
      {children}
    </AuthContext.Provider>
  );
};
