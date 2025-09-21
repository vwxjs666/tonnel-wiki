window.onload = () => {

  const langs = ["en","fa"];

  const url = new URL(window.location.href);
  const paths = url.pathname.split("/").filter(Boolean);

  const s = paths.slice(2).join("/");

  if (paths[1]=="fa") document.documentElement.setAttribute("dir","rtl");

  if (paths.slice(2).length>0) {
    const main = document.createElement("a");
    main.href = `/${paths[0]}/${paths[1]}/`;
    main.textContent = "Back to Main";
    footer.appendChild(main);

    document.querySelectorAll("h1").forEach((h) => {
      const b = document.createElement("span");
      b.style.width = b.style.height = "34px";
      if (paths[1]=="fa") {
        b.style.marginLeft = "8px";
      } else {
        b.style.marginRight = "8px";
      }
      b.style.cursor = "pointer";
      b.innerHTML = (paths[1]=="fa")
        ? `<svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 -960 960 960" width="34px" fill="currentColor"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 -960 960 960" width="34px" fill="currentColor"><path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>`;

      b.addEventListener("click", () => {
        // Copy current paths and remove only the last segment after lang
        const parent = paths.slice(0, -1).join("/") + "/";
        window.location.href = `/${parent}`;
      });

      h.insertBefore(b, h.firstChild);
    });

    document.querySelectorAll("h2").forEach((h) => {
      h.id = h.textContent.trim().toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9\-]/g,"");
      const b = document.createElement("span");
      b.style.width = b.style.height = "24px";
      if (paths[1]=="fa") {
        b.style.marginLeft = "6px";
      } else {
        b.style.marginRight = "6px";
      }
      b.style.cursor = "pointer";
      b.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg>`;
      b.addEventListener("click",() => {
        const l = window.location.href.split("#")[0]+"#"+h.id;
        const t = document.createElement("input");
        document.body.appendChild(t);
        t.value = l;
        t.select();
        document.execCommand("copy");
        document.body.removeChild(t);
        alert(h.innerText+" Link copied to clipboard");
      });
      h.insertBefore(b,h.firstChild);
    });
  }

  langs.forEach(l => {
    if (l !== paths[1]) {
      const link = document.createElement("a");
      link.href = `/${paths[0]}/${paths[1]}/${s}`;
      link.textContent = l.toUpperCase();
      footer.appendChild(link);
    }
  });

}
