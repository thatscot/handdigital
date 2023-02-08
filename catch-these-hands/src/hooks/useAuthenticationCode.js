const useAuthenticationCode = () => {
  function verifyCode(code) {
    console.log('TODO: Verifying code...', { code });
  }
  function setCode(code) {
    sessionStorage.setItem('game-code', code);
  }
  function getCode() {
    return sessionStorage.getItem('game-code');
  }
  return { setCode, code: getCode(), verifyCode };
};

export { useAuthenticationCode };
