
import { useNavigate } from 'react-router';
import axiosClient from '../../axiosClient';


const LogoutBtn = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosClient.post('/logout');

      if (response?.data?.type === 'success') {
        localStorage.removeItem('token');
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // fallback logout
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutBtn;
