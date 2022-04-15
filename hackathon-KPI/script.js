const API = 'http://localhost:8000/schema';


let selectedRow = null

function onFormSubmit(e) {
    event.preventDefault();
    let formData = readFormData();
    if (selectedRow == null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    resetForm();
}

//получение данных
function readFormData() {
    let formData = {};
    formData["surname"] = document.getElementById("surname").value;
    formData["name"] = document.getElementById("name").value;
    formData["pNumber"] = document.getElementById("pNumber").value;
    formData["weeklyKpi"] = document.getElementById("weeklyKpi").value;
    formData["monthlyKpi"] = document.getElementById("monthlyKpi").value;
    return formData;
}



//добавление данных
function insertNewRecord(data) {
    let table = document.getElementById("studentList").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.surname;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.name;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.pNumber;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.weeklyKpi;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.monthlyKpi;
    cell5 = newRow.insertCell(5);
    cell5.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

//изменение поля студента
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("surname").value = selectedRow.cells[0].innerHTML;
    document.getElementById("name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("pNumber").value = selectedRow.cells[2].innerHTML;
    document.getElementById("weeklyKpi").value = selectedRow.cells[3].innerHTML;
    document.getElementById("monthlyKpi").value = selectedRow.cells[4].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.surname;
    selectedRow.cells[1].innerHTML = formData.name;
    selectedRow.cells[2].innerHTML = formData.pNumber;
    selectedRow.cells[3].innerHTML = formData.weeklyKpi;
    selectedRow.cells[4].innerHTML = formData.monthlyKpi;
}

//удаление поля студента
function onDelete(td) {
    if (confirm('Вы уверены что хотите удалить это поле?')) {
        row = td.parentElement.parentElement;
        document.getElementById('studentList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//очистка полей заполнения
function resetForm() {
    document.getElementById("surname").value = '';
    document.getElementById("name").value = '';
    document.getElementById("pNumber").value = '';
    document.getElementById("weeklyKpi").value = '';
    document.getElementById("monthlyKpi").value = '';
    selectedRow = null;
}



// pagination

// function drawPaginationButtons() {
//     fetch(`${API}?q=${searchVal}`)
//         .then((res) => res.json())
//         .then((data) => {
//             pageTotalCount = Math.ceil(data.length / 6); //общее кол-во страниц
//             paginationList.html('');

//             for (let i = 1; i <= pageTotalCount; i++) {
//                 if (currentPage == i) {
//                     paginationList.append(
//                         `<li class="page-item active"><a class="page-link page_number" href="#">${i}</a></li> `
//                     );
//                 } else {
//                     paginationList.append(
//                         `<li class="page-item"><a class="page-link page_number" href="#">${i}</a></li> `
//                     );
//                 }
//             }
//         });
// }

// $('body').on('click', '.page_number', function () {
//     currentPage = this.innerText;
//     render();
// });

// prev.on('click', () => {
//     if (currentPage <= 1) {
//         return;
//     }
//     currentPage--;
//     render();
// });

// next.on('click', () => {
//     if (currentPage >= pageTotalCount) {
//         return;
//     }
//     currentPage++;
//     render();
// });

// function render() {
//     fetch(`${API}?q=${searchVal}&_limit=6&_page=${currentPage}`)
//         .then((res) => res.json())
//         .then((data) => {
//             list.html('');
//             data.forEach((element) => {
//                 let item = drawProductCard(element);
//                 list.append(item);
//             });
//             drawPaginationButtons();
//         });
// }