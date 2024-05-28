const baseURL = "http://jeong-kwon.kro.kr:8000/guestbook/";

const container = document.getElementById("listItem");

async function displayEntries() {
    const fetchData = await fetch(baseURL, { 
      method: "GET"
    });
   
    const toJson = await fetchData.json();
    console.log(toJson);

    // const entries = toJson.items || [];
    // console.log(entries);

    
    toJson.forEach((entry, index) => {
      const list = document.createElement('div');
      list.className = 'list';

      const num = document.createElement('span');
      num.innerText = `
        ${index + 1}
      `;

      const info = document.createElement('span');
      info.className = 'info';
      info.innerText = `
        ${entry.title}
        ${entry.content}
        by ${entry.writer}
        ${entry.created_at}
      `;
      
      const delButton = document.createElement('button');
      delButton.className = 'delBtn';
      delButton.innerText = '삭제';

      delButton.addEventListener('click', async () => {
          const inputPassword = prompt('비밀번호를 입력하세요:')
          try {await fetch(`${baseURL}${entry.id}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "password" : inputPassword,
            }),
          });
          displayEntries();}
          catch(error) {
            console.log(error);
          }
      });

      list.appendChild(num);
      list.appendChild(info);
      list.appendChild(delButton);

      container.appendChild(list);
      container.insertBefore(list, container.firstElementChild);
    });
}

async function addNew() {
  const writer = document.getElementById('writer').value;
  const password = document.getElementById('password').value;
  // console.log("@@@@@@@@@@@@@@@@@@"+password);
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  if (writer && password && title && content) {
    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "writer" : writer,
            "content" : content,
            "title" : title,
            "password" : password,
        }),
      });

      // document.getElementById('writer').value = '';
      // document.getElementById('password').value = '';
      // document.getElementById('title').value = '';
      // document.getElementById('content').value = '';


      // displayEntries();
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    alert('모든 항목을 입력해주세요.');
  }
  
  location.href = location.href;
}

window.onload = function() {
  displayEntries()
};
