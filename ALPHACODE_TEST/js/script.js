document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const birthDate = document.getElementById('birthDate').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;

    if (fullName === "" || email === "" || mobile === "") {
        alert("Por favor, preencha os campos obrigatórios.");
        return;
    }

    const table = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.rows.length);
    newRow.dataset.id = new Date().getTime(); 
    newRow.insertCell(0).innerHTML = fullName;
    newRow.insertCell(1).innerHTML = birthDate;
    newRow.insertCell(2).innerHTML = email;
    newRow.insertCell(3).innerHTML = mobile;

    const actionsCell = newRow.insertCell(4);
    
    const editButton = document.createElement('button');
    editButton.innerHTML = 'Editar';
    editButton.className = 'btn btn-primary btn-sm';
    editButton.onclick = function() {
        editContact(newRow.dataset.id, fullName, birthDate, email, mobile);
    };
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Excluir';
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.onclick = function() {
        if (confirm('Tem certeza que deseja excluir este contato?')) {
            fetch('delete_contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    id: newRow.dataset.id
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    table.deleteRow(newRow.rowIndex - 1);
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });
        }
    };
    actionsCell.appendChild(deleteButton);

    document.getElementById('contactForm').reset();
});

function editContact(id, fullName, birthDate, email, mobile) {
    document.getElementById('fullName').value = fullName;
    document.getElementById('birthDate').value = birthDate;
    document.getElementById('email').value = email;
    document.getElementById('mobile').value = mobile;

    document.getElementById('contactForm').onsubmit = function(event) {
        event.preventDefault();

        fetch('update_contact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                id: id,
                fullName: document.getElementById('fullName').value,
                birthDate: document.getElementById('birthDate').value,
                email: document.getElementById('email').value,
                mobile: document.getElementById('mobile').value
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const row = document.querySelector(`#contactTable tbody tr[data-id='${id}']`);
                row.cells[0].innerText = document.getElementById('fullName').value;
                row.cells[1].innerText = document.getElementById('birthDate').value;
                row.cells[2].innerText = document.getElementById('email').value;
                row.cells[3].innerText = document.getElementById('mobile').value;

                document.getElementById('contactForm').reset();
                document.getElementById('contactForm').onsubmit = function(event) {
                    event.preventDefault();
                   
                };
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    };
}

document.querySelectorAll('.icon.edit').forEach(icon => {
    icon.addEventListener('click', function() {
        const row = icon.closest('tr');
        const cells = row.getElementsByTagName('td');
        const id = row.dataset.id;
        editContact(id, cells[0].innerText, cells[1].innerText, cells[2].innerText, cells[3].innerText);
    });
});


document.querySelectorAll('.icon.delete').forEach(icon => {
    icon.addEventListener('click', function() {
        if (confirm('Tem certeza que deseja excluir este contato?')) {
            const row = icon.closest('tr');
            const id = row.dataset.id;

            fetch('delete_contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    id: id
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    row.remove();
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });
        }
    });
});
