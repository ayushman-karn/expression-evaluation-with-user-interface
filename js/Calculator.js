{
  let result = document.getElementById("res");

  let buttons = document.querySelector(".ono");
  for (let i = 0; i < 16; i++)
    buttons.children[i].addEventListener("click", func);

  function func() {
    switch (this.textContent) {
      case "0":
        result.textContent += "0";
        break;
      case "1":
        result.textContent += "1";
        break;
      case "2":
        result.textContent += "2";
        break;
      case "3":
        result.textContent += "3";
        break;
      case "4":
        result.textContent += "4";
        break;
      case "5":
        result.textContent += "5";
        break;
      case "6":
        result.textContent += "6";
        break;
      case "7":
        result.textContent += "7";
        break;
      case "8":
        result.textContent += "8";
        break;
      case "9":
        result.textContent += "9";
        break;
      case "+":
        result.textContent += "+";
        break;
      case "-":
        result.textContent += "-";
        break;
      case "*":
        result.textContent += "*";
        break;
      case "/":
        result.textContent += "/";
        break;
      case "X":
        result.textContent = result.textContent.slice(0, -1);
        break;
      case "=":
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
        break;
    }
  }

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

  // let container = document.querySelector(".container");

  // container.addEventListener("mousemove", (e) => {
  //   buttons.style.transition = "0s";
  //   result.style.transition = "0s";
  //   let x = (window.innerWidth / 2 - e.clientX) / 7;
  //   let y = (window.innerHeight / 2 - e.clientY) / 7;
  //   buttons.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  //   result.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  // });

  // container.addEventListener("mouseout", () => {
  //   buttons.style.transition = "0.5s";
  //   result.style.transition = "0.5s";
  //   buttons.style.transform = `rotateY(${0}deg) rotateX(${0}deg)`;
  //   result.style.transform = `rotateY(${0}deg) rotateX(${0}deg)`;
  // });
}
