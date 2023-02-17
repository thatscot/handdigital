const useAuthenticationCode = () => {

const BACKEND_URL = import.meta.env.PROD ? import.meta.env.VITE_PROD_BACKEND_URL :  import.meta.env.VITE_LOCAL_BACKEND_URL ;


  async function verifyCode(code) {
    try {
      const res = await fetch(`${BACKEND_URL}/authenticate`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ uuid: code })
      }).then((res) => res.json());
      if (res.authenticated) {
        return { authenticated: true, error: '' };
      } else {
        return { authenticated: false, error: 'This code is invalid, please try again' };
      }
    } catch (e) {
      console.error(e);
      return { authenticated: false, error: e.message };
    }
  }

  function setCode(code) {
    sessionStorage.setItem('game-code', code);
  }
  function getCode() {
    return sessionStorage.getItem('game-code');
  }
  return { setCode, getCode, verifyCode };
};

export { useAuthenticationCode };
