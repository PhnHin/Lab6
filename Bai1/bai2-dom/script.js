const sanPham = [
    { id: 1, ten: "Laptop Dell Inspiron", gia: 18500000, tonKho: 5, giamGia: 10 },
    { id: 2, ten: "Chuột Logitech M331", gia: 350000, tonKho: 0 },
    { id: 3, ten: "MacBook Air M3", gia: 27990000, tonKho: 2, giamGia: 5 },
    { id: 4, ten: "Bàn phím cơ AKKO", gia: 1290000, tonKho: 12, giamGia: 15 },
    { id: 5, ten: 'Màn hình LG 24"', gia: 3150000, tonKho: 0 }
];

const tieuDe = document.getElementById("tieuDe");
const moTa = document.querySelector(".mo-ta");
const cacMenu = document.querySelectorAll("#menu li");
const khung = document.querySelector("#dsSanPham");
const bangSanPham = document.getElementById("bangSanPham");

tieuDe.textContent = "Cửa hàng GDU Tech";
moTa.textContent = "Chào mừng! Hôm nay có ưu đãi cho sinh viên.";
tieuDe.style.borderBottom = "4px solid #f2b705";
tieuDe.style.paddingBottom = "6px";
cacMenu.forEach((li, i) => {
    if (i === 0) li.classList.add("noi-bat");
});
khung.setAttribute("data-so-luong", sanPham.length);

const tongGiaTriKho = sanPham.reduce(
    (tong, sp) => tong + sp.gia * sp.tonKho,
    0
);
document.getElementById("tongGiaTriKho").textContent =
    `Tổng giá trị kho: ${tongGiaTriKho.toLocaleString("vi-VN")} đ`;

function dinhDangGia(so) {
    return `${so.toLocaleString("vi-VN")} đ`;
}

function taoTheSanPham(sp) {
    const the = document.createElement("article");
    the.className = "card sp-card";

    if (sp.tonKho === 0) the.classList.add("het-hang");
    if (sp.tonKho > 10) the.classList.add("noi-bat");

    const ten = document.createElement("h3");
    ten.textContent = sp.ten;
    the.appendChild(ten);

    if (sp.giamGia > 0) {
        const giaCu = document.createElement("p");
        giaCu.className = "gia-cu";
        const giaGachNgang = document.createElement("del");
        giaGachNgang.textContent = dinhDangGia(sp.gia);
        giaCu.appendChild(giaGachNgang);
        the.appendChild(giaCu);
    }

    const gia = document.createElement("p");
    gia.className = "gia";
    const giaSauGiam = sp.giamGia > 0
        ? Math.round(sp.gia * (1 - sp.giamGia / 100))
        : sp.gia;
    gia.textContent = dinhDangGia(giaSauGiam);

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = sp.tonKho > 0 ? `Còn ${sp.tonKho}` : "Hết hàng";

    the.append(gia, badge);
    return the;
}

function render(ds) {
    khung.replaceChildren();
    ds.forEach(sp => khung.appendChild(taoTheSanPham(sp)));

    document.getElementById("tongSP").textContent = ds.length;
    document.getElementById("hetHang").textContent =
        ds.filter(sp => sp.tonKho === 0).length;
}

function renderBang(ds) {
    const wrapper = document.createElement("div");
    wrapper.className = "bang-wrapper";

    const bang = document.createElement("table");
    const thead = document.createElement("thead");
    const hangTieuDe = document.createElement("tr");

    ["STT", "Tên", "Giá", "Tồn kho"].forEach(noiDung => {
        const o = document.createElement("th");
        o.textContent = noiDung;
        hangTieuDe.appendChild(o);
    });
    thead.appendChild(hangTieuDe);

    const tbody = document.createElement("tbody");
    ds.forEach((sp, index) => {
        const hang = document.createElement("tr");
        const duLieu = [
            index + 1,
            sp.ten,
            dinhDangGia(sp.giamGia > 0
                ? Math.round(sp.gia * (1 - sp.giamGia / 100))
                : sp.gia),
            sp.tonKho
        ];

        duLieu.forEach(noiDung => {
            const o = document.createElement("td");
            o.textContent = noiDung;
            hang.appendChild(o);
        });
        tbody.appendChild(hang);
    });

    bang.append(thead, tbody);
    wrapper.appendChild(bang);
    bangSanPham.replaceChildren(wrapper);
}

render(sanPham);
renderBang(sanPham);

const liMoi = document.createElement("li");
liMoi.textContent = "Khuyến mãi";
document.getElementById("menu").appendChild(liMoi);
cacMenu[2].remove();
