const content = document.getElementById("content");   
const menuItems = document.querySelectorAll(".menuItem");

const entries = localStorage.getItem("entries") ? JSON.parse(localStorage.getItem("entries")) : {};

const menuItemClicked = (evt) =>{
    let id = evt.target.id;
    menuItems.forEach((mi)=>{    
        mi.setAttribute("class", mi.classList.value.replace(" selected",""));
        if(mi.id == id){
            mi.setAttribute("class", mi.classList.value+' selected')
        }
    });

    if(id === "main"){
        launchMain();
    } else if(id === "addEntry"){
        launchAddEntry();
    } else if (id ==="listEntries"){
        lauchListEntries();
    }
}

menuItems.forEach((mI)=>mI.addEventListener("click", menuItemClicked))

const launchMain = () =>{
    let keys = Object.keys(entries);
    content.innerHTML = `
        <h1>Welcome</h1>
        <div class="main_title">This is your dailiy journal.</div>
        <div class="main_item">Your Last Entry was posted on : ${new Date(Number(keys[0])).toDateString()}</div>
        <div class="main_item">you have posted a total of : ${keys.length} Entries</div>
    `
}

const lauchListEntries = () =>{
    let entriesList = Object.keys(entries).map(e=>`
        <div class="entry" id="entry_${e}">
            <div class="entry_date">${new Date(entries[e].date).toDateString()}</div>
            <div class="entry_title">${entries[e].title}</div>
            <div class="entry_text">${entries[e].text}</div>
        </div>`
    );

    content.innerHTML = `
        <h1>Journal Entries</h1>
        <div class="entriesList">${entriesList.join("")}</div>
    `;
}

const launchAddEntry = () =>{
    let date = new Date();

    const submitForm = () =>{
        let title = document.getElementById("title").value;
        let text = document.getElementById("entry").value;
        let id = date.getTime();

        entries[id] = {
            title:title,
            text:text,
            date:id
        }

        localStorage.setItem("entries", JSON.stringify(entries));

        menuItems.forEach((mi)=>{    
            mi.setAttribute("class", mi.classList.value.replace(" selected",""));
            if(mi.id == "listEntries"){
                mi.setAttribute("class", mi.classList.value+' selected')
            }
        });

        lauchListEntries();
    }

    content.innerHTML = `
        <h1>Add Entry</h1>
        <div class="form">
            <div class="date">${date.toDateString()}</div>
            <input id="title" placeholder="Entry Title" />
            <textarea id="entry" placeholder="Talk about your day"></textarea>
            <button type="button" id="submitForm">Add Entry</button>
        </div>
    `;

    document.getElementById("submitForm").addEventListener("click", submitForm);
}

launchMain();