import "./styles.css";

const onClickAdd = () => {
  // テキストの値を取得し、文字を初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除
const deletFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // liタグを生成
  const li = document.createElement("li");

  // divタグを生成
  const div = document.createElement("div");
  div.className = "list-row";

  // pタグの生成
  const p = document.createElement("p");
  p.className = "task-title";
  p.innerText = text;

  // button(完了)生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親タグを未完了リストから削除
    deletFromIncompleteList(completeButton.closest("li"));

    // // 完了リストに追加する要素
    const addTarget = completeButton.closest("li");
    // todo内容テキストを取得
    const text = addTarget.querySelector("p").innerText;
    // buttonの削除
    addTarget.textContent = null;
    // div再生成
    const div = document.createElement("div");
    div.className = "list-row";
    // p再生成
    const p = document.createElement("p");
    p.className = "task-title";
    p.innerText = text;
    // buttonの生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの親タグを完了リストから削除
      const deletTarget = backButton.closest("li");
      document.getElementById("complete-list").removeChild(deletTarget);
      // テキストを取得
      const text = backButton.previousElementSibling.innerText;
      createIncompleteList(text);
    });
    // liタグの子要素に各要素を設定
    addTarget.appendChild(div);
    div.appendChild(p);
    div.appendChild(backButton);
    // 完了のリストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  // button(削除)生成
  const deletButton = document.createElement("button");
  deletButton.innerText = "削除";
  deletButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ（li）を未完了リストから削除
    deletFromIncompleteList(deletButton.closest("li"));
  });

  // liタグの子要素に各要素を設定
  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deletButton);

  // 未完了のリストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
