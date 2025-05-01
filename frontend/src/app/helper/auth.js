export const isLoggedIn = () => {   
    const token = localStorage.getItem('token');
    console.log(!!token);
    return !!token; // returns true if token is not null/empty
  };
  