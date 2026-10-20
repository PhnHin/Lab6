const dsSV = [
    {mssv: "SV01", ten: "An", qt: 7, ck: 8},
    {mssv: "SV02", ten: "Bình", qt: 4, ck: 3.5},
    {mssv: "SV03", ten: "Cường", qt: 9, ck: 9.5},
    {mssv: "SV04", ten: "Dung", qt: 6, ck: 5},
    {mssv: "SV05", ten: "Em", qt: 8.5, ck: 7}
];

function xepLoai(tk) {
    if (tk >= 8.5) return "Giỏi";
    if (tk >= 7) return "Khá";
    if (tk >= 5) return "Trung bình";
    return "Không đạt";
}

const dsKetQua = dsSV.map((sv) => {
    const tk = Math.round((sv.qt * 0.4 + sv.ck * 0.6) * 10) / 10;
    return {...sv, tk, xepLoai: xepLoai(tk)};
});

const dsDat = dsKetQua
    .filter((sv) => sv.tk >= 5)
    .sort((a, b) => b.tk - a.tk);

console.table(dsDat);

const diemTrungBinh = Number(
    (dsKetQua.reduce((tong, sv) => tong + sv.tk, 0) / dsKetQua.length).toFixed(2)
);
console.log(`ĐTB lớp: ${diemTrungBinh}`);

const thongKeXepLoai = dsKetQua.reduce((thongKe, sv) => {
    thongKe[sv.xepLoai] = (thongKe[sv.xepLoai] || 0) + 1;
    return thongKe;
}, {});
console.log("Thống kê:", thongKeXepLoai);