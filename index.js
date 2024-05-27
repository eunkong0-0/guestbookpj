const baseURL = "http://jeong-kwon.kro.kr:8000/guestbook/";

const container = document.getElementById("listItem");

async function displayEntries() {
    const fetchData = await fetch(baseURL, { 
      method: "GET"
    });
   
    const toJson = await fetchData.json();

    const entries = toJson.items || [];
    
    entries.forEach((entry, index) => {
      const list = document.createElement('div');
      list.className = 'list';

      const num = document.createElement('span');
      num.innerText = `
        ${index + 1}
      `;

      const contents = document.createElement('span');
      contents.innerText = `
        ${entry.title} 
        ${entry.content}
      `;

      const details = document.createElement('span');
      details.innerText = `
        ${entry.created_at}
        ${entry.password}
      `;
      
      const delButton = document.createElement('button');
      delButton.innerText = '삭제';
      delButton.addEventListener('click', async () => {
        if (prompt('비밀번호를 입력하세요:') === entry.password) {
          await fetch(`${baseURL}/${entry.id}`, { method: "DELETE" });
          displayEntries();
        } else {
          alert('비밀번호가 틀렸습니다.');
        }
      });

      
      details.appendChild(delButton);

      list.appendChild(num);
      list.appendChild(contents);
      list.appendChild(details);

      container.appendChild(list);
    });
}

async function addNew() {
  const writer = document.getElementById('writer').value;
  const password = document.getElementById('password').value;
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
            "writer" : "작성자",
            "content" : "내용",
            "title" : "제목",
            "password" : "비밀번호"
        }),
      });
    
      
      document.getElementById('writer').value = '';
      document.getElementById('password').value = '';
      document.getElementById('title').value = '';
      document.getElementById('content').value = '';

  
      displayEntries();
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    alert('모든 항목을 입력해주세요.');
  }
}

window.onload = function() {
  displayEntries()
};
