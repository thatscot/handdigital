import { useEffect, useRef, useState } from 'react';
import styles from './Authenticator.module.css';

const AUTHENTICATION_STATES = {
  LOADING: 'loading',
  ERROR: 'error',
  DEFAULT: 'default',
  SUCCESS: 'success'
};

const LoadingIcon = ({ ...rest }) => {
  return (
    <svg
      className={styles.loadingIcon}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}>
      <path
        d="M6.55747 2.22832C5.05344 2.89454 3.77504 3.98287 2.87733 5.3613C1.97961 6.73973 1.50116 8.34903 1.5 9.99401C1.49884 11.639 1.97503 13.249 2.8708 14.6287C3.76657 16.0083 5.04343 17.0985 6.54652 17.7668C8.04961 18.4352 9.71434 18.653 11.3388 18.3939C12.9632 18.1348 14.4776 17.4099 15.6982 16.3072C16.9188 15.2044 17.7932 13.7712 18.2154 12.1813C18.6375 10.5914 18.5892 8.91316 18.0764 7.35016"
        stroke="white"
        strokeWidth="3"
      />
    </svg>
  );
};

const BUTTON_STATES = {
  [AUTHENTICATION_STATES.LOADING]: <LoadingIcon />,
  [AUTHENTICATION_STATES.ERROR]: 'Link',
  [AUTHENTICATION_STATES.DEFAULT]: 'Link',
  [AUTHENTICATION_STATES.SUCCESS]: 'Linked ✌️'
};

const Authenticator = () => {
  const initArray = Array.from({ length: 4 });
  const [authCode, setAuthCode] = useState(initArray);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [authState, setAuthState] = useState(AUTHENTICATION_STATES.DEFAULT);
  const [error, setError] = useState('');

  const inputRef = useRef();

  function handleChange({ target }, index) {
    setAuthCode((prevAuthCode) => {
      prevAuthCode[index] = target.value;
      return prevAuthCode;
    });
    if (!target.value) {
      setActiveIndex(index - 1);
    } else {
      setActiveIndex(index + 1);
    }
  }

  function verifyCode() {
    const authCodeString = authCode.join('');
    if (authCodeString.length < 4) {
      setAuthState(AUTHENTICATION_STATES.ERROR);
      setError('Your code should be 4 digits long');
      return;
    } else {
      setAuthState(AUTHENTICATION_STATES.LOADING);
      // Verify code with Server
      setTimeout(() => {
        if (authCodeString === '1234') {
          setAuthState(AUTHENTICATION_STATES.SUCCESS);
          // On success
          //    Save code in localstorage/session storage
          //    Close modal
        } else {
          setAuthState(AUTHENTICATION_STATES.ERROR);
          setError('Invalid code, please try again.');
        }
      }, 3000);
    }
  }

  const onPasteEvent = (e) => {
    e.preventDefault();
    const val = e.clipboardData.getData('text');
    if (val && /^\d+$/.test(val)) {
      const processedVal = val.padEnd(4, undefined).slice(0, 4).split('');
      setAuthCode(processedVal);
      setActiveIndex(processedVal.length);
    }
  };

  useEffect(() => {
    const el = document.querySelector(`.${styles.authenticationContainer}`);
    el.addEventListener('paste', onPasteEvent);
    return () => {
      el.removeEventListener('paste', onPasteEvent);
    };
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeIndex]);

  return (
    <div className={styles.authenticationContainer}>
      <div className={styles.formContainer}>
        <div>
          <h2>Enter code</h2>
          <p>Copy the code from your game session</p>
        </div>
        <div className={styles.codeInput}>
          {authCode.map((num, index) => (
            <input
              key={index}
              ref={activeIndex === index ? inputRef : null}
              value={num}
              required
              onChange={(e) => handleChange(e, index)}
              type="number"
              maxLength="1"
              data-state={authState}
            />
          ))}
        </div>
        <button
          data-state={authState}
          onClick={verifyCode}
          disabled={authState === AUTHENTICATION_STATES.LOADING}>
          <span>{BUTTON_STATES[authState]}</span>
        </button>
        {authState === AUTHENTICATION_STATES.ERROR && error && (
          <span className={styles.error}>{error}</span>
        )}
      </div>
    </div>
  );
};

export { Authenticator };
