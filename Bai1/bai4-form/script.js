const form = document.getElementById("formDangKy");
const danhSachDangKy = [];
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REGEX_SDT = /^0(3|5|7|8|9)\d{8}$/;
const REGEX_MATKHAU = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

function tinhTuoi(ngaySinh) {
    if (!ngaySinh) return null;
    const [nam, thang, ngay] = ngaySinh.split("-").map(Number);
    const homNay = new Date();
    let tuoi = homNay.getFullYear() - nam;
    const daQuaSinhNhat = homNay.getMonth() + 1 > thang ||
        (homNay.getMonth() + 1 === thang && homNay.getDate() >= ngay);
    if (!daQuaSinhNhat) tuoi--;
    return tuoi;
}

function emailDaDangKy(email) {
    const emailChuanHoa = email.trim().toLowerCase();
    return danhSachDangKy.some(nguoi =>
        nguoi.email.toLowerCase() === emailChuanHoa
    );
}

const quyTac = {
    hoTen: (v) => {
        if (v === "") return "Vui lòng nhập họ tên";
        if (v.length < 3) return "Họ tên phải có ít nhất 3 ký tự";
        if (/\d/.test(v)) return "Họ tên không được chứa chữ số";
        return "";
    },
    ngaySinh: (v) => {
        if (v === "") return "Vui lòng chọn ngày sinh";
        const tuoi = tinhTuoi(v);
        if (tuoi === null || Number.isNaN(tuoi)) return "Ngày sinh không hợp lệ";
        if (tuoi < 17) return "Bạn phải đủ 17 tuổi tính đến hôm nay";
        return "";
    },
    email: (v) => {
        if (v === "") return "Vui lòng nhập email";
        if (!REGEX_EMAIL.test(v)) return "Email không đúng định dạng";
        if (emailDaDangKy(v)) return "Email này đã được đăng ký";
        return "";
    },
    dienThoai: (v) => REGEX_SDT.test(v)
        ? ""
        : "SĐT gồm 10 số, bắt đầu 03/05/07/08/09",
    nganh: (v) => v ? "" : "Vui lòng chọn ngành học",
    matKhau: (v) => REGEX_MATKHAU.test(v)
        ? ""
        : "Mật khẩu cần ít nhất 8 ký tự, 1 chữ hoa và 1 chữ số",
    xacNhan: (v) => v !== "" && v === document.getElementById("matKhau").value
        ? ""
        : "Mật khẩu xác nhận không khớp",
    dongY: (_, input) => input.checked ? "" : "Bạn cần đồng ý với nội quy"
};

function hienLoi(input, thongBao) {
    const nhom = input.closest(".nhom");
    nhom.classList.add("co-loi");
    nhom.classList.remove("hop-le");
    nhom.querySelector(".loi").textContent = thongBao;
    input.setAttribute("aria-invalid", "true");
}

function hopLe(input) {
    const nhom = input.closest(".nhom");
    nhom.classList.remove("co-loi");
    nhom.classList.add("hop-le");
    nhom.querySelector(".loi").textContent = "";
    input.removeAttribute("aria-invalid");
}

function kiemTraTruong(input) {
    const giaTri = input.type === "checkbox" ? "" : input.value.trim();
    const loi = quyTac[input.id](giaTri, input);
    if (loi) hienLoi(input, loi);
    else hopLe(input);
    return loi === "";
}

Object.keys(quyTac).forEach(id => {
    const input = document.getElementById(id);
    const suKienThayDoi = input.type === "checkbox" ? "change" : "input";

    input.addEventListener("blur", () => kiemTraTruong(input));
    input.addEventListener(suKienThayDoi, () => {
        if (input.closest(".nhom").classList.contains("co-loi")) {
            kiemTraTruong(input);
        }
    });
});

const matKhau = document.getElementById("matKhau");
const xacNhan = document.getElementById("xacNhan");
const doManh = document.getElementById("doManh");

function capNhatDoManhMatKhau() {
    const giaTri = matKhau.value;
    const tieuChi = [
        giaTri.length >= 8,
        /[A-Z]/.test(giaTri),
        /[a-z]/.test(giaTri),
        /\d/.test(giaTri),
        /[^A-Za-z0-9]/.test(giaTri)
    ].filter(Boolean).length;

    doManh.classList.remove("yeu", "trung-binh", "manh");
    if (giaTri === "") {
        doManh.textContent = "Độ mạnh: Chưa nhập";
        return;
    }

    if (tieuChi <= 2) {
        doManh.textContent = "Độ mạnh: Yếu";
        doManh.classList.add("yeu");
    } else if (tieuChi <= 4) {
        doManh.textContent = "Độ mạnh: Trung bình";
        doManh.classList.add("trung-binh");
    } else {
        doManh.textContent = "Độ mạnh: Mạnh";
        doManh.classList.add("manh");
    }
}

matKhau.addEventListener("input", () => {
    capNhatDoManhMatKhau();
    if (xacNhan.value !== "") kiemTraTruong(xacNhan);
});

document.querySelectorAll("[data-toggle-password]").forEach(button => {
    button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.togglePassword);
        const dangHien = input.type === "password";
        input.type = dangHien ? "text" : "password";
        button.textContent = dangHien ? "🙈 Ẩn" : "👁 Hiện";
        button.setAttribute("aria-pressed", String(dangHien));
        button.setAttribute(
            "aria-label",
            `${dangHien ? "Ẩn" : "Hiện"} ${input.id === "matKhau" ? "mật khẩu" : "xác nhận mật khẩu"}`
        );
    });
});

function taoO(noiDung, laTieuDe = false) {
    const o = document.createElement(laTieuDe ? "th" : "td");
    o.textContent = noiDung;
    return o;
}

function renderDanhSachDangKy() {
    const khung = document.getElementById("bangDangKy");
    khung.replaceChildren();

    if (danhSachDangKy.length === 0) {
        const rong = document.createElement("p");
        rong.className = "empty-state";
        rong.textContent = "Chưa có người đăng ký.";
        khung.appendChild(rong);
        return;
    }

    const bang = document.createElement("table");
    const thead = document.createElement("thead");
    const hangTieuDe = document.createElement("tr");
    ["STT", "Họ tên", "Ngày sinh", "Email", "Điện thoại", "Ngành"].forEach(tieuDe => {
        hangTieuDe.appendChild(taoO(tieuDe, true));
    });
    thead.appendChild(hangTieuDe);

    const tbody = document.createElement("tbody");
    danhSachDangKy.forEach((nguoi, index) => {
        const hang = document.createElement("tr");
        [
            String(index + 1),
            nguoi.hoTen,
            nguoi.ngaySinh,
            nguoi.email,
            nguoi.dienThoai,
            nguoi.nganh
        ].forEach(giaTri => hang.appendChild(taoO(giaTri)));
        tbody.appendChild(hang);
    });

    bang.append(thead, tbody);
    khung.appendChild(bang);
}

function hienThiKetQua(nguoi) {
    const ketQua = document.getElementById("ketQua");
    const tieuDe = document.createElement("h2");
    tieuDe.textContent = "Đăng ký thành công!";
    ketQua.replaceChildren(tieuDe);

    [
        ["Họ tên", nguoi.hoTen],
        ["Ngày sinh", nguoi.ngaySinh],
        ["Email", nguoi.email],
        ["Điện thoại", nguoi.dienThoai],
        ["Ngành", nguoi.nganh]
    ].forEach(([nhan, giaTri]) => {
        const p = document.createElement("p");
        p.textContent = `${nhan}: ${giaTri}`;
        ketQua.appendChild(p);
    });
    ketQua.classList.remove("hidden");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ketQuaKiemTra = Object.keys(quyTac).map(id =>
        kiemTraTruong(document.getElementById(id))
    );

    if (ketQuaKiemTra.includes(false)) {
        form.querySelector(".nhom.co-loi input, .nhom.co-loi select").focus();
        return;
    }

    const nguoi = {
        hoTen: document.getElementById("hoTen").value.trim(),
        ngaySinh: document.getElementById("ngaySinh").value,
        email: document.getElementById("email").value.trim(),
        dienThoai: document.getElementById("dienThoai").value.trim(),
        nganh: document.getElementById("nganh").selectedOptions[0].textContent
    };

    danhSachDangKy.push(nguoi);
    renderDanhSachDangKy();
    hienThiKetQua(nguoi);
    form.reset();
    form.querySelectorAll(".nhom").forEach(nhom => {
        nhom.classList.remove("co-loi", "hop-le");
        nhom.querySelector(".loi").textContent = "";
        const input = nhom.querySelector("input, select");
        if (input) input.removeAttribute("aria-invalid");
    });
    document.querySelectorAll("[data-toggle-password]").forEach(button => {
        const input = document.getElementById(button.dataset.togglePassword);
        input.type = "password";
        button.textContent = "👁 Hiện";
        button.setAttribute("aria-pressed", "false");
        button.setAttribute(
            "aria-label",
            `Hiện ${input.id === "matKhau" ? "mật khẩu" : "xác nhận mật khẩu"}`
        );
    });
    capNhatDoManhMatKhau();
});

renderDanhSachDangKy();
