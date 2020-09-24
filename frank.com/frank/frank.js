function ajax(method, url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(request);
        }
      }
    };
    request.send();
  });
}
ajax("get", "http://localhost:8888/friends.json").then((response) => {
  console.log("这是 AJAX");
  console.log(response);
});

//以下是封装jsonp的操作以及jsonp的使用方法
function jsonp(url) {
  return new Promise((resolve, reject) => {
    const random = "frankJSONPCallbackName" + Math.random(); //0-1之间的小数
    window[random] = (data) => {
      resolve(data);
    };
    const script = document.createElement("script");
    script.src = `${url}?callback=${random}`;
    script.onload = () => {
      script.remove();
    };
    script.onerror = () => {
      reject();
    };
    document.body.appendChild(script);
  });
}

jsonp("http://localhost:8888/friends.js").then((data) => {
  console.log(data);
});
