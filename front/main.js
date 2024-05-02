// axios
//   .post("localhost:5001/CreatUser", {
//     email: "eve.holt@reqres.in",
//     password: "cityslicka"
//   })
//   .then(function(response) {
//     token = localStorage.token = response.data.token;
//     console.log(`token recieved ${token}`);
//     Create();

axios
  .get("http://localhost:5001/api/courses?limit=2&page=5&country=Egypt")
  .then(res => {
    console.log(res.data);
  });
