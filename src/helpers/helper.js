

function dateformat(dateString)
{
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
  const formattedDate = date.toLocaleString(undefined, options);
  return formattedDate;
}

function modelOpen(id){
    const targetEl = document.getElementById(id);
    targetEl.style.display = "flex"
}

function modelClose(id){
    const targetEl = document.getElementById(id);
    targetEl.style.display = "none"
}

export { dateformat, modelOpen, modelClose }