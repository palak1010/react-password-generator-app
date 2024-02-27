import React, { useState, useCallback, useEffect, useRef } from "react";
function PasswordGenerator() {
  // set variables
  const [length, setLength] = useState(12);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState(3);
  const passwordRef = useRef(null);

  // function to generate password
  const passwordGenerator = useCallback(() => {
    let tempPassword = "";
    let allAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) {
      allAlpha += "0123456789";
    }
    if (charAllowed) {
      allAlpha += "!@#$%^&*()~`_+=-{}|][:<>.,/?";
    }
    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * allAlpha.length + 1);
      tempPassword += allAlpha.charAt(charIndex);
    }
    setGeneratedPassword(tempPassword);
  }, [length, numAllowed, charAllowed, setGeneratedPassword]);

  // call password generator function on load
  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  // function for copy generate password to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(generatedPassword);
  }, [generatedPassword]);

  const updateNum = () => {
    let tempScore;
    setNumAllowed((prev) => !prev);
    if (!numAllowed) {
      tempScore = passwordScore + 1;
    } else {
      tempScore = passwordScore - 1;
    }
    setPasswordScore(tempScore);
  };

  const updateSym = () => {
    let tempScore;
    setCharAllowed((prev) => !prev);
    if (!charAllowed) {
      tempScore = passwordScore + 1;
    } else {
      tempScore = passwordScore - 1;
    }
    setPasswordScore(tempScore);
  };

  let strengthClass = "h-2 rounded-xl transition-colors";
  var strengthCounter = [],
    j = 0,
    len = 5;
  while (++j <= len) strengthCounter.push(j);

  return (
    <div className="passwordGeneratorWrapper">
      <div className="w-full">
        <div className="relative mb-2">
          <input
            id="password"
            className="w-full pl-3 pr-10 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="Password"
            value={generatedPassword}
            ref={passwordRef}
            readOnly
          />
          <button
            onClick={copyPasswordToClipboard}
            className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors"
          >
            <svg
              className="h-8 w-8 text-indigo-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <rect x="8" y="8" width="12" height="12" rx="2" />{" "}
              <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
            </svg>
          </button>
        </div>
        <div className="flex -mx-1">
          {strengthCounter.map(() => (
            <div className="w-1/5 px-1">
              <div
                className={`${strengthClass} ${
                  passwordScore <= 3
                    ? "bg-red-400"
                    : passwordScore <= 4
                    ? "bg-yellow-400"
                    : "bg-green-400"
                }`}
              ></div>
            </div>
          ))}
        </div>
        <hr className="my-5 border border-gray-200" />
        <div className="mb-2">
          <label className="block text-xs font-semibold text-gray-500 mb-2">
            PASSWORD LENGTH: {length}
          </label>

          <input
            className="w-full"
            type="range"
            min={8}
            max={20}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className="flex -mx-2 mb-2">
          <div className="w-1/2 px-2">
            <label htmlFor="charsLower">
              <input
                type="checkbox"
                className="align-middle"
                id="charsLower"
                value={numAllowed}
                onChange={updateNum}
              />
              <span className="text-xs font-semibold text-gray-500">
                Numbers
              </span>
            </label>
          </div>
          <div className="w-1/2 px-2">
            <label htmlFor="charsSymbols">
              <input
                type="checkbox"
                className="align-middle"
                id="charsSymbols"
                value={charAllowed}
                onChange={updateSym}
              />
              <span className="text-xs font-semibold text-gray-500">
                SYMBOLS
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PasswordGenerator;
