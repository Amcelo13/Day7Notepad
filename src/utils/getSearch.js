export function getSearch(nod, str) {
  const searchstr = (str ?? "").toLowerCase();
    
  console.log("asdf asd==== > ",nod, str);
    return (nod ?? []).filter((item) => {
      if (item.title.toLowerCase().indexOf(searchstr)!== -1|| item.content.toLowerCase().indexOf(searchstr)!== -1) {
        return true;
      }
      return false;
    });
}
