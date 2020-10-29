{
  let result = document.getElementById("res");
  let btn0 = document.getElementById("b0");
  let btn1 = document.getElementById("b1");
  let btn2 = document.getElementById("b2");
  let btn3 = document.getElementById("b3");
  let btn4 = document.getElementById("b4");
  let btn5 = document.getElementById("b5");
  let btn6 = document.getElementById("b6");
  let btn7 = document.getElementById("b7");
  let btn8 = document.getElementById("b8");
  let btn9 = document.getElementById("b9");
  let btnClr = document.getElementById("bdel");
  let btnEql = document.getElementById("bequal");
  let btnPlus = document.getElementById("bplus");
  let btnMinus = document.getElementById("bminus");
  let btnMul = document.getElementById("bmul");
  let btnDiv = document.getElementById("bdiv");

  btn0.onclick = () => {
    result.textContent += "0";
  };

  btn1.onclick = () => {
    result.textContent += "1";
  };

  btn2.onclick = () => {
    result.textContent += "2";
  };

  btn3.onclick = () => {
    result.textContent += "3";
  };

  btn4.onclick = () => {
    result.textContent += "4";
  };

  btn5.onclick = () => {
    result.textContent += "5";
  };

  btn6.onclick = () => {
    result.textContent += "6";
  };

  btn7.onclick = () => {
    result.textContent += "7";
  };

  btn8.onclick = () => {
    result.textContent += "8";
  };

  btn9.onclick = () => {
    result.textContent += "9";
  };

  btnPlus.onclick = () => {
    result.textContent += "+";
  };

  btnMinus.onclick = () => {
    result.textContent += "-";
  };

  btnMul.onclick = () => {
    result.textContent += "*";
  };

  btnDiv.onclick = () => {
    result.textContent += "/";
  };

  btnClr.onclick = () => {
    result.textContent = result.textContent.slice(0, -1);
  };

  btnEql.onclick = () => {
    let exp = result.textContent;
    console.log(exp);
    if (/\./g.test(exp)) {
      result.textContent = "@_@ CAN'T COMPUTE!";
      setTimeout(() => {
        result.textContent = "";
      }, 3000);
      return;
    }
    let postfix = infixToPostfix(exp);
    console.log(postfix);
    result.textContent = evalPostfix(postfix);
  };

  function infixToPostfix(exp) {
    let a = exp.match(/([\+-/\*]|[0-9]+)/g);
    let s = [];
    let postfix = "";
    for (let i = 0; i < a.length; i++) {
      if (!isNaN(parseInt(a[i]))) {
        //alt conditon - Number.isInteger(parseInt(a[i]))
        postfix += a[i] + ",";
      } else {
        if (s.length == 0) {
          s.push(a[i]);
        } else if (weight(a[i]) > weight(s[s.length - 1])) {
          s.push(a[i]);
        } else {
          while (s.length != 0 && weight(s[s.length - 1]) >= weight(a[i])) {
            postfix += s.pop() + ",";
          }
          s.push(a[i]);
        }
      }
    }
    while (s.length != 0) {
      postfix += s.pop() + ",";
    }
    return postfix.slice(0, -1); //slice for removing comma at the end
  }

  function weight(a) {
    switch (a) {
      case "+":
      case "-":
        return 1;
      case "*":
      case "/":
        return 2;
    }
  }

  function evalPostfix(postfix) {
    let a = postfix.split(",");
    let s = [];
    for (let i = 0; i < a.length; i++) {
      if (!isNaN(parseInt(a[i]))) {
        //alt conditon - Number.isInteger(parseInt(a[i]))
        s.push(a[i]);
      } else {
        s.push(evalExp(s.pop(), s.pop(), a[i]));
      }
    }
    return s[0].toString();
  }

  function evalExp(a, b, c) {
    let p = parseInt(a);
    let q = parseInt(b);
    switch (c) {
      case "+":
        return q + p;
      case "-":
        return q - p;
      case "*":
        return q * p;
      case "/":
        return q / p;
    }
  }
}
