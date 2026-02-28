const API = 'https://dummy.restapiexample.com/api/v1';
const LS_KEY = 'employees';
const PAGE_SIZE = 5;
let currentPage = 1;

function getLocalStorage() {
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
}

function saveLocalStorage(data) {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
}

function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    if (id === 'list') loadEmployees();
}

function setMsg(id, text, isError = false) {
    const el = document.getElementById(id);
    el.textContent = text;
    el.className = 'msg' + (isError ? ' error' : '');

    setTimeout(() => {
        clearMessage(id);
    }, 3000);
}

function clearMessage(id) {
    const msgElement = document.getElementById(id);
    msgElement.classList.add('fade-out');

    setTimeout(() => {
        msgElement.textContent = '';
        msgElement.className = 'msg';
    }, 200);
}

const redirectToList = () => {
    setTimeout(() => {
        currentPage = 1
        showSection('list')
    }, 500);
}

document.getElementById('insertForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
        name: document.getElementById('name').value,
        salary: document.getElementById('salary').value,
        age: document.getElementById('age').value,
    };

    try {
        const res = await fetch(`${API}/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const json = await res.json();

        const employees = getLS();
        const newEmployee = { id: json.data.id || Date.now(), ...body };
        employees.push(newEmployee);
        saveLocalStorage(employees);

        setMsg('insertMsg', `Funcionário "${body.name}" inserido com sucesso! (ID: ${newEmployee.id})`);
        e.target.reset();

        redirectToList();
    } catch (err) {
        setMsg('insertMsg', 'Erro ao inserir. Verifique a conexão.', true);
    }

    setTimeout(() => {
        clearMessage('insertMsg')
    }, 3000)
});

async function loadEmployees() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '<tr><td colspan="4">Carregando...</td></tr>';

    try {
        const res = await fetch(`${API}/employees`);
        const json = await res.json();
        let employees = json.data || [];

        const lsData = getLocalStorage();
        const apiIds = employees.map(e => String(e.id));
        const lsOnly = lsData.filter(e => !apiIds.includes(String(e.id)));
        employees = [...employees, ...lsOnly];

        saveLocalStorage(employees);
        renderTable(employees);
    } catch (err) {
        const employees = getLocalStorage();
        if (employees.length > 0) {
            renderTable(employees);
        } else {
            tbody.innerHTML = '<tr><td colspan="4">Erro ao carregar dados.</td></tr>';
        }
    }
}

function renderTable(employees) {
    const tbody = document.getElementById('tableBody');
    const total = employees.length;
    const totalPages = Math.ceil(total / PAGE_SIZE);
    const start = (currentPage - 1) * PAGE_SIZE;
    const page = employees.slice(start, start + PAGE_SIZE);

    tbody.innerHTML = '';
    page.forEach(emp => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${emp.id}</td><td>${emp.employee_name || emp.name}</td><td>${emp.employee_salary || emp.salary}</td><td>${emp.employee_age || emp.age}</td>`;
        tbody.appendChild(tr);
    });

    renderPagination(totalPages, employees);
}

function renderPagination(totalPages, employees) {
    const div = document.getElementById('pagination');
    div.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if (i === currentPage) btn.classList.add('active');
        btn.addEventListener('click', () => {
            currentPage = i;
            renderTable(employees);
        });
        div.appendChild(btn);
    }
}

document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('editId').value;
    const body = {
        name: document.getElementById('editName').value,
        salary: document.getElementById('editSalary').value,
        age: document.getElementById('editAge').value,
    };

    try {
        await fetch(`${API}/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        let employees = getLocalStorage();
        const idx = employees.findIndex(emp => String(emp.id) === String(id));
        if (idx !== -1) {
            if (body.name) employees[idx].employee_name = body.name;
            if (body.salary) employees[idx].employee_salary = body.salary;
            if (body.age) employees[idx].employee_age = body.age;
            saveLocalStorage(employees);
        }

        setMsg('editMsg', `Funcionário ID ${id} atualizado com sucesso!`);
        e.target.reset();

        redirectToList();
    } catch (err) {
        setMsg('editMsg', 'Erro ao atualizar.', true);
    }

    setTimeout(() => {
        clearMessage('editMsg')
    }, 3000)
});

document.getElementById('deleteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('deleteId').value;

    try {
        await fetch(`${API}/delete/${id}`, { method: 'DELETE' });
        let employees = getLocalStorage();
        const employeFound = employees.filter(emp => String(emp.id) == String(id));

        if (employeFound.length == 0) {
            setMsg('deleteMsg', `Sem usuario encontrado com o id passado: ${id}`, true);
            return;
        }

        employees = employees.filter(emp => String(emp.id) !== String(id));
        saveLocalStorage(employees);
        setMsg('deleteMsg', `Funcionário ID ${id} removido com sucesso!`);
        e.target.reset();

        redirectToList();
    } catch (err) {
        setMsg('deleteMsg', 'Erro ao excluir.', true);
    }

    setTimeout(() => {
        clearMessage('deleteMsg')
    }, 3000)
});