let dem = 0;
const soDem = document.getElementById("soDem");

function capNhatSoDem() {
    soDem.textContent = dem;
    soDem.classList.toggle("am", dem < 0);
}

function thayDoiSoDem(delta) {
    dem = Math.max(-10, Math.min(10, dem + delta));
    capNhatSoDem();
}

document.getElementById("btnTang").addEventListener("click", () => thayDoiSoDem(1));
document.getElementById("btnGiam").addEventListener("click", () => thayDoiSoDem(-1));
document.getElementById("btnReset").addEventListener("click", () => {
    dem = 0;
    capNhatSoDem();
});

const nhapTen = document.getElementById("nhapTen");
nhapTen.maxLength = 30;
nhapTen.addEventListener("input", (e) => {
    const giaTri = e.target.value.trim();
    document.getElementById("xemTruoc").textContent = giaTri || "bạn";
    document.getElementById("demKyTu").textContent = `(${e.target.value.length}/30)`;
});

document.addEventListener("keydown", (e) => {
    document.getElementById("phimVuaNhan").textContent =
        `Bạn vừa nhấn: "${e.key}" (code: ${e.code})`;

    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    if (e.target instanceof HTMLElement &&
        e.target.closest("input, textarea, select, button")) return;

    e.preventDefault();
    thayDoiSoDem(e.key === "ArrowUp" ? 1 : -1);
});

let dsViec = [
    { id: 1, noiDung: "Ôn tập DOM", xong: true },
    { id: 2, noiDung: "Làm bài thực hành sự kiện", xong: false }
];
let boLocHienTai = "all";
let idTiepTheo = 3;

const formTodo = document.getElementById("formTodo");
const nhapViec = document.getElementById("nhapViec");
const btnThem = document.getElementById("btnThem");
const ulViec = document.getElementById("dsViec");
const cacNutLoc = document.querySelectorAll(".nut-loc");

function capNhatTrangThaiViec(li, viec) {
    li.classList.toggle("xong", viec.xong);
    document.getElementById("conLai").textContent =
        dsViec.filter(v => !v.xong).length;
}

function renderViec() {
    ulViec.replaceChildren();

    dsViec.forEach(viec => {
        const li = document.createElement("li");
        li.dataset.id = viec.id;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = viec.xong;
        checkbox.setAttribute("aria-label", `Đánh dấu "${viec.noiDung}" đã xong`);

        const noiDung = document.createElement("span");
        noiDung.textContent = viec.noiDung;
        noiDung.title = "Nhấp để đổi trạng thái; nhấp đúp để sửa";

        const nutXoa = document.createElement("button");
        nutXoa.className = "btn-xoa";
        nutXoa.type = "button";
        nutXoa.title = "Xoá";
        nutXoa.setAttribute("aria-label", `Xoá "${viec.noiDung}"`);
        nutXoa.textContent = "×";

        li.append(checkbox, noiDung, nutXoa);
        li.classList.toggle("xong", viec.xong);
        li.hidden = boLocHienTai === "active" ? viec.xong
            : boLocHienTai === "done" ? !viec.xong
                : false;
        ulViec.appendChild(li);
    });

    document.getElementById("conLai").textContent =
        dsViec.filter(v => !v.xong).length;
}

nhapViec.addEventListener("input", () => {
    btnThem.disabled = nhapViec.value.trim() === "";
});

formTodo.addEventListener("submit", (e) => {
    e.preventDefault();
    const noiDung = nhapViec.value.trim();
    if (noiDung === "") {
        nhapViec.focus();
        return;
    }

    dsViec.push({ id: idTiepTheo++, noiDung, xong: false });
    nhapViec.value = "";
    btnThem.disabled = true;
    boLocHienTai = "all";
    capNhatNutLoc();
    renderViec();
    nhapViec.focus();
});

function capNhatNutLoc() {
    cacNutLoc.forEach(nut => {
        const dangChon = nut.dataset.filter === boLocHienTai;
        nut.classList.toggle("btn-gold", dangChon);
        nut.setAttribute("aria-pressed", String(dangChon));
    });
}

cacNutLoc.forEach(nut => {
    nut.addEventListener("click", () => {
        boLocHienTai = nut.dataset.filter;
        capNhatNutLoc();
        renderViec();
    });
});

ulViec.addEventListener("click", (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    const li = e.target.closest("li");
    if (!li || !ulViec.contains(li)) return;

    const id = Number(li.dataset.id);
    const viec = dsViec.find(v => v.id === id);
    if (!viec) return;

    if (e.target.closest(".btn-xoa")) {
        dsViec = dsViec.filter(v => v.id !== id);
        renderViec();
        return;
    }

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
        viec.xong = e.target.checked;
    } else if (e.target.matches("span") && e.detail === 1) {
        viec.xong = !viec.xong;
    } else {
        return;
    }

    capNhatTrangThaiViec(li, viec);
    li.hidden = boLocHienTai === "active" ? viec.xong
        : boLocHienTai === "done" ? !viec.xong
            : false;
});

ulViec.addEventListener("dblclick", (e) => {
    if (!(e.target instanceof HTMLElement) || !e.target.matches("span")) return;

    const li = e.target.closest("li");
    if (!li) return;
    const viec = dsViec.find(v => v.id === Number(li.dataset.id));
    if (!viec) return;

    const noiDungMoi = window.prompt("Sửa nội dung công việc:", viec.noiDung);
    if (noiDungMoi === null) return;
    const noiDungDaSua = noiDungMoi.trim();
    if (noiDungDaSua === "") {
        window.alert("Nội dung công việc không được để trống.");
        return;
    }

    viec.noiDung = noiDungDaSua;
    renderViec();
});

document.getElementById("btnXoaXong").addEventListener("click", () => {
    dsViec = dsViec.filter(v => !v.xong);
    renderViec();
});

capNhatNutLoc();
renderViec();