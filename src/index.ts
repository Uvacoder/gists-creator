function main() {
  const root = document.querySelector(".root");
  root.innerHTML = `
  <h1 class="title">G I S T S - M A K E R</h1>

  <div class="token-container">
    <form class="token-form">
      <input class="input token-input" name="token" type="password" placeholder="New token" />
      <button class="token-save button">SAVE</button>
    </form>
    <button class="token-delete button">DELETE</button>
    <a href="http://docs.github.com/es/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token" target="_blank">
      <button class="token-getnew button">GET NEW</button>
    </a>
  </div>

  <form class="form">
      <input class="input description" name="description" placeholder="Description">
      <input class="input filename" name="filename" placeholder="Filename including extension">
      <textarea class="input code" name="code" placeholder="Your code"></textarea>

      <button class="button create">CREATE SECRET GIST</button>
  </form>
  `;

  const tokenForm = root.querySelector(".token-form");
  tokenForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const target = e.target as any;
    const data = new FormData(target);
    const value = Object.fromEntries(data.entries());
    const tokenValue = value.token;

    localStorage.setItem("token", tokenValue.toString());
  });

  const tokenDelete = root.querySelector(".token-delete");
  tokenDelete.addEventListener("click", () => {
    localStorage.removeItem("token");
  });

  const Form = root.querySelector(".form");
  Form.addEventListener("submit", (e) => {
    e.preventDefault();

    const target = e.target as any;
    const data = new FormData(target);
    const value = Object.fromEntries(data.entries());

    const token = localStorage.getItem("token");
    const description = value.description;
    const filename = value.filename;
    const code = value.code;

    fetch("https://api.github.com/gists", {
      method: "post",
      headers: {
        Authorization: "token " + token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `{
      "description": "${description}",  
      "files":{
        "${filename}":{
            "content":"${code}"
        }
    }
}
`,
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  });
}
main();
