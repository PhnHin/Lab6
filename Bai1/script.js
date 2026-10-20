const sinhVien = {
mssv: "2201001",
hoTen: "Nguyễn Văn An",
namSinh: 2004,
diem: { web: 8.5, csdl: 7.0, mang: 9.0 },
gioiThieu() {
return `Tôi là ${this.hoTen}, MSSV ${this.mssv}`;
}
};
console.log(sinhVien.hoTen); 
console.log(sinhVien["mssv"]); 
console.log(sinhVien.diem.web); 
console.log(sinhVien.gioiThieu()); 
sinhVien.email = "an.nv@gdu.edu.vn";
sinhVien.namSinh = 2005; 
delete sinhVien.email;
console.log("email" in sinhVien); 
for (const mon in sinhVien.diem) {
console.log(`${mon}: ${sinhVien.diem[mon]}`);
}
console.log(Object.keys(sinhVien.diem));
console.log(Object.values(sinhVien.diem));
console.log(Object.entries(sinhVien.diem)); 
const { hoTen, diem: { web } } = sinhVien;
const svMoi = { ...sinhVien, hoTen: "Trần Thị Bình" }; 
console.log(hoTen, web);
console.log(svMoi.hoTen); 
console.log(sinhVien.hoTen);
const sanPham = [
{ id: 1, ten: "Laptop Dell Inspiron", gia: 18500000, loai: "laptop", tonKho: 5 },
{ id: 2, ten: "Chuột Logitech M331", gia: 350000, loai: "phu-kien", tonKho: 0 },
{ id: 3, ten: "MacBook Air M3", gia: 27990000, loai: "laptop", tonKho: 2 },
{ id: 4, ten: "Bàn phím cơ AKKO", gia: 1290000, loai: "phu-kien", tonKho: 12 },
{ id: 5, ten: "Màn hình LG 24\"", gia: 3150000, loai: "man-hinh", tonKho: 0 }
];
sanPham.push({ id: 6, ten: "Tai nghe Sony", gia: 1990000, loai: "phu-kien", tonKho: 7 });
console.log("Số sản phẩm:", sanPham.length); 
sanPham.forEach((sp, i) => console.log(`${i + 1}. ${sp.ten}`));

const tenSP = sanPham.map(sp => sp.ten.toUpperCase());
console.log(tenSP);
const conHang = sanPham.filter(sp => sp.tonKho > 0);
console.table(conHang);
const mac = sanPham.find(sp => sp.ten.includes("MacBook"));
const viTri = sanPham.findIndex(sp => sp.id === 4);
console.log(mac.gia, viTri); 
console.log(sanPham.some(sp => sp.tonKho === 0)); 
console.log(sanPham.every(sp => sp.gia > 100000)); 
const tongGiaTri = sanPham.reduce((tong, sp) => tong + sp.gia * sp.tonKho, 0);
console.log("Tổng giá trị kho:", tongGiaTri.toLocaleString("vi-VN") + " đ");
const theoGia = [...sanPham].sort((a, b) => a.gia - b.gia);
console.table(theoGia.map(({ ten, gia }) => ({ ten, gia })));
const ketQua = sanPham
.filter(sp => sp.loai === "laptop" && sp.tonKho > 0)
.sort((a, b) => b.gia - a.gia)
.map(sp => sp.ten);
console.log(ketQua); 