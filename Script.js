let list = document.getElementById("list");

function add() {
  let text = document.getElementById("text").value;
  let amt = +document.getElementById("amt").value;
  if(text=="" || amt==0) return;

  let li = document.createElement("li");
  li.innerHTML = `${text} <span>${amt}</span>`;

  let del = document.createElement("button");
  del.innerText="X";
  del.onclick = ()=>{ li.remove(); save(); };

  li.appendChild(del);
  list.appendChild(li);

  save();
}

function save() {
  let data=[];
  document.querySelectorAll("li").forEach(li=>{
    let parts = li.innerText.replace("X","").split(" ");
    let amt = Number(parts.pop());
    let text = parts.join(" ");
    data.push({text,amt});
  });
  localStorage.setItem("exp",JSON.stringify(data));
  calc();
}

function load() {
  let data = JSON.parse(localStorage.getItem("exp")) || [];
  data.forEach(d=>{
    let li = document.createElement("li");
    li.innerHTML = `${d.text} <span>${d.amt}</span>`;
    let del=document.createElement("button");
    del.innerText="X";
    del.onclick=()=>{li.remove();save();}
    li.appendChild(del);
    list.appendChild(li);
  });
  calc();
}

function calc() {
  let amts=[];
  document.querySelectorAll("li span").forEach(s=>amts.push(+s.innerText));
  let inc=amts.filter(a=>a>0).reduce((a,b)=>a+b,0);
  let exp=amts.filter(a=>a<0).reduce((a,b)=>a+b,0);
  document.getElementById("inc").innerText=inc;
  document.getElementById("exp").innerText=Math.abs(exp);
  document.getElementById("bal").innerText=inc-Math.abs(exp);
}
load();
